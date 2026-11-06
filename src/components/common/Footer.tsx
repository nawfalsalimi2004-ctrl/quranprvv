import React from 'react';
import { FileText, Heart, Shield, Sparkles, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <span>سيرتي<span className="text-brand-400">برو</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              المنصة العربية الأولى المتخصصة في بناء وتصميم السير الذاتية الاحترافية المتوافقة مع معايير أنظمة التوظيف الدولية (ATS).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-400" />
              الميزات والأدوات
            </h4>
            <ul className="space-y-2 text-xs">
              <li>قوالب معتمدة لـ ATS</li>
              <li>محرر السيرة الذاتية التفاعلي</li>
              <li>مساعد الصياغة بالذكاء الاصطناعي</li>
              <li>فحص قوة السيرة الذاتية مجاناً</li>
            </ul>
          </div>

          {/* Security & Quality */}
          <div>
            <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              الخصوصية والضمان
            </h4>
            <ul className="space-y-2 text-xs">
              <li>تشفير تام وحفظ محلي آمن للبيانات</li>
              <li>تصدير بدقة طباعة 300 DPI عالية الجودة</li>
              <li>لا نقوم بمشاركة أي بيانات مع أطراف خارجية</li>
              <li>تحديث مستمر للقوالب العصرية</li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white text-sm font-bold mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              ضمان القبول الوظيفي
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              تم تصميم كافة القوالب بإشراف نخبة من مسؤولي الموارد البشرية لضمان مرور سيرتك بنجاح عبر برمجيات الفرز الآلي.
            </p>
            <div className="text-[11px] bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 text-slate-300">
              ⚡ جاهز للتصدير الفوري بنقرة واحدة
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} سيرتي برو - جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <span>صُنع بشغف لدعم الكفاءات والمواهب</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-1 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
