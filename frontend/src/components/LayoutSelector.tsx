import React from 'react';
import { Columns, Grid2X2, Sparkles, Camera, Upload, Timer } from 'lucide-react';
import { useBoothStore } from '../store/useBoothStore';
import { LayoutType } from '../types/photobooth';

export const LayoutSelector: React.FC = () => {
  const { layout, setLayout, timerDuration, setTimerDuration, setStep, setPhotos } = useBoothStore();

  const layouts: { id: LayoutType; name: string; desc: string; icon: React.ReactNode; count: number }[] = [
    {
      id: '1x4_strip',
      name: 'Dải Film Dọc (1x4 Strip)',
      desc: 'Bố cục kinh điển Life4Cuts Hàn Quốc, 4 ô ảnh dọc tuyệt đẹp',
      icon: <Columns className="w-8 h-8 text-pink-400" />,
      count: 4,
    },
    {
      id: '2x2_grid',
      name: 'Lưới Vuông (2x2 Grid)',
      desc: 'Bố cục 4 ô vuông cân đối, phù hợp chụp couple & nhóm bạn',
      icon: <Grid2X2 className="w-8 h-8 text-purple-400" />,
      count: 4,
    },
    {
      id: 'polaroid',
      name: 'Khung Đơn Polaroid',
      desc: 'Khung ảnh retro cổ điển với viền dưới rộng để ghi chú',
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      count: 1,
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadedUrls: string[] = [];
    const maxPhotos = layout === 'polaroid' ? 1 : 4;
    const filesToRead = Array.from(files).slice(0, maxPhotos);

    let readCount = 0;
    filesToRead.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          uploadedUrls.push(event.target.result as string);
        }
        readCount++;
        if (readCount === filesToRead.length) {
          setPhotos(uploadedUrls);
          setStep('customize');
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-semibold mb-6 animate-pulse">
        <Sparkles className="w-4 h-4" />
        <span>Trải Nghiệm Photobooth Trực Tuyến Đẹp Như Tiệm</span>
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
        Chọn Bố Cục <span className="text-pink-400">Khung Ảnh</span> Yêu Thích
      </h1>
      <p className="text-slate-400 text-sm md:text-base max-w-xl mb-10">
        Chụp ảnh 4 ô lấy liền, áp dụng bộ lọc màu Hàn Quốc và tải về miễn phí chất lượng cao không watermark.
      </p>

      {/* Layout Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-10">
        {layouts.map((item) => {
          const isSelected = layout === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setLayout(item.id)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800 border-2 border-pink-500 shadow-xl shadow-pink-500/20 scale-[1.02]'
                  : 'bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div>
                <div className="p-3 w-fit rounded-xl bg-slate-900/80 mb-4 border border-slate-700">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{item.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{item.desc}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-t border-slate-700/50 pt-3">
                <span>Số lượng ảnh:</span>
                <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">
                  {item.count} tấm
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timer Settings */}
      <div className="w-full max-w-md bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 mb-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Timer className="w-5 h-5 text-pink-400" />
          <div className="text-left">
            <div className="text-sm font-bold text-white">Thời gian đếm ngược</div>
            <div className="text-xs text-slate-400">Thời gian tạo dáng mỗi tấm</div>
          </div>
        </div>

        <div className="flex gap-2">
          {[3, 5, 10].map((sec) => (
            <button
              key={sec}
              onClick={() => setTimerDuration(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                timerDuration === sec
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
        <button
          onClick={() => setStep('capture')}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold hover:shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Camera className="w-5 h-5" />
          <span>Bật Camera Chụp Ngay</span>
        </button>

        <label className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold cursor-pointer transition-all hover:scale-[1.02]">
          <Upload className="w-5 h-5 text-pink-400" />
          <span>Tải Ảnh Có Sẵn</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileUpload}
          />
        </label>
      </div>
    </div>
  );
};
