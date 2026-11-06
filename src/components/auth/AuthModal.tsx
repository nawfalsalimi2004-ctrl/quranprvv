import React, { useState } from 'react';
import { X, LogIn, UserPlus, Mail, Lock, User, CheckCircle2, ArrowRight, MailCheck, AlertTriangle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultMode = 'login' }) => {
  const { login, register, resendVerification, verifyAccountManually } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Verification states
  const [verificationPending, setVerificationPending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const [resending, setResending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (mode === 'register') {
      if (!name.trim()) {
        setError('يرجى إدخال الاسم الكامل');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('يرجى إدخال بريد إلكتروني صحيح');
        return;
      }
      if (password.length < 6) {
        setError('كلمة المرور يجب أن لا تقل عن 6 أحرف');
        return;
      }
      if (password !== confirmPassword) {
        setError('كلمات المرور غير متطابقة');
        return;
      }

      const res = await register(name, email, password);
      if (!res.success) {
        setError(res.message || 'فشل إنشاء الحساب. يرجى المحاولة مرة أخرى.');
        return;
      }

      // Verification is required!
      setPendingEmail(email);
      setVerificationPending(true);
      setSuccessMsg(res.message || 'تم إرسال رابط تأكيد الحساب إلى بريدك الإلكتروني.');
    } else {
      if (!email.trim()) {
        setError('يرجى إدخال البريد الإلكتروني');
        return;
      }
      if (!password) {
        setError('يرجى إدخال كلمة المرور');
        return;
      }

      const res = await login(email, password);
      if (!res.success) {
        if (res.needsVerification) {
          setPendingEmail(email);
          setVerificationPending(true);
          setError(res.message || 'يجب تأكيد الحساب أولاً قبل تسجيل الدخول.');
        } else {
          setError(res.message || 'بيانات الدخول غير صحيحة. يرجى التحقق من البريد وكلمة المرور.');
        }
        return;
      }

      setSuccessMsg('تم تسجيل الدخول بنجاح! مرحباً بك.');
      setTimeout(() => {
        onClose();
      }, 800);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    const res = await resendVerification(pendingEmail, password);
    setResending(false);
    setSuccessMsg(res.message || 'تمت إعادة إرسال رابط التفعيل بنجاح.');
  };

  const handleSimulateVerify = () => {
    verifyAccountManually(pendingEmail);
    setSuccessMsg('تم تأكيد وتفعيل بريدك الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول مباشرة.');
    setTimeout(() => {
      setVerificationPending(false);
      setMode('login');
      setError('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Tabs */}
        {!verificationPending && (
          <div className="flex border-b border-slate-100 bg-slate-50/70">
            <button
              onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
              className={`flex-1 py-3.5 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
                mode === 'login'
                  ? 'border-brand-600 text-brand-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); setSuccessMsg(''); }}
              className={`flex-1 py-3.5 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
                mode === 'register'
                  ? 'border-brand-600 text-brand-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>إنشاء حساب جديد</span>
            </button>
            <button
              onClick={onClose}
              className="p-3 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Verification Screen */}
          {verificationPending ? (
            <div className="text-center py-2 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto ring-8 ring-amber-50/60 shadow-inner">
                <MailCheck className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  تأكيد وتفعيل الحساب إلزامي
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  تم إرسال رابط تأكيد الحساب إلى البريد الإلكتروني:
                </p>
                <div className="font-mono font-bold text-xs text-brand-700 bg-brand-50/70 p-2 rounded-lg mt-2 border border-brand-100 break-all" dir="ltr">
                  {pendingEmail}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs text-right space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>شرط تسجيل الدخول:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  لا يمكن تسجيل الدخول إلى هذا الحساب حتى يتم الضغط على رابط التفعيل المرسل إلى بريدك الإلكتروني (تأكد أيضاً من مجلد الرسائل غير المرغوب فيها Spam).
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
                  <span>{resending ? 'جارٍ إعادة الإرسال...' : 'إعادة إرسال رابط التأكيد'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateVerify}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  ✓ تأكيد بريدي الآن وتفعيل الحساب
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVerificationPending(false);
                    setMode('login');
                    setError('');
                    setSuccessMsg('');
                  }}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  العودة إلى شاشة تسجيل الدخول
                </button>
              </div>
            </div>
          ) : (
            /* Regular Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: يوسف المحمدي"
                      className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition text-xs"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">تأكيد كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    🔒 سيتم إرسال رابط تأكيد وتفعيل إلزامي إلى بريدك الإلكتروني لإكمال التسجيل.
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg text-sm shadow-md shadow-brand-500/25 transition flex items-center justify-center gap-2"
              >
                <span>{mode === 'login' ? 'دخول إلى حسابي' : 'إنشاء الحساب وإرسال رابط التأكيد'}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>
          )}

          {!verificationPending && (
            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              {mode === 'login' ? (
                <p className="text-xs text-slate-500">
                  ليس لديك حساب بعد؟{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('register'); setError(''); }}
                    className="font-bold text-brand-600 hover:underline"
                  >
                    إنشاء حساب جديد
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-500">
                  لديك حساب بالفعل؟{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); }}
                    className="font-bold text-brand-600 hover:underline"
                  >
                    تسجيل الدخول
                  </button>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
