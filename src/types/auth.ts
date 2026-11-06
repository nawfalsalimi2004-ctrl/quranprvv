export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  resumesCount: number;
  status: 'active' | 'suspended';
  emailVerified?: boolean;
  isVerifiedBadge?: boolean;
  isVip?: boolean;
  vipExpiresAt?: string;
  isBanned?: boolean;
  banReason?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
