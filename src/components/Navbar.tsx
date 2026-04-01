import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { articleCategories } from '@/data/articles';

interface Collection {
  id: string;
  title: string;
  handle: string;
}

const Navbar: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [artikelOpen, setArtikelOpen] = useState(false);
  const [produkOpen, setProdukOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout, setShowAuthModal } = useAuth();
  const navigate = useNavigate();
  const artikelRef = useRef<HTMLDivElement>(null);
  const produkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await supabase
        .from('ecom_collections')
        .select('id, title, handle')
        .eq('is_visible', true)
        .order('title');
      if (data) setCollections(data);
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (artikelRef.current && !artikelRef.current.contains(e.target as Node)) setArtikelOpen(false);
      if (produkRef.current && !produkRef.current.contains(e.target as Node)) setProdukOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          {/* Left nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className="px-3 py-2 text-sm font-semibold text-gray-800 hover:text-green-700 transition-colors">
              Home
            </Link>

            {/* Artikel dropdown */}
            <div ref={artikelRef} className="relative">
              <button
                onClick={() => { setArtikelOpen(!artikelOpen); setProdukOpen(false); }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-800 hover:text-green-700 transition-colors"
              >
                Artikel <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {artikelOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] z-50">
                  <Link to="/artikel" onClick={() => setArtikelOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium">
                    Semua Artikel
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  {articleCategories.map(cat => (
                    <Link
                      key={cat.slug}
                      to={`/artikel/kategori/${cat.slug}`}
                      onClick={() => setArtikelOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Produk dropdown */}
            <div ref={produkRef} className="relative">
              <button
                onClick={() => { setProdukOpen(!produkOpen); setArtikelOpen(false); }}
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-800 hover:text-green-700 transition-colors"
              >
                Produk <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {produkOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] z-50">
                  <Link to="/produk" onClick={() => setProdukOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 font-medium">
                    Semua Produk
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  {collections.map(col => (
                    <Link
                      key={col.id}
                      to={`/collections/${col.handle}`}
                      onClick={() => setProdukOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700"
                    >
                      {col.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/testimoni" className="px-3 py-2 text-sm font-semibold text-gray-800 hover:text-green-700 transition-colors">
              Testimoni
            </Link>
            <Link to="/tentang-kami" className="px-3 py-2 text-sm font-semibold text-gray-800 hover:text-green-700 transition-colors">
              Tentang Kami
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-gray-600 hover:text-green-700">
                <Search className="w-5 h-5" />
              </button>
              {searchOpen && (
                <form onSubmit={handleSearch} className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-lg border p-2 z-50 w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cari artikel atau produk..."
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    autoFocus
                  />
                </form>
              )}
            </div>

            {/* Cart */}
            <Link to="/keranjang" className="relative p-2 text-gray-600 hover:text-green-700">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-1 p-2 text-gray-600 hover:text-green-700">
                  <User className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">{user?.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-1 bg-white shadow-xl rounded-lg border py-2 min-w-[150px] hidden group-hover:block z-50">
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600">
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="p-2 text-gray-600 hover:text-green-700">
                <User className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-semibold text-gray-800">Home</Link>
          <div className="px-4 py-2">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Artikel</p>
            {articleCategories.map(cat => (
              <Link key={cat.slug} to={`/artikel/kategori/${cat.slug}`} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-gray-600">
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="px-4 py-2 border-t border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Produk</p>
            {collections.map(col => (
              <Link key={col.id} to={`/collections/${col.handle}`} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-gray-600">
                {col.title}
              </Link>
            ))}
          </div>
          <Link to="/testimoni" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-semibold text-gray-800 border-t border-gray-100">Testimoni</Link>
          <Link to="/tentang-kami" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-semibold text-gray-800">Tentang Kami</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
