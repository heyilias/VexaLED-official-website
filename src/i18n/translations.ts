// Keywords that should NEVER be translated (industry-standard terms)
// xR&VP, Rental, Control Rooms, Retail, Corporate, DOOH, COB, LED, ISO, VEXALED

export type Language = 'en' | 'zh' | 'es' | 'fr' | 'ar';

export interface MegaMenuItem {
  title: string;
  description: string;
}

export interface MegaMenuSection {
  sectionTitle: string;
  items: MegaMenuItem[];
}

export interface Translations {
  // Navbar
  nav: {
    market: string;
    products: string;
    caseStudy: string;
    serviceSupport: string;
    aboutUs: string;
    downloads: string;
    blog: string;
    search: string;
    language: string;
    configure: string;
    vipLogin: string;
    closeMenu: string;
    openMenu: string;
  };
  // VIP dropdown
  vip: {
    login: string;
    register: string;
  };
  // Mega menu content
  megaMenu: {
    market: MegaMenuSection;
    products: MegaMenuSection;
    caseStudy: MegaMenuSection;
    serviceSupport: MegaMenuSection;
    aboutUs: MegaMenuSection;
    downloads: MegaMenuSection;
    blog: MegaMenuSection;
  };
  // Trust bar
  trustBar: {
    items: { value: string; label: string }[];
  };
  // Hero
  hero: {
    tagline: string;
  };
  // Market Showcase
  marketShowcase: {
    title1: string;
    title2: string;
    subtitle: string;
  };
  // Application Scenarios
  scenarios: {
    title: string;
    subtitle: string;
    viewMore: string;
    swipeHint: string;
    // Scenario titles by category
    scenarioTitles: Record<string, string[]>;
  };
  // Why VEXALED
  whyVexaled: {
    title: string;
    subtitle: string;
    features: {
      title: string;
      description: string;
    }[];
    credentials: {
      value: string;
      label: string;
    }[];
    closingQuote: string;
    closingHighlight: string;
  };
  // Product Categories
  productCategories: {
    tag: string;
    title: string;
    subtitle: string;
    products: {
      title: string;
      tag: string;
      description: string;
    }[];
  };
  // AI Section
  ai: {
    tag: string;
    title: string;
    subtitle: string;
    features: {
      title: string;
      description: string;
      highlight: string;
    }[];
    note: string;
    noteHighlight: string;
  };
  // News / Industries
  news: {
    tag: string;
    title: string;
    subtitle: string;
    swipeHint: string;
    // News item titles
    items: { title: string; category: string }[];
  };
  // Configuration CTA
  cta: {
    tag: string;
    title: string;
    subtitle: string;
    startConfig: string;
    talkEngineer: string;
    badges: string[];
  };
  // Footer
  footer: {
    description: string;
    products: string;
    solutions: string;
    about: string;
    followUs: string;
    copyright: string;
    terms: string;
    privacy: string;
    aboutLinks: { label: string; href: string }[];
  };
  // Search
  searchPlaceholder: string;
  // Mobile menu
  startConfiguration: string;
  contactSales: string;
  // Chatbot
  chatbot: {
    title: string;
    placeholder: string;
    greeting: string;
    thinking: string;
    errorMessage: string;
  };
  // MarketCube section
  marketCube: {
    markets: { title: string; subtitle: string }[];
    scrollHint: string;
  };
  // Parallax Gallery
  parallaxGallery: {
    sectionLabel: string;
    sectionTitle: string;
    galleryLabel: string;
    galleryTitle: string;
    endCtaText: string;
    marqueeTexts: string[];
    galleryTitles: string[];
  };
  // Why Choose
  whyChoose: {
    sectionLabel: string;
    sectionTitle: string;
    statCards: { label: string; description: string }[];
    pillars: { title: string; description: string }[];
    bottomNote: string;
    bottomCtaText: string;
  };
  // Inquiry Modal
  inquiry: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    jobTitle: string;
    product: string;
    selectProduct: string;
    verificationCode: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
  // Products Section
  productsSection: {
    tag: string;
    title: string;
    subtitle: string;
    learnMore: string;
    navHint: string;
    products: {
      name: string;
      subtitle: string;
      description: string;
      specs: string[];
    }[];
  };
  // Contact Footer
  contactFooter: {
    heroTitle: string;
    heroSubtitle: string;
    ctaButtonText: string;
    startConfig: string;
    talkEngineer: string;
    companyLabel: string;
    companyName: string;
    companySubtitle: string;
    brandDescription: string;
    quickLinksTitle: string;
    quickLinks: string[];
    contactTitle: string;
    emailLabel: string;
    phoneLabel: string;
    addressLabel: string;
    ctaTitle: string;
    ctaDescription: string;
    copyrightText: string;
    bottomLinks: string[];
  };
}

