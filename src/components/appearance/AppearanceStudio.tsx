import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { useAuth } from '../../context/AuthContext';
import { TEMPLATES, COLOR_PALETTES, FONTS } from '../../data/templates';
import { TemplateId, FontFamily } from '../../types/cv';
import { 
  Palette, 
  Type, 
  Layout, 
  UserCircle, 
  Check, 
  Eye, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  RotateCcw,
  Maximize2,
  Crown,
  Lock,
  Stamp,
  BadgeCheck,
  X
} from 'lucide-react';
import { ModernTemplate } from '../preview/templates/ModernTemplate';
import { ExecutiveTemplate } from '../preview/templates/ExecutiveTemplate';
import { ClassicTemplate } from '../preview/templates/ClassicTemplate';
import { CreativeTemplate } from '../preview/templates/CreativeTemplate';
import { MinimalTemplate } from '../preview/templates/MinimalTemplate';

interface AppearanceStudioProps {
  onGoToPreview: () => void;
  onGoToPricing?: () => void;
}

export const AppearanceStudio: React.FC<AppearanceStudioProps> = ({ onGoToPreview, onGoToPricing }) => {
  const { cvData, updateStyle } = useCV();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'templates' | 'colors' | 'fonts' | 'layout'>('templates');
  const [vipModalOpen, setVipModalOpen] = useState(false);

  const isUserVip = Boolean(user?.isVip || user?.role === 'admin');

  const handleToggleWatermark = () => {
    // If currently ON, user is attempting to turn it OFF
    if (cvData.style.showWatermark !== false) {
      if (!isUserVip) {
        setVipModalOpen(true);
        return;
      }
      updateStyle({ showWatermark: false });
    } else {
      updateStyle({ showWatermark: true });
    }
  };

  const renderActivePreview = () => {
    switch (cvData.style.templateId) {
      case 'executive':
        return <ExecutiveTemplate data={cvData} />;
      case 'classic':
        return <ClassicTemplate data={cvData} />;
      case 'creative':
        return <CreativeTemplate data={cvData} />;
      case 'minimal':
        return <MinimalTemplate data={cvData} />;
      case 'modern':
      default:
        return <ModernTemplate data={cvData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs mb-1">
              <Palette className="w-4 h-4" />
              <span>استوديو التخصيص والمظهر</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              تخصيص مظهر وتصميم السيرة الذاتية
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              اختر القالب الأنسب لمجالك الوظيفي، وخصص الألوان ونوع الخط والهوامش بما يعكس هويتك المهنية.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToPreview}
              className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold shadow-md shadow-brand-500/20 transition"
            >
              <Eye className="w-4 h-4" />
              <span>معاينة بالحجم الكامل والطباعة</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace: Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Control Tabs */}
            <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveTab('templates')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  activeTab === 'templates'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Layout className="w-4 h-4" />
                <span>القوالب المتاحة ({TEMPLATES.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('colors')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  activeTab === 'colors'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>لوحات الألوان</span>
              </button>

              <button
                onClick={() => setActiveTab('fonts')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  activeTab === 'fonts'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>الخطوط والطباعة</span>
              </button>

              <button
                onClick={() => setActiveTab('layout')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                  activeTab === 'layout'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>الإطار والخيارات</span>
              </button>
            </div>

            {/* TAB 1: TEMPLATES */}
            {activeTab === 'templates' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">اختر القالب المناسب لتخصصك:</h3>
                  <span className="text-xs text-slate-500">تم فحص التوافق مع أنظمة الفرز الذاتي ATS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {TEMPLATES.map((tmpl) => {
                    const isSelected = cvData.style.templateId === tmpl.id;
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => updateStyle({ templateId: tmpl.id })}
                        className={`group relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-brand-600 bg-white shadow-md ring-2 ring-brand-500/10'
                            : 'border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Badge */}
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {tmpl.badge}
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Title & Desc */}
                        <h4 className="font-bold text-sm text-slate-900 mb-1">{tmpl.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                          {tmpl.description}
                        </p>

                        {/* Recommendation */}
                        <div className="text-[11px] text-brand-600 font-semibold bg-brand-50/70 p-2 rounded-lg">
                          💡 الأنسب لـ: {tmpl.recommendedRole}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: COLORS */}
            {activeTab === 'colors' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-slate-800 mb-1">لوحات الألوان الموصى بها</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    اختر لوناً متناسقاً يضفي وقاراً وجاذبية على سيرتك الذاتية عند الطباعة.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {COLOR_PALETTES.map((palette) => {
                      const isSelected = cvData.style.primaryColor === palette.primary;
                      return (
                        <button
                          key={palette.name}
                          onClick={() => updateStyle({ primaryColor: palette.primary, secondaryColor: palette.secondary })}
                          className={`flex items-center justify-between p-3 rounded-xl border text-right transition ${
                            isSelected
                              ? 'border-brand-600 bg-brand-50/40 ring-1 ring-brand-500'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-7 h-7 rounded-lg shadow-sm border border-black/10 flex items-center justify-center text-white"
                              style={{ backgroundColor: palette.primary }}
                            >
                              {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-bold text-slate-800">{palette.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400" dir="ltr">{palette.primary}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Color input */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">أو اختر لوناً مخصصاً (Hex):</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={cvData.style.primaryColor}
                      onChange={(e) => updateStyle({ primaryColor: e.target.value })}
                      className="w-9 h-9 rounded-lg cursor-pointer border border-slate-300"
                    />
                    <span className="text-xs font-mono font-semibold text-slate-600 uppercase" dir="ltr">
                      {cvData.style.primaryColor}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FONTS */}
            {activeTab === 'fonts' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="font-bold text-sm text-slate-800 mb-1">عائلة الخط المعتمدة</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    جميع الخطوط مدمجة بدقة وتدعم كافة الحروف والتشكيلات العربية بوضوح تام.
                  </p>

                  <div className="space-y-3">
                    {FONTS.map((font) => {
                      const isSelected = cvData.style.fontFamily === font.family;
                      return (
                        <div
                          key={font.family}
                          onClick={() => updateStyle({ fontFamily: font.family })}
                          className={`p-4 rounded-xl border cursor-pointer transition ${
                            isSelected
                              ? 'border-brand-600 bg-brand-50/30 ring-1 ring-brand-500'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                          style={{ fontFamily: font.family }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-slate-900">{font.name}</span>
                            {isSelected && <Check className="w-4 h-4 text-brand-600 stroke-[3]" />}
                          </div>
                          <p className="text-xs text-slate-600">{font.preview}</p>
                          <div className="mt-2 text-xs font-semibold text-slate-500 tracking-wide">
                            أبجد هوز حطي كلمن - نموذج تجريبي للنص بالخط المختار
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Font Size & Spacing */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">حجم الخط العام</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['sm', 'base', 'lg'] as const).map((sz) => (
                        <button
                          key={sz}
                          onClick={() => updateStyle({ fontSize: sz })}
                          className={`py-1.5 text-xs font-bold rounded-lg border ${
                            cvData.style.fontSize === sz
                              ? 'bg-brand-600 text-white border-brand-600'
                              : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {sz === 'sm' ? 'مدمج' : sz === 'base' ? 'قياسي' : 'كبير'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">التباعد بين الأسطر</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['compact', 'normal', 'relaxed'] as const).map((sp) => (
                        <button
                          key={sp}
                          onClick={() => updateStyle({ spacing: sp })}
                          className={`py-1.5 text-xs font-bold rounded-lg border ${
                            cvData.style.spacing === sp
                              ? 'bg-brand-600 text-white border-brand-600'
                              : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {sp === 'compact' ? 'متقارب' : sp === 'normal' ? 'متوازن' : 'متسع'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: LAYOUT & AVATAR */}
            {activeTab === 'layout' && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                {/* Avatar Shape */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-3">شكل إطار الصورة الشخصية</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: 'circle', label: 'دائري', class: 'rounded-full' },
                      { id: 'rounded', label: 'زوايا ناعمة', class: 'rounded-xl' },
                      { id: 'square', label: 'مربع حاد', class: 'rounded-none' },
                      { id: 'none', label: 'إخفاء الصورة', class: 'opacity-40' },
                    ].map((shape) => {
                      const isSelected = cvData.style.avatarShape === shape.id;
                      return (
                        <button
                          key={shape.id}
                          onClick={() => updateStyle({ avatarShape: shape.id as any })}
                          className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-2 ${
                            isSelected
                              ? 'border-brand-600 bg-brand-50 text-brand-700 font-bold'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-9 h-9 bg-slate-200 border-2 border-slate-300 ${shape.class}`} />
                          <span className="text-[11px]">{shape.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direction (RTL / LTR) */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 mb-3">اتجاه القراءة واللغة الرئيسية</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateStyle({ direction: 'rtl' })}
                      className={`p-3 rounded-xl border text-center transition ${
                        cvData.style.direction === 'rtl'
                          ? 'border-brand-600 bg-brand-50 text-brand-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm block">🇸🇦 العربية (من اليمين لليسار RTL)</span>
                      <span className="text-[10px] text-slate-500">الأنسب للشركات والوظائف في الدول العربية</span>
                    </button>

                    <button
                      onClick={() => updateStyle({ direction: 'ltr' })}
                      className={`p-3 rounded-xl border text-center transition ${
                        cvData.style.direction === 'ltr'
                          ? 'border-brand-600 bg-brand-50 text-brand-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-sm block">🇬🇧 English (Left to Right LTR)</span>
                      <span className="text-[10px] text-slate-500">للوظائف الدولية والشركات متعددة الجنسيات</span>
                    </button>
                  </div>
                </div>

                {/* Watermark Settings */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-slate-800">العلامة المائية عند الطباعة</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isUserVip ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <Crown className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>إزالتها حصرية لـ VIP</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {isUserVip 
                          ? 'بصفتك مشترك VIP، يمكنك إزالة العلامة المائية تماماً أو تفعيلها.' 
                          : 'الحساب الحالي مجاني؛ العلامة المائية مفعلة لحفظ الحقوق وتتطلب VIP لإزالتها.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleToggleWatermark}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs ${
                        cvData.style.showWatermark !== false
                          ? 'bg-brand-600 text-white'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {cvData.style.showWatermark !== false ? (
                        <>
                          <span>العلامة مفعلة</span>
                          {!isUserVip && <Lock className="w-3 h-3 text-white/80" />}
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>معطلة (VIP ✓)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {cvData.style.showWatermark !== false && (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">نص العلامة المائية المطبوعة:</label>
                      <input
                        type="text"
                        value={cvData.style.watermarkText || 'سيرتي برو • CVPro'}
                        onChange={(e) => updateStyle({ watermarkText: e.target.value })}
                        placeholder="سيرتي برو • CVPro"
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Live Mini Preview Column (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800">معاينة حية فورية</span>
                </div>
                <button
                  onClick={onGoToPreview}
                  className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>فتح العرض الكامل</span>
                </button>
              </div>

              {/* Scaled preview frame */}
              <div className="bg-slate-100/80 rounded-xl p-2 overflow-hidden flex justify-center border border-slate-200/80">
                <div
                  style={{
                    transform: 'scale(0.48)',
                    transformOrigin: 'top center',
                    width: '210mm',
                    height: '520px',
                    overflow: 'hidden',
                  }}
                  className="shadow-md rounded-lg pointer-events-none"
                >
                  {renderActivePreview()}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>القالب: <strong className="text-slate-800">{cvData.style.templateId}</strong></span>
                <span>الخط: <strong className="text-slate-800">{cvData.style.fontFamily}</strong></span>
                <span className="flex items-center gap-1">
                  اللون:
                  <span
                    className="w-3 h-3 rounded-full inline-block border border-black/10"
                    style={{ backgroundColor: cvData.style.primaryColor }}
                  />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* VIP WATERMARK NOTICE MODAL */}
      {vipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-900 flex items-center justify-center mx-auto shadow-md">
              <Crown className="w-8 h-8 fill-slate-900" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900">إزالة العلامة المائية ميزة VIP حصرية!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                حسابك الحالي غير مشترك في باقة VIP؛ لذلك تظل العلامة المائية مفعلة لحفظ حقوق المنصة. قم بالترقية الآن لتصدير سيرتك بدون أي علامة مائية والحصول على شارة التوثيق الرسمية 🛡️.
              </p>
            </div>

            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-right space-y-1.5 text-xs text-amber-950 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>تصدير PDF نظيف 100% بدون علامة مائية</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-blue-600 fill-blue-600 text-white" />
                <span>شارة التوثيق الزرقاء في حسابك وسيرتك</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>وصول كامل لكافة قوالب VIP الفاخرة</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              {onGoToPricing && (
                <button
                  type="button"
                  onClick={() => {
                    setVipModalOpen(false);
                    onGoToPricing();
                  }}
                  className="w-full sm:flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-black shadow-md shadow-brand-500/20 transition flex items-center justify-center gap-2"
                >
                  <Crown className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>ترقية إلى VIP والاشتراك الآن</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setVipModalOpen(false)}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
