import React from 'react';
import { useCV } from '../../context/CVContext';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building, Sparkles } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { cvData, addExperience, updateExperience, removeExperience } = useCV();

  const sampleBulletPoints = [
    '• قيادة فرق العمل وتنسيق المهام لتحقيق أهداف المشروع بنجاح قبل الموعد النهائي بنسبة 15%.',
    '• تطبيق حلول رقمية مبتكرة ساهمت في خفض التكاليف التشغيلية بنسبة 20%.',
    '• إدارة وتطوير العلاقات مع العملاء والشركاء التجاريين لزيادة معدل الرضا إلى 95%.',
    '• تنظيم وتوثيق إجراءات العمل وفق أحدث المعايير القياسية للشركة.',
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800">الخبرات المهنية وسجل العمل</h3>
            <p className="text-xs text-slate-500">أضف وظائفك السابقة بدءاً من الأحدث إلى الأقدم</p>
          </div>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة خبرة جديدة</span>
        </button>
      </div>

      {cvData.experiences.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-semibold mb-3">لم تقم بإضافة أي خبرة مهنية بعد</p>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
          >
            + إضافة أول خبرة مهنية
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cvData.experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  الخبرة #{index + 1}
                </span>

                <button
                  onClick={() => removeExperience(exp.id)}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
                  title="حذف هذه الخبرة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المسمى الوظيفي</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                    placeholder="مثال: مدير مشروعات أول"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الشركة أو جهة العمل</label>
                  <div className="relative">
                    <Building className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                      placeholder="اسم المؤسسة أو الشركة"
                      className="w-full pr-8 pl-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">موقع العمل (المدينة/الدولة)</label>
                  <div className="relative">
                    <MapPin className="absolute right-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      placeholder="مثال: الرياض، السعودية (أو عن بعد)"
                      className="w-full pr-8 pl-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ البدء</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                      placeholder="2021-01"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'حتى الآن' : exp.endDate}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                      placeholder="2023-12"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`curr-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => updateExperience(exp.id, { current: e.target.checked, endDate: '' })}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4"
                />
                <label htmlFor={`curr-${exp.id}`} className="text-xs font-semibold text-slate-700 cursor-pointer">
                  أعمل هنا حالياً
                </label>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">المهام والإنجازات (تنسيق نقطي)</label>
                  <span className="text-[11px] text-slate-400">ابدأ كل سطر بـ • لتنظيم النقاط</span>
                </div>
                <textarea
                  rows={3}
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                  placeholder="• اذكر مسؤولياتك الأساسية..."
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed font-sans"
                />

                {/* Quick point addition */}
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-slate-400 font-medium">اقتراحات سريعة:</span>
                  {sampleBulletPoints.map((pt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        const newDesc = exp.description ? `${exp.description}\n${pt}` : pt;
                        updateExperience(exp.id, { description: newDesc });
                      }}
                      className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded transition"
                    >
                      + {pt.substring(2, 28)}...
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
