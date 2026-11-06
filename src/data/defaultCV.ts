import { CVData } from '../types/cv';

export const initialCVData: CVData = {
  id: 'cv-1',
  title: 'سيرتي الذاتية الرئيسية',
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'أحمد محمود الزهراني',
    jobTitle: 'مهندس برمجيات أول ومطور واجهات متقدم (Senior Full-Stack Developer)',
    email: 'ahmed.alzahrani@example.com',
    phone: '+966 50 123 4567',
    address: 'الرياض، المملكة العربية السعودية',
    website: 'https://ahmed-portfolio.dev',
    linkedin: 'linkedin.com/in/ahmed-alzahrani',
    github: 'github.com/ahmed-dev',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    summary: 'مهندس برمجيات متمرس بخبرة تزيد عن 6 سنوات في تصميم وبناء تطبيقات الويب الحديثة وحلول السحابة واسعة النطاق. متمكن من تقنيات React و TypeScript و Node.js و Next.js مع شغف عميق بتجربة المستخدم (UX) وهندسة البرمجيات النظيفة وتحسين الأداء بنسبة تفوق 40% في المشاريع السابقة.',
  },
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'مطور واجهات ومشاريع متقدم (Lead Frontend Engineer)',
      company: 'شركة حلول التقنية المتقدمة',
      location: 'الرياض، السعودية',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: '• قيادة فريق مكون من 6 مطورين لبناء منصة رقمية سحابية تخدم أكثر من 200,000 مستخدم نشط شهرياً.\n• إعادة بناء المعمارية البرمجية وتحسين سرعة تحميل النظام بنسبة 45% باستخدام Next.js و Tailwind CSS.\n• تطبيق أفضل ممارسات CI/CD واختبارات الوحدة (Unit Testing) مما خفض نسبة الأخطاء البرمجية بمقدار 30%.'
    },
    {
      id: 'exp-2',
      jobTitle: 'مطور تطبيقات ويب كاملة (Full Stack Developer)',
      company: 'مؤسسة الابتكار الرقمي',
      location: 'دبي، الإمارات (عن بعد)',
      startDate: '2019-06',
      endDate: '2021-12',
      current: false,
      description: '• تطوير وبناء بوابات الدفع الإلكتروني وتكامل واجهات برمجة التطبيقات RESTful و GraphQL.\n• تصميم لوحات تحكم تحليلية تفاعلية للبيانات المالية باستخدام React و TypeScript و Node.js.\n• التعاون مع فرق التصميم والمنتج لتحويل مخططات Figma إلى واجهات تفاعلية فائقة السلاسة.'
    }
  ],
  educations: [
    {
      id: 'edu-1',
      degree: 'بكالوريوس علوم الحاسب والمعلومات',
      fieldOfStudy: 'هندسة البرمجيات ونظم المعلومات',
      institution: 'جامعة الملك سعود',
      location: 'الرياض، السعودية',
      graduationDate: '2019-05',
      grade: 'امتياز مع مرتبة الشرف الأولى (3.92 / 4.0)'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'React.js & Next.js', level: 'خبير', percentage: 95 },
    { id: 'sk-2', name: 'TypeScript / JavaScript', level: 'خبير', percentage: 92 },
    { id: 'sk-3', name: 'Tailwind CSS & UI Systems', level: 'خبير', percentage: 90 },
    { id: 'sk-4', name: 'Node.js & Express / NestJS', level: 'متقدم', percentage: 85 },
    { id: 'sk-5', name: 'REST & GraphQL APIs', level: 'متقدم', percentage: 88 },
    { id: 'sk-6', name: 'Git & DevOps / Docker', level: 'متوسط', percentage: 75 },
    { id: 'sk-7', name: 'PostgreSQL & MongoDB', level: 'متقدم', percentage: 80 }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'منصة إدارة وتتبع المهام السحابية (TaskFlow)',
      description: 'تطبيق ويب متكامل لإدارة المشاريع الجماعية مع ميزات الدردشة المباشرة ولوحات كانبان التفاعلية ومزامنة فورية بواسطة WebSockets.',
      link: 'https://github.com/ahmed-dev/taskflow',
      technologies: 'React, TypeScript, Node.js, Socket.io, Tailwind'
    },
    {
      id: 'proj-2',
      title: 'محرك تحليل الأداء للمتاجر الإلكترونية',
      description: 'نظام تحليل فوري لمتابعة زيارات العملاء ومعدل التحويل مع توليد تقارير مالية وتنبيهات فورية للمخزون.',
      link: 'https://github.com/ahmed-dev/store-analytics',
      technologies: 'Next.js 14, Tailwind, Prisma, Chart.js'
    }
  ],
  languages: [
    { id: 'lang-1', name: 'اللغة العربية', proficiency: 'طلاقة (اللغة الأم)' },
    { id: 'lang-2', name: 'اللغة الإنجليزية', proficiency: 'جيد جداً' }
  ],
  certificates: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services (AWS)',
      date: '2023',
      url: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-2',
      name: 'Meta Certified Front-End Developer Specialization',
      issuer: 'Meta / Coursera',
      date: '2021',
      url: 'https://coursera.org'
    }
  ],
  style: {
    templateId: 'modern',
    primaryColor: '#4f46e5', // Indigo
    secondaryColor: '#0f172a',
    fontFamily: 'Cairo',
    fontSize: 'base',
    spacing: 'normal',
    avatarShape: 'rounded',
    showIcons: true,
    direction: 'rtl'
  }
};
