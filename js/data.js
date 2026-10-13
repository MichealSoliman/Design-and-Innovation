// ==========================================
// RIWAQ Woodcraft & Luxury Furniture
// Configuration & Slides Data
// ==========================================

const LUXURY_SLIDES_DATA = {
  brand: {
    name: "رِواق",
    tagline: "للأعمال الخشبية والأثاث الفاخر",
    phone: "+966500000000",
    whatsapp: "https://wa.me/966500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AD%D9%88%D9%84%20%D8%AA%D9%81%D8%B5%D9%8A%D9%84%20%D8%A3%D8%AB%D8%A7%D8%AB%20%D8%AE%D8%B4%D8%A8%D9%8A",
  },
  autoplayDuration: 5500, // milliseconds per slide
  slides: [
    {
      id: 1,
      category: "خزائن مصممة حسب الطلب",
      categoryShort: "خزائن ملابس",
      badge: "دواليب ووحدات تخزين ذكية",
      title: "مساحة أذكى.. وأناقة تدوم في كل زاوية",
      description: "خزائن ملابس وغرف Walk-in Closet بتوزيع هندسي مدروس يستغل المساحات بذكاء استثنائي، ويجمع بين دفء خشب الجوز وفخامة التشطيبات العصرية المضيئة.",
      primaryCta: {
        text: "اكتشف الخزائن",
        href: "#wardrobes"
      },
      secondaryCta: {
        text: "طلب مقاسات خاصة",
        href: "#consultation"
      },
      image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1920&q=80",
      thumbImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=300&q=80",
      alt: "خزانة ملابس خشبية فاخرة بتصميم مودرن وإضاءة داخلية دافئة"
    },
    {
      id: 2,
      category: "غرف نوم متكاملة وفندقية",
      categoryShort: "غرف النوم",
      badge: "أجنحة نوم رئيسية مخصصة",
      title: "تفاصيل متناغمة تصنع هدوء المكان وسكونه",
      description: "أجنحة نوم راقية تدمج بين راحة الاستخدام، وحلول التخزين الخفية، وجمال الأخشاب الطبيعية المختارة بعناية لتمنح غرفتك طابعاً فندقياً ساحراً.",
      primaryCta: {
        text: "اكتشف غرف النوم",
        href: "#bedrooms"
      },
      secondaryCta: {
        text: "معرض المشاريع",
        href: "#projects"
      },
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80",
      thumbImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=300&q=80",
      alt: "غرفة نوم رئيسية فاخرة بأثاث خشبي راقٍ وتكسيات جدارية دافئة"
    },
    {
      id: 3,
      category: "تصميم وتفصيل المطابخ",
      categoryShort: "المطابخ الخشبية",
      badge: "مطابخ عصرية متكاملة",
      title: "جمال في التفاصيل.. وذكاء في كل حركة واستخدام",
      description: "مطابخ مصممة لتناسب أبعاد مساحتك واحتياجاتك اليومية بدقة متناهية، مع خزائن مقاومة للرطوبة، ومفصلات أوروبية ذكية وتشطيبات خشبية تدوم لأجيال.",
      primaryCta: {
        text: "اكتشف المطابخ",
        href: "#kitchens"
      },
      secondaryCta: {
        text: "احجز زيارة استشارية",
        href: "#consultation"
      },
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1920&q=80",
      thumbImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80",
      alt: "مطبخ خشبي عصري فاخر بتشطيبات رخامية وخزائن مفصلة حسب الطلب"
    },
    {
      id: 4,
      category: "التكسيات والبارتشنات المعمارية",
      categoryShort: "تكسيات وفواصل",
      badge: "ديكورات جدارية ثلاثية الأبعاد",
      title: "لمسات معمارية تعيد صياغة جدران مسكنك",
      description: "بدائل وفواصل خشبية وتكسيات جدارية شرائحية تضيف عمقاً بصرياً وفخامة استثنائية للمجالس والصالات والمداخل، بتناغم تام بين الإضاءة وخامة الخشب.",
      primaryCta: {
        text: "اكتشف التكسيات",
        href: "#cladding"
      },
      secondaryCta: {
        text: "استعراض الكتالوج",
        href: "#catalog"
      },
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
      thumbImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80",
      alt: "تكسيات خشبية وفواصل جدارية معمارية راقية في صالة معيشة فاخرة"
    },
    {
      id: 5,
      category: "التسريحات ووحدات التزيين",
      categoryShort: "تسريحات ومكياج",
      badge: "وحدات جمالية خاصة",
      title: "أناقة شخصية تجمع الإضاءة والجمال الخشبي",
      description: "وحدات تزيين وتسريحات مبتكرة مزودة بمرايا ذكية وإضاءات مدمجة وأدراج مقسمة مخملية، منفذة يدويًا بأرقى أخشاب الجوز والبلوط الطبيعي.",
      primaryCta: {
        text: "اكتشف وحدات التسريح",
        href: "#vanity"
      },
      secondaryCta: {
        text: "اطلب تصميمك الخاص",
        href: "#custom-order"
      },
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1920&q=80",
      thumbImage: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80",
      alt: "وحدة تسريحة خشبية أنيقة مع مرآة مضاءة وتفاصيل خشبية متقنة"
    }
  ],
  services: [
    {
      id: 1,
      num: "01",
      name: "خزائن ودواليب الملابس",
      title: "مساحة لكل تفصيلة",
      description: "حلول تخزين تساعد على استغلال المساحة بذكاء، مع تصميمات تتناسب مع الغرفة واحتياجات الاستخدام اليومية.",
      image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=80",
      spec: "خزائن Walk-in • إضاءات LED مخفية • أرفف ذكية",
      dimensions: "DIM: 360 × 260 CM",
      href: "#wardrobes",
      badge: "خزائن مخصصة"
    },
    {
      id: 2,
      num: "02",
      name: "غرف النوم",
      title: "تناغم يصنع الراحة",
      description: "تصميمات غرف نوم تهتم بتناسق القطع والخامات والمساحات، من السرير إلى وحدات التخزين.",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
      spec: "أجنحة فندقية • أسرّة خشبية • تكسيات خلفية دافئة",
      dimensions: "DIM: 420 × 380 CM",
      href: "#bedrooms",
      badge: "أجنحة نوم رئيسية"
    },
    {
      id: 3,
      num: "03",
      name: "التسريحات ووحدات المكياج",
      title: "تفاصيل صغيرة.. بحضور كبير",
      description: "وحدات أنيقة تجمع بين المظهر المميز والاستخدام العملي، بتصميم يناسب المساحة المحيطة.",
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1600&q=80",
      spec: "مرايا ذكية • أدراج مخملية مقسمة • إضاءة متوازنة",
      dimensions: "DIM: 160 × 85 CM",
      href: "#vanity",
      badge: "وحدات تزيين خاصة"
    },
    {
      id: 4,
      num: "04",
      name: "البارتشنات والفواصل الخشبية",
      title: "افصل المساحة دون أن تفقد اتساعها",
      description: "فواصل خشبية تضيف خصوصية وتنظيمًا للمكان، مع الحفاظ على الانسجام مع بقية التصميم.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      spec: "شرائح خشبية معمارية • فواصل دوارة • تهوية وبصرية",
      dimensions: "DIM: 280 × 290 CM",
      href: "#partitions",
      badge: "قواطع معمارية"
    },
    {
      id: 5,
      num: "05",
      name: "التكسيات والديكورات الجدارية",
      title: "الجدران جزء من الحكاية",
      description: "تكسيات وديكورات خشبية تضيف عمقًا بصريًا وتربط تفاصيل التصميم الداخلي معًا.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      spec: "تكسيات ثلاثية الأبعاد • عزل صوتي جمالي • أخشاب طبيعية",
      dimensions: "DIM: 520 × 300 CM",
      href: "#cladding",
      badge: "تكسيات جدارية"
    },
    {
      id: 6,
      num: "06",
      name: "المطابخ الخشبية",
      title: "تصميم جميل.. واستخدام أذكى",
      description: "حلول مطابخ تراعي توزيع الوحدات ومساحات العمل والتخزين، مع اهتمام بالتفاصيل والتشطيبات.",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
      spec: "مفصلات أوروبية ذكية • خامات مقاومة للرطوبة • جزر خشبية",
      dimensions: "DIM: 480 × 340 CM",
      href: "#kitchens",
      badge: "مطابخ عصرية"
    },
    {
      id: 7,
      num: "07",
      name: "الأبواب والأرفف ووحدات التخزين",
      title: "تكامل التفاصيل",
      description: "عناصر خشبية تكمل تصميم المكان، من وحدات التخزين إلى الأرفف والتفاصيل المعمارية.",
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1600&q=80",
      spec: "أبواب مخفية Pivot • رفوف عائمة • مكتبات حائطية",
      dimensions: "DIM: 220 × 280 CM",
      href: "#storage",
      badge: "أبواب وأرفف"
    },
    {
      id: 8,
      num: "08",
      name: "الأثاث المصمم حسب الطلب",
      title: "تصميم يبدأ من احتياجك",
      description: "أفكار أثاث مصممة لتناسب طبيعة المساحة ومتطلبات الاستخدام، وفقًا للإمكانيات والخدمات المتاحة.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80",
      spec: "طاولات طعام حرة • كونسول فاخر • تصميم هندسي خاص",
      dimensions: "DIM: BESPOKE ORDER",
      href: "#custom-furniture",
      badge: "أثاث حسب الطلب"
    }
  ],
  transformationProject: {
    category: "تحوّل التصميم / DESIGN TRANSFORMATION",
    title: "المساحة نفسها... حكاية مختلفة",
    subtitle: "التصميم الجيد لا يضيف أثاثًا فقط، بل يعيد تنظيم المساحة ويمنح كل تفصيلة دورًا واضحًا.",
    beforeImg: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    afterImg: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
    projectDetails: {
      type: "جناح نوم رئيسي بخزانة مدمجة وتكسيات جدارية",
      challenge: "تنظيم مساحة التخزين مع الحفاظ على مظهر الغرفة وهدوئها البصري واستغلال الجدار الرئيسي دون تضييق الممر.",
      concept: "دمج الخزانة ووحدات التخزين في التكوين المعماري واختيار خشب الجوز الدافئ مع مسارات إضاءة مخفية.",
      result: "مساحة أكثر اتساعاً وتنظيماً وتكاملاً بصرياً ووظيفياً مع إخفاء 100% من فوضى التخزين اليومية."
    },
    indicators: [
      {
        id: "space",
        num: "01",
        title: "استغلال المساحة",
        badge: "كفاءة الفراغ",
        desc: "تحويل الجدار المهدر إلى خزانة حائطية مدمجة تستوعب كافة الاحتياجات دون التعدي على المساحة الحيوية للحركة."
      },
      {
        id: "materials",
        num: "02",
        title: "تناسق الخامات",
        badge: "هارموني طبيعي",
        desc: "دمج خشب الجوز الأمريكي الطبيعي المشبع بالزيوت العضوية مع لمسات الإضاءة الدافئة والمفروشات الناعمة."
      },
      {
        id: "integration",
        num: "03",
        title: "تكامل التصميم",
        badge: "وحدة معمارية",
        desc: "تناغم رأس السرير مع التسريحة والأرفف الجدارية في خط معماري واحد يعطي شعوراً بالفخامة الفندقية الدائمة."
      }
    ]
  },
  designDnaData: {
    badge: "OUR DESIGN DNA / فلسفتنا",
    titlePart1: "الفرق الحقيقي..",
    titlePart2: "في التفاصيل التي تصنع التصميم",
    description: "ننظر إلى الأثاث بوصفه جزءًا من المساحة، لا قطعة منفصلة عنها. لذلك يبدأ التفكير في التصميم من احتياجات الاستخدام، مرورًا بتوزيع المساحة، وصولًا إلى تناسق الخامات والتفاصيل.",
    principles: [
      {
        id: "dna-01",
        num: "01",
        title: "التصميم يبدأ من احتياجك",
        desc: "فهم طبيعة المساحة وطريقة استخدامها يساعد على اختيار تصميم يتناسب مع احتياجات المكان، بدلًا من الاعتماد على شكل جميل فقط.",
        visualElement: "مساحة تخزين مدمجة بتوزيع هندسي مدروس",
        focusTag: "هندسة التخزين والاستخدام اليومي",
        coordinate: "ZONE 01 • SPATIAL UTILITY",
        image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85",
        alt: "مساحة تخزين مدمجة وخزانة ملابس ذكية توضح العلاقة بين الوظيفة والتصميم"
      },
      {
        id: "dna-02",
        num: "02",
        title: "لكل مساحة حل مناسب",
        desc: "توزيع العناصر بصورة مدروسة يساعد على الاستفادة من المساحة، مع مراعاة سهولة الحركة وتناسق الأثاث مع المكان.",
        visualElement: "توزيع انسيابي يراعي الحركة واستغلال المساحة الرأسية",
        focusTag: "سهولة التدفق والانسيابية المكانية",
        coordinate: "ZONE 02 • PROPORTION & FLOW",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        alt: "توزيع معماري متناسق للأثاث والبارتشنات الخشبية يسهل الحركة"
      },
      {
        id: "dna-03",
        num: "03",
        title: "الخامات تصنع الشخصية",
        desc: "اختيار ألوان الخشب وملامس الخامات والتشطيبات يؤثر في الطابع العام للقطعة وفي انسجامها مع التصميم الداخلي.",
        visualElement: "خشب جوز وبلوط طبيعي بتشطيبات غير لامعة",
        focusTag: "أصالة الخامات وانعكاس الضوء الطبيعي",
        coordinate: "ZONE 03 • TEXTURE & TACTILITY",
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1600&q=85",
        alt: "ملمس وتفاصيل خشب الجوز الطبيعي والتشطيبات السطحية الراقية"
      },
      {
        id: "dna-04",
        num: "04",
        title: "التفاصيل تربط التصميم معًا",
        desc: "من الخطوط إلى النسب وتناسق القطع، تساعد التفاصيل المدروسة على جعل الأثاث جزءًا متكاملًا من المساحة.",
        visualElement: "خطوط متصلة ونسب هندسية تربط عناصر الفراغ",
        focusTag: "التناغم الإنشائي والتكامل البصري",
        coordinate: "ZONE 04 • HOLISTIC INTEGRATION",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",
        alt: "تناسق شامل للتكسيات والأثاث يربط عناصر الغرفة ككتلة معمارية واحدة"
      }
    ]
  },
  footerData: {
    taglineBadge: "LET'S BUILD SOMETHING TIMELESS",
    headingMain: "للمساحات حكاية..",
    headingHighlight: "دعنا نصنعها معاً",
    description: "سواء كنت تخطط لخزانة جديدة، أو غرفة نوم متكاملة، أو مطبخ بتصميم خاص، ابدأ رحلتك باختيار التصميم الذي يناسب مساحتك. نصمم وننفّذ أثاثاً يعكس ذوقك ويدوم لأجيال.",
    brandBio: "حلول خشبية تجمع بين التصميم المدروس، وجمال الخامات، والاهتمام بتفاصيل المساحة. نصنع كل قطعة بشغف ومهارة هندسية استثنائية.",
    contactInfo: {
      phone: "+966 50 000 0000",
      phoneTel: "+966500000000",
      whatsapp: "https://wa.me/966500000000?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A8%D8%AF%D8%A1%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%D9%8A%20%D9%85%D8%B9%20%D8%B1%D9%90%D9%88%D8%A7%D9%82",
      email: "info@riwaq-wood.com",
      address: "الرياض، المملكة العربية السعودية - حي الملقا",
      hours: "السبت – الخميس: 9:00 ص – 9:00 م"
    },
    socialLinks: [
      { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
      { name: "Pinterest", url: "https://pinterest.com", icon: "pinterest" },
      { name: "WhatsApp", url: "https://wa.me/966500000000", icon: "whatsapp" },
      { name: "X", url: "https://x.com", icon: "twitter" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" }
    ]
  }
};

// Ensure global attachment for all browser environments
if (typeof window !== 'undefined') {
  window.LUXURY_CONFIG = LUXURY_SLIDES_DATA;
}
var LUXURY_CONFIG = LUXURY_SLIDES_DATA;
