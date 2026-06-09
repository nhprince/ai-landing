// AI Content Generator — Picks a random art style and generates unique content per visit
import { ART_STYLES, TYPOGRAPHY, COLOR_PALETTES } from './art-styles.js';

// Pick a random art style based on visitor fingerprint
export function pickStyle(visitorId, timestamp) {
  const seed = hashString(visitorId + timestamp);
  return ART_STYLES[seed % ART_STYLES.length];
}

// Generate all content for a visit
export async function generateVisit(ai, style, context) {
  const palette = COLOR_PALETTES[style.id];
  const fonts = TYPOGRAPHY[style.typography];

  // Try AI content generation
  let content;
  try {
    content = await generateAIContent(ai, style, context);
  } catch (e) {
    console.log('AI gen failed, using templates:', e.message);
  }

  // Fallback to template content
  if (!content) {
    content = getTemplateContent(style.id, context);
  }

  return {
    style,
    palette,
    fonts,
    content,
    visitorId: context.visitorId.substring(0, 8),
    visitorCount: context.visitorCount,
  };
}

async function generateAIContent(ai, style, context) {
  const prompt = `You are a creative director designing a website in the "${style.name}" art style.

Generate landing page content for an AI-powered commerce platform. Return ONLY valid JSON:

{
  "headline": "short punchy headline (max 8 words)",
  "subheadline": "one compelling sentence (max 15 words)",
  "cta1": "primary button text (max 4 words)",
  "cta2": "secondary button text (max 4 words)",
  "feature1_title": "feature name", "feature1_desc": "one sentence description",
  "feature2_title": "feature name", "feature2_desc": "one sentence description",
  "feature3_title": "feature name", "feature3_desc": "one sentence description",
  "feature4_title": "feature name", "feature4_desc": "one sentence description",
  "testimonial_quote": "a customer quote (max 20 words)",
  "testimonial_name": "customer name and title",
  "footer_tagline": "a clever footer one-liner (max 10 words)"
}

Make it creative, unique, and fitting for "${style.name}" aesthetic.`;

  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt,
    max_tokens: 640,
    temperature: 0.95,
  });

  const text = response.response || '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return null;
}

