import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';

export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchCollectionProducts = async () => {
      if (!handle) return;
      setLoading(true);

      const { data: collectionData } = await supabase
        .from('ecom_collections')
        .select('*')
        .eq('handle', handle)
        .single();

      if (!collectionData) { setLoading(false); return; }
      setCollection(collectionData);

      const { data: productLinks } = await supabase
        .from('ecom_product_collections')
        .select('product_id, position')
        .eq('collection_id', collectionData.id)
        .order('position');

      if (!productLinks || productLinks.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const productIds = productLinks.map(pl => pl.product_id);
      const { data: productsData } = await supabase
        .from('ecom_products')
        .select('*, variants:ecom_product_variants(*)')
        .in('id', productIds)
        .eq('status', 'active');

      const sortedProducts = productIds
        .map(id => productsData?.find(p => p.id === id))
        .filter(Boolean);

      setProducts(sortedProducts);
      setLoading(false);
    };

    fetchCollectionProducts();
  }, [handle]);

  const sortedProducts = [...products].sort((a, b) => {
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
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/produk" className="hover:text-green-700">Produk</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">{collection?.title || 'Loading...'}</span>
        </nav>

        {collection && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{collection.title}</h1>
            {collection.description && <p className="text-gray-500">{collection.description}</p>}
          </div>
        )}

        {/* Sort */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">{products.length} produk ditemukan</p>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="default">Urutkan</option>
              <option value="price-asc">Harga: Rendah ke Tinggi</option>
              <option value="price-desc">Harga: Tinggi ke Rendah</option>
              <option value="name">Nama: A-Z</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">Belum ada produk dalam koleksi ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
