import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FlipHorizontal,
  Upload,
  Zap,
  Image as ImageIcon,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Search
} from 'lucide-react';
import { useBoothStore } from '../store/useBoothStore';
import { LayoutType, FilterType } from '../types/photobooth';
import { SAMPLE_FRAMES, FrameTemplate } from '../data/framesData';
import { CustomizerStudio } from '../components/CustomizerStudio';
import { ResultModal } from '../components/ResultModal';
import { MobileSidebar } from '../components/MobileSidebar';
import { generateFrameOverlaySvg } from '../utils/frameSvgGenerator';

// Persistent global camera stream across steps to prevent Windows/Chrome webcam hardware lock
let globalCameraStream: MediaStream | null = null;

// 3D & Vector Icons matching PhotoXinhh / Korean Photobooth design
const IconSparkleCam3D = () => (
  <svg width="30" height="30" viewBox="0 0 48 48" fill="none" className="drop-shadow-xs">
    {/* Sparkle top-left */}
    <path d="M8 12L9.5 8L13.5 9.5L9.5 11L8 15L6.5 11L2.5 9.5L6.5 8L8 12Z" fill="#f59e0b" />
    {/* Sparkle top-right */}
    <path d="M39 10L40 7L43 8L40 9L39 12L38 9L35 8L38 7L39 10Z" fill="#fbbf24" />
    {/* Camera Body */}
    <rect x="7" y="15" width="34" height="25" rx="8" fill="url(#spCamGrad)" />
    <path d="M16 15L19 10H29L32 15H16Z" fill="url(#spCamTopGrad)" />
    {/* Lens Outer */}
    <circle cx="24" cy="27" r="9" fill="#ffffff" />
    {/* Lens Inner */}
    <circle cx="24" cy="27" r="7" fill="url(#spCamLensGrad)" />
    {/* Reflection */}
    <circle cx="21.5" cy="24.5" r="2.5" fill="#ffffff" fillOpacity="0.8" />
    {/* Flash light */}
    <circle cx="35" cy="20" r="2" fill="#fbbf24" />
    <defs>
      <linearGradient id="spCamGrad" x1="7" y1="15" x2="41" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="spCamTopGrad" x1="16" y1="10" x2="32" y2="15" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7dd3fc" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="spCamLensGrad" x1="17" y1="20" x2="31" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369a1" />
        <stop offset="1" stopColor="#0c4a6e" />
      </linearGradient>
    </defs>
  </svg>
);

const IconCamera3D = () => (
  <svg width="34" height="34" viewBox="0 0 48 48" fill="none" className="drop-shadow-sm">
    {/* Camera Body */}
    <rect x="6" y="14" width="36" height="26" rx="8" fill="url(#camGrad)" />
    <path d="M16 14L19 9H29L32 14H16Z" fill="url(#camTopGrad)" />
    {/* Lens */}
    <circle cx="24" cy="27" r="9" fill="#ffffff" />
    <circle cx="24" cy="27" r="7" fill="url(#camLensGrad)" />
    <circle cx="21.5" cy="24.5" r="2.5" fill="#ffffff" fillOpacity="0.85" />
    <circle cx="35" cy="19" r="2" fill="#fbbf24" />
    <defs>
      <linearGradient id="camGrad" x1="6" y1="14" x2="42" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="camTopGrad" x1="16" y1="9" x2="32" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7dd3fc" />
        <stop offset="1" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="camLensGrad" x1="17" y1="20" x2="31" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0369a1" />
        <stop offset="1" stopColor="#0c4a6e" />
      </linearGradient>
    </defs>
  </svg>
);

const IconReload3D = () => (
  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" className="drop-shadow-xs">
    <path
      d="M24 8C15.16 8 8 15.16 8 24C8 28.42 9.79 32.42 12.69 35.31L8 40H22V26L16.74 31.26C14.73 29.25 13.5 26.77 13.5 24C13.5 18.2 18.2 13.5 24 13.5C29.8 13.5 34.5 18.2 34.5 24C34.5 27.62 32.66 30.82 29.86 32.69L33.4 36.23C37.38 33.39 40 28.99 40 24C40 15.16 32.84 8 24 8Z"
      fill="url(#reloadGrad)"
    />
    <defs>
      <linearGradient id="reloadGrad" x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4ade80" />
        <stop offset="1" stopColor="#16a34a" />
      </linearGradient>
    </defs>
  </svg>
);

