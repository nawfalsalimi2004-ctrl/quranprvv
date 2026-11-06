import React, { useState } from 'react';
import { useCV } from '../../context/CVContext';
import { ModernTemplate } from './templates/ModernTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { 
  Printer, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileJson, 
  Check, 
  Share2, 
  Layout, 
  Palette,
  Sparkles
} from 'lucide-react';
import { TEMPLATES } from '../../data/templates';
import { TemplateId } from '../../types/cv';

interface CVPreviewProps {
  onGoToAppearance?: () => void;
  onGoToBuilder?: () => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ onGoToAppearance, onGoToBuilder }) => {
  const { cvData, updateStyle, exportAsJSON, loadDemoData } = useCV();
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderActiveTemplate = () => {
    switch (cvData.style.templateId) {
      case 'executive':
        return <ExecutiveTemplate data={cvData} />;
      case 'classic':
        return <ClassicTemplate data={cvData} />;
      case 'creative':
        return <CreativeTemplate data={cvData} />;
      case 'minimal':
        return <MinimalTemplate data={cvData} />;
      case 'modern':
      default:
        return <ModernTemplate data={cvData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Toolbar (Hidden in Print) */}
        <div className="no-print bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Quick Template Switcher */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Layout className="w-3.5 h-3.5" />
              القالب:
            </span>
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => updateStyle({ templateId: t.id })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  cvData.style.templateId === t.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t.name.split(' ')[0]} {t.name.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto">
            
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1 text-slate-600">
              <button
                onClick={() => setZoomLevel((z) => Math.max(z - 10, 60))}
                className="p-1 hover:bg-white rounded transition"
                title="تصغير"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold px-2 min-w-[45px] text-center">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(z + 10, 140))}
                className="p-1 hover:bg-white rounded transition"
                title="تكبير"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(100)}
                className="p-1 hover:bg-white rounded transition text-[10px] font-bold px-1.5"
                title="إعادة ضبط"
              >
                100%
              </button>
            </div>

            {/* Quick Appearance Customizer Link */}
            {onGoToAppearance && (
              <button
                onClick={onGoToAppearance}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
              >
                <Palette className="w-3.5 h-3.5 text-brand-600" />
                <span>تخصيص المظهر</span>
              </button>
            )}

            {/* JSON Export */}
            <button
              onClick={exportAsJSON}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
              title="تصدير نسخة احتياطية بصيغة JSON"
            >
              <FileJson className="w-3.5 h-3.5 text-amber-600" />
              <span>تصدير JSON</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'مشاركة'}</span>
            </button>

            {/* Print / PDF Primary Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold shadow-md shadow-brand-500/20 transition"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ كـ PDF</span>
            </button>
          </div>

        </div>

        {/* Tip Banner */}
        <div className="no-print mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              نصيحة الطباعة: عند فتح نافذة الطباعة، اختر حفظ بتنسيق <strong>PDF</strong>، وتأكد من تفعيل <strong>رسومات الخلفية (Background Graphics)</strong> من الإعدادات الإضافية.
            </span>
          </div>
          <button
            onClick={loadDemoData}
            className="text-[11px] font-bold text-amber-800 underline hover:text-amber-950 whitespace-nowrap mr-3"
          >
            ملء بيانات نموذج تجريبي
          </button>
        </div>

        {/* CV Canvas Container */}
        <div className="flex justify-center overflow-x-auto py-4">
          <div
            id="printable-cv"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease'
            }}
          >
            {renderActiveTemplate()}
          </div>
        </div>

      </div>
    </div>
  );
};
