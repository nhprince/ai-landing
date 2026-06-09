// HTML Renderer — Generates completely different HTML/CSS/JS per art style
import { pickStyle, generateVisit } from './content-generator.js';

export async function generateHTML(ai, context) {
  const style = pickStyle(context.visitorId, context.timestamp);
  const visit = await generateVisit(ai, style, context);
  return renderPage(visit);
}

function renderPage(visit) {
  const { style, palette, fonts, content, visitorId, visitorCount } = visit;
  const renderFn = STYLE_RENDERERS[style.id] || STYLE_RENDERERS['glassmorphism'];
  return renderFn(palette, fonts, content, visitorId, visitorCount);
}

// ═══════════════════════════════════════════════════════════════
// 12 COMPLETELY DIFFERENT RENDERERS — One per art style
// ═══════════════════════════════════════════════════════════════

const STYLE_RENDERERS = {

  // ═══════════════════════════════════════════════════════════
  // 1. CYBERPUNK NEON
  // ═══════════════════════════════════════════════════════════
  cyberpunk(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>NEO COMMERCE // ${c.headline}</title><link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Orbitron:wght@400;700;900&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:${p.bg};--p:${p.primary};--s:${p.secondary};--a:${p.accent};--t:${p.text};--m:${p.muted}}
body{background:var(--bg);color:var(--t);font-family:'Space Mono',monospace;min-height:100vh;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background:linear-gradient(transparent 50%,rgba(0,240,255,0.03) 50%);background-size:100% 4px;pointer-events:none;z-index:9999;animation:scan 8s linear infinite}
@keyframes scan{0%{transform:translateY(0)}100%{transform:translateY(20px)}}
.grid-bg{position:fixed;inset:0;background-image:linear-gradient(rgba(0,240,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.05) 1px,transparent 1px);background-size:50px 50px;pointer-events:none}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;background:rgba(10,10,15,0.8);backdrop-filter:blur(10px);border-bottom:1px solid rgba(0,240,255,0.2)}
.logo{font-family:'Orbitron',sans-serif;font-weight:900;font-size:1.2rem;color:var(--p);text-shadow:0 0 10px var(--p),0 0 20px var(--p);letter-spacing:2px}
.nav-btn{padding:0.5rem 1.5rem;border:1px solid var(--p);color:var(--p);background:transparent;font-family:'Space Mono',monospace;font-size:0.8rem;cursor:pointer;transition:all 0.3s;text-transform:uppercase;letter-spacing:1px}
.nav-btn:hover{background:var(--p);color:#000;box-shadow:0 0 20px var(--p)}
.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:6rem 4rem 4rem;gap:3rem;position:relative}
@media(max-width:768px){.hero{grid-template-columns:1fr;padding:5rem 1.5rem 3rem}}
.hero-l h1{font-family:'Orbitron',sans-serif;font-size:clamp(1.8rem,5vw,3.5rem);font-weight:900;line-height:1.1;margin-bottom:1.5rem;color:var(--p);text-shadow:0 0 30px rgba(0,240,255,0.5);animation:glitch 3s infinite}
@keyframes glitch{0%,90%,100%{transform:translate(0)}92%{transform:translate(-2px,1px)}94%{transform:translate(2px,-1px)}96%{transform:translate(-1px,2px)}98%{transform:translate(1px,-2px)}}
.hero-l p{color:var(--m);font-size:1rem;line-height:1.8;margin-bottom:2rem}
.cta-row{display:flex;gap:1rem;flex-wrap:wrap}
.btn-p{padding:0.8rem 2rem;background:var(--p);color:#000;border:none;font-family:'Orbitron',sans-serif;font-weight:700;font-size:0.85rem;cursor:pointer;transition:all 0.3s;text-transform:uppercase;letter-spacing:2px}
.btn-p:hover{box-shadow:0 0 30px var(--p);transform:translateY(-2px)}
.btn-s{padding:0.8rem 2rem;border:1px solid var(--s);color:var(--s);background:transparent;font-family:'Space Mono',monospace;font-size:0.85rem;cursor:pointer;transition:all 0.3s}
.btn-s:hover{background:var(--s);color:#000}
.hero-r{position:relative;height:400px}
.hero-r::before{content:'';position:absolute;inset:0;border:2px solid var(--p);transform:rotate(3deg);animation:pulse-border 2s ease-in-out infinite}
.hero-r::after{content:'${c.headline}';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-size:4rem;font-weight:900;color:rgba(0,240,255,0.05);writing-mode:vertical-rl}
@keyframes pulse-border{0%,100%{opacity:1;transform:rotate(3deg)}50%{opacity:0.5;transform:rotate(-3deg)}}
.features{padding:4rem;position:relative}
.features h2{font-family:'Orbitron',sans-serif;color:var(--s);font-size:1.5rem;margin-bottom:2rem;text-shadow:0 0 10px var(--s)}
.f-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem}
.f-card{padding:1.5rem;border:1px solid rgba(0,240,255,0.15);background:rgba(0,240,255,0.02);transition:all 0.3s;position:relative;overflow:hidden}
.f-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:var(--p);transform:scaleY(0);transition:transform 0.3s}
.f-card:hover::before{transform:scaleY(1)}
.f-card:hover{border-color:var(--p);box-shadow:0 0 20px rgba(0,240,255,0.1)}
.f-card h3{color:var(--p);font-size:0.9rem;margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:1px}
.f-card p{color:var(--m);font-size:0.85rem;line-height:1.6}
footer{padding:3rem 2rem;text-align:center;border-top:1px solid rgba(0,240,255,0.1);color:var(--m);font-size:0.8rem}
</style></head><body><div class="grid-bg"></div><nav><div class="logo">NEO//COMMERCE</div><div style="display:flex;gap:1rem;align-items:center"><span style="color:var(--m);font-size:0.7rem">ID:${vid}</span><a href="#features" class="nav-btn">${c.cta1}</a></div></nav><section class="hero"><div class="hero-l"><p style="color:var(--a);font-size:0.75rem;letter-spacing:3px;margin-bottom:1rem">// SYSTEM ONLINE</p><h1>${c.headline}</h1><p>${c.subheadline}</p><div class="cta-row"><a href="#features" class="btn-p">${c.cta1} →</a><a href="#features" class="btn-s">${c.cta2}</a></div></div><div class="hero-r"></div></section><section class="features" id="features"><h2>// CAPABILITIES</h2><div class="f-grid"><div class="f-card"><h3>01 ${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><h3>02 ${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><h3>03 ${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><h3>04 ${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><footer><p>${c.footer_tagline} // VISITOR #${vcount}</p></footer></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 2. BRUTALIST
  // ═══════════════════════════════════════════════════════════
  brutalist(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:system-ui,-apple-system,sans-serif;line-height:1.5}
.container{max-width:800px;margin:0 auto;padding:2rem}
@media(max-width:640px){.container{padding:1rem}}
header{border-bottom:4px solid ${p.primary};padding:1.5rem 0;margin-bottom:3rem}
h1{font-size:clamp(2rem,6vw,4rem);font-weight:900;text-transform:uppercase;letter-spacing:-2px;line-height:0.95;margin-bottom:1rem}
.tagline{font-size:1.1rem;color:${p.muted};max-width:600px;margin-bottom:2rem}
.bar{display:flex;gap:1rem;flex-wrap:wrap;align-items:center;margin-bottom:2rem}
.btn-p{padding:1rem 2rem;background:${p.primary};color:${p.bg};border:none;font-weight:900;font-size:1rem;cursor:pointer;text-transform:uppercase;transition:all 0.2s}
.btn-p:hover{transform:translate(-2px,-2px);box-shadow:4px 4px 0 ${p.secondary}}
.btn-s{padding:1rem 2rem;border:3px solid ${p.primary};color:${p.primary};background:transparent;font-weight:700;font-size:1rem;cursor:pointer;text-transform:uppercase}
.btn-s:hover{background:${p.primary};color:${p.bg}}
.numbered{list-style:none;padding:0}
.numbered li{padding:2rem 0;border-bottom:3px solid ${p.primary};display:grid;grid-template-columns:60px 1fr;gap:1.5rem;align-items:start}
@media(max-width:640px){.numbered li{grid-template-columns:40px 1fr}}
.num{font-size:2.5rem;font-weight:900;color:${p.secondary};line-height:1}
.ntitle{font-size:1.3rem;font-weight:700;margin-bottom:0.5rem}
.ndesc{color:${p.muted};font-size:1rem}
blockquote{border-left:6px solid ${p.secondary};padding:1.5rem;margin:3rem 0;font-size:1.2rem;font-style:italic;background:#f0f0f0}
cite{display:block;margin-top:1rem;font-style:normal;font-weight:700;font-size:0.9rem}
footer{border-top:4px solid ${p.primary};padding:2rem 0;margin-top:3rem;color:${p.muted};font-size:0.9rem}
</style></head><body><div class="container"><header><h1>${c.headline}</h1><p class="tagline">${c.subheadline}</p><div class="bar"><a href="#features" class="btn-p">${c.cta1}</a><a href="#features" class="btn-s">${c.cta2}</a><span style="margin-left:auto;font-size:0.8rem;color:${p.muted}">VISITOR #${vcount}</span></div></header><ol class="numbered" id="features"><li><span class="num">01</span><div><div class="ntitle">${c.feature1_title}</div><div class="ndesc">${c.feature1_desc}</div></div></li><li><span class="num">02</span><div><div class="ntitle">${c.feature2_title}</div><div class="ndesc">${c.feature2_desc}</div></div></li><li><span class="num">03</span><div><div class="ntitle">${c.feature3_title}</div><div class="ndesc">${c.feature3_desc}</div></div></li><li><span class="num">04</span><div><div class="ntitle">${c.feature4_title}</div><div class="ndesc">${c.feature4_desc}</div></div></li></ol><blockquote>"${c.testimonial_quote}"<cite>— ${c.testimonial_name}</cite></blockquote><footer><strong>${c.footer_tagline}</strong> | Built with raw HTML and zero apologies.</footer></div></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 3. GLASSMORPHISM
  // ═══════════════════════════════════════════════════════════
  glassmorphism(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:${p.bg};--p:${p.primary};--s:${p.secondary};--a:${p.accent};--t:${p.text};--m:${p.muted}}
body{background:var(--bg);color:var(--t);font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden}
.orbs{position:fixed;inset:0;pointer-events:none;overflow:hidden}
.orb{position:absolute;border-radius:50%;filter:blur(100px);opacity:0.3;animation:float 20s ease-in-out infinite}
.o1{width:500px;height:500px;background:var(--p);top:-200px;right:-100px}
.o2{width:400px;height:400px;background:var(--s);bottom:-100px;left:-100px;animation-delay:-10s}
@keyframes float{0%,100%{transform:translate(0,0)}50%{transform:translate(50px,-50px)}}
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;background:rgba(10,10,26,0.5);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.05)}
.logo{font-weight:700;font-size:1.2rem;background:linear-gradient(135deg,var(--p),#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-cta{padding:0.5rem 1.2rem;background:linear-gradient(135deg,var(--p),var(--s));color:#000;border:none;border-radius:999px;font-weight:600;font-size:0.85rem;cursor:pointer;text-decoration:none;transition:all 0.3s}
.nav-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,0.3)}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:6rem 1.5rem 4rem;position:relative}
.hero-inner{max-width:700px}
.badge{display:inline-flex;align-items:center;gap:0.5rem;padding:0.4rem 1rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:999px;font-size:0.75rem;color:var(--p);margin-bottom:2rem;backdrop-filter:blur(10px)}
h1{font-size:clamp(2.2rem,6vw,4rem);font-weight:700;line-height:1.1;letter-spacing:-1.5px;margin-bottom:1.5rem;background:linear-gradient(135deg,#fff 30%,var(--p));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sub{font-size:clamp(1rem,2.5vw,1.2rem);color:rgba(255,255,255,0.5);line-height:1.6;max-width:550px;margin:0 auto 2.5rem}
.cta-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn-p{padding:0.9rem 2rem;background:linear-gradient(135deg,var(--p),var(--s));color:#000;border:none;border-radius:999px;font-weight:700;font-size:1rem;cursor:pointer;text-decoration:none;transition:all 0.35s;display:inline-flex;align-items:center;gap:0.5rem}
.btn-p:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(99,102,241,0.35)}
.btn-s{padding:0.9rem 2rem;background:rgba(255,255,255,0.03);color:var(--t);border:1px solid rgba(255,255,255,0.08);border-radius:999px;font-weight:600;font-size:1rem;cursor:pointer;text-decoration:none;backdrop-filter:blur(10px);transition:all 0.3s}
.btn-s:hover{background:rgba(255,255,255,0.06);transform:translateY(-2px)}
.features{padding:4rem 1.5rem 6rem;max-width:1100px;margin:0 auto;position:relative}
.f-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
.f-card{padding:2rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:1.2rem;backdrop-filter:blur(10px);transition:all 0.4s}
.f-card:hover{transform:translateY(-5px);border-color:rgba(99,102,241,0.3);box-shadow:0 20px 60px rgba(0,0,0,0.3)}
.f-card h3{font-weight:600;font-size:1.1rem;margin-bottom:0.5rem;color:#fff}
.f-card p{font-size:0.9rem;color:rgba(255,255,255,0.4);line-height:1.6}
footer{text-align:center;padding:3rem 1.5rem;border-top:1px solid rgba(255,255,255,0.05);color:rgba(255,255,255,0.2);font-size:0.8rem}
@media(max-width:640px){.cta-row{flex-direction:column;align-items:center}.btn-p,.btn-s{width:100%;justify-content:center}}
</style></head><body><div class="orbs"><div class="orb o1"></div><div class="orb o2"></div></div><nav><div class="logo">✦ AutoCommerz</div><a href="#features" class="nav-cta">${c.cta1}</a></nav><section class="hero"><div class="hero-inner"><div class="badge">✦ AI-Powered Commerce</div><h1>${c.headline}</h1><p class="sub">${c.subheadline}</p><div class="cta-row"><a href="#features" class="btn-p">${c.cta1} →</a><a href="#features" class="btn-s">${c.cta2}</a></div></div></section><section class="features" id="features"><div class="f-grid"><div class="f-card"><h3>${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><h3>${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><h3>${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><h3>${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><footer><p>${c.footer_tagline} · Visitor #${vcount}</p></footer></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 4. RETRO PIXEL
  // ═══════════════════════════════════════════════════════════
  'retro-pixel'(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>★ ${c.headline} ★</title><link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
body{background:${p.bg};color:${p.text};font-family:'VT323',monospace;font-size:1.3rem;min-height:100vh}
body::before{content:'';position:fixed;inset:0;background:linear-gradient(transparent 50%,rgba(0,0,0,0.1) 50%);background-size:100% 4px;pointer-events:none;z-index:9999}
.pixel-border{border:4px solid ${p.primary};box-shadow:4px 4px 0 ${p.secondary},8px 8px 0 rgba(0,0,0,0.3)}
header{padding:1.5rem;text-align:center;background:${p.bg};border-bottom:4px solid ${p.primary}}
h1{font-family:'Press Start 2P',cursive;font-size:clamp(1rem,4vw,2rem);color:${p.primary};text-shadow:4px 4px 0 ${p.secondary};line-height:1.5;margin-bottom:1rem;animation:blink 2s infinite}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0.8}}
.sub{color:${p.muted};font-size:1.2rem}
.hero{padding:4rem 2rem;text-align:center;max-width:800px;margin:0 auto}
.hero p{color:${p.muted};line-height:1.6;margin-bottom:2rem;font-size:1.2rem}
.cta-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn-p{padding:1rem 2rem;background:${p.primary};color:${p.bg};border:4px solid ${p.primary};font-family:'Press Start 2P',cursive;font-size:0.7rem;cursor:pointer;box-shadow:4px 4px 0 #000;transition:all 0.1s;text-transform:uppercase}
.btn-p:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #000}
.btn-s{padding:1rem 2rem;background:transparent;color:${p.secondary};border:4px solid ${p.secondary};font-family:'Press Start 2P',cursive;font-size:0.7rem;cursor:pointer;box-shadow:4px 4px 0 #000}
.features{padding:3rem 2rem;max-width:1000px;margin:0 auto}
.features h2{font-family:'Press Start 2P',cursive;color:${p.accent};font-size:1rem;text-align:center;margin-bottom:2rem;text-shadow:3px 3px 0 #000}
.f-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem}
.f-card{padding:1.5rem;background:rgba(0,255,65,0.05);border:3px solid ${p.primary};transition:all 0.2s}
.f-card:hover{border-color:${p.accent};transform:translate(-2px,-2px);box-shadow:4px 4px 0 ${p.primary}}
.f-card h3{font-family:'Press Start 2P',cursive;color:${p.primary};font-size:0.6rem;margin-bottom:1rem;line-height:1.5}
.f-card p{color:${p.muted};font-size:1.1rem;line-height:1.4}
.inventory-bar{display:flex;justify-content:center;gap:0.5rem;margin:2rem 0}
.inv-slot{width:40px;height:40px;border:3px solid ${p.muted};display:flex;align-items:center;justify-content:center;font-size:1.2rem}
.inv-slot.filled{border-color:${p.primary};background:rgba(0,255,65,0.1)}
footer{text-align:center;padding:2rem;border-top:4px solid ${p.primary};color:${p.muted};font-size:1rem}
</style></head><body><header><h1>★ ${c.headline} ★</h1><p class="sub">${c.subheadline}</p></header><section class="hero"><p>${c.subheadline}</p><div class="inventory-bar"><div class="inv-slot filled">⚡</div><div class="inv-slot filled">📊</div><div class="inv-slot filled">🛡️</div><div class="inv-slot filled">🤖</div><div class="inv-slot">?</div></div><div class="cta-row"><a href="#features" class="btn-p">${c.cta1}</a><a href="#features" class="btn-s">${c.cta2}</a></div></section><section class="features" id="features"><h2>═══ INVENTORY ═══</h2><div class="f-grid"><div class="f-card"><h3>⚡ ${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><h3>📊 ${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><h3>🛡️ ${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><h3>🤖 ${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><footer><p>${c.footer_tagline} // PLAYER: ${vid} // SCORE: ${vcount}</p></footer></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 5. EDITORIAL MAGAZINE
  // ═══════════════════════════════════════════════════════════
  editorial(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Source Serif 4',serif;line-height:1.7;font-size:1.05rem}
.masthead{border-bottom:2px solid ${p.primary};padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center}
.masthead h1{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:900;letter-spacing:-0.5px}
.masthead nav a{color:${p.muted};text-decoration:none;margin-left:1.5rem;font-size:0.9rem}
.masthead nav a:hover{color:${p.primary}}
.hero{max-width:1200px;margin:0 auto;padding:4rem 2rem 3rem}
.hero-label{font-size:0.75rem;text-transform:uppercase;letter-spacing:3px;color:${p.secondary};margin-bottom:1rem}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.5rem,6vw,4.5rem);font-weight:900;line-height:1.05;letter-spacing:-1px;margin-bottom:1.5rem}
.hero h1 em{font-style:italic;color:${p.secondary}}
.hero-sub{font-size:1.2rem;color:${p.muted};max-width:600px;margin-bottom:2rem;line-height:1.6}
.cta-row{display:flex;gap:1rem;flex-wrap:wrap}
.btn-p{padding:0.8rem 2rem;background:${p.primary};color:#fff;border:none;font-weight:600;font-size:0.9rem;cursor:pointer;text-decoration:none;transition:all 0.3s}
.btn-p:hover{background:${p.secondary}}
.btn-s{padding:0.8rem 2rem;border:1px solid ${p.primary};color:${p.primary};background:transparent;font-weight:600;font-size:0.9rem;cursor:pointer;text-decoration:none}
.content{max-width:1200px;margin:0 auto;padding:2rem;display:grid;grid-template-columns:2fr 1fr;gap:3rem}
@media(max-width:768px){.content{grid-template-columns:1fr}}
.article h2{font-family:'Playfair Display',font-size:1.8rem;font-weight:700;margin-bottom:1rem}
.drop-cap::first-letter{font-family:'Playfair Display',float:left;font-size:4rem;line-height:0.8;margin-right:0.5rem;color:${p.secondary};font-weight:900}
.article p{margin-bottom:1.2rem;color:${p.text}}
.pull-quote{border-left:4px solid ${p.secondary};padding:1.5rem 2rem;margin:2rem 0;font-family:'Playfair Display',font-size:1.4rem;font-style:italic;color:${p.secondary}}
.sidebar{background:#f0ede8;padding:2rem;height:fit-content}
.sidebar h3{font-family:'Playfair Display',font-size:1.2rem;font-weight:700;margin-bottom:1rem;border-bottom:2px solid ${p.primary};padding-bottom:0.5rem}
.sidebar ul{list-style:none}
.sidebar li{padding:0.8rem 0;border-bottom:1px solid #ddd}
.sidebar li strong{display:block;font-size:0.95rem}
.sidebar li span{font-size:0.85rem;color:${p.muted}}
.testimonial{background:${p.primary};color:#fff;padding:3rem 2rem;margin:3rem 0;text-align:center}
.testimonial blockquote{font-family:'Playfair Display',font-size:1.5rem;font-style:italic;max-width:700px;margin:0 auto 1rem}
.testimonial cite{font-size:0.9rem;opacity:0.8}
footer{text-align:center;padding:3rem 2rem;border-top:2px solid ${p.primary};color:${p.muted};font-size:0.85rem}
</style></head><body><header class="masthead"><h1>AUTOCOMMERZ</h1><nav><a href="#features">Features</a><a href="#story">Story</a><a href="#testimonial">Reviews</a></nav></header><section class="hero"><div class="hero-label">Featured Story</div><h1>${c.headline}</h1><p class="hero-sub">${c.subheadline}</p><div class="cta-row"><a href="#features" class="btn-p">${c.cta1}</a><a href="#features" class="btn-s">${c.cta2}</a></div></section><div class="content"><article class="article" id="story"><h2>The Revolution in Commerce</h2><p class="drop-cap">${c.subheadline} This is the story of how artificial intelligence is fundamentally reshaping the way we buy, sell, and think about commerce.</p><p>${c.feature1_desc} ${c.feature2_desc}</p><div class="pull-quote">"${c.testimonial_quote}"</div><p>${c.feature3_desc} ${c.feature4_desc}</p></article><aside class="sidebar" id="features"><h3>Key Features</h3><ul><li><strong>${c.feature1_title}</strong><span>${c.feature1_desc}</span></li><li><strong>${c.feature2_title}</strong><span>${c.feature2_desc}</span></li><li><strong>${c.feature3_title}</strong><span>${c.feature3_desc}</span></li><li><strong>${c.feature4_title}</strong><span>${c.feature4_desc}</span></li></ul></aside></div><section class="testimonial" id="testimonial"><blockquote>"${c.testimonial_quote}"</blockquote><cite>— ${c.testimonial_name}</cite></section><footer><p><strong>${c.footer_tagline}</strong> · Visitor #${vcount} · © 2026</p></footer></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 6. JAPANESE MINIMAL
  // ═══════════════════════════════════════════════════════════
  'minimal-jp'(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Noto Sans JP',sans-serif;font-weight:300;line-height:1.8;letter-spacing:0.05em}
body::before{content:'';position:fixed;top:50%;left:50%;width:400px;height:400px;border-radius:50%;border:1px solid rgba(0,0,0,0.03);transform:translate(-50%,-50%);pointer-events:none;animation:breathe 8s ease-in-out infinite}
@keyframes breathe{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.5}50%{transform:translate(-50%,-50%) scale(1.2);opacity:1}}
nav{padding:2rem;display:flex;justify-content:space-between;align-items:center}
.logo{font-weight:500;font-size:1rem;letter-spacing:0.2em}
nav a{color:${p.muted};text-decoration:none;font-size:0.85rem;font-weight:400}
.hero{min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4rem 2rem;position:relative}
.hero::after{content:'';width:1px;height:60px;background:${p.secondary};margin-top:3rem;opacity:0.3}
h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:100;letter-spacing:0.15em;line-height:1.4;margin-bottom:2rem}
.sub{font-size:1rem;color:${p.muted};font-weight:300;max-width:400px;margin:0 auto 3rem}
.btn-p{padding:1rem 3rem;background:transparent;color:${p.text};border:1px solid ${p.text};font-family:'Noto Sans JP',sans-serif;font-weight:400;font-size:0.85rem;cursor:pointer;text-decoration:none;letter-spacing:0.1em;transition:all 0.5s}
.btn-p:hover{background:${p.text};color:${p.bg}}
.features{padding:6rem 2rem;max-width:900px;margin:0 auto}
.f-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem 3rem}
@media(max-width:640px){.f-grid{grid-template-columns:1fr;gap:3rem}}
.f-card{position:relative;padding-top:2rem}
.f-card::before{content:'';position:absolute;top:0;left:0;width:30px;height:1px;background:${p.secondary};opacity:0.3}
.f-card h3{font-weight:400;font-size:1rem;margin-bottom:0.8rem;letter-spacing:0.1em}
.f-card p{font-size:0.9rem;color:${p.muted};font-weight:300;line-height:1.8}
footer{text-align:center;padding:4rem 2rem;color:${p.muted};font-size:0.8rem;font-weight:300;letter-spacing:0.1em}
</style></head><body><nav><div class="logo">自動商</div><a href="#features">特徴</a></nav><section class="hero"><h1>${c.headline}</h1><p class="sub">${c.subheadline}</p><a href="#features" class="btn-p">${c.cta1}</a></section><section class="features" id="features"><div class="f-grid"><div class="f-card"><h3>${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><h3>${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><h3>${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><h3>${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><footer><p>${c.footer_tagline}</p></footer></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 7. VAPORWAVE
  // ═══════════════════════════════════════════════════════════
  vaporwave(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>ＡＵＴＯＣＯＭＭＥＲＺ</title><link href="https://fonts.googleapis.com/css2?family=Righteous&family=Quicksand:wght@400;600&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:linear-gradient(135deg,${p.bg} 0%,#2a1a4e 50%,#1a0a2e 100%);color:${p.text};font-family:'Quicksand',sans-serif;min-height:100vh;overflow-x:hidden}
.gradient-mesh{position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse at 20% 50%,rgba(255,113,206,0.15) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(1,205,254,0.1) 0%,transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(5,255,161,0.08) 0%,transparent 50%)}
.gradient-mesh::before{content:'';position:absolute;inset:0;background:linear-gradient(transparent 50%,rgba(0,0,0,0.1) 50%);background-size:100% 4px;animation:scroll 4s linear infinite}
@keyframes scroll{0%{transform:translateY(0)}100%{transform:translateY(4px)}}
nav{padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center;position:relative;z-index:10}
.logo{font-family:'Righteous',cursive;font-size:1.5rem;background:linear-gradient(135deg,${p.primary},${p.secondary},${p.accent});-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:gradient-shift 5s ease infinite;background-size:200% 200%}
@keyframes gradient-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
nav a{color:${p.primary};text-decoration:none;font-weight:600;font-size:0.9rem;text-shadow:0 0 10px ${p.primary};transition:all 0.3s}
nav a:hover{text-shadow:0 0 20px ${p.primary},0 0 40px ${p.primary}}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6rem 2rem;position:relative}
.chrome-text{font-family:'Righteous',cursive;font-size:clamp(2rem,6vw,5rem);background:linear-gradient(135deg,#fff,${p.primary},${p.secondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:none;filter:drop-shadow(0 0 30px rgba(255,113,206,0.3));line-height:1.2;margin-bottom:1.5rem}
.hero p{color:rgba(255,255,255,0.6);font-size:1.1rem;max-width:500px;margin-bottom:2.5rem;line-height:1.6}
.cta-row{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center}
.btn-p{padding:1rem 2.5rem;background:linear-gradient(135deg,${p.primary},${p.secondary});color:#fff;border:none;border-radius:999px;font-weight:600;font-size:1rem;cursor:pointer;text-decoration:none;transition:all 0.3s;box-shadow:0 0 30px rgba(255,113,206,0.3)}
.btn-p:hover{transform:scale(1.05);box-shadow:0 0 50px rgba(255,113,206,0.5)}
.btn-s{padding:1rem 2.5rem;border:2px solid ${p.accent};color:${p.accent};background:transparent;border-radius:999px;font-weight:600;font-size:1rem;cursor:pointer;text-decoration:none;transition:all 0.3s}
.btn-s:hover{background:${p.accent};color:${p.bg}}
.features{padding:4rem 2rem;max-width:1100px;margin:0 auto;position:relative}
.features h2{font-family:'Righteous',cursive;text-align:center;font-size:2rem;color:${p.primary};margin-bottom:3rem;text-shadow:0 0 20px rgba(255,113,206,0.3)}
.f-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem}
.f-card{padding:2rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,113,206,0.15);border-radius:1.5rem;backdrop-filter:blur(10px);transition:all 0.4s;text-align:center}
.f-card:hover{transform:translateY(-8px) rotate(1deg);border-color:${p.primary};box-shadow:0 20px 60px rgba(255,113,206,0.15)}
.f-card .icon{font-size:2.5rem;margin-bottom:1rem}
.f-card h3{font-family:'Righteous',cursive;font-size:1.1rem;color:${p.secondary};margin-bottom:0.5rem}
.f-card p{color:rgba(255,255,255,0.5);font-size:0.9rem;line-height:1.6}
footer{text-align:center;padding:3rem 2rem;color:rgba(255,255,255,0.2);font-size:0.85rem}
@media(max-width:640px){.cta-row{flex-direction:column;align-items:center}.btn-p,.btn-s{width:100%;text-align:center}}
</style></head><body><div class="gradient-mesh"></div><nav><div class="logo">ＡＵＴＯＣＯＭＭＥＲＺ</div><a href="#features">探索 →</a></nav><section class="hero"><h1 class="chrome-text">${c.headline}</h1><p>${c.subheadline}</p><div class="cta-row"><a href="#features" class="btn-p">${c.cta1}</a><a href="#features" class="btn-s">${c.cta2}</a></div></section><section class="features" id="features"><h2>✧ CAPABILITIES ✧</h2><div class="f-grid"><div class="f-card"><div class="icon">🌴</div><h3>${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><div class="icon">🌊</div><h3>${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><div class="icon">🏛️</div><h3>${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><div class="icon">🌅</div><h3>${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><footer><p>${c.footer_tagline} · 永遠の夏 · Visitor #${vcount}</p></footer></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 8. ORGANIC NATURE
  // ═══════════════════════════════════════════════════════════
  organic(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Nunito',sans-serif;line-height:1.6;min-height:100vh}
.blob{position:fixed;border-radius:60% 40% 30% 70%/60% 30% 70% 40%;filter:blur(60px);opacity:0.15;pointer-events:none;animation:morph 15s ease-in-out infinite}
.b1{width:500px;height:500px;background:${p.primary};top:-100px;left:-100px}
.b2{width:400px;height:400px;background:${p.accent};bottom:-100px;right:-100px;animation-delay:-7s}
@keyframes morph{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
nav{padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center;position:relative;z-index:10}
.logo{font-weight:900;font-size:1.3rem;color:${p.primary}}
nav a{color:${p.secondary};text-decoration:none;font-weight:700;font-size:0.9rem;padding:0.5rem 1rem;border-radius:2rem;transition:all 0.3s}
nav a:hover{background:${p.primary};color:#fff}
.hero{min-height:85vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:5rem 2rem;position:relative}
.hero-inner{max-width:700px}
.leaf{display:inline-block;font-size:1.5rem;margin-bottom:1rem;animation:sway 3s ease-in-out infinite}
@keyframes sway{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.15;color:${p.primary};margin-bottom:1.5rem}
.sub{font-size:1.1rem;color:${p.muted};max-width:500px;margin:0 auto 2.5rem;line-height:1.7}
.cta-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn-p{padding:1rem 2.5rem;background:${p.primary};color:#fff;border:none;border-radius:2rem;font-weight:700;font-size:1rem;cursor:pointer;text-decoration:none;transition:all 0.3s}
.btn-p:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(45,80,22,0.3)}
.btn-s{padding:1rem 2.5rem;border:2px solid ${p.secondary};color:${p.secondary};background:transparent;border-radius:2rem;font-weight:700;font-size:1rem;cursor:pointer;text-decoration:none}
.features{padding:4rem 2rem;max-width:1100px;margin:0 auto;position:relative}
.features h2{text-align:center;font-size:1.8rem;font-weight:900;color:${p.primary};margin-bottom:3rem}
.f-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem}
.f-card{padding:2.5rem;background:#fff;border-radius:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.05);transition:all 0.4s;position:relative;overflow:hidden}
.f-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,${p.primary},${p.accent});transform:scaleX(0);transition:transform 0.4s}
.f-card:hover::before{transform:scaleX(1)}
.f-card:hover{transform:translateY(-5px);box-shadow:0 15px 40px rgba(0,0,0,0.08)}
.f-card .emoji{font-size:2rem;margin-bottom:1rem}
.f-card h3{font-weight:700;font-size:1.1rem;color:${p.primary};margin-bottom:0.5rem}
.f-card p{color:${p.muted};font-size:0.95rem;line-height:1.6}
footer{text-align:center;padding:3rem 2rem;color:${p.muted};font-size:0.9rem;border-top:1px solid rgba(0,0,0,0.05);margin-top:3rem}
</style></head><body><div class="blob b1"></div><div class="blob b2"></div><nav><div class="logo">🌿 AutoCommerz</div><a href="#features">${c.cta1} →</a></nav><section class="hero"><div class="hero-inner"><div class="leaf">🌿</div><h1>${c.headline}</h1><p class="sub">${c.subheadline}</p><div class="cta-row"><a href="#features" class="btn-p">${c.cta1}</a><a href="#features" class="btn-s">${c.cta2}</a></div></div></section><section class="features" id="features"><h2>🌱 How We Grow</h2><div class="f-grid"><div class="f-card"><div class="emoji">🌳</div><h3>${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><div class="emoji">🍃</div><h3>${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><div class="emoji">🌾</div><h3>${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><div class="emoji">🌻</div><h3>${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><footer><p>${c.footer_tagline} · Visitor #${vcount} · 🌍</p></footer></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 9. DEEP SPACE
  // ═══════════════════════════════════════════════════════════
  space(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Exo 2',sans-serif;min-height:100vh;overflow-x:hidden}
.starfield{position:fixed;inset:0;pointer-events:none}
.star{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;animation:twinkle var(--dur) ease-in-out infinite}
@keyframes twinkle{0%,100%{opacity:0.3}50%{opacity:1}}
nav{padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center;position:relative;z-index:10;border-bottom:1px solid rgba(74,158,255,0.1)}
.logo{font-family:'Orbitron',sans-serif;font-weight:900;font-size:1.2rem;color:${p.primary};letter-spacing:2px}
nav a{color:${p.primary};text-decoration:none;font-size:0.85rem;font-family:'Orbitron',sans-serif;letter-spacing:1px;padding:0.5rem 1rem;border:1px solid rgba(74,158,255,0.3);transition:all 0.3s}
nav a:hover{background:rgba(74,158,255,0.1);box-shadow:0 0 20px rgba(74,158,255,0.2)}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6rem 2rem;position:relative}
.ring{width:300px;height:300px;border:1px solid rgba(74,158,255,0.15);border-radius:50%;position:absolute;animation:orbit 20s linear infinite}
.ring::before{content:'';position:absolute;width:12px;height:12px;background:${p.accent};border-radius:50%;top:-6px;left:50%;box-shadow:0 0 20px ${p.accent}}
.ring2{width:400px;height:400px;animation-duration:30s;animation-direction:reverse;border-color:rgba(155,89,182,0.1)}
.ring2::before{background:${p.secondary};box-shadow:0 0 20px ${p.secondary}}
@keyframes orbit{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
h1{font-family:'Orbitron',sans-serif;font-size:clamp(1.8rem,5vw,3.5rem);font-weight:900;color:#fff;text-shadow:0 0 40px rgba(74,158,255,0.5);line-height:1.2;margin-bottom:1.5rem;position:relative}
.sub{color:rgba(224,224,255,0.5);font-size:1.1rem;max-width:500px;margin:0 auto 2.5rem;line-height:1.6;position:relative}
.cta-row{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;position:relative}
.btn-p{padding:1rem 2.5rem;background:linear-gradient(135deg,${p.primary},${p.secondary});color:#fff;border:none;border-radius:4px;font-family:'Orbitron',sans-serif;font-weight:700;font-size:0.8rem;cursor:pointer;text-decoration:none;letter-spacing:2px;transition:all 0.3s}
.btn-p:hover{box-shadow:0 0 40px rgba(74,158,255,0.4);transform:translateY(-2px)}
.btn-s{padding:1rem 2.5rem;border:1px solid rgba(74,158,255,0.3);color:${p.primary};background:transparent;border-radius:4px;font-family:'Orbitron',sans-serif;font-size:0.8rem;cursor:pointer;text-decoration:none;letter-spacing:2px}
.features{padding:4rem 2rem;max-width:1100px;margin:0 auto;position:relative}
.features h2{font-family:'Orbitron',sans-serif;text-align:center;font-size:1.3rem;color:${p.primary};margin-bottom:3rem;letter-spacing:3px}
.f-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem}
.f-card{padding:2rem;background:rgba(74,158,255,0.03);border:1px solid rgba(74,158,255,0.1);border-radius:8px;transition:all 0.4s;position:relative;overflow:hidden}
.f-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,${p.primary},transparent);transform:scaleX(0);transition:transform 0.4s}
.f-card:hover::before{transform:scaleX(1)}
.f-card:hover{border-color:rgba(74,158,255,0.3);box-shadow:0 0 30px rgba(74,158,255,0.1)}
.f-card h3{font-family:'Orbitron',sans-serif;font-size:0.85rem;color:${p.accent};margin-bottom:0.8rem;letter-spacing:1px}
.f-card p{color:rgba(224,224,255,0.4);font-size:0.95rem;line-height:1.6}
.hud-corner{position:fixed;bottom:1rem;right:1rem;font-family:'Orbitron',sans-serif;font-size:0.65rem;color:rgba(74,158,255,0.3);letter-spacing:1px}
footer{text-align:center;padding:3rem 2rem;border-top:1px solid rgba(74,158,255,0.05);color:rgba(74,158,255,0.2);font-size:0.8rem;font-family:'Orbitron',sans-serif}
</style></head><body><div class="starfield" id="stars"></div><nav><div class="logo">◈ AUTOCOMMERZ</div><a href="#features">${c.cta1} →</a></nav><section class="hero"><div class="ring"></div><div class="ring ring2"></div><h1>${c.headline}</h1><p class="sub">${c.subheadline}</p><div class="cta-row"><a href="#features" class="btn-p">${c.cta1}</a><a href="#features" class="btn-s">${c.cta2}</a></div></section><section class="features" id="features"><h2>◈ SYSTEMS ONLINE</h2><div class="f-grid"><div class="f-card"><h3>◉ ${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><h3>◉ ${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><h3>◉ ${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><h3>◉ ${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><div class="hud-corner">VISITOR #${vcount} // ID:${vid}</div><footer><p>${c.footer_tagline} // © 2026 AUTOCOMMERZ</p></footer><script>
const sf=document.getElementById('stars');
for(let i=0;i<200;i++){const s=document.createElement('div');s.className='star';s.style.left=Math.random()*100+'%';s.style.top=Math.random()*100+'%';s.style.setProperty('--dur',(2+Math.random()*4)+'s');s.style.animationDelay=Math.random()*5+'s';sf.appendChild(s)}
</script></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 10. POP ART
  // ═══════════════════════════════════════════════════════════
  'pop-art'(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>WOW! ${c.headline}!</title><link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Comic Neue',cursive;line-height:1.5;min-height:100vh}
.halftone{position:fixed;inset:0;pointer-events:none;background-image:radial-gradient(circle,rgba(0,0,0,0.05) 1px,transparent 1px);background-size:8px 8px}
header{background:${p.primary};color:#fff;padding:1.5rem 2rem;text-align:center;border-bottom:4px solid #000}
header h1{font-family:'Bangers',cursive;font-size:2rem;letter-spacing:3px;text-shadow:3px 3px 0 #000}
.hero{padding:4rem 2rem;text-align:center;max-width:900px;margin:0 auto;position:relative}
.comic-panel{background:#fff;border:4px solid #000;padding:2rem;margin:2rem 0;box-shadow:8px 8px 0 #000;position:relative}
.comic-panel::before{content:'POW!';position:absolute;top:-20px;right:-20px;background:${p.accent};color:#fff;font-family:'Bangers',cursive;padding:0.5rem 1rem;border:3px solid #000;transform:rotate(12deg);font-size:1.2rem}
.hero h1{font-family:'Bangers',cursive;font-size:clamp(2.5rem,6vw,5rem);color:${p.primary};text-shadow:4px 4px 0 #000;letter-spacing:2px;line-height:1.1;margin-bottom:1rem}
.hero p{font-size:1.2rem;color:#333;font-weight:700}
.cta-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem}
.btn-p{padding:1rem 2.5rem;background:${p.secondary};color:#fff;border:4px solid #000;font-family:'Bangers',cursive;font-size:1.3rem;cursor:pointer;text-decoration:none;box-shadow:6px 6px 0 #000;transition:all 0.2s;letter-spacing:1px}
.btn-p:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 #000}
.btn-s{padding:1rem 2.5rem;background:${p.accent};color:#000;border:4px solid #000;font-family:'Bangers',cursive;font-size:1.3rem;cursor:pointer;text-decoration:none;box-shadow:6px 6px 0 #000}
.features{padding:4rem 2rem;max-width:1100px;margin:0 auto;position:relative}
.features h2{font-family:'Bangers',cursive;text-align:center;font-size:2.5rem;color:${p.primary};text-shadow:3px 3px 0 #000;margin-bottom:2rem;letter-spacing:2px}
.f-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:2rem}
.f-card{background:#fff;border:4px solid #000;padding:2rem;box-shadow:6px 6px 0 #000;transition:all 0.2s;position:relative}
.f-card:hover{transform:translate(-3px,-3px);box-shadow:9px 9px 0 #000}
.f-card:nth-child(odd){transform:rotate(-1deg)}
.f-card:nth-child(even){transform:rotate(1deg)}
.f-card:hover:nth-child(odd){transform:rotate(-1deg) translate(-3px,-3px)}
.f-card:hover:nth-child(even){transform:rotate(1deg) translate(-3px,-3px)}
.f-card .emoji{font-size:2.5rem;margin-bottom:0.5rem}
.f-card h3{font-family:'Bangers',cursive;font-size:1.3rem;color:${p.secondary};letter-spacing:1px;margin-bottom:0.5rem}
.f-card p{font-size:0.95rem;color:#333;font-weight:600}
.speech-bubble{background:#fff;border:4px solid #000;border-radius:2rem;padding:2rem;max-width:600px;margin:3rem auto;text-align:center;position:relative;font-size:1.1rem;font-weight:700}
.speech-bubble::after{content:'';position:absolute;bottom:-20px;left:50%;transform:translateX(-50%);border:10px solid transparent;border-top-color:#000}
footer{text-align:center;padding:2rem;background:${p.primary};color:#fff;font-family:'Bangers',cursive;font-size:1rem;letter-spacing:1px;border-top:4px solid #000}
</style></head><body><div class="halftone"></div><header><h1>★ AUTOCOMMERZ ★</h1></header><section class="hero"><div class="comic-panel"><h1>${c.headline}</h1><p>${c.subheadline}</p></div><div class="cta-row"><a href="#features" class="btn-p">${c.cta1}!</a><a href="#features" class="btn-s">${c.cta2}!</a></div></section><section class="features" id="features"><h2>★ SUPER POWERS ★</h2><div class="f-grid"><div class="f-card"><div class="emoji">💥</div><h3>${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><div class="emoji">⚡</div><h3>${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><div class="emoji">🔥</div><h3>${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><div class="emoji">💣</div><h3>${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><div class="speech-bubble">"${c.testimonial_quote}"<br><span style="font-size:0.9rem;color:#666">— ${c.testimonial_name}</span></div><footer><p>${c.footer_tagline} · VISITOR #${vcount} · © 2026</p></footer></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 11. HACKER TERMINAL
  // ═══════════════════════════════════════════════════════════
  terminal(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>root@autocommerz:~#</title><link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.primary};font-family:'Fira Code',monospace;font-size:0.9rem;line-height:1.6;min-height:100vh}
body::before{content:'';position:fixed;inset:0;background:linear-gradient(transparent 50%,rgba(0,255,0,0.02) 50%);background-size:100% 2px;pointer-events:none;z-index:9999}
.matrix{position:fixed;inset:0;pointer-events:none;overflow:hidden;opacity:0.03}
.matrix span{position:absolute;color:${p.primary};font-size:0.8rem;animation:fall linear infinite}
@keyframes fall{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
.container{max-width:900px;margin:0 auto;padding:2rem}
@media(max-width:640px){.container{padding:1rem;font-size:0.8rem}}
.prompt{color:${p.accent}}
.cmd{color:#fff}
.comment{color:${p.muted}}
.section{margin:2rem 0;padding:1.5rem 0;border-bottom:1px solid rgba(0,255,0,0.1)}
h1{font-size:clamp(1.2rem,3vw,2rem);color:#fff;margin-bottom:0.5rem;font-weight:700}
h2{color:${p.accent};font-size:1rem;margin-bottom:1rem}
.output{color:rgba(0,255,0,0.7);margin:0.5rem 0}
.feature{display:grid;grid-template-columns:200px 1fr;gap:1rem;padding:1rem 0;border-bottom:1px solid rgba(0,255,0,0.05)}
@media(max-width:640px){.feature{grid-template-columns:1fr}}
.feature-name{color:#fff;font-weight:700}
.feature-desc{color:rgba(0,255,0,0.5)}
.cursor{display:inline-block;width:10px;height:1.2em;background:${p.primary};animation:blink 1s step-end infinite;vertical-align:middle}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.btn-p{padding:0.8rem 2rem;background:transparent;color:${p.primary};border:1px solid ${p.primary};font-family:'Fira Code',monospace;font-size:0.85rem;cursor:pointer;text-decoration:none;transition:all 0.3s}
.btn-p:hover{background:${p.primary};color:#000}
.status-bar{position:fixed;bottom:0;left:0;right:0;padding:0.5rem 2rem;background:rgba(0,255,0,0.05);border-top:1px solid rgba(0,255,0,0.1);font-size:0.75rem;display:flex;justify-content:space-between}
</style></head><body><div class="matrix" id="matrix"></div><div class="container"><div class="section"><span class="prompt">root@autocommerz:~$</span> <span class="cmd">./launch.sh</span><br><span class="comment"># Initializing commerce protocols...</span><br><span class="comment"># Loading AI modules...</span><br><span class="output">✓ System ready.</span><br><br><h1>${c.headline}</h1><p class="output">${c.subheadline}</p><br><a href="#features" class="btn-p">${c.cta1} <span class="cursor"></span></a></div><div class="section" id="features"><span class="prompt">root@autocommerz:~$</span> <span class="cmd">ls -la /capabilities/</span><br><h2>// SYSTEM CAPABILITIES</h2><div class="feature"><span class="feature-name">[${c.feature1_title}]</span><span class="feature-desc">${c.feature1_desc}</span></div><div class="feature"><span class="feature-name">[${c.feature2_title}]</span><span class="feature-desc">${c.feature2_desc}</span></div><div class="feature"><span class="feature-name">[${c.feature3_title}]</span><span class="feature-desc">${c.feature3_desc}</span></div><div class="feature"><span class="feature-name">[${c.feature4_title}]</span><span class="feature-desc">${c.feature4_desc}</span></div></div><div class="section"><span class="prompt">root@autocommerz:~$</span> <span class="cmd">cat /var/log/testimonials.log</span><br><p class="output">"${c.testimonial_quote}"</p><p class="comment">— ${c.testimonial_name}</p></div><div class="section"><span class="prompt">root@autocommerz:~$</span> <span class="cmd">echo "${c.footer_tagline}"</span><br><p class="output">${c.footer_tagline}</p></div></div><div class="status-bar"><span>root@autocommerz</span><span>VISITOR #${vcount}</span><span>ID: ${vid}</span></div><script>
const m=document.getElementById('matrix');
const chars='01アイウエオカキクケコサシスセソタチツテト';
for(let i=0;i<30;i++){const s=document.createElement('span');s.textContent=chars[Math.floor(Math.random()*chars.length)];s.style.left=Math.random()*100+'%';s.style.animationDuration=(5+Math.random()*10)+'s';s.style.animationDelay=Math.random()*5+'s';m.appendChild(s)}
</script></body></html>`;
  },

  // ═══════════════════════════════════════════════════════════
  // 12. WATERCOLOR DREAM
  // ═══════════════════════════════════════════════════════════
  watercolor(p, f, c, vid, vcount) {
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${c.headline}</title><link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Kalam',cursive;line-height:1.7;min-height:100vh;overflow-x:hidden}
.wash{position:fixed;border-radius:50%;filter:blur(80px);opacity:0.12;pointer-events:none}
.w1{width:500px;height:500px;background:${p.primary};top:-150px;right:-100px;animation:paint 20s ease-in-out infinite}
.w2{width:400px;height:400px;background:${p.secondary};bottom:-100px;left:-100px;animation:paint 25s ease-in-out infinite reverse}
.w3{width:300px;height:300px;background:${p.accent};top:50%;left:50%;animation:paint 15s ease-in-out infinite}
@keyframes paint{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.1)}66%{transform:translate(-20px,30px) scale(0.9)}}
nav{padding:1.5rem 2rem;display:flex;justify-content:space-between;align-items:center;position:relative;z-index:10}
.logo{font-family:'Caveat',cursive;font-size:1.8rem;font-weight:700;color:${p.secondary}}
nav a{color:${p.secondary};text-decoration:none;font-weight:700;font-size:1rem;padding:0.5rem 1.5rem;border-bottom:2px solid ${p.secondary};transition:all 0.3s}
nav a:hover{border-bottom-color:${p.primary};color:${p.primary}}
.hero{min-height:80vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:5rem 2rem;position:relative}
.hero-inner{max-width:700px}
.canvas-frame{background:#fff;border-radius:2rem;padding:3rem;box-shadow:0 10px 40px rgba(0,0,0,0.05);position:relative}
.canvas-frame::before{content:'';position:absolute;inset:-3px;border-radius:2.2rem;background:linear-gradient(135deg,${p.primary},${p.secondary},${p.accent});z-index:-1;opacity:0.3}
h1{font-family:'Caveat',cursive;font-size:clamp(2.5rem,5vw,4rem);font-weight:700;color:${p.secondary};margin-bottom:1rem;line-height:1.2}
.sub{font-size:1.1rem;color:${p.muted};max-width:500px;margin:0 auto 2rem}
.cta-row{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn-p{padding:1rem 2.5rem;background:${p.secondary};color:#fff;border:none;border-radius:2rem;font-family:'Caveat',cursive;font-size:1.3rem;font-weight:700;cursor:pointer;text-decoration:none;transition:all 0.3s}
.btn-p:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(224,122,95,0.3)}
.btn-s{padding:1rem 2.5rem;border:2px solid ${p.primary};color:${p.primary};background:transparent;border-radius:2rem;font-family:'Caveat',cursive;font-size:1.3rem;font-weight:700;cursor:pointer;text-decoration:none}
.features{padding:4rem 2rem;max-width:1100px;margin:0 auto;position:relative}
.features h2{font-family:'Caveat',cursive;text-align:center;font-size:2.5rem;color:${p.secondary};margin-bottom:3rem}
.f-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem}
.f-card{padding:2.5rem;background:#fff;border-radius:1.5rem;box-shadow:0 5px 25px rgba(0,0,0,0.04);transition:all 0.4s;position:relative;overflow:hidden}
.f-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${p.primary},${p.accent});transform:scaleX(0);transition:transform 0.4s}
.f-card:hover::before{transform:scaleX(1)}
.f-card:hover{transform:translateY(-5px);box-shadow:0 15px 40px rgba(0,0,0,0.08)}
.f-card .art{font-size:2.5rem;margin-bottom:1rem}
.f-card h3{font-family:'Caveat',cursive;font-size:1.5rem;font-weight:700;color:${p.secondary};margin-bottom:0.5rem}
.f-card p{color:${p.muted};font-size:0.95rem;line-height:1.6}
footer{text-align:center;padding:3rem 2rem;color:${p.muted};font-family:'Caveat',cursive;font-size:1.1rem}
</style></head><body><div class="wash w1"></div><div class="wash w2"></div><div class="wash w3"></div><nav><div class="logo">✿ AutoCommerz</div><a href="#features">${c.cta1} →</a></nav><section class="hero"><div class="hero-inner"><div class="canvas-frame"><h1>${c.headline}</h1><p class="sub">${c.subheadline}</p><div class="cta-row"><a href="#features" class="btn-p">${c.cta1}</a><a href="#features" class="btn-s">${c.cta2}</a></div></div></div></section><section class="features" id="features"><h2>✿ Our Palette</h2><div class="f-grid"><div class="f-card"><div class="art">🎨</div><h3>${c.feature1_title}</h3><p>${c.feature1_desc}</p></div><div class="f-card"><div class="art">🖌️</div><h3>${c.feature2_title}</h3><p>${c.feature2_desc}</p></div><div class="f-card"><div class="art">🌸</div><h3>${c.feature3_title}</h3><p>${c.feature3_desc}</p></div><div class="f-card"><div class="art">🍃</div><h3>${c.feature4_title}</h3><p>${c.feature4_desc}</p></div></div></section><footer><p>${c.footer_tagline} · Visitor #${vcount} · ✿</p></footer></body></html>`;
  },
};
