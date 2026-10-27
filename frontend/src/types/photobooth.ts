export type LayoutType = '1x4_strip' | '2x2_grid' | 'polaroid';

export type FilterType = 'normal' | 'korean_glow' | 'bw' | 'vintage' | 'warm_retro' | 'cool_cyber';

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
}

export type AppStep = 'select_layout' | 'capture' | 'customize' | 'result';
