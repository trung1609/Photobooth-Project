import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Camera, FlipHorizontal, ArrowLeft, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { useBoothStore } from '../store/useBoothStore';

export const CameraStudio: React.FC = () => {
  const {
    layout,
    photos,
    addPhoto,
    resetPhotos,
    isMirror,
    toggleMirror,
    timerDuration,
    setStep,
  } = useBoothStore();

  const totalRequired = layout === 'polaroid' ? 1 : 4;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState<number>(timerDuration);
  const [isFlashing, setIsFlashing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Play synthetic camera shutter & beep sounds via Web Audio API
  const playSound = useCallback((type: 'beep' | 'shutter') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'beep') {
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }
    } catch {
      // AudioContext muted/unsupported
    }
  }, [soundEnabled]);

  // Start Camera Stream
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
        setCameraError('Không thể truy cập camera. Vui lòng cấp quyền truy cập máy ảnh trong trình duyệt!');
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

  // Capture single snapshot from video frame
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

    // Flash effect
    setIsFlashing(true);
    playSound('shutter');
    setTimeout(() => setIsFlashing(false), 300);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    addPhoto(dataUrl);
  }, [isMirror, playSound, addPhoto]);

  // Start Countdown Sequence
  const startCaptureSequence = () => {
    if (isCountingDown || photos.length >= totalRequired) return;
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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCountingDown, countdown, playSound, takeSnapshot]);

  // Automatically go to customize screen when all photos are taken
  useEffect(() => {
    if (photos.length >= totalRequired) {
      const timeout = setTimeout(() => {
        setStep('customize');
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [photos.length, totalRequired, setStep]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top Header controls */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={() => {
            resetPhotos();
            setStep('select_layout');
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-pink-50 text-xs text-gray-700 font-medium border border-pink-200 shadow-xs transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-pink-500" />
          <span>Đổi bố cục</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-pink-50 text-pink-600 border border-pink-200">
            Đã chụp: {photos.length} / {totalRequired} tấm
          </span>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-full bg-white hover:bg-pink-50 text-gray-600 border border-pink-200 shadow-xs transition"
            title="Bật/Tắt âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-pink-500" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Main Camera Viewfinder */}
      <div className="relative w-full max-w-2xl aspect-[4/3] bg-black rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-pink-200/40 flex items-center justify-center">
        {cameraError ? (
          <div className="p-6 text-center text-rose-500 max-w-md bg-white rounded-2xl m-4 border border-rose-100">
            <p className="font-bold mb-1.5">Lỗi Camera</p>
            <p className="text-xs text-gray-600">{cameraError}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover transition-transform duration-300 ${isMirror ? 'scale-x-[-1]' : ''}`}
          />
        )}

        {/* Shutter Flash Overlay */}
        {isFlashing && (
          <div className="absolute inset-0 bg-white shutter-flash z-30 pointer-events-none" />
        )}

        {/* Big Countdown Number Overlay */}
        {isCountingDown && (
          <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="text-7xl md:text-8xl font-black text-pink-400 drop-shadow-md animate-ping">
              {countdown}
            </div>
          </div>
        )}

        {/* Camera Quick Tools on Viewfinder */}
        <div className="absolute top-3.5 right-3.5 flex gap-2 z-10">
          <button
            onClick={toggleMirror}
            className={`p-2 rounded-xl backdrop-blur-md transition shadow-xs ${
              isMirror ? 'bg-pink-500/90 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
            title="Lật gương (Mirror)"
          >
            <FlipHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Captured photos thumbnail strip preview */}
      <div className="w-full max-w-2xl flex items-center justify-center gap-2.5 mt-4">
        {Array.from({ length: totalRequired }).map((_, idx) => (
          <div
            key={idx}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 flex items-center justify-center transition ${
              photos[idx]
                ? 'border-pink-500 shadow-xs shadow-pink-500/20 bg-white'
                : 'border-pink-200 bg-white/80 text-gray-400'
            }`}
          >
            {photos[idx] ? (
              <img src={photos[idx]} alt={`Shot ${idx + 1}`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[11px] font-medium text-gray-400">#{idx + 1}</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Capture Button Bar */}
      <div className="flex items-center gap-3 mt-5">
        {photos.length > 0 && (
          <button
            onClick={resetPhotos}
            disabled={isCountingDown}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-gray-700 text-xs font-medium shadow-xs transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Chụp lại</span>
          </button>
        )}

        <button
          onClick={startCaptureSequence}
          disabled={isCountingDown || photos.length >= totalRequired}
          className={`flex items-center gap-2 px-7 py-3 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-md ${
            isCountingDown || photos.length >= totalRequired
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white hover:scale-105 active:scale-95 shadow-pink-500/25'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>
            {photos.length >= totalRequired
              ? 'Đang chuyển sang chỉnh sửa...'
              : `Chụp Tấm #${photos.length + 1} (${timerDuration}s)`}
          </span>
        </button>
      </div>
    </div>
  );
};
