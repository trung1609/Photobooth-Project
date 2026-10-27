export interface FrameTemplate {
  id: string;
  name: string;
  category: 'all' | 'basic' | 'kpop' | 'cartoon' | 'cute' | 'retro' | 'holiday';
  layout: '1x4_strip' | '2x2_grid' | 'polaroid';
  bgColor: string;
  textColor: string;
  accentColor: string;
  badge?: string;
  previewImage?: string;
  author?: string;
  overlaySvg?: string; // Optional SVG / PNG overlay pattern
}

export const SAMPLE_FRAMES: FrameTemplate[] = [
  {
    id: 'basic-11',
    name: 'Basic-11',
    category: 'basic',
    layout: '1x4_strip',
    bgColor: '#fdf2f8',
    textColor: '#be185d',
    accentColor: '#f472b6',
    badge: 'BASIC',
    author: 'PhotoXinhh'
  },
  {
    id: 'tv-retro',
    name: 'TV',
    category: 'retro',
    layout: '1x4_strip',
    bgColor: '#fef3c7',
    textColor: '#b45309',
    accentColor: '#f59e0b',
    badge: 'HOT',
    author: 'Retro Hub'
  },
  {
    id: 'basic-17',
    name: 'Basic-17',
    category: 'basic',
    layout: '1x4_strip',
    bgColor: '#1e3a8a',
    textColor: '#ffffff',
    accentColor: '#60a5fa',
    badge: 'STARS',
    author: 'Starry Studio'
  },
  {
    id: 'giay-ket-hon',
    name: 'Giấy Kết Hôn',
    category: 'cute',
    layout: '1x4_strip',
    bgColor: '#ffe4e6',
    textColor: '#e11d48',
    accentColor: '#f43f5e',
    badge: 'COUPLE',
    author: 'Love Club'
  },
  {
    id: 'zootopia',
    name: 'Zootopia',
    category: 'cartoon',
    layout: '1x4_strip',
    bgColor: '#ecfdf5',
    textColor: '#047857',
    accentColor: '#10b981',
    badge: 'CUTE',
    author: 'Disney Fan'
  },
  {
    id: 'lol',
    name: 'LOL',
    category: 'basic',
    layout: '1x4_strip',
    bgColor: '#0f172a',
    textColor: '#f8fafc',
    accentColor: '#38bdf8',
    badge: 'GAME',
    author: 'Rioters'
  },
  {
    id: 'basic-8',
    name: 'Basic-8',
    category: 'basic',
    layout: '1x4_strip',
    bgColor: '#991b1b',
    textColor: '#ffffff',
    accentColor: '#ef4444',
    badge: 'CLASSIC',
    author: 'Noir Red'
  },
  {
    id: 'viet-nam-3',
    name: 'Việt Nam_3',
    category: 'holiday',
    layout: '1x4_strip',
    bgColor: '#fef08a',
    textColor: '#b91c1c',
    accentColor: '#dc2626',
    badge: 'VIỆT NAM',
    author: 'Tự Hào VN'
  },
  {
    id: 'cream-soda',
    name: 'cream-soda',
    category: 'cute',
    layout: '1x4_strip',
    bgColor: '#f0fdf4',
    textColor: '#15803d',
    accentColor: '#22c55e',
    badge: 'AESTHETIC',
    author: 'Cafe Vibes'
  },
  {
    id: 'fannct-dream',
    name: 'FanNCT_DREAM',
    category: 'kpop',
    layout: '1x4_strip',
    bgColor: '#fdf0d5',
    textColor: '#8338ec',
    accentColor: '#ff006e',
    badge: 'KPOP',
    author: 'NCTzen'
  },
  {
    id: 'wordle',
    name: 'Wordle',
    category: 'cute',
    layout: '1x4_strip',
    bgColor: '#f4fbf7',
    textColor: '#166534',
    accentColor: '#65a30d',
    badge: 'TREND',
    author: 'Game Studio'
  },
  {
    id: 'ulis-card',
    name: 'ULIS-card',
    category: 'cute',
    layout: '1x4_strip',
    bgColor: '#eff6ff',
    textColor: '#1d4ed8',
    accentColor: '#3b82f6',
    badge: 'STUDENT',
    author: 'ULIS Club'
  },
  {
    id: 'thomeo',
    name: 'thomeo',
    category: 'cartoon',
    layout: '1x4_strip',
    bgColor: '#fdf2f8',
    textColor: '#be185d',
    accentColor: '#f472b6',
    badge: 'CUTE',
    author: 'MeoMeo'
  },
  {
    id: 'uprize',
    name: 'UPRIZE LAYM&PN',
    category: 'cute',
    layout: '1x4_strip',
    bgColor: '#e0f2fe',
    textColor: '#0284c7',
    accentColor: '#38bdf8',
    badge: 'TREND',
    author: 'Uprize'
  },
  {
    id: 'hello-kitty',
    name: 'HelloKitty',
    category: 'cartoon',
    layout: '1x4_strip',
    bgColor: '#fff1f2',
    textColor: '#e11d48',
    accentColor: '#fb7185',
    badge: 'SANRIO',
    author: 'Sanrio Fan'
  },
  {
    id: 'school',
    name: 'School',
    category: 'cute',
    layout: '1x4_strip',
    bgColor: '#f8fafc',
    textColor: '#334155',
    accentColor: '#64748b',
    badge: 'RETRO',
    author: 'Vintage Class'
  },
  {
    id: 'shinchan-pink',
    name: 'ShinChanPink',
    category: 'cartoon',
    layout: '1x4_strip',
    bgColor: '#fdf2f8',
    textColor: '#be185d',
    accentColor: '#f472b6',
    badge: 'SHIN-CHAN',
    author: 'Shin-chan'
  },
  {
    id: 'y2k-cyber',
    name: 'Y2K',
    category: 'retro',
    layout: '1x4_strip',
    bgColor: '#f1f5f9',
    textColor: '#475569',
    accentColor: '#0ea5e9',
    badge: 'Y2K',
    author: 'Gen Z'
  },
  {
    id: 'basic-6',
    name: 'Basic-6',
    category: 'basic',
    layout: '1x4_strip',
    bgColor: '#ffffff',
    textColor: '#0f172a',
    accentColor: '#000000',
    badge: 'BLACK',
    author: 'Classic Studio'
  },
  {
    id: 'cute-pinkie',
    name: 'Cute Pinkie',
    category: 'cute',
    layout: '1x4_strip',
    bgColor: '#fce7f3',
    textColor: '#9d174d',
    accentColor: '#ec4899',
    badge: 'PINK',
    author: 'Pinkie'
  },
  {
    id: 'blackpink',
    name: 'BlackPink',
    category: 'kpop',
    layout: '1x4_strip',
    bgColor: '#000000',
    textColor: '#f472b6',
    accentColor: '#ec4899',
    badge: 'BLINK',
    author: 'BP Zone'
  },
  {
    id: 'film1',
    name: 'Film1',
    category: 'retro',
    layout: '1x4_strip',
    bgColor: '#ffffff',
    textColor: '#18181b',
    accentColor: '#27272a',
    badge: 'MONO',
    author: 'Photoism'
  },
  {
    id: 'dau-tay',
    name: 'Dâu Tây',
    category: 'cute',
    layout: '1x4_strip',
    bgColor: '#fff1f2',
    textColor: '#be123c',
    accentColor: '#f43f5e',
    badge: 'BERRY',
    author: 'Sweet Studio'
  },
  {
    id: 'toystory',
    name: 'ToyStory',
    category: 'cartoon',
    layout: '1x4_strip',
    bgColor: '#ecfeff',
    textColor: '#0e7490',
    accentColor: '#06b6d4',
    badge: 'PIXAR',
    author: 'Woody Buzz'
  }
];

