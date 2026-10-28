import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { FIRM_DETAILS } from '../data/translations';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  return (
    <div className={`fixed bottom-6 z-40 flex items-center gap-3 ${isEn ? 'right-6 flex-row-reverse' : 'left-6 flex-row'}`}>
      
      {/* Floating CTA Pill / Bubble */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-bold shadow-xl border border-stone-800 dark:border-stone-200 animate-bounce duration-1000">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{isEn ? 'Direct Legal WhatsApp' : 'تواصل قانوني فوري'}</span>
          <span className="opacity-75 font-mono" dir="ltr">0569339994</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTooltipDismissed(true);
            }}
            className="p-0.5 rounded-full hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-400 hover:text-stone-100 dark:hover:text-stone-900 transition-colors ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Circular Floating Button */}
      <a
        href={FIRM_DETAILS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Abdulrahman Al-Anazi on WhatsApp"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95"
      >
        {/* Soft pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
      </a>
    </div>
  );
};
