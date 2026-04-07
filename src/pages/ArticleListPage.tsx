import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import ArticleCard from '@/components/ArticleCard';
import { articles, articleCategories } from '@/data/articles';
import { ChevronRight, Search } from 'lucide-react';

export default function ArticleListPage() {
  const { category } = useParams<{ category?: string }>();
  const [search, setSearch] = useState('');

  const currentCategory = articleCategories.find(c => c.slug === category);
  const filtered = articles.filter(a => {
    const matchCat = !category || a.category.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-') === category || a.category === currentCategory?.name;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBanner /><Navbar /><AuthModal />

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-10">


        {/* Page Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-green-600 font-semibold tracking-wider uppercase text-sm mb-3">
            <span className="w-8 h-0.5 bg-green-600 rounded-full"></span>
            Insight & Informasi
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
            {currentCategory?.name || 'Semua Artikel'}
          </h1>
          <p className="text-gray-500 text-base">{filtered.length} artikel ditemukan</p>
        </div>

        {/* Search & Category Tabs */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari artikel..."
                className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              <Link
                to="/artikel"
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${!category ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Semua
              </Link>
              {articleCategories.map(cat => (
                <Link
                  key={cat.slug}
                  to={`/artikel/kategori/${cat.slug}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === cat.slug ? 'bg-green-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Article Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100">
            <p className="text-gray-400 text-lg font-medium">Tidak ada artikel ditemukan.</p>
            <p className="text-gray-400 text-sm mt-1">Coba kata kunci atau kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
