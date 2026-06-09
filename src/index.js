// AI Dynamic Landing Page v2 — Completely different art style on every visit
import { generateHTML } from './renderer.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/_assets') || url.pathname === '/favicon.ico') {
      return fetch(request);
    }

    const visitorId = getVisitorId(request);
    const country = request.cf?.country || 'XX';
    const timestamp = Date.now();

    // Track visitor
    const visitorCount = await trackVisitor(env.VISITORS, visitorId, country);

    // Generate completely unique experience
    const html = await generateHTML(env.AI, {
      visitorId,
      visitorCount,
      country,
      timestamp,
    });

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Visitor-Id': visitorId.substring(0, 8),
      },
    });
  },
};

function getVisitorId(request) {
  const ua = request.headers.get('user-agent') || '';
  const lang = request.headers.get('accept-language') || '';
  const ip = request.headers.get('cf-connecting-ip') || '';
  return simpleHash(`${ip}-${ua}-${lang}`);
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function isBot(ua) {
  return /bot|crawler|spider|lighthouse|gtmetrix/i.test(ua);
}

async function trackVisitor(kv, visitorId, country) {
  // Rate limit KV writes to save free tier
  const visitorKey = `v:${visitorId}`;
  const lastVisit = await kv.get(visitorKey);
  
  // Only count if not visited in last 5 minutes
  const now = Date.now();
  if (!lastVisit || now - parseInt(lastVisit) > 300000) {
    await kv.put(visitorKey, String(now), { expirationTtl: 3600 });
    
    // Increment counter
    const count = await kv.get('total_visitors');
    const newCount = count ? parseInt(count) + 1 : 1;
    await kv.put('total_visitors', String(newCount));
    return newCount;
  }
  
  const count = await kv.get('total_visitors');
  return count ? parseInt(count) : 1;
}
