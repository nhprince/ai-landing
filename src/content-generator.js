// Art Content Generator — Pure creative content, no branding, no commerce
import { ART_STYLES, COLOR_PALETTES } from './art-styles.js';

// Pick style from visitor fingerprint
export function pickStyle(visitorId, timestamp) {
  const seed = hashString(visitorId + timestamp);
  return ART_STYLES[seed % ART_STYLES.length];
}

// Generate all content for a visit
export async function generateVisit(ai, style, context) {
  const palette = COLOR_PALETTES[style.id];
  let content;
  try {
    content = await generateAIContent(ai, style, context);
  } catch (e) {
    console.log('AI gen failed, using templates:', e.message);
  }
  if (!content) {
    content = getTemplateContent(style.id);
  }
  return { style, palette, content,
    visitorId: context.visitorId.substring(0, 8),
    visitorCount: context.visitorCount };
}

async function generateAIContent(ai, style, context) {
  const prompt = `You are a creative artist designing a "${style.name}" themed web art piece.

Return ONLY valid JSON (no markdown, no code fences):
{
  "headline": "a creative headline max 10 words",
  "subheadline": "a poetic sentence max 20 words",
  "cta1": "a fun button label max 4 words",
  "cta2": "another button label max 4 words",
  "word1": "an interesting word or short phrase",
  "word2": "an interesting word or short phrase",
  "word3": "an interesting word or short phrase",
  "word4": "an interesting word or short phrase",
  "poem_line1": "a short poetic line",
  "poem_line2": "a short poetic line",
  "poem_line3": "a short poetic line",
  "footer": "a playful footer message max 15 words"
}

Make it ${style.name === 'Japanese Minimal' ? 'serene and zen' : style.name === 'Cyberpunk' ? 'edgy and futuristic' : style.name === 'Vaporwave' ? 'dreamy and nostalgic' : style.name === 'Brutalist' ? 'bold and raw' : style.name === 'Pop Art' ? 'loud and colorful' : style.name === 'Terminal' ? 'technical and hacker-ish' : style.name === 'Retro Pixel' ? 'playful and gamified' : style.name === 'Editorial' ? 'sophisticated and literary' : style.name === 'Space' ? 'cosmic and awe-inspiring' : style.name === 'Organic' ? 'natural and warm' : style.name === 'Watercolor' ? 'soft and artistic' : 'beautiful and creative'}.`;

  const response = await ai.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt, max_tokens: 512, temperature: 0.95,
  });
  const text = response.response || '';
  const m = text.match(/\{[\s\S]*\}/);
  return m ? JSON.parse(m[0]) : null;
}

