import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

interface GallerySectionProps {
  items: GalleryItem[];
}

const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrev = () => setLightboxIndex(i => (i !== null ? (i - 1 + items.length) % items.length : null));
  const goNext = () => setLightboxIndex(i => (i !== null ? (i + 1) % items.length : null));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex]);

  return (
    <>
      {/* Grid: 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm h-[180px] sm:h-[220px] md:h-[300px] ${
              index >= 2 ? 'hidden lg:block' : ''
            }`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-6">
              <span className="text-white font-bold text-sm md:text-lg mb-0.5 md:mb-1">{item.title}</span>
              <span className="text-green-400 text-xs md:text-sm">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: show "Lihat Semua" hint with count */}
      <div className="lg:hidden mt-3 text-center">
        <button
          onClick={() => openLightbox(0)}
          className="inline-flex items-center gap-2 text-sm text-green-600 font-semibold"
        >
          <span>+{items.length - 2} foto lainnya</span>
          <span className="text-gray-400">· Ketuk untuk melihat semua</span>
        </button>
      </div>

      {/* Lightbox - Full Screen */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] w-12 h-12 bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all group"
            onClick={closeLightbox}
          >
            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-16 md:h-16 bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Image container - Full screen */}
          <div
            className="relative w-full h-full flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={items[lightboxIndex].src}
              alt={items[lightboxIndex].alt}
              className="w-full h-full object-contain"
            />
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-16 px-6 md:px-12 text-center pointer-events-none">
              <p className="text-white font-extrabold text-2xl md:text-3xl lg:text-4xl mb-2 drop-shadow-md">{items[lightboxIndex].title}</p>
              <p className="text-green-400 text-sm md:text-base uppercase tracking-widest font-semibold">{items[lightboxIndex].subtitle}</p>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 md:w-16 md:h-16 bg-black/40 hover:bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-[110]">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); }}
                className={`h-2 rounded-full transition-all duration-300 ${idx === lightboxIndex ? 'w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GallerySection;

export const defaultGalleryItems: GalleryItem[] = [
  { src: '/gallery-1.jpg', alt: 'Kegiatan Pemberdayaan', title: 'Pemberdayaan Petani', subtitle: 'Pendampingan Langsung' },
  { src: '/gallery-2.jpg', alt: 'Fasilitas Riset', title: 'Fasilitas Riset', subtitle: 'Pengembangan Bibit' },
  { src: '/gallery-3.jpg', alt: 'Produk Unggulan', title: 'Produk Unggulan', subtitle: 'Kualitas Ekspor' },
  { src: '/gallery-5.jpg', alt: 'Kolaborasi Komunitas', title: 'Kolaborasi Komunitas', subtitle: 'Aksi Sosial Bersama' },
];
