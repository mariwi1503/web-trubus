import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@/lib/supabase';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { useCart } from '@/contexts/CartContext';
import { ChevronRight, Truck, Lock } from 'lucide-react';

const STRIPE_ACCOUNT_ID = 'STRIPE_ACCOUNT_ID';
const stripePromise = STRIPE_ACCOUNT_ID && STRIPE_ACCOUNT_ID !== 'STRIPE_ACCOUNT_ID'
  ? loadStripe('pk_live_51OJhJBHdGQpsHqInIzu7c6PzGPSH0yImD4xfpofvxvFZs0VFhPRXZCyEgYkkhOtBOXFWvssYASs851mflwQvjnrl00T6DbUwWZ', { stripeAccount: STRIPE_ACCOUNT_ID })
  : null;

function PaymentForm({ onSuccess }: { onSuccess: (pi: any) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');
    const { error: submitError, paymentIntent } = await stripe.confirmPayment({ elements, redirect: 'if_required' });
    if (submitError) {
      setError(submitError.message || 'Pembayaran gagal');
      setLoading(false);
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button type="submit" disabled={!stripe || loading}
        className="w-full mt-4 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors">
        <Lock className="w-4 h-4" />
        {loading ? 'Memproses...' : 'Bayar Sekarang'}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [shippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [address, setAddress] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', zip: '', country: 'Indonesia' });

  const formatPrice = (cents: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cents);

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let taxAmount = 0;
    try {
      const { data } = await supabase.functions.invoke('calculate-tax', { body: { state: address.state, subtotal: cartTotal } });
      if (data?.success) { taxAmount = data.taxCents; setTax(taxAmount); }
    } catch {}
    const total = cartTotal + shippingCost + taxAmount;
    if (total <= 0) return;
    const { data, error } = await supabase.functions.invoke('create-payment-intent', { body: { amount: total, currency: 'usd' } });
    if (error || !data?.clientSecret) { setPaymentError('Gagal menginisialisasi pembayaran.'); setStep('payment'); return; }
    setClientSecret(data.clientSecret);
    setStep('payment');
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    const { data: customer } = await supabase.from('ecom_customers').upsert({ email: address.email, name: address.name, phone: address.phone }, { onConflict: 'email' }).select('id').single();
    const orderTotal = cartTotal + shippingCost + tax;
    const { data: order } = await supabase.from('ecom_orders').insert({ customer_id: customer?.id, status: 'paid', subtotal: cartTotal, tax, shipping: shippingCost, total: orderTotal, shipping_address: address, stripe_payment_intent_id: paymentIntent.id }).select('id').single();
    if (order) {
      const orderItems = cart.map(item => ({ order_id: order.id, product_id: item.product_id, variant_id: item.variant_id || null, product_name: item.name, variant_title: item.variant_title || null, sku: item.sku || null, quantity: item.quantity, unit_price: item.price, total: item.price * item.quantity }));
      await supabase.from('ecom_order_items').insert(orderItems);
      try {
        const { data: items } = await supabase.from('ecom_order_items').select('*').eq('order_id', order.id);
        await fetch('https://famous.ai/api/ecommerce/PROJECT_ID/send-confirmation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId: order.id, customerEmail: address.email, customerName: address.name, orderItems: items, subtotal: cartTotal, shipping: shippingCost, tax, total: orderTotal, shippingAddress: address }) });
      } catch {}
    }
    clearCart();
    navigate(`/order-confirmation?order=${order?.id}`);
  };

  if (cart.length === 0 && step === 'shipping') {
    return (<div className="min-h-screen bg-gray-50"><TopBanner /><Navbar /><AuthModal /><div className="max-w-[1200px] mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold mb-2">Keranjang Kosong</h1><Link to="/produk" className="text-green-700 hover:underline">Belanja sekarang</Link></div><Footer /></div>);
  }

  const total = cartTotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />
      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6"><Link to="/" className="hover:text-green-700">Home</Link><ChevronRight className="w-3 h-3" /><span className="text-gray-800 font-medium">Checkout</span></nav>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex gap-4 mb-6">
              <button onClick={() => setStep('shipping')} className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg ${step === 'shipping' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-500'}`}>1. Alamat Pengiriman</button>
              <div className={`flex-1 py-2 text-center text-sm font-semibold rounded-lg ${step === 'payment' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-500'}`}>2. Pembayaran</div>
            </div>
            {step === 'shipping' ? (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Alamat Pengiriman</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label><input type="text" required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" required value={address.email} onChange={e => setAddress({...address, email: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label><input type="tel" required value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                  <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label><input type="text" required value={address.address} onChange={e => setAddress({...address, address: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Kota</label><input type="text" required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label><input type="text" required value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label><input type="text" required value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Negara</label><input type="text" value={address.country} onChange={e => setAddress({...address, country: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" /></div>
                </div>
                <button type="submit" className="w-full mt-6 py-3 bg-green-700 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">Lanjut ke Pembayaran</button>
              </form>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Pembayaran</h2>
                {!stripePromise ? (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg"><p className="text-yellow-800 text-sm">Sistem pembayaran sedang disiapkan. Silakan coba beberapa saat lagi.</p></div>
                ) : paymentError ? (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg"><p className="text-red-800 text-sm">{paymentError}</p></div>
                ) : clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}><PaymentForm onSuccess={handlePaymentSuccess} /></Elements>
                ) : (
                  <div className="flex items-center justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700" /><span className="ml-3 text-gray-500">Memuat...</span></div>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.product_id + (item.variant_id || '')} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p><p className="text-xs text-gray-400">x{item.quantity}</p></div>
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
                <div className="flex justify-between text-green-700"><span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Ongkir</span><span>Gratis</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Pajak</span><span>{formatPrice(tax)}</span></div>
                <div className="border-t border-gray-100 pt-2 flex justify-between"><span className="font-bold text-gray-900">Total</span><span className="font-bold text-green-700 text-lg">{formatPrice(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
