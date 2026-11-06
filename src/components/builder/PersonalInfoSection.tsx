import React, { useRef } from 'react';
import { useCV } from '../../context/CVContext';
import { User, Mail, Phone, MapPin, Globe, Image, Upload, RefreshCw } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../common/Icons';

export const PersonalInfoSection: React.FC = () => {
  const { cvData, updatePersonalInfo } = useCV();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const info = cvData.personalInfo;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-800">المعلومات الشخصية وبيانات الاتصال</h3>
            <p className="text-xs text-slate-500">أدخل اسمك ومسماك الوظيفي وروابط التواصل المهني</p>
          </div>
        </div>
      </div>

      {/* Avatar upload & presets */}
      <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-50/70 border border-slate-100">
        <div className="relative group">
          <img
            src={info.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
            alt="Avatar"
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-brand-500/30 shadow-sm"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/40 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-[10px] font-bold"
          >
            <Upload className="w-4 h-4 mb-0.5" />
            تغيير
          </button>
        </div>

        <div className="space-y-2 text-center sm:text-start flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition"
            >
              <Upload className="w-3.5 h-3.5 text-brand-600" />
              <span>رفع صورة من جهازك</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {info.avatarUrl && (
              <button
                onClick={() => updatePersonalInfo({ avatarUrl: '' })}
                className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 text-xs font-medium rounded-lg transition"
              >
                إزالة الصورة
              </button>
            )}
          </div>
          
          {/* Quick presets */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">نماذج صور جاهزة:</span>
            <div className="flex items-center gap-1.5">
              {sampleAvatars.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`preset-${i}`}
                  onClick={() => updatePersonalInfo({ avatarUrl: url })}
                  className="w-6 h-6 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-brand-500 transition"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            الاسم الكامل <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={info.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              placeholder="مثال: م. أحمد محمود الزهراني"
              className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            المسمى الوظيفي المستهدف <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={info.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
            placeholder="مثال: مهندس برمجيات أول / مدير مشاريع"
            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            البريد الإلكتروني <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="email"
              value={info.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="name@example.com"
              className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            رقم الهاتف <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              value={info.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="+966 50 123 4567"
              dir="ltr"
              className="w-full pr-9 pl-3 py-2 text-sm text-right rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">المدينة والدولة</label>
          <div className="relative">
            <MapPin className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={info.address}
              onChange={(e) => updatePersonalInfo({ address: e.target.value })}
              placeholder="الرياض، المملكة العربية السعودية"
              className="w-full pr-9 pl-3 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">الموقع الإلكتروني أو المعرض الشخصي</label>
          <div className="relative">
            <Globe className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="url"
              value={info.website}
              onChange={(e) => updatePersonalInfo({ website: e.target.value })}
              placeholder="https://myportfolio.com"
              dir="ltr"
              className="w-full pr-9 pl-3 py-2 text-sm text-right rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">رابط لينكد إن (LinkedIn)</label>
          <div className="relative">
            <LinkedinIcon className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={info.linkedin}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              placeholder="linkedin.com/in/username"
              dir="ltr"
              className="w-full pr-9 pl-3 py-2 text-sm text-right rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">رابط جيت هب (GitHub / Portfolio)</label>
          <div className="relative">
            <GithubIcon className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={info.github}
              onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              placeholder="github.com/username"
              dir="ltr"
              className="w-full pr-9 pl-3 py-2 text-sm text-right rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
