import React, { useState, useEffect } from 'react';
import { 
  User, 
  Building, 
  Send, 
  Mail, 
  Copy, 
  Check, 
  Scale, 
  Briefcase, 
  Users, 
  ShieldCheck, 
  Gavel, 
  Building2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { ClientType, LegalCategory, Language } from '../types';
import { FIRM_DETAILS, SERVICES_DATA, TRANSLATIONS } from '../data/translations';

interface ConsultationFunnelProps {
  lang: Language;
  selectedCategoryFromParent?: LegalCategory | null;
  onCategoryHandled?: () => void;
}

export const ConsultationFunnel: React.FC<ConsultationFunnelProps> = ({
  lang,
  selectedCategoryFromParent,
  onCategoryHandled,
}) => {
  const t = TRANSLATIONS[lang];
  const isEn = lang === 'en';

  const [clientType, setClientType] = useState<ClientType>('individual');
  const [category, setCategory] = useState<LegalCategory>('commercial');
  const [subService, setSubService] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle pre-selection from external service card clicks
  useEffect(() => {
    if (selectedCategoryFromParent) {
      setCategory(selectedCategoryFromParent);
      const matched = SERVICES_DATA.find((s) => s.id === selectedCategoryFromParent);
      if (matched) {
        setSubService(isEn ? matched.subServicesEn[0] : matched.subServicesAr[0]);
        if (matched.category === 'business') {
          setClientType('business');
        }
      }
      if (onCategoryHandled) {
        onCategoryHandled();
      }
    }
  }, [selectedCategoryFromParent, isEn, onCategoryHandled]);

  // Keep sub-service aligned when category changes
  const activeService = SERVICES_DATA.find((s) => s.id === category) || SERVICES_DATA[0];
  const currentSubServices = isEn ? activeService.subServicesEn : activeService.subServicesAr;

  useEffect(() => {
    if (!currentSubServices.includes(subService)) {
      setSubService(currentSubServices[0] || '');
    }
  }, [category, currentSubServices, subService]);

  const categoryIcons: Record<LegalCategory, React.ReactNode> = {
    criminal: <Scale className="w-5 h-5" />,
    commercial: <Briefcase className="w-5 h-5" />,
    labor: <Users className="w-5 h-5" />,
    notarization: <ShieldCheck className="w-5 h-5" />,
    consultation: <Gavel className="w-5 h-5" />,
    litigation: <Building2 className="w-5 h-5" />,
  };

  // Generate structured message
  const generateFormattedMessage = () => {
    const clientTypeLabel =
      clientType === 'individual'
        ? isEn ? 'Individual' : 'فرد'
        : isEn ? 'Company / Enterprise' : 'منشأة / شركة';

    const categoryTitle = isEn ? activeService.titleEn : activeService.titleAr;

    if (isEn) {
      return `*Legal Consultation Request | Al-Anazi Law Firm*
━━━━━━━━━━━━━━━━━━━━━
⚖️ *Client Type:* ${clientTypeLabel}
🏢 *Category:* ${categoryTitle}
📌 *Specific Service:* ${subService || 'General Consultation'}
👤 *Name / Enterprise:* ${fullName || '[Not provided]'}
${companyName ? `🏢 *Company:* ${companyName}\n` : ''}📱 *Contact Phone:* ${phone || '[Not provided]'}
${email ? `✉️ *Email:* ${email}\n` : ''}
📝 *Subject Summary:*
${description || 'I would like to schedule a consultation with Lawyer Abdulrahman Al-Anazi regarding the aforementioned matter.'}
━━━━━━━━━━━━━━━━━━━━━
*Requested via official website portal*
Al-Bandariyah Business Center (BBC) - Khobar`;
    }

    return `*طلب استشارة قانونية | مكتب المحامي عبدالرحمن بن عقيل العنزي*
━━━━━━━━━━━━━━━━━━━━━
⚖️ *صفة العميل:* ${clientTypeLabel}
🏛️ *التصنيف القانوني:* ${categoryTitle}
📌 *الخدمة المحددة:* ${subService || 'استشارة عامة'}
👤 *الاسم / مقدم الطلب:* ${fullName || '[لم يُحدد بعد]'}
${companyName ? `🏢 *اسم المنشأة:* ${companyName}\n` : ''}📱 *رقم الجوال:* ${phone || '[لم يُحدد بعد]'}
${email ? `✉️ *البريد الإلكتروني:* ${email}\n` : ''}
📝 *موجز الموضوع:*
${description || 'السلام عليكم ورحمة الله، أود حجز موعد استشارة مع المحامي عبدالرحمن العنزي بخصوص الموضوع الموضح أعلاه.'}
━━━━━━━━━━━━━━━━━━━━━
*مُرسل عبر البوابة الإلكترونية الرسمية*
مركز البندرية للأعمال BBC - الخبر`;
  };

  const validateForm = () => {
    if (!fullName.trim()) {
      setErrorMsg(isEn ? 'Please provide your name.' : 'يرجى كتابة الاسم أو اسم المنشأة.');
      return false;
    }
    if (!phone.trim()) {
      setErrorMsg(isEn ? 'Please provide a valid phone number.' : 'يرجى إدخال رقم الجوال للمتابعة والتواصل.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSendWhatsApp = () => {
    if (!validateForm()) return;
    const msg = generateFormattedMessage();
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/966569339994?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = () => {
    if (!validateForm()) return;
    const msg = generateFormattedMessage();
    const subject = encodeURIComponent(
      isEn
        ? `Legal Inquiry - ${fullName} - ${activeService.titleEn}`
        : `طلب استشارة قانونية - ${fullName} - ${activeService.titleAr}`
    );
    const body = encodeURIComponent(msg);
    window.location.href = `mailto:${FIRM_DETAILS.email}?subject=${subject}&body=${body}`;
  };

  const handleCopy = () => {
    const msg = generateFormattedMessage();
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="consultation" className="py-16 md:py-24 bg-[#EAE6DF] dark:bg-[#181818] transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 mb-3 shadow-sm">
            <FileText className="w-3.5 h-3.5" />
            <span>{t.funnel.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-100 mb-4 tracking-tight">
            {t.funnel.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            {t.funnel.subtitle}
          </p>
        </div>

        {/* Main Interactive Funnel Card */}
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-6 sm:p-10 border border-stone-300 dark:border-stone-700 shadow-xl transition-all">
          
          {/* STEP 1: Client Type */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
              {t.funnel.step1Title}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setClientType('individual')}
                className={`flex items-start gap-4 p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                  clientType === 'individual'
                    ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 shadow-sm ring-1 ring-stone-900 dark:ring-stone-100'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 bg-stone-50/50 dark:bg-stone-900/50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${clientType === 'individual' ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'}`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                    {t.funnel.clientIndividual}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                    {t.funnel.clientIndividualDesc}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setClientType('business')}
                className={`flex items-start gap-4 p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                  clientType === 'business'
                    ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 shadow-sm ring-1 ring-stone-900 dark:ring-stone-100'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 bg-stone-50/50 dark:bg-stone-900/50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${clientType === 'business' ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900' : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'}`}>
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm sm:text-base">
                    {t.funnel.clientBusiness}
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                    {t.funnel.clientBusinessDesc}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* STEP 2: Legal Category */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
              {t.funnel.step2Title}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SERVICES_DATA.map((srv) => {
                const isSelected = category === srv.id;
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setCategory(srv.id)}
                    className={`flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl border text-start transition-all cursor-pointer ${
                      isSelected
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-bold shadow-sm'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-medium'
                    }`}
                  >
                    <span className="shrink-0">{categoryIcons[srv.id]}</span>
                    <span className="text-xs sm:text-sm line-clamp-1">{isEn ? srv.titleEn : srv.titleAr}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Dynamic Sub-Service */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
              {t.funnel.step3Title}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentSubServices.map((sub, idx) => {
                const isSelected = subService === sub;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSubService(sub)}
                    className={`p-3 rounded-xl border text-start text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? 'border-amber-600 dark:border-amber-400 bg-amber-50/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-bold ring-1 ring-amber-600/50'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/40 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-amber-600 dark:bg-amber-400' : 'bg-stone-400'}`} />
                      <span>{sub}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Client Details & Case Summary */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-stone-900 dark:text-stone-100 mb-4">
              {t.funnel.step4Title}
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  {t.funnel.nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.funnel.namePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  {t.funnel.phoneLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.funnel.phonePlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all text-start"
                  dir="ltr"
                  required
                />
              </div>

              {clientType === 'business' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    {t.funnel.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t.funnel.companyPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
                  />
                </div>
              )}

              <div className={clientType === 'business' ? '' : 'sm:col-span-2'}>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  {t.funnel.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.funnel.emailPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                {t.funnel.detailsLabel}
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.funnel.detailsPlaceholder}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-stone-100 transition-all resize-y"
              />
            </div>

            {errorMsg && (
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2.5 rounded-xl border border-red-200 dark:border-red-900">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Formatted Message Live Preview */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#F5F3EF] dark:bg-[#141414] border border-stone-300 dark:border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100" />
                {t.funnel.previewTitle}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.funnel.copied : t.funnel.copyText}</span>
              </button>
            </div>
            <pre className="text-xs text-stone-800 dark:text-stone-200 whitespace-pre-wrap font-sans bg-white dark:bg-stone-900/80 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 leading-relaxed max-h-48 overflow-y-auto">
              {generateFormattedMessage()}
            </pre>
          </div>

          {/* Action CTAs: WhatsApp Primary, Email Secondary */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full sm:flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="w-5 h-5 rtl:rotate-180" />
              <span>{t.funnel.sendWhatsApp}</span>
            </button>

            <button
              type="button"
              onClick={handleSendEmail}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-4 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{t.funnel.sendEmail}</span>
            </button>
          </div>

          {/* Privacy Note */}
          <div className="mt-5 text-center">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {t.funnel.privacyNote}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
