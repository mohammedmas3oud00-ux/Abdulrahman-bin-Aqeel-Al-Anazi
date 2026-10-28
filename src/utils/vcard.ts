import { FIRM_DETAILS } from '../data/translations';

export const downloadVCard = () => {
  const vCardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:العنزي;عبدالرحمن;بن عقيل;;',
    `FN:${FIRM_DETAILS.nameAr}`,
    `ORG:${FIRM_DETAILS.nameAr}`,
    `TITLE:${FIRM_DETAILS.titleAr}`,
    `TEL;TYPE=CELL,VOICE,WHATSAPP:${FIRM_DETAILS.phoneInternational}`,
    `EMAIL;TYPE=INTERNET,WORK:${FIRM_DETAILS.email}`,
    `ADR;TYPE=WORK:;;${FIRM_DETAILS.addressAr};الخبر;المنطقة الشرقية;;المملكة العربية السعودية`,
    `URL:${FIRM_DETAILS.whatsappUrl}`,
    'NOTE:مكتب المحامي والمستشار القانوني عبدالرحمن بن عقيل العنزي - مركز البندرية للأعمال BBC بالخبر',
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'المحامي_عبدالرحمن_العنزي.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
