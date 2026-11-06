import { User } from '../types/auth';
import { AdminStat, SystemLog, TemplateSetting } from '../types/admin';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'عبدالرحمن الشهري',
    email: 'admin@cvpro.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    createdAt: '2024-01-15',
    resumesCount: 14,
    status: 'active'
  },
  {
    id: 'usr-2',
    name: 'سارة العتيبي',
    email: 'sara.otaibi@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    createdAt: '2024-02-10',
    resumesCount: 3,
    status: 'active'
  },
  {
    id: 'usr-3',
    name: 'عمر القحطاني',
    email: 'omar.q@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    createdAt: '2024-03-01',
    resumesCount: 5,
    status: 'active'
  },
  {
    id: 'usr-4',
    name: 'نورة الدوسري',
    email: 'noura.d@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    createdAt: '2024-03-12',
    resumesCount: 2,
    status: 'active'
  },
  {
    id: 'usr-5',
    name: 'ماجد الشمري',
    email: 'majed.sh@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    createdAt: '2024-03-25',
    resumesCount: 1,
    status: 'suspended'
  }
];

export const INITIAL_STATS: AdminStat = {
  totalUsers: 14820,
  totalResumes: 43290,
  totalDownloads: 92840,
  activeToday: 1350,
  conversionRate: 14.8
};

export const INITIAL_LOGS: SystemLog[] = [
  { id: 'log-1', action: 'تسجيل حساب مستخدم جديد (noura.d@example.com)', user: 'نظام المصادقة', timestamp: 'منذ 5 دقائق', type: 'info' },
  { id: 'log-2', action: 'تصدير سيرة ذاتية بصيغة PDF (القالب العصري)', user: 'أحمد الزهراني', timestamp: 'منذ 14 دقيقة', type: 'success' },
  { id: 'log-3', action: 'ترقية صلاحية المستخدم (admin@cvpro.com) إلى مدير النظام', user: 'Super Admin', timestamp: 'منذ ساعتين', type: 'warning' },
  { id: 'log-4', action: 'تحديث ألوان وهوية القالب التنفيذي Executive', user: 'عبدالرحمن الشهري', timestamp: 'منذ 5 ساعات', type: 'info' },
  { id: 'log-5', action: 'تم حظر حساب مخالف للشروط (majed.sh@example.com)', user: 'فريق الحماية', timestamp: 'منذ يوم', type: 'danger' }
];

export const INITIAL_TEMPLATES_SETTINGS: TemplateSetting[] = [
  { id: 'modern', name: 'القالب العصري', nameEn: 'Modern Indigo', category: 'التقنية والتطوير', isActive: true, isPremium: false, usageCount: 19430, thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=200' },
  { id: 'executive', name: 'القالب التنفيذي', nameEn: 'Executive Slate', category: 'الإدارة والقيادة', isActive: true, isPremium: true, usageCount: 12510, thumbnail: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=200' },
  { id: 'classic', name: 'القالب الكلاسيكي', nameEn: 'Classic Academic', category: 'الأكاديمي والحكومي', isActive: true, isPremium: false, usageCount: 8940, thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=200' },
  { id: 'creative', name: 'القالب الإبداعي', nameEn: 'Creative Gradient', category: 'التصميم والتسويق', isActive: true, isPremium: true, usageCount: 7120, thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200' },
  { id: 'minimal', name: 'القالب المبسط', nameEn: 'Minimal Clean', category: 'ريادة الأعمال', isActive: true, isPremium: false, usageCount: 6540, thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=200' },
];
