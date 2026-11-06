import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { PersonalInfoSection } from './PersonalInfoSection';
import { SummarySection } from './SummarySection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsLanguagesSection } from './ProjectsLanguagesSection';
import { ScoreWidget } from './ScoreWidget';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code, 
  Eye, 
  Upload, 
  Download, 
  Sparkles,
  Layers,
  Palette
} from 'lucide-react';

interface CVBuilderProps {
  onGoToPreview: () => void;
  onGoToAppearance: () => void;
}

export const CVBuilder: React.FC<CVBuilderProps> = ({ onGoToPreview, onGoToAppearance }) => {
  const { exportAsJSON, importFromJSON } = useCV();
  const [activeSection, setActiveSection] = useState<string>('all');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = importFromJSON(text);
          if (success) {
            alert('تم استيراد بيانات السيرة الذاتية بنجاح!');
          } else {
            alert('الملف غير صالح أو لا يحتوي على بنية سيرة ذاتية صحيحة.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const sectionsNav = [
    { id: 'all', label: 'كافة الأقسام معاً', icon: Layers },
    { id: 'personal', label: 'المعلومات الشخصية', icon: User },
    { id: 'summary', label: 'النبذة المهنية (AI)', icon: FileText },
    { id: 'experience', label: 'الخبرات المهنية', icon: Briefcase },
    { id: 'education', label: 'التعليم والمؤهلات', icon: GraduationCap },
    { id: 'skills', label: 'المهارات والقدرات', icon: Award },
    { id: 'projects', label: 'المشاريع واللغات', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-600 font-bold text-xs mb-1">
              <Sparkles className="w-4 h-4" />
              <span>أدوات تحرير السيرة الذاتية الذكية</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              محرر السيرة الذاتية والأدوات الاحترافية
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              قم بتعبئة بياناتك خطوة بخطوة مع مساعدة الذكاء الاصطناعي وفحص جودة السيرة اللحظي.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onGoToAppearance}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition shadow-2xs"
            >
              <Palette className="w-4 h-4 text-brand-600" />
              <span>تغيير المظهر والقالب</span>
            </button>

            {/* Import JSON */}
            <label className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>استيراد JSON</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Preview & Print */}
            <button
              onClick={onGoToPreview}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow-md shadow-brand-500/20 transition"
            >
              <Eye className="w-4 h-4" />
              <span>المعاينة والطباعة</span>
            </button>
          </div>
        </div>

        {/* Section Filter Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pb-2 mb-6 scrollbar-none">
          {sectionsNav.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Builder Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {(activeSection === 'all' || activeSection === 'personal') && <PersonalInfoSection />}
            {(activeSection === 'all' || activeSection === 'summary') && <SummarySection />}
            {(activeSection === 'all' || activeSection === 'experience') && <ExperienceSection />}
            {(activeSection === 'all' || activeSection === 'education') && <EducationSection />}
            {(activeSection === 'all' || activeSection === 'skills') && <SkillsSection />}
            {(activeSection === 'all' || activeSection === 'projects') && <ProjectsLanguagesSection />}
          </div>

          {/* Sidebar Area (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <ScoreWidget onGoToPreview={onGoToPreview} />

            {/* Quick Tips Box */}
            <div className="bg-brand-50/60 p-5 rounded-2xl border border-brand-100 text-xs text-brand-900 space-y-2.5">
              <h4 className="font-bold flex items-center gap-1.5 text-brand-950">
                <Sparkles className="w-4 h-4 text-brand-600" />
                أسرار اجتياز أنظمة الفرز (ATS):
              </h4>
              <ul className="space-y-1.5 text-[11px] text-brand-800 leading-relaxed list-disc list-inside">
                <li>استخدم مسميات وظيفية قياسية ومعروفة عالمياً.</li>
                <li>ركز على النتائج والأرقام (مثال: حقق نمواً بنسبة 30%).</li>
                <li>تأكد من كتابة الكلمات المفتاحية المذكورة في الإعلان الوظيفي.</li>
                <li>لا تستخدم جداول معقدة أو نصوص داخل صور مغلقة.</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
