import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/auth';
import { INITIAL_USERS } from '../data/mockAdminData';
import { ADMIN_CREDENTIALS } from '../data/authConfig';

interface LoginResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => LoginResult;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cv_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default user is a regular user (Sara), NOT admin
    return INITIAL_USERS[1];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cv_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cv_user');
    }
  }, [user]);

  const login = (email: string, password?: string): LoginResult => {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if logging in as Admin with strict credentials
    if (
      normalizedEmail === ADMIN_CREDENTIALS.email.toLowerCase() ||
      normalizedEmail === ADMIN_CREDENTIALS.alternateEmail.toLowerCase()
    ) {
      if (password !== ADMIN_CREDENTIALS.password) {
        return {
          success: false,
          message: 'بيانات الدخول غير صحيحة. يرجى التحقق من البريد وكلمة المرور.',
        };
      }
      setUser(INITIAL_USERS[0]); // عبدالرحمن الشهري (Admin)
      return { success: true };
    }

    // Check if regular user exists in mock list
    const found = INITIAL_USERS.find(u => u.email.toLowerCase() === normalizedEmail);
    if (found) {
      // Don't allow logging into admin account without correct admin password
      if (found.role === 'admin') {
        if (password !== ADMIN_CREDENTIALS.password) {
          return {
            success: false,
            message: 'بيانات الدخول غير صحيحة.',
          };
        }
      }
      setUser(found);
      return { success: true };
    }

    // Create new login session as regular user
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: 'user', // strictly regular user
      createdAt: new Date().toISOString().split('T')[0],
      resumesCount: 1,
      status: 'active'
    };
    setUser(newUser);
    return { success: true };
  };

  const register = (name: string, email: string, _password?: string): boolean => {
    // Registrations are always regular users
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: name,
      email: email,
      role: 'user', // strictly regular user
      createdAt: new Date().toISOString().split('T')[0],
      resumesCount: 0,
      status: 'active'
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
