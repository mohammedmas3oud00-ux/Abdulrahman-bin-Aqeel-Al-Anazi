import React from 'react';
import { ShieldCheck, FileCheck, Award, ArrowLeft, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NotarizationSectionProps {
  lang: Language;
  onSelectNotarization: () => void;
}

export const NotarizationSection: React.FC<NotarizationSectionProps> = ({
  lang,
  onSelectNotarization,
}) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <section id="notarization" className="py-16 md:py-20 bg-[#F5F3EF] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-stone-900 text-stone-100 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl border border-stone-800">
          {/* Subtle decorative background watermarks */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-stone-700/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-8 text-start">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.notarizationHighlight.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                {t.notarizationHighlight.title}
              </h3>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mb-8">
                {t.notarizationHighlight.description}
              </p>

              {/* 3 Core Notary highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <FileCheck className="w-4 h-4" />
                    <span>{isEn ? 'Powers of Attorney' : 'الوكالات الشرعية'}</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {isEn ? 'Issuing & revoking individual & commercial POAs instantly' : 'إصدار وفسخ الوكالات للأفراد والمؤسسات إلكترونياً'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <Award className="w-4 h-4" />
                    <span>{isEn ? 'Declarations & Debts' : 'الإقرارات والتنازلات'}</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {isEn ? 'Notarizing financial debts, acknowledgments & waivers' : 'توثيق المديونيات المالية والإقرارات القضائية'}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <Zap className="w-4 h-4" />
                    <span>{isEn ? 'Corporate Contracts' : 'عقود الشركات'}</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    {isEn ? 'Corporate deeds, partner agreements & real estate' : 'توثيق عقود تأسيس الشركات وملاحق التعديل والتصرفات'}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="button"
                onClick={onSelectNotarization}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>{t.notarizationHighlight.cta}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Right Badge Graphic */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs p-6 rounded-3xl bg-stone-800/90 border border-stone-700 text-center shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-stone-900 text-amber-400 mx-auto flex items-center justify-center mb-4 border border-stone-700 shadow-inner">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">
                  {isEn ? 'Accredited Saudi Notary' : 'موثق عدلي معتمد'}
                </h4>
                <p className="text-xs text-stone-400 mb-4">
                  {isEn ? 'Authorized by the Ministry of Justice, Kingdom of Saudi Arabia' : 'مرخص وموثق رسمياً من وزارة العدل بالمملكة'}
                </p>
                <div className="space-y-2 text-start text-xs text-stone-300 border-t border-stone-700/80 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isEn ? 'Direct Ministry electronic link' : 'ربط إلكتروني مباشر عبر بوابة ناجز'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{isEn ? 'Available on-site at BBC Khobar' : 'خدمة حضورية بمكتبنا أو عن بُعد'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
