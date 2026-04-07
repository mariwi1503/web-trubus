import React from 'react';
import { Link } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { ArrowRight, Headphones, Mail, Phone, Target, Lightbulb, Users, Leaf } from 'lucide-react';

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopBanner /><Navbar /><AuthModal />

      <main className="w-full mx-auto px-4 md:px-8 lg:px-12 py-10 lg:py-16 flex-1">

        {/* Page Header Centered */}
        <div className="mb-12 md:mb-16 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-6">
            <span className="w-12 h-0.5 bg-green-600 rounded-full"></span>
            Profil Perusahaan
            <span className="w-12 h-0.5 bg-green-600 rounded-full"></span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Menumbuhkan Inovasi untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Pertanian Indonesia</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Berdedikasi untuk pemberdayaan masyarakat, kemandirian pangan, dan pelestarian alam melalui solusi agrikultur yang berkelanjutan sejak 1985.
          </p>
        </div>

        {/* Large Centered Banner Image */}
        <section className="mb-20 md:mb-28">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video md:aspect-[21/9] group w-full">
            <img
              src="/tentang-kami.jpg"
              alt="Tim Yayasan Bina Swadaya"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <div className="font-bold text-4xl md:text-5xl mb-2">40+</div>
              <div className="text-base md:text-lg font-medium text-green-300 uppercase tracking-widest drop-shadow-md">Tahun Pengalaman & Dedikasi</div>
            </div>
          </div>
        </section>

        {/* Tentang Kami - Text Content */}
        <section className="mb-20 md:mb-32 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">Membangun Keswadayaan Masyarakat</h2>
            </div>
            <div className="md:col-span-7">
              <div className="prose prose-lg text-gray-600 max-w-none">
                <p className="mb-6 leading-relaxed">
                  <strong>PT. TRUBUS MITRA SWADAYA</strong> bernaung di bawah <strong>Yayasan Bina Swadaya</strong>, sebuah lembaga swadaya masyarakat perintis yang mengelola berbagai kegiatan pelayanan berorientasi pemberdayaan komunitas akar rumput di seluruh Indonesia.
                </p>
                <p className="leading-relaxed">
                  Kami berupaya keras membangun keswadayaan dari hulu ke hilir dengan mengembangkan program-program layanan unggulan. Berfokus pada agrikultur, kami memastikan akses petani terhadap bibit, pupuk, alat pertanian modern, serta pendampingan teknis yang berkualitas.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
                  <div className="p-3 bg-green-50 rounded-xl text-green-600">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Berkelanjutan</h4>
                    <p className="text-sm text-gray-500">Praktik ramah lingkungan</p>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
                  <div className="p-3 bg-green-50 rounded-xl text-green-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Inklusif</h4>
                    <p className="text-sm text-gray-500">Kemitraan strategis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi Misi Modern Section */}
        <section className="mb-20 md:mb-32">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Arah & Tujuan Kami</h2>
            <p className="text-gray-500 text-lg">Komitmen jangka panjang yang membimbing setiap langkah dan inovasi yang kami ciptakan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi Card */}
            <div className="relative overflow-hidden rounded-3xl bg-green-700 text-white p-10 md:p-14 shadow-2xl group">
              <div className="relative z-10">
                <Lightbulb className="w-12 h-12 text-green-300 mb-8" />
                <h3 className="text-2xl md:text-3xl font-bold mb-6">Visi Utama</h3>
                <p className="text-lg md:text-xl font-light leading-relaxed text-green-50">
                  "Menjadi mitra terpercaya dan penyedia solusi agrikultur berkelanjutan, guna menyejahterakan masyarakat melalui inovasi pemberdayaan pelestarian alam."
                </p>
              </div>
              {/* Background accent */}
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-green-600 rounded-full blur-3xl opacity-50 transition-transform duration-1000 group-hover:scale-150"></div>
            </div>

            {/* Misi Card */}
            <div className="rounded-3xl bg-white border border-gray-100 p-10 md:p-14 shadow-xl">
              <Target className="w-12 h-12 text-green-600 mb-8" />
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Misi Kami</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-sm">1</div>
                  <p className="text-gray-600 text-base lg:text-lg">Memperkuat kapasitas kelembagaan masyarakat melalui kemitraan strategis.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-sm">2</div>
                  <p className="text-gray-600 text-base lg:text-lg">Meningkatkan produksi dan kualitas melalui solusi sarana prasarana yang efisien.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold text-sm">3</div>
                  <p className="text-gray-600 text-base lg:text-lg">Mengembangkan jejaring usaha yang inklusif untuk menyokong ketahanan finansial komunitas lokal.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sebaran Cabang Trubus Map Section - Seamless Full Width */}
        <section className="mb-20 md:mb-32 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white py-16 md:py-20 border-y border-gray-100 overflow-hidden flex flex-col items-center">
          
          <div className="text-center mb-10 max-w-3xl mx-auto px-4 relative z-20">
             <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-4">
               <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
               Jaringan Cabang
               <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
             </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Hadir Lebih Dekat dengan Anda</h2>
            <p className="text-gray-500 text-lg md:text-xl">Dengan cabang toko yang tersebar luas melintasi nusantara, kami siap mendukung segala kebutuhan operasional agrikultur komunitas.</p>
          </div>

          {/* Seamless Edge-to-Edge Map Image */}
          <div className="w-full h-[400px] md:h-[600px] lg:h-[750px] flex items-center justify-center">
            <img 
              src="/map-indonesia.png" 
              alt="Peta Sebaran Cabang Trubus di Indonesia" 
              className="w-full h-full object-cover object-center filter drop-shadow-[0_35px_35px_rgba(22,163,74,0.1)]" 
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </section>

        {/* Highlight Image Breaker */}
        <section className="mb-20 md:mb-32">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px]">
             <img src="/gallery-4.jpg" alt="Aktivitas Agrikultur" className="absolute inset-0 w-full h-full object-cover" />
             <div className="absolute inset-0 bg-green-900/60" />
             <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center max-w-4xl px-4 leading-normal drop-shadow-xl">
                   "Kesejahteraan berakar dari tanah yang subur dan kolaborasi yang tangguh."
                </h2>
             </div>
          </div>
        </section>

        {/* Hubungi Kami */}
        <section className="mb-12">
          <div className="bg-white rounded-3xl border border-gray-100 p-10 md:p-16 lg:p-20 shadow-xl relative overflow-hidden">
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-4">
                <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
                Terhubung Bersama
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Mulai Kolaborasi</h2>
              <p className="text-gray-500 text-lg md:text-xl mb-12 max-w-2xl">
                Ada pertanyaan, masukan, atau ide segar? Tim ahli kami selalu sedia untuk mendengarkan dan membantu merajut kemitraan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col items-start gap-4">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-inner">
                    <Headphones className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-1 tracking-wide uppercase">Layanan</p>
                    <a href="tel:+62214202255" className="text-gray-900 font-extrabold hover:text-green-600 text-lg transition-colors">(021) 420-2255</a>
                  </div>
                </div>
                
                <div className="flex flex-col items-start gap-4">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-inner">
                    <Mail className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-1 tracking-wide uppercase">Email Redaksi</p>
                    <a href="mailto:redaksi@trubus.id" className="text-gray-900 font-extrabold hover:text-green-600 text-lg transition-colors">redaksi@trubus.id</a>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shadow-inner">
                    <Phone className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 mb-1 tracking-wide uppercase">Pusat Informasi</p>
                    <p className="text-gray-900 font-bold text-base leading-tight">Jl. Gunung Sahari III No.7, JKT</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="mailto:redaksi@trubus.id" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-full hover:bg-green-500 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <Mail className="w-5 h-5" /> Kirim Email
                </a>
                <a href="tel:+62214202255" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-100 text-gray-800 font-bold rounded-full hover:bg-gray-50 hover:border-gray-200 hover:-translate-y-0.5 transition-all shadow-sm">
                  <Phone className="w-5 h-5" /> Hubungi Telepon
                </a>
              </div>
            </div>
            
            {/* Background pattern decoration */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.02] pointer-events-none hidden lg:block">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-green-900" preserveAspectRatio="none">
                <pattern id="dot-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="2"></circle>
                </pattern>
                <rect x="0" y="0" width="100" height="100" fill="url(#dot-pattern)"></rect>
              </svg>
            </div>
            
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
