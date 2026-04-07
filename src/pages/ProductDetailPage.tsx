import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProductCtaLinks } from '@/lib/product-links';
import { getPriorityProductByHandle, getRelatedPriorityProducts, withPriorityProducts } from '@/lib/priority-products';
import { ChevronRight, ExternalLink, Truck, Shield, Package } from 'lucide-react';

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setSelectedVariant(null);
      setSelectedSize('');
      setLoading(true);

      const { data } = await supabase
        .from('ecom_products')
        .select('*, variants:ecom_product_variants(*)')
        .eq('handle', handle)
        .single();

      const fallbackProduct = getPriorityProductByHandle(handle);
      const resolvedProduct = data || fallbackProduct;

      if (resolvedProduct) {
        const currentProduct = { ...resolvedProduct };
        let variants = data?.variants || currentProduct.variants || [];
        if (data?.has_variants && variants.length === 0) {
          const { data: variantData } = await supabase
            .from('ecom_product_variants')
            .select('*')
            .eq('product_id', data.id)
            .order('position');
          variants = variantData || [];
          currentProduct.variants = variants;
        }

        setProduct(currentProduct);

        if (variants.length > 0) {
          const sorted = [...variants].sort((a: any, b: any) => (a.position || 0) - (b.position || 0));
          const firstInStock = sorted.find((v: any) => v.inventory_qty == null || v.inventory_qty > 0) || sorted[0];
          setSelectedVariant(firstInStock);
          setSelectedSize(firstInStock?.option1 || '');
        }

        // Fetch related products
        const { data: related } = await supabase
          .from('ecom_products')
          .select('*, variants:ecom_product_variants(*)')
          .eq('product_type', currentProduct.product_type)
          .neq('id', data?.id || '')
          .eq('status', 'active')
          .limit(4);

        const mergedRelatedProducts = withPriorityProducts(related || [])
          .filter((relatedProduct: any) => relatedProduct.handle !== currentProduct.handle)
          .filter((relatedProduct: any) => relatedProduct.product_type === currentProduct.product_type)
          .slice(0, 4);

        if (mergedRelatedProducts.length > 0) {
          setRelatedProducts(mergedRelatedProducts);
        } else {
          setRelatedProducts(getRelatedPriorityProducts(currentProduct.handle, currentProduct.product_type, 4));
        }
      } else {
        setProduct(null);
        setRelatedProducts([]);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [handle]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    const variant = product?.variants?.find((v: any) =>
      v.option1 === size || v.title?.toLowerCase().includes(size.toLowerCase())
    );
    if (variant) setSelectedVariant(variant);
  };

  const variantSizes = [...new Set(product?.variants?.map((v: any) => v.option1).filter(Boolean) || [])];
  const hasVariants = product?.has_variants && product?.variants?.length > 0;

  const getInStock = (): boolean => {
    if (selectedVariant) {
      if (selectedVariant.inventory_qty == null) return true;
      return selectedVariant.inventory_qty > 0;
    }
    if (product?.variants && product.variants.length > 0) {
      return product.variants.some((v: any) => v.inventory_qty == null || v.inventory_qty > 0);
    }
    if (product?.has_variants) return true;
    if (product?.inventory_qty == null) return true;
    return product.inventory_qty > 0;
  };
  const inStock = getInStock();

  const currentPrice = selectedVariant?.price || product?.price || 0;
  const ctaLinks = product ? getProductCtaLinks(product) : [];
  const formatPrice = (cents: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cents);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBanner /><Navbar />
        <div className="max-w-[1200px] mx-auto px-4 py-10">
          <div className="animate-pulse grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-xl" />
            <div className="space-y-4"><div className="h-6 bg-gray-200 rounded w-1/3" /><div className="h-8 bg-gray-200 rounded w-3/4" /><div className="h-6 bg-gray-200 rounded w-1/4" /></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBanner /><Navbar />
        <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h1>
          <Link to="/produk" className="text-green-700 hover:underline">Kembali ke katalog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/produk" className="hover:text-green-700">Produk</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
            <img src={product.images?.[0]} alt={product.name} className="w-full aspect-square object-cover" />
          </div>

          {/* Details */}
          <div>
            <span className="text-xs font-bold text-green-700 uppercase">{product.product_type}</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1 mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-green-700 mb-4">{formatPrice(currentPrice)}</p>

            {product.description && (
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            )}

            {/* Variant selector */}
            {variantSizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-2">Pilih Varian</label>
                <div className="flex flex-wrap gap-2">
                  {variantSizes.map((size: string) => {
                    const variant = product.variants?.find((v: any) => v.option1 === size);
                    const sizeInStock = variant ? (variant.inventory_qty == null || variant.inventory_qty > 0) : true;
                    return (
                      <button
                        key={size}
                        onClick={() => sizeInStock && handleSizeSelect(size)}
                        disabled={!sizeInStock}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-green-700 text-white border-green-700'
                            : sizeInStock
                            ? 'border-gray-300 hover:border-green-400 text-gray-700'
                            : 'border-gray-200 text-gray-300 cursor-not-allowed line-through'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-4">
              <p className="text-sm font-semibold text-green-800">
                {!inStock ? 'Produk sedang tidak tersedia.' : hasVariants && !selectedSize ? 'Pilih varian untuk melihat ketersediaan produk.' : 'Produk tersedia dan bisa dilihat detailnya lebih lanjut di katalog.'}
              </p>
              <p className="mt-1 text-sm text-green-700/90">
                Jika produk ini cocok, lanjutkan lewat kanal resmi yang lebih aman seperti marketplace atau layanan Trubus.
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-gray-900">Lanjutkan ke kanal resmi</h2>
                <span className="text-xs text-gray-400">Transaksi diarahkan ke platform eksternal</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {ctaLinks.map(link => {
                  if (link.key === 'tokopedia') {
                    return (
                      <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-xl border border-gray-200 hover:shadow-md hover:border-green-400 transition-all flex items-center justify-center bg-white py-2 px-4 group">
                        <img src="/icons/tokopedia.png" alt="Beli di Tokopedia" className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
                      </a>
                    );
                  }
                  if (link.key === 'shopee') {
                    return (
                      <a key={link.key} href={link.href} target="_blank" rel="noopener noreferrer" className="overflow-hidden rounded-xl border border-gray-200 hover:shadow-md hover:border-orange-400 transition-all flex items-center justify-center bg-white py-2 px-4 group">
                        <img src="/icons/shopee.png" alt="Beli di Shopee" className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform" />
                      </a>
                    );
                  }
                  return (
                    <a
                      key={link.key}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                        link.kind === 'consultation'
                          ? 'border border-green-200 bg-white text-green-800 hover:bg-green-50'
                          : 'bg-green-700 text-white hover:bg-green-600'
                      }`}
                    >
                      {link.label}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
              <p className="text-xs leading-relaxed text-gray-500">
                Tip: isi `tokopedia_url`, `shopee_url`, atau `halo_trubus_url` pada metadata produk bila ingin tiap tombol menuju link produk yang spesifik.
              </p>
            </div>


            {/* Metadata */}
            {product.metadata && Object.keys(product.metadata).length > 0 && (
              <div className="mt-6 border-t border-gray-100 pt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Spesifikasi Produk</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(product.metadata).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg px-3 py-2">
                      <p className="text-[11px] text-gray-400 capitalize">{key.replace(/_/g, ' ')}</p>
                      <p className="text-sm font-medium text-gray-700">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-5">Produk Terkait</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