function getTemplateContent(id) {
  const T = {
    'cyberpunk': {
      headline: 'NEON DREAMS IN THE STATIC',
      subheadline: 'Where electricity meets imagination in the spaces between',
      cta1: 'Explore Void', cta2: 'Glitch In',
      word1: 'photon', word2: 'cipher', word3: 'neon-drift', word4: 'null-pointer',
      poem_line1: 'In rain-slick streets the neon gods speak',
      poem_line2: 'Your code is poetry, your cursor a sword',
      poem_line3: 'The future is already here — it\'s just unevenly distributed',
      footer: 'Welcome to the other side of the screen',
    },
    'brutalist': {
      headline: 'THIS IS A WEBSITE',
      subheadline: 'It makes no apologies and wastes no pixels',
      cta1: 'Continue', cta2: 'Go Back',
      word1: 'raw', word2: 'honest', word3: 'structural', word4: 'truth',
      poem_line1: 'Form follows function. Function follows truth.',
      poem_line2: 'We don\'t decorate. We reveal.',
      poem_line3: 'The medium is the message. The message is raw.',
      footer: 'Built with zero guarantees and maximum effort',
    },
    'glassmorphism': {
      headline: 'Light Through Glass',
      subheadline: 'Transparency is the ultimate sophistication',
      cta1: 'Float Up', cta2: 'Look Closer',
      word1: 'prismatic', word2: 'ethereal', word3: 'luminous', word4: 'translucent',
      poem_line1: 'Light bends but never breaks through us',
      poem_line2: 'We are the space between seeing and believing',
      poem_line3: 'Blur is just focus that hasn\'t decided yet',
      footer: 'Seen from another angle, everything is art',
    },
    'retro-pixel': {
      headline: 'PRESS START ▶',
      subheadline: 'Your quest begins here, adventurer. Choose your path wisely.',
      cta1: 'START GAME', cta2: 'OPTIONS',
      word1: '8-bit', word2: 'power-up', word3: 'boss-fight', word4: 'respawn',
      poem_line1: '01001000 01100101 01101100 01101100 01101111',
      poem_line2: 'Insert coin to continue',
      poem_line3: 'Game over? Never. Continue? Always.',
      footer: 'HIGH SCORE: ∞ // NO CONTINUES NEEDED',
    },
    'editorial': {
      headline: 'On the Nature of Beautiful Things',
      subheadline: 'An inquiry into the aesthetics of the everyday digital experience',
      cta1: 'Read On', cta2: 'Reflect',
      word1: 'liminal', word2: 'ineffable', word3: 'palimpsest', word4: 'querencia',
      poem_line1: 'Beauty is the first test: there is no permanent place in the world for ugly mathematics',
      poem_line2: 'The web is not a technology, it\'s a canvas that happens to compute',
      poem_line3: 'We shape our tools, and thereafter our tools shape us',
      footer: 'Typography is the craft of endowing human language with a durable visual form',
    },
    'minimal-jp': {
      headline: '空間の中の美',
      subheadline: '余白が語ることを、静かに聞いてください',
      cta1: '眺める', cta2: '戻る',
      word1: '間', word2: '余白', word3: '侘寂', word4: '風雅',
      poem_line1: '一輪の花が咲く',
      poem_line2: '静寂の中に無限がある',
      poem_line3: 'Less is more. More is never enough.',
      footer: '空白は空ではなく、満ちている',
    },
    'vaporwave': {
      headerline: 'ＡＥＳＴＨＥＴＩＣ　ＤＲＥＡＭＳ',
      subheadline: '永遠の夏はここにあります — the eternal 永遠 summer',
      cta1: '進入する', cta2: 'MIRROR',
      word1: 'パステル', word2: 'ノスタルジア', word3: '永遠', word4: '夢',
      poem_line1: 'I miss the internet that didn\'t miss me back',
      poem_line2: 'Palm trees and pink skies forever',
      poem_line3: '资本主义 dreams in a ローマン共和国 sunset',
      footer: '永遠に続く夏の午後 🌴',
    },
    'organic': {
      headline: 'What Grows Here',
      subheadline: 'Seeds of thought planted in digital soil, blooming unexpectedly',
      cta1: 'Plant Seed', cta2: 'Watch Grow',
      word1: 'mycelium', word2: 'canopy', word3: 'watershed', word4: 'compost',
      poem_line1: 'Every ending is just a root looking for new soil',
      poem_line2: 'Growth is slow until it isn\'t — then it\'s wildfire and wildflowers',
      poem_line3: 'The best time to plant a tree was twenty years ago. The second best time is now.',
      footer: 'From small seeds, strange and beautiful things grow',
    },
    'space': {
      headline: 'You Are Stardust',
      subheadline: '13.8 billion years of cosmic evolution led to this moment',
      cta1: 'Launch', cta2: 'Star Map',
      word1: 'pulsar', word2: 'nebula', word3: 'supernova', word4: 'event-horizon',
      poem_line1: 'We are a way for the cosmos to know itself',
      poem_line2: 'The nitrogen in our DNA, the calcium in our teeth, the iron in our blood',
      poem_line3: 'Were made in the interiors of collapsing stars',
      footer: 'You are literally made of stardust. Act like it.',
    },
    'pop-art': {
      headline: 'WOW! WHAT IS THIS??',
      subheadline: 'IT\'S A WEBSITE BUT ALSO MAYBE ART?? WHO KNOWS ANYMORE',
      cta1: 'CLICK ME', cta2: 'NO ME!',
      word1: 'BANG', word2: 'POW', word3: 'ZAP', word4: 'WHOOSH',
      poem_line1: 'Is art! Is design! Is anything if you believe hard enough!',
      poem_line2: 'POP goes the weasel and also arguably the culture',
      poem_line3: 'Everything is art. Everything is trash. Everything is everything.',
      footer: 'THIS IS (NOT) ART © 2026 EVERYONE AND NO ONE',
    },
    'terminal': {
      headerline: '$ cat /dev/random > /dev/soul',
      subheadline: '[[ SIGNAL ACQUIRED ]] Decoding beauty from entropy...',
      cta1: 'EXECUTE', cta2: 'MAN 7 ART',
      word1: 'entropy', word2: 'recursion', word3: 'ecstasy', word4: 'beauty',
      poem_line1: '$ echo "hello world" > /dev/universe',
      poem_line2: '> grep -r "meaning" /dev/null',
      poem_line3: '$ sudo make me_a_sandwich --with=art',
      footer: '// TODO: find the exit; // NOTE: there is no exit; // FIXME: this is the point',
    },
    'watercolor': {
      headline: 'Colors Bleed Into Each Other',
      subheadline: 'Like thoughts on a quiet morning — soft, overlapping, beautiful',
      cta1: 'Dip Brush', cta2: 'Let Dry',
      word1: 'ochre', word2: 'cerulean', word3: 'vermillion', word4: 'sage',
      poem_line1: 'The paper holds the water holds the pigment holds the light',
      poem_line2: 'Every brushstroke is a conversation between control and surrender',
      poem_line3: 'Dry colors whisper. Wet colors sing.',
      footer: 'This page will dry differently for everyone who visits',
    },
  };
  return (T[id] || T['glassmorphism']);
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h) + str.charCodeAt(i);
    h = h & h;
  }
  return Math.abs(h);
}
