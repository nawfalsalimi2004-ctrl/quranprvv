export default function handler(req, res) {
  // CORS setup for external apps and mobile apps
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Api-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Articles Database
  const articles = [
    {
      id: 'art-1',
      title: 'كيف تجتاز سيرتك الذاتية أنظمة الفرز الآلي (ATS) بنجاح عام 2026؟',
      slug: 'ats-resume-tips-2026',
      summary: 'دليل شامل لأهم الكلمات المفتاحية والهيكلة الصحيحة التي تبحث عنها خوارزميات التوظيف الحديثة.',
      content: `تعتمد أكثر من 90% من الشركات العالمية وكبرى المؤسسات في الوطن العربي على أنظمة تتبع المتقدمين (ATS) لفرز آلاف السير الذاتية آلياً قبل وصولها إلى يد مسؤول الموارد البشرية.\n\nفي هذا المقال نستعرض أهم 5 نصائح أساسية:\n1. استخدم صيغ وتنسيقات معيارية واضحة للخطوط والأقسام.\n2. اذكر الكلمات المفتاحية المطلوبة في إعلان الوظيفة بدقة.\n3. تجنب وضع النصوص الأساسية داخل جداول معقدة أو مربعات رسومية مغلقة.\n4. ركز على الإنجازات القابلة للقياس بالأرقام والنسب المئوية.\n5. احرص على حفظ السيرة الذاتية بتنسيق PDF عالي النقاء.`,
      category: 'تطوير المسيرة المهنية',
      author: 'فريق التوظيف الاحترافي',
      coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800',
      readTimeMinutes: 4,
      viewsCount: 142,
      isPublished: true,
      createdAt: '2026-11-06',
      updatedAt: '2026-11-06',
      tags: ['ATS', 'سيرة ذاتية', 'توظيف', 'نصائح مهنية']
    },
    {
      id: 'art-2',
      title: 'أسرار كتابة النبذة المهنية (Executive Summary) التي تخطف أنظار المدراء',
      slug: 'how-to-write-killer-summary',
      summary: 'كيف تصيغ أول 4 أسطر في سيرتك الذاتية لتقنع مسؤول التوظيف بإكمال قراءة ملفك فوراً.',
      content: `النبذة المهنية هي المصافحة الأولى بينك وبين صاحب العمل؛ حيث يقضي مسؤولو التوظيف في المتوسط 6 إلى 8 ثوانٍ فقط في إلقاء النظرة الأولى على السيرة الذاتية.\n\nمعادلة الصياغة الذهبية:\n• من أنت؟ (المسمى الوظيفي وسنوات الخبرة المركزية).\n• ما هي قيمتك المضافة؟ (أبرز إنجاز حققته بالأرقام).\n• ما الذي تطمح لتقديمه للمؤسسة القادمة؟`,
      category: 'كتابة السير الذاتية',
      author: 'مستشار الموارد البشرية',
      coverImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800',
      readTimeMinutes: 3,
      viewsCount: 98,
      isPublished: true,
      createdAt: '2026-11-06',
      updatedAt: '2026-11-06',
      tags: ['النبذة المهنية', 'مهارات', 'كتابة']
    }
  ];

  const authHeader = req.headers['authorization'] || req.headers['x-api-key'];
  const hasKey = Boolean(authHeader);

  const { id, slug } = req.query;

  // Single article lookup by id or slug
  if (id || slug) {
    const article = articles.find(a => (id && a.id === id) || (slug && a.slug === slug));
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'المقال غير موجود',
        code: 'ARTICLE_NOT_FOUND',
        requestedId: id || slug
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      host: 'https://quranprvv.vercel.app',
      endpoint: `/api/articles?id=${article.id}`,
      authenticated: hasKey,
      permissions: ['read_articles'],
      article: article
    });
  }

  // All published articles list
  return res.status(200).json({
    success: true,
    status: 200,
    host: 'https://quranprvv.vercel.app',
    endpoint: '/api/articles',
    authenticated: hasKey,
    permissions: ['read_articles'],
    total: articles.length,
    articles: articles
  });
}
