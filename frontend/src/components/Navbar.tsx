import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { to: '/', label: 'Trang Chủ' },
    { to: '/frames', label: 'Thư viện khung' },
    { to: '/feedbacks', label: 'Ảnh cộng đồng' },
    { to: '/privateframe', label: 'Tạo khung riêng' },
  ];

  return (
    <header className="w-full py-2.5 px-4 sm:px-8 md:px-12 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-pink-100/80 sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-xs text-white">
          <Camera className="w-4 h-4" />
        </div>
        <div className="flex items-center">
          <span className="font-bold text-base md:text-lg tracking-tight text-pink-600 whitespace-nowrap">
            PhotoXinhh
          </span>
          <span className="text-[10px] ml-1.5 px-1.5 py-0.2 rounded-full bg-pink-50 text-pink-500 border border-pink-100 font-medium uppercase tracking-wider hidden sm:inline-block">
            Online
          </span>
        </div>
      </Link>

      <nav aria-label="Main Navigation" className="flex items-center gap-1 sm:gap-2.5 text-xs md:text-[13px] font-normal">
        {navLinks.map((link) => {
          const isActive = currentPath === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`hidden sm:inline-block px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-pink-50 text-pink-600 font-medium'
                  : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50/50'
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <Link
          to="/app"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-xs sm:text-[13px] hover:shadow-md hover:shadow-pink-500/20 active:scale-95 transition-all whitespace-nowrap"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Chụp ngay</span>
        </Link>

        {/* Language selector */}
        <div className="flex items-center gap-1 pl-1 text-[11px] font-medium">
          <span className="px-1.5 py-0.5 rounded bg-pink-100 text-pink-600">
            VN
          </span>
          <span className="px-1.5 py-0.5 text-gray-400 hover:text-gray-600 cursor-pointer">
            EN
          </span>
        </div>
      </nav>
    </header>
  );
};
