import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Send, Check, Sparkles, Music } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { gsap, BRAND_EASE, prefersReducedMotion } from '../utils/gsapConfig';

export const ContactAndFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { triggerCelebration } = useCart();

  const footerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    triggerCelebration();
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      const lines = headlineRef.current?.querySelectorAll('.footer-line-inner');
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

      // Closing product photo mask reveal
      if (imageRevealRef.current) {
        gsap.fromTo(
          imageRevealRef.current,
          { clipPath: 'inset(20% 0% 0% 0%)', opacity: 0.7 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRevealRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative pt-24 pb-12 px-6 sm:px-8 bg-chocolate-900 text-cream-100 overflow-hidden border-t border-cream-100/10"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top Feature: Closing Headline & Newsletter Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream-100/10 border border-cream-100/20 text-butter-200 text-xs tracking-widest-xl uppercase font-semibold">
              <Sparkles className="w-3 h-3 text-butter-300" />
              <span>Join The Atelier Club</span>
            </div>

            <h2
              ref={headlineRef}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-warmWhite leading-[1.04] tracking-tight"
            >
              <span className="block overflow-hidden py-1">
                <span className="footer-line-inner block">Life is sweeter</span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="footer-line-inner block italic font-serif-italic text-butter-200">
                  by the scoop.
                </span>
              </span>
            </h2>

            <p className="text-cream-300/80 font-sans text-sm sm:text-base max-w-lg leading-relaxed">
              Subscribe to receive weekly notices of limited micro-batch drops, seasonal fruit arrivals,
              and private tasting room reservations.
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={handleNewsletter} className="max-w-md pt-2">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-pistachio-200/20 border border-pistachio-300/30 text-pistachio-200 text-xs flex items-center gap-2.5 animate-fade-in">
                  <Check className="w-4 h-4 text-pistachio-300 shrink-0" />
                  <span>Welcome to the Atelier Club. Check your inbox for your first seasonal invite.</span>
                </div>
              ) : (
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for secret drops"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-5 pr-36 py-4 rounded-full bg-cream-100/10 border border-cream-100/20 text-xs text-warmWhite placeholder:text-cream-400 focus:outline-none focus:border-butter-300 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 px-5 py-2.5 rounded-full bg-butter-300 hover:bg-butter-400 text-chocolate-900 text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 active:scale-95"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Feature: Pint Packaging Showcase Image */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageRevealRef}
              className="relative aspect-square max-w-[380px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-cream-100/15 bg-chocolate-800"
            >
              <img
                src="/images/creame-pint.jpg"
                alt="CREAME Homemade Gelato Pint"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl cream-glass-dark text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-butter-300 block">
                    Available Online
                  </span>
                  <p className="font-serif text-warmWhite">Hand-Packed 500ml Pints</p>
                </div>
                <a
                  href="#menu"
                  className="px-3 py-1.5 rounded-full bg-warmWhite/20 hover:bg-warmWhite/30 text-warmWhite text-[11px] font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Order</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Navigation & Social Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-cream-100/10 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
              The Experience
            </p>
            <ul className="space-y-2 text-cream-300/80">
              <li><a href="#flavours" className="hover:text-warmWhite transition-colors">Signature Flavours</a></li>
              <li><a href="#craft" className="hover:text-warmWhite transition-colors">The 22% Micro-Air Craft</a></li>
              <li><a href="#ingredients" className="hover:text-warmWhite transition-colors">Traceable Origins</a></li>
              <li><a href="#story" className="hover:text-warmWhite transition-colors">Our Philosophy</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
              Atelier Counter
            </p>
            <ul className="space-y-2 text-cream-300/80">
              <li><a href="#menu" className="hover:text-warmWhite transition-colors">Artisanal Scoops</a></li>
              <li><a href="#menu" className="hover:text-warmWhite transition-colors">Hand-Packed Pints (500ml)</a></li>
              <li><a href="#menu" className="hover:text-warmWhite transition-colors">Warm Liege Waffles</a></li>
              <li><a href="#menu" className="hover:text-warmWhite transition-colors">Dairy-Free Sorbets</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
              SoHo Flagship
            </p>
            <div className="space-y-1 text-cream-300/80">
              <p>142 Artisan Row</p>
              <p>SoHo, New York, NY 10013</p>
              <p className="pt-1 text-butter-200">Open Today • 12:00 PM – 10:00 PM</p>
            </div>
          </div>

          {/* Col 4: Socials */}
          <div className="space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-widest text-butter-300">
              Connect
            </p>
            <div className="flex flex-col space-y-2 text-cream-300/80">
              <a href="#" className="flex items-center gap-2 hover:text-warmWhite transition-colors">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span>@creamegelato</span>
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-warmWhite transition-colors">
                <Music className="w-3.5 h-3.5" />
                <span>Atelier Vinyl Playlist</span>
              </a>
              <p className="text-[11px] text-cream-400/80 pt-1">
                For private events: events@creamegelato.com
              </p>
            </div>
          </div>
        </div>

        {/* Large Editorial Brand Watermark & Copyright */}
        <div className="pt-10 border-t border-cream-100/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-cream-400/80">
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-light tracking-tight text-cream-100">
              CREAME
            </span>
            <span className="text-[10px] tracking-widest uppercase text-cream-400">
              © {new Date().getFullYear()} CREAME Gelato Atelier. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#" className="hover:text-warmWhite transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-warmWhite transition-colors">Allergen Guide</a>
            <a href="#" className="hover:text-warmWhite transition-colors">Sustainability Charter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