// ===== ENGLISH =====
const en: Translations = {
  nav: {
    market: 'Market',
    products: 'Products',
    caseStudy: 'Case Study',
    serviceSupport: 'Service & Support',
    aboutUs: 'About Us',
    downloads: 'Downloads',
    blog: 'Blog',
    search: 'Search',
    language: 'Language',
    configure: 'Configure',
    vipLogin: 'VIP Login',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
  },
  vip: { login: 'Login', register: 'Register' },
  megaMenu: {
    market: {
      sectionTitle: 'Industries',
      items: [
        { title: 'Sports & Arenas', description: 'Stadium-grade LED solutions for immersive fan experiences' },
        { title: 'Advertising & DOOH', description: 'High-impact digital out-of-home displays' },
        { title: 'Events & Staging', description: 'Touring and rental displays for live productions' },
        { title: 'Virtual Production', description: 'XR-ready LED volumes for film and broadcast' },
        { title: 'Corporate & Control Rooms', description: 'Mission-critical visualization solutions' },
      ],
    },
    products: {
      sectionTitle: 'LED Display Systems',
      items: [
        { title: 'COB LED Display', description: 'Next-generation Chip-on-Board technology' },
        { title: 'Indoor LED Displays', description: 'Fine-pitch displays for interior applications' },
        { title: 'Outdoor LED Displays', description: 'Weather-resistant high-brightness solutions' },
        { title: 'Rental & Stage Displays', description: 'Lightweight touring-ready panels' },
      ],
    },
    caseStudy: {
      sectionTitle: 'Featured Projects',
      items: [
        { title: 'Dubai World Expo', description: 'UAE · Immersive Pavilion' },
        { title: 'MSG Sphere Preview', description: 'Las Vegas · Entertainment Venue' },
        { title: 'Shanghai Stadium', description: 'China · Sports Venue' },
        { title: 'Berlin Concert Hall', description: 'Germany · Live Events' },
      ],
    },
    serviceSupport: {
      sectionTitle: 'Services',
      items: [
        { title: 'Engineering Support', description: '24/7 technical assistance worldwide' },
        { title: 'Installation & Commissioning', description: 'Professional deployment services' },
        { title: 'Maintenance & Warranty', description: 'Comprehensive care programs' },
        { title: 'Technical Documentation', description: 'Manuals, specs, and guides' },
      ],
    },
    aboutUs: {
      sectionTitle: 'Company',
      items: [
        { title: 'Company Overview', description: 'Our mission and global vision' },
        { title: 'Manufacturing & QC', description: 'Engineering excellence and quality control' },
        { title: 'Global Presence', description: 'Offices and partners worldwide' },
        { title: 'Sustainability', description: 'Environmental responsibility initiatives' },
      ],
    },
    downloads: {
      sectionTitle: 'Resources',
      items: [
        { title: 'Product Catalogs', description: 'Complete product documentation' },
        { title: 'Technical Datasheets', description: 'Detailed specifications' },
        { title: 'Certifications', description: 'Industry compliance documents' },
        { title: 'Media Kit', description: 'Brand assets and press materials' },
      ],
    },
    blog: {
      sectionTitle: 'Content',
      items: [
        { title: 'Insights', description: 'Industry analysis and trends' },
        { title: 'News', description: 'Company announcements' },
        { title: 'Technology Articles', description: 'Deep dives into LED technology' },
      ],
    },
  },
  trustBar: {
    items: [
      { value: '18+', label: 'Years Experience' },
      { value: '120+', label: 'Countries Served' },
      { value: 'Pro', label: 'Engineering Team' },
      { value: 'ISO', label: 'Quality Certified' },
    ],
  },
  hero: {
    tagline: 'Immersive visual systems engineered for architecture, events, and next-generation spaces.',
  },
  marketShowcase: {
    title1: 'SHOWCASE YOUR WORLD',
    title2: 'IN INFINITE WAYS',
    subtitle: 'LED display solutions offering content visualization and immersive experiences for any application',
  },
  scenarios: {
    title: 'Application Scenarios',
    subtitle: 'Integrated solutions for LED display applications across commercial, architectural, and entertainment environments.',
    viewMore: 'VIEW MORE',
    swipeHint: 'Swipe to explore',
    scenarioTitles: {
      Commercial: ['Qatar Bentley Luxury Hotel and Suites', 'Dammam Corporate Showrooms', 'Dubai Mall Digital Experience', 'Singapore Marina Bay Center', 'London Luxury Retail Hub'],
      Indoor: ['Kyungnam Future Education Center', 'Corporate Conference Hall', 'Museum Interactive Display', 'Airport Terminal Signage', 'Shopping Center Atrium'],
      Outdoor: ['Dubai Outdoor LED Facade', 'Tokyo Shibuya Crossing Display', 'NYC Times Square Billboard', 'Shanghai Bund Landmark', 'Las Vegas Strip Installation'],
      Rental: ['World Tour Concert Stage', 'Music Festival Main Stage', 'Corporate Event Backdrop', 'Award Ceremony Setup', 'Trade Show Exhibition'],
      DOOH: ['Times Square Digital Billboard', 'Highway Digital Signage Network', 'Transit Station Displays', 'Retail Window Digital Ads', 'Smart City Information Kiosks'],
    },
  },
  whyVexaled: {
    title: 'Why VEXALED',
    subtitle: 'Engineering next-generation COB LED display systems with global scale, proven reliability, and long-term vision.',
    features: [
      { title: 'Engineering-Driven Customization', description: 'Every product is designed by our in-house engineering team with a focus on performance, reliability, and application-specific optimization.' },
      { title: 'Certified Quality Assurance', description: 'ISO-certified manufacturing with rigorous multi-stage quality control ensuring every unit meets the highest industry standards.' },
      { title: 'Reliable Global Delivery', description: 'Worldwide logistics network with dedicated coordinators ensuring on-time delivery to any location across 50+ countries.' },
      { title: 'Professional Service & Support', description: 'Comprehensive warranty coverage and responsive technical support team available across all time zones.' },
    ],
    credentials: [
      { value: '18+', label: 'Years Experience' },
      { value: '120+', label: 'Countries Served' },
      { value: 'Pro', label: 'Engineering Team' },
      { value: 'ISO', label: 'Quality Certified' },
    ],
    closingQuote: '"We Create, We Enjoy, We Share —',
    closingHighlight: ' We are VEXA."',
  },
  productCategories: {
    tag: 'Product Lines',
    title: 'Precision-Engineered Solutions',
    subtitle: 'Premium COB LED display systems engineered for clarity, reliability, and global deployment.',
    products: [
      { title: 'COB Ultra-Fine Display', tag: 'P0.7 – P1.5', description: 'Chip-on-board precision for mission-critical visuals.' },
      { title: 'Rental & Touring Display', tag: 'Fast Install', description: 'Lightweight modular panels built for live events and staging.' },
      { title: 'Curved / Creative Display', tag: 'Flexible Geometry', description: 'Seamless curves for immersive architectural and retail experiences.' },
    ],
  },
  ai: {
    tag: 'Artificial Intelligence',
    title: 'AI-Enhanced Workflow',
    subtitle: 'Leveraging artificial intelligence to streamline your LED project from concept to completion.',
    features: [
      { title: 'AI Assistant', description: 'Multilingual, 24/7 intelligent support for technical inquiries, product specifications, and project guidance.', highlight: '12+ Languages' },
      { title: 'Content Automation', description: 'AI-powered content generation for marketing materials, product documentation, and visual assets.', highlight: 'Real-time Generation' },
      { title: 'Visual Configuration', description: 'Intelligent system design tool that recommends optimal LED configurations based on your requirements.', highlight: 'Smart Recommendations' },
    ],
    note: 'AI assists our engineers and designers — it does not replace them. Every project is reviewed and optimized by our expert team.',
    noteHighlight: 'Note:',
  },
  news: {
    tag: 'News',
    title: 'Events & News',
    subtitle: 'Latest launches, exhibitions, and project highlights.',
    swipeHint: 'Swipe to explore',
    items: [
      { title: 'VEXALED at ISE 2024 Barcelona', category: 'EXHIBITION' },
      { title: 'New COB P0.9 Series Unveiled', category: 'LAUNCH' },
      { title: 'Mall of Emirates Digital Landmark', category: 'CASE HIGHLIGHT' },
      { title: 'InfoComm 2024 Preview', category: 'EXHIBITION' },
      { title: 'VEXALED Achieves Carbon Neutral Certification', category: 'PRESS' },
      { title: 'Seoul Olympic Stadium Installation', category: 'CASE HIGHLIGHT' },
      { title: 'LED China 2024 Showcase', category: 'EXHIBITION' },
      { title: 'Transparent LED Series for Retail', category: 'LAUNCH' },
    ],
  },
  cta: {
    tag: 'Start Your Project',
    title: 'Ready to Transform Your Vision?',
    subtitle: 'Answer a few questions and receive a tailored LED solution recommendation from our engineering team.',
    startConfig: 'Start Configuration',
    talkEngineer: 'Talk to an Engineer',
    badges: ['Free Consultation', 'No Commitment', '48h Response'],
  },
  footer: {
    description: 'Premium COB LED display technology and visual systems for demanding applications worldwide. Engineering excellence since 2006.',
    products: 'Products',
    solutions: 'Solutions',
    about: 'About',
    followUs: 'Follow Us',
    copyright: '© 2025 VEXALED. All rights reserved.',
    terms: 'Terms of Use',
    privacy: 'Privacy',
    aboutLinks: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Company', href: '/company' },
    ],
  },
  searchPlaceholder: 'Search products, solutions...',
  startConfiguration: 'Start Configuration',
  contactSales: 'Contact Sales',
  chatbot: {
    title: 'VEXA AI Assistant',
    placeholder: 'Ask about LED displays, products, pricing...',
    greeting: 'Hello! I\'m VEXA AI, your LED display assistant. How can I help you today? You can ask me about our products, specifications, pricing, installation, or any other LED-related question.',
    thinking: 'Thinking...',
    errorMessage: 'Sorry, I couldn\'t process that. Please try again.',
  },
  marketCube: {
    markets: [
      { title: 'Commercial', subtitle: 'Professional Display' },
      { title: 'Indoor', subtitle: 'Fine Pitch Solutions' },
      { title: 'Outdoor', subtitle: 'High Brightness' },
      { title: 'Rental & Stage', subtitle: 'Live Events' },
      { title: 'DOOH', subtitle: 'Digital Out of Home' },
    ],
    scrollHint: 'Scroll to explore markets',
  },
  parallaxGallery: {
    sectionLabel: 'OUR PROJECTS',
    sectionTitle: 'Gallery',
    galleryLabel: 'FEATURED WORK',
    galleryTitle: 'Blogs',
    endCtaText: 'View All',
    marqueeTexts: ['LED SOLUTIONS', 'VISUAL EXCELLENCE', 'GLOBAL REACH', 'INNOVATION'],
    galleryTitles: ['Concert Arena', 'Retail Mall', 'City Billboard', 'Corporate HQ', 'Showroom', 'Hotel Lobby'],
  },
  whyChoose: {
    sectionLabel: 'WHY CHOOSE US',
    sectionTitle: 'Why Choose VexaLed',
    statCards: [
      { label: 'Years Experience', description: 'Industry-leading expertise in LED technology' },
      { label: 'Global Projects', description: 'Successful installations worldwide' },
      { label: 'Countries Served', description: 'Global presence and local support' },
      { label: 'Certified', description: 'Quality and environmental standards' },
    ],
    pillars: [
      { title: 'Innovation First', description: 'Cutting-edge LED technology with continuous R&D investment' },
      { title: 'Quality Assured', description: 'ISO certified manufacturing with rigorous quality control' },
      { title: 'Global Support', description: '24/7 technical support with local service teams worldwide' },
    ],
    bottomNote: 'Ready to transform your space with cutting-edge LED technology?',
    bottomCtaText: 'Get Started',
  },
  inquiry: {
    title: 'Leave an Inquiry',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Work Email',
    country: 'Country',
    jobTitle: 'Job Title',
    product: 'Product / Solution',
    selectProduct: 'Select...',
    verificationCode: 'Verification Code',
    message: 'Message',
    messagePlaceholder: 'Tell us about your project requirements...',
    submit: 'Submit',
  },
  productsSection: {
    tag: 'OUR PRODUCTS',
    title: 'LED Solutions',
    subtitle: 'Discover our range of cutting-edge LED display technologies',
    learnMore: 'Learn More',
    navHint: 'Use arrow keys or drag to navigate',
    products: [
      { name: 'NEXUS PRO', subtitle: 'Indoor LED Display', description: 'Ultra-fine pitch LED panel for premium indoor installations with stunning color accuracy.', specs: ['P1.2-P2.5 Pitch', '3840Hz Refresh', '5000:1 Contrast'] },
      { name: 'CURVE X', subtitle: 'Flexible LED Screen', description: 'Revolutionary flexible LED technology for immersive curved and cylindrical displays.', specs: ['360° Flexible', 'Seamless Curve', 'Modular Design'] },
      { name: 'ALL-IN-ONE', subtitle: 'Smart LED Display', description: 'Complete meeting room solution with integrated control system and mobile stand.', specs: ['135"-216" Sizes', 'Touch Ready', 'Wireless Cast'] },
      { name: 'STAGE PRO', subtitle: 'Rental LED Panel', description: 'Professional event-grade LED modules with quick-lock system for rapid deployment.', specs: ['500x500mm', 'Quick Lock', 'IP65 Rated'] },
      { name: 'CYLINDER 360', subtitle: 'Column LED Display', description: 'Eye-catching cylindrical LED columns for retail, exhibitions, and architectural spaces.', specs: ['360° Viewing', 'Custom Sizes', 'Interactive Ready'] },
    ],
  },
  contactFooter: {
    heroTitle: "LET'S TALK",
    heroSubtitle: 'ABOUT YOUR PROJECT',
    ctaButtonText: 'CONTACT US',
    startConfig: 'Start Configuration',
    talkEngineer: 'Talk to an Engineer',
    companyLabel: 'COMPANY',
    companyName: 'VEXALED',
    companySubtitle: 'Global LED Solutions Provider',
    brandDescription: 'Leading manufacturer of premium LED display solutions for commercial, entertainment, and architectural applications worldwide.',
    quickLinksTitle: 'Quick Links',
    quickLinks: ['Products', 'Markets', 'Gallery', 'About Us', 'Contact'],
    contactTitle: 'Contact',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    addressLabel: 'Address',
    ctaTitle: 'Start a Project',
    ctaDescription: 'Tell us about your LED display needs and get a custom quote.',
    copyrightText: '© 2025 VexaLed. All rights reserved.',
    bottomLinks: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
};

