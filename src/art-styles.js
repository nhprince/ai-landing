// Art Style Definitions — Each is a completely different visual experience

export const ART_STYLES = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    // Dark background, neon grid, glitch effects, terminal typography
    layout: 'grid-asymmetric',
    typography: 'mono',
    animations: 'glitch-flicker',
    elements: ['neon-grid', 'scanlines', 'terminal-text', 'hud-overlay'],
  },
  {
    id: 'brutalist',
    name: 'Raw Brutalist',
    // Exposed structure, raw HTML feel, bold borders, no-nonsense
    layout: 'single-column',
    typography: 'system',
    animations: 'none',
    elements: ['raw-borders', 'monospace', 'no-images', 'text-heavy'],
  },
  {
    id: 'glassmorphism',
    name: 'Glass & Light',
    // Frosted glass cards, blur effects, soft gradients, floating elements
    layout: 'card-grid',
    typography: 'sans-light',
    animations: 'float-blur',
    elements: ['glass-cards', 'backdrop-blur', 'soft-glow', 'gradient-orbs'],
  },
  {
    id: 'retro-pixel',
    name: 'Retro Pixel Art',
    // Pixel art aesthetic, 8-bit fonts, pixel borders, game-like UI
    layout: 'pixel-grid',
    typography: 'pixel',
    animations: 'pixel-blink',
    elements: ['pixel-borders', 'sprite-icons', '8bit-font', 'game-ui'],
  },
  {
    id: 'editorial',
    name: 'Editorial Magazine',
    // Magazine layout, serif typography, large hero image, columns
    layout: 'magazine-spread',
    typography: 'serif',
    animations: 'fade-elegant',
    elements: ['drop-caps', 'pull-quotes', 'multi-column', 'large-hero'],
  },
  {
    id: 'minimal-jp',
    name: 'Japanese Minimal',
    // Ma (negative space), zen aesthetic, subtle animations, clean
    layout: 'zen-spacing',
    typography: 'sans-ultra-light',
    animations: 'breathe',
    elements: ['negative-space', 'zen-circle', 'subtle-shadows', 'one-accent'],
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave Aesthetic',
    // Pink/purple gradients, Greek statues, palm trees, 80s/90s nostalgia
    layout: 'maximalist',
    typography: 'display',
    animations: 'gradient-shift',
    elements: ['gradient-mesh', 'statue-silhouettes', 'palm-trees', 'chrome-text'],
  },
  {
    id: 'organic',
    name: 'Organic Nature',
    // Earth tones, flowing shapes, natural textures, hand-drawn feel
    layout: 'flowing-organic',
    typography: 'rounded',
    animations: 'grow-bloom',
    elements: ['blob-shapes', 'leaf-patterns', 'earth-tones', 'hand-drawn'],
  },
  {
    id: 'space',
    name: 'Deep Space',
    // Starfield, cosmic gradients, orbital elements, sci-fi UI
    layout: 'orbital',
    typography: 'futuristic',
    animations: 'orbit-pulse',
    elements: ['starfield', 'orbital-rings', 'cosmic-glow', 'sci-fi-hud'],
  },
  {
    id: 'pop-art',
    name: 'Pop Art Explosion',
    // Bold colors, comic dots, speech bubbles, Warhol-inspired
    layout: 'comic-grid',
    typography: 'comic',
    animations: 'pop-bounce',
    elements: ['halftone-dots', 'speech-bubbles', 'bold-outlines', 'comic-panels'],
  },
  {
    id: 'terminal',
    name: 'Hacker Terminal',
    // Green-on-black, typing animation, command-line interface, matrix rain
    layout: 'terminal-cli',
    typography: 'mono-green',
    animations: 'type-matrix',
    elements: ['typing-cursor', 'matrix-rain', 'command-prompt', 'ascii-art'],
  },
  {
    id: 'watercolor',
    name: 'Watercolor Dream',
    // Soft watercolor textures, paint splashes, artistic, dreamy
    layout: 'artistic-canvas',
    typography: 'handwritten',
    animations: 'paint-spread',
    elements: ['watercolor-wash', 'paint-splashes', 'soft-edges', 'artistic'],
  },
];

