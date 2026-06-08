import ledPosterImg from '@/assets/products/led-screen/hero.png';
import ledPosterDetail1 from '@/assets/products/led-screen/detail-1.png';
import ledPosterDetail2 from '@/assets/products/led-screen/detail-2.png';
import ledPosterDetail3 from '@/assets/products/led-screen/detail-3.png';
import ledPosterDetail4 from '@/assets/products/led-screen/detail-4.png';

export interface ProductDetailVariant {
  name: string;
  pixelPitch: string;
  brightness: string;
  cabinetSize: string;
  weight: string;
}

// A configuration tab on a rich product page (e.g. City Light: Standard / Flexible / Right Angle).
// Each tab carries its own value props, features, variants, and spec table.
export interface ProductTab {
  name: string;
  tagline: string;
  valueProps: { title: string; text: string }[];
  features: { title: string; text: string; image: string }[];
  variants: ProductDetailVariant[];
  parameters: { label: string; value: string }[];
}

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
  variants: ProductDetailVariant[];
  parameters: { label: string; value: string }[];
  relatedProducts: { name: string; slug: string; category: string; image: string }[];
  relatedDownloads: { title: string; type: string; size: string }[];
  relatedCaseStudies: { title: string; slug: string; location: string; image: string }[];
  // When present, the rich page renders a tab switcher; each tab overrides
  // valueProps / features / variants / parameters for its configuration.
  tabs?: ProductTab[];
}

