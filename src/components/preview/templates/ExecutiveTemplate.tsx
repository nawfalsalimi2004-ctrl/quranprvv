import React from 'react';
import { CVData } from '../../../types/cv';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../common/Icons';

interface TemplateProps {
  data: CVData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, educations, skills, projects, languages, certificates, style } = data;
  const primaryColor = style.primaryColor || '#0f172a';

  const isRtl = style.direction !== 'ltr';

  return (
    <div 
      className="a4-page print-area shadow-lg bg-white overflow-hidden text-slate-800"
      style={{
        fontFamily: style.fontFamily,
        direction: isRtl ? 'rtl' : 'ltr'
      }}
    >
      {/* Top Prestigious Banner */}
      <header 
        className="p-8 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {style.avatarShape !== 'none' && personalInfo.avatarUrl && (
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className={`w-28 h-28 object-cover ring-4 ring-white/30 ${
                style.avatarShape === 'circle' ? 'rounded-full' : 'rounded-xl'
              }`}
            />
          )}

          <div className="flex-1 text-center md:text-start">
            <h1 className="text-3xl font-extrabold tracking-wide uppercase">
              {personalInfo.fullName || 'الاسم الكامل هنا'}
            </h1>
            <p className="text-sm font-semibold tracking-wider text-slate-200 mt-1 uppercase">
              {personalInfo.jobTitle || 'المسمى الوظيفي'}
            </p>

            {/* Quick Contact Line */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-xs text-slate-200">
              {personalInfo.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-300" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5" dir="ltr">
                  <Phone className="w-3.5 h-3.5 text-slate-300" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.address && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-300" />
                  {personalInfo.address}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-slate-300" />
                  {personalInfo.linkedin}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="p-8 space-y-6">
        
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section className="bg-slate-50 p-4 rounded-xl border-r-4 border-slate-300" style={{ borderInlineStartColor: primaryColor }}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
              الملخص التنفيذي والرؤية المهنية
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experiences */}
        {experiences.length > 0 && (
          <section>
            <h3 
              className="text-xs font-extrabold uppercase tracking-widest pb-1 mb-4 border-b-2 flex items-center gap-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              <Briefcase className="w-4 h-4" />
              <span>المسيرة المهنية والقيادية</span>
            </h3>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="pb-3 border-b border-slate-100 last:border-none">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold text-slate-900">{exp.jobTitle}</h4>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {exp.startDate} - {exp.current ? 'مستمر' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-600 mb-2">
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </div>
                  <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                    {exp.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two Columns Grid for Skills & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Education */}
          {educations.length > 0 && (
            <section>
              <h3 
                className="text-xs font-extrabold uppercase tracking-widest pb-1 mb-3 border-b-2 flex items-center gap-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                <GraduationCap className="w-4 h-4" />
                <span>المؤهلات الأكاديمية</span>
              </h3>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600 font-medium">{edu.institution}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{edu.graduationDate} {edu.grade && `• ${edu.grade}`}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies / Skills */}
          {skills.length > 0 && (
            <section>
              <h3 
                className="text-xs font-extrabold uppercase tracking-widest pb-1 mb-3 border-b-2 flex items-center gap-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                <Award className="w-4 h-4" />
                <span>الجدارات والمهارات القيادية</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Languages & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          {languages.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">اللغات المتقنة</h4>
              <div className="space-y-1 text-xs text-slate-600">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="font-semibold text-slate-500 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certificates.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">الاعتمادات والتراخيص</h4>
              <div className="space-y-1 text-xs text-slate-600">
                {certificates.map((c) => (
                  <div key={c.id}>
                    <span className="font-semibold text-slate-800 text-[11px]">{c.name}</span>
                    <span className="text-[10px] text-slate-400 block">{c.issuer} - {c.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
