import React, { useEffect, useRef } from 'react';
import { Sparkles, Quote } from 'lucide-react';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../utils/gsapConfig';

export const OurStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Headline Reveal
      const headlineLines = headlineRef.current?.querySelectorAll('.story-line-inner');
      if (headlineLines && headlineLines.length > 0) {
        gsap.fromTo(
          headlineLines,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.14,
            ease: BRAND_EASE.cinematic,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Main Image Mask Inset Reveal
      if (mainImageRef.current) {
        gsap.fromTo(
          mainImageRef.current,
          { clipPath: 'inset(20% 0% 0% 0%)', opacity: 0.6 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainImageRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Secondary image float & reveal
      if (secondaryImageRef.current) {
        gsap.fromTo(
          secondaryImageRef.current,
          { clipPath: 'circle(30% at 50% 50%)', scale: 0.85 },
          {
            clipPath: 'circle(100% at 50% 50%)',
            scale: 1,
            duration: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: secondaryImageRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Subtle Parallax
        gsap.to(secondaryImageRef.current, {
          y: -40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-cream-200 overflow-hidden border-t border-chocolate-500/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Composition */}
          <div className="lg:col-span-6 relative">
            {/* Primary Large Editorial Image */}
            <div
              ref={mainImageRef}
              className="relative rounded-3xl overflow-hidden shadow-luxe aspect-[4/5] max-w-[460px] mx-auto lg:mx-0 border border-chocolate-500/10 bg-cream-300"
            >
              <img
                src="https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1000&auto=format&fit=crop"
                alt="Artisanal ice cream creation, pistachio gelato and fresh ingredients"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-900/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Inset Secondary Circular Photo */}
            <div
              ref={secondaryImageRef}
              className="absolute -bottom-8 -right-4 sm:-right-8 w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden shadow-2xl border-4 border-cream-100 bg-chocolate-100 hidden sm:block z-10"
            >
              <img
                src="/images/vero-cup.jpg"
                alt="Fresh scoop in artisan paper cup with waffle biscuit"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Vintage Quote Stamp */}
            <div className="absolute -top-6 -left-4 sm:-left-6 p-4 rounded-2xl cream-glass shadow-lg border border-chocolate-500/10 max-w-[200px] hidden md:block">
              <Quote className="w-5 h-5 text-chocolate-400 mb-1" />
              <p className="font-serif italic text-xs text-chocolate-800 leading-snug">
                "No powders, no synthetic syrups. Just honest dairy and real fruit."
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div ref={textContentRef} className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pistachio-100 border border-pistachio-300/40 text-chocolate-800 text-[11px] tracking-widest-xl uppercase font-semibold mb-4">
                <Sparkles className="w-3 h-3 text-pistachio-700" />
                <span>Our Heritage & Philosophy</span>
              </div>

              <h2
                ref={headlineRef}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-chocolate-800 leading-[1.08] tracking-tight"
              >
                <span className="block overflow-hidden py-1">
                  <span className="story-line-inner block">Good ingredients.</span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="story-line-inner block">Honest craft.</span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="story-line-inner block italic font-serif-italic text-chocolate-700">
                    Happy moments.
                  </span>
                </span>
              </h2>
            </div>

            <div className="space-y-5 text-chocolate-600 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                CREAME was founded on a simple conviction: ice cream should never be an afterthought
                engineered for supermarket shelf life. It should be a sublime celebration of fresh
                pasture dairy, peak-season fruit, and unhurried culinary patience.
              </p>
              <p className="text-sm sm:text-base text-chocolate-600/90 leading-relaxed">
                Every single morning at 7:00 AM, our gelato kitchen steeps whole Bourbon vanilla
                pods, roasts Sicilian Bronte pistachios, and churns small micro-batches with just
                22% air overrun. When you taste a scoop here, you are tasting honest food crafted
                by humans who love the craft.
              </p>
            </div>

            {/* Core Values Pillars */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-chocolate-500/10">
              <div className="space-y-1">
                <span className="font-serif text-lg font-medium text-chocolate-800 block">
                  Pasture-To-Cone
                </span>
                <p className="text-xs text-chocolate-600 leading-normal">
                  Single-herd Jersey cream delivered fresh every 48 hours from certified family farms.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif text-lg font-medium text-chocolate-800 block">
                  Zero Preservatives
                </span>
                <p className="text-xs text-chocolate-600 leading-normal">
                  Never emulsified with polysorbate or carrageenan. Clean labels you can read and trust.
                </p>
              </div>
            </div>

            {/* Direct Link to Atelier */}
            <div className="pt-2">
              <a
                href="#visit"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-chocolate-800 hover:text-chocolate-950 pb-1 border-b border-chocolate-700 transition-colors"
              >
                <span>Visit our SoHo Kitchen & Atelier</span>
                <span className="text-sm">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
