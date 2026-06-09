// AI Content Generator - Uses Workers AI to create unique landing page content

const THEMES = [
  { name: 'Cyberpunk', bg: '#0a0a1a', accent: '#00f0ff', text: '#e0e0ff', glow: 'cyan' },
  { name: 'Sunset', bg: '#1a0a0a', accent: '#ff6b35', text: '#ffe0d0', glow: 'orange' },
  { name: 'Forest', bg: '#0a1a0a', accent: '#00ff88', text: '#d0ffe0', glow: 'green' },
  { name: 'Royal', bg: '#0a0a2a', accent: '#a855f7', text: '#e0d0ff', glow: 'purple' },
  { name: 'Golden', bg: '#1a1a0a', accent: '#fbbf24', text: '#fff0d0', glow: 'gold' },
  { name: 'Ocean', bg: '#0a1a2a', accent: '#38bdf8', text: '#d0f0ff', glow: 'blue' },
  { name: 'Neon', bg: '#0a0a0a', accent: '#f000ff', text: '#ffd0ff', glow: 'pink' },
  { name: 'Ember', bg: '#1a0a00', accent: '#ff4400', text: '#ffccaa', glow: 'red' },
];

const HEADLINE_STYLES = [
  'bold-tech', 'elegant-minimal', 'playful-fun', 'corporate-pro', 'startup-hype'
];

export async function generateLandingContent(ai, context) {
  // Deterministic but unique per visitor
  const seed = hashString(context.visitorId + context.country);
  const theme = THEMES[seed % THEMES.length];
  const style = HEADLINE_STYLES[(seed >> 4) % HEADLINE_STYLES.length];

  // Try AI generation, fall back to templates
  let aiText = null;
  try {
    aiText = await generateWithAI(ai, theme, style, context);
  } catch (e) {
    console.log('AI generation failed, using templates:', e.message);
  }

  return {
    theme,
    style,
    headline: aiText?.headline || getTemplateHeadline(seed, style),
    subheadline: aiText?.subheadline || getTemplateSubheadline(seed, style),
    ctaText: aiText?.ctaText || getTemplateCTA(seed),
    features: aiText?.features || getTemplateFeatures(seed),
    visitorMessage: getVisitorMessage(context.visitorCount, context.country),
  };
}

async function generateWithAI(ai, theme, style, context) {
  const prompt = `You are a creative copywriter for a tech commerce website called "AutoCommerz". 
Generate unique landing page content. Be creative and different each time.

Theme: ${theme.name}
Style: ${style}
Visitor country: ${context.country}
Visitor number: ${context.visitorCount}

Respond in JSON format with these exact keys:
{
  "headline": "A catchy headline (max 10 words)",
  "subheadline": "A compelling subheadline (max 20 words)",
  "ctaText": "Call-to-action button text (max 5 words)",
  "features": ["feature 1 title: short description", "feature 2 title: short description", "feature 3 title: short description"]
}

Make it unique, engaging, and match the ${theme.name} theme. Only return valid JSON.`;

  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt,
    max_tokens: 512,
    temperature: 0.9,
  });

  // Parse AI response
  const text = response.response || '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return null;
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getTemplateHeadline(seed, style) {
  const headlines = {
    'bold-tech': ['The Future of Commerce is Here', 'Next-Gen Commerce Platform', 'Commerce Reimagined', 'AI-Powered Business Revolution'],
    'elegant-minimal': ['Commerce, Simplified', 'Effortless Commerce', 'Simply Better Commerce', 'Commerce Without Limits'],
    'playful-fun': ['Commerce That Actually Rocks!', 'Your Business Deserves Better', 'Commerce on Steroids', 'Level Up Your Business'],
    'corporate-pro': ['Enterprise Commerce Solutions', 'Scale Your Business Today', 'Professional Commerce Platform', 'Built for Growth'],
    'startup-hype': ['Disrupt Commerce Forever', 'The Commerce OS', '10x Your Revenue', 'Commerce at Lightspeed'],
  };
  const options = headlines[style] || headlines['bold-tech'];
  return options[seed % options.length];
}

function getTemplateSubheadline(seed, style) {
  const subs = [
    'AI-powered tools that help you sell more, faster, and smarter.',
    'The all-in-one platform for modern businesses that refuse to settle.',
    'From startup to enterprise — one platform that grows with you.',
    'Stop managing tools. Start growing your business.',
    'Where artificial intelligence meets commerce excellence.',
  ];
  return subs[seed % subs.length];
}

function getTemplateCTA(seed) {
  const ctas = ['Get Started Free', 'Start Selling Now', 'Try It Free', 'Join the Revolution', 'Launch Your Store'];
  return ctas[seed % ctas.length];
}

function getTemplateFeatures(seed) {
  const allFeatures = [
    'AI Product Descriptions: Auto-generate compelling product copy in seconds',
    'Smart Analytics: Real-time insights that actually make sense',
    'One-Click Checkout: Reduce cart abandonment by 40%',
    'Global Payments: Accept payments from 190+ countries',
    'Inventory AI: Predict demand before it happens',
    'SEO Automation: Rank higher without lifting a finger',
    'Social Selling: Sell everywhere your customers are',
    'Fraud Protection: AI that catches fraud before it costs you',
  ];
  // Pick 3 unique features based on seed
  const idx = seed % allFeatures.length;
  return [
    allFeatures[idx],
    allFeatures[(idx + 1) % allFeatures.length],
    allFeatures[(idx + 2) % allFeatures.length],
  ];
}

function getVisitorMessage(count, country) {
  if (count === 1) return '🎉 You\'re the very first visitor!';
  if (count <= 10) return `🔥 You're visitor #${count} — you're among the first!`;
  if (count <= 100) return `⭐ Visitor #${count} — welcome to the future!`;
  if (count <= 1000) return `💫 Join ${count}+ visitors discovering the future of commerce`;
  return `🚀 Join thousands of visitors from ${country || 'around the world'}`;
}
