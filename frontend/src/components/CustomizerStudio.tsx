import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Download,
  Upload,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
  PenLine,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBoothStore } from '../store/useBoothStore';
import { SAMPLE_FRAMES, FrameTemplate } from '../data/framesData';
import { generateFrameOverlaySvg } from '../utils/frameSvgGenerator';
import {
  FRAME_EFFECTS,
  FrameEffectType,
  drawFrameEffect
} from '../utils/frameEffectsEngine';

export interface PlacedSticker {
  id: string;
  emoji: string;
  x: number; // 0..1 ratio
  y: number; // 0..1 ratio
  size: number; // base font size in px (e.g. 36)
  rotation: number; // degrees
}

const STICKER_PACKS = [
  {
    id: 'bows',
    name: '🎀 Nơ & Ruy Băng 3D',
    stickers: ['🎀', '🩰', '👑', '🌸', '💮', '🏵️', '🌷', '🌺', '💖', '💗', '🍓', '🍒', '🪞', '💄', '💍', '💎'],
  },
  {
    id: 'animals',
    name: '🐾 Thú Cưng Cute 3D',
    stickers: ['🐱', '🐰', '🧸', '🐶', '🐻', '🐼', '🐥', '🦊', '🐹', '🐨', '🦄', '🐾', '🦁', '🐸', '🐧', '🦆'],
  },
  {
    id: 'food',
    name: '🍰 Đồ Ăn & Trà Sữa 3D',
    stickers: ['🍰', '🎂', '🧁', '🧋', '🍦', '🍓', '🍒', '🍩', '🍭', '🍮', '🍪', '🥞', '🍫', '🍧', '🥐', '🍡', '🍬', '🧇'],
  },
  {
    id: 'sparkles',
    name: '✨ Lấp Lánh & Tim 3D',
    stickers: ['✨', '💖', '💕', '⭐', '🌟', '🫧', '💫', '💘', '🤍', '💞', '❤️‍🔥', '🌈', '💝', '💟', '💓', '🪄', '🔮', '🎇'],
  },
  {
    id: 'nature',
    name: '🕊️ Thiên Nhiên & Bướm 3D',
    stickers: ['🦋', '🕊️', '🌸', '🍀', '🌼', '🌻', '🍃', '🌿', '🍄', '🌷', '💐', '🪴', '🌱', '🌾', '🌙', '☁️', '❄️', '🫧'],
  },
  {
    id: 'props',
    name: '🕶️ Đạo Cụ & Y2K 3D',
    stickers: ['🕶️', '🥳', '🎩', '📷', '🎧', '💌', '🎈', '🎉', '🍿', '💿', '📼', '🕹️', '👾', '🖤', '🔥', '🛹', '🎸', '⚡', '👑'],
  },
  {
    id: 'kpop',
    name: '💖 Biểu Cảm K-Pop 3D',
    stickers: ['🥰', '😍', '😚', '🥺', '🥳', '🤭', '😻', '😸', '😽', '🫶', '🫰', '✌️', '🤟', '🤍', '🤎', '✨'],
  },
];

