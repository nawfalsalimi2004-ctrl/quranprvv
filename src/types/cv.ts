export interface PersonalInfo {
  fullName: string;
  firstName?: string;
  lastName?: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  postalCode?: string;
  city?: string;
  website: string;
  linkedin: string;
  github: string;
  avatarUrl: string;
  summary: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  driverLicense?: string;
  gender?: string;
  nationality?: string;
  maritalStatus?: string;
  customFields?: Array<{ id: string; label: string; value: string }>;
  isJobTitleAsCVTitle?: boolean;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  location: string;
  graduationDate: string;
  grade: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم' | 'خبير';
  percentage: number; // 0 - 100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
  technologies: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'مبتدئ' | 'متوسط' | 'جيد جداً' | 'طلاقة (اللغة الأم)';
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export type TemplateId = 'modern' | 'executive' | 'classic' | 'creative' | 'minimal';

export type FontFamily = 'Cairo' | 'Tajawal' | 'Almarai' | 'Inter';

export interface StyleConfig {
  templateId: TemplateId;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: FontFamily;
  fontSize: 'sm' | 'base' | 'lg';
  spacing: 'compact' | 'normal' | 'relaxed';
  avatarShape: 'circle' | 'rounded' | 'square' | 'none';
  showIcons: boolean;
  direction: 'rtl' | 'ltr';
  showWatermark?: boolean;
  watermarkText?: string;
}

export interface CVData {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certificates: Certificate[];
  style: StyleConfig;
}