export interface CommunityPhoto {
  id: string;
  title: string;
  imageUrl: string;
  layout: string;
  likes: number;
  author: string;
  date: string;
}

export const COMMUNITY_PHOTOS: CommunityPhoto[] = [
  {
    id: 'c1',
    title: 'Photobooth online free cùng bạn thân',
    imageUrl: '/img/hero_photobooth.png',
    layout: '1x4 Dải Dọc',
    likes: 1240,
    author: 'Linh & My',
    date: '2026.10.25'
  },
  {
    id: 'c2',
    title: 'Chụp photobooth tại nhà tone xanh pastel',
    imageUrl: '/img/sample_1.jpg',
    layout: '2x2 Lưới Vuông',
    likes: 980,
    author: 'Hương Giang',
    date: '2026.10.26'
  },
  {
    id: 'c3',
    title: 'Photoism Noir trắng đen siêu ngầu',
    imageUrl: '/img/sample_2.jpg',
    layout: '1x4 Dải Dọc',
    likes: 1540,
    author: 'Minh Tuấn',
    date: '2026.10.27'
  },
  {
    id: 'c4',
    title: 'Couple photobooth kỷ niệm 1 năm',
    imageUrl: '/img/sample_1.jpg',
    layout: '2x2 Lưới Vuông',
    likes: 830,
    author: 'Khánh & Vy',
    date: '2026.10.24'
  },
  {
    id: 'c5',
    title: 'Dải film 4 ô sinh nhật đáng yêu',
    imageUrl: '/img/hero_photobooth.png',
    layout: '1x4 Dải Dọc',
    likes: 2150,
    author: 'Bảo Trâm',
    date: '2026.10.23'
  },
  {
    id: 'c6',
    title: 'Retro film strip vintage',
    imageUrl: '/img/sample_2.jpg',
    layout: '1x4 Dải Dọc',
    likes: 720,
    author: 'Hải Đăng',
    date: '2026.10.22'
  }
];
