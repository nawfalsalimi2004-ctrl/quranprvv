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
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCV } from '../../context/CVContext';

interface NavbarProps {
  activeTab: 'home' | 'builder' | 'appearance' | 'preview' | 'admin';
  setActiveTab: (tab: 'home' | 'builder' | 'appearance' | 'preview' | 'admin') => void;
  openAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { score } = useCV();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'الرئيسية', icon: Sparkles },
    { id: 'builder', label: 'محرر السيرة الذاتية', icon: FileText },
    { id: 'appearance', label: 'المظهر والقوالب', icon: Palette },
    { id: 'preview', label: 'المعاينة والطباعة', icon: Eye },
    ...(isAdmin ? [{ id: 'admin', label: 'لوحة الإدارة', icon: ShieldCheck, badge: 'مسؤول' }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 no-print transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">سيرتي</span>
                <span className="font-extrabold text-xl text-brand-600">برو</span>
                <span className="text-[10px] bg-brand-50 text-brand-600 font-bold px-1.5 py-0.5 rounded-full border border-brand-200">
                  AI+
                </span>
              </div>
              <p className="text-[10px] text-slate-500 hidden sm:block">منصة إنشاء السير الذاتية الذكية</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            
            {/* CV Score Badge (Compact) */}
            <button
              onClick={() => setActiveTab('builder')}
              className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
              title="معدل اكتمال السيرة الذاتية"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>قوة السيرة:</span>
              <span className={`font-bold ${score >= 80 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                {score}%
              </span>
            </button>

            {/* Print/Download Direct Button */}
            <button
              onClick={() => {
                setActiveTab('preview');
                setTimeout(() => window.print(), 300);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير PDF</span>
            </button>

            {/* Auth / User Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={user?.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-brand-500/20"
                  />
                  <div className="text-right hidden sm:block pr-1">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{user?.name}</p>
                    {user?.role === 'admin' ? (
                      <p className="text-[10px] text-amber-600 font-bold">مدير النظام (Admin)</p>
                    ) : (
                      <p className="text-[10px] text-slate-500 font-medium">حساب شخصي</p>
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">الحساب الحالي</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>

                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50/70 hover:bg-amber-100 border-b border-slate-100 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        لوحة تحكم الأدمن
                      </button>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-right px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-600 text-white text-xs sm:text-sm font-bold hover:bg-brand-700 transition shadow-sm shadow-brand-500/20"
              >
                <LogIn className="w-4 h-4" />
                <span>دخول / حساب جديد</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold ${
                  isActive ? 'bg-brand-50 text-brand-600 font-bold' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-5 h-5 text-slate-500" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
