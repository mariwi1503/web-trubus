import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import TopBanner from '@/components/TopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, Clock, User, Calendar, Share2, Facebook, Twitter, MessageCircle, Reply, Send, ChevronDown, ChevronUp, CornerDownRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Comment {
  id: string;
  article_slug: string;
  parent_id: string | null;
  user_name: string;
  user_email: string;
  comment_text: string;
  created_at: string;
  replies?: Comment[];
}

// ─── Helper: build threaded tree from flat list ──────────────────────────────
function buildCommentTree(flat: Comment[]): Comment[] {
  const map: Record<string, Comment> = {};
  const roots: Comment[] = [];
  flat.forEach(c => { map[c.id] = { ...c, replies: [] }; });
  flat.forEach(c => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].replies!.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });
  return roots;
}

// ─── Time-ago formatter ──────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Baru saja';
  if (mins < 60) return `${mins} menit lalu`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} hari lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ─── Avatar color from name ──────────────────────────────────────────────────
function avatarColor(name: string): string {
  const colors = ['bg-green-600','bg-blue-600','bg-purple-600','bg-orange-600','bg-pink-600','bg-teal-600','bg-indigo-600','bg-red-600'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

// ─── Single Comment Component ────────────────────────────────────────────────
function CommentItem({ comment, depth, onReplySubmit, isAuthenticated, onLoginPrompt }: {
  comment: Comment;
  depth: number;
  onReplySubmit: (parentId: string, text: string) => Promise<void>;
  isAuthenticated: boolean;
  onLoginPrompt: () => void;
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxDepth = 4;

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    await onReplySubmit(comment.id, replyText.trim());
    setReplyText('');
    setShowReplyForm(false);
    setSubmitting(false);
  };

  return (
    <div className={`${depth > 0 ? 'ml-4 md:ml-8 pl-4 border-l-2 border-gray-100' : ''}`}>
      <div className="py-3">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className={`w-9 h-9 rounded-full ${avatarColor(comment.user_name)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
            {comment.user_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-gray-800">{comment.user_name}</span>
              <span className="text-[11px] text-gray-400">{timeAgo(comment.created_at)}</span>
            </div>
            {/* Text */}
            <p className="text-sm text-gray-700 mt-1 leading-relaxed whitespace-pre-wrap">{comment.comment_text}</p>
            {/* Actions */}
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => {
                  if (!isAuthenticated) { onLoginPrompt(); return; }
                  setShowReplyForm(!showReplyForm);
                }}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-700 transition-colors"
              >
                <Reply className="w-3.5 h-3.5" /> Balas
              </button>
              {hasReplies && (
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-green-700 transition-colors"
                >
                  {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                  {collapsed ? `Tampilkan ${comment.replies!.length} balasan` : 'Sembunyikan balasan'}
                </button>
              )}
            </div>
            {/* Reply form */}
            {showReplyForm && (
              <div className="mt-3 flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder={`Balas ${comment.user_name}...`}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={handleReply}
                    disabled={submitting || !replyText.trim()}
                    className="px-3 py-2 bg-green-700 text-white rounded-lg text-xs font-medium hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" /> {submitting ? '...' : 'Kirim'}
                  </button>
                  <button
                    onClick={() => { setShowReplyForm(false); setReplyText(''); }}
                    className="px-3 py-1 text-xs text-gray-400 hover:text-gray-600"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Threaded replies */}
      {hasReplies && !collapsed && (
        <div>
          {comment.replies!.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={Math.min(depth + 1, maxDepth)}
              onReplySubmit={onReplySubmit}
              isAuthenticated={isAuthenticated}
              onLoginPrompt={onLoginPrompt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Comments Section ────────────────────────────────────────────────────────
function CommentsSection({ slug }: { slug: string }) {
  const { user, isAuthenticated, setShowAuthModal } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [tree, setTree] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from('article_comments')
      .select('*')
      .eq('article_slug', slug)
      .order('created_at', { ascending: true });
    if (data) {
      setComments(data);
      const builtTree = buildCommentTree(data);
      setTree(sortBy === 'newest' ? builtTree.reverse() : builtTree);
    }
    setLoading(false);
  }, [slug, sortBy]);

  useEffect(() => { fetchComments(); }, [fetchComments]);

  useEffect(() => {
    const sorted = buildCommentTree([...comments]);
    setTree(sortBy === 'newest' ? sorted.reverse() : sorted);
  }, [sortBy, comments]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated || !user) return;
    setSubmitting(true);
    const { error } = await supabase.from('article_comments').insert({
      article_slug: slug,
      parent_id: null,
      user_name: user.name,
      user_email: user.email,
      comment_text: newComment.trim(),
    });
    if (!error) {
      setNewComment('');
      await fetchComments();
    }
    setSubmitting(false);
  };

  const handleReplySubmit = async (parentId: string, text: string) => {
    if (!user) return;
    await supabase.from('article_comments').insert({
      article_slug: slug,
      parent_id: parentId,
      user_name: user.name,
      user_email: user.email,
      comment_text: text,
    });
    await fetchComments();
  };

  const totalCount = comments.length;

  return (
    <div className="mt-8">
      <div className="bg-white rounded-xl border border-gray-100 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-green-700" />
            Komentar
            {totalCount > 0 && (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full">{totalCount}</span>
            )}
          </h3>
          {totalCount > 1 && (
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'newest' | 'oldest')}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
            >
              <option value="newest">Terbaru</option>
              <option value="oldest">Terlama</option>
            </select>
          )}
        </div>

        {/* New comment form */}
        {isAuthenticated && user ? (
          <form onSubmit={handleSubmitComment} className="mb-6">
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-full ${avatarColor(user.name)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 mb-1.5">Komentar sebagai <span className="text-green-700">{user.name}</span></p>
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Tulis komentar Anda..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-400"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={submitting || !newComment.trim()}
                    className="px-5 py-2 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Mengirim...' : 'Kirim Komentar'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="mb-6 bg-gray-50 rounded-xl p-5 text-center">
            <MessageCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500 mb-3">Masuk untuk meninggalkan komentar</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-5 py-2 bg-green-700 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              Masuk / Daftar
            </button>
          </div>
        )}

        {/* Comments list */}
        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : tree.length === 0 ? (
          <div className="text-center py-8">
            <CornerDownRight className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {tree.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                depth={0}
                onReplySubmit={handleReplySubmit}
                isAuthenticated={isAuthenticated}
                onLoginPrompt={() => setShowAuthModal(true)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Article Detail Page ─────────────────────────────────────────────────────
export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);
  const relatedArticles = articles.filter(a => a.id !== article?.id && a.category === article?.category).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBanner /><Navbar /><AuthModal />
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
      <TopBanner /><Navbar /><AuthModal />

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

              {/* Share */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-sm font-medium text-gray-600 flex items-center gap-1"><Share2 className="w-4 h-4" /> Bagikan:</span>
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')} className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </article>

            {/* Comments Section */}
            <CommentsSection slug={article.slug} />
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
