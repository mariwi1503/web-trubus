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

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/artikel" className="hover:text-green-700">Artikel</Link>
          {currentCategory && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-800 font-medium">{currentCategory.name}</span>
            </>
          )}
        </nav>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentCategory?.name || 'Semua Artikel'}</h1>
        <p className="text-gray-500 mb-6">{filtered.length} artikel ditemukan</p>

        {/* Search & Category Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari artikel..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Link to="/artikel" className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${!category ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
              Semua
            </Link>
            {articleCategories.map(cat => (
              <Link key={cat.slug} to={`/artikel/kategori/${cat.slug}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${category === cat.slug ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16"><p className="text-gray-500">Tidak ada artikel ditemukan.</p></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
