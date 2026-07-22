var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_compression = __toESM(require("compression"), 1);
var import_express_rate_limit = require("express-rate-limit");
var import_validator = __toESM(require("validator"), 1);
var import_meta = {};
import_dotenv.default.config();
var __dirnameVar = typeof __dirname !== "undefined" ? __dirname : import_path.default.dirname((0, import_url.fileURLToPath)(import_meta.url));
var ROOT_DIR = import_fs.default.existsSync(import_path.default.join(__dirnameVar, "package.json")) ? __dirnameVar : import_path.default.dirname(__dirnameVar);
var DB_FILE = import_path.default.join(ROOT_DIR, "waitlist_db.json");
function initDb() {
  try {
    if (!import_fs.default.existsSync(DB_FILE)) {
      import_fs.default.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf8");
      console.log(`[TrustNode Database] Created empty waitlist database at ${DB_FILE}`);
    } else {
      console.log(`[TrustNode Database] Loaded existing database from ${DB_FILE}`);
    }
  } catch (error) {
    console.error("[TrustNode Database] Failed to initialize local JSON database:", error);
  }
}
initDb();
async function readWaitlist() {
  try {
    const data = await import_fs.default.promises.readFile(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("[TrustNode Database] Error reading database, returning empty array", err);
    return [];
  }
}
async function writeWaitlist(entries) {
  try {
    await import_fs.default.promises.writeFile(DB_FILE, JSON.stringify(entries, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[TrustNode Database] Error writing database", err);
    return false;
  }
}
function adminAuth(req, res, next) {
  try {
    const providedKey = req.headers["x-admin-key"];
    const secretKey = process.env.ADMIN_KEY;
    if (!secretKey) {
      console.error("[TrustNode Security] ADMIN_KEY is not defined in server environment variables.");
      return res.status(401).json({ error: "Unauthorized: Admin authentication not configured on server" });
    }
    if (!providedKey || typeof providedKey !== "string") {
      return res.status(401).json({ error: "Unauthorized: Missing or invalid credentials" });
    }
    const keyHash = import_crypto.default.createHash("sha256").update(secretKey).digest();
    const providedHash = import_crypto.default.createHash("sha256").update(providedKey).digest();
    if (import_crypto.default.timingSafeEqual(keyHash, providedHash)) {
      return next();
    }
    return res.status(401).json({ error: "Unauthorized: Access denied" });
  } catch (error) {
    console.error("[TrustNode Security] Error in admin authorization middleware:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = process.env.PORT || 3e3;
  app.set("trust proxy", 1);
  app.use((0, import_helmet.default)({
    contentSecurityPolicy: false
  }));
  app.use((0, import_compression.default)());
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "https://trustnode.app";
  app.use((0, import_cors.default)({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      const isAllowedProd = origin === allowedOrigin;
      const isDevOrPreview = process.env.NODE_ENV !== "production" || origin.includes(".run.app") || origin.includes("localhost") || origin.includes("127.0.0.1") || origin.includes(".studio");
      if (isAllowedProd || isDevOrPreview) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "X-Admin-Key"]
  }));
  app.use(import_express.default.json());
  const waitlistLimiter = (0, import_express_rate_limit.rateLimit)({
    windowMs: 10 * 60 * 1e3,
    // 10 minutes
    max: 5,
    // limit each IP to 5 requests per 10 minutes
    message: { error: "Too many registration requests from this IP. Please try again after 10 minutes." },
    standardHeaders: true,
    legacyHeaders: false
  });
  app.get("/api/waitlist", adminAuth, async (req, res, next) => {
    try {
      const db = await readWaitlist();
      res.json(db);
    } catch (error) {
      next(error);
    }
  });
  app.get("/api/waitlist/stats", adminAuth, async (req, res, next) => {
    try {
      const db = await readWaitlist();
      const stats = {
        total: db.length,
        tiers: { free: 0, standard: 0, vip: 0 },
        os: { Android: 0, iOS: 0 },
        cpus: {},
        recentActivity: db.slice(-10).reverse()
      };
      db.forEach((entry) => {
        const tierKey = (entry.tier || "standard").toLowerCase();
        if (stats.tiers[tierKey] !== void 0) {
          stats.tiers[tierKey]++;
        } else {
          stats.tiers.standard++;
        }
        const osKey = entry.os === "iOS" || entry.os?.toLowerCase().includes("ios") ? "iOS" : "Android";
        stats.os[osKey]++;
        const cpuName = entry.cpu || "Unknown";
        stats.cpus[cpuName] = (stats.cpus[cpuName] || 0) + 1;
      });
      res.json(stats);
    } catch (error) {
      next(error);
    }
  });
  app.post("/api/waitlist", waitlistLimiter, async (req, res, next) => {
    try {
      const { contactInfo, email, role, tier, os, cpu } = req.body;
      const rawContact = contactInfo || email;
      if (typeof rawContact !== "string") {
        return res.status(400).json({ error: "Contact handle must be a string value." });
      }
      const trimmedContact = rawContact.trim();
      if (trimmedContact === "") {
        return res.status(400).json({ error: "Contact handle cannot be empty or whitespace only." });
      }
      if (trimmedContact.length > 255) {
        return res.status(400).json({ error: "Contact handle is too long (maximum 255 characters)." });
      }
      const escapedContact = import_validator.default.escape(trimmedContact);
      const selectedTier = tier || role || "standard";
      const selectedOs = os || "Android";
      const selectedCpu = cpu || "Unknown";
      const randNum = Math.floor(1e3 + Math.random() * 9e3);
      const generatedTicket = `TN-2026-${selectedTier.toUpperCase()}-${selectedOs[0].toUpperCase()}${selectedCpu[0].toUpperCase()}-${randNum}`;
      const db = await readWaitlist();
      const duplicate = db.find((e) => e.contactInfo.toLowerCase() === escapedContact.toLowerCase());
      if (duplicate) {
        return res.json({
          success: true,
          token: duplicate.id
        });
      }
      const newEntry = {
        id: generatedTicket,
        contactInfo: escapedContact,
        tier: selectedTier,
        os: selectedOs,
        cpu: selectedCpu,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      db.push(newEntry);
      const saved = await writeWaitlist(db);
      if (!saved) {
        throw new Error("Database write operation failed");
      }
      console.log(`[TrustNode Server] New registration saved successfully: ${escapedContact} (${selectedTier}) -> Token ${generatedTicket}`);
      res.json({ success: true, token: generatedTicket });
    } catch (error) {
      next(error);
    }
  });
  app.delete("/api/waitlist/:id", adminAuth, async (req, res, next) => {
    try {
      const { id } = req.params;
      const db = await readWaitlist();
      const filtered = db.filter((e) => e.id !== id);
      if (db.length === filtered.length) {
        return res.status(404).json({ error: "Record not found" });
      }
      await writeWaitlist(filtered);
      res.json({ success: true, message: "Record deleted successfully" });
    } catch (error) {
      next(error);
    }
  });
  app.use((req, res, next) => {
    if (req.path.endsWith(".onnx")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
    next();
  });
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(ROOT_DIR, "dist");
    app.use(import_express.default.static(distPath, {
      // Vite's build output files inside /assets are content-hashed
      // (e.g. index-a1b2c3.js), so it's always safe to cache them for a
      // full year: if the content changes, the filename changes with it.
      // index.html itself is NOT hashed, so it must stay revalidated on
      // every request or users could get stuck on a stale build.
      setHeaders: (res, filePath) => {
        if (filePath.includes(`${import_path.default.sep}assets${import_path.default.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          res.setHeader("Cache-Control", "no-cache");
        }
      }
    }));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"), (err) => {
        if (err) {
          res.status(404).send("TrustNode client application not built yet. Run `npm run build`.");
        }
      });
    });
  }
  app.use((err, req, res, next) => {
    console.error("[TrustNode Server Error Handler]:", err);
    res.status(500).json({ error: "An unexpected internal server error occurred" });
  });
  if (process.env.NODE_ENV !== "test") {
    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`[TrustNode Server] Running on http://0.0.0.0:${PORT}`);
    });
  }
  return app;
}
startServer();
//# sourceMappingURL=server.cjs.map
