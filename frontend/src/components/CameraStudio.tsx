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
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch beep
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } else {
        // Shutter snap sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }
    } catch {
      // AudioContext not allowed before user gesture
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
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Top Header controls */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={() => {
            resetPhotos();
            setStep('select_layout');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Đổi bố cục</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
            Đã chụp: {photos.length} / {totalRequired} tấm
          </span>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Bật/Tắt âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-pink-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Main Camera Viewfinder */}
      <div className="relative w-full max-w-3xl aspect-[4/3] bg-black rounded-3xl overflow-hidden border-2 border-slate-700 shadow-2xl flex items-center justify-center">
        {cameraError ? (
          <div className="p-6 text-center text-rose-400 max-w-md">
            <p className="font-bold mb-2">Lỗi Camera</p>
            <p className="text-sm text-slate-300">{cameraError}</p>
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="text-8xl md:text-9xl font-black text-pink-400 animate-ping">
              {countdown}
            </div>
          </div>
        )}

        {/* Camera Quick Tools on Viewfinder */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={toggleMirror}
            className={`p-2.5 rounded-xl backdrop-blur-md transition ${
              isMirror ? 'bg-pink-500/80 text-white' : 'bg-black/50 text-slate-300 hover:bg-black/70'
            }`}
            title="Lật gương (Mirror)"
          >
            <FlipHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Captured photos thumbnail strip preview */}
      <div className="w-full max-w-3xl flex items-center justify-center gap-3 mt-4">
        {Array.from({ length: totalRequired }).map((_, idx) => (
          <div
            key={idx}
            className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 flex items-center justify-center ${
              photos[idx]
                ? 'border-pink-500 shadow-md shadow-pink-500/20'
                : 'border-slate-700 bg-slate-800/60'
            }`}
          >
            {photos[idx] ? (
              <img src={photos[idx]} alt={`Shot ${idx + 1}`} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Capture Button Bar */}
      <div className="flex items-center gap-4 mt-6">
        {photos.length > 0 && (
          <button
            onClick={resetPhotos}
            disabled={isCountingDown}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Chụp lại</span>
          </button>
        )}

        <button
          onClick={startCaptureSequence}
          disabled={isCountingDown || photos.length >= totalRequired}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-extrabold text-base transition-all shadow-xl ${
            isCountingDown || photos.length >= totalRequired
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white hover:scale-105 active:scale-95 shadow-pink-500/30'
          }`}
        >
          <Camera className="w-6 h-6" />
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
