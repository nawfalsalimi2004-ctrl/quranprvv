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
import { AuthModal } from './components/auth/AuthModal';

export type ActiveTab = 'home' | 'builder' | 'appearance' | 'preview' | 'admin';

const MainApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onStartBuilder={() => setActiveTab('builder')}
            onExploreTemplates={() => setActiveTab('appearance')}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {activeTab === 'builder' && (
          <CVBuilder
            onGoToPreview={() => setActiveTab('preview')}
            onGoToAppearance={() => setActiveTab('appearance')}
          />
        )}

        {activeTab === 'appearance' && (
          <AppearanceStudio
            onGoToPreview={() => setActiveTab('preview')}
          />
        )}

        {activeTab === 'preview' && (
          <CVPreview
            onGoToAppearance={() => setActiveTab('appearance')}
            onGoToBuilder={() => setActiveTab('builder')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard onGoHome={() => setActiveTab('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer />

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
