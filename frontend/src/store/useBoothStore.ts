import { create } from 'zustand';
import { LayoutType, FilterType, AppStep, FrameOption } from '../types/photobooth';

export const FRAME_PRESETS: FrameOption[] = [
  { id: 'classic-white', name: 'Trắng Tinh Khôi', bgColor: '#ffffff', textColor: '#1e293b', category: 'pastel' },
  { id: 'pastel-pink', name: 'Hồng PhotoXinhh', bgColor: '#fbcfe8', textColor: '#be185d', category: 'pastel' },
  { id: 'pastel-lavender', name: 'Tím Pastel', bgColor: '#e9d5ff', textColor: '#6b21a8', category: 'pastel' },
  { id: 'pastel-mint', name: 'Xanh Mint Bạc Hà', bgColor: '#a7f3d0', textColor: '#065f46', category: 'pastel' },
  { id: 'dark-noir', name: 'Đen Sang Trọng', bgColor: '#0f172a', textColor: '#f8fafc', category: 'dark' },
  { id: 'retro-cream', name: 'Kem Vintage', bgColor: '#fef3c7', textColor: '#78350f', category: 'retro' },
  { id: 'y2k-cyber', name: 'Neon Y2K', bgColor: '#4c1d95', textColor: '#f43f5e', category: 'idol' },
];

interface BoothState {
  step: AppStep;
  layout: LayoutType;
  filter: FilterType;
  frame: FrameOption;
  photos: string[]; // List of base64 dataUrls captured
  activeSlotIndex: number;
  isMirror: boolean;
  timerDuration: number; // 3 or 5 or 10 seconds
  customText: string;
  showDateStamp: boolean;
  isVideoRecap: boolean;
  recapVideoUrl: string | null;

  // Actions
  setStep: (step: AppStep) => void;
  setLayout: (layout: LayoutType) => void;
  setFilter: (filter: FilterType) => void;
  setFrame: (frame: FrameOption) => void;
  addPhoto: (dataUrl: string) => void;
  updatePhotoAtSlot: (index: number, dataUrl: string) => void;
  removePhotoAtSlot: (index: number) => void;
  setPhotos: (photos: string[]) => void;
  resetPhotos: () => void;
  toggleMirror: () => void;
  setTimerDuration: (seconds: number) => void;
  setCustomText: (text: string) => void;
  toggleDateStamp: () => void;
  toggleVideoRecap: () => void;
  setRecapVideoUrl: (url: string | null) => void;
}

export const useBoothStore = create<BoothState>((set) => ({
  step: 'capture', // Default directly to the photo capture screen!
  layout: '1x4_strip',
  filter: 'korean_glow',
  frame: FRAME_PRESETS[1], // Default pastel pink
  photos: [],
  activeSlotIndex: 0,
  isMirror: true,
  timerDuration: 3,
  customText: 'PHOTOBOOTH • MEMORIES',
  showDateStamp: true,
  isVideoRecap: false,
  recapVideoUrl: null,

  setStep: (step) => set({ step }),
  setLayout: (layout) => set({ layout }),
  setFilter: (filter) => set({ filter }),
  setFrame: (frame) => set({ frame }),
  addPhoto: (dataUrl) => set((state) => ({ photos: [...state.photos, dataUrl] })),
  updatePhotoAtSlot: (index, dataUrl) =>
    set((state) => {
      const updated = [...state.photos];
      updated[index] = dataUrl;
      return { photos: updated };
    }),
  removePhotoAtSlot: (index) =>
    set((state) => {
      const updated = [...state.photos];
      updated.splice(index, 1);
      return { photos: updated };
    }),
  setPhotos: (photos) => set({ photos }),
  resetPhotos: () =>
    set((state) => {
      if (state.recapVideoUrl) {
        URL.revokeObjectURL(state.recapVideoUrl);
      }
      return { photos: [], recapVideoUrl: null };
    }),
  toggleMirror: () => set((state) => ({ isMirror: !state.isMirror })),
  setTimerDuration: (timerDuration) => set({ timerDuration }),
  setCustomText: (customText) => set({ customText }),
  toggleDateStamp: () => set((state) => ({ showDateStamp: !state.showDateStamp })),
  toggleVideoRecap: () => set((state) => ({ isVideoRecap: !state.isVideoRecap })),
  setRecapVideoUrl: (recapVideoUrl) => set({ recapVideoUrl }),
}));
