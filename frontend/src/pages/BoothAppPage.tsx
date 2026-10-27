import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  RotateCcw,
  FlipHorizontal,
  Upload,
  Sparkles,
  Zap,
  Image as ImageIcon,
  Check,
  ChevronDown,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { useBoothStore, FRAME_PRESETS } from '../store/useBoothStore';
import { LayoutType, FilterType } from '../types/photobooth';
import { CustomizerStudio } from '../components/CustomizerStudio';
import { ResultModal } from '../components/ResultModal';

const FILTERS: { id: FilterType; label: string; cssFilter: string }[] = [
  { id: 'normal', label: 'Bình Thường', cssFilter: 'none' },
  { id: 'vintage', label: 'Mono (Retro)', cssFilter: 'sepia(35%) contrast(1.1) brightness(0.96)' },
  { id: 'bw', label: 'Đen Trắng', cssFilter: 'grayscale(100%) contrast(1.2)' },
  { id: 'korean_glow', label: 'Mềm Mại', cssFilter: 'brightness(1.08) contrast(1.02) saturate(1.08)' },
  { id: 'warm_retro', label: 'Dazz Classic', cssFilter: 'sepia(20%) saturate(1.2) hue-rotate(-10deg) brightness(1.04)' },
  { id: 'cool_cyber', label: 'Dazz Instant', cssFilter: 'contrast(1.15) hue-rotate(15deg) saturate(1.2)' },
];

