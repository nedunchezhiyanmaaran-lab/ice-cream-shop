import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { IceCreamModel } from './IceCreamModel';
import type { FlavourConfig } from './IceCreamModel';
import { Sparkles } from 'lucide-react';
import { ScrollTrigger } from '../../utils/gsapConfig';

const FLAVOUR_OPTIONS: FlavourConfig[] = [
  {
    id: 'pistachio',
    name: 'Bronte Pistachio',
    topColor: '#93AD5C',
    accentColor: '#D7E4B5',
    tagline: 'Toasted volcanic nut & warm honey finish',
  },
  {
    id: 'strawberry',
    name: 'Wild Strawberry',
    topColor: '#DB6775',
    accentColor: '#E9A5A1',
    tagline: 'Macerated woodland berries & sweet cream',
  },
  {
    id: 'chocolate',
    name: 'Belgian Fondente',
    topColor: '#3A231C',
    accentColor: '#50352F',
    tagline: '72% Criollo single-origin dark cocoa',
  },
  {
    id: 'caramel',
    name: 'Salted Caramel',
    topColor: '#C88E48',
    accentColor: '#F4D88B',
    tagline: 'Guérande sea salt crystals & Brittany butter',
  },
];

export const IceCreamHeroCanvas: React.FC = () => {
  const [activeFlavour, setActiveFlavour] = useState<FlavourConfig>(FLAVOUR_OPTIONS[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webglSupported, setWebglSupported] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebglSupported(supported);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  // Pointer move handler (subtle 3D parallax)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  const handlePointerLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // ScrollTrigger integration
  useEffect(() => {
    const heroEl = document.querySelector('section');
    if (!heroEl) return;

    const trigger = ScrollTrigger.create({
      trigger: heroEl,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-w-[500px] mx-auto rounded-[2.5rem] overflow-hidden shadow-luxe bg-gradient-to-b from-warmWhite/80 via-cream-100/70 to-cream-200/90 border border-chocolate-500/10 p-2 select-none"
    >
      {/* 3D Canvas or Fallback */}
      {webglSupported ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-cream-200">
              <img
                src="/images/hero-three-scoop-coupe.jpg"
                alt="Artisanal Gelato"
                className="w-full h-full object-cover rounded-[2rem]"
              />
            </div>
          }
        >
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative cursor-grab active:cursor-grabbing">
            <Canvas
              shadows
              dpr={[1, 2]}
              camera={{ position: [0, 0.22, 5.9], fov: 36 }}
              gl={{ antialias: true, alpha: true }}
            >
              {/* Studio Lighting Setup */}
              <ambientLight intensity={0.9} color="#FAF2E8" />
              <directionalLight
                position={[4, 5, 4]}
                intensity={2.4}
                color="#FFF8EE"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <directionalLight
                position={[-4, 3, -3]}
                intensity={1.6}
                color="#E8F4D6" // Soft pistachio rim light
              />
              <pointLight position={[0, -2, 2]} intensity={0.4} color="#D7E4B5" />

              {/* 3D Model */}
              <IceCreamModel
                activeFlavour={activeFlavour}
                mousePos={mousePos}
                scrollProgress={scrollProgress}
              />
            </Canvas>

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-cream-300/40 via-transparent to-transparent pointer-events-none" />

            {/* 3D Interaction Hint Pill (Top Left) */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full cream-glass text-[10px] uppercase font-bold tracking-wider text-chocolate-800 shadow-sm pointer-events-none">
              <Sparkles className="w-3 h-3 text-butter-400" />
              <span>Interactive 3D Gelato</span>
            </div>

            {/* Bottom Flavour Status & Tasting Notes */}
            <div className="absolute bottom-16 sm:bottom-18 left-4 right-4 p-3 rounded-2xl cream-glass flex items-center justify-between text-chocolate-800 transition-all duration-300">
              <div className="min-w-0 pr-2">
                <p className="text-[10px] uppercase tracking-wider font-bold text-chocolate-600 flex items-center gap-1">
                  <span>Crown Scoop</span>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeFlavour.topColor }} />
                </p>
                <p className="font-serif text-sm font-semibold truncate text-chocolate-900">
                  {activeFlavour.name}
                </p>
                <p className="text-[11px] text-chocolate-600 font-sans truncate">
                  {activeFlavour.tagline}
                </p>
              </div>
              <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-pistachio-200/90 text-chocolate-900 shrink-0">
                Fresh Churn
              </span>
            </div>

            {/* Interactive Flavour Selector Bar (Docked at Bottom) */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 bg-warmWhite/90 backdrop-blur-md p-1.5 rounded-2xl border border-chocolate-500/10 shadow-md">
              <span className="text-[9px] uppercase font-bold tracking-widest text-chocolate-500 pl-1.5 hidden sm:inline">
                Tap Flavour:
              </span>
              <div className="flex items-center gap-1">
                {FLAVOUR_OPTIONS.map((f) => {
                  const isSelected = activeFlavour.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveFlavour(f)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all duration-300 ${
                        isSelected
                          ? 'bg-chocolate-800 text-cream-100 shadow-sm scale-102'
                          : 'text-chocolate-700 hover:bg-cream-200 hover:text-chocolate-900'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 border border-warmWhite/50"
                        style={{ backgroundColor: f.topColor }}
                      />
                      <span>{f.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Suspense>
      ) : (
        /* Static Image Fallback */
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-chocolate-100">
          <img
            src="/images/hero-three-scoop-coupe.jpg"
            alt="Silver coupe with artisanal scoops of pistachio, wild strawberry and dark chocolate"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
    </div>
  );
};
