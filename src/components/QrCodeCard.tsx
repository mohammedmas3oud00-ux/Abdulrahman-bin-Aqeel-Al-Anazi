import React, { useState } from 'react';
import { QrCode, Phone, Check, ExternalLink, Download } from 'lucide-react';
import { FIRM_DETAILS } from '../data/translations';
import { downloadVCard } from '../utils/vcard';

interface QrCodeCardProps {
  isEn?: boolean;
}

export const QrCodeCard: React.FC<QrCodeCardProps> = ({ isEn = false }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    downloadVCard();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  // High quality QR code pointing to official WhatsApp
  const qrTargetUrl = encodeURIComponent(`https://wa.me/966569339994?text=${encodeURIComponent(isEn ? 'Hello Lawyer Abdulrahman Al-Anazi, I would like to request legal consultation.' : 'السلام عليكم ورحمة الله، أود الاستفسار عن استشارة قانونية لدى مكتبكم الكريم.')}`);
  const qrImageSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${qrTargetUrl}&color=14-14-14&bgcolor=F5-F3-EF&margin=1`;

  return (
    <div className="relative rounded-2xl bg-[#F5F3EF] dark:bg-[#1E1E1E] p-6 border border-stone-300 dark:border-stone-700 shadow-md flex flex-col items-center text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 mb-4">
        <QrCode className="w-3.5 h-3.5" />
        <span>{isEn ? 'Official Digital Card' : 'بطاقة الأعمال الرقمية المباشرة'}</span>
      </div>

      <h4 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
        {isEn ? 'Instant WhatsApp QR Code' : 'رمز الاستجابة السريعة (QR Code)'}
      </h4>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-4 max-w-xs">
        {isEn
          ? 'Scan with your smartphone camera to connect directly with Lawyer Abdulrahman Al-Anazi'
          : 'امسح الرمز بكاميرا هاتفك لبدء محادثة واتساب مشفرة ومباشرة مع المكتب'}
      </p>

      {/* QR Code Container with luxury border and center badge */}
      <div className="relative p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-300 dark:border-stone-700 shadow-inner group">
        <img
          src={qrImageSrc}
          alt="WhatsApp QR Code - المحامي عبدالرحمن بن عقيل العنزي"
          className="w-44 h-44 object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
        {/* Official logo emblem in center of QR code */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-white dark:bg-stone-900 flex items-center justify-center border-2 border-stone-300 dark:border-stone-700 shadow-md p-0.5">
            <img
              src="/assets/aistudio/image_83ee1dd5.png"
              alt="AIA"
              className="w-full h-full object-contain dark:invert"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col w-full gap-2">
        <a
          href={FIRM_DETAILS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-stone-100 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
        >
          <Phone className="w-4 h-4 text-emerald-500" />
          <span>{isEn ? 'Open WhatsApp Directly' : 'فتح المحادثة بالواتساب مباشرة'}</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>

        <button
          type="button"
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors"
        >
          {downloaded ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isEn ? 'Contact Downloaded!' : 'تم تنزيل جهة الاتصال!'}</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>{isEn ? 'Save vCard to Contacts' : 'حفظ الرقم في جهات الاتصال (vCard)'}</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-3 text-[11px] text-stone-500 dark:text-stone-400">
        0569339994 • AQR.LAW3@GMAIL.COM
      </div>
    </div>
  );
};
