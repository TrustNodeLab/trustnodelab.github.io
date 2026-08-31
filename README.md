# TrustNode — On-Device Anti-Fraud & Spam Shield

Local AI protection against scammers, spam, and phishing on Android.

**[trustnodelab.github.io](https://trustnodelab.github.io)**

## Run Locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # dist/
npm run lint       # tsc --noEmit
```

## Deploy

Push to `master` — GitHub Actions builds and deploys to `gh-pages` branch automatically.

## Cloudflare Assets Worker

News photos and the on-device ML model are NOT hosted on GitHub Pages — they
are served by a single Cloudflare Worker (`workers/assets`), which pins each
Telegram post photo forever and proxies the ruBERT ONNX model from R2.

```bash
cd workers/assets
npm install
npx wrangler login

# 1. Model → R2 (recommended): create bucket "trustnode-models",
#    uncomment r2_buckets in wrangler.toml, then:
npx wrangler r2 object put trustnode-models/models/rubert_fraud_merged_int8.onnx --file=model/rubert_fraud_merged_int8.onnx
npx wrangler r2 object put trustnode-models/models/vocab.txt --file=model/vocab.txt

npx wrangler deploy
```

Then set the GitHub repository variable (Settings → Secrets and variables →
Actions → Variables):

```
VITE_ASSETS_URL = https://trustnode-assets.<account>.workers.dev
```

The next `master` push will build the site with news images and the model
served through the worker.

## Stack

- React 19 + TypeScript
- Vite 6 + Tailwind CSS 4
- Three.js (cinematic intro)
- Framer Motion (animations)
- 11 languages (ru, en, tr, es, zh, hi, ar, pt, fr, de, ja)

## License

Proprietary — TrustNode Lab.
