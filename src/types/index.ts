export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export type ClientType = 'individual' | 'business';

export type LegalCategory = 
  | 'criminal' 
  | 'commercial' 
  | 'labor' 
  | 'notarization' 
  | 'consultation' 
  | 'litigation';

export interface ServiceItem {
  id: LegalCategory;
  titleAr: string;
  titleEn: string;
  category: 'individual' | 'business' | 'both';
  icon: string;
  summaryAr: string;
  summaryEn: string;
  subServicesAr: string[];
  subServicesEn: string[];
}

export interface ConsultationFormData {
  clientType: ClientType;
  category: LegalCategory;
  subService: string;
  fullName: string;
  phone: string;
  email?: string;
  companyName?: string;
  description: string;
  preferredTime?: string;
}
