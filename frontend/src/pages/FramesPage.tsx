import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search, Camera } from 'lucide-react';
import { SAMPLE_FRAMES, FrameTemplate } from '../data/framesData';
import { useBoothStore, FRAME_PRESETS } from '../store/useBoothStore';

export const FramesPage: React.FC = () => {
  const navigate = useNavigate();
  const { setFrame, setLayout, setStep } = useBoothStore();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Tất Cả' },
    { id: 'cute', label: 'Cute & Pastel' },
    { id: 'kpop', label: 'Idol K-Pop' },
    { id: 'cartoon', label: 'Hoạt Hình & Anime' },
    { id: 'retro', label: 'Retro & Vintage' },
    { id: 'basic', label: 'Khung Cơ Bản' },
  ];

  const filteredFrames = SAMPLE_FRAMES.filter((f) => {
    const matchCat = activeCategory === 'all' || f.category === activeCategory;
    const matchSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.author && f.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f.badge && f.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleSelectFrame = (template: FrameTemplate) => {
    // Map template to booth store frame
    const matchedPreset = FRAME_PRESETS.find((p) => p.id === template.id) || {
      id: template.id,
      name: template.name,
      bgColor: template.bgColor,
      textColor: template.textColor,
      category: 'pastel',
      overlayImage: template.previewImage,
    };

    setFrame(matchedPreset);
    setLayout(template.layout);
    setStep('capture');
    navigate('/app');
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Thư Viện Khung Photobooth 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Khám Phá Các Mẫu Khung Hot Nhất
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Hàng trăm mẫu khung ảnh được cập nhật theo xu hướng TikTok, K-pop và phong cách Life4Cuts Hàn Quốc.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-pink-100 shadow-sm">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-pink-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm mẫu khung..."
              className="w-full pl-9 pr-4 py-2 rounded-full text-xs bg-gray-50 border border-gray-200 focus:outline-none focus:border-pink-500 transition"
            />
          </div>
        </div>

        {/* Frames Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {filteredFrames.map((frame) => (
            <div
              key={frame.id}
              className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Frame Card Preview Area (No more broken images / dark backgrounds) */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-pink-50/70 via-purple-50/30 to-pink-50/70 flex items-center justify-center p-4">
                {frame.previewImage ? (
                  <img
                    src={frame.previewImage}
                    alt={frame.name}
                    className="max-h-full max-w-full object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  /* High fidelity 1x4 Photobooth Strip Mockup */
                  <div
                    className="w-36 h-full max-h-[300px] rounded-xl p-2 flex flex-col justify-between shadow-lg border border-black/10 group-hover:scale-105 transition-transform duration-300 overflow-hidden"
                    style={{ backgroundColor: frame.bgColor }}
                  >
                    {/* Header preview */}
                    <div
                      className="text-[9px] font-extrabold text-center truncate pt-0.5 leading-tight"
                      style={{ color: frame.textColor }}
                    >
                      {frame.headerEmoji || frame.name}
                    </div>

                    {/* 4 Photo Cutout Slots */}
                    <div className="flex-1 my-2 flex flex-col justify-between gap-1.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="w-full flex-1 rounded-sm bg-white/85 border border-black/10 flex items-center justify-center text-[9px] text-gray-400 font-bold shadow-2xs"
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Footer preview */}
                    <div
                      className="text-[8px] font-semibold text-center truncate pb-0.5 leading-tight opacity-80"
                      style={{ color: frame.textColor }}
                    >
                      {frame.footerEmoji || 'PhotoXinhh'}
                    </div>
                  </div>
                )}

                {/* Badge (e.g. HOT, APPLE, NEWS, PIXAR, RAP, ARMY) */}
                {frame.badge && (
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-pink-500 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md z-10">
                    {frame.badge}
                  </div>
                )}
              </div>

              {/* Card Meta & Action */}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-gray-900 group-hover:text-pink-600 transition">
                    {frame.name}
                  </h3>
                  <div
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-xs"
                    style={{ backgroundColor: frame.bgColor }}
                    title={`Màu nền: ${frame.bgColor}`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>
                    Bố cục:{' '}
                    <strong className="text-gray-800">
                      {frame.layout === '1x4_strip' ? 'Dải 4 ô (1x4)' : frame.layout === '2x2_grid' ? 'Lưới vuông (2x2)' : 'Polaroid'}
                    </strong>
                  </span>
                  <span>{frame.author}</span>
                </div>

                <button
                  onClick={() => handleSelectFrame(frame)}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs hover:shadow-lg hover:shadow-pink-500/25 transition active:scale-95 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Chụp Ngay Với Khung Này</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Frame Banner CTA */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-8 sm:p-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-pink-500/20">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Bạn có khung ảnh riêng của mình?</h3>
            <p className="text-pink-100 text-xs sm:text-sm leading-relaxed">
              Tự tải file PNG khung ảnh trong suốt của thần tượng hoặc thương hiệu cá nhân để chụp ngay lập tức mà không tốn phí.
            </p>
          </div>
          <button
            onClick={() => navigate('/privateframe')}
            className="px-8 py-3.5 rounded-full bg-white text-pink-600 font-extrabold text-sm hover:bg-pink-50 hover:scale-105 active:scale-95 transition shadow-lg whitespace-nowrap cursor-pointer"
          >
            Hướng Dẫn & Tải Khung Lên
          </button>
        </div>
      </div>
    </div>
  );
};