// ===== CHINESE =====
const zh: Translations = {
  nav: {
    market: '市场',
    products: '产品',
    caseStudy: '案例研究',
    serviceSupport: '服务与支持',
    aboutUs: '关于我们',
    downloads: '下载中心',
    blog: '博客',
    search: '搜索',
    language: '语言',
    configure: '配置',
    vipLogin: 'VIP 登录',
    closeMenu: '关闭菜单',
    openMenu: '打开菜单',
  },
  vip: { login: '登录', register: '注册' },
  megaMenu: {
    market: {
      sectionTitle: '行业应用',
      items: [
        { title: '体育与场馆', description: '为沉浸式球迷体验打造的体育场级 LED 解决方案' },
        { title: '广告与 DOOH', description: '高影响力数字户外广告显示' },
        { title: '活动与舞台', description: '用于现场制作的巡演和租赁显示屏' },
        { title: '虚拟制作', description: '用于电影和广播的 XR-ready LED 屏幕' },
        { title: '企业与 Control Rooms', description: '关键任务可视化解决方案' },
      ],
    },
    products: {
      sectionTitle: 'LED 显示系统',
      items: [
        { title: 'COB LED 显示屏', description: '新一代芯片级封装技术' },
        { title: '室内 LED 显示屏', description: '适用于室内应用的细间距显示屏' },
        { title: '户外 LED 显示屏', description: '耐候高亮度解决方案' },
        { title: 'Rental 舞台显示屏', description: '轻量化巡演面板' },
      ],
    },
    caseStudy: {
      sectionTitle: '精选项目',
      items: [
        { title: '迪拜世博会', description: '阿联酋 · 沉浸式展馆' },
        { title: 'MSG 球体预览', description: '拉斯维加斯 · 娱乐场所' },
        { title: '上海体育场', description: '中国 · 体育场馆' },
        { title: '柏林音乐厅', description: '德国 · 现场活动' },
      ],
    },
    serviceSupport: {
      sectionTitle: '服务项目',
      items: [
        { title: '工程支持', description: '全球24/7技术援助' },
        { title: '安装与调试', description: '专业部署服务' },
        { title: '维护与保修', description: '全面维护计划' },
        { title: '技术文档', description: '手册、规格和指南' },
      ],
    },
    aboutUs: {
      sectionTitle: '公司',
      items: [
        { title: '公司概览', description: '我们的使命和全球愿景' },
        { title: '制造与质量控制', description: '卓越工程与质量管控' },
        { title: '全球布局', description: '全球办事处和合作伙伴' },
        { title: '可持续发展', description: '环境责任倡议' },
      ],
    },
    downloads: {
      sectionTitle: '资源',
      items: [
        { title: '产品目录', description: '完整产品文档' },
        { title: '技术规格书', description: '详细技术规格' },
        { title: '认证证书', description: '行业合规文件' },
        { title: '媒体资料', description: '品牌素材和新闻材料' },
      ],
    },
    blog: {
      sectionTitle: '内容',
      items: [
        { title: '行业洞察', description: '行业分析与趋势' },
        { title: '新闻动态', description: '公司公告' },
        { title: '技术文章', description: '深入了解 LED 技术' },
      ],
    },
  },
  trustBar: {
    items: [
      { value: '18+', label: '年经验' },
      { value: '120+', label: '服务国家' },
      { value: 'Pro', label: '工程团队' },
      { value: 'ISO', label: '质量认证' },
    ],
  },
  hero: {
    tagline: '为建筑、活动和下一代空间打造的沉浸式视觉系统。',
  },
  marketShowcase: {
    title1: '展示您的世界',
    title2: '以无限方式',
    subtitle: 'LED 显示解决方案，为任何应用提供内容可视化和沉浸式体验',
  },
  scenarios: {
    title: '应用场景',
    subtitle: '为商业、建筑和娱乐环境中的 LED 显示应用提供集成解决方案。',
    viewMore: '查看更多',
    swipeHint: '滑动浏览',
    scenarioTitles: {
      Commercial: ['卡塔尔宾利豪华酒店及套房', '达曼企业展厅', '迪拜购物中心数字体验', '新加坡滨海湾中心', '伦敦奢华零售中心'],
      Indoor: ['庆南未来教育中心', '企业会议厅', '博物馆互动展示', '机场航站楼标识', '购物中心中庭'],
      Outdoor: ['迪拜户外 LED 幕墙', '东京涩谷十字路口显示屏', '纽约时代广场广告牌', '上海外滩地标', '拉斯维加斯大道装置'],
      Rental: ['世界巡回演唱会舞台', '音乐节主舞台', '企业活动背景', '颁奖典礼布置', '贸易展览展示'],
      DOOH: ['时代广场数字广告牌', '高速公路数字标识网络', '交通站点显示屏', 'Retail 橱窗数字广告', '智慧城市信息亭'],
    },
  },
  whyVexaled: {
    title: '为什么选择 VEXALED',
    subtitle: '以全球规模、可靠性和长远愿景打造下一代 COB LED 显示系统。',
    features: [
      { title: '工程驱动定制', description: '每款产品均由我们的内部工程团队设计，专注于性能、可靠性和特定应用优化。' },
      { title: '认证质量保证', description: 'ISO 认证制造，严格的多阶段质量控制，确保每台设备达到最高行业标准。' },
      { title: '可靠全球交付', description: '全球物流网络，配备专属协调员，确保准时交付到 50 多个国家。' },
      { title: '专业服务与支持', description: '全面的保修覆盖和响应迅速的技术支持团队，覆盖所有时区。' },
    ],
    credentials: [
      { value: '18+', label: '年经验' },
      { value: '120+', label: '服务国家' },
      { value: 'Pro', label: '工程团队' },
      { value: 'ISO', label: '质量认证' },
    ],
    closingQuote: '"我们创造，我们享受，我们分享 —',
    closingHighlight: ' 我们是 VEXA。"',
  },
  productCategories: {
    tag: '产品线',
    title: '精密工程解决方案',
    subtitle: '为清晰度、可靠性和全球部署而设计的高端 COB LED 显示系统。',
    products: [
      { title: 'COB 超细显示屏', tag: 'P0.7 – P1.5', description: '板上芯片精度，满足关键任务视觉需求。' },
      { title: 'Rental 巡演显示屏', tag: '快速安装', description: '为现场活动和舞台打造的轻量模块化面板。' },
      { title: '曲面 / 创意显示屏', tag: '灵活几何', description: '为建筑和零售体验打造的无缝曲面。' },
    ],
  },
  ai: {
    tag: '人工智能',
    title: 'AI 增强工作流',
    subtitle: '利用人工智能简化您的 LED 项目，从概念到完成。',
    features: [
      { title: 'AI 助手', description: '多语言、全天候智能支持，提供技术咨询、产品规格和项目指导。', highlight: '12+ 种语言' },
      { title: '内容自动化', description: 'AI 驱动的内容生成，用于营销材料、产品文档和视觉资产。', highlight: '实时生成' },
      { title: '视觉配置', description: '智能系统设计工具，根据您的需求推荐最佳 LED 配置。', highlight: '智能推荐' },
    ],
    note: 'AI 协助我们的工程师和设计师——不会取代他们。每个项目都由我们的专家团队审核和优化。',
    noteHighlight: '注意：',
  },
  news: {
    tag: '新闻',
    title: '活动与新闻',
    subtitle: '最新发布、展览和项目亮点。',
    swipeHint: '滑动浏览',
    items: [
      { title: 'VEXALED 参加 ISE 2024 巴塞罗那展', category: '展览' },
      { title: '全新 COB P0.9 系列发布', category: '发布' },
      { title: '阿联酋购物中心数字地标', category: '案例亮点' },
      { title: 'InfoComm 2024 预览', category: '展览' },
      { title: 'VEXALED 获得碳中和认证', category: '新闻' },
      { title: '首尔奥林匹克体育场安装', category: '案例亮点' },
      { title: 'LED China 2024 展览', category: '展览' },
      { title: '透明 LED 系列用于 Retail', category: '发布' },
    ],
  },
  cta: {
    tag: '开始您的项目',
    title: '准备好改变您的愿景了吗？',
    subtitle: '回答几个问题，从我们的工程团队获得量身定制的 LED 解决方案建议。',
    startConfig: '开始配置',
    talkEngineer: '联系工程师',
    badges: ['免费咨询', '无需承诺', '48小时响应'],
  },
  footer: {
    description: '面向全球高要求应用的高端 COB LED 显示技术和视觉系统。自 2006 年以来的卓越工程。',
    products: '产品',
    solutions: '解决方案',
    about: '关于',
    followUs: '关注我们',
    copyright: '© 2025 VEXALED. 保留所有权利。',
    terms: '使用条款',
    privacy: '隐私政策',
    aboutLinks: [
      { label: '关于我们', href: '/about' },
      { label: '联系方式', href: '/contact' },
      { label: '招聘', href: '/careers' },
      { label: '公司', href: '/company' },
    ],
  },
  searchPlaceholder: '搜索产品、解决方案...',
  startConfiguration: '开始配置',
  contactSales: '联系销售',
  chatbot: {
    title: 'VEXA AI 助手',
    placeholder: '询问 LED 显示屏、产品、价格...',
    greeting: '您好！我是 VEXA AI，您的 LED 显示屏助手。我可以帮您了解产品、规格、价格、安装或任何 LED 相关问题。',
    thinking: '思考中...',
    errorMessage: '抱歉，处理出错。请重试。',
  },
  marketCube: {
    markets: [
      { title: 'Commercial', subtitle: '专业显示' },
      { title: 'Indoor', subtitle: '细间距方案' },
      { title: 'Outdoor', subtitle: '高亮度' },
      { title: 'Rental & Stage', subtitle: '现场活动' },
      { title: 'DOOH', subtitle: '数字户外' },
    ],
    scrollHint: '滚动浏览市场',
  },
  parallaxGallery: {
    sectionLabel: '我们的项目',
    sectionTitle: '画廊',
    galleryLabel: '精选作品',
    galleryTitle: '博客',
    endCtaText: '查看全部',
    marqueeTexts: ['LED 解决方案', '卓越视觉', '全球覆盖', '创新'],
    galleryTitles: ['演唱会场馆', '零售商场', '城市广告牌', '企业总部', '展厅', '酒店大堂'],
  },
  whyChoose: {
    sectionLabel: '为什么选择我们',
    sectionTitle: '为什么选择 VexaLed',
    statCards: [
      { label: '年经验', description: '行业领先的 LED 技术专业知识' },
      { label: '全球项目', description: '全球成功安装' },
      { label: '服务国家', description: '全球覆盖和本地支持' },
      { label: '认证', description: '质量和环境标准' },
    ],
    pillars: [
      { title: '创新为先', description: '持续研发投入的尖端 LED 技术' },
      { title: '质量保证', description: 'ISO 认证制造与严格质量控制' },
      { title: '全球支持', description: '全球本地服务团队全天候技术支持' },
    ],
    bottomNote: '准备好用尖端 LED 技术改变您的空间了吗？',
    bottomCtaText: '开始',
  },
  inquiry: {
    title: '留下询盘',
    firstName: '名',
    lastName: '姓',
    email: '工作邮箱',
    country: '国家',
    jobTitle: '职位',
    product: '产品 / 解决方案',
    selectProduct: '选择...',
    verificationCode: '验证码',
    message: '留言',
    messagePlaceholder: '告诉我们您的项目需求...',
    submit: '提交',
  },
  productsSection: {
    tag: '我们的产品',
    title: 'LED 解决方案',
    subtitle: '探索我们尖端的 LED 显示技术',
    learnMore: '了解更多',
    navHint: '使用方向键或拖动浏览',
    products: [
      { name: 'NEXUS PRO', subtitle: '室内 LED 显示屏', description: '超精细间距 LED 面板，适用于高端室内安装，色彩精准。', specs: ['P1.2-P2.5 间距', '3840Hz 刷新率', '5000:1 对比度'] },
      { name: 'CURVE X', subtitle: '柔性 LED 屏', description: '革命性柔性 LED 技术，打造沉浸式曲面和圆柱形显示。', specs: ['360° 柔性', '无缝曲面', '模块化设计'] },
      { name: 'ALL-IN-ONE', subtitle: '智能 LED 显示屏', description: '集成控制系统和移动支架的完整会议室解决方案。', specs: ['135"-216" 尺寸', '触控就绪', '无线投屏'] },
      { name: 'STAGE PRO', subtitle: 'Rental LED 面板', description: '专业活动级 LED 模块，快速锁定系统，快速部署。', specs: ['500x500mm', '快速锁定', 'IP65 防护'] },
      { name: 'CYLINDER 360', subtitle: '柱形 LED 显示屏', description: '引人注目的圆柱形 LED 柱，适用于零售、展览和建筑空间。', specs: ['360° 观看', '定制尺寸', '互动就绪'] },
    ],
  },
  contactFooter: {
    heroTitle: '让我们谈谈',
    heroSubtitle: '关于您的项目',
    ctaButtonText: '联系我们',
    startConfig: '开始配置',
    talkEngineer: '联系工程师',
    companyLabel: '公司',
    companyName: 'VEXALED',
    companySubtitle: '全球 LED 解决方案供应商',
    brandDescription: '全球领先的高端 LED 显示解决方案制造商，服务于商业、娱乐和建筑应用。',
    quickLinksTitle: '快速链接',
    quickLinks: ['产品', '市场', '画廊', '关于我们', '联系'],
    contactTitle: '联系方式',
    emailLabel: '邮箱',
    phoneLabel: '电话',
    addressLabel: '地址',
    ctaTitle: '开始项目',
    ctaDescription: '告诉我们您的 LED 显示需求，获取定制报价。',
    copyrightText: '© 2025 VexaLed. 保留所有权利。',
    bottomLinks: ['隐私政策', '服务条款', 'Cookie 政策'],
  },
};

