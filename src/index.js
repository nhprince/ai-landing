// AI Dynamic Landing Page - Cloudflare Workers
// Every visitor gets a unique AI-generated experience

import { generateLandingContent } from './ai-generator.js';
import { getPageTemplate } from './template.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Skip static assets
    if (url.pathname.startsWith('/_assets') || url.pathname === '/favicon.ico') {
      return fetch(request);
    }

    // Get visitor fingerprint for unique experience
    const visitorId = getVisitorId(request);
    const country = request.cf?.country || 'XX';
    const isBot = isLikelyBot(request.headers.get('user-agent') || '');

    // Track visitor in KV
    const visitorCount = await trackVisitor(env.VISITORS, visitorId, country);

    // Generate unique AI content for this visitor
    const aiContent = await generateLandingContent(env.AI, {
      visitorId,
      visitorCount,
      country,
      url: url.pathname,
      timestamp: Date.now(),
    });

    // Render the page
    const html = getPageTemplate({
      ...aiContent,
      visitorCount,
      visitorId: visitorId.substring(0, 8),
      country,
    });

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Visitor-Id': visitorId.substring(0, 8),
        'X-Visitor-Count': String(visitorCount),
      },
    });
  },
};

// Generate a unique visitor ID from request fingerprint
function getVisitorId(request) {
  const ua = request.headers.get('user-agent') || '';
  const lang = request.headers.get('accept-language') || '';
  const ip = request.headers.get('cf-connecting-ip') || '';
  const raw = `${ip}-${ua}-${lang}`;
  return simpleHash(raw);
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function isLikelyBot(ua) {
  const bots = ['bot', 'crawler', 'spider', 'scraper', 'lighthouse', 'gtmetrix'];
  return bots.some(b => ua.toLowerCase().includes(b));
}

// Track visitor in KV and return total count
async function trackVisitor(kv, visitorId, country) {
  const today = new Date().toISOString().split('T')[0];
  const key = `visitor:${today}:${visitorId}`;
  const countKey = `count:${today}`;

  // Mark this visitor as seen
  await kv.put(key, JSON.stringify({ country, time: Date.now() }), { expirationTtl: 86400 });

  // Increment daily counter
  const current = await kv.get(countKey);
  const count = current ? parseInt(current) + 1 : 1;
  await kv.put(countKey, String(count), { expirationTtl: 86400 });

  // Get all-time count
  const allTime = await kv.get('alltime_count');
  const allTimeCount = allTime ? parseInt(allTime) + 1 : 1;
  await kv.put('alltime_count', String(allTimeCount));

  return allTimeCount;
}
