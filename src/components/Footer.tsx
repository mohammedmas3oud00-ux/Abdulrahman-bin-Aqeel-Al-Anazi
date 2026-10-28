import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { AiaLogo } from './AiaLogo';
import { Language } from '../types';
import { FIRM_DETAILS, TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Bio (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-block bg-stone-800/80 p-2.5 rounded-2xl border border-stone-700">
              <AiaLogo size="md" isEn={isEn} />
            </div>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {t.footer.bio}
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{isEn ? 'Authorized & Certified by Ministry of Justice' : 'ترخيص محاماة معتمد - وزارة العدل بالمملكة'}</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#b2b" className="hover:text-white transition-colors">
                  {t.nav.b2b}
                </a>
              </li>
              <li>
                <a href="#notarization" className="hover:text-white transition-colors">
                  {t.nav.notarization}
                </a>
              </li>
              <li>
                <a href="#consultation" className="hover:text-white transition-colors">
                  {t.nav.consultation}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isEn ? 'Direct Contact' : 'معلومات التواصل'}
            </h4>
            
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-400">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={FIRM_DETAILS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" dir="ltr">
                  {FIRM_DETAILS.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${FIRM_DETAILS.email}`} className="hover:text-white transition-colors">
                  {FIRM_DETAILS.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>{isEn ? FIRM_DETAILS.addressEn : FIRM_DETAILS.addressAr}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={FIRM_DETAILS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow"
              >
                <span>{isEn ? 'WhatsApp: 0569339994' : 'واتساب: 0569339994'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="py-6 border-b border-stone-800 text-[11px] sm:text-xs text-stone-500 leading-relaxed text-center sm:text-start">
          {t.footer.legalDisclaimer}
        </div>

        {/* Bottom bar & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-start">
            {t.footer.rights}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{isEn ? 'Back to top' : 'العودة للأعلى'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
