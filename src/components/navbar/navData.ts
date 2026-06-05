export interface NavSubItem {
  title: string;
  description?: string;
  href: string;
  image?: string;
}

export interface NavSection {
  title: string;
  items: NavSubItem[];
}

export interface NavItem {
  label: string;
  href?: string;
  sections?: NavSection[];
}

export const navItems: NavItem[] = [
  {
    label: 'Market',
    sections: [
      {
        title: 'Industries',
        items: [
          { title: 'Sports & Arenas', description: 'Stadium-grade LED solutions for immersive fan experiences', href: '/market/sports', image: '/src/assets/products/navbar/sports.jpg' },
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
    sections: [
      {
        title: 'LED Displays',
        items: [
          { title: 'LED Poster Display', description: 'Portable digital signage with foldable design', href: '/products/led-screen/vx-led-poster', image: '/src/assets/products/navbar/led-poster.jpg' },
          { title: 'Folding Screen', description: 'Modular panels for events and video walls', href: '/products/folding-screen', image: '/src/assets/products/navbar/led-screen.jpg' },
        ],
      },
    ],
  },
  /* HIDDEN - Case Study page temporarily disabled
  {
    label: 'Case Study',
    sections: [
      {
        title: 'Featured Projects',
        items: [
          { title: 'Dubai World Expo', description: 'UAE · Immersive Pavilion', href: '/case-study/dubai-expo', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop' },
          { title: 'MSG Sphere Preview', description: 'Las Vegas · Entertainment Venue', href: '/case-study/msg-sphere', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop' },
          { title: 'Shanghai Stadium', description: 'China · Sports Venue', href: '/case-study/shanghai-stadium', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop' },
          { title: 'Berlin Concert Hall', description: 'Germany · Live Events', href: '/case-study/berlin-concert', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop' },
        ],
      },
    ],
  },
  */
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
