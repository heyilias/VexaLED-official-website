import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { marketCubeConfig } from '../config';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface CubeProps {
  rotationProgress: number;
}

const Cube = ({ rotationProgress }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const textures = useTexture(marketCubeConfig.cubeTextures);
  const cubeSize = Math.min(viewport.width * 0.4, 3);

  useFrame(() => {
    if (meshRef.current) {
      const targetRotationY = rotationProgress * Math.PI * 2;
      const targetRotationX = Math.sin(rotationProgress * Math.PI) * 0.3;

      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial key={index} attach={`material-${index}`} map={texture} roughness={0.2} metalness={0.1} />
      ))}
    </mesh>
  );
};

const MarketCube = () => {
  const { t } = useLanguage();
  const markets = t.marketCube.markets;
  const isEmpty = markets.length === 0 || marketCubeConfig.cubeTextures.length === 0;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [currentMarketIndex, setCurrentMarketIndex] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current || isEmpty) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setRotationProgress(progress);

        const marketIndex = Math.min(
          Math.floor(progress * markets.length),
          markets.length - 1
        );
        setCurrentMarketIndex(marketIndex);

        const velocity = Math.abs(self.getVelocity());
        const targetBlur = Math.min(velocity / 500, 8);
        const targetSpacing = Math.min(velocity / 100, 30);

        setBlurAmount((prev) => prev + (targetBlur - prev) * 0.2);
        setLetterSpacing((prev) => prev + (targetSpacing - prev) * 0.2);
      },
    });

    scrollTriggerRef.current = st;
    return () => { st.kill(); };
  }, [isEmpty, markets.length]);

  if (isEmpty) return null;

  const currentMarket = markets[currentMarketIndex];

  return (
    <section
      id="market"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#0a0a0f' }}
    >
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          filter: `blur(${blurAmount}px)`,
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <h2 className="font-display text-[20vw] text-foreground/5 uppercase whitespace-nowrap select-none">
          {currentMarket.subtitle}
        </h2>
      </div>

      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} color="#D4FF00" />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#D4FF00" />
            <Cube rotationProgress={rotationProgress} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-12 left-12 z-20">
        <p className="font-tech text-xs text-primary/60 uppercase tracking-wider mb-2">
          Market {String(currentMarketIndex + 1).padStart(2, '0')} / {String(markets.length).padStart(2, '0')}
        </p>
        <h3
          className="font-display text-5xl md:text-7xl text-foreground mb-2 transition-all duration-300 font-bold uppercase"
          style={{
            textShadow: '0 2px 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05), 0 4px 8px rgba(0,0,0,0.3)',
            WebkitTextStroke: '0.5px rgba(255,255,255,0.08)',
          }}
        >
          {currentMarket.title}
        </h3>
        <p className="font-tech text-sm text-foreground/50">{currentMarket.subtitle}</p>
      </div>

      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {markets.map((_, index) => (
            <div
              key={index}
              className={`w-2 rounded-full transition-all duration-300 ${
                index === currentMarketIndex ? 'h-8 bg-primary' : 'h-2 bg-foreground/20'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 right-12 z-20">
        <p className="font-tech text-xs text-foreground/40 uppercase tracking-wider">
          {t.marketCube.scrollHint}
        </p>
      </div>

      <div className="absolute top-12 left-12 w-20 h-px bg-gradient-to-r from-primary/50 to-transparent" />
      <div className="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-primary/50 to-transparent" />
    </section>
  );
};

export default MarketCube;
