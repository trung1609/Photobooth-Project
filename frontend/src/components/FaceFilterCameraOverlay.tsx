import React from 'react';
import { FaceFilterType } from '../utils/faceFilterEngine';

interface FaceFilterCameraOverlayProps {
  filterId: FaceFilterType;
  pos: { x: number; y: number; scale: number };
  isMirror?: boolean;
}

export const FaceFilterCameraOverlay: React.FC<FaceFilterCameraOverlayProps> = ({ filterId, pos, isMirror = false }) => {
  if (filterId === 'none') return null;

  // Position coordinates in percentage
  const leftPct = pos.x * 100;
  const topPct = pos.y * 100;
  const scale = pos.scale || 1.0;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-25"
      style={{ willChange: 'transform' }}
    >
      <div
        className="absolute transition-all duration-75"
        style={{
          left: `${leftPct}%`,
          top: `${topPct}%`,
          transform: `translate(-50%, -50%) scale(${scale}) ${isMirror ? 'scaleX(-1)' : ''}`,
          width: 'clamp(200px, 65vw, 280px)',
          height: 'clamp(200px, 65vw, 280px)',
        }}
      >
        {filterId === 'bunny' && (
          <div className="relative w-full h-full animate-pulse-gentle">
            {/* Left Bunny Ear */}
            <div className="absolute -top-24 left-6 w-14 h-36 bg-white border-2 border-pink-200 rounded-full rotate-[-12deg] shadow-md overflow-hidden flex items-center justify-center">
              <div className="w-7 h-28 bg-pink-400 rounded-full" />
            </div>
            {/* Right Bunny Ear */}
            <div className="absolute -top-24 right-6 w-14 h-36 bg-white border-2 border-pink-200 rounded-full rotate-[15deg] shadow-md overflow-hidden flex items-center justify-center">
              <div className="w-7 h-28 bg-pink-400 rounded-full" />
            </div>
            {/* Cheeks */}
            <div className="absolute top-36 left-0 w-16 h-12 bg-pink-400/40 rounded-full blur-xs flex items-center justify-center text-white font-bold text-xs">
              ♡
            </div>
            <div className="absolute top-36 right-0 w-16 h-12 bg-pink-400/40 rounded-full blur-xs flex items-center justify-center text-white font-bold text-xs">
              ♡
            </div>
            {/* Nose */}
            <div className="absolute top-32 left-1/2 -translate-x-1/2 w-4 h-3 bg-pink-500 rounded-full" />
          </div>
        )}

        {filterId === 'cat' && (
          <div className="relative w-full h-full">
            {/* Left Cat Ear */}
            <div className="absolute -top-14 left-8 w-16 h-16 bg-white border-2 border-pink-300 rotate-[-20deg] shadow-md rounded-t-3xl rounded-br-3xl overflow-hidden flex items-center justify-center">
              <div className="w-9 h-9 bg-rose-300 rounded-t-2xl" />
            </div>
            {/* Right Cat Ear */}
            <div className="absolute -top-14 right-8 w-16 h-16 bg-white border-2 border-pink-300 rotate-[20deg] shadow-md rounded-t-3xl rounded-bl-3xl overflow-hidden flex items-center justify-center">
              <div className="w-9 h-9 bg-rose-300 rounded-t-2xl" />
            </div>
            {/* Whiskers */}
            <div className="absolute top-32 -left-4 flex flex-col gap-1.5 rotate-[-8deg]">
              <div className="w-12 h-0.5 bg-slate-800 rounded-full" />
              <div className="w-14 h-0.5 bg-slate-800 rounded-full" />
              <div className="w-12 h-0.5 bg-slate-800 rounded-full" />
            </div>
            <div className="absolute top-32 -right-4 flex flex-col gap-1.5 rotate-[8deg]">
              <div className="w-12 h-0.5 bg-slate-800 rounded-full" />
              <div className="w-14 h-0.5 bg-slate-800 rounded-full" />
              <div className="w-12 h-0.5 bg-slate-800 rounded-full" />
            </div>
            {/* Nose & Blush */}
            <div className="absolute top-32 left-1/2 -translate-x-1/2 w-4 h-3 bg-rose-500 rounded-full" />
            <div className="absolute top-36 left-4 w-12 h-9 bg-pink-400/40 rounded-full blur-xs" />
            <div className="absolute top-36 right-4 w-12 h-9 bg-pink-400/40 rounded-full blur-xs" />
          </div>
        )}

        {filterId === 'bear' && (
          <div className="relative w-full h-full">
            {/* Round Bear Ears */}
            <div className="absolute -top-12 left-4 w-18 h-18 bg-amber-700 border-2 border-amber-900 rounded-full shadow-md flex items-center justify-center">
              <div className="w-10 h-10 bg-amber-200 rounded-full" />
            </div>
            <div className="absolute -top-12 right-4 w-18 h-18 bg-amber-700 border-2 border-amber-900 rounded-full shadow-md flex items-center justify-center">
              <div className="w-10 h-10 bg-amber-200 rounded-full" />
            </div>
            {/* Bear Snout & Blush */}
            <div className="absolute top-30 left-1/2 -translate-x-1/2 w-14 h-10 bg-amber-100 rounded-full border border-amber-300 flex items-center justify-center">
              <div className="w-4 h-2.5 bg-amber-950 rounded-full -mt-2" />
            </div>
            <div className="absolute top-36 left-4 w-14 h-10 bg-amber-400/45 rounded-full blur-xs" />
            <div className="absolute top-36 right-4 w-14 h-10 bg-amber-400/45 rounded-full blur-xs" />
          </div>
        )}

        {filterId === 'princess' && (
          <div className="relative w-full h-full">
            {/* Sparkling Tiara */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-5xl filter drop-shadow-md select-none animate-bounce-gentle">
              👑
            </div>
            <div className="absolute -top-10 left-10 text-2xl animate-spin-slow">✨</div>
            <div className="absolute -top-10 right-10 text-2xl animate-spin-slow">✨</div>
            {/* Rose Highlighter Blush */}
            <div className="absolute top-36 left-4 w-14 h-10 bg-pink-400/40 rounded-full blur-xs flex items-center justify-center text-yellow-300 text-xs">
              ✨
            </div>
            <div className="absolute top-36 right-4 w-14 h-10 bg-pink-400/40 rounded-full blur-xs flex items-center justify-center text-yellow-300 text-xs">
              ✨
            </div>
          </div>
        )}

        {filterId === 'heart_glasses' && (
          <div className="relative w-full h-full">
            {/* Y2K Heart Sunglasses */}
            <div className="absolute top-22 left-1/2 -translate-x-1/2 flex items-center gap-4 text-5xl filter drop-shadow-lg select-none">
              <span className="scale-x-[-1] text-rose-500 drop-shadow-md">💖</span>
              <span className="text-rose-500 drop-shadow-md">💖</span>
            </div>
            <div className="absolute top-20 left-10 text-xl">⭐</div>
            <div className="absolute top-20 right-10 text-xl">⭐</div>
          </div>
        )}

        {filterId === 'butterfly' && (
          <div className="relative w-full h-full">
            {/* Monarch Butterflies */}
            <div className="absolute -top-6 -left-4 text-4xl filter drop-shadow-md select-none animate-float-left">
              🦋
            </div>
            <div className="absolute -top-4 -right-4 text-4xl filter drop-shadow-md select-none animate-float-right">
              🦋
            </div>
            <div className="absolute top-36 left-4 w-14 h-10 bg-rose-400/40 rounded-full blur-xs" />
            <div className="absolute top-36 right-4 w-14 h-10 bg-rose-400/40 rounded-full blur-xs" />
          </div>
        )}

        {filterId === 'party' && (
          <div className="relative w-full h-full">
            {/* Party Birthday Cone Hat */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 text-6xl filter drop-shadow-lg select-none rotate-[8deg]">
              🥳
            </div>
            <div className="absolute -top-10 -left-2 text-2xl">🎉</div>
            <div className="absolute -top-10 -right-2 text-2xl">⭐</div>
          </div>
        )}

        {filterId === 'idol_blush' && (
          <div className="relative w-full h-full">
            {/* K-Pop Idol Blush & Sparkles */}
            <div className="absolute top-32 left-2 w-18 h-12 bg-rose-400/50 rounded-full blur-xs flex items-center justify-center">
              <span className="text-white font-black text-sm">✦</span>
            </div>
            <div className="absolute top-32 right-2 w-18 h-12 bg-rose-400/50 rounded-full blur-xs flex items-center justify-center">
              <span className="text-white font-black text-sm">✦</span>
            </div>
            <div className="absolute top-26 right-8 text-rose-500 text-xs font-bold">♡</div>
          </div>
        )}

        {filterId === 'puppy' && (
          <div className="relative w-full h-full">
            {/* Puppy Ears */}
            <div className="absolute -top-4 -left-6 text-6xl filter drop-shadow-md select-none rotate-[-15deg]">
              🐕
            </div>
            <div className="absolute top-32 left-1/2 -translate-x-1/2 w-5 h-4 bg-slate-900 rounded-full" />
            <div className="absolute top-38 left-1/2 -translate-x-1/2 w-4 h-3 bg-rose-500 rounded-b-full" />
          </div>
        )}

        {filterId === 'devil' && (
          <div className="relative w-full h-full">
            {/* Kuromi Devil Horns */}
            <div className="absolute -top-12 left-6 text-4xl filter drop-shadow-md select-none rotate-[-20deg]">
              😈
            </div>
            <div className="absolute -top-12 right-6 text-4xl filter drop-shadow-md select-none rotate-[20deg]">
              😈
            </div>
            <div className="absolute top-36 left-4 w-14 h-10 bg-purple-500/40 rounded-full blur-xs flex items-center justify-center text-purple-900 text-xs">
              🖤
            </div>
            <div className="absolute top-36 right-4 w-14 h-10 bg-purple-500/40 rounded-full blur-xs flex items-center justify-center text-purple-900 text-xs">
              🖤
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
