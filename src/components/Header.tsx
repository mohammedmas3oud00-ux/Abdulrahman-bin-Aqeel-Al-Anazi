import React, { useState } from 'react';
import { Moon, Sun, Globe, Menu, X, PhoneCall, Phone, ExternalLink } from 'lucide-react';
import { AiaLogo } from './AiaLogo';
import { Language, Theme } from '../types';
import { FIRM_DETAILS, TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onBookConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onBookConsultation,
}) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#b2b', label: t.nav.b2b },
    { href: '#notarization', label: t.nav.notarization },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F3EF]/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-stone-300/80 dark:border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        
        {/* Brand / Logo (Left in LTR, Right in RTL) */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          className="hover:opacity-90 transition-opacity min-w-0 shrink flex items-center"
        >
          <AiaLogo size="md" isEn={isEn} />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-stone-900 dark:bg-stone-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </a>
          ))}
        </nav>

        {/* Desktop Action Controls & CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLang}
            title={isEn ? 'التبديل إلى العربية' : 'Switch to English'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-800/70 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isEn ? 'العربية' : 'EN'}</span>
          </button>

          {/* Theme Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
            className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/70 dark:bg-stone-800/70 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer shadow-2xs"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700 animate-in spin-in-180 duration-200" />
            )}
          </button>

          {/* Prominent CTA */}
          <button
            type="button"
            onClick={onBookConsultation}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.nav.bookConsultation}</span>
          </button>
        </div>

        {/* Mobile Compact Controls (Perfect on small screens, no overflow) */}
        <div className="flex sm:hidden items-center gap-1.5 shrink-0">
          {/* Quick theme toggle on mobile top bar */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 active:scale-95 transition-transform"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
          </button>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 text-stone-900 dark:text-stone-100 active:scale-95 transition-transform"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer (Responsive & Clean) */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-stone-300 dark:border-stone-800 bg-[#F5F3EF] dark:bg-[#141414] px-4 pt-4 pb-6 space-y-3.5 shadow-xl transition-all">
          
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block px-3.5 py-2.5 rounded-xl font-bold text-stone-800 dark:text-stone-200 hover:bg-stone-200/80 dark:hover:bg-stone-800 text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Quick Utilities in Mobile Menu: Language Switch & Direct WhatsApp */}
          <div className="pt-2 border-t border-stone-300/60 dark:border-stone-800 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onToggleLang();
              }}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isEn ? 'العربية' : 'English'}</span>
            </button>

            <a
              href={FIRM_DETAILS.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0569339994</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>

          {/* Primary Mobile CTA Button */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onBookConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold text-sm shadow-md active:scale-98 transition-transform"
            >
              <PhoneCall className="w-4 h-4 text-amber-500" />
              <span>{t.nav.bookConsultation}</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
