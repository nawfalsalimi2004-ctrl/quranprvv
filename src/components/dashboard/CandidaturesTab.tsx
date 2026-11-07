import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, ArrowLeft, Building2, MapPin, Calendar, CheckCircle2, MoreVertical, X } from 'lucide-react';
import { JobApplication } from '../../types/cv';

interface CandidaturesTabProps {
  isFr: boolean;
  applications: JobApplication[];
  onAddApplication: (app: Partial<JobApplication>) => void;
  onUpdateApplicationStatus: (id: string, newStatus: JobApplication['status']) => void;
  onRemoveApplication: (id: string) => void;
}

export const CandidaturesTab: React.FC<CandidaturesTabProps> = ({
  isFr,
  applications,
  onAddApplication,
  onUpdateApplicationStatus,
  onRemoveApplication
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<JobApplication['status']>('saved');
  const [formCompany, setFormCompany] = useState('');
  const [formPosition, setFormPosition] = useState('');
  const [formLocation, setFormLocation] = useState('Casablanca');

  const columns: { id: JobApplication['status']; label: string }[] = [
    { id: 'saved', label: isFr ? 'Offre sauvegardée' : 'عرض محفوظ' },
    { id: 'applied', label: isFr ? 'Candidature envoyée' : 'تم إرسال الطلب' },
    { id: 'interview', label: isFr ? 'Entretien' : 'مقابلة شخصية' },
    { id: 'offer', label: isFr ? 'Proposition d’embauche' : 'عرض وظيفي / قبول' }
  ];

  const handleOpenAdd = (status: JobApplication['status']) => {
    setTargetStatus(status);
    setFormCompany('');
    setFormPosition('');
    setFormLocation('Casablanca');
    setModalOpen(true);
  };

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCompany || !formPosition) return;
    onAddApplication({
      company: formCompany,
      position: formPosition,
      location: formLocation,
      status: targetStatus,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    });
    setModalOpen(false);
  };

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'saved': return 'border-gray-200 bg-white';
      case 'applied': return 'border-blue-200 bg-blue-50/20';
      case 'interview': return 'border-amber-200 bg-amber-50/20';
      case 'offer': return 'border-emerald-200 bg-emerald-50/20';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header (Matching Screenshot 3) */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {isFr ? 'Candidatures' : 'متابعة طلبات التوظيف (Kanban)'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            {isFr ? 'Suivez vos candidatures à chaque étape du recrutement' : 'تابع مسار تقديمك من العروض المحفوظة وحتى القبول النهائي'}
          </p>
        </div>

        <button
          onClick={() => handleOpenAdd('saved')}
          className="px-3.5 py-2 bg-[#1462ff] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>{isFr ? 'Ajouter une candidature' : 'إضافة تقديم'}</span>
        </button>
      </div>

      {/* 4 Kanban Columns matching Screenshot 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
        {columns.map((col) => {
          const colApps = applications.filter(a => a.status === col.id);
          
          return (
            <div 
              key={col.id}
              className="bg-gray-100/70 rounded-2xl p-4 space-y-3 min-h-[500px] flex flex-col border border-gray-200"
            >
              {/* Column Header matching Screenshot 3 */}
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-gray-900">{col.label}</h3>
                  <span className="text-[11px] font-bold text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-2xs">
                    {colApps.length}
                  </span>
                </div>

                {/* + Button matching Screenshot 3 */}
                <button
                  onClick={() => handleOpenAdd(col.id)}
                  className="p-1 rounded-md bg-white hover:bg-gray-200 text-gray-600 transition shadow-2xs border border-gray-200"
                  title="Ajouter dans cette colonne"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3">
                {colApps.map((app) => (
                  <div
                    key={app.id}
                    className={`p-3.5 rounded-xl border shadow-2xs transition hover:shadow-md space-y-2 group ${getStatusColor(app.status)}`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-xs text-gray-950 leading-snug">
                        {app.company}
                      </span>
                      <button
                        onClick={() => onRemoveApplication(app.id)}
                        className="text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 p-0.5"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] font-medium text-gray-600">
                      {app.position}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        {app.location || 'Casablanca'}
                      </span>
                      <span>{app.date}</span>
                    </div>

                    {/* Move Status Buttons */}
                    <div className="flex items-center justify-end gap-1 pt-1 opacity-0 group-hover:opacity-100 transition">
                      {col.id !== 'saved' && (
                        <button
                          onClick={() => {
                            const prevStatus = col.id === 'offer' ? 'interview' : col.id === 'interview' ? 'applied' : 'saved';
                            onUpdateApplicationStatus(app.id, prevStatus);
                          }}
                          className="px-2 py-0.5 rounded text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600"
                          title="Reculer d'une étape"
                        >
                          ←
                        </button>
                      )}
                      {col.id !== 'offer' && (
                        <button
                          onClick={() => {
                            const nextStatus = col.id === 'saved' ? 'applied' : col.id === 'applied' ? 'interview' : 'offer';
                            onUpdateApplicationStatus(app.id, nextStatus);
                          }}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#1462ff] text-white hover:bg-blue-700"
                          title="Avancer à l'étape suivante"
                        >
                          →
                        </button>
                      )}
                    </div>

                  </div>
                ))}

                {colApps.length === 0 && (
                  <div className="h-40 rounded-xl border-2 border-dashed border-gray-200 bg-white/60 flex flex-col items-center justify-center text-center p-4">
                    <p className="text-[11px] text-gray-400">
                      {isFr ? 'Aucune candidature' : 'لا توجد طلبات'}
                    </p>
                    <button
                      onClick={() => handleOpenAdd(col.id)}
                      className="text-[11px] font-semibold text-[#1462ff] hover:underline mt-1"
                    >
                      + {isFr ? 'Ajouter' : 'إضافة'}
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-md w-full p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">
                {isFr ? 'Ajouter une candidature' : 'إضافة طلب توظيف جديد'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNew} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">
                  {isFr ? 'Entreprise / Employeur' : 'اسم الشركة أو المؤسسة'}
                </label>
                <input
                  type="text"
                  required
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                  placeholder="Ex: Cabinet AISSE, SisPay, Amazon..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">
                  {isFr ? 'Poste recherché' : 'المسمى الوظيفي'}
                </label>
                <input
                  type="text"
                  required
                  value={formPosition}
                  onChange={(e) => setFormPosition(e.target.value)}
                  placeholder="Ex: Consultant, Développeur, Manager..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">
                  {isFr ? 'Ville' : 'المدينة'}
                </label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="Casablanca / Rabat"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">
                  {isFr ? 'Statut initial' : 'المرحلة الحالية'}
                </label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 focus:bg-white focus:outline-none"
                >
                  <option value="saved">{isFr ? 'Offre sauvegardée' : 'عرض محفوظ'}</option>
                  <option value="applied">{isFr ? 'Candidature envoyée' : 'تم إرسال الطلب'}</option>
                  <option value="interview">{isFr ? 'Entretien' : 'مقابلة شخصية'}</option>
                  <option value="offer">{isFr ? 'Proposition d’embauche' : 'عرض وظيفي'}</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  {isFr ? 'Annuler' : 'إلغاء'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1462ff] hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  {isFr ? 'Enregistrer' : 'حفظ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
