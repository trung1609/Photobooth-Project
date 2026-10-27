export interface FrameTemplate {
  id: string;
  name: string;
  category: 'hot_trend' | 'idol' | 'retro' | 'cute' | 'holiday';
  layout: '1x4_strip' | '2x2_grid' | 'polaroid';
  bgColor: string;
  textColor: string;
  accentColor: string;
  badge?: string;
  previewImage: string;
  author?: string;
}

export const SAMPLE_FRAMES: FrameTemplate[] = [
  {
    id: 'frame-korean-pink',
    name: 'PhotoXinhh Pastel Pink',
    category: 'hot_trend',
    layout: '1x4_strip',
    bgColor: '#fdf2f8',
    textColor: '#be185d',
    accentColor: '#f472b6',
    badge: 'HOT TREND',
    previewImage: '/img/hero_photobooth.png',
    author: 'PhotoXinhh Official'
  },
  {
    id: 'frame-haru-film',
    name: 'Haru Sky Blue',
    category: 'cute',
    layout: '2x2_grid',
    bgColor: '#e0f2fe',
    textColor: '#0369a1',
    accentColor: '#38bdf8',
    badge: 'YÊU THÍCH',
    previewImage: '/img/sample_1.jpg',
    author: 'Haru Style'
  },
  {
    id: 'frame-photoism-noir',
    name: 'Photoism Black & White',
    category: 'retro',
    layout: '1x4_strip',
    bgColor: '#18181b',
    textColor: '#f4f4f5',
    accentColor: '#71717a',
    badge: 'CLASSIC',
    previewImage: '/img/sample_2.jpg',
    author: 'Noir Film'
  },
  {
    id: 'frame-y2k-cyber',
    name: 'Y2K Cyber Neon',
    category: 'hot_trend',
    layout: '1x4_strip',
    bgColor: '#2e1065',
    textColor: '#f43f5e',
    accentColor: '#ec4899',
    badge: 'TRENDING',
    previewImage: '/img/hero_photobooth.png',
    author: 'Gen Z Studio'
  },
  {
    id: 'frame-idol-kpop',
    name: 'K-Pop Idol Special',
    category: 'idol',
    layout: '2x2_grid',
    bgColor: '#faf5ff',
    textColor: '#7e22ce',
    accentColor: '#c084fc',
    badge: 'IDOL',
    previewImage: '/img/sample_1.jpg',
    author: 'K-Trend'
  },
  {
    id: 'frame-polaroid-retro',
    name: 'Polaroid Classic Cream',
    category: 'retro',
    layout: 'polaroid',
    bgColor: '#fefce8',
    textColor: '#854d0e',
    accentColor: '#facc15',
    badge: 'VINTAGE',
    previewImage: '/img/sample_2.jpg',
    author: 'Film Maker'
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
