import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/i18n/LanguageContext';

import hotelLobby from '@/assets/scenarios/hotel-lobby.jpg';
import educationCenter from '@/assets/scenarios/education-center.jpg';
import showroom from '@/assets/scenarios/showroom.jpg';
import outdoorBillboard from '@/assets/scenarios/outdoor-billboard.jpg';
import concertStage from '@/assets/scenarios/concert-stage.jpg';

// Category keywords — NOT translated
const categories = ['Commercial', 'Indoor', 'Outdoor', 'Rental', 'DOOH'] as const;
type Category = typeof categories[number];

interface ScenarioData {
  id: string;
  image: string;
  category: Category;
}

const scenarios: ScenarioData[] = [
  { id: 'c1', image: hotelLobby, category: 'Commercial' },
  { id: 'c2', image: showroom, category: 'Commercial' },
  { id: 'c3', image: educationCenter, category: 'Commercial' },
  { id: 'c4', image: outdoorBillboard, category: 'Commercial' },
  { id: 'c5', image: concertStage, category: 'Commercial' },
  { id: 'i1', image: educationCenter, category: 'Indoor' },
  { id: 'i2', image: showroom, category: 'Indoor' },
  { id: 'i3', image: hotelLobby, category: 'Indoor' },
  { id: 'i4', image: outdoorBillboard, category: 'Indoor' },
  { id: 'i5', image: concertStage, category: 'Indoor' },
  { id: 'o1', image: outdoorBillboard, category: 'Outdoor' },
  { id: 'o2', image: concertStage, category: 'Outdoor' },
  { id: 'o3', image: showroom, category: 'Outdoor' },
  { id: 'o4', image: hotelLobby, category: 'Outdoor' },
  { id: 'o5', image: educationCenter, category: 'Outdoor' },
  { id: 'r1', image: concertStage, category: 'Rental' },
  { id: 'r2', image: outdoorBillboard, category: 'Rental' },
  { id: 'r3', image: showroom, category: 'Rental' },
  { id: 'r4', image: hotelLobby, category: 'Rental' },
  { id: 'r5', image: educationCenter, category: 'Rental' },
  { id: 'd1', image: outdoorBillboard, category: 'DOOH' },
  { id: 'd2', image: showroom, category: 'DOOH' },
  { id: 'd3', image: hotelLobby, category: 'DOOH' },
  { id: 'd4', image: educationCenter, category: 'DOOH' },
  { id: 'd5', image: concertStage, category: 'DOOH' },
];

const getCategoryScenarios = (category: Category): ScenarioData[] => scenarios.filter(s => s.category === category);

function ScenarioCard({ scenario, index, title }: { scenario: ScenarioData; index: number; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex-shrink-0 snap-start"
    >
      <div className="group relative h-[280px] w-[320px] overflow-hidden rounded-xl cursor-pointer sm:w-[360px] md:h-[320px] md:w-[400px]">
        <img src={scenario.image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white text-sm md:text-base font-medium leading-snug">{title}</h3>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Commercial');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  };

  const displayedScenarios = getCategoryScenarios(activeCategory);
  const scenarioTitles = t.scenarios.scenarioTitles[activeCategory] || [];

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: "#F5F5F3" }}>
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-['Syne'] text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight" style={{ color: "#1A1D21" }}>
            {t.scenarios.title}
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: "#525A65" }}>
            {t.scenarios.subtitle}
          </p>

          <Button
            variant="outline"
            className="rounded-full px-10 py-3 text-sm font-medium border-[#1A1D21] bg-transparent text-[#1A1D21] hover:bg-[#1A1D21] hover:text-white transition-all duration-300 mb-10"
          >
            {t.scenarios.viewMore}
          </Button>

          {/* Category tabs — keywords, NOT translated */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`relative text-sm md:text-base tracking-wide transition-colors duration-300 pb-2 whitespace-nowrap ${
                  activeCategory === category ? 'text-[#1A1D21]' : 'text-[#8A8F96] hover:text-[#525A65]'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.div layoutId="scenarioUnderline" className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#C4A052]" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative w-screen mt-12" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 md:w-24" style={{ background: 'linear-gradient(to right, #F5F5F3, transparent)' }} />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 md:w-24" style={{ background: 'linear-gradient(to left, #F5F5F3, transparent)' }} />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`scrollbar-hide flex gap-5 overflow-x-auto scroll-smooth px-6 pb-4 md:gap-6 md:px-12 lg:px-24 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {displayedScenarios.map((scenario, index) => (
            <ScenarioCard key={scenario.id} scenario={scenario} index={index} title={scenarioTitles[index] || ''} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center md:hidden">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: "#8A8F96" }}>
          <span>{t.scenarios.swipeHint}</span>
          <span className="animate-pulse">→</span>
        </div>
      </div>
    </section>
  );
}
