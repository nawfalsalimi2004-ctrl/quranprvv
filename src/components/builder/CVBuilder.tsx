import React, { useState, useRef, useEffect } from 'react';
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
  CloudCheck,
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Edit3, 
  Camera, 
  FileText, 
  Sparkles, 
  Maximize2, 
  Layers, 
  Type, 
  AlignJustify, 
  Palette, 
  Grid, 
  List, 
  Briefcase, 
  Mail, 
  CheckSquare, 
  HelpCircle, 
  User as UserIcon,
  GripVertical,
  ExternalLink,
  FileCheck,
  Calendar,
  MapPin,
  X,
  Eye,
  Sliders
} from 'lucide-react';
import { ModernTemplate } from '../preview/templates/ModernTemplate';
import { ExecutiveTemplate } from '../preview/templates/ExecutiveTemplate';
import { ClassicTemplate } from '../preview/templates/ClassicTemplate';
import { CreativeTemplate } from '../preview/templates/CreativeTemplate';
import { MinimalTemplate } from '../preview/templates/MinimalTemplate';
import { TemplateId, FontFamily } from '../../types/cv';

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

  // Mode: 'editor' (Image 1, 2, 3) vs 'dashboard' (Image 4)
  const [viewMode, setViewMode] = useState<'editor' | 'dashboard'>('editor');

  // Title of the CV
  const [cvTitle, setCvTitle] = useState(cvData.title || (isFr ? 'CV sans titre' : 'سيرة ذاتية بدون عنوان'));
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Accordion open states
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

  // More options dropdown in top bar
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Floating toolbar dropdowns
  const [toolbarDropdown, setToolbarDropdown] = useState<'template' | 'font' | 'spacing' | 'margins' | 'color' | null>(null);

  // File input ref for photo
  const photoInputRef = useRef<HTMLInputElement>(null);
  const jsonImportRef = useRef<HTMLInputElement>(null);

  // Handle Photo upload
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

  // Handle JSON import
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

  // Helper to split/combine fullName into firstName & lastName
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

  // Templates list
  const templates: { id: TemplateId; label: string; color: string }[] = [
    { id: 'modern', label: isFr ? 'Moderne' : 'عصري', color: '#1a2b49' },
    { id: 'executive', label: isFr ? 'Exécutif' : 'تنفيذي', color: '#00a8a8' },
    { id: 'creative', label: isFr ? 'Créatif' : 'إبداعي', color: '#a3005a' },
    { id: 'classic', label: isFr ? 'Classique' : 'كلاسيكي', color: '#3b5998' },
    { id: 'minimal', label: isFr ? 'Minimaliste' : 'مبسط', color: '#1e293b' }
  ];

  // Fonts list
  const fonts: { id: FontFamily; label: string }[] = [
    { id: 'Inter', label: 'Inter / Sans-Serif' },
    { id: 'Cairo', label: 'Cairo (القاهرة)' },
    { id: 'Tajawal', label: 'Tajawal (تجوال)' },
    { id: 'Almarai', label: 'Almarai (المراعي)' }
  ];

  // Colors list
  const colors = [
    '#1462ff', // Royal Blue
    '#1a2b49', // Navy
    '#00a8a8', // Teal
    '#a3005a', // Magenta
    '#059669', // Emerald
    '#4f46e5', // Indigo
    '#1e293b'  // Slate
  ];

  // Render Template
  const renderTemplatePreview = () => {
    switch (cvData.style.templateId) {
      case 'modern':
        return <ModernTemplate data={cvData} />;
      case 'executive':
        return <ExecutiveTemplate data={cvData} />;
      case 'creative':
        return <CreativeTemplate data={cvData} />;
      case 'classic':
        return <ClassicTemplate data={cvData} />;
      case 'minimal':
        return <MinimalTemplate data={cvData} />;
      default:
        return <ModernTemplate data={cvData} />;
    }
  };

  // Trigger print / download
  const handlePrintDownload = () => {
    window.print();
  };

  // AI helper for summary
  const generateAISummary = () => {
    const role = cvData.personalInfo.jobTitle || 'Professionnel';
    const suggested = isFr 
      ? `Professionnel passionné et orienté résultats avec une solide expérience en tant que ${role}. Capacité démontrée à collaborer efficacement en équipe, à optimiser les processus et à atteindre les objectifs stratégiques de l'entreprise.`
      : `مهندس ومختص متمرس في مجال ${role} بخبرة عملية مثبتة في إدارة المشاريع وتطوير الحلول المبتكرة وتحقيق نتائج ملموسة تعزز كفاءة ونمو المؤسسة.`;
    updatePersonalInfo({ summary: suggested });
  };

  // =========================================================================
  // VIEW 1: DASHBOARD VIEW (Matching Screenshot 4)
  // =========================================================================
  if (viewMode === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-900">
        
        {/* Left Dark Sidebar (Matching Screenshot 4) */}
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

            {/* + Nouveau Button (Matching Screenshot 4) */}
            <button
              onClick={() => {
                resetToBlank();
                setViewMode('editor');
              }}
              className="w-full py-2.5 px-4 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-800/80 text-white font-medium text-sm flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>{isFr ? 'Nouveau' : 'جديد'}</span>
            </button>

            {/* Navigation links */}
            <nav className="space-y-1 text-sm font-medium">
              <button 
                onClick={() => onGoToHome && onGoToHome()}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition"
              >
                <Grid className="w-4 h-4" />
                <span>{isFr ? 'Tableau de bord' : 'لوحة المعلومات'}</span>
              </button>

              <button 
                onClick={() => setViewMode('dashboard')}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800/90 text-white transition font-semibold"
              >
                <FileText className="w-4 h-4 text-[#1462ff]" />
                <span>CV</span>
              </button>

              <button 
                onClick={() => {
                  setViewMode('editor');
                  setProfilOpen(true);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition"
              >
                <Mail className="w-4 h-4" />
                <span>{isFr ? 'Lettres de motivation' : 'خطابات التغطية'}</span>
              </button>

              <button 
                onClick={() => onGoToHome && onGoToHome()}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4" />
                  <span>{isFr ? 'Offres d’emploi' : 'عروض العمل'}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#1462ff]"></span>
              </button>

              <button 
                onClick={() => onGoToHome && onGoToHome()}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/60 transition"
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

        {/* Main Content Area (Matching Screenshot 4) */}
        <main className="flex-1 p-6 sm:p-10">
          
          {/* Header Row: Title + Grid/List Icons */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">CV</h1>
            
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs">
              <button className="p-2 bg-[#1462ff] text-white">
                <Grid className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:bg-gray-100">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            
            {/* Card 1: Créer un nouveau CV (Dashed border matching Screenshot 4) */}
            <div 
              onClick={() => {
                resetToBlank();
                setViewMode('editor');
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

            {/* Card 2: CV sans titre (Existing resume thumbnail matching Screenshot 4) */}
            <div 
              onClick={() => setViewMode('editor')}
              className="aspect-[1/1.4] border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between p-4 cursor-pointer group"
            >
              {/* Thumbnail Container */}
              <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 flex items-start justify-center p-2">
                
                {/* Mini mockup top banner matching screenshot 4 */}
                <div className="w-full bg-[#1a2b49] h-8 rounded-t-sm flex items-center px-2 text-[8px] text-white font-bold">
                  Curriculum vitae
                </div>

                {/* More options button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setMoreMenuOpen(!moreMenuOpen);
                  }}
                  className="absolute bottom-2 right-2 p-1.5 rounded-md bg-white shadow border border-gray-200 text-gray-600 hover:text-black"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Title & Date */}
              <div className="pt-3">
                <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#1462ff] transition">
                  {cvTitle}
                </h4>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {isFr ? 'Modifié il y a 10 minutes' : 'تم التعديل قبل قليل'}
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL-BLEED 2-COLUMN CV EDITOR (Matching Screenshot 1, 2, 3)
  // =========================================================================
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden text-gray-900">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP DARK BAR (Matching Screenshot 1, 2, 3) */}
      {/* ------------------------------------------------------------- */}
      <header className="h-14 bg-[#111317] text-white flex items-center justify-between px-4 sm:px-6 shrink-0 z-40 select-none">
        
        {/* Left: ← CV button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('dashboard')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-gray-800 text-xs font-semibold text-gray-200 transition"
            title={isFr ? 'Retour aux CV' : 'الرجوع للقائمة'}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>CV</span>
          </button>
        </div>

        {/* Center: Editable Title + Cloud Sync Icon */}
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
              className="bg-gray-800 text-white text-xs sm:text-sm font-medium px-2 py-1 rounded text-center border border-gray-600 focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
            />
          ) : (
            <span 
              onClick={() => setIsEditingTitle(true)}
              className="text-xs sm:text-sm font-medium text-gray-200 cursor-pointer hover:text-white transition truncate max-w-[200px] sm:max-w-xs"
              title="Cliquez pour renommer"
            >
              {cvTitle}
            </span>
          )}

          {/* Cloud Sync Icon with checkmark */}
          <div className="flex items-center text-gray-400" title="Enregistré dans le cloud">
            <Cloud className="w-4 h-4" />
          </div>
        </div>

        {/* Right Actions: Undo/Redo + Lang + More + Blue Download */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Undo / Redo group */}
          <div className="hidden sm:flex items-center rounded-lg border border-gray-700 overflow-hidden bg-gray-900/60">
            <button 
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition disabled:opacity-30"
              title="Annuler (Ctrl+Z)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button 
              className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 transition border-l border-gray-700 disabled:opacity-30"
              title="Rétablir (Ctrl+Y)"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Language Switcher Button (Matching Screenshot 1: 文A FR ⌵) */}
          {onLanguageChange && (
            <button
              onClick={() => onLanguageChange(isFr ? 'ar' : 'fr')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 text-xs font-semibold text-gray-300 transition"
              title="Changer de langue"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isFr ? 'FR' : 'AR'}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          )}

          {/* More options (⋮) */}
          <div className="relative">
            <button
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="p-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-300 transition"
              title="Plus d'options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {moreMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 text-gray-800 animate-in fade-in duration-150 text-xs">
                <button
                  onClick={() => {
                    exportAsJSON();
                    setMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-gray-500" />
                  <span>Exporter au format JSON</span>
                </button>
                <button
                  onClick={() => {
                    jsonImportRef.current?.click();
                    setMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Upload className="w-3.5 h-3.5 text-gray-500" />
                  <span>Importer un fichier JSON</span>
                </button>
                <button
                  onClick={() => {
                    loadDemoData();
                    setMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-[#1462ff]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Charger les données exemples</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(isFr ? 'Voulez-vous réinitialiser le formulaire ?' : 'هل تريد مسح البيانات والبدء من جديد؟')) {
                      resetToBlank();
                    }
                    setMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-gray-100 mt-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Vider tout le CV</span>
                </button>
              </div>
            )}
          </div>

          {/* Blue Download Button: 📥 Télécharger (Matching Screenshot 1, 2, 3) */}
          <button
            onClick={handlePrintDownload}
            className="px-4 py-1.5 rounded-lg bg-[#1462ff] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>{isFr ? 'Télécharger' : 'تحميل PDF'}</span>
          </button>

        </div>
      </header>

      {/* Hidden inputs for imports */}
      <input 
        ref={photoInputRef}
        type="file" 
        accept="image/*" 
        onChange={handlePhotoUpload} 
        className="hidden" 
      />
      <input 
        ref={jsonImportRef}
        type="file" 
        accept=".json" 
        onChange={handleJSONUpload} 
        className="hidden" 
      />

      {/* ------------------------------------------------------------- */}
      {/* 2-COLUMN SPLIT: FORM (LEFT) + PREVIEW (RIGHT) */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* =========================================================== */}
        {/* LEFT COLUMN: FORM SECTIONS (Matching Screenshot 1, 2, 3) */}
        {/* =========================================================== */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-4 sm:p-8 bg-white space-y-6 max-h-[calc(100vh-56px)] border-r border-gray-200">
          
          {/* Top Import Cards (Matching Screenshot 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            {/* Card 1: Importer un CV existant */}
            <div 
              onClick={() => jsonImportRef.current?.click()}
              className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer transition shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center text-gray-500 group-hover:text-[#1462ff] mb-2 transition">
                <Upload className="w-4 h-4" />
              </div>
              <span className="font-semibold text-xs text-gray-800">
                {isFr ? 'Importer un CV existant' : 'استيراد سيرة ذاتية سابقة'}
              </span>
            </div>

            {/* Card 2: Importer mon profil LinkedIn */}
            <div 
              onClick={() => {
                const url = prompt(isFr ? 'Entrez le lien de votre profil LinkedIn :' : 'أدخل رابط ملفك الشخصي على LinkedIn:');
                if (url) {
                  updatePersonalInfo({ linkedin: url });
                  alert(isFr ? 'Profil LinkedIn lié avec succès !' : 'تم ربط ملف LinkedIn بنجاح!');
                }
              }}
              className="p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex flex-col items-center justify-center text-center cursor-pointer transition shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-blue-50 flex items-center justify-center text-[#0a66c2] font-black text-sm mb-2 transition">
                in
              </div>
              <span className="font-semibold text-xs text-gray-800">
                {isFr ? 'Importer mon profil LinkedIn' : 'استيراد من LinkedIn'}
              </span>
            </div>

          </div>

          {/* ========================================================= */}
          {/* Section: Informations personnelles (Matching Screenshot 1) */}
          {/* ========================================================= */}
          <div className="border border-gray-200 rounded-xl p-5 shadow-2xs bg-white space-y-4">
            
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 className="font-bold text-base text-gray-950">
                {isFr ? 'Informations personnelles' : 'المعلومات الشخصية'}
              </h2>
              
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setPersonalInfoOpen(!personalInfoOpen)}
                  className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition"
                  title="Réduire / Développer"
                >
                  {personalInfoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {personalInfoOpen && (
              <div className="space-y-4 pt-1">
                
                {/* Row 1: Photo + Prénom + Nom de famille (Matching Screenshot 1) */}
                <div className="grid grid-cols-12 gap-3.5 items-start">
                  
                  {/* Photo Square Upload Box */}
                  <div className="col-span-12 sm:col-span-3 flex flex-col items-start">
                    <label className="text-[11px] font-semibold text-gray-600 mb-1">
                      {isFr ? 'Photo' : 'الصورة'}
                    </label>
                    <div 
                      onClick={() => photoInputRef.current?.click()}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg border-2 border-dashed border-gray-300 hover:border-[#1462ff] bg-[#f9fafb] hover:bg-blue-50/20 flex flex-col items-center justify-center cursor-pointer transition relative overflow-hidden group"
                    >
                      {cvData.personalInfo.avatarUrl ? (
                        <>
                          <img 
                            src={cvData.personalInfo.avatarUrl} 
                            alt="Avatar" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold transition">
                            {isFr ? 'Modifier' : 'تغيير'}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-gray-400 group-hover:text-[#1462ff]">
                          <Camera className="w-6 h-6 stroke-[1.5]" />
                          <span className="text-[9px] mt-1 font-medium">{isFr ? 'Ajouter' : 'إضافة'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prénom + Nom de famille */}
                  <div className="col-span-12 sm:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
                        {isFr ? 'Prénom' : 'الاسم الأول'}
                      </label>
                      <input
                        type="text"
                        value={defaultFirstName}
                        onChange={(e) => handleNameChange(e.target.value, defaultLastName)}
                        placeholder="Paul"
                        className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
                        {isFr ? 'Nom de famille' : 'اسم العائلة'}
                      </label>
                      <input
                        type="text"
                        value={defaultLastName}
                        onChange={(e) => handleNameChange(defaultFirstName, e.target.value)}
                        placeholder="Smith"
                        className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                      />
                    </div>
                  </div>

                </div>

                {/* Row 2: Emploi recherché + Toggle "En faire le titre du CV" (Matching Screenshot 1) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-gray-600">
                      {isFr ? 'Emploi recherché' : 'المسمى الوظيفي المستهدف'}
                    </label>
                    
                    {/* Toggle switch */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-[10px] text-gray-500">
                      <span>{isFr ? 'En faire le titre du CV' : 'جعله عنوان السيرة'}</span>
                      <input 
                        type="checkbox" 
                        checked={Boolean(cvData.personalInfo.isJobTitleAsCVTitle)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updatePersonalInfo({ isJobTitleAsCVTitle: checked });
                          if (checked && cvData.personalInfo.jobTitle) {
                            setCvTitle(cvData.personalInfo.jobTitle);
                          }
                        }}
                        className="w-3.5 h-3.5 text-[#1462ff] rounded accent-[#1462ff]"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={cvData.personalInfo.jobTitle || ''}
                    onChange={(e) => {
                      updatePersonalInfo({ jobTitle: e.target.value });
                      if (cvData.personalInfo.isJobTitleAsCVTitle) {
                        setCvTitle(e.target.value);
                      }
                    }}
                    placeholder="Elementary School Teacher"
                    className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                  />
                </div>

                {/* Row 3: Adresse e-mail | Numéro de téléphone (Matching Screenshot 1) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
                      {isFr ? 'Adresse e-mail' : 'البريد الإلكتروني'}
                    </label>
                    <input
                      type="email"
                      value={cvData.personalInfo.email || ''}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                      placeholder="paul.smith@example.com"
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
                      {isFr ? 'Numéro de téléphone' : 'رقم الهاتف'}
                    </label>
                    <input
                      type="tel"
                      value={cvData.personalInfo.phone || ''}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                    />
                  </div>
                </div>

                {/* Row 4: Adresse (Matching Screenshot 1) */}
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
                    {isFr ? 'Adresse' : 'العنوان'}
                  </label>
                  <input
                    type="text"
                    value={cvData.personalInfo.address || ''}
                    onChange={(e) => updatePersonalInfo({ address: e.target.value })}
                    placeholder="14, rue de la République"
                    className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                  />
                </div>

                {/* Row 5: Code postal | Ville (Matching Screenshot 1) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
                      {isFr ? 'Code postal' : 'الرمز البريدي'}
                    </label>
                    <input
                      type="text"
                      value={cvData.personalInfo.postalCode || ''}
                      onChange={(e) => updatePersonalInfo({ postalCode: e.target.value })}
                      placeholder="75001"
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 mb-1 block">
                      {isFr ? 'Ville' : 'المدينة'}
                    </label>
                    <input
                      type="text"
                      value={cvData.personalInfo.city || ''}
                      onChange={(e) => updatePersonalInfo({ city: e.target.value })}
                      placeholder="Paris"
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                    />
                  </div>
                </div>

                {/* Dynamic Extra Fields (Shown when activated via pills below) */}
                {visibleExtraFields.dateOfBirth && (
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 mb-1 block">Date de naissance</label>
                    <input
                      type="date"
                      value={cvData.personalInfo.dateOfBirth || ''}
                      onChange={(e) => updatePersonalInfo({ dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900"
                    />
                  </div>
                )}

                {visibleExtraFields.linkedin && (
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 mb-1 block">LinkedIn</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.linkedin || ''}
                      onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
                      placeholder="linkedin.com/in/profil"
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900"
                    />
                  </div>
                )}

                {visibleExtraFields.website && (
                  <div>
                    <label className="text-[11px] font-semibold text-gray-600 mb-1 block">Site internet</label>
                    <input
                      type="text"
                      value={cvData.personalInfo.website || ''}
                      onChange={(e) => updatePersonalInfo({ website: e.target.value })}
                      placeholder="https://monsite.fr"
                      className="w-full px-3 py-2 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs font-medium text-gray-900"
                    />
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Additional Personal Info Pills with + (Matching Screenshot 2) */}
          <div className="flex flex-wrap gap-2 pt-1">
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
            ].map((field) => (
              <button
                key={field.key}
                onClick={() => setVisibleExtraFields(prev => ({ ...prev, [field.key]: !prev[field.key] }))}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-1 shadow-2xs ${
                  visibleExtraFields[field.key]
                    ? 'bg-blue-50 border-[#1462ff] text-[#1462ff]'
                    : 'bg-white border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{field.label}</span>
              </button>
            ))}
          </div>

          {/* ========================================================= */}
          {/* Main Sections Accordion List (Matching Screenshot 2 & 3) */}
          {/* ========================================================= */}
          <div className="space-y-3 pt-2">
            
            {/* 1. Profil Section (Matching Screenshot 2) */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div 
                onClick={() => setProfilOpen(!profilOpen)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-300" />
                  <span className="font-bold text-sm text-gray-900">{isFr ? 'Profil' : 'النبذة المهنية'}</span>
                </div>
                <button className="p-1 rounded text-gray-500 hover:bg-gray-100">
                  {profilOpen ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

              {profilOpen && (
                <div className="p-4 pt-1 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-gray-500">
                      {isFr ? 'Présentez brièvement vos compétences clés et objectifs' : 'نبذة تسويقية تعكس مهاراتك وخبراتك'}
                    </span>
                    <button
                      onClick={generateAISummary}
                      className="px-2.5 py-1 rounded-md bg-blue-50 text-[#1462ff] hover:bg-blue-100 text-[11px] font-bold flex items-center gap-1 transition"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isFr ? 'Générer avec l’IA' : 'اقتراح بالذكاء الاصطناعي'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={cvData.personalInfo.summary || ''}
                    onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                    placeholder={isFr ? "Enseignant dévoué avec plus de 5 ans d'expérience..." : "مهندس برمجيات شغوف ومحترف..."}
                    className="w-full p-3 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs leading-relaxed text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                  />
                </div>
              )}
            </div>

            {/* 2. Formation Section (Matching Screenshot 2) */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div 
                onClick={() => setFormationOpen(!formationOpen)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-300" />
                  <span className="font-bold text-sm text-gray-900">{isFr ? 'Formation' : 'التعليم والمؤهلات'}</span>
                </div>
                <button className="p-1 rounded text-gray-500 hover:bg-gray-100">
                  {formationOpen ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

              {formationOpen && (
                <div className="p-4 pt-1 border-t border-gray-100 space-y-4">
                  {cvData.educations.map((edu, idx) => (
                    <div key={edu.id} className="p-3.5 rounded-lg border border-gray-200 bg-gray-50/50 space-y-2.5 relative group">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-gray-400"># {idx + 1}</span>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          placeholder={isFr ? "Diplôme (ex: Baccalauréat / Licence)" : "المؤهل الدراسي"}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs"
                        />
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          placeholder={isFr ? "Établissement / Université" : "الجامعة / الكلية"}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                          placeholder={isFr ? "Ville" : "المدينة"}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs"
                        />
                        <input
                          type="text"
                          value={edu.graduationDate}
                          onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })}
                          placeholder={isFr ? "Année d'obtention (ex: 2021)" : "سنة التخرج"}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs"
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={addEducation}
                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#1462ff]" />
                    <span>{isFr ? 'Ajouter une formation' : 'إضافة مؤهل دراسي'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. Expérience professionnelle Section (Matching Screenshot 2) */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div 
                onClick={() => setExperienceOpen(!experienceOpen)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-300" />
                  <span className="font-bold text-sm text-gray-900">{isFr ? 'Expérience professionnelle' : 'الخبرات المهنية'}</span>
                </div>
                <button className="p-1 rounded text-gray-500 hover:bg-gray-100">
                  {experienceOpen ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

              {experienceOpen && (
                <div className="p-4 pt-1 border-t border-gray-100 space-y-4">
                  {cvData.experiences.map((exp, idx) => (
                    <div key={exp.id} className="p-3.5 rounded-lg border border-gray-200 bg-gray-50/50 space-y-2.5">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-gray-400"># {idx + 1}</span>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                          placeholder={isFr ? "Poste occupé" : "المسمى الوظيفي"}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs font-semibold"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          placeholder={isFr ? "Entreprise / Employeur" : "اسم الشركة أو المنظمة"}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          placeholder={isFr ? "Date de début (ex: 2020)" : "تاريخ البدء"}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs"
                        />
                        <input
                          type="text"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          placeholder={isFr ? "Date de fin (ou en cours)" : "تاريخ الانتهاء"}
                          className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded text-xs"
                        />
                      </div>

                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                        placeholder={isFr ? "Responsabilités et réalisations clés..." : "المهام والإنجازات الرئيسية..."}
                        className="w-full p-2 bg-white border border-gray-200 rounded text-xs leading-relaxed"
                      />
                    </div>
                  ))}

                  <button
                    onClick={addExperience}
                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#1462ff]" />
                    <span>{isFr ? 'Ajouter une expérience' : 'إضافة خبرة عملية'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* 4. Compétences Section (Matching Screenshot 2) */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div 
                onClick={() => setCompetencesOpen(!competencesOpen)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-300" />
                  <span className="font-bold text-sm text-gray-900">{isFr ? 'Compétences' : 'المهارات'}</span>
                </div>
                <button className="p-1 rounded text-gray-500 hover:bg-gray-100">
                  {competencesOpen ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

              {competencesOpen && (
                <div className="p-4 pt-1 border-t border-gray-100 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cvData.skills.map((skill) => (
                      <div key={skill.id} className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                          className="bg-transparent font-medium text-xs text-gray-900 w-full focus:outline-none"
                        />
                        <button onClick={() => removeSkill(skill.id)} className="text-gray-400 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => addSkill(isFr ? 'Nouvelle compétence' : 'مهارة جديدة', 'متقدم')}
                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#1462ff]" />
                    <span>{isFr ? 'Ajouter une compétence' : 'إضافة مهارة'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Langues Section (Matching Screenshot 2 & 3) */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div 
                onClick={() => setLanguesOpen(!languesOpen)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-300" />
                  <span className="font-bold text-sm text-gray-900">{isFr ? 'Langues' : 'اللغات'}</span>
                </div>
                <button className="p-1 rounded text-gray-500 hover:bg-gray-100">
                  {languesOpen ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

              {languesOpen && (
                <div className="p-4 pt-1 border-t border-gray-100 space-y-3">
                  {cvData.languages.map((lang) => (
                    <div key={lang.id} className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={lang.name}
                        onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                        placeholder="Français / Anglais"
                        className="bg-transparent font-medium text-xs text-gray-900 flex-1 focus:outline-none"
                      />
                      <button onClick={() => removeLanguage(lang.id)} className="text-gray-400 hover:text-red-500">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => addLanguage(isFr ? 'Français' : 'العربية')}
                    className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-dashed border-gray-300 rounded-lg text-xs font-semibold text-gray-700 flex items-center justify-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#1462ff]" />
                    <span>{isFr ? 'Ajouter une langue' : 'إضافة لغة'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* 6. Centres d'intérêt Section (Matching Screenshot 3) */}
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div 
                onClick={() => setInterestsOpen(!interestsOpen)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50/70 transition"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-300" />
                  <span className="font-bold text-sm text-gray-900">{isFr ? 'Centres d’intérêt' : 'الاهتمامات والهوايات'}</span>
                </div>
                <button className="p-1 rounded text-gray-500 hover:bg-gray-100">
                  {interestsOpen ? <ChevronUp className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>

              {interestsOpen && (
                <div className="p-4 pt-1 border-t border-gray-100 space-y-2">
                  <input
                    type="text"
                    defaultValue="Lecture • Judo • Voyages"
                    placeholder="Ex: Lecture, Voyages, Sport..."
                    className="w-full p-2.5 bg-[#f9fafb] border border-gray-200 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Custom Sections Pills with + (Matching Screenshot 3) */}
          <div className="pt-2 space-y-2">
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Cours' },
                { label: 'Stages' },
                { label: 'Activités extra-professionnelles' },
                { label: 'Références' },
                { label: 'Qualités' },
                { label: 'Certificats' },
                { label: 'Réalisations' },
                { label: 'Signature' },
                { label: 'Bas de page' },
                { label: 'Rubrique personnalisée ⌵' }
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => alert(isFr ? `Rubrique "${pill.label}" ajoutée au CV !` : `تمت إضافة قسم "${pill.label}"!`)}
                  className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-400" />
                  <span>{pill.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Left Télécharger Button (Matching Screenshot 3) */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handlePrintDownload}
              className="px-6 py-2.5 rounded-lg bg-[#1462ff] hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{isFr ? 'Télécharger' : 'تحميل PDF'}</span>
            </button>
          </div>

        </div>

        {/* =========================================================== */}
        {/* RIGHT COLUMN: LIVE PREVIEW & BOTTOM TOOLBAR (Matching Screenshot 1, 2, 3) */}
        {/* =========================================================== */}
        <div className="w-full lg:w-1/2 bg-[#52565e] flex flex-col items-center justify-start p-4 sm:p-8 relative overflow-y-auto max-h-[calc(100vh-56px)]">
          
          {/* Scaled A4 Document Page */}
          <div className="w-full flex justify-center py-4">
            <div className="transform scale-[0.62] sm:scale-[0.72] md:scale-[0.8] xl:scale-[0.85] origin-top shadow-2xl transition-all duration-200">
              {renderTemplatePreview()}
            </div>
          </div>

          {/* --------------------------------------------------------- */}
          {/* DOCKED BOTTOM TOOLBAR (Exact Icons from Screenshot 1, 2, 3) */}
          {/* --------------------------------------------------------- */}
          <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 px-3 py-1.5 flex items-center gap-2 text-gray-700">
            
            {/* 1. Template Switcher (📄• ⌵) */}
            <div className="relative">
              <button
                onClick={() => setToolbarDropdown(toolbarDropdown === 'template' ? null : 'template')}
                className={`p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 transition text-xs font-semibold ${
                  toolbarDropdown === 'template' ? 'bg-blue-50 text-[#1462ff]' : ''
                }`}
                title="Choisir le modèle"
              >
                <div className="relative">
                  <FileText className="w-4 h-4" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1462ff] absolute -top-0.5 -right-0.5"></span>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {toolbarDropdown === 'template' && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 text-xs">
                  {templates.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        updateStyle({ templateId: t.id });
                        setToolbarDropdown(null);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between ${
                        cvData.style.templateId === t.id ? 'font-bold text-[#1462ff]' : 'text-gray-700'
                      }`}
                    >
                      <span>{t.label}</span>
                      {cvData.style.templateId === t.id && <Check className="w-3.5 h-3.5 text-[#1462ff]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 2. Font Switcher (Aa ⌵) */}
            <div className="relative">
              <button
                onClick={() => setToolbarDropdown(toolbarDropdown === 'font' ? null : 'font')}
                className={`p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 transition text-xs font-semibold ${
                  toolbarDropdown === 'font' ? 'bg-blue-50 text-[#1462ff]' : ''
                }`}
                title="Police d'écriture"
              >
                <span className="font-serif font-bold text-sm">Aa</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {toolbarDropdown === 'font' && (
                <div className="absolute bottom-full left-0 mb-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 text-xs">
                  {fonts.map(f => (
                    <button
                      key={f.id}
                      onClick={() => {
                        updateStyle({ fontFamily: f.id });
                        setToolbarDropdown(null);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between ${
                        cvData.style.fontFamily === f.id ? 'font-bold text-[#1462ff]' : 'text-gray-700'
                      }`}
                    >
                      <span>{f.label}</span>
                      {cvData.style.fontFamily === f.id && <Check className="w-3.5 h-3.5 text-[#1462ff]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Spacing Switcher (↕≡ ⌵) */}
            <div className="relative">
              <button
                onClick={() => setToolbarDropdown(toolbarDropdown === 'spacing' ? null : 'spacing')}
                className={`p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 transition text-xs font-semibold ${
                  toolbarDropdown === 'spacing' ? 'bg-blue-50 text-[#1462ff]' : ''
                }`}
                title="Espacement des lignes"
              >
                <AlignJustify className="w-4 h-4" />
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {toolbarDropdown === 'spacing' && (
                <div className="absolute bottom-full left-0 mb-2 w-36 bg-white rounded-xl shadow-2xl border border-gray-200 py-1.5 z-50 text-xs">
                  {(['compact', 'normal', 'relaxed'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        updateStyle({ spacing: s });
                        setToolbarDropdown(null);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-50 capitalize ${
                        cvData.style.spacing === s ? 'font-bold text-[#1462ff]' : 'text-gray-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 4. Columns / Margins (⊞ ⌵) */}
            <div className="relative">
              <button
                onClick={() => setToolbarDropdown(toolbarDropdown === 'margins' ? null : 'margins')}
                className={`p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1 transition text-xs font-semibold ${
                  toolbarDropdown === 'margins' ? 'bg-blue-50 text-[#1462ff]' : ''
                }`}
                title="Marges & Colonnes"
              >
                <Grid className="w-4 h-4" />
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {toolbarDropdown === 'margins' && (
                <div className="absolute bottom-full left-0 mb-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 text-xs px-3 space-y-2">
                  <p className="font-bold text-gray-500 text-[10px] uppercase">Forme de photo</p>
                  <div className="flex gap-2">
                    {(['circle', 'rounded', 'square', 'none'] as const).map(shape => (
                      <button
                        key={shape}
                        onClick={() => {
                          updateStyle({ avatarShape: shape });
                          setToolbarDropdown(null);
                        }}
                        className={`p-1.5 rounded border text-[10px] capitalize ${
                          cvData.style.avatarShape === shape ? 'border-[#1462ff] bg-blue-50 font-bold' : 'border-gray-200'
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Color Palette Picker (🪣 ⌵) */}
            <div className="relative">
              <button
                onClick={() => setToolbarDropdown(toolbarDropdown === 'color' ? null : 'color')}
                className={`p-2 rounded-lg hover:bg-gray-100 flex items-center gap-1.5 transition text-xs font-semibold ${
                  toolbarDropdown === 'color' ? 'bg-blue-50 text-[#1462ff]' : ''
                }`}
                title="Couleur du thème"
              >
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: cvData.style.primaryColor }}
                />
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {toolbarDropdown === 'color' && (
                <div className="absolute bottom-full right-0 mb-2 p-3 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 grid grid-cols-4 gap-2">
                  {colors.map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        updateStyle({ primaryColor: c });
                        setToolbarDropdown(null);
                      }}
                      className="w-6 h-6 rounded-full border-2 transition transform hover:scale-110 flex items-center justify-center"
                      style={{ 
                        backgroundColor: c,
                        borderColor: cvData.style.primaryColor === c ? '#000' : 'transparent'
                      }}
                    >
                      {cvData.style.primaryColor === c && <Check className="w-3 h-3 text-white" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 6. Fullscreen Icon (⛶) */}
            <button
              onClick={onGoToPreview}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition"
              title="Aperçu plein écran"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
