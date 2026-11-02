import React, { useEffect, useRef } from 'react';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../utils/gsapConfig';
import { PhotorealisticGelatoHero } from './canvas/PhotorealisticGelatoHero';
import { ArrowUpRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const footerRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: BRAND_EASE.smooth },
        delay: 0.15,
      });

      // 1. Eyebrow Reveal
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
        );
      }

      // 2. Headline Reveal (Cinematic staggered lines)
      const headlineLines = headlineRef.current?.querySelectorAll('.hero-line-inner');
      if (headlineLines && headlineLines.length > 0) {
        tl.fromTo(
          headlineLines,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: BRAND_EASE.cinematic,
          },
          '-=0.5'
        );
      }

      // 3. Subtext & CTA Reveal
      if (subtextRef.current) {
        tl.fromTo(
          subtextRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.7'
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
      }

      if (badgesRef.current) {
        tl.fromTo(
          badgesRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }

      // 4. Showcase Frame Entrance
      if (showcaseRef.current) {
        tl.fromTo(
          showcaseRef.current,
          { opacity: 0, scale: 0.94, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=1.1'
        );
      }

      // 5. Footer Row Reveal
      if (footerRowRef.current) {
        tl.fromTo(
          footerRowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
      }

      // Gentle Scroll Parallax
      gsap.to(headlineRef.current, {
        y: -30,
        opacity: 0.45,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '70% top',
          scrub: 1.2,
        },
      });

      if (showcaseRef.current) {
        gsap.to(showcaseRef.current, {
          y: -25,
          scale: 0.96,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[95vh] lg:min-h-screen pt-28 pb-10 px-6 sm:px-10 lg:px-16 flex flex-col justify-between items-center overflow-hidden bg-cream-200 select-none"
    >
      {/* Paper Grain Texture */}
      <div className="absolute inset-0 paper-grain pointer-events-none opacity-25" />

      {/* Subtle Background Watermark */}
      <div
        className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[18vw] font-normal tracking-[0.14em] text-chocolate-900 pointer-events-none whitespace-nowrap z-0 select-none"
        style={{ opacity: 0.03 }}
      >
        CREAMÉ
      </div>

      {/* Main 2-Column Luxury Editorial Grid */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
        {/* Left Editorial Narrative Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-start text-left">
          {/* Eyebrow with Live Batch Dot */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-warmWhite/80 border border-chocolate-500/10 text-chocolate-800 text-[11px] font-semibold tracking-[0.2em] uppercase mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-pistachio-400 animate-pulse" />
            <span>Artisanal Italian Gelato · Small-Batch Churn</span>
          </div>

          {/* Monumental Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-5xl sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] font-normal tracking-tight text-chocolate-900 leading-[1.0] mb-6"
          >
            <span className="block overflow-hidden py-0.5">
              <span className="hero-line-inner block">Pure Pleasure.</span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span className="hero-line-inner block italic font-serif-italic text-chocolate-700">
                Made Slowly.
              </span>
            </span>
          </h1>

          {/* Minimalist Editorial Description (Zero Clutter) */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-chocolate-700/85 leading-relaxed font-normal max-w-md mb-8"
          >
            Slow-churned daily in small batches with DOP Bronte pistachios, organic Jersey pasture
            cream, and single-origin dark chocolate.
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href="#flavours"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-chocolate-800 hover:bg-chocolate-900 text-cream-100 text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <span>Explore Our Flavours</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href="#craft"
              className="inline-flex items-center px-7 py-3.5 rounded-full border border-chocolate-600/30 hover:border-chocolate-800 text-chocolate-800 text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-warmWhite/70"
            >
              Our Story
            </a>
          </div>

          {/* Subtle Trust Badges */}
          <div
            ref={badgesRef}
            className="flex items-center gap-5 text-[11px] font-semibold tracking-wider uppercase text-chocolate-600/70 pt-2 border-t border-chocolate-500/10 w-full"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-pistachio-600 font-bold">✓</span> DOP Bronte Pistachio
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-pistachio-600 font-bold">✓</span> 100% Jersey Cream
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-pistachio-600 font-bold">✓</span> Slow Churned Daily
            </span>
          </div>
        </div>

        {/* Right Interactive Real Photography Showcase (7 cols) */}
        <div ref={showcaseRef} className="lg:col-span-7 flex justify-center w-full">
          <PhotorealisticGelatoHero />
        </div>
      </div>

      {/* Minimal Footer Row */}
      <div
        ref={footerRowRef}
        className="relative z-10 w-full max-w-7xl flex items-center justify-between text-chocolate-600/60 text-[10px] sm:text-xs tracking-widest uppercase font-semibold pt-6 border-t border-chocolate-500/10"
      >
        <span>Florence & Milan Atelier</span>
        <span className="hidden sm:inline-block">Organic Pasture Dairy</span>
        <span>Daily Small Batch Nº 48</span>
      </div>
    </section>
  );
};
