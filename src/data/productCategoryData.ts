import ledScreenImg from '@/assets/products/led-screen/hero.png';
import ledPosterImg from '@/assets/products/led-screen/hero.png';

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  application: string;
  pixelPitch: string;
}

export interface CategoryData {
  title: string;
  heroImage: string;
  heroSubtitle: string;
  products: Product[];
}

// NEW CATEGORIES
const categories: Record<string, CategoryData> = {
  'led-screen': {
    title: 'LED Screen',
    heroImage: ledScreenImg,
    heroSubtitle: 'High-quality LED display screens for various applications',
    products: [
      { id: 'led-5', slug: 'vx-led-poster', name: 'VX-LED Poster', image: ledPosterImg, application: 'advertising', pixelPitch: 'fine' },
    ],
  },
};

// OLD CATEGORIES - PRESERVED FOR FUTURE USE
/*
const categoriesLegacy: Record<string, CategoryData> = {
  cob: {
    title: 'COB LED',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop',
    heroSubtitle: 'Next-generation Chip-on-Board display technology',
    products: [
      { id: '1', slug: 'vx-cob-elite', name: 'VX COB Elite', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=750&fit=crop', application: 'corporate', pixelPitch: 'fine' },
      { id: '2', slug: 'vx-cob-pro', name: 'VX COB Pro', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=750&fit=crop', application: 'broadcast', pixelPitch: 'fine' },
    ],
  },
  indoor: {
    title: 'Indoor LED',
    heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&h=1080&fit=crop',
    heroSubtitle: 'Fine-pitch displays for interior applications',
    products: [
      { id: '3', slug: 'vx-fine-pitch', name: 'VX Fine Pitch', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=750&fit=crop', application: 'corporate', pixelPitch: 'fine' },
      { id: '4', slug: 'vx-vp-studio', name: 'VX VP Studio', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=750&fit=crop', application: 'broadcast', pixelPitch: 'standard' },
    ],
  },
  outdoor: {
    title: 'Outdoor LED',
    heroImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&h=1080&fit=crop',
    heroSubtitle: 'Weather-resistant high-brightness solutions',
    products: [
      { id: '5', slug: 'vx-outdoor-pro', name: 'VX Outdoor Pro', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=750&fit=crop', application: 'advertising', pixelPitch: 'standard' },
      { id: '6', slug: 'vx-billboard-pro', name: 'VX Billboard Pro', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=750&fit=crop', application: 'advertising', pixelPitch: 'coarse' },
      { id: '7', slug: 'vx-stadium', name: 'VX Stadium', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=750&fit=crop', application: 'sports', pixelPitch: 'coarse' },
    ],
  },
  rental: {
    title: 'Rental & Stage',
    heroImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=1080&fit=crop',
    heroSubtitle: 'Lightweight touring-ready panels',
    products: [
      { id: '8', slug: 'vx-rental-tour', name: 'VX Rental Tour', image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=750&fit=crop', application: 'events', pixelPitch: 'standard' },
      { id: '9', slug: 'vx-flex', name: 'VX Flex', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=750&fit=crop', application: 'events', pixelPitch: 'standard' },
    ],
  },
};
*/

export function getProductCategories(): Record<string, CategoryData> {
  return categories;
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
