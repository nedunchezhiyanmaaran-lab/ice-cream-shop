import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Plus, Check, Info } from 'lucide-react';
import { MENU_ITEMS } from '../data/brandData';
import type { MenuItem } from '../data/brandData';
import { useCart } from '../context/CartContext';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../utils/gsapConfig';

export const MenuAndOrdering: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedItemMap, setAddedItemMap] = useState<Record<string, boolean>>({});
  const { addToCart, triggerCelebration } = useCart();

  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'scoops', label: 'Artisanal Scoops' },
    { id: 'pints', label: 'Hand-Packed Pints' },
    { id: 'sundaes', label: 'House Sundaes' },
    { id: 'waffles', label: 'Warm Waffles' },
    { id: 'sorbets', label: 'Dairy-Free Sorbets' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const handleAdd = (item: MenuItem, sizeName?: string) => {
    addToCart(item, sizeName);
    setAddedItemMap((prev) => ({ ...prev, [item.id]: true }));
    triggerCelebration();

    setTimeout(() => {
      setAddedItemMap((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      const lines = headlineRef.current?.querySelectorAll('.menu-line-inner');
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
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Smooth grid item stagger on category switch
      const items = gridRef.current?.querySelectorAll('.menu-item-card');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-6 sm:px-8 bg-cream-200 overflow-hidden border-t border-chocolate-500/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pistachio-200/90 border border-pistachio-400/30 text-chocolate-800 text-[11px] tracking-widest-xl uppercase font-semibold mb-4">
              <Sparkles className="w-3 h-3 text-pistachio-700" />
              <span>The Atelier Counter</span>
            </div>

            <h2
              ref={headlineRef}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-chocolate-800 leading-[1.08] tracking-tight"
            >
              <span className="block overflow-hidden py-1">
                <span className="menu-line-inner block">Order for Pickup</span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="menu-line-inner block italic font-serif-italic text-chocolate-700">
                  or chilled courier delivery.
                </span>
              </span>
            </h2>

            <p className="mt-4 text-chocolate-600 font-sans text-base leading-relaxed">
              Every order is hand-scooped and packed in thermal insulated containers with dry ice
              to guarantee crisp, frozen perfection upon arrival.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-chocolate-600 bg-warmWhite/80 px-4 py-2.5 rounded-2xl border border-chocolate-500/10 self-start md:self-end">
            <Info className="w-4 h-4 text-chocolate-500 shrink-0" />
            <span>Interactive live ordering prototype</span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-chocolate-700 text-cream-100 shadow-sm'
                  : 'bg-warmWhite/80 text-chocolate-700 hover:bg-warmWhite hover:text-chocolate-950 border border-chocolate-500/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Cards Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item) => {
            const isAdded = Boolean(addedItemMap[item.id]);

            return (
              <div
                key={item.id}
                className="menu-item-card group bg-warmWhite rounded-3xl p-5 sm:p-6 border border-chocolate-500/10 shadow-sm hover:shadow-luxe transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Stage */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-cream-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {item.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-chocolate-800 text-cream-100 shadow-sm">
                        {item.badge}
                      </span>
                    )}

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg cream-glass text-chocolate-800 text-xs font-serif font-bold">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Title & Italian Subtitle */}
                  {item.italianName && (
                    <span className="font-serif italic text-xs text-chocolate-500 block mb-1">
                      {item.italianName}
                    </span>
                  )}
                  <h3 className="font-serif text-2xl font-normal text-chocolate-800 leading-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-chocolate-600 font-sans leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-6 border-t border-chocolate-500/10 mt-6 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-chocolate-500 block">
                      Starting At
                    </span>
                    <span className="font-serif text-xl font-bold text-chocolate-900">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(item, item.sizes ? item.sizes[0].name : undefined)}
                    disabled={isAdded}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isAdded
                        ? 'bg-pistachio-300 text-chocolate-900 scale-95'
                        : 'bg-chocolate-700 hover:bg-chocolate-900 text-cream-100 hover:shadow-md active:scale-95'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
