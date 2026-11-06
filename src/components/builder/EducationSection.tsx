import React from 'react';
import { useCV } from '../../context/CVContext';
import { GraduationCap, Plus, Trash2, Calendar, Award } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { cvData, addEducation, updateEducation, removeEducation } = useCV();

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800">التعليم والمؤهلات الأكاديمية</h3>
            <p className="text-xs text-slate-500">الشهادات الجامعية، الدبلومات، أو الدراسات العليا</p>
          </div>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة مؤهل دراسي</span>
        </button>
      </div>

      {cvData.educations.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl">
          <GraduationCap className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-semibold mb-2">لم تقم بإضافة أي مؤهل تعليمي بعد</p>
          <button
            onClick={addEducation}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition"
          >
            + إضافة أول مؤهل
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cvData.educations.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  المؤهل #{index + 1}
                </span>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition"
                  title="حذف هذا المؤهل"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الدرجة العلمية</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="بكالوريوس / ماجستير / دكتوراه"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">التخصص الدقيق</label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                    placeholder="علوم الحاسب / إدارة الأعمال / الهندسة"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الجامعة أو الكلية</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="جامعة الملك سعود"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">سنة التخرج</label>
                    <input
                      type="text"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })}
                      placeholder="2020"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">التقدير / المعدل</label>
                    <input
                      type="text"
                      value={edu.grade}
                      onChange={(e) => updateEducation(edu.id, { grade: e.target.value })}
                      placeholder="امتياز (3.8/4)"
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
