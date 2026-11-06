import React from 'react';
import { CVData } from '../../../types/cv';

interface TemplateProps {
  data: CVData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, educations, skills, projects, languages, certificates, style } = data;
  const isRtl = style.direction !== 'ltr';

  return (
    <div 
      className="a4-page print-area shadow-lg bg-white p-10 text-slate-900 leading-normal"
      style={{
        fontFamily: style.fontFamily,
        direction: isRtl ? 'rtl' : 'ltr'
      }}
    >
      {/* Header Centered */}
      <div className="text-center pb-4 border-b-2 border-slate-900 mb-6">
        <h1 className="text-2xl font-bold tracking-tight uppercase">
          {personalInfo.fullName || 'الاسم الكامل'}
        </h1>
        <p className="text-sm font-medium text-slate-700 mt-1">
          {personalInfo.jobTitle}
        </p>

        {/* Contact info single row separated by bullets */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-600 mt-2">
          {personalInfo.phone && <span dir="ltr">{personalInfo.phone}</span>}
          {personalInfo.email && <span>• {personalInfo.email}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-300 mb-2">
            نبذة مهنية (Professional Summary)
          </h2>
          <p className="text-xs text-slate-700 text-justify leading-relaxed">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-300 mb-2.5">
            الخبرات العملية (Professional Experience)
          </h2>
          <div className="space-y-3.5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold text-xs">
                  <span>{exp.jobTitle} - <span className="font-semibold">{exp.company}</span></span>
                  <span className="text-[11px] font-normal text-slate-600">
                    {exp.startDate} - {exp.current ? 'الآن' : exp.endDate}
                  </span>
                </div>
                {exp.location && <div className="text-[11px] text-slate-500 italic mb-1">{exp.location}</div>}
                <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-300 mb-2.5">
            التعليم والمؤهلات الأكاديمية (Education)
          </h2>
          <div className="space-y-2">
            {educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold">{edu.degree}</span>
                  {edu.fieldOfStudy && <span> - {edu.fieldOfStudy}</span>}
                  <div className="text-slate-600 text-[11px]">{edu.institution} {edu.location && `(${edu.location})`}</div>
                </div>
                <div className="text-right text-[11px] text-slate-600">
                  <div>{edu.graduationDate}</div>
                  {edu.grade && <div className="font-semibold">{edu.grade}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-300 mb-2">
            المهارات التقنية والشخصية (Skills)
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">
            {skills.map(s => s.name).join(' • ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-0.5 border-b border-slate-300 mb-2">
            المشاريع والإنجازات (Key Projects)
          </h2>
          <div className="space-y-2 text-xs">
            {projects.map((p) => (
              <div key={p.id}>
                <div className="font-bold">{p.title}</div>
                <div className="text-slate-700">{p.description}</div>
                {p.technologies && <div className="text-[11px] text-slate-500">الأدوات: {p.technologies}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages & Certifications */}
      <div className="grid grid-cols-2 gap-4 text-xs pt-1">
        {languages.length > 0 && (
          <div>
            <h3 className="font-bold uppercase text-[11px] border-b border-slate-200 pb-1 mb-1">اللغات</h3>
            <p className="text-slate-700">{languages.map(l => `${l.name} (${l.proficiency})`).join('، ')}</p>
          </div>
        )}
        {certificates.length > 0 && (
          <div>
            <h3 className="font-bold uppercase text-[11px] border-b border-slate-200 pb-1 mb-1">الشهادات والاعتمادات</h3>
            <p className="text-slate-700">{certificates.map(c => `${c.name} - ${c.issuer}`).join('، ')}</p>
          </div>
        )}
      </div>

    </div>
  );
};
