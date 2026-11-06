import React from 'react';
import { CVData } from '../../../types/cv';

interface TemplateProps {
  data: CVData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, educations, skills, projects, languages, certificates, style } = data;
  const isRtl = style.direction !== 'ltr';

  return (
    <div 
      className="a4-page print-area shadow-lg bg-white p-12 text-slate-800"
      style={{
        fontFamily: style.fontFamily,
        direction: isRtl ? 'rtl' : 'ltr'
      }}
    >
      {/* Ultra Clean Top */}
      <div className="flex justify-between items-start pb-8 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            {personalInfo.fullName || 'الاسم الكامل'}
          </h1>
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mt-1">
            {personalInfo.jobTitle}
          </p>
        </div>

        <div className="text-left text-xs text-slate-500 space-y-0.5" dir="ltr">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.address && <div>{personalInfo.address}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="py-6 border-b border-slate-100">
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="py-6 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              الخبرة المهنية
            </div>
            <div className="md:col-span-3 space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900">{exp.jobTitle} — <span className="font-normal text-slate-600">{exp.company}</span></span>
                    <span className="text-slate-400 text-[11px]">{exp.startDate} – {exp.current ? 'حتى الآن' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <section className="py-6 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              التعليم
            </div>
            <div className="md:col-span-3 space-y-3">
              {educations.map((edu) => (
                <div key={edu.id} className="flex justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{edu.degree}</span>
                    <span className="text-slate-500">, {edu.institution}</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">{edu.graduationDate}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="py-6 border-b border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              المهارات
            </div>
            <div className="md:col-span-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-700">
              {skills.map((s) => (
                <span key={s.id} className="border-b border-slate-200 pb-0.5">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              مشاريع مختارة
            </div>
            <div className="md:col-span-3 space-y-3 text-xs">
              {projects.map((p) => (
                <div key={p.id}>
                  <div className="font-bold text-slate-900">{p.title}</div>
                  <div className="text-slate-600 mt-0.5">{p.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
