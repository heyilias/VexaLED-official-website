import ledScreenImg from '@/assets/products/led-screen/hero.png';
import ledPosterImg from '@/assets/products/led-screen/poster/front.webp';

export interface ProductVariantSpec {
  label: string;
  value: string;
}

export interface ProductVariantTab {
  name: string;
  description?: string;
  features: string[];
  pitchColumns: string[];
  sharedSpecs: ProductVariantSpec[];
  rows: {
    label: string;
    values: string[];
  }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  subGroup: string;
  application: string;
  pixelPitch: string;
  variantTabs?: ProductVariantTab[];
}

export interface SubGroup {
  label: string;
  slug: string;
  comingSoon?: boolean;
  products: Product[];
}

export interface CategoryData {
  title: string;
  heroImage: string;
  heroSubtitle: string;
  subGroups: SubGroup[];
}

const SHARED_SMALL_PITCH_FEATURES = [
  'Yahei matte SMD1010/1515 lamp beads — screen surface without reflection',
  'LED-specific high-brush C+ blanking IC for high definition with no afterimages',
  'Lightweight aluminum alloy die-casting — single box liftable with one arm',
  'Precise CNC processing for seamless splicing and refined appearance',
  'Front maintenance with aerial plug interface, anti-reverse plug design, one card per box',
  'Professional high-efficiency energy-saving IC for low energy consumption',
];

const SHARED_SMALL_PITCH_SPECS: ProductVariantSpec[] = [
  { label: 'IP Rating', value: 'IP30' },
  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
  { label: 'Refresh Rate', value: '3840 Hz' },
  { label: 'Maintenance', value: 'Front' },
  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
  { label: 'Working Temp', value: '0–40°C' },
  { label: 'Storage Temp', value: '-20–60°C' },
  { label: 'Working Humidity', value: '35–85%' },
  { label: 'Storage Humidity', value: '10–90%' },
  { label: 'Lifespan', value: '≥100,000 hours' },
];

