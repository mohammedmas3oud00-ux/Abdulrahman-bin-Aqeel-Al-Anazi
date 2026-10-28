import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { B2BSection } from './components/B2BSection';
import { NotarizationSection } from './components/NotarizationSection';
import { ConsultationFunnel } from './components/ConsultationFunnel';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DigitalCardModal } from './components/DigitalCardModal';
import { Language, Theme, LegalCategory } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('lawyer_app_lang') as Language) || 'ar';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('lawyer_app_theme') as Theme) || 'light';
  });

  const [selectedCategoryForFunnel, setSelectedCategoryForFunnel] = useState<LegalCategory | null>(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  // Sync lang & direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lawyer_app_lang', lang);
  }, [lang]);

  // Sync theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('lawyer_app_theme', theme);
  }, [theme]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToFunnel = () => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromCard = (category: LegalCategory) => {
    setSelectedCategoryForFunnel(category);
    scrollToFunnel();
  };

  const handleB2BRequest = () => {
    setSelectedCategoryForFunnel('commercial');
    scrollToFunnel();
  };

  const handleNotarizationRequest = () => {
    setSelectedCategoryForFunnel('notarization');
    scrollToFunnel();
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF] dark:bg-[#121212] text-stone-900 dark:text-stone-100 font-sans transition-colors duration-300 selection:bg-amber-200 dark:selection:bg-amber-900/60 selection:text-stone-900 dark:selection:text-stone-100 flex flex-col">
      {/* Sticky Header */}
      <Header
        lang={lang}
        onToggleLang={toggleLang}
        theme={theme}
        onToggleTheme={toggleTheme}
        onBookConsultation={scrollToFunnel}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onBookConsultation={scrollToFunnel}
          onOpenCardModal={() => setIsCardModalOpen(true)}
        />

        {/* 6 Interactive Legal Services Section */}
        <ServicesSection
          lang={lang}
          onRequestService={handleSelectServiceFromCard}
        />

        {/* Corporate & B2B Sector for Al Khobar */}
        <B2BSection
          lang={lang}
          onRequestB2B={handleB2BRequest}
        />

        {/* Notarization Services Banner */}
        <NotarizationSection
          lang={lang}
          onSelectNotarization={handleNotarizationRequest}
        />

        {/* Smart Consultation & WhatsApp Lead Generation Funnel */}
        <ConsultationFunnel
          lang={lang}
          selectedCategoryFromParent={selectedCategoryForFunnel}
          onCategoryHandled={() => setSelectedCategoryForFunnel(null)}
        />

        {/* Contact & Map Section */}
        <ContactSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating Action Button for Immediate WhatsApp */}
      <FloatingWhatsApp lang={lang} />

      {/* Digital Business Card Modal */}
      <DigitalCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
