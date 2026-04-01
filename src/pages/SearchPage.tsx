import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import ProductCard from '@/components/ProductCard';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';
import { ChevronRight, Search } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('ecom_products')
        .select('*, variants:ecom_product_variants(*)')
        .eq('status', 'active')
        .ilike('name', `%${query}%`);
      if (data) setProducts(data);
      setLoading(false);
    };
    if (query) fetchProducts();
  }, [query]);

  const matchedArticles = articles.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">Pencarian</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Hasil pencarian untuk "{query}"
        </h1>
        <p className="text-gray-500 mb-8">{products.length + matchedArticles.length} hasil ditemukan</p>

        {/* Products */}
        {products.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Produk ({products.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}

        {/* Articles */}
        {matchedArticles.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Artikel ({matchedArticles.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {matchedArticles.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </section>
        )}

        {products.length === 0 && matchedArticles.length === 0 && !loading && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada hasil untuk "{query}"</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
