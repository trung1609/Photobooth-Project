import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Download, Printer, QrCode, Sparkles, RotateCcw, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBoothStore } from '../store/useBoothStore';

export const ResultModal: React.FC = () => {
  const {
    layout,
    photos,
    filter,
    frame,
    customText,
    showDateStamp,
    resetPhotos,
    setStep,
  } = useBoothStore();

  const printCanvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#a855f7', '#fb7185', '#ffffff'],
    });
  }, []);

  const generateHighResCanvas = useCallback(() => {
    const isStrip = layout === '1x4_strip';
    const isGrid = layout === '2x2_grid';

    const baseWidth = isStrip ? 1200 : isGrid ? 1600 : 1200;
    const baseHeight = isStrip ? 3600 : isGrid ? 2000 : 1500;

    const canvas = document.createElement('canvas');
    canvas.width = baseWidth;
    canvas.height = baseHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = frame.bgColor;
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    if (filter === 'korean_glow') {
      ctx.filter = 'brightness(1.08) contrast(1.02) saturate(1.08)';
    } else if (filter === 'bw') {
      ctx.filter = 'grayscale(100%) contrast(1.2)';
    } else if (filter === 'warm_retro') {
      ctx.filter = 'sepia(20%) saturate(1.2) hue-rotate(-10deg) brightness(1.04)';
    } else if (filter === 'vintage') {
      ctx.filter = 'sepia(40%) contrast(1.1) brightness(0.95)';
    } else if (filter === 'cool_cyber') {
      ctx.filter = 'contrast(1.15) hue-rotate(15deg) saturate(1.2)';
    } else {
      ctx.filter = 'none';
    }

    const padding = 72;
    const footerHeight = 240;
    const availableHeight = baseHeight - footerHeight - padding * 2;

    const loadedImages: HTMLImageElement[] = [];
    let pending = photos.length;

    photos.forEach((src, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        loadedImages[idx] = img;
        pending--;
        if (pending === 0) {
          if (isStrip) {
            const singleStripWidth = (baseWidth - padding * 3) / 2;
            const photoGap = 40;
            const slotHeight = (availableHeight - photoGap * 3) / 4;

            [0, 1].forEach((stripIndex) => {
              const startX = padding + stripIndex * (singleStripWidth + padding);

              loadedImages.forEach((image, i) => {
                const y = padding + i * (slotHeight + photoGap);
                drawRoundedImage(ctx, image, startX, y, singleStripWidth, slotHeight, 24);
              });

              ctx.filter = 'none';
              ctx.fillStyle = frame.textColor;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
              ctx.fillText(customText, startX + singleStripWidth / 2, baseHeight - 140);

              if (showDateStamp) {
                const today = new Date().toISOString().slice(0, 10).replace(/-/g, '.');
                ctx.font = '600 30px "Plus Jakarta Sans", sans-serif';
                ctx.globalAlpha = 0.75;
                ctx.fillText(`${today} • PHOTOXINHH`, startX + singleStripWidth / 2, baseHeight - 75);
                ctx.globalAlpha = 1.0;
              }
            });
          } else if (isGrid) {
            const gap = 48;
            const slotWidth = (baseWidth - padding * 2 - gap) / 2;
            const slotHeight = (availableHeight - gap) / 2;

            loadedImages.forEach((image, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2);
              const x = padding + col * (slotWidth + gap);
              const y = padding + row * (slotHeight + gap);
              drawRoundedImage(ctx, image, x, y, slotWidth, slotHeight, 24);
            });

            ctx.filter = 'none';
            ctx.fillStyle = frame.textColor;
            ctx.textAlign = 'center';
            ctx.font = 'bold 50px "Plus Jakarta Sans", sans-serif';
            ctx.fillText(customText, baseWidth / 2, baseHeight - 130);
          } else {
            const slotWidth = baseWidth - padding * 2;
            const slotHeight = slotWidth;
            if (loadedImages[0]) {
              drawRoundedImage(ctx, loadedImages[0], padding, padding, slotWidth, slotHeight, 24);
            }
            ctx.filter = 'none';
            ctx.fillStyle = frame.textColor;
            ctx.textAlign = 'center';
            ctx.font = 'bold 48px "Plus Jakarta Sans", sans-serif';
            ctx.fillText(customText, baseWidth / 2, baseHeight - 120);
          }

          const url = canvas.toDataURL('image/png', 1.0);
          setDownloadUrl(url);

          if (printCanvasRef.current) {
            const pCtx = printCanvasRef.current.getContext('2d');
            if (pCtx) {
              printCanvasRef.current.width = baseWidth;
              printCanvasRef.current.height = baseHeight;
              pCtx.drawImage(canvas, 0, 0);
            }
          }
        }
      };
      img.src = src;
    });
  }, [layout, photos, filter, frame, customText, showDateStamp]);

  function drawRoundedImage(
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
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
    ctx.roundRect(x, y, w, h, r);
    ctx.clip();
    ctx.drawImage(img, sx, sy, sWidth, sHeight, x, y, w, h);
    ctx.restore();
  }

  useEffect(() => {
    generateHighResCanvas();
  }, [generateHighResCanvas]);

  const handleDownload = () => {
    if (!downloadUrl) return;
    const link = document.createElement('a');
    link.download = `photoxinhh_${Date.now()}.png`;
    link.href = downloadUrl;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-100 text-xs font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5 text-pink-500" />
        <span>Tạo Ảnh Hoàn Tất • Chuẩn 300 DPI</span>
      </div>

      <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-1.5">
        Dải Ảnh Của Bạn Đã Sẵn Sàng! 🎉
      </h1>
      <p className="text-gray-500 text-xs sm:text-sm max-w-sm mb-6 font-normal">
        Không logo watermark, sẵn sàng in khổ 10x15cm (4x6 inch) hoặc chia sẻ lên Story, TikTok, Instagram.
      </p>

      {/* Main Preview */}
      <div className="relative mb-6 max-h-[480px] overflow-hidden rounded-3xl shadow-lg border border-pink-100 bg-white p-3">
        {downloadUrl ? (
          <img src={downloadUrl} alt="Photobooth Final Strip" className="max-h-[440px] w-auto object-contain rounded-2xl" />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400 text-xs">
            Đang xuất ảnh độ phân giải cao...
          </div>
        )}
      </div>

      {/* Hidden printable canvas for window.print() */}
      <div className="hidden">
        <div id="printable-strip">
          <canvas ref={printCanvasRef} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-md mb-6">
        <button
          onClick={handleDownload}
          disabled={!downloadUrl}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-xs sm:text-sm shadow-xs hover:scale-105 active:scale-95 transition"
        >
          <Download className="w-4 h-4" />
          <span>Tải Ảnh PNG</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-gray-700 font-medium text-xs sm:text-sm transition hover:scale-105 active:scale-95 shadow-2xs"
        >
          <Printer className="w-4 h-4 text-pink-500" />
          <span>In Ngay</span>
        </button>

        <button
          onClick={() => setShowQrModal(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-gray-700 font-medium text-xs sm:text-sm transition hover:scale-105 active:scale-95 shadow-2xs"
        >
          <QrCode className="w-4 h-4 text-purple-500" />
          <span>Quét Mã QR</span>
        </button>
      </div>

      {/* Start New Session */}
      <button
        onClick={() => {
          resetPhotos();
          setStep('select_layout');
        }}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-pink-600 transition"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Chụp Lại Phiên Mới</span>
      </button>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-pink-100 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl">
            <h3 className="text-base font-bold text-gray-800 mb-1.5">Quét QR Để Tải Vào Điện Thoại</h3>
            <p className="text-xs text-gray-500 mb-5 font-normal">
              Mở camera trên điện thoại của bạn để quét mã và tải ảnh gốc ngay tức thì.
            </p>

            <div className="bg-gray-50 p-4 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center mb-5 border border-pink-100">
              <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800 fill-current">
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="white" />
                <rect x="10" y="10" width="10" height="10" />

                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="white" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="white" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="40" y="10" width="10" height="20" />
                <rect x="40" y="40" width="20" height="20" />
                <rect x="70" y="40" width="20" height="10" />
                <rect x="40" y="70" width="15" height="15" />
                <rect x="65" y="65" width="25" height="25" />
              </svg>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép' : 'Sao chép link'}</span>
              </button>

              <button
                onClick={() => setShowQrModal(false)}
                className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-xs font-semibold text-white transition"
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
