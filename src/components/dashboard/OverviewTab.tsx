import React from 'react';
import { Plus, ChevronRight, MoreVertical, Building2, MapPin } from 'lucide-react';
import { CVData, CoverLetter, JobApplication } from '../../types/cv';

interface OverviewTabProps {
  isFr: boolean;
  cvTitle: string;
  onOpenCVEditor: () => void;
  onOpenCoverLetter: () => void;
  onSwitchTab: (tab: 'cv' | 'coverLetter' | 'jobs' | 'applications') => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  isFr,
  cvTitle,
  onOpenCVEditor,
  onOpenCoverLetter,
  onSwitchTab
}) => {
  return (
    <div className="space-y-10">
      
      {/* ============================================================= */}
      {/* ROW 1: CAROUSELS (CVs + LETTRES DE MOTIVATION - Screenshot 4) */}
      {/* ============================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: CV Cards (Screenshot 4) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="font-bold text-lg text-gray-900">CV</h2>
            <button 
              onClick={() => onSwitchTab('cv')}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition"
              title="Voir tous les CV"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Card 1: Créer un nouveau CV (Screenshot 4) */}
            <div
              onClick={onOpenCVEditor}
              className="aspect-[1/1.35] border-2 border-dashed border-gray-300 hover:border-[#1462ff] rounded-2xl bg-white hover:bg-blue-50/20 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition group shadow-2xs"
            >
              <h4 className="font-semibold text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 mb-3">
                {isFr ? 'Créer un nouveau CV' : 'إنشاء سيرة ذاتية'}
              </h4>
              <div className="w-9 h-9 rounded-full border border-gray-300 group-hover:border-[#1462ff] flex items-center justify-center text-gray-400 group-hover:text-[#1462ff] transition">
                <Plus className="w-5 h-5" />
              </div>
            </div>

            {/* Card 2: CV sans titre Thumbnail (Screenshot 4) */}
            <div
              onClick={onOpenCVEditor}
              className="aspect-[1/1.35] border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between p-3.5 cursor-pointer group"
            >
              <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200 flex items-start justify-center p-2">
                {/* Mini mockup top banner matching screenshot 4 */}
                <div className="w-full bg-[#1a2b49] h-8 rounded-t-sm flex items-center px-2 text-[8px] text-white font-bold">
                  Curriculum vitae
                </div>
                <div className="absolute bottom-2 right-2 p-1.5 rounded-md bg-white shadow border border-gray-200 text-gray-500">
                  <MoreVertical className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="pt-2.5">
                <h4 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#1462ff] transition truncate">
                  {cvTitle}
                </h4>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  {isFr ? 'Modifié il y a 24 minutes' : 'تم التعديل قبل 24 دقيقة'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Lettres de motivation Cards (Screenshot 4) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="font-bold text-lg text-gray-900">
              {isFr ? 'Lettres de motivation' : 'خطابات التغطية'}
            </h2>
            <button 
              onClick={() => onSwitchTab('coverLetter')}
              className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition"
              title="Voir toutes les lettres"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            
            {/* Card 1: Créer une nouvelle lettre (Screenshot 4) */}
            <div
              onClick={onOpenCoverLetter}
              className="aspect-[1/1.35] border-2 border-dashed border-gray-300 hover:border-[#1462ff] rounded-2xl bg-white hover:bg-blue-50/20 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition group shadow-2xs"
            >
              <h4 className="font-semibold text-xs sm:text-sm text-gray-700 group-hover:text-gray-900 mb-3">
                {isFr ? 'Créer une nouvelle lettre de motivation' : 'إنشاء خطاب تغطية جديد'}
              </h4>
              <div className="w-9 h-9 rounded-full border border-gray-300 group-hover:border-[#1462ff] flex items-center justify-center text-gray-400 group-hover:text-[#1462ff] transition">
                <Plus className="w-5 h-5" />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ============================================================= */}
      {/* ROW 2: WIDGETS (OFFRES D'EMPLOI + CANDIDATURES - Screenshot 4) */}
      {/* ============================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Left Widget: Offres d'emploi (Matching Screenshot 4) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="font-bold text-lg text-gray-900">
              {isFr ? 'Offres d’emploi' : 'أحدث فرص العمل'}
            </h2>
            <button
              onClick={() => onSwitchTab('jobs')}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition"
              title="Voir toutes les offres"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            
            {/* Job Item 1: Cabinet AISSE (Screenshot 4) */}
            <div 
              onClick={() => onSwitchTab('jobs')}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition cursor-pointer flex items-start gap-3.5"
            >
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80" 
                alt="Cabinet AISSE"
                className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
              />
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-gray-900 hover:text-[#1462ff] transition line-clamp-1">
                  Offre d'emploi dans le domaine de consulting للعمل في وظائف الدار البيضاء
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">Cabinet AISSE • Casablanca</p>
              </div>
            </div>

            {/* Job Item 2: SisPay (Screenshot 4) */}
            <div 
              onClick={() => onSwitchTab('jobs')}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm transition cursor-pointer flex items-start gap-3.5"
            >
              <img 
                src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&auto=format&fit=crop&q=80" 
                alt="SisPay"
                className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
              />
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-gray-900 hover:text-[#1462ff] transition line-clamp-1">
                  Chargé de l'évaluation & performance rh-bilingue الدار البيضاء للعمل في وظائف
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">SisPay • Casablanca</p>
              </div>
            </div>

          </div>
        </div>

        {/* Right Widget: Candidatures (Matching Screenshot 4) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="font-bold text-lg text-gray-900">
              {isFr ? 'Candidatures' : 'متابعة التقديم'}
            </h2>
            <button
              onClick={() => onSwitchTab('applications')}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 transition"
              title="Voir le tableau de candidatures"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* + Ajouter une candidature Card (Screenshot 4) */}
          <div 
            onClick={() => onSwitchTab('applications')}
            className="p-6 rounded-xl border border-gray-200 bg-white hover:border-[#1462ff] hover:bg-blue-50/20 transition cursor-pointer flex items-center justify-center text-center shadow-2xs group"
          >
            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-gray-600 group-hover:text-[#1462ff] transition">
              <Plus className="w-4 h-4" />
              <span>{isFr ? '+ Ajouter une candidature' : '+ إضافة تقديم جديد'}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
