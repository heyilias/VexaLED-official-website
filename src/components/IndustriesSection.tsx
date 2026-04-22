import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n/LanguageContext';

const newsItemsData = [
  { id: 'ise-2024', date: 'Jan 30 – Feb 2, 2024', location: 'Barcelona, Spain', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80' },
  { id: 'cob-launch', date: 'Dec 15, 2023', location: 'Shenzhen, China', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&q=80' },
  { id: 'dubai-project', date: 'Nov 28, 2023', location: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80' },
  { id: 'infocomm-2024', date: 'Jun 8 – 14, 2024', location: 'Las Vegas, USA', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80' },
  { id: 'sustainability', date: 'Oct 12, 2023', location: 'Global', image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&q=80' },
  { id: 'stadium-project', date: 'Sep 5, 2023', location: 'Seoul, South Korea', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80' },
  { id: 'led-china', date: 'Feb 22 – 24, 2024', location: 'Shenzhen, China', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80' },
  { id: 'retail-launch', date: 'Aug 18, 2023', location: 'Shanghai, China', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80' },
];

function NewsCard({ item, index, title, category }: { item: typeof newsItemsData[0]; index: number; title: string; category: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }} className="flex-shrink-0 snap-start">
      <Link to={`/news/${item.id}`} className="group relative block h-[340px] w-[300px] overflow-hidden rounded-xl border border-border/30 bg-card shadow-md transition-all duration-[450ms] ease-out hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl sm:w-[340px] md:h-[380px] md:w-[380px]">
        <div className="absolute inset-0 overflow-hidden">
          <img src={item.image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[450ms] ease-out group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6">
          <span className="mb-3 inline-block rounded-full bg-primary/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">{category}</span>
          <h3 className="mb-2 font-display text-lg font-semibold leading-tight tracking-tight text-white md:text-xl">{title}</h3>
          <p className="text-xs text-white/60 md:text-sm">{item.date} · {item.location}</p>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 transition-all duration-500 group-hover:border-primary/20" />
      </Link>
    </motion.div>
  );
}

export default function IndustriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => { if (!scrollRef.current) return; setIsDragging(true); setStartX(e.pageX - scrollRef.current.offsetLeft); setScrollLeft(scrollRef.current.scrollLeft); };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => { if (!isDragging || !scrollRef.current) return; e.preventDefault(); scrollRef.current.scrollLeft = scrollLeft - (e.pageX - scrollRef.current.offsetLeft - startX) * 1.5; };

  return (
    <section id="news" ref={ref} className="section-padding overflow-hidden bg-card/30">
      <div className="container-wide mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 px-6 md:px-0">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-primary">{t.news.tag}</span>
          <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">{t.news.title}</h2>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">{t.news.subtitle}</p>
        </motion.div>
      </div>

      <div className="relative w-screen" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent md:w-24" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent md:w-24" />
        <div ref={scrollRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className={`scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-6 pb-4 md:gap-6 md:px-12 lg:px-24 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} style={{ scrollSnapType: 'x mandatory' }}>
          {newsItemsData.map((item, index) => (
            <NewsCard
              key={item.id}
              item={item}
              index={index}
              title={t.news.items[index]?.title || ''}
              category={t.news.items[index]?.category || ''}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          <span>{t.news.swipeHint}</span>
          <span className="animate-pulse">→</span>
        </div>
      </div>
    </section>
  );
}
