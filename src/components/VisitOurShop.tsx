import React, { useEffect, useRef } from 'react';
import { MapPin, Clock, Phone, Navigation, Sparkles, ExternalLink } from 'lucide-react';
import { STORE_INFO } from '../data/brandData';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../utils/gsapConfig';

export const VisitOurShop: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Headline reveal
      const lines = headlineRef.current?.querySelectorAll('.visit-line-inner');
      if (lines && lines.length > 0) {
        gsap.fromTo(
          lines,
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

      // 2. Store image mask reveal
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { clipPath: 'inset(25% 0% 0% 0%)', opacity: 0.6 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3. Staggered details
      const infoBlocks = infoCardsRef.current?.querySelectorAll('.visit-info-block');
      if (infoBlocks && infoBlocks.length > 0) {
        gsap.fromTo(
          infoBlocks,
          { opacity: 0.2, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: infoCardsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-warmWhite overflow-hidden border-t border-chocolate-500/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Atelier Image & Atmosphere */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageWrapperRef}
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-luxe border border-chocolate-500/10 bg-cream-200"
            >
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                alt="CREAME Artisanal Atelier Interior and Gelato Counter"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Live Badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cream-glass text-xs font-semibold text-chocolate-900 shadow-md">
                <span className="w-2 h-2 rounded-full bg-pistachio-500 animate-pulse" />
                <span>Atelier Open Today</span>
              </div>

              {/* Bottom Inset Location Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl cream-glass flex items-center justify-between text-chocolate-900 text-xs">
                <div>
                  <p className="font-semibold">{STORE_INFO.name}</p>
                  <p className="text-[11px] text-chocolate-600">{STORE_INFO.address}</p>
                </div>
                <span className="font-mono text-[10px] text-chocolate-500">
                  {STORE_INFO.coordinates}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Atelier Visit Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pistachio-100 border border-pistachio-300/40 text-chocolate-800 text-[11px] tracking-widest-xl uppercase font-semibold mb-4">
                <Sparkles className="w-3 h-3 text-pistachio-700" />
                <span>Flagship Atelier & Tasting Room</span>
              </div>

              <h2
                ref={headlineRef}
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-chocolate-800 leading-[1.08] tracking-tight"
              >
                <span className="block overflow-hidden py-1">
                  <span className="visit-line-inner block">Visit our Atelier.</span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="visit-line-inner block italic font-serif-italic text-chocolate-700">
                    Savour the slow churn.
                  </span>
                </span>
              </h2>

              <p className="mt-4 text-chocolate-600 font-sans text-base leading-relaxed">
                Step into our sunlit tasting room where cones are baked continuously, and our gelato
                masters guide you through flight pairings with single-origin espresso.
              </p>
            </div>

            {/* Info Cards Grid */}
            <div ref={infoCardsRef} className="space-y-4">
              {/* Address */}
              <div className="visit-info-block p-4 rounded-2xl bg-cream-100 border border-chocolate-500/10 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-pistachio-200 text-chocolate-800 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs uppercase font-bold tracking-wider text-chocolate-500">
                    Location
                  </p>
                  <p className="font-medium text-chocolate-900 text-sm">
                    {STORE_INFO.address}, {STORE_INFO.city}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="visit-info-block p-4 rounded-2xl bg-cream-100 border border-chocolate-500/10 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-butter-200 text-chocolate-800 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs uppercase font-bold tracking-wider text-chocolate-500">
                    Opening Hours
                  </p>
                  <div className="text-xs text-chocolate-800 space-y-0.5">
                    {STORE_INFO.hours.map((h) => (
                      <div key={h.days} className="flex justify-between font-medium">
                        <span>{h.days}</span>
                        <span className="text-chocolate-600">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone & Inquiries */}
              <div className="visit-info-block p-4 rounded-2xl bg-cream-100 border border-chocolate-500/10 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-strawberry-100 text-chocolate-800 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs uppercase font-bold tracking-wider text-chocolate-500">
                    Inquiries & Flight Bookings
                  </p>
                  <p className="font-medium text-chocolate-900 text-sm">
                    {STORE_INFO.phone} • {STORE_INFO.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-chocolate-700 hover:bg-chocolate-900 text-cream-100 text-xs uppercase font-semibold tracking-widest transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
