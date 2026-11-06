import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Check, 
  Sparkles, 
  BadgeCheck, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Tag, 
  Gift, 
  Key, 
  ArrowLeft, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SubscriptionPlan } from '../../types/admin';
import { INITIAL_PLANS } from '../../data/mockAdminData';

interface PricingPageProps {
  onGoToBuilder?: () => void;
  onOpenAuth?: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onGoToBuilder, onOpenAuth }) => {
  const { user, isAuthenticated, redeemSubscriptionCode, applyPromoCode, updateCurrentUser } = useAuth();

  const [plans, setPlans] = useState<SubscriptionPlan[]>(() => {
    const saved = localStorage.getItem('admin_plans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PLANS;
      }
    }
    return INITIAL_PLANS;
  });

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [subCodeInput, setSubCodeInput] = useState('');
  const [subCodeMessage, setSubCodeMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isActivating, setIsActivating] = useState(false);

  // Sync plans from admin storage if edited
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('admin_plans');
      if (saved) {
        try {
          setPlans(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;

    const result = applyPromoCode(promoCodeInput);
    if (result.success && result.discountPercent) {
      setDiscountPercent(result.discountPercent);
      setPromoMessage({ text: result.message, type: 'success' });
    } else {
      setPromoMessage({ text: result.message, type: 'error' });
    }
  };

  const handleRedeemSubCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      if (onOpenAuth) onOpenAuth();
      return;
    }
    if (!subCodeInput.trim()) return;

    setIsActivating(true);
    setTimeout(() => {
      const result = redeemSubscriptionCode(subCodeInput);
      if (result.success) {
        setSubCodeMessage({ text: result.message, type: 'success' });
        setSubCodeInput('');
      } else {
        setSubCodeMessage({ text: result.message, type: 'error' });
      }
      setIsActivating(false);
    }, 400);
  };

  const handleSubscribeClick = (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    // Direct simulation of VIP upgrade if user clicks subscribe
    updateCurrentUser({
      isVip: true,
      vipExpiresAt: billingCycle === 'yearly' ? '2027-12-31' : '2026-12-31',
      isVerifiedBadge: true
    });

    setSubCodeMessage({
      text: `مبروك! تم تفعيل اشتراكك في ${plan.name} بنجاح وحسابك أصبح يحمل شارة التوثيق 🛡️ وعضوية VIP 👑.`,
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-b from-white via-indigo-50/30 to-slate-50 border-b border-slate-200 pt-12 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-2xs">
            <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>باقات وعضويات VIP المميزة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            استثمر في مستقبلك المهني مع <span className="text-brand-600">سيرتي برو VIP</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            احصل على كافة القوالب الحصرية الفاخرة، بدون علامة مائية، مع شارة التوثيق الرسمية في ملفك الشخصي ودعم غير محدود بالذكاء الاصطناعي.
          </p>

          {/* User Current Status Pill */}
          {isAuthenticated && (
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs">
                <span className="text-slate-500">حالة حسابك الحالي:</span>
                {user?.isVip ? (
                  <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <Crown className="w-3.5 h-3.5 fill-amber-500" />
                    عضوية VIP نشطة حتى {user.vipExpiresAt || '2027'}
                  </span>
                ) : (
                  <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                    حساب مجاني عادي
                  </span>
                )}
                {user?.isVerifiedBadge && (
                  <span className="flex items-center gap-1 font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    <BadgeCheck className="w-3.5 h-3.5 fill-blue-500 text-white" />
                    حساب موثق رسمياً
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Billing Cycle Toggle */}
          <div className="pt-6 flex items-center justify-center">
            <div className="bg-slate-200/80 p-1.5 rounded-2xl flex items-center gap-1 text-xs font-bold">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-xl transition ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الدفع الشهري
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  billingCycle === 'yearly'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>الدفع السنوي</span>
                <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  وفر 45%
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* SUCCESS/ALERT NOTIFICATIONS */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        {subCodeMessage && (
          <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
            subCodeMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            {subCodeMessage.type === 'success' ? (
              <BadgeCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
            )}
            <div className="flex-1">{subCodeMessage.text}</div>
            <button
              onClick={() => setSubCodeMessage(null)}
              className="text-slate-400 hover:text-slate-600 text-xs"
            >
              إغلاق
            </button>
          </div>
        )}
      </div>

      {/* PLANS CARDS GRID */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* FREE PLAN */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                  البداية
                </span>
                <FileText className="w-5 h-5 text-slate-400" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">الباقة المجانية</h3>
                <p className="text-xs text-slate-500 mt-1">كافة الأدوات الأساسية لإنشاء سيرة ذاتية أولى</p>
              </div>

              <div className="pt-2 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">0</span>
                <span className="text-sm font-bold text-slate-500">ر.س / دائماً</span>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>الوصول للقوالب المجانية الكلاسيكية</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>تصدير PDF قياسي للمعاينة</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>حفظ سيرة ذاتية واحدة بحسابك</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 line-through">
                  <span>إزالة العلامة المائية تماماً</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-400 line-through">
                  <span>شارة التوثيق الزرقاء في الملف الشخصي</span>
                </div>
              </div>
            </div>

            <button
              onClick={onGoToBuilder}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <span>متابعة بالحساب المجاني</span>
            </button>
          </div>

          {/* DYNAMIC PLANS FROM ADMIN (VIP PLANS) */}
          {plans.map(plan => {
            let finalPrice = plan.price;
            if (discountPercent > 0) {
              finalPrice = Math.round(plan.price * (1 - discountPercent / 100));
            }

            const isCurrentUsersPlan = user?.isVip;

            return (
              <div 
                key={plan.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative transition duration-300 ${
                  plan.isPopular
                    ? 'border-2 border-brand-500 shadow-xl shadow-brand-500/10 ring-4 ring-brand-500/10'
                    : 'border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-[11px] font-black shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>الأكثر اختياراً</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                      <span>عضوية VIP</span>
                    </span>
                    {plan.discountBadge && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        {plan.discountBadge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{plan.nameEn || 'VIP Membership'}</p>
                  </div>

                  {/* Price display with discount support */}
                  <div className="pt-2 flex items-baseline gap-1.5">
                    <span className="text-4xl font-black text-slate-900">{finalPrice}</span>
                    <span className="text-sm font-bold text-slate-600">{plan.currency || 'ر.س'}</span>
                    <span className="text-xs text-slate-400">/ {plan.billingPeriod === 'yearly' ? 'سنة' : 'شهر'}</span>
                    {discountPercent > 0 && (
                      <span className="text-xs line-through text-slate-400 mr-2">
                        {plan.price} {plan.currency}
                      </span>
                    )}
                  </div>

                  {/* Features list */}
                  <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-700">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                    {/* Always highlight verified badge for VIP */}
                    <div className="flex items-center gap-2.5 text-blue-700 font-bold bg-blue-50/70 p-2 rounded-xl border border-blue-200/60">
                      <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-600 text-white shrink-0" />
                      <span>شارة التوثيق الزرقاء 🛡️ مفعلة بحسابك</span>
                    </div>
                  </div>
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => handleSubscribeClick(plan)}
                  className={`w-full py-3.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md ${
                    plan.isPopular
                      ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isCurrentUsersPlan ? (
                    <>
                      <Crown className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>أنت مشترك في هذه الباقة ✓</span>
                    </>
                  ) : (
                    <>
                      <span>اشترك في باقة VIP الآن</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            );
          })}

        </div>
      </div>

      {/* REDEEM CODES & PROMOS SECTION */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* SUBSCRIPTION CODE ACTIVATION BOX */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">تفعيل كود اشتراك VIP مباشر</h4>
                <p className="text-[11px] text-slate-500">هل تملك كود تفعيل؟ أدخله لتفعيل VIP والشارة فوراً</p>
              </div>
            </div>

            <form onSubmit={handleRedeemSubCode} className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="مثال: VIP-PROMO-2026"
                  value={subCodeInput}
                  onChange={(e) => setSubCodeInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  dir="ltr"
                />
                <button
                  type="submit"
                  disabled={isActivating}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs transition shrink-0 shadow-xs"
                >
                  {isActivating ? 'جاري التحقق...' : 'تفعيل الكود'}
                </button>
              </div>
              <p className="text-[10px] text-slate-400">
                ملاحظة: يمكنك الحصول على أكواد التفعيل من خلال العروض أو من إدارة المنصة مباشرة.
              </p>
            </form>
          </div>

          {/* PROMO / DISCOUNT CODE BOX */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">كود برومو وتخفيض</h4>
                <p className="text-[11px] text-slate-500">هل تملك كود خصم للباقات؟ طبّقه للحصول على خصم إضافي</p>
              </div>
            </div>

            <form onSubmit={handleApplyPromo} className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="مثال: WELCOME50"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-brand-500"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition shrink-0 shadow-xs"
                >
                  تطبيق الخصم
                </button>
              </div>

              {promoMessage && (
                <p className={`text-[11px] font-bold ${
                  promoMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {promoMessage.text}
                </p>
              )}
            </form>
          </div>

        </div>
      </div>

      {/* VIP PERKS HIGHLIGHT */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 bg-gradient-to-r from-brand-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">مزايا العضوية الذهبية</span>
            <h3 className="text-2xl font-black">لماذا يختار المحترفون سيرتي برو VIP؟</h3>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-8 h-8 text-blue-400 fill-blue-400 text-slate-900" />
            <Crown className="w-8 h-8 text-amber-400 fill-amber-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10 text-xs text-indigo-100">
          <div className="space-y-1.5">
            <h5 className="font-bold text-white text-sm">شارة توثيق معتمدة 🛡️</h5>
            <p className="leading-relaxed text-indigo-200">
              شارة زرقاء تظهر في ملفك وسيرتك لتعزيز موثوقية خبراتك أمام مديري التوظيف.
            </p>
          </div>
          <div className="space-y-1.5">
            <h5 className="font-bold text-white text-sm">بدون علامة مائية نهائياً ✨</h5>
            <p className="leading-relaxed text-indigo-200">
              طباعة وتصدير نظيف بالكامل وبدقة عالية تصل إلى 300 DPI جاهزة للطباعة الورقية.
            </p>
          </div>
          <div className="space-y-1.5">
            <h5 className="font-bold text-white text-sm">قوالب VIP التنفيذية 👑</h5>
            <p className="leading-relaxed text-indigo-200">
              تصاميم راقية مصممة خصيصاً للوظائف القيادية والمتوسطة بأعلى نسبة قبول في ATS.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
