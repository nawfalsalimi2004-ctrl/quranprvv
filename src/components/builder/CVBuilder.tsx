import React, { useState, useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { 
  ArrowLeft, 
  Download, 
  Upload, 
  RotateCcw, 
  RotateCw, 
  Globe, 
  MoreVertical, 
  Check, 
  Cloud, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Camera, 
  FileText, 
  Sparkles, 
  Maximize2, 
  Grid, 
  List, 
  Briefcase, 
  Mail, 
  CheckSquare, 
  HelpCircle, 
  User as UserIcon,
  GripVertical,
  X,
  AlignJustify
} from 'lucide-react';
import { ModernTemplate } from '../preview/templates/ModernTemplate';
import { ExecutiveTemplate } from '../preview/templates/ExecutiveTemplate';
import { ClassicTemplate } from '../preview/templates/ClassicTemplate';
import { CreativeTemplate } from '../preview/templates/CreativeTemplate';
import { MinimalTemplate } from '../preview/templates/MinimalTemplate';
import { TemplateId, FontFamily, JobApplication, CoverLetter } from '../../types/cv';
import { JobsTab } from '../dashboard/JobsTab';
import { CandidaturesTab } from '../dashboard/CandidaturesTab';
import { CoverLetterTab } from '../dashboard/CoverLetterTab';
import { OverviewTab } from '../dashboard/OverviewTab';

interface CVBuilderProps {
  onGoToPreview: () => void;
  onGoToAppearance: () => void;
  onGoToHome?: () => void;
  language?: 'fr' | 'ar';
  onLanguageChange?: (lang: 'fr' | 'ar') => void;
}

export const CVBuilder: React.FC<CVBuilderProps> = ({ 
  onGoToPreview, 
  onGoToAppearance, 
  onGoToHome,
  language = 'fr',
  onLanguageChange
}) => {
  const { 
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
    addLanguage, 
    updateLanguage, 
    removeLanguage,
    updateStyle,
    loadDemoData,
    resetToBlank,
    importFromJSON,
    exportAsJSON
  } = useCV();

  const isFr = language === 'fr';

  // Active dashboard tab (Matching Screenshots 1, 2, 3, 4)
  const [activeTab, setActiveTab] = useState<'overview' | 'cv' | 'coverLetter' | 'jobs' | 'applications'>('cv');

  // Within 'cv', are we in list mode or editor mode?
  const [isEditingCV, setIsEditingCV] = useState(true);

  // CV Title
  const [cvTitle, setCvTitle] = useState(cvData.title || (isFr ? 'CV sans titre' : 'سيرة ذاتية بدون عنوان'));
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // New item dropdown in sidebar
  const [newDropdownOpen, setNewDropdownOpen] = useState(false);

  // Cover letters state
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([
    {
      id: 'cl-1',
      title: isFr ? 'Lettre de motivation Consulting' : 'خطاب تقديم للاستشارات',
      recipientCompany: 'Cabinet AISSE',
      recipientName: 'Direction RH',
      jobTitle: 'Consultant Senior',
      content: isFr
        ? "Madame, Monsieur,\n\nVivement intéressé par les perspectives d'évolution au sein de votre cabinet, je souhaite vous soumettre ma candidature..."
        : "السيد مدير الموارد البشرية، يسعدني التقدم لشغل المنصب المعلن عنه لديكم...",
      updatedAt: 'Modifié il y a 20 minutes'
    }
  ]);

  // Job Applications Kanban state
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 'app-1',
      company: 'Cabinet AISSE',
      position: 'Consultant en Organisation',
      location: 'الدار البيضاء',
      status: 'saved',
      date: 'Hier'
    },
    {
      id: 'app-2',
      company: 'SisPay',
      position: 'Chargé de l’évaluation RH',
      location: 'الدار البيضاء',
      status: 'applied',
      date: '2 jours'
    }
  ]);

  // Form Accordion states in Editor
  const [personalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [profilOpen, setProfilOpen] = useState(false);
  const [formationOpen, setFormationOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [competencesOpen, setCompetencesOpen] = useState(false);
  const [languesOpen, setLanguesOpen] = useState(false);
  const [interestsOpen, setInterestsOpen] = useState(false);

  // Extra visible personal info fields
  const [visibleExtraFields, setVisibleExtraFields] = useState<Record<string, boolean>>({
    dateOfBirth: Boolean(cvData.personalInfo.dateOfBirth),
    placeOfBirth: Boolean(cvData.personalInfo.placeOfBirth),
    driverLicense: Boolean(cvData.personalInfo.driverLicense),
    gender: Boolean(cvData.personalInfo.gender),
    nationality: Boolean(cvData.personalInfo.nationality),
    maritalStatus: Boolean(cvData.personalInfo.maritalStatus),
    website: Boolean(cvData.personalInfo.website),
    linkedin: Boolean(cvData.personalInfo.linkedin)
  });

  // More options menu & toolbar dropdowns
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [toolbarDropdown, setToolbarDropdown] = useState<'template' | 'font' | 'spacing' | 'margins' | 'color' | null>(null);

  // File input refs
  const photoInputRef = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJSONUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const ok = importFromJSON(text);
          if (ok) {
            alert(isFr ? 'CV importé avec succès !' : 'تم استيراد السيرة الذاتية بنجاح!');
          } else {
            alert(isFr ? 'Fichier non valide.' : 'الملف غير صالح.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const fullName = cvData.personalInfo.fullName || '';
  const nameParts = fullName.trim().split(' ');
  const defaultFirstName = cvData.personalInfo.firstName || nameParts[0] || '';
  const defaultLastName = cvData.personalInfo.lastName || nameParts.slice(1).join(' ') || '';

  const handleNameChange = (first: string, last: string) => {
    updatePersonalInfo({
      firstName: first,
      lastName: last,
      fullName: `${first} ${last}`.trim()
    });
  };

  const templates: { id: TemplateId; label: string }[] = [
    { id: 'modern', label: isFr ? 'Moderne' : 'عصري' },
    { id: 'executive', label: isFr ? 'Exécutif' : 'تنفيذي' },
    { id: 'creative', label: isFr ? 'Créatif' : 'إبداعي' },
    { id: 'classic', label: isFr ? 'Classique' : 'كلاسيكي' },
    { id: 'minimal', label: isFr ? 'Minimaliste' : 'مبسط' }
  ];

  const fonts: { id: FontFamily; label: string }[] = [
    { id: 'Inter', label: 'Inter / Sans-Serif' },
    { id: 'Cairo', label: 'Cairo (القاهرة)' },
    { id: 'Tajawal', label: 'Tajawal (تجوال)' },
    { id: 'Almarai', label: 'Almarai (المراعي)' }
  ];

  const colors = [
    '#1462ff', '#1a2b49', '#00a8a8', '#a3005a', '#059669', '#4f46e5', '#1e293b'
  ];

  const renderTemplatePreview = () => {
    switch (cvData.style.templateId) {
      case 'modern': return <ModernTemplate data={cvData} />;
      case 'executive': return <ExecutiveTemplate data={cvData} />;
      case 'creative': return <CreativeTemplate data={cvData} />;
      case 'classic': return <ClassicTemplate data={cvData} />;
      case 'minimal': return <MinimalTemplate data={cvData} />;
      default: return <ModernTemplate data={cvData} />;
    }
  };

  const generateAISummary = () => {
    const role = cvData.personalInfo.jobTitle || 'Professionnel';
    const suggested = isFr 
      ? `Professionnel passionné et orienté résultats avec une solide expérience en tant que ${role}. Capacité démontrée à collaborer efficacement en équipe, à optimiser les processus et à atteindre les objectifs stratégiques de l'entreprise.`
      : `مهندس ومختص متمرس في مجال ${role} بخبرة عملية مثبتة في إدارة المشاريع وتطوير الحلول المبتكرة وتحقيق نتائج ملموسة تعزز كفاءة ونمو المؤسسة.`;
    updatePersonalInfo({ summary: suggested });
  };

  // Add application from job listing
  const handleSaveJobToApplications = (job: { title: string; company: string; location: string }) => {
    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      company: job.company,
      position: job.title,
      location: job.location,
      status: 'saved',
      date: "Aujourd'hui"
    };
    setApplications(prev => [newApp, ...prev]);
  };

  // Quick Apply
  const handleApplyWithCV = (jobTitle: string, company: string) => {
    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      company: company,
      position: jobTitle,
      location: 'Casablanca',
      status: 'applied',
      date: "Aujourd'hui"
    };
    setApplications(prev => [newApp, ...prev]);
  };

  // =========================================================================
  // VIEW: 2-COLUMN FULL-BLEED CV EDITOR (When in 'cv' tab and isEditingCV === true)
  // =========================================================================
  if (activeTab === 'cv' && isEditingCV) {
    return (
      <div className="min-h-screen bg-white flex flex-col overflow-hidden text-gray-900">
        
        {/* Top Dark Bar (Matching Screenshot 1, 2, 3) */}
        <header className="h-14 bg-[#111317] text-white flex items-center justify-between px-4 sm:px-6 shrink-0 z-40 select-none">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingCV(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-xs font-semibold text-gray-200 transition"
              title="Retour aux CV"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>CV</span>
            </button>
          </div>

          {/* Center: Title + Cloud Sync Icon */}
          <div className="flex items-center gap-2 max-w-md">
            {isEditingTitle ? (
              <input
                type="text"
                value={cvTitle}
                autoFocus
                onBlur={() => setIsEditingTitle(false)}
                onChange={(e) => {
                  setCvTitle(e.target.value);
                  setCVData(prev => ({ ...prev, title: e.target.value }));
                }}
                className="bg-gray-800 text-white text-xs sm:text-sm font-medium px-2 py-1 rounded text-center border border-gray-600 focus:outline-none"
              />
            ) : (
              <span 
                onClick={() => setIsEditingTitle(true)}
                className="text-xs sm:text-sm font-medium text-gray-200 cursor-pointer hover:text-white transition truncate max-w-[200px]"
                title="Cliquez pour renommer"
              >
                {cvTitle}
              </span>
            )}
            <Cloud className="w-4 h-4 text-gray-400" />
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center rounded-lg border border-gray-700 overflow-hidden bg-gray-900/60">
              <button className="p-1.5 text-gray-400 hover:text-white transition"><RotateCcw className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 text-gray-400 hover:text-white transition border-l border-gray-700"><RotateCw className="w-3.5 h-3.5" /></button>
            </div>

            {onLanguageChange && (
              <button
                onClick={() => onLanguageChange(isFr ? 'ar' : 'fr')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 text-xs font-semibold text-gray-300 transition"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{isFr ? 'FR' : 'AR'}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="p-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-300 transition"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {moreMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 text-gray-800 text-xs animate-in fade-in">
                  <button onClick={() => { exportAsJSON(); setMoreMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                    <Download className="w-3.5 h-3.5 text-gray-500" />
                    <span>Exporter JSON</span>
                  </button>
                  <button onClick={() => { jsonImportRef.current?.click(); setMoreMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-gray-500" />
                    <span>Importer JSON</span>
                  </button>
                  <button onClick={() => { loadDemoData(); setMoreMenuOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[#1462ff] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Charger exemples</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 rounded-lg bg-[#1462ff] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition"
            >
              <Download className="w-4 h-4" />
              <span>{isFr ? 'Télécharger' : 'تحميل PDF'}</span>
            </button>
          </div>
        </header>

        {/* Hidden inputs */}
        <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
        <input ref={jsonImportRef} type="file" accept=".json" onChange={handleJSONUpload} className="hidden" />

        {/* 2-Column Split: Form (Left) + Preview (Right) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Form (Screenshot 1, 2, 3) */}
          <div className="w-full lg:w-1/2 overflow-y-auto p-4 sm:p-8 bg-white space-y-6 max-h-[calc(100vh-56px)] border-r border-gray-200">
            
            {/* Top Import Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div 
                onClick={() => jsonImportRef.current?.click()}
                className="p-4 rounded-xl border border-gray-200 hover:bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer transition shadow-2xs group"
              >
                <Upload className="w-5 h-5 text-gray-500 group-hover:text-[#1462ff] mb-2" />
                <span className="font-semibold text-xs text-gray-800">{isFr ? 'Importer un CV existant' : 'استيراد سيرة سابقة'}</span>
              </div>
              <div 
                onClick={() => {
                  const url = prompt(isFr ? 'Lien de votre profil LinkedIn :' : 'رابط حسابك على LinkedIn:');
                  if (url) updatePersonalInfo({ linkedin: url });
                }}
                className="p-4 rounded-xl border border-gray-200 hover:bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer transition shadow-2xs group"
              >
                <span className="font-black text-sm text-[#0a66c2] mb-2">in</span>
                <span className="font-semibold text-xs text-gray-800">{isFr ? 'Importer mon profil LinkedIn' : 'استيراد من LinkedIn'}</span>
              </div>
            </div>

            {/* Informations personnelles (Screenshot 1) */}
            <div className="border border-gray-200 rounded-xl p-5 shadow-2xs bg-white space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h2 className="font-bold text-base text-gray-950">{isFr ? 'Informations personnelles' : 'المعلومات الشخصية'}</h2>
                <button onClick={() => setPersonalInfoOpen(!personalInfoOpen)} className="p-1 rounded-md hover:bg-gray-100 text-gray-500">
                  {personalInfoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {personalInfoOpen && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-12 gap-3.5 items-start">
                    <div className="col-span-12 sm:col-span-3 flex flex-col items-start">
                      <label className="text-[11px] font-semibold text-gray-600 mb-1">{isFr ? 'Photo' : 'الصورة'}</label>
                      <div 
                        onClick={() => photoInputRef.current?.click()}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#1462ff] bg-[#f9fafb] flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group"
                      >
                        {cvData.personalInfo.avatarUrl ? (
                          <img src={cvData.personalInfo.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <Camera className="w-6 h-6 text-gray-400 group-hover:text-[#1462ff]" />
                        )}
                      </div>
                    </div>

                    <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 mb-1 block">{isFr ? 'Prénom' : 'الاسم الأول'}</label>
                        <input
                          type="text"
                          value={defaultFirstName}
                          onChange={(e) => handleNameChange(e.target.value, defaultLastName)}
                          placeholder="Paul"
                          className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 mb-1 block">{isFr ? 'Nom de famille' : 'اسم العائلة'}</label>
                        <input
                          type="text"
                          value={defaultLastName}
                          onChange={(e) => handleNameChange(defaultFirstName, e.target.value)}
                          placeholder="Smith"
                          className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-gray-600">{isFr ? 'Emploi recherché' : 'المسمى الوظيفي'}</label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-gray-500">
                        <span>{isFr ? 'En faire le titre du CV' : 'جعله عنوان السيرة'}</span>
                        <input 
                          type="checkbox" 
                          checked={Boolean(cvData.personalInfo.isJobTitleAsCVTitle)}
                          onChange={(e) => {
                            updatePersonalInfo({ isJobTitleAsCVTitle: e.target.checked });
                            if (e.target.checked && cvData.personalInfo.jobTitle) setCvTitle(cvData.personalInfo.jobTitle);
                          }}
                          className="accent-[#1462ff]"
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={cvData.personalInfo.jobTitle || ''}
                      onChange={(e) => {
                        updatePersonalInfo({ jobTitle: e.target.value });
                        if (cvData.personalInfo.isJobTitleAsCVTitle) setCvTitle(e.target.value);
                      }}
                      placeholder="Consultant Senior"
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs text-gray-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 mb-1 block">{isFr ? 'Adresse e-mail' : 'البريد'}</label>
                      <input
                        type="email"
                        value={cvData.personalInfo.email || ''}
                        onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                        placeholder="paul.smith@example.com"
                        className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 mb-1 block">{isFr ? 'Numéro de téléphone' : 'الهاتف'}</label>
                      <input
                        type="tel"
                        value={cvData.personalInfo.phone || ''}
                        onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                        placeholder="+212 6 12 34 56 78"
                        className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 mb-1 block">{isFr ? 'Adresse' : 'العنوان'}</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.address || ''}
                      onChange={(e) => updatePersonalInfo({ address: e.target.value })}
                      placeholder="Bd d'Anfa, Casablanca"
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 mb-1 block">{isFr ? 'Code postal' : 'الرمز البريدي'}</label>
                      <input
                        type="text"
                        value={cvData.personalInfo.postalCode || ''}
                        onChange={(e) => updatePersonalInfo({ postalCode: e.target.value })}
                        placeholder="20000"
                        className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 mb-1 block">{isFr ? 'Ville' : 'المدينة'}</label>
                      <input
                        type="text"
                        value={cvData.personalInfo.city || ''}
                        onChange={(e) => updatePersonalInfo({ city: e.target.value })}
                        placeholder="Casablanca"
                        className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional info pills with + (Screenshot 2) */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'dateOfBirth', label: 'Date de naissance' },
                { key: 'placeOfBirth', label: 'Lieu de naissance' },
                { key: 'driverLicense', label: 'Permis de conduire' },
                { key: 'gender', label: 'Sexe' },
                { key: 'nationality', label: 'Nationalité' },
                { key: 'maritalStatus', label: 'État civil' },
                { key: 'website', label: 'Site internet' },
                { key: 'linkedin', label: 'LinkedIn' },
                { key: 'customField', label: 'Champ personnalisé' }
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setVisibleExtraFields(p => ({ ...p, [f.key]: !p[f.key] }))}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-400" />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>

            {/* Main Sections Accordion (Screenshot 2, 3) */}
            <div className="space-y-3">
              
              {/* Profil */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <div onClick={() => setProfilOpen(!profilOpen)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <span className="font-bold text-sm text-gray-900">{isFr ? 'Profil' : 'النبذة المهنية'}</span>
                  </div>
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
                {profilOpen && (
                  <div className="p-4 pt-1 border-t border-gray-100 space-y-2">
                    <button onClick={generateAISummary} className="text-xs font-bold text-[#1462ff] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isFr ? 'Générer avec l’IA' : 'توليد بالذكاء الاصطناعي'}</span>
                    </button>
                    <textarea
                      rows={3}
                      value={cvData.personalInfo.summary || ''}
                      onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                      className="w-full p-2.5 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs"
                      placeholder="Présentation de votre parcours..."
                    />
                  </div>
                )}
              </div>

              {/* Formation */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <div onClick={() => setFormationOpen(!formationOpen)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <span className="font-bold text-sm text-gray-900">{isFr ? 'Formation' : 'التعليم'}</span>
                  </div>
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
                {formationOpen && (
                  <div className="p-4 pt-1 border-t border-gray-100 space-y-3">
                    {cvData.educations.map((edu) => (
                      <div key={edu.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                        <div className="flex justify-between">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                            placeholder="Diplôme"
                            className="w-full bg-transparent font-bold text-xs"
                          />
                          <button onClick={() => removeEducation(edu.id)} className="text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          placeholder="Établissement"
                          className="w-full bg-white px-2 py-1 border border-gray-200 rounded text-xs"
                        />
                      </div>
                    ))}
                    <button onClick={addEducation} className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-700">
                      + {isFr ? 'Ajouter une formation' : 'إضافة مؤهل'}
                    </button>
                  </div>
                )}
              </div>

              {/* Expérience professionnelle */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <div onClick={() => setExperienceOpen(!experienceOpen)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <span className="font-bold text-sm text-gray-900">{isFr ? 'Expérience professionnelle' : 'الخبرات'}</span>
                  </div>
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
                {experienceOpen && (
                  <div className="p-4 pt-1 border-t border-gray-100 space-y-3">
                    {cvData.experiences.map((exp) => (
                      <div key={exp.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                        <div className="flex justify-between">
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                            placeholder="Poste"
                            className="w-full bg-transparent font-bold text-xs"
                          />
                          <button onClick={() => removeExperience(exp.id)} className="text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          placeholder="Entreprise"
                          className="w-full bg-white px-2 py-1 border border-gray-200 rounded text-xs"
                        />
                        <textarea
                          rows={2}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                          placeholder="Missions..."
                          className="w-full p-2 bg-white border border-gray-200 rounded text-xs"
                        />
                      </div>
                    ))}
                    <button onClick={addExperience} className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-700">
                      + {isFr ? 'Ajouter une expérience' : 'إضافة خبرة'}
                    </button>
                  </div>
                )}
              </div>

              {/* Compétences */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <div onClick={() => setCompetencesOpen(!competencesOpen)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <span className="font-bold text-sm text-gray-900">{isFr ? 'Compétences' : 'المهارات'}</span>
                  </div>
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
                {competencesOpen && (
                  <div className="p-4 pt-1 border-t border-gray-100 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {cvData.skills.map((s) => (
                        <div key={s.id} className="p-2 bg-gray-50 rounded border border-gray-200 flex items-center justify-between text-xs">
                          <span>{s.name}</span>
                          <button onClick={() => removeSkill(s.id)} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => addSkill('Compétence')} className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg text-xs font-semibold">
                      + {isFr ? 'Ajouter une compétence' : 'إضافة مهارة'}
                    </button>
                  </div>
                )}
              </div>

              {/* Langues */}
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <div onClick={() => setLanguesOpen(!languesOpen)} className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-gray-300" />
                    <span className="font-bold text-sm text-gray-900">{isFr ? 'Langues' : 'اللغات'}</span>
                  </div>
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
                {languesOpen && (
                  <div className="p-4 pt-1 border-t border-gray-100 space-y-2">
                    {cvData.languages.map((l) => (
                      <div key={l.id} className="p-2 bg-gray-50 rounded border border-gray-200 flex items-center justify-between text-xs">
                        <span>{l.name}</span>
                        <button onClick={() => removeLanguage(l.id)} className="text-gray-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                      </div>
                    ))}
                    <button onClick={() => addLanguage('Français')} className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg text-xs font-semibold">
                      + {isFr ? 'Ajouter une langue' : 'إضافة لغة'}
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Custom section tags (Screenshot 3) */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Cours', 'Stages', 'Activités extra-professionnelles', 'Références', 'Qualités', 'Certificats', 'Signature'].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => alert(`Section "${tag}" ajoutée !`)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-400" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>

            {/* Bottom Télécharger */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-lg bg-[#1462ff] hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{isFr ? 'Télécharger' : 'تحميل PDF'}</span>
              </button>
            </div>

          </div>

          {/* Right Live Preview + Floating Toolbar (Screenshot 1, 2, 3) */}
          <div className="w-full lg:w-1/2 bg-[#52565e] flex flex-col items-center justify-start p-4 sm:p-8 relative overflow-y-auto max-h-[calc(100vh-56px)]">
            <div className="w-full flex justify-center py-4">
              <div className="transform scale-[0.62] sm:scale-[0.72] md:scale-[0.8] xl:scale-[0.85] origin-top shadow-2xl transition-all">
                {renderTemplatePreview()}
              </div>
            </div>

            {/* Floating Dock Toolbar */}
            <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 px-3 py-1.5 flex items-center gap-2 text-gray-700">
              {/* Template */}
              <div className="relative">
                <button
                  onClick={() => setToolbarDropdown(toolbarDropdown === 'template' ? null : 'template')}
                  className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 text-xs font-semibold"
                >
                  <FileText className="w-4 h-4" />
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
                {toolbarDropdown === 'template' && (
                  <div className="absolute bottom-full left-0 mb-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 text-xs">
                    {templates.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { updateStyle({ templateId: t.id }); setToolbarDropdown(null); }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between"
                      >
                        <span>{t.label}</span>
                        {cvData.style.templateId === t.id && <Check className="w-3.5 h-3.5 text-[#1462ff]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Font */}
              <div className="relative">
                <button
                  onClick={() => setToolbarDropdown(toolbarDropdown === 'font' ? null : 'font')}
                  className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 text-xs font-semibold"
                >
                  <span className="font-serif font-bold text-sm">Aa</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
                {toolbarDropdown === 'font' && (
                  <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 text-xs">
                    {fonts.map(f => (
                      <button
                        key={f.id}
                        onClick={() => { updateStyle({ fontFamily: f.id }); setToolbarDropdown(null); }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50"
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Color */}
              <div className="relative">
                <button
                  onClick={() => setToolbarDropdown(toolbarDropdown === 'color' ? null : 'color')}
                  className="p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1.5"
                >
                  <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: cvData.style.primaryColor }} />
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>
                {toolbarDropdown === 'color' && (
                  <div className="absolute bottom-full right-0 mb-2 p-3 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 grid grid-cols-4 gap-2">
                    {colors.map(c => (
                      <button
                        key={c}
                        onClick={() => { updateStyle({ primaryColor: c }); setToolbarDropdown(null); }}
                        className="w-6 h-6 rounded-full border-2"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button onClick={onGoToPreview} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW: UNIFIED APP DASHBOARD WITH SIDEBAR (Matching Screenshots 1, 2, 3, 4)
  // =========================================================================
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-900">
      
      {/* Left Dark Sidebar (Exact from Screenshots 1, 2, 3, 4) */}
      <aside className="w-full md:w-64 bg-[#111317] text-gray-300 flex flex-col justify-between p-4 shrink-0 border-r border-gray-800">
        <div className="space-y-6">
          
          {/* Logo + Help Icon */}
          <div className="flex items-center justify-between px-2 pt-2">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => onGoToHome && onGoToHome()}
            >
              <div className="w-7 h-7 rounded bg-[#1462ff] flex items-center justify-center text-white font-bold text-xs">
                CV
              </div>
              <span className="font-bold text-xl text-white tracking-tight">CV.FR</span>
            </div>
            <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>

          {/* + Nouveau Button with Dropdown (Screenshot 1, 2, 3, 4) */}
          <div className="relative">
            <button
              onClick={() => setNewDropdownOpen(!newDropdownOpen)}
              className="w-full py-2.5 px-4 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-800/80 text-white font-medium text-sm flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{isFr ? 'Nouveau' : 'جديد'}</span>
            </button>

            {newDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 text-gray-800 text-xs animate-in fade-in">
                <button
                  onClick={() => {
                    resetToBlank();
                    setActiveTab('cv');
                    setIsEditingCV(true);
                    setNewDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4 text-[#1462ff]" />
                  <span>{isFr ? 'Nouveau CV' : 'سيرة ذاتية جديدة'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('coverLetter');
                    setNewDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>{isFr ? 'Nouvelle lettre' : 'خطاب تغطية جديد'}</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('applications');
                    setNewDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                >
                  <CheckSquare className="w-4 h-4 text-purple-600" />
                  <span>{isFr ? 'Nouvelle candidature' : 'متابعة وظيفة'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links matching Screenshot 1, 2, 3, 4 */}
          <nav className="space-y-1 text-sm font-medium">
            
            {/* 1. Tableau de bord (Screenshot 4) */}
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'overview' ? 'bg-gray-800/90 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>{isFr ? 'Tableau de bord' : 'لوحة المعلومات'}</span>
            </button>

            {/* 2. CV (Previous Screenshot 4) */}
            <button 
              onClick={() => {
                setActiveTab('cv');
                setIsEditingCV(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'cv' ? 'bg-gray-800/90 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <FileText className="w-4 h-4 text-[#1462ff]" />
              <span>CV</span>
            </button>

            {/* 3. Lettres de motivation (Screenshot 1) */}
            <button 
              onClick={() => setActiveTab('coverLetter')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'coverLetter' ? 'bg-gray-800/90 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>{isFr ? 'Lettres de motivation' : 'خطابات التغطية'}</span>
            </button>

            {/* 4. Offres d'emploi (Screenshot 2) */}
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition ${
                activeTab === 'jobs' ? 'bg-gray-800/90 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>{isFr ? 'Offres d’emploi' : 'عروض العمل'}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#1462ff]"></span>
            </button>

            {/* 5. Candidatures (Screenshot 3) */}
            <button 
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${
                activeTab === 'applications' ? 'bg-gray-800/90 text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>{isFr ? 'Candidatures' : 'متابعة التقديم'}</span>
            </button>

          </nav>
        </div>

        {/* Bottom user / exit button */}
        <div className="pt-4 border-t border-gray-800">
          <button
            onClick={() => onGoToHome && onGoToHome()}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-gray-400 hover:text-white transition"
          >
            <UserIcon className="w-4 h-4" />
            <span>{isFr ? 'Se connecter / Quitter' : 'تسجيل الدخول / الخروج'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area switching by activeTab */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        
        {/* TAB 1: Tableau de bord (Screenshot 4) */}
        {activeTab === 'overview' && (
          <OverviewTab
            isFr={isFr}
            cvTitle={cvTitle}
            onOpenCVEditor={() => {
              setActiveTab('cv');
              setIsEditingCV(true);
            }}
            onOpenCoverLetter={() => setActiveTab('coverLetter')}
            onSwitchTab={(t) => {
              setActiveTab(t);
              if (t === 'cv') setIsEditingCV(true);
            }}
          />
        )}

        {/* TAB 2: CV Resumes List (When isEditingCV === false) */}
        {activeTab === 'cv' && !isEditingCV && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">CV</h1>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                <button className="p-2 bg-[#1462ff] text-white"><Grid className="w-4 h-4" /></button>
                <button className="p-2 text-gray-500 hover:bg-gray-100"><List className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
              <div 
                onClick={() => {
                  resetToBlank();
                  setIsEditingCV(true);
                }}
                className="aspect-[1/1.4] border-2 border-dashed border-gray-300 hover:border-[#1462ff] rounded-2xl bg-white hover:bg-blue-50/20 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition group shadow-2xs"
              >
                <div className="w-12 h-12 rounded-full border border-gray-300 group-hover:border-[#1462ff] flex items-center justify-center text-gray-400 group-hover:text-[#1462ff] mb-4 transition">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-sm text-gray-700 group-hover:text-gray-900">
                  {isFr ? 'Créer un nouveau CV' : 'إنشاء سيرة ذاتية جديدة'}
                </h3>
              </div>

              <div 
                onClick={() => setIsEditingCV(true)}
                className="aspect-[1/1.4] border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between p-4 cursor-pointer group"
              >
                <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 flex items-start justify-center p-2">
                  <div className="w-full bg-[#1a2b49] h-8 rounded-t-sm flex items-center px-2 text-[8px] text-white font-bold">
                    Curriculum vitae
                  </div>
                </div>
                <div className="pt-3">
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#1462ff] transition">{cvTitle}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{isFr ? 'Modifié il y a 24 minutes' : 'تم التعديل مؤخراً'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Lettres de motivation (Screenshot 1) */}
        {activeTab === 'coverLetter' && (
          <CoverLetterTab
            isFr={isFr}
            coverLetters={coverLetters}
            onAddCoverLetter={(letter) => setCoverLetters(prev => [letter, ...prev])}
            onUpdateCoverLetter={(id, updated) => setCoverLetters(prev => prev.map(l => l.id === id ? { ...l, ...updated } : l))}
            onRemoveCoverLetter={(id) => setCoverLetters(prev => prev.filter(l => l.id !== id))}
          />
        )}

        {/* TAB 4: Offres d'emploi (Screenshot 2) */}
        {activeTab === 'jobs' && (
          <JobsTab
            isFr={isFr}
            onSaveJobToApplications={handleSaveJobToApplications}
            onApplyWithCV={handleApplyWithCV}
          />
        )}

        {/* TAB 5: Candidatures (Screenshot 3) */}
        {activeTab === 'applications' && (
          <CandidaturesTab
            isFr={isFr}
            applications={applications}
            onAddApplication={(app) => {
              const newApp: JobApplication = {
                id: 'app-' + Date.now(),
                company: app.company || 'Entreprise',
                position: app.position || 'Poste',
                location: app.location || 'Casablanca',
                status: app.status || 'saved',
                date: app.date || "Aujourd'hui"
              };
              setApplications(prev => [newApp, ...prev]);
            }}
            onUpdateApplicationStatus={(id, newStatus) => {
              setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
            }}
            onRemoveApplication={(id) => {
              setApplications(prev => prev.filter(a => a.id !== id));
            }}
          />
        )}

      </main>

    </div>
  );
};
