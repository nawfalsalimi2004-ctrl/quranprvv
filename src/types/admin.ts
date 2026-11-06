export interface AdminStat {
  totalUsers: number;
  totalResumes: number;
  totalDownloads: number;
  activeToday: number;
  conversionRate: number;
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
  isActive: boolean;
  isPremium: boolean;
  usageCount: number;
  thumbnail: string;
}
