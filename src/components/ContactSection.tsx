import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Navigation, 
  ExternalLink, 
  Check, 
  Copy,
  Download
} from 'lucide-react';
import { Language } from '../types';
import { FIRM_DETAILS, TRANSLATIONS } from '../data/translations';
import { QrCodeCard } from './QrCodeCard';
import { downloadVCard } from '../utils/vcard';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F5F3EF] dark:bg-[#121212] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 mb-3 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mb-4 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 3 Main Grid Columns on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Details & Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone & WhatsApp Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-stone-300 dark:border-stone-800 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-500 dark:text-stone-400">
                    {t.contact.phoneTitle}
                  </span>
                  <a
                    href={FIRM_DETAILS.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-black text-stone-900 dark:text-stone-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-block mt-0.5"
                    dir="ltr"
                  >
                    {FIRM_DETAILS.phone}
                  </a>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {isEn ? 'Direct Call & WhatsApp Consultation' : 'مكالمات ورسائل واتساب رسمية على مدار اليوم'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(FIRM_DETAILS.phone, 'phone')}
                title="Copy phone"
                className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-stone-300 dark:border-stone-800 shadow-sm flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-500 dark:text-stone-400">
                    {t.contact.emailTitle}
                  </span>
                  <a
                    href={`mailto:${FIRM_DETAILS.email}`}
                    className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-400 transition-colors inline-block mt-0.5 break-all"
                  >
                    {FIRM_DETAILS.email}
                  </a>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {isEn ? 'Official corporate & case inquiries' : 'للمراسلات الرسمية والعقود ومذكرات القضايا'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(FIRM_DETAILS.email, 'email')}
                title="Copy email"
                className="p-2 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Physical Address Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-stone-300 dark:border-stone-800 shadow-sm flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-stone-500 dark:text-stone-400">
                  {t.contact.locationTitle}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  {isEn ? FIRM_DETAILS.addressEn : FIRM_DETAILS.addressAr}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  {isEn ? FIRM_DETAILS.cityEn : FIRM_DETAILS.cityAr}
                </p>
                <a
                  href={FIRM_DETAILS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2.5 text-xs font-bold text-stone-900 dark:text-stone-100 hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{t.contact.openMaps}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-stone-300 dark:border-stone-800 shadow-sm flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-stone-500 dark:text-stone-400">
                  {t.contact.hoursTitle}
                </span>
                <p className="text-sm font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                  {isEn ? FIRM_DETAILS.workingHoursEn : FIRM_DETAILS.workingHoursAr}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  {isEn ? 'Emergency consultations active via WhatsApp' : 'استشارات الطوارئ والنيابة متاحة عبر الواتساب'}
                </p>
              </div>
            </div>

            {/* Quick Action to Download vCard */}
            <button
              type="button"
              onClick={downloadVCard}
              className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-stone-900 hover:bg-black text-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs sm:text-sm font-bold transition-all shadow cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.contact.saveContact}</span>
            </button>

          </div>

          {/* Interactive Map Box (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-white dark:bg-[#1E1E1E] border border-stone-300 dark:border-stone-800 p-3 shadow-md overflow-hidden flex flex-col h-full min-h-[420px]">
            <div className="p-3 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {isEn ? 'Al-Bandariyah Business Center (BBC)' : 'مركز البندرية للأعمال BBC'}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                {isEn ? 'Khobar' : 'الخبر'}
              </span>
            </div>

            {/* Embedded interactive Google Map iframe */}
            <div className="relative flex-1 w-full rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 min-h-[320px]">
              <iframe
                title="مكتب المحامي عبدالرحمن بن عقيل العنزي - مركز البندرية للأعمال الخبر"
                src="https://maps.google.com/maps?q=26.2886,50.2084+(Al%20Bandariyah%20Business%20Center%20Khobar)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                allowFullScreen
              />
            </div>

            <div className="pt-3 px-2 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span>{isEn ? 'Coordinates: 26.2886° N, 50.2084° E' : 'الإحداثيات: 26.2886° N, 50.2084° E'}</span>
              <a
                href={FIRM_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-stone-900 dark:text-stone-100 hover:underline flex items-center gap-1"
              >
                <span>{isEn ? 'Get Directions' : 'توجيهات الوصول'}</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* QR Code Business Card Column (3 cols) */}
          <div className="lg:col-span-3">
            <QrCodeCard isEn={isEn} />
          </div>

        </div>

      </div>
    </section>
  );
};
