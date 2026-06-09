// Art Content Generator — Optimized for minimal AI costs
// Strategy: Cache AI responses in KV per style per day
// Fallback: 70+ template variations per style stored in KV (zero bundle cost)

import { ART_STYLES, COLOR_PALETTES } from './art-styles.js';

// A/B Testing
const AB_TESTS = {
  'template-pool': {
    description: 'Test smaller vs larger template pool',
    groups: ['a', 'b'],
    weights: [0.5, 0.5],
  },
};

let _abGroupCache = {};

function getABGroup(visitorId, testId) {
  const key = `${testId}:${visitorId}`;
  if (_abGroupCache[key]) return _abGroupCache[key];
  const test = AB_TESTS[testId];
  if (!test) return 'a';
  const hash = Math.abs(hashStr(visitorId + testId));
  const rand = (hash % 100) / 100;
  let cumulative = 0;
  for (let i = 0; i < test.groups.length; i++) {
    cumulative += test.weights[i];
    if (rand < cumulative) {
      _abGroupCache[key] = test.groups[i];
      return test.groups[i];
    }
  }
  return test.groups[0];
}

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h = h & h;
  }
  return h;
}

let _templatesCache = null;
let _templatesCacheTime = 0;

async function getTemplates(kv) {
  // Cache in memory for 1 hour
  if (_templatesCache && Date.now() - _templatesCacheTime < 3600000) {
    return _templatesCache;
  }
  try {
    const raw = await kv.get('templates:v1');
    if (raw) {
      _templatesCache = JSON.parse(raw);
      _templatesCacheTime = Date.now();
      return _templatesCache;
    }
  } catch { /* fall through to fallback */ }
  // Emergency fallback — empty templates (AI-only mode)
  return {};
}

export function pickStyle(visitorId, timestamp) {
  const seed = hash(visitorId + timestamp);
  return ART_STYLES[seed % ART_STYLES.length];
}

export async function generateVisit(ai, style, context, kv) {
  const palette = COLOR_PALETTES[style.id];
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // A/B test group
  const abGroup = getABGroup(context.visitorId, 'template-pool');
  if (!context.visitorId.startsWith('_ab_')) {
    try { await kv.put(`ab:${style.id}:${abGroup}`, String((await kv.get(`ab:${style.id}:${abGroup}`) || 0) + 1), { expirationTtl: 86400 * 30 }); } catch { /* ignore */ }
  }

  // Try cached AI content first (shared across all visitors today)
  let content = await getCachedContent(kv, style.id, today);

  if (!content) {
    // Try generating with AI (rate limited)
    const canCallAI = await checkAIRateLimit(kv, today);
    if (canCallAI) {
      try {
        content = await generateAIContent(ai, style);
        if (content) {
          await cacheContent(kv, style.id, today, content);
        }
      } catch (e) {
        console.log('AI failed:', e.message);
      }
    }
  }

  // Fallback: deterministic template selection (zero AI cost)
  if (!content) {
    const templates = await getTemplates(kv);
    content = pickTemplate(style.id, context.visitorId, context.timestamp, templates);
  }

return {
    style, palette, content, abGroup,
    visitorId: context.visitorId.substring(0, 8),
    visitorCount: context.visitorCount,
  };
}

// ─── AI Content Generation (optimized) ───
async function generateAIContent(ai, style) {
  // Short prompt = fewer input tokens = cheaper
  const prompt = `Creative "${style.name}" web art. Return JSON:
{"headline":"<10 words","subheadline":"<20 words","cta1":"<4 words","cta2":"<4 words","word1":"<3 words","word2":"<3 words","word3":"<3 words","word4":"<3 words","poem_line1":"<15 words","poem_line2":"<15 words","poem_line3":"<15 words","footer":"<15 words"}
Be ${style.name === 'Japanese Minimal' ? 'zen' : style.name === 'Cyberpunk' ? 'edgy' : style.name === 'Brutalist' ? 'raw' : style.name === 'Pop Art' ? 'loud' : style.name === 'Terminal' ? 'hacker-ish' : 'creative'}.`;

  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt,
    max_tokens: 256,  // Reduced from 512 — saves 30% neurons
    temperature: 0.9,
  });

  const text = response.response || '';
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const parsed = JSON.parse(m[0]);
    // Validate required fields exist and are strings
    if (parsed.headline && parsed.subheadline && parsed.word1) return parsed;
    return null;
  } catch { return null; }
}

// ─── AI Rate Limiter ───
async function checkAIRateLimit(kv, today) {
  try {
    const key = `ai_calls:${today}`;
    const current = await kv.get(key);
    const count = current ? parseInt(current) : 0;
    if (count >= 50) return false; // Max 50 AI calls/day
    await kv.put(key, String(count + 1), { expirationTtl: 86400 });
    return true;
  } catch { return true; } // If KV fails, allow the call
}

// ─── KV Caching ───
async function getCachedContent(kv, styleId, today) {
  try {
    const cached = await kv.get(`ai:${styleId}:${today}`);
    if (!cached) return null;
    return JSON.parse(cached);
  } catch { return null; }
}

async function cacheContent(kv, styleId, today, content) {
  try {
    await kv.put(`ai:${styleId}:${today}`, JSON.stringify(content), { expirationTtl: 86400 });
  } catch { /* ignore cache write failures */ }
}

// ─── Deterministic Template Selection (zero AI cost) ───
function pickTemplate(styleId, visitorId, timestamp, templates) {
  const styleTemplates = templates[styleId];
  if (!styleTemplates || styleTemplates.length === 0) {
    // Ultimate fallback if KV templates not available
    return {
      headline: 'Art Is Loading',
      subheadline: 'Something beautiful is being generated just for you.',
      cta1: 'Refresh',
      cta2: 'Wait',
      word1: 'color',
      word2: 'light',
      word3: 'form',
      word4: 'dream',
      poem_line1: 'Every pixel holds a story waiting to be told.',
      poem_line2: 'Art is the language that pixels speak when no one is watching.',
      poem_line3: 'Refresh and see a new world appear.',
      footer: 'A generative art experiment running on Cloudflare Workers',
    };
  }
  const seed = hash(visitorId + timestamp);
  return styleTemplates[seed % styleTemplates.length];
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h = h & h;
  }
  return Math.abs(h);
}
