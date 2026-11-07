import React, { useState } from 'react';
import { Plus, Grid, List, MoreVertical, FileText, Sparkles, Download, ArrowLeft, Trash2, Edit3, X, Check } from 'lucide-react';
import { CoverLetter } from '../../types/cv';

interface CoverLetterTabProps {
  isFr: boolean;
  coverLetters: CoverLetter[];
  onAddCoverLetter: (letter: CoverLetter) => void;
  onUpdateCoverLetter: (id: string, letter: Partial<CoverLetter>) => void;
  onRemoveCoverLetter: (id: string) => void;
}

export const CoverLetterTab: React.FC<CoverLetterTabProps> = ({
  isFr,
  coverLetters,
  onAddCoverLetter,
  onUpdateCoverLetter,
  onRemoveCoverLetter
}) => {
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
  const [editingLetter, setEditingLetter] = useState<CoverLetter | null>(null);

  const activeLetter = coverLetters.find(l => l.id === activeLetterId);

  const handleCreateNew = () => {
    const newLetter: CoverLetter = {
      id: 'cl-' + Date.now(),
      title: isFr ? 'Lettre de motivation sans titre' : 'رسالة تحفيزية جديدة',
      recipientCompany: 'Cabinet AISSE',
      recipientName: 'Monsieur le Directeur des Ressources Humaines',
      jobTitle: 'Consultant en Stratégie & Organisation',
      content: isFr 
        ? "Madame, Monsieur,\n\nVivement intéressé par les perspectives d'évolution au sein de votre cabinet, je souhaite vous soumettre ma candidature pour le poste mentionné en objet.\n\nFort d'un parcours rigoureux et d'une solide expérience professionnelle, j'ai développé des compétences clés en analyse de données, conduite du changement et gestion de projets complexes.\n\nRejoindre vos équipes représente pour moi une opportunité unique de mettre mon dynamisme et mon expertise au service de vos objectifs stratégiques.\n\nDans l'attente d'un entretien à votre convenance, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées."
        : "السيد مدير الموارد البشرية المحترم،\n\nيشرفني أن أتقدم بطلبي هذا لشغل الوظيفة المعلن عنها لديكم. أمتلك خبرة عملية متميزة وشغفاً عالياً بتحقيق النجاح والمساهمة الفعالة في تحقيق أهداف وتطلعات مؤسستكم الموقرة.\n\nوتفضلوا بقبول فائق الاحترام والتقدير.",
      updatedAt: 'Modifié il y a 5 minutes'
    };
    onAddCoverLetter(newLetter);
    setActiveLetterId(newLetter.id);
    setEditingLetter(newLetter);
  };

  const handleAISuggest = () => {
    if (!editingLetter) return;
    const aiText = isFr
      ? `Madame, Monsieur,\n\nC'est avec un grand enthousiasme que je vous adresse ma candidature pour le poste de ${editingLetter.jobTitle} chez ${editingLetter.recipientCompany}.\n\nGrâce à mes précédentes réalisations et ma rigueur professionnelle, j'ai su mener à bien des missions stratégiques et surmonter des défis opérationnels majeurs. Je suis convaincu que mon profil s'intégrera harmonieusement avec la vision d'excellence de ${editingLetter.recipientCompany}.\n\nJe reste à votre entière disposition pour convenir d'une date d'entretien.\n\nCordialement.`
      : `إلى عناية إدارة التوظيف في ${editingLetter.recipientCompany}،\n\nيسرني التقدم لشغل منصب ${editingLetter.jobTitle}، حيث أضع بين أيديكم خبراتي ومؤهلاتي التي تتوافق بدقة مع متطلبات الوظيفة للمساهمة في تحقيق التميز المؤسسي.\n\nشاكراً لكم حسن الاهتمام.`;
    setEditingLetter({ ...editingLetter, content: aiText });
    onUpdateCoverLetter(editingLetter.id, { content: aiText });
  };

  const handlePrint = () => {
    window.print();
  };

  // If currently editing a letter, show the letter editor
  if (editingLetter) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <button
            onClick={() => {
              setEditingLetter(null);
              setActiveLetterId(null);
            }}
            className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isFr ? 'Retour aux lettres' : 'رجوع'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAISuggest}
              className="px-3.5 py-1.5 bg-blue-50 text-[#1462ff] hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isFr ? 'Rédiger avec l’IA' : 'صياغة بالذكاء الاصطناعي'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#1462ff] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isFr ? 'Télécharger PDF' : 'تصدير PDF'}</span>
            </button>
          </div>
        </div>

        {/* Split Editor / Live Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form */}
          <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">Titre du document</label>
              <input
                type="text"
                value={editingLetter.title}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingLetter({ ...editingLetter, title: val });
                  onUpdateCoverLetter(editingLetter.id, { title: val });
                }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-900 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">Entreprise cible</label>
                <input
                  type="text"
                  value={editingLetter.recipientCompany}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingLetter({ ...editingLetter, recipientCompany: val });
                    onUpdateCoverLetter(editingLetter.id, { recipientCompany: val });
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 mb-1 block">Poste visé</label>
                <input
                  type="text"
                  value={editingLetter.jobTitle}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingLetter({ ...editingLetter, jobTitle: val });
                    onUpdateCoverLetter(editingLetter.id, { jobTitle: val });
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">Destinataire (ex: Direction RH)</label>
              <input
                type="text"
                value={editingLetter.recipientName || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingLetter({ ...editingLetter, recipientName: val });
                  onUpdateCoverLetter(editingLetter.id, { recipientName: val });
                }}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1 block">Corps de la lettre</label>
              <textarea
                rows={10}
                value={editingLetter.content}
                onChange={(e) => {
                  const val = e.target.value;
                  setEditingLetter({ ...editingLetter, content: val });
                  onUpdateCoverLetter(editingLetter.id, { content: val });
                }}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs leading-relaxed text-gray-900"
              />
            </div>
          </div>

          {/* Letter Sheet Preview */}
          <div className="lg:col-span-7 bg-[#52565e] p-6 rounded-2xl flex justify-center shadow-inner">
            <div className="w-full max-w-[500px] bg-white p-8 rounded-lg shadow-2xl min-h-[600px] text-[11px] text-gray-800 space-y-5 print-area">
              <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                <div>
                  <h4 className="font-bold text-sm text-gray-950">Candidat</h4>
                  <p className="text-[10px] text-gray-500">Casablanca, Maroc</p>
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-xs text-[#1462ff]">{editingLetter.recipientCompany}</h4>
                  <p className="text-[10px] text-gray-500">{editingLetter.recipientName}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{new Date().toLocaleDateString('fr-FR')}</p>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-900 text-xs">Objet : Candidature au poste de {editingLetter.jobTitle}</span>
              </div>

              <div className="whitespace-pre-line leading-relaxed text-gray-700">
                {editingLetter.content}
              </div>

              <div className="pt-8 text-right">
                <p className="font-bold text-xs text-gray-900">Le Candidat</p>
                <div className="w-20 h-0.5 bg-gray-200 ml-auto mt-2"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Gallery View (Matching Screenshot 1)
  return (
    <div className="space-y-6">
      
      {/* Header Row: Title + Grid/List Icons (Matching Screenshot 1) */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {isFr ? 'Lettres de motivation' : 'خطابات التغطية والرسائل التحفيزية'}
        </h1>
        
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs">
          <button className="p-2 bg-[#1462ff] text-white">
            <Grid className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards Grid matching Screenshot 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
        
        {/* Card: Créer une nouvelle lettre de motivation (Dashed box matching Screenshot 1) */}
        <div 
          onClick={handleCreateNew}
          className="aspect-[1/1.4] border-2 border-dashed border-gray-300 hover:border-[#1462ff] rounded-2xl bg-white hover:bg-blue-50/20 flex flex-col items-center justify-center p-6 text-center cursor-pointer transition group shadow-2xs"
        >
          <h3 className="font-semibold text-sm text-gray-700 group-hover:text-gray-900 mb-3">
            {isFr ? 'Créer une nouvelle lettre de motivation' : 'إنشاء خطاب تغطية جديد'}
          </h3>
          <div className="w-10 h-10 rounded-full border border-gray-300 group-hover:border-[#1462ff] flex items-center justify-center text-gray-400 group-hover:text-[#1462ff] transition">
            <Plus className="w-5 h-5" />
          </div>
        </div>

        {/* Existing letters */}
        {coverLetters.map((letter) => (
          <div
            key={letter.id}
            onClick={() => {
              setActiveLetterId(letter.id);
              setEditingLetter(letter);
            }}
            className="aspect-[1/1.4] border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between p-4 cursor-pointer group"
          >
            <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-200 text-[10px] text-gray-500 leading-snug overflow-hidden relative">
              <div className="font-bold text-gray-800 text-xs mb-1 truncate">{letter.recipientCompany}</div>
              <p className="line-clamp-6">{letter.content}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveCoverLetter(letter.id);
                }}
                className="absolute top-2 right-2 p-1 rounded-md bg-white shadow text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-3">
              <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#1462ff] transition truncate">
                {letter.title}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5">{letter.updatedAt}</p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};