const products: Record<string, ProductDetail> = {
  'vx-led-poster': {
    slug: 'vx-led-poster',
    category: 'led-screens',
    title: 'LED Poster Display',
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

  'city-light-series': {
    slug: 'city-light-series',
    category: 'led-screens',
    title: 'City Light Cabinet Series',
    tagline: 'Modular 500×500mm aluminum alloy cabinet — Standard, Flexible, and 45° Right Angle configurations share one hardware platform for flat, curved, full-circle, and pillar-wrap installations.',
    heroImage: ledPosterImg,
    overviewTitle: 'One Platform. Three Configurations.',
    overviewDescription: 'The City Light Cabinet Series delivers flat, curved, flexible, and 45° right-angle screens from a single 500×500mm hardware platform. Standard, Flexible, and Right Angle cabinets share stainless steel buckle latches, ball-bearing positioning, a hot-swap rear cover, anti-collision bumps, and corner protectors — so one spare parts inventory covers every configuration. Select a configuration below to view its specifications.',
    overviewImage: ledPosterDetail1,
    applications: [
      { label: 'Conference Rooms', image: ledPosterDetail1 },
      { label: 'Retail & Commercial', image: ledPosterDetail2 },
      { label: 'Events & Staging', image: ledPosterDetail3 },
    ],
    valueProps: [
      { title: '4-in-1 Direct Splicing', text: 'One cabinet type supports flat screen, curved screen, flexible screen, and 45° right-angle screen configurations — minimising inventory and maximising installation flexibility.' },
      { title: 'Hot-Swap Rear Cover', text: 'Loosen four buckle latches and swap a spare rear cover — full troubleshooting cycle completed in under 30 seconds without tools or service calls.' },
      { title: 'Ball-Bearing Positioning', text: 'On uneven surfaces the display auto-retracts via integrated ball bearings, preventing stacking and jamming during assembly and ensuring a consistent, gap-free finish.' },
    ],
    features: [
      { title: 'Stainless Steel Buckle Latches', text: 'Precision stainless steel buckle latches provide stronger tension and tighter seams than standard mechanical fasteners — eliminating visible gaps and maintaining structural rigidity across large installations.', image: ledPosterDetail4 },
      { title: 'Anti-Collision & Transport Protection', text: 'Anti-collision bumps on the cabinet base keep module LEDs suspended off the ground during on-site placement. Corner protectors provide secondary LED protection during air freight shipping, reducing field rejection rates.', image: ledPosterDetail2 },
    ],
    certifications: [
      { label: 'CE', description: 'European Conformity' },
      { label: 'RoHS', description: 'Hazardous Substances Free' },
      { label: 'FCC', description: 'US Compliance' },
      { label: 'CCC', description: 'China Compulsory Certification' },
    ],
    variants: [
      { name: 'City Light P1.6', pixelPitch: '1.6mm', brightness: '800 nits', cabinetSize: '500×500mm', weight: '4.1kg' },
      { name: 'City Light P1.9', pixelPitch: '1.9mm', brightness: '800 nits', cabinetSize: '500×500mm', weight: '4.1kg' },
      { name: 'City Light P2.6', pixelPitch: '2.6mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '4.1kg' },
      { name: 'City Light P2.9', pixelPitch: '2.9mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '4.1kg' },
      { name: 'City Light P3.9', pixelPitch: '3.9mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '4.35kg' },
      { name: 'City Light P4.8', pixelPitch: '4.8mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '4.35kg' },
    ],
    parameters: [
      { label: 'Cabinet Size', value: '500 × 500 × 71 mm' },
      { label: 'Module Size', value: '250 × 250 mm' },
      { label: 'Pixel Pitch Options', value: 'P1.6 / P1.9 / P2.6 / P2.9 / P3.9 / P4.8' },
      { label: 'Weight (curved)', value: '4.35 kg' },
      { label: 'Weight (flat)', value: '4.1 kg' },
      { label: 'Material', value: 'Aluminum Alloy' },
      { label: 'Power Supply', value: 'Narrow power supply, width ≤ 60 mm' },
      { label: 'Receiver Card', value: 'Nova A-Series: A4–A10' },
      { label: 'Module House', value: 'Yuexingwang 20A / 23D' },
      { label: 'Environment', value: 'Indoor' },
      { label: 'Screen Configs', value: 'Flat / Curved / Flexible / 45° Right-Angle' },
    ],
    tabs: [
      {
        name: 'Standard Cabinet',
        tagline: '4-in-1 flat, curved, flexible, and 45° right-angle configurations from one cabinet.',
        valueProps: [
          { title: '4-in-1 Direct Splicing', text: 'One cabinet type supports flat screen, curved screen, flexible screen, and 45° right-angle screen configurations — minimising inventory and maximising installation flexibility.' },
          { title: 'Hot-Swap Rear Cover', text: 'Loosen four buckle latches and swap a spare rear cover — full troubleshooting cycle completed in under 30 seconds without tools or service calls.' },
          { title: 'Ball-Bearing Positioning', text: 'On uneven surfaces the display auto-retracts via integrated ball bearings, preventing stacking and jamming during assembly and ensuring a consistent, gap-free finish.' },
        ],
        features: [
          { title: 'Stainless Steel Buckle Latches', text: 'Precision stainless steel buckle latches provide stronger tension and tighter seams than standard mechanical fasteners — eliminating visible gaps and maintaining structural rigidity across large installations.', image: ledPosterDetail4 },
          { title: 'Anti-Collision & Transport Protection', text: 'Anti-collision bumps on the cabinet base keep module LEDs suspended off the ground during on-site placement. Corner protectors provide secondary LED protection during air freight shipping.', image: ledPosterDetail2 },
        ],
        variants: [
          { name: 'City Light P1.6', pixelPitch: '1.6mm', brightness: '800 nits', cabinetSize: '500×500mm', weight: '4.1kg' },
          { name: 'City Light P1.9', pixelPitch: '1.9mm', brightness: '800 nits', cabinetSize: '500×500mm', weight: '4.1kg' },
          { name: 'City Light P2.6', pixelPitch: '2.6mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '4.1kg' },
          { name: 'City Light P2.9', pixelPitch: '2.9mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '4.1kg' },
          { name: 'City Light P3.9', pixelPitch: '3.9mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '4.35kg' },
          { name: 'City Light P4.8', pixelPitch: '4.8mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '4.35kg' },
        ],
        parameters: [
          { label: 'Cabinet Size', value: '500 × 500 × 71 mm' },
          { label: 'Module Size', value: '250 × 250 mm' },
          { label: 'Pixel Pitch Options', value: 'P1.6 / P1.9 / P2.6 / P2.9 / P3.9 / P4.8' },
          { label: 'Weight (curved)', value: '4.35 kg' },
          { label: 'Weight (flat)', value: '4.1 kg' },
          { label: 'Material', value: 'Aluminum Alloy' },
          { label: 'Screen Configs', value: 'Flat / Curved / Flexible / 45° Right-Angle' },
          { label: 'Power Supply', value: 'Narrow, width ≤ 60 mm' },
          { label: 'Receiver Card', value: 'Nova A-Series: A4–A10' },
          { label: 'Environment', value: 'Indoor' },
        ],
      },
      {
        name: 'Flexible Cabinet',
        tagline: 'Inner/outer arc 0°–45°, side arc 0°–22.5° — 8 cabinets form a full circle at 1.21 m diameter.',
        valueProps: [
          { title: 'Full-Circle Capability', text: 'Single cabinet adjusts from 0° to 45° inner/outer arc — 8 cabinets form a complete circle with a minimum diameter of 1.21 metres, enabling column wraps, circular stages, and immersive environments.' },
          { title: 'S-Curve & Compound Configurations', text: 'Independent side arc lock adjustable from 0° to 22.5° enables inner arc, outer arc, and S-shaped configurations from a single cabinet type — no special corner units required.' },
          { title: '3-Lock Hanging Stability', text: 'Three locks on top and bottom ensure level consistency and more stable load bearing during hanging installations, maintaining alignment across large curved arrays.' },
        ],
        features: [
          { title: 'Arc Locking System', text: 'Precision arc locks on both the inner/outer and side axes allow continuous angular adjustment without tools. Each axis locks independently, enabling compound curves and mixed-angle arrays without custom fabrication.', image: ledPosterDetail4 },
          { title: 'Shared Hardware Platform', text: 'Buckle latches, ball-bearing positioning, hot-swap rear cover, anti-collision bumps, and corner protectors are shared with the Standard Cabinet — one spare parts inventory covers all three variants.', image: ledPosterDetail2 },
        ],
        variants: [
          { name: 'Flexible P1.6', pixelPitch: '1.6mm', brightness: '800 nits', cabinetSize: '500×500mm', weight: '4.68kg' },
          { name: 'Flexible P1.9', pixelPitch: '1.9mm', brightness: '800 nits', cabinetSize: '500×500mm', weight: '4.68kg' },
          { name: 'Flexible P2.6', pixelPitch: '2.6mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '4.68kg' },
          { name: 'Flexible P2.9', pixelPitch: '2.9mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '4.68kg' },
          { name: 'Flexible P3.9', pixelPitch: '3.9mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '4.68kg' },
          { name: 'Flexible P4.8', pixelPitch: '4.8mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '4.68kg' },
        ],
        parameters: [
          { label: 'Cabinet Size', value: '500 × 500 × 71 mm' },
          { label: 'Module Size', value: '250 × 250 mm' },
          { label: 'Pixel Pitch Options', value: 'P1.6 / P1.9 / P2.6 / P2.9 / P3.9 / P4.8' },
          { label: 'Weight', value: '4.68 kg' },
          { label: 'Material', value: 'Aluminum Alloy' },
          { label: 'Inner/Outer Arc Range', value: '0° – 45° per cabinet' },
          { label: 'Side Arc Range', value: '0° – 22.5° per cabinet' },
          { label: 'Min Circle Diameter (8 cabinets)', value: '1.21 m' },
          { label: 'Power Supply', value: 'Narrow, width ≤ 60 mm' },
          { label: 'Receiver Card', value: 'Nova A-Series: A4–A10' },
          { label: 'Environment', value: 'Indoor' },
        ],
      },
      {
        name: 'Right Angle (45°) Cabinet',
        tagline: '45° beveled edges — mix-splices with flat, flexible, and arc cabinets for pillar wraps and polygon screens.',
        valueProps: [
          { title: '45° Mix-Splice Compatibility', text: '45° right-angle cabinets directly mix-splice with flat, curved, flexible, and arc cabinets — no transition pieces, no visible seams between cabinet types.' },
          { title: 'Square Pillar Screen Installation', text: 'Left and right 45° beveled edges enable tight-fitting installations around square and rectangular columns in any combination of flat, inner/outer arc, and rectangular configurations.' },
          { title: 'Dual Maintenance Access', text: 'Module front maintenance and screw rear maintenance provide full serviceability from either side. Compatible with both overhead rigging and floor-stacked configurations.' },
        ],
        features: [
          { title: 'Beveled Edge Design', text: 'Precision 45° beveled edges on both left and right sides create seamless corner joints at 90°, ensuring a flush surface across flat and angled panels in the same installation.', image: ledPosterDetail4 },
          { title: 'Shared Rear Cover Platform', text: 'The hot-swap modular rear cover, stainless steel buckle latches, and ball-bearing positioning system are shared with the Standard and Flexible cabinets. One spare parts kit covers all three variants.', image: ledPosterDetail2 },
        ],
        variants: [
          { name: 'Right Angle P1.6', pixelPitch: '1.6mm', brightness: '800 nits', cabinetSize: '500×500mm', weight: '4.0kg' },
          { name: 'Right Angle P1.9', pixelPitch: '1.9mm', brightness: '800 nits', cabinetSize: '500×500mm', weight: '4.0kg' },
          { name: 'Right Angle P2.6', pixelPitch: '2.6mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '4.0kg' },
          { name: 'Right Angle P2.9', pixelPitch: '2.9mm', brightness: '1000 nits', cabinetSize: '500×500mm', weight: '4.0kg' },
          { name: 'Right Angle P3.9', pixelPitch: '3.9mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '4.0kg' },
          { name: 'Right Angle P4.8', pixelPitch: '4.8mm', brightness: '1200 nits', cabinetSize: '500×500mm', weight: '4.0kg' },
        ],
        parameters: [
          { label: 'Cabinet Size', value: '500 × 500 × 71 mm' },
          { label: 'Module Size', value: '250 × 250 mm' },
          { label: 'Pixel Pitch Options', value: 'P1.6 / P1.9 / P2.6 / P2.9 / P3.9 / P4.8' },
          { label: 'Weight', value: '4.0 kg' },
          { label: 'Material', value: 'Aluminum Alloy' },
          { label: 'Bevel Angle', value: '45° (left and right)' },
          { label: 'Maintenance', value: 'Front (module) / Rear (screw)' },
          { label: 'Installation', value: 'Hanging / Stacking' },
          { label: 'Compatible Cabinets', value: 'Flat / Curved / Flexible Arc' },
          { label: 'Receiver Card', value: 'Nova A-Series: A4–A10' },
          { label: 'Environment', value: 'Indoor' },
        ],
      },
    ],
    relatedProducts: [],
    relatedDownloads: [
      { title: 'City Light Series Datasheet', type: 'PDF', size: '4.2 MB' },
      { title: 'Installation Manual', type: 'PDF', size: '2.4 MB' },
      { title: 'Arc Configuration Guide', type: 'PDF', size: '2.1 MB' },
    ],
    relatedCaseStudies: [],
  },
};

// Alias — new canonical slug resolves to the same product data
products['led-poster-display'] = { ...products['vx-led-poster'], slug: 'led-poster-display', category: 'led-screens' };

export function getProductDetail(slug: string, _category?: string): ProductDetail | null {
  return products[slug] || null;
}
