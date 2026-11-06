import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Palette, 
  Download, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Star, 
  Layout, 
  Users, 
  Award,
  Zap, 
  Check,
  BookOpen,
  Crown,
  BadgeCheck,
  Code2
} from 'lucide-react';
import { TEMPLATES } from '../../data/templates';
import { useCV } from '../../context/CVContext';
import { TemplateId } from '../../types/cv';

interface HomePageProps {
  onStartBuilder: () => void;
  onExploreTemplates: () => void;
  onOpenAuth: () => void;
  onGoToArticles?: () => void;
  onGoToPricing?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onStartBuilder, 
  onExploreTemplates, 
  onOpenAuth,
  onGoToArticles,
  onGoToPricing 
}) => {
  const { updateStyle } = useCV();

  const handleSelectTemplateAndBuild = (id: TemplateId) => {
    updateStyle({ templateId: id });
    onStartBuilder();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 Cols in RTL: Right side) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 text-brand-600" />
                <span>الجيل الجديد من منشئ السير الذاتية بالذكاء الاصطناعي</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.2]">
                اصنع سيرتك الذاتية <span className="text-brand-600 underline decoration-brand-300 decoration-wavy decoration-2">الاحترافية</span> في دقائق معدودة
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                قوالب عصرية متوافقة مع أنظمة الفرز الذاتي <strong>(ATS)</strong> ومصممة بأيدي خبراء الموارد البشرية لمساعدتك في لفت انتباه كبرى الشركات والحصول على الوظيفة التي تستحقها.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={onStartBuilder}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-xl shadow-brand-500/25 transition flex items-center justify-center gap-2.5 group"
                >
                  <span>ابدأ بإنشاء سيرتك مجاناً</span>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onExploreTemplates}
                  className="w-full sm:w-auto px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl font-bold text-sm sm:text-base transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Palette className="w-5 h-5 text-brand-600" />
                  <span>تصفح القوالب والمظهر</span>
                </button>
              </div>

              {/* Key Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 pt-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>تصدير PDF عالي الدقة للطباعة</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>بدون علامة مائية إجبارية</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>دعم كامل للغة العربية والإنجليزية</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Mockup (5 Cols) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-4 shadow-2xl border border-slate-200/80 transition transform hover:-translate-y-1">
                
                {/* Floating pill badge */}
                <div className="absolute -top-3.5 -right-3.5 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl shadow-lg flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>توافق 100% مع ATS</span>
                </div>

                {/* Simulated CV document in hero */}
                <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-200/70">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Avatar"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-brand-500"
                    />
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">أحمد محمود الزهراني</h4>
                      <p className="text-[11px] text-brand-600 font-bold">مهندس برمجيات أول ومطور ويب</p>
                      <p className="text-[9px] text-slate-400">الرياض، المملكة العربية السعودية</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="h-2 w-16 bg-brand-600 rounded"></div>
                    <div className="h-1.5 w-full bg-slate-200 rounded"></div>
                    <div className="h-1.5 w-4/5 bg-slate-200 rounded"></div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                      <span>الخبرة العملية</span>
                      <span className="text-slate-400">2021 - الآن</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-slate-200/60 text-[10px] text-slate-600 space-y-1">
                      <p className="font-bold text-slate-800">شركة حلول التقنية المتقدمة</p>
                      <p className="text-[9px]">قيادة وتطوير البوابات الرقمية لخدمة 200k عميل...</p>
                    </div>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[9px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">React.js</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">TypeScript</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">Tailwind CSS</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-bold">Node.js</span>
                  </div>

                  {/* Direct button */}
                  <button
                    onClick={onStartBuilder}
                    className="w-full mt-2 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>تعديل هذا النموذج فوراً</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
              أدوات مصممة لنجاحك الوظيفي
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              كل ما تحتاجه لبناء سيرة ذاتية لا تُقاوم
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              تخلص من عناء التنسيق اليدوي مع Microsoft Word ومشاكل تداخل النصوص.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 hover:shadow-lg transition space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">مساعد الصياغة بالذكاء الاصطناعي</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                توليد فوري للنبذة المهنية والمهام الوظيفية بأسلوب تسويقي رصين يناسب مسماك الوظيفي وخبرتك.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">فحص قوة السيرة لمعايير ATS</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                مقياس فوري يحلل اكتمال بياناتك، الكلمات المفتاحية، والتنسيق لضمان اجتياز مرشحات الموارد البشرية.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:shadow-lg transition space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">استوديو مخصص للمظهر والتخصيص</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                حرية تامة في اختيار الخطوط العربية الأصيلة، الألوان، إطار الصورة، وتباعد الأقسام بدقة متناهية.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* TEMPLATES SHOWCASE SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-3 py-1 rounded-full">
                مكتبة النماذج الاحترافية
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                اختر القالب الأنسب لطبيعة وظيفتك
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                جميع القوالب جاهزة للتحرير الفوري ومتوافقة بنسبة 100% مع الطابعات ومعايير المستندات الدولية.
              </p>
            </div>

            <button
              onClick={onExploreTemplates}
              className="flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-800"
            >
              <span>عرض استوديو التخصيص الكامل</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {tmpl.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{tmpl.name}</h4>
                  <p className="text-[11px] text-slate-500 mb-3 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <button
                  onClick={() => handleSelectTemplateAndBuild(tmpl.id)}
                  className="w-full py-2 bg-slate-900 hover:bg-brand-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                >
                  <span>استخدام هذا القالب</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              كيف تبدأ في 3 خطوات بسيطة؟
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              رحلة سريعة وممتعة من الصفر وحتى جاهزية سيرتك الذاتية للتقديم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 font-black text-xl flex items-center justify-center mx-auto shadow-sm">
                1
              </div>
              <h3 className="font-bold text-base text-slate-900">أدخل خبراتك ومهاراتك</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                استخدم الحقول المبسطة أو استعن بمساعد الذكاء الاصطناعي لاقتراح نصوص جاهزة.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-black text-xl flex items-center justify-center mx-auto shadow-sm">
                2
              </div>
              <h3 className="font-bold text-base text-slate-900">اختر القالب والمظهر</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                بدّل بين 5 قوالب فخمة، وخصص درجات الألوان ونوع الخط العربي حسب ذوقك المهني.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-xl flex items-center justify-center mx-auto shadow-sm">
                3
              </div>
              <h3 className="font-bold text-base text-slate-900">تصدير PDF بنقرة واحدة</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                احصل على ملف PDF عالي الجودة متوافق مع مقاس A4 القياسي وجاهز للإرسال الفوري.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ARTICLES & VIP SECTION */}
      <section className="py-20 bg-slate-100/70 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Articles Highlight Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>المقالات ومكتبة الـ API</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    REST API Ready
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-snug">
                  نصائح مهنية معتمدة من مسؤولي التوظيف والـ HR
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  تعلم أسرار تجاوز أنظمة ATS، وصياغة الإنجازات بالأرقام، والاستعداد للمقابلات الشخصية، مع إمكانية مشاركة واستدعاء أي مقال عبر الـ API للتطبيقات والمواقع.
                </p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    <span>مشاركة مقالات عبر مفاتيح API للمواقع والتطبيقات</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    يمكن للمطورين استدعاء المقالات برمجياً بصيغة JSON عبر cURL أو JavaScript مباشرة.
                  </p>
                </div>
              </div>

              {onGoToArticles && (
                <button
                  onClick={onGoToArticles}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>تصفح المقالات والنصائح</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* VIP Plans & Verified Badge Card */}
            <div className="bg-gradient-to-br from-amber-500/10 via-brand-50 to-white rounded-3xl p-8 border border-amber-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                    <span>عضوية VIP وشارة التوثيق</span>
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full font-bold">
                    <BadgeCheck className="w-3 h-3 text-blue-600 fill-blue-600" />
                    شارة التوثيق الزرقاء
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 leading-snug">
                  تميز عن المنافسين مع باقات VIP الحصرية
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  احصل على كافة القوالب الفاخرة، بدون علامة مائية نهائياً، مع شارة التوثيق الزرقاء الرسمية في حسابك وسيرتك لتعزيز ثقة مديري التوظيف.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-slate-700">قوالب VIP الفاخرة</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="font-semibold text-slate-700">إزالة العلامة المائية</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-600 shrink-0" />
                    <span className="font-semibold text-slate-700">شارة التوثيق الرسمية</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="font-semibold text-slate-700">أكواد تفعيل وبرومو</span>
                  </div>
                </div>
              </div>

              {onGoToPricing && (
                <button
                  onClick={onGoToPricing}
                  className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/20 transition flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>استكشف باقات VIP والأسعار</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-gradient-to-tr from-brand-900 to-indigo-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            جاهز لترك انطباع أول استثنائي لدى أصحاب العمل؟
          </h2>
          <p className="text-slate-200 text-sm max-w-xl mx-auto leading-relaxed">
            انضم إلى آلاف المحترفين الذين وثقوا بـ سيرتي برو لبناء مستقبلهم الوظيفي بنجاح.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartBuilder}
              className="px-8 py-3.5 bg-white text-brand-900 hover:bg-slate-100 rounded-xl font-bold text-sm shadow-lg transition"
            >
              ابدأ الآن مجاناً بدون تعقيد
            </button>
            <button
              onClick={onOpenAuth}
              className="px-6 py-3.5 bg-brand-700/60 hover:bg-brand-700 border border-brand-400/40 text-white rounded-xl font-bold text-sm transition"
            >
              تسجيل حساب / تسجيل الدخول
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