export const BoothAppPage: React.FC = () => {
  const {
    layout,
    setLayout,
    timerDuration,
    setTimerDuration,
    frame,
    setFrame,
    photos,
    addPhoto,
    updatePhotoAtSlot,
    removePhotoAtSlot,
    resetPhotos,
    filter,
    setFilter,
    isMirror,
    toggleMirror,
    isVideoRecap,
    toggleVideoRecap,
    step,
    setStep
  } = useBoothStore();

  const totalRequired = layout === 'polaroid' ? 1 : 4;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState<number>(timerDuration);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isAutoSequence, setIsAutoSequence] = useState(false);
  const [showFrameModal, setShowFrameModal] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Play synthetic camera beep & shutter sounds via Web Audio API
  const playSound = useCallback((type: 'beep' | 'shutter') => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'beep') {
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }
    } catch {
      // AudioContext muted/unsupported
    }
  }, []);

  // Initialize Camera
  useEffect(() => {
    let isMounted = true;

    async function initCamera() {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'user',
          },
          audio: false,
        });

        if (isMounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        }
      } catch (err) {
        console.error('Camera access error:', err);
        setCameraError('Không thể mở camera. Vui lòng cấp quyền máy ảnh trên trình duyệt!');
      }
    }

    initCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Take snapshot
  const takeSnapshot = useCallback(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isMirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    setIsFlashing(true);
    playSound('shutter');
    setTimeout(() => setIsFlashing(false), 250);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    addPhoto(dataUrl);
  }, [isMirror, playSound, addPhoto]);

  // Single Manual Shot (Chụp tay)
  const handleManualShot = () => {
    if (photos.length >= totalRequired) return;
    takeSnapshot();
  };

  // Auto Countdown Burst Shot (AUTO)
  const handleAutoCapture = () => {
    if (isCountingDown || photos.length >= totalRequired) return;
    setIsAutoSequence(true);
    setIsCountingDown(true);
    setCountdown(timerDuration);
    playSound('beep');
  };

  useEffect(() => {
    if (!isCountingDown) return;

    if (countdown > 1) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        playSound('beep');
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 1) {
      const timer = setTimeout(() => {
        takeSnapshot();
        setIsCountingDown(false);

        // If in auto sequence and more photos needed, continue sequence
        if (isAutoSequence && photos.length + 1 < totalRequired) {
          setTimeout(() => {
            setIsCountingDown(true);
            setCountdown(timerDuration);
            playSound('beep');
          }, 1200);
        } else {
          setIsAutoSequence(false);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCountingDown, countdown, isAutoSequence, photos.length, totalRequired, timerDuration, playSound, takeSnapshot]);

  // Slot Upload handler
  const handleSlotUpload = (slotIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updatePhotoAtSlot(slotIndex, event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // General Upload handler
  const handleGeneralUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls: string[] = [];
    const filesToRead = Array.from(files).slice(0, totalRequired);

    let count = 0;
    filesToRead.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          uploadedUrls.push(event.target.result as string);
        }
        count++;
        if (count === filesToRead.length) {
          uploadedUrls.forEach((url) => addPhoto(url));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // If user requested customization or result view
  if (step === 'customize') {
    return <CustomizerStudio />;
  }

  if (step === 'result') {
    return <ResultModal />;
  }

  return (
    <div className="bg-[#fef8f9] min-h-[calc(100vh-80px)] py-4 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* 1. TOP HEADER (PHOTOXINHH SCRIPT & TOOLBAR) */}
        <div className="relative flex flex-col items-center text-center">
          {/* Top Left Menu & Language */}
          <div className="absolute top-0 left-0 flex items-center gap-2">
            <button
              onClick={() => alert('Menu PhotoXinhh: Chọn bố cục, hỗ trợ chụp hoặc đổi ngôn ngữ')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-400 text-white font-semibold text-xs shadow-2xs hover:bg-pink-500 transition"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>Menu</span>
            </button>

            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-pink-200 text-pink-600 font-semibold text-xs shadow-2xs cursor-pointer">
              <span>VN VN</span>
              <ChevronDown className="w-3 h-3 text-pink-400" />
            </div>
          </div>

          {/* Center Brand Title in cute cursive font */}
          <div className="space-y-0.5 pt-1 sm:pt-0">
            <h1 className="font-cursive text-4xl sm:text-5xl text-pink-400 font-normal tracking-wide drop-shadow-2xs">
              PhotoXinhh
            </h1>
            <p className="text-[11px] sm:text-xs uppercase tracking-widest text-pink-400 font-semibold">
              Capture Memories
            </p>
          </div>

          {/* Controls Bar: Layout, Đếm ngược, Hỗ trợ chụp */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 text-xs">
            {/* Layout Ảnh */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-pink-500">Layout Ảnh</span>
              <select
                value={layout}
                onChange={(e) => {
                  setLayout(e.target.value as LayoutType);
                  resetPhotos();
                }}
                className="px-2.5 py-1 rounded-lg bg-white border border-pink-200 text-gray-700 font-medium text-xs shadow-2xs focus:outline-none focus:border-pink-400 cursor-pointer"
              >
                <option value="1x4_strip">1x4 (4 ảnh)</option>
                <option value="2x2_grid">2x2 (4 ảnh)</option>
                <option value="polaroid">Polaroid (1 ảnh)</option>
              </select>
            </div>

            {/* Đếm Ngược */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-pink-500">Đếm Ngược</span>
              <select
                value={timerDuration}
                onChange={(e) => setTimerDuration(Number(e.target.value))}
                className="px-2.5 py-1 rounded-lg bg-white border border-pink-200 text-gray-700 font-medium text-xs shadow-2xs focus:outline-none focus:border-pink-400 cursor-pointer"
              >
                <option value={3}>3s</option>
                <option value={5}>5s</option>
                <option value={10}>10s</option>
              </select>
            </div>

            {/* Hỗ Trợ Chụp */}
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-pink-500">Hỗ Trợ Chụp</span>
              <button
                onClick={() => setShowFrameModal(true)}
                className="px-3 py-1 rounded-lg bg-pink-100 text-pink-600 border border-pink-200 font-semibold hover:bg-pink-200 transition shadow-2xs"
              >
                Chọn Khung
              </button>
            </div>
          </div>
        </div>

        {/* 2. TWO-COLUMN PHOTOBOOTH STUDIO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          {/* LEFT COLUMN: Camera, Buttons, Filters */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-4">
            {/* Camera Viewfinder */}
            <div className="relative w-full aspect-[4/3] max-w-lg bg-black rounded-3xl overflow-hidden border-4 border-white shadow-md shadow-pink-100 flex items-center justify-center">
              {cameraError ? (
                <div className="p-6 text-center text-rose-500 bg-white rounded-2xl m-4 border border-rose-100 text-xs">
                  <p className="font-bold mb-1">Lỗi Camera</p>
                  <p>{cameraError}</p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isMirror ? 'scale-x-[-1]' : ''
                  }`}
                />
              )}

              {/* Shutter Flash */}
              {isFlashing && (
                <div className="absolute inset-0 bg-white shutter-flash z-30 pointer-events-none" />
              )}

              {/* Countdown overlay */}
              {isCountingDown && (
                <div className="absolute inset-0 bg-black/35 backdrop-blur-2xs flex items-center justify-center z-20">
                  <div className="text-7xl font-black text-pink-400 drop-shadow-md animate-ping">
                    {countdown}
                  </div>
                </div>
              )}

              {/* Top-Left Flash icon */}
              <div className="absolute top-3 left-3 z-10">
                <button
                  className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-xs backdrop-blur-xs transition"
                  title="Flash"
                >
                  <Zap className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              {/* Top-Right Mirror icon */}
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={toggleMirror}
                  className={`p-2 rounded-full backdrop-blur-xs transition shadow-xs ${
                    isMirror ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                  title="Lật gương"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Floating Badge: Đã Chụp 0/4 */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
                <div className="px-4 py-1 rounded-full bg-[#831843]/85 text-white font-semibold text-xs tracking-wider shadow-sm backdrop-blur-xs">
                  Đã Chụp {photos.length}/{totalRequired}
                </div>
              </div>
            </div>

            {/* THREE ROUND ACTION BUTTONS (Chụp tay, AUTO, Chụp Lại) */}
            <div className="flex items-center justify-center gap-6 pt-1">
              {/* Button 1: Chụp tay */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={handleManualShot}
                  disabled={isCountingDown || photos.length >= totalRequired}
                  className="w-14 h-14 rounded-full bg-rose-200 hover:bg-rose-300 text-rose-700 flex items-center justify-center shadow-xs transition active:scale-95 disabled:opacity-50"
                  title="Chụp ngay lập tức"
                >
                  <Camera className="w-6 h-6" />
                </button>
                <span className="text-[11px] font-semibold text-gray-600">Chụp tay</span>
              </div>

              {/* Button 2: AUTO (Center Big Pink) */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={handleAutoCapture}
                  disabled={isCountingDown || photos.length >= totalRequired}
                  className="w-18 h-18 rounded-full bg-pink-400 hover:bg-pink-500 text-white flex flex-col items-center justify-center shadow-md shadow-pink-300/60 hover:scale-105 active:scale-95 transition disabled:opacity-50"
                  title="Tự động đếm ngược chụp lần lượt"
                >
                  <Camera className="w-6 h-6 mb-0.5" />
                  <span className="text-[10px] font-extrabold tracking-wider">AUTO</span>
                </button>
              </div>

              {/* Button 3: Chụp Lại */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={resetPhotos}
                  disabled={isCountingDown || photos.length === 0}
                  className="w-14 h-14 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs transition active:scale-95 disabled:opacity-50"
                  title="Xóa chụp lại từ đầu"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
                <span className="text-[11px] font-semibold text-gray-600">Chụp Lại</span>
              </div>
            </div>

            {/* Toggle Video Recap & Upload Button */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={toggleVideoRecap}
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                    isVideoRecap ? 'bg-pink-400' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      isVideoRecap ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
                <span className="text-gray-600">Video Recap</span>
              </label>

              <label className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-semibold cursor-pointer transition shadow-2xs">
                <Upload className="w-3.5 h-3.5" />
                <span>Tải ảnh lên</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGeneralUpload}
                />
              </label>
            </div>

            {/* BỘ LỌC MÀU CARD */}
            <div className="w-full max-w-lg bg-white border border-pink-200/90 rounded-2xl p-3.5 space-y-2 shadow-2xs">
              <div className="text-xs font-bold text-pink-600">Bộ lọc màu</div>
              <div className="flex flex-wrap gap-1.5">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      filter === f.id
                        ? 'bg-pink-400 text-white shadow-2xs'
                        : 'bg-pink-50/60 text-gray-600 hover:bg-pink-100/60 hover:text-pink-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-pink-400 font-normal italic pt-0.5">
                Hiệu ứng (Chụp Xong Sẽ Thấy Hiệu Ứng)
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 4 PHOTO CARDS STACK */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5">
            {Array.from({ length: totalRequired }).map((_, slotIndex) => {
              const photo = photos[slotIndex];

              return (
                <div
                  key={slotIndex}
                  className="bg-white border-2 border-pink-200 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[140px] shadow-2xs relative overflow-hidden group"
                >
                  {photo ? (
                    <div className="w-full h-full flex flex-col items-center">
                      <img
                        src={photo}
                        alt={`Ảnh ô #${slotIndex + 1}`}
                        className="w-full max-h-36 object-contain rounded-xl shadow-xs"
                      />
                      <button
                        onClick={() => removePhotoAtSlot(slotIndex)}
                        className="mt-2 text-[11px] text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        <span>Xóa ảnh này</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-2 space-y-2 text-center">
                      {/* Outline photo frame icon */}
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-purple-400 border-2 border-dashed border-purple-200 bg-purple-50/30">
                        <ImageIcon className="w-6 h-6" />
                      </div>

                      <label className="flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 text-xs font-semibold cursor-pointer transition shadow-2xs">
                        <Upload className="w-3 h-3" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleSlotUpload(slotIndex, e)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              );
            })}

            {/* When all photos taken or ready -> Next Step Button */}
            {photos.length >= totalRequired && (
              <button
                onClick={() => setStep('customize')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold text-sm shadow-md shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition"
              >
                <span>Xem & Tải Dải Ảnh (300 DPI)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. MODAL CHỌN KHUNG */}
      {showFrameModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-pink-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-base text-gray-800">Chọn Khung Ảnh Photobooth</h3>
              </div>
              <button
                onClick={() => setShowFrameModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto p-1">
              {FRAME_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setFrame(preset);
                    setShowFrameModal(false);
                  }}
                  className={`p-3 rounded-2xl border text-left transition flex flex-col items-center gap-2 ${
                    frame.id === preset.id
                      ? 'border-pink-500 bg-pink-50/60 shadow-xs'
                      : 'border-gray-200 hover:border-pink-200 bg-gray-50/50'
                  }`}
                >
                  <div
                    className="w-12 h-16 rounded-xl border border-gray-300 shadow-2xs flex items-center justify-center"
                    style={{ backgroundColor: preset.bgColor }}
                  >
                    {frame.id === preset.id && <Check className="w-4 h-4 text-pink-600" />}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 text-center">{preset.name}</span>
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowFrameModal(false)}
                className="px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs transition"
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
