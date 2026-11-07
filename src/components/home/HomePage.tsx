import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Palette, 
  Download, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle2, 
  Star, 
  Layout, 
  Users, 
  Award,
  Zap, 
  Check,
  BookOpen,
  Crown,
  BadgeCheck,
  Code2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Mail,
  Briefcase,
  CheckSquare,
  Search,
  HelpCircle,
  User as UserIcon,
  MapPin,
  Clock,
  ExternalLink,
  Plus,
  Minus
} from 'lucide-react';
import { useCV } from '../../context/CVContext';
import { TemplateId } from '../../types/cv';

interface HomePageProps {
  onStartBuilder: () => void;
  onExploreTemplates: () => void;
  onOpenAuth: () => void;
  onGoToArticles?: () => void;
  onGoToPricing?: () => void;
  language?: 'fr' | 'ar';
  onLanguageChange?: (lang: 'fr' | 'ar') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onStartBuilder, 
  onExploreTemplates, 
  onOpenAuth,
  onGoToArticles,
  onGoToPricing,
  language = 'fr',
  onLanguageChange
}) => {
  const { updateStyle } = useCV();
  const isFr = language === 'fr';

  // Active feature tab for the smartphone section (Default to 'jobs' like Screenshot 4)
  const [activeFeatureTab, setActiveFeatureTab] = useState<'cv' | 'coverLetter' | 'jobs' | 'applications'>('jobs');

  // Carousel index for templates showcase
  const [templateCarouselIndex, setTemplateCarouselIndex] = useState(0);

  // Carousel index for reviews
  const [reviewCarouselIndex, setReviewCarouselIndex] = useState(0);

  // FAQ accordion open states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSelectTemplateAndBuild = (id: TemplateId) => {
    updateStyle({ templateId: id });
    onStartBuilder();
  };

  // Featured Templates exactly matching Screenshot 1 & 2
  const featuredTemplates = [
    {
      id: 'modern' as TemplateId,
      name: 'Aurélien Leroy',
      role: 'Traducteur / Relecteur',
      color: '#1a2b49',
      styleTag: 'Classique & Élégant',
      preview: 'aurelien'
    },
    {
      id: 'executive' as TemplateId,
      name: 'Sylvie Loiseau',
      role: 'Esthéticienne spa',
      color: '#00a8a8',
      styleTag: 'Moderne Turquoise',
      preview: 'sylvie'
    },
    {
      id: 'creative' as TemplateId,
      name: 'Sandrine Lacombe',
      role: 'Coiffeuse Pro Coupe',
      color: '#a3005a',
      styleTag: 'Créatif Magenta',
      preview: 'sandrine'
    },
    {
      id: 'classic' as TemplateId,
      name: 'Paul Smith',
      role: 'Elementary School Teacher',
      color: '#3b5998',
      styleTag: 'Minimaliste International',
      preview: 'paul'
    }
  ];

  // Reviews matching Screenshot 5
  const reviews = [
    {
      name: 'Moumen',
      rating: 5,
      date: 'Il y a 3 jours',
      text: "CV.fr m'a aidé à rédiger un curriculum vitae qui a de l'allure. En plus, il dispose de nombreuses fonctionnalités qui m'ont facilité la rédaction de ce dernier. Il m'a permis aussi de mettre en avant les points essentiels. Il dispose également de nombreux modèles à choisir ce qui convient à ton goût. Il offre aussi un modèle de lettre de motivation, des offres d'emploi et le suivi de ta candidature. En bref, cet outil est complet et..."
    },
    {
      name: 'Jean-Philippe Becking',
      rating: 5,
      date: 'Il y a 1 semaine',
      text: "Facile d'utilisation, choix des CV très bien et au final j'ai pu valider une formation."
    },
    {
      name: 'Pauline G.',
      rating: 5,
      date: 'Il y a 2 semaines',
      text: "Cette application m'a permis de faire mon CV sans faute d'orthographe et bien structuré. Ce qui m'a permis de décrocher plusieurs entretiens rapidement."
    },
    {
      name: 'Sarah Lacroix',
      rating: 5,
      date: 'Il y a 3 semaines',
      text: "Téléchargement instantané en PDF haute définition, mise en page impeccable acceptée par tous les systèmes ATS de recrutement."
    }
  ];

  const faqs = isFr ? [
    {
      q: "Comment créer et télécharger mon CV en PDF ?",
      a: "Il vous suffit de cliquer sur 'Créer un CV', de remplir les rubriques (expériences, compétences, formations) et de cliquer sur 'Télécharger le CV'. Votre document PDF prêt à l'emploi est généré immédiatement."
    },
    {
      q: "Mon CV est-il compatible avec les logiciels ATS des recruteurs ?",
      a: "Oui, à 100%. Tous nos modèles sont conçus avec des polices vectorielles et une hiérarchie sémantique parfaite pour être lus et analysés sans aucune erreur par les robots de recrutement ATS."
    },
    {
      q: "Puis-je modifier mon CV après l'avoir téléchargé ?",
      a: "Absolument. Vos données sont automatiquement conservées et vous pouvez rééditer votre CV à tout moment depuis n'importe quel appareil."
    },
    {
      q: "Quels sont les avantages de l'abonnement VIP ?",
      a: "L'abonnement VIP débloque tous les modèles premiums, supprime définitivement la marque de watermark, donne accès au générateur par IA illimité et vous attribue le badge officiel de vérification bleue."
    }
  ] : [
    {
      q: "كيف يمكنني إنشاء وتحميل سيرتي الذاتية بصيغة PDF؟",
      a: "ما عليك سوى الضغط على 'إنشاء سيرة ذاتية'، وملء معلوماتك (الخبرات، المهارات، المؤهلات)، ثم الضغط على 'تحميل السيرة الذاتية'. سيتم تصدير ملف PDF فائق الدقة وجاهز للطباعة فوراً."
    },
    {
      q: "هل القوالب متوافقة مع أنظمة الفرز الآلي (ATS)؟",
      a: "نعم 100%. صُممت جميع القوالب بهيكلية قياسية وخطوط مقروءة تضمن اجتياز السيرة الذاتية لبرمجيات الفرز والذكاء الاصطناعي لدى كبرى الشركات."
    },
    {
      q: "هل يمكنني تعديل سيرتي الذاتية لاحقاً؟",
      a: "نعم بالتأكيد، يتم حفظ بياناتك بأمان ويمكنك العودة وتحديث خبراتك أو تغيير القالب في أي وقت."
    },
    {
      q: "ما هي مميزات عضوية VIP وشارة التوثيق؟",
      a: "تتيح لك عضوية VIP استخدام كافة القوالب الفاخرة بدون علامة مائية نهائياً، مع توليد نصوص غير محدود بالذكاء الاصطناعي وشارة التوثيق الزرقاء لتعزيز موثوقيتك."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Matching Screenshot 1) */}
      {/* ======================================================== */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 text-center px-4 max-w-5xl mx-auto">
        
        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-950 font-serif leading-tight">
          {isFr ? 'Créez votre CV professionnel' : 'أنشئ سيرتك الذاتية الاحترافية'}
        </h1>

        {/* Subtitle */}
        <p className="mt-5 sm:mt-6 text-base sm:text-xl text-gray-500 font-normal max-w-2xl mx-auto leading-relaxed">
          {isFr 
            ? 'Remplissez le formulaire, choisissez un modèle et téléchargez votre CV en quelques minutes.'
            : 'املأ بياناتك، اختر قالباً احترافياً، وحمّل سيرتك الذاتية في دقائق معدودة.'
          }
        </p>

        {/* Hero CTA Button (Bright Solid Blue matching Screenshot 1) */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onStartBuilder}
            className="px-9 py-3.5 bg-[#1462ff] hover:bg-blue-700 text-white font-semibold text-base sm:text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {isFr ? 'Créer un CV' : 'إنشاء سيرة ذاتية'}
          </button>
        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. CV TEMPLATES CAROUSEL SHOWCASE (Matching Screenshot 1 & 2) */}
      {/* ======================================================== */}
      <section className="relative pb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
          
          {/* Templates Slider Container */}
          <div className="relative group">
            
            {/* Left Carousel Navigation Button */}
            <button
              onClick={() => setTemplateCarouselIndex(Math.max(0, templateCarouselIndex - 1))}
              disabled={templateCarouselIndex === 0}
              className={`absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#2f3542] hover:bg-black text-white flex items-center justify-center shadow-2xl transition disabled:opacity-20 disabled:cursor-not-allowed`}
              aria-label="Previous template"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Carousel Navigation Button */}
            <button
              onClick={() => setTemplateCarouselIndex(Math.min(featuredTemplates.length - 3, templateCarouselIndex + 1))}
              disabled={templateCarouselIndex >= featuredTemplates.length - 3}
              className={`absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#2f3542] hover:bg-black text-white flex items-center justify-center shadow-2xl transition disabled:opacity-20 disabled:cursor-not-allowed`}
              aria-label="Next template"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Template Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
              
              {/* Template 1: Aurélien Leroy (Matching Screenshot 1 & 2) */}
              <div 
                className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden group/card hover:shadow-2xl transition-all duration-300 relative cursor-pointer"
                onClick={() => handleSelectTemplateAndBuild('modern')}
              >
                {/* Header Banner Navy */}
                <div className="bg-[#1a2b49] text-white p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-xl tracking-tight">Aurélien Leroy</h3>
                    <div className="flex items-center gap-3 text-[11px] text-gray-300 mt-1">
                      <span>demo@example.com</span>
                      <span>•</span>
                      <span>2 rue des écoles, 72000 Le Mans</span>
                    </div>
                  </div>
                </div>

                {/* Body Content 2-Columns */}
                <div className="p-5 grid grid-cols-12 gap-4 text-[11px] text-gray-700 bg-white">
                  
                  {/* Left Column */}
                  <div className="col-span-8 space-y-3.5 pr-2 border-r border-gray-100">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
                        alt="Aurélien Leroy"
                        className="w-14 h-16 object-cover rounded shadow-sm border border-gray-200"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wide">Profil</h4>
                        <p className="text-[10px] text-gray-600 line-clamp-3 leading-snug">
                          Traducteur de l'allemand et de l'anglais vers le français depuis 10 ans, spécialisé dans l'électronique. Mon expérience couvre la rédaction de supports marketing.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wide mb-1 border-b border-gray-200 pb-0.5">Expérience professionnelle</h4>
                      <div className="space-y-1.5">
                        <div>
                          <p className="font-bold text-gray-800 text-[11px]">Traducteur / Relecteur</p>
                          <p className="text-[9px] text-gray-500">InIndustries • janv. 2015 - ce jour</p>
                          <p className="text-[9px] text-gray-600">Rédaction de documents marketing, contrôle qualité et localisation.</p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-[11px]">Relecteur Web</p>
                          <p className="text-[9px] text-gray-500">janv. 2013 - déc. 2014</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wide mb-1 border-b border-gray-200 pb-0.5">Formation</h4>
                      <p className="font-bold text-gray-800 text-[11px]">Master 2 Traduction et Interprétation</p>
                      <p className="text-[9px] text-gray-500">Université de Strasbourg • 2008 - 2010</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-span-4 space-y-3 pl-1">
                    <div>
                      <h4 className="font-bold text-[10px] text-gray-900 uppercase tracking-wide mb-0.5">Informations</h4>
                      <p className="text-[9px] text-gray-600">Sexe: Homme</p>
                      <p className="text-[9px] text-gray-600">Permis: B</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[10px] text-gray-900 uppercase tracking-wide mb-0.5">Langues</h4>
                      <p className="text-[9px] text-gray-600">Français (Natif)</p>
                      <p className="text-[9px] text-gray-600">Allemand (Courant)</p>
                      <p className="text-[9px] text-gray-600">Anglais (Professionnel)</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[10px] text-gray-900 uppercase tracking-wide mb-0.5">Compétences</h4>
                      <p className="text-[9px] text-gray-600">Microsoft Office</p>
                      <p className="text-[9px] text-gray-600">SDL Trados</p>
                      <p className="text-[9px] text-gray-600">Gestion de projet</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[10px] text-gray-900 uppercase tracking-wide mb-0.5">Centres d'intérêt</h4>
                      <p className="text-[9px] text-gray-600">Lecture • Judo • Voyages</p>
                    </div>
                  </div>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button 
                    onClick={() => handleSelectTemplateAndBuild('modern')}
                    className="px-6 py-2.5 bg-white text-[#1462ff] font-bold text-sm rounded-lg shadow-lg hover:bg-gray-100 transition"
                  >
                    {isFr ? 'Choisir ce modèle' : 'استخدام هذا النموذج'}
                  </button>
                </div>
              </div>

              {/* Template 2: Sylvie Loiseau (Matching Screenshot 1 & 2) */}
              <div 
                className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden group/card hover:shadow-2xl transition-all duration-300 relative cursor-pointer"
                onClick={() => handleSelectTemplateAndBuild('executive')}
              >
                {/* Header Banner Curved Teal */}
                <div className="bg-[#00a8a8] text-white pt-5 pb-8 px-5 text-center relative">
                  <h3 className="font-bold text-xl tracking-tight">Sylvie Loiseau</h3>
                  
                  {/* Circular Avatar Floating */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
                      alt="Sylvie Loiseau"
                      className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
                    />
                  </div>
                </div>

                {/* Body Content */}
                <div className="pt-9 p-5 grid grid-cols-12 gap-3 text-[11px] text-gray-700 bg-white">
                  
                  {/* Left Column */}
                  <div className="col-span-5 space-y-3 pr-2 border-r border-teal-100">
                    <div>
                      <h4 className="font-bold text-[10px] text-[#00a8a8] uppercase tracking-wide mb-1">Informations</h4>
                      <p className="text-[9px] text-gray-600">fr@example.com</p>
                      <p className="text-[9px] text-gray-600">0623845102</p>
                      <p className="text-[9px] text-gray-600">14, rue des rosiers, Tours</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[10px] text-[#00a8a8] uppercase tracking-wide mb-1">Compétences</h4>
                      <div className="space-y-1 text-[9px]">
                        <div className="flex justify-between items-center">
                          <span>Soins visage</span>
                          <span className="text-[#00a8a8]">●●●●●</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Modelage</span>
                          <span className="text-[#00a8a8]">●●●●●</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Vente</span>
                          <span className="text-[#00a8a8]">●●●●○</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[10px] text-[#00a8a8] uppercase tracking-wide mb-0.5">Qualités</h4>
                      <p className="text-[9px] text-gray-600">■ Dynamique</p>
                      <p className="text-[9px] text-gray-600">■ Ponctuelle</p>
                      <p className="text-[9px] text-gray-600">■ Souriante</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-[10px] text-[#00a8a8] uppercase tracking-wide mb-0.5">Centres d'intérêt</h4>
                      <p className="text-[9px] text-gray-600">Yoga • Danse contemporaine</p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="col-span-7 space-y-3 pl-1">
                    <div>
                      <h4 className="font-bold text-xs text-[#00a8a8] uppercase tracking-wide mb-0.5">Profil</h4>
                      <p className="text-[9px] text-gray-600 leading-snug">
                        Esthéticienne expérimentée (15 ans) ayant exercé en spa et en institut de beauté, j'ai une connaissance approfondie des soins et de la gestion clientèle.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-[#00a8a8] uppercase tracking-wide mb-1">Expérience professionnelle</h4>
                      <div className="space-y-1.5">
                        <div>
                          <p className="font-bold text-gray-800 text-[10px]">Esthéticienne spa</p>
                          <p className="text-[8px] text-gray-500">BellaDerm, Tours • oct. 2010 - ce jour</p>
                          <p className="text-[9px] text-gray-600">• Réalisation de soins minceur & gommages</p>
                          <p className="text-[9px] text-gray-600">• Conseil et fidélisation des clientes</p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-[10px]">Esthéticienne</p>
                          <p className="text-[8px] text-gray-500">sept. 2005 - sept. 2010</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-[#00a8a8] uppercase tracking-wide mb-0.5">Formation</h4>
                      <p className="font-bold text-gray-800 text-[10px]">BTS esthétique-cosmétique-parfumerie</p>
                      <p className="text-[8px] text-gray-500">Lycée polyvalent privé de Touraine • 2005</p>
                    </div>
                  </div>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button 
                    onClick={() => handleSelectTemplateAndBuild('executive')}
                    className="px-6 py-2.5 bg-white text-[#00a8a8] font-bold text-sm rounded-lg shadow-lg hover:bg-gray-100 transition"
                  >
                    {isFr ? 'Choisir ce modèle' : 'استخدام هذا النموذج'}
                  </button>
                </div>
              </div>

              {/* Template 3: Sandrine Lacombe (Matching Screenshot 1 & 2) */}
              <div 
                className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden group/card hover:shadow-2xl transition-all duration-300 relative cursor-pointer hidden lg:block"
                onClick={() => handleSelectTemplateAndBuild('creative')}
              >
                {/* Header Minimal Magenta Accent */}
                <div className="p-5 flex items-start justify-between border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#a3005a] text-white font-bold flex items-center justify-center text-xs rounded-sm">
                      CV
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#a3005a] tracking-tight">Sandrine Lacombe</h3>
                      <p className="text-[10px] text-gray-500">sandrinelacombe@example.com • 0623845102</p>
                    </div>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" 
                    alt="Sandrine Lacombe"
                    className="w-12 h-14 object-cover rounded shadow-sm border border-gray-200"
                  />
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3 text-[11px] text-gray-700 bg-white">
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wide mb-1 border-b border-gray-200 pb-0.5">Formation</h4>
                    <div className="space-y-1">
                      <p className="font-bold text-gray-800 text-[10px]">Baccalauréat professionnel Métiers de la coiffure</p>
                      <p className="text-[8px] text-gray-500">Lycée professionnel Benoit Charvet • 2015 - 2017</p>
                      <p className="font-bold text-gray-800 text-[10px]">CAP Coiffure</p>
                      <p className="text-[8px] text-gray-500">2012 - 2014</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-gray-900 uppercase tracking-wide mb-1 border-b border-gray-200 pb-0.5">Expérience professionnelle</h4>
                    <div>
                      <p className="font-bold text-gray-800 text-[10px]">Coiffeuse</p>
                      <p className="text-[8px] text-gray-500">Pro Coupe, Saint-Étienne • sept. 2017 - ce jour</p>
                      <p className="text-[9px] text-gray-600">• Accueil, conseil et encaissement des clients</p>
                      <p className="text-[9px] text-gray-600">• Réalisation de coupes féminines et masculines</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
                    <div>
                      <h4 className="font-bold text-[10px] text-gray-900 uppercase tracking-wide mb-0.5">Compétences</h4>
                      <p className="text-[9px] text-gray-600">Sens commercial: Excellent</p>
                      <p className="text-[9px] text-gray-600">Coiffures cérémonie: Excellent</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[10px] text-gray-900 uppercase tracking-wide mb-0.5">Qualités</h4>
                      <p className="text-[9px] text-gray-600">Bon relationnel • Patience</p>
                    </div>
                  </div>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-[#a3005a]/60 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button 
                    onClick={() => handleSelectTemplateAndBuild('creative')}
                    className="px-6 py-2.5 bg-white text-[#a3005a] font-bold text-sm rounded-lg shadow-lg hover:bg-gray-100 transition"
                  >
                    {isFr ? 'Choisir ce modèle' : 'استخدام هذا النموذج'}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. COMMENT ÇA MARCHE ? SECTION (Matching Screenshot 3) */}
      {/* ======================================================== */}
      <section className="py-20 bg-gray-50/60 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Section Heading */}
          <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-950 font-serif mb-16">
            {isFr ? 'Comment ça marche ?' : 'كيف يعمل الموقع؟'}
          </h2>

          {/* 3 Steps in a Row (Matching Screenshot 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-16 text-left">
            
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 bg-white shadow-2xs">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {isFr ? 'Remplissez vos infos' : 'املأ معلوماتك'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-13">
                {isFr 
                  ? 'Vous commencez par saisir vos infos qui constituent le contenu de votre CV.'
                  : 'ابدأ بإدخال بياناتك الشخصية وخبراتك التي تشكل محتوى سيرتك الذاتية.'
                }
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 bg-white shadow-2xs">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {isFr ? 'Choisissez un modèle' : 'اختر قالباً'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-13">
                {isFr 
                  ? 'Choisissez un modèle de CV et personnalisez-le en fonction de votre personnalité et style.'
                  : 'اختر قالباً من بين مجموعة واسعة من النماذج وخصصه بما يناسبك.'
                }
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700 bg-white shadow-2xs">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {isFr ? 'Télécharger le CV' : 'حمّل سيرتك الذاتية'}
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-13">
                {isFr 
                  ? 'Téléchargez votre CV immédiatement et modifiez-le à tout moment. Simplissime !'
                  : 'حمّل سيرتك الذاتية بصيغة PDF فوراً وعدّلها في أي وقت. في غاية السهولة!'
                }
              </p>
            </div>

          </div>

          {/* Interactive CV Builder Software Mockup (Matching Screenshot 3) */}
          <div className="rounded-2xl border border-gray-300/80 shadow-2xl overflow-hidden bg-white max-w-4xl mx-auto">
            
            {/* Dark Slate Window Header */}
            <div className="bg-[#6b7280] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onStartBuilder}
                  className="p-1 hover:bg-gray-600 rounded transition"
                  title="Retour"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-200" />
                </button>
                <span className="font-semibold text-sm">Curriculum vitae</span>
              </div>

              {/* Blue Download Icon Button */}
              <button 
                onClick={onStartBuilder}
                className="bg-[#1462ff] hover:bg-blue-700 p-2 rounded text-white shadow-sm transition"
                title="Télécharger"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Split Screen Application Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 bg-gray-50 min-h-[320px]">
              
              {/* Left Form Accordion Tabs */}
              <div className="md:col-span-5 p-5 space-y-3 border-r border-gray-200 bg-white">
                <div className="p-3 rounded-lg border border-gray-200 bg-gray-50/70 flex items-center justify-between cursor-pointer hover:bg-gray-100/70 transition">
                  <span className="font-medium text-xs text-gray-800">Informations personnelles</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                <div className="p-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
                  <span className="font-medium text-xs text-gray-800">Profil</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                <div className="p-3 rounded-lg border border-gray-200 bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
                  <span className="font-medium text-xs text-gray-800">Expérience professionnelle</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                <div className="pt-4">
                  <button
                    onClick={onStartBuilder}
                    className="w-full py-2 bg-[#1462ff] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                  >
                    {isFr ? 'Ouvrir l’éditeur interactif' : 'فتح محرر السيرة الذاتية'}
                  </button>
                </div>
              </div>

              {/* Right Floating Preview Document Card (Paul Smith matching Screenshot 3) */}
              <div className="md:col-span-7 p-6 flex items-center justify-center bg-gray-100/80">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-sm w-full overflow-hidden">
                  
                  {/* Card Header Slate Blue */}
                  <div className="bg-[#4a6b82] text-white p-4 flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" 
                      alt="Paul Smith"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                      <h4 className="font-bold text-sm">Paul Smith</h4>
                      <p className="text-[10px] text-blue-100">Elementary School Teacher</p>
                    </div>
                  </div>

                  {/* Card Snippet */}
                  <div className="p-4 space-y-2 text-[11px] text-gray-700">
                    <div>
                      <h5 className="font-bold text-[10px] text-gray-900 uppercase">Profil</h5>
                      <p className="text-[10px] text-gray-600 line-clamp-3 leading-snug">
                        Caring and compassionate elementary school teacher with 5+ years of experience and Arizona State Educator License. Improved student test scores by 20% and pass rate by 30% in one year.
                      </p>
                    </div>

                    <div className="pt-1 border-t border-gray-100">
                      <h5 className="font-bold text-[10px] text-gray-900 uppercase">Expérience professionnelle</h5>
                      <p className="font-semibold text-gray-800 text-[10px]">Lead 3rd Grade Teacher</p>
                      <p className="text-[9px] text-gray-500">Lincoln Elementary School • 2020 - Present</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SERVICES & SMARTPHONE MOCKUP (Matching Screenshot 4) */}
      {/* ======================================================== */}
      <section id="features-phone-section" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Interactive Feature List (Matching Screenshot 4) */}
            <div className="lg:col-span-6 space-y-8">
              
              {/* Feature 1: CV */}
              <div 
                onClick={() => setActiveFeatureTab('cv')}
                className={`flex items-start gap-4 cursor-pointer p-4 rounded-2xl transition duration-200 ${
                  activeFeatureTab === 'cv' ? 'bg-blue-50/60' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition ${
                  activeFeatureTab === 'cv' 
                    ? 'border-2 border-[#1462ff] text-[#1462ff] bg-white shadow-sm' 
                    : 'border border-gray-300 text-gray-500 bg-white'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${activeFeatureTab === 'cv' ? 'text-[#1462ff]' : 'text-gray-900'}`}>
                    CV
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {isFr 
                      ? 'Créez de manière illimitée de nouveaux CV et modifiez-les à tout moment.'
                      : 'أنشئ عدداً غير محدود من السير الذاتية وعدّلها في أي لحظة.'
                    }
                  </p>
                </div>
              </div>

              {/* Feature 2: Lettre de motivation */}
              <div 
                onClick={() => setActiveFeatureTab('coverLetter')}
                className={`flex items-start gap-4 cursor-pointer p-4 rounded-2xl transition duration-200 ${
                  activeFeatureTab === 'coverLetter' ? 'bg-blue-50/60' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition ${
                  activeFeatureTab === 'coverLetter' 
                    ? 'border-2 border-[#1462ff] text-[#1462ff] bg-white shadow-sm' 
                    : 'border border-gray-300 text-gray-500 bg-white'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${activeFeatureTab === 'coverLetter' ? 'text-[#1462ff]' : 'text-gray-900'}`}>
                    {isFr ? 'Lettre de motivation' : 'خطاب التغطية'}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {isFr 
                      ? 'Écrivez facilement des lettres de motivation professionnelles.'
                      : 'صمم واكتب رسائل تحفيزية احترافية تتوافق مع سيرتك.'
                    }
                  </p>
                </div>
              </div>

              {/* Feature 3: Offres d'emplois (Active State in Screenshot 4) */}
              <div 
                onClick={() => setActiveFeatureTab('jobs')}
                className={`flex items-start gap-4 cursor-pointer p-4 rounded-2xl transition duration-200 ${
                  activeFeatureTab === 'jobs' ? 'bg-blue-50/60' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition ${
                  activeFeatureTab === 'jobs' 
                    ? 'border-2 border-[#1462ff] text-[#1462ff] bg-white shadow-sm' 
                    : 'border border-gray-300 text-gray-500 bg-white'
                }`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${activeFeatureTab === 'jobs' ? 'text-[#1462ff]' : 'text-gray-900'}`}>
                    {isFr ? 'Offres d’emplois' : 'فرص العمل'}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {isFr 
                      ? 'Soyez informés automatiquement des offres d’emploi pertinentes pour vous.'
                      : 'احصل على إشعارات بفرص العمل الملائمة لمجالك وتخصصك.'
                    }
                  </p>
                </div>
              </div>

              {/* Feature 4: Candidatures */}
              <div 
                onClick={() => setActiveFeatureTab('applications')}
                className={`flex items-start gap-4 cursor-pointer p-4 rounded-2xl transition duration-200 ${
                  activeFeatureTab === 'applications' ? 'bg-blue-50/60' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition ${
                  activeFeatureTab === 'applications' 
                    ? 'border-2 border-[#1462ff] text-[#1462ff] bg-white shadow-sm' 
                    : 'border border-gray-300 text-gray-500 bg-white'
                }`}>
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${activeFeatureTab === 'applications' ? 'text-[#1462ff]' : 'text-gray-900'}`}>
                    {isFr ? 'Candidatures' : 'إدارة طلبات التوظيف'}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {isFr 
                      ? 'Organisez toutes vos candidatures de manière claire.'
                      : 'تابع ونظم جميع طلباتك ومقابلاتك الوظيفية في مكان واحد وبشكل منظم.'
                    }
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Realistic Smartphone Mockup (Matching Screenshot 4) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-[340px] sm:w-[380px] bg-black rounded-[48px] p-4 shadow-2xl border-4 border-gray-800 relative">
                
                {/* Speaker Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-gray-900 rounded-full z-20 flex items-center justify-center">
                  <div className="w-12 h-1 bg-gray-800 rounded-full"></div>
                </div>

                {/* Smartphone Display Screen */}
                <div className="bg-white rounded-[38px] overflow-hidden pt-8 pb-6 px-4 min-h-[560px] flex flex-col justify-between">
                  
                  {/* Dynamic Content based on activeFeatureTab */}
                  {activeFeatureTab === 'jobs' && (
                    <div className="space-y-4">
                      
                      {/* Top Bar matching Screenshot 4 */}
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <span className="font-bold text-base text-gray-950">Offres d’emploi</span>
                        <div className="flex items-center gap-2.5 text-gray-600">
                          <HelpCircle className="w-4 h-4 text-gray-500 cursor-pointer" />
                          <UserIcon className="w-4 h-4 text-gray-500 cursor-pointer" />
                        </div>
                      </div>

                      {/* Search Bar matching Screenshot 4 */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800">
                          Boston
                        </div>
                        <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800 flex items-center gap-1">
                          <span>+ 5KM</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                        <button className="px-4 py-2 bg-[#1462ff] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm">
                          Search
                        </button>
                      </div>

                      {/* Job Card 1: Amazon (Matching Screenshot 4) */}
                      <div className="p-3.5 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-2xs space-y-2">
                        <div className="flex items-start gap-3">
                          {/* Amazon Icon */}
                          <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-1.5 shrink-0">
                            <span className="font-black text-xl text-gray-900 tracking-tighter">a<span className="text-amber-500 font-extrabold text-sm">~</span></span>
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-gray-900">Store Manager</h4>
                            <p className="text-[11px] text-gray-500 font-medium">Amazon Retail</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-snug line-clamp-3">
                          Join the Amazon retail team that launched Amazon Books and Amazon 4-star. We provide a unique extension of Amazon.com.
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium pt-1 border-t border-gray-100">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            Boston
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            1 day ago
                          </span>
                        </div>
                      </div>

                      {/* Job Card 2: McDonald's (Matching Screenshot 4) */}
                      <div className="p-3.5 rounded-xl border border-gray-200 hover:border-blue-300 transition bg-white shadow-2xs space-y-2">
                        <div className="flex items-start gap-3">
                          {/* McDonald's Icon (Golden arches on green) */}
                          <div className="w-10 h-10 rounded-lg bg-[#006233] flex items-center justify-center shrink-0">
                            <span className="font-extrabold text-2xl text-[#ffbc0d] leading-none font-serif">M</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-gray-900">Payroll and Benefits Analyst</h4>
                            <p className="text-[11px] text-gray-500 font-medium">McDonald's</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-snug line-clamp-3">
                          McDonald's is proud to be one of the most recognized brands in the world, with restaurants in over 100 countries that serve 70 million customers daily.
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium pt-1 border-t border-gray-100">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            Boston
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            2 days ago
                          </span>
                        </div>
                      </div>

                    </div>
                  )}

                  {activeFeatureTab === 'cv' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <span className="font-bold text-base text-gray-950">Mes CV</span>
                        <span className="text-[10px] bg-blue-100 text-[#1462ff] px-2 py-0.5 rounded-full font-bold">3 modèles</span>
                      </div>
                      <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#1462ff] text-white flex items-center justify-center font-bold">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs text-gray-900">CV Ingénieur Senior</h4>
                            <p className="text-[10px] text-gray-500">Mis à jour hier</p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#1462ff] h-full w-[95%]"></div>
                        </div>
                        <p className="text-[10px] text-emerald-600 font-bold">Score ATS: 95% (Excellent)</p>
                      </div>
                      <button 
                        onClick={onStartBuilder}
                        className="w-full py-2.5 bg-[#1462ff] text-white rounded-lg text-xs font-bold shadow-sm"
                      >
                        Télécharger en PDF
                      </button>
                    </div>
                  )}

                  {activeFeatureTab === 'coverLetter' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <span className="font-bold text-base text-gray-950">Lettre de motivation</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">AI Assistant</span>
                      </div>
                      <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50 text-[11px] text-gray-700 space-y-2">
                        <p className="font-bold text-gray-900">Objet : Candidature au poste de Store Manager</p>
                        <p className="text-gray-600 line-clamp-4">
                          Madame, Monsieur, Fort de plus de cinq années d'expérience en gestion de points de vente et en animation d'équipes commerciales, je souhaite vous présenter ma candidature...
                        </p>
                      </div>
                      <button 
                        onClick={onStartBuilder}
                        className="w-full py-2.5 bg-[#1462ff] text-white rounded-lg text-xs font-bold shadow-sm"
                      >
                        Générer avec l’IA
                      </button>
                    </div>
                  )}

                  {activeFeatureTab === 'applications' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <span className="font-bold text-base text-gray-950">Suivi Candidatures</span>
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold">5 actives</span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-gray-900">Amazon Retail</p>
                            <p className="text-[10px] text-gray-500">Store Manager</p>
                          </div>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            Entretien prévu
                          </span>
                        </div>
                        <div className="p-3 rounded-lg border border-gray-200 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-bold text-gray-900">McDonald's</p>
                            <p className="text-[10px] text-gray-500">Payroll Analyst</p>
                          </div>
                          <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                            Postulé
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Smartphone Home Indicator Bar */}
                  <div className="pt-4 flex justify-center">
                    <div className="w-28 h-1 bg-gray-300 rounded-full"></div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. ÉVALUATIONS SECTION (DARK THEME matching Screenshot 5) */}
      {/* ======================================================== */}
      <section className="py-24 bg-[#181a20] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Centered Heading */}
          <h2 className="text-4xl sm:text-5xl font-bold font-serif tracking-tight mb-4 text-white">
            {isFr ? 'Évaluations' : 'آراء وتقييمات العملاء'}
          </h2>

          {/* Rating Summary (4,3 / 5 with 5 blue stars matching Screenshot 5) */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">4,3 / 5</span>
            <div className="flex items-center gap-1 text-[#4f70e7]">
              <Star className="w-6 h-6 fill-[#4f70e7]" />
              <Star className="w-6 h-6 fill-[#4f70e7]" />
              <Star className="w-6 h-6 fill-[#4f70e7]" />
              <Star className="w-6 h-6 fill-[#4f70e7]" />
              <Star className="w-6 h-6 fill-[#4f70e7]/30 text-[#4f70e7]" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm font-normal mb-14">
            {isFr ? 'Basé sur 21 147 avis' : 'بناءً على أكثر من 21,147 تقييماً موثقاً'}
          </p>

          {/* Reviews Carousel Slider (Matching Screenshot 5) */}
          <div className="relative max-w-5xl mx-auto">
            
            {/* Left Carousel Arrow */}
            <button
              onClick={() => setReviewCarouselIndex(Math.max(0, reviewCarouselIndex - 1))}
              disabled={reviewCarouselIndex === 0}
              className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2d323b] hover:bg-black text-white flex items-center justify-center shadow-xl transition disabled:opacity-20"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Carousel Arrow */}
            <button
              onClick={() => setReviewCarouselIndex(Math.min(reviews.length - 2, reviewCarouselIndex + 1))}
              disabled={reviewCarouselIndex >= reviews.length - 2}
              className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#2d323b] hover:bg-black text-white flex items-center justify-center shadow-xl transition disabled:opacity-20"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Testimonials Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {reviews.map((rev, idx) => (
                <div 
                  key={idx}
                  className="bg-[#21242d] p-6 rounded-2xl border border-gray-800/80 shadow-lg flex flex-col justify-between space-y-4 hover:border-gray-700 transition"
                >
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg text-white">{rev.name}</h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-normal">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[#4f70e7] pt-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#4f70e7]" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. FAQ SECTION (Accordion) */}
      {/* ======================================================== */}
      <section id="faq-section" className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-950 font-serif mb-12">
            {isFr ? 'Foire aux questions (FAQ)' : 'الأسئلة الشائعة'}
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-gray-200 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 font-semibold text-sm sm:text-base text-gray-900 bg-white hover:bg-gray-50 flex items-center justify-between transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <Minus className="w-4 h-4 text-[#1462ff] shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 pt-1 text-sm text-gray-600 bg-white leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. ARTICLES & VIP CALLOUTS */}
      {/* ======================================================== */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* VIP Card */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                    <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </span>
                  <span className="font-bold text-sm text-gray-900">{isFr ? 'Abonnement VIP & Badge Officiel' : 'باقات VIP وشارة التوثيق'}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {isFr 
                    ? 'Débloquez tous les modèles premiums, supprimez les filigranes et obtenez le badge de vérification bleue sur votre profil.'
                    : 'احصل على كافة القوالب الفاخرة بدون علامة مائية، مع شارة التوثيق الزرقاء الرسمية لتعزيز ثقة مديري التوظيف.'
                  }
                </p>
              </div>
              {onGoToPricing && (
                <button
                  onClick={onGoToPricing}
                  className="w-full py-2.5 bg-[#1462ff] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition"
                >
                  {isFr ? 'Voir les tarifs VIP' : 'استكشف باقات VIP'}
                </button>
              )}
            </div>

            {/* Articles API Card */}
            <div className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-100 text-[#1462ff]">
                    <BookOpen className="w-4 h-4" />
                  </span>
                  <span className="font-bold text-sm text-gray-900">{isFr ? 'Conseils & Partage API / Blogger' : 'المقالات ومشاركة API / بلوجر'}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {isFr 
                    ? 'Guides de rédaction rédigés par des experts RH, avec intégration API REST et widget dédié pour Google Blogger.'
                    : 'أدلة وإرشادات توظيف معتمدة، مع إمكانية مشاركة المقالات برمجياً عبر API وكود مخصص لمدونات بلوجر.'
                  }
                </p>
              </div>
              {onGoToArticles && (
                <button
                  onClick={onGoToArticles}
                  className="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-semibold text-xs rounded-lg transition"
                >
                  {isFr ? 'Lire les articles & API' : 'تصفح المقالات والـ API'}
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. BOTTOM CTA BANNER */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#1462ff] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold font-serif">
            {isFr ? 'Prêt à décrocher le job de vos rêves ?' : 'جاهز للبدء في خطوتك المهنية القادمة؟'}
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {isFr 
              ? 'Rejoignez plus de 21 000 candidats qui ont créé leur CV professionnel avec succès.'
              : 'انضم إلى آلاف المستخدمين الذين أنشأوا سيرهم الذاتية الاحترافية بنجاح واجتازوا مقابلات التوظيف.'
            }
          </p>
          <div className="pt-2">
            <button
              onClick={onStartBuilder}
              className="px-9 py-3.5 bg-white text-[#1462ff] hover:bg-gray-100 font-bold text-base rounded-lg shadow-xl transition"
            >
              {isFr ? 'Créer mon CV maintenant' : 'أنشئ سيرتك الذاتية الآن'}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
