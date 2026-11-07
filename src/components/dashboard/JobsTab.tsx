import React, { useState } from 'react';
import { Search, MapPin, Star, Building2, ExternalLink, Check, Bookmark, Filter, ChevronDown, Sparkles } from 'lucide-react';
import { JobApplication } from '../../types/cv';

interface JobsTabProps {
  isFr: boolean;
  onSaveJobToApplications?: (job: { title: string; company: string; location: string }) => void;
  onApplyWithCV?: (jobTitle: string, company: string) => void;
}

export const JobsTab: React.FC<JobsTabProps> = ({ 
  isFr, 
  onSaveJobToApplications,
  onApplyWithCV 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('Casablanca');
  const [savedJobs, setSavedJobs] = useState<Record<string, boolean>>({});
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  // Real job listings exactly matching Screenshot 2
  const initialJobs = [
    {
      id: 'job-1',
      title: "Offre d'emploi dans le domaine de consulting للعمل في وظائف الدار البيضاء",
      company: 'Cabinet AISSE',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
      description: "Entreprise Fondé en 1995, le cabinet AISSE est spécialisé dans l'audit, le conseil et la formation. Il propose à ses clients et partenaires un accompagnement global et adapté aux besoins de chaque d",
      location: 'الدار البيضاء',
      date: 'Il y a 2 jours',
      type: 'CDI'
    },
    {
      id: 'job-2',
      title: "Chargé de l'évaluation & performance rh-bilingue الدار البيضاء للعمل في وظائف",
      company: 'SisPay',
      logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&auto=format&fit=crop&q=80',
      description: "Entreprise Dans le cadre du développement stratégique de ses ressources humaines, notre client recrute un(e) Chargé(e) de l'Évaluation & de la Performance RH en CDI.Ce poste s'inscrit dans une dynam",
      location: 'الدار البيضاء',
      date: 'Il y a 3 jours',
      type: 'CDI'
    },
    {
      id: 'job-3',
      title: "Consultant Senior en Stratégie & Organisation",
      company: 'Deloitte Maroc',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=80',
      description: "Accompagnement de grandes entreprises et institutions publiques dans leurs programmes de transformation digitale, gouvernance et excellence opérationnelle à Casablanca.",
      location: 'Casablanca Finance City',
      date: 'Il y a 4 jours',
      type: 'CDI'
    },
    {
      id: 'job-4',
      title: "Développeur Full-Stack React / Node.js",
      company: 'Capgemini Engineering',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=80',
      description: "Conception et déploiement d'applications web d'envergure internationale avec intégration API REST, microservices et environnements cloud modernes.",
      location: 'Casablanca Nearshore',
      date: 'Il y a 5 jours',
      type: 'CDI'
    }
  ];

  const filteredJobs = initialJobs.filter(j => {
    const matchTitle = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       j.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLoc = !locationTerm || j.location.toLowerCase().includes(locationTerm.toLowerCase()) ||
                     locationTerm.toLowerCase().includes('casa') || locationTerm.toLowerCase().includes('الدار');
    return matchTitle && matchLoc;
  });

  const toggleSaveJob = (job: typeof initialJobs[0]) => {
    const newState = !savedJobs[job.id];
    setSavedJobs(prev => ({ ...prev, [job.id]: newState }));
    if (newState && onSaveJobToApplications) {
      onSaveJobToApplications({
        title: job.title,
        company: job.company,
        location: job.location
      });
      alert(isFr ? `Offre "${job.company}" enregistrée dans vos candidatures !` : `تم حفظ عرض "${job.company}" في صفحة متابعة التقديم!`);
    }
  };

  const handleApply = (job: typeof initialJobs[0]) => {
    setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
    if (onApplyWithCV) {
      onApplyWithCV(job.title, job.company);
    }
    alert(isFr ? `Candidature envoyée avec succès à ${job.company} !` : `تم إرسال سيرتك الذاتية بنجاح إلى ${job.company}!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header (Matching Screenshot 2) */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {isFr ? 'Offres d’emploi' : 'عروض العمل والوظائف'}
        </h1>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {filteredJobs.length} {isFr ? 'offres disponibles' : 'وظيفة متاحة'}
        </span>
      </div>

      {/* Search Bar matching Screenshot 2 */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          
          {/* Emploi recherché */}
          <div className="md:col-span-6 space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              {isFr ? 'Emploi recherché' : 'المسمى الوظيفي أو الشركة'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={isFr ? "Ex: Consulting, RH, Développeur..." : "مثال: استشارات، موارد بشرية، مطور..."}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
              />
            </div>
          </div>

          {/* Lieu (Casablanca matching Screenshot 2) */}
          <div className="md:col-span-4 space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              {isFr ? 'Lieu' : 'المدينة أو الدولة'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                placeholder="Casablanca"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#1462ff]"
              />
            </div>
          </div>

          {/* Rechercher Button (Blue button matching Screenshot 2) */}
          <div className="md:col-span-2">
            <button 
              className="w-full py-2 bg-[#1462ff] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isFr ? 'Rechercher' : 'بحث'}</span>
            </button>
          </div>

        </div>

        {/* Sub-filters chips matching Screenshot 2: 25 km ⌵ | Maroc ⌵ */}
        <div className="flex items-center gap-3 pt-2 text-xs font-medium text-gray-600 border-t border-gray-100">
          <button className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition">
            <span>25 km</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition">
            <span>Maroc</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          <span className="text-[11px] text-gray-400 ml-auto hidden sm:inline">
            {isFr ? 'Actualisé en temps réel' : 'محدث لحظياً'}
          </span>
        </div>
      </div>

      {/* Jobs List matching Screenshot 2 */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div 
            key={job.id}
            className="p-5 rounded-xl border border-gray-200 bg-white shadow-2xs hover:border-blue-200 hover:shadow-md transition space-y-3 relative group"
          >
            {/* Top row: Logo + Title + Star Bookmark */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                
                {/* Logo Image */}
                <img 
                  src={job.logo} 
                  alt={job.company}
                  className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0" 
                />

                <div className="space-y-1">
                  <h3 className="font-bold text-sm sm:text-base text-gray-900 leading-snug group-hover:text-[#1462ff] transition">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-gray-700">{job.company}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {job.location}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[11px] bg-blue-50 text-[#1462ff] px-2 py-0.5 rounded font-medium">
                      {job.type}
                    </span>
                  </div>
                </div>

              </div>

              {/* Star Bookmark Icon (Matching Screenshot 2) */}
              <button 
                onClick={() => toggleSaveJob(job)}
                className={`p-2 rounded-lg transition ${
                  savedJobs[job.id] 
                    ? 'text-amber-500 fill-amber-500 bg-amber-50' 
                    : 'text-gray-400 hover:text-amber-500 hover:bg-gray-50'
                }`}
                title={savedJobs[job.id] ? "Offre enregistrée" : "Enregistrer cette offre"}
              >
                <Star className={`w-5 h-5 ${savedJobs[job.id] ? 'fill-amber-500' : ''}`} />
              </button>
            </div>

            {/* Description Text matching Screenshot 2 */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-16">
              {job.description}
            </p>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 pl-16">
              <span className="text-[11px] text-gray-400">
                {job.date}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleSaveJob(job)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  {savedJobs[job.id] ? (isFr ? 'Enregistré ✓' : 'تم الحفظ ✓') : (isFr ? 'Sauvegarder' : 'حفظ')}
                </button>
                <button
                  onClick={() => handleApply(job)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition ${
                    appliedJobs[job.id] 
                      ? 'bg-emerald-600' 
                      : 'bg-[#1462ff] hover:bg-blue-700 shadow-sm'
                  }`}
                >
                  {appliedJobs[job.id] 
                    ? (isFr ? 'Postulé ✓' : 'تم التقديم ✓') 
                    : (isFr ? 'Postuler avec mon CV' : 'تقديم بالسيرة الذاتية')
                  }
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
