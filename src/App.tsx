import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureFlavours } from './components/SignatureFlavours';
import { FlavourDetailModal } from './components/FlavourDetailModal';
import { SignatureExperience } from './components/SignatureExperience';
import { OurStory } from './components/OurStory';
import { Ingredients } from './components/Ingredients';
import { MenuAndOrdering } from './components/MenuAndOrdering';
import { VisitOurShop } from './components/VisitOurShop';
import { ContactAndFooter } from './components/ContactAndFooter';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';

const AppContent: React.FC = () => {
  const { activeQuickViewFlavor, setActiveQuickViewFlavor } = useCart();

  return (
    <div className="relative min-h-screen bg-cream-200 text-chocolate-500 font-sans selection:bg-pistachio-200 selection:text-chocolate-900">
      {/* Fixed Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Section 01: Hero */}
        <Hero />

        {/* Section 02: Signature Flavours */}
        <SignatureFlavours />

        {/* Section 03: Signature Experience / Craft Story */}
        <SignatureExperience />

        {/* Section 04: Our Story */}
        <OurStory />

        {/* Section 05: Ingredients & Traceability */}
        <Ingredients />

        {/* Section 06: Menu & Order Online */}
        <MenuAndOrdering />

        {/* Section 07: Visit Our Shop */}
        <VisitOurShop />
      </main>

      {/* Section 08: Contact & Footer */}
      <ContactAndFooter />

      {/* Interactive Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <FlavourDetailModal
        flavor={activeQuickViewFlavor}
        onClose={() => setActiveQuickViewFlavor(null)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
