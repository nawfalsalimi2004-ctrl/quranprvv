import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Sparkles, FileText, Check, Wand2 } from 'lucide-react';

export const SummarySection: React.FC = () => {
  const { cvData, updatePersonalInfo } = useCV();
  const [showAIOptions, setShowAIOptions] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const jobTitle = cvData.personalInfo.jobTitle || 'المجال المهني';

  const aiSuggestions = [
    {
      title: 'صيغة تنفيذية قيادية (Executive & Results-Driven)',
      text: `مهني متميز ومتخصص في مجال ${jobTitle} بخبرة تتجاوز 5 سنوات في قيادة وتطوير المشاريع الإستراتيجية وتحقيق نمو ملموس في الأداء التشغيلي. متمكن من بناء الشراكات الناجحة وتوجيه فرق العمل متعددة التخصصات لتحقيق الأهداف التنظيمية بكفاءة عالية.`
    },
    {
      title: 'صيغة تقنية موجهة للإنجازات (Technical & Impact-Focused)',
      text: `خبير متمرس في ${jobTitle} يمتلك سجلاً حافلاً في تطبيق أفضل الممارسات والمعايير الحديثة، وحل التحديات المعقدة بكفاءة. ساهم في رفع كفاءة العمليات بنسبة 35% وخفض التكاليف التشغيلية مع الحفاظ على أعلى درجات الجودة.`
    },
    {
      title: 'صيغة شغوفة وتطويرية (Creative & Fast-Learner)',
      text: `شغوف بمجال ${jobTitle} وحريص على مواكبة أحدث الابتكارات والاتجاهات الحديثة في السوق. أتميز بالمرونة العالية وسرعة التكيف والتواصل الفعال، وأسعى لتوظيف مهاراتي وخبراتي للمساهمة في نجاح وتوسع بيئة العمل.`
    }
  ];

  const applyAISuggestion = (text: string, index: number) => {
    updatePersonalInfo({ summary: text });
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
      setShowAIOptions(false);
    }, 600);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800">النبذة والملخص المهني</h3>
            <p className="text-xs text-slate-500">مقدمة موجزة تعكس شخصيتك المهنية وأبرز نقاط قوتك</p>
          </div>
        </div>

        {/* AI Assistant Generator Button */}
        <button
          onClick={() => setShowAIOptions(!showAIOptions)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold shadow-sm transition"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>توليد نبذة ذكية (AI)</span>
        </button>
      </div>

      {/* AI Suggestions Box */}
      {showAIOptions && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 to-purple-50/70 border border-indigo-100 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              نماذج مقترحة خصيصاً لمسمى "{jobTitle}":
            </span>
            <button
              onClick={() => setShowAIOptions(false)}
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800"
            >
              إغلاق
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {aiSuggestions.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-white border border-indigo-100/80 hover:border-indigo-300 transition text-right shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-indigo-950">{item.title}</span>
                  <button
                    onClick={() => applyAISuggestion(item.text, idx)}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded flex items-center gap-1 transition"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">تم التطبيق!</span>
                      </>
                    ) : (
                      <>
                        <span>تطبيق هذه النبذة</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <textarea
          rows={4}
          value={cvData.personalInfo.summary}
          onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          placeholder="اكتب 3 إلى 5 أسطر تلخص فيها خبرتك، إنجازاتك الرئيسية، وقيمتك المضافة لأي مؤسسة تطمح للعمل بها..."
          className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 leading-relaxed transition"
        />
        <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
          <span>عدد الحروف: {cvData.personalInfo.summary.length}</span>
          <span>يوصى بـ 150 إلى 400 حرف لتحقيق أعلى فاعلية</span>
        </div>
      </div>
    </div>
  );
};
