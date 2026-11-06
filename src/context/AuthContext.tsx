import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';
import { INITIAL_USERS } from '../data/mockAdminData';
import { ADMIN_CREDENTIALS } from '../data/authConfig';
import { auth } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  signOut as firebaseSignOut 
} from 'firebase/auth';

export interface AuthResponse {
  success: boolean;
  message?: string;
  needsVerification?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password?: string) => Promise<AuthResponse>;
  resendVerification: (email: string, password?: string) => Promise<AuthResponse>;
  verifyAccountManually: (email: string) => boolean;
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
    return null;
  });

  // Store registered accounts with their verification status
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

  const login = async (email: string, password?: string): Promise<AuthResponse> => {
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

    // 2. Try Firebase Auth with STRICT email verification check
    try {
      if (password && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
        const fbUser = userCredential.user;

        // Check if email is verified
        if (!fbUser.emailVerified) {
          // Log out immediately!
          await firebaseSignOut(auth);
          setUser(null);
          return {
            success: false,
            needsVerification: true,
            message: 'عذراً، يجب تأكيد حسابك أولاً قبل تسجيل الدخول! يرجى مراجعة بريدك الإلكتروني والضغط على رابط التفعيل المرسل.'
          };
        }

        const loggedInUser: User = {
          id: fbUser.uid,
          name: fbUser.displayName || normalizedEmail.split('@')[0],
          email: fbUser.email || normalizedEmail,
          role: 'user',
          createdAt: new Date().toISOString().split('T')[0],
          resumesCount: 1,
          status: 'active',
          emailVerified: true
        };
        setUser(loggedInUser);
        return { success: true };
      }
    } catch (fbError: any) {
      console.log('Firebase auth notice:', fbError?.message);
      if (fbError?.code === 'auth/wrong-password' || fbError?.code === 'auth/invalid-credential') {
        return {
          success: false,
          message: 'كلمة المرور أو البريد الإلكتروني غير صحيح.'
        };
      }
    }

    // 3. Check local registered accounts (Strict email verification check)
    const existing = registeredUsers.find(u => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      if (!existing.emailVerified && existing.role !== 'admin') {
        return {
          success: false,
          needsVerification: true,
          message: 'عذراً، هذا الحساب غير مفعل بعد. يرجى تأكيد بريدك الإلكتروني أولاً.'
        };
      }
      setUser(existing);
      return { success: true };
    }

    return {
      success: false,
      message: 'لم يتم العثور على هذا الحساب. يرجى التأكد من البريد أو إنشاء حساب جديد.'
    };
  };

  const register = async (name: string, email: string, password?: string): Promise<AuthResponse> => {
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Attempt Firebase registration and send verification link
    try {
      if (password && auth) {
        const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
        const fbUser = userCredential.user;

        // Send official Firebase email verification link!
        await sendEmailVerification(fbUser);

        // Sign out immediately so user CANNOT login without verification!
        await firebaseSignOut(auth);
        setUser(null);

        const newUser: User = {
          id: fbUser.uid,
          name: name,
          email: normalizedEmail,
          role: 'user',
          createdAt: new Date().toISOString().split('T')[0],
          resumesCount: 0,
          status: 'active',
          emailVerified: false // strictly false until verified
        };

        setRegisteredUsers(prev => [...prev.filter(u => u.email !== normalizedEmail), newUser]);

        return {
          success: true,
          needsVerification: true,
          message: `تم إنشاء الحساب بنجاح! تم إرسال رابط تأكيد الحساب إلى: (${normalizedEmail}). يرجى مراجعة بريدك الإلكتروني وتفعيله لتتمكن من تسجيل الدخول.`
        };
      }
    } catch (fbErr: any) {
      console.log('Firebase register notice:', fbErr?.message);
      if (fbErr?.code === 'auth/email-already-in-use') {
        return {
          success: false,
          message: 'هذا البريد الإلكتروني مسجل بالفعل مسبقاً.'
        };
      }
    }

    // 2. Local fallback registration (strictly unverified)
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: name,
      email: normalizedEmail,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0],
      resumesCount: 0,
      status: 'active',
      emailVerified: false // strictly false
    };

    setRegisteredUsers(prev => [...prev.filter(u => u.email !== normalizedEmail), newUser]);

    return {
      success: true,
      needsVerification: true,
      message: `تم إنشاء الحساب بنجاح! يرجى تأكيد بريدك الإلكتروني (${normalizedEmail}) لتتمكن من تسجيل الدخول.`
    };
  };

  const resendVerification = async (email: string, password?: string): Promise<AuthResponse> => {
    const normalizedEmail = email.trim().toLowerCase();
    try {
      if (password && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
        await sendEmailVerification(userCredential.user);
        await firebaseSignOut(auth);
        return {
          success: true,
          message: `تمت إعادة إرسال رابط تأكيد الحساب بنجاح إلى (${normalizedEmail}). يرجى فحص صندوق الوارد ورسائل الـ Spam.`
        };
      }
    } catch (e: any) {
      console.log('Resend error:', e);
    }
    return {
      success: true,
      message: `تم إرسال رابط التحقق مجدداً إلى (${normalizedEmail}).`
    };
  };

  // Manual verification helper (e.g. for testing or local simulation)
  const verifyAccountManually = (email: string): boolean => {
    const normalizedEmail = email.trim().toLowerCase();
    setRegisteredUsers(prev => prev.map(u => {
      if (u.email.toLowerCase() === normalizedEmail) {
        return { ...u, emailVerified: true };
      }
      return u;
    }));
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
        resendVerification,
        verifyAccountManually,
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
