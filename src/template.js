// HTML Template Generator - Dark themed, glassmorphism, fully responsive

export function getPageTemplate(data) {
  const { theme, headline, subheadline, ctaText, features, visitorMessage, visitorId, visitorCount } = data;

  const featureCards = features.map((f, i) => {
    const [title, desc] = f.split(': ');
    return `
    <div class="feature-card" style="--delay: ${i * 0.15}s">
      <div class="feature-icon">${getFeatureIcon(title)}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
    </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AutoCommerz — The Future of Commerce</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --bg: ${theme.bg};
      --accent: ${theme.accent};
      --text: ${theme.text};
      --glow: ${theme.glow};
      --glass-bg: rgba(255,255,255,0.03);
      --glass-border: rgba(255,255,255,0.08);
      --glass-hover: rgba(255,255,255,0.06);
    }

    html { scroll-behavior: smooth; font-size: 16px; }

    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    /* Animated background */
    .bg-mesh {
      position: fixed;
      inset: 0;
      z-index: 0;
      overflow: hidden;
      pointer-events: none;
    }
    .bg-mesh::before, .bg-mesh::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.15;
      animation: float 20s ease-in-out infinite;
    }
    .bg-mesh::before {
      width: 600px; height: 600px;
      background: var(--accent);
      top: -200px; right: -200px;
    }
    .bg-mesh::after {
      width: 400px; height: 400px;
      background: ${theme.glow === 'purple' ? '#a855f7' : theme.glow === 'cyan' ? '#06b6d4' : theme.glow === 'green' ? '#22c55e' : theme.glow === 'orange' ? '#f97316' : theme.glow === 'pink' ? '#ec4899' : theme.glow === 'blue' ? '#3b82f6' : theme.glow === 'gold' ? '#eab308' : '#ef4444'};
      bottom: -100px; left: -100px;
      animation-delay: -10s;
    }
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(50px, -30px) scale(1.05); }
      66% { transform: translate(-30px, 40px) scale(0.95); }
    }

    /* Navbar */
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(10, 10, 20, 0.6);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--glass-border);
    }
    .logo {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 700;
      font-size: 1.3rem;
      background: linear-gradient(135deg, var(--accent), #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.5px;
    }
    .logo span { opacity: 0.4; font-weight: 400; }
    .nav-cta {
      padding: 0.5rem 1.2rem;
      background: var(--accent);
      color: #000;
      border: none;
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      text-decoration: none;
    }
    .nav-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(${hexToRgb(theme.accent)}, 0.3);
    }
    .visitor-badge {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.3);
      font-weight: 500;
    }

    /* Hero */
    .hero {
      position: relative;
      z-index: 1;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 6rem 1.5rem 4rem;
    }
    .hero-content { max-width: 800px; }

    .theme-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 1rem;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--accent);
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);
      animation: fadeInUp 0.8s ease-out;
    }
    .theme-badge::before {
      content: '';
      width: 6px; height: 6px;
      background: var(--accent);
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
    }

    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2.2rem, 6vw, 4.5rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -1.5px;
      margin-bottom: 1.5rem;
      animation: fadeInUp 0.8s ease-out 0.15s both;
      background: linear-gradient(135deg, #fff 30%, var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subheadline {
      font-size: clamp(1rem, 2.5vw, 1.25rem);
      line-height: 1.6;
      color: rgba(255,255,255,0.6);
      max-width: 600px;
      margin: 0 auto 2.5rem;
      animation: fadeInUp 0.8s ease-out 0.3s both;
    }

    .cta-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      animation: fadeInUp 0.8s ease-out 0.45s both;
    }
    .btn-primary {
      padding: 0.9rem 2rem;
      background: linear-gradient(135deg, var(--accent), ${adjustBrightness(theme.accent, 20)});
      color: #000;
      border: none;
      border-radius: 999px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(${hexToRgb(theme.accent)}, 0.35);
    }
    .btn-secondary {
      padding: 0.9rem 2rem;
      background: var(--glass-bg);
      color: var(--text);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      backdrop-filter: blur(10px);
    }
    .btn-secondary:hover {
      background: var(--glass-hover);
      border-color: rgba(255,255,255,0.15);
      transform: translateY(-2px);
    }

    /* Features */
    .features {
      position: relative;
      z-index: 1;
      padding: 4rem 1.5rem 6rem;
      max-width: 1100px;
      margin: 0 auto;
    }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .feature-card {
      padding: 2rem;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 1.2rem;
      backdrop-filter: blur(10px);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      animation: fadeInUp 0.6s ease-out var(--delay) both;
    }
    .feature-card:hover {
      transform: translateY(-5px);
      border-color: rgba(${hexToRgb(theme.accent)}, 0.3);
      box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(${hexToRgb(theme.accent)}, 0.1);
    }
    .feature-icon {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .feature-card h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      color: #fff;
    }
    .feature-card p {
      font-size: 0.9rem;
      line-height: 1.6;
      color: rgba(255,255,255,0.5);
    }

    /* Visitor banner */
    .visitor-banner {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      padding: 0.6rem 1.2rem;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 500;
      backdrop-filter: blur(15px);
      z-index: 100;
      animation: fadeInUp 1s ease-out 1s both;
      color: rgba(255,255,255,0.6);
    }

    /* Footer */
    footer {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 3rem 1.5rem;
      border-top: 1px solid var(--glass-border);
      color: rgba(255,255,255,0.25);
      font-size: 0.8rem;
    }

    /* Animations */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.5); }
    }

    /* Responsive */
    @media (max-width: 640px) {
      nav { padding: 0.8rem 1rem; }
      .logo { font-size: 1.1rem; }
      .hero { padding: 5rem 1rem 3rem; }
      .features { padding: 2rem 1rem 4rem; }
      .feature-card { padding: 1.5rem; }
      .cta-group { flex-direction: column; align-items: center; }
      .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="bg-mesh"></div>

  <nav>
    <div class="logo">auto<span>comm</span>erz</div>
    <div style="display:flex;align-items:center;gap:1rem">
      <span class="visitor-badge" title="Visitor #${visitorCount}">ID: ${visitorId}</span>
      <a href="#features" class="nav-cta">${ctaText}</a>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-content">
      <div class="theme-badge">${theme.name} Theme</div>
      <h1>${headline}</h1>
      <p class="subheadline">${subheadline}</p>
      <div class="cta-group">
        <a href="#features" class="btn-primary">${ctaText} →</a>
        <a href="#features" class="btn-secondary">Learn More</a>
      </div>
    </div>
  </section>

  <section class="features" id="features">
    <div class="features-grid">
      ${featureCards}
    </div>
  </section>

  <footer>
    <p>Powered by Cloudflare Workers AI · AutoCommerz © ${new Date().getFullYear()}</p>
  </footer>

  <div class="visitor-banner">${visitorMessage}</div>

  <script>
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });
  </script>
</body>
</html>`;
}

function getFeatureIcon(title) {
  const icons = {
    'AI Product Descriptions': '✨',
    'Smart Analytics': '📊',
    'One-Click Checkout': '⚡',
    'Global Payments': '🌍',
    'Inventory AI': '📦',
    'SEO Automation': '🔍',
    'Social Selling': '🛒',
    'Fraud Protection': '🛡️',
  };
  return icons[title] || '🚀';
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}

function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + percent);
  const g = Math.min(255, ((num >> 8) & 0x00FF) + percent);
  const b = Math.min(255, (num & 0x0000FF) + percent);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}