const IconEmptyPhotoSlot = () => (
  <svg width="68" height="68" viewBox="0 0 64 64" fill="none" className="opacity-80">
    {/* Tilted back photo */}
    <rect x="18" y="8" width="34" height="42" rx="4" transform="rotate(10 18 8)" stroke="#c084fc" strokeWidth="2.2" strokeDasharray="3 3" fill="none" />
    {/* Front photo */}
    <rect x="11" y="14" width="38" height="44" rx="4" stroke="#a855f7" strokeWidth="2.4" fill="#fdf4ff" fillOpacity="0.6" />
    <circle cx="21" cy="24" r="3.5" stroke="#a855f7" strokeWidth="2" fill="none" />
    <path d="M15 47L25 35L33 43L38 38L45 47" stroke="#a855f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FILTERS: { id: FilterType; label: string; desc: string; cssFilter: string }[] = [
  {
    id: 'cool_pink',
    label: 'Hồng Lạnh',
    desc: 'Trắng hồng phớt nhẹ, nịnh da',
    cssFilter: 'brightness(1.07) contrast(1.04) saturate(1.025) hue-rotate(-3.5deg)'
  },
  {
    id: 'cool_white',
    label: 'Trắng Lạnh',
    desc: 'Trắng trong sáng nét, khử sạch vàng',
    cssFilter: 'brightness(1.06) contrast(1.06) saturate(1.02) hue-rotate(-3deg)'
  },
  {
    id: 'korean_glow',
    label: 'Mềm Mại',
    desc: 'Da mịn Hàn Quốc',
    cssFilter: 'brightness(1.08) contrast(1.02) saturate(1.05) hue-rotate(-5deg)'
  },
  {
    id: 'normal',
    label: 'Bình Thường',
    desc: 'Gốc camera',
    cssFilter: 'none'
  },
  {
    id: 'vintage',
    label: 'Mono (Retro)',
    desc: 'Film hoài niệm',
    cssFilter: 'sepia(25%) contrast(1.08) brightness(0.98)'
  },
  {
    id: 'bw',
    label: 'Đen Trắng',
    desc: 'Studio cổ điển',
    cssFilter: 'grayscale(100%) contrast(1.2) brightness(1.03)'
  },
  {
    id: 'warm_retro',
    label: 'Dazz Classic',
    desc: 'Vintage ấm áp',
    cssFilter: 'sepia(18%) saturate(1.15) hue-rotate(-8deg) brightness(1.03)'
  },
  {
    id: 'cool_cyber',
    label: 'Dazz Instant',
    desc: 'Sắc lạnh hiện đại',
    cssFilter: 'contrast(1.12) hue-rotate(15deg) saturate(1.15)'
  },
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

  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState<number>(timerDuration);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isAutoSequence, setIsAutoSequence] = useState(false);
  const [showFrameModal, setShowFrameModal] = useState(false);
  const [showFrameOverlay, setShowFrameOverlay] = useState(true);
  const [frameViewMode, setFrameViewMode] = useState<'slot_zoom' | 'full'>('slot_zoom');
  const [frameSearch, setFrameSearch] = useState('');
  const [frameCategory, setFrameCategory] = useState('all');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentSlotIndex = Math.min(photos.length, totalRequired - 1);
  const currentFilterObj = FILTERS.find((f) => f.id === filter) || FILTERS[0];

  // Play synthetic camera beep & shutter sounds via Web Audio API
  const playSound = useCallback((type: 'beep' | 'shutter') => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const now = audioCtx.currentTime;

      if (type === 'beep') {
        // Âm bíp ngắn khi đếm ngược 3... 2... 1...
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      } else {
        // Âm thanh khi chụp: 2 tiếng "BÍP! BÍP!" dễ thương kèm tiếng màn trập "TÁCH!"
        // Tiếng bíp 1 (1046Hz - C6)
        const beep1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        beep1.type = 'sine';
        beep1.frequency.setValueAtTime(1046, now);
        gain1.gain.setValueAtTime(0.18, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        beep1.connect(gain1);
        gain1.connect(audioCtx.destination);
        beep1.start(now);
        beep1.stop(now + 0.07);

        // Tiếng bíp 2 (1318Hz - E6 cao hơn, sau 85ms)
        const beep2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        beep2.type = 'sine';
        beep2.frequency.setValueAtTime(1318, now + 0.085);
        gain2.gain.setValueAtTime(0.2, now + 0.085);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
        beep2.connect(gain2);
        gain2.connect(audioCtx.destination);
        beep2.start(now + 0.085);
        beep2.stop(now + 0.17);

        // Tiếng tách màn trập máy ảnh (Camera mechanical snap sau 180ms)
        const bufferSize = Math.floor(audioCtx.sampleRate * 0.08);
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.012));
        }
        const noise = audioCtx.createBufferSource();
        noise.buffer = buffer;
        const filterNode = audioCtx.createBiquadFilter();
        filterNode.type = 'bandpass';
        filterNode.frequency.setValueAtTime(2600, now + 0.18);
        filterNode.Q.setValueAtTime(3, now + 0.18);
        const gainNoise = audioCtx.createGain();
        gainNoise.gain.setValueAtTime(0.28, now + 0.18);
        gainNoise.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
        noise.connect(filterNode);
        filterNode.connect(gainNoise);
        gainNoise.connect(audioCtx.destination);
        noise.start(now + 0.18);
        noise.stop(now + 0.26);
      }
    } catch {
      // AudioContext muted/unsupported
    }
  }, []);

  // Initialize and attach Camera
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);

      // Check if global stream is still active with live tracks
      const isStreamActive =
        globalCameraStream &&
        globalCameraStream.active &&
        globalCameraStream.getVideoTracks().length > 0 &&
        globalCameraStream.getVideoTracks().some((t) => t.readyState === 'live');

      if (!isStreamActive) {
        if (globalCameraStream) {
          globalCameraStream.getTracks().forEach((t) => t.stop());
          globalCameraStream = null;
        }

        globalCameraStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'user',
          },
          audio: false,
        });
      }

      if (videoRef.current && globalCameraStream) {
        videoRef.current.srcObject = globalCameraStream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Không thể mở camera. Vui lòng cấp quyền máy ảnh trên trình duyệt hoặc kiểm tra webcam!');
    }
  }, []);

  // Guarantee startCamera runs whenever camera screen is active (regardless of step name)
  useEffect(() => {
    if (step !== 'customize' && step !== 'result') {
      startCamera();
    }
  }, [step, startCamera]);

  // Synchronously re-attach camera stream and play video whenever video element mounts into DOM
  useEffect(() => {
    if (step !== 'customize' && step !== 'result' && videoRef.current && globalCameraStream && globalCameraStream.active) {
      if (videoRef.current.srcObject !== globalCameraStream) {
        videoRef.current.srcObject = globalCameraStream;
      }
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  });

  // Take snapshot with filter applied directly
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

    // Apply active color grading filter directly to snapshot
    if (currentFilterObj.cssFilter && currentFilterObj.cssFilter !== 'none') {
      ctx.filter = currentFilterObj.cssFilter;
    } else {
      ctx.filter = 'none';
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    setIsFlashing(true);
    playSound('shutter');
    setTimeout(() => setIsFlashing(false), 250);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    addPhoto(dataUrl);
  }, [isMirror, playSound, addPhoto, currentFilterObj]);

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

        if (isAutoSequence && photos.length + 1 < totalRequired) {
          setTimeout(() => {
            setIsCountingDown(true);
            setCountdown(timerDuration);
            playSound('beep');
          }, 1200);
        } else {
          setIsAutoSequence(false);
          if (photos.length + 1 >= totalRequired) {
            setTimeout(() => {
              setStep('customize');
            }, 1200);
          }
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCountingDown, countdown, isAutoSequence, photos.length, totalRequired, timerDuration, playSound, takeSnapshot, setStep]);

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

  // Custom frame file upload in modal
  const handleCustomFrameUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setFrame({
          id: `custom-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ''),
          bgColor: '#ffffff',
          textColor: '#be185d',
          category: 'pastel',
          overlayImage: dataUrl,
        });
        setShowFrameModal(false);
        setShowFrameOverlay(true);
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

  const handleSelectTemplate = (tpl: FrameTemplate) => {
    const svgOverlay = generateFrameOverlaySvg(tpl, layout);
    setFrame({
      id: tpl.id,
      name: tpl.name,
      bgColor: tpl.bgColor,
      textColor: tpl.textColor,
      category: 'pastel',
      overlayImage: tpl.previewImage || svgOverlay,
    });
    setShowFrameModal(false);
    setShowFrameOverlay(true);
  };

  // Ensure active frame always has a valid overlay applied to camera
  useEffect(() => {
    if (!frame.overlayImage) {
      const matchTpl = SAMPLE_FRAMES.find((f) => f.id === frame.id || f.name === frame.name) || SAMPLE_FRAMES[0];
      if (matchTpl) {
        const svgOverlay = generateFrameOverlaySvg(matchTpl, layout);
        setFrame({
          ...frame,
          name: matchTpl.name,
          bgColor: matchTpl.bgColor,
          textColor: matchTpl.textColor,
          overlayImage: svgOverlay,
        });
      }
    }
  }, [frame, layout, setFrame]);

  const filteredModalFrames = SAMPLE_FRAMES.filter((f) => {
    const matchCat = frameCategory === 'all' || f.category === frameCategory;
    const matchSearch = f.name.toLowerCase().includes(frameSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Safe reset handler that guarantees video keeps streaming (MUST BE BEFORE EARLY RETURNS)
  const handleResetPhotos = useCallback(() => {
    resetPhotos();
    setIsCountingDown(false);
    setIsAutoSequence(false);
    if (videoRef.current && globalCameraStream) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      startCamera();
    }
  }, [resetPhotos, startCamera]);

  if (step === 'customize') {
    return <CustomizerStudio />;
  }

  if (step === 'result') {
    return <ResultModal />;
  }

  return (
    <div className="bg-[#fef8f9] min-h-[calc(100vh-80px)] py-3 sm:py-4 px-3 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
        {/* 1. TOP HEADER (PHOTOXINHH SCRIPT & TOOLBAR) */}
        <div className="flex flex-col items-center text-center w-full">
          {/* Top Utility Row on Mobile (Menu & Language & Frame status) */}
          <div className="w-full flex items-center justify-between pb-1 sm:pb-0 sm:absolute sm:top-0 sm:left-0 sm:w-auto z-10">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Mở menu điều hướng"
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-pink-400 text-white font-semibold text-[11px] sm:text-xs shadow-2xs hover:bg-pink-500 transition cursor-pointer active:scale-95"
              >
                <Menu className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Menu</span>
              </button>

              <div
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center gap-0.5 sm:gap-1 px-2 py-1 rounded-full bg-white border border-pink-200 text-pink-600 font-semibold text-[11px] sm:text-xs shadow-2xs cursor-pointer hover:bg-pink-50"
              >
                <span>VN VN</span>
                <ChevronDown className="w-3 h-3 text-pink-400" />
              </div>
            </div>

            {/* Quick mobile frame selector pill */}
            <div className="sm:hidden">
              <button
                onClick={() => setShowFrameModal(true)}
                className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-600 border border-pink-200 font-bold text-[10px] shadow-2xs flex items-center gap-1 truncate max-w-[140px]"
              >
                <span>Khung:</span>
                <span className="truncate">{frame.name}</span>
              </button>
            </div>
          </div>

          {/* Center Brand Title */}
          <div className="space-y-0.5 pt-1">
            <h1 className="font-cursive text-3xl sm:text-5xl text-pink-400 font-normal tracking-wide drop-shadow-2xs">
              PhotoXinhh
            </h1>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-400 font-semibold">
              Capture Memories
            </p>
          </div>

          {/* Controls Bar (Mobile 3-column grid / Desktop inline flex) */}
          <div className="w-full max-w-lg mx-auto grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-6 pt-2.5 sm:pt-3 text-xs">
            {/* Layout Ảnh */}
            <div className="flex flex-col sm:flex-row items-center gap-1">
              <span className="text-[10px] sm:text-xs font-semibold text-pink-500 whitespace-nowrap">Layout</span>
              <select
                value={layout}
                onChange={(e) => {
                  setLayout(e.target.value as LayoutType);
                  handleResetPhotos();
                }}
                className="w-full sm:w-auto px-2 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-white border border-pink-200 text-gray-700 font-medium text-[11px] sm:text-xs shadow-2xs focus:outline-none focus:border-pink-400 cursor-pointer text-center sm:text-left"
              >
                <option value="1x4_strip">1x4 (4 ảnh)</option>
                <option value="2x2_grid">2x2 (4 ảnh)</option>
                <option value="polaroid">Polaroid (1 ảnh)</option>
              </select>
            </div>

            {/* Đếm Ngược */}
            <div className="flex flex-col sm:flex-row items-center gap-1">
              <span className="text-[10px] sm:text-xs font-semibold text-pink-500 whitespace-nowrap">Đếm Ngược</span>
              <select
                value={timerDuration}
                onChange={(e) => setTimerDuration(Number(e.target.value))}
                className="w-full sm:w-auto px-2 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-white border border-pink-200 text-gray-700 font-medium text-[11px] sm:text-xs shadow-2xs focus:outline-none focus:border-pink-400 cursor-pointer text-center sm:text-left"
              >
                <option value={3}>3s</option>
                <option value={5}>5s</option>
                <option value={10}>10s</option>
              </select>
            </div>

            {/* Hỗ Trợ Chụp */}
            <div className="flex flex-col sm:flex-row items-center gap-1">
              <span className="text-[10px] sm:text-xs font-semibold text-pink-500 whitespace-nowrap">Hỗ Trợ Chụp</span>
              <button
                onClick={() => setShowFrameModal(true)}
                className="w-full sm:w-auto px-2 sm:px-3 py-1.5 sm:py-1 rounded-xl sm:rounded-lg bg-pink-100 text-pink-600 border border-pink-200 font-semibold hover:bg-pink-200 transition shadow-2xs flex items-center justify-center gap-1 text-[11px] sm:text-xs cursor-pointer truncate"
              >
                <span>Chọn Khung</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. TWO-COLUMN PHOTOBOOTH STUDIO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start pt-1 sm:pt-2">
          {/* LEFT COLUMN: Camera, Buttons, Filters */}
          <div className="lg:col-span-7 flex flex-col items-center space-y-3 sm:space-y-4 w-full">
            {/* Camera Viewfinder */}
            <div className="relative w-full aspect-[4/3] max-w-lg bg-black rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-white shadow-md shadow-pink-100 flex items-center justify-center">
              {cameraError ? (
                <div className="p-4 sm:p-6 text-center text-rose-500 bg-white rounded-2xl m-3 border border-rose-100 text-xs flex flex-col items-center gap-2">
                  <p className="font-bold">Lỗi Camera</p>
                  <p>{cameraError}</p>
                  <button
                    onClick={() => startCamera()}
                    className="px-3 py-1.5 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition text-xs mt-1"
                  >
                    Bật lại camera
                  </button>
                </div>
              ) : (
                <video
                  ref={(el) => {
                    if (el) {
                      videoRef.current = el;
                      if (globalCameraStream && globalCameraStream.active && el.srcObject !== globalCameraStream) {
                        el.srcObject = globalCameraStream;
                        el.play().catch(() => {});
                      }
                    }
                  }}
                  autoPlay
                  playsInline
                  muted
                  onLoadedMetadata={() => {
                    videoRef.current?.play().catch(() => {});
                  }}
                  onCanPlay={() => {
                    videoRef.current?.play().catch(() => {});
                  }}
                  style={{ filter: currentFilterObj.cssFilter }}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    isMirror ? 'scale-x-[-1]' : ''
                  }`}
                />
              )}

              {/* LIVE FRAME OVERLAY ON CAMERA (MATCHING USER SCREENSHOT & SLOT-BY-SLOT CROPPING) */}
              {showFrameOverlay && (
                <div className="absolute inset-0 pointer-events-none z-10 flex overflow-hidden">
                  {/* Left Indicator Arrow ▼ pointing at active slot */}
                  <div className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center z-20">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-black drop-shadow-sm" />
                  </div>

                  {/* Right Border Strip: ONLY show when NO custom overlayImage uploaded */}
                  {!frame.overlayImage && (
                    <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-9 bg-[#fdfbf7]/92 border-l border-pink-200/70 flex flex-col items-center justify-between py-5 select-none z-20 shadow-xs">
                      <span className="tracking-[0.2em] [writing-mode:vertical-lr] uppercase font-bold text-[10px] text-gray-800 opacity-90">
                        TAKE YOUR MEMORY
                      </span>
                      <span className="font-mono text-xs font-black text-gray-800">
                        54
                      </span>
                    </div>
                  )}

                  {/* Frame Overlay Image: Split and zoom precisely into the current slot */}
                  {frame.overlayImage ? (
                    frameViewMode === 'slot_zoom' ? (
                      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-15">
                        {layout === '1x4_strip' ? (
                          /* Dải 1x4 dọc: Tự động zoom 4x và chuyển góc khớp chính xác ô 1, 2, 3, 4 */
                          <img
                            src={frame.overlayImage}
                            alt="Khung Chụp Hỗ Trợ"
                            style={{
                              transform: `translateY(-${currentSlotIndex * 25}%)`,
                            }}
                            className="w-full h-[400%] max-w-none object-fill pointer-events-none transition-transform duration-500 ease-out"
                          />
                        ) : layout === '2x2_grid' ? (
                          /* Lưới 2x2: Tự động zoom 2x2 và chuyển theo 4 góc phần tư của khung */
                          <img
                            src={frame.overlayImage}
                            alt="Khung Chụp Hỗ Trợ"
                            style={{
                              transform: `translate(-${(currentSlotIndex % 2) * 50}%, -${Math.floor(currentSlotIndex / 2) * 50}%)`,
                            }}
                            className="w-[200%] h-[200%] max-w-none object-fill pointer-events-none transition-transform duration-500 ease-out"
                          />
                        ) : (
                          /* Polaroid: Toàn khung */
                          <img
                            src={frame.overlayImage}
                            alt="Khung Chụp Hỗ Trợ"
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        )}
                      </div>
                    ) : (
                      /* Mode Xem Toàn Bộ Khung */
                      <img
                        src={frame.overlayImage}
                        alt="Khung Chụp Hỗ Trợ"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-15"
                      />
                    )
                  ) : (
                    /* Default Korean Photobooth Border Guide */
                    <div className="absolute inset-0 border-4 border-pink-300/40 pointer-events-none">
                      <div className="absolute top-3 left-12 text-[10px] font-bold text-pink-600 bg-white/85 px-2.5 py-0.5 rounded-full shadow-2xs backdrop-blur-2xs">
                        Khung: {frame.name}
                      </div>
                    </div>
                  )}

                  {/* Indicator Badge: Đang Chụp Ô #... */}
                  {frame.overlayImage && (
                    <div className="absolute top-3 left-12 z-25 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                      <span>Đang căn góc Ô #{currentSlotIndex + 1}/{totalRequired}</span>
                    </div>
                  )}
                </div>
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
              <div className="absolute top-3 left-3 z-20">
                <button
                  className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-xs backdrop-blur-xs transition"
                  title="Flash"
                >
                  <Zap className="w-4 h-4 text-gray-700" />
                </button>
              </div>

              {/* Top-Right: Frame Zoom Mode, Frame Overlay Toggle & Mirror icon */}
              <div className="absolute top-3 right-11 sm:right-12 flex items-center gap-1.5 z-20">
                {frame.overlayImage && (
                  <button
                    onClick={() => setFrameViewMode((prev) => (prev === 'slot_zoom' ? 'full' : 'slot_zoom'))}
                    className="px-2 py-1 rounded-full text-[10px] font-bold shadow-xs backdrop-blur-xs transition bg-white/90 text-pink-600 hover:bg-white cursor-pointer"
                    title="Chuyển đổi giữa phóng to từng ô hoặc xem cả khung"
                  >
                    {frameViewMode === 'slot_zoom' ? '🔍 Zoom Ô' : '📐 Cả Khung'}
                  </button>
                )}

                <button
                  onClick={() => setShowFrameOverlay((prev) => !prev)}
                  className={`px-2 py-1 rounded-full text-[10px] font-bold shadow-xs backdrop-blur-xs transition cursor-pointer ${
                    showFrameOverlay ? 'bg-pink-500 text-white' : 'bg-white/85 text-gray-600 hover:bg-white'
                  }`}
                  title="Bật/Tắt khung xem trước trên camera"
                >
                  {showFrameOverlay ? 'Khung Bật' : 'Khung Tắt'}
                </button>

                <button
                  onClick={toggleMirror}
                  className={`p-2 rounded-full backdrop-blur-xs transition shadow-xs cursor-pointer ${
                    isMirror ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                  title="Lật gương"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Floating Badge: Đã Chụp 0/4 */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                <div className="px-4 py-1 rounded-full bg-[#831843]/85 text-white font-semibold text-xs tracking-wider shadow-sm backdrop-blur-xs">
                  Đã Chụp {photos.length}/{totalRequired}
                </div>
              </div>
            </div>

            {/* THREE ROUND 3D ACTION BUTTONS (EXACTLY MATCHING SAMPLE SCREENSHOT & MOBILE SCALED) */}
            <div className="flex items-center justify-center gap-4 sm:gap-7 pt-1">
              {/* Button 1: Chụp tay (3D Sparkle Camera) */}
              <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                <button
                  onClick={handleManualShot}
                  disabled={isCountingDown || photos.length >= totalRequired}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ffd9e2] hover:bg-[#ffc6d4] text-rose-700 flex items-center justify-center shadow-md shadow-pink-200/50 hover:scale-105 active:scale-95 transition disabled:opacity-50 border-2 border-white/80 cursor-pointer"
                  title="Chụp ngay lập tức"
                >
                  <IconSparkleCam3D />
                </button>
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-700">Chụp tay</span>
              </div>

              {/* Button 2: AUTO (3D Camera + AUTO Text) */}
              <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                <button
                  onClick={handleAutoCapture}
                  disabled={isCountingDown || photos.length >= totalRequired}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-[#ff8da1] to-[#ff5c80] hover:from-[#ff7992] hover:to-[#ff476f] text-white flex flex-col items-center justify-center shadow-lg shadow-pink-400/50 hover:scale-105 active:scale-95 transition disabled:opacity-50 border-2 border-white/80 cursor-pointer"
                  title="Tự động đếm ngược chụp lần lượt"
                >
                  <IconCamera3D />
                  <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-white drop-shadow-xs -mt-0.5">AUTO</span>
                </button>
              </div>

              {/* Button 3: Chụp Lại (3D Green Reload Arrow) */}
              <div className="flex flex-col items-center gap-1 sm:gap-1.5">
                <button
                  onClick={handleResetPhotos}
                  disabled={isCountingDown || photos.length === 0}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#dcfce7] hover:bg-[#bbf7d0] text-emerald-700 flex items-center justify-center shadow-md shadow-emerald-200/50 hover:scale-105 active:scale-95 transition disabled:opacity-50 border-2 border-white/80 cursor-pointer"
                  title="Xóa chụp lại từ đầu"
                >
                  <IconReload3D />
                </button>
                <span className="text-[10px] sm:text-[11px] font-bold text-gray-700">Chụp Lại</span>
              </div>
            </div>

            {/* MINI PHOTO STRIP PREVIEW ON MOBILE (USERS CAN SEE CAPTURED SLOTS WITHOUT SCROLLING DOWN) */}
            <div className="sm:hidden w-full max-w-sm mx-auto bg-white/80 backdrop-blur-xs p-2 rounded-2xl border border-pink-100 shadow-2xs flex items-center justify-between">
              <span className="text-[10px] font-bold text-pink-600 pl-1">
                Ảnh: {photos.length}/{totalRequired}
              </span>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalRequired }).map((_, idx) => {
                  const p = photos[idx];
                  const isCurrent = photos.length === idx;
                  return (
                    <div
                      key={idx}
                      className={`w-9 h-9 rounded-lg border flex items-center justify-center overflow-hidden transition-all ${
                        p
                          ? 'border-pink-400 bg-white shadow-2xs'
                          : isCurrent
                          ? 'border-pink-400 ring-2 ring-pink-300/50 bg-pink-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      {p ? (
                        <img src={p} alt={`Slot ${idx + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[9px] font-bold text-gray-400">#{idx + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Toggle Video Recap & Upload Button */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs font-semibold w-full">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div
                  onClick={toggleVideoRecap}
                  className={`w-8 sm:w-9 h-4.5 sm:h-5 rounded-full transition-colors p-0.5 ${
                    isVideoRecap ? 'bg-pink-400' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-white transition-transform ${
                      isVideoRecap ? 'translate-x-3.5 sm:translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </div>
                <span className="text-[11px] sm:text-xs text-gray-600">Video Recap</span>
              </label>

              <label className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 font-semibold cursor-pointer transition shadow-2xs text-[11px] sm:text-xs">
                <Upload className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
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

            {/* BỘ LỌC MÀU CARD (TOUCH HORIZONTAL SCROLL ON MOBILE) */}
            <div className="w-full max-w-lg bg-white border border-pink-200/90 rounded-2xl p-3 sm:p-3.5 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-600">Bộ lọc màu</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 truncate max-w-[200px]">
                  ✨ {currentFilterObj.label}: {currentFilterObj.desc}
                </span>
              </div>
              <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-0.5 px-0.5 touch-pan-x">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`flex-shrink-0 whitespace-nowrap px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition cursor-pointer ${
                      filter === f.id
                        ? 'bg-pink-400 text-white shadow-2xs font-bold ring-2 ring-pink-300'
                        : 'bg-pink-50/60 text-gray-600 hover:bg-pink-100/60 hover:text-pink-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="text-[10px] sm:text-[11px] text-pink-400 font-normal italic pt-0.5">
                Hiệu ứng hiển thị trực tiếp trên gương và lưu ngay khi chụp
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DYNAMIC LAYOUT PREVIEW (1x4 STRIP, 2x2 GRID, OR POLAROID) */}
          <div className="lg:col-span-5 flex flex-col space-y-3 w-full">
            {/* Layout title & indicator */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <span>Khung Ảnh:</span>
                <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 text-[11px] font-extrabold">
                  {layout === '1x4_strip' ? 'Dải Dọc 1x4' : layout === '2x2_grid' ? 'Lưới Vuông 2x2' : 'Khung Polaroid'}
                </span>
              </span>
              <span className="text-[11px] text-pink-500 font-semibold">
                {photos.length}/{totalRequired} đã chụp
              </span>
            </div>

            {/* Layout 1: Polaroid View (1 Large Photo Card with bottom white border) */}
            {layout === 'polaroid' ? (
              <div className="bg-white border-2 border-pink-200 rounded-3xl p-4 pb-6 shadow-sm flex flex-col items-center max-w-xs mx-auto w-full transition-all">
                <div className="w-full aspect-square bg-[#fcf8fa] rounded-2xl border border-dashed border-pink-200 flex flex-col items-center justify-center relative overflow-hidden group">
                  {photos[0] ? (
                    <div className="w-full h-full relative">
                      <img
                        src={photos[0]}
                        alt="Ảnh Polaroid"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        onClick={() => removePhotoAtSlot(0)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-rose-500 transition shadow-xs text-xs"
                        title="Xóa ảnh này"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 space-y-2 text-center">
                      <IconEmptyPhotoSlot />
                      <label className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-blue-600 border border-blue-200 text-xs font-semibold cursor-pointer transition shadow-2xs mt-2">
                        <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
                        <span>Upload Ảnh</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleSlotUpload(0, e)}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Polaroid Signature Bottom Chin */}
                <div className="w-full pt-4 flex flex-col items-center text-center">
                  <div className="font-cursive text-xl text-pink-400 drop-shadow-2xs">
                    PhotoXinhh Polaroid
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">
                    {new Date().toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>
            ) : layout === '2x2_grid' ? (
              /* Layout 2: 2x2 Grid View (2 Columns x 2 Rows) */
              <div className="grid grid-cols-2 gap-3 w-full">
                {Array.from({ length: 4 }).map((_, slotIndex) => {
                  const photo = photos[slotIndex];
                  const isCurrentSlot = photos.length === slotIndex;

                  return (
                    <div
                      key={slotIndex}
                      className={`bg-white border-2 rounded-2xl p-3 flex flex-col items-center justify-center aspect-[4/3] shadow-2xs relative overflow-hidden transition-all ${
                        isCurrentSlot
                          ? 'border-pink-400 ring-2 ring-pink-300/40 bg-pink-50/10'
                          : 'border-pink-200'
                      }`}
                    >
                      {/* Slot number badge */}
                      <div className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-pink-100/90 text-pink-600 text-[10px] font-black flex items-center justify-center shadow-2xs">
                        {slotIndex + 1}
                      </div>

                      {photo ? (
                        <div className="w-full h-full relative flex items-center justify-center">
                          <img
                            src={photo}
                            alt={`Ảnh ô #${slotIndex + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                          <button
                            onClick={() => removePhotoAtSlot(slotIndex)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-rose-500 transition text-[10px]"
                            title="Xóa ảnh này"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-1.5 text-center">
                          <div className="w-12 h-12 flex items-center justify-center text-purple-400 scale-90">
                            <IconEmptyPhotoSlot />
                          </div>

                          <label className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50/80 hover:bg-blue-100 text-blue-600 border border-blue-200 text-[11px] font-semibold cursor-pointer transition shadow-2xs">
                            <ImageIcon className="w-3 h-3 text-blue-500" />
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
              </div>
            ) : (
              /* Layout 3: 1x4 Vertical Strip View (4 Slots in 1 Column) */
              <div className="flex flex-col space-y-3 w-full">
                {Array.from({ length: 4 }).map((_, slotIndex) => {
                  const photo = photos[slotIndex];
                  const isCurrentSlot = photos.length === slotIndex;

                  return (
                    <div
                      key={slotIndex}
                      className={`bg-white border-2 rounded-2xl p-3 flex flex-col items-center justify-center min-h-[130px] shadow-2xs relative overflow-hidden transition-all ${
                        isCurrentSlot
                          ? 'border-pink-400 ring-2 ring-pink-300/40 bg-pink-50/10'
                          : 'border-pink-200'
                      }`}
                    >
                      {/* Slot number badge */}
                      <div className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-pink-100/90 text-pink-600 text-[10px] font-black flex items-center justify-center shadow-2xs">
                        {slotIndex + 1}
                      </div>

                      {photo ? (
                        <div className="w-full h-full flex flex-col items-center">
                          <img
                            src={photo}
                            alt={`Ảnh ô #${slotIndex + 1}`}
                            className="w-full max-h-32 object-contain rounded-xl shadow-xs"
                          />
                          <button
                            onClick={() => removePhotoAtSlot(slotIndex)}
                            className="mt-1 text-[11px] text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            <span>Xóa ảnh này</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-1 space-y-1.5 text-center">
                          <div className="w-14 h-14 flex items-center justify-center text-purple-400">
                            <IconEmptyPhotoSlot />
                          </div>

                          <label className="flex items-center gap-1.5 px-3.5 py-1 rounded-xl bg-blue-50/80 hover:bg-blue-100 text-blue-600 border border-blue-200 text-xs font-semibold cursor-pointer transition shadow-2xs">
                            <ImageIcon className="w-3.5 h-3.5 text-blue-500" />
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
              </div>
            )}

            {/* When all photos ready -> Next Step Button (Responsive Desktop + Mobile Sticky Floating Bar) */}
            {photos.length >= totalRequired && (
              <>
                {/* Desktop Inline Button */}
                <button
                  onClick={() => setStep('customize')}
                  className="w-full hidden sm:flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold text-sm shadow-md shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition cursor-pointer"
                >
                  <span>✨ Chọn Khung & Xuất Ảnh (300 DPI)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Mobile Sticky Floating Bottom Bar */}
                <div className="sm:hidden fixed bottom-3 left-3 right-3 z-40 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-pink-200">
                  <button
                    onClick={() => setStep('customize')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold text-sm shadow-md active:scale-95 transition cursor-pointer"
                  >
                    <span>✨ Chọn Khung & Xuất Ảnh (300 DPI)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. MODAL: "CHỌN KHUNG HỖ TRỢ CHỤP" (CHUẨN 100% NHƯ TRANG MẪU) */}
      {showFrameModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-5xl w-full border border-pink-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Chọn Khung Hỗ Trợ Chụp</h3>
                <p className="text-xs text-emerald-600 font-medium mt-1">
                  Tính năng này giúp bạn xem trước khung và căn chỉnh góc chụp dễ dàng hơn (Chỉ Hoạt Động Với Layout 1x1 hoặc 1x4).
                </p>
              </div>
              <button
                onClick={() => setShowFrameModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Filter Dropdown & Search Bar */}
            <div className="px-5 pt-3 pb-2 space-y-2.5">
              <div className="relative">
                <select
                  value={frameCategory}
                  onChange={(e) => setFrameCategory(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-gray-700 focus:outline-none focus:border-pink-400 cursor-pointer"
                >
                  <option value="all">Tất Cả Frame</option>
                  <option value="basic">Khung Cơ Bản</option>
                  <option value="cute">Cute & Pastel</option>
                  <option value="kpop">Idol K-Pop</option>
                  <option value="cartoon">Hoạt Hình & Anime</option>
                  <option value="retro">Vintage & Y2K</option>
                </select>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={frameSearch}
                  onChange={(e) => setFrameSearch(e.target.value)}
                  placeholder="Tìm tên khung hoặc nametag..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>

            {/* Modal Frames Grid */}
            <div className="p-5 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-[60vh]">
              {/* Card 1: Upload Your Own Frame */}
              <label className="border-2 border-dashed border-gray-300 hover:border-pink-400 rounded-xl p-2.5 flex flex-col items-center justify-center text-center cursor-pointer bg-gray-50/60 hover:bg-pink-50/40 transition aspect-[1/3]">
                <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 mb-1.5 shadow-2xs">
                  <Upload className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold text-gray-600 leading-tight">
                  Tải lên khung của bạn
                </span>
                <input
                  type="file"
                  accept="image/png,image/webp"
                  className="hidden"
                  onChange={handleCustomFrameUpload}
                />
              </label>

              {/* Other Frame Cards */}
              {filteredModalFrames.map((tpl) => {
                const isCurrent = frame.id === tpl.id;

                return (
                  <div
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl)}
                    className={`rounded-xl border p-2 flex flex-col items-center justify-between cursor-pointer transition aspect-[1/3] relative ${
                      isCurrent
                        ? 'border-pink-500 bg-pink-50/70 shadow-xs ring-1 ring-pink-400'
                        : 'border-gray-200 hover:border-pink-300 bg-white hover:shadow-2xs'
                    }`}
                  >
                    {/* Simulated 4-cut vertical strip frame thumbnail */}
                    <div
                      className="w-full flex-1 rounded-md p-1 flex flex-col justify-between shadow-2xs border border-black/10 overflow-hidden"
                      style={{ backgroundColor: tpl.bgColor }}
                    >
                      {/* 4 Transparent/white photo cutout slots */}
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-full flex-1 my-0.5 rounded-xs bg-white/70 border border-black/10 flex items-center justify-center text-[7px] text-gray-300 font-bold"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    <div className="text-[10px] font-medium text-gray-700 truncate w-full text-center mt-1">
                      {tpl.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenFrameModal={() => setShowFrameModal(true)}
        onResetPhotos={handleResetPhotos}
      />
    </div>
  );
};
