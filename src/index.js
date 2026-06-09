// AI Art Landing Page — Entry point
import { generateHTML } from './renderer.js';
import { pickStyle } from './content-generator.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // PWA Manifest
    if (url.pathname === '/manifest.json') {
      return new Response(JSON.stringify({
        name: 'Art Experiment',
        short_name: 'Art',
        description: 'A generative art experience — every visit shows something different',
        start_url: '/',
        display: 'standalone',
        background_color: '#0a0a0f',
        theme_color: '#0a0a0f',
        icons: [{
          src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>",
          sizes: 'any',
          type: 'image/svg+xml'
        }]
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // Favicon
    if (url.pathname === '/favicon.ico') {
      return new Response(null, { status: 301, headers: { 'Location': "/favicon.svg" } });
    }
    if (url.pathname === '/favicon.svg') {
      return new Response(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>`, {
        headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' },
      });
    }

    // Static assets — return 404
    if (url.pathname.startsWith('/_assets')) {
      return new Response(null, { status: 404 });
    }

    // Analytics API
    if (url.pathname === '/api/stats') {
      const stats = await getStats(env.VISITORS);
      return new Response(JSON.stringify(stats), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
      });
    }

    // Analytics Dashboard
    if (url.pathname === '/stats' || url.pathname === '/dashboard') {
      return new Response(getDashboardHTML(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const ua = request.headers.get('user-agent') || '';
    const visitorId = getVisitorId(request);
    const country = request.cf?.country || 'XX';
    const timestamp = Date.now();

    // Track visitor (skip bots)
    const isBot = /bot|crawler|spider|lighthouse|gtmetrix|headless/i.test(ua);
    const visitorCount = isBot ? 0 : await trackVisitor(env.VISITORS, visitorId, country);

    // Generate unique experience (skip AI for bots)
    const style = pickStyle(visitorId, timestamp);
    if (!isBot) await trackStyle(env.VISITORS, style.id);
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
        'Link': '</manifest.json>; rel="manifest"',
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
    // Track country
    if (country && country !== 'XX') {
      const countryKey = `country:${country}`;
      const c = await kv.get(countryKey);
      await kv.put(countryKey, String(c ? parseInt(c) + 1 : 1), { expirationTtl: 86400 * 30 });
    }
    return n;
  }

  const count = await kv.get('total_visitors');
  return count ? parseInt(count) : 1;
}

// Track which art style was served
async function trackStyle(kv, styleId) {
  try {
    const key = `style:${styleId}`;
    const c = await kv.get(key);
    await kv.put(key, String(c ? parseInt(c) + 1 : 1), { expirationTtl: 86400 * 30 });
  } catch { /* ignore */ }
}

// Get analytics stats
async function getStats(kv) {
  const total = await kv.get('total_visitors');
  const aiCalls = await kv.get(`ai_calls:${new Date().toISOString().split('T')[0]}`);
  // Get style stats
  const styleIds = ['cyberpunk','brutalist','glassmorphism','retro-pixel','editorial','minimal-jp','vaporwave','organic','space','pop-art','terminal','watercolor'];
  const styles = {};
  for (const id of styleIds) {
    const c = await kv.get(`style:${id}`);
    if (c) styles[id] = parseInt(c);
  }
  // Get top countries
  // (KV doesn't support listing by prefix easily, so we track top 5 manually)
  return {
    total_visitors: total ? parseInt(total) : 0,
    ai_calls_today: aiCalls ? parseInt(aiCalls) : 0,
    styles,
    timestamp: Date.now(),
  };
}

// Analytics dashboard HTML
function getDashboardHTML() {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Analytics — Art Experiment</title><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0a0f;color:#e0e0ff;font-family:system-ui,sans-serif;min-height:100vh;padding:2rem}
h1{font-size:1.8rem;margin-bottom:0.5rem}
.sub{color:#606080;margin-bottom:2rem}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem}
.card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:1rem;padding:1.5rem}
.card h3{font-size:0.7rem;text-transform:uppercase;letter-spacing:2px;color:#606080;margin-bottom:0.5rem}
.card .val{font-size:2rem;font-weight:700;color:#fff}
.card .bar{height:4px;background:rgba(255,255,255,0.06);border-radius:2px;margin-top:0.8rem;overflow:hidden}
.card .bar-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#6366f1,#8b5cf6);transition:width 1s}
table{width:100%;border-collapse:collapse;margin-top:1rem}
th,td{text-align:left;padding:0.8rem;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.85rem}
th{color:#606080;font-size:0.7rem;text-transform:uppercase;letter-spacing:1px}
tr:hover td{background:rgba(255,255,255,0.02)}
.refresh{display:inline-block;margin-top:1rem;padding:0.5rem 1rem;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:2rem;color:#e0e0ff;text-decoration:none;font-size:0.8rem;cursor:pointer}
.refresh:hover{background:rgba(255,255,255,0.1)}
</style></head><body>
<h1>📊 Analytics</h1>
<p class="sub">Art Experiment — Live stats</p>
<div class="grid">
  <div class="card"><h3>Total Visitors</h3><div class="val" id="total">—</div></div>
  <div class="card"><h3>AI Calls Today</h3><div class="val" id="ai">—</div></div>
  <div class="card"><h3>Styles Served</h3><div class="val" id="styles-count">12</div></div>
</div>
<h2 style="font-size:1rem;margin-bottom:0.5rem">Style Popularity</h2>
<table><thead><tr><th>Style</th><th>Visitors</th><th>Share</th></tr></thead><tbody id="style-rows"><tr><td colspan="3">Loading...</td></tr></tbody></table>
<a class="refresh" onclick="load()">↻ Refresh</a>
<script>
async function load(){
  try{
    const r=await fetch('/api/stats');
    const d=await r.json();
    document.getElementById('total').textContent=d.total_visitors.toLocaleString();
    document.getElementById('ai').textContent=d.ai_calls_today;
    const styles=d.styles||{};
    const total=Object.values(styles).reduce((a,b)=>a+b,0);
    const rows=Object.entries(styles).sort((a,b)=>b[1]-a[1]).map(([name,count])=>{
      const pct=total>0?Math.round(count/total*100):0;
      return '<tr><td>'+name+'</td><td>'+count.toLocaleString()+'</td><td><div class="div" style="display:flex;align-items:center;gap:0.5rem"><div class="bar" style="flex:1"><div class="bar-fill" style="width:'+pct+'%"></div></div><span style="font-size:0.7rem;color:#606080">'+pct+'%</span></div></td></tr>';
    }).join('');
    document.getElementById('style-rows').innerHTML=rows||'<tr><td colspan="3">No data yet</td></tr>';
  }catch(e){console.error(e);}
}
load();
setInterval(load,30000);
</script>
</body></html>`;
}
