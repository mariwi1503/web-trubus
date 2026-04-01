import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order');

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />

      <main className="max-w-[600px] mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-700" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Berhasil!</h1>
          <p className="text-gray-500 mb-6">Terima kasih atas pesanan Anda. Kami akan segera memproses pengiriman.</p>

          {orderId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">ID Pesanan</p>
              <p className="text-sm font-mono font-medium text-gray-800">{orderId}</p>
            </div>
          )}

          <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-8">
            <Package className="w-4 h-4" />
            <span>Email konfirmasi telah dikirim ke alamat email Anda</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/" className="flex-1 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
              Kembali ke Beranda <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/produk" className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Belanja Lagi
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
