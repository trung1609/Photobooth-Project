import { FrameTemplate } from '../data/framesData';
import { LayoutType } from '../types/photobooth';

// Helper: Rich Themed Stickers & Illustrations for 2x2 Grid Layout (1200x1500)
function renderThemeStickers2x2(id: string): string {
  switch (id) {
    case '14-casper':
      return `
    <!-- 14 Casper: Floating Little Ghosts & Cute Avocados -->
    <g transform="translate(60, 42) scale(1.15)">
      <path d="M 0 25 C -16 25 -26 10 -26 -10 C -26 -30 -12 -42 0 -42 C 12 -42 26 -30 26 -10 C 26 10 16 25 0 25 Z" fill="#ffffff" stroke="#4ade80" stroke-width="2.5" filter="drop-shadow(0 2px 5px rgba(0,0,0,0.08))" />
      <circle cx="-8" cy="-12" r="3.5" fill="#14532d" />
      <circle cx="8" cy="-12" r="3.5" fill="#14532d" />
      <ellipse cx="-13" cy="-4" rx="4" ry="2" fill="#fca5a5" opacity="0.85" />
      <ellipse cx="13" cy="-4" rx="4" ry="2" fill="#fca5a5" opacity="0.85" />
      <path d="M -3 0 Q 0 4 3 0" fill="none" stroke="#14532d" stroke-width="2" />
    </g>
    <g transform="translate(1140, 42) scale(1.1) rotate(10)">
      <path d="M 0 25 C -16 25 -26 10 -26 -10 C -26 -30 -12 -42 0 -42 C 12 -42 26 -30 26 -10 C 26 10 16 25 0 25 Z" fill="#ffffff" stroke="#4ade80" stroke-width="2.5" />
      <circle cx="-8" cy="-12" r="3.5" fill="#14532d" />
      <circle cx="8" cy="-12" r="3.5" fill="#14532d" />
      <ellipse cx="-13" cy="-4" rx="4" ry="2" fill="#fca5a5" opacity="0.85" />
      <ellipse cx="13" cy="-4" rx="4" ry="2" fill="#fca5a5" opacity="0.85" />
      <!-- Tiny cute party hat -->
      <polygon points="0,-42 -8,-60 8,-60" fill="#facc15" stroke="#ca8a04" stroke-width="1.5" />
      <circle cx="0" cy="-62" r="3" fill="#ef4444" />
    </g>
    <!-- Cute Avocado at Center Cross -->
    <g transform="translate(600, 686) scale(0.95)">
      <path d="M 0 -26 C -18 -26 -24 -10 -24 10 C -24 32 -15 40 0 40 C 15 40 24 32 24 10 C 24 -10 18 -26 0 -26 Z" fill="#4ade80" stroke="#15803d" stroke-width="2.5" />
      <circle cx="0" cy="14" r="12" fill="#78350f" stroke="#451a03" stroke-width="2" />
      <circle cx="-3" cy="12" r="3.5" fill="#a16207" />
    </g>
    <!-- Pastel Mint Stars -->
    <g fill="#86efac" opacity="0.9">
      <polygon points="80,1380 84,1392 96,1392 86,1399 90,1411 80,1404 70,1411 74,1399 64,1392 76,1392" />
      <polygon points="1120,1380 1124,1392 1136,1392 1126,1399 1130,1411 1120,1404 1110,1411 1114,1399 1104,1392 1116,1392" />
    </g>`;

    case 'zeka-odyssey':
      return `
    <!-- ZEKA Bear: Rainbow, Bear Ears & Fluffy Clouds -->
    <g transform="translate(1080, 48) scale(0.85)">
      <path d="M -50 0 A 50 50 0 0 1 50 0" fill="none" stroke="#fca5a5" stroke-width="8" stroke-linecap="round" />
      <path d="M -42 0 A 42 42 0 0 1 42 0" fill="none" stroke="#fef08a" stroke-width="8" stroke-linecap="round" />
      <path d="M -34 0 A 34 34 0 0 1 34 0" fill="none" stroke="#93c5fd" stroke-width="8" stroke-linecap="round" />
      <path d="M -26 0 A 26 26 0 0 1 26 0" fill="none" stroke="#ddd6fe" stroke-width="8" stroke-linecap="round" />
    </g>
    <!-- Teddy Bear face at Top Center -->
    <g transform="translate(600, 34) scale(0.95)">
      <circle cx="-22" cy="-16" r="10" fill="#d97706" />
      <circle cx="-22" cy="-16" r="6" fill="#fed7aa" />
      <circle cx="22" cy="-16" r="10" fill="#d97706" />
      <circle cx="22" cy="-16" r="6" fill="#fed7aa" />
      <circle cx="0" cy="0" r="24" fill="#b45309" stroke="#78350f" stroke-width="2" />
      <ellipse cx="0" cy="5" rx="12" ry="9" fill="#fed7aa" />
      <ellipse cx="0" cy="2" rx="4" ry="3" fill="#451a03" />
      <circle cx="-8" cy="-5" r="3" fill="#451a03" />
      <circle cx="8" cy="-5" r="3" fill="#451a03" />
    </g>
    <!-- Fluffy Clouds at Bottom -->
    <g transform="translate(110, 1395) scale(0.95)">
      <ellipse cx="0" cy="0" rx="42" ry="22" fill="#ffffff" stroke="#93c5fd" stroke-width="2.5" />
      <circle cx="-18" cy="-12" r="19" fill="#ffffff" />
      <circle cx="16" cy="-14" r="17" fill="#ffffff" />
    </g>
    <g transform="translate(1090, 1395) scale(0.95)">
      <ellipse cx="0" cy="0" rx="42" ry="22" fill="#ffffff" stroke="#93c5fd" stroke-width="2.5" />
      <circle cx="-18" cy="-12" r="19" fill="#ffffff" />
      <circle cx="16" cy="-14" r="17" fill="#ffffff" />
    </g>`;

    case 'cream-soda':
      return `
    <!-- Cream Soda: Melon Float Glass, 4-Leaf Clovers, Cherries -->
    <g transform="translate(60, 42) scale(1.05)">
      <path d="M 0 0 C -16 -22 -32 0 -6 5 C -32 16 -16 32 0 5 C 16 32 32 16 6 5 C 32 0 16 -22 0 0 Z" fill="#22c55e" stroke="#15803d" stroke-width="2.5" />
      <path d="M 0 5 Q 0 35 -15 42" fill="none" stroke="#15803d" stroke-width="3" />
    </g>
    <g transform="translate(1140, 42) scale(1.05)">
      <path d="M 0 0 C -16 -22 -32 0 -6 5 C -32 16 -16 32 0 5 C 16 32 32 16 6 5 C 32 0 16 -22 0 0 Z" fill="#22c55e" stroke="#15803d" stroke-width="2.5" />
      <path d="M 0 5 Q 0 35 15 42" fill="none" stroke="#15803d" stroke-width="3" />
    </g>
    <!-- Tall Melon Float Glass at Bottom Left -->
    <g transform="translate(100, 1395) scale(0.9)">
      <path d="M -18 -42 L 18 -42 L 11 32 L -11 32 Z" fill="#6ee7b7" stroke="#059669" stroke-width="2.5" opacity="0.9" />
      <circle cx="0" cy="-48" r="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
      <circle cx="7" cy="-64" r="7" fill="#ef4444" />
      <path d="M 7 -64 Q 16 -76 18 -85" fill="none" stroke="#15803d" stroke-width="3" />
      <line x1="-9" y1="-80" x2="7" y2="22" stroke="#f472b6" stroke-width="4.5" stroke-linecap="round" />
    </g>
    <!-- Cherries at Center Gutter -->
    <g transform="translate(600, 686) scale(0.95)">
      <circle cx="-11" cy="11" r="11" fill="#e11d48" />
      <circle cx="11" cy="13" r="11" fill="#e11d48" />
      <path d="M -11 11 C -4 -12 4 -18 11 -20 C 18 -18 13 0 11 13" fill="none" stroke="#15803d" stroke-width="3.5" />
      <path d="M 11 -20 Q 22 -26 26 -20 Q 20 -14 11 -20" fill="#22c55e" />
    </g>`;

    case 'girly':
      return `
    <!-- Girly: Luxurious Pink Ribbon Bows & Hearts -->
    <g transform="translate(50, 42) scale(1.35)">
      <path d="M 0 0 C -26 -24 -44 7 -6 -2 Z" fill="#fb7185" />
      <path d="M 0 0 C 26 -24 44 7 6 -2 Z" fill="#fb7185" />
      <circle cx="0" cy="-2" r="6.5" fill="#e11d48" />
      <path d="M -3 0 C -12 26 -26 32 -24 38 C -19 32 -8 24 0 11" fill="#f43f5e" />
      <path d="M 3 0 C 12 26 26 32 24 38 C 19 32 8 24 0 11" fill="#f43f5e" />
    </g>
    <g transform="translate(1150, 42) scale(1.35)">
      <path d="M 0 0 C -26 -24 -44 7 -6 -2 Z" fill="#fb7185" />
      <path d="M 0 0 C 26 -24 44 7 6 -2 Z" fill="#fb7185" />
      <circle cx="0" cy="-2" r="6.5" fill="#e11d48" />
      <path d="M -3 0 C -12 26 -26 32 -24 38 C -19 32 -8 24 0 11" fill="#f43f5e" />
      <path d="M 3 0 C 12 26 26 32 24 38 C 19 32 8 24 0 11" fill="#f43f5e" />
    </g>
    <g transform="translate(600, 1385) scale(1.3)">
      <path d="M 0 0 C -26 -24 -44 7 -6 -2 Z" fill="#fb7185" />
      <path d="M 0 0 C 26 -24 44 7 6 -2 Z" fill="#fb7185" />
      <circle cx="0" cy="-2" r="6.5" fill="#e11d48" />
      <path d="M -3 0 C -12 26 -26 32 -24 38 C -19 32 -8 24 0 11" fill="#f43f5e" />
      <path d="M 3 0 C 12 26 26 32 24 38 C 19 32 8 24 0 11" fill="#f43f5e" />
    </g>
    <!-- Sparkling hearts at center -->
    <g transform="translate(600, 686)" fill="#f43f5e">
      <path d="M 0 -8 C -12 -22 -26 -4 -4 8 L 0 14 L 4 8 C 26 -4 12 -22 0 -8 Z" />
    </g>`;

    case 'sweet-moments':
      return `
    <!-- Sweet Moments: Plush Bear hugging heart & Strawberry shortcake -->
    <g transform="translate(100, 1395) scale(0.9)">
      <circle cx="-16" cy="-18" r="9" fill="#d97706" />
      <circle cx="16" cy="-18" r="9" fill="#d97706" />
      <circle cx="0" cy="-4" r="22" fill="#b45309" />
      <ellipse cx="0" cy="0" rx="10" ry="7" fill="#fef3c7" />
      <ellipse cx="0" cy="-2" rx="3" ry="2" fill="#451a03" />
      <circle cx="-7" cy="-9" r="2.5" fill="#451a03" />
      <circle cx="7" cy="-9" r="2.5" fill="#451a03" />
      <path d="M 0 15 C -15 0 -30 20 -5 32 L 0 38 L 5 32 C 30 20 15 0 0 15 Z" fill="#ec4899" />
      <ellipse cx="-14" cy="22" rx="6" ry="4" fill="#b45309" />
      <ellipse cx="14" cy="22" rx="6" ry="4" fill="#b45309" />
    </g>
    <!-- Strawberry shortcake slice at bottom right -->
    <g transform="translate(1100, 1395) scale(0.9)">
      <polygon points="-30,10 30,10 0,-25" fill="#fef2f2" stroke="#fbcfe8" stroke-width="2" />
      <path d="M -30 10 Q 0 16 30 10 L 30 25 Q 0 32 -30 25 Z" fill="#fde047" />
      <circle cx="0" cy="-28" r="8" fill="#ef4444" />
      <polygon points="0,-38 -3,-33 3,-33" fill="#22c55e" />
    </g>
    <!-- Cute ribbons at top -->
    <g transform="translate(60, 42) scale(0.9)">
      <path d="M 0 0 C -20 -18 -32 5 -4 -2 Z" fill="#f472b6" />
      <path d="M 0 0 C 20 -18 32 5 4 -2 Z" fill="#f472b6" />
      <circle cx="0" cy="-2" r="5" fill="#db2777" />
    </g>
    <g transform="translate(1140, 42) scale(0.9)">
      <path d="M 0 0 C -20 -18 -32 5 -4 -2 Z" fill="#f472b6" />
      <path d="M 0 0 C 20 -18 32 5 4 -2 Z" fill="#f472b6" />
      <circle cx="0" cy="-2" r="5" fill="#db2777" />
    </g>`;

    case 'merry-christmas':
      return `
    <!-- Merry Christmas: Santa Hat, Christmas Bells & Snowflakes -->
    <g transform="translate(560, 44) rotate(14) scale(0.9)">
      <path d="M -26 15 Q 0 -38 26 5 Q 0 0 -26 15 Z" fill="#dc2626" />
      <circle cx="30" cy="7" r="7.5" fill="#ffffff" />
      <rect x="-30" y="10" width="50" height="13" rx="6.5" fill="#ffffff" />
    </g>
    <!-- Gold Bells at Top Center -->
    <g transform="translate(600, 36) scale(0.95)">
      <path d="M -12 10 C -12 -5 -6 -12 0 -12 C 6 -12 12 -5 12 10 Z" fill="#fbbf24" stroke="#d97706" stroke-width="2" />
      <circle cx="0" cy="13" r="4" fill="#d97706" />
      <path d="M 0 -10 C -16 -24 -24 -4 -4 -8 Z" fill="#ef4444" />
      <path d="M 0 -10 C 16 -24 24 -4 4 -8 Z" fill="#ef4444" />
      <circle cx="0" cy="-10" r="4" fill="#b91c1c" />
    </g>
    <!-- Snowflakes at corners -->
    <g transform="translate(70, 1390) scale(0.95)" stroke="#93c5fd" stroke-width="2.5">
      <line x1="-16" y1="0" x2="16" y2="0" />
      <line x1="0" y1="-16" x2="0" y2="16" />
      <line x1="-12" y1="-12" x2="12" y2="12" />
      <line x1="-12" y1="12" x2="12" y2="-12" />
    </g>
    <g transform="translate(1130, 1390) scale(0.95)" stroke="#93c5fd" stroke-width="2.5">
      <line x1="-16" y1="0" x2="16" y2="0" />
      <line x1="0" y1="-16" x2="0" y2="16" />
      <line x1="-12" y1="-12" x2="12" y2="12" />
      <line x1="-12" y1="12" x2="12" y2="-12" />
    </g>`;

    case 'the-first-sonata':
      return `
    <!-- The First SONata: Golden Harp & Musical Notes -->
    <g transform="translate(75, 44) scale(0.8)">
      <path d="M -15 22 C -26 -10 -16 -38 6 -42 C 26 -38 26 -16 16 22 Z" fill="none" stroke="#fbbf24" stroke-width="4" />
      <line x1="-8" y1="20" x2="-2" y2="-40" stroke="#fef08a" stroke-width="1.8" />
      <line x1="-2" y1="20" x2="6" y2="-38" stroke="#fef08a" stroke-width="1.8" />
      <line x1="4" y1="20" x2="14" y2="-34" stroke="#fef08a" stroke-width="1.8" />
    </g>
    <g transform="translate(600, 686)" fill="#60a5fa">
      <text x="-18" y="-8" font-size="32" font-family="'Plus Jakarta Sans', sans-serif">♪</text>
      <text x="8" y="18" font-size="38" font-family="'Plus Jakarta Sans', sans-serif">♫</text>
    </g>
    <!-- Angel Wings at Bottom Right -->
    <g transform="translate(1110, 1395) scale(0.85)" fill="#ffffff" stroke="#93c5fd" stroke-width="2">
      <path d="M 0 0 C 20 -30 45 -25 50 0 C 45 15 30 25 0 20 Z" />
      <path d="M 10 5 C 25 -15 40 -10 42 10 Z" />
    </g>`;

    case 'retro-windows':
      return `
    <!-- Windows 98: Title Bar Controls & Floppy Disk -->
    <g transform="translate(48, 48)">
      <rect width="536" height="30" rx="8" fill="#000080" />
      <text x="14" y="21" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">PhotoXinhh.exe</text>
      <rect x="445" y="5" width="20" height="20" fill="#c0c0c0" stroke="#808080" />
      <text x="451" y="20" font-family="sans-serif" font-size="14" font-weight="bold" fill="#000">_</text>
      <rect x="473" y="5" width="20" height="20" fill="#c0c0c0" stroke="#808080" />
      <text x="478" y="20" font-family="sans-serif" font-size="14" font-weight="bold" fill="#000">口</text>
      <rect x="502" y="5" width="20" height="20" fill="#c0c0c0" stroke="#808080" />
      <text x="507" y="20" font-family="sans-serif" font-size="14" font-weight="bold" fill="#000">X</text>
    </g>
    <g transform="translate(616, 48)">
      <rect width="536" height="30" rx="8" fill="#000080" />
      <text x="14" y="21" font-family="monospace" font-size="13" font-weight="bold" fill="#ffffff">RetroCam.sys</text>
      <rect x="502" y="5" width="20" height="20" fill="#c0c0c0" stroke="#808080" />
      <text x="507" y="20" font-family="sans-serif" font-size="14" font-weight="bold" fill="#000">X</text>
    </g>
    <!-- 3.5 Floppy Disk at Bottom Left -->
    <g transform="translate(100, 1400) scale(0.9)">
      <rect x="-24" y="-24" width="48" height="48" rx="4" fill="#1e293b" stroke="#64748b" stroke-width="2.5" />
      <rect x="-14" y="-24" width="28" height="18" fill="#e2e8f0" />
      <rect x="-16" y="2" width="32" height="20" fill="#ffffff" />
    </g>`;

    case 'star-pink-y2k':
      return `
    <!-- Star Pink Y2K: Chrome Stars & Cyber Butterfly -->
    <g transform="translate(65, 42) scale(0.95)">
      <path d="M 0 0 C -22 -32 -42 -10 -22 6 C -32 22 -10 26 0 9 Z" fill="#f43f5e" />
      <path d="M 0 0 C 22 -32 42 -10 22 6 C 32 22 10 26 0 9 Z" fill="#f43f5e" />
      <line x1="0" y1="-16" x2="0" y2="16" stroke="#be123c" stroke-width="3" />
    </g>
    <g transform="translate(1135, 42)">
      <path d="M 0 -20 Q 0 0 20 0 Q 0 0 0 20 Q 0 0 -20 0 Q 0 0 0 -20 Z" fill="#fecdd3" stroke="#e11d48" stroke-width="2.5" />
    </g>
    <g transform="translate(600, 686)">
      <path d="M 0 -20 Q 0 0 20 0 Q 0 0 0 20 Q 0 0 -20 0 Q 0 0 0 -20 Z" fill="#fecdd3" stroke="#e11d48" stroke-width="2.5" />
    </g>`;

    case 'blue-ribbon':
      return `
    <!-- Blue Ribbon: Delicate Watercolor Ribbons & Pearl Beads -->
    <g transform="translate(50, 42) scale(1.3)">
      <path d="M 0 0 C -25 -22 -42 6 -5 -2 Z" fill="#60a5fa" />
      <path d="M 0 0 C 25 -22 42 6 5 -2 Z" fill="#60a5fa" />
      <circle cx="0" cy="-2" r="5.5" fill="#2563eb" />
      <path d="M -3 0 C -12 24 -24 30 -22 36 C -18 30 -8 22 0 10" fill="#3b82f6" />
      <path d="M 3 0 C 12 24 24 30 22 36 C 18 30 8 22 0 10" fill="#3b82f6" />
    </g>
    <g transform="translate(1150, 42) scale(1.3)">
      <path d="M 0 0 C -25 -22 -42 6 -5 -2 Z" fill="#60a5fa" />
      <path d="M 0 0 C 25 -22 42 6 5 -2 Z" fill="#60a5fa" />
      <circle cx="0" cy="-2" r="5.5" fill="#2563eb" />
      <path d="M -3 0 C -12 24 -24 30 -22 36 C -18 30 -8 22 0 10" fill="#3b82f6" />
      <path d="M 3 0 C 12 24 24 30 22 36 C 18 30 8 22 0 10" fill="#3b82f6" />
    </g>
    <g transform="translate(600, 686)" fill="#3b82f6">
      <circle cx="0" cy="0" r="6" fill="#93c5fd" stroke="#2563eb" stroke-width="2" />
    </g>`;

    case 'best-friend':
      return `
    <!-- Best Friend: Sunflower & Friendship Polaroid Washi Tapes -->
    <g transform="translate(1120, 46) scale(0.9)">
      <circle cx="0" cy="0" r="32" fill="none" stroke="#facc15" stroke-width="14" stroke-dasharray="14 10" />
      <circle cx="0" cy="0" r="16" fill="#78350f" />
      <circle cx="0" cy="0" r="12" fill="#451a03" />
    </g>
    <g transform="translate(600, 686)">
      <rect x="-42" y="-10" width="84" height="20" fill="#fed7aa" opacity="0.9" rx="3" transform="rotate(-5)" />
      <text x="0" y="4" text-anchor="middle" font-size="11" font-weight="bold" fill="#c2410c" font-family="'Plus Jakarta Sans', sans-serif">BEST FRIEND ♡</text>
    </g>`;

    case 'lunar-new-year':
      return `
    <!-- Lunar New Year: Lucky Envelope (Lì xì) & Cherry Blossom Branch -->
    <g transform="translate(100, 1395) scale(0.95) rotate(-8)">
      <rect x="-20" y="-30" width="40" height="60" rx="6" fill="#dc2626" stroke="#fef08a" stroke-width="2" />
      <circle cx="0" cy="-6" r="12" fill="#fef08a" />
      <text x="0" y="-2" text-anchor="middle" font-size="14" font-weight="bold" fill="#b91c1c" font-family="sans-serif">福</text>
    </g>
    <g transform="translate(1120, 40) scale(0.95)">
      <path d="M 30 -10 Q 0 10 -25 20" fill="none" stroke="#78350f" stroke-width="3.5" />
      <circle cx="0" cy="8" r="9" fill="#fb7185" />
      <circle cx="0" cy="8" r="4" fill="#fef08a" />
      <circle cx="-20" cy="18" r="7" fill="#fb7185" />
      <circle cx="-20" cy="18" r="3" fill="#fef08a" />
      <circle cx="16" cy="0" r="8" fill="#fb7185" />
      <circle cx="16" cy="0" r="3.5" fill="#fef08a" />
    </g>`;

    case 'basic-photobooth':
      return `
    <!-- Basic Photobooth: Camera doodle, sparkle stars & hearts -->
    <g transform="translate(80, 42) scale(0.9)">
      <rect x="-24" y="-16" width="48" height="32" rx="6" fill="#ffffff" stroke="#334155" stroke-width="2.5" />
      <rect x="-12" y="-22" width="14" height="6" rx="2" fill="#334155" />
      <circle cx="0" cy="0" r="10" fill="#f1f5f9" stroke="#334155" stroke-width="2" />
      <circle cx="14" cy="-8" r="2.5" fill="#ef4444" />
    </g>
    <g transform="translate(1120, 42)" fill="#f59e0b">
      <text font-size="28" font-family="'Plus Jakarta Sans', sans-serif">★ ✨</text>
    </g>
    <g transform="translate(600, 686)" fill="#ef4444">
      <text font-size="22" font-family="'Plus Jakarta Sans', sans-serif">♡</text>
    </g>`;

    case 'mickey-disney':
      return `
    <!-- Mickey Disney: Cute Mouse Ears Silhouette, Yellow Stars & Red Bow -->
    <g transform="translate(60, 42) scale(0.95)">
      <circle cx="0" cy="0" r="18" fill="#1e293b" />
      <circle cx="-16" cy="-14" r="11" fill="#1e293b" />
      <circle cx="16" cy="-14" r="11" fill="#1e293b" />
    </g>
    <g transform="translate(1140, 42) scale(0.95)">
      <circle cx="0" cy="0" r="18" fill="#1e293b" />
      <circle cx="-16" cy="-14" r="11" fill="#1e293b" />
      <circle cx="16" cy="-14" r="11" fill="#1e293b" />
      <!-- Red mini polka bow -->
      <path d="M 0 -14 C -12 -24 -20 -4 -4 -8 Z" fill="#ef4444" />
      <path d="M 0 -14 C 12 -24 20 -4 4 -8 Z" fill="#ef4444" />
      <circle cx="0" cy="-14" r="3.5" fill="#ffffff" />
    </g>
    <g transform="translate(600, 686)" fill="#fbbf24">
      <polygon points="0,-16 4,-4 16,-4 6,4 10,16 0,8 -10,16 -6,4 -16,-4 -4,-4" />
    </g>
    <g transform="translate(100, 1395) scale(0.9)" fill="#ef4444">
      <text font-size="30" font-family="'Plus Jakarta Sans', sans-serif">★ 💛 🏰</text>
    </g>`;

    case '2025-photoxinhh':
      return `
    <!-- 2025 Magazine: High Fashion Barcode, Star Burst, Studio Stamp -->
    <g transform="translate(65, 42) scale(0.9)">
      <rect x="-25" y="-12" width="50" height="24" rx="4" fill="#0f172a" />
      <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="900" fill="#ffffff" font-family="monospace">2025</text>
    </g>
    <g transform="translate(1135, 42) scale(0.95)" fill="#0f172a">
      <path d="M 0 -18 Q 0 0 18 0 Q 0 0 0 18 Q 0 0 -18 0 Q 0 0 0 -18 Z" />
    </g>
    <g transform="translate(600, 686)" fill="#0f172a">
      <text x="0" y="5" text-anchor="middle" font-size="12" font-weight="900" font-family="monospace">★ ISSUE NO. 1 ★</text>
    </g>`;

    case 'basic-7':
    case 'basic-2':
      return `
    <!-- Lavender Dream: Pastel Purple Butterflies & Sparkles -->
    <g transform="translate(60, 42) scale(1.15)">
      <path d="M 0 0 C -20 -24 -36 5 -5 -2 Z" fill="#c084fc" />
      <path d="M 0 0 C 20 -24 36 5 5 -2 Z" fill="#c084fc" />
      <circle cx="0" cy="-2" r="5" fill="#a855f7" />
    </g>
    <g transform="translate(1140, 42) scale(1.15)">
      <path d="M 0 0 C -20 -24 -36 5 -5 -2 Z" fill="#c084fc" />
      <path d="M 0 0 C 20 -24 36 5 5 -2 Z" fill="#c084fc" />
      <circle cx="0" cy="-2" r="5" fill="#a855f7" />
    </g>
    <g transform="translate(600, 686)" fill="#c084fc">
      <text x="0" y="6" text-anchor="middle" font-size="22">💜 ✨ 💜</text>
    </g>`;

    case 'basic-1':
      return `
    <!-- Pastel Pink Cherries & Blossoms -->
    <g transform="translate(60, 42) scale(1.1)">
      <circle cx="-9" cy="9" r="9" fill="#f43f5e" />
      <circle cx="9" cy="11" r="9" fill="#f43f5e" />
      <path d="M -9 9 C -3 -10 3 -15 9 -17 C 15 -15 11 0 9 11" fill="none" stroke="#15803d" stroke-width="2.5" />
    </g>
    <g transform="translate(1140, 42) scale(1.1)">
      <circle cx="-9" cy="9" r="9" fill="#f43f5e" />
      <circle cx="9" cy="11" r="9" fill="#f43f5e" />
      <path d="M -9 9 C -3 -10 3 -15 9 -17 C 15 -15 11 0 9 11" fill="none" stroke="#15803d" stroke-width="2.5" />
    </g>
    <g transform="translate(600, 686)" fill="#f472b6">
      <text x="0" y="6" text-anchor="middle" font-size="20">🌸 💖 🌸</text>
    </g>`;

    case 'basic-3':
    case 'green-garden':
      return `
    <!-- Green Garden: Daisies & 4-Leaf Clovers -->
    <g transform="translate(60, 42) scale(1.05)">
      <circle cx="0" cy="0" r="14" fill="none" stroke="#ffffff" stroke-width="8" stroke-dasharray="7 5" />
      <circle cx="0" cy="0" r="7" fill="#facc15" />
    </g>
    <g transform="translate(1140, 42) scale(1.05)">
      <circle cx="0" cy="0" r="14" fill="none" stroke="#ffffff" stroke-width="8" stroke-dasharray="7 5" />
      <circle cx="0" cy="0" r="7" fill="#facc15" />
    </g>
    <g transform="translate(600, 686)" fill="#22c55e">
      <text x="0" y="6" text-anchor="middle" font-size="20">🍀 🌼 🍀</text>
    </g>`;

    case 'bui-duy-ngoc':
      return `
    <!-- Idol CODCD: Musical Sparkles & Stage Stars -->
    <g transform="translate(65, 42)" fill="#38bdf8">
      <text font-size="28">✨ 🎸</text>
    </g>
    <g transform="translate(1135, 42)" fill="#38bdf8">
      <text font-size="28">🎤 ✨</text>
    </g>
    <g transform="translate(600, 686)" fill="#60a5fa">
      <text x="0" y="6" text-anchor="middle" font-size="20">⭐ CODCD LIVE ⭐</text>
    </g>`;

    case 'style-magazine':
      return `
    <!-- Style Magazine: Glamour Lipstick, Stars, Badges -->
    <g transform="translate(60, 42) scale(0.9)">
      <rect x="-24" y="-12" width="48" height="24" rx="4" fill="#e11d48" />
      <text x="0" y="4" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff" font-family="monospace">VOGUE</text>
    </g>
    <g transform="translate(1140, 42)" fill="#e11d48">
      <text font-size="26">💄 ✨</text>
    </g>
    <g transform="translate(600, 686)" fill="#e11d48">
      <text x="0" y="6" text-anchor="middle" font-size="18">💋 GLAMOUR 💋</text>
    </g>`;

    case 'classic-noir':
    case 'basic-5':
    case 'basic-6':
      return `
    <!-- Aesthetic Monochrome / Dark Noir Stars & Chrome Ribbon -->
    <g transform="translate(60, 42) scale(1.15)">
      <path d="M 0 0 C -20 -20 -36 5 -5 -2 Z" fill="#475569" />
      <path d="M 0 0 C 20 -20 36 5 5 -2 Z" fill="#475569" />
      <circle cx="0" cy="-2" r="5" fill="#0f172a" />
    </g>
    <g transform="translate(1140, 42) scale(1.15)">
      <path d="M 0 0 C -20 -20 -36 5 -5 -2 Z" fill="#475569" />
      <path d="M 0 0 C 20 -20 36 5 5 -2 Z" fill="#475569" />
      <circle cx="0" cy="-2" r="5" fill="#0f172a" />
    </g>
    <g transform="translate(600, 686)" fill="#64748b">
      <text x="0" y="6" text-anchor="middle" font-size="20">★ 📷 ★</text>
    </g>`;

    case 'diary-notes':
      return `
    <!-- Diary Notes: Washi tape clips, cute doodles -->
    <g transform="translate(65, 42) rotate(-6)">
      <rect x="-30" y="-10" width="60" height="20" rx="3" fill="#fed7aa" opacity="0.9" />
      <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#ea580c">NOTE ✏️</text>
    </g>
    <g transform="translate(1135, 42) rotate(6)">
      <rect x="-30" y="-10" width="60" height="20" rx="3" fill="#bbf7d0" opacity="0.9" />
      <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#15803d">DIARY ♡</text>
    </g>
    <g transform="translate(600, 686)" fill="#f97316">
      <text x="0" y="6" text-anchor="middle" font-size="20">📎 💌 📎</text>
    </g>`;

    default:
      return `
    <!-- Default Cute Korean Photobooth Stickers (Bows, Hearts, Sparkles) -->
    <g transform="translate(60, 42) scale(1.2)">
      <path d="M 0 0 C -22 -20 -38 5 -5 -2 Z" fill="#f472b6" />
      <path d="M 0 0 C 22 -20 38 5 5 -2 Z" fill="#f472b6" />
      <circle cx="0" cy="-2" r="5" fill="#db2777" />
    </g>
    <g transform="translate(1140, 42) scale(1.2)">
      <path d="M 0 0 C -22 -20 -38 5 -5 -2 Z" fill="#f472b6" />
      <path d="M 0 0 C 22 -20 38 5 5 -2 Z" fill="#f472b6" />
      <circle cx="0" cy="-2" r="5" fill="#db2777" />
    </g>
    <g transform="translate(600, 686)" fill="#f472b6">
      <text x="0" y="6" text-anchor="middle" font-size="22">✨ 💖 ✨</text>
    </g>`;
  }
}

