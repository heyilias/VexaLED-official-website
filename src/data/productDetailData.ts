import ledPosterImg from '@/assets/products/led-screen/hero.png';
import ledPosterDetail1 from '@/assets/products/led-screen/detail-1.png';
import ledPosterDetail2 from '@/assets/products/led-screen/detail-2.png';
import ledPosterDetail3 from '@/assets/products/led-screen/detail-3.png';
import ledPosterDetail4 from '@/assets/products/led-screen/detail-4.png';

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
  'folding-screen': {
    slug: 'folding-screen',
    category: 'folding-screen',
    title: 'VX Folding Screen',
    tagline: 'Modular folding LED display system for large-format video walls, events, and permanent installations.',
    heroImage: ledPosterImg,
    overviewTitle: 'Modular. Scalable. Ready for Any Stage.',
    overviewDescription: 'The VX Folding Screen is a high-performance modular LED display engineered for rapid deployment at live events, corporate environments, and permanent installations. Lightweight die-cast panels connect seamlessly to create any size video wall. Built-in locking mechanisms and universal rigging points allow single-technician setup in minutes.',
    overviewImage: ledPosterDetail1,
    applications: [
      { label: 'Live Events & Concerts', image: ledPosterDetail1 },
      { label: 'Corporate Presentations', image: ledPosterDetail2 },
      { label: 'Trade Shows & Exhibitions', image: ledPosterDetail3 },
    ],
    valueProps: [
      { title: 'Rapid Modular Assembly', text: 'Tool-free magnetic locking panels connect in seconds. Build any screen size from a single panel to a full stage backdrop with no specialist equipment.' },
      { title: 'Ultra-Lightweight Cabinet', text: 'Die-cast magnesium alloy cabinet weighs just 9.8 kg per panel. Designed for touring — compact flight cases hold 6 panels each for maximum efficiency.' },
      { title: 'High-Brightness HDR Output', text: 'Up to 1500 nits peak brightness with 16-bit grayscale processing delivers vivid, colour-accurate visuals under any ambient lighting condition.' },
    ],
    features: [
      { title: 'Seamless Tiling Architecture', text: 'Sub-0.1mm panel gap tolerance ensures a visually seamless surface across any configuration. Precision-machined frames maintain alignment under load and transport stress.', image: ledPosterDetail4 },
      { title: 'Universal Rigging & Ground Support', text: 'Integrated M12 rigging points rated to 150 kg per panel. Compatible with industry-standard truss systems, ground-support towers, and wall-mount brackets.', image: ledPosterDetail2 },
    ],
    certifications: [
      { label: 'CE', description: 'European Conformity' },
      { label: 'RoHS', description: 'Hazardous Substances Free' },
      { label: 'FCC', description: 'US Compliance' },
      { label: 'IP54', description: 'Dust & Splash Protection' },
    ],
    variants: [
      { name: 'VX-FS P2.6', pixelPitch: '2.6mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '9.8kg' },
      { name: 'VX-FS P2.9', pixelPitch: '2.976mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '9.8kg' },
      { name: 'VX-FS P3.9', pixelPitch: '3.91mm', brightness: '1500 nits', cabinetSize: '500×500mm', weight: '9.6kg' },
      { name: 'VX-FS P4.8', pixelPitch: '4.81mm', brightness: '1500 nits', cabinetSize: '500×500mm', weight: '9.4kg' },
    ],
    parameters: [
      { label: 'Cabinet Size', value: '500mm × 500mm' },
      { label: 'Cabinet Depth', value: '72mm' },
      { label: 'Material', value: 'Die-cast Magnesium Alloy' },
      { label: 'Weight per Panel', value: '9.8 kg' },
      { label: 'Environment', value: 'Indoor / Semi-outdoor' },
      { label: 'Brightness', value: '1000–1500 nits' },
      { label: 'Viewing Angle', value: 'H: 160° / V: 140°' },
      { label: 'Contrast Ratio', value: '5000:1' },
      { label: 'Refresh Rate', value: '3840 Hz' },
      { label: 'Frame Frequency', value: '50/60 Hz' },
      { label: 'Gray Scale', value: '16 bit' },
      { label: 'Max Consumption', value: '350W/m²' },
      { label: 'Avg Consumption', value: '120W/m²' },
      { label: 'Power Voltage', value: 'AC100-240V, 50/60Hz' },
      { label: 'IP Rating', value: 'IP54' },
      { label: 'Working Temp', value: '-20°C to 50°C' },
      { label: 'Lifespan', value: '100,000 hrs' },
    ],
    relatedProducts: [
      { name: 'VX-LED Poster', slug: 'vx-led-poster', category: 'led-screen', image: ledPosterImg },
    ],
    relatedDownloads: [
      { title: 'VX Folding Screen Datasheet', type: 'PDF', size: '3.8 MB' },
      { title: 'Rigging & Installation Guide', type: 'PDF', size: '5.1 MB' },
      { title: 'Flight Case Dimensions', type: 'PDF', size: '1.4 MB' },
    ],
    relatedCaseStudies: [],
  },
  'led-screen': {
    slug: 'led-screen',
    category: 'led-screen',
    title: 'VX-LED Poster',
    tagline: 'Die-cast folding poster screen with smart cluster management for retail, advertising, and event applications.',
    heroImage: ledPosterImg,
    overviewTitle: 'Smart. Future. Portable LED Display.',
    overviewDescription: 'The VX-LED Poster is an innovative die-cast aluminum folding LED display designed for retail stores, shopping malls, exhibitions, and events. Featuring a foldable design with magnetic folding borders, quick-install locks, and activity wheels for easy mobility. Supports remote smart monitoring, scheduled on/off control, and wireless interaction via mobile phones and smart devices.',
    overviewImage: ledPosterDetail1,
    applications: [
      { label: 'Retail Stores', image: ledPosterDetail1 },
      { label: 'Shopping Malls', image: ledPosterDetail2 },
      { label: 'Exhibitions & Events', image: ledPosterDetail3 },
    ],
    valueProps: [
      { title: 'Foldable & Portable Design', text: 'Die-cast aluminum cabinet folds to just 62mm thick for easy transportation and storage. Activity wheels enable effortless mobility across any venue.' },
      { title: 'Smart Cluster Management', text: 'Remote monitoring, scheduled on/off control, and wireless interaction via mobile phones and smart devices for ultimate control anytime, anywhere.' },
      { title: 'Multiple Pixel Pitch Options', text: 'Available in P1.25, P1.5625, P1.95, P2.5, P2.604, P2.976, and P3.91 to suit various viewing distances and budgets.' },
    ],
    features: [
      { title: 'HD Performance & Split Display', text: 'High-definition display with intelligent split-screen capability. Supports synchronous and asynchronous playback, WiFi/Ethernet connectivity, and multi-screen seamless splicing for large video walls.', image: ledPosterDetail4 },
      { title: 'Multiple Installation Methods', text: 'Versatile mounting options include multi-screen cascade connection for video walls and floor-standing configuration for standalone displays. Base installation with 360° universal wheels.', image: ledPosterDetail2 },
    ],
    certifications: [
      { label: 'CE', description: 'European Conformity' },
      { label: 'RoHS', description: 'Hazardous Substances Free' },
      { label: 'FCC', description: 'US Compliance' },
      { label: 'CCC', description: 'China Compulsory Certification' },
    ],
    variants: [
      { name: 'VX-LED-Poster P1.25', pixelPitch: '1.25mm', brightness: '600 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P1.56', pixelPitch: '1.5625mm', brightness: '600 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P1.95', pixelPitch: '1.95mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P2.5', pixelPitch: '2.5mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P2.6', pixelPitch: '2.604mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P2.9', pixelPitch: '2.976mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P3.91', pixelPitch: '3.91mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
    ],
    parameters: [
      { label: 'Display Size', value: '640mm × 1920mm' },
      { label: 'Folded Thickness', value: '62mm' },
      { label: 'Base Dimensions', value: '440mm × 1100.8mm' },
      { label: 'Cabinet Dimensions', value: '664mm × 2073.5mm' },
      { label: 'Material', value: 'Die-cast Aluminum + Iron' },
      { label: 'Weight', value: '35.5kg (base style, without suite and power supply)' },
      { label: 'Modules per Cabinet', value: '24 modules' },
      { label: 'Installation', value: 'Base installation / Floor stand' },
      { label: 'Color', value: 'Grey' },
      { label: 'Environment', value: 'Indoor' },
      { label: 'Brightness', value: '600-800 nits' },
      { label: 'Viewing Angle', value: 'H: 160° / V: 160°' },
      { label: 'Contrast Ratio', value: '10000:1' },
      { label: 'Refresh Rate', value: '3840Hz' },
      { label: 'Frame Frequency', value: '50/60Hz' },
      { label: 'Gray Scale', value: '14/16 bit (optional)' },
      { label: 'Max Consumption', value: '400W/m²' },
      { label: 'Avg Consumption', value: '100-200W/m²' },
      { label: 'Power Voltage', value: 'AC90-264V, 47-63Hz' },
      { label: 'Working Temp/Humidity', value: '-20~60°C / 10%~85% RH' },
      { label: 'Storage Temp/Humidity', value: '-20~60°C / 10%~85% RH' },
      { label: 'Lifespan', value: '100,000 hrs' },
    ],
    relatedProducts: [],
    relatedDownloads: [
      { title: 'VX-LED Poster Datasheet', type: 'PDF', size: '4.5 MB' },
      { title: 'Installation Manual', type: 'PDF', size: '3.2 MB' },
      { title: 'Smart Control App Guide', type: 'PDF', size: '2.1 MB' },
    ],
    relatedCaseStudies: [],
  },
  'vx-led-poster': {
    slug: 'vx-led-poster',
    category: 'led-screen',
    title: 'VX-LED Poster',
    tagline: 'Die-cast folding poster screen with smart cluster management for retail, advertising, and event applications.',
    heroImage: ledPosterImg,
    overviewTitle: 'Smart. Future. Portable LED Display.',
    overviewDescription: 'The VX-LED Poster is an innovative die-cast aluminum folding LED display designed for retail stores, shopping malls, exhibitions, and events. Featuring a foldable design with magnetic folding borders, quick-install locks, and activity wheels for easy mobility. Supports remote smart monitoring, scheduled on/off control, and wireless interaction via mobile phones and smart devices.',
    overviewImage: ledPosterDetail1,
    applications: [
      { label: 'Retail Stores', image: ledPosterDetail1 },
      { label: 'Shopping Malls', image: ledPosterDetail2 },
      { label: 'Exhibitions & Events', image: ledPosterDetail3 },
    ],
    valueProps: [
      { title: 'Foldable & Portable Design', text: 'Die-cast aluminum cabinet folds to just 62mm thick for easy transportation and storage. Activity wheels enable effortless mobility across any venue.' },
      { title: 'Smart Cluster Management', text: 'Remote monitoring, scheduled on/off control, and wireless interaction via mobile phones and smart devices for ultimate control anytime, anywhere.' },
      { title: 'Multiple Pixel Pitch Options', text: 'Available in P1.25, P1.5625, P1.95, P2.5, P2.604, P2.976, and P3.91 to suit various viewing distances and budgets.' },
    ],
    features: [
      { title: 'HD Performance & Split Display', text: 'High-definition display with intelligent split-screen capability. Supports synchronous and asynchronous playback, WiFi/Ethernet connectivity, and multi-screen seamless splicing for large video walls.', image: ledPosterDetail4 },
      { title: 'Multiple Installation Methods', text: 'Versatile mounting options include multi-screen cascade connection for video walls and floor-standing configuration for standalone displays. Base installation with 360° universal wheels.', image: ledPosterDetail2 },
    ],
    certifications: [
      { label: 'CE', description: 'European Conformity' },
      { label: 'RoHS', description: 'Hazardous Substances Free' },
      { label: 'FCC', description: 'US Compliance' },
      { label: 'CCC', description: 'China Compulsory Certification' },
    ],
    variants: [
      { name: 'VX-LED-Poster P1.25', pixelPitch: '1.25mm', brightness: '600 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P1.56', pixelPitch: '1.5625mm', brightness: '600 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P1.95', pixelPitch: '1.95mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P2.5', pixelPitch: '2.5mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P2.6', pixelPitch: '2.604mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P2.9', pixelPitch: '2.976mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
      { name: 'VX-LED-Poster P3.91', pixelPitch: '3.91mm', brightness: '800 nits', cabinetSize: '640×1920mm', weight: '35.5kg' },
    ],
    parameters: [
      { label: 'Display Size', value: '640mm × 1920mm' },
      { label: 'Folded Thickness', value: '62mm' },
      { label: 'Base Dimensions', value: '440mm × 1100.8mm' },
      { label: 'Cabinet Dimensions', value: '664mm × 2073.5mm' },
      { label: 'Material', value: 'Die-cast Aluminum + Iron' },
      { label: 'Weight', value: '35.5kg (base style, without suite and power supply)' },
      { label: 'Modules per Cabinet', value: '24 modules' },
      { label: 'Installation', value: 'Base installation / Floor stand' },
      { label: 'Color', value: 'Grey' },
      { label: 'Environment', value: 'Indoor' },
      { label: 'Brightness', value: '600-800 nits' },
      { label: 'Viewing Angle', value: 'H: 160° / V: 160°' },
      { label: 'Contrast Ratio', value: '10000:1' },
      { label: 'Refresh Rate', value: '3840Hz' },
      { label: 'Frame Frequency', value: '50/60Hz' },
      { label: 'Gray Scale', value: '14/16 bit (optional)' },
      { label: 'Max Consumption', value: '400W/m²' },
      { label: 'Avg Consumption', value: '100-200W/m²' },
      { label: 'Power Voltage', value: 'AC90-264V, 47-63Hz' },
      { label: 'Working Temp/Humidity', value: '-20~60°C / 10%~85% RH' },
      { label: 'Storage Temp/Humidity', value: '-20~60°C / 10%~85% RH' },
      { label: 'Lifespan', value: '100,000 hrs' },
    ],
    relatedProducts: [],
    relatedDownloads: [
      { title: 'VX-LED Poster Datasheet', type: 'PDF', size: '4.5 MB' },
      { title: 'Installation Manual', type: 'PDF', size: '3.2 MB' },
      { title: 'Smart Control App Guide', type: 'PDF', size: '2.1 MB' },
    ],
    relatedCaseStudies: [],
  },
};

export function getProductDetail(slug: string, _category?: string): ProductDetail | null {
  return products[slug] || null;
}
