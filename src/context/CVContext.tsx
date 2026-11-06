import React, { createContext, useContext, useState, useEffect } from 'react';
import { CVData, PersonalInfo, Experience, Education, Skill, Project, Language, Certificate, StyleConfig } from '../types/cv';
import { initialCVData } from '../data/defaultCV';

interface CVContextType {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  // Experience
  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  // Education
  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  // Skills
  addSkill: (name?: string, level?: Skill['level']) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  // Projects
  addProject: () => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;
  // Languages
  addLanguage: (name?: string) => void;
  updateLanguage: (id: string, lang: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  // Certificates
  addCertificate: () => void;
  updateCertificate: (id: string, cert: Partial<Certificate>) => void;
  removeCertificate: (id: string) => void;
  // Style
  updateStyle: (style: Partial<StyleConfig>) => void;
  // Utilities
  loadDemoData: () => void;
  resetToBlank: () => void;
  exportAsJSON: () => void;
  importFromJSON: (jsonString: string) => boolean;
  score: number;
  scoreSuggestions: string[];
}

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cvData, setCVData] = useState<CVData>(() => {
    const saved = localStorage.getItem('user_cv_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialCVData;
      }
    }
    return initialCVData;
  });

  useEffect(() => {
    localStorage.setItem('user_cv_data', JSON.stringify(cvData));
  }, [cvData]);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
      updatedAt: new Date().toISOString()
    }));
  };

  // Experiences
  const addExperience = () => {
    const newExp: Experience = {
      id: 'exp-' + Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setCVData(prev => ({
      ...prev,
      experiences: [newExp, ...prev.experiences]
    }));
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setCVData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => (e.id === id ? { ...e, ...exp } : e))
    }));
  };

  const removeExperience = (id: string) => {
    setCVData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(e => e.id !== id)
    }));
  };

  // Education
  const addEducation = () => {
    const newEdu: Education = {
      id: 'edu-' + Date.now(),
      degree: '',
      fieldOfStudy: '',
      institution: '',
      location: '',
      graduationDate: '',
      grade: ''
    };
    setCVData(prev => ({
      ...prev,
      educations: [newEdu, ...prev.educations]
    }));
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setCVData(prev => ({
      ...prev,
      educations: prev.educations.map(e => (e.id === id ? { ...e, ...edu } : e))
    }));
  };

  const removeEducation = (id: string) => {
    setCVData(prev => ({
      ...prev,
      educations: prev.educations.filter(e => e.id !== id)
    }));
  };

  // Skills
  const addSkill = (name: string = 'مهارة جديدة', level: Skill['level'] = 'متقدم') => {
    const newSkill: Skill = {
      id: 'sk-' + Date.now(),
      name,
      level,
      percentage: level === 'خبير' ? 95 : level === 'متقدم' ? 80 : level === 'متوسط' ? 60 : 40
    };
    setCVData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.map(s => (s.id === id ? { ...s, ...skill } : s))
    }));
  };

  const removeSkill = (id: string) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  // Projects
  const addProject = () => {
    const newProj: Project = {
      id: 'proj-' + Date.now(),
      title: '',
      description: '',
      link: '',
      technologies: ''
    };
    setCVData(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
  };

  const updateProject = (id: string, proj: Partial<Project>) => {
    setCVData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...proj } : p))
    }));
  };

  const removeProject = (id: string) => {
    setCVData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Languages
  const addLanguage = (name: string = 'لغة جديدة') => {
    const newLang: Language = {
      id: 'lang-' + Date.now(),
      name,
      proficiency: 'متوسط'
    };
    setCVData(prev => ({
      ...prev,
      languages: [...prev.languages, newLang]
    }));
  };

  const updateLanguage = (id: string, lang: Partial<Language>) => {
    setCVData(prev => ({
      ...prev,
      languages: prev.languages.map(l => (l.id === id ? { ...l, ...lang } : l))
    }));
  };

  const removeLanguage = (id: string) => {
    setCVData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.id !== id)
    }));
  };

  // Certificates
  const addCertificate = () => {
    const newCert: Certificate = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    setCVData(prev => ({
      ...prev,
      certificates: [newCert, ...prev.certificates]
    }));
  };

  const updateCertificate = (id: string, cert: Partial<Certificate>) => {
    setCVData(prev => ({
      ...prev,
      certificates: prev.certificates.map(c => (c.id === id ? { ...c, ...cert } : c))
    }));
  };

  const removeCertificate = (id: string) => {
    setCVData(prev => ({
      ...prev,
      certificates: prev.certificates.filter(c => c.id !== id)
    }));
  };

  // Style
  const updateStyle = (style: Partial<StyleConfig>) => {
    setCVData(prev => ({
      ...prev,
      style: { ...prev.style, ...style }
    }));
  };

  const loadDemoData = () => {
    setCVData(initialCVData);
  };

  const resetToBlank = () => {
    setCVData({
      id: 'cv-' + Date.now(),
      title: 'سيرة ذاتية جديدة',
      updatedAt: new Date().toISOString(),
      personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        linkedin: '',
        github: '',
        avatarUrl: '',
        summary: ''
      },
      experiences: [],
      educations: [],
      skills: [],
      projects: [],
      languages: [],
      certificates: [],
      style: initialCVData.style
    });
  };

  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `سيرة_ذاتية_${cvData.personalInfo.fullName || 'جديدة'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importFromJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personalInfo && parsed.style) {
        setCVData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // Calculate ATS completeness score
  const calculateScore = () => {
    let pts = 0;
    const suggestions: string[] = [];

    // Personal info (30 pts)
    if (cvData.personalInfo.fullName?.trim()) pts += 10;
    else suggestions.push('أضف اسمك الكامل في قسم البيانات الشخصية');

    if (cvData.personalInfo.jobTitle?.trim()) pts += 10;
    else suggestions.push('حدد مسمى وظيفي دقيق ومستهدف');

    if (cvData.personalInfo.email?.trim() && cvData.personalInfo.phone?.trim()) pts += 10;
    else suggestions.push('أضف بيانات الاتصال (البريد ورقم الهاتف)');

    // Summary (15 pts)
    if (cvData.personalInfo.summary?.trim() && cvData.personalInfo.summary.length > 50) pts += 15;
    else suggestions.push('اكتب نبذة مهنية شاملة تبرز مهاراتك وشغفك (أكثر من 50 حرفاً)');

    // Experiences (25 pts)
    if (cvData.experiences.length > 0) {
      pts += 15;
      const hasDetailedDesc = cvData.experiences.some(e => e.description && e.description.length > 30);
      if (hasDetailedDesc) pts += 10;
      else suggestions.push('أضف نقاط إنجازات ومسؤوليات واضحة لكل خبرة عملية');
    } else {
      suggestions.push('أضف على الأقل خبرة مهنية واحدة سابقة أو تدريب');
    }

    // Education (10 pts)
    if (cvData.educations.length > 0) pts += 10;
    else suggestions.push('أضف درجتك العلمية أو مؤهلك الأكاديمي');

    // Skills (10 pts)
    if (cvData.skills.length >= 4) pts += 10;
    else suggestions.push('أضف على الأقل 4 مهارات تقنية وشخصية رئيسية');

    // Projects or Certs (10 pts)
    if (cvData.projects.length > 0 || cvData.certificates.length > 0) pts += 10;
    else suggestions.push('أضف مشاريع عملية أو شهادات احترافية لتعزيز قوة سيرتك');

    return { score: Math.min(pts, 100), suggestions };
  };

  const { score, suggestions: scoreSuggestions } = calculateScore();

  return (
    <CVContext.Provider
      value={{
        cvData,
        setCVData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addCertificate,
        updateCertificate,
        removeCertificate,
        updateStyle,
        loadDemoData,
        resetToBlank,
        exportAsJSON,
        importFromJSON,
        score,
        scoreSuggestions
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};
