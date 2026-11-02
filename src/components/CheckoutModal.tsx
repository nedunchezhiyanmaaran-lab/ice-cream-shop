import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, items, total, clearCart, triggerCelebration } = useCart();
  const [orderMethod, setOrderMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timeSlot, setTimeSlot] = useState('Today, 2:30 PM - 3:00 PM');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
    triggerCelebration();
  };

  const handleFinish = () => {
    clearCart();
    setIsSubmitted(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-chocolate-900/65 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-cream-100 rounded-3xl overflow-hidden shadow-2xl border border-chocolate-500/10 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-chocolate-500/10 flex items-center justify-between bg-cream-200/60">
          <div>
            <h3 className="font-serif text-2xl font-normal text-chocolate-800">
              {isSubmitted ? 'Order Confirmed' : 'Atelier Express Checkout'}
            </h3>
            <p className="text-xs text-chocolate-600 font-sans">
              {isSubmitted
                ? 'Your freshly packed gelato is being prepared'
                : 'Complete your artisanal pickup or delivery'}
            </p>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full hover:bg-cream-200 text-chocolate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-5 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-pistachio-200 text-chocolate-800 flex items-center justify-center mx-auto shadow-inner-glow">
                <CheckCircle className="w-10 h-10 text-pistachio-700" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-chocolate-500 font-bold block mb-1">
                  Order Reference
                </span>
                <span className="font-serif text-3xl font-medium text-chocolate-900">
                  #{orderId}
                </span>
              </div>

              <p className="text-sm text-chocolate-600 max-w-md mx-auto leading-relaxed font-sans">
                Thank you, <strong className="text-chocolate-800">{name || 'Guest'}</strong>.
                Your batch is being hand-scooped and chilled in our SoHo atelier. We sent confirmation
                details to <span className="font-medium text-chocolate-800">{email || 'your email'}</span>.
              </p>

              <div className="p-4 rounded-2xl bg-warmWhite border border-chocolate-500/10 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between text-chocolate-600">
                  <span>Method:</span>
                  <span className="font-semibold text-chocolate-800 capitalize">
                    {orderMethod === 'pickup' ? 'Atelier Pickup' : 'Chilled Courier'}
                  </span>
                </div>
                <div className="flex justify-between text-chocolate-600">
                  <span>Slot:</span>
                  <span className="font-semibold text-chocolate-800">{timeSlot}</span>
                </div>
                <div className="flex justify-between text-chocolate-600">
                  <span>Total Paid:</span>
                  <span className="font-bold text-chocolate-900">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="px-8 py-3.5 rounded-full bg-chocolate-700 hover:bg-chocolate-900 text-cream-100 text-xs uppercase font-semibold tracking-widest transition-all"
              >
                Return to Atelier Experience
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prototype Notice */}
              <div className="p-3.5 rounded-2xl bg-butter-100/90 border border-butter-300 text-xs text-chocolate-800 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-butter-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Frontend Demo Order:</strong> No real payment or charge is processed.
                  You can test the entire reservation, timing selection, and cart flow seamlessly!
                </p>
              </div>

              {/* Order Method Selector */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-chocolate-500 block mb-2">
                  Fulfillment Method
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setOrderMethod('pickup')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      orderMethod === 'pickup'
                        ? 'border-chocolate-700 bg-warmWhite shadow-sm'
                        : 'border-chocolate-500/15 bg-cream-200/50 hover:bg-cream-200'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-chocolate-700" />
                    <div>
                      <p className="text-xs font-bold text-chocolate-900">Atelier Pickup</p>
                      <p className="text-[10px] text-chocolate-500">142 Artisan Row, SoHo</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderMethod('delivery')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      orderMethod === 'delivery'
                        ? 'border-chocolate-700 bg-warmWhite shadow-sm'
                        : 'border-chocolate-500/15 bg-cream-200/50 hover:bg-cream-200'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-chocolate-700" />
                    <div>
                      <p className="text-xs font-bold text-chocolate-900">Thermal Courier</p>
                      <p className="text-[10px] text-chocolate-500">Dry-ice packaging</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Timing Slot */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-chocolate-500 block mb-2">
                  Preferred Time Window
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-chocolate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-warmWhite border border-chocolate-500/20 text-xs text-chocolate-800 font-medium focus:outline-none focus:border-chocolate-700"
                  >
                    <option>Today, 2:30 PM - 3:00 PM (In 30 mins)</option>
                    <option>Today, 4:00 PM - 5:00 PM (Afternoon Flight)</option>
                    <option>Today, 7:00 PM - 8:00 PM (Dessert After Dinner)</option>
                    <option>Tomorrow, 12:30 PM - 1:30 PM (Lunch Atelier)</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-chocolate-500 block">
                  Contact Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-warmWhite border border-chocolate-500/20 text-xs text-chocolate-800 placeholder:text-chocolate-400 focus:outline-none focus:border-chocolate-700"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-warmWhite border border-chocolate-500/20 text-xs text-chocolate-800 placeholder:text-chocolate-400 focus:outline-none focus:border-chocolate-700"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Mobile Phone (for delivery SMS alert)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-warmWhite border border-chocolate-500/20 text-xs text-chocolate-800 placeholder:text-chocolate-400 focus:outline-none focus:border-chocolate-700"
                />
              </div>

              {/* Order Summary Line */}
              <div className="p-4 rounded-2xl bg-warmWhite border border-chocolate-500/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-chocolate-800 block">
                    {items.length} artisan items
                  </span>
                  <span className="text-[11px] text-chocolate-500">Includes packaging & dry-ice</span>
                </div>
                <span className="font-serif text-2xl font-bold text-chocolate-900">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-chocolate-700 hover:bg-chocolate-900 text-cream-100 text-xs uppercase font-semibold tracking-widest transition-all duration-300 shadow-md active:scale-95"
              >
                Confirm Reservation & Packing
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
