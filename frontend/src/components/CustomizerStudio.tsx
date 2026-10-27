import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Palette, Sparkles, Type, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { useBoothStore, FRAME_PRESETS } from '../store/useBoothStore';
import { FilterType } from '../types/photobooth';

const FILTERS: { id: FilterType; name: string; cssFilter: string }[] = [
  { id: 'normal', name: 'Gốc (Tự Nhiên)', cssFilter: 'none' },
  { id: 'korean_glow', name: 'Hàn Quốc (Sáng Mịn)', cssFilter: 'brightness(1.08) contrast(1.02) saturate(1.08)' },
  { id: 'bw', name: 'Đen Trắng Cổ Điển', cssFilter: 'grayscale(100%) contrast(1.2)' },
  { id: 'warm_retro', name: 'Ấm Áp (Warm Retro)', cssFilter: 'sepia(20%) saturate(1.2) hue-rotate(-10deg) brightness(1.04)' },
  { id: 'vintage', name: 'Film Vintage', cssFilter: 'sepia(40%) contrast(1.1) brightness(0.95)' },
  { id: 'cool_cyber', name: 'Cool Cyberpunk', cssFilter: 'contrast(1.15) hue-rotate(15deg) saturate(1.2)' },
];

export const CustomizerStudio: React.FC = () => {
  const {
    layout,
    photos,
    filter,
    setFilter,
    frame,
    setFrame,
    customText,
    setCustomText,
    showDateStamp,
    toggleDateStamp,
    setStep,
  } = useBoothStore();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTab, setActiveTab] = useState<'frame' | 'filter' | 'text'>('frame');

  // Render high quality composite strip on canvas
  const renderCanvas = useCallback(
    (canvas: HTMLCanvasElement, scaleFactor: number = 1) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || photos.length === 0) return;

      const isStrip = layout === '1x4_strip';
      const isGrid = layout === '2x2_grid';
      // Polaroid layout is default fallback

      // Base dimensions for high quality print
      // Strip: 600 x 1800 px (at 1x scale)
      // Grid: 1200 x 1600 px
      // Polaroid: 900 x 1100 px
      const baseWidth = isStrip ? 600 : isGrid ? 1200 : 900;
      const baseHeight = isStrip ? 1800 : isGrid ? 1600 : 1100;

      canvas.width = baseWidth * scaleFactor;
      canvas.height = baseHeight * scaleFactor;
      ctx.scale(scaleFactor, scaleFactor);

      // 1. Draw Background Frame Color
      ctx.fillStyle = frame.bgColor;
      ctx.fillRect(0, 0, baseWidth, baseHeight);

      // 2. Draw Slot Photos
      const selectedFilterObj = FILTERS.find((f) => f.id === filter);
      ctx.filter = selectedFilterObj ? selectedFilterObj.cssFilter : 'none';

      const padding = 36;
      const footerHeight = 120;
      const availableHeight = baseHeight - footerHeight - padding * 2;

      const loadedImages: HTMLImageElement[] = [];
      let pending = photos.length;

      photos.forEach((src, index) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          loadedImages[index] = img;
          pending--;
          if (pending === 0) {
            // All images ready, draw them
            if (isStrip) {
              const photoGap = 20;
              const slotHeight = (availableHeight - photoGap * 3) / 4;
              const slotWidth = baseWidth - padding * 2;

              loadedImages.forEach((image, i) => {
                const y = padding + i * (slotHeight + photoGap);
                drawImageCover(ctx, image, padding, y, slotWidth, slotHeight);
              });
            } else if (isGrid) {
              const gap = 24;
              const slotWidth = (baseWidth - padding * 2 - gap) / 2;
              const slotHeight = (availableHeight - gap) / 2;

              loadedImages.forEach((image, i) => {
                const col = i % 2;
                const row = Math.floor(i / 2);
                const x = padding + col * (slotWidth + gap);
                const y = padding + row * (slotHeight + gap);
                drawImageCover(ctx, image, x, y, slotWidth, slotHeight);
              });
            } else {
              // Polaroid: 1 photo
              const slotWidth = baseWidth - padding * 2;
              const slotHeight = slotWidth; // Square photo
              if (loadedImages[0]) {
                drawImageCover(ctx, loadedImages[0], padding, padding, slotWidth, slotHeight);
              }
            }

            // 3. Draw Watermark & Text (turn off filter)
            ctx.filter = 'none';
            ctx.fillStyle = frame.textColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Custom Text
            ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
            const textY = baseHeight - footerHeight / 2 - (showDateStamp ? 14 : 0);
            ctx.fillText(customText, baseWidth / 2, textY);

            // Date Stamp
            if (showDateStamp) {
              const today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
              ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
              ctx.globalAlpha = 0.75;
              ctx.fillText(`${today} • PHOTOXINHH`, baseWidth / 2, textY + 28);
              ctx.globalAlpha = 1.0;
            }
          }
        };
        img.src = src;
      });
    },
    [layout, photos, filter, frame, customText, showDateStamp]
  );

  // Helper: Crop and center image inside canvas slot (object-fit: cover)
  function drawImageCover(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
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

    ctx.save();
    // Rounded corners for photo slot
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 12);
    ctx.clip();
    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
    ctx.restore();
  }

  // Trigger preview canvas redraw on changes
  useEffect(() => {
    if (previewCanvasRef.current) {
      renderCanvas(previewCanvasRef.current, 0.5); // 0.5 scale for fast preview
    }
  }, [renderCanvas]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => setStep('capture')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Chụp lại</span>
        </button>

        <h2 className="text-lg md:text-xl font-extrabold text-white">Studio Chỉnh Sửa Khung Ảnh</h2>

        <button
          onClick={() => setStep('result')}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs md:text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition"
        >
          <span>Tiếp Tục</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        {/* Left: Live Canvas Preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-800/40 rounded-3xl border border-slate-700">
          <div className="relative shadow-2xl rounded-2xl overflow-hidden border border-slate-700 max-h-[640px] flex items-center justify-center">
            <canvas ref={previewCanvasRef} className="max-h-[600px] w-auto rounded-lg shadow-lg" />
          </div>
          <p className="text-xs text-slate-400 mt-3">Live Preview (Tự động cập nhật chất lượng cao khi tải)</p>
        </div>

        {/* Right: Customization Controls */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveTab('frame')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs md:text-sm font-bold transition ${
                activeTab === 'frame' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Màu Khung</span>
            </button>
            <button
              onClick={() => setActiveTab('filter')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs md:text-sm font-bold transition ${
                activeTab === 'filter' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Bộ Lọc Màu</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs md:text-sm font-bold transition ${
                activeTab === 'text' ? 'bg-pink-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Chữ & Tem Ngày</span>
            </button>
          </div>

          {/* Tab 1: Frame Presets */}
          {activeTab === 'frame' && (
            <div className="bg-slate-800/60 border border-slate-700 p-5 rounded-2xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white">Chọn Màu Khung Viền</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FRAME_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setFrame(preset)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition ${
                      frame.id === preset.id
                        ? 'border-pink-500 bg-pink-500/10'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-800'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-slate-400/30 flex-shrink-0"
                      style={{ backgroundColor: preset.bgColor }}
                    />
                    <span className="text-xs font-semibold text-slate-200">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Filters */}
          {activeTab === 'filter' && (
            <div className="bg-slate-800/60 border border-slate-700 p-5 rounded-2xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white">Chọn Bộ Lọc Nước Ảnh</h3>
              <div className="grid grid-cols-2 gap-3">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`p-3.5 rounded-xl border text-left transition ${
                      filter === f.id
                        ? 'border-pink-500 bg-pink-500/10'
                        : 'border-slate-700 hover:border-slate-600 bg-slate-800'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{f.name}</div>
                    <div className="text-[11px] text-slate-400">{f.id === 'normal' ? 'Không chỉnh sửa' : 'Tone màu chuẩn'}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Text & Date Stamp */}
          {activeTab === 'text' && (
            <div className="bg-slate-800/60 border border-slate-700 p-5 rounded-2xl flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Dòng chữ in dưới chân khung
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-hidden focus:border-pink-500"
                  placeholder="Nhập thông điệp kỷ niệm..."
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  <span className="text-xs font-bold text-slate-300">Con dấu ngày tháng</span>
                </div>
                <button
                  onClick={toggleDateStamp}
                  className={`w-11 h-6 rounded-full transition-colors p-1 ${
                    showDateStamp ? 'bg-pink-500' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      showDateStamp ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
