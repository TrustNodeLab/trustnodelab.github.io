/**
 * TrustNode assets worker.
 *
 * Serves two kinds of content so the site origin (GitHub Pages) stays small
 * and the media never expires:
 *
 *   GET /news/{postId}.jpg   — Telegram post photo. Returns a 302 redirect to
 *                              the CURRENT cdn4.telesco.pe URL (resolved from
 *                              the public t.me embed page). The redirect is
 *                              edge-cached for 7 days; on cache expiry the
 *                              worker re-resolves the photo URL, so an expired
 *                              telesco link can never break the site for long.
 *                              The browser downloads the photo DIRECTLY from
 *                              Telegram's CDN (fast, user-local) — the worker
 *                              never proxies the heavy bytes.
 *   GET /models/{file}       — ruBERT ONNX model + vocab, served from R2
 *                              (recommended) or a fallback origin URL.
 *
 * The model is intentionally NOT shipped with the GitHub Pages site
 * (it would be 28 MB of static hosting). It lives in Cloudflare R2 and is
 * proxied here with long-lived cache headers.
 */

interface Env {
  TELEGRAM_CHANNEL?: string;
  /** Optional fallback origin for the model (e.g. a GitHub Release asset). */
  MODEL_ORIGIN?: string;
  /** Optional R2 binding — uncomment in wrangler.toml to enable. */
  MODEL_BUCKET?: R2Bucket;
}

const MODEL_FILES = new Set(["rubert_fraud_4m_v8_int8.onnx", "vocab.txt"]);
const CONTENT_TYPES: Record<string, string> = {
  "rubert_fraud_4m_v8_int8.onnx": "application/octet-stream",
  "vocab.txt": "text/plain; charset=utf-8",
};

/** Internal fetches must not hang the worker — worst case ~7s per hop. */
const FETCH_TIMEOUT_MS = 7000;
const MODEL_TIMEOUT_MS = 60000;

/** Redirect cache lifetime: long enough to be fast, short enough that an
 *  expired Telegram CDN link is re-resolved within a week. */
const NEWS_REDIRECT_MAX_AGE = 86400 * 7;

/** All Telegram post ids currently in src/data/news.json (warm-up list). */
const NEWS_IDS = [
  "212","211","210","209","208","207","206","204","203","202","199","197","198",
  "195","196","194","193","191","189","190","188","187","186","185","183","184",
  "182","180","181","179","178","177","176","175","174","173","172","171","170",
  "169","168","167","166","165","143","142","141","140","138","137","136","135",
  "134","133","132","131","130","129","128","127","126","125","124","123","122",
  "121","120","119","118","117","109","108","107","106","105","104","103","102",
  "101","100","99","98","97","96","95","94","93","92","91","89","81","80","79",
  "78","77","76","75","74","73","71","70","69","68","67","66","65","64","62",
  "59","57",
];

/** Free plan: 50 subrequests per invocation — stay safely under with a budget. */
const RESOLVE_BUDGET = 40;

// ---------------------------------------------------------------------------
// Cache helpers
// ---------------------------------------------------------------------------

function cacheKey(request: Request): Request {
  return new Request(request.url, { method: "GET", headers: request.headers });
}

async function cachedResponse(
  request: Request,
  maxAge: number,
  make: () => Promise<Response>,
): Promise<Response> {
  const cache = caches.default;
  const key = cacheKey(request);
  const hit = await cache.match(key);
  if (hit) return hit;

  const res = await make();
  if (res.status === 200 || res.status === 302) {
    const headers = new Headers(res.headers);
    headers.set("Cache-Control", `public, max-age=${maxAge}`);
    headers.set("Access-Control-Allow-Origin", "*");
    const body = await res.arrayBuffer();
    const cached = new Response(body, { status: res.status, headers });
    await cache.put(key, cached.clone());
    return cached;
  }
  return res;
}

// ---------------------------------------------------------------------------
// News photos (redirect model)
// ---------------------------------------------------------------------------

