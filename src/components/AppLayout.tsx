import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import TopBanner from './TopBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from './AuthModal';
import ProductCard from './ProductCard';
import ArticleCard from './ArticleCard';
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { articles } from '@/data/articles';
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

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
    if (!api || !autoSlide || items.length <= 5) return;

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
    <section className="mb-10 border-t-4 border-gray-900 pt-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <Link to={linkTo} className="text-sm text-green-700 font-medium hover:underline flex items-center gap-1">
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
        <CarouselContent className="-ml-5">
          {items.map(article => (
            <CarouselItem
              key={article.id}
              className="pl-5 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
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
      if (productsRes.data) setProducts(productsRes.data);
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
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <Navbar />
      <AuthModal />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Breaking News Ticker */}
        <div className="bg-green-700 text-white rounded-lg px-4 py-2 mb-6 flex items-center gap-3 overflow-hidden">
          <span className="bg-white text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex-shrink-0">Terkini</span>
          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-sm animate-marquee inline-block">
              Harga gabah naik 5% di awal musim panen 2026 &nbsp;&bull;&nbsp; Pemerintah luncurkan program subsidi pupuk baru &nbsp;&bull;&nbsp; Ekspor kopi Indonesia capai rekor tertinggi &nbsp;&bull;&nbsp; Varietas padi tahan kekeringan siap diluncurkan
            </p>
          </div>
        </div>

        {/* Featured Articles Section */}
        <section className="mb-10">
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
            <div className="flex h-full flex-col border border-gray-100 bg-white p-4">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-700" /> Berita Terpopuler
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

        <HomeArticleCarouselSection title="Pilihan Editor" linkTo="/artikel" items={editorChoiceArticles} />

        {/* Products Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Katalog Produk</h2>
            <Link to="/produk" className="text-sm text-green-700 font-medium hover:underline flex items-center gap-1">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Testimonials Preview */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Testimoni Pelanggan</h2>
            <Link to="/testimoni" className="text-sm text-green-700 font-medium hover:underline flex items-center gap-1">
              Lihat Semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
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
          <div className="relative rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('https://d64gsuwffb70l.cloudfront.net/69cc6ff67cc2d384c9d190e0_1775006245990_69a87c68.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/70" />
            <div className="relative px-8 py-12 text-center md:text-left md:flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Konsultasi Langsung dengan Ahli Pertanian</h2>
                <p className="text-green-100 text-sm md:text-base">Dapatkan arahan budidaya, solusi hama, rekomendasi pemupukan, dan pendampingan yang lebih tepat lewat layanan konsultasi pertanian kami.</p>
              </div>
              <Link to="/produk" className="mt-4 md:mt-0 inline-block px-6 py-3 bg-white text-green-800 font-bold rounded-lg hover:bg-green-50 transition-colors">
                Dapatkan Aplikasi!
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
