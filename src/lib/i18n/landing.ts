import {
  BellRing,
  CalendarDays,
  ChartNoAxesCombined,
  Clock,
  FileStack,
  FolderHeart,
  Gift,
  Globe,
  Languages,
  Layers,
  MessageCircle,
  Smartphone,
  TrendingUp,
  UserX,
  Wallet,
} from "lucide-react";

/**
 * Tabibtree landing page content (Arabic, RTL).
 * Single source of truth — also feeds the FAQPage JSON-LD in src/app/page.tsx.
 */
export const landingContent = {
  brand: {
    name: "طبيب تري",
    nameEn: "Tabibtree",
  },
  contact: {
    whatsapp: "9647806969277",
    whatsappDisplay: "+964 780 696 9277",
    whatsappUrl: "https://wa.me/9647806969277",
  },
  nav: [
    { label: "المميزات", href: "#features" },
    { label: "كيف يعمل", href: "#how-it-works" },
    { label: "الباقات", href: "#pricing" },
    { label: "أسئلة شائعة", href: "#faq" },
  ],
  navCta: {
    login: "دخول",
    signup: "ابدأ مجاناً",
    mobileMenuLabel: "قائمة التنقل",
    openMenuLabel: "فتح القائمة",
  },
  hero: {
    badge: "نظام إدارة عيادات — بالعربي",
    title: "عيادتك في جيبك",
    // Split form of `title` used by /landingpage to underline the accent word.
    titleAccent: "عيادتك",
    titleRest: "في جيبك",
    subtitle:
      "إدارة عيادة كاملة — بالعربي، على جوّالك. نظّم المواعيد، سجلات المرضى، الحسابات، وتذكير الواتساب — كله في تطبيق واحد. مجاني للبدء.",
    primaryCta: "ابدأ الآن مجاناً",
    secondaryCta: "شوف كيف يشتغل",
    trustBadges: ["بدون بطاقة ائتمان", "بدون التزام", "إلغاء في أي وقت"],
    imageAlt:
      "لوحة تحكم طبيب تري على الجوال — جدول المواعيد وسجلات المرضى باللغة العربية",
  },
  // Keyword ticker shown under the hero on /landingpage (decorative).
  marquee: {
    items: [
      "جدول مواعيد مرئي",
      "تذكير واتساب تلقائي",
      "سجلات مرضى كاملة",
      "لوحة مالية فورية",
      "صفحة حجز عامة",
      "عربي أصلي — RTL",
      "مصمم للجوال أولاً",
      "مجاني للبدء",
    ],
  },
  pain: {
    badge: "المشكلة",
    title: "تعبت من فوضى الورق والواتساب في عيادتك؟",
    items: [
      {
        icon: FileStack,
        title: "ساعات ضائعة كل يوم",
        description: "تدوّر ملفات وتصحّح أخطاء بدل ما تركز على مرضاك",
        quote:
          "— طبيب عام، عيادة خاصة",
      },
      {
        icon: UserX,
        title: "مرضى يغيبون بدون إنذار وتخسر فلوس",
        description: "مواعيد محجوزة تضيع بسبب النسيان — ولاك متابعة ولاك تذكير",
        quote:
          "— طبيب أسنان، عيادة خاصة",
      },
      {
        icon: Wallet,
        title: "توصل آخر الشهر وما تعرف إذا ربحت",
        description: "الكاش ينخلط والمصروفات مبهمة — ماكو صورة واضحة عن الأرباح",
        quote:
          "— طبيبة عامة، عيادة خاصة",
      },
    ],
    roiCallout: "عيادة صغيرة تخسر 240,000 د.ع شهرياً من غياب المرضى",
  },
  solution: {
    badge: "الحل",
    title: "طبيب تري: كل شيء في مكان واحد",
    items: [
      {
        icon: Clock,
        title: "وفّر ساعتين كل يوم",
        description: "ودّع الورق والواتساب والفوضى — جدول واحد منظم لكل شي",
      },
      {
        icon: BellRing,
        title: "قلّل غياب المرضى للنصف",
        description: "تذكير واتساب تلقائي قبل كل موعد — بدون ما ترفع إصبع",
      },
      {
        icon: TrendingUp,
        title: "اعرف أرباح عيادتك فوراً",
        description: "لوحة مالية كاملة — حسب الدكتور، الخدمة، واليوم",
      },
      {
        icon: Globe,
        title: "صفحة حجز عامة مجانية",
        description: "مرضاك يحجزون أونلاين 24/7 من جوّالاتهم — بدون اتصال",
      },
    ],
  },
  howItWorks: {
    badge: "كيف يعمل",
    title: "ابدأ في 3 خطوات بسيطة",
    steps: [
      {
        title: "سجّل عيادتك",
        description: "دقيقتين — اسم العيادة، التخصص، الموقع",
      },
      {
        title: "أضف مواعيدك",
        description: "حدد أوقات الدوام والأطباء والخدمات",
      },
      {
        title: "شارك صفحة الحجز",
        description: "مرضاك يحجزون أونلاين فوراً — ويرسل لهم تذكير واتساب تلقائي",
      },
    ],
  },
  features: {
    badge: "المميزات",
    title: "كل اللي تحتاجه عيادتك — في تطبيق واحد",
    items: [
      {
        icon: CalendarDays,
        title: "جدول مواعيد مرئي",
        jtbd: "Never double-book or lose a slot",
        description: "عرض شهري، أسبوعي، يومي — ألوان لكل دكتور — سحب وإفلات",
      },
      {
        icon: FolderHeart,
        title: "سجلات مرضى كاملة",
        jtbd: "Patient history at my fingertips",
        description: "ملفات، زيارات، تشخيص، وصفات، تحاليل — كل شي في مكان واحد",
      },
      {
        icon: MessageCircle,
        title: "تذكير واتساب تلقائي",
        jtbd: "Patients actually show up",
        description: "تأكيد، تذكير، إعادة جدولة — تلقائي بالكامل — توصيل مضمون",
      },
      {
        icon: ChartNoAxesCombined,
        title: "لوحة مالية فورية",
        jtbd: "Know if I made money this month",
        description: "دخل، مصروفات، أرباح حسب الدكتور والخدمة — رسم بياني",
      },
      {
        icon: Globe,
        title: "صفحة حجز عامة",
        jtbd: "Patients book without calling",
        description:
          "clinic-name.tabibtree.iq — خريطة، مواعيد متاحة، حجز فوري — QR كود",
      },
    ],
    // Strings for the decorative pure-CSS product mockups (/landingpage bento).
    mock: {
      calendarCaption: "مواعيد اليوم",
      whatsappMessage: "تذكير: موعدك غداً الساعة ٥ مساءً — د. أحمد",
      whatsappStatus: "تم التوصيل",
      financeLabel: "دخل هذا الأسبوع",
      bookingUrl: "clinic.tabibtree.iq",
      bookingCta: "احجز موعدك",
      bookingSlots: ["١٠:٠٠ ص", "١١:٣٠ ص", "١:٠٠ م"],
    },
  },
  pricing: {
    badge: "الباقات",
    title: "ابدأ مجاناً — طوّر لما تكبر عيادتك",
    recommendedBadge: "الموصى به",
    currency: "د.ع",
    period: "/شهرياً",
    freePrice: "مجاني",
    plans: [
      {
        name: "البداية",
        price: null,
        audience: "لأصحاب العيادات الصغيرة",
        highlight: false,
        features: [
          "طبيب واحد",
          "50 مريض",
          "50 موعد شهرياً",
          "صفحة حجز عامة",
          "بدون واتساب",
        ],
        cta: "ابدأ مجاناً",
      },
      {
        name: "الاحترافية",
        price: "75,000",
        audience: "لأغلب العيادات",
        highlight: true,
        features: [
          "حتى 3 أطباء",
          "مرضى ومواعيد غير محدودة",
          "500 رسالة واتساب شهرياً",
          "تقارير متقدمة",
          "دعم أولوية",
        ],
        cta: "ابدأ الآن",
      },
      {
        name: "الأعمال",
        price: "200,000",
        audience: "للعيادات الكبيرة",
        highlight: false,
        features: [
          "حتى 10 أطباء",
          "كل مميزات الاحترافية",
          "3,000 رسالة واتساب شهرياً",
          "تحليلات متقدمة",
          "مدير حساب مخصص",
        ],
        cta: "ابدأ الآن",
      },
    ],
    trustLabel: "كل الباقات تشمل:",
    trustSignals: [
      "صفحة حجز عامة مجانية",
      "سجلات مرضى غير محدودة",
      "دعم واتساب مباشر",
    ],
  },
  whyUs: {
    badge: "لماذا طبيب تري؟",
    title: "ليش العيادات العراقية تختار طبيب تري؟",
    items: [
      {
        icon: Languages,
        title: "عربي أصلي — مش مترجم",
        description: "مبني بالعربية من الصفر — تخطيط RTL، تواريخ هجرية، نسخ عربي طبيعي",
      },
      {
        icon: MessageCircle,
        title: "واتساب مدمج بالكامل",
        description: "مش مجرد إضافة — تكامل سحابي حقيقي مع تتبع توصيل الرسائل",
      },
      {
        icon: Smartphone,
        title: "يشتغل على جوّالك",
        description: "مصمم للجوال أولاً — مثل التطبيقات اللي تستخدمها يومياً",
      },
      {
        icon: Layers,
        title: "كل شي في مكان واحد",
        description: "مواعيد + سجلات + حسابات + تحليلات + صفحة عامة — بدون تنقل بين أدوات",
      },
      {
        icon: Gift,
        title: "مجاني للبدء",
        description: "باقة كاملة مجاناً — مش نسخة تجريبية محدودة",
      },
      {
        icon: Globe,
        title: "صفحة حجز عامة مجانية",
        description: "موقع إلكتروني احترافي لعيادتك — بدون تكلفة إضافية",
      },
    ],
  },
  faq: {
    badge: "الأسئلة الشائعة",
    title: "أسئلة شائعة",
    items: [
      {
        question: "هل أحتاج خبرة في التكنولوجيا؟",
        answer:
          "لا — إذا تعرف تستخدم واتساب وتقويم الجوال، تعرف تستخدم طبيب تري. مصمم للناس اللي ما استخدموا برامج عيادات من قبل.",
      },
      {
        question: "بيانات المرضى — هل هي آمنة؟",
        answer:
          "بيانات عيادتك معزولة تماماً. مشفرة. أنت تتحكم مين يشوف شنو (موظف، طبيب، مدير). أكثر أماناً من ملفات ورقية.",
      },
      {
        question: "شنو إذا انقطع الإنترنت؟",
        answer:
          "يشتغل على بيانات الجوال — أخف من فيديو واتساب. وإذا انقطع، كل البيانات محفوظة — ما تضيع شي.",
      },
      {
        question: "هل في فترة تجريبية؟",
        answer:
          "الباقة الأساسية مجانية طول الوقت — لحد 50 مريض و50 موعد شهرياً. بدون التزام.",
      },
      {
        question: "كم تكلفة الباقة الاحترافية؟",
        answer: "75,000 دينار شهرياً — أقل من سعر غياب مريض واحد بالشهر.",
      },
      {
        question: "هل تقدر تنقل بياناتي القديمة؟",
        answer:
          "نعم — فريقنا يساعدك تنقل بيانات مرضاك من الورق أو الإكسل. بدون تعقيد.",
      },
    ],
  },
  finalCta: {
    title: "عيادتك الرقمية تبدأ اليوم — مجاناً",
    subtitle: "بدون بطاقة ائتمان. بدون التزام. دقيقتين فقط.",
    cta: "ابدأ عيادتك الآن",
    trustSignals: [
      "انضم إلى العيادات العراقية اللي استخدمت طبيب تري",
      "دعم مباشر واتساب",
      "إلغاء في أي وقت",
    ],
  },
  footer: {
    description:
      "نظام إدارة عيادات عربي — مواعيد، سجلات مرضى، حسابات، وتذكير واتساب في تطبيق واحد.",
    whatsappLabel: "دعم واتساب",
    // TODO: some plan links (عن طبيب تري، وظائف، فيديوهات تعليمية، شروط الخدمة، سياسة الخصوصية)
    // need dedicated pages — they're listed with "#" until those exist.
    columns: [
      {
        title: "المنتج",
        links: [
          { label: "المميزات", href: "#features" },
          { label: "الأسعار", href: "#pricing" },
          { label: "كيف يعمل", href: "#how-it-works" },
          { label: "التحديثات", href: "#" },
        ],
      },
      {
        title: "الشركة",
        links: [
          { label: "عن طبيب تري", href: "#" },
          { label: "اتصل بنا", href: "https://wa.me/9647806969277" },
          { label: "وظائف", href: "#" },
        ],
      },
      {
        title: "المساعدة",
        links: [
          { label: "الأسئلة الشائعة", href: "#faq" },
          { label: "فيديوهات تعليمية", href: "#" },
          { label: "دعم واتساب", href: "https://wa.me/9647806969277" },
        ],
      },
      {
        title: "قانوني",
        links: [
          { label: "شروط الخدمة", href: "#" },
          { label: "سياسة الخصوصية", href: "#" },
        ],
      },
    ],
    copyright: "© 2026 طبيب تري — Tabibtree. جميع الحقوق محفوظة.",
  },
  jsonLd: {
    organizationName: "طبيب تري — Tabibtree",
    organizationDescription:
      "نظام إدارة عيادات عربي — مواعيد، سجلات مرضى، حسابات، وتذكير واتساب في تطبيق واحد.",
  },
} as const;

export type LandingContent = typeof landingContent;
