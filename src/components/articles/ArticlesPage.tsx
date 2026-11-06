import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Eye, 
  Clock, 
  Calendar, 
  Share2, 
  Code2, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Sparkles, 
  ArrowLeft, 
  X, 
  Tag, 
  User as UserIcon,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Flame,
  Globe
} from 'lucide-react';
import { Article } from '../../types/admin';
import { INITIAL_ARTICLES } from '../../data/mockAdminData';

interface ArticlesPageProps {
  onGoToBuilder?: () => void;
  onGoToPricing?: () => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onGoToBuilder, onGoToPricing }) => {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('admin_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_ARTICLES;
      }
    }
    return INITIAL_ARTICLES;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [apiShareArticle, setApiShareArticle] = useState<Article | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'javascript' | 'python' | 'json'>('curl');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sync articles if updated from admin in localStorage
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('admin_articles');
      if (saved) {
        try {
          setArticles(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const categories = [
    'الكل',
    'أنظمة الفرز الآلي ATS',
    'كتابة وتنسيق السيرة الذاتية',
    'المقابلات الوظيفية',
    'تطوير المهارات وسوق العمل',
    'نصائح عامة'
  ];

  // Increment views when reading article
  const openReader = (article: Article) => {
    const updated = articles.map(a => {
      if (a.id === article.id) {
        const nextViews = (a.viewsCount || 0) + 1;
        return { ...a, viewsCount: nextViews, views: nextViews };
      }
      return a;
    });
    setArticles(updated);
    localStorage.setItem('admin_articles', JSON.stringify(updated));
    const nextViews = (article.viewsCount || 0) + 1;
    setReadingArticle({ ...article, viewsCount: nextViews, views: nextViews });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const downloadArticleJson = (article: Article) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(article, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cvpro-article-${article.slug || article.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredArticles = articles.filter(art => {
    const matchesCategory = selectedCategory === 'الكل' || 
      (selectedCategory === 'أنظمة الفرز الآلي ATS' && (art.title.includes('ATS') || art.summary.includes('ATS'))) ||
      (selectedCategory === 'المقابلات الوظيفية' && (art.title.includes('مقابل') || art.summary.includes('مقابل'))) ||
      (selectedCategory === 'كتابة وتنسيق السيرة الذاتية' && (art.title.includes('سيرة') || art.title.includes('تصميم')));
    
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-b from-white to-slate-100 border-b border-slate-200 pt-10 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>مركز المقالات والنصائح المهنية</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <span className="text-[10px] text-indigo-600 font-mono">REST API مفتوح</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                دليل النجاح المهني وكتابة السيرة الذاتية
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                مقالات حصرية من خبراء التوظيف والموارد البشرية، مع إمكانية مشاركة واستدعاء كافة المقالات برمجياً عبر الـ API للتطبيقات والمواقع.
              </p>
            </div>

            {/* Quick stats and builder action */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">إجمالي المقالات</p>
                  <p className="text-base font-extrabold text-slate-800">{articles.length} مقال احترافي</p>
                </div>
              </div>

              {onGoToBuilder && (
                <button
                  onClick={onGoToBuilder}
                  className="px-5 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-500/20 transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>أنشئ سيرتك الآن</span>
                </button>
              )}
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث في عناوين المقالات والنصائح..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-brand-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">لم يتم العثور على مقالات مطابقة</h3>
            <p className="text-xs text-slate-500">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً.</p>
            <button
              onClick={() => { setSelectedCategory('الكل'); setSearchQuery(''); }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
            >
              إعادة ضبط الفلتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div 
                key={art.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Article Cover Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={art.coverImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600'}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Category / Views badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/10">
                      دليل مهني
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-[11px] font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-300" />
                      {art.readTimeMinutes || 4} دقائق قراءة
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <Eye className="w-3.5 h-3.5 text-indigo-300" />
                      {art.viewsCount || 120} قراءة
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 
                      onClick={() => openReader(art)}
                      className="font-black text-slate-900 text-base leading-snug line-clamp-2 hover:text-brand-600 cursor-pointer transition"
                    >
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  {/* Author and Date */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-[10px]">
                        {art.author ? art.author.charAt(0) : 'خ'}
                      </div>
                      <span className="font-semibold text-slate-700 text-[11px]">{art.author}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{art.createdAt}</span>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => openReader(art)}
                      className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <span>قراءة المقال</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    {/* API Share Button */}
                    <button
                      onClick={() => setApiShareArticle(art)}
                      title="مشاركة عبر API واستدعاء برمجي"
                      className="p-2 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Code2 className="w-4 h-4 text-indigo-600" />
                      <span className="hidden sm:inline text-[11px]">API</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* FULL ARTICLE READER MODAL */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header Cover */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
              <img
                src={readingArticle.coverImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800'}
                alt={readingArticle.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Close button */}
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 left-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Badges */}
              <div className="absolute bottom-4 right-6 left-6 text-white space-y-2">
                <div className="flex items-center gap-3 text-xs text-indigo-200">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-500/80 text-white font-bold text-[10px]">
                    مقال مهني معتمد
                  </span>
                  <span>{readingArticle.createdAt}</span>
                  <span>•</span>
                  <span>{readingArticle.readTimeMinutes || 4} دقائق للقراءة</span>
                  <span>•</span>
                  <span>{readingArticle.viewsCount || 120} قراءة</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  {readingArticle.title}
                </h2>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Author info & Quick tools */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {readingArticle.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{readingArticle.author}</p>
                    <p className="text-[10px] text-slate-400">فريق تحرير منصة سيرتي برو</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setApiShareArticle(readingArticle);
                    }}
                    className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>مشاركة عبر الـ API</span>
                  </button>

                  <button
                    onClick={() => downloadArticleJson(readingArticle)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل JSON</span>
                  </button>
                </div>
              </div>

              {/* Summary Highlight */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 text-xs sm:text-sm font-medium leading-relaxed">
                {readingArticle.summary}
              </div>

              {/* Main text formatted */}
              <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                {readingArticle.content.split('\n\n').map((para, idx) => (
                  <p key={idx} className="leading-relaxed whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </div>

              {/* Footer action inside reader */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  هل أعجبك هذا المحتوى وتريد تطبيقه على سيرتك؟
                </div>
                {onGoToBuilder && (
                  <button
                    onClick={() => {
                      setReadingArticle(null);
                      onGoToBuilder();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>ابدأ تطبيق النصائح في محرر السيرة</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* API SHARING MODAL */}
      {apiShareArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">مشاركة المقال واستدعاؤه عبر الـ API</h3>
                  <p className="text-[11px] text-slate-400">تضمين المقال في تطبيقات الجوال ومواقع الويب الخارجية</p>
                </div>
              </div>
              <button
                onClick={() => setApiShareArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Article Summary */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800 line-clamp-1">{apiShareArticle.title}</p>
                <span className="text-[10px] text-slate-500 font-mono">ID: {apiShareArticle.id} | Slug: {apiShareArticle.slug}</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                صلاحية: read_articles
              </span>
            </div>

            {/* Direct REST Endpoint */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">رابط نقطة النهاية المباشر (Vercel Live Endpoint):</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`https://quranprvv.vercel.app/api/articles?id=${apiShareArticle.id}`}
                  className="flex-1 px-3 py-2 bg-slate-900 text-emerald-300 font-mono text-xs rounded-xl border border-slate-800"
                  dir="ltr"
                />
                <button
                  onClick={() => copyToClipboard(`https://quranprvv.vercel.app/api/articles?id=${apiShareArticle.id}`, 'endpoint')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                >
                  {copiedText === 'endpoint' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText === 'endpoint' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            {/* Code Snippets Tabs */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {(['curl', 'javascript', 'python', 'json'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveCodeTab(tab)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                        activeCodeTab === tab
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab === 'curl' ? 'cURL' : tab === 'javascript' ? 'JavaScript' : tab === 'python' ? 'Python' : 'Raw JSON'}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => {
                    let code = '';
                    if (activeCodeTab === 'curl') {
                      code = `curl -X GET "https://quranprvv.vercel.app/api/articles?id=${apiShareArticle.id}" \\\n  -H "Authorization: Bearer cvpro_public_key" \\\n  -H "Accept: application/json"`;
                    } else if (activeCodeTab === 'javascript') {
                      code = `fetch('https://quranprvv.vercel.app/api/articles?id=${apiShareArticle.id}', {\n  headers: {\n    'Authorization': 'Bearer cvpro_public_key',\n    'Accept': 'application/json'\n  }\n})\n.then(res => res.json())\n.then(article => console.log(article));`;
                    } else if (activeCodeTab === 'python') {
                      code = `import requests\n\nurl = "https://quranprvv.vercel.app/api/articles?id=${apiShareArticle.id}"\nheaders = {"Authorization": "Bearer cvpro_public_key"}\nresponse = requests.get(url, headers=headers)\nprint(response.json())`;
                    } else {
                      code = JSON.stringify(apiShareArticle, null, 2);
                    }
                    copyToClipboard(code, 'code');
                  }}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                >
                  {copiedText === 'code' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedText === 'code' ? 'تم نسخ الكود!' : 'نسخ الكود'}</span>
                </button>
              </div>

              {/* Code Box */}
              <div className="bg-slate-950 rounded-2xl p-4 text-left font-mono text-[11px] text-slate-200 overflow-x-auto max-h-56" dir="ltr">
                {activeCodeTab === 'curl' && (
                  <pre className="text-emerald-400">
{`curl -X GET "https://quranprvv.vercel.app/api/articles?id=${apiShareArticle.id}" \\
  -H "Authorization: Bearer cvpro_public_key" \\
  -H "Accept: application/json"`}
                  </pre>
                )}

                {activeCodeTab === 'javascript' && (
                  <pre className="text-amber-300">
{`fetch('https://quranprvv.vercel.app/api/articles?id=${apiShareArticle.id}', {
  headers: {
    'Authorization': 'Bearer cvpro_public_key',
    'Accept': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log("Article Title:", data.article.title);
  console.log("Article Content:", data.article.content);
});`}
                  </pre>
                )}

                {activeCodeTab === 'python' && (
                  <pre className="text-sky-300">
{`import requests

url = "https://quranprvv.vercel.app/api/articles?id=${apiShareArticle.id}"
headers = {
    "Authorization": "Bearer cvpro_public_key",
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)
result = response.json()
print("Loaded Article:", result["article"]["title"])`}
                  </pre>
                )}

                {activeCodeTab === 'json' && (
                  <pre className="text-indigo-300">
{JSON.stringify(apiShareArticle, null, 2)}
                  </pre>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => downloadArticleJson(apiShareArticle)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>تحميل المقال كـ JSON</span>
              </button>

              <button
                onClick={() => setApiShareArticle(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
              >
                إغلاق
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
