import { TemplateId, FontFamily } from '../types/cv';

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  nameEn: string;
  badge: string;
  description: string;
  previewImage: string;
  features: string[];
  recommendedRole: string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 'modern',
    name: 'القالب العصري (Modern)',
    nameEn: 'Modern Indigo',
    badge: 'الأكثر شعبية',
    description: 'تصميم أنيق متوازن بعمودين مميزين، شريط جانبي للمعلومات والمهارات وقسم رئيسي متسع للخبرات والإنجازات.',
    previewImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&auto=format&fit=crop&q=80',
    features: ['شريط جانبي ملون', 'مخطط واضح للمهارات', 'أيقونات تواصل أنيقة', 'متوافق مع ATS'],
    recommendedRole: 'مطورين، مهندسين، مسؤولي تقنية'
  },
  {
    id: 'executive',
    name: 'القالب التنفيذي (Executive)',
    nameEn: 'Executive Slate',
    badge: 'احترافي فاخر',
    description: 'قالب كلاسيكي مرموق ومصقول للقيادات الإدارية، مديري المشاريع، والاستشاريين مع ترويسة عريضة جذابة.',
    previewImage: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=400&auto=format&fit=crop&q=80',
    features: ['ترويسة عريضة فاخرة', 'خط زمني أنيق للخبرات', 'هيكل هرمي واضح', 'مثالي للإداريين'],
    recommendedRole: 'المدراء التنفيذيين، المستشارين، رؤساء الأقسام'
  },
  {
    id: 'classic',
    name: 'القالب الكلاسيكي الأكاديمي (Classic)',
    nameEn: 'Classic Academic',
    badge: 'رسمي معتمد',
    description: 'تصميم هادئ وعريق يركز على المحتوى المباشر والتسلسل الزمني الدقيق، الأنسب للقطاعات الحكومية والأكاديمية والطبية.',
    previewImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop&q=80',
    features: ['أعلى نسبة قراءة لـ ATS', 'فواصل خطية رصينة', 'تركيز فائق على المؤهلات', 'طباعة مثالية بالحبر الأسود'],
    recommendedRole: 'الأكاديميين، الأطباء، القانونيين، موظفي القطاع الحكومي'
  },
  {
    id: 'creative',
    name: 'القالب الإبداعي (Creative)',
    nameEn: 'Creative Gradient',
    badge: 'عصري وبارز',
    description: 'مظهر جريء بألوان متدرجة وبطاقات ديناميكية تلفت انتباه مسؤولي التوظيف وفرق التصميم والتسويق.',
    previewImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop&q=80',
    features: ['لمسات لونية إبداعية', 'شارات مهارات عصرية', 'عرض المشاريع بنظام البطاقات', 'هوية بصرية مميزة'],
    recommendedRole: 'المصممين، المسوقين الرقميين، كتاب المحتوى'
  },
  {
    id: 'minimal',
    name: 'القالب المبسط المعاصر (Minimal)',
    nameEn: 'Minimal Clean',
    badge: 'خفيف ومرتب',
    description: 'نمط معاصر وبسيط يمنح المحتوى مساحات بيضاء مريحة للنظر بدون أي عناصر مشتتة، مستوحى من بساطة التصميم الاسكندنافي.',
    previewImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&auto=format&fit=crop&q=80',
    features: ['مساحات بيضاء مريحة', 'طباعة فائقة النقاء', 'عناصر قراءة سريعة', 'عصري وحديث'],
    recommendedRole: 'رواد الأعمال، الباحثين، الكتاب، مستشاري الأعمال'
  }
];

export const COLOR_PALETTES = [
  { name: 'أزرق كحلي ملكي', primary: '#2563eb', secondary: '#0f172a' },
  { name: 'بنفسجي احترافي', primary: '#4f46e5', secondary: '#1e1b4b' },
  { name: 'زمردي طبيعي', primary: '#059669', secondary: '#064e3b' },
  { name: 'عنابي فاخر', primary: '#9f1239', secondary: '#4c0519' },
  { name: 'فحمي داكن', primary: '#1e293b', secondary: '#090d16' },
  { name: 'برتقالي دافئ', primary: '#ea580c', secondary: '#431407' },
  { name: 'تركواز بحري', primary: '#0891b2', secondary: '#164e63' },
];

export const FONTS: { name: string; family: FontFamily; preview: string }[] = [
  { name: 'خط القاهرة (Cairo)', family: 'Cairo', preview: 'خط هندسي حديث وأكثر الخطوط العربية شيوعاً واحترافية' },
  { name: 'خط تجوال (Tajawal)', family: 'Tajawal', preview: 'خط سلس وناعم ومقروء جداً للعين' },
  { name: 'خط المراعي (Almarai)', family: 'Almarai', preview: 'خط رسمي متزن ورائع للمستندات والشهادات' },
  { name: 'خط إنتر (Inter / اللاتيني)', family: 'Inter', preview: 'مناسب للسير الذاتية باللغة الإنجليزية والمصطلحات التقنية' },
];
