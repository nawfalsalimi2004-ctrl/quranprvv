import React from 'react';
import { useCV } from '../../context/CVContext';
import { Code, Globe2, Award, Plus, Trash2, ExternalLink } from 'lucide-react';
import { Language } from '../../types/cv';

export const ProjectsLanguagesSection: React.FC = () => {
  const { 
    cvData, 
    addProject, 
    updateProject, 
    removeProject,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addCertificate,
    updateCertificate,
    removeCertificate 
  } = useCV();

  return (
    <div className="space-y-6">
      
      {/* PROJECTS SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800">المشاريع البارزة ونماذج الأعمال</h3>
              <p className="text-xs text-slate-500">أبرز مبادراتك أو مشاريعك البرمجية والعملية</p>
            </div>
          </div>

          <button
            onClick={addProject}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-bold transition"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة مشروع</span>
          </button>
        </div>

        <div className="space-y-3">
          {cvData.projects.map((proj, idx) => (
            <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">مشروع #{idx + 1}</span>
                <button
                  onClick={() => removeProject(proj.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">عنوان المشروع</label>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                    placeholder="مثال: تطبيق توصيل الطلبات السريع"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رابط المشروع (إن وجد)</label>
                  <input
                    type="url"
                    value={proj.link}
                    onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                    placeholder="https://example.com/project"
                    dir="ltr"
                    className="w-full px-3 py-1.5 text-xs text-right rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التقنيات والأدوات المستخدمة</label>
                <input
                  type="text"
                  value={proj.technologies}
                  onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                  placeholder="مثال: React, Tailwind CSS, PostgreSQL"
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">وصف موجز للمشروع والأثر المحقق</label>
                <textarea
                  rows={2}
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                  placeholder="وصف المشكلة التي يحلها المشروع ودورك فيه..."
                  className="w-full p-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LANGUAGES & CERTIFICATES (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LANGUAGES */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-brand-600" />
              <h3 className="font-bold text-sm text-slate-800">اللغات</h3>
            </div>
            <button
              onClick={() => addLanguage()}
              className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة لغة</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {cvData.languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                  placeholder="اسم اللغة"
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />

                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value as any })}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none"
                >
                  <option value="طلاقة (اللغة الأم)">اللغة الأم</option>
                  <option value="جيد جداً">جيد جداً</option>
                  <option value="متوسط">متوسط</option>
                  <option value="مبتدئ">مبتدئ</option>
                </select>

                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CERTIFICATES */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-800">الشهادات المهنية والدورات</h3>
            </div>
            <button
              onClick={addCertificate}
              className="text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة شهادة</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {cvData.certificates.map((cert) => (
              <div key={cert.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertificate(cert.id, { name: e.target.value })}
                    placeholder="اسم الشهادة (مثال: PMP, AWS Cloud)"
                    className="font-bold text-xs bg-transparent border-none p-0 focus:outline-none w-full text-slate-800"
                  />
                  <button
                    onClick={() => removeCertificate(cert.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateCertificate(cert.id, { issuer: e.target.value })}
                    placeholder="الجهة المانحة (AWS, PMI)"
                    className="px-2 py-1 text-[11px] rounded border border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateCertificate(cert.id, { date: e.target.value })}
                    placeholder="سنة الإصدار (2023)"
                    className="px-2 py-1 text-[11px] rounded border border-slate-200 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
