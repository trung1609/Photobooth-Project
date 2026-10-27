import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Sparkles, CheckCircle2, Camera } from 'lucide-react';
import { useBoothStore } from '../store/useBoothStore';

export const PrivateFramePage: React.FC = () => {
  const navigate = useNavigate();
  const { setFrame, setStep } = useBoothStore();

  const [uploadedFrameUrl, setUploadedFrameUrl] = useState<string | null>(null);
  const [frameName, setFrameName] = useState('Khung Tự Thiết Kế');

  const handleFrameUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedFrameUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUseCustomFrame = () => {
    if (!uploadedFrameUrl) return;

    setFrame({
      id: `custom-${Date.now()}`,
      name: frameName || 'Khung Cá Nhân',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      category: 'idol',
    });
    setStep('capture');
    navigate('/app');
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>DIY Photobooth Frame</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Hướng Dẫn & Tải Khung Ảnh Riêng
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Tự thiết kế khung ảnh thần tượng K-pop, sinh nhật hoặc thương hiệu của bạn và chụp ngay trên PhotoXinhh hoàn toàn miễn phí.
          </p>
        </div>

        {/* Upload Box */}
        <div className="bg-white rounded-3xl border-2 border-dashed border-pink-300 p-8 sm:p-12 text-center shadow-lg shadow-pink-100/40 relative">
          {uploadedFrameUrl ? (
            <div className="flex flex-col items-center gap-6">
              <div className="max-h-80 overflow-hidden rounded-2xl border border-pink-200 shadow-md p-2 bg-slate-900">
                <img
                  src={uploadedFrameUrl}
                  alt="Khung tùy chỉnh"
                  className="max-h-72 w-auto object-contain rounded-lg"
                />
              </div>

              <div className="w-full max-w-sm space-y-3">
                <input
                  type="text"
                  value={frameName}
                  onChange={(e) => setFrameName(e.target.value)}
                  placeholder="Đặt tên cho khung ảnh..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-center text-sm font-bold text-gray-800 focus:outline-none focus:border-pink-500"
                />

                <div className="flex gap-3 justify-center">
                  <label className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold cursor-pointer transition">
                    Đổi file khác
                    <input type="file" accept="image/png" className="hidden" onChange={handleFrameUpload} />
                  </label>
                  <button
                    onClick={handleUseCustomFrame}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-extrabold shadow-md hover:scale-105 active:scale-95 transition"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Chụp Với Khung Này Ngay</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 shadow-md shadow-pink-200/50">
                <Upload className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Kéo thả hoặc Nhấp để tải file khung PNG
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Khuyến nghị file <strong>.PNG trong suốt</strong> (transparent) để ảnh chụp hiển thị rõ trong các ô ảnh.
                </p>
              </div>
              <span className="px-6 py-2.5 rounded-full bg-pink-500 text-white font-bold text-xs shadow-md shadow-pink-500/20 hover:bg-pink-600 transition">
                Chọn file từ máy tính
              </span>
              <input type="file" accept="image/png,image/webp" className="hidden" onChange={handleFrameUpload} />
            </label>
          )}
        </div>

        {/* Specifications Guide */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-pink-100 shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Thông Số Kỹ Thuật Chuẩn Thiết Kế</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-2">
              <div className="text-xs font-extrabold text-pink-600 uppercase">1. Bố cục Dải Dọc (1x4 Strip)</div>
              <h4 className="font-bold text-gray-900 text-base">Kích thước 600 x 1800 px (hoặc 1200 x 3600 px)</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tỷ lệ chuẩn 1:3 (khi in nhiệt là khổ 2x6 inch). Gồm 4 ô trống đều nhau xếp dọc, để trống phần trong suốt cho camera lồng ảnh vào.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <div className="text-xs font-extrabold text-purple-600 uppercase">2. Bố cục Lưới Vuông (2x2 Grid)</div>
              <h4 className="font-bold text-gray-900 text-base">Kích thước 1200 x 1600 px (hoặc 1200 x 1800 px)</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tỷ lệ chuẩn 3:4 hoặc 2:3 (khổ in chuẩn 10x15cm). Gồm 4 ô vuông cân đối bố trí 2 hàng 2 cột.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6 space-y-3 text-xs sm:text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Sử dụng <strong>Canva, Photoshop, Figma hoặc IbisPaint</strong> để vẽ viền, dán sticker, tên idol.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Khi lưu file, chọn định dạng <strong>PNG (Background: Transparent / Trong suốt)</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span>Độ phân giải chuẩn <strong>300 DPI</strong> để dải ảnh xuất ra in ấn sắc nét nhất.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
