import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  INITIAL_USERS, 
  INITIAL_TEMPLATES_SETTINGS, 
  INITIAL_PLANS, 
  INITIAL_PROMOS, 
  INITIAL_SUBSCRIPTION_CODES, 
  INITIAL_ARTICLES, 
  INITIAL_API_KEYS, 
  INITIAL_LOGS 
} from '../../data/mockAdminData';
import { User, UserRole } from '../../types/auth';
import { 
  TemplateSetting, 
  SubscriptionPlan, 
  PromoCode, 
  SubscriptionCode, 
  Article, 
  ApiKey, 
  ApiKeyPermission, 
  SystemLog 
} from '../../types/admin';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Download, 
  Activity, 
  Search, 
  UserCheck, 
  UserX, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  Layout, 
  BarChart3, 
  Clock, 
  Sparkles, 
  ShieldAlert,
  Crown,
  BadgeCheck,
  Edit,
  Plus,
  Key,
  Ticket,
  BookOpen,
  Code,
  Copy,
  Check,
  X,
  Send,
  Eye,
  Layers,
  Lock,
  Tag
} from 'lucide-react';

interface AdminDashboardProps {
  onGoHome?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onGoHome }) => {
  const { user, isAdmin, registeredUsers } = useAuth();
  
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'users' | 'templates' | 'plans' | 'articles' | 'api' | 'settings'>('overview');
  
  // State with LocalStorage persistence
  const [usersList, setUsersList] = useState<User[]>(() => {
    const saved = localStorage.getItem('admin_users');
    return saved ? JSON.parse(saved) : (registeredUsers?.length ? registeredUsers : INITIAL_USERS);
  });

  const [templatesList, setTemplatesList] = useState<TemplateSetting[]>(() => {
    const saved = localStorage.getItem('admin_templates');
    return saved ? JSON.parse(saved) : INITIAL_TEMPLATES_SETTINGS;
  });

  const [plansList, setPlansList] = useState<SubscriptionPlan[]>(() => {
    const saved = localStorage.getItem('admin_plans');
    return saved ? JSON.parse(saved) : INITIAL_PLANS;
  });

  const [promosList, setPromosList] = useState<PromoCode[]>(() => {
    const saved = localStorage.getItem('admin_promos');
    return saved ? JSON.parse(saved) : INITIAL_PROMOS;
  });

  const [subCodesList, setSubCodesList] = useState<SubscriptionCode[]>(() => {
    const saved = localStorage.getItem('admin_sub_codes');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTION_CODES;
  });

  const [articlesList, setArticlesList] = useState<Article[]>(() => {
    const saved = localStorage.getItem('admin_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [apiKeysList, setApiKeysList] = useState<ApiKey[]>(() => {
    const saved = localStorage.getItem('admin_api_keys');
    return saved ? JSON.parse(saved) : INITIAL_API_KEYS;
  });

  const [logsList, setLogsList] = useState<SystemLog[]>(() => {
    const saved = localStorage.getItem('admin_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Modals state
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false);
  const [isNewPromoOpen, setIsNewPromoOpen] = useState(false);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [isNewArticleOpen, setIsNewArticleOpen] = useState(false);
  const [isNewApiKeyOpen, setIsNewApiKeyOpen] = useState(false);
  const [apiTestResponse, setApiTestResponse] = useState<string | null>(null);

  // New item form states
  const [newTemplateForm, setNewTemplateForm] = useState({
    name: '',
    nameEn: '',
    category: 'التقنية والتطوير',
    description: '',
    isVip: true,
    primaryColor: '#4f46e5'
  });

  const [newPromoForm, setNewPromoForm] = useState({
    code: '',
    discountPercent: 20,
    maxUses: 50,
    expiresAt: '2027-12-31'
  });

  const [newPlanForm, setNewPlanForm] = useState({
    name: '',
    nameEn: '',
    price: 49,
    currency: 'SAR',
    billingPeriod: 'monthly' as const,
    features: 'قوالب VIP الحصرية\nإزالة العلامة المائية\nمساعد الذكاء الاصطناعي\nدعم فني مخصص'
  });

  const [newArticleForm, setNewArticleForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'تطوير المسيرة المهنية',
    tags: 'سيرة ذاتية, توظيف, نصائح'
  });

  const [newApiKeyForm, setNewApiKeyForm] = useState({
    name: '',
    appName: '',
    permissions: ['read_articles'] as ApiKeyPermission[]
  });

  // Settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowGuestDownload, setAllowGuestDownload] = useState(true);
  const [aiSuggestionsEnabled, setAiSuggestionsEnabled] = useState(true);

  // Save states to local storage
  useEffect(() => { localStorage.setItem('admin_users', JSON.stringify(usersList)); }, [usersList]);
  useEffect(() => { localStorage.setItem('admin_templates', JSON.stringify(templatesList)); }, [templatesList]);
  useEffect(() => { localStorage.setItem('admin_plans', JSON.stringify(plansList)); }, [plansList]);
  useEffect(() => { localStorage.setItem('admin_promos', JSON.stringify(promosList)); }, [promosList]);
  useEffect(() => { localStorage.setItem('admin_sub_codes', JSON.stringify(subCodesList)); }, [subCodesList]);
  useEffect(() => { localStorage.setItem('admin_articles', JSON.stringify(articlesList)); }, [articlesList]);
  useEffect(() => { localStorage.setItem('admin_api_keys', JSON.stringify(apiKeysList)); }, [apiKeysList]);
  useEffect(() => { localStorage.setItem('admin_logs', JSON.stringify(logsList)); }, [logsList]);

  // Log action helper
  const addLog = (action: string, type: SystemLog['type'] = 'info') => {
    const newLog: SystemLog = {
      id: 'log-' + Date.now(),
      action,
      user: user?.name || 'الأدمن',
      timestamp: 'الآن',
      type
    };
    setLogsList(prev => [newLog, ...prev]);
  };

  // 403 Forbidden Screen for non-admin
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-slate-900">403 - الوصول محظور وغير مصرح به</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            عذراً، هذه اللوحة مخصصة لإدارة النظام فقط، وحسابك الحالي لا يمتلك صلاحيات الوصول الإدارية.
          </p>
          {onGoHome && (
            <button
              onClick={onGoHome}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shadow-md"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          )}
        </div>
      </div>
    );
  }

  // --- USER ACTIONS ---
  const toggleBanUser = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const isBanned = !u.isBanned;
        addLog(`${isBanned ? 'حظر' : 'إلغاء حظر'} المستخدم: ${u.email}`, isBanned ? 'danger' : 'info');
        return { 
          ...u, 
          isBanned, 
          status: isBanned ? 'suspended' : 'active',
          banReason: isBanned ? 'مخالفة سياسة الاستخدام' : undefined 
        };
      }
      return u;
    }));
  };

  const toggleVerifiedBadge = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextBadge = !u.isVerifiedBadge;
        addLog(`${nextBadge ? 'منح' : 'سحب'} شارة التوثيق الزرقاء للمستخدم: ${u.email}`, 'success');
        return { ...u, isVerifiedBadge: nextBadge };
      }
      return u;
    }));
  };

  const toggleVipUser = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextVip = !u.isVip;
        addLog(`${nextVip ? 'ترقية' : 'إلغاء'} اشتراك VIP للمستخدم: ${u.email}`, 'warning');
        return { 
          ...u, 
          isVip: nextVip,
          vipExpiresAt: nextVip ? '2027-12-31' : undefined
        };
      }
      return u;
    }));
  };

  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsersList(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    addLog(`تعديل بيانات المستخدم: ${editingUser.email}`, 'info');
    setEditingUser(null);
  };

  const deleteUser = (id: string, email: string) => {
    if (window.confirm(`هل أنت متأكد من حذف الحساب (${email}) نهائياً؟`)) {
      setUsersList(prev => prev.filter(u => u.id !== id));
      addLog(`حذف حساب المستخدم: ${email}`, 'danger');
    }
  };

  // --- TEMPLATE ACTIONS ---
  const handlePublishTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateForm.name.trim()) return;

    const newTemplate: TemplateSetting = {
      id: 'tmpl-' + Date.now(),
      name: newTemplateForm.name,
      nameEn: newTemplateForm.nameEn || newTemplateForm.name,
      category: newTemplateForm.category,
      description: newTemplateForm.description || 'قالب جاهز جديد تم نشره بواسطة إدارة المنصة.',
      isActive: true,
      isPremium: newTemplateForm.isVip,
      isVip: newTemplateForm.isVip,
      usageCount: 0,
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200',
      primaryColor: newTemplateForm.primaryColor,
      author: user?.name || 'فريق سيرتي برو',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTemplatesList(prev => [newTemplate, ...prev]);
    addLog(`نشر قالب جاهز جديد: "${newTemplate.name}" ${newTemplate.isVip ? '(VIP)' : ''}`, 'success');
    setIsNewTemplateOpen(false);
    setNewTemplateForm({
      name: '',
      nameEn: '',
      category: 'التقنية والتطوير',
      description: '',
      isVip: true,
      primaryColor: '#4f46e5'
    });
  };

  const toggleTemplateActive = (id: string) => {
    setTemplatesList(prev => prev.map(t => {
      if (t.id === id) {
        const next = !t.isActive;
        addLog(`${next ? 'تفعيل' : 'تعطيل'} القالب: ${t.name}`, 'info');
        return { ...t, isActive: next };
      }
      return t;
    }));
  };

  const toggleTemplateVip = (id: string) => {
    setTemplatesList(prev => prev.map(t => {
      if (t.id === id) {
        const next = !t.isVip;
        addLog(`تغيير تصنيف القالب (${t.name}) إلى ${next ? 'VIP' : 'مجاني'}`, 'warning');
        return { ...t, isVip: next, isPremium: next };
      }
      return t;
    }));
  };

  // --- PROMO & SUBSCRIPTION CODES ACTIONS ---
  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoForm.code.trim()) return;

    const promo: PromoCode = {
      id: 'promo-' + Date.now(),
      code: newPromoForm.code.trim().toUpperCase(),
      discountPercent: Number(newPromoForm.discountPercent),
      maxUses: Number(newPromoForm.maxUses),
      usedCount: 0,
      expiresAt: newPromoForm.expiresAt,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPromosList(prev => [promo, ...prev]);
    addLog(`إنشاء كود برومو خصم جديد: ${promo.code} (${promo.discountPercent}%)`, 'success');
    setIsNewPromoOpen(false);
    setNewPromoForm({ code: '', discountPercent: 20, maxUses: 50, expiresAt: '2027-12-31' });
  };

  const handleGenerateSubscriptionCode = (durationMonths: number = 1, planName: string = 'باقة المحترف VIP') => {
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const codeStr = `VIP-${randomNum}-${randomHex}`;

    const newCode: SubscriptionCode = {
      id: 'sub-' + Date.now(),
      code: codeStr,
      planId: 'plan-basic',
      planName: `${planName} (${durationMonths} شهر)`,
      durationMonths,
      isUsed: false,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: '2028-12-31'
    };

    setSubCodesList(prev => [newCode, ...prev]);
    addLog(`توليد كود اشتراك VIP فوري: ${codeStr} (${durationMonths} شهر)`, 'success');
  };

  // --- PLAN ACTIONS ---
  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanForm.name.trim()) return;

    const newPlan: SubscriptionPlan = {
      id: 'plan-' + Date.now(),
      name: newPlanForm.name,
      nameEn: newPlanForm.nameEn || newPlanForm.name,
      price: Number(newPlanForm.price),
      currency: newPlanForm.currency,
      billingPeriod: newPlanForm.billingPeriod,
      isActive: true,
      features: newPlanForm.features.split('\n').filter(f => f.trim().length > 0)
    };

    setPlansList(prev => [...prev, newPlan]);
    addLog(`إنشاء باقة اشتراك جديدة: "${newPlan.name}" (${newPlan.price} ${newPlan.currency})`, 'success');
    setIsNewPlanOpen(false);
    setNewPlanForm({
      name: '',
      nameEn: '',
      price: 49,
      currency: 'SAR',
      billingPeriod: 'monthly',
      features: 'قوالب VIP الحصرية\nإزالة العلامة المائية\nمساعد الذكاء الاصطناعي'
    });
  };

  // --- ARTICLES ACTIONS ---
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleForm.title.trim()) return;

    const slug = newArticleForm.title
      .trim()
      .toLowerCase()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newArt: Article = {
      id: 'art-' + Date.now(),
      title: newArticleForm.title,
      slug: slug || 'article-' + Date.now(),
      summary: newArticleForm.summary,
      content: newArticleForm.content,
      category: newArticleForm.category,
      author: user?.name || 'إدارة التوظيف',
      readTimeMinutes: Math.max(1, Math.round(newArticleForm.content.length / 400)),
      viewsCount: 0,
      isPublished: true,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: newArticleForm.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    setArticlesList(prev => [newArt, ...prev]);
    addLog(`نشر مقال مهني جديد: "${newArt.title}"`, 'success');
    setIsNewArticleOpen(false);
    setNewArticleForm({ title: '', summary: '', content: '', category: 'تطوير المسيرة المهنية', tags: '' });
  };

  const toggleArticlePublish = (id: string) => {
    setArticlesList(prev => prev.map(a => {
      if (a.id === id) {
        const next = !a.isPublished;
        addLog(`${next ? 'نشر' : 'إلغاء نشر'} المقال: ${a.title}`, 'info');
        return { ...a, isPublished: next };
      }
      return a;
    }));
  };

  const deleteArticle = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المقال نهائياً؟')) {
      setArticlesList(prev => prev.filter(a => a.id !== id));
      addLog('تم حذف مقال من المنصة', 'danger');
    }
  };

  // --- API KEY ACTIONS & EXPLORER ---
  const handleCreateApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApiKeyForm.name.trim()) return;

    const randomSecret = Array.from({ length: 32 }, () => Math.floor(Math.random() * 36).toString(36)).join('');
    const keyVal = `cvpro_live_${randomSecret}`;

    const newKey: ApiKey = {
      id: 'key-' + Date.now(),
      name: newApiKeyForm.name,
      appName: newApiKeyForm.appName || 'تطبيق خارجي',
      key: keyVal,
      permissions: newApiKeyForm.permissions,
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: '2028-12-31',
      isActive: true,
      requestsCount: 0
    };

    setApiKeysList(prev => [newKey, ...prev]);
    addLog(`إنشاء مفتاح API جديد لمشاركة المقالات: "${newKey.name}"`, 'success');
    setIsNewApiKeyOpen(false);
    setNewApiKeyForm({ name: '', appName: '', permissions: ['read_articles'] });
  };

  const toggleApiKeyActive = (id: string) => {
    setApiKeysList(prev => prev.map(k => {
      if (k.id === id) {
        const next = !k.isActive;
        addLog(`${next ? 'تفعيل' : 'تعطيل'} مفتاح API: ${k.name}`, 'warning');
        return { ...k, isActive: next };
      }
      return k;
    }));
  };

  const deleteApiKey = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف مفتاح الـ API نهائياً؟ ستتوقف التطبيقات المربوطة به عن استقبال المقالات.')) {
      setApiKeysList(prev => prev.filter(k => k.id !== id));
      addLog('تم حذف مفتاح API', 'danger');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Simulate Live API Call
  const runLiveApiTest = (key: string) => {
    const publishedArticles = articlesList.filter(a => a.isPublished);
    const mockResponse = {
      status: 200,
      success: true,
      message: "Articles fetched successfully via CVPro API",
      client_key: key.substring(0, 14) + "...",
      total_count: publishedArticles.length,
      timestamp: new Date().toISOString(),
      data: publishedArticles.map(a => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        summary: a.summary,
        category: a.category,
        author: a.author,
        readTimeMinutes: a.readTimeMinutes,
        tags: a.tags,
        publishedAt: a.createdAt
      }))
    };
    setApiTestResponse(JSON.stringify(mockResponse, null, 2));
    
    // Update request count
    setApiKeysList(prev => prev.map(k => k.key === key ? { ...k, requestsCount: k.requestsCount + 1, lastUsedAt: 'الآن' } : k));
  };

  const filteredUsers = usersList.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>لوحة التحكم الإدارية المركزية المتطورة</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              إدارة منصة سيرتي برو (Admin Portal)
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              إدارة المستخدمين والمصادقة، نشر قوالب VIP، إنشاء باقات وأكواد البرومو، ومشاركة المقالات عبر API.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold font-mono">
              🔥 Firebase: ai-studio-applet-webapp
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              النظام متصل ويعمل بكفاءة
            </span>
          </div>
        </div>

        {/* Dynamic Real Stats Grid (NO FAKE NUMBERS) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500">المستخدمين</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl font-black text-slate-900">{usersList.length}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">حسابات حقيقية</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500">مشتركي VIP</span>
              <Crown className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-xl font-black text-amber-600">
              {usersList.filter(u => u.isVip).length}
            </div>
            <p className="text-[10px] text-amber-600 font-bold mt-0.5">باقات مفعّلة</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500">القوالب المنشورة</span>
              <Layout className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl font-black text-slate-900">{templatesList.length}</div>
            <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">
              {templatesList.filter(t => t.isVip).length} قوالب VIP
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500">أكواد البرومو</span>
              <Tag className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-black text-slate-900">{promosList.length}</div>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">خصومات نشطة</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500">المقالات المهنية</span>
              <BookOpen className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-xl font-black text-slate-900">{articlesList.length}</div>
            <p className="text-[10px] text-purple-600 font-semibold mt-0.5">منشورة عبر API</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500">مفاتيح API</span>
              <Key className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-xl font-black text-slate-900">{apiKeysList.length}</div>
            <p className="text-[10px] text-slate-400 mt-0.5">تطبيقات متصلة</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
              activeAdminTab === 'overview'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>نظرة عامة</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('users')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
              activeAdminTab === 'users'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>إدارة المستخدمين ({usersList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('templates')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
              activeAdminTab === 'templates'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>نشر القوالب & VIP ({templatesList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('plans')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
              activeAdminTab === 'plans'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Crown className="w-4 h-4 text-amber-400" />
            <span>الباقات & أكواد البرومو</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('articles')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
              activeAdminTab === 'articles'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>المقالات المهنية ({articlesList.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('api')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
              activeAdminTab === 'api'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>مشاركة المقالات عبر API</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`flex-1 py-2.5 px-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
              activeAdminTab === 'settings'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>الإعدادات والسجلات</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeAdminTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500" />
                <span>حالة القوالب والاشتراكات VIP</span>
              </h3>
              <div className="space-y-3 pt-2">
                {templatesList.map((tmpl) => (
                  <div key={tmpl.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tmpl.primaryColor || '#4f46e5' }} />
                      <span className="font-bold text-slate-800">{tmpl.name}</span>
                      {tmpl.isVip && (
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          <span>VIP</span>
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tmpl.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {tmpl.isActive ? 'متاح للجميع' : 'معطل'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>سجل نشاطات النظام الفعلي</span>
              </h3>
              <div className="space-y-2.5 pt-1">
                {logsList.slice(0, 5).map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{log.action}</p>
                      <span className="text-[10px] text-slate-400">بواسطة: {log.user}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS MANAGEMENT (تعديل، حظر، شارة توثيق) */}
        {activeAdminTab === 'users' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث بالاسم أو البريد..."
                  className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div className="text-xs text-slate-500">
                إجمالي المستخدمين المسجلين: <strong className="text-slate-900">{filteredUsers.length}</strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                  <tr>
                    <th className="p-4">المستخدم</th>
                    <th className="p-4">البريد الإلكتروني</th>
                    <th className="p-4">شارة التوثيق</th>
                    <th className="p-4">اشتراك VIP</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">الإجراءات والتحكم</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                            alt={u.name}
                            className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="font-bold text-slate-900">{u.name}</p>
                              {u.isVerifiedBadge && (
                                <span title="حساب موثق رسمياً" className="inline-flex items-center">
                                  <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />
                                </span>
                              )}
                              {u.isVip && (
                                <span title="عضوية VIP" className="inline-flex items-center">
                                  <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">انضم في {u.createdAt}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-slate-600 text-[11px]" dir="ltr">
                        {u.email}
                      </td>

                      {/* Verified Badge Toggle */}
                      <td className="p-4">
                        <button
                          onClick={() => toggleVerifiedBadge(u.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition ${
                            u.isVerifiedBadge
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="منح أو سحب شارة التوثيق الزرقاء"
                        >
                          <BadgeCheck className="w-3.5 h-3.5" />
                          <span>{u.isVerifiedBadge ? 'موثق ✓' : 'غير موثق'}</span>
                        </button>
                      </td>

                      {/* VIP Status Toggle */}
                      <td className="p-4">
                        <button
                          onClick={() => toggleVipUser(u.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition ${
                            u.isVip
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                          title="ترقية إلى VIP أو تحويل لمجاني"
                        >
                          <Crown className="w-3.5 h-3.5" />
                          <span>{u.isVip ? 'عضوية VIP' : 'عادي (مجاني)'}</span>
                        </button>
                      </td>

                      {/* Status / Ban */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          u.isBanned
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {u.isBanned ? 'محظور ⛔' : 'نشط'}
                        </span>
                      </td>

                      {/* Actions Buttons */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Edit User Button */}
                          <button
                            onClick={() => setEditingUser(u)}
                            className="p-1.5 text-slate-500 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition"
                            title="تعديل بيانات المستخدم"
                          >
                            <Edit className="w-4 h-4" />
                          </button>

                          {/* Ban / Unban Toggle */}
                          <button
                            onClick={() => toggleBanUser(u.id)}
                            className={`p-1.5 rounded-lg transition ${
                              u.isBanned
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-amber-600 hover:bg-amber-50'
                            }`}
                            title={u.isBanned ? 'إلغاء الحظر' : 'حظر هذا المستخدم'}
                          >
                            {u.isBanned ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                          </button>

                          {/* Delete User */}
                          <button
                            onClick={() => deleteUser(u.id, u.email)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                            title="حذف الحساب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PUBLISH READY TEMPLATES & VIP */}
        {activeAdminTab === 'templates' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="font-bold text-base text-slate-800">مكتبة القوالب الجاهزة ونشر تصاميم VIP</h3>
                <p className="text-xs text-slate-500">نشر قوالب جديدة وتحديد القوالب الحصرية لمشتركي VIP</p>
              </div>

              <button
                onClick={() => setIsNewTemplateOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>نشر قالب جاهز جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templatesList.map((tmpl) => (
                <div key={tmpl.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs text-slate-900">{tmpl.name}</h4>
                        {tmpl.isVip && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-extrabold text-[9px] flex items-center gap-0.5">
                            <Crown className="w-3 h-3 text-amber-600" />
                            <span>VIP</span>
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tmpl.category}</p>
                    </div>

                    <button
                      onClick={() => toggleTemplateActive(tmpl.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tmpl.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {tmpl.isActive ? 'مفعل' : 'معطل'}
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-[10px] text-slate-400">الناشر: {tmpl.author || 'سيرتي برو'}</span>
                    
                    <button
                      onClick={() => toggleTemplateVip(tmpl.id)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition ${
                        tmpl.isVip
                          ? 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {tmpl.isVip ? 'قالب VIP حصري' : 'قالب مجاني'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: VIP PLANS & PROMO CODES & SUBSCRIPTIONS */}
        {activeAdminTab === 'plans' && (
          <div className="space-y-6">
            
            {/* Subscription Plans */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">باقات الاشتراك VIP المتاحة للمستخدمين</h3>
                    <p className="text-xs text-slate-500">تحديد أسعار وفترات وميزات باقات VIP</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsNewPlanOpen(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة باقة VIP</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plansList.map((plan) => (
                  <div key={plan.id} className="p-4 rounded-xl border border-amber-200/80 bg-gradient-to-b from-amber-50/20 to-white space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900">{plan.name}</h4>
                      {plan.discountBadge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                          {plan.discountBadge}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      {plan.price} <span className="text-xs font-normal text-slate-500">{plan.currency} / {plan.billingPeriod === 'yearly' ? 'سنوياً' : 'شهرياً'}</span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Codes & Instant Activation Codes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Promo Codes (أكواد البرومو) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-sm text-slate-800">أكواد الخصم والبرومو (Promo Codes)</h3>
                  </div>
                  <button
                    onClick={() => setIsNewPromoOpen(true)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إنشاء كود برومو</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {promosList.map((promo) => (
                    <div key={promo.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {promo.code}
                          </span>
                          <span className="font-bold text-slate-800">خصم {promo.discountPercent}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">
                          الاستخدامات: {promo.usedCount} من {promo.maxUses} • ينتهي في {promo.expiresAt}
                        </p>
                      </div>

                      <button
                        onClick={() => copyToClipboard(promo.code, promo.id)}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"
                        title="نسخ الكود"
                      >
                        {copiedKey === promo.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* VIP Subscription Activation Codes (أكواد اشتراك فورية) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-sm text-slate-800">أكواد تفعيل اشتراك VIP فوري</h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleGenerateSubscriptionCode(1, 'شهر VIP مجاني')}
                      className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-[10px] font-bold"
                    >
                      + كود شهر
                    </button>
                    <button
                      onClick={() => handleGenerateSubscriptionCode(12, 'سنة VIP كاملة')}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-[10px] font-bold"
                    >
                      + كود سنة
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {subCodesList.map((code) => (
                    <div key={code.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300 select-all">
                            {code.code}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            code.isUsed ? 'bg-slate-200 text-slate-500' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {code.isUsed ? 'مستخدم مسبقاً' : 'صالح للتفعيل ✓'}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">{code.planName}</p>
                      </div>

                      <button
                        onClick={() => copyToClipboard(code.code, code.id)}
                        className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600"
                        title="نسخ الكود لإرساله للعميل"
                      >
                        {copiedKey === code.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: ARTICLES MANAGEMENT (المقالات) */}
        {activeAdminTab === 'articles' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="font-bold text-base text-slate-800">إدارة المقالات والنصائح المهنية</h3>
                <p className="text-xs text-slate-500">نشر مقالات تظهر في الموقع ويمكن مشاركتها عبر الـ API للتطبيقات</p>
              </div>

              <button
                onClick={() => setIsNewArticleOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مقال جديد</span>
              </button>
            </div>

            <div className="space-y-4">
              {articlesList.map((art) => (
                <div key={art.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{art.title}</h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleArticlePublish(art.id)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          art.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {art.isPublished ? 'منشور ✓' : 'مسودة'}
                      </button>

                      <button
                        onClick={() => deleteArticle(art.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="حذف المقال"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{art.summary}</p>
                  
                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200 text-[10px] text-slate-400">
                    <div className="flex items-center gap-3">
                      <span>الكاتب: {art.author}</span>
                      <span>وقت القراءة: {art.readTimeMinutes} دقيقة</span>
                      <span>المشاهدات: {art.viewsCount}</span>
                    </div>
                    <div className="font-mono text-slate-500">API Slug: /api/articles/{art.slug}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: API KEYS & EXTERNAL ARTICLE SHARING */}
        {activeAdminTab === 'api' && (
          <div className="space-y-6">
            
            {/* API Keys Management */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                <div>
                  <h3 className="font-bold text-base text-slate-800">مفاتيح الربط البرمجي (API Keys) لمشاركة المقالات</h3>
                  <p className="text-xs text-slate-500">
                    توليد رموز ومفاتيح آمنة تتيح للمواقع والتطبيقات الخارجية استهلاك المقالات والنصائح بصيغة JSON.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewApiKeyOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>توليد مفتاح API جديد</span>
                </button>
              </div>

              <div className="space-y-3">
                {apiKeysList.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-slate-900">{apiKey.name}</h4>
                          <span className="text-[10px] text-slate-400">({apiKey.appName})</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {apiKey.permissions.map((perm, i) => (
                            <span key={i} className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              صلاحية: {perm}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleApiKeyActive(apiKey.id)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                            apiKey.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {apiKey.isActive ? 'مفعل' : 'معطل'}
                        </button>

                        <button
                          onClick={() => deleteApiKey(apiKey.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                          title="حذف المفتاح"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Key Box with Copy & Test button */}
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto justify-between">
                      <span className="select-all">{apiKey.key}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-sans flex items-center gap-1"
                        >
                          {copiedKey === apiKey.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === apiKey.id ? 'تم النسخ' : 'نسخ المفتاح'}</span>
                        </button>

                        <button
                          onClick={() => runLiveApiTest(apiKey.key)}
                          className="px-2.5 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded text-[11px] font-sans flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>تجربة فحص الـ API</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>إجمالي الطلبات (Requests): <strong>{apiKey.requestsCount}</strong></span>
                      <span>تاريخ الإنشاء: {apiKey.createdAt} • الصلاحية حتى {apiKey.expiresAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live API Explorer & Integration Docs */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                <Code className="w-4 h-4 text-brand-600" />
                <span>دليل الاستخدام للمطورين (API Endpoints & Integration Guide)</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1" dir="ltr">
                  <div className="text-slate-500">// Endpoint 1: Fetch all career articles</div>
                  <div className="font-bold text-brand-600">GET https://your-domain.vercel.app/api/articles</div>
                  <div className="text-slate-700">Headers: &#123; "x-api-key": "cvpro_live_..." &#125;</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono space-y-1" dir="ltr">
                  <div className="text-slate-500">// Endpoint 2: Fetch single article by slug</div>
                  <div className="font-bold text-brand-600">GET https://your-domain.vercel.app/api/articles/:slug</div>
                  <div className="text-slate-700">Headers: &#123; "x-api-key": "cvpro_live_..." &#125;</div>
                </div>
              </div>

              {/* Live Test Response viewer */}
              {apiTestResponse && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      استجابة الاختبار المباشر (Live JSON Response):
                    </span>
                    <button
                      onClick={() => setApiTestResponse(null)}
                      className="text-[11px] text-slate-400 hover:text-slate-600"
                    >
                      إغلاق
                    </button>
                  </div>
                  <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-60" dir="ltr">
                    {apiTestResponse}
                  </pre>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 7: SETTINGS & LOGS */}
        {activeAdminTab === 'settings' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 max-w-2xl">
            <h3 className="font-bold text-sm text-slate-800 pb-3 border-b border-slate-100">
              إعدادات المنصة وسياسات الأمان
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">وضع الصيانة العامة للموقع (Maintenance Mode)</h4>
                  <p className="text-[11px] text-slate-500">منع المستخدمين غير المشرفين من تحرير وحفظ السير مؤقتاً</p>
                </div>
                <button
                  onClick={() => setMaintenanceMode(!maintenanceMode)}
                  className={`p-1.5 rounded-lg text-xs font-bold ${
                    maintenanceMode ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {maintenanceMode ? 'مفعل' : 'معطل'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">السماح للزوار بالتنزيل الفوري بدون تسجيل حساب</h4>
                  <p className="text-[11px] text-slate-500">تسهيل التجربة على المستخدمين الجدد وتصدير PDF مجاناً</p>
                </div>
                <button
                  onClick={() => setAllowGuestDownload(!allowGuestDownload)}
                  className={`p-1.5 rounded-lg text-xs font-bold ${
                    allowGuestDownload ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {allowGuestDownload ? 'مفعل' : 'معطل'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">تفعيل مساعد الذكاء الاصطناعي (AI Assistant)</h4>
                  <p className="text-[11px] text-slate-500">تمكين الصياغة الآلية للنبذات المهنية والمهام الوظيفية</p>
                </div>
                <button
                  onClick={() => setAiSuggestionsEnabled(!aiSuggestionsEnabled)}
                  className={`p-1.5 rounded-lg text-xs font-bold ${
                    aiSuggestionsEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {aiSuggestionsEnabled ? 'مفعل' : 'معطل'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL 1: EDIT USER MODAL --- */}
        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-sm text-slate-900">تعديل بيانات المستخدم</h3>
                <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveUserEdit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    dir="ltr"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">نوع الصلاحية</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="user">مستخدم عادي</option>
                      <option value="admin">مسؤول (Admin)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">حالة الحساب</label>
                    <select
                      value={editingUser.status}
                      onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any, isBanned: e.target.value === 'suspended' })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="active">نشط</option>
                      <option value="suspended">محظور (Suspended)</option>
                    </select>
                  </div>
                </div>

                {/* Toggles */}
                <div className="pt-2 border-t space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={!!editingUser.isVerifiedBadge}
                      onChange={(e) => setEditingUser({ ...editingUser, isVerifiedBadge: e.target.checked })}
                      className="rounded text-brand-600 w-4 h-4"
                    />
                    <span>منح شارة التوثيق الزرقاء الرسمية (Verified Badge 🛡️)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={!!editingUser.isVip}
                      onChange={(e) => setEditingUser({ ...editingUser, isVip: e.target.checked })}
                      className="rounded text-amber-500 w-4 h-4"
                    />
                    <span>منح عضوية VIP (الوصول لكافة القوالب والميزات المدفوعة)</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition"
                  >
                    حفظ التعديلات
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL 2: PUBLISH NEW TEMPLATE --- */}
        {isNewTemplateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-sm text-slate-900">نشر قالب سيرة ذاتية جاهز جديد</h3>
                <button onClick={() => setIsNewTemplateOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePublishTemplate} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم القالب (بالعربية)</label>
                  <input
                    type="text"
                    required
                    value={newTemplateForm.name}
                    onChange={(e) => setNewTemplateForm({ ...newTemplateForm, name: e.target.value })}
                    placeholder="مثال: القالب الهندسي المتقدم"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الاسم بالإنجليزية</label>
                  <input
                    type="text"
                    value={newTemplateForm.nameEn}
                    onChange={(e) => setNewTemplateForm({ ...newTemplateForm, nameEn: e.target.value })}
                    placeholder="Engineering Pro"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">التصنيف الوظيفي</label>
                  <select
                    value={newTemplateForm.category}
                    onChange={(e) => setNewTemplateForm({ ...newTemplateForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="التقنية والتطوير">التقنية والتطوير البرمجي</option>
                    <option value="الإدارة والقيادة">الإدارة والأعمال</option>
                    <option value="الهندسة والعلوم">الهندسة والتصنيع</option>
                    <option value="التصميم والتسويق">التصميم والإبداع</option>
                    <option value="الطب والرعاية">الطب والرعاية الصحية</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">وصف القالب ومميزاته</label>
                  <textarea
                    rows={2}
                    value={newTemplateForm.description}
                    onChange={(e) => setNewTemplateForm({ ...newTemplateForm, description: e.target.value })}
                    placeholder="وصف مختصر لمزايا القالب ولمن يوصى به..."
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">تصنيف القالب كـ VIP</h5>
                    <p className="text-[10px] text-slate-500">يتطلب عضوية VIP أو كود تفعيل لاستخدامه</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={newTemplateForm.isVip}
                    onChange={(e) => setNewTemplateForm({ ...newTemplateForm, isVip: e.target.checked })}
                    className="w-5 h-5 rounded text-amber-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition"
                  >
                    نشر القالب الآن
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNewTemplateOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL 3: CREATE PROMO CODE --- */}
        {isNewPromoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-sm text-slate-900">إنشاء كود برومو خصم جديد</h3>
                <button onClick={() => setIsNewPromoOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePromo} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">رمز الكود (Promo Code)</label>
                  <input
                    type="text"
                    required
                    value={newPromoForm.code}
                    onChange={(e) => setNewPromoForm({ ...newPromoForm, code: e.target.value })}
                    placeholder="مثال: SAVE50 أو EID2026"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs uppercase"
                    dir="ltr"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">نسبة الخصم (%)</label>
                    <input
                      type="number"
                      min="5"
                      max="100"
                      value={newPromoForm.discountPercent}
                      onChange={(e) => setNewPromoForm({ ...newPromoForm, discountPercent: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">أقصى عدد استخدامات</label>
                    <input
                      type="number"
                      min="1"
                      value={newPromoForm.maxUses}
                      onChange={(e) => setNewPromoForm({ ...newPromoForm, maxUses: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">تاريخ انتهاء الصلاحية</label>
                  <input
                    type="date"
                    value={newPromoForm.expiresAt}
                    onChange={(e) => setNewPromoForm({ ...newPromoForm, expiresAt: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition"
                  >
                    إنشاء وتفعيل الكود
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNewPromoOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL 4: CREATE VIP PLAN --- */}
        {isNewPlanOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-sm text-slate-900">إنشاء باقة VIP جديدة</h3>
                <button onClick={() => setIsNewPlanOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePlan} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم الباقة</label>
                  <input
                    type="text"
                    required
                    value={newPlanForm.name}
                    onChange={(e) => setNewPlanForm({ ...newPlanForm, name: e.target.value })}
                    placeholder="باقة الشركات VIP"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">السعر</label>
                    <input
                      type="number"
                      required
                      value={newPlanForm.price}
                      onChange={(e) => setNewPlanForm({ ...newPlanForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">دورة الفوترة</label>
                    <select
                      value={newPlanForm.billingPeriod}
                      onChange={(e) => setNewPlanForm({ ...newPlanForm, billingPeriod: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="monthly">شهرياً</option>
                      <option value="quarterly">كل 3 أشهر</option>
                      <option value="yearly">سنوياً</option>
                      <option value="lifetime">مدى الحياة</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الميزات المشمولة (ميزة في كل سطر)</label>
                  <textarea
                    rows={4}
                    value={newPlanForm.features}
                    onChange={(e) => setNewPlanForm({ ...newPlanForm, features: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-200"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition"
                  >
                    حفظ ونشر الباقة
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNewPlanOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL 5: CREATE ARTICLE --- */}
        {isNewArticleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-sm text-slate-900">إضافة مقال مهني جديد للنشر والمشاركة عبر API</h3>
                <button onClick={() => setIsNewArticleOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">عنوان المقال</label>
                  <input
                    type="text"
                    required
                    value={newArticleForm.title}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, title: e.target.value })}
                    placeholder="10 أخطاء شائعة تؤدي لرفض السيرة الذاتية..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">التصنيف</label>
                  <select
                    value={newArticleForm.category}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="تطوير المسيرة المهنية">تطوير المسيرة المهنية</option>
                    <option value="كتابة السير الذاتية">كتابة السير الذاتية</option>
                    <option value="المقابلات الوظيفية">المقابلات الوظيفية</option>
                    <option value="أنظمة التوظيف ATS">أنظمة التوظيف ATS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ملخص موجز</label>
                  <input
                    type="text"
                    value={newArticleForm.summary}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, summary: e.target.value })}
                    placeholder="سطرين يوجزان فكرة المقال..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">محتوى المقال الكامل</label>
                  <textarea
                    rows={6}
                    required
                    value={newArticleForm.content}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, content: e.target.value })}
                    placeholder="نص المقال الكامل..."
                    className="w-full p-2.5 rounded-lg border border-slate-200 leading-relaxed font-sans"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">الوسوم (مفصولة بفاصلة)</label>
                  <input
                    type="text"
                    value={newArticleForm.tags}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, tags: e.target.value })}
                    placeholder="سيرة ذاتية, نصائح, عمل"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition"
                  >
                    نشر المقال وتوفيره للـ API
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNewArticleOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- MODAL 6: CREATE API KEY --- */}
        {isNewApiKeyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-sm text-slate-900">توليد مفتاح API جديد لمشاركة المقالات</h3>
                <button onClick={() => setIsNewApiKeyOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateApiKey} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم المفتاح أو المعرّف</label>
                  <input
                    type="text"
                    required
                    value={newApiKeyForm.name}
                    onChange={(e) => setNewApiKeyForm({ ...newApiKeyForm, name: e.target.value })}
                    placeholder="مثال: تطبيق الجوال أو موقع الشركاء"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم التطبيق أو المنصة المستفيدة</label>
                  <input
                    type="text"
                    value={newApiKeyForm.appName}
                    onChange={(e) => setNewApiKeyForm({ ...newApiKeyForm, appName: e.target.value })}
                    placeholder="CVPro iOS App"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">صلاحيات هذا المفتاح (Permissions):</label>
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newApiKeyForm.permissions.includes('read_articles')}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setNewApiKeyForm(prev => ({
                            ...prev,
                            permissions: checked 
                              ? [...prev.permissions, 'read_articles'] 
                              : prev.permissions.filter(p => p !== 'read_articles')
                          }));
                        }}
                        className="rounded text-brand-600"
                      />
                      <span>قراءة واسترجاع المقالات (Read Articles)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newApiKeyForm.permissions.includes('write_articles')}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setNewApiKeyForm(prev => ({
                            ...prev,
                            permissions: checked 
                              ? [...prev.permissions, 'write_articles'] 
                              : prev.permissions.filter(p => p !== 'write_articles')
                          }));
                        }}
                        className="rounded text-brand-600"
                      />
                      <span>إنشاء ونشر مقالات عن بعد (Write Articles)</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newApiKeyForm.permissions.includes('full_access')}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setNewApiKeyForm(prev => ({
                            ...prev,
                            permissions: checked 
                              ? [...prev.permissions, 'full_access'] 
                              : prev.permissions.filter(p => p !== 'full_access')
                          }));
                        }}
                        className="rounded text-brand-600"
                      />
                      <span>صلاحية كاملة (Full Access)</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition"
                  >
                    توليد وحفظ المفتاح
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsNewApiKeyOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
