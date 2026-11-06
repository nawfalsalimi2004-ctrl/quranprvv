import React from 'react';
import { CVData } from '../../../types/cv';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Award, Code, Languages, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../common/Icons';

interface TemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, educations, skills, projects, languages, certificates, style } = data;
  const primaryColor = style.primaryColor || '#4f46e5';

  const avatarRadius =
    style.avatarShape === 'circle' ? 'rounded-full' :
    style.avatarShape === 'rounded' ? 'rounded-2xl' :
    style.avatarShape === 'square' ? 'rounded-none' : 'hidden';

  const isRtl = style.direction !== 'ltr';

  return (
    <div 
      className="a4-page print-area shadow-lg bg-white flex flex-col md:flex-row overflow-hidden text-slate-800"
      style={{
        fontFamily: style.fontFamily,
        direction: isRtl ? 'rtl' : 'ltr'
      }}
    >
      {/* Sidebar (Left in LTR, Right in RTL) */}
      <aside 
        className="w-full md:w-72 bg-slate-50 p-6 flex-shrink-0 border-l border-slate-200"
        style={{ borderInlineEndWidth: '1px' }}
      >
        {/* Avatar */}
        {style.avatarShape !== 'none' && personalInfo.avatarUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={personalInfo.avatarUrl}
              alt={personalInfo.fullName}
              className={`w-32 h-32 object-cover border-4 border-white shadow-md ${avatarRadius}`}
            />
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-6">
          <h3 
            className="text-xs font-bold uppercase tracking-wider pb-1.5 mb-3 border-b-2 flex items-center gap-2"
            style={{ color: primaryColor, borderColor: primaryColor }}
          >
            <span>معلومات التواصل</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-600">
            {personalInfo.email && (
              <li className="flex items-center gap-2 break-all">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: primaryColor }} />
                <span>{personalInfo.email}</span>
              </li>
            )}
            {personalInfo.phone && (
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: primaryColor }} />
                <span dir="ltr">{personalInfo.phone}</span>
              </li>
            )}
            {personalInfo.address && (
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: primaryColor }} />
                <span>{personalInfo.address}</span>
              </li>
            )}
            {personalInfo.website && (
              <li className="flex items-center gap-2 break-all">
                <Globe className="w-3.5 h-3.5 flex-shrink-0" style={{ color: primaryColor }} />
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </li>
            )}
            {personalInfo.linkedin && (
              <li className="flex items-center gap-2 break-all">
                <LinkedinIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: primaryColor }} />
                <span>{personalInfo.linkedin}</span>
              </li>
            )}
            {personalInfo.github && (
              <li className="flex items-center gap-2 break-all">
                <GithubIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: primaryColor }} />
                <span>{personalInfo.github}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h3 
              className="text-xs font-bold uppercase tracking-wider pb-1.5 mb-3 border-b-2 flex items-center gap-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              <span>المهارات والقدرات</span>
            </h3>

            <div className="space-y-2.5">
              {skills.map((skill) => (
                <div key={skill.id} className="text-xs">
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>{skill.name}</span>
                    <span className="text-[10px] text-slate-500">{skill.level}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${skill.percentage}%`, backgroundColor: primaryColor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <h3 
              className="text-xs font-bold uppercase tracking-wider pb-1.5 mb-3 border-b-2 flex items-center gap-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              <span>اللغات</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {languages.map((lang) => (
                <li key={lang.id} className="flex justify-between items-center text-slate-700">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                    {lang.proficiency}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education in sidebar */}
        {educations.length > 0 && (
          <div>
            <h3 
              className="text-xs font-bold uppercase tracking-wider pb-1.5 mb-3 border-b-2 flex items-center gap-2"
              style={{ color: primaryColor, borderColor: primaryColor }}
            >
              <span>التعليم والمؤهلات</span>
            </h3>
            <div className="space-y-3 text-xs">
              {educations.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="font-bold text-slate-800">{edu.degree}</div>
                  <div className="text-slate-600 font-medium">{edu.institution}</div>
                  {edu.fieldOfStudy && <div className="text-[11px] text-slate-500">{edu.fieldOfStudy}</div>}
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>{edu.graduationDate}</span>
                    {edu.grade && <span className="font-semibold text-slate-600">{edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 space-y-6">
        
        {/* Name and Header Title */}
        <header className="border-b border-slate-100 pb-5">
          <h1 
            className="text-3xl font-black tracking-tight"
            style={{ color: primaryColor }}
          >
            {personalInfo.fullName || 'الاسم الكامل هنا'}
          </h1>
          <p className="text-base font-semibold text-slate-600 mt-1">
            {personalInfo.jobTitle || 'المسمى الوظيفي المستهدف'}
          </p>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <p className="text-xs text-slate-600 leading-relaxed mt-3.5 text-justify">
              {personalInfo.summary}
            </p>
          )}
        </header>

        {/* Work Experiences */}
        {experiences.length > 0 && (
          <section>
            <h2 
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-4 border-b flex items-center gap-2 text-slate-900"
              style={{ borderColor: primaryColor }}
            >
              <Briefcase className="w-4 h-4" style={{ color: primaryColor }} />
              <span>الخبرات المهنية وسجل العمل</span>
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pr-3 border-r-2 border-slate-200">
                  <div 
                    className="absolute -right-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <h4 className="text-xs font-bold text-slate-900">{exp.jobTitle}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold mt-0.5 sm:mt-0">
                      {exp.startDate} - {exp.current ? 'حتى الآن' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mb-1.5">
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-slate-400 font-normal"> • {exp.location}</span>}
                  </div>
                  {exp.description && (
                    <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3 border-b flex items-center gap-2 text-slate-900"
              style={{ borderColor: primaryColor }}
            >
              <Code className="w-4 h-4" style={{ color: primaryColor }} />
              <span>أبرز المشاريع والإنجازات</span>
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-brand-600 hover:underline">
                        عرض الرابط
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mb-1.5 leading-relaxed">{proj.description}</p>
                  {proj.technologies && (
                    <div className="text-[10px] font-semibold text-slate-500">
                      التقنيات: <span className="text-slate-700">{proj.technologies}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <section>
            <h2 
              className="text-sm font-bold uppercase tracking-wider pb-1.5 mb-3 border-b flex items-center gap-2 text-slate-900"
              style={{ borderColor: primaryColor }}
            >
              <Award className="w-4 h-4" style={{ color: primaryColor }} />
              <span>الشهادات المهنية والدورات</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-2.5 rounded-lg border border-slate-100 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <div>
                    <h5 className="font-bold text-slate-800 text-[11px]">{cert.name}</h5>
                    <p className="text-[10px] text-slate-500">{cert.issuer} • {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};
