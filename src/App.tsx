import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CVProvider } from './context/CVContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './components/home/HomePage';
import { CVBuilder } from './components/builder/CVBuilder';
import { AppearanceStudio } from './components/appearance/AppearanceStudio';
import { CVPreview } from './components/preview/CVPreview';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ArticlesPage } from './components/articles/ArticlesPage';
import { PricingPage } from './components/pricing/PricingPage';
import { AuthModal } from './components/auth/AuthModal';

export type ActiveTab = 'home' | 'builder' | 'appearance' | 'preview' | 'articles' | 'pricing' | 'admin';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [language, setLanguage] = useState<'fr' | 'ar'>(() => {
    return (localStorage.getItem('cv_lang') as 'fr' | 'ar') || 'fr';
  });

  const handleLanguageChange = (lang: 'fr' | 'ar') => {
    setLanguage(lang);
    localStorage.setItem('cv_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  React.useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={`min-h-screen flex flex-col bg-white text-slate-800 ${language === 'ar' ? 'font-sans' : 'font-sans'}`}>
      {/* Navbar Header (Hidden in builder mode to match full-bleed UI) */}
      {activeTab !== 'builder' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openAuthModal={() => setAuthModalOpen(true)}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      )}

      {/* Main Content Area based on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onStartBuilder={() => setActiveTab('builder')}
            onExploreTemplates={() => setActiveTab('appearance')}
            onOpenAuth={() => setAuthModalOpen(true)}
            onGoToArticles={() => setActiveTab('articles')}
            onGoToPricing={() => setActiveTab('pricing')}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {activeTab === 'builder' && (
          <CVBuilder
            onGoToPreview={() => setActiveTab('preview')}
            onGoToAppearance={() => setActiveTab('appearance')}
            onGoToHome={() => setActiveTab('home')}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {activeTab === 'appearance' && (
          <AppearanceStudio
            onGoToPreview={() => setActiveTab('preview')}
            onGoToPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'preview' && (
          <CVPreview
            onGoToAppearance={() => setActiveTab('appearance')}
            onGoToBuilder={() => setActiveTab('builder')}
            onGoToPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'articles' && (
          <ArticlesPage
            onGoToBuilder={() => setActiveTab('builder')}
            onGoToPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingPage
            onGoToBuilder={() => setActiveTab('builder')}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard onGoHome={() => setActiveTab('home')} />
        )}
      </main>

      {/* Footer (Hidden in builder) */}
      {activeTab !== 'builder' && <Footer />}

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CVProvider>
        <MainApp />
      </CVProvider>
    </AuthProvider>
  );
};

export default App;
