import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onConfirm: (croppedDataUrl: string) => void;
}

type HandleType = 'tl' | 'tc' | 'tr' | 'ml' | 'mr' | 'bl' | 'bc' | 'br' | 'inside' | 'pan';

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onConfirm,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Natural dimensions of loaded image
  const [naturalSize, setNaturalSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Zoom scale: 1.0 = fit, up to 3.5
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Container dimensions
  const [containerSize, setContainerSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Crop box in container pixel space
  const [cropBox, setCropBox] = useState<{ x: number; y: number; width: number; height: number }>({
    x: 40,
    y: 40,
    width: 280,
    height: 200,
  });

  // Dragging interaction state
  const dragRef = useRef<{
    active: boolean;
    handle: HandleType | null;
    startX: number;
    startY: number;
    initialCrop: { x: number; y: number; width: number; height: number };
    initialPan: { x: number; y: number };
  }>({
    active: false,
    handle: null,
    startX: 0,
    startY: 0,
    initialCrop: { x: 0, y: 0, width: 0, height: 0 },
    initialPan: { x: 0, y: 0 },
  });

  // Calculate base fitted size and position
  const getFittedImageBounds = useCallback(() => {
    if (!naturalSize.width || !naturalSize.height || !containerSize.width || !containerSize.height) {
      return { x: 0, y: 0, width: containerSize.width || 400, height: containerSize.height || 300 };
    }

    const fitRatio = Math.min(
      (containerSize.width * 0.92) / naturalSize.width,
      (containerSize.height * 0.92) / naturalSize.height
    );

    const baseW = naturalSize.width * fitRatio;
    const baseH = naturalSize.height * fitRatio;

    // Apply scale & pan
    const scaledW = baseW * scale;
    const scaledH = baseH * scale;

    const centerX = containerSize.width / 2 + pan.x;
    const centerY = containerSize.height / 2 + pan.y;

    return {
      x: centerX - scaledW / 2,
      y: centerY - scaledH / 2,
      width: scaledW,
      height: scaledH,
    };
  }, [naturalSize, containerSize, scale, pan]);

  // Update container size on mount / resize
  useEffect(() => {
    if (!isOpen) return;

    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [isOpen]);

  // Reset when a new image is loaded
  useEffect(() => {
    if (!imageSrc || !isOpen) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      setScale(1);
      setPan({ x: 0, y: 0 });

      // Default crop box: centered ~70% of container
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const cW = rect.width || 600;
        const cH = rect.height || 420;
        const cropW = Math.min(cW * 0.72, cH * 0.8 * (img.naturalWidth / img.naturalHeight));
        const cropH = cropW / (img.naturalWidth / img.naturalHeight);

        setCropBox({
          x: Math.max(20, (cW - cropW) / 2),
          y: Math.max(20, (cH - cropH) / 2),
          width: Math.min(cropW, cW - 40),
          height: Math.min(cropH, cH - 40),
        });
      }
    };
    img.src = imageSrc;
  }, [imageSrc, isOpen]);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.0015;
    setScale((prev) => Math.min(3.5, Math.max(1, prev + delta)));
  };

  // Pointer drag handling for handles and crop box
  const startDrag = (handle: HandleType, clientX: number, clientY: number) => {
    dragRef.current = {
      active: true,
      handle,
      startX: clientX,
      startY: clientY,
      initialCrop: { ...cropBox },
      initialPan: { ...pan },
    };
  };

  const handlePointerDown = (e: React.PointerEvent, handle: HandleType) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startDrag(handle, e.clientX, e.clientY);
  };

  const handleContainerPointerDown = (e: React.PointerEvent) => {
    // If clicking outside crop box, allow panning the zoomed image
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startDrag('pan', e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const { handle, startX, startY, initialCrop, initialPan } = dragRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    const minSize = 40;
    const maxW = containerSize.width || 800;
    const maxH = containerSize.height || 600;

    if (handle === 'pan') {
      setPan({
        x: initialPan.x + dx,
        y: initialPan.y + dy,
      });
    } else if (handle === 'inside') {
      // Move crop box, clamp inside container
      const newX = Math.min(Math.max(0, initialCrop.x + dx), maxW - initialCrop.width);
      const newY = Math.min(Math.max(0, initialCrop.y + dy), maxH - initialCrop.height);
      setCropBox((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    } else if (handle) {
      let { x, y, width, height } = initialCrop;

      // Horizontal resize
      if (handle.includes('l')) {
        const potentialW = initialCrop.width - dx;
        if (potentialW >= minSize && initialCrop.x + dx >= 0) {
          x = initialCrop.x + dx;
          width = potentialW;
        }
      } else if (handle.includes('r')) {
        const potentialW = initialCrop.width + dx;
        if (potentialW >= minSize && initialCrop.x + potentialW <= maxW) {
          width = potentialW;
        }
      }

      // Vertical resize
      if (handle.includes('t')) {
        const potentialH = initialCrop.height - dy;
        if (potentialH >= minSize && initialCrop.y + dy >= 0) {
          y = initialCrop.y + dy;
          height = potentialH;
        }
      } else if (handle.includes('b')) {
        const potentialH = initialCrop.height + dy;
        if (potentialH >= minSize && initialCrop.y + potentialH <= maxH) {
          height = potentialH;
        }
      }

      setCropBox({ x, y, width, height });
    }
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
    dragRef.current.handle = null;
  };

  // Perform the crop on high-resolution canvas
  const handleConfirm = () => {
    if (!imageSrc || !naturalSize.width || !naturalSize.height) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const bounds = getFittedImageBounds();

      // Transform crop box coords to natural image coords
      const scaleX = naturalSize.width / bounds.width;
      const scaleY = naturalSize.height / bounds.height;

      const srcX = (cropBox.x - bounds.x) * scaleX;
      const srcY = (cropBox.y - bounds.y) * scaleY;
      const srcW = cropBox.width * scaleX;
      const srcH = cropBox.height * scaleY;

      // Clamped coordinates
      const clampedSrcX = Math.max(0, Math.min(srcX, naturalSize.width));
      const clampedSrcY = Math.max(0, Math.min(srcY, naturalSize.height));
      const clampedSrcW = Math.max(10, Math.min(srcW, naturalSize.width - clampedSrcX));
      const clampedSrcH = Math.max(10, Math.min(srcH, naturalSize.height - clampedSrcY));

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(clampedSrcW);
      canvas.height = Math.round(clampedSrcH);
      const ctx = canvas.getContext('2d');

      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        img,
        clampedSrcX,
        clampedSrcY,
        clampedSrcW,
        clampedSrcH,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const croppedUrl = canvas.toDataURL('image/jpeg', 0.95);
      onConfirm(croppedUrl);
      onClose();
    };
    img.src = imageSrc;
  };

  if (!isOpen || !imageSrc) return null;

  const bounds = getFittedImageBounds();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col border border-pink-100 max-h-[95vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <h2 className="text-sm sm:text-base font-bold text-gray-800">Cắt & Điều chỉnh ảnh</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport / Crop Canvas Area */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onPointerDown={handleContainerPointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full h-[45vh] sm:h-[55vh] bg-black overflow-hidden flex items-center justify-center cursor-default touch-none"
        >
          {/* Fitted Image */}
          {naturalSize.width > 0 && (
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop Source"
              draggable={false}
              style={{
                position: 'absolute',
                left: `${bounds.x}px`,
                top: `${bounds.y}px`,
                width: `${bounds.width}px`,
                height: `${bounds.height}px`,
                maxWidth: 'none',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Dimmed Outside Overlays */}
          {/* Top */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: `${cropBox.y}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            }}
          />
          {/* Bottom */}
          <div
            style={{
              position: 'absolute',
              top: `${cropBox.y + cropBox.height}px`,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            }}
          />
          {/* Left */}
          <div
            style={{
              position: 'absolute',
              top: `${cropBox.y}px`,
              left: 0,
              width: `${cropBox.x}px`,
              height: `${cropBox.height}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            }}
          />
          {/* Right */}
          <div
            style={{
              position: 'absolute',
              top: `${cropBox.y}px`,
              left: `${cropBox.x + cropBox.width}px`,
              right: 0,
              height: `${cropBox.height}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.55)',
            }}
          />

          {/* Active Crop Box */}
          <div
            onPointerDown={(e) => handlePointerDown(e, 'inside')}
            style={{
              position: 'absolute',
              left: `${cropBox.x}px`,
              top: `${cropBox.y}px`,
              width: `${cropBox.width}px`,
              height: `${cropBox.height}px`,
            }}
            className="border-2 border-white shadow-lg cursor-move"
          >
            {/* 8 Drag Handles matching sample screenshot (white squares with shadows + expanded touch target for mobile) */}
            {/* Corners */}
            <div
              onPointerDown={(e) => handlePointerDown(e, 'tl')}
              className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border border-gray-300 shadow-md cursor-nwse-resize z-20 touch-none before:absolute before:-inset-2.5 before:content-['']"
            />
            <div
              onPointerDown={(e) => handlePointerDown(e, 'tr')}
              className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border border-gray-300 shadow-md cursor-nesw-resize z-20 touch-none before:absolute before:-inset-2.5 before:content-['']"
            />
            <div
              onPointerDown={(e) => handlePointerDown(e, 'bl')}
              className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border border-gray-300 shadow-md cursor-nesw-resize z-20 touch-none before:absolute before:-inset-2.5 before:content-['']"
            />
            <div
              onPointerDown={(e) => handlePointerDown(e, 'br')}
              className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border border-gray-300 shadow-md cursor-nwse-resize z-20 touch-none before:absolute before:-inset-2.5 before:content-['']"
            />

            {/* Midpoints */}
            <div
              onPointerDown={(e) => handlePointerDown(e, 'tc')}
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-white border border-gray-300 shadow-md cursor-ns-resize z-20 touch-none before:absolute before:-inset-2.5 before:content-['']"
            />
            <div
              onPointerDown={(e) => handlePointerDown(e, 'bc')}
              className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-white border border-gray-300 shadow-md cursor-ns-resize z-20 touch-none before:absolute before:-inset-2.5 before:content-['']"
            />
            <div
              onPointerDown={(e) => handlePointerDown(e, 'ml')}
              className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-2.5 h-4 bg-white border border-gray-300 shadow-md cursor-ew-resize z-20 touch-none before:absolute before:-inset-2.5 before:content-['']"
            />
            <div
              onPointerDown={(e) => handlePointerDown(e, 'mr')}
              className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-2.5 h-4 bg-white border border-gray-300 shadow-md cursor-ew-resize z-20 touch-none before:absolute before:-inset-2.5 before:content-['']"
            />
          </div>

          {/* Floating Zoom Control Bar */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white z-30">
            <button
              onClick={() => setScale((s) => Math.max(1, s - 0.2))}
              className="p-1 hover:text-pink-400 transition"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-16 sm:w-24 h-1 accent-pink-500 cursor-pointer"
            />
            <button
              onClick={() => setScale((s) => Math.min(3, s + 0.2))}
              className="p-1 hover:text-pink-400 transition"
              title="Phóng to"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setScale(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-1 hover:text-pink-400 transition ml-1"
              title="Đặt lại zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom Helper Text Badge */}
        <div className="flex flex-col items-center px-4 py-3 bg-white">
          <div className="px-3.5 py-1.5 rounded-lg border border-emerald-400 bg-emerald-50/70 text-emerald-700 text-[11px] sm:text-xs font-medium text-center shadow-xs">
            Có thể kéo giãn, di chuyển vùng chọn để tùy chỉnh to nhỏ ảnh tùy ý và có thể zoom to, zoom nhỏ ảnh gốc.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-3.5">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gray-100 transition shadow-2xs"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              className="px-8 py-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
