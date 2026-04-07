import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import TopBanner from './TopBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductCard from './ProductCard';
import ArticleCard from './ArticleCard';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { articles } from '@/data/articles';
import { withPriorityProducts } from '@/lib/priority-products';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, ArrowDown } from 'lucide-react';
import GallerySection, { defaultGalleryItems } from './GallerySection';

interface HomeArticleCarouselSectionProps {
  title: string;
  linkTo: string;
  items: typeof articles;
  autoSlide?: boolean;
  slideStep?: number;
}

const HomeArticleCarouselSection: React.FC<HomeArticleCarouselSectionProps> = ({
  title,
  linkTo,
  items,
  autoSlide = false,
  slideStep = 1,
}) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api || !autoSlide || items.length <= 2) return;

    const autoplay = window.setInterval(() => {
      const nextIndex = api.selectedScrollSnap() + slideStep;
      const maxIndex = api.scrollSnapList().length - 1;

      if (nextIndex > maxIndex) {
        api.scrollTo(0);
        return;
      }

      api.scrollTo(nextIndex);
    }, 4000);

    return () => window.clearInterval(autoplay);
  }, [api, autoSlide, items.length, slideStep]);

  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
            <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
            Pilihan Bacaan
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{title}</h2>
        </div>
        <Link to={linkTo} className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          Lihat Semua <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false,
          dragFree: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-5">
          {items.map(article => (
            <CarouselItem
              key={article.id}
              className="pl-3 basis-1/2 sm:pl-5 lg:basis-1/3 xl:basis-1/5"
            >
              <ArticleCard article={article} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

const AppLayout: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, collectionsRes] = await Promise.all([
        supabase.from('ecom_products').select('*, variants:ecom_product_variants(*)').eq('status', 'active').order('created_at', { ascending: false }),
        supabase.from('ecom_collections').select('*').eq('is_visible', true).order('title'),
      ]);
      setProducts(withPriorityProducts(productsRes.data || []));
      if (collectionsRes.data) setCollections(collectionsRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const featuredArticles = articles.filter(a => a.featured);
  const latestArticles = articles.slice(0, 10);
  const editorChoiceArticles = [articles[2], articles[4], articles[6], articles[8], articles[1], articles[3], articles[5]].filter(Boolean);
  const sidebarArticles = articles.slice(4, 8);

  const filteredProducts = activeTab === 'all'
    ? products.slice(0, 8)
    : products.filter(p => p.product_type === activeTab).slice(0, 8);

  const testimonials = [
    { name: 'Pak Harto', location: 'Jawa Tengah', text: 'Benih padi dari Trubus sangat berkualitas. Hasil panen meningkat 30% dibanding musim sebelumnya.', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006452547_a58a1448.jpg' },
    { name: 'Bu Siti', location: 'Jawa Barat', text: 'Pupuk organik Trubus membuat tanaman saya lebih sehat dan subur. Sangat direkomendasikan!', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006485671_a7e28038.png' },
    { name: 'Pak Joko', location: 'Jawa Timur', text: 'Bibit durian Musang King dari Trubus sudah berbuah di tahun ke-4. Kualitas buahnya luar biasa!', image: 'https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006455129_af46d4f2.png' },
  ];

  const showPreviousHero = () => {
    setHeroIndex(current => (current - 1 + featuredArticles.length) % featuredArticles.length);
  };

  const showNextHero = () => {
    setHeroIndex(current => (current + 1) % featuredArticles.length);
  };

  useEffect(() => {
    if (featuredArticles.length <= 1) return;

    const heroAutoplay = window.setInterval(() => {
      setHeroIndex(current => (current + 1) % featuredArticles.length);
    }, 5000);

    return () => window.clearInterval(heroAutoplay);
  }, [featuredArticles.length]);

  return (
    <div className="min-h-screen bg-gray-50 -mt-16 lg:-mt-20">
      {/* Hero Section */}
      <div className="relative min-h-[100vh] w-full flex flex-col mb-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 md:hover:scale-105"
          style={{ backgroundImage: "url('/hero-banner.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Header Elements overlaid on Hero */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar transparentOnTop />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-md tracking-tight leading-tight">
              Inovasi Agrikultur untuk <span className="text-green-400">Masa Depan</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 drop-shadow max-w-2xl mx-auto font-light leading-relaxed">
              Portal informasi tepercaya dan penyedia produk pertanian terbaik untuk memaksimalkan hasil panen Anda.
            </p>

            {/* Tiga Poin Utama */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-white drop-shadow-md">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-green-400">20+</span>
                <span className="text-xs md:text-sm font-medium tracking-wide uppercase opacity-90 mt-1">Toko Cabang</span>
              </div>
              <div className="w-px h-10 bg-white/30 hidden sm:block"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-green-400">100rb+</span>
                <span className="text-xs md:text-sm font-medium tracking-wide uppercase opacity-90 mt-1">Pengguna Aktif</span>
              </div>
              <div className="w-px h-10 bg-white/30 hidden sm:block"></div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-green-400">1985</span>
                <span className="text-xs md:text-sm font-medium tracking-wide uppercase opacity-90 mt-1">Tahun Berdiri</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tentang-kami" className="px-8 py-3.5 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-500 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Profil Perusahaan
              </Link>
              <button
                onClick={() => document.getElementById('kabar-utama')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-semibold rounded-full hover:bg-white/20 transition-all"
              >
                Jelajahi Portal
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" onClick={() => document.getElementById('kabar-utama')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-white text-xs font-medium tracking-widest uppercase">Scroll Info</span>
          <ArrowDown className="w-6 h-6 text-white animate-bounce" />
        </div>
      </div>

      <main id="portal-content" className="w-full mx-auto px-4 md:px-8 lg:px-12 py-8">

        {/* Tentang Kami Section */}
        <section className="mb-16 mt-4">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Kiri: Teks & Summary */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-4">
                  <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
                  Profil Perusahaan
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Tentang Kami
                </h2>
                <div className="space-y-5 text-gray-600 leading-relaxed text-base md:text-lg">
                  <p>
                    <strong>PT. TRUBUS MITRA SWADAYA</strong> di bawah naungan Yayasan Bina Swadaya, sebuah lembaga swadaya masyarakat yang mengelola sejumlah kegiatan pelayanan yang berorientasi pemberdayaan masyarakat.
                  </p>
                  <p>
                    Yayasan Bina Swadaya melakukan upaya membangun keswadayaan dalam organisasi dengan mengembangkan program layanan dalam beberapa program yang sangat unggul.
                  </p>
                </div>
                <div className="mt-10">
                  <Link to="/tentang-kami" className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 font-bold rounded-full hover:bg-green-100 transition-colors">
                    Pelajari Lebih Lanjut <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Kanan: Foto */}
              <div className="p-4 md:p-8 lg:p-12 lg:pl-0 flex items-stretch justify-center">
                <div className="relative w-full min-h-[300px] md:h-full rounded-3xl overflow-hidden shadow-md">
                  <img
                    src="/tentang-kami.jpg"
                    alt="Tim Yayasan Bina Swadaya"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visi Misi Section */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Kiri: Foto */}
              <div className="p-4 md:p-8 lg:p-12 lg:pr-0 flex items-stretch justify-center order-last md:order-first">
                <div className="relative w-full min-h-[300px] md:h-full rounded-3xl overflow-hidden shadow-md">
                  <img
                    src="/gallery-4.jpg"
                    alt="Visi Misi Yayasan"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Kanan: Teks & Summary */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-4">
                  <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
                  Perjalanan Kedepan
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  Visi & Misi
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                    <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      Visi Kami
                    </h3>
                    <p className="text-sm md:text-base">
                      Menjadi mitra terpercaya dan penyedia solusi agrikultur berkelanjutan, guna menyejahterakan masyarakat melalui inovasi pemberdayaan pelestarian alam.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Misi Utama
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"></span>
                        <span className="text-sm md:text-base">Memperkuat kapasitas kelembagaan masyarakat melalui kemitraan strategis.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"></span>
                        <span className="text-sm md:text-base">Meningkatkan produksi dan kualitas melalui solusi sarana prasarana yang efisien.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0"></span>
                        <span className="text-sm md:text-base">Mengembangkan jejaring usaha yang inklusif untuk menyokong ketahanan finansial komunitas lokal.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Gallery Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
                <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
                Kilas Balik
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">Galeri Kegiatan</h2>
              <p className="text-gray-600 text-sm md:text-base">Potret dedikasi kami dalam memajukan agrikultur Indonesia.</p>
            </div>
            <Link to="/galeri" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm self-start md:self-auto">
              Lihat Semua Galeri <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <GallerySection items={defaultGalleryItems} />
        </section>

        {/* TEMPORARILY HIDDEN: Berita Ticker */}
        {false && (
          <div className="mb-6 flex items-center gap-3 overflow-hidden rounded-lg bg-green-700 px-3 py-2 text-white sm:px-4">
            <span className="bg-white text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex-shrink-0">Terkini</span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <div className="ticker-track flex min-w-max items-center gap-8 whitespace-nowrap text-xs sm:text-sm">
                <span>Harga gabah naik 5% di awal musim panen 2026</span>
                <span>Pemerintah luncurkan program subsidi pupuk baru</span>
                <span>Ekspor kopi Indonesia capai rekor tertinggi</span>
                <span>Varietas padi tahan kekeringan siap diluncurkan</span>
                <span aria-hidden="true">Harga gabah naik 5% di awal musim panen 2026</span>
                <span aria-hidden="true">Pemerintah luncurkan program subsidi pupuk baru</span>
                <span aria-hidden="true">Ekspor kopi Indonesia capai rekor tertinggi</span>
                <span aria-hidden="true">Varietas padi tahan kekeringan siap diluncurkan</span>
              </div>
            </div>
          </div>
        )}

        {/* Featured Articles Section */}
        <section id="kabar-utama" className="mb-16 scroll-mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
                <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
                Kabar Utama
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Insight Terkini</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-3 gap-6">
            {/* Main featured */}
            <div className="lg:col-span-2 h-full">
              {featuredArticles[heroIndex] && (
                <div className="relative h-full">
                  <ArticleCard article={featuredArticles[heroIndex]} variant="featured" />
                  {featuredArticles.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Slide hero sebelumnya"
                        onClick={showPreviousHero}
                        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-black/40 text-white transition hover:bg-black/60"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Slide hero berikutnya"
                        onClick={showNextHero}
                        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-black/40 text-white transition hover:bg-black/60"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  {featuredArticles.length > 1 && (
                    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-black/35 px-3 py-2 backdrop-blur-sm">
                      {featuredArticles.map((article, index) => (
                        <button
                          key={article.id}
                          type="button"
                          aria-label={`Tampilkan slide ${index + 1}`}
                          onClick={() => setHeroIndex(index)}
                          className={`h-1.5 transition-all ${heroIndex === index ? 'w-8 bg-white' : 'w-4 bg-white/45'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Side articles */}
            <div className="flex h-full flex-col rounded-3xl border border-gray-50 bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-5 flex items-center gap-2 border-b border-gray-100 pb-4">
                <TrendingUp className="w-5 h-5 text-green-700" /> Berita Terpopuler
              </h3>
              <div className="flex flex-1 flex-col justify-between">
                {sidebarArticles.map(article => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))}
              </div>
            </div>
          </div>
        </section>

        <HomeArticleCarouselSection title="Artikel Terbaru" linkTo="/artikel" items={latestArticles} autoSlide slideStep={3} />

        {/* <HomeArticleCarouselSection title="Pilihan Editor" linkTo="/artikel" items={editorChoiceArticles} /> */}

        {/* Products Section */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
                <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
                Belanja Mudah
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Katalog Produk</h2>
            </div>
            <Link to="/produk" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'all' ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-green-200'}`}
            >
              Semua
            </button>
            {collections.map(col => (
              <button
                key={col.id}
                onClick={() => setActiveTab(col.title)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === col.title ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-green-200'}`}
              >
                {col.title}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-5 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* End of Article & Product Layout */}

        {/* Testimonials Preview */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
                <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
                Suara Pelanggan
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">Testimoni</h2>
            </div>
            <Link to="/testimoni" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-6">
            {testimonials.slice(0, 4).map((t, i) => (
              <div key={i} className={`bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 flex flex-col ${i >= 1 ? 'hidden lg:flex' : 'flex'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">"{t.text}"</p>
                <div className="flex gap-0.5 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mb-10">
          <a href="#" className="block rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <img
              src="/cta-ahli.png"
              alt="Konsultasi Langsung dengan Ahli Pertanian"
              className="w-full object-cover"
            />
          </a>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: marquee 20s linear infinite;
          will-change: transform;
        }
        @media (max-width: 640px) {
          .ticker-track {
            animation-duration: 14s;
          }
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
