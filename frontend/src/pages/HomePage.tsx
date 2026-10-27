import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Sparkles,
  Heart,
  ShieldCheck,
  Wand2,
  ChevronDown,
  Flame,
  LayoutGrid
} from 'lucide-react';
import { COMMUNITY_PHOTOS } from '../data/framesData';

export const HomePage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Photobooth online là gì?',
      a: 'Photobooth online là công cụ chụp ảnh trực tiếp trên trình duyệt web, cho phép bạn chụp nhiều tấm ảnh liên tiếp và ghép vào một dải ảnh (photo strip) với khung hình đẹp — giống hệt máy photobooth ngoài tiệm nhưng hoàn toàn miễn phí và không cần ra khỏi nhà.'
    },
    {
      q: 'PhotoXinhh có thực sự miễn phí không? Có phí ẩn không?',
      a: 'Hoàn toàn miễn phí 100%, không có gói nâng cấp, không chèn watermark quảng cáo, không cần nhập thẻ hay đăng ký tài khoản.'
    },
    {
      q: 'Ảnh chụp của tôi có bị lưu lên máy chủ server không?',
      a: 'Tuyệt đối không! Toàn bộ quá trình chụp và ghép khung diễn ra hoàn toàn trên trình duyệt máy bạn (Client-side HTML5 Canvas). Chúng tôi không lưu trữ bất kỳ hình ảnh cá nhân nào của bạn.'
    },
    {
      q: 'Có dùng được trên điện thoại và máy tính bảng không?',
      a: 'Có! PhotoXinhh tương thích mượt mà trên iPhone/iPad (Safari), điện thoại Android (Chrome), laptop và PC.'
    },
    {
      q: 'Tôi có thể tự tải khung ảnh riêng (Idol, anime) lên không?',
      a: 'Có! Bạn có thể tự thiết kế khung ảnh PNG trong suốt theo kích thước mẫu và tải trực tiếp lên để chụp.'
    }
  ];

  return (
    <div className="bg-transparent text-gray-700">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 md:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center overflow-hidden">
        {/* Glow animated blobs */}
        <div className="absolute top-8 left-8 w-28 h-28 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-8 right-8 w-28 h-28 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-1000" />

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-pink-500" />
            <span>Photobooth Trực Tuyến Hot Trend 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600">
            Photobooth Online<br />Miễn Phí 100%
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto font-normal leading-relaxed">
            Chụp ảnh tự động ngay trên trình duyệt với hàng trăm <strong className="text-pink-600 font-semibold">khung hình hot trend 2026</strong>. Không cần tải app, không watermark, bảo mật tuyệt đối.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-300 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-full shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-95"
            >
              <Camera className="w-4 h-4 mr-2" />
              <span>Bắt đầu chụp ảnh ngay</span>
            </Link>

            <Link
              to="/frames"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-medium text-gray-600 transition-all duration-300 bg-white border border-pink-100 rounded-full shadow-2xs hover:bg-pink-50/60 hover:text-pink-600"
            >
              <LayoutGrid className="w-4 h-4 mr-1.5 text-pink-500" />
              <span>Thư viện khung hình</span>
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-400 font-normal">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>Hơn 1.5 triệu lượt sử dụng mỗi tháng</span>
          </div>
        </div>
      </section>

      {/* 2. HERO SHOWCASE SPLIT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-pink-100/80 shadow-sm">
          <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-slate-900 group">
            <img
              src="/img/hero_photobooth.png"
              alt="Giao diện photobooth online PhotoXinhh"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
            />
          </div>

          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-600 text-[11px] font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Trải Nghiệm Chuẩn Hàn Quốc</span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
              Chụp photobooth như ngoài tiệm, ngay trên trình duyệt
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-normal">
              PhotoXinhh tập trung vào trải nghiệm nhanh: mở website, cấp quyền camera, chọn layout, chụp ảnh và tải về file PNG chất lượng cao 300 DPI. Không cần đăng ký tài khoản, không cần cài app, không dính logo watermark.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <Link
                to="/feedbacks"
                className="block rounded-xl bg-pink-50/50 p-3 border border-pink-100/70 hover:border-pink-200 hover:bg-pink-100/50 transition"
              >
                <span className="block text-xs font-semibold text-pink-600">Ảnh cộng đồng</span>
                <span className="block text-gray-400 text-[11px] mt-0.5 font-normal">Xem album chụp thật.</span>
              </Link>
              <Link
                to="/frames"
                className="block rounded-xl bg-purple-50/50 p-3 border border-purple-100/70 hover:border-purple-200 hover:bg-purple-100/50 transition"
              >
                <span className="block text-xs font-semibold text-purple-600">Thư viện khung</span>
                <span className="block text-gray-400 text-[11px] mt-0.5 font-normal">Mẫu 1x4, 2x2 hot trend.</span>
              </Link>
              <Link
                to="/privateframe"
                className="block rounded-xl bg-amber-50/50 p-3 border border-amber-100/70 hover:border-amber-200 hover:bg-amber-100/50 transition"
              >
                <span className="block text-xs font-semibold text-amber-600">Tạo khung riêng</span>
                <span className="block text-gray-400 text-[11px] mt-0.5 font-normal">Tải ảnh PNG khung cá nhân.</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE FEATURE CARDS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-pink-100/80 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-4 text-pink-500">
              <Heart className="w-5 h-5 fill-pink-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1.5">Miễn Phí & Không Watermark</h3>
            <p className="text-gray-500 text-xs leading-relaxed font-normal">
              Sử dụng hoàn toàn miễn phí không giới hạn. Ảnh tải về chất lượng cao 300 DPI và tuyệt đối không bị chèn watermark hay logo rác.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-purple-100/80 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-4 text-purple-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1.5">Bảo Mật 100% Client-side</h3>
            <p className="text-gray-500 text-xs leading-relaxed font-normal">
              Hình ảnh được xử lý trực tiếp trên trình duyệt máy bạn bằng HTML5 Canvas. Chúng tôi không bao giờ lưu trữ ảnh cá nhân lên máy chủ.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xs border border-blue-100/80 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-500">
              <Wand2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1.5">Kho Khung Hình Đồ Sộ</h3>
            <p className="text-gray-500 text-xs leading-relaxed font-normal">
              Cập nhật liên tục các trend mới nhất: Y2K, Aesthetic Pastel, Vintage Film, Thần tượng Idol K-pop và các dịp sinh nhật, lễ hội.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMMUNITY HIGHLIGHTS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="max-w-xl mx-auto mb-8 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-600 font-medium text-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            Ảnh Chụp Thực Tế
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Khoảnh Khắc Đẹp Từ Cộng Đồng
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-normal">
            Hàng trăm khoảnh khắc đáng yêu, vui nhộn được người dùng tự tay tạo dáng và chụp trực tiếp từ phòng photobooth online.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {COMMUNITY_PHOTOS.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-pink-100/80 flex flex-col"
            >
              <div className="overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-2.5 text-left flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-gray-700 truncate max-w-[120px]">{item.author}</div>
                  <div className="text-[10px] text-pink-600 font-medium">{item.layout}</div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-rose-500 font-semibold">
                  <Heart className="w-3 h-3 fill-rose-500" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/feedbacks"
            className="px-6 py-2.5 rounded-full bg-white border border-pink-200 text-pink-600 font-medium hover:bg-pink-50 transition text-xs sm:text-sm"
          >
            Xem toàn bộ album cộng đồng
          </Link>
          <Link
            to="/app"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium shadow-xs hover:shadow-md hover:scale-[1.02] transition text-xs sm:text-sm"
          >
            Tự tạo ảnh xinh của bạn ngay
          </Link>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-pink-100/80 shadow-xs text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-8">
            Cách Sử Dụng Photobooth Online Miễn Phí
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-pink-50/40 border border-pink-100/70 flex flex-col">
              <div className="w-9 h-9 bg-pink-500 text-white font-bold rounded-xl flex items-center justify-center text-sm mb-3 shadow-xs">
                1
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1">Mở Camera</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                Cấp quyền máy ảnh trên trình duyệt điện thoại hoặc laptop để xem hình ảnh trực tiếp.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100/70 flex flex-col">
              <div className="w-9 h-9 bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center text-sm mb-3 shadow-xs">
                2
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1">Chọn Layout & Khung</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                Tùy chọn kiểu dải dọc (1x4), lưới vuông (2x2), polaroid và hàng trăm màu sắc pastel.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-100/70 flex flex-col">
              <div className="w-9 h-9 bg-rose-500 text-white font-bold rounded-xl flex items-center justify-center text-sm mb-3 shadow-xs">
                3
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1">Tạo Dáng & Chụp</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                Đồng hồ đếm ngược thông minh 3s-5s kèm âm thanh giúp bạn tự tin tạo dáng tự nhiên.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100/70 flex flex-col">
              <div className="w-9 h-9 bg-indigo-500 text-white font-bold rounded-xl flex items-center justify-center text-sm mb-3 shadow-xs">
                4
              </div>
              <h3 className="font-semibold text-gray-800 text-xs mb-1">Lưu & Tải Ảnh</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                Tải ảnh PNG chất lượng cao 300 DPI, in ngay tại chỗ hoặc quét QR tải vào điện thoại.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-pink-600 uppercase tracking-wider">Hỏi & Đáp</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-1">Câu Hỏi Thường Gặp</h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-pink-100/80 overflow-hidden shadow-2xs transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between font-semibold text-xs sm:text-sm text-gray-800 hover:text-pink-600 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-pink-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-gray-500 leading-relaxed border-t border-pink-50 pt-2.5 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
