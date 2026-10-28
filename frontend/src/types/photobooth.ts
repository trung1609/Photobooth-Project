export type LayoutType = '1x4_strip' | '2x2_grid' | 'polaroid' | 'collage_6';

export type FilterType = 'normal' | 'korean_glow' | 'vintage' | 'cinematic' | 'bw';

export interface PhotoSlot {
  id: number;
  dataUrl: string | null;
  timestamp?: string;
}

export interface FrameOption {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  category: 'pastel' | 'dark' | 'retro' | 'idol';
  overlayImage?: string; // Transparent PNG or SVG overlay to display in camera & composite
}

export type AppStep = 'select_layout' | 'capture' | 'customize' | 'result';