// ===== SPANISH =====
const es: Translations = {
  nav: {
    market: 'Mercado',
    products: 'Productos',
    caseStudy: 'Casos de Estudio',
    serviceSupport: 'Servicio y Soporte',
    aboutUs: 'Sobre Nosotros',
    downloads: 'Descargas',
    blog: 'Blog',
    search: 'Buscar',
    language: 'Idioma',
    configure: 'Configurar',
    vipLogin: 'Acceso VIP',
    closeMenu: 'Cerrar menú',
    openMenu: 'Abrir menú',
  },
  vip: { login: 'Iniciar Sesión', register: 'Registrarse' },
  megaMenu: {
    market: {
      sectionTitle: 'Industrias',
      items: [
        { title: 'Deportes y Estadios', description: 'Soluciones LED de nivel estadio para experiencias inmersivas' },
        { title: 'Publicidad y DOOH', description: 'Pantallas digitales de alto impacto para exteriores' },
        { title: 'Eventos y Escenarios', description: 'Pantallas de gira y alquiler para producciones en vivo' },
        { title: 'Producción Virtual', description: 'Volúmenes LED listos para XR en cine y transmisión' },
        { title: 'Corporativo & Control Rooms', description: 'Soluciones de visualización de misión crítica' },
      ],
    },
    products: {
      sectionTitle: 'Sistemas LED',
      items: [
        { title: 'Pantalla COB LED', description: 'Tecnología Chip-on-Board de nueva generación' },
        { title: 'Pantallas LED Interior', description: 'Pantallas de paso fino para aplicaciones interiores' },
        { title: 'Pantallas LED Exterior', description: 'Soluciones de alta luminosidad resistentes al clima' },
        { title: 'Pantallas Rental y Escenario', description: 'Paneles ligeros listos para giras' },
      ],
    },
    caseStudy: {
      sectionTitle: 'Proyectos Destacados',
      items: [
        { title: 'Expo Mundial de Dubái', description: 'EAU · Pabellón Inmersivo' },
        { title: 'Previsualización MSG Sphere', description: 'Las Vegas · Lugar de Entretenimiento' },
        { title: 'Estadio de Shanghái', description: 'China · Sede Deportiva' },
        { title: 'Sala de Conciertos de Berlín', description: 'Alemania · Eventos en Vivo' },
      ],
    },
    serviceSupport: {
      sectionTitle: 'Servicios',
      items: [
        { title: 'Soporte de Ingeniería', description: 'Asistencia técnica mundial 24/7' },
        { title: 'Instalación y Puesta en Marcha', description: 'Servicios profesionales de despliegue' },
        { title: 'Mantenimiento y Garantía', description: 'Programas de cuidado integral' },
        { title: 'Documentación Técnica', description: 'Manuales, especificaciones y guías' },
      ],
    },
    aboutUs: {
      sectionTitle: 'Empresa',
      items: [
        { title: 'Visión General', description: 'Nuestra misión y visión global' },
        { title: 'Fabricación y Control de Calidad', description: 'Excelencia en ingeniería' },
        { title: 'Presencia Global', description: 'Oficinas y socios en todo el mundo' },
        { title: 'Sostenibilidad', description: 'Iniciativas de responsabilidad ambiental' },
      ],
    },
    downloads: {
      sectionTitle: 'Recursos',
      items: [
        { title: 'Catálogos de Productos', description: 'Documentación completa' },
        { title: 'Hojas Técnicas', description: 'Especificaciones detalladas' },
        { title: 'Certificaciones', description: 'Documentos de cumplimiento' },
        { title: 'Kit de Medios', description: 'Activos de marca y prensa' },
      ],
    },
    blog: {
      sectionTitle: 'Contenido',
      items: [
        { title: 'Perspectivas', description: 'Análisis y tendencias del sector' },
        { title: 'Noticias', description: 'Anuncios de la empresa' },
        { title: 'Artículos Técnicos', description: 'Profundización en tecnología LED' },
      ],
    },
  },
  trustBar: {
    items: [
      { value: '18+', label: 'Años de Experiencia' },
      { value: '120+', label: 'Países Atendidos' },
      { value: 'Pro', label: 'Equipo de Ingeniería' },
      { value: 'ISO', label: 'Calidad Certificada' },
    ],
  },
  hero: {
    tagline: 'Sistemas visuales inmersivos diseñados para arquitectura, eventos y espacios de próxima generación.',
  },
  marketShowcase: {
    title1: 'MUESTRA TU MUNDO',
    title2: 'DE INFINITAS FORMAS',
    subtitle: 'Soluciones de pantallas LED que ofrecen visualización de contenido y experiencias inmersivas para cualquier aplicación',
  },
  scenarios: {
    title: 'Escenarios de Aplicación',
    subtitle: 'Soluciones integradas para aplicaciones de pantallas LED en entornos comerciales, arquitectónicos y de entretenimiento.',
    viewMore: 'VER MÁS',
    swipeHint: 'Desliza para explorar',
    scenarioTitles: {
      Commercial: ['Hotel de Lujo Qatar Bentley', 'Salas de Exposición Corporativas Dammam', 'Experiencia Digital Dubai Mall', 'Centro Marina Bay Singapur', 'Centro Retail de Lujo Londres'],
      Indoor: ['Centro Educativo Futuro Kyungnam', 'Sala de Conferencias Corporativa', 'Exposición Interactiva de Museo', 'Señalización Terminal Aeropuerto', 'Atrio Centro Comercial'],
      Outdoor: ['Fachada LED Exterior Dubai', 'Pantalla Cruce Shibuya Tokio', 'Cartelera Times Square NYC', 'Monumento Bund Shanghái', 'Instalación Las Vegas Strip'],
      Rental: ['Escenario Gira Mundial', 'Escenario Principal Festival de Música', 'Fondo Evento Corporativo', 'Montaje Ceremonia de Premios', 'Exposición Feria Comercial'],
      DOOH: ['Cartelera Digital Times Square', 'Red Señalización Digital Autopistas', 'Pantallas Estaciones de Tránsito', 'Anuncios Digitales Escaparates', 'Quioscos Información Ciudad Inteligente'],
    },
  },
  whyVexaled: {
    title: '¿Por qué VEXALED?',
    subtitle: 'Ingeniería de sistemas de pantallas COB LED de próxima generación con escala global, fiabilidad comprobada y visión a largo plazo.',
    features: [
      { title: 'Personalización de Ingeniería', description: 'Cada producto es diseñado por nuestro equipo de ingeniería interno con enfoque en rendimiento, fiabilidad y optimización específica.' },
      { title: 'Garantía de Calidad Certificada', description: 'Fabricación certificada ISO con riguroso control de calidad multietapa que garantiza los más altos estándares.' },
      { title: 'Entrega Global Confiable', description: 'Red logística mundial con coordinadores dedicados que garantizan entrega puntual en más de 50 países.' },
      { title: 'Servicio y Soporte Profesional', description: 'Cobertura de garantía completa y equipo de soporte técnico disponible en todas las zonas horarias.' },
    ],
    credentials: [
      { value: '18+', label: 'Años de Experiencia' },
      { value: '120+', label: 'Países Atendidos' },
      { value: 'Pro', label: 'Equipo de Ingeniería' },
      { value: 'ISO', label: 'Calidad Certificada' },
    ],
    closingQuote: '"Creamos, Disfrutamos, Compartimos —',
    closingHighlight: ' Somos VEXA."',
  },
  productCategories: {
    tag: 'Líneas de Productos',
    title: 'Soluciones de Ingeniería de Precisión',
    subtitle: 'Sistemas de pantallas COB LED premium diseñados para claridad, fiabilidad y despliegue global.',
    products: [
      { title: 'Pantalla COB Ultra-Fina', tag: 'P0.7 – P1.5', description: 'Precisión chip-on-board para visuales de misión crítica.' },
      { title: 'Pantalla Rental y Giras', tag: 'Instalación Rápida', description: 'Paneles modulares ligeros para eventos en vivo y escenarios.' },
      { title: 'Pantalla Curva / Creativa', tag: 'Geometría Flexible', description: 'Curvas sin costuras para experiencias arquitectónicas y comerciales.' },
    ],
  },
  ai: {
    tag: 'Inteligencia Artificial',
    title: 'Flujo de Trabajo con IA',
    subtitle: 'Aprovechando la inteligencia artificial para optimizar tu proyecto LED de principio a fin.',
    features: [
      { title: 'Asistente IA', description: 'Soporte inteligente multilingüe 24/7 para consultas técnicas, especificaciones y orientación de proyectos.', highlight: '12+ Idiomas' },
      { title: 'Automatización de Contenido', description: 'Generación de contenido impulsada por IA para materiales de marketing, documentación y activos visuales.', highlight: 'Generación en Tiempo Real' },
      { title: 'Configuración Visual', description: 'Herramienta de diseño inteligente que recomienda configuraciones LED óptimas según tus requisitos.', highlight: 'Recomendaciones Inteligentes' },
    ],
    note: 'La IA asiste a nuestros ingenieros y diseñadores — no los reemplaza. Cada proyecto es revisado y optimizado por nuestro equipo experto.',
    noteHighlight: 'Nota:',
  },
  news: {
    tag: 'Noticias',
    title: 'Eventos y Noticias',
    subtitle: 'Últimos lanzamientos, exhibiciones y destacados de proyectos.',
    swipeHint: 'Desliza para explorar',
    items: [
      { title: 'VEXALED en ISE 2024 Barcelona', category: 'EXPOSICIÓN' },
      { title: 'Nueva Serie COB P0.9 Presentada', category: 'LANZAMIENTO' },
      { title: 'Hito Digital Mall of Emirates', category: 'CASO DESTACADO' },
      { title: 'Vista Previa InfoComm 2024', category: 'EXPOSICIÓN' },
      { title: 'VEXALED Logra Certificación Carbono Neutro', category: 'PRENSA' },
      { title: 'Instalación Estadio Olímpico de Seúl', category: 'CASO DESTACADO' },
      { title: 'LED China 2024 Exhibición', category: 'EXPOSICIÓN' },
      { title: 'Serie LED Transparente para Retail', category: 'LANZAMIENTO' },
    ],
  },
  cta: {
    tag: 'Inicia Tu Proyecto',
    title: '¿Listo para Transformar Tu Visión?',
    subtitle: 'Responde algunas preguntas y recibe una recomendación de solución LED personalizada de nuestro equipo de ingeniería.',
    startConfig: 'Iniciar Configuración',
    talkEngineer: 'Hablar con un Ingeniero',
    badges: ['Consulta Gratuita', 'Sin Compromiso', 'Respuesta en 48h'],
  },
  footer: {
    description: 'Tecnología premium de pantallas COB LED y sistemas visuales para aplicaciones exigentes en todo el mundo. Excelencia en ingeniería desde 2006.',
    products: 'Productos',
    solutions: 'Soluciones',
    about: 'Acerca de',
    followUs: 'Síguenos',
    copyright: '© 2025 VEXALED. Todos los derechos reservados.',
    terms: 'Términos de Uso',
    privacy: 'Privacidad',
    aboutLinks: [
      { label: 'Sobre Nosotros', href: '/about' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Carreras', href: '/careers' },
      { label: 'Empresa', href: '/company' },
    ],
  },
  searchPlaceholder: 'Buscar productos, soluciones...',
  startConfiguration: 'Iniciar Configuración',
  contactSales: 'Contactar Ventas',
  chatbot: {
    title: 'VEXA AI Asistente',
    placeholder: 'Pregunte sobre pantallas LED, productos, precios...',
    greeting: '¡Hola! Soy VEXA AI, su asistente de pantallas LED. ¿En qué puedo ayudarle hoy?',
    thinking: 'Pensando...',
    errorMessage: 'Lo siento, no pude procesar eso. Intente de nuevo.',
  },
  marketCube: {
    markets: [
      { title: 'Commercial', subtitle: 'Pantalla Profesional' },
      { title: 'Indoor', subtitle: 'Soluciones de Paso Fino' },
      { title: 'Outdoor', subtitle: 'Alta Luminosidad' },
      { title: 'Rental & Stage', subtitle: 'Eventos en Vivo' },
      { title: 'DOOH', subtitle: 'Digital Exterior' },
    ],
    scrollHint: 'Desplázate para explorar mercados',
  },
  parallaxGallery: {
    sectionLabel: 'NUESTROS PROYECTOS',
    sectionTitle: 'Galería',
    galleryLabel: 'TRABAJO DESTACADO',
    galleryTitle: 'Blogs',
    endCtaText: 'Ver Todo',
    marqueeTexts: ['SOLUCIONES LED', 'EXCELENCIA VISUAL', 'ALCANCE GLOBAL', 'INNOVACIÓN'],
    galleryTitles: ['Arena de Conciertos', 'Centro Comercial', 'Cartelera Urbana', 'Sede Corporativa', 'Showroom', 'Vestíbulo de Hotel'],
  },
  whyChoose: {
    sectionLabel: 'POR QUÉ ELEGIRNOS',
    sectionTitle: '¿Por Qué Elegir VexaLed?',
    statCards: [
      { label: 'Años de Experiencia', description: 'Experiencia líder en tecnología LED' },
      { label: 'Proyectos Globales', description: 'Instalaciones exitosas en todo el mundo' },
      { label: 'Países Atendidos', description: 'Presencia global y soporte local' },
      { label: 'Certificado', description: 'Estándares de calidad y medio ambiente' },
    ],
    pillars: [
      { title: 'Innovación Primero', description: 'Tecnología LED de vanguardia con inversión continua en I+D' },
      { title: 'Calidad Asegurada', description: 'Fabricación certificada ISO con riguroso control de calidad' },
      { title: 'Soporte Global', description: 'Soporte técnico 24/7 con equipos locales en todo el mundo' },
    ],
    bottomNote: '¿Listo para transformar su espacio con tecnología LED de vanguardia?',
    bottomCtaText: 'Comenzar',
  },
  inquiry: {
    title: 'Dejar una Consulta',
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Correo de Trabajo',
    country: 'País',
    jobTitle: 'Cargo',
    product: 'Producto / Solución',
    selectProduct: 'Seleccionar...',
    verificationCode: 'Código de Verificación',
    message: 'Mensaje',
    messagePlaceholder: 'Cuéntenos sobre los requisitos de su proyecto...',
    submit: 'Enviar',
  },
  productsSection: {
    tag: 'NUESTROS PRODUCTOS',
    title: 'Soluciones LED',
    subtitle: 'Descubra nuestra gama de tecnologías de pantallas LED de vanguardia',
    learnMore: 'Más Información',
    navHint: 'Use las teclas de flecha o arrastre para navegar',
    products: [
      { name: 'NEXUS PRO', subtitle: 'Pantalla LED Interior', description: 'Panel LED de paso ultrafino para instalaciones interiores premium con precisión de color impresionante.', specs: ['P1.2-P2.5 Paso', '3840Hz Refresco', '5000:1 Contraste'] },
      { name: 'CURVE X', subtitle: 'Pantalla LED Flexible', description: 'Tecnología LED flexible revolucionaria para pantallas curvas y cilíndricas inmersivas.', specs: ['360° Flexible', 'Curva Sin Costuras', 'Diseño Modular'] },
      { name: 'ALL-IN-ONE', subtitle: 'Pantalla LED Inteligente', description: 'Solución completa para salas de reuniones con sistema de control integrado y soporte móvil.', specs: ['135"-216" Tamaños', 'Táctil', 'Transmisión Inalámbrica'] },
      { name: 'STAGE PRO', subtitle: 'Panel LED Rental', description: 'Módulos LED profesionales para eventos con sistema de bloqueo rápido para despliegue rápido.', specs: ['500x500mm', 'Bloqueo Rápido', 'IP65'] },
      { name: 'CYLINDER 360', subtitle: 'Pantalla LED Cilíndrica', description: 'Columnas LED cilíndricas llamativas para retail, exposiciones y espacios arquitectónicos.', specs: ['360° Visión', 'Tamaños Personalizados', 'Interactivo'] },
    ],
  },
  contactFooter: {
    heroTitle: 'HABLEMOS',
    heroSubtitle: 'SOBRE TU PROYECTO',
    ctaButtonText: 'CONTÁCTANOS',
    startConfig: 'Iniciar Configuración',
    talkEngineer: 'Hablar con un Ingeniero',
    companyLabel: 'EMPRESA',
    companyName: 'VEXALED',
    companySubtitle: 'Proveedor Global de Soluciones LED',
    brandDescription: 'Fabricante líder de soluciones premium de pantallas LED para aplicaciones comerciales, de entretenimiento y arquitectónicas.',
    quickLinksTitle: 'Enlaces Rápidos',
    quickLinks: ['Productos', 'Mercados', 'Galería', 'Sobre Nosotros', 'Contacto'],
    contactTitle: 'Contacto',
    emailLabel: 'Correo',
    phoneLabel: 'Teléfono',
    addressLabel: 'Dirección',
    ctaTitle: 'Iniciar un Proyecto',
    ctaDescription: 'Cuéntenos sus necesidades de pantallas LED y obtenga un presupuesto personalizado.',
    copyrightText: '© 2025 VexaLed. Todos los derechos reservados.',
    bottomLinks: ['Política de Privacidad', 'Términos de Servicio', 'Política de Cookies'],
  },
};

// ===== FRENCH =====
const fr: Translations = {
  nav: {
    market: 'Marché',
    products: 'Produits',
    caseStudy: 'Études de Cas',
    serviceSupport: 'Service & Support',
    aboutUs: 'À Propos',
    downloads: 'Téléchargements',
    blog: 'Blog',
    search: 'Rechercher',
    language: 'Langue',
    configure: 'Configurer',
    vipLogin: 'Connexion VIP',
    closeMenu: 'Fermer le menu',
    openMenu: 'Ouvrir le menu',
  },
  vip: { login: 'Connexion', register: 'Inscription' },
  megaMenu: {
    market: {
      sectionTitle: 'Industries',
      items: [
        { title: 'Sports et Stades', description: 'Solutions LED de niveau stade pour des expériences immersives' },
        { title: 'Publicité & DOOH', description: 'Affichages numériques à fort impact pour l\'extérieur' },
        { title: 'Événements et Scènes', description: 'Écrans de tournée et location pour productions en direct' },
        { title: 'Production Virtuelle', description: 'Volumes LED prêts pour XR en cinéma et diffusion' },
        { title: 'Entreprise & Control Rooms', description: 'Solutions de visualisation critiques' },
      ],
    },
    products: {
      sectionTitle: 'Systèmes LED',
      items: [
        { title: 'Écran COB LED', description: 'Technologie Chip-on-Board de nouvelle génération' },
        { title: 'Écrans LED Intérieurs', description: 'Écrans à pas fin pour applications intérieures' },
        { title: 'Écrans LED Extérieurs', description: 'Solutions haute luminosité résistantes aux intempéries' },
        { title: 'Écrans Rental et Scène', description: 'Panneaux légers prêts pour la tournée' },
      ],
    },
    caseStudy: {
      sectionTitle: 'Projets Phares',
      items: [
        { title: 'Expo Mondiale de Dubaï', description: 'EAU · Pavillon Immersif' },
        { title: 'Aperçu MSG Sphere', description: 'Las Vegas · Lieu de Divertissement' },
        { title: 'Stade de Shanghai', description: 'Chine · Site Sportif' },
        { title: 'Salle de Concert de Berlin', description: 'Allemagne · Événements en Direct' },
      ],
    },
    serviceSupport: {
      sectionTitle: 'Services',
      items: [
        { title: 'Support Ingénierie', description: 'Assistance technique mondiale 24/7' },
        { title: 'Installation et Mise en Service', description: 'Services de déploiement professionnel' },
        { title: 'Maintenance et Garantie', description: 'Programmes de maintenance complets' },
        { title: 'Documentation Technique', description: 'Manuels, spécifications et guides' },
      ],
    },
    aboutUs: {
      sectionTitle: 'Entreprise',
      items: [
        { title: 'Présentation', description: 'Notre mission et vision mondiale' },
        { title: 'Fabrication et Qualité', description: 'Excellence en ingénierie et contrôle qualité' },
        { title: 'Présence Mondiale', description: 'Bureaux et partenaires dans le monde' },
        { title: 'Durabilité', description: 'Initiatives de responsabilité environnementale' },
      ],
    },
    downloads: {
      sectionTitle: 'Ressources',
      items: [
        { title: 'Catalogues Produits', description: 'Documentation produit complète' },
        { title: 'Fiches Techniques', description: 'Spécifications détaillées' },
        { title: 'Certifications', description: 'Documents de conformité' },
        { title: 'Kit Média', description: 'Ressources de marque et presse' },
      ],
    },
    blog: {
      sectionTitle: 'Contenu',
      items: [
        { title: 'Perspectives', description: 'Analyses et tendances du secteur' },
        { title: 'Actualités', description: 'Annonces de l\'entreprise' },
        { title: 'Articles Techniques', description: 'Approfondissements technologie LED' },
      ],
    },
  },
  trustBar: {
    items: [
      { value: '18+', label: 'Années d\'Expérience' },
      { value: '120+', label: 'Pays Desservis' },
      { value: 'Pro', label: 'Équipe d\'Ingénierie' },
      { value: 'ISO', label: 'Qualité Certifiée' },
    ],
  },
  hero: {
    tagline: 'Systèmes visuels immersifs conçus pour l\'architecture, les événements et les espaces de nouvelle génération.',
  },
  marketShowcase: {
    title1: 'PRÉSENTEZ VOTRE MONDE',
    title2: 'DE FAÇONS INFINIES',
    subtitle: 'Solutions d\'affichage LED offrant une visualisation de contenu et des expériences immersives pour toute application',
  },
  scenarios: {
    title: 'Scénarios d\'Application',
    subtitle: 'Solutions intégrées pour les applications d\'affichage LED dans les environnements commerciaux, architecturaux et de divertissement.',
    viewMore: 'VOIR PLUS',
    swipeHint: 'Glissez pour explorer',
    scenarioTitles: {
      Commercial: ['Hôtel de Luxe Qatar Bentley', 'Showrooms Corporatifs Dammam', 'Expérience Digitale Dubai Mall', 'Centre Marina Bay Singapour', 'Hub Retail de Luxe Londres'],
      Indoor: ['Centre Éducatif Futur Kyungnam', 'Salle de Conférence', 'Exposition Interactive Musée', 'Signalisation Terminal Aéroport', 'Atrium Centre Commercial'],
      Outdoor: ['Façade LED Extérieure Dubaï', 'Écran Croisement Shibuya Tokyo', 'Panneau Times Square NYC', 'Monument Bund Shanghai', 'Installation Las Vegas Strip'],
      Rental: ['Scène Concert Tournée Mondiale', 'Scène Principale Festival Musique', 'Fond Événement Corporatif', 'Installation Cérémonie Récompenses', 'Exposition Salon Professionnel'],
      DOOH: ['Panneau Digital Times Square', 'Réseau Signalisation Digitale Autoroutes', 'Écrans Stations de Transit', 'Publicités Digitales Vitrines', 'Bornes Information Ville Intelligente'],
    },
  },
  whyVexaled: {
    title: 'Pourquoi VEXALED',
    subtitle: 'Ingénierie de systèmes d\'affichage COB LED de nouvelle génération à l\'échelle mondiale, avec fiabilité prouvée et vision à long terme.',
    features: [
      { title: 'Personnalisation par l\'Ingénierie', description: 'Chaque produit est conçu par notre équipe d\'ingénierie interne avec un focus sur la performance, la fiabilité et l\'optimisation spécifique.' },
      { title: 'Assurance Qualité Certifiée', description: 'Fabrication certifiée ISO avec un contrôle qualité rigoureux multi-étapes garantissant les plus hauts standards.' },
      { title: 'Livraison Mondiale Fiable', description: 'Réseau logistique mondial avec des coordinateurs dédiés assurant une livraison ponctuelle dans plus de 50 pays.' },
      { title: 'Service & Support Professionnel', description: 'Couverture de garantie complète et équipe de support technique disponible dans tous les fuseaux horaires.' },
    ],
    credentials: [
      { value: '18+', label: 'Années d\'Expérience' },
      { value: '120+', label: 'Pays Desservis' },
      { value: 'Pro', label: 'Équipe d\'Ingénierie' },
      { value: 'ISO', label: 'Qualité Certifiée' },
    ],
    closingQuote: '"Nous Créons, Nous Apprécions, Nous Partageons —',
    closingHighlight: ' Nous sommes VEXA."',
  },
  productCategories: {
    tag: 'Gammes de Produits',
    title: 'Solutions d\'Ingénierie de Précision',
    subtitle: 'Systèmes d\'affichage COB LED premium conçus pour la clarté, la fiabilité et le déploiement mondial.',
    products: [
      { title: 'Affichage COB Ultra-Fin', tag: 'P0.7 – P1.5', description: 'Précision chip-on-board pour des visuels critiques.' },
      { title: 'Affichage Rental & Tournée', tag: 'Installation Rapide', description: 'Panneaux modulaires légers pour événements en direct et scènes.' },
      { title: 'Affichage Courbe / Créatif', tag: 'Géométrie Flexible', description: 'Courbes sans couture pour des expériences architecturales et commerciales.' },
    ],
  },
  ai: {
    tag: 'Intelligence Artificielle',
    title: 'Flux de Travail IA',
    subtitle: 'Exploiter l\'intelligence artificielle pour rationaliser votre projet LED du concept à la réalisation.',
    features: [
      { title: 'Assistant IA', description: 'Support intelligent multilingue 24/7 pour les demandes techniques, spécifications et orientation de projets.', highlight: '12+ Langues' },
      { title: 'Automatisation de Contenu', description: 'Génération de contenu par IA pour le marketing, la documentation produit et les actifs visuels.', highlight: 'Génération en Temps Réel' },
      { title: 'Configuration Visuelle', description: 'Outil de conception intelligent qui recommande les configurations LED optimales selon vos besoins.', highlight: 'Recommandations Intelligentes' },
    ],
    note: 'L\'IA assiste nos ingénieurs et designers — elle ne les remplace pas. Chaque projet est revu et optimisé par notre équipe d\'experts.',
    noteHighlight: 'Note :',
  },
  news: {
    tag: 'Actualités',
    title: 'Événements & Actualités',
    subtitle: 'Derniers lancements, expositions et faits marquants.',
    swipeHint: 'Glissez pour explorer',
    items: [
      { title: 'VEXALED à ISE 2024 Barcelone', category: 'EXPOSITION' },
      { title: 'Nouvelle Série COB P0.9 Dévoilée', category: 'LANCEMENT' },
      { title: 'Repère Digital Mall of Emirates', category: 'CAS PHARE' },
      { title: 'Aperçu InfoComm 2024', category: 'EXPOSITION' },
      { title: 'VEXALED Obtient la Certification Carbone Neutre', category: 'PRESSE' },
      { title: 'Installation Stade Olympique de Séoul', category: 'CAS PHARE' },
      { title: 'LED China 2024 Vitrine', category: 'EXPOSITION' },
      { title: 'Série LED Transparente pour Retail', category: 'LANCEMENT' },
    ],
  },
  cta: {
    tag: 'Démarrez Votre Projet',
    title: 'Prêt à Transformer Votre Vision ?',
    subtitle: 'Répondez à quelques questions et recevez une recommandation LED sur mesure de notre équipe d\'ingénierie.',
    startConfig: 'Démarrer la Configuration',
    talkEngineer: 'Parler à un Ingénieur',
    badges: ['Consultation Gratuite', 'Sans Engagement', 'Réponse en 48h'],
  },
  footer: {
    description: 'Technologie d\'affichage COB LED premium et systèmes visuels pour les applications exigeantes dans le monde entier. Excellence en ingénierie depuis 2006.',
    products: 'Produits',
    solutions: 'Solutions',
    about: 'À Propos',
    followUs: 'Suivez-nous',
    copyright: '© 2025 VEXALED. Tous droits réservés.',
    terms: 'Conditions d\'Utilisation',
    privacy: 'Confidentialité',
    aboutLinks: [
      { label: 'À Propos', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Carrières', href: '/careers' },
      { label: 'Entreprise', href: '/company' },
    ],
  },
  searchPlaceholder: 'Rechercher produits, solutions...',
  startConfiguration: 'Démarrer la Configuration',
  contactSales: 'Contacter les Ventes',
  chatbot: {
    title: 'VEXA AI Assistant',
    placeholder: 'Posez des questions sur les écrans LED, produits, prix...',
    greeting: 'Bonjour ! Je suis VEXA AI, votre assistant écrans LED. Comment puis-je vous aider ?',
    thinking: 'Réflexion...',
    errorMessage: 'Désolé, je n\'ai pas pu traiter cela. Veuillez réessayer.',
  },
  marketCube: {
    markets: [
      { title: 'Commercial', subtitle: 'Affichage Professionnel' },
      { title: 'Indoor', subtitle: 'Solutions Pas Fin' },
      { title: 'Outdoor', subtitle: 'Haute Luminosité' },
      { title: 'Rental & Stage', subtitle: 'Événements en Direct' },
      { title: 'DOOH', subtitle: 'Affichage Numérique Extérieur' },
    ],
    scrollHint: 'Défilez pour explorer les marchés',
  },
  parallaxGallery: {
    sectionLabel: 'NOS PROJETS',
    sectionTitle: 'Galerie',
    galleryLabel: 'TRAVAUX PHARES',
    galleryTitle: 'Blogs',
    endCtaText: 'Voir Tout',
    marqueeTexts: ['SOLUTIONS LED', 'EXCELLENCE VISUELLE', 'PORTÉE MONDIALE', 'INNOVATION'],
    galleryTitles: ['Salle de Concert', 'Centre Commercial', 'Panneau Urbain', 'Siège Social', 'Showroom', 'Hall d\'Hôtel'],
  },
  whyChoose: {
    sectionLabel: 'POURQUOI NOUS CHOISIR',
    sectionTitle: 'Pourquoi Choisir VexaLed',
    statCards: [
      { label: 'Années d\'Expérience', description: 'Expertise de pointe en technologie LED' },
      { label: 'Projets Mondiaux', description: 'Installations réussies dans le monde entier' },
      { label: 'Pays Desservis', description: 'Présence mondiale et support local' },
      { label: 'Certifié', description: 'Normes de qualité et environnementales' },
    ],
    pillars: [
      { title: 'Innovation d\'Abord', description: 'Technologie LED de pointe avec investissement continu en R&D' },
      { title: 'Qualité Assurée', description: 'Fabrication certifiée ISO avec contrôle qualité rigoureux' },
      { title: 'Support Mondial', description: 'Support technique 24/7 avec équipes locales dans le monde entier' },
    ],
    bottomNote: 'Prêt à transformer votre espace avec la technologie LED de pointe ?',
    bottomCtaText: 'Commencer',
  },
  inquiry: {
    title: 'Laisser une Demande',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email Professionnel',
    country: 'Pays',
    jobTitle: 'Poste',
    product: 'Produit / Solution',
    selectProduct: 'Sélectionner...',
    verificationCode: 'Code de Vérification',
    message: 'Message',
    messagePlaceholder: 'Parlez-nous de vos exigences de projet...',
    submit: 'Envoyer',
  },
  productsSection: {
    tag: 'NOS PRODUITS',
    title: 'Solutions LED',
    subtitle: 'Découvrez notre gamme de technologies d\'affichage LED de pointe',
    learnMore: 'En Savoir Plus',
    navHint: 'Utilisez les flèches ou glissez pour naviguer',
    products: [
      { name: 'NEXUS PRO', subtitle: 'Écran LED Intérieur', description: 'Panneau LED à pas ultra-fin pour installations intérieures premium avec une précision de couleur étonnante.', specs: ['P1.2-P2.5 Pas', '3840Hz Rafraîchissement', '5000:1 Contraste'] },
      { name: 'CURVE X', subtitle: 'Écran LED Flexible', description: 'Technologie LED flexible révolutionnaire pour écrans courbes et cylindriques immersifs.', specs: ['360° Flexible', 'Courbe Sans Couture', 'Design Modulaire'] },
      { name: 'ALL-IN-ONE', subtitle: 'Écran LED Intelligent', description: 'Solution complète pour salles de réunion avec système de contrôle intégré et support mobile.', specs: ['135"-216" Tailles', 'Tactile', 'Cast Sans Fil'] },
      { name: 'STAGE PRO', subtitle: 'Panneau LED Rental', description: 'Modules LED professionnels pour événements avec système de verrouillage rapide.', specs: ['500x500mm', 'Verrouillage Rapide', 'IP65'] },
      { name: 'CYLINDER 360', subtitle: 'Écran LED Cylindrique', description: 'Colonnes LED cylindriques pour retail, expositions et espaces architecturaux.', specs: ['360° Vision', 'Tailles Personnalisées', 'Interactif'] },
    ],
  },
  contactFooter: {
    heroTitle: 'PARLONS-EN',
    heroSubtitle: 'DE VOTRE PROJET',
    ctaButtonText: 'CONTACTEZ-NOUS',
    startConfig: 'Démarrer la Configuration',
    talkEngineer: 'Parler à un Ingénieur',
    companyLabel: 'ENTREPRISE',
    companyName: 'VEXALED',
    companySubtitle: 'Fournisseur Mondial de Solutions LED',
    brandDescription: 'Fabricant leader de solutions d\'affichage LED premium pour les applications commerciales, de divertissement et architecturales.',
    quickLinksTitle: 'Liens Rapides',
    quickLinks: ['Produits', 'Marchés', 'Galerie', 'À Propos', 'Contact'],
    contactTitle: 'Contact',
    emailLabel: 'Email',
    phoneLabel: 'Téléphone',
    addressLabel: 'Adresse',
    ctaTitle: 'Démarrer un Projet',
    ctaDescription: 'Dites-nous vos besoins en affichage LED et obtenez un devis personnalisé.',
    copyrightText: '© 2025 VexaLed. Tous droits réservés.',
    bottomLinks: ['Politique de Confidentialité', 'Conditions d\'Utilisation', 'Politique de Cookies'],
  },
};

// ===== ARABIC =====
const ar: Translations = {
  nav: {
    market: 'السوق',
    products: 'المنتجات',
    caseStudy: 'دراسات الحالة',
    serviceSupport: 'الخدمة والدعم',
    aboutUs: 'من نحن',
    downloads: 'التنزيلات',
    blog: 'المدونة',
    search: 'بحث',
    language: 'اللغة',
    configure: 'تكوين',
    vipLogin: 'تسجيل دخول VIP',
    closeMenu: 'إغلاق القائمة',
    openMenu: 'فتح القائمة',
  },
  vip: { login: 'تسجيل الدخول', register: 'التسجيل' },
  megaMenu: {
    market: {
      sectionTitle: 'الصناعات',
      items: [
        { title: 'الرياضة والملاعب', description: 'حلول LED بمستوى الملاعب لتجارب غامرة' },
        { title: 'الإعلان و DOOH', description: 'شاشات رقمية خارجية عالية التأثير' },
        { title: 'الفعاليات والمسارح', description: 'شاشات جولات وتأجير للإنتاج المباشر' },
        { title: 'الإنتاج الافتراضي', description: 'أحجام LED جاهزة لـ XR في السينما والبث' },
        { title: 'الشركات و Control Rooms', description: 'حلول تصور حرجة المهام' },
      ],
    },
    products: {
      sectionTitle: 'أنظمة شاشات LED',
      items: [
        { title: 'شاشة COB LED', description: 'تقنية Chip-on-Board من الجيل التالي' },
        { title: 'شاشات LED داخلية', description: 'شاشات دقيقة للتطبيقات الداخلية' },
        { title: 'شاشات LED خارجية', description: 'حلول عالية السطوع مقاومة للطقس' },
        { title: 'شاشات Rental والمسرح', description: 'ألواح خفيفة جاهزة للجولات' },
      ],
    },
    caseStudy: {
      sectionTitle: 'مشاريع مميزة',
      items: [
        { title: 'معرض دبي العالمي', description: 'الإمارات · جناح غامر' },
        { title: 'معاينة MSG Sphere', description: 'لاس فيغاس · مكان ترفيهي' },
        { title: 'ملعب شنغهاي', description: 'الصين · مكان رياضي' },
        { title: 'قاعة حفلات برلين', description: 'ألمانيا · فعاليات حية' },
      ],
    },
    serviceSupport: {
      sectionTitle: 'الخدمات',
      items: [
        { title: 'الدعم الهندسي', description: 'مساعدة تقنية عالمية على مدار الساعة' },
        { title: 'التركيب والتشغيل', description: 'خدمات نشر احترافية' },
        { title: 'الصيانة والضمان', description: 'برامج رعاية شاملة' },
        { title: 'الوثائق التقنية', description: 'كتيبات ومواصفات وأدلة' },
      ],
    },
    aboutUs: {
      sectionTitle: 'الشركة',
      items: [
        { title: 'نظرة عامة', description: 'مهمتنا ورؤيتنا العالمية' },
        { title: 'التصنيع والجودة', description: 'التميز الهندسي ومراقبة الجودة' },
        { title: 'التواجد العالمي', description: 'مكاتب وشركاء حول العالم' },
        { title: 'الاستدامة', description: 'مبادرات المسؤولية البيئية' },
      ],
    },
    downloads: {
      sectionTitle: 'الموارد',
      items: [
        { title: 'كتالوجات المنتجات', description: 'وثائق المنتجات الكاملة' },
        { title: 'الأوراق التقنية', description: 'المواصفات التفصيلية' },
        { title: 'الشهادات', description: 'وثائق الامتثال' },
        { title: 'حزمة الإعلام', description: 'أصول العلامة التجارية والصحافة' },
      ],
    },
    blog: {
      sectionTitle: 'المحتوى',
      items: [
        { title: 'رؤى', description: 'تحليلات واتجاهات الصناعة' },
        { title: 'أخبار', description: 'إعلانات الشركة' },
        { title: 'مقالات تقنية', description: 'تعمق في تقنية LED' },
      ],
    },
  },
  trustBar: {
    items: [
      { value: '18+', label: 'سنوات خبرة' },
      { value: '120+', label: 'دولة مخدومة' },
      { value: 'Pro', label: 'فريق هندسي' },
      { value: 'ISO', label: 'جودة معتمدة' },
    ],
  },
  hero: {
    tagline: 'أنظمة بصرية غامرة مصممة للهندسة المعمارية والفعاليات والمساحات المستقبلية.',
  },
  marketShowcase: {
    title1: 'اعرض عالمك',
    title2: 'بطرق لا نهائية',
    subtitle: 'حلول شاشات LED توفر تصور المحتوى وتجارب غامرة لأي تطبيق',
  },
  scenarios: {
    title: 'سيناريوهات التطبيق',
    subtitle: 'حلول متكاملة لتطبيقات شاشات LED في البيئات التجارية والمعمارية والترفيهية.',
    viewMore: 'عرض المزيد',
    swipeHint: 'اسحب للاستكشاف',
    scenarioTitles: {
      Commercial: ['فندق بنتلي الفاخر قطر', 'صالات عرض الشركات الدمام', 'تجربة دبي مول الرقمية', 'مركز خليج مارينا سنغافورة', 'مركز تجزئة فاخر لندن'],
      Indoor: ['مركز كيونغنام التعليمي المستقبلي', 'قاعة مؤتمرات الشركات', 'عرض تفاعلي بالمتحف', 'لافتات صالة المطار', 'ردهة مركز التسوق'],
      Outdoor: ['واجهة LED خارجية دبي', 'شاشة تقاطع شيبويا طوكيو', 'لوحة تايمز سكوير نيويورك', 'معلم البوند شنغهاي', 'تركيب لاس فيغاس ستريب'],
      Rental: ['مسرح جولة حفلات عالمية', 'المسرح الرئيسي لمهرجان الموسيقى', 'خلفية حدث مؤسسي', 'إعداد حفل توزيع الجوائز', 'معرض تجاري'],
      DOOH: ['لوحة رقمية تايمز سكوير', 'شبكة لافتات رقمية للطرق السريعة', 'شاشات محطات النقل', 'إعلانات رقمية لواجهات المتاجر', 'أكشاك معلومات المدينة الذكية'],
    },
  },
  whyVexaled: {
    title: 'لماذا VEXALED',
    subtitle: 'هندسة أنظمة شاشات COB LED من الجيل التالي بنطاق عالمي وموثوقية مثبتة ورؤية طويلة المدى.',
    features: [
      { title: 'تخصيص هندسي', description: 'كل منتج مصمم من قبل فريق الهندسة الداخلي لدينا مع التركيز على الأداء والموثوقية والتحسين الخاص بالتطبيق.' },
      { title: 'ضمان جودة معتمد', description: 'تصنيع معتمد ISO مع رقابة جودة صارمة متعددة المراحل تضمن أعلى المعايير.' },
      { title: 'توصيل عالمي موثوق', description: 'شبكة لوجستية عالمية مع منسقين مخصصين يضمنون التسليم في الوقت المحدد في أكثر من 50 دولة.' },
      { title: 'خدمة ودعم احترافي', description: 'تغطية ضمان شاملة وفريق دعم تقني متاح في جميع المناطق الزمنية.' },
    ],
    credentials: [
      { value: '18+', label: 'سنوات خبرة' },
      { value: '120+', label: 'دولة مخدومة' },
      { value: 'Pro', label: 'فريق هندسي' },
      { value: 'ISO', label: 'جودة معتمدة' },
    ],
    closingQuote: '"نبتكر، نستمتع، نشارك —',
    closingHighlight: ' نحن VEXA."',
  },
  productCategories: {
    tag: 'خطوط المنتجات',
    title: 'حلول هندسية دقيقة',
    subtitle: 'أنظمة شاشات COB LED متميزة مصممة للوضوح والموثوقية والنشر العالمي.',
    products: [
      { title: 'شاشة COB فائقة الدقة', tag: 'P0.7 – P1.5', description: 'دقة chip-on-board للمرئيات الحرجة.' },
      { title: 'شاشة Rental وجولات', tag: 'تركيب سريع', description: 'ألواح معيارية خفيفة الوزن للأحداث الحية والمسارح.' },
      { title: 'شاشة منحنية / إبداعية', tag: 'هندسة مرنة', description: 'انحناءات سلسة لتجارب معمارية وتجارية غامرة.' },
    ],
  },
  ai: {
    tag: 'الذكاء الاصطناعي',
    title: 'سير عمل معزز بالذكاء الاصطناعي',
    subtitle: 'الاستفادة من الذكاء الاصطناعي لتبسيط مشروع LED الخاص بك من المفهوم إلى الإنجاز.',
    features: [
      { title: 'مساعد ذكي', description: 'دعم ذكي متعدد اللغات على مدار الساعة للاستفسارات التقنية والمواصفات وإرشاد المشاريع.', highlight: '12+ لغة' },
      { title: 'أتمتة المحتوى', description: 'إنشاء محتوى بالذكاء الاصطناعي للمواد التسويقية والوثائق والأصول المرئية.', highlight: 'إنشاء فوري' },
      { title: 'تكوين بصري', description: 'أداة تصميم ذكية توصي بأفضل تكوينات LED بناءً على متطلباتك.', highlight: 'توصيات ذكية' },
    ],
    note: 'الذكاء الاصطناعي يساعد مهندسينا ومصممينا — لا يحل محلهم. كل مشروع يُراجع ويُحسّن من قبل فريق الخبراء.',
    noteHighlight: 'ملاحظة:',
  },
  news: {
    tag: 'أخبار',
    title: 'الفعاليات والأخبار',
    subtitle: 'أحدث الإطلاقات والمعارض وأبرز المشاريع.',
    swipeHint: 'اسحب للاستكشاف',
    items: [
      { title: 'VEXALED في ISE 2024 برشلونة', category: 'معرض' },
      { title: 'إطلاق سلسلة COB P0.9 الجديدة', category: 'إطلاق' },
      { title: 'معلم رقمي مول الإمارات', category: 'حالة مميزة' },
      { title: 'معاينة InfoComm 2024', category: 'معرض' },
      { title: 'VEXALED تحصل على شهادة الحياد الكربوني', category: 'صحافة' },
      { title: 'تركيب ملعب سيول الأولمبي', category: 'حالة مميزة' },
      { title: 'عرض LED China 2024', category: 'معرض' },
      { title: 'سلسلة LED شفافة لـ Retail', category: 'إطلاق' },
    ],
  },
  cta: {
    tag: 'ابدأ مشروعك',
    title: 'مستعد لتحويل رؤيتك؟',
    subtitle: 'أجب عن بعض الأسئلة واحصل على توصية حل LED مخصصة من فريقنا الهندسي.',
    startConfig: 'بدء التكوين',
    talkEngineer: 'تحدث مع مهندس',
    badges: ['استشارة مجانية', 'بدون التزام', 'رد خلال 48 ساعة'],
  },
  footer: {
    description: 'تقنية شاشات COB LED المتميزة وأنظمة بصرية للتطبيقات المتطلبة حول العالم. تميز هندسي منذ 2006.',
    products: 'المنتجات',
    solutions: 'الحلول',
    about: 'حول',
    followUs: 'تابعنا',
    copyright: '© 2025 VEXALED. جميع الحقوق محفوظة.',
    terms: 'شروط الاستخدام',
    privacy: 'الخصوصية',
    aboutLinks: [
      { label: 'من نحن', href: '/about' },
      { label: 'اتصل بنا', href: '/contact' },
      { label: 'وظائف', href: '/careers' },
      { label: 'الشركة', href: '/company' },
    ],
  },
  searchPlaceholder: 'البحث عن منتجات، حلول...',
  startConfiguration: 'بدء التكوين',
  contactSales: 'اتصل بالمبيعات',
  chatbot: {
    title: 'مساعد VEXA الذكي',
    placeholder: 'اسأل عن شاشات LED، المنتجات، الأسعار...',
    greeting: 'مرحباً! أنا VEXA AI، مساعدك لشاشات LED. كيف يمكنني مساعدتك اليوم؟',
    thinking: 'جارٍ التفكير...',
    errorMessage: 'عذراً، لم أتمكن من معالجة ذلك. يرجى المحاولة مرة أخرى.',
  },
  marketCube: {
    markets: [
      { title: 'Commercial', subtitle: 'عرض احترافي' },
      { title: 'Indoor', subtitle: 'حلول دقيقة' },
      { title: 'Outdoor', subtitle: 'سطوع عالي' },
      { title: 'Rental & Stage', subtitle: 'فعاليات حية' },
      { title: 'DOOH', subtitle: 'رقمي خارجي' },
    ],
    scrollHint: 'مرر لاستكشاف الأسواق',
  },
  parallaxGallery: {
    sectionLabel: 'مشاريعنا',
    sectionTitle: 'المعرض',
    galleryLabel: 'أعمال مميزة',
    galleryTitle: 'المدونات',
    endCtaText: 'عرض الكل',
    marqueeTexts: ['حلول LED', 'تميز بصري', 'انتشار عالمي', 'ابتكار'],
    galleryTitles: ['ساحة حفلات', 'مركز تجاري', 'لوحة إعلانية', 'مقر شركة', 'صالة عرض', 'ردهة فندق'],
  },
  whyChoose: {
    sectionLabel: 'لماذا تختارنا',
    sectionTitle: 'لماذا تختار VexaLed',
    statCards: [
      { label: 'سنوات خبرة', description: 'خبرة رائدة في تقنية LED' },
      { label: 'مشاريع عالمية', description: 'تركيبات ناجحة حول العالم' },
      { label: 'دول مخدومة', description: 'تواجد عالمي ودعم محلي' },
      { label: 'معتمد', description: 'معايير الجودة والبيئة' },
    ],
    pillars: [
      { title: 'الابتكار أولاً', description: 'تقنية LED متطورة مع استثمار مستمر في البحث والتطوير' },
      { title: 'جودة مضمونة', description: 'تصنيع معتمد ISO مع رقابة جودة صارمة' },
      { title: 'دعم عالمي', description: 'دعم تقني على مدار الساعة مع فرق خدمة محلية' },
    ],
    bottomNote: 'مستعد لتحويل مساحتك بتقنية LED المتطورة؟',
    bottomCtaText: 'ابدأ الآن',
  },
  inquiry: {
    title: 'ترك استفسار',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني للعمل',
    country: 'البلد',
    jobTitle: 'المسمى الوظيفي',
    product: 'المنتج / الحل',
    selectProduct: 'اختر...',
    verificationCode: 'رمز التحقق',
    message: 'الرسالة',
    messagePlaceholder: 'أخبرنا عن متطلبات مشروعك...',
    submit: 'إرسال',
  },
  productsSection: {
    tag: 'منتجاتنا',
    title: 'حلول LED',
    subtitle: 'اكتشف مجموعتنا من تقنيات شاشات LED المتطورة',
    learnMore: 'اعرف المزيد',
    navHint: 'استخدم مفاتيح الأسهم أو اسحب للتنقل',
    products: [
      { name: 'NEXUS PRO', subtitle: 'شاشة LED داخلية', description: 'لوحة LED بخطوة بكسل فائقة الدقة للتركيبات الداخلية المتميزة مع دقة لون مذهلة.', specs: ['P1.2-P2.5 خطوة', '3840Hz تحديث', '5000:1 تباين'] },
      { name: 'CURVE X', subtitle: 'شاشة LED مرنة', description: 'تقنية LED مرنة ثورية لشاشات منحنية وأسطوانية غامرة.', specs: ['360° مرنة', 'انحناء سلس', 'تصميم معياري'] },
      { name: 'ALL-IN-ONE', subtitle: 'شاشة LED ذكية', description: 'حل متكامل لغرف الاجتماعات مع نظام تحكم مدمج وحامل متحرك.', specs: ['135"-216" أحجام', 'جاهز للمس', 'بث لاسلكي'] },
      { name: 'STAGE PRO', subtitle: 'لوحة LED للتأجير', description: 'وحدات LED احترافية للفعاليات مع نظام قفل سريع للنشر السريع.', specs: ['500x500mm', 'قفل سريع', 'IP65'] },
      { name: 'CYLINDER 360', subtitle: 'شاشة LED أسطوانية', description: 'أعمدة LED أسطوانية لافتة للنظر للبيع بالتجزئة والمعارض والمساحات المعمارية.', specs: ['360° مشاهدة', 'أحجام مخصصة', 'جاهز للتفاعل'] },
    ],
  },
  contactFooter: {
    heroTitle: 'لنتحدث',
    heroSubtitle: 'عن مشروعك',
    ctaButtonText: 'اتصل بنا',
    startConfig: 'بدء التكوين',
    talkEngineer: 'تحدث مع مهندس',
    companyLabel: 'الشركة',
    companyName: 'VEXALED',
    companySubtitle: 'مزود حلول LED عالمي',
    brandDescription: 'الشركة الرائدة في تصنيع حلول شاشات LED المتميزة للتطبيقات التجارية والترفيهية والمعمارية.',
    quickLinksTitle: 'روابط سريعة',
    quickLinks: ['المنتجات', 'الأسواق', 'المعرض', 'من نحن', 'اتصل بنا'],
    contactTitle: 'اتصل بنا',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'الهاتف',
    addressLabel: 'العنوان',
    ctaTitle: 'ابدأ مشروعاً',
    ctaDescription: 'أخبرنا عن احتياجاتك من شاشات LED واحصل على عرض أسعار مخصص.',
    copyrightText: '© 2025 VexaLed. جميع الحقوق محفوظة.',
    bottomLinks: ['سياسة الخصوصية', 'شروط الخدمة', 'سياسة ملفات تعريف الارتباط'],
  },
};

export const translations: Record<Language, Translations> = { en, zh, es, fr, ar };
