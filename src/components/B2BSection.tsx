import React from 'react';
import { 
  Building2, 
  FileCheck, 
  ShieldCheck, 
  UserCheck, 
  ArrowLeft, 
  ArrowRight, 
  BriefcaseBusiness,
  Award,
  Layers
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface B2BSectionProps {
  lang: Language;
  onRequestB2B: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({
  lang,
  onRequestB2B,
}) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  const featureIcons = [
    <Building2 key="1" className="w-5 h-5 text-amber-700 dark:text-amber-400" />,
    <FileCheck key="2" className="w-5 h-5 text-amber-700 dark:text-amber-400" />,
    <ShieldCheck key="3" className="w-5 h-5 text-amber-700 dark:text-amber-400" />,
    <UserCheck key="4" className="w-5 h-5 text-amber-700 dark:text-amber-400" />,
  ];

  return (
    <section id="b2b" className="py-16 md:py-24 bg-[#EAE6DF] dark:bg-[#181818] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 mb-3 shadow-sm">
            <BriefcaseBusiness className="w-4 h-4 text-amber-500" />
            <span>{t.b2b.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-stone-100 mb-4 tracking-tight">
            {t.b2b.title}
          </h2>
          <p className="text-base sm:text-lg font-semibold text-stone-800 dark:text-stone-200 mb-3">
            {t.b2b.subtitle}
          </p>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            {t.b2b.description}
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Annual Retainer Contract Highlight (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-white dark:bg-[#1E1E1E] p-8 sm:p-10 border border-stone-300 dark:border-stone-700 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-3">
                <Award className="w-4 h-4" />
                <span>{isEn ? 'Strategic Partnership' : 'شراكة قانونية استراتيجية'}</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 mb-4">
                {t.b2b.annualContractsTitle}
              </h3>
              
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-8">
                {t.b2b.annualContractsDesc}
              </p>

              {/* 4 Feature Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {t.b2b.features.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-[#F5F3EF] dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-2 rounded-xl bg-white dark:bg-stone-800 shadow-xs">
                        {featureIcons[idx]}
                      </div>
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA inside container */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 text-start">
                {isEn ? 'Tailored corporate proposals for Khobar & Eastern Province businesses' : 'عروض مخصصة تناسب حجم أعمال منشأتكم بالخبر والمنطقة الشرقية'}
              </span>
              <button
                type="button"
                onClick={onRequestB2B}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-stone-900 hover:bg-black text-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
              >
                <span>{t.b2b.cta}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Corporate Retainer Benefits & Statutes Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-stone-900 dark:bg-stone-950 text-stone-100 p-8 sm:p-10 border border-stone-800 shadow-2xl relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-800 text-stone-200 border border-stone-700 mb-6">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEn ? 'Statutory Compliance' : 'التوافق مع أحدث الأنظمة السعودية'}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold mb-4 text-white">
                {isEn ? 'Shielding Your Enterprise from Legal Pitfalls' : 'حماية المنشأة من المخاطر والغرامات النظامية'}
              </h4>

              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-6">
                {isEn
                  ? 'We align all corporate operations with the New Saudi Companies Law, Civil Transactions Law, and updated Labor Regulations.'
                  : 'نعمل على صياغة اللوائح وحوكمة الشركات وفض المنازعات التجارية بما يتواءم مع نظام المعاملات المدنية ونظام الشركات الجديد وتحديثات نظام العمل.'}
              </p>

              <div className="space-y-3.5 text-xs text-stone-300">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>{isEn ? 'Drafting non-disclosure & employment agreements' : 'صياغة اتفاقيات عدم الإفصاح وعقود العمل والتحفظ'}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>{isEn ? 'Representation before the Commercial Court in Dammam & Khobar' : 'التمثيل القضائي أمام المحكمة التجارية بالدمام والخبر'}</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>{isEn ? 'Expedited legal reviews with SLA response guarantees' : 'مراجعة سريعة ومجدولة للعقود مع ضمان سرعة الإنجاز'}</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8 pt-6 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>{isEn ? 'Al Khobar Business Center BBC' : 'مركز البندرية للأعمال BBC - الخبر'}</span>
              <span className="font-bold text-amber-400" dir="ltr">0569339994</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
