import React from 'react';
import { Navbar } from './components/Navbar';
import { LayoutSelector } from './components/LayoutSelector';
import { CameraStudio } from './components/CameraStudio';
import { CustomizerStudio } from './components/CustomizerStudio';
import { ResultModal } from './components/ResultModal';
import { useBoothStore } from './store/useBoothStore';

export const App: React.FC = () => {
  const { step } = useBoothStore();

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center">
        {step === 'select_layout' && <LayoutSelector />}
        {step === 'capture' && <CameraStudio />}
        {step === 'customize' && <CustomizerStudio />}
        {step === 'result' && <ResultModal />}
      </main>

      <footer className="w-full border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>© 2026 PhotoXinhh • Photobooth Online Miễn Phí • Không Lưu Ảnh Riêng Tư • Chuẩn 300 DPI</p>
      </footer>
    </div>
  );
};

export default App;
