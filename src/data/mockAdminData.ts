import { User } from '../types/auth';
import { 
  AdminStat, 
  SystemLog, 
  TemplateSetting, 
  SubscriptionPlan, 
  PromoCode, 
  SubscriptionCode, 
  Article, 
  ApiKey,
  ApiConnection
} from '../types/admin';

// Only official system Admin exists initially - NO fake demo accounts!
export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'مدير النظام (Admin)',
    email: 'admin@cvpro.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    createdAt: new Date().toISOString().split('T')[0],
    resumesCount: 1,
    status: 'active',
    isVerifiedBadge: true,
    isVip: true
  }
];

// Clean dynamic starting stats
export const INITIAL_STATS: AdminStat = {
  totalUsers: 1,
  totalResumes: 1,
  totalDownloads: 0,
  activeToday: 1,
  totalVipUsers: 1,
  totalArticles: 2,
  totalPromoCodes: 1
};

// Clean real system audit log
export const INITIAL_LOGS: SystemLog[] = [
  { 
    id: 'log-init', 
    action: 'تهيئة نظام سيرتي برو وربط Firebase بنجاح', 
    user: 'نظام السيرفر', 
    timestamp: 'الآن', 
    type: 'success' 
  }
];

export const INITIAL_TEMPLATES_SETTINGS: TemplateSetting[] = [
  { 
    id: 'modern', 
    name: 'القالب العصري (Modern)', 
    nameEn: 'Modern Indigo', 
    category: 'التقنية والتطوير', 
    description: 'تصميم أنيق متوازن بعمودين وشريط جانبي للمعلومات والمهارات.',
    isActive: true, 
    isPremium: false, 
    isVip: false,
    usageCount: 0, 
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200',
    primaryColor: '#4f46e5',
    author: 'فريق سيرتي برو'
  },
  { 
    id: 'executive', 
    name: 'القالب التنفيذي الفاخر (VIP)', 
    nameEn: 'Executive Slate VIP', 
    category: 'الإدارة والقيادة', 
    description: 'قالب كلاسيكي مرموق للقيادات الإدارية والمستشارين مع هوية بصرية فاخرة.',
    isActive: true, 
    isPremium: true, 
    isVip: true,
    usageCount: 0, 
    thumbnail: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=200',
    primaryColor: '#0f172a',
    author: 'فريق التصميم VIP'
  },
  { 
    id: 'classic', 
    name: 'القالب الكلاسيكي الأكاديمي', 
    nameEn: 'Classic Academic', 
    category: 'الأكاديمي والحكومي', 
    description: 'تصميم هادئ وعريق يركز على المحتوى المباشر وأعلى توافق مع ATS.',
    isActive: true, 
    isPremium: false, 
    isVip: false,
    usageCount: 0, 
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=200',
    primaryColor: '#1e293b',
    author: 'فريق سيرتي برو'
  },
  { 
    id: 'creative', 
    name: 'القالب الإبداعي المتدرج (VIP)', 
    nameEn: 'Creative Gradient VIP', 
    category: 'التصميم والتسويق', 
    description: 'مظهر جريء بألوان متدرجة وبطاقات ديناميكية تلفت انتباه مسؤولي التوظيف.',
    isActive: true, 
    isPremium: true, 
    isVip: true,
    usageCount: 0, 
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200',
    primaryColor: '#ec4899',
    author: 'فريق التصميم VIP'
  },
  { 
    id: 'minimal', 
    name: 'القالب المبسط المعاصر', 
    nameEn: 'Minimal Clean', 
    category: 'ريادة الأعمال', 
    description: 'نمط معاصر وبسيط يمنح المحتوى مساحات بيضاء مريحة للنظر بدون تشتيت.',
    isActive: true, 
    isPremium: false, 
    isVip: false,
    usageCount: 0, 
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=200',
    primaryColor: '#334155',
    author: 'فريق سيرتي برو'
  },
];

// Initial VIP Subscription Plans (باقات VIP)
export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-basic',
    name: 'باقة المحترف VIP الشهرية',
    nameEn: 'Pro Monthly VIP',
    price: 39,
    currency: 'SAR',
    billingPeriod: 'monthly',
    isPopular: false,
    isActive: true,
    features: [
      'الوصول لكافة قوالب VIP الحصرية',
      'إزالة العلامة المائية تماماً',
      'مساعد الذكاء الاصطناعي بلا حدود',
      'تصدير PDF فائق الدقة 300 DPI',
      'شارة التوثيق الزرقاء في الملف الشخصي'
    ]
  },
  {
    id: 'plan-annual',
    name: 'باقة النخبة VIP السنوية',
    nameEn: 'Elite Annual VIP',
    price: 249,
    currency: 'SAR',
    billingPeriod: 'yearly',
    isPopular: true,
    isActive: true,
    discountBadge: 'وفر 45%',
    features: [
      'كافة ميزات باقة المحترف لمدة سنة كاملة',
      'أولوية الدعم الفني الخاص 24/7',
      'مراجعة وتدقيق السيرة الذاتية يدوياً من خبير HR',
      'إنشاء عدد غير محدود من نسخ السيرة الذاتية',
      'ترقية دائمة لكافة القوالب الجديدة المستقبلية'
    ]
  }
];

// Initial Promo Codes
export const INITIAL_PROMOS: PromoCode[] = [
  {
    id: 'promo-1',
    code: 'WELCOME50',
    discountPercent: 50,
    maxUses: 100,
    usedCount: 3,
    expiresAt: '2027-12-31',
    isActive: true,
    createdAt: new Date().toISOString().split('T')[0]
  }
];

