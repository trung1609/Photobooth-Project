import React from 'react';
import { LayoutSelector } from '../components/LayoutSelector';
import { CameraStudio } from '../components/CameraStudio';
import { CustomizerStudio } from '../components/CustomizerStudio';
import { ResultModal } from '../components/ResultModal';
import { useBoothStore } from '../store/useBoothStore';

export const BoothAppPage: React.FC = () => {
  const { step } = useBoothStore();

  return (
    <div className="min-h-[calc(100vh-130px)] flex flex-col justify-center py-6 bg-gradient-to-br from-pink-50/60 via-white to-purple-50/40 text-gray-800">
      {step === 'select_layout' && <LayoutSelector />}
      {step === 'capture' && <CameraStudio />}
      {step === 'customize' && <CustomizerStudio />}
      {step === 'result' && <ResultModal />}
    </div>
  );
};
