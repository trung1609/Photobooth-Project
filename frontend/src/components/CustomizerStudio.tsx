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
              const slotWidth = baseWidth - padding * 2;
              const slotHeight = slotWidth;
              if (loadedImages[0]) {
                drawImageCover(ctx, loadedImages[0], padding, padding, slotWidth, slotHeight);
              }
            }

            // 3. Draw Watermark & Text
            ctx.filter = 'none';
            ctx.fillStyle = frame.textColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
            const textY = baseHeight - footerHeight / 2 - (showDateStamp ? 14 : 0);
            ctx.fillText(customText, baseWidth / 2, textY);

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
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 12);
    ctx.clip();
    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
    ctx.restore();
  }

  useEffect(() => {
    if (previewCanvasRef.current) {
      renderCanvas(previewCanvasRef.current, 0.5);
    }
  }, [renderCanvas]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={() => setStep('capture')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-pink-50 text-xs text-gray-700 font-medium border border-pink-200 shadow-2xs transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-pink-500" />
          <span>Chụp lại</span>
        </button>

        <h2 className="text-base sm:text-lg font-bold text-gray-800">Studio Chỉnh Sửa Khung Ảnh</h2>

        <button
          onClick={() => setStep('result')}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs sm:text-sm font-medium shadow-xs hover:scale-105 active:scale-95 transition"
        >
          <span>Tiếp Tục</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* Left: Live Canvas Preview */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-5 bg-white rounded-3xl border border-pink-100 shadow-sm">
          <div className="relative shadow-md rounded-2xl overflow-hidden border border-gray-100 max-h-[580px] flex items-center justify-center bg-gray-50">
            <canvas ref={previewCanvasRef} className="max-h-[550px] w-auto rounded-lg" />
          </div>
          <p className="text-[11px] text-gray-400 mt-2.5 font-normal">Live Preview (Tự động cập nhật chất lượng cao khi tải)</p>
        </div>

        {/* Right: Customization Controls */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex bg-white p-1 rounded-2xl border border-pink-100 shadow-2xs">
            <button
              onClick={() => setActiveTab('frame')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'frame' ? 'bg-pink-500 text-white shadow-xs' : 'text-gray-500 hover:text-pink-600'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Màu Khung</span>
            </button>
            <button
              onClick={() => setActiveTab('filter')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'filter' ? 'bg-pink-500 text-white shadow-xs' : 'text-gray-500 hover:text-pink-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bộ Lọc</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'text' ? 'bg-pink-500 text-white shadow-xs' : 'text-gray-500 hover:text-pink-600'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Chữ & Ngày</span>
            </button>
          </div>

          {/* Tab 1: Frame Presets */}
          {activeTab === 'frame' && (
            <div className="bg-white border border-pink-100 p-4 rounded-2xl flex flex-col gap-3 shadow-2xs">
              <h3 className="text-xs font-semibold text-gray-700">Chọn Màu Khung Viền</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FRAME_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setFrame(preset)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition ${
                      frame.id === preset.id
                        ? 'border-pink-500 bg-pink-50/50'
                        : 'border-gray-100 hover:border-pink-200 bg-gray-50/60'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-gray-300 flex-shrink-0 shadow-2xs"
                      style={{ backgroundColor: preset.bgColor }}
                    />
                    <span className="text-xs font-medium text-gray-700 truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Filters */}
          {activeTab === 'filter' && (
            <div className="bg-white border border-pink-100 p-4 rounded-2xl flex flex-col gap-3 shadow-2xs">
              <h3 className="text-xs font-semibold text-gray-700">Chọn Bộ Lọc Nước Ảnh</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`p-3 rounded-xl border text-left transition ${
                      filter === f.id
                        ? 'border-pink-500 bg-pink-50/50'
                        : 'border-gray-100 hover:border-pink-200 bg-gray-50/60'
                    }`}
                  >
                    <div className="text-xs font-semibold text-gray-800 mb-0.5">{f.name}</div>
                    <div className="text-[10px] text-gray-400 font-normal">{f.id === 'normal' ? 'Không chỉnh sửa' : 'Tone màu chuẩn'}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Text & Date Stamp */}
          {activeTab === 'text' && (
            <div className="bg-white border border-pink-100 p-4 rounded-2xl flex flex-col gap-3.5 shadow-2xs">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Dòng chữ in dưới chân khung
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-xs focus:outline-none focus:border-pink-500"
                  placeholder="Nhập thông điệp kỷ niệm..."
                />
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-500" />
                  <span className="text-xs font-medium text-gray-700">Con dấu ngày tháng</span>
                </div>
                <button
                  onClick={toggleDateStamp}
                  className={`w-10 h-5 rounded-full transition-colors p-0.5 ${
                    showDateStamp ? 'bg-pink-500' : 'bg-gray-200'
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
