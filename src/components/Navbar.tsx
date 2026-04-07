import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Search, Menu, X, ChevronDown, ArrowRight, Mail, MessageCircleMore } from 'lucide-react';
import { articleCategories } from '@/data/articles';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Collection {
  id: string;
  title: string;
  handle: string;
}

interface NavbarProps {
  transparentOnTop?: boolean;
}

const MITRA_EMAIL = 'redaksi@trubus.id';
const MITRA_WHATSAPP_URL = 'https://wa.me/62214202255?text=Halo%20Trubus%2C%20saya%20tertarik%20menjadi%20mitra.';

const Navbar: React.FC<NavbarProps> = ({ transparentOnTop = false }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [artikelOpen, setArtikelOpen] = useState(false);
  const [produkOpen, setProdukOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mitraOpen, setMitraOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 10);
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isTransparent = transparentOnTop && !isScrolled;
  const navBgClass = isTransparent ? 'bg-black/30 border-transparent text-white backdrop-blur-sm' : 'bg-white border-gray-200 text-gray-800 shadow-sm';
  const textClass = isTransparent ? 'text-white hover:text-green-300' : 'text-gray-800 hover:text-green-700';

  return (
    <>
      <nav className={`transition-all duration-300 border-b fixed top-0 left-0 right-0 z-50 ${navBgClass}`}>
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Left side: Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={isTransparent ? "/icons/Logo-Trubus-putih.png" : "/icons/Logo-Trubus-hijau.png"}
                alt="Toko Trubus"
                className="h-12 md:h-12 w-auto object-contain transition-all duration-300"
              />
            </Link>

            {/* Right side: Nav Menu & Actions */}
            <div className="flex items-center gap-2 md:gap-6">

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-1">
                <Link to="/" className={`px-3 py-2 text-sm font-semibold transition-colors ${textClass}`}>
                  Home
                </Link>

                {/* Artikel dropdown */}
                <div ref={artikelRef} className="relative">
                  <button
                    onClick={() => { setArtikelOpen(!artikelOpen); setProdukOpen(false); }}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors ${textClass}`}
                  >
                    Artikel <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {artikelOpen && (
                    <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] z-50 text-left">
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
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors ${textClass}`}
                  >
                    Produk <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {produkOpen && (
                    <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[200px] z-50 text-left">
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

                <Link to="/testimoni" className={`px-3 py-2 text-sm font-semibold transition-colors ${textClass}`}>
                  Testimoni
                </Link>
                <Link to="/galeri" className={`px-3 py-2 text-sm font-semibold transition-colors ${textClass}`}>
                  Galeri
                </Link>
                <Link to="/tentang-kami" className={`px-3 py-2 text-sm font-semibold transition-colors ${textClass}`}>
                  Tentang Kami
                </Link>
                <Link to="/karir" className={`px-3 py-2 text-sm font-semibold transition-colors ${textClass}`}>
                  Karir
                </Link>
              </div>

              {/* Actions: Search & CTA */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button onClick={() => setSearchOpen(!searchOpen)} className={`p-2 rounded-full transition-colors ${textClass} hover:bg-black/5`}>
                    <Search className="w-5 h-5" />
                  </button>
                  {searchOpen && (
                    <form onSubmit={handleSearch} className="absolute right-0 top-full mt-2 bg-white shadow-xl rounded-lg border p-2 z-50 w-72">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Cari artikel atau produk..."
                        className="w-full px-3 py-2 border rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        autoFocus
                      />
                    </form>
                  )}
                </div>

                {/* Collaboration / Mitra CTA */}
                <button
                  type="button"
                  onClick={() => setMitraOpen(true)}
                  className="hidden lg:inline-flex px-5 py-2 text-sm font-bold rounded-full transition-colors whitespace-nowrap shadow-sm bg-green-600 text-white hover:bg-green-500"
                >
                  Bergabung Menjadi Mitra
                </button>

                {/* Mobile hamburger */}
                <button className={`lg:hidden p-2 transition-colors ${textClass}`} onClick={() => setMobileOpen(!mobileOpen)}>
                  {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
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
            <Link to="/galeri" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-semibold text-gray-800">Galeri</Link>
            <Link to="/tentang-kami" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-semibold text-gray-800">Tentang Kami</Link>
            <Link to="/karir" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm font-semibold text-gray-800">Karir</Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setMitraOpen(true);
              }}
              className="block mx-4 mt-2 px-4 py-3 text-center text-sm font-bold rounded-full transition-colors shadow-sm bg-green-600 text-white hover:bg-green-500"
            >
              Bergabung Menjadi Mitra
            </button>
          </div>
        )}
      </nav>

      <Dialog open={mitraOpen} onOpenChange={setMitraOpen}>
        <DialogContent className="max-w-md rounded-[2rem] p-6 shadow-xl border-gray-100">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-center text-xl font-extrabold text-gray-900">
              Hubungi Kami
            </DialogTitle>
            <DialogDescription className="sr-only">
              Opsi untuk menghubungi tim Trubus
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <a
              href={`mailto:${MITRA_EMAIL}?subject=Kemitraan%20Trubus`}
              className="flex flex-col items-center gap-3 rounded-3xl bg-green-700 p-6 transition-all hover:-translate-y-1 hover:shadow-lg group text-center text-white border border-green-800"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 shadow-inner transition-colors group-hover:bg-white/30">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block font-bold text-lg">Email</span>
                <span className="block text-xs text-green-100 mt-1 break-all px-1">{MITRA_EMAIL}</span>
              </div>
            </a>
            <a
              href={MITRA_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-3 rounded-3xl bg-[#25D366] p-6 transition-all hover:-translate-y-1 hover:shadow-lg group text-center text-white border border-[#1DA851]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 shadow-inner transition-colors group-hover:bg-white/30">
                <MessageCircleMore className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block font-bold text-lg">WhatsApp</span>
                <span className="block text-xs text-emerald-50 mt-1 break-all px-1">(021) 420-2255</span>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
