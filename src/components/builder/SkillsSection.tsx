import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { Award, Plus, Trash2, Sliders, Sparkles } from 'lucide-react';
import { Skill } from '../../types/cv';

export const SkillsSection: React.FC = () => {
  const { cvData, addSkill, updateSkill, removeSkill } = useCV();
  const [newSkillText, setNewSkillText] = useState('');

  const quickCategories = [
    {
      category: 'تقنية وبرمجة',
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker', 'SQL', 'Git', 'Next.js', 'Tailwind CSS']
    },
    {
      category: 'إدارة وأعمال',
      skills: ['إدارة المشاريع Agile', 'حل المشكلات', 'التفكير الاستراتيجي', 'قيادة الفرق', 'إدارة الوقت', 'التفاوض']
    },
    {
      category: 'تصميم وتسويق',
      skills: ['Figma UI/UX', 'Photoshop', 'SEO تحسين محركات البحث', 'كتابة المحتوى', 'إدارة الحملات الإعلانية']
    }
  ];

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillText.trim()) {
      addSkill(newSkillText.trim(), 'متقدم');
      setNewSkillText('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800">المهارات والقدرات الفنية</h3>
            <p className="text-xs text-slate-500">حدد مهاراتك الأساسية ومستوى إتقانك لكل مهارة</p>
          </div>
        </div>
      </div>

      {/* Add Custom Skill Form */}
      <form onSubmit={handleAddCustom} className="flex gap-2">
        <input
          type="text"
          value={newSkillText}
          onChange={(e) => setNewSkillText(e.target.value)}
          placeholder="أدخل مهارة جديدة (مثلاً: React, إدارة المخاطر)..."
          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة</span>
        </button>
      </form>

      {/* Quick Suggestions Chips */}
      <div className="space-y-2 pt-1">
        <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          اقتراحات سريعة بنقرة واحدة:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {quickCategories.flatMap(c => c.skills).map((skillName) => {
            const alreadyExists = cvData.skills.some(s => s.name.toLowerCase() === skillName.toLowerCase());
            return (
              <button
                key={skillName}
                type="button"
                disabled={alreadyExists}
                onClick={() => addSkill(skillName, 'متقدم')}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition ${
                  alreadyExists
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-slate-50 hover:bg-brand-50 hover:border-brand-200 text-slate-700 hover:text-brand-600 border-slate-200'
                }`}
              >
                + {skillName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Existing Skills List */}
      <div className="space-y-3 pt-2">
        {cvData.skills.map((skill) => (
          <div
            key={skill.id}
            className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="flex-1 w-full sm:w-auto">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                className="font-bold text-xs bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 w-full"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Level Selector */}
              <select
                value={skill.level}
                onChange={(e) => {
                  const lvl = e.target.value as Skill['level'];
                  const pct = lvl === 'خبير' ? 95 : lvl === 'متقدم' ? 80 : lvl === 'متوسط' ? 60 : 40;
                  updateSkill(skill.id, { level: lvl, percentage: pct });
                }}
                className="text-xs bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none"
              >
                <option value="مبتدئ">مبتدئ (40%)</option>
                <option value="متوسط">متوسط (60%)</option>
                <option value="متقدم">متقدم (80%)</option>
                <option value="خبير">خبير (95%)</option>
              </select>

              {/* Slider */}
              <input
                type="range"
                min="10"
                max="100"
                value={skill.percentage}
                onChange={(e) => updateSkill(skill.id, { percentage: Number(e.target.value) })}
                className="w-20 accent-brand-600 cursor-pointer hidden sm:block"
                title={`${skill.percentage}%`}
              />

              <span className="text-[11px] font-mono font-bold text-slate-500 w-8 text-center hidden sm:inline-block">
                {skill.percentage}%
              </span>

              <button
                type="button"
                onClick={() => removeSkill(skill.id)}
                className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                title="حذف"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
