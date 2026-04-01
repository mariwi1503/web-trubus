import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
  variant?: 'featured' | 'horizontal' | 'compact' | 'default';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <Link to={`/artikel/${article.slug}`} className="group relative block h-full min-h-[420px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span className="inline-block bg-green-700 text-white text-[10px] font-bold px-2 py-0.5 uppercase mb-2">
            {article.category}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-green-300 transition-colors">
            {article.title}
          </h2>
          <p className="text-sm text-gray-300 line-clamp-2 mb-2">{article.excerpt}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
            <span>{article.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/artikel/${article.slug}`} className="group flex gap-4 py-3 border-b border-gray-100 last:border-0">
        <img src={article.image} alt={article.title} className="w-28 h-20 object-cover flex-shrink-0" />
        <div className="min-w-0">
          <span className="text-[10px] font-bold text-green-700 uppercase">{article.category}</span>
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-green-700 line-clamp-2 transition-colors leading-snug mt-0.5">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1">
            <span>{article.date}</span>
            <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{article.readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/artikel/${article.slug}`} className="group flex gap-3 items-start">
        <div className="w-2 h-2 rounded-full bg-green-700 mt-2 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-gray-700 group-hover:text-green-700 line-clamp-2 transition-colors">{article.title}</h4>
          <span className="text-[11px] text-gray-400">{article.date}</span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/artikel/${article.slug}`} className="group bg-white overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="aspect-[16/10] overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <span className="text-[10px] font-bold text-green-700 uppercase">{article.category}</span>
        <h3 className="text-base font-semibold text-gray-800 group-hover:text-green-700 line-clamp-2 transition-colors leading-snug mt-1 mb-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{article.excerpt}</p>
        <div className="flex items-center gap-3 text-[11px] text-gray-400">
          <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
