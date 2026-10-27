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
      icon: <Columns className="w-6 h-6 text-pink-500" />,
      count: 4,
    },
    {
      id: '2x2_grid',
      name: 'Lưới Vuông (2x2 Grid)',
      desc: 'Bố cục 4 ô vuông cân đối, phù hợp chụp couple & nhóm bạn',
      icon: <Grid2X2 className="w-6 h-6 text-purple-500" />,
      count: 4,
    },
    {
      id: 'polaroid',
      name: 'Khung Đơn Polaroid',
      desc: 'Khung ảnh retro cổ điển với viền dưới rộng để ghi chú',
      icon: <Sparkles className="w-6 h-6 text-amber-500" />,
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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-10 flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-medium mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Trải Nghiệm Photobooth Trực Tuyến Đẹp Như Tiệm</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-800 mb-2">
        Chọn Bố Cục <span className="text-pink-600">Khung Ảnh</span> Yêu Thích
      </h1>
      <p className="text-gray-500 text-xs sm:text-sm max-w-md mb-8 font-normal">
        Chụp ảnh lấy liền, áp dụng bộ lọc màu Hàn Quốc và tải về miễn phí chất lượng cao không watermark.
      </p>

      {/* Layout Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mb-8">
        {layouts.map((item) => {
          const isSelected = layout === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setLayout(item.id)}
              className={`relative cursor-pointer rounded-2xl p-5 transition-all duration-300 text-left flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-2 border-pink-500 shadow-md shadow-pink-100 scale-[1.02]'
                  : 'bg-white/80 border border-pink-100 hover:border-pink-300 hover:bg-white shadow-2xs'
              }`}
            >
              <div>
                <div className="p-2.5 w-fit rounded-xl bg-pink-50 mb-3 border border-pink-100">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">{item.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 font-normal">{item.desc}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-normal text-gray-500 border-t border-pink-50 pt-3">
                <span>Số lượng ảnh:</span>
                <span className="px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 font-medium">
                  {item.count} tấm
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timer Settings */}
      <div className="w-full max-w-md bg-white border border-pink-100 rounded-2xl p-4 mb-8 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500">
            <Timer className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold text-gray-800">Thời gian đếm ngược</div>
            <div className="text-[11px] text-gray-400 font-normal">Thời gian tạo dáng mỗi tấm</div>
          </div>
        </div>

        <div className="flex gap-1.5">
          {[3, 5, 10].map((sec) => (
            <button
              key={sec}
              onClick={() => setTimerDuration(sec)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                timerDuration === sec
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md justify-center">
        <button
          onClick={() => setStep('capture')}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-xs sm:text-sm hover:shadow-md hover:shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Camera className="w-4 h-4" />
          <span>Bật Camera Chụp Ngay</span>
        </button>

        <label className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-gray-700 font-medium text-xs sm:text-sm cursor-pointer transition-all hover:scale-[1.02] shadow-2xs">
          <Upload className="w-4 h-4 text-pink-500" />
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
