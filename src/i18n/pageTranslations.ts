// Page-specific translations for About, Blog, Case Studies, Manufacturing, Sustainability
// Using the same Language type from main translations

export interface PageTranslations {
  // About Index
  about: {
    ourStory: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    learnMore: string;
    companyOverview: string;
    overview: {
      mission: string;
      missionDesc: string;
      vision: string;
      visionDesc: string;
      globalImpact: string;
      globalImpactDesc: string;
    };
    foundedNote: string;
    keyAchievements: string;
    stats: { value: string; label: string }[];
    developmentTimeline: string;
    timelineDescription: string;
    brandTechnologyPillars: string;
    pillarsDescription: string;
    pillars: {
      coreTechnology: string;
      coreTechnologyDesc: string;
      applications: string;
      applicationsDesc: string;
      innovationPlatform: string;
      innovationPlatformDesc: string;
    };
    // About detail page
    backToAboutUs: string;
    atAGlance: string;
    keyPoints: string;
    overviewPage: {
      title: string;
      tag: string;
      description: string;
      longDescription: string;
      specs: { label: string; value: string }[];
      points: string[];
    };
  };

  // Manufacturing page
  manufacturing: {
    hero: { tag: string; title: string; subtitle: string; description: string; scroll: string };
    capabilities: {
      title: string;
      description: string;
      items: { title: string; desc: string }[];
    };
    workflow: {
      tag: string;
      title: string;
      steps: { title: string; desc: string }[];
    };
    quality: {
      tag: string;
      title: string;
      description: string;
      items: { title: string; desc: string }[];
      protocol: { title: string; desc: string };
    };
    calibration: {
      title: string;
      description: string;
      stats: { val: string; title: string }[];
    };
    compliance: {
      title: string;
      standards: string[];
    };
    closing: { title: string; description: string; cta: string };
  };

  // Sustainability page
  sustainability: {
    hero: { tag: string; title: string; subtitle: string; description: string; scroll: string };
    efficiency: {
      title: string;
      subtitle: string;
      description: string;
      features: { title: string; desc: string }[];
      graphic: { value: string; label: string; desc: string };
    };
    longevity: {
      title: string;
      description: string;
      benefits: { val: string; unit: string; title: string; desc: string }[];
    };
    materials: {
      tag: string;
      title: string;
      subtitle: string;
      description: string;
      standards: string[];
      cards: { title: string; desc: string }[];
    };
    closing: { title: string; ctaManufacturing: string; ctaEngineering: string };
  };

  // Blog page
  blog: {
    knowledgeHub: string;
    title: string;
    subtitle: string;
    categories: { all: string; ledTechnology: string; smartDisplays: string; productUpdates: string; caseStudies: string; companyNews: string };
    posts: {
      title: string;
      excerpt: string;
      category: string;
      date: string;
      author: string;
      image: string;
      featured?: boolean;
    }[];
    knowledgeInnovation: string;
    knowledgeDescription: string;
    resources: { title: string; desc: string }[];
    stayUpdated: string;
    newsletterDescription: string;
    exploreSolutions: string;
    subscribe: string;
    subscribing: string;
    loadMore: string;
    noArticles: string;
  };

  // Case Studies
  cases: {
    heroTag: string;
    heroTitle: string;
    heroDescription: string;
    introText: string;
    introSubtext: string;
    viewProject: string;
    comingSoon: string;
    backToCases: string;
    projectContext: string;
    keyFacts: string;
    technicalSpecs: string;
    theChallenge: string;
    theSolution: string;
    whyItWorked: string;
    relatedApplications: string;
    galleryTitle: string;
    readyToBuild: string;
    ctaDescription: string;
    startConfiguration: string;
    talkToEngineer: string;
  };
}

