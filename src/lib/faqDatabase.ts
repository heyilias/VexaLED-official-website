// VEXALED FAQ knowledge base for the AI chatbot
// Keyword-based matching system

export interface FAQEntry {
  keywords: string[];
  answer: Record<string, string>; // language code -> answer
}

export const faqDatabase: FAQEntry[] = [
  {
    keywords: ['cob', 'chip on board', 'chip-on-board', 'what is cob'],
    answer: {
      en: 'COB (Chip-on-Board) is our flagship LED technology where LED chips are directly bonded to the PCB substrate, eliminating traditional SMD packaging. This results in:\n\n• **Superior image quality** with no visible pixel gaps\n• **Higher contrast ratio** (up to 20,000:1)\n• **Better durability** — no exposed LEDs to damage\n• **Wider viewing angles** (up to 180°)\n\nOur COB displays range from P0.7 to P1.5 pixel pitch, ideal for control rooms, corporate lobbies, and broadcast studios.',
      zh: 'COB（板上芯片）是我们的旗舰 LED 技术，LED 芯片直接键合到 PCB 基板上，消除了传统 SMD 封装。优势包括：\n\n• **卓越的图像质量**，无可见像素间隙\n• **更高的对比度**（高达 20,000:1）\n• **更好的耐久性** — 无暴露 LED\n• **更宽的视角**（高达 180°）\n\n我们的 COB 显示屏像素间距从 P0.7 到 P1.5，适用于 Control Rooms、企业大厅和广播工作室。',
      es: 'COB (Chip-on-Board) es nuestra tecnología LED insignia donde los chips LED se unen directamente al sustrato PCB. Ventajas:\n\n• **Calidad de imagen superior** sin espacios de píxeles visibles\n• **Mayor relación de contraste** (hasta 20,000:1)\n• **Mejor durabilidad**\n• **Ángulos de visión más amplios** (hasta 180°)\n\nNuestras pantallas COB van de P0.7 a P1.5.',
      fr: 'COB (Chip-on-Board) est notre technologie LED phare. Les puces LED sont directement collées sur le substrat PCB. Avantages :\n\n• **Qualité d\'image supérieure**\n• **Rapport de contraste plus élevé** (jusqu\'à 20 000:1)\n• **Meilleure durabilité**\n• **Angles de vision plus larges** (jusqu\'à 180°)\n\nNos écrans COB vont de P0.7 à P1.5.',
      ar: 'COB (شريحة على لوحة) هي تقنية LED الرائدة لدينا حيث يتم ربط شرائح LED مباشرة بركيزة PCB. المزايا:\n\n• **جودة صورة فائقة**\n• **نسبة تباين أعلى** (حتى 20,000:1)\n• **متانة أفضل**\n• **زوايا مشاهدة أوسع** (حتى 180°)',
    },
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'quote', 'budget', 'precio', 'prix', 'سعر', '价格'],
    answer: {
      en: 'LED display pricing depends on several factors:\n\n• **Pixel pitch** (P0.7 is premium, P2.5+ is more affordable)\n• **Display size** (total square meters)\n• **Indoor vs Outdoor** rating\n• **Installation complexity**\n• **Custom requirements** (curved, transparent, etc.)\n\n💡 **Typical ranges:**\n- Indoor fine-pitch (P1.2-P1.8): $800-2,500/m²\n- Outdoor (P3-P10): $400-1,200/m²\n- COB ultra-fine (P0.7-P1.2): $2,000-5,000/m²\n\nFor an accurate quote, I recommend using our **Start Configuration** tool or contacting our sales team directly.',
      zh: 'LED 显示屏价格取决于多个因素：\n\n• **像素间距**（P0.7 为高端，P2.5+ 更实惠）\n• **显示面积**（总平方米）\n• **室内 vs 户外** 等级\n• **安装复杂度**\n\n💡 **典型价格范围：**\n- 室内细间距 (P1.2-P1.8): $800-2,500/m²\n- 户外 (P3-P10): $400-1,200/m²\n- COB 超细 (P0.7-P1.2): $2,000-5,000/m²\n\n建议使用我们的**开始配置**工具获取精确报价。',
      es: 'El precio depende de: pixel pitch, tamaño, interior/exterior, e instalación.\n\n💡 **Rangos típicos:**\n- Interior fino (P1.2-P1.8): $800-2,500/m²\n- Exterior (P3-P10): $400-1,200/m²\n- COB ultra-fino (P0.7-P1.2): $2,000-5,000/m²\n\nUse nuestra herramienta de configuración para una cotización precisa.',
      fr: 'Le prix dépend du pas de pixel, de la taille, intérieur/extérieur, et de l\'installation.\n\n💡 **Gammes typiques :**\n- Intérieur fin (P1.2-P1.8): 800-2 500 $/m²\n- Extérieur (P3-P10): 400-1 200 $/m²\n- COB ultra-fin (P0.7-P1.2): 2 000-5 000 $/m²',
      ar: 'يعتمد السعر على عدة عوامل: كثافة البكسل، الحجم، داخلي/خارجي، والتركيب.\n\n💡 **النطاقات النموذجية:**\n- داخلي دقيق (P1.2-P1.8): $800-2,500/م²\n- خارجي (P3-P10): $400-1,200/م²\n- COB فائق الدقة (P0.7-P1.2): $2,000-5,000/م²',
    },
  },
  {
    keywords: ['pixel pitch', 'p0.7', 'p0.9', 'p1.2', 'p1.5', 'p2.5', 'p3', 'p4', 'p5', 'p10', 'resolution', 'pitch'],
    answer: {
      en: '**Pixel Pitch** is the distance between LED pixel centers (in mm). Smaller = higher resolution.\n\n📐 **Guide by application:**\n| Pitch | Best For | Viewing Distance |\n|-------|----------|------------------|\n| P0.7-P0.9 | Control Rooms, broadcast | 1-3m |\n| P1.2-P1.5 | Corporate, retail | 2-5m |\n| P1.8-P2.5 | Conference rooms, lobbies | 3-8m |\n| P3-P4 | Indoor large venue | 5-15m |\n| P5-P10 | Outdoor billboard, stadium | 10m+ |\n\nRule of thumb: **minimum viewing distance (m) ≈ pixel pitch (mm) × 1.5**',
      zh: '**像素间距**是 LED 像素中心之间的距离（毫米）。越小 = 分辨率越高。\n\n📐 **应用指南：**\n- P0.7-P0.9: Control Rooms、广播\n- P1.2-P1.5: 企业、Retail\n- P1.8-P2.5: 会议室、大厅\n- P3-P4: 室内大型场馆\n- P5-P10: 户外广告牌、体育场',
      es: '**Pixel Pitch** es la distancia entre centros de píxeles LED (en mm). Menor = mayor resolución.\n\n📐 **Guía:**\n- P0.7-P0.9: Control Rooms, broadcast\n- P1.2-P1.5: Corporativo, Retail\n- P1.8-P2.5: Salas de conferencias\n- P3-P10: Exterior, estadios',
      fr: '**Pixel Pitch** est la distance entre les centres de pixels LED (en mm). Plus petit = meilleure résolution.\n\n📐 **Guide :**\n- P0.7-P0.9: Control Rooms, broadcast\n- P1.2-P1.5: Corporate, Retail\n- P1.8-P2.5: Salles de conférence\n- P3-P10: Extérieur, stades',
      ar: '**كثافة البكسل** هي المسافة بين مراكز البكسل LED (بالمم). أصغر = دقة أعلى.\n\n📐 **دليل التطبيق:**\n- P0.7-P0.9: Control Rooms، البث\n- P1.2-P1.5: Corporate، Retail\n- P1.8-P2.5: قاعات المؤتمرات\n- P3-P10: خارجي، ملاعب',
    },
  },
  {
    keywords: ['indoor', 'indoor display', 'interior', 'fine pitch', 'داخلي', '室内'],
    answer: {
      en: 'Our **Indoor LED Display** range offers:\n\n• **Fine pixel pitch**: P0.7 to P2.5 for crystal-clear visuals\n• **High refresh rate**: 3840Hz+ for flicker-free video capture\n• **Low brightness options**: 100-1200 nits for comfortable viewing\n• **Front/rear serviceability**: Easy maintenance access\n• **Seamless design**: Cabinet-to-cabinet gap < 0.1mm\n\n**Popular applications:** Corporate lobbies, conference rooms, retail stores, museums, broadcast studios, and Control Rooms.\n\nAll indoor displays come with a **3-year warranty** and 24/7 remote monitoring capability.',
      zh: '我们的**室内 LED 显示屏**系列提供：\n\n• **细像素间距**: P0.7 至 P2.5\n• **高刷新率**: 3840Hz+ 无闪烁\n• **低亮度选项**: 100-1200 尼特\n• **前/后维护**: 便捷维护\n• **无缝设计**: 箱体间隙 < 0.1mm\n\n所有室内显示屏附带 **3 年保修**。',
      es: 'Nuestra gama de **pantallas LED Interior** ofrece pixel pitch fino (P0.7-P2.5), alta tasa de refresco (3840Hz+), y diseño sin costuras. Garantía de 3 años.',
      fr: 'Notre gamme **LED Intérieur** offre un pas de pixel fin (P0.7-P2.5), taux de rafraîchissement élevé (3840Hz+), et design sans couture. Garantie 3 ans.',
      ar: 'مجموعة **شاشات LED الداخلية** لدينا توفر: كثافة بكسل دقيقة (P0.7-P2.5)، معدل تحديث عالي (3840Hz+)، وتصميم سلس. ضمان 3 سنوات.',
    },
  },
  {
    keywords: ['outdoor', 'exterior', 'weather', 'waterproof', 'brightness', 'خارجي', '户外'],
    answer: {
      en: 'Our **Outdoor LED Displays** are built to withstand harsh environments:\n\n• **IP65/IP68 rated**: Full weather protection\n• **High brightness**: 5,000-10,000 nits for direct sunlight readability\n• **Wide temperature range**: -30°C to +60°C\n• **Anti-corrosion**: Marine-grade materials available\n• **Energy efficient**: Smart brightness sensors reduce power by 40%\n\n**Popular pixel pitches:** P3, P4, P5, P6, P8, P10\n\n**Applications:** Billboard advertising (DOOH), stadium perimeters, building facades, transportation signage, and gas station totems.',
      zh: '我们的**户外 LED 显示屏**经受严苛环境考验：\n\n• **IP65/IP68 防护等级**: 全天候保护\n• **高亮度**: 5,000-10,000 尼特\n• **宽温度范围**: -30°C 至 +60°C\n• **节能**: 智能亮度传感器降低 40% 功耗',
      es: 'Nuestras **pantallas LED Exterior** soportan ambientes severos: IP65/IP68, 5,000-10,000 nits, rango de temperatura -30°C a +60°C.',
      fr: 'Nos **écrans LED Extérieurs** résistent aux environnements difficiles : IP65/IP68, 5 000-10 000 nits, -30°C à +60°C.',
      ar: '**شاشات LED الخارجية** مصممة لتحمل البيئات القاسية: حماية IP65/IP68، سطوع 5,000-10,000 شمعة، نطاق حرارة -30°C إلى +60°C.',
    },
  },
  {
    keywords: ['rental', 'stage', 'event', 'touring', 'concert', 'festival', 'تأجير', '租赁'],
    answer: {
      en: 'Our **Rental & Touring LED Displays** are designed for live events:\n\n• **Ultra-lightweight**: From 4.5 kg/panel for easy rigging\n• **Quick-lock system**: Setup in minutes, no tools required\n• **Curve-capable**: ±15° angle adjustment per panel\n• **Road-ready**: Flight-case packaging included\n• **Hot-swappable modules**: Replace any module on-site in 30 seconds\n\n**Available pitches:** P2.6, P2.9, P3.9, P4.8\n\nPerfect for concerts, festivals, corporate events, trade shows, and broadcast backdrops. We also offer **rental partnership programs** for AV companies.',
      zh: '我们的 **Rental 巡演 LED 显示屏**专为现场活动设计：\n\n• **超轻量**: 从 4.5 公斤/面板\n• **快速锁定系统**: 几分钟完成安装\n• **可弯曲**: 每面板 ±15° 角度调节\n• **热插拔模组**: 现场 30 秒更换',
      es: 'Nuestras **pantallas Rental y giras** están diseñadas para eventos en vivo: ultra-ligeras (4.5 kg/panel), sistema de bloqueo rápido, curvatura ±15°.',
      fr: 'Nos **écrans Rental et tournée** sont conçus pour les événements : ultra-légers (4,5 kg/panneau), système de verrouillage rapide, courbure ±15°.',
      ar: '**شاشات Rental والجولات** مصممة للفعاليات الحية: خفيفة جداً (4.5 كجم/لوحة)، نظام قفل سريع، انحناء ±15°.',
    },
  },
  {
    keywords: ['warranty', 'support', 'maintenance', 'repair', 'service', 'ضمان', '保修'],
    answer: {
      en: 'VEXALED provides comprehensive after-sales support:\n\n🛡️ **Warranty:**\n• Standard: 3 years (parts + labor)\n• Extended: Up to 5 years available\n• COB displays: 5-year warranty standard\n\n🔧 **Support Services:**\n• 24/7 remote technical support\n• On-site engineering within 48 hours (major markets)\n• Spare parts inventory in regional hubs\n• Preventive maintenance programs\n• Remote diagnostics & monitoring\n\n📞 **Contact:** support@vexaled.com or reach our engineers through the chat.',
      zh: 'VEXALED 提供全面的售后支持：\n\n🛡️ **保修：** 标准 3 年，可延长至 5 年。COB 显示屏标配 5 年保修。\n\n🔧 **支持服务：** 24/7 远程技术支持，48 小时现场工程服务，区域备件库存。',
      es: 'VEXALED ofrece soporte completo: garantía de 3 años (extendible a 5), soporte técnico 24/7, servicio en sitio en 48 horas.',
      fr: 'VEXALED offre un support complet : garantie 3 ans (extensible à 5), support technique 24/7, intervention sur site en 48h.',
      ar: 'VEXALED توفر دعم شامل: ضمان 3 سنوات (قابل للتمديد إلى 5)، دعم تقني 24/7، خدمة ميدانية خلال 48 ساعة.',
    },
  },
  {
    keywords: ['install', 'installation', 'mount', 'mounting', 'setup', 'تركيب', '安装'],
    answer: {
      en: 'VEXALED offers professional installation services:\n\n📋 **Installation Process:**\n1. **Site survey** — Our engineers assess your location\n2. **Structural design** — Custom mounting solutions\n3. **Delivery & logistics** — White-glove shipping worldwide\n4. **Installation** — Certified technicians on-site\n5. **Calibration** — Color & brightness optimization\n6. **Training** — Staff training on operation & maintenance\n\n**Mounting options:** Wall-mount, ceiling-hang, floor-standing, curved, freestanding totems, and custom structures.\n\nWe handle everything from permits to final commissioning.',
      zh: '安装流程：现场勘察 → 结构设计 → 物流配送 → 安装 → 校准 → 培训。\n\n安装方式：壁挂、吊装、落地、曲面、独立式、定制结构。',
      es: 'Proceso: inspección del sitio → diseño → logística → instalación → calibración → capacitación. Opciones: pared, techo, piso, curvada.',
      fr: 'Processus : visite du site → conception → logistique → installation → calibration → formation. Options : mural, suspendu, sur pied, courbe.',
      ar: 'العملية: مسح الموقع ← التصميم ← اللوجستيات ← التركيب ← المعايرة ← التدريب. خيارات: حائطي، معلق، أرضي، منحني.',
    },
  },
  {
    keywords: ['dooh', 'digital out of home', 'billboard', 'advertising', 'signage', 'إعلان', '广告'],
    answer: {
      en: 'Our **DOOH (Digital Out-of-Home)** solutions are purpose-built for advertising:\n\n• **High brightness**: 6,000-10,000 nits for any lighting condition\n• **Remote content management**: Cloud-based CMS included\n• **24/7 operation**: Designed for continuous use\n• **Smart scheduling**: Dayparting & audience targeting\n• **Energy saving**: Auto-brightness + sleep mode = 40% power savings\n\n**Formats:** Billboard, street furniture, transit shelters, building wraps, window displays, and interactive kiosks.\n\n**ROI tools:** We provide audience measurement integration and campaign analytics.',
      zh: '我们的 **DOOH** 解决方案专为广告打造：高亮度 6,000-10,000 尼特，云端 CMS，24/7 运行，智能排程，节能 40%。',
      es: 'Nuestras soluciones **DOOH** están diseñadas para publicidad: 6,000-10,000 nits, CMS en la nube, operación 24/7, ahorro energético del 40%.',
      fr: 'Nos solutions **DOOH** pour la publicité : 6 000-10 000 nits, CMS cloud, fonctionnement 24/7, économie d\'énergie 40%.',
      ar: 'حلول **DOOH** للإعلان: سطوع 6,000-10,000 شمعة، نظام إدارة محتوى سحابي، تشغيل 24/7، توفير طاقة 40%.',
    },
  },
  {
    keywords: ['xr', 'virtual production', 'vp', 'xr&vp', 'film', 'broadcast', 'studio', 'volume', 'إنتاج', '虚拟'],
    answer: {
      en: 'Our **xR&VP (Extended Reality & Virtual Production)** LED volumes deliver:\n\n• **Ultra-low latency**: < 1 frame delay for real-time rendering\n• **High refresh rate**: 7680Hz for artifact-free camera capture\n• **Color accuracy**: DCI-P3 color gamut, ΔE < 1\n• **Curved configurations**: Seamless concave/convex setups\n• **Genlock support**: Frame-accurate sync with camera systems\n\n**Compatible with:** Unreal Engine, Disguise, Brompton, Megapixel VR\n\nUsed by major studios for film, TV, commercials, and live broadcast. Our engineering team provides on-set technical support.',
      zh: '我们的 **xR&VP** LED 方案提供：超低延迟 < 1 帧，高刷新率 7680Hz，DCI-P3 色域，Genlock 支持。兼容 Unreal Engine、Disguise 等。',
      es: 'Nuestros volúmenes **xR&VP** ofrecen: latencia ultra-baja < 1 frame, 7680Hz, gamut DCI-P3, soporte Genlock.',
      fr: 'Nos volumes **xR&VP** : latence ultra-faible < 1 image, 7680Hz, gamut DCI-P3, support Genlock.',
      ar: 'أحجام **xR&VP** لدينا: تأخر فائق الانخفاض < 1 إطار، 7680Hz، نطاق لوني DCI-P3، دعم Genlock.',
    },
  },
  {
    keywords: ['control room', 'command center', 'monitoring', 'mission critical', '控制室'],
    answer: {
      en: 'Our **Control Room** solutions are designed for 24/7 mission-critical environments:\n\n• **Ultra-fine pitch**: P0.7-P1.2 for close-viewing clarity\n• **COB technology**: No dead pixels, 100,000+ hour lifespan\n• **0% black screen**: Redundant power & signal backup\n• **Low blue light**: Reduces eye fatigue for operators\n• **7×24 rated**: Designed for continuous operation\n\n**Industries:** Emergency response, traffic management, utilities, military, broadcast monitoring, and financial trading floors.',
      zh: '**Control Room** 解决方案：P0.7-P1.2 超细间距，COB 技术，0% 黑屏冗余，低蓝光，7×24 连续运行。',
      es: 'Soluciones **Control Rooms**: P0.7-P1.2, tecnología COB, redundancia 0% pantalla negra, operación 24/7.',
      fr: 'Solutions **Control Rooms** : P0.7-P1.2, technologie COB, 0% écran noir, fonctionnement 24/7.',
      ar: 'حلول **Control Rooms**: P0.7-P1.2، تقنية COB، تكرار 0% شاشة سوداء، تشغيل 24/7.',
    },
  },
  {
    keywords: ['about', 'company', 'vexaled', 'who', 'history', 'شركة', '公司'],
    answer: {
      en: '**VEXALED** is an LED display technology brand:\n\n• **Founded:** 2026\n• **Headquarters:** Foshan, Guangdong, China\n• **Team:** Industry veterans with 20+ years of combined LED display expertise\n• **Reach:** Projects delivered in 50+ countries\n• **Manufacturing:** ISO-certified production\n• **Certifications:** ISO 9001, CE, FCC, UL, RoHS\n\nWe specialize in COB and fine-pitch LED display technology and provide end-to-end solutions from design to installation and after-sales support.\n\n*"We Create, We Enjoy, We Share — We are VEXA."*',
      zh: '**VEXALED** 是一家 LED 显示技术品牌。成立于 2026 年，总部位于中国广东佛山。团队拥有 20 多年的 LED 显示技术经验，已在 50+ 国家交付项目，ISO 认证制造。',
      es: '**VEXALED** es una marca de tecnología LED. Fundada en 2026, con sede en Foshan, Guangdong, China. Equipo con más de 20 años de experiencia en pantallas LED, proyectos entregados en más de 50 países, fabricación certificada ISO.',
      fr: '**VEXALED** est une marque de technologie d\'affichage LED. Fondée en 2026, basée à Foshan, Guangdong, Chine. Équipe forte de plus de 20 ans d\'expertise LED, projets livrés dans plus de 50 pays, fabrication certifiée ISO.',
      ar: '**VEXALED** علامة تجارية لتقنية شاشات LED. تأسست عام 2026، مقرها فوشان، قوانغدونغ، الصين. فريق يمتلك أكثر من 20 عامًا من الخبرة في شاشات LED، مشاريع منجزة في أكثر من 50 دولة، تصنيع معتمد ISO.',
    },
  },
  {
    keywords: ['shipping', 'delivery', 'lead time', 'how long', 'timeline', 'توصيل', '交付'],
    answer: {
      en: '**Delivery timelines:**\n\n• **Standard products:** 15-25 business days after order confirmation\n• **Custom configurations:** 25-40 business days\n• **Rental series:** Usually in stock, 5-10 days\n• **Urgent orders:** Express manufacturing available (surcharge applies)\n\n🚢 **Shipping:** We handle global logistics with DDP/CIF/FOB terms. Regional warehouses in Dubai, Los Angeles, and Amsterdam for faster delivery.\n\nAll shipments include insurance and real-time tracking.',
      zh: '**交付时间：** 标准产品 15-25 工作日，定制 25-40 工作日，Rental 系列通常有库存 5-10 天。迪拜、洛杉矶、阿姆斯特丹设有区域仓库。',
      es: 'Estándar: 15-25 días, personalizado: 25-40 días, Rental: 5-10 días en stock. Almacenes en Dubái, LA, Ámsterdam.',
      fr: 'Standard : 15-25 jours, personnalisé : 25-40 jours, Rental : 5-10 jours. Entrepôts à Dubaï, LA, Amsterdam.',
      ar: 'التسليم: قياسي 15-25 يوم، مخصص 25-40 يوم، Rental 5-10 أيام. مستودعات في دبي ولوس أنجلوس وأمستردام.',
    },
  },
  {
    keywords: ['curved', 'creative', 'flexible', 'transparent', 'special', 'custom shape', 'منحني', '曲面'],
    answer: {
      en: 'Our **Creative & Curved LED Displays** enable unique visual experiences:\n\n• **Flexible curvature**: Concave, convex, S-curve, and 360° cylinder\n• **Transparent LED**: 60-85% transparency for glass facades\n• **Custom shapes**: Spheres, ribbons, rings, and freeform\n• **Lightweight modules**: Easy to create any geometry\n• **Seamless joints**: Invisible module boundaries\n\n**Applications:** Retail flagship stores, museums, architectural landmarks, stage design, and immersive installations.',
      zh: '**创意和曲面 LED 显示屏**：灵活弯曲（凹面、凸面、S 曲线、360° 圆柱），透明 LED（60-85% 透明度），自定义形状。',
      es: 'Pantallas **curvas y creativas**: curvatura flexible, LED transparente (60-85%), formas personalizadas.',
      fr: 'Écrans **courbes et créatifs** : courbure flexible, LED transparent (60-85%), formes personnalisées.',
      ar: 'شاشات **منحنية وإبداعية**: انحناء مرن، LED شفاف (60-85%)، أشكال مخصصة.',
    },
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'talk', 'human', 'agent', 'اتصل', '联系'],
    answer: {
      en: 'You can reach the VEXALED team through:\n\n📧 **Sales:** sales@vexaled.com\n📧 **General:** info@vexaled.com\n📧 **Support:** support@vexaled.com\n\n🏢 **Headquarters:** Foshan, Guangdong, China — with global delivery to projects in 50+ countries.\n\nOr use the **"Talk to an Engineer"** button on our website for immediate assistance. Our team typically responds within 24 hours.',
      zh: '联系 VEXALED：\n📧 sales@vexaled.com\n📧 info@vexaled.com\n\n总部：中国广东佛山 — 项目交付覆盖 50+ 国家。',
      es: 'Contacto: sales@vexaled.com, info@vexaled.com. Sede: Foshan, Guangdong, China — proyectos entregados en más de 50 países.',
      fr: 'Contact : sales@vexaled.com, info@vexaled.com. Siège : Foshan, Guangdong, Chine — projets livrés dans plus de 50 pays.',
      ar: 'اتصل بنا: sales@vexaled.com، info@vexaled.com. المقر: فوشان، قوانغدونغ، الصين — مشاريع منجزة في أكثر من 50 دولة.',
    },
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'hola', 'bonjour', 'مرحبا', '你好', 'salut'],
    answer: {
      en: 'Hello! 👋 Welcome to VEXALED. I\'m here to help you with:\n\n• **Product information** — LED Screens, Puck Lights, Wash Lights, Moving Heads\n• **Technical specifications** — Resolution, brightness, beam angle\n• **Pricing guidance** — Budget ranges for your project\n• **Installation** — Setup process and requirements\n• **Support** — Warranty, maintenance, and service\n\nWhat would you like to know about?',
      zh: '您好！👋 欢迎来到 VEXALED。我可以帮助您了解：产品信息、技术规格、价格指导、安装和支持。请问有什么需要？',
      es: '¡Hola! 👋 Bienvenido a VEXALED. Puedo ayudarle con: información de productos, especificaciones, precios, instalación y soporte.',
      fr: 'Bonjour ! 👋 Bienvenue chez VEXALED. Je peux vous aider avec : produits, spécifications, prix, installation et support.',
      ar: 'مرحباً! 👋 أهلاً بكم في VEXALED. يمكنني مساعدتكم في: معلومات المنتجات، المواصفات، الأسعار، التركيب والدعم.',
    },
  },
];