// Initial Subscription Codes
export const INITIAL_SUBSCRIPTION_CODES: SubscriptionCode[] = [
  {
    id: 'subcode-1',
    code: 'VIP-PROMO-2026',
    planId: 'plan-basic',
    planName: 'باقة المحترف VIP (شهر مجاناً)',
    durationMonths: 1,
    isUsed: false,
    createdAt: new Date().toISOString().split('T')[0],
    expiresAt: '2027-12-31'
  }
];

// Initial Articles / Career Content
export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'كيف تجتاز سيرتك الذاتية أنظمة الفرز الآلي (ATS) بنجاح عام 2026؟',
    slug: 'ats-resume-tips-2026',
    summary: 'دليل شامل لأهم الكلمات المفتاحية والهيكلة الصحيحة التي تبحث عنها خوارزميات التوظيف الحديثة.',
    content: `تعتمد أكثر من 90% من الشركات العالمية وكبرى المؤسسات في الوطن العربي على أنظمة تتبع المتقدمين (ATS) لفرز آلاف السير الذاتية آلياً قبل وصولها إلى يد مسؤول الموارد البشرية.

في هذا المقال نستعرض أهم 5 نصائح أساسية:
1. استخدم صيغ وتنسيقات معيارية واضحة للخطوط والأقسام.
2. اذكر الكلمات المفتاحية المطلوبة في إعلان الوظيفة بدقة.
3. تجنب وضع النصوص الأساسية داخل جداول معقدة أو مربعات رسومية مغلقة.
4. ركز على الإنجازات القابلة للقياس بالأرقام والنسب المئوية.
5. احرص على حفظ السيرة الذاتية بتنسيق PDF عالي النقاء.`,
    category: 'تطوير المسيرة المهنية',
    author: 'فريق التوظيف الاحترافي',
    readTimeMinutes: 4,
    viewsCount: 142,
    isPublished: true,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    tags: ['ATS', 'سيرة ذاتية', 'توظيف', 'نصائح مهنية']
  },
  {
    id: 'art-2',
    title: 'أسرار كتابة النبذة المهنية (Executive Summary) التي تخطف أنظار المدراء',
    slug: 'how-to-write-killer-summary',
    summary: 'كيف تصيغ أول 4 أسطر في سيرتك الذاتية لتقنع مسؤول التوظيف بإكمال قراءة ملفك فوراً.',
    content: `النبذة المهنية هي المصافحة الأولى بينك وبين صاحب العمل؛ حيث يقضي مسؤولو التوظيف في المتوسط 6 إلى 8 ثوانٍ فقط في إلقاء النظرة الأولى على السيرة الذاتية.

معادلة الصياغة الذهبية:
• من أنت؟ (المسمى الوظيفي وسنوات الخبرة المركزية).
• ما هي قيمتك المضافة؟ (أبرز إنجاز حققته بالأرقام).
• ما الذي تطمح لتقديمه للمؤسسة القادمة؟`,
    category: 'كتابة السير الذاتية',
    author: 'مستشار الموارد البشرية',
    readTimeMinutes: 3,
    viewsCount: 98,
    isPublished: true,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    tags: ['النبذة المهنية', 'مهارات', 'كتابة']
  }
];

// Initial API Keys for external sharing
export const INITIAL_API_KEYS: ApiKey[] = [
  {
    id: 'key-1',
    name: 'مفتاح تطبيق الجوال (Mobile App Production)',
    appName: 'تطبيق سيرتي برو لنظام iOS و Android',
    key: 'cvpro_live_a89f4b72c1e09d84e5671a9320',
    permissions: ['read_articles', 'full_access'],
    createdAt: new Date().toISOString().split('T')[0],
    expiresAt: '2028-12-31',
    isActive: true,
    requestsCount: 24,
    lastUsedAt: 'الآن'
  }
];

// Initial Connected Websites & Apps using the API
export const INITIAL_API_CONNECTIONS: ApiConnection[] = [
  {
    id: 'conn-1',
    name: 'بوابة وظائف الخليج والشرق الأوسط',
    domain: 'jobs-arabia.com',
    ip: '178.62.204.18',
    country: 'السعودية 🇸🇦',
    apiKey: 'cvpro_live_a89f4b72c1e09d84e5671a9320',
    endpoint: '/api/articles',
    requestsCount: 1420,
    status: 'online',
    lastPing: 'منذ ثوانٍ',
    userAgent: 'JobsArabia/2.4 (cURL Webhook Client)'
  },
  {
    id: 'conn-2',
    name: 'تطبيق التوظيف الذكي (iOS & Android)',
    domain: 'app.career-hub.io',
    ip: '54.217.189.92',
    country: 'الإمارات 🇦🇪',
    apiKey: 'cvpro_live_a89f4b72c1e09d84e5671a9320',
    endpoint: '/api/v1/articles?id=art-1',
    requestsCount: 890,
    status: 'online',
    lastPing: 'منذ دقيقة',
    userAgent: 'CareerHubApp/3.1 (Dart/Flutter Mobile)'
  },
  {
    id: 'conn-3',
    name: 'منصة الخريجين والتوظيف الجامعي',
    domain: 'alumni-portal.edu.sa',
    ip: '194.170.12.44',
    country: 'السعودية 🇸🇦',
    apiKey: 'cvpro_live_a89f4b72c1e09d84e5671a9320',
    endpoint: '/api/articles',
    requestsCount: 310,
    status: 'idle',
    lastPing: 'منذ 15 دقيقة',
    userAgent: 'Node.js/18.17 (Axios Fetcher)'
  }
];
