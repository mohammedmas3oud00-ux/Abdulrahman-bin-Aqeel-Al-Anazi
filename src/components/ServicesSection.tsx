import React, { useState } from 'react';
import { 
  Scale, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  Gavel, 
  Building2, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Language, LegalCategory } from '../types';
import { SERVICES_DATA, TRANSLATIONS } from '../data/translations';

interface ServicesSectionProps {
  lang: Language;
  onRequestService: (category: LegalCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onRequestService,
}) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  const [activeFilter, setActiveFilter] = useState<'all' | 'individual' | 'business'>('all');

  const filteredServices = SERVICES_DATA.filter((srv) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'individual') return srv.category === 'individual' || srv.category === 'both';
    if (activeFilter === 'business') return srv.category === 'business' || srv.category === 'both';
    return true;
  });

  const getServiceIcon = (id: LegalCategory) => {
    switch (id) {
      case 'criminal':
        return <Scale className="w-6 h-6 text-stone-900 dark:text-stone-100" />;
      case 'commercial':
        return <Briefcase className="w-6 h-6 text-stone-900 dark:text-stone-100" />;
      case 'labor':
        return <Users className="w-6 h-6 text-stone-900 dark:text-stone-100" />;
      case 'notarization':
        return <ShieldCheck className="w-6 h-6 text-amber-700 dark:text-amber-400" />;
      case 'consultation':
        return <Gavel className="w-6 h-6 text-stone-900 dark:text-stone-100" />;
      case 'litigation':
        return <Building2 className="w-6 h-6 text-stone-900 dark:text-stone-100" />;
      default:
        return <Scale className="w-6 h-6 text-stone-900 dark:text-stone-100" />;
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F5F3EF] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? 'Legal Disciplines' : 'مجالات الترافع والتخصص'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mb-4 tracking-tight">
            {t.services.heading}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            {t.services.subheading}
          </p>

          {/* Quick Filter Tabs */}
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-stone-200/80 dark:bg-stone-800/80 mt-8 border border-stone-300 dark:border-stone-700">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {t.services.filterAll}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('individual')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'individual'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {t.services.filterIndividuals}
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('business')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === 'business'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {t.services.filterBusiness}
            </button>
          </div>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const subServices = isEn ? service.subServicesEn : service.subServicesAr;
            const title = isEn ? service.titleEn : service.titleAr;
            const summary = isEn ? service.summaryEn : service.summaryAr;

            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-[#1E1E1E] p-7 border border-stone-300 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div>
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-2xl bg-[#F5F3EF] dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 transition-colors group-hover:bg-stone-900 group-hover:text-stone-100 dark:group-hover:bg-stone-100 dark:group-hover:text-stone-900">
                      {getServiceIcon(service.id)}
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                      {service.category === 'business' 
                        ? (isEn ? 'Corporate' : 'منشآت وشركات')
                        : service.category === 'individual'
                        ? (isEn ? 'Individuals' : 'أفراد')
                        : (isEn ? 'Individuals & Corporate' : 'أفراد ومنشآت')}
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-2.5">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-5 leading-relaxed">
                    {summary}
                  </p>

                  {/* Sub-services bullet list */}
                  <div className="space-y-2.5 pt-4 border-t border-stone-100 dark:border-stone-800/80 mb-6">
                    <span className="block text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      {t.services.includes}
                    </span>
                    {subServices.map((sub, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200">
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Button (Preselects this service in funnel) */}
                <button
                  type="button"
                  onClick={() => onRequestService(service.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-900 text-stone-900 hover:text-stone-100 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-100 dark:hover:text-stone-900 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer group/btn"
                >
                  <span>{t.services.requestService}</span>
                  <ArrowIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-[-3px] rtl:group-hover/btn:translate-x-[3px]" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