// Find the best matching FAQ entry based on keyword overlap
export function findBestMatch(query: string): FAQEntry | null {
  const normalizedQuery = query.toLowerCase().trim();
  
  let bestMatch: FAQEntry | null = null;
  let bestScore = 0;

  for (const entry of faqDatabase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        // Longer keyword matches are more specific and should score higher
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestScore > 0 ? bestMatch : null;
}

// Generate a fallback response when no FAQ matches
export function getFallbackResponse(lang: string): string {
  const fallbacks: Record<string, string> = {
    en: 'I appreciate your question! While I don\'t have a specific answer for that, I can help you with:\n\n• **Products** — LED Screens, Puck Lights, Wash Lights, Moving Heads\n• **Specifications** — Resolution, brightness, beam angle\n• **Pricing** — Budget guidance for your project\n• **Installation & Support** — Setup, warranty, maintenance\n• **Company info** — About VEXALED, global offices\n\nTry asking about any of these topics, or use the **"Talk to an Engineer"** button for specialized assistance.',
    zh: '感谢您的提问！我可以帮助您了解：产品（COB、室内、户外、Rental LED 显示屏）、规格、价格、安装和支持。请尝试询问这些话题。',
    es: 'Gracias por su pregunta. Puedo ayudarle con: productos LED, especificaciones, precios, instalación y soporte. Intente preguntar sobre estos temas.',
    fr: 'Merci pour votre question. Je peux vous aider avec : produits LED, spécifications, prix, installation et support.',
    ar: 'شكراً لسؤالك! يمكنني مساعدتك في: منتجات LED، المواصفات، الأسعار، التركيب والدعم. جرب السؤال عن هذه المواضيع.',
  };
  return fallbacks[lang] || fallbacks.en;
}