// Layout templates — each style gets a completely different HTML structure
export const LAYOUT_TEMPLATES = {
  'grid-asymmetric': {
    hero: 'split-diagonal',
    features: 'staggered-cards',
    nav: 'floating-hud',
  },
  'single-column': {
    hero: 'text-wall',
    features: 'numbered-list',
    nav: 'minimal-bar',
  },
  'card-grid': {
    hero: 'glass-hero',
    features: 'floating-cards',
    nav: 'glass-nav',
  },
  'pixel-grid': {
    hero: 'pixel-banner',
    features: 'inventory-grid',
    nav: 'game-menu',
  },
  'magazine-spread': {
    hero: 'full-bleed',
    features: 'editorial-cards',
    nav: 'magazine-masthead',
  },
  'zen-spacing': {
    hero: 'centered-zen',
    features: 'breathing-cards',
    nav: 'invisible-nav',
  },
  'maximalist': {
    hero: 'gradient-flood',
    features: 'stacked-layers',
    nav: 'chrome-nav',
  },
  'flowing-organic': {
    hero: 'blob-hero',
    features: 'leaf-cards',
    nav: 'organic-nav',
  },
  'orbital': {
    hero: 'cosmic-center',
    features: 'orbiting-cards',
    nav: 'sci-fi-nav',
  },
  'comic-grid': {
    hero: 'comic-panel-hero',
    features: 'panel-cards',
    nav: 'comic-nav',
  },
  'terminal-cli': {
    hero: 'boot-sequence',
    features: 'terminal-list',
    nav: 'prompt-nav',
  },
  'artistic-canvas': {
    hero: 'canvas-hero',
    features: 'painting-cards',
    nav: 'brush-nav',
  },
};

// Typography systems per style
export const TYPOGRAPHY = {
  'mono': { heading: 'Space Mono', body: 'IBM Plex Mono', weights: ['400', '700'] },
  'system': { heading: 'system-ui', body: 'system-ui', weights: ['400', '900'] },
  'sans-light': { heading: 'Inter', body: 'Inter', weights: ['200', '400', '600'] },
  'pixel': { heading: 'Press Start 2P', body: 'VT323', weights: ['400'] },
  'serif': { heading: 'Playfair Display', body: 'Source Serif 4', weights: ['400', '700', '900'] },
  'sans-ultra-light': { heading: 'Noto Sans JP', body: 'Noto Sans JP', weights: ['100', '300', '500'] },
  'display': { heading: 'Righteous', body: 'Quicksand', weights: ['400', '600'] },
  'rounded': { heading: 'Nunito', body: 'Nunito', weights: ['400', '700', '900'] },
  'futuristic': { heading: 'Orbitron', body: 'Exo 2', weights: ['400', '700', '900'] },
  'comic': { heading: 'Bangers', body: 'Comic Neue', weights: ['400', '700'] },
  'mono-green': { heading: 'Fira Code', body: 'Fira Code', weights: ['400', '700'] },
  'handwritten': { heading: 'Caveat', body: 'Kalam', weights: ['400', '700'] },
};

// Color palettes per style
export const COLOR_PALETTES = {
  'cyberpunk': { bg: '#0a0a0f', primary: '#00f0ff', secondary: '#ff00ff', accent: '#ffff00', text: '#e0e0ff', muted: '#404060' },
  'brutalist': { bg: '#ffffff', primary: '#000000', secondary: '#ff0000', accent: '#0000ff', text: '#000000', muted: '#666666' },
  'glassmorphism': { bg: '#0a0a1a', primary: '#6366f1', secondary: '#8b5cf6', accent: '#a78bfa', text: '#e0e0ff', muted: '#606080' },
  'retro-pixel': { bg: '#2d1b69', primary: '#00ff41', secondary: '#ff6b35', accent: '#ffd700', text: '#ffffff', muted: '#8888aa' },
  'editorial': { bg: '#faf8f5', primary: '#1a1a1a', secondary: '#c41e3a', accent: '#d4a574', text: '#1a1a1a', muted: '#888888' },
  'minimal-jp': { bg: '#f5f5f0', primary: '#1a1a1a', secondary: '#c0392b', accent: '#d4a574', text: '#1a1a1a', muted: '#aaaaaa' },
  'vaporwave': { bg: '#1a0a2e', primary: '#ff71ce', secondary: '#01cdfe', accent: '#05ffa1', text: '#ffffff', muted: '#8866aa' },
  'organic': { bg: '#f5f0e8', primary: '#2d5016', secondary: '#8b4513', accent: '#daa520', text: '#2d2d2d', muted: '#888877' },
  'space': { bg: '#000011', primary: '#4a9eff', secondary: '#9b59b6', accent: '#f39c12', text: '#e0e0ff', muted: '#404060' },
  'pop-art': { bg: '#ffeb3b', primary: '#ff0000', secondary: '#0000ff', accent: '#ff69b4', text: '#000000', muted: '#666666' },
  'terminal': { bg: '#000000', primary: '#00ff00', secondary: '#00aa00', accent: '#ffff00', text: '#00ff00', muted: '#006600' },
  'watercolor': { bg: '#fef9f3', primary: '#e07a5f', secondary: '#3d405b', accent: '#81b29a', text: '#3d405b', muted: '#a0a0a0' },
};
