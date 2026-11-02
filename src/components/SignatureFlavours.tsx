import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Eye } from 'lucide-react';
import { SIGNATURE_FLAVORS } from '../data/brandData';
import { useCart } from '../context/CartContext';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../utils/gsapConfig';

export const SignatureFlavours: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'vegan' | 'nut-free' | 'signatures'>('all');
  const { setActiveQuickViewFlavor } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const filteredFlavors = SIGNATURE_FLAVORS.filter((flavor) => {
    if (activeFilter === 'vegan') return flavor.vegan || flavor.dairyFree;
    if (activeFilter === 'nut-free') return flavor.nutFree;
    if (activeFilter === 'signatures') return Boolean(flavor.badge);
    return true;
  });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // 1. Headline split-reveal on scroll
      const headlineLines = headlineRef.current?.querySelectorAll('.flavour-heading-inner');
      if (headlineLines && headlineLines.length > 0) {
        gsap.fromTo(
          headlineLines,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: BRAND_EASE.cinematic,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Staggered card entrance as user scrolls
      const cards = cardsContainerRef.current?.querySelectorAll('.flavour-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0.3,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <section
      id="flavours"
      ref={sectionRef}
      className="relative py-28 px-6 sm:px-8 bg-cream-100 overflow-hidden border-t border-chocolate-500/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-strawberry-100 border border-strawberry-300/40 text-chocolate-800 text-[11px] tracking-widest-xl uppercase font-semibold mb-4">
              <Sparkles className="w-3 h-3 text-strawberry-700" />
              <span>Small-Batch Atelier Creations</span>
            </div>

            <h2
              ref={headlineRef}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-chocolate-800 leading-[1.08] tracking-tight"
            >
              <span className="block overflow-hidden py-1">
                <span className="flavour-heading-inner block">Signature Flavours,</span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="flavour-heading-inner block italic font-serif-italic text-chocolate-700">
                  sculpted for the senses.
                </span>
              </span>
            </h2>

            <p className="mt-4 text-chocolate-600 font-sans text-base leading-relaxed max-w-lg">
              Each recipe is balanced individually for optimum freeze curve, aroma dispersion,
              and lingering finish. Never cloying, always memorable.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-cream-200/80 p-1.5 rounded-full border border-chocolate-500/10 self-start md:self-end">
            {(
              [
                { id: 'all', label: 'All Flavours' },
                { id: 'signatures', label: 'House Icons' },
                { id: 'vegan', label: 'Dairy-Free / Vegan' },
                { id: 'nut-free', label: 'Nut-Free' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-chocolate-700 text-cream-100 shadow-sm'
                    : 'text-chocolate-700 hover:text-chocolate-900 hover:bg-cream-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Asymmetric Product Gallery */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch"
        >
          {filteredFlavors.map((flavor, index) => {
            // Apply thoughtful visual hierarchy and varied aspect ratios
            const isFeatured = index === 0;

            return (
              <div
                key={flavor.id}
                className={`flavour-card group relative rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:shadow-luxe border border-chocolate-500/10 ${
                  isFeatured
                    ? 'lg:col-span-2 md:flex-row gap-8 bg-gradient-to-br from-pistachio-100/60 via-cream-100 to-pistachio-50/40'
                    : 'bg-warmWhite/90 hover:bg-warmWhite'
                }`}
              >
                {/* Product Image Stage */}
                <div
                  className={`relative rounded-2xl overflow-hidden shadow-inner-glow cursor-pointer transition-transform duration-500 group-hover:scale-[1.02] ${
                    isFeatured
                      ? 'w-full md:w-1/2 aspect-[4/3] md:aspect-square'
                      : 'w-full aspect-[4/3] mb-6'
                  }`}
                  onClick={() => setActiveQuickViewFlavor(flavor)}
                >
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {flavor.badge && (
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-chocolate-800 text-cream-100 shadow-sm">
                      {flavor.badge}
                    </span>
                  )}

                  {/* Quick Look Overlay Pill */}
                  <div className="absolute inset-0 bg-chocolate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full cream-glass text-chocolate-900 text-xs font-semibold uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Flavour Notes</span>
                    </span>
                  </div>
                </div>

                {/* Content & Tasting Metadata */}
                <div className={`flex flex-col justify-between flex-1 ${isFeatured ? 'md:w-1/2' : ''}`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-serif italic text-xs text-chocolate-600">
                        {flavor.italianName}
                      </p>
                      <span className="font-serif text-lg font-bold text-chocolate-800">
                        ${flavor.pricePerScoop.toFixed(2)}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveQuickViewFlavor(flavor)}
                      className="font-serif text-2xl sm:text-3xl font-medium text-chocolate-800 hover:text-chocolate-950 transition-colors cursor-pointer leading-tight"
                    >
                      {flavor.name}
                    </h3>

                    <p className="text-xs text-chocolate-600 line-clamp-2 leading-relaxed">
                      {flavor.description}
                    </p>

                    {/* Tasting Notes Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {flavor.tastingNotes.slice(0, 3).map((note) => (
                        <span
                          key={note}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cream-200/90 text-chocolate-800 border border-chocolate-500/10"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="pt-6 border-t border-chocolate-500/10 flex items-center justify-between mt-4">
                    <span className="text-[11px] text-chocolate-500 font-sans tracking-wide">
                      {flavor.origin}
                    </span>

                    <button
                      onClick={() => setActiveQuickViewFlavor(flavor)}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-chocolate-800 hover:text-chocolate-950 transition-colors group/btn"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
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
