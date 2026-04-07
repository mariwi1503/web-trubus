import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';
import { ChevronRight, Clock, User, Calendar } from 'lucide-react';

// ─── Article Detail Page ─────────────────────────────────────────────────────
export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);
  const relatedArticles = articles.filter(a => a.id !== article?.id && a.category === article?.category).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBanner /><Navbar />
        <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-2">Artikel Tidak Ditemukan</h1>
          <Link to="/artikel" className="text-green-700 hover:underline">Kembali ke daftar artikel</Link>
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
          <Link to="/artikel" className="hover:text-green-700">Artikel</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-800 font-medium line-clamp-1">{article.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
                {article.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">{article.title}</h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1"><User className="w-4 h-4" />{article.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{article.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readTime}</span>
              </div>

              <div className="rounded-xl overflow-hidden mb-6">
                <img src={article.image} alt={article.title} className="w-full aspect-[16/9] object-cover" />
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
                <div className="prose prose-green max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Artikel Terkait</h3>
              <div className="space-y-1">
                {relatedArticles.length > 0 ? relatedArticles.map(a => (
                  <ArticleCard key={a.id} article={a} variant="horizontal" />
                )) : (
                  articles.slice(0, 3).map(a => (
                    <ArticleCard key={a.id} article={a} variant="horizontal" />
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Artikel Populer</h3>
              <div className="space-y-3">
                {articles.slice(0, 5).map(a => (
                  <ArticleCard key={a.id} article={a} variant="compact" />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
