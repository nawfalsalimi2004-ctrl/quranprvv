import React, { useState } from 'react';
import { 
  FileText, 
  Palette, 
  Eye, 
  ShieldCheck, 
  User as UserIcon, 
  LogIn, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  Download,
  BookOpen,
  Crown,
  BadgeCheck,
  ChevronDown,
  Briefcase,
  Mail,
  CheckSquare,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCV } from '../../context/CVContext';

interface NavbarProps {
  activeTab: 'home' | 'builder' | 'appearance' | 'preview' | 'articles' | 'pricing' | 'admin';
  setActiveTab: (tab: 'home' | 'builder' | 'appearance' | 'preview' | 'articles' | 'pricing' | 'admin') => void;
  openAuthModal: () => void;
  language?: 'fr' | 'ar';
  onLanguageChange?: (lang: 'fr' | 'ar') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  openAuthModal,
  language = 'fr',
  onLanguageChange
}) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { score } = useCV();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const isFr = language === 'fr';

  const scrollToFAQ = () => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('faq-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Logo (CV.FR Style matching Screenshot 1 & 2) */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group select-none" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-8 h-8 rounded-md bg-[#1462ff] flex items-center justify-center text-white shadow-sm transition transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <path 
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" 
                  fill="white" 
                />
                <path 
                  d="M14 2v6h6" 
                  fill="#1462ff" 
                />
              </svg>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-gray-950 font-sans">
              CV.FR
            </span>
          </div>

          {/* Desktop Navigation Links (Center matching Screenshot 1 & 2) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] font-medium text-gray-700">
            
            {/* Outils / Tools Dropdown */}
            <div className="relative" onMouseLeave={() => setToolsDropdownOpen(false)}>
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className={`flex items-center gap-1.5 transition py-2 ${
                  toolsDropdownOpen ? 'text-[#1462ff] font-semibold' : 'hover:text-gray-950'
                }`}
              >
                <span>{isFr ? 'Outils' : 'الأدوات'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsDropdownOpen ? 'rotate-180 text-[#1462ff]' : 'text-gray-400'}`} />
              </button>

              {toolsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                >
                  <button
                    onClick={() => {
                      setActiveTab('builder');
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1462ff] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900">{isFr ? 'Créateur de CV' : 'محرر السيرة الذاتية'}</p>
                      <p className="text-[11px] text-gray-500">{isFr ? 'Créez votre CV en quelques clics' : 'أنشئ سيرتك الذاتية بسهولة'}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('appearance');
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900">{isFr ? 'Modèles & Design' : 'القوالب والتصاميم'}</p>
                      <p className="text-[11px] text-gray-500">{isFr ? 'Plus de 20 templates modernes' : 'أكثر من 20 قالباً عصرياً'}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('home');
                      setToolsDropdownOpen(false);
                      setTimeout(() => {
                        const el = document.getElementById('features-phone-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900">{isFr ? 'Lettre de motivation' : 'خطابات التغطية'}</p>
                      <p className="text-[11px] text-gray-500">{isFr ? 'Rédigez des lettres impactantes' : 'صياغة رسائل تحفيزية مميزة'}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('home');
                      setToolsDropdownOpen(false);
                      setTimeout(() => {
                        const el = document.getElementById('features-phone-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900">{isFr ? 'Offres d’emplois' : 'عروض العمل'}</p>
                      <p className="text-[11px] text-gray-500">{isFr ? 'Alertes d’emploi ciblées' : 'إشعارات وظائف ملائمة لملفك'}</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Prix / Pricing */}
            <button
              onClick={() => setActiveTab('pricing')}
              className={`hover:text-gray-950 transition ${
                activeTab === 'pricing' ? 'text-[#1462ff] font-semibold' : ''
              }`}
            >
              {isFr ? 'Prix' : 'الأسعار'}
            </button>

            {/* FAQ */}
            <button
              onClick={scrollToFAQ}
              className="hover:text-gray-950 transition"
            >
              {isFr ? 'FAQ' : 'الأسئلة الشائعة'}
            </button>

            {/* Articles */}
            <button
              onClick={() => setActiveTab('articles')}
              className={`hover:text-gray-950 transition ${
                activeTab === 'articles' ? 'text-[#1462ff] font-semibold' : ''
              }`}
            >
              {isFr ? 'Articles' : 'المقالات'}
            </button>

            {/* Admin (Only if Admin logged in) */}
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition ${
                  activeTab === 'admin'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isFr ? 'Admin' : 'لوحة الإدارة'}</span>
              </button>
            )}
          </nav>

          {/* Right Action buttons (Matching Screenshot 1 & 2) */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher Button (FR / AR) */}
            {onLanguageChange && (
              <button
                onClick={() => onLanguageChange(isFr ? 'ar' : 'fr')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
                title={isFr ? 'Passer en Arabe' : 'Basculer en Français'}
              >
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span>{isFr ? 'AR' : 'FR'}</span>
              </button>
            )}

            {/* Auth / User Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={user?.name}
                    className="w-7 h-7 rounded-md object-cover"
                  />
                  <div className="text-left hidden sm:block">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-bold text-gray-800 leading-tight">{user?.name}</p>
                      {user?.isVerifiedBadge && (
                        <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-900">{user?.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('builder');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{isFr ? 'Mon CV' : 'سيرتي الذاتية'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('pricing');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Crown className="w-4 h-4 text-amber-500" />
                      <span>{isFr ? 'Abonnement VIP' : 'اشتراك VIP'}</span>
                    </button>

                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>{isFr ? 'Panneau Admin' : 'لوحة الإدارة'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1 border-t border-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{isFr ? 'Se déconnecter' : 'تسجيل الخروج'}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm transition"
              >
                {isFr ? 'Se connecter' : 'تسجيل الدخول'}
              </button>
            )}

            {/* Créer un CV Button (Bold Blue Button from Screenshot 1 & 2) */}
            <button
              onClick={() => setActiveTab('builder')}
              className="px-5 py-2 rounded-lg bg-[#1462ff] hover:bg-blue-700 text-white font-medium text-sm transition shadow-sm"
            >
              {isFr ? 'Créer un CV' : 'إنشاء سيرة ذاتية'}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => {
              setActiveTab('builder');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-sm text-gray-800 hover:bg-gray-50"
          >
            {isFr ? 'Créateur de CV' : 'محرر السيرة الذاتية'}
          </button>
          <button
            onClick={() => {
              setActiveTab('appearance');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-sm text-gray-800 hover:bg-gray-50"
          >
            {isFr ? 'Modèles & Design' : 'القوالب والتصاميم'}
          </button>
          <button
            onClick={() => {
              setActiveTab('pricing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-sm text-gray-800 hover:bg-gray-50"
          >
            {isFr ? 'Prix & VIP' : 'الأسعار وباقات VIP'}
          </button>
          <button
            onClick={() => {
              scrollToFAQ();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-sm text-gray-800 hover:bg-gray-50"
          >
            {isFr ? 'FAQ' : 'الأسئلة الشائعة'}
          </button>
          <button
            onClick={() => {
              setActiveTab('articles');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-md font-medium text-sm text-gray-800 hover:bg-gray-50"
          >
            {isFr ? 'Articles' : 'المقالات'}
          </button>
          {isAdmin && (
            <button
              onClick={() => {
                setActiveTab('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md font-bold text-sm text-amber-700 bg-amber-50"
            >
              {isFr ? 'Panneau Admin' : 'لوحة الإدارة'}
            </button>
          )}
        </div>
      )}
    </header>
  );
};