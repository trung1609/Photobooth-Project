import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  Home,
  Camera,
  Layers,
  Heart,
  Upload,
  RotateCcw,
  FlipHorizontal,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useBoothStore } from '../store/useBoothStore';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFrameModal?: () => void;
  onResetPhotos?: () => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isOpen,
  onClose,
  onOpenFrameModal,
  onResetPhotos,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { frame, photos, layout, isMirror, toggleMirror } = useBoothStore();
  const totalRequired = layout === 'polaroid' ? 1 : 4;

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { to: '/', label: 'Trang Chủ', icon: Home, badge: '' },
    { to: '/app', label: 'Phòng Chụp Ảnh', icon: Camera, badge: 'Đang mở' },
    { to: '/frames', label: 'Thư Viện Khung', icon: Layers, badge: 'Hot' },
    { to: '/feedbacks', label: 'Ảnh Cộng Đồng', icon: Heart, badge: '' },
    { to: '/privateframe', label: 'Tạo Khung Riêng', icon: Upload, badge: 'Mới' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Sidebar Drawer */}
      <div className="relative w-[300px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col justify-between z-10 transition-transform duration-300 ease-out border-r border-pink-100 animate-in slide-in-from-left">
        {/* Top Header */}
        <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-gradient-to-r from-pink-50/80 via-white to-pink-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-sm">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-pink-600">
                  PhotoXinhh
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-pink-100 text-pink-600 font-bold uppercase tracking-wider">
                  Photobooth
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium">Capture Sweet Memories</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng menu"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-pink-100 hover:text-pink-600 text-gray-500 flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4">
          {/* In-Booth Quick Actions (if in /app) */}
          {currentPath === '/app' && (
            <div className="bg-pink-50/70 border border-pink-200/80 rounded-2xl p-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-pink-700">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                  Phiên Chụp Hiện Tại
                </span>
                <span className="text-[11px] bg-white px-2 py-0.5 rounded-full border border-pink-200 text-pink-600 font-semibold">
                  {photos.length}/{totalRequired} ảnh
                </span>
              </div>

              <div className="text-[11px] text-gray-600 bg-white/80 p-2 rounded-xl border border-pink-100 truncate">
                <span className="font-medium text-pink-500">Khung:</span> {frame.name}
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                {onOpenFrameModal && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenFrameModal();
                    }}
                    className="flex items-center justify-center gap-1 py-1.5 px-2 bg-white hover:bg-pink-100 border border-pink-200 rounded-xl text-pink-600 text-xs font-semibold shadow-2xs transition cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Đổi Khung</span>
                  </button>
                )}

                {onResetPhotos && (
                  <button
                    onClick={() => {
                      onClose();
                      onResetPhotos();
                    }}
                    className="flex items-center justify-center gap-1 py-1.5 px-2 bg-white hover:bg-rose-50 border border-pink-200 rounded-xl text-rose-500 text-xs font-semibold shadow-2xs transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Chụp Lại</span>
                  </button>
                )}

                <button
                  onClick={() => toggleMirror()}
                  className="col-span-2 flex items-center justify-center gap-1 py-1.5 px-2 bg-white hover:bg-pink-100 border border-pink-200 rounded-xl text-gray-700 text-xs font-medium shadow-2xs transition cursor-pointer"
                >
                  <FlipHorizontal className="w-3.5 h-3.5 text-pink-500" />
                  <span>{isMirror ? 'Gương: Đang Bật' : 'Gương: Đang Tắt'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="px-2 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Khám Phá
            </div>

            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? 'bg-pink-500 text-white font-semibold shadow-xs shadow-pink-500/25'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                    <span>{link.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {link.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-pink-100 text-pink-600'
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/80' : 'text-gray-300'}`} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Language selector */}
          <div className="pt-2">
            <div className="px-2 pb-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Ngôn Ngữ
            </div>
            <div className="flex items-center gap-2 px-2 pt-1">
              <button className="flex-1 py-1.5 px-3 rounded-xl bg-pink-100 border border-pink-300 text-pink-700 font-bold text-xs flex items-center justify-center gap-1.5">
                <span>🇻🇳</span>
                <span>Tiếng Việt</span>
              </button>
              <button className="flex-1 py-1.5 px-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-gray-100">
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-pink-100 bg-gray-50/70 space-y-2">
          <div className="flex items-start gap-2 text-[11px] text-gray-500 leading-tight">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Ảnh xử lý 100% trên thiết bị của bạn, tuyệt đối bảo mật và riêng tư.</span>
          </div>
          <div className="flex items-center justify-between pt-1 text-[10px] text-gray-400 border-t border-gray-200/60">
            <span>PhotoXinhh v2.0 • Life4Cuts style</span>
            <span className="flex items-center gap-0.5 text-pink-500 font-medium">
              Made with <Heart className="w-2.5 h-2.5 fill-pink-500" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
