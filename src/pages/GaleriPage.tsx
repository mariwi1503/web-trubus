import React from 'react';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import GallerySection from '@/components/GallerySection';
import type { GalleryItem } from '@/components/GallerySection';

const allGalleryItems: GalleryItem[] = [
  { src: '/gallery-1.jpg', alt: 'Kegiatan Pemberdayaan', title: 'Pemberdayaan Petani', subtitle: 'Pendampingan Langsung' },
  { src: '/gallery-2.jpg', alt: 'Fasilitas Riset', title: 'Fasilitas Riset', subtitle: 'Pengembangan Bibit' },
  { src: '/gallery-3.jpg', alt: 'Produk Unggulan', title: 'Produk Unggulan', subtitle: 'Kualitas Ekspor' },
  { src: '/gallery-4.jpg', alt: 'Visi Misi', title: 'Program Kolaborasi', subtitle: 'Kemitraan Strategis' },
  { src: '/gallery-5.jpg', alt: 'Kolaborasi Komunitas', title: 'Kolaborasi Komunitas', subtitle: 'Aksi Sosial Bersama' },
  { src: '/tentang-kami.jpg', alt: 'Tim Trubus', title: 'Tim Yayasan Bina Swadaya', subtitle: 'Dedikasi & Profesionalisme' },
];

export default function GaleriPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />

      <main className="w-full mx-auto px-4 md:px-8 lg:px-12 py-10">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
            <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
            Kilas Balik
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">Galeri Kegiatan</h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl">
            Potret nyata dedikasi kami dalam memajukan agrikultur dan pemberdayaan masyarakat Indonesia.
          </p>
        </div>

        {/* Gallery Grid */}
        <GallerySection items={allGalleryItems} />

      </main>

      <Footer />
    </div>
  );
}
