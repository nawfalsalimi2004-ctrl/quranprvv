import React from 'react';
import { useCV } from '../../context/CVContext';
import { CheckCircle2, AlertCircle, Sparkles, TrendingUp, RefreshCw, Trash2, Eye } from 'lucide-react';

interface ScoreWidgetProps {
  onGoToPreview?: () => void;
}

export const ScoreWidget: React.FC<ScoreWidgetProps> = ({ onGoToPreview }) => {
  const { score, scoreSuggestions, loadDemoData, resetToBlank } = useCV();

  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getProgressColor = () => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-slate-800">مقياس قوة السيرة الذاتية (ATS)</h4>
            <span className="text-[10px] text-slate-400">تحديث فوري لمعايير الفرز الذاتي</span>
          </div>
        </div>

        <span className={`text-xl font-black ${getScoreColor()}`}>
          {score}%
        </span>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-semibold">
          <span>بحاجة لتحسين</span>
          <span>جيد جداً</span>
          <span>ممتاز وجاهز (ATS Ready)</span>
        </div>
      </div>

      {/* Suggestions Checklist */}
      {scoreSuggestions.length > 0 ? (
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            نصائح لرفع نسبة القبول:
          </p>
          <ul className="space-y-1 text-xs text-slate-600">
            {scoreSuggestions.slice(0, 3).map((sug, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px] bg-amber-50/60 p-2 rounded-lg border border-amber-100/60">
                <span className="text-amber-600 font-bold">•</span>
                <span>{sug}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">سيرتك الذاتية مكتملة وجاهزة للتقديم والفرز الآلي بنجاح!</span>
        </div>
      )}

      {/* Quick Action Tools */}
      <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
        {onGoToPreview && (
          <button
            onClick={onGoToPreview}
            className="w-full py-2 px-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>معاينة النتيجة النهائية</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={loadDemoData}
            className="flex-1 py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1"
            title="تعبئة بيانات نموذج كامل تلقائياً"
          >
            <RefreshCw className="w-3 h-3 text-brand-600" />
            <span>ملء نموذج جاهز</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('هل أنت متأكد من رغبتك في مسح كافة الحقول والبدء من جديد؟')) {
                resetToBlank();
              }
            }}
            className="py-1.5 px-2 text-rose-600 hover:bg-rose-50 border border-rose-100 rounded-lg text-[11px] font-semibold transition flex items-center justify-center gap-1"
            title="إفراغ الحقول للبدء من الصفر"
          >
            <Trash2 className="w-3 h-3" />
            <span>تفريغ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
