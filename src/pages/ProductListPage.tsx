import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
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
      if (pRes.data) setProducts(pRes.data);
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

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">Semua Produk</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Katalog Produk Pertanian</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari produk..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button onClick={() => setActiveType('all')} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeType === 'all' ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
              Semua
            </button>
            {collections.map(col => (
              <button key={col.id} onClick={() => setActiveType(col.title)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeType === col.title ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                {col.title}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="default">Urutkan</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
              <option value="name">Nama: A-Z</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} produk ditemukan</p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-3 space-y-2"><div className="h-3 bg-gray-200 rounded w-1/3" /><div className="h-4 bg-gray-200 rounded" /></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
