export interface ProductDetail {
  slug: string;
  category: string;
  title: string;
  tagline: string;
  heroImage: string;
  overviewTitle: string;
  overviewDescription: string;
  overviewImage: string;
  applications: { label: string; image: string }[];
  valueProps: { title: string; text: string }[];
  features: { title: string; text: string; image: string }[];
  certifications: { label: string; description: string }[];
  variants: { name: string; pixelPitch: string; brightness: string; cabinetSize: string; weight: string }[];
  parameters: { label: string; value: string }[];
  relatedProducts: { name: string; slug: string; category: string; image: string }[];
  relatedDownloads: { title: string; type: string; size: string }[];
  relatedCaseStudies: { title: string; slug: string; location: string; image: string }[];
}

const products: Record<string, ProductDetail> = {
  'vx-cob-elite': {
    slug: 'vx-cob-elite',
    category: 'cob',
    title: 'VX COB Elite',
    tagline: 'Next-generation Chip-on-Board technology for unmatched visual performance and durability.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop',
    overviewTitle: 'The Future of LED Display Technology',
    overviewDescription: 'VX COB Elite uses advanced chip-on-board packaging to deliver superior color uniformity, wider viewing angles, and dramatically improved reliability compared to traditional SMD displays.',
    overviewImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    applications: [
      { label: 'Control Rooms', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop' },
      { label: 'Broadcast Studios', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop' },
      { label: 'Corporate Lobbies', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop' },
    ],
    valueProps: [
      { title: 'Superior Protection', text: 'Epoxy-encapsulated LEDs resist moisture, dust, and physical impact—ideal for high-traffic environments.' },
      { title: 'Zero Pixel Failure', text: 'COB packaging eliminates exposed solder joints, reducing dead pixel rates by 90% vs SMD.' },
      { title: 'Wider Viewing Angle', text: '170° viewing angles with consistent color and brightness from any position.' },
    ],
    features: [
      { title: 'Flip-Chip COB Architecture', text: 'Direct die bonding eliminates wire bonds, improving thermal dissipation and long-term reliability. The result is a display that maintains peak performance for 100,000+ hours.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop' },
      { title: 'Advanced Color Processing', text: '16-bit per channel processing delivers over 280 trillion colors. HDR10 and HLG support ensures content looks exactly as the creator intended.', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop' },
    ],
    certifications: [
      { label: 'CE', description: 'European Conformity' },
      { label: 'FCC', description: 'US Compliance' },
      { label: 'UL', description: 'Safety Certified' },
      { label: 'RoHS', description: 'Hazardous Substances' },
    ],
    variants: [
      { name: 'VX-COB-0.9', pixelPitch: '0.9mm', brightness: '800 nits', cabinetSize: '600×337.5mm', weight: '5.2kg' },
      { name: 'VX-COB-1.2', pixelPitch: '1.2mm', brightness: '800 nits', cabinetSize: '600×337.5mm', weight: '5.2kg' },
      { name: 'VX-COB-1.5', pixelPitch: '1.5mm', brightness: '800 nits', cabinetSize: '600×337.5mm', weight: '5.2kg' },
    ],
    parameters: [
      { label: 'LED Package', value: 'COB (Chip-on-Board)' },
      { label: 'Pixel Pitch', value: '0.9 / 1.2 / 1.5mm' },
      { label: 'Brightness', value: '800 nits' },
      { label: 'Refresh Rate', value: '3840Hz' },
      { label: 'Gray Scale', value: '16bit' },
      { label: 'Viewing Angle', value: '170°/170°' },
      { label: 'Cabinet Size', value: '600 × 337.5mm' },
      { label: 'Protection', value: 'IP30 (front)' },
    ],
    relatedProducts: [],
    relatedDownloads: [
      { title: 'VX COB Elite Datasheet', type: 'PDF', size: '2.4 MB' },
      { title: 'Installation Guide', type: 'PDF', size: '5.1 MB' },
    ],
    relatedCaseStudies: [],
  },
};

export function getProductDetail(slug: string, _category?: string, _t?: any): ProductDetail | null {
  return products[slug] || null;
}