function getTemplateContent(styleId, context) {
  const templates = {
    'cyberpunk': {
      headline: 'ENTER THE MATRIX OF COMMERCE',
      subheadline: 'Neural-powered shopping in the digital underground',
      cta1: 'JACK IN', cta2: 'LEARN MORE',
      feature1_title: 'Neural Analytics', feature1_desc: 'Real-time market predictions via quantum algorithms',
      feature2_title: 'Ghost Payments', feature2_desc: 'Untraceable cryptocurrency checkout in 0.3 seconds',
      feature3_title: 'Data Fortress', feature3_desc: 'Military-grade encryption for every transaction',
      feature4_title: 'Net Runner AI', feature4_desc: 'Autonomous shopping agents that work 24/7',
      testimonial_quote: 'This is the future of shopping. Nothing else comes close.',
      testimonial_name: 'Zara K., Net Runner',
      footer_tagline: 'The future is already here',
    },
    'brutalist': {
      headline: 'COMMERCE. STRIPPED BARE.',
      subheadline: 'No bullshit. No fluff. Just raw business tools that work.',
      cta1: 'GET STARTED', cta2: 'READ MORE',
      feature1_title: 'FAST', feature1_desc: 'Your store loads in under 500 milliseconds. Period.',
      feature2_title: 'SIMPLE', feature2_desc: 'One dashboard. Every metric. Zero confusion.',
      feature3_title: 'CHEAP', feature2_desc: 'No hidden fees. No surprises. What you see is what you pay.',
      feature4_title: 'RELIABLE', feature4_desc: '99.99% uptime. We sleep so you don\'t have to.',
      testimonial_quote: 'Finally, a platform that respects my time and my intelligence.',
      testimonial_name: 'Marcus T., Founder',
      footer_tagline: 'Built different. Built better.',
    },
    'glassmorphism': {
      headline: 'Commerce, Beautifully Reimagined',
      subheadline: 'Where elegance meets intelligence in perfect harmony',
      cta1: 'Explore Now', cta2: 'Watch Demo',
      feature1_title: 'Crystal Clear Analytics', feature1_desc: 'Beautiful dashboards that make data feel alive',
      feature2_title: 'Floating Checkout', feature2_desc: 'A checkout experience so smooth it feels weightless',
      feature3_title: 'Glass Inventory', feature3_desc: 'See through your entire supply chain in real-time',
      feature4_title: 'Luminous AI', feature4_desc: 'Smart recommendations that glow with insight',
      testimonial_quote: 'It\'s not just a platform, it\'s an experience that sparkles.',
      testimonial_name: 'Luna V., Creative Director',
      footer_tagline: 'See the future through glass',
    },
    'retro-pixel': {
      headline: 'PRESS START TO EARN',
      subheadline: 'Level up your business in the 8-bit marketplace',
      cta1: 'START GAME', cta2: 'HIGH SCORES',
      feature1_title: 'POWER-UPS', feature1_desc: 'Boost sales with AI-generated product descriptions',
      feature2_title: 'ACHIEVEMENTS', feature2_desc: 'Unlock badges as you hit revenue milestones',
      feature3_title: 'MULTIPLAYER', feature3_desc: 'Collaborate with your team in real-time',
      feature4_title: 'SAVE POINTS', feature4_desc: 'Never lose progress with automatic cloud backups',
      testimonial_quote: 'I went from Level 1 to Level 99 in just 3 months!',
      testimonial_name: 'Player One, CEO',
      footer_tagline: 'GAME OVER FOR B2B BORING',
    },
    'editorial': {
      headline: 'The Art of Modern Commerce',
      subheadline: 'How a new generation of merchants is rewriting the rules of business',
      cta1: 'Subscribe', cta2: 'Read More',
      feature1_title: 'The New Canvas', feature1_desc: 'Design your storefront like a masterpiece',
      feature2_title: 'Editorial Analytics', feature2_desc: 'Stories your data tells when you listen closely',
      feature3_title: 'The Long Read', feature3_desc: 'SEO content that reads like premium journalism',
      feature4_title: 'Gallery Mode', feature4_desc: 'Present products in editorial spreads',
      testimonial_quote: 'It transformed our brand from a shop into a publication.',
      testimonial_name: 'Eleanor W., Editor-in-Chief',
      footer_tagline: 'The business of beautiful commerce',
    },
    'minimal-jp': {
      headline: '静寂の中の成長',
      subheadline: 'Less noise. More growth. Commerce finds its balance.',
      cta1: '始める', cta2: '詳しく',
      feature1_title: '間 (Ma)', feature1_desc: 'Space between actions creates clarity in decisions',
      feature2_title: '木 (Ki)', feature2_desc: 'Growth rings of data show your business evolution',
      feature3_title: '風 (Kaze)', feature3_desc: 'Swift operations that flow like wind through your store',
      feature4_title: '石 (Ishi)', feature4_desc: 'Solid foundations that weather any market storm',
      testimonial_quote: 'In simplicity, we found our most powerful growth.',
      testimonial_name: 'Yuki T., Founder',
      footer_tagline: '静けさの中に力がある',
    },
    'vaporwave': {
      headline: 'ＡＵＴＯＭＡＴＥＤ ＢＥＡＵＴＹ',
      subheadline: 'Welcome to the eternal summer of digital commerce, 永远',
      cta1: '進入', cta2: 'VIEW mirror',
      feature1_title: 'Chrome Dreams', feature1_desc: 'Reflections of your best-selling products in digital pools',
      feature2_title: 'Palm Analytics', feature2_desc: 'Tropical data visualizations under neon sunsets',
      feature3_title: 'Sunset Inventory', feature3_desc: 'Watch your stock levels rise and fall like ocean tides',
      feature4_title: 'Infinite Mall', feature4_desc: 'Navigator through an endless virtual shopping paradise',
      testimonial_quote: 'It\'s like shopping in a dream that never ends.',
      testimonial_name: 'マックス, Digital Nomad',
      footer_tagline: '永遠の夏はここにあります',
    },
    'organic': {
      headline: 'Grow Your Business Naturally',
      subheadline: 'Rooted in data, branching toward success, blooming with results',
      cta1: 'Plant Seeds', cta2: 'See Garden',
      feature1_title: 'Root System', feature1_desc: 'Deep analytics that dig into the soil of your business',
      feature2_title: 'Branch Out', feature2_desc: 'Expand to new markets like branches reaching for sunlight',
      feature3_title: 'Seasonal Cycles', feature3_desc: 'Predict and prepare for natural business rhythms',
      feature4_title: 'Pollination AI', feature4_desc: 'Cross-pollinate ideas across your marketing channels',
      testimonial_quote: 'Our revenue grew 300% like wildflowers after rain.',
      testimonial_name: 'Flora G., Organic Farmer & CEO',
      footer_tagline: 'From small seeds, mighty oaks grow',
    },
    'space': {
      headline: 'BEYOND THE COMMERCE EVENT HORIZON',
      subheadline: 'Navigate the infinite marketplace of the cosmos',
      cta1: 'LAUNCH', cta2: 'VIEW STARS',
      feature1_title: 'Warp Drive Checkout', feature1_desc: 'Transactions faster than light across 190+ countries',
      feature2_title: 'Orbital Analytics', feature2_desc: 'See your business from every angle in 3D space',
      feature3_title: 'Asteroid Mining AI', feature3_desc: 'Extract valuable insights from raw data asteroids',
      feature4_title: 'Galaxy Inventory', feature4_desc: 'Manage products across multiple dimensions and timelines',
      testimonial_quote: 'Revenue increased 500% after launching into this galaxy.',
      testimonial_name: 'Cmdr. Shepard, Space Merchant',
      footer_tagline: 'The universe is your marketplace',
    },
    'pop-art': {
      headline: 'WOW! COMMERCE EXPLOSION!',
      subheadline: 'BAM! POW! Your business just got a serious upgrade, baby!',
      cta1: 'BOOM GO!', cta2: 'SEE ART',
      feature1_title: 'POP! Analytics', feature1_desc: 'KAPOW! Data hits you in the face with color!',
      feature2_title: 'ZAP! Checkout', feature2_desc: 'WHAM! One click and you\'re done, no waiting!',
      feature3_title: 'CRASH! Inventory', feature4_desc: 'THUD! Stock management that makes a statement!',
      feature4_title: 'BANG! AI', feature4_desc: 'BOOM! Smart suggestions that pop off the screen!',
      testimonial_quote: 'This platform is a MASTERWORK of modern business art!',
      testimonial_name: 'Andy W., Pop Artist & Entrepreneur',
      footer_tagline: 'ART IS COMMERCE. COMMERCE IS ART.',
    },
    'terminal': {
      headline: '$ ./launch_commerce.sh',
      subheadline: '[[ SYSTEM READY ]] Initializing intelligent trade protocols...',
      cta1: 'EXEC >>', cta2: 'MAN PAGE',
      feature1_title: '[ANALYTICS]', feature1_desc: '> scanning market data... pattern detected: GROWTH',
      feature2_title: '[PAYMENTS]', feature2_desc: '> processing gateway online. Uptime: 99.99%',
      feature3_title: '[INVENTORY]', feature3_desc: '> stock matrix synchronized across all nodes',
      feature4_title: '[AI_CORE]', feature4_desc: '> neural network active. Predictions: ACCURATE',
      testimonial_quote: '> echo "Best platform ever. 10/10 would recommend."',
      testimonial_name: 'root@commerce:~#',
      footer_tagline: '// END TRANSMISSION //',
    },
    'watercolor': {
      headline: 'Painted With Purpose',
      subheadline: 'Where brushstrokes of data create masterpieces of commerce',
      cta1: 'Dip Brush', cta2: 'View Gallery',
      feature1_title: 'Watercolor Analytics', feature1_desc: 'Data flows like paint, revealing patterns in every hue',
      feature2_title: 'Wet-on-Wet SEO', feature3_desc: 'Strategies blend naturally into organic growth',
      feature3_title: 'Palette Inventory', feature3_desc: 'Organize products in harmonious color families',
      feature4_title: 'Brushstroke AI', feature4_desc: 'Each recommendation is a deliberate artistic choice',
      testimonial_quote: 'Our sales grew like watercolor on wet paper — beautifully and naturally.',
      testimonial_name: 'Clara M., Artist & Merchant',
      footer_tagline: 'Every business is a canvas',
    },
  };

  return templates[styleId] || templates['glassmorphism'];
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}