const en: PageTranslations = {
  about: {
    ourStory: 'Our Story',
    heroTitle: 'Engineering Visual Excellence',
    heroSubtitle: 'Since 2006',
    heroDescription: 'From LED modules to full-spectrum display systems — pioneering visual technology for architecture, entertainment, and beyond.',
    learnMore: 'Learn More',
    companyOverview: 'Company Overview',
    overview: {
      mission: 'Our Mission',
      missionDesc: 'To engineer the most reliable, visually stunning LED display systems for the world\'s most demanding applications.',
      vision: 'Our Vision',
      visionDesc: 'A world where every space can become an immersive visual experience — intelligent, sustainable, and connected.',
      globalImpact: 'Global Impact',
      globalImpactDesc: 'Operating across 80+ countries with dedicated engineering teams, local partnerships, and 24/7 support infrastructure.',
    },
    foundedNote: 'Founded in <strong>2006</strong>, Vexaled has grown from a specialist in LED modules to a full-spectrum provider of display systems, control solutions, and professional services.',
    keyAchievements: 'Key Achievements',
    stats: [
      { value: '18+', label: 'Years Experience' },
      { value: '5,000+', label: 'Projects Delivered' },
      { value: '80+', label: 'Countries Served' },
      { value: '50+', label: 'Patents & Certifications' },
    ],
    developmentTimeline: 'Development Timeline',
    timelineDescription: 'Key milestones that shaped our journey from founding to global leadership.',
    brandTechnologyPillars: 'Brand & Technology Pillars',
    pillarsDescription: 'Three pillars define how we approach LED display engineering.',
    pillars: {
      coreTechnology: 'Core Technology',
      coreTechnologyDesc: 'COB LED, fine-pitch engineering, and advanced thermal management.',
      applications: 'Applications',
      applicationsDesc: 'Sports, corporate, retail, XR — solutions for every vertical.',
      innovationPlatform: 'Innovation Platform',
      innovationPlatformDesc: 'AI-driven tools, smart diagnostics, and continuous R&D.',
    },
    backToAboutUs: 'Back to About Us',
    atAGlance: 'At a Glance',
    keyPoints: 'Key Points',
    overviewPage: {
      title: 'Company Overview',
      tag: 'About VEXALED',
      description: 'A global leader in LED display technology and visual solutions.',
      longDescription: 'VEXALED engineers premium LED display systems for the world\'s most demanding environments — from concert stages and sports arenas to corporate boardrooms and retail flagships. Our commitment to innovation, quality, and service defines everything we build.',
      specs: [
        { label: 'Founded', value: '2006' },
        { label: 'Focus', value: 'LED Display Systems' },
        { label: 'Markets', value: '80+ Countries' },
        { label: 'Applications', value: 'Indoor, Outdoor, Rental, XR' },
        { label: 'Certifications', value: 'ISO 9001, CE, FCC, UL' },
      ],
      points: [
        'Full in-house R&D and manufacturing',
        'COB and SMD technology expertise',
        'Global logistics and installation network',
        '24/7 technical support across all time zones',
        'Sustainable manufacturing practices',
      ],
    },
  },

  manufacturing: {
    hero: {
      tag: 'Manufacturing & QC',
      title: 'Engineered to Perform.',
      subtitle: 'Built to Last.',
      description: 'Every display system undergoes rigorous engineering, precision manufacturing, and comprehensive quality validation before it reaches your venue.',
      scroll: 'Scroll to explore',
    },
    capabilities: {
      title: 'Manufacturing Capabilities',
      description: 'State-of-the-art production lines with advanced automation and precision engineering.',
      items: [
        { title: 'Advanced SMT Lines', desc: 'High-speed surface mount technology with ±25μm placement accuracy.' },
        { title: 'COB Packaging', desc: 'Proprietary Chip-on-Board encapsulation for superior pixel protection.' },
        { title: 'Module Assembly', desc: 'Automated assembly with real-time quality inspection at every stage.' },
        { title: 'Precision Calibration', desc: 'Per-pixel brightness and color calibration for seamless uniformity.' },
      ],
    },
    workflow: {
      tag: 'Production Process',
      title: 'From Raw Materials to Finished Product',
      steps: [
        { title: 'PCB Fabrication', desc: 'Multi-layer PCB design and manufacturing.' },
        { title: 'SMT Assembly', desc: 'High-precision component placement.' },
        { title: 'COB Encapsulation', desc: 'Protective resin application.' },
        { title: 'Module Integration', desc: 'Driver IC and power system assembly.' },
        { title: 'Quality Testing', desc: 'Comprehensive electrical and visual tests.' },
        { title: 'Final Calibration', desc: 'Color and brightness uniformity optimization.' },
      ],
    },
    quality: {
      tag: 'Quality Assurance',
      title: 'Tested Beyond Industry Standards',
      description: 'Our multi-stage quality control process ensures every module meets the highest performance benchmarks.',
      items: [
        { title: 'Optical Inspection', desc: 'Automated visual inspection of every LED chip and solder joint.' },
        { title: 'Thermal Testing', desc: 'Extended burn-in testing at elevated temperatures.' },
        { title: 'Vibration Analysis', desc: 'Mechanical stress testing for transport and installation durability.' },
        { title: 'Electrical Validation', desc: 'Full-spectrum electrical performance verification.' },
      ],
      protocol: { title: '100% Inspection Rate', desc: 'Every unit tested before shipment' },
    },
    calibration: {
      title: 'Calibration & Color Science',
      description: 'Our proprietary calibration system ensures pixel-perfect color accuracy across every panel in your installation.',
      stats: [
        { val: '< 1.5', title: 'Delta E Color Accuracy' },
        { val: '16-bit', title: 'Grayscale Processing' },
        { val: '3840Hz', title: 'Refresh Rate' },
      ],
    },
    compliance: {
      title: 'Reliability & Compliance Standards',
      standards: ['ISO 9001:2015', 'ISO 14001', 'CE Certified', 'FCC Part 15', 'UL Listed', 'RoHS Compliant', 'CCC Certified', 'ETL Certified'],
    },
    closing: {
      title: 'Engineering Excellence, Delivered.',
      description: 'See how our manufacturing quality translates into real-world performance.',
      cta: 'Explore Products',
    },
  },

  sustainability: {
    hero: {
      tag: 'Sustainability',
      title: 'Designed for',
      subtitle: 'Tomorrow.',
      description: 'Sustainable engineering isn\'t an afterthought — it\'s embedded in every product we design, manufacture, and deliver.',
      scroll: 'Scroll to explore',
    },
    efficiency: {
      title: 'Energy Efficiency',
      subtitle: 'By Design',
      description: 'Our LED systems are engineered to deliver maximum visual impact with minimum energy consumption.',
      features: [
        { title: 'Low Power Consumption', desc: 'Advanced driver ICs reduce power draw by up to 40% compared to conventional LED displays.' },
        { title: 'Intelligent Thermal Management', desc: 'Passive cooling systems eliminate fans, reducing noise and energy waste.' },
        { title: 'Ambient Light Sensing', desc: 'Automatic brightness adjustment based on environmental conditions.' },
      ],
      graphic: { value: '40%', label: 'Less Power', desc: 'Compared to conventional LED displays' },
    },
    longevity: {
      title: 'Built for the Long Term',
      description: 'Durability and longevity reduce waste and total cost of ownership.',
      benefits: [
        { val: '100K+', unit: 'Hours', title: 'LED Lifespan', desc: 'Industry-leading component longevity backed by rigorous testing.' },
        { val: '10+', unit: 'Years', title: 'Structural Warranty', desc: 'Extended warranty on cabinet, frame, and structural components.' },
        { val: '95%', unit: 'Recyclable', title: 'Material Recovery', desc: 'Modular design enables efficient end-of-life material recovery.' },
      ],
    },
    materials: {
      tag: 'Responsible Sourcing',
      title: 'Sustainable Materials',
      subtitle: '& Operations',
      description: 'From raw material sourcing to finished product delivery, sustainability guides every decision.',
      standards: [
        'RoHS Compliant — No hazardous substances',
        'REACH Regulation — Chemical safety',
        'Conflict-Free Minerals Policy',
        'ISO 14001 Environmental Management',
      ],
      cards: [
        { title: 'Circular Design', desc: 'Modular architecture enables component-level repair and upgrade, extending product lifecycle.' },
        { title: 'Smart Packaging', desc: 'Recyclable and biodegradable packaging materials with optimized shipping configurations.' },
      ],
    },
    closing: {
      title: 'Sustainability is not a feature — it\'s how we build.',
      ctaManufacturing: 'See Our Manufacturing',
      ctaEngineering: 'Engineering Solutions',
    },
  },

  blog: {
    knowledgeHub: 'Knowledge Hub',
    title: 'Insights & Innovation',
    subtitle: 'Technical deep-dives, industry analysis, and company updates from the VEXALED engineering team.',
    categories: { all: 'All', ledTechnology: 'LED Technology', smartDisplays: 'Smart Displays', productUpdates: 'Product Updates', caseStudies: 'Case Studies', companyNews: 'Company News' },
    posts: [
      { title: 'The Future of COB LED Technology', excerpt: 'Exploring how Chip-on-Board technology is revolutionizing display quality and reliability.', category: 'led-technology', date: 'Jan 2025', author: 'VEXALED Engineering', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop', featured: true },
      { title: 'Smart Display Integration in Modern Architecture', excerpt: 'How LED displays are becoming integral to contemporary architectural design.', category: 'smart-displays', date: 'Dec 2024', author: 'Design Team', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop' },
      { title: 'NEXUS PRO Series: Engineering Breakdown', excerpt: 'A detailed technical analysis of our flagship indoor display platform.', category: 'product-updates', date: 'Nov 2024', author: 'Product Engineering', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop' },
      { title: 'Dubai World Expo: Behind the Screens', excerpt: 'How we delivered immersive LED experiences for the world\'s biggest expo.', category: 'case-studies', date: 'Oct 2024', author: 'Projects Division', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop' },
      { title: 'VEXALED at ISE 2024 Barcelona', excerpt: 'Highlights from our showcase at the world\'s largest AV exhibition.', category: 'company-news', date: 'Sep 2024', author: 'Marketing', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop' },
      { title: 'Understanding Pixel Pitch: A Comprehensive Guide', excerpt: 'Everything you need to know about pixel pitch and viewing distance optimization.', category: 'led-technology', date: 'Aug 2024', author: 'VEXALED Engineering', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=500&fit=crop' },
      { title: 'Control Room Display Solutions', excerpt: 'Mission-critical visualization for NOCs, SOCs, and command centers.', category: 'smart-displays', date: 'Jul 2024', author: 'Solutions Team', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop' },
      { title: 'HDR and Wide Color Gamut in LED Displays', excerpt: 'How modern LED technology achieves cinema-grade color reproduction.', category: 'led-technology', date: 'Jun 2024', author: 'Color Science Lab', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop' },
    ],
    knowledgeInnovation: 'Knowledge & Innovation',
    knowledgeDescription: 'Our engineering team shares insights on LED technology, industry trends, and best practices for visual communication.',
    resources: [
      { title: 'R&D Insights', desc: 'Direct from our research labs — breakthroughs in LED chip design and optical engineering.' },
      { title: 'Industry Trends', desc: 'Analysis of market developments, emerging applications, and technology roadmaps.' },
      { title: 'Engineering Excellence', desc: 'Best practices for LED system design, installation, and long-term maintenance.' },
    ],
    stayUpdated: 'Stay Updated',
    newsletterDescription: 'Subscribe to receive the latest insights, product announcements, and industry analysis.',
    exploreSolutions: 'Explore Our Solutions',
    subscribe: 'Subscribe',
    subscribing: 'Subscribing...',
    loadMore: 'Load More',
    noArticles: 'No articles in this category yet.',
  },

  cases: {
    heroTag: 'Our Work',
    heroTitle: 'Case Studies',
    heroDescription: 'Real-world deployments across stadiums, broadcast studios, retail environments, and public spaces — demonstrating precision engineering at every scale.',
    introText: 'Every project featured here represents a complete engineering engagement — from initial site assessment through design, manufacturing, installation, and long-term support.',
    introSubtext: 'These are not product demos. They are operational deployments in demanding environments, delivering measurable performance for some of the most recognized venues and brands in the world.',
    viewProject: 'View Project',
    comingSoon: 'Additional case studies are in preparation.',
    backToCases: 'All Projects',
    projectContext: 'Project Context',
    keyFacts: 'Key Facts',
    technicalSpecs: 'Technical Snapshot',
    theChallenge: 'The Challenge',
    theSolution: 'The Solution',
    whyItWorked: 'Why It Worked',
    relatedApplications: 'Typical Applications',
    galleryTitle: 'Project Gallery',
    readyToBuild: 'Ready to build something similar?',
    ctaDescription: 'Our engineers are ready to help you define the perfect solution for your venue.',
    startConfiguration: 'Start a Configuration',
    talkToEngineer: 'Talk to an Engineer',
  },
};

// For now, all languages use English as base — translations can be added per-language later
const zh: PageTranslations = { ...en };
const es: PageTranslations = { ...en };
const fr: PageTranslations = { ...en };
const ar: PageTranslations = { ...en };

export const pageTranslations: Record<string, PageTranslations> = { en, zh, es, fr, ar };
