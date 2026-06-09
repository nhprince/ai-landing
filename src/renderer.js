// Art Page Renderer — 12 unique art experiences, zero branding
import { pickStyle, generateVisit } from './content-generator.js';

export async function generateHTML(ai, context, kv) {
  const style = pickStyle(context.visitorId, context.timestamp);
  const visit = await generateVisit(ai, style, context, kv);
  const fn = RENDERERS[style.id] || RENDERERS['glassmorphism'];
  return fn(visit.palette, visit.content, visit.visitorId, visit.visitorCount);
}

// Shared head helper — meta tags, OG, theme-color, preconnect
function head(title, styleId, palette, lang = 'en') {
  const desc = 'A generative art experience — every visit shows something different';
  const themeColor = palette.bg;
  return `<!DOCTYPE html><html lang="${lang}"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="${themeColor}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>">
<style>/* Entrance animations */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
.anim-1{animation:fadeUp .6s ease-out both}
.anim-2{animation:fadeUp .6s ease-out .1s both}
.anim-3{animation:fadeUp .6s ease-out .2s both}
.anim-4{animation:fadeUp .6s ease-out .3s both}
.anim-4{animation:fadeUp .6s ease-out .35s both}
</style>`;
}

const R = {
  // ─── 1. CYBERPUNK ───
  cyberpunk(p, c, vid, n) {
    return `${head(c.headline, 'cyberpunk', p)}<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Orbitron:wght@700;900&display=swap" rel="stylesheet"><style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--bg:${p.bg};--p:${p.primary};--s:${p.secondary};--a:${p.accent};--t:${p.text};--m:${p.muted}}
body{background:var(--bg);color:var(--t);font-family:'Space Mono',monospace;min-height:100vh;overflow-x:hidden}
body::before{content:'';position:fixed;inset:0;background:linear-gradient(transparent 50%,rgba(0,240,255,0.03) 50%);background-size:100% 4px;pointer-events:none;z-index:9999;animation:scan 8s linear infinite}
@keyframes scan{0%{transform:translateY(0)}100%{transform:translateY(20px)}}
.grid{position:fixed;inset:0;background-image:linear-gradient(rgba(0,240,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,0.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}
.wrap{max-width:900px;margin:0 auto;padding:6rem 2rem 4rem;position:relative}
.tag{color:var(--a);font-size:0.7rem;letter-spacing:4px;text-transform:uppercase;margin-bottom:1.5rem;opacity:0.7}
h1{font-family:'Orbitron',sans-serif;font-size:clamp(1.8rem,5vw,3.5rem);font-weight:900;color:var(--p);text-shadow:0 0 30px rgba(0,240,255,0.4);line-height:1.1;margin-bottom:1.5rem;animation:g 3s infinite}
@keyframes g{0%,90%,100%{transform:translate(0)}92%{transform:translate(-2px,1px)}94%{transform:translate(2px,-1px)}96%{transform:translate(-1px,2px)}98%{transform:translate(1px,-2px)}}
.sub{color:var(--m);font-size:1rem;line-height:1.8;margin-bottom:2.5rem;max-width:600px}
.words{display:flex;flex-wrap:wrap;gap:0.8rem;margin:3rem 0}
.word{padding:0.4rem 1rem;border:1px solid rgba(0,240,255,0.2);font-size:0.8rem;color:var(--s);letter-spacing:1px;transition:all 0.3s}
.word:hover{border-color:var(--p);color:var(--p);box-shadow:0 0 15px rgba(0,240,255,0.2)}
.poem{margin:3rem 0;padding:2rem;border-left:3px solid var(--p);background:rgba(0,240,255,0.02)}
.poem p{color:var(--m);font-size:0.95rem;line-height:2;margin-bottom:0.5rem;font-style:italic}
.poem p:last-child{margin-bottom:0;color:var(--a)}
.cta-row{display:flex;gap:1rem;flex-wrap:wrap;margin-top:2rem}
.btn{padding:0.8rem 2rem;font-family:'Space Mono',monospace;font-size:0.8rem;cursor:pointer;letter-spacing:1px;transition:all 0.3s}
.bp{background:var(--p);color:#000;border:none}
.bp:hover{box-shadow:0 0 25px var(--p)}
.bs{background:transparent;border:1px solid var(--s);color:var(--s)}
.bs:hover{background:var(--s);color:#000}
footer{text-align:center;padding:3rem 2rem;color:var(--m);font-size:0.75rem;border-top:1px solid rgba(0,240,255,0.08);margin-top:4rem}
@media(max-width:640px){.wrap{padding:4rem 1.5rem 2rem}}
</style></head><body><div class="grid"></div><div class="wrap anim-1"><div class="tag">// ${c.headline.toLowerCase().replace(/\s+/g,'_')}</div><h1 class="anim-2">${c.headline}</h1><p class="sub anim-3">${c.subheadline}</p><div class="words anim-4"><span class="word">${c.word1}</span><span class="word">${c.word2}</span><span class="word">${c.word3}</span><span class="word">${c.word4}</span></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p>— ${c.poem_line3}</p></div><div class="cta-row"><a class="btn bp">${c.cta1} →</a><a class="btn bs">${c.cta2}</a></div><footer><p>${c.footer} · #${n}</p></footer></div></body></html>`;
  },

  // ─── 2. BRUTALIST ───
  brutalist(p, c, vid, n) {
    return `${head(c.headline, 'brutalist', p)}<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:system-ui,-apple-system,sans-serif;line-height:1.6}
.w{max-width:800px;margin:0 auto;padding:3rem 2rem}
@media(max-width:640px){.w{padding:2rem 1rem}}
h1{font-size:clamp(2.5rem,7vw,5rem);font-weight:900;text-transform:uppercase;letter-spacing:-3px;line-height:0.95;margin-bottom:2rem;color:${p.primary}}
.sub{font-size:1.1rem;color:${p.muted};max-width:550px;margin-bottom:3rem;line-height:1.7}
.words{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:3rem 0}
@media(max-width:640px){.words{grid-template-columns:1fr}}
.word{padding:1.5rem;border:3px solid ${p.primary};font-size:1.1rem;font-weight:700;text-align:center;text-transform:uppercase;letter-spacing:2px}
.word:nth-child(even){border-color:${p.secondary};color:${p.secondary}}
.poem{margin:3rem 0;padding:2rem 0;border-top:4px solid ${p.primary};border-bottom:4px solid ${p.primary}}
.poem p{font-size:1.1rem;margin-bottom:1rem;font-weight:600}
.poem p:last-child{margin-bottom:0;font-style:italic;color:${p.muted}}
.bar{display:flex;gap:1rem;flex-wrap:wrap;margin:2rem 0}
.btn{padding:1rem 2rem;font-weight:900;font-size:0.9rem;text-transform:uppercase;letter-spacing:1px;cursor:pointer}
.bp{background:${p.primary};color:${p.bg};border:3px solid ${p.primary}}
.bp:hover{background:transparent;color:${p.primary}}
.bs{border:3px solid ${p.secondary};color:${p.secondary};background:transparent}
footer{border-top:4px solid ${p.primary};padding:2rem 0;margin-top:3rem;color:${p.muted};font-size:0.85rem}
</style></head><body><div class="w"><h1 class="anim-1">${c.headline}</h1><p class="sub anim-2">${c.subheadline}</p><div class="words anim-3"><div class="word">${c.word1}</div><div class="word">${c.word2}</div><div class="word">${c.word3}</div><div class="word">${c.word4}</div></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p>${c.poem_line3}</p></div><div class="bar"><a class="btn bp">${c.cta1}</a><a class="btn bs">${c.cta2}</a></div><footer><strong>${c.footer}</strong> · VISITOR #${n}</footer></div></body></html>`;
  },

  // ─── 3. GLASSMORPHISM ───
  glassmorphism(p, c, vid, n) {
    return `${head(c.headline, 'glassmorphism', p)}<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:${p.bg};--p:${p.primary};--s:${p.secondary};--a:${p.accent};--t:${p.text};--m:${p.muted}}
body{background:var(--bg);color:var(--t);font-family:'Inter',sans-serif;min-height:100vh;overflow-x:hidden}
.o{position:fixed;border-radius:50%;filter:blur(120px);opacity:0.25;pointer-events:none;animation:fl 20s ease-in-out infinite}
.o1{width:500px;height:500px;background:var(--p);top:-200px;right:-100px}
.o2{width:400px;height:400px;background:var(--s);bottom:-100px;left:-100px;animation-delay:-10s}
@keyframes fl{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-40px)}}
.w{max-width:800px;margin:0 auto;padding:6rem 2rem 4rem;position:relative}
h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:200;line-height:1.2;letter-spacing:-1px;margin-bottom:1.5rem;background:linear-gradient(135deg,#fff,var(--p));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.sub{color:rgba(255,255,255,0.5);font-size:1.1rem;font-weight:300;line-height:1.7;max-width:550px;margin-bottom:3rem}
.words{display:flex;flex-wrap:wrap;gap:0.8rem;margin:3rem 0}
.word{padding:0.6rem 1.4rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:999px;font-size:0.85rem;font-weight:300;color:var(--p);backdrop-filter:blur(10px);transition:all 0.4s}
.word:hover{background:rgba(255,255,255,0.06);border-color:var(--p);transform:translateY(-2px)}
.poem{margin:3rem 0;padding:2.5rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:1.5rem;backdrop-filter:blur(10px)}
.poem p{color:rgba(255,255,255,0.5);font-size:1rem;line-height:2;font-weight:300;margin-bottom:0.8rem}
.poem p:last-child{margin-bottom:0;color:var(--p);font-style:italic}
.cta-row{display:flex;gap:1rem;flex-wrap:wrap;margin-top:2rem}
.btn{padding:0.9rem 2rem;border-radius:999px;font-weight:600;font-size:0.9rem;cursor:pointer;text-decoration:none;transition:all 0.35s}
.bp{background:linear-gradient(135deg,var(--p),var(--s));color:#000}
.bp:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(99,102,241,0.3)}
.bs{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:var(--t);backdrop-filter:blur(10px)}
.bs:hover{background:rgba(255,255,255,0.06)}
footer{text-align:center;padding:3rem 2rem;color:rgba(255,255,255,0.15);font-size:0.8rem;font-weight:300}
@media(max-width:640px){.w{padding:4rem 1.5rem 2rem}}
</style></head><body><div class="o o1"></div><div class="o o2"></div><div class="w"><h1 class="anim-1">${c.headline}</h1><p class="sub anim-2">${c.subheadline}</p><div class="words anim-3"><span class="word">${c.word1}</span><span class="word">${c.word2}</span><span class="word">${c.word3}</span><span class="word">${c.word4}</span></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p>${c.poem_line3}</p></div><div class="cta-row"><a class="btn bp">${c.cta1} →</a><a class="btn bs">${c.cta2}</a></div><footer><p>${c.footer} · #${n}</p></footer></div></body></html>`;
  },

  // ─── 4. RETRO PIXEL ───
  'retro-pixel'(p, c, vid, n) {
    return `${head(c.headline, 'retro-pixel', p)}<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box;image-rendering:pixelated}
body{background:${p.bg};color:${p.text};font-family:'VT323',monospace;font-size:1.3rem;min-height:100vh}
body::before{content:'';position:fixed;inset:0;background:linear-gradient(transparent 50%,rgba(0,0,0,0.1) 50%);background-size:100% 4px;pointer-events:none;z-index:9999}
.w{max-width:800px;margin:0 auto;padding:4rem 2rem}
h1{font-family:'Press Start 2P',cursive;font-size:clamp(1rem,4vw,2rem);color:${p.primary};text-shadow:4px 4px 0 ${p.secondary};line-height:1.5;margin-bottom:1.5rem;animation:bl 2s infinite}
@keyframes bl{0%,49%{opacity:1}50%,100%{opacity:0.8}}
.sub{color:${p.muted};line-height:1.5;margin-bottom:2rem}
.words{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin:2rem 0}
@media(max-width:640px){.words{grid-template-columns:1fr}}
.word{padding:1rem;border:3px solid ${p.primary};text-align:center;font-family:'Press Start 2P',cursive;font-size:0.6rem;color:${p.secondary};line-height:1.4}
.word:nth-child(even){border-color:${p.accent};color:${p.accent}}
.poem{margin:2rem 0;padding:1.5rem;border:3px solid ${p.primary};background:rgba(0,255,65,0.03)}
.poem p{color:${p.muted};margin-bottom:0.8rem;line-height:1.4}
.poem .sig{color:${p.accent};text-align:right}
.bar{display:flex;gap:1rem;flex-wrap:wrap;margin:2rem 0}
.btn{padding:1rem 1.5rem;font-family:'Press Start 2P',cursive;font-size:0.6rem;cursor:pointer;border:3px solid}
.bp{background:${p.primary};color:${p.bg};border-color:${p.primary};box-shadow:4px 4px 0 #000}
.bp:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 #000}
.bs{background:transparent;color:${p.secondary};border-color:${p.secondary};box-shadow:4px 4px 0 #000}
footer{text-align:center;padding:2rem;border-top:3px solid ${p.primary};color:${p.muted}}
</style></head><body><div class="w"><h1 class="anim-1">★ ${c.headline} ★</h1><p class="sub anim-2">${c.subheadline}</p><div class="words anim-3"><div class="word">${c.word1}</div><div class="word">${c.word2}</div><div class="word">${c.word3}</div><div class="word">${c.word4}</div></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p class="sig">${c.poem_line3}</p></div><div class="bar"><a class="btn bp">${c.cta1}</a><a class="btn bs">${c.cta2}</a></div><footer><p>${c.footer} // PLAYER: ${vid} // SCORE: ${n}</p></footer></div></body></html>`;
  },

  // ─── 5. EDITORIAL ───
  editorial(p, c, vid, n) {
    return `${head(c.headline, 'editorial', p)}<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Source Serif 4',serif;line-height:1.7;font-size:1.05rem}
.w{max-width:700px;margin:0 auto;padding:4rem 2rem}
.label{font-size:0.7rem;text-transform:uppercase;letter-spacing:3px;color:${p.secondary};margin-bottom:1rem}
h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-1px;margin-bottom:1.5rem}
.sub{font-size:1.15rem;color:${p.muted};line-height:1.7;max-width:550px;margin-bottom:3rem;font-style:italic}
.words{display:flex;flex-wrap:wrap;gap:0.5rem 1.5rem;margin:3rem 0;padding:2rem 0;border-top:1px solid #ddd;border-bottom:1px solid #ddd}
.word{font-family:'Playfair Display',serif;font-size:1.1rem;font-style:italic;color:${p.secondary}}
.word::after{content:'·';margin-left:1rem;color:#ccc}
.word:last-child::after{content:''}
.poem{margin:3rem 0;padding:2rem 0;border-left:4px solid ${p.secondary};padding-left:2rem}
.poem p{font-family:'Playfair Display',serif;font-size:1.15rem;font-style:italic;color:${p.secondary};margin-bottom:0.8rem;line-height:1.6}
.poem .sig{font-size:0.9rem;color:${p.muted};font-style:normal;margin-top:1rem}
.bar{display:flex;gap:1rem;flex-wrap:wrap;margin:2rem 0}
.btn{padding:0.8rem 2rem;font-weight:600;font-size:0.9rem;cursor:pointer;text-decoration:none}
.bp{background:${p.primary};color:#fff}
.bp:hover{background:${p.secondary}}
.bs{border:1px solid ${p.primary};color:${p.primary};background:transparent}
footer{text-align:center;padding:3rem 2rem;color:${p.muted};font-size:0.85rem;border-top:2px solid ${p.primary};margin-top:3rem}
</style></head><body><div class="w"><div class="label anim-1">Essay</div><h1 class="anim-2">${c.headline}</h1><p class="sub anim-3">${c.subheadline}</p><div class="words anim-4"><span class="word">${c.word1}</span><span class="word">${c.word2}</span><span class="word">${c.word3}</span><span class="word">${c.word4}</span></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p class="sig">${c.poem_line3}</p></div><div class="bar"><a class="btn bp">${c.cta1}</a><a class="btn bs">${c.cta2}</a></div><footer><p><strong>${c.footer}</strong> · Visitor #${n} · © 2026</p></footer></div></body></html>`;
  },

  // ─── 6. JAPANESE MINIMAL ───
  'minimal-jp'(p, c, vid, n) {
    return `${head(c.headline, 'minimal-jp', p, 'ja')}<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Noto Sans JP',sans-serif;font-weight:300;line-height:1.8;letter-spacing:0.05em;min-height:100vh}
body::before{content:'';position:fixed;top:50%;left:50%;width:400px;height:400px;border-radius:50%;border:1px solid rgba(0,0,0,0.03);transform:translate(-50%,-50%);pointer-events:none;animation:br 8s ease-in-out infinite}
@keyframes br{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.5}50%{transform:translate(-50%,-50%) scale(1.2);opacity:1}}
.w{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4rem 2rem;position:relative}
h1{font-size:clamp(1.8rem,4vw,3rem);font-weight:100;letter-spacing:0.15em;line-height:1.4;margin-bottom:2rem}
.sub{font-size:1rem;color:${p.muted};font-weight:300;max-width:400px;margin:0 auto 3rem}
.words{display:flex;gap:2rem;margin:3rem 0;flex-wrap:wrap;justify-content:center}
.word{font-weight:400;font-size:0.9rem;letter-spacing:0.2em;position:relative}
.word::after{content:'';position:absolute;bottom:-4px;left:0;width:100%;height:1px;background:${p.secondary};opacity:0.3;transform:scaleX(0);transition:transform 0.5s}
.word:hover::after{transform:scaleX(1)}
.poem{margin:3rem 0;max-width:500px}
.poem p{font-size:0.95rem;color:${p.muted};font-weight:300;margin-bottom:1rem;line-height:2}
.poem .sig{color:${p.secondary};font-size:0.85rem;margin-top:1.5rem}
.btn{display:inline-block;padding:1rem 3rem;background:transparent;color:${p.text};border:1px solid ${p.text};font-family:'Noto Sans JP',sans-serif;font-weight:400;font-size:0.85rem;cursor:pointer;text-decoration:none;letter-spacing:0.1em;transition:all 0.5s;margin-top:2rem}
.btn:hover{background:${p.text};color:${p.bg}}
footer{position:absolute;bottom:2rem;color:${p.muted};font-size:0.75rem;font-weight:300;letter-spacing:0.1em}
</style></head><body><div class="w"><h1 class="anim-1">${c.headline}</h1><p class="sub anim-2">${c.subheadline}</p><div class="words anim-3"><span class="word">${c.word1}</span><span class="word">${c.word2}</span><span class="word">${c.word3}</span><span class="word">${c.word4}</span></div><div class="poem anim-4"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p class="sig">${c.poem_line3}</p></div><a class="btn">${c.cta1}</a><footer><p>${c.footer}</p></footer></div></body></html>`;
  },

  // ─── 7. VAPORWAVE ───
  vaporwave(p, c, vid, n) {
    return `${head('ＡＥＳＴＨＥＴＩＣ', 'vaporwave', p)}<link href="https://fonts.googleapis.com/css2?family=Righteous&family=Quicksand:wght@400;600&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:linear-gradient(135deg,${p.bg} 0%,#2a1a4e 50%,#1a0a2e 100%);color:${p.text};font-family:'Quicksand',sans-serif;min-height:100vh;overflow-x:hidden}
.mesh{position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse at 20% 50%,rgba(255,113,206,0.12) 0%,transparent 50%),radial-gradient(ellipse at 80% 20%,rgba(1,205,254,0.08) 0%,transparent 50%)}
.mesh::before{content:'';position:absolute;inset:0;background:linear-gradient(transparent 50%,rgba(0,0,0,0.08) 50%);background-size:100% 4px;animation:sc 4s linear infinite}
@keyframes sc{0%{transform:translateY(0)}100%{transform:translateY(4px)}}
.w{max-width:800px;margin:0 auto;padding:6rem 2rem 4rem;position:relative;text-align:center}
h1{font-family:'Righteous',cursive;font-size:clamp(2rem,5vw,4.5rem);background:linear-gradient(135deg,#fff,${p.primary},${p.secondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 30px rgba(255,113,206,0.3));line-height:1.2;margin-bottom:1.5rem}
.sub{color:rgba(255,255,255,0.5);font-size:1.1rem;max-width:500px;margin:0 auto 3rem;line-height:1.6}
.words{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin:3rem 0}
.word{padding:0.6rem 1.5rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,113,206,0.15);border-radius:999px;font-size:0.9rem;color:${p.primary};backdrop-filter:blur(10px);transition:all 0.4s}
.word:hover{border-color:${p.primary};box-shadow:0 0 20px rgba(255,113,206,0.2);transform:scale(1.05)}
.poem{margin:3rem 0;padding:2.5rem;background:rgba(255,255,255,0.02);border:1px solid rgba(255,113,206,0.1);border-radius:1.5rem;backdrop-filter:blur(10px)}
.poem p{color:rgba(255,255,255,0.5);font-size:1rem;line-height:2;margin-bottom:0.8rem}
.poem .sig{color:${p.accent};font-style:italic}
.btn{display:inline-block;padding:1rem 2.5rem;background:linear-gradient(135deg,${p.primary},${p.secondary});color:#fff;border:none;border-radius:999px;font-weight:600;font-size:1rem;cursor:pointer;text-decoration:none;transition:all 0.3s;box-shadow:0 0 30px rgba(255,113,206,0.3);margin-top:2rem}
.btn:hover{transform:scale(1.05);box-shadow:0 0 50px rgba(255,113,206,0.5)}
footer{text-align:center;padding:3rem 2rem;color:rgba(255,255,255,0.15);font-size:0.85rem}
@media(max-width:640px){.w{padding:4rem 1.5rem 2rem}}
</style></head><body><div class="mesh"></div><div class="w"><h1 class="anim-1">${c.headline}</h1><p class="sub anim-2">${c.subheadline}</p><div class="words anim-3"><span class="word">${c.word1}</span><span class="word">${c.word2}</span><span class="word">${c.word3}</span><span class="word">${c.word4}</span></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p class="sig">${c.poem_line3}</p></div><a class="btn">${c.cta1} →</a><footer><p>${c.footer} · 永遠 · #${n}</p></footer></div></body></html>`;
  },

  // ─── 8. ORGANIC ───
  organic(p, c, vid, n) {
    return `${head(c.headline, 'organic', p)}<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Nunito',sans-serif;line-height:1.6;min-height:100vh}
.b{position:fixed;border-radius:60% 40% 30% 70%/60% 30% 70% 40%;filter:blur(60px);opacity:0.12;pointer-events:none;animation:m 15s ease-in-out infinite}
.b1{width:500px;height:500px;background:${p.primary};top:-100px;left:-100px}
.b2{width:400px;height:400px;background:${p.accent};bottom:-100px;right:-100px;animation-delay:-7s}
@keyframes m{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}}
.w{max-width:800px;margin:0 auto;padding:6rem 2rem 4rem;position:relative}
h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.15;color:${p.primary};margin-bottom:1.5rem}
.sub{font-size:1.1rem;color:${p.muted};max-width:550px;margin-bottom:3rem;line-height:1.7}
.words{display:flex;flex-wrap:wrap;gap:1rem;margin:3rem 0}
.word{padding:0.6rem 1.4rem;background:#fff;border-radius:2rem;font-size:0.95rem;font-weight:700;color:${p.secondary};box-shadow:0 2px 10px rgba(0,0,0,0.04);transition:all 0.3s}
.word:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,0.08)}
.poem{margin:3rem 0;padding:2.5rem;background:#fff;border-radius:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.04)}
.poem p{color:${p.muted};font-size:1rem;line-height:1.8;margin-bottom:0.8rem}
.poem .sig{color:${p.primary};font-weight:700;font-style:italic}
.btn{display:inline-block;padding:1rem 2.5rem;background:${p.primary};color:#fff;border:none;border-radius:2rem;font-weight:700;font-size:1rem;cursor:pointer;text-decoration:none;transition:all 0.3s;margin-top:2rem}
.btn:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(45,80,22,0.25)}
footer{text-align:center;padding:3rem 2rem;color:${p.muted};font-size:0.9rem;border-top:1px solid rgba(0,0,0,0.05);margin-top:3rem}
</style></head><body><div class="b b1"></div><div class="b b2"></div><div class="w"><h1 class="anim-1">${c.headline}</h1><p class="sub anim-2">${c.subheadline}</p><div class="words anim-3"><span class="word">🌿 ${c.word1}</span><span class="word">🍃 ${c.word2}</span><span class="word">🌾 ${c.word3}</span><span class="word">🌻 ${c.word4}</span></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p class="sig">— ${c.poem_line3}</p></div><a class="btn">${c.cta1} →</a><footer><p>${c.footer} · Visitor #${n} · 🌍</p></footer></div></body></html>`;
  },

  // ─── 9. SPACE ───
  space(p, c, vid, n) {
    return `${head(c.headline, 'space', p)}<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Exo 2',sans-serif;min-height:100vh;overflow-x:hidden}
#stars{position:fixed;inset:0;pointer-events:none}
.s{position:absolute;width:2px;height:2px;background:#fff;border-radius:50%;animation:tw var(--d) ease-in-out infinite}
@keyframes tw{0%,100%{opacity:0.3}50%{opacity:1}}
.w{max-width:800px;margin:0 auto;padding:6rem 2rem 4rem;position:relative}
.ring{width:250px;height:250px;border:1px solid rgba(74,158,255,0.12);border-radius:50%;margin:0 auto 3rem;position:absolute;top:8rem;left:50%;transform:translateX(-50%);animation:o 20s linear infinite;pointer-events:none}
.ring::before{content:'';position:absolute;width:10px;height:10px;background:${p.accent};border-radius:50%;top:-5px;left:50%;box-shadow:0 0 15px ${p.accent}}
@keyframes o{0%{transform:translateX(-50%) rotate(0)}100%{transform:translateX(-50%) rotate(360deg)}}
h1{font-family:'Orbitron',sans-serif;font-size:clamp(1.5rem,4vw,3rem);font-weight:900;color:#fff;text-shadow:0 0 40px rgba(74,158,255,0.4);line-height:1.2;margin-bottom:1.5rem;text-align:center}
.sub{color:rgba(224,224,255,0.4);font-size:1.05rem;max-width:500px;margin:0 auto 3rem;line-height:1.6;text-align:center}
.words{display:flex;flex-wrap:wrap;gap:0.8rem;justify-content:center;margin:3rem 0}
.word{padding:0.4rem 1rem;background:rgba(74,158,255,0.03);border:1px solid rgba(74,158,255,0.1);font-size:0.8rem;color:${p.primary};letter-spacing:1px;transition:all 0.3s}
.word:hover{border-color:${p.primary};box-shadow:0 0 15px rgba(74,158,255,0.15)}
.poem{margin:3rem 0;padding:2rem;border:1px solid rgba(74,158,255,0.08);text-align:center}
.poem p{color:rgba(224,224,255,0.35);font-size:0.95rem;line-height:2;margin-bottom:0.5rem}
.poem .sig{color:${p.accent};font-family:'Orbitron',sans-serif;font-size:0.7rem;letter-spacing:2px}
.btn{display:block;width:fit-content;margin:2rem auto;padding:1rem 2.5rem;background:linear-gradient(135deg,${p.primary},${p.secondary});color:#fff;border:none;border-radius:4px;font-family:'Orbitron',sans-serif;font-weight:700;font-size:0.75rem;cursor:pointer;text-decoration:none;letter-spacing:2px;transition:all 0.3s}
.btn:hover{box-shadow:0 0 40px rgba(74,158,255,0.3)}
footer{text-align:center;padding:3rem 2rem;color:rgba(74,158,255,0.15);font-size:0.75rem;font-family:'Orbitron',sans-serif;letter-spacing:1px}
</style></head><body><div id="stars"></div><div class="ring"></div><div class="w"><h1 class="anim-1">${c.headline}</h1><p class="sub anim-2">${c.subheadline}</p><div class="words anim-3"><span class="word">${c.word1}</span><span class="word">${c.word2}</span><span class="word">${c.word3}</span><span class="word">${c.word4}</span></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p class="sig">${c.poem_line3}</p></div><a class="btn">${c.cta1} →</a><footer><p>${c.footer} // VISITOR #${n}</p></footer></div><script>
const s=document.getElementById('stars');
for(let i=0;i<150;i++){const x=document.createElement('div');x.className='s';x.style.left=Math.random()*100+'%';x.style.top=Math.random()*100+'%';x.style.setProperty('--d',(2+Math.random()*4)+'s');x.style.animationDelay=Math.random()*5+'s';s.appendChild(x)}
</script></body></html>`;
  },

  // ─── 10. POP ART ───
  'pop-art'(p, c, vid, n) {
    return `${head(c.headline, 'pop-art', p)}<link href="https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Comic Neue',cursive;line-height:1.5;min-height:100vh}
.dot{position:fixed;inset:0;pointer-events:none;background-image:radial-gradient(circle,rgba(0,0,0,0.06) 1px,transparent 1px);background-size:6px 6px}
.w{max-width:900px;margin:0 auto;padding:4rem 2rem;position:relative}
.panel{background:#fff;border:4px solid #000;padding:2.5rem;margin:2rem 0;box-shadow:8px 8px 0 #000;position:relative}
.panel::before{content:'★';position:absolute;top:-15px;left:-15px;background:${p.accent};color:#fff;font-family:'Bangers',cursive;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:3px solid #000;font-size:1.2rem}
h1{font-family:'Bangers',cursive;font-size:clamp(2.5rem,6vw,5rem);color:${p.primary};text-shadow:4px 4px 0 #000;letter-spacing:2px;line-height:1.1;margin-bottom:1rem}
.sub{font-size:1.2rem;color:#333;font-weight:700}
.words{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;margin:2rem 0}
@media(max-width:640px){.words{grid-template-columns:1fr}}
.word{background:#fff;border:4px solid #000;padding:1.5rem;text-align:center;font-family:'Bangers',cursive;font-size:1.2rem;color:${p.secondary};box-shadow:5px 5px 0 #000}
.word:nth-child(even){transform:rotate(2deg);color:${p.accent}}
.word:nth-child(odd){transform:rotate(-1deg)}
.poem{background:${p.primary};color:#fff;border:4px solid #000;padding:2rem;margin:2rem 0;box-shadow:8px 8px 0 #000}
.poem p{font-size:1.1rem;font-weight:700;margin-bottom:0.8rem}
.poem .sig{text-align:right;font-style:italic;opacity:0.8}
.btn{display:inline-block;padding:1rem 2.5rem;background:${p.secondary};color:#fff;border:4px solid #000;font-family:'Bangers',cursive;font-size:1.2rem;cursor:pointer;text-decoration:none;box-shadow:6px 6px 0 #000;transition:all 0.2s;margin-top:1rem}
.btn:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 #000}
footer{text-align:center;padding:2rem;font-family:'Bangers',cursive;font-size:1rem;letter-spacing:1px}
</style></head><body><div class="dot"></div><div class="w"><div class="panel"><h1 class="anim-1">${c.headline}</h1><p class="sub anim-2">${c.subheadline}</p></div><div class="words anim-3"><div class="word">💥 ${c.word1}</div><div class="word">⚡ ${c.word2}</div><div class="word">🔥 ${c.word3}</div><div class="word">💣 ${c.word4}</div></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p class="sig">${c.poem_line3}</p></div><a class="btn">${c.cta1}!</a><footer><p>${c.footer} · VISITOR #${n} · © 2026</p></footer></div></body></html>`;
  },

  // ─── 11. TERMINAL ───
  terminal(p, c, vid, n) {
    return `${head(c.headline, 'terminal', p)}<link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.primary};font-family:'Fira Code',monospace;font-size:0.9rem;line-height:1.6;min-height:100vh}
body::before{content:'';position:fixed;inset:0;background:linear-gradient(transparent 50%,rgba(0,255,0,0.02) 50%);background-size:100% 2px;pointer-events:none;z-index:9999}
.w{max-width:850px;margin:0 auto;padding:2rem}
@media(max-width:640px){.w{padding:1rem;font-size:0.8rem}}
.pr{color:${p.accent}}
.cmd{color:#fff}
.cm{color:${p.muted}}
.s{margin:2rem 0;padding:1.5rem 0;border-bottom:1px solid rgba(0,255,0,0.08)}
h1{font-size:clamp(1.2rem,3vw,2rem);color:#fff;margin-bottom:0.5rem;font-weight:700}
.out{color:rgba(0,255,0,0.6);margin:0.5rem 0}
.words{display:grid;grid-template-columns:repeat(2,1fr);gap:0.5rem;margin:1rem 0}
@media(max-width:640px){.words{grid-template-columns:1fr}}
.word{color:#fff;font-weight:700}
.word::before{content:'  ';color:${p.accent}}
.poem{margin:1.5rem 0}
.poem p{color:rgba(0,255,0,0.5);margin-bottom:0.3rem}
.poem .sig{color:${p.accent}}}
.btn{display:inline-block;padding:0.8rem 2rem;background:transparent;color:${p.primary};border:1px solid ${p.primary};font-family:'Fira Code',monospace;font-size:0.85rem;cursor:pointer;text-decoration:none;transition:all 0.3s;margin-top:1rem}
.btn:hover{background:${p.primary};color:#000}
.bar{position:fixed;bottom:0;left:0;right:0;padding:0.5rem 2rem;background:rgba(0,255,0,0.03);border-top:1px solid rgba(0,255,0,0.08);font-size:0.7rem;display:flex;justify-content:space-between}
</style></head><body><div class="w"><div class="s anim-1"><span class="pr">guest@art:~$</span> <span class="cmd">cat /dev/random > /dev/soul</span><br><span class="cm"># decoding beauty from entropy...</span><br><span class="out">✓ signal acquired.</span><br><br><h1>${c.headline}</h1><p class="out">${c.subheadline}</p><br><a class="btn anim-2">${c.cta1} <span style="animation:bl 1s step-end infinite;display:inline-block;width:8px;height:1em;background:${p.primary};vertical-align:middle"></span></a></div><div class="s"><span class="pr">guest@art:~$</span> <span class="cmd">ls -la /vocabulary/</span><br><div class="words"><div class="word">${c.word1}</div><div class="word">${c.word2}</div><div class="word">${c.word3}</div><div class="word">${c.word4}</div></div></div><div class="s"><span class="pr">guest@art:~$</span> <span class="cmd">cat /var/log/poetry.log</span><br><div class="poem"><p class="out">${c.poem_line1}</p><p class="out">${c.poem_line2}</p><p class="sig">${c.poem_line3}</p></div></div><div class="s"><span class="pr">guest@art:~$</span> <span class="cmd">echo "${c.footer}"</span><br><p class="out">${c.footer}</p></div></div><div class="bar"><span>guest@art</span><span>VISITOR #${n}</span><span>PID:$$</span></div></body></html>`;
  },

  // ─── 12. WATERCOLOR ───
  watercolor(p, c, vid, n) {
    return `${head(c.headline, 'watercolor', p)}<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Kalam:wght@300;400;700&display=swap" rel="stylesheet"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:${p.bg};color:${p.text};font-family:'Kalam',cursive;line-height:1.7;min-height:100vh;overflow-x:hidden}
.wash{position:fixed;border-radius:50%;filter:blur(80px);opacity:0.1;pointer-events:none}
.w1{width:500px;height:500px;background:${p.primary};top:-150px;right:-100px;animation:p 20s ease-in-out infinite}
.w2{width:400px;height:400px;background:${p.secondary};bottom:-100px;left:-100px;animation:p 25s ease-in-out infinite reverse}
@keyframes p{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-20px) scale(1.1)}66%{transform:translate(-20px,30px) scale(0.9)}}
.w{max-width:750px;margin:0 auto;padding:6rem 2rem 4rem;position:relative}
.frame{background:#fff;border-radius:2rem;padding:3rem;box-shadow:0 10px 40px rgba(0,0,0,0.04);position:relative}
.frame::before{content:'';position:absolute;inset:-3px;border-radius:2.2rem;background:linear-gradient(135deg,${p.primary},${p.secondary});z-index:-1;opacity:0.2}
h1{font-family:'Caveat',cursive;font-size:clamp(2.5rem,5vw,4rem);font-weight:700;color:${p.secondary};margin-bottom:1rem;line-height:1.2}
.sub{color:${p.muted};font-size:1.05rem;max-width:500px;margin-bottom:2rem}
.words{display:flex;flex-wrap:wrap;gap:0.8rem;margin:2rem 0}
.word{padding:0.4rem 1.2rem;font-family:'Caveat',cursive;font-size:1.2rem;font-weight:700;color:${p.secondary};border-bottom:2px solid ${p.accent};opacity:0.8}
.poem{margin:2rem 0;padding:2rem 0;border-top:1px dashed ${p.accent};border-bottom:1px dashed ${p.accent}}
.poem p{color:${p.muted};font-size:1rem;line-height:1.8;margin-bottom:0.5rem}
.poem .sig{color:${p.secondary};font-family:'Caveat',cursive;font-size:1.2rem;text-align:right;margin-top:1rem}
.btn{display:inline-block;padding:1rem 2.5rem;background:${p.secondary};color:#fff;border:none;border-radius:2rem;font-family:'Caveat',cursive;font-size:1.3rem;font-weight:700;cursor:pointer;text-decoration:none;transition:all 0.3s;margin-top:1.5rem}
.btn:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(224,122,95,0.25)}
footer{text-align:center;padding:3rem 2rem;color:${p.muted};font-family:'Caveat',cursive;font-size:1.1rem}
</style></head><body><div class="wash w1"></div><div class="wash w2"></div><div class="w"><div class="frame"><h1 class="anim-1">${c.headline}</h1><p class="sub anim-2">${c.subheadline}</p><div class="words anim-3"><span class="word">${c.word1}</span><span class="word">${c.word2}</span><span class="word">${c.word3}</span><span class="word">${c.word4}</span></div><div class="poem"><p>${c.poem_line1}</p><p>${c.poem_line2}</p><p class="sig">${c.poem_line3}</p></div><a class="btn">${c.cta1} →</a></div><footer><p>${c.footer} · Visitor #${n} · ✿</p></footer></div></body></html>`;
  },
};

const RENDERERS = R;