/** Extract the og:image URL from a t.me embed page. */
export function extractOgImage(html: string): string | null {
  // og:image / twitter:image — attributes in any order.
  const meta = html.match(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*>/i);
  if (meta) return meta[1];
  // Fallback: tgme photo wrap inline background-image (same pattern as news-sync).
  const bg = html.match(/class="[^"]*tgme_widget_message_photo_wrap[^"]*"[^>]*style="[^"]*url\((['"]?)(.*?)\1\)/i);
  return bg ? bg[2] : null;
}

export function postIdFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/news\/(tg-(\d+))(?:\.[a-z]+)?\/?$/i);
  return m ? m[2] : null;
}

/** Resolve the CURRENT photo URL for a post — returns null if unresolvable. */
async function resolveNewsPhotoUrl(env: Env, postId: string): Promise<string | null> {
  const channel = env.TELEGRAM_CHANNEL || "TrustNode_team";
  const ua = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  };

  // Try both sources in parallel — the fastest page that yields a photo wins.
  const attempts = [
    `https://t.me/${channel}/${postId}?embed=1&mode=tme`,
    `https://t.me/s/${channel}/${postId}`,
  ].map(async (url) => {
    const res = await fetch(url, { headers: ua, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!res.ok) throw new Error(`page ${res.status}`);
    const photoUrl = extractOgImage(await res.text());
    if (!photoUrl) throw new Error("no photo in page");
    return photoUrl;
  });

  try {
    return await Promise.any(attempts);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

async function fetchModel(env: Env, file: string): Promise<Response> {
  // 1) R2 (recommended)
  if (env.MODEL_BUCKET) {
    const obj = await env.MODEL_BUCKET.get(`models/${file}`);
    if (obj) {
      const headers = new Headers();
      headers.set("Content-Type", CONTENT_TYPES[file] || "application/octet-stream");
      headers.set("ETag", `"${obj.httpEtag}"`);
      return new Response(obj.body, { status: 200, headers });
    }
  }

  // 2) Fallback origin (e.g. GitHub Release asset)
  if (env.MODEL_ORIGIN) {
    const base = env.MODEL_ORIGIN.replace(/\/+$/, "");
    const res = await fetch(`${base}/${file}`, { signal: AbortSignal.timeout(MODEL_TIMEOUT_MS) });
    if (res.ok) {
      const headers = new Headers(res.headers);
      headers.set("Content-Type", CONTENT_TYPES[file] || res.headers.get("Content-Type") || "application/octet-stream");
      return new Response(res.body, { status: 200, headers });
    }
  }

  return new Response("Model not found — upload it to R2 or set MODEL_ORIGIN", { status: 404 });
}

// ---------------------------------------------------------------------------
// Entry
// ---------------------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "");

    try {
      // Health / root
      if (pathname === "" || pathname === "/") {
        return new Response(
          JSON.stringify({
            ok: true,
            service: "trustnode-assets",
            routes: ["/news/{id}.jpg (302 redirect, cached 7d)", "/models/{file} (cached 1d)"],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }

      // News photos — /news/tg-123.jpg → 302 to current Telegram CDN URL
      const postId = postIdFromPath(pathname);
      if (postId) {
        return await cachedResponse(request, NEWS_REDIRECT_MAX_AGE, async () => {
          const photoUrl = await resolveNewsPhotoUrl(env, postId);
          if (!photoUrl) return new Response("Telegram photo resolve failed", { status: 502 });
          const headers = new Headers();
          headers.set("Location", photoUrl);
          return new Response(null, { status: 302, headers });
        });
      }

      // Model — /models/rubert_fraud_4m_v8_int8.onnx | /models/vocab.txt
      const modelMatch = pathname.match(/^\/models\/([^/]+)$/);
      if (modelMatch && MODEL_FILES.has(modelMatch[1])) {
        return await cachedResponse(request, 86400, () => fetchModel(env, modelMatch[1]));
      }

      return new Response("Not found", { status: 404 });
    } catch (e) {
      console.error("trustnode-assets error:", (e as Error).message);
      return new Response("Internal error", { status: 500 });
    }
  },

  /** Hourly warm-up: fill redirect cache for all news ids (budget-limited so
   *  the free-plan subrequest cap is never hit). Cache hits are skipped, so
   *  this also re-resolves anything that expired within the last 7 days. */
  async scheduled(_event: ScheduledController, env: Env): Promise<void> {
    const base = "https://trustnode-assets.yellowwhale2008.workers.dev";
    let budget = RESOLVE_BUDGET;
    let filled = 0;
    let skipped = 0;

    for (const postId of NEWS_IDS) {
      if (budget <= 0) break;
      const key = cacheKey(new Request(`${base}/news/tg-${postId}.jpg`));
      if (await caches.default.match(key)) {
        skipped++;
        continue;
      }
      budget--;
      const photoUrl = await resolveNewsPhotoUrl(env, postId);
      if (!photoUrl) continue;
      const headers = new Headers();
      headers.set("Location", photoUrl);
      headers.set("Cache-Control", `public, max-age=${NEWS_REDIRECT_MAX_AGE}`);
      headers.set("Access-Control-Allow-Origin", "*");
      await caches.default.put(key, new Response(null, { status: 302, headers }));
      filled++;
    }

    console.log(`scheduled warm: filled=${filled} skipped=${skipped} budgetLeft=${budget}`);
  },
};