// Helper: Rich Themed Stickers for Polaroid Layout (900x1200)
function renderThemeStickersPolaroid(id: string): string {
  switch (id) {
    case 'polaroid-ribbon':
      return `
    <!-- Ribbon Bow at Top Center -->
    <g transform="translate(450, 46) scale(1.4)">
      <path d="M 0 0 C -26 -24 -44 7 -6 -2 Z" fill="#fb7185" />
      <path d="M 0 0 C 26 -24 44 7 6 -2 Z" fill="#fb7185" />
      <circle cx="0" cy="-2" r="6.5" fill="#e11d48" />
      <path d="M -3 0 C -12 26 -26 32 -24 38 C -19 32 -8 24 0 11" fill="#f43f5e" />
      <path d="M 3 0 C 12 26 26 32 24 38 C 19 32 8 24 0 11" fill="#f43f5e" />
    </g>
    <g transform="translate(820, 60)" fill="#f43f5e"><text font-size="30">💖</text></g>
    <g transform="translate(70, 60)" fill="#f43f5e"><text font-size="30">✨</text></g>
    <g transform="translate(100, 1120)" fill="#f43f5e"><text font-size="32">🎀 🌸</text></g>
    <g transform="translate(760, 1120)" fill="#f43f5e"><text font-size="32">🌸 🎀</text></g>`;

    case 'polaroid-kpop':
      return `
    <g transform="translate(450, 46) fill="#a855f7"><text font-size="36" text-anchor="middle">✨ 🫰 ✨</text></g>
    <g transform="translate(80, 60)" fill="#a855f7"><text font-size="32">💜</text></g>
    <g transform="translate(820, 60)" fill="#a855f7"><text font-size="32">💜</text></g>
    <g transform="translate(100, 1120)" fill="#c084fc"><text font-size="32">⭐ 🫶</text></g>
    <g transform="translate(760, 1120)" fill="#c084fc"><text font-size="32">🫶 ⭐</text></g>`;

    case 'polaroid-vintage':
      return `
    <g transform="translate(80, 52) scale(0.95)">
      <rect x="-24" y="-14" width="48" height="28" rx="4" fill="#78350f" stroke="#451a03" stroke-width="2" />
      <circle cx="0" cy="0" r="8" fill="#fef3c7" />
    </g>
    <g transform="translate(820, 55)" fill="#d97706"><text font-size="30">🎞️</text></g>
    <g transform="translate(100, 1120)" fill="#78350f"><text font-size="30">📷 ★</text></g>
    <g transform="translate(760, 1120)" fill="#78350f"><text font-size="30">★ 🎞️</text></g>`;

    case 'polaroid-cyber':
      return `
    <g transform="translate(80, 55)" fill="#06b6d4"><text font-size="32">💿</text></g>
    <g transform="translate(820, 55)" fill="#06b6d4"><text font-size="32">🦋</text></g>
    <g transform="translate(100, 1120)" fill="#06b6d4"><text font-size="32">⚡ 💫</text></g>
    <g transform="translate(760, 1120)" fill="#06b6d4"><text font-size="32">💫 ⚡</text></g>`;

    case 'polaroid-love':
      return `
    <g transform="translate(450, 48)">
      <rect x="-55" y="-14" width="110" height="28" rx="5" fill="#fed7aa" opacity="0.9" transform="rotate(-3)" />
      <text x="0" y="6" text-anchor="middle" font-size="14" font-weight="bold" fill="#c2410c" font-family="'Plus Jakarta Sans', sans-serif">LOVE YOU ♡</text>
    </g>
    <g transform="translate(820, 60)" fill="#ea580c"><text font-size="30">💌</text></g>
    <g transform="translate(80, 60)" fill="#ea580c"><text font-size="30">💖</text></g>
    <g transform="translate(100, 1120)" fill="#ea580c"><text font-size="32">🧸 💌</text></g>
    <g transform="translate(760, 1120)" fill="#ea580c"><text font-size="32">💌 🧸</text></g>`;

    case 'polaroid-mint':
      return `
    <g transform="translate(80, 55)" fill="#10b981"><text font-size="34">🍀</text></g>
    <g transform="translate(820, 55)" fill="#10b981"><text font-size="34">🌱</text></g>
    <g transform="translate(450, 46) fill="#10b981"><text font-size="32" text-anchor="middle">🌼 🍀 🌼</text></g>
    <g transform="translate(100, 1120)" fill="#10b981"><text font-size="32">🥑 🌿</text></g>
    <g transform="translate(760, 1120)" fill="#10b981"><text font-size="32">🌿 🥑</text></g>`;

    case 'polaroid-christmas':
      return `
    <g transform="translate(780, 48) rotate(15) scale(0.95)">
      <path d="M -26 15 Q 0 -38 26 5 Q 0 0 -26 15 Z" fill="#dc2626" />
      <circle cx="30" cy="7" r="7.5" fill="#ffffff" />
      <rect x="-30" y="10" width="50" height="13" rx="6.5" fill="#ffffff" />
    </g>
    <g transform="translate(80, 55)" fill="#15803d"><text font-size="34">🎄</text></g>
    <g transform="translate(100, 1120)" fill="#dc2626"><text font-size="32">🔔 ❄️</text></g>
    <g transform="translate(760, 1120)" fill="#dc2626"><text font-size="32">❄️ 🎁</text></g>`;

    case 'polaroid-sky':
      return `
    <g transform="translate(450, 46) scale(0.9)">
      <ellipse cx="0" cy="0" rx="38" ry="20" fill="#ffffff" stroke="#93c5fd" stroke-width="2" />
      <circle cx="-16" cy="-10" r="16" fill="#ffffff" />
      <circle cx="14" cy="-12" r="14" fill="#ffffff" />
    </g>
    <g transform="translate(815, 55)" fill="#38bdf8"><text font-size="32">☁️ 🌈</text></g>
    <g transform="translate(80, 55)" fill="#38bdf8"><text font-size="32">🌈 ☁️</text></g>
    <g transform="translate(100, 1120)" fill="#38bdf8"><text font-size="32">⭐ 🫧</text></g>
    <g transform="translate(760, 1120)" fill="#38bdf8"><text font-size="32">🫧 ⭐</text></g>`;

    case 'polaroid-linen':
      return `
    <g transform="translate(80, 55)" fill="#d97706"><text font-size="30">🌾</text></g>
    <g transform="translate(820, 55)" fill="#d97706"><text font-size="30">🏷️</text></g>
    <g transform="translate(100, 1120)" fill="#92400e"><text font-size="32">🍂 ☕</text></g>
    <g transform="translate(760, 1120)" fill="#92400e"><text font-size="32">☕ 🍂</text></g>`;

    case 'polaroid-cinema':
      return `
    <g transform="translate(80, 55)" fill="#e11d48"><text font-size="32">🎬</text></g>
    <g transform="translate(820, 55)" fill="#e11d48"><text font-size="32">🍿</text></g>
    <g transform="translate(100, 1120)" fill="#f59e0b"><text font-size="32">🎟️ ⭐</text></g>
    <g transform="translate(760, 1120)" fill="#f59e0b"><text font-size="32">⭐ 🎟️</text></g>`;

    case 'polaroid-sunset':
      return `
    <g transform="translate(80, 55)" fill="#f97316"><text font-size="32">🌅</text></g>
    <g transform="translate(820, 55)" fill="#f97316"><text font-size="32">✨</text></g>
    <g transform="translate(100, 1120)" fill="#f59e0b"><text font-size="32">🌇 💛</text></g>
    <g transform="translate(760, 1120)" fill="#f59e0b"><text font-size="32">💛 🌇</text></g>`;

    default:
      return `
    <!-- Default Cute Polaroid Stickers (Ribbon, Sparkles, Blossom) -->
    <g transform="translate(450, 46) scale(1.3)">
      <path d="M 0 0 C -22 -20 -38 5 -5 -2 Z" fill="#f472b6" />
      <path d="M 0 0 C 22 -20 38 5 5 -2 Z" fill="#f472b6" />
      <circle cx="0" cy="-2" r="5" fill="#db2777" />
    </g>
    <g transform="translate(80, 55)" fill="#f472b6"><text font-size="30">✨ 💖</text></g>
    <g transform="translate(815, 55)" fill="#f472b6"><text font-size="30">💖 ✨</text></g>
    <g transform="translate(100, 1120)" fill="#f472b6"><text font-size="32">🌸 🧸</text></g>
    <g transform="translate(760, 1120)" fill="#f472b6"><text font-size="32">🧸 🌸</text></g>`;
  }
}

