import xrImage from "@/assets/markets/xr-virtual-production.jpg";
import rentalImage from "@/assets/markets/rental-events.jpg";
import controlRoomsImage from "@/assets/markets/control-rooms.jpg";
import retailImage from "@/assets/markets/retail-experience.jpg";
import corporateImage from "@/assets/markets/corporate-spaces.jpg";
import doohImage from "@/assets/markets/dooh-public.jpg";

import concertImage from "@/assets/scenarios/concert-stage.jpg";
import educationImage from "@/assets/scenarios/education-center.jpg";
import hotelImage from "@/assets/scenarios/hotel-lobby.jpg";
import outdoorImage from "@/assets/scenarios/outdoor-billboard.jpg";
import showroomImage from "@/assets/scenarios/showroom.jpg";

import vexaledLogo from "@/assets/vexaled-logo-full.png";

export const marketCubeConfig = {
  cubeTextures: [
    xrImage,
    rentalImage,
    controlRoomsImage,
    retailImage,
    corporateImage,
    doohImage,
  ],
  markets: [
    { id: 1, title: "Commercial", subtitle: "Professional Display" },
    { id: 2, title: "Indoor", subtitle: "Fine Pitch Solutions" },
    { id: 3, title: "Outdoor", subtitle: "High Brightness" },
    { id: 4, title: "Rental & Stage", subtitle: "Live Events" },
    { id: 5, title: "DOOH", subtitle: "Digital Out of Home" },
  ],
  scrollHint: "Scroll to explore markets",
};

export const parallaxGalleryConfig = {
  sectionLabel: "OUR PROJECTS",
  sectionTitle: "Gallery",
  parallaxImagesTop: [
    { id: 1, src: concertImage, alt: "Concert Stage LED" },
    { id: 2, src: retailImage, alt: "Retail Experience" },
    { id: 3, src: outdoorImage, alt: "Outdoor Billboard" },
    { id: 4, src: corporateImage, alt: "Corporate Space" },
    { id: 5, src: xrImage, alt: "Virtual Production" },
    { id: 6, src: showroomImage, alt: "Showroom Display" },
  ],
  parallaxImagesBottom: [
    { id: 7, src: hotelImage, alt: "Hotel Lobby" },
    { id: 8, src: educationImage, alt: "Education Center" },
    { id: 9, src: rentalImage, alt: "Rental Events" },
    { id: 10, src: controlRoomsImage, alt: "Control Room" },
    { id: 11, src: doohImage, alt: "DOOH Public" },
    { id: 12, src: concertImage, alt: "Concert Stage" },
  ],
  marqueeTexts: ["LED SOLUTIONS", "VISUAL EXCELLENCE", "GLOBAL REACH", "INNOVATION"],
  galleryLabel: "FEATURED WORK",
  galleryTitle: "Projects",
  galleryImages: [
    { id: 1, src: concertImage, title: "Concert Arena", date: "2024" },
    { id: 2, src: retailImage, title: "Retail Mall", date: "2024" },
    { id: 3, src: outdoorImage, title: "City Billboard", date: "2023" },
    { id: 4, src: corporateImage, title: "Corporate HQ", date: "2023" },
    { id: 5, src: showroomImage, title: "Showroom", date: "2024" },
    { id: 6, src: hotelImage, title: "Hotel Lobby", date: "2023" },
  ],
  endCtaText: "View All",
};

export const whyChooseConfig = {
  sectionLabel: "WHY CHOOSE US",
  sectionTitle: "Why Choose VexaLed",
  statCards: [
    {
      id: 1,
      icon: "award",
      value: "20+",
      label: "Years Experience",
      description: "Combined LED display engineering expertise",
    },
    {
      id: 2,
      icon: "globe",
      value: "500+",
      label: "Projects Delivered",
      description: "Successful installations worldwide",
    },
    {
      id: 3,
      icon: "map",
      value: "50+",
      label: "Countries Served",
      description: "Global delivery, local support",
    },
    {
      id: 4,
      icon: "shield",
      value: "ISO",
      label: "Certified",
      description: "Quality and environmental standards",
    },
  ],
  bottomNote: "Ready to transform your space with cutting-edge LED technology?",
  bottomCtaText: "Get Started",
};

export const footerConfig = {
  brandName: "VEXALED",
  heroTitle: "LET'S TALK",
  heroSubtitle: "ABOUT YOUR PROJECT",
  ctaButtonText: "CONTACT US",
  portraitImage: showroomImage,
  portraitAlt: "VexaLed showroom",
  companyLabel: "COMPANY",
  companyName: "VEXALED",
  companySubtitle: "Global LED Solutions Provider",
  logoImage: vexaledLogo,
  brandDescription:
    "Leading manufacturer of premium LED display solutions for commercial, entertainment, and architectural applications worldwide.",
  socialLinks: [
    { icon: "tiktok", href: "https://tiktok.com/@vexaled", label: "TikTok" },
    { icon: "instagram", href: "https://instagram.com/vexaled", label: "Instagram" },
    { icon: "x", href: "https://x.com/vexaled", label: "X" },
    { icon: "linkedin", href: "https://linkedin.com/company/vexaled", label: "LinkedIn" },
    { icon: "youtube", href: "https://youtube.com/@vexaled", label: "YouTube" },
    { icon: "facebook", href: "https://facebook.com/vexaled", label: "Facebook" },
  ],
  quickLinksTitle: "Quick Links",
  quickLinks: ["Products", "Markets", "Gallery", "About Us", "Contact"],
  contactTitle: "Contact",
  emailLabel: "Email",
  email: "alice@vexaled.com",
  phoneLabel: "Phone",
  phone: "+86 755 2345 6789",
  addressLabel: "Address",
  address: "Foshan, Guangzhou, China",
  ctaTitle: "Start a Project",
  ctaDescription: "Tell us about your LED display needs and get a custom quote.",
  subscribeAlertMessage: "Thank you for your interest! Our team will contact you shortly.",
  copyrightText: "© 2025 VexaLed. All rights reserved.",
  bottomLinks: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};
