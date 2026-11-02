import React, { useEffect, useRef } from 'react';
import { Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { INGREDIENT_PILLARS } from '../data/brandData';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../utils/gsapConfig';

export const Ingredients: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Headline reveal
      const headlineLines = headlineRef.current?.querySelectorAll('.ing-line-inner');
      if (headlineLines && headlineLines.length > 0) {
        gsap.fromTo(
          headlineLines,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.15,
            ease: BRAND_EASE.cinematic,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 2. Circular masks reveal on scroll
      const items = cardsRef.current?.querySelectorAll('.ingredient-item');
      if (items && items.length > 0) {
        items.forEach((item) => {
          const imgWrapper = item.querySelector('.mask-circle-target');
          const content = item.querySelector('.ing-content');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          });

          if (imgWrapper) {
            tl.fromTo(
              imgWrapper,
              { clipPath: 'circle(30% at 50% 50%)', scale: 0.9, opacity: 0.7 },
              {
                clipPath: 'circle(100% at 50% 50%)',
                scale: 1,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
              }
            );
          }

          if (content) {
            tl.fromTo(
              content,
              { opacity: 0, y: 25 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
              '-=0.8'
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-warmWhite overflow-hidden border-t border-chocolate-500/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-butter-100 border border-butter-300/60 text-chocolate-800 text-[11px] tracking-widest-xl uppercase font-semibold mb-4">
            <Sparkles className="w-3 h-3 text-butter-500" />
            <span>Traceable Origins</span>
          </div>

          <h2
            ref={headlineRef}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-chocolate-800 leading-[1.08] tracking-tight"
          >
            <span className="block overflow-hidden py-1">
              <span className="ing-line-inner block">Pure ingredients.</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="ing-line-inner block italic font-serif-italic text-chocolate-700">
                Zero compromises.
              </span>
            </span>
          </h2>

          <p className="mt-4 text-chocolate-600 font-sans text-base leading-relaxed">
            We work directly with generational growers and heritage dairy farmers who respect the land
            and harvest with integrity.
          </p>
        </div>

        {/* 4 Pillars Timeline with Circular Image Masks */}
        <div ref={cardsRef} className="space-y-16 sm:space-y-24 relative">
          {/* Subtle connecting vertical thread */}
          <div className="absolute top-12 bottom-12 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-chocolate-500/15 to-transparent hidden lg:block" />

          {INGREDIENT_PILLARS.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`ingredient-item relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Circular Mask Photo */}
                <div
                  className={`lg:col-span-6 flex justify-center ${
                    isEven ? 'lg:justify-end' : 'lg:order-2 lg:justify-start'
                  }`}
                >
                  <div className="mask-circle-target relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden shadow-luxe border-4 border-cream-200 bg-cream-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Tag badge floating over circle */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full cream-glass text-chocolate-800 text-xs font-semibold uppercase tracking-wider shadow-md whitespace-nowrap">
                      {item.tag}
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div
                  className={`ing-content lg:col-span-6 space-y-4 max-w-lg ${
                    isEven ? 'lg:pl-4' : 'lg:order-1 lg:pr-4'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-chocolate-500">
                    <MapPin className="w-3.5 h-3.5 text-pistachio-600" />
                    <span>{item.subtitle}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-chocolate-800 font-normal leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-chocolate-600 font-sans text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2.5 text-xs font-medium text-chocolate-700 bg-cream-100/80 p-3 rounded-xl border border-chocolate-500/10">
                    <CheckCircle2 className="w-4 h-4 text-pistachio-600 shrink-0" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