// Helper: Rich Themed Stickers for 1x4 Strip Layout (600x1800)
function renderThemeStickers1x4(id: string): string {
  switch (id) {
    case 'photo-palette-pink':
      return `
    <!-- Large Pink Bow on Top -->
    <g transform="translate(300, 75) scale(1.35)">
      <path d="M 0 0 C -25 -22 -42 6 -5 -2 Z" fill="#f472b6" />
      <path d="M 0 0 C 25 -22 42 6 5 -2 Z" fill="#f472b6" />
      <circle cx="0" cy="-2" r="6" fill="#db2777" />
    </g>
    <!-- Cherries & Strawberries in Margins -->
    <g transform="translate(55, 498)" fill="#ec4899"><text font-size="28">🍓</text></g>
    <g transform="translate(515, 502)" fill="#ec4899"><text font-size="28">🍒</text></g>
    <g transform="translate(55, 882)" fill="#ec4899"><text font-size="28">🧸</text></g>
    <g transform="translate(515, 882)" fill="#ec4899"><text font-size="28">🎀</text></g>
    <g transform="translate(55, 1266)" fill="#ec4899"><text font-size="28">🍰</text></g>
    <g transform="translate(515, 1266)" fill="#ec4899"><text font-size="28">🌸</text></g>`;

    case 'instagram':
      return `
    <g transform="translate(80, 75)" fill="#e1306c"><text font-size="28">📷</text></g>
    <g transform="translate(500, 75)" fill="#0284c7"><text font-size="26">☑️</text></g>
    <g transform="translate(55, 500)" fill="#e1306c"><text font-size="26">❤️</text></g>
    <g transform="translate(515, 880)" fill="#e1306c"><text font-size="26">💬</text></g>
    <g transform="translate(55, 1265)" fill="#0284c7"><text font-size="26">✈️</text></g>`;

    case 'cute-pinkie':
      return `
    <g transform="translate(300, 75)"><text font-size="34" text-anchor="middle">🐰 🎀 🐰</text></g>
    <g transform="translate(55, 500)" fill="#f43f5e"><text font-size="28">🍓</text></g>
    <g transform="translate(515, 500)" fill="#f43f5e"><text font-size="28">🍰</text></g>
    <g transform="translate(55, 882)" fill="#f43f5e"><text font-size="28">🌸</text></g>
    <g transform="translate(515, 882)" fill="#f43f5e"><text font-size="28">💖</text></g>
    <g transform="translate(55, 1266)" fill="#f43f5e"><text font-size="28">🧸</text></g>
    <g transform="translate(515, 1266)" fill="#f43f5e"><text font-size="28">🎀</text></g>`;

    case 'breaking-news':
      return `
    <g transform="translate(80, 75)"><text font-size="28">🚨</text></g>
    <g transform="translate(500, 75)"><text font-size="28">📢</text></g>
    <g transform="translate(55, 500)"><text font-size="26">⚡</text></g>
    <g transform="translate(515, 880)"><text font-size="26">🔥</text></g>
    <g transform="translate(55, 1265)"><text font-size="26">⭐</text></g>`;

    case 'toy-story':
      return `
    <g transform="translate(80, 75)"><text font-size="28">🤠</text></g>
    <g transform="translate(500, 75)"><text font-size="28">🚀</text></g>
    <g transform="translate(55, 500)"><text font-size="26">⭐</text></g>
    <g transform="translate(515, 880)"><text font-size="26">🦖</text></g>
    <g transform="translate(55, 1265)"><text font-size="26">🛸</text></g>`;

    case 'wxrdie':
      return `
    <g transform="translate(80, 75)"><text font-size="28">🎤</text></g>
    <g transform="translate(500, 75)"><text font-size="28">🕶️</text></g>
    <g transform="translate(55, 500)"><text font-size="26">⚡</text></g>
    <g transform="translate(515, 880)"><text font-size="26">🔥</text></g>
    <g transform="translate(55, 1265)"><text font-size="26">👟</text></g>`;

    case 'bts-beyond':
    case 'soft-lavender':
      return `
    <g transform="translate(300, 75)"><text font-size="34" text-anchor="middle">💜 ✨ 💜</text></g>
    <g transform="translate(55, 500)"><text font-size="28">🦋</text></g>
    <g transform="translate(515, 500)"><text font-size="28">✨</text></g>
    <g transform="translate(55, 882)"><text font-size="28">💜</text></g>
    <g transform="translate(515, 882)"><text font-size="28">☁️</text></g>
    <g transform="translate(55, 1266)"><text font-size="28">💫</text></g>
    <g transform="translate(515, 1266)"><text font-size="28">🌸</text></g>`;

    case 'sweet-ribbon':
      return `
    <g transform="translate(300, 75) scale(1.35)">
      <path d="M 0 0 C -25 -22 -42 6 -5 -2 Z" fill="#fb7185" />
      <path d="M 0 0 C 25 -22 42 6 5 -2 Z" fill="#fb7185" />
      <circle cx="0" cy="-2" r="6" fill="#e11d48" />
    </g>
    <g transform="translate(55, 500)"><text font-size="28">🎀</text></g>
    <g transform="translate(515, 500)"><text font-size="28">💖</text></g>
    <g transform="translate(55, 882)"><text font-size="28">🍰</text></g>
    <g transform="translate(515, 882)"><text font-size="28">🩰</text></g>
    <g transform="translate(55, 1266)"><text font-size="28">🧸</text></g>
    <g transform="translate(515, 1266)"><text font-size="28">🎀</text></g>`;

    case 'shin-chan':
      return `
    <g transform="translate(80, 75)"><text font-size="28">👦</text></g>
    <g transform="translate(500, 75)"><text font-size="28">🐶</text></g>
    <g transform="translate(55, 500)"><text font-size="26">🐊</text></g>
    <g transform="translate(515, 880)"><text font-size="26">⭐</text></g>
    <g transform="translate(55, 1265)"><text font-size="26">🍫</text></g>`;

    case 'matcha-donut':
    case 'mint-green':
      return `
    <g transform="translate(300, 75)"><text font-size="34" text-anchor="middle">🍵 🍩 🍀</text></g>
    <g transform="translate(55, 500)"><text font-size="28">🍀</text></g>
    <g transform="translate(515, 500)"><text font-size="28">🌱</text></g>
    <g transform="translate(55, 882)"><text font-size="28">🥑</text></g>
    <g transform="translate(515, 882)"><text font-size="28">🌼</text></g>
    <g transform="translate(55, 1266)"><text font-size="28">🍵</text></g>
    <g transform="translate(515, 1266)"><text font-size="28">🍀</text></g>`;

    case 'strawberry':
    case 'pastel-pink':
      return `
    <g transform="translate(300, 75)"><text font-size="34" text-anchor="middle">🍓 🍰 🍓</text></g>
    <g transform="translate(55, 500)"><text font-size="28">🍓</text></g>
    <g transform="translate(515, 500)"><text font-size="28">🍒</text></g>
    <g transform="translate(55, 882)"><text font-size="28">🍰</text></g>
    <g transform="translate(515, 882)"><text font-size="28">💖</text></g>
    <g transform="translate(55, 1266)"><text font-size="28">🎀</text></g>
    <g transform="translate(515, 1266)"><text font-size="28">🍓</text></g>`;

    case 'kuromi-pink':
      return `
    <g transform="translate(300, 75)"><text font-size="34" text-anchor="middle">🖤 🎀 🖤</text></g>
    <g transform="translate(55, 500)"><text font-size="28">💀</text></g>
    <g transform="translate(515, 500)"><text font-size="28">🖤</text></g>
    <g transform="translate(55, 882)"><text font-size="28">💜</text></g>
    <g transform="translate(515, 882)"><text font-size="28">🦇</text></g>
    <g transform="translate(55, 1266)"><text font-size="28">🎀</text></g>
    <g transform="translate(515, 1266)"><text font-size="28">🖤</text></g>`;

    default:
      return `
    <!-- Default Cute Korean Photobooth Stickers (Bow, Cherries, Sparkles) -->
    <g transform="translate(300, 75) scale(1.35)">
      <path d="M 0 0 C -25 -22 -42 6 -5 -2 Z" fill="#f472b6" />
      <path d="M 0 0 C 25 -22 42 6 5 -2 Z" fill="#f472b6" />
      <circle cx="0" cy="-2" r="6" fill="#db2777" />
    </g>
    <g transform="translate(55, 500)"><text font-size="28">🌸</text></g>
    <g transform="translate(515, 500)"><text font-size="28">✨</text></g>
    <g transform="translate(55, 882)"><text font-size="28">💖</text></g>
    <g transform="translate(515, 882)"><text font-size="28">🍒</text></g>
    <g transform="translate(55, 1266)"><text font-size="28">🧸</text></g>
    <g transform="translate(515, 1266)"><text font-size="28">🎀</text></g>`;
  }
}

