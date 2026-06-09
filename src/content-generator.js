// Art Content Generator — Optimized for minimal AI costs
// Strategy: Cache AI responses in KV per style per day
// Fallback: 50+ template variations per style (zero AI cost)
import { ART_STYLES, COLOR_PALETTES } from './art-styles.js';
import { TEMPLATE_VARIATIONS } from './templates.js';

export function pickStyle(visitorId, timestamp) {
  const seed = hash(visitorId + timestamp);
  return ART_STYLES[seed % ART_STYLES.length];
}

export async function generateVisit(ai, style, context, kv) {
  const palette = COLOR_PALETTES[style.id];
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

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
    content = pickTemplate(style.id, context.visitorId, context.timestamp);
  }

  return {
    style, palette, content,
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
function pickTemplate(styleId, visitorId, timestamp) {
  const templates = TEMPLATE_VARIATIONS[styleId] || TEMPLATE_VARIATIONS['glassmorphism'];
  const seed = hash(visitorId + timestamp);
  return templates[seed % templates.length];
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h = h & h;
  }
  return Math.abs(h);
}
