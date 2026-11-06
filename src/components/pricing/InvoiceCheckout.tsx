import React, { useState } from 'react';
import { 
  FileText, 
  CreditCard, 
  Check, 
  X, 
  ShieldCheck, 
  Crown, 
  BadgeCheck, 
  Tag, 
  Printer, 
  Download, 
  Sparkles, 
  ArrowLeft,
  Building,
  Calendar,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SubscriptionPlan, PromoCode } from '../../types/admin';
import { useAuth } from '../../context/AuthContext';

interface InvoiceCheckoutProps {
  plan: SubscriptionPlan;
  billingCycle: 'monthly' | 'yearly';
  onClose: () => void;
  onSuccess: () => void;
}

export const InvoiceCheckout: React.FC<InvoiceCheckoutProps> = ({
  plan,
  billingCycle,
  onClose,
  onSuccess
}) => {
  const { user, applyPromoCode, updateCurrentUser } = useAuth();

  // Invoice static identifiers
  const [invoiceNumber] = useState(() => 'INV-2026-' + Math.floor(1000 + Math.random() * 9000));
  const invoiceDate = new Date().toISOString().split('T')[0];

  // Pricing calculations
  const originalPrice = plan.price;
  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'stcpay'>('card');
  const [cardNumber, setCardNumber] = useState('4120 •••• •••• 9842');
  const [cardHolder, setCardHolder] = useState(user?.name || 'محمد عبدالله');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('841');
  const [stcPhone, setStcPhone] = useState('05xxxxxxxx');

  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Calculate final totals
  const discountAmount = discountPercent > 0 ? (originalPrice * discountPercent) / 100 : 0;
  const finalPrice = Math.max(0, originalPrice - discountAmount);
  const vatAmount = Math.round(finalPrice * 0.15 * 100) / 100;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (res.success && res.discountPercent) {
      setDiscountPercent(res.discountPercent);
      setPromoMessage({ text: res.message, type: 'success' });
    } else {
      setPromoMessage({ text: res.message, type: 'error' });
    }
  };

  const handleConfirmPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Calculate VIP expiry date
      const expiry = new Date();
      if (billingCycle === 'yearly') {
        expiry.setFullYear(expiry.getFullYear() + 1);
      } else {
        expiry.setMonth(expiry.getMonth() + 1);
      }
      const vipExpiresAt = expiry.toISOString().split('T')[0];

      // Update active user immediately with VIP & Verified Badge
      updateCurrentUser({
        isVip: true,
        vipExpiresAt,
        isVerifiedBadge: true
      });

      setIsProcessing(false);
      setIsPaid(true);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* MODAL HEADER */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">فاتورة وسداد اشتراك VIP</h3>
              <p className="text-[11px] text-slate-400 font-mono">رقم الفاتورة: #{invoiceNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isPaid && (
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">طباعة الفاتورة</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* INVOICE CONTENT */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* PAID CELEBRATION BANNER */}
          {isPaid && (
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 text-center space-y-3 shadow-lg animate-in fade-in slide-in-from-top-3 duration-300">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black">تم سداد الفاتورة بنجاح!</h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
                مبروك! تم تفعيل اشتراكك في <strong>{plan.name}</strong> بنجاح، ومُنحت <strong>شارة التوثيق الرسمية 🛡️</strong> وعضوية VIP لكافة القوالب.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-white text-emerald-800 rounded-xl font-bold text-xs shadow-md hover:bg-emerald-50 transition"
                >
                  العودة لمنصة التحرير
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-emerald-800/60 hover:bg-emerald-800 border border-white/20 text-white rounded-xl font-bold text-xs transition flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة إيصال السداد</span>
                </button>
              </div>
            </div>
          )}

          {/* OFFICIAL INVOICE PAPER HEADER */}
          <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              
              {/* Merchant Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl text-slate-900 tracking-tight">سيرتي<span className="text-brand-600">برو</span></span>
                  <span className="text-[10px] bg-brand-50 text-brand-700 font-bold px-2 py-0.5 rounded-full border border-brand-200">
                    رسمية ومعتمدة
                  </span>
                </div>
                <p className="text-xs text-slate-500">منصة بناء السير الذاتية الذكية والتوظيف</p>
                <p className="text-[11px] text-slate-400 font-mono">سجل تجاري: 1010893245 • الرياض، المملكة العربية السعودية</p>
              </div>

              {/* Invoice Meta */}
              <div className="text-right sm:text-left space-y-1" dir="ltr">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono">
                  {isPaid ? (
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1 font-sans">
                      <Check className="w-3.5 h-3.5" /> تم السداد (PAID)
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300 font-sans">
                      بانتظار السداد (PENDING)
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-slate-800 font-mono mt-1">Invoice: #{invoiceNumber}</p>
                <p className="text-[11px] text-slate-500 font-mono">Date: {invoiceDate}</p>
              </div>
            </div>

            {/* Bill To Customer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[10px]">فاتورة صادرة إلى (Bill To):</p>
                <p className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                  <span>{user?.name || 'العميل الكريم'}</span>
                  {user?.isVerifiedBadge && (
                    <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                  )}
                </p>
                <p className="text-slate-500 font-mono">{user?.email || 'user@example.com'}</p>
              </div>

              <div className="space-y-1 sm:text-left" dir="ltr">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Payment Terms:</p>
                <p className="font-semibold text-slate-700">دفع فوري لتفعيل VIP والشارة</p>
                <p className="text-slate-500 text-[11px]">Due Date: {invoiceDate}</p>
              </div>
            </div>
          </div>

          {/* INVOICE ITEMS TABLE */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-100/90 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">البند / الخدمة</th>
                    <th className="p-3.5">دورة الفوترة</th>
                    <th className="p-3.5">السعر الأصلي</th>
                    <th className="p-3.5">الخصم</th>
                    <th className="p-3.5 text-left" dir="ltr">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>{plan.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        تشمل: شارة التوثيق الرسمية 🛡️، كافة قوالب VIP، إزالة العلامة المائية تماماً، والذكاء الاصطناعي.
                      </p>
                    </td>
                    <td className="p-3.5 font-medium">
                      {billingCycle === 'yearly' ? 'اشتراك سنوي (12 شهر)' : 'اشتراك شهري'}
                    </td>
                    <td className="p-3.5 font-bold font-mono">
                      {originalPrice} {plan.currency || 'ر.س'}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-600 font-mono">
                      {discountAmount > 0 ? `-${discountAmount} ر.س (${discountPercent}%)` : '0 ر.س'}
                    </td>
                    <td className="p-3.5 font-black text-slate-900 font-mono text-left text-sm" dir="ltr">
                      {finalPrice} {plan.currency || 'SAR'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TOTALS SUMMARY */}
            <div className="bg-slate-50/80 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 text-center sm:text-right">
                <span>* الأسعار شاملة ضريبة القيمة المضافة 15% (VAT Included).</span>
              </div>

              <div className="w-full sm:w-72 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono font-bold">{originalPrice} {plan.currency || 'ر.س'}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>خصم كود البرومو ({discountPercent}%):</span>
                    <span className="font-mono">-{discountAmount} {plan.currency || 'ر.س'}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span className="font-mono">{vatAmount} {plan.currency || 'ر.س'}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm sm:text-base font-black text-slate-900">
                  <span>المبلغ الإجمالي النهائي:</span>
                  <span className="font-mono text-brand-600">{finalPrice} {plan.currency || 'ر.س'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* PROMO CODE SECTION */}
          {!isPaid && (
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-3 no-print">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <Tag className="w-4 h-4 text-brand-600" />
                <span>هل تملك كود برومو للخصم؟ (Promo Code)</span>
              </div>

              <form onSubmit={handleApplyPromo} className="flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="أدخل كود الخصم (مثال: WELCOME50)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="w-full sm:flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-brand-500 uppercase"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-2xs"
                >
                  تطبيق الخصم
                </button>
              </form>

              {promoMessage && (
                <div className={`text-xs font-bold flex items-center gap-1.5 ${
                  promoMessage.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                }`}>
                  {promoMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{promoMessage.text}</span>
                </div>
              )}
            </div>
          )}

          {/* PAYMENT METHODS & CHECKOUT ACTIONS */}
          {!isPaid && (
            <div className="space-y-6 pt-2 no-print">
              <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>اختر وسيلة الدفع الآمن (دفع مشفر 256-bit SSL)</span>
              </h4>

              {/* Method Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-right transition flex items-center justify-between ${
                    paymentMethod === 'card'
                      ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-brand-600" />
                    <div>
                      <p className="font-bold text-xs text-slate-800">بطاقة بنكية</p>
                      <span className="text-[10px] text-slate-400">مدى / فيزا / ماستر</span>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <Check className="w-4 h-4 text-brand-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3.5 rounded-2xl border text-right transition flex items-center justify-between ${
                    paymentMethod === 'applepay'
                      ? 'border-slate-900 bg-slate-900 text-white ring-2 ring-slate-900/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-black text-sm">Pay</span>
                    <div>
                      <p className={`font-bold text-xs ${paymentMethod === 'applepay' ? 'text-white' : 'text-slate-800'}`}>Apple Pay</p>
                      <span className={`text-[10px] ${paymentMethod === 'applepay' ? 'text-slate-300' : 'text-slate-400'}`}>الدفع السريع بنقرة</span>
                    </div>
                  </div>
                  {paymentMethod === 'applepay' && <Check className="w-4 h-4 text-white" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('stcpay')}
                  className={`p-3.5 rounded-2xl border text-right transition flex items-center justify-between ${
                    paymentMethod === 'stcpay'
                      ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-bold text-xs text-slate-800">STC Pay</p>
                      <span className="text-[10px] text-slate-400">محفظة رقمية</span>
                    </div>
                  </div>
                  {paymentMethod === 'stcpay' && <Check className="w-4 h-4 text-purple-600" />}
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600">رقم البطاقة (Card Number)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono font-bold"
                      dir="ltr"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="space-y-1 col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-bold text-slate-600">اسم حامل البطاقة</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">تاريخ الانتهاء</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-center"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600">رمز الأمان (CVC)</label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono text-center"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div className="p-6 bg-slate-900 text-white rounded-2xl text-center space-y-3">
                  <p className="text-xs text-slate-300">سيتم الدفع عبر المحفظة المعتمدة في جهازك بنقرة واحدة</p>
                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    className="w-full py-3 bg-white text-black hover:bg-slate-100 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>الدفع بواسطة</span>
                    <span className="text-base font-bold">Pay</span>
                  </button>
                </div>
              )}

              {paymentMethod === 'stcpay' && (
                <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200 space-y-3">
                  <label className="text-xs font-bold text-purple-900">رقم الجوال المسجل في STC Pay:</label>
                  <input
                    type="text"
                    value={stcPhone}
                    onChange={(e) => setStcPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs font-mono font-bold"
                    dir="ltr"
                  />
                  <p className="text-[10px] text-purple-700">سيصلك رمز تحقق (OTP) على هاتفك لإتمام السداد الفوري.</p>
                </div>
              )}

              {/* Main Submit Button */}
              {paymentMethod !== 'applepay' && (
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-black text-sm sm:text-base shadow-xl shadow-brand-500/25 transition flex items-center justify-center gap-2.5"
                >
                  {isProcessing ? (
                    <span>جاري معالجة السداد الآمن...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-5 h-5 text-emerald-300" />
                      <span>تأكيد سداد الفاتورة ({finalPrice} {plan.currency || 'ر.س'}) وتفعيل VIP والشارة</span>
                    </>
                  )}
                </button>
              )}

              <p className="text-center text-[11px] text-slate-400">
                🔒 عملية دفع مشفرة وآمنة بنسبة 100% مع ضمان استرجاع الأموال خلال 14 يوماً.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
