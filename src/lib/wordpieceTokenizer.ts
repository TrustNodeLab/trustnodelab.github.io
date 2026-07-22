// Minimal BERT WordPiece tokenizer, compatible with RuBERT-tiny2's vocab.txt.
// No external deps: fetches vocab.txt once, caches it, then tokenizes text
// into input_ids / attention_mask / token_type_ids tensors of fixed length.

// NOTE: same InfinityFree 10 MB file-size limit issue as the .onnx model -
// vocab.txt (~1 MB) is under the cap so it's fine to self-host for now, but
// if you move the model to an external host, consider moving this file to
// the same place so tokenizer + model always stay in sync on one deploy.
const baseUrl = (typeof window !== 'undefined' && (window as any).__base) || './';
const VOCAB_URL = baseUrl + 'models/vocab.txt';

let vocabPromise: Promise<Map<string, number>> | null = null;
let vocabLoadFailed = false;

const CLS = "[CLS]";
const SEP = "[SEP]";
const UNK = "[UNK]";
const PAD = "[PAD]";

function buildFallbackVocab(): Map<string, number> {
  const map = new Map<string, number>();
  map.set(CLS, 0);
  map.set(SEP, 1);
  map.set(UNK, 2);
  map.set(PAD, 3);
  return map;
}

async function loadVocab(): Promise<Map<string, number>> {
  if (vocabLoadFailed) return buildFallbackVocab();
  if (!vocabPromise) {
    vocabPromise = fetch(VOCAB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch vocab.txt: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const map = new Map<string, number>();
        const lines = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
          const token = lines[i].replace(/\r$/, "");
          if (token.length === 0 && i === lines.length - 1) continue;
          map.set(token, i);
        }
        return map;
      })
      .catch((err) => {
        vocabLoadFailed = true;
        vocabPromise = null;
        console.warn("[Tokenizer] vocab.txt unavailable, using fallback:", err.message);
        return buildFallbackVocab();
      });
  }
  return vocabPromise;
}

// Basic pre-tokenization: split on whitespace, then split off punctuation as
// individual tokens, keeping word characters (including Cyrillic) together.
function basicTokenize(text: string): string[] {
  const normalized = text.trim();
  if (!normalized) return [];

  const tokens: string[] = [];
  // Split on whitespace first
  for (const chunk of normalized.split(/\s+/)) {
    if (!chunk) continue;
    // Then peel punctuation into separate tokens, keep letters/digits together.
    let current = "";
    for (const ch of chunk) {
      const isPunct = /[!-/:-@[-`{-~«»„“”—–…]/.test(ch);
      if (isPunct) {
        if (current) {
          tokens.push(current);
          current = "";
        }
        tokens.push(ch);
      } else {
        current += ch;
      }
    }
    if (current) tokens.push(current);
  }
  return tokens;
}

function wordpieceTokenize(word: string, vocab: Map<string, number>): string[] {
  const pieces: string[] = [];
  let start = 0;
  const chars = Array.from(word);

  if (chars.length === 0) return pieces;

  while (start < chars.length) {
    let end = chars.length;
    let matched: string | null = null;
    while (start < end) {
      let candidate = chars.slice(start, end).join("");
      if (start > 0) candidate = "##" + candidate;
      if (vocab.has(candidate)) {
        matched = candidate;
        break;
      }
      end--;
    }
    if (matched === null) {
      return [UNK];
    }
    pieces.push(matched);
    start = end;
  }
  return pieces;
}

export interface TokenizedInput {
  inputIds: BigInt64Array;
  attentionMask: BigInt64Array;
  tokenTypeIds: BigInt64Array;
  tokens: string[]; // human-readable wordpieces (excluding special tokens), for UI display
  seqLength: number;
}

/**
 * Tokenizes text for the rubert_fraud_int8.onnx model.
 * Produces fixed-length (maxLength) int64 tensors as required by the model's
 * static input shape [batch, 128].
 */
export async function tokenize(text: string, maxLength = 128): Promise<TokenizedInput> {
  const vocab = await loadVocab();

  const words = basicTokenize(text.toLowerCase() === text ? text : text); // preserve case: cased vocab
  const wordpieces: string[] = [];
  for (const w of words) {
    wordpieces.push(...wordpieceTokenize(w, vocab));
  }

  const maxTokens = maxLength - 2; // room for [CLS] and [SEP]
  const truncated = wordpieces.slice(0, maxTokens);

  const finalTokens = [CLS, ...truncated, SEP];
  const padCount = maxLength - finalTokens.length;

  const inputIds = new BigInt64Array(maxLength);
  const attentionMask = new BigInt64Array(maxLength);
  const tokenTypeIds = new BigInt64Array(maxLength); // all zeros: single-segment input

  const padId = BigInt(vocab.get(PAD) ?? 0);
  const unkId = BigInt(vocab.get(UNK) ?? 0);

  for (let i = 0; i < maxLength; i++) {
    if (i < finalTokens.length) {
      const tok = finalTokens[i];
      const id = vocab.get(tok);
      inputIds[i] = id !== undefined ? BigInt(id) : unkId;
      attentionMask[i] = 1n;
    } else {
      inputIds[i] = padId;
      attentionMask[i] = 0n;
    }
    tokenTypeIds[i] = 0n;
  }

  return {
    inputIds,
    attentionMask,
    tokenTypeIds,
    tokens: truncated,
    seqLength: maxLength,
  };
  // padCount kept for clarity/debugging if needed later
  void padCount;
}
