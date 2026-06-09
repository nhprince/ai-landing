// AI Art Landing Page — Entry point
import { generateHTML } from './renderer.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/_assets') || url.pathname === '/favicon.ico') {
      return fetch(request);
    }

    const ua = request.headers.get('user-agent') || '';
    const visitorId = getVisitorId(request);
    const country = request.cf?.country || 'XX';
    const timestamp = Date.now();

    // Track visitor (skip bots)
    const isBot = /bot|crawler|spider|lighthouse|gtmetrix|headless/i.test(ua);
    const visitorCount = isBot ? 0 : await trackVisitor(env.VISITORS, visitorId, country);

    // Generate unique experience (skip AI for bots)
    const html = isBot
      ? getStaticResponse()
      : await generateHTML(env.AI, { visitorId, visitorCount, country, timestamp }, env.VISITORS);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': isBot ? 'public, max-age=3600' : 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Referrer-Policy': 'no-referrer',
        'Content-Security-Policy': "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; script-src 'self' 'unsafe-inline'",
        'X-Visitor-Id': visitorId.substring(0, 8),
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  },
};

function getVisitorId(request) {
  const ua = request.headers.get('user-agent') || '';
  const lang = request.headers.get('accept-language') || '';
  const ip = request.headers.get('cf-connecting-ip') || '';
  return hash(`${ip}-${ua}-${lang}`);
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h = h & h;
  }
  return Math.abs(h).toString(36);
}

async function trackVisitor(kv, visitorId, country) {
  const key = `v:${visitorId}`;
  const last = await kv.get(key);
  const now = Date.now();

  if (!last || now - parseInt(last) > 300000) {
    await kv.put(key, String(now), { expirationTtl: 3600 });
    const count = await kv.get('total_visitors');
    const n = count ? parseInt(count) + 1 : 1;
    await kv.put('total_visitors', String(n));
    return n;
  }

  const count = await kv.get('total_visitors');
  return count ? parseInt(count) : 1;
}

// Static response for bots (no AI cost)
function getStaticResponse() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Art Experiment</title></head><body><h1>Art Experiment</h1><p>A generative art project powered by Cloudflare Workers AI.</p></body></html>`;
}
