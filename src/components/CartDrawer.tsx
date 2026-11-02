import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    progressToFreeShipping,
    freeShippingThreshold,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-chocolate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-cream-100 flex flex-col justify-between shadow-2xl border-l border-chocolate-500/10">
          {/* Header */}
          <div className="p-6 border-b border-chocolate-500/10 flex items-center justify-between bg-cream-200/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-pistachio-200 text-chocolate-800">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-normal text-chocolate-800">
                  Your Tasting Bag
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-chocolate-600 font-sans">
                    {items.length} {items.length === 1 ? 'item' : 'items'} selected
                  </span>
                  {items.length > 0 && (
                    <>
                      <span className="text-chocolate-400">•</span>
                      <button
                        onClick={clearCart}
                        className="text-[10px] text-chocolate-500 hover:text-strawberry-700 underline"
                      >
                        Empty
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-cream-200 text-chocolate-700 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Insulated Delivery Meter */}
          <div className="px-6 py-3 bg-warmWhite border-b border-chocolate-500/10 text-xs text-chocolate-700">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span>Chilled Thermal Packaging</span>
              <span className="text-chocolate-800 font-semibold">
                {remainingForFreeShipping === 0
                  ? 'Unlocked (Complimentary)'
                  : `Add $${remainingForFreeShipping.toFixed(2)} for free thermal pack`}
              </span>
            </div>
            <div className="w-full bg-cream-300 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-pistachio-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-chocolate-600">
                <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center text-chocolate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl text-chocolate-800">Your bag is empty</h4>
                <p className="text-xs max-w-xs font-sans text-chocolate-500">
                  Browse our freshly churned scoops, artisanal hand-packed pints, or warm Liege waffles.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-chocolate-700 text-cream-100 text-xs uppercase font-semibold tracking-wider hover:bg-chocolate-900 transition-colors"
                >
                  Explore The Menu
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-warmWhite border border-chocolate-500/10 shadow-sm flex items-center gap-4 transition-all duration-300"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover border border-chocolate-500/10 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-base font-medium text-chocolate-800 truncate">
                      {item.menuItem.name}
                    </h5>
                    {item.selectedSize && (
                      <p className="text-[11px] text-chocolate-500 font-sans">
                        Portion: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-xs font-semibold text-chocolate-900 mt-0.5">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-chocolate-500/20 rounded-full bg-cream-100 px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-chocolate-950 text-chocolate-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2 text-chocolate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-chocolate-950 text-chocolate-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-strawberry-700 hover:text-strawberry-900 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-6 bg-cream-200/60 border-t border-chocolate-500/10 space-y-4">
              <div className="space-y-1.5 text-xs text-chocolate-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-chocolate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Chilled Courier & Packaging</span>
                  <span>{deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="pt-2 border-t border-chocolate-500/10 flex justify-between text-base font-serif font-bold text-chocolate-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="checkout-trigger-btn"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-full bg-chocolate-700 hover:bg-chocolate-900 text-cream-100 text-xs uppercase font-semibold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-chocolate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-pistachio-600" />
                <span>Hand-packed in insulated dry-ice containers. Guaranteed frozen.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
