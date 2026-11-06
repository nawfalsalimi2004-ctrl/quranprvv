export interface AdminStat {
  totalUsers: number;
  totalResumes: number;
  totalDownloads: number;
  activeToday: number;
  totalVipUsers: number;
  totalArticles: number;
  totalPromoCodes: number;
}

export interface SystemLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success' | 'danger';
}

export interface TemplateSetting {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  description?: string;
  isActive: boolean;
  isPremium: boolean;
  isVip: boolean;
  usageCount: number;
  thumbnail: string;
  primaryColor?: string;
  author?: string;
  createdAt?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'quarterly' | 'yearly' | 'lifetime';
  features: string[];
  isPopular?: boolean;
  isActive: boolean;
  discountBadge?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discountPercent: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
}

export interface SubscriptionCode {
  id: string;
  code: string;
  planId: string;
  planName: string;
  durationMonths: number;
  isUsed: boolean;
  usedBy?: string;
  usedAt?: string;
  createdAt: string;
  expiresAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  coverImage?: string;
  readTimeMinutes: number;
  viewsCount: number;
  views?: number;
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export type ApiKeyPermission = 'read_articles' | 'write_articles' | 'export_cv' | 'full_access';

export interface ApiKey {
  id: string;
  name: string;
  appName: string;
  key: string;
  permissions: ApiKeyPermission[];
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
  requestsCount: number;
  lastUsedAt?: string;
}

export interface ApiConnection {
  id: string;
  name: string;
  domain: string;
  ip: string;
  country: string;
  apiKey: string;
  endpoint: string;
  requestsCount: number;
  status: 'online' | 'idle' | 'blocked';
  lastPing: string;
  userAgent?: string;
}
