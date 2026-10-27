export type LayoutType = '1x4_strip' | '2x2_grid' | 'polaroid';

export type FilterType = 'normal' | 'cool_pink' | 'cool_white' | 'korean_glow' | 'bw' | 'vintage' | 'warm_retro' | 'cool_cyber';

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
