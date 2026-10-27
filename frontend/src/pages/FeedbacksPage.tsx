import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, X } from 'lucide-react';
import { COMMUNITY_PHOTOS, CommunityPhoto } from '../data/framesData';

export const FeedbacksPage: React.FC = () => {
  const [photos, setPhotos] = useState<CommunityPhoto[]>(COMMUNITY_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState<CommunityPhoto | null>(null);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>Album Kỷ Niệm Thực Tế</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Khoảnh Khắc Đẹp Từ Cộng Đồng
          </h1>

          <p className="text-sm sm:text-base text-gray-600">
            Hàng ngàn bức ảnh photobooth xinh xắn được tạo ra mỗi ngày từ người dùng trên khắp cả nước.
          </p>

          <div className="pt-2">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition"
            >
              <Camera className="w-4 h-4" />
              <span>Chụp Dải Ảnh Của Bạn Ngay</span>
            </Link>
          </div>
        </div>

        {/* Masonry Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {photos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="bg-white rounded-2xl overflow-hidden border border-pink-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="overflow-hidden bg-slate-900 aspect-[3/4] flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="p-3.5 flex items-center justify-between bg-white border-t border-pink-50">
                <div className="truncate pr-2">
                  <div className="text-xs font-bold text-gray-900 truncate">{item.title}</div>
                  <div className="text-[11px] text-pink-600 font-semibold">{item.author} • {item.date}</div>
                </div>

                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:scale-110 active:scale-90 transition p-1"
                  title="Thả tim"
                >
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-auto p-4 flex items-center justify-center bg-black/40">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
                />
              </div>

              <div className="p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-white">
                <div>
                  <h4 className="font-extrabold text-sm">{selectedPhoto.title}</h4>
                  <p className="text-xs text-slate-400">
                    {selectedPhoto.author} • {selectedPhoto.layout} • {selectedPhoto.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleLike(selectedPhoto.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs font-bold"
                  >
                    <Heart className="w-3.5 h-3.5 fill-pink-400" />
                    <span>{selectedPhoto.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
