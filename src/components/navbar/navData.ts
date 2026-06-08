import ledPosterNavImg from '@/assets/products/led-screen/poster/front.png';
import ledScreenNavImg from '@/assets/products/led-screen/hero.png';

export interface NavProduct {
  title: string;
  description: string;
  href: string;
  image?: string;
}

export interface NavSubCategory {
  label: string;
  href: string;
  comingSoon?: boolean;
  products: NavProduct[];
}

export interface NavSection {
  title: string;
  items: NavSubItem[];
}

export interface NavSubItem {
  title: string;
  description?: string;
  href: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  subCategories?: NavSubCategory[];
  sections?: NavSection[];
}

export const navItems: NavItem[] = [
  {
    label: 'Market',
    sections: [
      {
        title: 'Industries',
        items: [
          { title: 'Sports & Arenas', description: 'Stadium-grade LED solutions', href: '/market/sports', image: '/src/assets/products/navbar/sports.jpg' },
          { title: 'Advertising & DOOH', description: 'High-impact digital out-of-home displays', href: '/market/advertising', image: '/src/assets/products/navbar/advertising.jpg' },
          { title: 'Events & Staging', description: 'Touring and rental displays for live productions', href: '/market/events', image: '/src/assets/products/navbar/events.jpg' },
          { title: 'Virtual Production', description: 'XR-ready LED volumes for film and broadcast', href: '/market/virtual-production', image: '/src/assets/products/navbar/virtual-production.jpg' },
          { title: 'Corporate & Control Rooms', description: 'Mission-critical visualization solutions', href: '/market/corporate', image: '/src/assets/products/navbar/corporate.jpg' },
        ],
      },
    ],
  },
  {
    label: 'Products',
    subCategories: [
      {
        label: 'Indoor',
        href: '/products/led-screens',
        products: [
          { title: 'City Light Cabinet Series', description: 'Standard, Flexible, and 45° Right Angle — one 500×500mm hardware platform', href: '/products/led-screens/city-light-series', image: ledScreenNavImg },
          { title: 'Small Pitch Series', description: 'Ultra-fine pitch indoor displays — 400×300 to 640×480mm cabinets', href: '/products/led-screens/indoor-small-pitch', image: ledScreenNavImg },
          { title: 'Rental & Fixed Series', description: 'Rental events and permanent fixed installations — P2.604 to P5', href: '/products/led-screens/indoor-rental-fixed', image: ledScreenNavImg },
          { title: 'Creative Display Series', description: 'Soft board, mirror screen, transparent, and folding screen', href: '/products/led-screens/indoor-creative', image: ledScreenNavImg },
        ],
      },
      {
        label: 'Outdoor',
        href: '/products/led-screens',
        products: [
          { title: 'Rental Series', description: 'IP65 waterproof rental cabinets for outdoor events and touring', href: '/products/led-screens/outdoor-rental', image: ledScreenNavImg },
          { title: 'Fixed Installation Series', description: 'Permanent outdoor displays — small pitch to large-format DIP in-line', href: '/products/led-screens/outdoor-fixed', image: ledScreenNavImg },
          { title: 'Front Maintenance Series', description: 'Front-serviceable cabinets — screw and hexagonal lock types', href: '/products/led-screens/outdoor-front-maintenance', image: ledScreenNavImg },
        ],
      },
      {
        label: 'Poster',
        href: '/products/led-screens',
        products: [
          { title: 'LED Poster Display', description: 'Portable foldable LED display for retail & events', href: '/products/led-screens/led-poster-display', image: ledPosterNavImg },
        ],
      },
      {
        label: 'Lighting',
        href: '/products/lighting',
        comingSoon: true,
        products: [],
      },
    ],
  },
  {
    label: 'Service & Support',
    sections: [
      {
        title: 'Services',
        items: [
          { title: 'Engineering Support', description: '24/7 technical assistance worldwide', href: '/about/overview' },
          { title: 'Installation & Commissioning', description: 'Professional deployment services', href: '/about/overview' },
          { title: 'Maintenance & Warranty', description: 'Comprehensive care programs', href: '/about/overview' },
          { title: 'Technical Documentation', description: 'Manuals, specs, and guides', href: '/about/overview' },
        ],
      },
    ],
  },
  {
    label: 'About Us',
    href: '/about',
    sections: [
      {
        title: 'Company',
        items: [
          { title: 'Company Overview', description: 'Our mission and global vision', href: '/about/overview' },
          { title: 'Manufacturing & QC', description: 'Engineering excellence and quality control', href: '/about/manufacturing' },
          { title: 'Global Presence', description: 'Offices and partners worldwide', href: '/about/overview' },
          { title: 'Sustainability', description: 'Environmental responsibility initiatives', href: '/about/sustainability' },
        ],
      },
    ],
  },
  {
    label: 'Downloads',
    href: '/about',
    sections: [
      {
        title: 'Resources',
        items: [
          { title: 'Product Catalogs', description: 'Complete product documentation', href: '/about' },
          { title: 'Technical Datasheets', description: 'Detailed specifications', href: '/about' },
          { title: 'Certifications', description: 'Industry compliance documents', href: '/about' },
          { title: 'Media Kit', description: 'Brand assets and press materials', href: '/about' },
        ],
      },
    ],
  },
  {
    label: 'Blog',
    href: '/blog',
    sections: [
      {
        title: 'Content',
        items: [
          { title: 'Insights', description: 'Industry analysis and trends', href: '/blog' },
          { title: 'News', description: 'Company announcements', href: '/blog' },
          { title: 'Technology Articles', description: 'Deep dives into LED technology', href: '/blog' },
        ],
      },
    ],
  },
];

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
];
