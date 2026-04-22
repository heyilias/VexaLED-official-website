import advertisingImg from '@/assets/markets/advertising.jpg';
import controlRoomsImg from '@/assets/markets/control-rooms-detail.jpg';
import corporateImg from '@/assets/markets/corporate-detail.jpg';
import eventsImg from '@/assets/markets/events-detail.jpg';
import doohImg from '@/assets/markets/dooh-detail.jpg';

export interface MarketDetail {
  slug: string;
  title: string;
  heroImage: string;
  capabilityTag: string;
  positioningStatement: string;
  description: string;
  snapshot: Record<string, string>;
  differentiators: string[];
  recommendedSolutions: { name: string; slug: string; category: string; image: string; fitReason: string }[];
  applicationFlow: { step: string; title: string; description: string }[];
  typicalProjects: { title: string; image: string }[];
  ctaLabel: string;
  ctaDescription: string;
}

const markets: Record<string, MarketDetail> = {
  sports: {
    slug: 'sports',
    title: 'Sports & Arenas',
    heroImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&h=1080&fit=crop',
    capabilityTag: 'Stadium-Grade LED',
    positioningStatement: 'Immersive LED displays engineered for high-capacity venues, delivering real-time visuals that captivate 50,000+ spectators.',
    description: 'Sports venues demand extreme brightness, wide viewing angles, and pixel-perfect reliability under demanding conditions. Our stadium-grade solutions deliver.',
    snapshot: {
      brightness: '8,000+ nits',
      pixelPitch: 'P2.5 – P10',
      viewingAngle: '160° H / 140° V',
      protection: 'IP65 Front',
      lifespan: '100,000 hrs',
    },
    differentiators: [
      'Ultra-high brightness for direct sunlight environments',
      'Wide viewing angles for seating up to 300m away',
      'Rapid content switching for live replays and stats',
      'Weatherproof construction for open-air stadiums',
    ],
    recommendedSolutions: [
      { name: 'VX Outdoor Pro', slug: 'vx-outdoor-pro', category: 'outdoor', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=450&fit=crop', fitReason: 'High brightness outdoor panels for perimeter displays' },
      { name: 'VX Stadium', slug: 'vx-stadium', category: 'outdoor', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=450&fit=crop', fitReason: 'Scoreboard and jumbotron solutions' },
      { name: 'VX Rental Tour', slug: 'vx-rental-tour', category: 'rental', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=450&fit=crop', fitReason: 'Temporary event LED for concerts at venues' },
    ],
    applicationFlow: [
      { step: '01', title: 'Site Survey', description: 'On-site assessment of venue dimensions, ambient light, and structural capacity.' },
      { step: '02', title: 'Custom Design', description: 'Tailored display configuration for optimal viewing from every seat.' },
      { step: '03', title: 'Installation', description: 'Professional deployment with structural engineering and power distribution.' },
      { step: '04', title: 'Commissioning', description: 'Calibration, content integration, and operator training.' },
    ],
    typicalProjects: [
      { title: 'FIFA World Cup Stadium', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop' },
      { title: 'Olympic Venue', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=400&fit=crop' },
      { title: 'NBA Arena', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&h=400&fit=crop' },
      { title: 'Cricket Ground', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop' },
    ],
    ctaLabel: 'Plan Your Venue Display',
    ctaDescription: 'Talk to our sports venue specialists about LED solutions designed for maximum impact and reliability.',
  },
  advertising: {
    slug: 'advertising',
    title: 'Advertising & DOOH',
    heroImage: doohImg,
    capabilityTag: 'Digital Out-of-Home',
    positioningStatement: 'High-impact digital displays for advertising networks, delivering 24/7 visual presence in high-traffic locations.',
    description: 'DOOH demands always-on reliability, remote management, and exceptional image quality in variable lighting conditions.',
    snapshot: {
      brightness: '7,000+ nits',
      pixelPitch: 'P3.9 – P16',
      viewingAngle: '160° H / 140° V',
      protection: 'IP65',
      lifespan: '100,000 hrs',
    },
    differentiators: [
      'Auto-brightness adjustment for day/night optimization',
      'Remote content management via cloud platform',
      'Energy-efficient design reduces operating costs by 40%',
      'Vandal-resistant construction for public installations',
    ],
    recommendedSolutions: [
      { name: 'VX Billboard Pro', slug: 'vx-billboard-pro', category: 'outdoor', image: advertisingImg, fitReason: 'Large format outdoor billboard displays' },
      { name: 'VX Street', slug: 'vx-street', category: 'outdoor', image: doohImg, fitReason: 'Street-level advertising pillars' },
    ],
    applicationFlow: [
      { step: '01', title: 'Location Analysis', description: 'Evaluate traffic patterns, viewing distances, and ambient light conditions.' },
      { step: '02', title: 'Display Design', description: 'Configure pixel pitch, brightness, and cabinet size for maximum impact.' },
      { step: '03', title: 'Deployment', description: 'Structural mounting, power connection, and network integration.' },
      { step: '04', title: 'Go Live', description: 'Content scheduling, remote monitoring setup, and performance analytics.' },
    ],
    typicalProjects: [
      { title: 'Times Square Billboard', image: doohImg },
      { title: 'Highway Digital Sign', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop' },
      { title: 'Shopping Mall Facade', image: advertisingImg },
      { title: 'Airport Terminal', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop' },
    ],
    ctaLabel: 'Start Your DOOH Project',
    ctaDescription: 'Connect with our advertising display experts to maximize your outdoor visual impact.',
  },
  events: {
    slug: 'events',
    title: 'Events & Staging',
    heroImage: eventsImg,
    capabilityTag: 'Touring & Rental LED',
    positioningStatement: 'Lightweight, rapid-deploy LED systems designed for touring productions, festivals, and corporate events.',
    description: 'Event displays must be fast to install, lightweight for touring, and deliver stunning visuals under stage lighting conditions.',
    snapshot: {
      brightness: '4,500+ nits',
      pixelPitch: 'P2.6 – P4.8',
      viewingAngle: '160° H / 140° V',
      protection: 'IP54',
      lifespan: '50,000 hrs',
    },
    differentiators: [
      'Sub-30-minute setup with tool-free assembly',
      'Lightweight carbon fiber frames under 6kg/panel',
      'Curved and creative configurations supported',
      'Road-case packaging for safe touring logistics',
    ],
    recommendedSolutions: [
      { name: 'VX Rental Tour', slug: 'vx-rental-tour', category: 'rental', image: eventsImg, fitReason: 'Touring-ready rental panels for stage backdrops' },
      { name: 'VX Flex', slug: 'vx-flex', category: 'rental', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=450&fit=crop', fitReason: 'Flexible LED for creative stage designs' },
    ],
    applicationFlow: [
      { step: '01', title: 'Pre-Production', description: 'Collaborate on creative vision, rigging plans, and content resolution.' },
      { step: '02', title: 'Load-In', description: 'Rapid deployment with experienced rigging crew and tool-free panels.' },
      { step: '03', title: 'Show Time', description: 'Live content playback with real-time processing and failover.' },
      { step: '04', title: 'Load-Out', description: 'Quick teardown, repack into road cases, ready for the next city.' },
    ],
    typicalProjects: [
      { title: 'World Tour Concert', image: eventsImg },
      { title: 'Music Festival Main Stage', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop' },
      { title: 'Corporate Gala', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop' },
      { title: 'Award Ceremony', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop' },
    ],
    ctaLabel: 'Plan Your Event Display',
    ctaDescription: 'Get expert guidance on LED solutions for your next live production or event.',
  },
  'virtual-production': {
    slug: 'virtual-production',
    title: 'Virtual Production',
    heroImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&h=1080&fit=crop',
    capabilityTag: 'XR & VP LED Volumes',
    positioningStatement: 'High-performance LED volumes for in-camera VFX, broadcast, and immersive content creation.',
    description: 'Virtual production demands extreme color accuracy, ultra-low latency, and seamless panel alignment for in-camera visual effects.',
    snapshot: {
      brightness: '1,500+ nits',
      pixelPitch: 'P1.2 – P2.6',
      viewingAngle: '170° H / 170° V',
      protection: 'Indoor',
      lifespan: '100,000 hrs',
    },
    differentiators: [
      'Sub-frame latency for real-time camera tracking',
      'HDR-capable with 16-bit color processing',
      'Moiré-free design for camera capture',
      'Genlock and frame-sync support for broadcast workflows',
    ],
    recommendedSolutions: [
      { name: 'VX VP Studio', slug: 'vx-vp-studio', category: 'indoor', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=450&fit=crop', fitReason: 'Purpose-built LED volume for virtual production' },
    ],
    applicationFlow: [
      { step: '01', title: 'Studio Design', description: 'Configure LED volume geometry, resolution, and tracking zone.' },
      { step: '02', title: 'Integration', description: 'Connect with Unreal Engine, Disguise, or Brompton processing.' },
      { step: '03', title: 'Calibration', description: 'Color calibration, camera alignment, and frustum setup.' },
      { step: '04', title: 'Production', description: 'Real-time content rendering with in-camera VFX.' },
    ],
    typicalProjects: [
      { title: 'Film Studio Volume', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop' },
      { title: 'Broadcast Studio', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop' },
      { title: 'Commercial Production', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop' },
      { title: 'Automotive Showcase', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop' },
    ],
    ctaLabel: 'Design Your VP Stage',
    ctaDescription: 'Work with our XR specialists to build the perfect LED volume for your production.',
  },
  corporate: {
    slug: 'corporate',
    title: 'Corporate & Control Rooms',
    heroImage: corporateImg,
    capabilityTag: 'Mission-Critical Displays',
    positioningStatement: 'Ultra-reliable LED display walls for corporate lobbies, boardrooms, and 24/7 command centers.',
    description: 'Corporate and control room environments demand seamless image quality, zero-maintenance operation, and 24/7 reliability.',
    snapshot: {
      brightness: '800+ nits',
      pixelPitch: 'P0.9 – P1.8',
      viewingAngle: '170° H / 170° V',
      protection: 'Indoor',
      lifespan: '100,000 hrs',
    },
    differentiators: [
      'True seamless design with zero visible bezels',
      'Front-maintenance for restricted-access installations',
      'Auto-calibration maintains color uniformity over time',
      '24/7 rated for always-on mission-critical operations',
    ],
    recommendedSolutions: [
      { name: 'VX Fine Pitch', slug: 'vx-fine-pitch', category: 'indoor', image: controlRoomsImg, fitReason: 'Sub-1mm pixel pitch for close-viewing applications' },
      { name: 'VX COB', slug: 'vx-cob', category: 'cob', image: corporateImg, fitReason: 'Next-gen COB technology for premium boardrooms' },
    ],
    applicationFlow: [
      { step: '01', title: 'Needs Assessment', description: 'Evaluate viewing distance, content sources, and operational requirements.' },
      { step: '02', title: 'System Design', description: 'Configure resolution, aspect ratio, and processing architecture.' },
      { step: '03', title: 'Installation', description: 'Precision mounting, power distribution, and signal routing.' },
      { step: '04', title: 'Handover', description: 'Calibration, training, and ongoing maintenance agreement.' },
    ],
    typicalProjects: [
      { title: 'Network Operations Center', image: controlRoomsImg },
      { title: 'Corporate Lobby', image: corporateImg },
      { title: 'Executive Boardroom', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop' },
      { title: 'Security Command Center', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop' },
    ],
    ctaLabel: 'Specify Your Display Wall',
    ctaDescription: 'Consult with our enterprise display specialists on the perfect solution for your space.',
  },
};

export function getMarketDetail(slug: string, _t?: any): MarketDetail | null {
  return markets[slug] || null;
}

export function getAllMarketSlugs(): string[] {
  return Object.keys(markets);
}
