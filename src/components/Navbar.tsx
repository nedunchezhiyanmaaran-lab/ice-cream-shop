import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Flavours', href: '#flavours' },
    { label: 'The Craft', href: '#craft' },
    { label: 'Philosophy', href: '#ingredients' },
    { label: 'Menu & Order', href: '#menu' },
    { label: 'Visit Atelier', href: '#visit' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-cream-200/90 backdrop-blur-md border-b border-chocolate-500/10 shadow-sm'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-chocolate-800 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-pistachio-200 border border-chocolate-700/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
              <span className="text-xs font-serif font-bold text-chocolate-800">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-chocolate-800 leading-none">
                CREAME
              </span>
              <span className="text-[9px] tracking-widest-xl uppercase text-chocolate-600 font-sans font-medium mt-0.5">
                Gelato Artigianale
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium uppercase tracking-widest text-chocolate-700 hover:text-chocolate-900 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-chocolate-700 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-chocolate-500 text-cream-100 hover:bg-chocolate-700 transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-sm"
            >
              <span>Order Online</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Bag"
              className="relative p-2.5 rounded-full border border-chocolate-500/20 bg-warmWhite/80 hover:bg-warmWhite text-chocolate-800 transition-all hover:scale-105 active:scale-95 shadow-inner-glow"
            >
              <ShoppingBag className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-strawberry-300 text-chocolate-900 text-[10px] font-bold flex items-center justify-center animate-bounce shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full lg:hidden text-chocolate-800 hover:bg-cream-300/60 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-chocolate-800/40 backdrop-blur-sm animate-fade-in">
          <div className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-cream-100 p-8 flex flex-col justify-between shadow-2xl animate-slide-left">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-chocolate-500/10">
                <span className="font-serif text-2xl text-chocolate-800">CREAME</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-cream-200 text-chocolate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-5 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl text-chocolate-800 hover:text-strawberry-400 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-chocolate-500/10 space-y-4">
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-chocolate-600 text-cream-100 hover:bg-chocolate-800 transition-colors"
              >
                <span>Browse Menu & Order</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-2 text-xs text-chocolate-600 justify-center">
                <Sparkles className="w-3.5 h-3.5 text-butter-400" />
                <span>Fresh batches churned daily at 8:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

