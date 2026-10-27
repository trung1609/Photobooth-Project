import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Download,
  Upload,
  ChevronDown,
  Search,
  RotateCcw,
  PenLine,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBoothStore } from '../store/useBoothStore';
import { SAMPLE_FRAMES, FrameTemplate } from '../data/framesData';
import { FilterType } from '../types/photobooth';

const FILTERS_MAP: Record<FilterType, string> = {
  cool_pink: 'brightness(1.07) contrast(1.04) saturate(1.025) hue-rotate(-3.5deg)',
  cool_white: 'brightness(1.06) contrast(1.06) saturate(1.02) hue-rotate(-3deg)',
  korean_glow: 'brightness(1.08) contrast(1.02) saturate(1.05) hue-rotate(-5deg)',
  normal: 'none',
  bw: 'grayscale(100%) contrast(1.2) brightness(1.03)',
  vintage: 'sepia(25%) contrast(1.08) brightness(0.98)',
  warm_retro: 'sepia(18%) saturate(1.15) hue-rotate(-8deg) brightness(1.03)',
  cool_cyber: 'contrast(1.12) hue-rotate(15deg) saturate(1.15)',
};

export const CustomizerStudio: React.FC = () => {
  const {
    photos,
    filter,
    frame,
    setFrame,
    resetPhotos,
    setStep,
  } = useBoothStore();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States matching user's photo studio workflow
  const [stripColumns, setStripColumns] = useState<1 | 2>(1); // 1 = 1 cột ảnh, 2 = 2 cột ảnh
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [customCaption, setCustomCaption] = useState<string>('PhotoXinhh');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customUploadedFrame, setCustomUploadedFrame] = useState<string | null>(frame.overlayImage || null);
  const [selectedFrame, setSelectedFrame] = useState<FrameTemplate>(() => {
    const match = SAMPLE_FRAMES.find((f) => f.id === frame.id);
    return match || SAMPLE_FRAMES[0];
  });

  // Filtered frames
  const filteredFrames = SAMPLE_FRAMES.filter((f) => {
    const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.author && f.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
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
    // 1. Background fill
    ctx.fillStyle = selectedFrame.bgColor || '#ffffff';
    ctx.fillRect(xOffset, 0, stripWidth, stripHeight);

    // 2. Margins and slot dimensions
    const padX = stripWidth * 0.055;
    const padTop = stripHeight * 0.038;
    const footerHeight = stripHeight * 0.095;
    const gap = stripHeight * 0.016;

    const availableH = stripHeight - padTop - footerHeight - gap * 3;
    const slotW = stripWidth - padX * 2;
    const slotH = availableH / 4;

    // 3. Draw 4 photos with active filter applied
    const cssFilter = FILTERS_MAP[filter] || 'none';

    for (let i = 0; i < 4; i++) {
      const img = loadedPhotos[i % loadedPhotos.length];
      const slotY = padTop + i * (slotH + gap);

      if (img) {
        ctx.save();
        // Clip slot with slight rounded corners
        ctx.beginPath();
        const r = 4;
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

        // Apply skin-grade filter
        ctx.filter = cssFilter;
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
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        const slotY = padTop + i * (slotH + gap);
        ctx.strokeRect(xOffset + padX - 1, slotY - 1, slotW + 2, slotH + 2);
      }

      ctx.restore();
    }

    // 6. Draw Bottom Footer (Logo, Caption, Date Stamp)
    if (showLogo) {
      ctx.save();
      ctx.filter = 'none';
      ctx.fillStyle = selectedFrame.textColor || '#475569';

      const footerCenterY = stripHeight - footerHeight / 2;

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

  // Helper: Cover image into slot rect
  const drawImageCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number
  ) => {
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

  // Main Render to Canvas (Promise-based for 100% reliable high-res export)
  const renderCompositeCanvas = useCallback(
    (canvas: HTMLCanvasElement, scale: number = 1): Promise<void> => {
      return new Promise((resolve) => {
        const ctx = canvas.getContext('2d');
        if (!ctx || photos.length === 0) {
          resolve();
          return;
        }

        const singleStripW = 400 * scale;
        const singleStripH = 1200 * scale;

        const totalCanvasW = stripColumns === 1 ? singleStripW : singleStripW * 2 + 16 * scale;
        const totalCanvasH = singleStripH;

        canvas.width = totalCanvasW;
        canvas.height = totalCanvasH;

        // Load all captured photos
        const loadedPhotos: HTMLImageElement[] = [];
        let pendingPhotos = photos.length;

        const executeRender = () => {
          // Load overlay if custom frame uploaded or template has overlay
          const overlaySrc = customUploadedFrame || selectedFrame.previewImage;

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
          // Clear background
          ctx.clearRect(0, 0, totalCanvasW, totalCanvasH);

          if (stripColumns === 1) {
            // 1 Cột Ảnh (Single Strip 1x4)
            drawSingleStrip(ctx, 0, singleStripW, singleStripH, loadedPhotos, loadedOverlay);
          } else {
            // 2 Cột Ảnh (Double Strip 2x4 side-by-side)
            // Strip 1 (Left)
            drawSingleStrip(ctx, 0, singleStripW, singleStripH, loadedPhotos, loadedOverlay);

            // Strip 2 (Right)
            const secondX = singleStripW + 16 * scale;
            drawSingleStrip(ctx, secondX, singleStripW, singleStripH, loadedPhotos, loadedOverlay);

            // Dotted cut line down the center
            ctx.save();
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1 * scale;
            ctx.setLineDash([6 * scale, 6 * scale]);
            ctx.beginPath();
            ctx.moveTo(singleStripW + 8 * scale, 0);
            ctx.lineTo(singleStripW + 8 * scale, singleStripH);
            ctx.stroke();
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
    [photos, filter, selectedFrame, customUploadedFrame, stripColumns, showLogo, customCaption]
  );

  // Live re-render whenever options change
  useEffect(() => {
    if (previewCanvasRef.current) {
      renderCompositeCanvas(previewCanvasRef.current, 1);
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
        layout: '1x4_strip',
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

  // Download high-resolution composite strip (300 DPI) with full Mobile Web Share & Direct Save support
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const highResCanvas = document.createElement('canvas');
      await renderCompositeCanvas(highResCanvas, 3); // Scale 3x = ~1200x3600 px (300 DPI)

      highResCanvas.toBlob(
        async (blob) => {
          if (!blob) {
            setIsDownloading(false);
            return;
          }

          const fileName = `PhotoXinhh_${stripColumns === 1 ? '1cot' : '2cot'}_300DPI.jpg`;
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
            const dataUrl = highResCanvas.toDataURL('image/jpeg', 0.98);

            // Trên iPhone/iPad: Mở Native Share Sheet với tùy chọn "Lưu hình ảnh" vào Camera Roll
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              try {
                await navigator.share({
                  files: [file],
                  title: 'PhotoXinhh Photobooth',
                  text: 'Dải ảnh PhotoXinhh xinh xắn của bạn ✨',
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
        0.98
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
    <div className="bg-[#fef8f9] min-h-[calc(100vh-80px)] py-4 px-3 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ==================== LEFT COLUMN: PHOTO STRIP PREVIEW & CONTROLS ==================== */}
          <div className="lg:col-span-4 flex flex-col items-center space-y-3.5">
            {/* Live Canvas Strip Card */}
            <div className="p-2 sm:p-3 rounded-2xl bg-white border border-pink-200/90 shadow-lg flex items-center justify-center max-w-[340px] sm:max-w-[400px] w-full">
              <canvas
                ref={previewCanvasRef}
                className="w-full h-auto rounded-lg shadow-2xs border border-gray-100 max-h-[580px] object-contain"
              />
            </div>

            {/* Toggle 1 Cột vs 2 Cột: [ 🖼️ 1  ( )  2 🖼️ ] */}
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
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3">
                {/* Custom Uploaded Frame (if user uploaded one) */}
                {customUploadedFrame && (
                  <div
                    onClick={() => {
                      const customTpl: FrameTemplate = {
                        id: 'custom-user-frame',
                        name: 'Khung Của Bạn',
                        category: 'cute',
                        layout: '1x4_strip',
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
                    className={`rounded-xl border p-1.5 flex flex-col items-center justify-between cursor-pointer transition aspect-[1/3] relative ${
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
                        setCustomUploadedFrame(null);
                        setFrame({
                          id: tpl.id,
                          name: tpl.name,
                          bgColor: tpl.bgColor,
                          textColor: tpl.textColor,
                          category: 'pastel',
                          overlayImage: tpl.previewImage,
                        });
                      }}
                      className={`rounded-xl border p-1.5 flex flex-col items-center justify-between cursor-pointer transition aspect-[1/3] relative group ${
                        isCurrent
                          ? 'border-pink-500 bg-pink-50/80 shadow-xs ring-2 ring-pink-400 scale-[1.02]'
                          : 'border-gray-200 hover:border-pink-300 bg-white hover:shadow-2xs'
                      }`}
                    >
                      {/* Realistic 1x4 Strip Thumbnail */}
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
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-full flex-1 rounded-xs bg-white/75 border border-black/10 flex items-center justify-center text-[7px] text-gray-300 font-bold"
                            >
                              {i + 1}
                            </div>
                          ))}
                        </div>

                        {/* Footer preview */}
                        <div
                          className="text-[6px] font-semibold text-center truncate pb-0.5 leading-none opacity-80"
                          style={{ color: tpl.textColor }}
                        >
                          {tpl.footerEmoji || 'PhotoXinhh'}
                        </div>
                      </div>

                      {/* Label underneath */}
                      <div className="text-[10px] font-semibold text-gray-700 truncate w-full text-center mt-1 group-hover:text-pink-600">
                        {tpl.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom sponsor/ad ribbon placeholder */}
            <div className="pt-2 text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-pink-300">
                QUẢNG CÁO
              </span>
            </div>
          </div>
        </div>
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
