import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-pink-100/80 text-gray-500 py-8 md:py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-xs">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-base text-pink-600">PhotoXinhh</span>
            </Link>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-normal">
              Dịch vụ tạo ảnh photobooth online miễn phí hàng đầu. Chụp ảnh dải film phong cách Hàn Quốc, cập nhật hàng trăm khung hình hot trend 2026 không cần tải app, không watermark.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50/80 w-fit px-2.5 py-1 rounded-full border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bảo mật 100% Client-side • Không lưu ảnh cá nhân</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-gray-700 text-xs mb-3">Khám Phá</h4>
            <ul className="space-y-2 text-xs font-normal">
              <li>
                <Link to="/app" className="hover:text-pink-600 transition-colors">Phòng chụp ảnh online</Link>
              </li>
              <li>
                <Link to="/frames" className="hover:text-pink-600 transition-colors">Thư viện khung hình 2026</Link>
              </li>
              <li>
                <Link to="/feedbacks" className="hover:text-pink-600 transition-colors">Ảnh chụp từ cộng đồng</Link>
              </li>
              <li>
                <Link to="/privateframe" className="hover:text-pink-600 transition-colors">Hướng dẫn làm khung riêng</Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-gray-700 text-xs mb-3">Bố Cục Chụp</h4>
            <ul className="space-y-2 text-xs text-gray-400 font-normal">
              <li>Dải film dọc 1x4 (Life4Cuts)</li>
              <li>Lưới vuông 2x2 (Couple & Bạn bè)</li>
              <li>Bố cục 2x3 (Chụp nhóm bạn)</li>
              <li>Khung Polaroid cổ điển</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-pink-50 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 font-normal gap-2 text-center sm:text-left">
          <p>© 2026 PhotoXinhh • Dự án Photobooth Web Application.</p>
          <p className="flex items-center justify-center gap-1">
            Thiết kế với <Heart className="w-3 h-3 text-pink-400 fill-pink-400" /> phong cách Photobooth Hàn Quốc
          </p>
        </div>
      </div>
    </footer>
  );
};
