import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { articleCategories } from '@/data/articles';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('ecom_collections').select('id, title, handle').eq('is_visible', true).order('title')
      .then(({ data }) => { if (data) setCollections(data); });
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/69cc6ef559614323ecb418b6_1775005534622_8cc099ee.png"
              alt="Trubus"
              className="h-8 mb-4"
            />
            <p className="text-sm text-gray-400 mb-4">
              Portal informasi pertanian terlengkap di Indonesia. Menyajikan berita, tips, dan produk pertanian berkualitas.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kategori Artikel */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Kategori Artikel</h4>
            <ul className="space-y-2">
              {articleCategories.map(cat => (
                <li key={cat.slug}>
                  <Link to={`/artikel/kategori/${cat.slug}`} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategori Produk */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Kategori Produk</h4>
            <ul className="space-y-2">
              {collections.map(col => (
                <li key={col.id}>
                  <Link to={`/collections/${col.handle}`} className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                    {col.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Jl. Gunung Sahari III No.7, Jakarta Pusat 10610</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(021) 420-2255</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>redaksi@trubus.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">&copy; 2026 Trubus. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Kebijakan Privasi</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Syarat & Ketentuan</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Peta Situs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
