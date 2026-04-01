import React from 'react';
import { Link } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Pak Harto Sugianto', location: 'Klaten, Jawa Tengah', role: 'Petani Padi', text: 'Benih padi Ciherang dari Trubus sangat berkualitas. Daya tumbuhnya tinggi dan hasil panen meningkat 30% dibanding musim sebelumnya. Sangat puas!', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006452547_a58a1448.jpg', rating: 5 },
  { name: 'Bu Siti Aminah', location: 'Garut, Jawa Barat', role: 'Petani Sayuran', text: 'Pupuk organik Petroganik dari Trubus membuat tanaman saya lebih sehat dan subur. Hasilnya terlihat nyata dalam 2 minggu. Sangat direkomendasikan untuk petani organik!', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006485671_a7e28038.png', rating: 5 },
  { name: 'Pak Joko Widodo', location: 'Malang, Jawa Timur', role: 'Petani Buah', text: 'Bibit durian Musang King dari Trubus sudah berbuah di tahun ke-4. Kualitas buahnya luar biasa, dagingnya tebal dan manis. Investasi yang sangat menguntungkan!', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006455129_af46d4f2.png', rating: 5 },
  { name: 'Pak Bambang Hartono', location: 'Medan, Sumatera Utara', role: 'Petani Sawit', text: 'Bibit kelapa sawit dari Trubus tumbuh dengan baik. Pelayanannya juga sangat profesional, pengiriman cepat dan bibit sampai dalam kondisi segar.', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006459120_afb5c648.png', rating: 4 },
  { name: 'Bu Dewi Lestari', location: 'Bandung, Jawa Barat', role: 'Petani Hidroponik', text: 'Pestisida Decis dari Trubus sangat efektif mengatasi hama pada tanaman selada hidroponik saya. Dosis kecil sudah cukup ampuh, ekonomis sekali!', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006485671_a7e28038.png', rating: 5 },
  { name: 'Pak Ahmad Fauzi', location: 'Lampung', role: 'Petani Kopi', text: 'Pupuk NPK Mutiara dari Trubus memberikan hasil yang luar biasa pada tanaman kopi saya. Buah kopi lebih besar dan padat, kualitas biji meningkat signifikan.', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006452547_a58a1448.jpg', rating: 5 },
];

export default function TestimoniPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">Testimoni</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Testimoni Pelanggan</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Dengarkan pengalaman para petani yang telah menggunakan produk-produk berkualitas dari Trubus.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow relative">
              <Quote className="w-8 h-8 text-green-100 absolute top-4 right-4" />
              <div className="flex items-center gap-3 mb-4">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-green-100" />
                <div>
                  <h3 className="font-semibold text-gray-800">{t.name}</h3>
                  <p className="text-xs text-green-700 font-medium">{t.role}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className={`w-4 h-4 ${j < t.rating ? 'text-yellow-400' : 'text-gray-200'} fill-current`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