export const CustomizerStudio: React.FC = () => {
  const {
    layout,
    photos,
    frame,
    setFrame,
    recapVideoUrl,
    resetPhotos,
    setStep,
  } = useBoothStore();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // States matching user's photo studio workflow
  const [activeTab, setActiveTab] = useState<'frames' | 'effects' | 'stickers'>('frames');
  const [selectedFrameEffect, setSelectedFrameEffect] = useState<FrameEffectType>('none');
  const [activeStickerCategory, setActiveStickerCategory] = useState<string>('bows');
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const draggingRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);

  // Category horizontal scroll & drag helpers
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const [isCatDragging, setIsCatDragging] = useState(false);
  const catDragStartX = useRef(0);
  const catDragScrollLeft = useRef(0);

  const handleCatMouseDown = (e: React.MouseEvent) => {
    if (!categoryBarRef.current) return;
    setIsCatDragging(true);
    catDragStartX.current = e.pageX - categoryBarRef.current.offsetLeft;
    catDragScrollLeft.current = categoryBarRef.current.scrollLeft;
  };

  const handleCatMouseMove = (e: React.MouseEvent) => {
    if (!isCatDragging || !categoryBarRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoryBarRef.current.offsetLeft;
    const walk = (x - catDragStartX.current) * 1.5;
    categoryBarRef.current.scrollLeft = catDragScrollLeft.current - walk;
  };

  const handleCatMouseUp = () => {
    setIsCatDragging(false);
  };

  const [stripColumns, setStripColumns] = useState<1 | 2>(1); // 1 = 1 cột ảnh, 2 = 2 cột ảnh
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [customCaption, setCustomCaption] = useState<string>('PhotoXinhh');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customUploadedFrame, setCustomUploadedFrame] = useState<string | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<FrameTemplate>(() => {
    const match = SAMPLE_FRAMES.find((f) => f.id === frame.id && f.layout === layout);
    if (match) return match;
    const matchLayout = SAMPLE_FRAMES.find((f) => f.layout === layout);
    return matchLayout || SAMPLE_FRAMES[0];
  });

  // Sticker actions
  const addSticker = (emoji: string) => {
    const newSticker: PlacedSticker = {
      id: `stk_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      emoji,
      x: 0.5 + (Math.random() - 0.5) * 0.25,
      y: 0.5 + (Math.random() - 0.5) * 0.25,
      size: 40,
      rotation: Math.round((Math.random() - 0.5) * 24),
    };
    setPlacedStickers((prev) => [...prev, newSticker]);
    setSelectedStickerId(newSticker.id);
  };

  const updateSticker = (id: string, updates: Partial<PlacedSticker>) => {
    setPlacedStickers((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const removeSticker = (id: string) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
    if (selectedStickerId === id) setSelectedStickerId(null);
  };

  const clearAllStickers = () => {
    setPlacedStickers([]);
    setSelectedStickerId(null);
  };

  const handleStickerPointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setSelectedStickerId(id);
    const sticker = placedStickers.find((s) => s.id === id);
    if (sticker) {
      draggingRef.current = {
        id,
        startX: e.clientX,
        startY: e.clientY,
        origX: sticker.x,
        origY: sticker.y,
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = (e.clientX - draggingRef.current.startX) / rect.width;
    const deltaY = (e.clientY - draggingRef.current.startY) / rect.height;

    const newX = Math.max(0.04, Math.min(0.96, draggingRef.current.origX + deltaX));
    const newY = Math.max(0.04, Math.min(0.96, draggingRef.current.origY + deltaY));

    setPlacedStickers((prev) =>
      prev.map((s) => (s.id === draggingRef.current?.id ? { ...s, x: newX, y: newY } : s))
    );
  };

  const handlePointerUp = () => {
    draggingRef.current = null;
  };

  // Filtered frames based on layout, category and search query
  const filteredFrames = SAMPLE_FRAMES.filter((f) => {
    const matchLayout = f.layout === layout;
    const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.author && f.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchLayout && matchCategory && matchSearch;
  });

  // Draw a single 1x4 vertical strip onto a specific region of canvas
  const drawSingleStrip = (
    ctx: CanvasRenderingContext2D,
    xOffset: number,
    stripWidth: number,
    stripHeight: number,
    loadedPhotos: HTMLImageElement[],
    loadedOverlay: HTMLImageElement | null
  ) => {
    // Enable highest quality smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const s = stripWidth / 400; // Relative scale factor compared to base 400px

    // 1. Background fill
    ctx.fillStyle = selectedFrame.bgColor || '#ffffff';
    ctx.fillRect(xOffset, 0, stripWidth, stripHeight);

    // 2. Margins and slot dimensions matching exact SVG layout specifications (600x1800 base)
    const padX = (36 / 600) * stripWidth;
    const padTop = (130 / 1800) * stripHeight;
    const slotW = stripWidth - padX * 2;
    const slotH = (360 / 1800) * stripHeight;
    const gap = (24 / 1800) * stripHeight;
    const footerHeight = (158 / 1800) * stripHeight;
    const r = Math.round((14 / 600) * stripWidth);

    for (let i = 0; i < 4; i++) {
      const img = loadedPhotos[i % loadedPhotos.length];
      const slotY = padTop + i * (slotH + gap);

      if (img) {
        ctx.save();

        // Special custom shapes for Photo Palette (Cat Ears Slot 1 & Heart Slot 3)
        const sf = stripWidth / 600;
        if (selectedFrame.id === 'photo-palette-cat' || selectedFrame.id.includes('palette')) {
          if (i === 0) {
            // Cat Head cutout (soft organic Korean photobooth curves matching sample)
            const catPath = new Path2D(
              'M 300,165 C 240,155 170,120 135,90 C 110,70 85,85 75,120 C 55,185 45,280 48,370 C 50,440 85,465 140,468 L 460,468 C 515,465 550,440 552,370 C 555,280 545,185 525,120 C 515,85 490,70 465,90 C 430,120 360,155 300,165 Z'
            );
            ctx.translate(xOffset, 0);
            ctx.scale(sf, sf);
            ctx.clip(catPath);
            ctx.filter = 'none';
            drawImageCover(ctx, img, 48, 70, 504, 400);
            ctx.restore();
            continue;
          } else if (i === 2) {
            // Heart cutout (plump symmetric romantic heart shape)
            const heartPath = new Path2D(
              'M 300,925 C 265,865 175,845 115,885 C 45,935 45,1035 95,1115 C 155,1195 265,1255 300,1275 C 335,1255 445,1195 505,1115 C 555,1035 555,935 485,885 C 425,845 335,865 300,925 Z'
            );
            ctx.translate(xOffset, 0);
            ctx.scale(sf, sf);
            ctx.clip(heartPath);
            ctx.filter = 'none';
            drawImageCover(ctx, img, 45, 840, 510, 440);
            ctx.restore();
            continue;
          }
        }

        // Standard rounded rectangle slot
        ctx.beginPath();
        ctx.moveTo(xOffset + padX + r, slotY);
        ctx.lineTo(xOffset + padX + slotW - r, slotY);
        ctx.quadraticCurveTo(xOffset + padX + slotW, slotY, xOffset + padX + slotW, slotY + r);
        ctx.lineTo(xOffset + padX + slotW, slotY + slotH - r);
        ctx.quadraticCurveTo(xOffset + padX + slotW, slotY + slotH, xOffset + padX + slotW - r, slotY + slotH);
        ctx.lineTo(xOffset + padX + r, slotY + slotH);
        ctx.quadraticCurveTo(xOffset + padX, slotY + slotH, xOffset + padX, slotY + slotH - r);
        ctx.lineTo(xOffset + padX, slotY + r);
        ctx.quadraticCurveTo(xOffset + padX, slotY, xOffset + padX + r, slotY);
        ctx.closePath();
        ctx.clip();

        // Photos already contain native skin-grade grading from camera capture (Lossless PNG)
        ctx.filter = 'none';
        drawImageCover(ctx, img, xOffset + padX, slotY, slotW, slotH);
        ctx.restore();
      } else {
        // Fallback placeholder slot
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(xOffset + padX, slotY, slotW, slotH);
      }
    }

    // 4. Draw Custom Overlay image if available
    if (loadedOverlay) {
      ctx.save();
      ctx.filter = 'none';
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(loadedOverlay, xOffset, 0, stripWidth, stripHeight);
      ctx.restore();
    } else {
      // 5. Draw Decorative Template Theme Stickers / Headers
      ctx.save();
      ctx.filter = 'none';

      // Header sticker / emoji / branding
      if (selectedFrame.headerEmoji) {
        ctx.fillStyle = selectedFrame.textColor;
        ctx.font = `bold ${Math.round(stripWidth * 0.038)}px "Plus Jakarta Sans", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(selectedFrame.headerEmoji, xOffset + stripWidth / 2, padTop * 0.28);
      }

      // Slot borders for aesthetic pop
      ctx.strokeStyle = selectedFrame.accentColor || '#fbcfe8';
      ctx.lineWidth = Math.max(1, Math.round(1.5 * s));
      const bOffset = Math.max(1, Math.round(1 * s));
      for (let i = 0; i < 4; i++) {
        const slotY = padTop + i * (slotH + gap);
        ctx.strokeRect(xOffset + padX - bOffset, slotY - bOffset, slotW + bOffset * 2, slotH + bOffset * 2);
      }

      ctx.restore();
    }

    // 6. Draw Bottom Footer (Logo, Caption, Date Stamp)
    if (showLogo) {
      ctx.save();
      ctx.filter = 'none';
      ctx.fillStyle = selectedFrame.textColor || '#475569';

      const footerCenterY = stripHeight - footerHeight / 2 - (10 / 1800) * stripHeight;

      // Left: PhotoXinhh / Custom caption
      ctx.textAlign = 'left';
      ctx.font = `bold ${Math.round(stripWidth * 0.038)}px "Plus Jakarta Sans", sans-serif`;
      const brandText = customCaption.trim() || 'PhotoXinhh';
      ctx.fillText(brandText, xOffset + padX, footerCenterY);

      // Right: Date stamp (e.g. 27/10/2026)
      ctx.textAlign = 'right';
      ctx.font = `500 ${Math.round(stripWidth * 0.032)}px "Plus Jakarta Sans", sans-serif`;
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      ctx.fillText(dateStr, xOffset + stripWidth - padX, footerCenterY);

      ctx.restore();
    }
  };

  // Helper: Cover image into slot rect with high quality bicubic interpolation
  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const imgRatio = img.width / img.height;
    const targetRatio = w / h;
    let sWidth, sHeight, sx, sy;

    if (imgRatio > targetRatio) {
      sHeight = img.height;
      sWidth = img.height * targetRatio;
      sx = (img.width - sWidth) / 2;
      sy = 0;
    } else {
      sWidth = img.width;
      sHeight = img.width / targetRatio;
      sx = 0;
      sy = (img.height - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
  };

  // Draw 2x2 Grid Layout onto canvas
  const draw2x2Grid = (
    ctx: CanvasRenderingContext2D,
    canvasW: number,
    canvasH: number,
    loadedPhotos: HTMLImageElement[],
    loadedOverlay: HTMLImageElement | null
  ) => {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Background fill
    ctx.fillStyle = selectedFrame.bgColor || '#ffffff';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Matching 2x2 grid SVG specification (1200x1500 base)
    const padX = (48 / 1200) * canvasW;
    const padTop = (50 / 1500) * canvasH;
    const gap = (32 / 1200) * canvasW;
    const footerH = (150 / 1500) * canvasH;
    const slotW = (canvasW - padX * 2 - gap) / 2;
    const slotH = (canvasH - padTop - footerH - gap) / 2;
    const r = Math.round((14 / 1200) * canvasW);

    const slotCoords = [
      { x: padX, y: padTop },
      { x: padX + slotW + gap, y: padTop },
      { x: padX, y: padTop + slotH + gap },
      { x: padX + slotW + gap, y: padTop + slotH + gap },
    ];

    for (let i = 0; i < 4; i++) {
      const img = loadedPhotos[i % loadedPhotos.length];
      const { x, y } = slotCoords[i];

      if (img) {
        ctx.save();
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, slotW, slotH, r);
        } else {
          ctx.rect(x, y, slotW, slotH);
        }
        ctx.clip();
        ctx.filter = 'none';
        drawImageCover(ctx, img, x, y, slotW, slotH);
        ctx.restore();
      } else {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(x, y, slotW, slotH);
      }
    }

    // 3. Draw Overlay if present
    if (loadedOverlay) {
      ctx.save();
      ctx.filter = 'none';
      ctx.drawImage(loadedOverlay, 0, 0, canvasW, canvasH);
      ctx.restore();
    } else {
      // Slot borders if no overlay
      ctx.save();
      ctx.strokeStyle = selectedFrame.accentColor || '#fbcfe8';
      ctx.lineWidth = Math.max(1, Math.round(2.5 * (canvasW / 600)));
      slotCoords.forEach(({ x, y }) => {
        ctx.strokeRect(x, y, slotW, slotH);
      });
      ctx.restore();
    }

    // 4. Draw Footer (Logo / Custom Caption and Date Stamp)
    if (showLogo) {
      ctx.save();
      ctx.filter = 'none';
      ctx.fillStyle = selectedFrame.textColor || '#475569';
      const footerCenterY = canvasH - footerH / 2 + 10;

      // Left: Caption / Brand
      ctx.textAlign = 'left';
      ctx.font = `bold ${Math.round(canvasW * 0.034)}px "Plus Jakarta Sans", sans-serif`;
      const brandText = customCaption.trim() || 'PhotoXinhh';
      ctx.fillText(brandText, padX + 8, footerCenterY);

      // Right: Date
      ctx.textAlign = 'right';
      ctx.font = `500 ${Math.round(canvasW * 0.026)}px "Plus Jakarta Sans", sans-serif`;
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      ctx.fillText(dateStr, canvasW - padX - 8, footerCenterY);

      ctx.restore();
    }
  };

  // Draw Polaroid 1-Photo Layout onto canvas
  const drawPolaroid = (
    ctx: CanvasRenderingContext2D,
    canvasW: number,
    canvasH: number,
    loadedPhotos: HTMLImageElement[],
    loadedOverlay: HTMLImageElement | null
  ) => {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Background fill
    ctx.fillStyle = selectedFrame.bgColor || '#ffffff';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Matching Polaroid SVG specification (900x1200 base)
    const padX = (54 / 900) * canvasW;
    const padTop = (54 / 1200) * canvasH;
    const slotW = canvasW - padX * 2;
    const slotH = slotW;
    const r = Math.round((14 / 900) * canvasW);

    const img = loadedPhotos[0];
    if (img) {
      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(padX, padTop, slotW, slotH, r);
      } else {
        ctx.rect(padX, padTop, slotW, slotH);
      }
      ctx.clip();
      ctx.filter = 'none';
      drawImageCover(ctx, img, padX, padTop, slotW, slotH);
      ctx.restore();
    } else {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(padX, padTop, slotW, slotH);
    }

    // 3. Draw Overlay if present
    if (loadedOverlay) {
      ctx.save();
      ctx.filter = 'none';
      ctx.drawImage(loadedOverlay, 0, 0, canvasW, canvasH);
      ctx.restore();
    } else {
      ctx.save();
      ctx.strokeStyle = selectedFrame.accentColor || '#fbcfe8';
      ctx.lineWidth = Math.max(1, Math.round(2.5 * (canvasW / 600)));
      ctx.strokeRect(padX, padTop, slotW, slotH);
      ctx.restore();
    }

    // 4. Draw Signature Polaroid Bottom Chin
    if (showLogo) {
      ctx.save();
      ctx.filter = 'none';
      ctx.fillStyle = selectedFrame.textColor || '#475569';
      const chinCenterY = padTop + slotH + (canvasH - (padTop + slotH)) / 2;

      ctx.textAlign = 'center';
      ctx.font = `bold ${Math.round(canvasW * 0.048)}px "Plus Jakarta Sans", cursive, sans-serif`;
      const brandText = customCaption.trim() || 'PhotoXinhh Polaroid';
      ctx.fillText(brandText, canvasW / 2, chinCenterY - 10);

      ctx.font = `500 ${Math.round(canvasW * 0.026)}px "Plus Jakarta Sans", sans-serif`;
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      ctx.fillText(dateStr, canvasW / 2, chinCenterY + 22);

      ctx.restore();
    }
  };

  // Draw Collage 6-Cut Layout (1 Large + 2 Stacked Right + 3 Bottom Cards - Razzle Dazzle)
  const draw6Collage = (
    ctx: CanvasRenderingContext2D,
    canvasW: number,
    canvasH: number,
    loadedPhotos: HTMLImageElement[],
    loadedOverlay: HTMLImageElement | null
  ) => {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Background fill
    ctx.fillStyle = selectedFrame.bgColor || '#ffffff';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Scale from base 1200x1800
    const s = canvasW / 1200;

    const slots = [
      { x: 55 * s, y: 145 * s, w: 695 * s, h: 810 * s },  // 1. Hero Large Left
      { x: 775 * s, y: 145 * s, w: 370 * s, h: 395 * s }, // 2. Top Right
      { x: 775 * s, y: 560 * s, w: 370 * s, h: 395 * s }, // 3. Mid Right
      { x: 55 * s, y: 990 * s, w: 345 * s, h: 440 * s },  // 4. Bottom Left
      { x: 428 * s, y: 990 * s, w: 345 * s, h: 440 * s }, // 5. Bottom Center
      { x: 800 * s, y: 990 * s, w: 345 * s, h: 440 * s }, // 6. Bottom Right
    ];
    const r = Math.round(14 * s);

    for (let i = 0; i < 6; i++) {
      const img = loadedPhotos[i % loadedPhotos.length];
      const { x, y, w, h } = slots[i];

      if (img) {
        ctx.save();
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(x, y, w, h, r);
        } else {
          ctx.rect(x, y, w, h);
        }
        ctx.clip();
        ctx.filter = 'none';
        drawImageCover(ctx, img, x, y, w, h);
        ctx.restore();
      } else {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(x, y, w, h);
      }
    }

    // 2. Overlay graphics (Iridescent soap bubbles, stars, header)
    if (loadedOverlay) {
      ctx.save();
      ctx.filter = 'none';
      ctx.drawImage(loadedOverlay, 0, 0, canvasW, canvasH);
      ctx.restore();
    }

    // 3. Footer Branding
    if (showLogo) {
      ctx.save();
      ctx.filter = 'none';
      ctx.fillStyle = selectedFrame.textColor || '#0f172a';
      ctx.textAlign = 'center';
      ctx.font = `700 ${Math.round(canvasW * 0.022)}px "Plus Jakarta Sans", monospace, sans-serif`;
      const brandText = customCaption.trim() || 'PhotoXinhh';
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      ctx.fillText(`${brandText} • ${dateStr}`, canvasW / 2, canvasH - 28 * s);
      ctx.restore();
    }
  };

  // Main Render to Canvas (Promise-based for 100% reliable high-res export)
  const renderCompositeCanvas = useCallback(
    (canvas: HTMLCanvasElement, scale: number = 1, isExport: boolean = false): Promise<void> => {
      return new Promise((resolve) => {
        const ctx = canvas.getContext('2d');
        if (!ctx || photos.length === 0) {
          resolve();
          return;
        }

        let totalCanvasW: number;
        let totalCanvasH: number;

        if (layout === '2x2_grid') {
          totalCanvasW = 600 * scale;
          totalCanvasH = 750 * scale; // 4:5 ratio matching 1200x1500
        } else if (layout === 'polaroid') {
          totalCanvasW = 540 * scale;
          totalCanvasH = 720 * scale; // 3:4 ratio matching 900x1200
        } else if (layout === 'collage_6') {
          totalCanvasW = 600 * scale;
          totalCanvasH = 900 * scale; // 2:3 ratio matching 1200x1800
        } else {
          // 1x4_strip
          const singleStripW = 400 * scale;
          const singleStripH = 1200 * scale;
          totalCanvasW = stripColumns === 1 ? singleStripW : singleStripW * 2;
          totalCanvasH = singleStripH;
        }

        canvas.width = totalCanvasW;
        canvas.height = totalCanvasH;

        // Force browser to use highest quality bicubic interpolation
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Load all captured photos
        const loadedPhotos: HTMLImageElement[] = [];
        let pendingPhotos = photos.length;

        const executeRender = () => {
          // Load overlay if custom frame uploaded or template has overlay
          const overlaySrc =
            selectedFrame.id === 'custom-user-frame'
              ? customUploadedFrame
              : (selectedFrame.previewImage || generateFrameOverlaySvg(selectedFrame, layout));

          if (overlaySrc) {
            const overlayImg = new Image();
            overlayImg.crossOrigin = 'anonymous';
            overlayImg.onload = () => {
              drawAll(overlayImg);
            };
            overlayImg.onerror = () => {
              drawAll(null);
            };
            overlayImg.src = overlaySrc;
          } else {
            drawAll(null);
          }
        };

        const drawAll = (loadedOverlay: HTMLImageElement | null) => {
          if (layout === '2x2_grid') {
            draw2x2Grid(ctx, totalCanvasW, totalCanvasH, loadedPhotos, loadedOverlay);
          } else if (layout === 'polaroid') {
            drawPolaroid(ctx, totalCanvasW, totalCanvasH, loadedPhotos, loadedOverlay);
          } else if (layout === 'collage_6') {
            draw6Collage(ctx, totalCanvasW, totalCanvasH, loadedPhotos, loadedOverlay);
          } else {
            // 1x4_strip
            ctx.fillStyle = selectedFrame.bgColor || '#ffffff';
            ctx.fillRect(0, 0, totalCanvasW, totalCanvasH);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const singleStripW = totalCanvasW / (stripColumns === 1 ? 1 : 2);
            if (stripColumns === 1) {
              // 1 Cột Ảnh (Single Strip 1x4)
              drawSingleStrip(ctx, 0, singleStripW, totalCanvasH, loadedPhotos, loadedOverlay);
            } else {
              // 2 Cột Ảnh (Double Strip 2x4 side-by-side) - Liền 1 mạch vào nhau, không bị cắt ở giữa
              drawSingleStrip(ctx, 0, singleStripW, totalCanvasH, loadedPhotos, loadedOverlay);
              drawSingleStrip(ctx, singleStripW, singleStripW, totalCanvasH, loadedPhotos, loadedOverlay);
            }
          }

          // Draw Frame Visual Effect (Bubbles, Butterflies, Birds, 3D Hearts, Sakura, Stardust, Snow, etc.)
          if (selectedFrameEffect !== 'none') {
            drawFrameEffect(ctx, selectedFrameEffect, totalCanvasW, totalCanvasH, layout);
          }

          // Render placed 3D claymorphism stickers onto canvas for Ultra HD export
          if (isExport && placedStickers.length > 0) {
            ctx.save();
            ctx.filter = 'none';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const scaleRef = totalCanvasW / 400; // Baseline relative to single strip width

            placedStickers.forEach((st) => {
              const posX = st.x * totalCanvasW;
              const posY = st.y * totalCanvasH;
              const scaledSize = Math.round(st.size * (scaleRef / 1.5));

              ctx.save();
              ctx.translate(posX, posY);
              if (st.rotation) {
                ctx.rotate((st.rotation * Math.PI) / 180);
              }

              // 3D Claymorphism Soft Drop Shadow
              ctx.shadowColor = 'rgba(0, 0, 0, 0.32)';
              ctx.shadowBlur = scaledSize * 0.18;
              ctx.shadowOffsetX = scaledSize * 0.04;
              ctx.shadowOffsetY = scaledSize * 0.08;

              ctx.font = `${scaledSize}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
              ctx.fillText(st.emoji, 0, 0);

              // 3D Glossy Specular Bubble Highlight
              ctx.shadowColor = 'transparent';
              ctx.beginPath();
              ctx.ellipse(
                -scaledSize * 0.16,
                -scaledSize * 0.18,
                scaledSize * 0.12,
                scaledSize * 0.06,
                -Math.PI / 4,
                0,
                Math.PI * 2
              );
              ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
              ctx.fill();

              ctx.restore();
            });

            ctx.restore();
          }

          resolve();
        };

        photos.forEach((src, idx) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            loadedPhotos[idx] = img;
            pendingPhotos--;
            if (pendingPhotos === 0) {
              executeRender();
            }
          };
          img.onerror = () => {
            pendingPhotos--;
            if (pendingPhotos === 0) {
              executeRender();
            }
          };
          img.src = src;
        });
      });
    },
    [layout, photos, selectedFrame, customUploadedFrame, stripColumns, showLogo, customCaption, placedStickers, selectedFrameEffect]
  );

  // Live re-render whenever options change with high-DPI retina display sharpness
  useEffect(() => {
    if (previewCanvasRef.current) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderCompositeCanvas(previewCanvasRef.current, dpr);
    }
  }, [renderCompositeCanvas]);

  // Handle custom frame upload
  const handleCustomFrameUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCustomUploadedFrame(dataUrl);

      // Create and set active frame
      const customTpl: FrameTemplate = {
        id: 'custom-user-frame',
        name: 'Khung Của Bạn',
        category: 'cute',
        layout: layout,
        bgColor: 'transparent',
        textColor: '#1e293b',
        accentColor: '#ec4899',
        badge: 'RIÊNG',
        author: 'Bạn tải lên',
      };
      setSelectedFrame(customTpl);
      setFrame({
        id: 'custom-user-frame',
        name: 'Khung Của Bạn',
        bgColor: 'transparent',
        textColor: '#1e293b',
        category: 'pastel',
        overlayImage: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadModalImage, setDownloadModalImage] = useState<string | null>(null);

  // Download high-resolution composite strip (Ultra HD 4x ~812 DPI) with full Mobile Web Share & Direct Save support
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const highResCanvas = document.createElement('canvas');
      // Scale 4x = 1600x4800 px (~812.8 DPI Ultra HD, vượt xa chuẩn in ảnh thông thường)
      await renderCompositeCanvas(highResCanvas, 4, true);

      highResCanvas.toBlob(
        async (blob) => {
          if (!blob) {
            setIsDownloading(false);
            return;
          }

          const fileName = `PhotoXinhh_${layout === '1x4_strip' ? (stripColumns === 1 ? '1cot' : '2cot') : layout}_UltraHD.jpg`;
          const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

          // 1. Tải về trực tiếp vào máy (Hoạt động tức thì trên PC, Laptop và Android)
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);

          // Hiệu ứng pháo hoa chúc mừng
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ec4899', '#f43f5e', '#a855f7', '#fb7185', '#38bdf8', '#ffffff'],
          });

          // 2. Xử lý riêng cho Mobile (Đặc biệt là iOS để lưu thẳng vào Thư Viện Ảnh - Photos)
          if (isIOS) {
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            const dataUrl = highResCanvas.toDataURL('image/jpeg', 1.0);

            // Trên iPhone/iPad: Mở Native Share Sheet với tùy chọn "Lưu hình ảnh" vào Camera Roll
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({
                  files: [file],
                  title: 'PhotoXinhh Photobooth',
                  text: 'Dải ảnh PhotoXinhh Ultra HD xinh xắn của bạn ✨',
                });
              } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                  setDownloadModalImage(dataUrl);
                }
              }
            } else {
              // Nếu trình duyệt trong ứng dụng (Zalo/Facebook): hiển thị popup chạm giữ lưu ảnh
              setDownloadModalImage(dataUrl);
            }
          }

          setIsDownloading(false);
        },
        'image/jpeg',
        1.0 // 100% Maximum Quality - Không nén giảm chất lượng
      );
    } catch (e) {
      console.error('Download error:', e);
      setIsDownloading(false);
    }
  };

  // Reset session and return to camera
  const handleResetToCamera = () => {
    resetPhotos();
    setStep('capture');
  };

  const handleShareModalImage = async () => {
    if (!downloadModalImage) return;
    try {
      const res = await fetch(downloadModalImage);
      const blob = await res.blob();
      const file = new File([blob], 'PhotoXinhh_300DPI.jpg', { type: 'image/jpeg' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'PhotoXinhh',
          text: 'Dải ảnh Photobooth PhotoXinhh',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="bg-[#fef8f9] min-h-[calc(100vh-80px)] py-3 sm:py-4 px-2.5 sm:px-6 lg:px-8 text-gray-800 pb-28 sm:pb-8">
      <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
        {/* TOP ROW: Language badge + "Dùng Khung Riêng" Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-pink-200 text-pink-600 font-semibold text-xs shadow-2xs">
            <span>VN VN</span>
            <ChevronDown className="w-3.5 h-3.5 text-pink-400" />
          </div>

          <label className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition">
            <Upload className="w-3.5 h-3.5" />
            <span>Dùng Khung Riêng</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/webp"
              className="hidden"
              onChange={handleCustomFrameUpload}
            />
          </label>
        </div>

        {/* MAIN STUDIO GRID: Left Preview vs Right Frame Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
          {/* ==================== LEFT COLUMN: PHOTO STRIP PREVIEW & CONTROLS ==================== */}
          <div className="lg:col-span-4 flex flex-col items-center space-y-3 w-full">
            {/* Live Canvas Strip Card with Drag & Drop Sticker Studio Layer (Height capped on mobile so controls remain visible) */}
            <div className="p-2 sm:p-3 rounded-2xl bg-white border border-pink-200/90 shadow-md flex items-center justify-center max-w-[320px] sm:max-w-[400px] w-full max-h-[46vh] sm:max-h-none">
              <div
                ref={containerRef}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="relative w-full h-full max-h-[44vh] sm:max-h-none overflow-hidden rounded-lg shadow-2xs border border-gray-100 select-none touch-none flex items-center justify-center bg-gray-50"
              >
                <canvas
                  ref={previewCanvasRef}
                  className="max-h-[42vh] sm:max-h-none w-auto max-w-full h-auto block object-contain pointer-events-none"
                />

                {/* Interactive Placed Stickers Overlay */}
                {placedStickers.map((sticker) => {
                  const isSelected = selectedStickerId === sticker.id;
                  return (
                    <div
                      key={sticker.id}
                      onPointerDown={(e) => handleStickerPointerDown(e, sticker.id)}
                      style={{
                        left: `${sticker.x * 100}%`,
                        top: `${sticker.y * 100}%`,
                        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
                        fontSize: `${sticker.size}px`,
                        filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
                      }}
                      className={`absolute cursor-grab active:cursor-grabbing select-none transition-transform ${
                        isSelected
                          ? 'ring-2 ring-pink-500 ring-offset-2 ring-offset-white rounded-xl shadow-lg z-30 scale-110'
                          : 'z-20 hover:scale-110'
                      }`}
                    >
                      <span className="leading-none block pointer-events-none drop-shadow-sm">
                        {sticker.emoji}
                      </span>

                      {/* Floating Mini Controls Pill when selected */}
                      {isSelected && (
                        <div
                          className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full shadow-lg border border-pink-300 text-xs text-gray-700 z-40 whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            title="Thu nhỏ"
                            onClick={() => updateSticker(sticker.id, { size: Math.max(20, sticker.size - 6) })}
                            className="w-5 h-5 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold leading-none cursor-pointer text-sm"
                          >
                            −
                          </button>
                          <button
                            type="button"
                            title="Phóng to"
                            onClick={() => updateSticker(sticker.id, { size: Math.min(100, sticker.size + 6) })}
                            className="w-5 h-5 flex items-center justify-center rounded-full bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold leading-none cursor-pointer text-sm"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            title="Xoay 15°"
                            onClick={() => updateSticker(sticker.id, { rotation: (sticker.rotation + 15) % 360 })}
                            className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-50 hover:bg-purple-100 text-purple-600 font-bold leading-none cursor-pointer text-xs"
                          >
                            🔄
                          </button>
                          <button
                            type="button"
                            title="Xóa sticker này"
                            onClick={() => removeSticker(sticker.id)}
                            className="w-5 h-5 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold leading-none cursor-pointer text-xs"
                          >
                            🗑️
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Toggle 1 Cột vs 2 Cột: [ 🖼️ 1  ( )  2 🖼️ ] (Chỉ hiển thị cho Dải Dọc 1x4) */}
            {layout === '1x4_strip' && (
              <div className="flex items-center justify-center gap-3 bg-white px-4 py-2 rounded-full border border-pink-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setStripColumns(1)}
                  className={`flex items-center gap-1 text-xs font-bold transition cursor-pointer ${
                    stripColumns === 1 ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>1</span>
                </button>

                <button
                  type="button"
                  aria-label="Chuyển đổi 1 cột hoặc 2 cột"
                  onClick={() => setStripColumns(stripColumns === 1 ? 2 : 1)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                    stripColumns === 2 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-2xs transition-transform ${
                      stripColumns === 2 ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setStripColumns(2)}
                  className={`flex items-center gap-1 text-xs font-bold transition cursor-pointer ${
                    stripColumns === 2 ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <span>2</span>
                  <ImageIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Switch: Ẩn Logo [ ( ) ] Hiện Logo */}
            <div className="flex items-center justify-center gap-2.5 text-xs">
              <span className={`font-semibold cursor-pointer ${!showLogo ? 'text-gray-800' : 'text-gray-400'}`} onClick={() => setShowLogo(false)}>
                Ẩn Logo
              </span>
              <button
                type="button"
                aria-label="Bật tắt hiện logo"
                onClick={() => setShowLogo(!showLogo)}
                className={`relative inline-flex h-4.5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                  showLogo ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-2xs transition-transform ${
                    showLogo ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-semibold cursor-pointer ${showLogo ? 'text-blue-600' : 'text-gray-400'}`} onClick={() => setShowLogo(true)}>
                Hiện Logo
              </span>
            </div>

            {/* Input Caption */}
            <div className="relative w-full max-w-xs">
              <PenLine className="w-3.5 h-3.5 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customCaption}
                onChange={(e) => setCustomCaption(e.target.value)}
                placeholder="PhotoXinhh (Nhập chữ / caption...)"
                className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-pink-200 text-xs text-gray-700 shadow-2xs focus:outline-none focus:border-pink-400"
              />
            </div>

            {/* Big Action: [ 📥 Tải ảnh ] */}
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`w-full max-w-xs flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition cursor-pointer active:scale-95 ${
                isDownloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25'
              }`}
            >
              <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Đang xuất ảnh 300 DPI...' : 'Tải ảnh'}</span>
            </button>

            {/* Video Recap Download Button (if available) */}
            {recapVideoUrl && (
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.download = `photoxinhh_recap_${Date.now()}.webm`;
                  link.href = recapVideoUrl;
                  link.click();
                }}
                className="w-full max-w-xs flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition cursor-pointer active:scale-95 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-purple-500/20"
              >
                <Video className="w-4 h-4 text-pink-200" />
                <span>Tải Video Recap Quay Ngầm</span>
              </button>
            )}

            {/* Return to Camera / Chụp Lại */}
            <button
              onClick={handleResetToCamera}
              className="flex items-center gap-1.5 text-xs text-pink-500 hover:text-pink-600 font-semibold cursor-pointer pt-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Chụp lại phiên mới</span>
            </button>
          </div>

          {/* ==================== RIGHT COLUMN: FRAME CATALOG & SEARCH ==================== */}
          <div className="lg:col-span-8 flex flex-col space-y-3.5">
            {/* Header: PhotoXinhh cursive title */}
            <div className="text-center">
              <h2 className="font-cursive text-4xl sm:text-5xl text-pink-300 font-normal tracking-wide drop-shadow-2xs">
                PhotoXinhh
              </h2>
            </div>

            {/* Mode Switcher Tabs: [ 🖼️ Chọn Khung Ảnh ] vs [ 🪄 Hiệu Ứng Khung ] vs [ ✨ Dán Sticker 3D ] */}
            <div className="flex items-center justify-center p-1 bg-pink-100/70 rounded-2xl border border-pink-200/80 shadow-2xs max-w-lg mx-auto w-full">
              <button
                type="button"
                onClick={() => setActiveTab('frames')}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-xl text-[11px] sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
                  activeTab === 'frames'
                    ? 'bg-white text-pink-600 shadow-xs'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Chọn Khung</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('effects')}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-xl text-[11px] sm:text-sm font-bold transition cursor-pointer relative whitespace-nowrap ${
                  activeTab === 'effects'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xs'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <span>🪄 Hiệu Ứng<span className="hidden sm:inline"> Khung</span></span>
                {selectedFrameEffect !== 'none' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('stickers')}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 rounded-xl text-[11px] sm:text-sm font-bold transition cursor-pointer relative whitespace-nowrap ${
                  activeTab === 'stickers'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                <span>✨ Sticker<span className="hidden sm:inline"> 3D</span></span>
                {placedStickers.length > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                      activeTab === 'stickers' ? 'bg-white text-pink-600' : 'bg-pink-500 text-white'
                    }`}
                  >
                    {placedStickers.length}
                  </span>
                )}
              </button>
            </div>

            {activeTab === 'effects' ? (
              /* ==================== FRAME EFFECTS PANEL (Bong bóng, Bướm, Chim, Trái tim, Hoa anh đào...) ==================== */
              <div className="bg-white/85 border border-pink-200/80 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                      <span>🪄 Hiệu Ứng Trang Trí Khung Hình</span>
                      <span className="text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">
                        300 DPI Ultra HD
                      </span>
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Áp dụng hiệu ứng tĩnh hòa quyện trực tiếp vào khung ảnh (Bong bóng, Đàn bướm, Chim bay, Hoa anh đào...)
                    </p>
                  </div>
                  {selectedFrameEffect !== 'none' && (
                    <button
                      type="button"
                      onClick={() => setSelectedFrameEffect('none')}
                      className="px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-50 border border-rose-200 rounded-full font-semibold transition cursor-pointer"
                    >
                      Gỡ hiệu ứng
                    </button>
                  )}
                </div>

                {/* Grid of Effects */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FRAME_EFFECTS.map((eff) => {
                    const isSelected = selectedFrameEffect === eff.id;
                    return (
                      <button
                        key={eff.id}
                        type="button"
                        onClick={() => setSelectedFrameEffect(eff.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer group ${
                          isSelected
                            ? 'bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100/70 border-pink-500 ring-2 ring-pink-400 shadow-sm'
                            : 'bg-white border-pink-100 hover:border-pink-300 hover:shadow-xs'
                        }`}
                      >
                        {eff.badge && (
                          <span className="absolute top-2.5 right-2.5 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-2xs">
                            {eff.badge}
                          </span>
                        )}
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="text-2xl group-hover:scale-125 transition-transform">{eff.emoji}</span>
                          <span className="font-bold text-xs text-gray-800">{eff.label}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-snug">{eff.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : activeTab === 'stickers' ? (
              /* ==================== 3D STICKER STUDIO PANEL ==================== */
              <div className="bg-white/80 border border-pink-200/80 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
                    <span>✨ Bộ Sưu Tập Sticker 3D Cute</span>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                      100+ Stickers 3D
                    </span>
                  </h3>
                </div>

                {/* Pack Categories with Left/Right Scroll Arrows & Drag-to-Scroll */}
                <div className="relative flex items-center gap-1.5 w-full">
                  <button
                    type="button"
                    onClick={() => categoryBarRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                    className="w-8 h-8 shrink-0 rounded-full bg-white border border-pink-200 text-pink-600 hover:bg-pink-100 flex items-center justify-center shadow-2xs cursor-pointer transition active:scale-90 z-10"
                    title="Cuộn sang trái"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div
                    ref={categoryBarRef}
                    onMouseDown={handleCatMouseDown}
                    onMouseMove={handleCatMouseMove}
                    onMouseUp={handleCatMouseUp}
                    onMouseLeave={handleCatMouseUp}
                    onWheel={(e) => {
                      if (categoryBarRef.current && e.deltaY !== 0) {
                        categoryBarRef.current.scrollLeft += e.deltaY;
                      }
                    }}
                    className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 cursor-grab active:cursor-grabbing select-none scroll-smooth touch-pan-x w-full scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-50"
                  >
                    {STICKER_PACKS.map((pack) => {
                      const isCurrent = activeStickerCategory === pack.id;
                      return (
                        <button
                          key={pack.id}
                          type="button"
                          onClick={() => setActiveStickerCategory(pack.id)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shrink-0 ${
                            isCurrent
                              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                              : 'bg-white border border-pink-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50/50'
                          }`}
                        >
                          <span>{pack.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => categoryBarRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                    className="w-8 h-8 shrink-0 rounded-full bg-white border border-pink-200 text-pink-600 hover:bg-pink-100 flex items-center justify-center shadow-2xs cursor-pointer transition active:scale-90 z-10"
                    title="Cuộn sang phải"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Sticker Palette Grid */}
                <div className="bg-pink-50/40 rounded-2xl p-4 border border-pink-100">
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {STICKER_PACKS.find((p) => p.id === activeStickerCategory)?.stickers.map((emoji, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => addSticker(emoji)}
                        className="aspect-square rounded-2xl bg-white border border-pink-100 hover:border-pink-400 hover:shadow-md hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-3xl sm:text-4xl cursor-pointer group select-none shadow-xs"
                        style={{
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.14))',
                        }}
                        title={`Thêm ${emoji} 3D lên ảnh`}
                      >
                        <span className="group-hover:animate-bounce drop-shadow-xs">{emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Helpful Instruction & Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 text-xs">
                  <div className="text-gray-500 flex items-center gap-1.5 text-center sm:text-left">
                    <span>💡</span>
                    <span>Bấm sticker 3D để dán lên ảnh, kéo thả tự do mọi vị trí, bấm vào sticker để phóng to/xoay/xóa!</span>
                  </div>

                  {placedStickers.length > 0 && (
                    <button
                      type="button"
                      onClick={clearAllStickers}
                      className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 font-bold transition cursor-pointer whitespace-nowrap shrink-0"
                    >
                      🗑️ Xóa tất cả ({placedStickers.length})
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* ==================== FRAME CATALOG PANEL ==================== */
              <>
                {/* Search Input Bar */}
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên khung hoặc nametag..."
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-pink-200 text-xs text-gray-700 shadow-2xs focus:outline-none focus:border-pink-400"
                  />
                </div>

                {/* Category Dropdown */}
                <div className="relative w-full">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-full bg-white border border-pink-200 text-xs font-semibold text-gray-600 shadow-2xs focus:outline-none focus:border-pink-400 cursor-pointer appearance-none"
                  >
                    <option value="all">Chọn Danh Mục: Tất Cả Khung</option>
                    <option value="cute">Cute & Pastel</option>
                    <option value="kpop">Idol K-Pop</option>
                    <option value="cartoon">Hoạt Hình & Anime</option>
                    <option value="retro">Vintage & Y2K</option>
                    <option value="basic">Khung Cơ Bản (Classic)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-pink-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Frame Cards Grid */}
                <div className="bg-white/70 border border-pink-100 rounded-3xl p-3.5 sm:p-5 shadow-sm max-h-[620px] overflow-y-auto">
                  <div
                    className={`grid ${
                      layout === '1x4_strip'
                        ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9'
                        : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8'
                    } gap-2.5 sm:gap-3`}
                  >
                    {/* Custom Uploaded Frame (if user uploaded one) */}
                    {customUploadedFrame && (
                      <div
                        onClick={() => {
                          const customTpl: FrameTemplate = {
                            id: 'custom-user-frame',
                            name: 'Khung Của Bạn',
                            category: 'cute',
                            layout: layout,
                            bgColor: 'transparent',
                            textColor: '#1e293b',
                            accentColor: '#ec4899',
                            badge: 'RIÊNG',
                            author: 'Bạn',
                          };
                          setSelectedFrame(customTpl);
                          setFrame({
                            id: 'custom-user-frame',
                            name: 'Khung Của Bạn',
                            bgColor: 'transparent',
                            textColor: '#1e293b',
                            category: 'pastel',
                            overlayImage: customUploadedFrame,
                          });
                        }}
                        className={`rounded-xl border p-1.5 flex flex-col items-center justify-between cursor-pointer transition ${
                          layout === '1x4_strip' ? 'aspect-[1/3]' : layout === 'collage_6' ? 'aspect-[2/3]' : 'aspect-[3/4]'
                        } relative ${
                          selectedFrame.id === 'custom-user-frame'
                            ? 'border-emerald-500 bg-emerald-50 shadow-xs ring-2 ring-emerald-400'
                            : 'border-emerald-200 hover:border-emerald-400 bg-white'
                        }`}
                      >
                        <div className="w-full flex-1 rounded-md overflow-hidden relative border border-emerald-200 bg-emerald-50/50 flex flex-col justify-between p-1">
                          <img
                            src={customUploadedFrame}
                            alt="Khung riêng"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 truncate w-full text-center mt-1">
                          Khung Riêng
                        </span>
                      </div>
                    )}

                    {/* All Template Frames */}
                    {filteredFrames.map((tpl) => {
                      const isCurrent = selectedFrame.id === tpl.id;

                      return (
                        <div
                          key={tpl.id}
                          onClick={() => {
                            setSelectedFrame(tpl);
                            const svgOverlay = tpl.previewImage || generateFrameOverlaySvg(tpl, layout);
                            setFrame({
                              id: tpl.id,
                              name: tpl.name,
                              bgColor: tpl.bgColor,
                              textColor: tpl.textColor,
                              category: 'pastel',
                              overlayImage: svgOverlay,
                            });
                          }}
                          className={`rounded-xl border p-1.5 flex flex-col items-center justify-between cursor-pointer transition ${
                            layout === '1x4_strip' ? 'aspect-[1/3]' : layout === 'collage_6' ? 'aspect-[2/3]' : 'aspect-[3/4]'
                          } relative group ${
                            isCurrent
                              ? 'border-pink-500 bg-pink-50/80 shadow-xs ring-2 ring-pink-400 scale-[1.02]'
                              : 'border-gray-200 hover:border-pink-300 bg-white hover:shadow-2xs'
                          }`}
                        >
                          {/* Realistic Thumbnail based on Layout */}
                          {layout === 'collage_6' ? (
                            /* Collage 6-Cut Thumbnail */
                            <div
                              className="w-full flex-1 rounded-md p-1 flex flex-col justify-between shadow-2xs border border-black/10 overflow-hidden"
                              style={{ backgroundColor: tpl.bgColor }}
                            >
                              <div
                                className="text-[6.5px] font-bold text-center truncate pt-0.5 leading-none"
                                style={{ color: tpl.textColor }}
                              >
                                🫧 {tpl.name}
                              </div>
                              {/* Top: 1 large left + 2 stacked right */}
                              <div className="flex gap-1 h-[56%] my-0.5">
                                <div className="w-[62%] h-full rounded-2xs bg-white/80 border border-black/10 flex items-center justify-center text-[7px] text-gray-400 font-bold">
                                  1
                                </div>
                                <div className="w-[38%] flex flex-col gap-0.5">
                                  <div className="flex-1 rounded-2xs bg-white/80 border border-black/10 flex items-center justify-center text-[6px] text-gray-400 font-bold">
                                    2
                                  </div>
                                  <div className="flex-1 rounded-2xs bg-white/80 border border-black/10 flex items-center justify-center text-[6px] text-gray-400 font-bold">
                                    3
                                  </div>
                                </div>
                              </div>
                              {/* Bottom: 3 polaroids side-by-side */}
                              <div className="grid grid-cols-3 gap-0.5 h-[34%]">
                                <div className="rounded-2xs bg-white/80 border border-black/10 flex items-center justify-center text-[6px] text-gray-400 font-bold">
                                  4
                                </div>
                                <div className="rounded-2xs bg-white/80 border border-black/10 flex items-center justify-center text-[6px] text-gray-400 font-bold">
                                  5
                                </div>
                                <div className="rounded-2xs bg-white/80 border border-black/10 flex items-center justify-center text-[6px] text-gray-400 font-bold">
                                  6
                                </div>
                              </div>
                            </div>
                          ) : layout === '2x2_grid' ? (
                            /* 2x2 Grid Thumbnail */
                            <div
                              className="w-full flex-1 rounded-md p-1.5 flex flex-col justify-between shadow-2xs border border-black/10 overflow-hidden"
                              style={{ backgroundColor: tpl.bgColor }}
                            >
                              {/* Header preview */}
                              <div
                                className="text-[7px] font-bold text-center truncate pt-0.5 leading-none"
                                style={{ color: tpl.textColor }}
                              >
                                {tpl.headerEmoji || tpl.name}
                              </div>

                              {/* 2x2 Slots */}
                              <div className="grid grid-cols-2 gap-1 my-1 flex-1">
                                {[1, 2, 3, 4].map((num) => (
                                  <div
                                    key={num}
                                    className="w-full h-full rounded-xs bg-white/80 border border-black/10 flex items-center justify-center text-[7px] text-gray-300 font-bold"
                                  >
                                    {num}
                                  </div>
                                ))}
                              </div>

                              {/* Footer preview */}
                              <div
                                className="text-[6.5px] font-semibold text-center truncate pb-0.5 leading-none opacity-80"
                                style={{ color: tpl.textColor }}
                              >
                                {tpl.footerEmoji || 'PhotoXinhh'}
                              </div>
                            </div>
                          ) : layout === 'polaroid' ? (
                            /* Polaroid 1-Photo Thumbnail */
                            <div
                              className="w-full flex-1 rounded-md p-1.5 flex flex-col justify-between shadow-2xs border border-black/10 overflow-hidden"
                              style={{ backgroundColor: tpl.bgColor }}
                            >
                              {/* 1 Large Photo Slot */}
                              <div className="w-full aspect-square rounded-xs bg-white/85 border border-black/10 flex items-center justify-center text-[9px] text-gray-300 font-bold my-1">
                                1
                              </div>

                              {/* Signature Polaroid chin */}
                              <div
                                className="text-[7px] font-bold text-center truncate pb-1"
                                style={{ color: tpl.textColor }}
                              >
                                {tpl.name}
                              </div>
                            </div>
                          ) : (
                            /* 1x4 Strip Thumbnail */
                            <div
                              className="w-full flex-1 rounded-md p-1 flex flex-col justify-between shadow-2xs border border-black/10 overflow-hidden"
                              style={{ backgroundColor: tpl.bgColor }}
                            >
                              {/* Header preview */}
                              <div
                                className="text-[6.5px] font-bold text-center truncate pt-0.5 leading-none"
                                style={{ color: tpl.textColor }}
                              >
                                {tpl.headerEmoji || tpl.name}
                              </div>

                              {/* 4 Photo Cutout Slots */}
                              <div className="flex-1 my-1 flex flex-col justify-between gap-0.5">
                                {tpl.id === 'photo-palette-cat' ? (
                                  <>
                                    <div className="w-full flex-1 rounded-xs bg-amber-50/90 border border-pink-300 flex items-center justify-center text-[7px] text-pink-600 font-bold">
                                      🐱 1
                                    </div>
                                    <div className="w-full flex-1 rounded-xs bg-white/80 border border-black/10 flex items-center justify-center text-[7px] text-gray-400 font-bold">
                                      2
                                    </div>
                                    <div className="w-full flex-1 rounded-xs bg-rose-50/90 border border-pink-300 flex items-center justify-center text-[7px] text-rose-500 font-bold">
                                      ❤️ 3
                                    </div>
                                    <div className="w-full flex-1 rounded-xs bg-white/80 border border-black/10 flex items-center justify-center text-[7px] text-gray-400 font-bold">
                                      4
                                    </div>
                                  </>
                                ) : (
                                  Array.from({ length: 4 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="w-full flex-1 rounded-xs bg-white/75 border border-black/10 flex items-center justify-center text-[7px] text-gray-300 font-bold"
                                    >
                                      {i + 1}
                                    </div>
                                  ))
                                )}
                              </div>

                              {/* Footer preview */}
                              <div
                                className="text-[6px] font-semibold text-center truncate pb-0.5 leading-none opacity-80"
                                style={{ color: tpl.textColor }}
                              >
                                {tpl.footerEmoji || 'PhotoXinhh'}
                              </div>
                            </div>
                          )}

                          {/* Label underneath */}
                          <div className="text-[10px] font-semibold text-gray-700 truncate w-full text-center mt-1 group-hover:text-pink-600">
                            {tpl.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Bottom sponsor/ad ribbon placeholder */}
            <div className="pt-2 text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300">
                QUẢNG CÁO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Sticky Action Bar (Anchored at bottom for immediate download on mobile) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-pink-200 flex items-center gap-2">
        <button
          type="button"
          onClick={handleResetToCamera}
          className="p-2.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold border border-pink-200 shrink-0 shadow-2xs active:scale-95 transition"
          title="Chụp lại từ đầu"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm shadow-md active:scale-95 transition ${
            isDownloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <Download className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
          <span>{isDownloading ? 'Đang xuất 300 DPI...' : 'Tải Ảnh (300 DPI)'}</span>
        </button>

        {recapVideoUrl && (
          <button
            type="button"
            onClick={() => {
              const link = document.createElement('a');
              link.download = `photoxinhh_recap_${Date.now()}.webm`;
              link.href = recapVideoUrl;
              link.click();
            }}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shrink-0 shadow-2xs active:scale-95 transition"
            title="Tải Video Recap"
          >
            <Video className="w-4 h-4 text-pink-100" />
          </button>
        )}
      </div>

      {/* Mobile Save & Download Modal */}
      {downloadModalImage && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-4 flex flex-col items-center space-y-3.5 shadow-2xl border border-pink-100">
            <div className="w-full flex items-center justify-between pb-1 border-b border-gray-100">
              <span className="font-extrabold text-sm text-pink-600">Dải Ảnh Đã Sẵn Sàng! ✨</span>
              <button
                onClick={() => setDownloadModalImage(null)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Instruction Tip */}
            <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center">
              <p className="text-[11px] font-semibold text-amber-800 leading-tight">
                📱 <strong>Trên điện thoại:</strong> Chạm và giữ vào ảnh dưới đây, chọn <strong>&quot;Lưu hình ảnh&quot;</strong> (Save Image) để lưu vào Thư Viện Ảnh (Camera Roll).
              </p>
            </div>

            {/* High Res Rendered Image */}
            <div className="max-h-[50vh] overflow-y-auto rounded-xl border border-gray-200 shadow-xs p-1 bg-gray-50 flex items-center justify-center">
              <img
                src={downloadModalImage}
                alt="PhotoXinhh Finished Strip"
                className="max-h-[46vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>

            {/* Actions */}
            <div className="w-full space-y-2 pt-1">
              <button
                type="button"
                onClick={handleShareModalImage}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs shadow-md active:scale-95 transition cursor-pointer"
              >
                <span>Mở Bảng Lưu / Chia Sẻ (Share Sheet)</span>
              </button>

              <button
                type="button"
                onClick={() => setDownloadModalImage(null)}
                className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-xs transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
