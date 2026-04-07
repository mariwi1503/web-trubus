import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { withPriorityProducts } from '@/lib/priority-products';
import { Search, SlidersHorizontal, ChevronRight } from 'lucide-react';

export default function ProductListPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      const [pRes, cRes] = await Promise.all([
        supabase.from('ecom_products').select('*, variants:ecom_product_variants(*)').eq('status', 'active'),
        supabase.from('ecom_collections').select('*').eq('is_visible', true).order('title'),
      ]);
      setProducts(withPriorityProducts(pRes.data || []));
      if (cRes.data) setCollections(cRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  let filtered = products.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === 'all' || p.product_type === activeType;
    return matchSearch && matchType;
  });

  filtered = [...filtered].sort((a, b) => {
    const priceA = a.variants?.[0]?.price || a.price;
    const priceB = b.variants?.[0]?.price || b.price;
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner />
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-10">


        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
            <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
            Belanja Mudah
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">Katalog Produk</h1>
          <p className="text-gray-500 text-base">{loading ? 'Memuat produk...' : `${filtered.length} produk ditemukan`}</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari produk..."
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-700"
              >
                <option value="default">Urutkan</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
                <option value="name">Nama: A-Z</option>
              </select>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeType === 'all' ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Semua
            </button>
            {collections.map(col => (
              <button
                key={col.id}
                onClick={() => setActiveType(col.title)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeType === col.title ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {col.title}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <p className="text-gray-400 text-lg font-medium">Tidak ada produk ditemukan.</p>
            <p className="text-gray-400 text-sm mt-1">Coba kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