const categories: Record<string, CategoryData> = {
  'led-screens': {
    title: 'LED Screens',
    heroImage: ledScreenImg,
    heroSubtitle: 'Professional LED display solutions for every application',
    subGroups: [
      {
        label: 'Indoor',
        slug: 'indoor',
        products: [
          {
            id: 'city-light-series',
            slug: 'city-light-series',
            name: 'City Light Cabinet Series',
            description: 'Modular 500×500mm aluminum alloy cabinets — Standard flat, Flexible arc (0°–45°), and 45° Right Angle configurations from a single hardware platform.',
            image: ledScreenImg,
            subGroup: 'indoor',
            application: 'events',
            pixelPitch: 'standard',
          },
          {
            id: 'indoor-small-pitch',
            slug: 'indoor-small-pitch',
            name: 'Small Pitch Series',
            description: 'Fine-pitch indoor LED displays from P0.9375 to P2.0, available in four cabinet sizes with front maintenance.',
            image: ledScreenImg,
            subGroup: 'indoor',
            application: 'corporate',
            pixelPitch: 'fine',
            variantTabs: [
              {
                name: '400×300mm',
                description: 'Ultra-fine pitch for boardrooms, control rooms, and broadcast studios.',
                features: [
                  ...SHARED_SMALL_PITCH_FEATURES.slice(0, 2),
                  'Lightweight aluminum alloy die-casting — single box weighs about 3–5 kg, liftable with one arm',
                  ...SHARED_SMALL_PITCH_FEATURES.slice(3),
                  'Standard 200×150mm module with positioning lock for one-step installation',
                ],
                pitchColumns: ['P1.25', 'P1.388', 'P1.56', 'P1.667', 'P1.923'],
                sharedSpecs: SHARED_SMALL_PITCH_SPECS,
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['1.25', '1.388', '1.56', '1.667', '1.923'] },
                  { label: 'Pixel Composition', values: ['SMD1010', 'SMD1010', 'SMD1010', 'SMD1010', 'SMD1515'] },
                  { label: 'Pixel Density (dot/m²)', values: ['640,000', '518,400', '409,600', '360,000', '270,400'] },
                  { label: 'Module Size', values: ['200×150mm', '200×150mm', '200×150mm', '200×150mm', '200×150mm'] },
                  { label: 'Module Resolution (dot)', values: ['160×120', '144×108', '128×96', '120×90', '104×78'] },
                  { label: 'Box Size', values: ['400×300mm', '400×300mm', '400×300mm', '400×300mm', '400×300mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['320×240', '288×216', '256×192', '240×180', '208×166'] },
                  { label: 'Scanning Method', values: ['1/32', '1/54', '1/32', '1/30', '1/26'] },
                  { label: 'Brightness (CD/m²)', values: ['≥500', '≥500', '≥500', '≥500', '≥500'] },
                  { label: 'Max Power (W/m²)', values: ['≤900', '≤900', '≤800', '≤800', '≤800'] },
                  { label: 'Avg Power (W/m²)', values: ['≤300', '≤300', '≤200', '≤200', '≤200'] },
                ],
              },
              {
                name: '480×480mm',
                description: 'Fine pitch for conference rooms, retail, and hospitality.',
                features: [
                  ...SHARED_SMALL_PITCH_FEATURES.slice(0, 2),
                  'Lightweight aluminum alloy die-casting — single box weighs about 5–8 kg',
                  ...SHARED_SMALL_PITCH_FEATURES.slice(3),
                  'Standard 240×240mm module with positioning lock for one-step installation',
                ],
                pitchColumns: ['P1.57', 'P1.667', 'P1.875', 'P2', 'P2.5'],
                sharedSpecs: SHARED_SMALL_PITCH_SPECS,
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['1.57', '1.667', '1.875', '2', '2.5'] },
                  { label: 'Pixel Composition', values: ['SMD1010', 'SMD1010', 'SMD1515', 'SMD1515', 'SMD2020'] },
                  { label: 'Pixel Density (dot/m²)', values: ['400,689', '360,000', '284,089', '250,000', '160,000'] },
                  { label: 'Module Size', values: ['240×240mm', '240×240mm', '240×240mm', '240×240mm', '240×240mm'] },
                  { label: 'Module Resolution (dot)', values: ['152×152', '144×144', '128×128', '120×120', '96×96'] },
                  { label: 'Box Size', values: ['480×480mm', '480×480mm', '480×480mm', '480×480mm', '480×480mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['304×304', '288×288', '256×256', '240×240', '192×192'] },
                  { label: 'Scanning Method', values: ['1/38', '1/48', '1/32', '1/30', '1/32'] },
                  { label: 'Brightness (CD/m²)', values: ['≥500', '≥500', '≥500', '≥600', '≥600'] },
                  { label: 'Max Power (W/m²)', values: ['≤800', '≤800', '≤800', '≤800', '≤800'] },
                  { label: 'Avg Power (W/m²)', values: ['≤200', '≤200', '≤200', '≤200', '≤200'] },
                ],
              },
              {
                name: '600×337.5mm',
                description: '16:9 native cabinet for seamless video walls and immersive installations.',
                features: [
                  ...SHARED_SMALL_PITCH_FEATURES.slice(0, 2),
                  'Lightweight aluminum alloy die-casting — single box weighs about 5–9 kg',
                  ...SHARED_SMALL_PITCH_FEATURES.slice(3),
                  'Standard 150×168.75mm module with positioning lock for one-step installation',
                ],
                pitchColumns: ['P0.9375', 'P1.25', 'P1.56', 'P1.875'],
                sharedSpecs: SHARED_SMALL_PITCH_SPECS,
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['0.9375', '1.25', '1.56', '1.875'] },
                  { label: 'Pixel Composition', values: ['SMD0808', 'SMD1010', 'SMD1010', 'SMD1515'] },
                  { label: 'Pixel Density (dot/m²)', values: ['1,137,763', '640,000', '409,600', '284,089'] },
                  { label: 'Module Size', values: ['150×168.75mm', '150×168.75mm', '150×168.75mm', '150×168.75mm'] },
                  { label: 'Module Resolution (dot)', values: ['160×180', '120×135', '96×108', '80×90'] },
                  { label: 'Box Size', values: ['600×337.5mm', '600×337.5mm', '600×337.5mm', '600×337.5mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['640×360', '480×270', '384×216', '320×180'] },
                  { label: 'Scanning Method', values: ['1/32', '1/45', '1/27', '1/30'] },
                  { label: 'Brightness (CD/m²)', values: ['≥500', '≥500', '≥500', '≥500'] },
                  { label: 'Max Power (W/m²)', values: ['≤1000', '≤900', '≤800', '≤800'] },
                  { label: 'Avg Power (W/m²)', values: ['≤300', '≤200', '≤200', '≤200'] },
                ],
              },
              {
                name: '640×480mm',
                description: 'Standard indoor pitch for large venues, auditoriums, and broadcast backdrops.',
                features: [
                  ...SHARED_SMALL_PITCH_FEATURES.slice(0, 2),
                  'Lightweight aluminum alloy die-casting — single box weighs about 8–10 kg',
                  ...SHARED_SMALL_PITCH_FEATURES.slice(3),
                  'Standard 320×160mm module with positioning lock for one-step installation',
                ],
                pitchColumns: ['P1.25', 'P1.53', 'P1.667', 'P1.86', 'P1.904', 'P2'],
                sharedSpecs: SHARED_SMALL_PITCH_SPECS,
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['1.25', '1.53', '1.667', '1.86', '1.904', '2'] },
                  { label: 'Pixel Composition', values: ['SMD1010', 'SMD1010', 'SMD1010', 'SMD1515', 'SMD1515', 'SMD1515'] },
                  { label: 'Pixel Density (dot/m²)', values: ['640,000', '426,409', '360,000', '288,369', '270,400', '250,000'] },
                  { label: 'Module Size', values: ['320×160mm', '320×160mm', '320×160mm', '320×160mm', '320×160mm', '320×160mm'] },
                  { label: 'Module Resolution (dot)', values: ['256×128', '208×104', '192×96', '172×86', '168×84', '160×80'] },
                  { label: 'Box Size', values: ['640×480mm', '640×480mm', '640×480mm', '640×480mm', '640×480mm', '640×480mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['512×384', '416×312', '384×288', '344×256', '336×252', '320×240'] },
                  { label: 'Scanning Method', values: ['1/32', '1/26', '1/32', '1/43', '1/52', '1/40'] },
                  { label: 'Brightness (CD/m²)', values: ['≥500', '≥500', '≥500', '≥500', '≥500', '≥500'] },
                  { label: 'Max Power (W/m²)', values: ['≤900', '≤800', '≤800', '≤800', '≤800', '≤800'] },
                  { label: 'Avg Power (W/m²)', values: ['≤300', '≤200', '≤200', '≤200', '≤200', '≤200'] },
                ],
              },
            ],
          },
          {
            id: 'indoor-rental-fixed',
            slug: 'indoor-rental-fixed',
            name: 'Rental & Fixed Series',
            description: 'Versatile indoor displays for rental events and permanent fixed installations — P2.604–P4.81 rental and P2–P5 fixed install.',
            image: ledScreenImg,
            subGroup: 'indoor',
            application: 'events',
            pixelPitch: 'standard',
            variantTabs: [
              {
                name: 'Rental',
                description: 'Standard 500×500mm box compatible with P2.604 / P2.976 / P3.91 / P4.81.',
                features: [
                  'Standard 250×250mm module, standard 500×500mm box, compatible with P2.604/P2.976/P3.91/P4.81',
                  'High-precision die-casting aluminum box, seamlessly spliced',
                  'Light and firm box body with built-in handle and quick positioning lock — various assembly methods',
                  '140° all-round viewing angle adaptable to various rental environments',
                  'Exquisite lamp beads and IC materials — uniform natural color, high gray scale, 3840 MHz refresh',
                  'Optional LCD module on the back for customized branding',
                ],
                pitchColumns: ['P2.604', 'P2.976', 'P3.91', 'P4.81'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP30' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '3840 Hz' },
                  { label: 'Maintenance', value: 'Front and rear' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['2.604', '2.976', '3.91', '4.81'] },
                  { label: 'Pixel Composition', values: ['SMD1515', 'SMD2020', 'SMD2020', 'SMD2020'] },
                  { label: 'Pixel Density (dot)', values: ['147,456', '112,896', '65,536', '43,264'] },
                  { label: 'Module Size', values: ['250×250mm', '250×250mm', '250×250mm', '250×250mm'] },
                  { label: 'Module Resolution (dot)', values: ['96×96', '84×84', '64×64', '52×52'] },
                  { label: 'Box Size', values: ['500×500 / 500×1000mm', '500×500 / 500×1000mm', '500×500 / 500×1000mm', '500×500 / 500×1000mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['192×192 / 192×384', '168×168 / 168×336', '128×128 / 128×192', '104×104 / 104×208'] },
                  { label: 'Scanning Method', values: ['1/32', '1/28', '1/16', '1/13'] },
                  { label: 'Brightness (CD/m²)', values: ['≥1000', '≥1000', '≥1000', '≥1000'] },
                  { label: 'Max Power (W/m²)', values: ['≤600', '≤600', '≤600', '≤600'] },
                  { label: 'Avg Power (W/m²)', values: ['≤200', '≤200', '≤200', '≤200'] },
                ],
              },
              {
                name: 'Fixed Install',
                description: 'Good flatness with patented consistent ink color mask for remarkable display effect.',
                features: [
                  'Wider viewing angle — up to 120° horizontal and 60° vertical',
                  'Smoother, more high-end appearance',
                  'Clearer, more detailed videos and pictures',
                  'High-quality materials with small package, high brightness, large angle, anti-static',
                  'Non-linear correction — delicate image quality, vivid animation, smooth video',
                  'Good flatness — patented consistent ink color mask for remarkable display effect',
                ],
                pitchColumns: ['P2', 'P2.5', 'P3', 'P3.84', 'P4', 'P5'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP30' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '1920 Hz' },
                  { label: 'Maintenance', value: 'Front and rear' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['2', '2.5', '3', '3.84', '4', '5'] },
                  { label: 'Pixel Composition', values: ['SMD1515', 'SMD2020', 'SMD2020', 'SMD2020', 'SMD2020', 'SMD2020'] },
                  { label: 'Pixel Density (dot)', values: ['250,000', '160,000', '111,111', '67,600', '62,500', '40,000'] },
                  { label: 'Module Size', values: ['256×128mm', '160×160mm', '192×192mm', '288×288mm', '256×128mm', '320×160mm'] },
                  { label: 'Module Resolution (dot)', values: ['128×64', '64×64', '64×64', '75×75', '64×32', '64×32'] },
                  { label: 'Box Size', values: ['512×512mm', '640×640mm', '768×768mm', '576×576mm', '512×512mm', '640×640mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['256×256', '256×256', '192×192', '225×225', '128×128', '128×128'] },
                  { label: 'Scanning Method', values: ['1/32', '1/32', '1/32', '1/25', '1/16', '1/16'] },
                  { label: 'Brightness (CD/m²)', values: ['≥500', '≥500', '≥500', '≥500', '≥500', '≥500'] },
                  { label: 'Max Power (W/m²)', values: ['≤800', '≤800', '≤800', '≤800', '≤800', '≤800'] },
                  { label: 'Avg Power (W/m²)', values: ['≤200', '≤200', '≤200', '≤200', '≤200', '≤200'] },
                ],
              },
            ],
          },
          {
            id: 'indoor-creative',
            slug: 'indoor-creative',
            name: 'Creative Display Series',
            description: 'Soft board, mirror screen, transparent screen, and folding screen for curved, architectural, and creative LED installations.',
            image: ledScreenImg,
            subGroup: 'indoor',
            application: 'broadcast',
            pixelPitch: 'fine',
            variantTabs: [
              {
                name: 'Soft Board',
                description: 'Minimum cylinder diameter 30cm — can be hoisted, fabricated, and hung.',
                features: [
                  'No degumming, no warping — fully hollow and strong magnetic flexible FPC circuit board with high-strength compression and anti-torsion',
                  'High ductility, arbitrarily shaped — minimum cylinder diameter 30cm; can be hoisted, fabricated, and hung',
                  'Clearer, more detailed videos and pictures for impactful visuals',
                  'High-quality materials with small package, high brightness, large angle, anti-static',
                  'Non-linear correction — delicate image, vivid animation, smooth realistic video',
                ],
                pitchColumns: ['P1.667', 'P1.875', 'P2', 'P2.5', 'P3', 'P4'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP30' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '3840 Hz' },
                  { label: 'Maintenance', value: 'Front' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['1.667', '1.875', '2', '2.5', '3', '4'] },
                  { label: 'Pixel Composition', values: ['SMD1010', 'SMD1515', 'SMD1515', 'SMD2020', 'SMD2020', 'SMD2020'] },
                  { label: 'Pixel Density (dot)', values: ['360,000', '284,089', '250,000', '160,000', '111,111', '62,500'] },
                  { label: 'Module Size', values: ['240×120mm', '240×120mm', '240×120mm', '240×120mm', '240×120mm', '240×120mm'] },
                  { label: 'Module Resolution (dot)', values: ['144×72', '128×64', '120×60', '96×48', '80×40', '60×30'] },
                  { label: 'Scanning Method', values: ['1/36', '1/32', '1/30', '1/24', '1/20', '1/15'] },
                  { label: 'Brightness (CD/m²)', values: ['≥500', '≥500', '≥500', '≥600', '≥600', '≥600'] },
                  { label: 'Max Power (W/m²)', values: ['≤800', '≤800', '≤800', '≤800', '≤800', '≤800'] },
                  { label: 'Avg Power (W/m²)', values: ['≤300', '≤200', '≤200', '≤200', '≤200', '≤200'] },
                ],
              },
              {
                name: 'Mirror Screen',
                description: 'Standard size 640×1920mm — plug and play via WiFi or USB.',
                features: [
                  'Thin, light screen body with front maintenance; high-end stylish appearance; standard size 640×1920mm',
                  'Plug and play — content updated through WiFi or USB; simple interface',
                  'DDR Flash memory chip — modules exchangeable without color difference',
                  'Intelligent management — multi-screen network for unified playback',
                ],
                pitchColumns: ['P1.53', 'P1.667', 'P1.86', 'P2', 'P2.5'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP30' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '3840 Hz' },
                  { label: 'Maintenance', value: 'Front' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['1.53', '1.667', '1.86', '2', '2.5'] },
                  { label: 'Pixel Composition', values: ['SMD1010', 'SMD1010', 'SMD1515', 'SMD1515', 'SMD2020'] },
                  { label: 'Pixel Density (dot)', values: ['426,409', '360,000', '288,369', '250,000', '160,000'] },
                  { label: 'Module Size', values: ['320×160mm', '320×160mm', '320×160mm', '320×160mm', '320×160mm'] },
                  { label: 'Module Resolution (dot)', values: ['208×104', '192×96', '172×86', '160×80', '128×64'] },
                  { label: 'Box Size', values: ['640×1920mm', '640×1920mm', '640×1920mm', '640×1920mm', '640×1920mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['416×1248', '384×1152', '344×1032', '320×960', '256×768'] },
                  { label: 'Scanning Method', values: ['1/26', '1/32', '1/43', '1/40', '1/32'] },
                  { label: 'Brightness (CD/m²)', values: ['≥500', '≥500', '≥500', '≥500', '≥500'] },
                  { label: 'Max Power (W/m²)', values: ['≤800', '≤800', '≤800', '≤800', '≤800'] },
                  { label: 'Avg Power (W/m²)', values: ['≤200', '≤200', '≤200', '≤200', '≤200'] },
                ],
              },
              {
                name: 'Transparent Screen',
                description: 'Perspective effect >75% — advertisement feels suspended on glass curtain wall.',
                features: [
                  'High brightness and transparency — perspective effect >75%; LED lights hardly visible from distance',
                  'Unique transparent display — advertisement feels suspended on glass curtain wall',
                  'Low-carbon, energy-saving — no traditional cooling needed; lower temperature rise improves reliability',
                  'Cost saving — no changes to original building structure needed',
                ],
                pitchColumns: ['P3.91–7.82 (Low)', 'P3.91–7.82 (High)', 'P10.4–10.4 (Low)', 'P10.4–10.4 (High)'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP30' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '1920 Hz' },
                  { label: 'Maintenance', value: 'Front' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['3.91–7.82', '3.91–7.82', '10.4–10.4', '10.4–10.4'] },
                  { label: 'Pixel Composition', values: ['SMD1921', 'SMD1921', 'SMD1921', 'SMD1921'] },
                  { label: 'Pixel Density (dot)', values: ['32,768', '32,768', '9,216', '9,216'] },
                  { label: 'Module Size', values: ['500×125mm', '500×125mm', '500×125mm', '500×125mm'] },
                  { label: 'Module Resolution (dot)', values: ['128×16', '128×16', '48×12', '48×12'] },
                  { label: 'Box Size', values: ['1000×500mm', '1000×500mm', '1000×500mm', '1000×500mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['256×64', '256×64', '96×48', '96×48'] },
                  { label: 'Scanning Method', values: ['1/16', '1/8', '1/4', '1/2'] },
                  { label: 'Brightness (CD/m²)', values: ['≥1200', '≥4000', '≥1200', '≥4000'] },
                  { label: 'Max Power (W/m²)', values: ['≤800', '≤1000', '≤800', '≤1000'] },
                  { label: 'Avg Power (W/m²)', values: ['≤200', '≤300', '≤200', '≤300'] },
                ],
              },
              {
                name: 'Folding Screen',
                description: '500×500mm aluminum alloy cabinet — flat, curved, flexible, and 45° right-angle configurations. Snap-lock assembly, sub-30s hot-swap rear cover.',
                features: [
                  '4-in-1 cabinet: flat, curved, flexible, and 45° right-angle from one cabinet type',
                  'Hot-swap rear cover — swap power supply or receiving card in under 30 seconds',
                  'Single cabinet ~4.35 kg (curved) / 4.1 kg (flat) — one-technician handling',
                  'Stainless steel buckle latches — stronger tension and tighter seams than standard clips',
                  'Anti-collision bumps + corner protectors for transport and installation protection',
                  'IP54 rated — suitable for indoor and semi-outdoor environments',
                ],
                pitchColumns: ['P1.6', 'P1.9', 'P2.6', 'P2.9', 'P3.9', 'P4.8'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP54' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 140°' },
                  { label: 'Refresh Rate', value: '3840 Hz' },
                  { label: 'Maintenance', value: 'Front / Rear' },
                  { label: 'Power Supply', value: 'AC100-240V, 50/60Hz' },
                  { label: 'Working Temp', value: '-20°C to 50°C' },
                  { label: 'Storage Temp', value: '-40°C to 70°C' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['1.6', '1.9', '2.6', '2.9', '3.9', '4.8'] },
                  { label: 'Cabinet Size', values: ['500×500mm', '500×500mm', '500×500mm', '500×500mm', '500×500mm', '500×500mm'] },
                  { label: 'Module Size', values: ['250×250mm', '250×250mm', '250×250mm', '250×250mm', '250×250mm', '250×250mm'] },
                  { label: 'Brightness (nits)', values: ['1000', '1000', '1000', '1200', '1500', '1500'] },
                  { label: 'Weight (curved)', values: ['4.35kg', '4.35kg', '4.35kg', '4.35kg', '4.35kg', '4.35kg'] },
                  { label: 'Weight (flat)', values: ['4.1kg', '4.1kg', '4.1kg', '4.1kg', '4.1kg', '4.1kg'] },
                  { label: 'Contrast Ratio', values: ['5000:1', '5000:1', '5000:1', '5000:1', '5000:1', '5000:1'] },
                  { label: 'Refresh Rate (Hz)', values: ['3840', '3840', '3840', '3840', '3840', '3840'] },
                  { label: 'Max Power (W/m²)', values: ['≤350', '≤350', '≤350', '≤350', '≤350', '≤350'] },
                  { label: 'Avg Power (W/m²)', values: ['≤120', '≤120', '≤120', '≤120', '≤120', '≤120'] },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Outdoor',
        slug: 'outdoor',
        products: [
          {
            id: 'outdoor-rental',
            slug: 'outdoor-rental',
            name: 'Rental Series',
            description: 'Touring-grade outdoor panels built for weather resistance and rapid deployment at live events.',
            image: ledScreenImg,
            subGroup: 'outdoor',
            application: 'events',
            pixelPitch: 'standard',
            variantTabs: [
              {
                name: 'Outdoor Rental',
                description: 'Standard 500×500mm box, waterproof design for outdoor rental use.',
                features: [
                  'Standard 250×250mm module, 500×500mm box, compatible with P2.604/P2.976/P3.91/P4.81',
                  'Waterproof design with seamless splicing for outdoor rental use',
                  'High-precision die-casting aluminum box',
                  'Light and firm with built-in handle and quick positioning lock',
                  '140° viewing angle for various rental environments',
                  'Exquisite lamp beads — uniform color, high gray scale, 3840 MHz refresh',
                  'Optional LCD module on back for branding',
                ],
                pitchColumns: ['P2.604', 'P2.976', 'P3.91', 'P4.81'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP65' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '3840 Hz' },
                  { label: 'Maintenance', value: 'Front and rear' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['2.604', '2.976', '3.91', '4.81'] },
                  { label: 'Pixel Composition', values: ['SMD1415', 'SMD1415', 'SMD1921', 'SMD1921'] },
                  { label: 'Pixel Density (dot)', values: ['147,456', '112,896', '65,536', '43,264'] },
                  { label: 'Module Size', values: ['250×250mm', '250×250mm', '250×250mm', '250×250mm'] },
                  { label: 'Module Resolution (dot)', values: ['96×96', '84×84', '64×64', '52×52'] },
                  { label: 'Box Size', values: ['500×500 / 500×1000mm', '500×500 / 500×1000mm', '500×500 / 500×1000mm', '500×500 / 500×1000mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['192×192 / 192×384', '168×168 / 168×336', '128×128 / 128×192', '104×104 / 104×208'] },
                  { label: 'Scanning Method', values: ['1/32', '1/28', '1/16', '1/13'] },
                  { label: 'Brightness (CD/m²)', values: ['≥3500', '≥3500', '≥1000', '≥1000'] },
                  { label: 'Max Power (W/m²)', values: ['≤1000', '≤1000', '≤600', '≤600'] },
                  { label: 'Avg Power (W/m²)', values: ['≤350', '≤350', '≤200', '≤200'] },
                ],
              },
            ],
          },
          {
            id: 'outdoor-fixed',
            slug: 'outdoor-fixed',
            name: 'Fixed Installation Series',
            description: 'Permanent outdoor displays from high-resolution small pitch to large-format DIP in-line — P2.5 to P25.',
            image: ledScreenImg,
            subGroup: 'outdoor',
            application: 'advertising',
            pixelPitch: 'standard',
            variantTabs: [
              {
                name: 'Small Pitch',
                description: 'For outdoor close-up: mall entrances, hotels, supermarkets, vehicle displays, billboards.',
                features: [
                  'Bright colors, high contrast, high brightness — visible in strong direct sunlight',
                  'Standard modules with adjustable box sizes and steel structure connection',
                  'Ultra-low energy power supply with silent temperature-control fan',
                  'Constant current drive — annual light decay within 5%',
                  'For outdoor close-up: mall entrances, hotels, supermarkets, vehicle displays, billboards, light poles',
                ],
                pitchColumns: ['P2.5', 'P3', 'P3.076', 'P3.33'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP65' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '1920 Hz' },
                  { label: 'Maintenance', value: 'Rear' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['2.5', '3', '3.076', '3.33'] },
                  { label: 'Pixel Composition', values: ['SMD1415', 'SMD1921', 'SMD1921', 'SMD1921'] },
                  { label: 'Pixel Density (dot)', values: ['160,000', '111,111', '105,625', '90,000'] },
                  { label: 'Module Size', values: ['160×160mm', '192×192mm', '320×160mm', '320×160mm'] },
                  { label: 'Module Resolution (dot)', values: ['64×64', '64×64', '104×52', '96×48'] },
                  { label: 'Box Size', values: ['640×640mm', '576×576mm', '640×640mm', '640×640mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['256×256', '192×192', '208×208', '192×192'] },
                  { label: 'Scanning Method', values: ['1/15', '1/16', '1/13', '1/12'] },
                  { label: 'Brightness (CD/m²)', values: ['≥5000', '≥5000', '≥5000', '≥5000'] },
                  { label: 'Max Power (W/m²)', values: ['≤1000', '≤1000', '≤1000', '≤1000'] },
                  { label: 'Avg Power (W/m²)', values: ['≤400', '≤400', '≤400', '≤400'] },
                ],
              },
              {
                name: 'Regular',
                description: 'For squares, entertainment centers, commercial centers, advertising boards, streets, railway stations.',
                features: [
                  'Rich colors, high saturation, high definition with high frequency display',
                  'Constant current drive for higher reliability and stability',
                  'Non-linear correction — clearer image with stronger hierarchy',
                  'High-quality LED beads with strong anti-static, low attenuation, high wavelength stability',
                  'For squares, entertainment centers, commercial centers, advertising boards, streets, railway stations',
                ],
                pitchColumns: ['P4', 'P5', 'P6', 'P6.67', 'P8', 'P10'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP65' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '1920 Hz' },
                  { label: 'Maintenance', value: 'Rear' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['4', '5', '6', '6.67', '8', '10'] },
                  { label: 'Pixel Composition', values: ['SMD1921', 'SMD2727', 'SMD2727', 'SMD2727', 'SMD3535', 'SMD3535'] },
                  { label: 'Pixel Density (dot)', values: ['62,500', '40,000', '27,777', '22,500', '15,625', '10,000'] },
                  { label: 'Module Size', values: ['256×128mm', '160×160mm', '192×192mm', '320×160mm', '256×128mm', '320×160mm'] },
                  { label: 'Module Resolution (dot)', values: ['64×32', '32×32', '32×32', '48×24', '40×20', '64×32'] },
                  { label: 'Box Size', values: ['512×512mm', '640×640mm', '576×576mm', '640×640mm', '512×512mm', '640×640mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['128×128', '128×128', '96×96', '96×96', '80×80', '64×64'] },
                  { label: 'Scanning Method', values: ['1/8', '1/8', '1/8', '1/6', '1/4', '1/2'] },
                  { label: 'Brightness (CD/m²)', values: ['≥5500', '≥5500', '≥5000', '≥6500', '≥6000', '≥7000'] },
                  { label: 'Max Power (W/m²)', values: ['≤1000', '≤900', '≤900', '≤1000', '≤1000', '≤1200'] },
                  { label: 'Avg Power (W/m²)', values: ['≤400', '≤300', '≤300', '≤400', '≤400', '≤200'] },
                ],
              },
              {
                name: 'In-line (DIP)',
                description: 'For squares, entertainment centers, commercial streets, advertising boards, railway stations.',
                features: [
                  'DIP in-line lamp — more stable with better waterproof and anti-ultraviolet performance',
                  'Constant current drive for higher reliability and stability',
                  'Non-linear correction — clearer image with stronger hierarchy',
                  'High-quality LED beads with strong anti-static, low attenuation, high wavelength stability',
                  'For squares, entertainment centers, commercial streets, advertising boards, railway stations',
                ],
                pitchColumns: ['P10', 'P12', 'P16', 'P20', 'P25'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP65' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '1920 Hz' },
                  { label: 'Maintenance', value: 'Rear' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['10', '12', '16', '20', '25'] },
                  { label: 'Pixel Composition', values: ['DIP346', 'DIP346', 'DIP346', 'DIP346', 'DIP546'] },
                  { label: 'Pixel Density (dot)', values: ['10,000', '6,940', '3,906', '2,500', '1,600'] },
                  { label: 'Module Size', values: ['320×160mm', '192×192mm', '256×256mm', '320×160mm', '400×200mm'] },
                  { label: 'Module Resolution (dot)', values: ['32×16', '16×16', '16×16', '32×16', '16×8'] },
                  { label: 'Box Size', values: ['960×960mm', '960×960mm', '1024×1024mm', '960×940mm', '1200×1200mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['96×96', '80×80', '64×64', '48×48', '48×48'] },
                  { label: 'Scanning Method', values: ['1/4', '1/4', '1/1', '1/1', '1/1'] },
                  { label: 'Brightness (CD/m²)', values: ['≥8500', '≥6500', '≥6500', '≥7500', '≥6000'] },
                  { label: 'Max Power (W/m²)', values: ['≤1000', '≤1000', '≤1000', '≤1000', '≤1000'] },
                  { label: 'Avg Power (W/m²)', values: ['≤400', '≤400', '≤400', '≤400', '≤400'] },
                ],
              },
            ],
          },
          {
            id: 'outdoor-front-maintenance',
            slug: 'outdoor-front-maintenance',
            name: 'Front Maintenance Series',
            description: 'Front-serviceable outdoor panels — available in screw-type and hexagonal lock configurations.',
            image: ledScreenImg,
            subGroup: 'outdoor',
            application: 'advertising',
            pixelPitch: 'standard',
            variantTabs: [
              {
                name: 'Screw Type',
                description: 'Front maintenance with glue filling on back — IP65 waterproof, no maintenance channel needed.',
                features: [
                  'Front maintenance with glue filling on back — IP65 waterproof, no maintenance channel needed',
                  '120° ultra-wide viewing angle, brightness up to 5500 cd/m²',
                  'Deep grayscale processing — rich colors, clear natural picture',
                  'Box body stackable and hoistable',
                  'For outdoor advertising, malls, squares, theme parks, gymnasiums',
                ],
                pitchColumns: ['P5', 'P6', 'P8', 'P10', 'P10 (DIP)', 'P16'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP65' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '1920 Hz' },
                  { label: 'Maintenance', value: 'Front' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['5', '6', '8', '10', '10', '16'] },
                  { label: 'Pixel Composition', values: ['SMD1921', 'SMD2727', 'SMD3535', 'SMD3535', 'DIP346', 'SMD3535'] },
                  { label: 'Pixel Density (dot)', values: ['40,000', '27,777', '15,625', '10,000', '10,000', '3,906'] },
                  { label: 'Module Size', values: ['160×160mm', '192×192mm', '256×128mm', '320×160mm', '320×160mm', '256×256mm'] },
                  { label: 'Module Resolution (dot)', values: ['32×32', '32×32', '32×16', '32×16', '32×16', '16×16'] },
                  { label: 'Box Size', values: ['960×960mm', '960×960mm', '1024×1024mm', '960×960mm', '960×960mm', '1024×1024mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['128×128', '128×128', '96×96', '96×96', '80×80', '64×64'] },
                  { label: 'Scanning Method', values: ['1/8', '1/8', '1/2', '1/4', '1/4', '1/1'] },
                  { label: 'Brightness (CD/m²)', values: ['≤5000', '≤5500', '≤5500', '≤7000', '≤8500', '≤5500'] },
                  { label: 'Max Power (W/m²)', values: ['≤1000', '≤900', '≤900', '≤1000', '≤1000', '≤1200'] },
                  { label: 'Avg Power (W/m²)', values: ['≤400', '≤300', '≤300', '≤400', '≤400', '≤200'] },
                ],
              },
              {
                name: 'Hexagonal Lock Type',
                description: 'Module disassembled with hexagonal wrench — back glue-filled for IP54 waterproof.',
                features: [
                  'Front maintenance — module disassembled with hexagonal wrench; back glue-filled for IP54 waterproof',
                  '120° ultra-wide viewing angle, brightness up to 5500 cd/m²',
                  'Deep grayscale processing — rich colors, clear natural picture',
                  'Box body stackable and hoistable',
                  'For outdoor advertising, malls, squares, theme parks, gymnasiums',
                ],
                pitchColumns: ['P4.81', 'P6.67', 'P8', 'P10', 'P10 (DIP)'],
                sharedSpecs: [
                  { label: 'IP Rating', value: 'IP65' },
                  { label: 'Viewing Angle', value: 'H: 160° / V: 120°' },
                  { label: 'Refresh Rate', value: '1920 Hz' },
                  { label: 'Maintenance', value: 'Front' },
                  { label: 'Power Supply', value: 'AC110V–240V 50/60Hz' },
                  { label: 'Working Temp', value: '0–40°C' },
                  { label: 'Storage Temp', value: '-20–60°C' },
                  { label: 'Working Humidity', value: '35–85%' },
                  { label: 'Storage Humidity', value: '10–90%' },
                  { label: 'Lifespan', value: '≥100,000 hours' },
                ],
                rows: [
                  { label: 'Pixel Pitch (mm)', values: ['4.81', '6.67', '8', '10', '10'] },
                  { label: 'Pixel Composition', values: ['SMD1921', 'SMD2727', 'SMD3535', 'SMD3535', 'DIP346'] },
                  { label: 'Pixel Density (dot)', values: ['43,264', '22,500', '15,625', '10,000', '10,000'] },
                  { label: 'Module Size', values: ['250×250mm', '320×320mm', '320×320mm', '320×320mm', '320×320mm'] },
                  { label: 'Module Resolution (dot)', values: ['52×52', '48×48', '40×40', '32×32', '32×32'] },
                  { label: 'Box Size', values: ['1000×1000mm', '960×960mm', '960×960mm', '960×940mm', '960×960mm'] },
                  { label: 'Cabinet Resolution (dot)', values: ['208×208', '144×144', '120×120', '96×96', '96×96'] },
                  { label: 'Scanning Method', values: ['1/7', '1/6', '1/5', '1/2', '1/4'] },
                  { label: 'Brightness (CD/m²)', values: ['≥5000', '≥5000', '≥5500', '≥7000', '≥8500'] },
                  { label: 'Max Power (W/m²)', values: ['≤1000', '≤1000', '≤1000', '≤1200', '≤1000'] },
                  { label: 'Avg Power (W/m²)', values: ['≤400', '≤400', '≤400', '≤500', '≤400'] },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Poster',
        slug: 'poster',
        products: [
          {
            id: 'led-poster-display',
            slug: 'led-poster-display',
            name: 'LED Poster Display',
            description: 'Die-cast aluminum folding LED poster display for retail, exhibitions, and events.',
            image: ledPosterImg,
            subGroup: 'poster',
            application: 'advertising',
            pixelPitch: 'fine',
          },
        ],
      },
    ],
  },
  'lighting': {
    title: 'Lighting',
    heroImage: ledScreenImg,
    heroSubtitle: 'Professional lighting solutions — coming soon',
    subGroups: [
      {
        label: 'Coming Soon',
        slug: 'coming-soon',
        comingSoon: true,
        products: [],
      },
    ],
  },
};

export function getProductCategories(): Record<string, CategoryData> {
  return categories;
}

export function getProductBySlug(slug: string): Product | null {
  for (const cat of Object.values(categories)) {
    for (const group of cat.subGroups) {
      const found = group.products.find(p => p.slug === slug);
      if (found) return found;
    }
  }
  return null;
}

export function getApplicationFilters(): { value: string; label: string }[] {
  return [
    { value: 'all', label: 'All Applications' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'broadcast', label: 'Broadcast' },
    { value: 'advertising', label: 'Advertising' },
    { value: 'events', label: 'Events' },
  ];
}

export function getPixelPitchFilters(): { value: string; label: string }[] {
  return [
    { value: 'all', label: 'All Pixel Pitches' },
    { value: 'fine', label: 'Fine Pitch (< 2mm)' },
    { value: 'standard', label: 'Standard (2-5mm)' },
    { value: 'coarse', label: 'Coarse (> 5mm)' },
  ];
}
