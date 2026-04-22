export interface CaseStudyData {
  slug: string;
  title: string;
  tag: string;
  location: string;
  description: string;
  image: string;
  valueStatement: string;
  challengePromise: string;
  solutionPromise: string;
  keyFacts: { label: string; value: string }[];
  technicalSnapshot: { label: string; value: string }[];
  keyHighlights: { icon?: string; title: string; description: string }[];
  typicalApplications: string[];
  gallery: { src: string; caption?: string }[];
}

const caseStudies: CaseStudyData[] = [
  {
    slug: 'dubai-world-expo',
    title: 'Dubai World Expo Pavilion',
    tag: 'Immersive Experience',
    location: 'Dubai, UAE',
    description: 'A 360° immersive LED environment spanning 2,400m² of seamless display surface, creating one of the most ambitious visual installations in World Expo history.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=1080&fit=crop',
    valueStatement: 'Redefining immersive storytelling at global scale.',
    challengePromise: 'The pavilion required a continuous, seamless LED surface wrapping floor-to-ceiling across a curved 360° environment — with zero visible seams, sub-1mm pixel pitch, and real-time content synchronization across 48 independent zones.',
    solutionPromise: 'We deployed our COB P0.9 series with custom-engineered curved modules, proprietary content management, and redundant processing architecture ensuring 99.99% uptime throughout the six-month exhibition.',
    keyFacts: [
      { label: 'Display Area', value: '2,400 m²' },
      { label: 'Pixel Pitch', value: 'P0.9' },
      { label: 'Resolution', value: '24K+ Combined' },
      { label: 'Duration', value: '6 Months' },
    ],
    technicalSnapshot: [
      { label: 'Pixel Pitch', value: 'P0.9 COB' },
      { label: 'Brightness', value: '800 nits' },
      { label: 'Refresh Rate', value: '3840Hz' },
      { label: 'Processing', value: '48 Zones' },
      { label: 'Uptime', value: '99.99%' },
    ],
    keyHighlights: [
      { icon: 'Eye', title: 'Seamless 360° Immersion', description: 'Custom curved modules eliminated visible seams across the entire pavilion surface.' },
      { icon: 'Cpu', title: 'Real-Time Sync Engine', description: 'Proprietary content distribution system synchronized 48 independent display zones.' },
      { icon: 'Shield', title: 'Redundant Architecture', description: 'Dual-path signal routing and hot-swap capability ensured zero downtime.' },
    ],
    typicalApplications: ['World Expos', 'Museums', 'Brand Experience Centers', 'Immersive Theaters'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&h=800&fit=crop', caption: 'Main pavilion entrance' },
      { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop', caption: 'Interior immersive environment' },
    ],
  },
  {
    slug: 'shanghai-stadium',
    title: 'Shanghai Grand Stadium',
    tag: 'Sports Venue',
    location: 'Shanghai, China',
    description: 'A comprehensive LED upgrade for one of Asia\'s premier sports venues, featuring perimeter displays, center-hung scoreboard, and IMAG screens.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1920&h=1080&fit=crop',
    valueStatement: 'Bringing world-class visual experiences to 80,000 fans.',
    challengePromise: 'The venue required a complete LED overhaul capable of handling high-speed sports content, outdoor weather conditions, and integration with existing broadcast infrastructure — all within a 90-day installation window.',
    solutionPromise: 'Our outdoor P4 perimeter system and indoor P2.5 center-hung scoreboard delivered exceptional visibility from every seat, with IP65-rated weatherproofing and broadcast-grade color accuracy.',
    keyFacts: [
      { label: 'Venue Capacity', value: '80,000' },
      { label: 'Display Area', value: '1,200 m²' },
      { label: 'Installation Time', value: '90 Days' },
      { label: 'Weather Rating', value: 'IP65' },
    ],
    technicalSnapshot: [
      { label: 'Perimeter', value: 'P4 Outdoor' },
      { label: 'Scoreboard', value: 'P2.5 Indoor' },
      { label: 'Brightness', value: '6,500 nits' },
      { label: 'Refresh Rate', value: '3840Hz' },
      { label: 'Protection', value: 'IP65' },
    ],
    keyHighlights: [
      { icon: 'Sun', title: 'High Brightness Outdoor', description: '6,500 nits peak brightness for perfect visibility in direct sunlight.' },
      { icon: 'Video', title: 'Broadcast Integration', description: 'Seamless integration with existing broadcast camera and replay systems.' },
      { icon: 'Umbrella', title: 'All-Weather Performance', description: 'IP65-rated for rain, humidity, and extreme temperature operation.' },
    ],
    typicalApplications: ['Sports Stadiums', 'Arenas', 'Outdoor Venues', 'Broadcast Studios'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=800&fit=crop', caption: 'Stadium perimeter display' },
      { src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop', caption: 'Center-hung scoreboard' },
    ],
  },
  {
    slug: 'berlin-concert-hall',
    title: 'Berlin Concert Hall',
    tag: 'Live Entertainment',
    location: 'Berlin, Germany',
    description: 'A state-of-the-art stage LED installation for one of Europe\'s premier concert venues, featuring modular rental panels with rapid setup capability.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=1080&fit=crop',
    valueStatement: 'Transforming live entertainment with modular LED excellence.',
    challengePromise: 'The venue needed a flexible, reusable LED system that could transform for different event configurations — from intimate concerts to large-scale productions — with setup times under 4 hours.',
    solutionPromise: 'Our Stage Pro rental series with quick-lock mounting enabled rapid reconfiguration, while our processing system handled real-time content rendering with zero latency.',
    keyFacts: [
      { label: 'Display Area', value: '320 m²' },
      { label: 'Setup Time', value: '< 4 Hours' },
      { label: 'Configurations', value: '12+ Layouts' },
      { label: 'Events/Year', value: '200+' },
    ],
    technicalSnapshot: [
      { label: 'Pixel Pitch', value: 'P2.9 Rental' },
      { label: 'Weight', value: '7.5 kg/panel' },
      { label: 'Refresh Rate', value: '3840Hz' },
      { label: 'Lock System', value: 'Quick-Lock' },
      { label: 'Curve Support', value: '±15°' },
    ],
    keyHighlights: [
      { icon: 'Maximize', title: 'Modular Flexibility', description: '12+ stage configurations from the same panel inventory.' },
      { icon: 'Sliders', title: 'Rapid Deployment', description: 'Quick-lock system enables full stage setup in under 4 hours.' },
      { icon: 'Palette', title: 'Visual Excellence', description: 'HDR content rendering with cinema-grade color accuracy.' },
    ],
    typicalApplications: ['Concert Venues', 'Theaters', 'Award Shows', 'Corporate Events'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop', caption: 'Main stage configuration' },
      { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&h=800&fit=crop', caption: 'Concert performance' },
    ],
  },
  {
    slug: 'msg-sphere-preview',
    title: 'MSG Sphere LED Preview',
    tag: 'Entertainment Venue',
    location: 'Las Vegas, USA',
    description: 'A groundbreaking curved interior LED surface creating the world\'s largest immersive entertainment experience.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&h=1080&fit=crop',
    valueStatement: 'Pushing the boundaries of immersive visual entertainment.',
    challengePromise: 'Creating a massive curved LED surface that maintains consistent image quality, brightness, and color accuracy across every viewing angle — while handling 16K+ content in real time.',
    solutionPromise: 'Our fine-pitch COB technology with custom concave modules and distributed processing architecture delivered seamless imagery across the entire interior surface.',
    keyFacts: [
      { label: 'Display Type', value: 'Interior Sphere' },
      { label: 'Technology', value: 'COB LED' },
      { label: 'Resolution', value: '16K+' },
      { label: 'Viewing Angles', value: '160°' },
    ],
    technicalSnapshot: [
      { label: 'Pixel Pitch', value: 'P1.2 COB' },
      { label: 'Surface Type', value: 'Concave Curve' },
      { label: 'Brightness', value: '1,200 nits' },
      { label: 'Processing', value: 'Distributed' },
      { label: 'Color Depth', value: '10-bit HDR' },
    ],
    keyHighlights: [
      { icon: 'Eye', title: 'Immersive Curvature', description: 'Custom concave modules for consistent image quality across the sphere.' },
      { icon: 'Cpu', title: 'Distributed Processing', description: 'Multi-node rendering system for real-time 16K content delivery.' },
      { icon: 'Palette', title: '10-bit HDR Color', description: 'Cinema-grade wide color gamut with per-pixel calibration.' },
    ],
    typicalApplications: ['Entertainment Venues', 'Planetariums', 'Theme Parks', 'Immersive Experiences'],
    gallery: [
      { src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1920&h=1080&fit=crop', caption: 'Interior sphere view' },
    ],
  },
];

export function getCaseStudies(): CaseStudyData[] {
  return caseStudies;
}

export function getCaseStudy(slug: string): CaseStudyData | undefined {
  return caseStudies.find(s => s.slug === slug);
}
