import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

import cobDisplay from '@/assets/products/cob-display.jpg';
import rentalDisplay from '@/assets/products/rental-display.png';
import curvedDisplay from '@/assets/products/curved-display.jpg';

const productImages = [cobDisplay, rentalDisplay, curvedDisplay];
const productLinks = ['/products/cob', '/products/rental', '/products/creative'];

interface ProductCardProps {
  image: string;
  title: string;
  tag: string;
  description: string;
  link: string;
  index: number;
  isInView: boolean;
}

function ProductCard({ image, title, tag, description, link, index, isInView }: ProductCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15 }}>
      <Link to={link} className="group relative block h-[420px] overflow-hidden rounded-xl border border-border/30 bg-card shadow-lg transition-all duration-[450ms] ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/[0.03]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
        <div className="absolute right-4 top-4 z-10 flex h-10 w-10 scale-90 items-center justify-center rounded-full border border-white/20 bg-white/10 opacity-0 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-hover:border-primary/30 group-hover:bg-white/15">
          <ArrowUpRight className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-primary" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <span className="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">{tag}</span>
          <h3 className="mb-2 font-display text-xl font-semibold tracking-tight text-white">{title}</h3>
          <p className="text-sm leading-relaxed text-white/70">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  return (
    <section id="products" ref={ref} className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-primary">{t.productCategories.tag}</span>
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">{t.productCategories.title}</h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">{t.productCategories.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.productCategories.products.map((product, index) => (
            <ProductCard
              key={index}
              image={productImages[index]}
              title={product.title}
              tag={product.tag}
              description={product.description}
              link={productLinks[index]}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
