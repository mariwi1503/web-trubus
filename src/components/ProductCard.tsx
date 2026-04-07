import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Tag } from 'lucide-react';

interface ProductCardProps {
  product: any;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact }) => {
  const price = product.variants?.length > 0
    ? Math.min(...product.variants.map((v: any) => v.price))
    : product.price;

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cents);
  };

  const inStock = product.has_variants
    ? product.variants?.some((v: any) => v.inventory_qty == null || v.inventory_qty > 0)
    : product.inventory_qty == null || product.inventory_qty > 0;

  if (compact) {
    return (
      <Link to={`/produk/${product.handle}`} className="flex gap-3 group">
        <img src={product.images?.[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
        <div className="min-w-0">
          <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-700 line-clamp-2 transition-colors">{product.name}</h4>
          <p className="text-sm font-bold text-green-700 mt-1">{formatPrice(price)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/produk/${product.handle}`} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.tags?.includes('featured') && (
          <span className="absolute top-2 left-2 bg-green-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            Unggulan
          </span>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-full">Stok Habis</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 mb-1">
          <Tag className="w-3 h-3 text-gray-400" />
          <span className="text-[11px] text-gray-400 uppercase">{product.product_type}</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-green-700 line-clamp-2 transition-colors leading-snug mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-green-700">{formatPrice(price)}</p>
          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${inStock ? 'text-green-700' : 'text-gray-400'}`}>
            {inStock ? 'Lihat Detail' : 'Stok Habis'}
            {inStock && <ChevronRight className="w-3.5 h-3.5" />}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