export function generateFrameOverlaySvg(tpl: FrameTemplate, layout: LayoutType = '1x4_strip'): string {
  // If template already has custom static image, use it directly
  if (tpl.previewImage && !tpl.previewImage.startsWith('data:image/svg')) {
    return tpl.previewImage;
  }

  const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  };

  const bgColor = tpl.bgColor || '#ffffff';
  const textColor = tpl.textColor || '#1e293b';
  const accentColor = tpl.accentColor || '#f472b6';
  const headerText = escapeXml(tpl.headerEmoji || tpl.name || 'PhotoXinhh');

  if (layout === '1x4_strip') {
    const width = 600;
    const height = 1800;

    // Special layout for Photo Palette (Authentic Korean Cat Ears & Heart cutout photobooth)
    if (tpl.id === 'photo-palette-cat' || tpl.id.includes('palette')) {
      const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <!-- Warm Cream Wallpaper with Repeating Chocolate Cat Heads Pattern -->
    <pattern id="cat-wallpaper" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="#fcf6e8" />
      <!-- Staggered chocolate brown cute cat heads (row 1) -->
      <g transform="translate(15, 15) scale(0.65)" opacity="0.6">
        <circle cx="16" cy="18" r="13" fill="#8d6e53" />
        <path d="M 6 10 L 1 0 L 12 5 Z" fill="#8d6e53" />
        <path d="M 26 10 L 31 0 L 20 5 Z" fill="#8d6e53" />
      </g>
      <!-- Staggered chocolate brown cute cat heads (row 2) -->
      <g transform="translate(45, 45) scale(0.65)" opacity="0.6">
        <circle cx="16" cy="18" r="13" fill="#8d6e53" />
        <path d="M 6 10 L 1 0 L 12 5 Z" fill="#8d6e53" />
        <path d="M 26 10 L 31 0 L 20 5 Z" fill="#8d6e53" />
      </g>
    </pattern>

    <!-- Cutout Mask for Photo Slots: Slot 1 Cat, Slot 2 Rect, Slot 3 Heart, Slot 4 Rect -->
    <mask id="palette-cutout-mask">
      <rect width="${width}" height="${height}" fill="white" />
      <!-- Slot 1: Soft Smooth Cat Head -->
      <path d="M 300,165 C 240,155 170,120 135,90 C 110,70 85,85 75,120 C 55,185 45,280 48,370 C 50,440 85,465 140,468 L 460,468 C 515,465 550,440 552,370 C 555,280 545,185 525,120 C 515,85 490,70 465,90 C 430,120 360,155 300,165 Z" fill="black" />
      <!-- Slot 2: Rounded Rectangle -->
      <rect x="48" y="505" width="504" height="355" rx="26" fill="black" />
      <!-- Slot 3: Plump Symmetric Romantic Heart -->
      <path d="M 300,925 C 265,865 175,845 115,885 C 45,935 45,1035 95,1115 C 155,1195 265,1255 300,1275 C 335,1255 445,1195 505,1115 C 555,1035 555,935 485,885 C 425,845 335,865 300,925 Z" fill="black" />
      <!-- Slot 4: Rounded Rectangle -->
      <rect x="48" y="1315" width="504" height="355" rx="26" fill="black" />
    </mask>

    <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.18" />
    </filter>
  </defs>

  <!-- Wallpaper Background with Cutouts -->
  <rect width="${width}" height="${height}" fill="url(#cat-wallpaper)" mask="url(#palette-cutout-mask)" />

  <!-- White Inner Border Stroke for Crisp Definition -->
  <path d="M 300,165 C 240,155 170,120 135,90 C 110,70 85,85 75,120 C 55,185 45,280 48,370 C 50,440 85,465 140,468 L 460,468 C 515,465 550,440 552,370 C 555,280 545,185 525,120 C 515,85 490,70 465,90 C 430,120 360,155 300,165 Z" fill="none" stroke="#ffffff" stroke-width="6" />
  <rect x="48" y="505" width="504" height="355" rx="26" fill="none" stroke="#ffffff" stroke-width="6" />
  <path d="M 300,925 C 265,865 175,845 115,885 C 45,935 45,1035 95,1115 C 155,1195 265,1255 300,1275 C 335,1255 445,1195 505,1115 C 555,1035 555,935 485,885 C 425,845 335,865 300,925 Z" fill="none" stroke="#ffffff" stroke-width="6" />
  <rect x="48" y="1315" width="504" height="355" rx="26" fill="none" stroke="#ffffff" stroke-width="6" />

  <!-- ==================== CUTE STICKERS & ACCENTS ==================== -->

  <!-- 1. SLOT 1: BIG PROMINENT WATERCOLOR PINK RIBBON BOW AT TOP -->
  <g transform="translate(300, 68)" filter="url(#soft-shadow)">
    <!-- Left Ribbon Loop -->
    <path d="M 0,-5 C -45,-38 -125,-25 -105,18 C -90,45 -25,25 0,8 Z" fill="#f9a8d4" fill-opacity="0.92" stroke="#f472b6" stroke-width="2.5" />
    <path d="M -85,5 C -65,-12 -25,-5 -10,0" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.6" />
    <!-- Right Ribbon Loop -->
    <path d="M 0,-5 C 45,-38 125,-25 105,18 C 90,45 25,25 0,8 Z" fill="#f9a8d4" fill-opacity="0.92" stroke="#f472b6" stroke-width="2.5" />
    <path d="M 85,5 C 65,-12 25,-5 10,0" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.6" />
    <!-- Flowing Ribbon Tails -->
    <path d="M -15,8 C -35,38 -65,65 -55,85 C -45,75 -25,45 -5,18 Z" fill="#f472b6" fill-opacity="0.88" />
    <path d="M 15,8 C 35,38 65,65 55,85 C 45,75 25,45 5,18 Z" fill="#f472b6" fill-opacity="0.88" />
    <!-- Center Knot -->
    <ellipse cx="0" cy="2" rx="14" ry="11" fill="#ec4899" stroke="#db2777" stroke-width="2" />
    <ellipse cx="-3" cy="-1" rx="5" ry="3" fill="#ffffff" opacity="0.75" />
  </g>

  <!-- Slot 1 White Sparkles & Spiral Doodles -->
  <g transform="translate(385, 62)">
    <path d="M 0,0 C 8,-12 18,-6 14,4 C 11,10 2,8 0,4 C 3,2 8,3 6,5" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
  </g>
  <g transform="translate(210, 58)">
    <path d="M 0,0 L 2,-6 L 4,0 L 10,2 L 4,4 L 2,10 L 0,4 L -6,2 Z" fill="#ffffff" opacity="0.9" />
  </g>

  <!-- 2. SLOT 2: BIRTHDAY CROWN / CANDLE BANNER & CUTE SITTING KITTY -->
  <!-- Top Left Birthday Crown Banner -->
  <g transform="translate(85, 492) scale(0.95)" filter="url(#soft-shadow)">
    <path d="M 0,18 L 8,0 L 20,12 L 32,-2 L 44,12 L 56,0 L 64,18 Z" fill="#fbcfe8" stroke="#f472b6" stroke-width="2.5" />
    <circle cx="8" cy="0" r="3" fill="#fbbf24" />
    <circle cx="32" cy="-2" r="3" fill="#f43f5e" />
    <circle cx="56" cy="0" r="3" fill="#fbbf24" />
    <text x="32" y="16" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="8" fill="#be185d">PARTY</text>
  </g>

  <!-- Top Right Ribbon Clip -->
  <g transform="translate(485, 495) scale(0.85)">
    <path d="M 0,0 C -18,-14 -32,4 -4,-2 Z" fill="#f472b6" />
    <path d="M 0,0 C 18,-14 32,4 4,-2 Z" fill="#f472b6" />
    <circle cx="0" cy="-1" r="4" fill="#ec4899" />
  </g>

  <!-- Bottom Left: Cute Sitting Pink Kitty Illustration -->
  <g transform="translate(40, 825) scale(0.95)" filter="url(#soft-shadow)">
    <ellipse cx="26" cy="24" rx="18" ry="15" fill="#ffffff" stroke="#fbcfe8" stroke-width="2" />
    <!-- Ears -->
    <polygon points="12,12 8,0 18,7" fill="#ffffff" stroke="#fbcfe8" stroke-width="2" />
    <polygon points="12,11 9,3 17,7" fill="#f9a8d4" />
    <polygon points="34,12 38,0 28,7" fill="#ffffff" stroke="#fbcfe8" stroke-width="2" />
    <polygon points="34,11 37,3 29,7" fill="#f9a8d4" />
    <!-- Face -->
    <circle cx="21" cy="22" r="1.8" fill="#1e293b" />
    <circle cx="31" cy="22" r="1.8" fill="#1e293b" />
    <polygon points="26,24 24,26 28,26" fill="#f43f5e" />
    <!-- Pink Bow on Kitty -->
    <circle cx="26" cy="34" r="3" fill="#f472b6" />
    <path d="M 26,34 L 20,30 L 20,38 Z" fill="#f472b6" />
    <path d="M 26,34 L 32,30 L 32,38 Z" fill="#f472b6" />
  </g>

  <!-- 3. SLOT 3: CROWN & THE AUTHENTIC KOREAN "I JUST WANT TO LEAD A CAT'S LIFE" BANNER -->
  <!-- Princess Crown on Heart Top-Right -->
  <g transform="translate(490, 930) scale(1.15)" filter="url(#soft-shadow)">
    <path d="M 0,16 L 6,0 L 16,10 L 26,-2 L 36,10 L 46,0 L 52,16 Z" fill="#fbcfe8" stroke="#f472b6" stroke-width="2.5" />
    <circle cx="6" cy="0" r="2.5" fill="#fbbf24" />
    <circle cx="26" cy="-2" r="3.5" fill="#f43f5e" />
    <circle cx="46" cy="0" r="2.5" fill="#fbbf24" />
  </g>

  <!-- Authentic Cat Quote Banner at Bottom of Heart -->
  <g transform="translate(300, 1262)" filter="url(#soft-shadow)">
    <!-- Pill ribbon background -->
    <rect x="-145" y="-15" width="290" height="30" rx="15" fill="#fffdfa" stroke="#f9a8d4" stroke-width="2.5" />
    <text x="0" y="5" text-anchor="middle" font-family="'Plus Jakarta Sans', Georgia, cursive, serif" font-style="italic" font-weight="700" font-size="13.5" fill="#be185d" letter-spacing="0.5">
      I just want to lead a cat's life 🐾
    </text>
  </g>

  <!-- 4. SLOT 4: CHERRIES & PINK YARN BALL -->
  <!-- Double Glossy Red Cherries Top-Right -->
  <g transform="translate(488, 1305) scale(1.2)" filter="url(#soft-shadow)">
    <!-- Green stems -->
    <path d="M 0,14 C 4,-4 12,-12 16,-16 C 20,-12 18,2 18,16" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" />
    <!-- Leaf -->
    <path d="M 16,-16 C 24,-22 34,-18 36,-14 C 32,-10 22,-10 16,-16 Z" fill="#22c55e" stroke="#15803d" stroke-width="1.5" />
    <!-- Left cherry -->
    <circle cx="0" cy="14" r="10" fill="#e11d48" />
    <ellipse cx="-3" cy="11" rx="3" ry="2" fill="#ffffff" opacity="0.8" />
    <!-- Right cherry -->
    <circle cx="18" cy="16" r="10" fill="#e11d48" />
    <ellipse cx="15" cy="13" rx="3" ry="2" fill="#ffffff" opacity="0.8" />
  </g>

  <!-- Pink Yarn Ball Bottom-Left -->
  <g transform="translate(68, 1660) scale(1.15)" filter="url(#soft-shadow)">
    <circle cx="0" cy="0" r="16" fill="#f472b6" stroke="#db2777" stroke-width="2" />
    <path d="M -12,-6 C 0,10 12,-4 14,8" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.85" stroke-linecap="round" />
    <path d="M -10,8 C 4,-6 12,2 8,14" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.85" stroke-linecap="round" />
    <!-- Loose Yarn String Doodling Out -->
    <path d="M 14,8 C 24,18 32,8 42,14" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" />
  </g>

  <!-- Pink Bow on Slot 4 Top-Left -->
  <g transform="translate(60, 1318) scale(0.85)">
    <path d="M 0,0 C -18,-14 -32,4 -4,-2 Z" fill="#f472b6" />
    <path d="M 0,0 C 18,-14 32,4 4,-2 Z" fill="#f472b6" />
    <circle cx="0" cy="-1" r="4" fill="#ec4899" />
  </g>

  <!-- 5. FOOTER BRANDING: KOREAN CURSIVE "PhotoXinhh" / "Photo Palette" STYLE -->
  <g transform="translate(300, 1750)">
    <text x="0" y="0" text-anchor="middle" font-family="'Plus Jakarta Sans', cursive, sans-serif" font-weight="700" font-size="34" fill="#f472b6" letter-spacing="1.5">
      PhotoXinhh
    </text>
  </g>
</svg>`.trim();

      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }

    const padX = 36;
    const padTop = 130;
    const gap = 24;
    const slotW = width - padX * 2;
    const slotH = 360;

    const slots = [0, 1, 2, 3].map((i) => ({
      x: padX,
      y: padTop + i * (slotH + gap),
      w: slotW,
      h: slotH,
    }));

    const maskRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="14" fill="black" />`)
      .join('\n');

    const borderRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="14" fill="none" stroke="${accentColor}" stroke-width="3" />`)
      .join('\n');

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <mask id="slot-cutout-mask">
      <rect width="${width}" height="${height}" fill="white" />
      ${maskRects}
    </mask>
  </defs>

  <!-- Frame Background with transparent cutouts for camera/photos -->
  <rect width="${width}" height="${height}" fill="${bgColor}" mask="url(#slot-cutout-mask)" />

  <!-- Photo Slot Borders -->
  ${borderRects}

  <!-- Theme Cute Stickers & Illustrations -->
  ${renderThemeStickers1x4(tpl.id)}

  <!-- Header Header Bar / Stickers -->
  <rect x="0" y="0" width="${width}" height="110" fill="none" />
  <text x="${width / 2}" y="78" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="28" fill="${textColor}" letter-spacing="1">
    ${headerText}
  </text>
</svg>`.trim();

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  if (layout === '2x2_grid') {
    const width = 1200;
    const height = 1500;
    const padX = 48;
    const padTop = 50;
    const footerH = 150;
    const gap = 32;
    const slotW = (width - padX * 2 - gap) / 2;
    const slotH = (height - padTop - footerH - gap) / 2;

    const slots = [
      { x: padX, y: padTop },
      { x: padX + slotW + gap, y: padTop },
      { x: padX, y: padTop + slotH + gap },
      { x: padX + slotW + gap, y: padTop + slotH + gap },
    ];

    const maskRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${slotW}" height="${slotH}" rx="14" fill="black" />`)
      .join('\n');

    const borderRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${slotW}" height="${slotH}" rx="14" fill="none" stroke="${accentColor}" stroke-width="3.5" />`)
      .join('\n');

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <mask id="slot-cutout-mask-2x2">
      <rect width="${width}" height="${height}" fill="white" />
      ${maskRects}
    </mask>
  </defs>

  <rect width="${width}" height="${height}" fill="${bgColor}" mask="url(#slot-cutout-mask-2x2)" />
  ${borderRects}

  <!-- Theme Cute Stickers & Illustrations -->
  ${renderThemeStickers2x2(tpl.id)}

  <!-- Header Text (if template has headerEmoji) -->
  ${tpl.headerEmoji ? `
  <text x="${width / 2}" y="36" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="22" fill="${textColor}">
    ${headerText}
  </text>` : ''}
</svg>`.trim();

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  if (layout === 'collage_6') {
    const width = 1200;
    const height = 1800;

    // 6 Slots Coordinates
    const slots = [
      { x: 55, y: 145, w: 695, h: 810 },  // 1. Hero Large Left
      { x: 775, y: 145, w: 370, h: 395 }, // 2. Top Right
      { x: 775, y: 560, w: 370, h: 395 }, // 3. Mid Right
      { x: 55, y: 990, w: 345, h: 440 },  // 4. Bottom Left
      { x: 428, y: 990, w: 345, h: 440 }, // 5. Bottom Center
      { x: 800, y: 990, w: 345, h: 440 }, // 6. Bottom Right
    ];

    const maskRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="14" fill="black" />`)
      .join('\n');

    const borderRects = slots
      .map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="14" fill="none" stroke="${accentColor}" stroke-width="3" />`)
      .join('\n');

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <!-- Iridescent soap bubble gradients -->
    <radialGradient id="bubble-pink" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
      <stop offset="30%" stop-color="#fbcfe8" stop-opacity="0.5" />
      <stop offset="65%" stop-color="#bae6fd" stop-opacity="0.35" />
      <stop offset="90%" stop-color="#e9d5ff" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#f472b6" stop-opacity="0.75" />
    </radialGradient>

    <radialGradient id="bubble-blue" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="25%" stop-color="#bae6fd" stop-opacity="0.5" />
      <stop offset="60%" stop-color="#fbcfe8" stop-opacity="0.3" />
      <stop offset="85%" stop-color="#a7f3d0" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.75" />
    </radialGradient>

    <mask id="slot-cutout-collage">
      <rect width="${width}" height="${height}" fill="white" />
      ${maskRects}
    </mask>
  </defs>

  <!-- Frame Background with transparent cutouts -->
  <rect width="${width}" height="${height}" fill="${bgColor}" mask="url(#slot-cutout-collage)" />
  ${borderRects}

  <!-- Header: PhotoXinhh / Theme Title -->
  ${tpl.headerEmoji ? `
  <text x="55" y="90" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="28" fill="${textColor}" letter-spacing="1">
    ${headerText}
  </text>` : ''}

  <!-- Floating Iridescent Soap Bubbles (Placed naturally in outer margins & corners) -->
  <g opacity="0.95">
    <!-- Bubble 1 Top Left -->
    <circle cx="330" cy="55" r="32" fill="url(#bubble-blue)" stroke="#38bdf8" stroke-width="1.5" />
    <ellipse cx="320" cy="45" rx="8" ry="4" fill="#ffffff" opacity="0.8" />

    <!-- Bubble 2 Top Center -->
    <circle cx="680" cy="65" r="38" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.5" />
    <ellipse cx="668" cy="53" rx="10" ry="5" fill="#ffffff" opacity="0.8" />

    <!-- Bubble 3 Top Right Header -->
    <circle cx="1060" cy="70" r="28" fill="url(#bubble-blue)" stroke="#38bdf8" stroke-width="1.5" />
    <ellipse cx="1052" cy="62" rx="7" ry="3.5" fill="#ffffff" opacity="0.8" />

    <!-- Bubble 4 Far Top Right -->
    <circle cx="1140" cy="110" r="22" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.5" />

    <!-- Bubble 5 Left Margin Upper -->
    <circle cx="45" cy="270" r="30" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.5" />
    <ellipse cx="37" cy="260" rx="8" ry="4" fill="#ffffff" opacity="0.75" />

    <!-- Bubble 6 Left Margin Mid -->
    <circle cx="70" cy="460" r="24" fill="url(#bubble-blue)" stroke="#38bdf8" stroke-width="1.5" />

    <!-- Bubble 7 Mid Gap Top/Right -->
    <circle cx="760" cy="130" r="20" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.2" />

    <!-- Bubble 8 Right Margin Mid -->
    <circle cx="1160" cy="380" r="32" fill="url(#bubble-blue)" stroke="#38bdf8" stroke-width="1.5" />
    <ellipse cx="1150" cy="370" rx="8" ry="4" fill="#ffffff" opacity="0.8" />

    <!-- Bubble 9 Right Margin Lower -->
    <circle cx="1135" cy="580" r="26" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.5" />

    <!-- Bubble 10 Center Gap -->
    <circle cx="95" cy="670" r="22" fill="url(#bubble-blue)" stroke="#38bdf8" stroke-width="1.2" />

    <!-- Bubble 11 Bottom Left -->
    <circle cx="65" cy="1510" r="36" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.5" />
    <ellipse cx="54" cy="1498" rx="10" ry="5" fill="#ffffff" opacity="0.8" />

    <!-- Bubble 12 Bottom Center -->
    <circle cx="620" cy="1530" r="26" fill="url(#bubble-blue)" stroke="#38bdf8" stroke-width="1.5" />

    <!-- Bubble 13 Bottom Right -->
    <circle cx="1080" cy="1510" r="42" fill="url(#bubble-blue)" stroke="#38bdf8" stroke-width="1.5" />
    <ellipse cx="1066" cy="1496" rx="12" ry="6" fill="#ffffff" opacity="0.8" />

    <!-- Bubble 14 Far Bottom Corner -->
    <circle cx="1120" cy="1680" r="24" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.2" />
    <circle cx="150" cy="1720" r="28" fill="url(#bubble-blue)" stroke="#38bdf8" stroke-width="1.2" />
  </g>

  <!-- Pastel 4-point Sparkle Stars & Heart Bubbles -->
  <g opacity="0.85">
    <!-- Star 1 on left margin -->
    <path d="M 45 160 Q 45 190 20 190 Q 45 190 45 220 Q 45 190 70 190 Q 45 190 45 160 Z" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2" />
    <!-- Star 2 near mid left -->
    <path d="M 85 580 Q 85 605 65 605 Q 85 605 85 630 Q 85 605 105 605 Q 85 605 85 580 Z" fill="#fdf2f8" stroke="#f472b6" stroke-width="1.8" />
    <!-- Heart Bubble on right -->
    <path d="M 1080 60 C 1060 40 1030 50 1030 75 C 1030 100 1080 120 1080 120 C 1080 120 1130 100 1130 75 C 1130 50 1100 40 1080 60 Z" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.5" />
    <!-- Heart Bubble bottom right -->
    <path d="M 1070 1110 C 1055 1095 1030 1100 1030 1120 C 1030 1140 1070 1160 1070 1160 C 1070 1160 1110 1140 1110 1120 C 1110 1100 1085 1095 1070 1110 Z" fill="url(#bubble-pink)" stroke="#f472b6" stroke-width="1.5" />
  </g>
</svg>`.trim();

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  // Polaroid layout (1 Large Photo)
  const width = 900;
  const height = 1200;
  const padX = 54;
  const padTop = 54;
  const slotW = width - padX * 2;
  const slotH = slotW;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <mask id="slot-cutout-polaroid">
      <rect width="${width}" height="${height}" fill="white" />
      <rect x="${padX}" y="${padTop}" width="${slotW}" height="${slotH}" rx="14" fill="black" />
    </mask>
  </defs>

  <rect width="${width}" height="${height}" fill="${bgColor}" mask="url(#slot-cutout-polaroid)" />
  <rect x="${padX}" y="${padTop}" width="${slotW}" height="${slotH}" rx="14" fill="none" stroke="${accentColor}" stroke-width="3.5" />

  <!-- Theme Cute Stickers & Illustrations -->
  ${renderThemeStickersPolaroid(tpl.id)}
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
