import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Download, Check, ShieldCheck, Share2 } from 'lucide-react';
import { AiaLogo } from './AiaLogo';
import { FIRM_DETAILS, TRANSLATIONS } from '../data/translations';
import { Language } from '../types';
import { downloadVCard } from '../utils/vcard';

interface DigitalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DigitalCardModal: React.FC<DigitalCardModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';
  const [downloaded, setDownloaded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    downloadVCard();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: FIRM_DETAILS.nameAr,
        text: `${FIRM_DETAILS.nameAr} - ${FIRM_DETAILS.titleAr}\n${FIRM_DETAILS.addressAr}\nهاتف: ${FIRM_DETAILS.phone}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const qrImageSrc = '/assets/qr_whatsapp.png';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#F5F3EF] dark:bg-[#1E1E1E] border border-stone-300 dark:border-stone-700 shadow-2xl p-6 sm:p-8 overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 end-5 p-2 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-6 text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <span>{t.digitalCard.title}</span>
        </div>

        {/* Physical-style Card Container */}
        <div className="rounded-2xl bg-white dark:bg-[#141414] border border-stone-300 dark:border-stone-800 p-6 sm:p-7 shadow-lg relative overflow-hidden">
          {/* Subtle gold accent line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-stone-800 via-amber-600 to-stone-800" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
            <AiaLogo size="lg" isEn={isEn} />
            <div className="sm:text-end text-xs font-semibold text-stone-500 dark:text-stone-400">
              <span className="block font-bold text-stone-900 dark:text-stone-100">{isEn ? 'Al Khobar BBC' : 'الخبر - مركز BBC'}</span>
              <span>{isEn ? 'Commercial & Criminal' : 'ترافع واستشارات'}</span>
            </div>
          </div>

          <div className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            {/* Contact details */}
            <div className="sm:col-span-8 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5 text-stone-800 dark:text-stone-200">
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-bold" dir="ltr">{FIRM_DETAILS.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-800 dark:text-stone-200">
                <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="break-all">{FIRM_DETAILS.email}</span>
              </div>
              <div className="flex items-start gap-2.5 text-stone-800 dark:text-stone-200">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>{isEn ? FIRM_DETAILS.addressEn : FIRM_DETAILS.addressAr}</span>
              </div>
            </div>

            {/* Micro QR Code */}
            <div className="sm:col-span-4 flex justify-center">
              <div className="p-2 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-center">
                <img
                  src={qrImageSrc}
                  alt="QR Code"
                  className="w-24 h-24 object-contain mx-auto"
                />
                <span className="block text-[10px] text-stone-500 mt-1">{isEn ? 'Scan WhatsApp' : 'مسح للواتساب'}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
            <span>{t.digitalCard.verified}</span>
            <span className="font-mono">BBC - Al Khobar</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900 hover:bg-black text-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs sm:text-sm font-bold shadow transition-all cursor-pointer"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{isEn ? 'Saved to phone!' : 'تم حفظ جهة الاتصال!'}</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{t.digitalCard.downloadVCard}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copiedShare ? (isEn ? 'Link copied!' : 'تم نسخ الرابط!') : t.digitalCard.share}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
