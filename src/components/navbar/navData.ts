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
          { 
            title: 'Sports & Arenas', 
            description: 'Stadium-grade LED solutions for immersive fan experiences', 
            href: '/market/sports',
            image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop'
          },
          { 
            title: 'Advertising & DOOH', 
            description: 'High-impact digital out-of-home displays', 
            href: '/market/advertising',
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop'
          },
          { 
            title: 'Events & Staging', 
            description: 'Touring and rental displays for live productions', 
            href: '/market/events',
            image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop'
          },
          { 
            title: 'Virtual Production', 
            description: 'XR-ready LED volumes for film and broadcast', 
            href: '/market/virtual-production',
            image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop'
          },
          { 
            title: 'Corporate & Control Rooms', 
            description: 'Mission-critical visualization solutions', 
            href: '/market/corporate',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
          },
        ],
      },
    ],
  },
  {
    label: 'Products',
    sections: [
      {
        title: 'LED Display Systems',
        items: [
          { 
            title: 'COB LED Display', 
            description: 'Next-generation Chip-on-Board technology', 
            href: '/products/cob',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop'
          },
          { 
            title: 'Indoor LED Displays', 
            description: 'Fine-pitch displays for interior applications', 
            href: '/products/indoor',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
          },
          { 
            title: 'Outdoor LED Displays', 
            description: 'Weather-resistant high-brightness solutions', 
            href: '/products/outdoor',
            image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'
          },
          { 
            title: 'Rental & Stage Displays', 
            description: 'Lightweight touring-ready panels', 
            href: '/products/rental',
            image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop'
          },
        ],
      },
    ],
  },
  {
    label: 'Case Study',
    sections: [
      {
        title: 'Featured Projects',
        items: [
          { 
            title: 'Dubai World Expo', 
            description: 'UAE · Immersive Pavilion', 
            href: '/case-study/dubai-expo',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop'
          },
          { 
            title: 'MSG Sphere Preview', 
            description: 'Las Vegas · Entertainment Venue', 
            href: '/case-study/msg-sphere',
            image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop'
          },
          { 
            title: 'Shanghai Stadium', 
            description: 'China · Sports Venue', 
            href: '/case-study/shanghai-stadium',
            image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=300&fit=crop'
          },
          { 
            title: 'Berlin Concert Hall', 
            description: 'Germany · Live Events', 
            href: '/case-study/berlin-concert',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop'
          },
        ],
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
