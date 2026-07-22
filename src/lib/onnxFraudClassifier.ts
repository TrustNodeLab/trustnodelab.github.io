// Import the wasm-only build (no webgl/webgpu backends) to keep the bundle small.
import * as ort from "onnxruntime-web/wasm";
import { tokenize } from "./wordpieceTokenizer";

// NOTE: InfinityFree enforces a 10 MB per-file limit at the filesystem level.
// The .wasm binary (~13 MB) exceeds this, so it's gzipped (3.3 MB, within
// the limit) and decompressed in-browser before being handed to ORT.
// The .mjs loader (24 KB) is self-hosted on InfinityFree (GitHub raw serves
// .mjs as text/plain, which browsers reject for ES modules).
//
// The model (~28 MB) and vocab.txt (~1 MB) also exceed 10 MB, so they're
// hosted on raw.githubusercontent.com (no per-file cap, has CORS headers).
const baseUrl = (typeof window !== 'undefined' && (window as any).__base) || './';
ort.env.wasm.wasmPaths = {
  mjs: baseUrl + 'models/ort/ort-wasm-simd-threaded.mjs',
  wasm: "placeholder",
};
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.wasm.simd = true;

// GitHub Pages: serve model from same origin (no CORS, no rate limits).
// InfinityFree: use raw.githubusercontent.com (28 MB > 10 MB per-file limit).
const base = (typeof window !== 'undefined' && (window as any).__base) || '';
const isGitHubPages = base.includes('github.io');
const MODEL_URL = process.env.NODE_ENV === 'production'
  ? (isGitHubPages ? base + 'models/rubert_fraud_merged_int8.onnx' : "https://raw.githubusercontent.com/MishaPitolin/mishapitolin.github.io/main/models/rubert_fraud_merged_int8.onnx")
  : (base || './') + 'models/rubert_fraud_merged_int8.onnx';


// IMPORTANT: verify this against your training/export code (id2label).
// Assumed here: index 0 = SAFE/NOT_FRAUD, index 1 = FRAUD.
// If real results look inverted (safe texts scoring as fraud and vice versa),
// flip FRAUD_INDEX to 0.
const FRAUD_INDEX = 1;
const SAFE_INDEX = FRAUD_INDEX === 1 ? 0 : 1;

let sessionPromise: Promise<ort.InferenceSession> | null = null;

async function decompressGzip(buffer: ArrayBuffer): Promise<ArrayBuffer> {
  const stream = new Blob([buffer]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Response(stream).arrayBuffer();
}

async function prepareWasmPaths(): Promise<void> {
  if (ort.env.wasm.wasmPaths?.wasm?.startsWith?.("blob:")) return;
  const base = (typeof window !== 'undefined' && (window as any).__base) || './';
  const url = (process.env.NODE_ENV === 'production' ? base : base) + 'models/ort/ort-wasm-simd-threaded.wasm.gz';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch wasm archive: ${res.status}`);
  const decompressed = await decompressGzip(await res.arrayBuffer());
  const blob = new Blob([decompressed], { type: "application/wasm" });
  ort.env.wasm.wasmPaths!.wasm = URL.createObjectURL(blob);
}

function getSession(): Promise<ort.InferenceSession> {
  if (!sessionPromise) {
    sessionPromise = (async () => {
      await prepareWasmPaths();
      return ort.InferenceSession.create(MODEL_URL, {
        executionProviders: ["wasm"],
        graphOptimizationLevel: "basic",
      });
    })().catch((err) => {
      console.error("[TrustNode ONNX] Session creation failed:", err);
      sessionPromise = null;
      throw err;
    });
  }
  return sessionPromise;
}

export interface FraudClassification {
  fraudProbability: number; // 0..100
  safeProbability: number; // 0..100
  tokens: string[];
  logits: [number, number];
}

function softmax2(a: number, b: number): [number, number] {
  const max = Math.max(a, b);
  const ea = Math.exp(a - max);
  const eb = Math.exp(b - max);
  const sum = ea + eb;
  return [ea / sum, eb / sum];
}

/**
 * Runs real, local, in-browser inference of rubert_fraud_int8.onnx on the
 * given text. No network request is made with the text itself - everything
 * happens on-device via WebAssembly.
 */
export async function classifyText(text: string): Promise<FraudClassification> {
  const session = await getSession();
  const { inputIds, attentionMask, tokenTypeIds, tokens, seqLength } = await tokenize(text, 128);

  const feeds: Record<string, ort.Tensor> = {
    input_ids: new ort.Tensor("int64", inputIds, [1, seqLength]),
    attention_mask: new ort.Tensor("int64", attentionMask, [1, seqLength]),
  };

  const output = await session.run(feeds);
  const logitsTensor = output["logits"];
  const data = logitsTensor.data as Float32Array;

  const safeLogit = data[SAFE_INDEX];
  const fraudLogit = data[FRAUD_INDEX];
  const [safeProb, fraudProb] = softmax2(safeLogit, fraudLogit);

  return {
    fraudProbability: fraudProb * 100,
    safeProbability: safeProb * 100,
    tokens,
    logits: [safeLogit, fraudLogit],
  };
}

/** Preloads the model + wasm runtime ahead of time (e.g. when a tester UI mounts). */
export function preloadClassifier(): void {
  getSession().catch(() => {
    // Swallow here; classifyText() will surface the error when actually invoked.
  });
}
