import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  Scale, 
  Briefcase, 
  FileCheck2, 
  Clock 
} from 'lucide-react';
import { Language } from '../types';
import { FIRM_DETAILS, TRANSLATIONS } from '../data/translations';
import { AiaLogo } from './AiaLogo';

interface HeroProps {
  lang: Language;
  onBookConsultation: () => void;
  onOpenCardModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onBookConsultation,
  onOpenCardModal,
}) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <section id="home" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="arch-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="24" cy="24" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#arch-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy (8 Cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>{t.hero.badge}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                <MapPin className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" />
                <span>{t.hero.locationBadge}</span>
              </div>
            </div>

            {/* Main Name & Title Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-stone-900 dark:text-stone-100 tracking-tight leading-[1.2] mb-3">
              {t.hero.name}
            </h1>
            <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-amber-800 dark:text-amber-400 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-700 dark:bg-amber-400 inline-block" />
              <span>{t.hero.title}</span>
            </div>

            {/* Tagline & Deep Paragraph */}
            <h2 className="text-base sm:text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4 leading-relaxed">
              {t.hero.tagline}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mb-8">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={onBookConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-stone-900 hover:bg-black text-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              {/* Secondary CTA: Direct WhatsApp */}
              <a
                href={FIRM_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-emerald-200" />
                <span>{t.hero.ctaSecondary}</span>
                <span className="text-xs bg-emerald-800/80 px-2 py-0.5 rounded-full" dir="ltr">0569339994</span>
              </a>
            </div>

            {/* Quick checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-300/60 dark:border-stone-800 w-full max-w-xl text-xs font-semibold text-stone-700 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isEn ? 'Ministry of Justice Certified' : 'مرخص عدلياً'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isEn ? 'Rapid Response' : 'استجابة فورية'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{isEn ? 'Absolute Confidentiality' : 'سرية مهنية تامة'}</span>
              </div>
            </div>

          </div>

          {/* Prestige Feature Card / Digital Emblem Showcase (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer decorative glow / soft border */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-stone-400 to-amber-700 rounded-3xl blur-md opacity-20 dark:opacity-30" />

              <div className="relative rounded-3xl bg-white dark:bg-[#1E1E1E] p-7 sm:p-8 border border-stone-300 dark:border-stone-700 shadow-2xl">
                
                {/* Emblem Header */}
                <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
                  <AiaLogo size="lg" showText={false} isEn={isEn} />
                  <div className="text-end">
                    <span className="block text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                      {isEn ? 'Kingdom of Saudi Arabia' : 'المملكة العربية السعودية'}
                    </span>
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {isEn ? 'Al Khobar Office' : 'مقر الخبر - مركز BBC'}
                    </span>
                  </div>
                </div>

                {/* Identity Snapshot */}
                <div className="py-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        {isEn ? 'Commercial & Criminal Litigation' : 'القضايا التجارية والجنائية'}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {isEn ? 'Pleading before general, commercial & appeal courts' : 'الترافع أمام سائر المحاكم العامة والتجارية والاستئناف'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        {isEn ? 'Official Notarization' : 'خدمات التوثيق الفوري'}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {isEn ? 'POAs, declarations & contract notarization' : 'وكالات شرعية، إقرارات مالية، وتوثيق عقود الشركات'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        {isEn ? 'Corporate Retainers' : 'رعاية قانونية سنوية للمنشآت'}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        {isEn ? 'Dedicated legal advisor for your business growth' : 'تخصيص مستشار قانوني لمتابعة أعمال شركتك وحوكمتها'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Digital Card Preview trigger */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    {FIRM_DETAILS.phone} • {FIRM_DETAILS.email}
                  </div>
                  <button
                    type="button"
                    onClick={onOpenCardModal}
                    className="text-xs font-bold text-stone-900 dark:text-stone-100 underline decoration-stone-400 hover:decoration-stone-900 cursor-pointer"
                  >
                    {isEn ? 'Digital Card' : 'بطاقة المكتب'}
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Trust Stats Bar below Hero */}
        <div className="mt-14 pt-10 border-t border-stone-300 dark:border-stone-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-300/80 dark:border-stone-800 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mb-1">
                {t.hero.stats.stat1Value}
              </span>
              <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                {t.hero.stats.stat1Label}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-300/80 dark:border-stone-800 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mb-1">
                {t.hero.stats.stat2Value}
              </span>
              <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                {t.hero.stats.stat2Label}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-300/80 dark:border-stone-800 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-amber-700 dark:text-amber-400 mb-1">
                {t.hero.stats.stat3Value}
              </span>
              <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                {t.hero.stats.stat3Label}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-300/80 dark:border-stone-800 text-center shadow-sm">
              <span className="block text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mb-1">
                {t.hero.stats.stat4Value}
              </span>
              <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                {t.hero.stats.stat4Label}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
