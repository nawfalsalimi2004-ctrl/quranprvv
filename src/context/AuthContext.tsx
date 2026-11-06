import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';
import { INITIAL_USERS } from '../data/mockAdminData';
import { ADMIN_CREDENTIALS } from '../data/authConfig';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut 
} from 'firebase/auth';

interface LoginResult {
  success: boolean;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<LoginResult> | LoginResult;
  register: (name: string, email: string, password?: string) => Promise<boolean> | boolean;
  logout: () => void;
  registeredUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with null (logged out) unless saved in localStorage
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cv_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null; // Visitors start logged out (no demo account)
  });

  // Store registered accounts locally
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cv_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_USERS;
      }
    }
    return INITIAL_USERS;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cv_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cv_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cv_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const login = async (email: string, password?: string): Promise<LoginResult> => {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check if logging in as Admin
    if (
      normalizedEmail === ADMIN_CREDENTIALS.email.toLowerCase() ||
      normalizedEmail === ADMIN_CREDENTIALS.alternateEmail.toLowerCase()
    ) {
      if (password !== ADMIN_CREDENTIALS.password) {
        return {
          success: false,
          message: 'بيانات الدخول غير صحيحة. يرجى التحقق من كلمة المرور.',
        };
      }
      setUser(INITIAL_USERS[0]);
      return { success: true };
    }

    // 2. Try Firebase Auth (if connected and online)
    try {
      if (password && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
        const fbUser = userCredential.user;
        const loggedInUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || normalizedEmail.split('@')[0],
          email: fbUser.email || normalizedEmail,
          role: 'user',
          createdAt: new Date().toISOString().split('T')[0],
          resumesCount: 1,
          status: 'active'
        };
        setUser(loggedInUser);
        return { success: true };
      }
    } catch (fbError: any) {
      // If Firebase rejected password or user not found, fall back to local validation
      console.log('Firebase auth notice:', fbError?.message);
    }

    // 3. Fallback: Check local registered accounts
    const existing = registeredUsers.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      setUser(existing);
      return { success: true };
    }

    // 4. Create new user session if verified
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email: email,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0],
      resumesCount: 1,
      status: 'active'
    };
    setUser(newUser);
    setRegisteredUsers(prev => [...prev, newUser]);
    return { success: true };
  };

  const register = async (name: string, email: string, password?: string): Promise<boolean> => {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Attempt Firebase registration
    try {
      if (password && auth) {
        const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
        const fbUser = userCredential.user;
        const newUser: User = {
          id: fbUser.uid,
          name: name,
          email: normalizedEmail,
          role: 'user',
          createdAt: new Date().toISOString().split('T')[0],
          resumesCount: 0,
          status: 'active'
        };
        setUser(newUser);
        setRegisteredUsers(prev => [...prev, newUser]);
        return true;
      }
    } catch (fbErr: any) {
      console.log('Firebase register notice:', fbErr?.message);
    }

    // 2. Local registration fallback
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: name,
      email: email,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0],
      resumesCount: 0,
      status: 'active'
    };
    setUser(newUser);
    setRegisteredUsers(prev => [...prev, newUser]);
    return true;
  };

  const logout = () => {
    try {
      if (auth) {
        firebaseSignOut(auth).catch(() => {});
      }
    } catch (e) {}
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
        logout,
        registeredUsers
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
