import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { FIRM_DETAILS } from '../data/translations';
import { Language } from '../types';

interface FloatingWhatsAppProps {
  lang: Language;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ lang }) => {
  const isEn = lang === 'en';
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [isNearContact, setIsNearContact] = useState(false);

  // Auto-hide when contact section or footer is visible to avoid overlapping content
  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearContact(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-4 sm:bottom-6 z-40 flex items-center gap-2.5 transition-all duration-300 ${
        isEn ? 'right-4 sm:right-6 flex-row-reverse' : 'left-4 sm:left-6 flex-row'
      } ${
        isNearContact
          ? 'opacity-0 pointer-events-none translate-y-6 scale-90'
          : 'opacity-100 pointer-events-auto translate-y-0 scale-100'
      }`}
    >
      {/* Floating CTA Pill / Bubble (Desktop only) */}
      {!tooltipDismissed && (
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/95 dark:bg-stone-100/95 text-stone-100 dark:text-stone-900 text-xs font-bold shadow-xl border border-stone-800 dark:border-stone-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{isEn ? 'Direct WhatsApp' : 'تواصل واتساب فوري'}</span>
          <span className="opacity-75 font-mono text-[11px]" dir="ltr">0569339994</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTooltipDismissed(true);
            }}
            className="p-0.5 rounded-full hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-400 hover:text-stone-100 dark:hover:text-stone-900 transition-colors ml-1"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Circular Floating Button (Compact on mobile, full on desktop) */}
      <a
        href={FIRM_DETAILS.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Abdulrahman Al-Anazi on WhatsApp"
        className="relative group flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        {/* Soft pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 animate-ping pointer-events-none" />

        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 fill-current" />
      </a>
    </div>
  );
};
