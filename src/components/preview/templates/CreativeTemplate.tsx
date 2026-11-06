import React from 'react';
import { CVData } from '../../../types/cv';
import { Mail, Phone, MapPin, Globe, Sparkles, Award, Code, Briefcase, GraduationCap } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../common/Icons';

interface TemplateProps {
  data: CVData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, educations, skills, projects, languages, certificates, style } = data;
  const primaryColor = style.primaryColor || '#ec4899';
  const isRtl = style.direction !== 'ltr';

  return (
    <div 
      className="a4-page print-area shadow-lg bg-white overflow-hidden text-slate-800"
      style={{
        fontFamily: style.fontFamily,
        direction: isRtl ? 'rtl' : 'ltr'
      }}
    >
      {/* Top Creative Colorful Strip */}
      <div 
        className="h-3 w-full"
        style={{
          background: `linear-gradient(90deg, ${primaryColor}, #8b5cf6, #3b82f6)`
        }}
      />

      <div className="p-8">
        {/* Header Profile */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          {style.avatarShape !== 'none' && personalInfo.avatarUrl && (
            <div className="relative">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.fullName}
                className="w-24 h-24 rounded-3xl object-cover shadow-lg border-2 border-white ring-2"
                style={{ borderColor: primaryColor }}
              />
              <span 
                className="absolute -bottom-1 -right-1 p-1 rounded-full text-white shadow"
                style={{ backgroundColor: primaryColor }}
              >
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>
          )}

          <div className="text-center sm:text-start flex-1">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {personalInfo.fullName || 'الاسم الكامل'}
            </h1>
            <p 
              className="text-sm font-bold mt-1 inline-block px-3 py-0.5 rounded-full text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {personalInfo.jobTitle || 'المسمى الوظيفي'}
            </p>

            {/* Quick Contact */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-600">
              {personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1" dir="ltr"><Phone className="w-3 h-3" />{personalInfo.phone}</span>}
              {personalInfo.address && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{personalInfo.address}</span>}
              {personalInfo.linkedin && <span className="flex items-center gap-1"><LinkedinIcon className="w-3 h-3" />{personalInfo.linkedin}</span>}
            </div>
          </div>
        </div>

        {/* Bio */}
        {personalInfo.summary && (
          <div className="py-4 border-b border-slate-100">
            <p className="text-xs text-slate-700 leading-relaxed text-justify font-medium">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* 2-Column Creative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Main 2 Cols: Experience & Projects */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Experience */}
            {experiences.length > 0 && (
              <section>
                <h3 className="text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-900">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                  <Briefcase className="w-4 h-4" style={{ color: primaryColor }} />
                  <span>الخبرات والمسار المهني</span>
                </h3>

                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-extrabold text-xs text-slate-900">{exp.jobTitle}</span>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded shadow-xs">
                          {exp.startDate} - {exp.current ? 'الآن' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-brand-600 mb-1.5" style={{ color: primaryColor }}>
                        {exp.company} {exp.location && `• ${exp.location}`}
                      </div>
                      <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h3 className="text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2 text-slate-900">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                  <Code className="w-4 h-4" style={{ color: primaryColor }} />
                  <span>أبرز الأعمال والمشاريع</span>
                </h3>

                <div className="space-y-2.5">
                  {projects.map((p) => (
                    <div key={p.id} className="p-3 rounded-lg border border-slate-100">
                      <div className="flex justify-between font-bold text-xs text-slate-900">
                        <span>{p.title}</span>
                        {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-[10px] text-brand-600 hover:underline">زيارة</a>}
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{p.description}</p>
                      {p.technologies && <span className="text-[10px] font-bold text-slate-400 mt-1 block">الأدوات: {p.technologies}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Side 1 Col: Skills, Education, Languages */}
          <div className="space-y-6">
            
            {/* Skills */}
            {skills.length > 0 && (
              <section className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  المهارات الفنية
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span 
                      key={s.id}
                      className="text-[10px] font-bold px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 shadow-xs"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {educations.length > 0 && (
              <section className="p-4 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                  <span>المؤهلات</span>
                </h4>
                <div className="space-y-2 text-xs">
                  {educations.map((edu) => (
                    <div key={edu.id}>
                      <div className="font-bold text-slate-800">{edu.degree}</div>
                      <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                      <div className="text-[10px] text-slate-400">{edu.graduationDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section className="p-4 rounded-2xl border border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">اللغات</h4>
                <div className="space-y-1 text-xs">
                  {languages.map((l) => (
                    <div key={l.id} className="flex justify-between text-slate-700">
                      <span>{l.name}</span>
                      <span className="text-[10px] font-bold text-slate-500">{l.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
