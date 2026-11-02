import React, { createContext, useContext, useState } from 'react';
import type { MenuItem, Flavor } from '../data/brandData';
import confetti from 'canvas-confetti';

export interface CartItem {
  id: string; // unique cart entry id
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: string;
  unitPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, selectedSizeName?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  freeShippingThreshold: number;
  progressToFreeShipping: number;
  activeQuickViewFlavor: Flavor | null;
  setActiveQuickViewFlavor: (flavor: Flavor | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  triggerCelebration: () => void;
  lastAddedItemName: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initial sample artisan pint to demonstrate cart fullness
    return [
      {
        id: 'initial-sample-pint',
        menuItem: {
          id: 'pistachio-pint',
          name: 'Sicilian Pistachio Artisanal Pint',
          italianName: 'Vasetto Bronte 500ml',
          category: 'pints',
          price: 14.50,
          description: 'Freshly hand-packed 500ml pint of pure stone-ground Bronte pistachio gelato.',
          image: '/images/creame-pint.jpg',
          badge: 'Hand-Packed',
          dietary: { glutenFree: true, nutFree: false },
        },
        quantity: 1,
        selectedSize: '500ml Pint',
        unitPrice: 14.50,
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeQuickViewFlavor, setActiveQuickViewFlavor] = useState<Flavor | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastAddedItemName, setLastAddedItemName] = useState<string | null>(null);

  const freeShippingThreshold = 35.00;

  const addToCart = (item: MenuItem, selectedSizeName?: string) => {
    let effectivePrice = item.price;
    if (selectedSizeName && item.sizes) {
      const foundSize = item.sizes.find(s => s.name === selectedSizeName);
      if (foundSize) effectivePrice = foundSize.price;
    }

    const uniqueId = `${item.id}-${selectedSizeName || 'default'}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === uniqueId);
      if (existing) {
        return prev.map((i) =>
          i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: uniqueId,
          menuItem: item,
          quantity: 1,
          selectedSize: selectedSizeName,
          unitPrice: effectivePrice,
        },
      ];
    });

    setLastAddedItemName(item.name);
    setIsCartOpen(true);

    setTimeout(() => {
      setLastAddedItemName(null);
    }, 2800);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === cartItemId) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.50;
  const total = subtotal + deliveryFee;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D7E4B5', '#E9A5A1', '#50352F', '#F4D88B', '#FFFDF8'],
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        deliveryFee,
        total,
        itemCount,
        freeShippingThreshold,
        progressToFreeShipping,
        activeQuickViewFlavor,
        setActiveQuickViewFlavor,
        isCheckoutOpen,
        setIsCheckoutOpen,
        triggerCelebration,
        lastAddedItemName,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
