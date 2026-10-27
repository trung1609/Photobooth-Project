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
    <header className="w-full py-3.5 px-4 sm:px-6 md:px-12 flex justify-between items-center bg-white/85 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50 transition-all">
      <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
          <Camera className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center">
          <span className="font-extrabold text-xl tracking-tight text-pink-600 whitespace-nowrap">
            PhotoXinhh
          </span>
          <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-pink-100 text-pink-600 font-bold uppercase tracking-wider hidden sm:inline-block">
            Online
          </span>
        </div>
      </Link>

      <nav aria-label="Main Navigation" className="flex items-center gap-1.5 sm:gap-3 text-sm font-semibold">
        {navLinks.map((link) => {
          const isActive = currentPath === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`hidden sm:inline-block px-3 py-1.5 rounded-full transition-colors whitespace-nowrap text-xs md:text-sm ${
                isActive
                  ? 'bg-pink-100 text-pink-700 font-bold'
                  : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/50'
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <Link
          to="/app"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs sm:text-sm hover:shadow-lg hover:shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
        >
          <Camera className="w-4 h-4" />
          <span>Chụp ngay</span>
        </Link>

        {/* Language selector */}
        <div className="flex items-center gap-1 pl-1">
          <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-pink-100 text-pink-700">
            VN
          </span>
          <span className="px-2 py-0.5 rounded-md text-xs font-medium text-gray-400 hover:text-gray-700 cursor-pointer">
            EN
          </span>
        </div>
      </nav>
    </header>
  );
};
