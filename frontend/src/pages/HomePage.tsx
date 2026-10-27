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
    <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen text-gray-800">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center overflow-hidden">
        {/* Glow animated blobs */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute top-10 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse delay-1000" />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-pink-700 text-xs md:text-sm font-bold shadow-xs">
            <Flame className="w-4 h-4 text-pink-500 animate-bounce" />
            <span>Photobooth Trực Tuyến Hot Trend 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600">
            Photobooth Online<br />Miễn Phí 100%
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            Chụp ảnh tự động ngay trên trình duyệt với hàng trăm <strong className="text-pink-600 font-extrabold">khung hình hot trend 2026</strong>. Không cần tải app, không watermark, bảo mật tuyệt đối.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-extrabold text-white transition-all duration-300 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-full shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95"
            >
              <Camera className="w-6 h-6 mr-3 animate-pulse" />
              <span>Bắt đầu chụp ảnh ngay</span>
            </Link>

            <Link
              to="/frames"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 sm:py-5 text-base sm:text-lg font-bold text-gray-700 transition-all duration-300 bg-white border-2 border-pink-100 rounded-full shadow-xs hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300"
            >
              <LayoutGrid className="w-5 h-5 mr-2 text-pink-500" />
              <span>Thư viện khung hình</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 font-semibold">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span>Hơn 1.5 triệu lượt sử dụng mỗi tháng</span>
          </div>
        </div>
      </section>

      {/* 2. HERO SHOWCASE SPLIT */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white/70 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-pink-100 shadow-xl shadow-pink-100/40">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
            <img
              src="/img/hero_photobooth.png"
              alt="Giao diện photobooth online PhotoXinhh"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trải Nghiệm Chuẩn Hàn Quốc</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
              Chụp photobooth như ngoài tiệm, ngay trên trình duyệt
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              PhotoXinhh tập trung vào trải nghiệm nhanh: mở website, cấp quyền camera, chọn layout, chụp ảnh và tải về file PNG chất lượng cao 300 DPI. Không cần đăng ký tài khoản, không cần cài app, không dính logo watermark.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <Link
                to="/feedbacks"
                className="block rounded-2xl bg-pink-50/60 p-4 border border-pink-100 hover:border-pink-300 hover:bg-pink-100/60 transition"
              >
                <span className="block text-xs font-bold text-pink-600">Ảnh cộng đồng</span>
                <span className="block text-gray-500 text-xs mt-1">Xem album người dùng chụp thật.</span>
              </Link>
              <Link
                to="/frames"
                className="block rounded-2xl bg-purple-50/60 p-4 border border-purple-100 hover:border-purple-300 hover:bg-purple-100/60 transition"
              >
                <span className="block text-xs font-bold text-purple-600">Thư viện khung</span>
                <span className="block text-gray-500 text-xs mt-1">Mẫu dải 1x4, lưới 2x2 hot trend.</span>
              </Link>
              <Link
                to="/privateframe"
                className="block rounded-2xl bg-amber-50/60 p-4 border border-amber-100 hover:border-amber-300 hover:bg-amber-100/60 transition"
              >
                <span className="block text-xs font-bold text-amber-600">Tạo khung riêng</span>
                <span className="block text-gray-500 text-xs mt-1">Tải ảnh PNG khung cá nhân.</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE FEATURE CARDS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-pink-100/60 border border-pink-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-pink-500">
              <Heart className="w-6 h-6 fill-pink-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Miễn Phí & Không Watermark</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sử dụng hoàn toàn miễn phí không giới hạn. Ảnh tải về chất lượng cao 300 DPI và tuyệt đối không bị chèn watermark hay logo rác.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-purple-100/60 border border-purple-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bảo Mật 100% Client-side</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hình ảnh được xử lý trực tiếp trên trình duyệt máy bạn bằng HTML5 Canvas. Chúng tôi không bao giờ lưu trữ ảnh cá nhân lên máy chủ.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-blue-100/60 border border-blue-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-500">
              <Wand2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kho Khung Hình Đồ Sộ</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cập nhật liên tục các trend mới nhất: Y2K, Aesthetic Pastel, Vintage Film, Thần tượng Idol K-pop và các dịp sinh nhật, lễ hội.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMMUNITY HIGHLIGHTS MASONRY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <div className="max-w-2xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            Ảnh Chụp Thực Tế
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Khoảnh Khắc Đẹp Từ Cộng Đồng
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Hàng trăm khoảnh khắc đáng yêu, vui nhộn được người dùng tự tay tạo dáng và chụp trực tiếp từ phòng photobooth online.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {COMMUNITY_PHOTOS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-pink-100 flex flex-col"
            >
              <div className="overflow-hidden bg-slate-100 aspect-[3/4]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3.5 text-left flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-800 truncate max-w-[140px]">{item.author}</div>
                  <div className="text-[11px] text-pink-600 font-semibold">{item.layout}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-rose-500 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/feedbacks"
            className="px-7 py-3.5 rounded-full bg-white border-2 border-pink-200 text-pink-600 font-bold hover:bg-pink-50 transition text-sm"
          >
            Xem toàn bộ album cộng đồng
          </Link>
          <Link
            to="/app"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-md hover:shadow-lg hover:scale-105 transition text-sm"
          >
            Tự tạo ảnh xinh của bạn ngay
          </Link>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white/80 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-pink-100 shadow-sm text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-10">
            Cách Sử Dụng Photobooth Online Miễn Phí
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col">
              <div className="w-12 h-12 bg-pink-500 text-white font-extrabold rounded-2xl flex items-center justify-center text-xl mb-4 shadow-md shadow-pink-500/20">
                1
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Mở Camera</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Cấp quyền máy ảnh trên trình duyệt điện thoại hoặc laptop để xem hình ảnh trực tiếp.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col">
              <div className="w-12 h-12 bg-purple-500 text-white font-extrabold rounded-2xl flex items-center justify-center text-xl mb-4 shadow-md shadow-purple-500/20">
                2
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Chọn Layout & Khung</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tùy chọn kiểu dải dọc (1x4), lưới vuông (2x2), polaroid và hàng trăm màu sắc pastel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col">
              <div className="w-12 h-12 bg-rose-500 text-white font-extrabold rounded-2xl flex items-center justify-center text-xl mb-4 shadow-md shadow-rose-500/20">
                3
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Tạo Dáng & Chụp</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Đồng hồ đếm ngược thông minh 3s-5s kèm âm thanh giúp bạn tự tin tạo dáng tự nhiên.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col">
              <div className="w-12 h-12 bg-indigo-500 text-white font-extrabold rounded-2xl flex items-center justify-center text-xl mb-4 shadow-md shadow-indigo-500/20">
                4
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">Lưu & Tải Ảnh</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tải ảnh PNG chất lượng cao 300 DPI, in ngay tại chỗ hoặc quét QR tải vào điện thoại.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Hỏi & Đáp</span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Câu Hỏi Thường Gặp</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-gray-800 hover:text-pink-600 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-pink-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-pink-50 pt-3">
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
