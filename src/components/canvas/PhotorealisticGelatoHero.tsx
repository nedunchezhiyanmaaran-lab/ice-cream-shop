import React, { useState, useEffect, useRef } from 'react';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../../utils/gsapConfig';
import { Sparkles } from 'lucide-react';

export type ServingStyle = 'coupe' | 'plinth' | 'pint';

interface ServingData {
  id: ServingStyle;
  label: string;
  badge: string;
  image: string;
  alt: string;
  tagline: string;
}

const SERVING_OPTIONS: ServingData[] = [
  {
    id: 'coupe',
    label: 'Signature Coupe',
    badge: '3 Artisanal Scoops',
    image: '/images/hero-three-scoop-coupe.jpg',
    alt: 'Antique silver coupe with Bronte Pistachio, Wild Strawberry, and Dark Chocolate gelato on slate',
    tagline: 'Bronte Pistachio · Wild Strawberry · Dark Chocolate Drip',
  },
  {
    id: 'plinth',
    label: 'Sicilian Plinth',
    badge: 'Artisan Ceramic Bowl',
    image: '/images/real-pistachio-plinth.jpg',
    alt: 'Freshly whipped Bronte pistachio gelato in handcrafted ceramic bowl on sage stone plinth',
    tagline: 'Fresh Churned DOP Pistachio · Roasted Nuts · Floral Blossom',
  },
  {
    id: 'pint',
    label: 'Takeaway Pint',
    badge: 'CREAMÉ Small-Batch',
    image: '/images/creame-pint.jpg',
    alt: 'CREAMÉ homemade gelato designer takeaway pint with lid',
    tagline: 'Hand-Packed Atelier Pint · Made Fresh Daily',
  },
];

export const PhotorealisticGelatoHero: React.FC = () => {
  const [activeServing, setActiveServing] = useState<ServingStyle>('coupe');
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Record<ServingStyle, HTMLImageElement | null>>({
    coupe: null,
    plinth: null,
    pint: null,
  });

  // GSAP quickTo functions for smooth 60fps tilt
  const rotXTo = useRef<gsap.QuickToFunc | null>(null);
  const rotYTo = useRef<gsap.QuickToFunc | null>(null);
  const sheenXTo = useRef<gsap.QuickToFunc | null>(null);
  const sheenYTo = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !cardRef.current) return;

    rotXTo.current = gsap.quickTo(cardRef.current, 'rotationX', {
      duration: 0.6,
      ease: 'power2.out',
    });
    rotYTo.current = gsap.quickTo(cardRef.current, 'rotationY', {
      duration: 0.6,
      ease: 'power2.out',
    });

    if (sheenRef.current) {
      sheenXTo.current = gsap.quickTo(sheenRef.current, 'xPercent', {
        duration: 0.5,
        ease: 'power1.out',
      });
      sheenYTo.current = gsap.quickTo(sheenRef.current, 'yPercent', {
        duration: 0.5,
        ease: 'power1.out',
      });
    }
  }, []);

  // Handle switching between real photographic servings
  const handleSelectServing = (style: ServingStyle) => {
    if (style === activeServing) return;

    const currentImg = imageRefs.current[activeServing];
    const nextImg = imageRefs.current[style];

    if (currentImg && nextImg) {
      gsap.to(currentImg, {
        opacity: 0,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      gsap.fromTo(
        nextImg,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.6, ease: BRAND_EASE.smooth }
      );
    }

    setActiveServing(style);
  };

  // Cursor 3D tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rotXTo.current?.(-y * 14); // Tilt up/down
    rotYTo.current?.(x * 16); // Tilt left/right

    sheenXTo.current?.(x * 60);
    sheenYTo.current?.(y * 60);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotXTo.current?.(0);
    rotYTo.current?.(0);
    sheenXTo.current?.(0);
    sheenYTo.current?.(0);
  };

  const currentData = SERVING_OPTIONS.find((s) => s.id === activeServing) || SERVING_OPTIONS[0];

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 3D Perspective Card Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[580px] aspect-[4/3] sm:aspect-[16/11] cursor-pointer"
        style={{ perspective: 1200 }}
      >
        {/* Subtle Ambient Back Glow matching active style */}
        <div
          className="absolute -inset-4 rounded-[40px] opacity-40 blur-2xl transition-all duration-700 pointer-events-none -z-10"
          style={{
            background:
              activeServing === 'coupe'
                ? 'radial-gradient(circle, rgba(143,168,86,0.35) 0%, rgba(217,86,106,0.25) 50%, transparent 75%)'
                : activeServing === 'plinth'
                ? 'radial-gradient(circle, rgba(215,228,181,0.5) 0%, rgba(143,168,86,0.3) 50%, transparent 75%)'
                : 'radial-gradient(circle, rgba(233,165,161,0.45) 0%, rgba(80,53,47,0.2) 60%, transparent 75%)',
          }}
        />

        {/* 3D Tilting Frame */}
        <div
          ref={cardRef}
          className="relative w-full h-full rounded-[28px] sm:rounded-[36px] overflow-hidden border-4 border-warmWhite bg-chocolate-900 shadow-[0_24px_60px_-12px_rgba(80,53,47,0.32)] transition-shadow duration-500"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
        >
          {/* Real Studio Photography Layers (stacked for butter-smooth crossfade) */}
          {SERVING_OPTIONS.map((opt) => {
            const isActive = opt.id === activeServing;
            return (
              <img
                key={opt.id}
                ref={(el) => {
                  imageRefs.current[opt.id] = el;
                }}
                src={opt.image}
                alt={opt.alt}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive && isHovered ? 'scale(1.03)' : 'scale(1)',
                }}
              />
            );
          })}

          {/* Specular Light Sheen Overlay */}
          <div
            ref={sheenRef}
            className="absolute -inset-full pointer-events-none mix-blend-overlay opacity-30 transition-opacity duration-300"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)',
            }}
          />

          {/* Interactive Floating Pill inside photo */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none z-10">
            <div className="bg-chocolate-950/70 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-warmWhite/20 text-warmWhite text-[10px] sm:text-xs font-semibold tracking-wider uppercase flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-pistachio-300 animate-pulse" />
              <span>{currentData.badge}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 bg-warmWhite/80 backdrop-blur-md px-3 py-1.5 rounded-full text-chocolate-900 text-[10px] font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3 h-3 text-chocolate-700" />
              <span>Real Artisanal Shot</span>
            </div>
          </div>
        </div>
      </div>

      {/* Serving Style Switcher Pills */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mt-5 sm:mt-6 z-20 pointer-events-auto">
        {SERVING_OPTIONS.map((opt) => {
          const isActive = opt.id === activeServing;
          return (
            <button
              key={opt.id}
              onClick={() => handleSelectServing(opt.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-chocolate-800 text-cream-100 shadow-md scale-105'
                  : 'bg-warmWhite/90 hover:bg-warmWhite text-chocolate-800 border border-chocolate-500/15 hover:shadow-xs'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full transition-colors ${
                  isActive ? 'bg-pistachio-300' : 'bg-chocolate-400'
                }`}
              />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Subtitle for Active Serving */}
      <p className="text-[11px] sm:text-xs text-chocolate-600/75 tracking-wider uppercase font-medium mt-3 text-center transition-all duration-300">
        {currentData.tagline}
      </p>
    </div>
  );
};
