import React from 'react';
import { Link } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight, Truck } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const formatPrice = (cents: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cents);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium">Keranjang</span>
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Keranjang Belanja</h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Keranjang Anda kosong</h2>
            <p className="text-gray-500 mb-6">Temukan produk pertanian berkualitas di katalog kami</p>
            <Link to="/produk" className="inline-block px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
              Belanja Sekarang
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.product_id + (item.variant_id || '')} className="bg-white rounded-xl border border-gray-100 p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</h3>
                    {item.variant_title && <p className="text-xs text-gray-400 mt-0.5">{item.variant_title}</p>}
                    <p className="text-green-700 font-bold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product_id, item.variant_id, item.quantity - 1)} className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product_id, item.variant_id, item.quantity + 1)} className="w-7 h-7 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product_id, item.variant_id)} className="text-red-400 hover:text-red-600 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-20">
                <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} item)</span>
                    <span className="font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-green-700">
                    <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Ongkir</span>
                    <span className="font-medium">Gratis</span>
                  </div>
                  <div className="border-t border-gray-100 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-green-700 text-lg">{formatPrice(cartTotal)}</span>
                  </div>
                </div>
                <Link to="/checkout" className="block w-full mt-4 py-3 bg-green-700 text-white text-center font-semibold rounded-xl hover:bg-green-600 transition-colors">
                  Lanjut ke Pembayaran
                </Link>
                <Link to="/produk" className="block text-center text-sm text-green-700 mt-3 hover:underline">
                  Lanjut Belanja
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
