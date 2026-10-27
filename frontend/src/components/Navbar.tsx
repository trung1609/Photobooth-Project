import React from 'react';
import { Camera, Sparkles, RotateCcw } from 'lucide-react';
import { useBoothStore } from '../store/useBoothStore';

export const Navbar: React.FC = () => {
  const { step, setStep, resetPhotos } = useBoothStore();

  const handleRestart = () => {
    if (confirm('Bạn có chắc muốn bắt đầu lại phiên chụp mới?')) {
      resetPhotos();
      setStep('select_layout');
    }
  };

  return (
    <header className="w-full border-b border-pink-500/20 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setStep('select_layout')}>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-pink-400 via-rose-300 to-purple-300 bg-clip-text text-transparent">
            PhotoXinhh
          </span>
          <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold uppercase tracking-wider">
            Online Booth
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-2 sm:gap-4">
        {step !== 'select_layout' && (
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chụp Lại Từ Đầu</span>
          </button>
        )}

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span>Khung Hot Trend 2026</span>
        </div>
      </nav>
    </header>
  );
};
