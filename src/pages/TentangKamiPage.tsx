import React from 'react';
import { Link } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { ChevronRight, Target, Eye, Heart, Users, BookOpen, ShoppingBag, Headphones } from 'lucide-react';

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">Tentang Kami</span>
        </nav>

        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-10">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006245990_69a87c68.jpg')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/60" />
          <div className="relative px-8 py-16 md:py-24 text-center">
            <img src="https://d64gsuwffb70l.cloudfront.net/69cc6ef559614323ecb418b6_1775005534622_8cc099ee.png" alt="Trubus" className="h-12 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Tentang Trubus</h1>
            <p className="text-green-100 max-w-2xl mx-auto text-lg">Portal informasi dan marketplace pertanian terdepan di Indonesia sejak 1985.</p>
          </div>
        </div>

        {/* Story */}
        <section className="mb-12">
          <div className="bg-white rounded-xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cerita Kami</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>Trubus didirikan pada tahun 1985 dengan misi sederhana namun kuat: menjadi jembatan informasi antara dunia pertanian dan masyarakat Indonesia. Berawal dari sebuah majalah pertanian, Trubus kini telah berkembang menjadi ekosistem digital yang komprehensif.</p>
              <p>Selama lebih dari 40 tahun, kami telah mendampingi jutaan petani Indonesia dengan menyediakan informasi terkini, teknologi pertanian, dan produk-produk berkualitas yang membantu meningkatkan produktivitas dan kesejahteraan mereka.</p>
              <p>Hari ini, Trubus hadir sebagai portal berita pertanian terlengkap sekaligus marketplace yang menyediakan benih, bibit, pupuk, dan pestisida berkualitas dari produsen terpercaya di seluruh Indonesia.</p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Visi</h3>
            <p className="text-gray-600 leading-relaxed">Menjadi platform pertanian digital terdepan di Asia Tenggara yang memberdayakan petani dengan informasi, teknologi, dan akses pasar yang lebih baik.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Misi</h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-700 mt-2 flex-shrink-0" />Menyediakan informasi pertanian yang akurat, terkini, dan bermanfaat</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-700 mt-2 flex-shrink-0" />Menjembatani petani dengan produk pertanian berkualitas</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-700 mt-2 flex-shrink-0" />Mendorong adopsi teknologi pertanian modern</li>
              <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-700 mt-2 flex-shrink-0" />Membangun komunitas petani yang saling mendukung</li>
            </ul>
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Heart className="w-6 h-6" />, title: 'Integritas', desc: 'Jujur dan transparan dalam setiap layanan' },
              { icon: <Users className="w-6 h-6" />, title: 'Komunitas', desc: 'Membangun ekosistem yang saling mendukung' },
              { icon: <BookOpen className="w-6 h-6" />, title: 'Edukasi', desc: 'Berbagi pengetahuan untuk kemajuan bersama' },
              { icon: <ShoppingBag className="w-6 h-6" />, title: 'Kualitas', desc: 'Hanya menyediakan produk terbaik' },
            ].map((v, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3 text-green-700">{v.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{v.title}</h4>
                <p className="text-xs text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-green-700 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-xl font-bold text-white mb-8">Trubus dalam Angka</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '40+', label: 'Tahun Pengalaman' },
              { num: '5M+', label: 'Pembaca Aktif' },
              { num: '10K+', label: 'Produk Terjual' },
              { num: '500+', label: 'Mitra Petani' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{s.num}</p>
                <p className="text-green-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-white rounded-xl border border-gray-100 p-8 text-center">
          <Headphones className="w-10 h-10 text-green-700 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Hubungi Kami</h2>
          <p className="text-gray-500 mb-4">Ada pertanyaan? Tim kami siap membantu Anda.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:redaksi@trubus.id" className="px-6 py-2.5 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
              Email Kami
            </a>
            <a href="tel:+62214202255" className="px-6 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              (021) 420-2255
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
