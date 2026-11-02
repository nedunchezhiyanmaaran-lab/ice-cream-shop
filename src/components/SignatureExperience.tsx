import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../utils/gsapConfig';

interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  detailBadge: string;
  image: string;
  tone: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'texture',
    number: '01',
    title: 'The 22% Micro-Air Density',
    subtitle: 'Slow Italian Vertical Freezing',
    quote: 'Commercial ice cream sells you air. We give you pure, unadulterated density.',
    description: 'We churn our gelato slowly in small batches using specialized vertical Italian freezers. By restricting air incorporation to just 22%, the mouthfeel is extraordinarily rich, silk-like, and melts at body temperature without iciness.',
    detailBadge: 'Dense Silk • Zero Iciness',
    image: '/images/hero-three-scoop-coupe.jpg',
    tone: '#50352F',
  },
  {
    id: 'pistachio',
    number: '02',
    title: 'Volcanic Bronte Pistachios',
    subtitle: 'Stone-Ground at 1,000 RPM',
    quote: 'Harvested only every 24 months on the rocky slopes of Mount Etna.',
    description: 'Real pistachio gelato is not neon green. It is a subtle, earthy olive tone. We grind whole roasted Bronte DOP nuts between granite rollers until releasing their natural essential oils into sweet Jersey milk.',
    detailBadge: '100% DOP Certified • Sicily',
    image: '/images/veluto-pistachio.jpg',
    tone: '#7E9C43',
  },
  {
    id: 'chocolate',
    number: '03',
    title: '72% Bittersweet Molten Cocoa',
    subtitle: 'Single-Origin Fairtrade Criollo',
    quote: 'Melted straight into warm fresh cream rather than stirred as powder.',
    description: 'Our chocolate gelato begins by gently tempering single-origin Belgian cocoa bars in copper kettles. This preserves the delicate nuances of dark cherry, cedar, and smoky caramel without chalkiness.',
    detailBadge: 'Real Cocoa Butter • No Palm Oil',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1200&auto=format&fit=crop',
    tone: '#35221E',
  },
  {
    id: 'cone',
    number: '04',
    title: 'Hand-Rolled Hot Waffle Cones',
    subtitle: 'Pressed Every 30 Minutes In-Shop',
    quote: 'The aroma of caramelized brown sugar and vanilla floats through the atelier.',
    description: 'Every cone is pressed on heavy cast-iron irons with Normandy cultured butter, brown sugar, and scraped vanilla pod residue. Rolled by hand while piping hot so it crackles on the first bite.',
    detailBadge: 'Freshly Pressed • All Day Long',
    image: '/images/brand-moodboard.jpg',
    tone: '#C7A680',
  },
];

export const SignatureExperience: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const stageImageRef = useRef<HTMLImageElement>(null);
  const stageMaskRef = useRef<HTMLDivElement>(null);

  const current = EXPERIENCES[activeIdx];

  // GSAP image transition on active index change
  useEffect(() => {
    if (prefersReducedMotion() || !stageMaskRef.current) return;

    gsap.fromTo(
      stageMaskRef.current,
      { clipPath: 'inset(0% 100% 0% 0%)', scale: 0.96 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        duration: 0.9,
        ease: 'power3.inOut',
      }
    );

    if (stageImageRef.current) {
      gsap.fromTo(
        stageImageRef.current,
        { scale: 1.15 },
        { scale: 1, duration: 1.2, ease: 'power2.out' }
      );
    }
  }, [activeIdx]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      const lines = headlineRef.current?.querySelectorAll('.exp-line-inner');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
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

      // Parallax scroll on stage image
      gsap.to(stageImageRef.current, {
        y: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-chocolate-900 text-cream-100 overflow-hidden"
    >
      {/* Background warm grain */}
      <div className="absolute inset-0 bg-radial-gradient from-chocolate-800/60 to-chocolate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-100/10 border border-cream-100/20 text-butter-200 text-xs tracking-widest-xl uppercase font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-butter-300" />
              <span>Sensory & Craft Architecture</span>
            </div>

            <h2
              ref={headlineRef}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-warmWhite leading-[1.08] tracking-tight"
            >
              <span className="block overflow-hidden py-1">
                <span className="exp-line-inner block">Every scoop</span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="exp-line-inner block italic font-serif-italic text-butter-200">
                  has an honest story.
                </span>
              </span>
            </h2>
          </div>

          <p className="text-cream-300/80 font-sans text-sm sm:text-base max-w-md leading-relaxed self-start md:self-end">
            No pre-made powders. No shortcuts. We treat ice cream as an exacting culinary craft,
            rebalancing butterfat, freezing curves, and natural textures daily.
          </p>
        </div>

        {/* Cinematic Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Story Steps */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {EXPERIENCES.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-400 border ${
                    isActive
                      ? 'bg-cream-100/10 border-butter-300/40 shadow-lg'
                      : 'bg-transparent border-cream-100/10 hover:border-cream-100/25 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-xs font-semibold tracking-widest text-butter-300">
                      PHASE {item.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-cream-100/10 text-cream-200">
                      {item.detailBadge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-warmWhite font-medium">
                    {item.title}
                  </h3>

                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-cream-100/10 space-y-2 animate-fade-in">
                      <p className="font-serif italic text-xs text-butter-200">
                        "{item.quote}"
                      </p>
                      <p className="text-xs text-cream-300 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Hero Cinematic Photography Mask */}
          <div className="lg:col-span-7 relative">
            <div
              ref={stageMaskRef}
              className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-cream-100/15 bg-chocolate-950"
            >
              <img
                ref={stageImageRef}
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-transform duration-700"
              />

              {/* Atmosphere Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Inset Metadata Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl cream-glass-dark border border-cream-100/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-warmWhite">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-butter-300 block">
                    {current.subtitle}
                  </span>
                  <p className="font-serif text-lg font-normal text-warmWhite">
                    {current.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-cream-200">
                  <Clock className="w-3.5 h-3.5 text-butter-300" />
                  <span>Slow Churned at -12°C</span>
                </div>
              </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute -inset-6 bg-butter-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
