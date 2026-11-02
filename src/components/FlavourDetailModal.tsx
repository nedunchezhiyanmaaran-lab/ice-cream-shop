import React from 'react';
import { X, Plus, Check, ShieldCheck, Heart } from 'lucide-react';
import type { Flavor } from '../data/brandData';
import { useCart } from '../context/CartContext';

interface FlavourDetailModalProps {
  flavor: Flavor | null;
  onClose: () => void;
}

export const FlavourDetailModal: React.FC<FlavourDetailModalProps> = ({ flavor, onClose }) => {
  const { addToCart, triggerCelebration } = useCart();
  const [added, setAdded] = React.useState(false);

  if (!flavor) return null;

  const handleAddToCart = () => {
    addToCart(
      {
        id: `flavor-${flavor.id}`,
        name: flavor.name,
        italianName: flavor.italianName,
        category: 'scoops',
        price: flavor.pricePerScoop,
        description: flavor.description,
        image: flavor.image,
        dietary: {
          glutenFree: flavor.glutenFree,
          dairyFree: flavor.dairyFree,
          vegan: flavor.vegan,
          nutFree: flavor.nutFree,
        },
      },
      'Artisanal Scoop'
    );
    setAdded(true);
    triggerCelebration();
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-chocolate-900/60 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-cream-100 rounded-3xl overflow-hidden shadow-2xl border border-chocolate-500/10 flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-cream-200/80 hover:bg-cream-200 text-chocolate-800 transition-colors border border-chocolate-500/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image with Tasting Mood */}
        <div
          className="w-full md:w-1/2 relative min-h-[260px] md:min-h-full overflow-hidden p-6 flex flex-col justify-between"
          style={{ backgroundColor: flavor.bgTone }}
        >
          {flavor.badge && (
            <span className="self-start z-10 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-chocolate-800 text-cream-100 shadow-sm">
              {flavor.badge}
            </span>
          )}

          <div className="relative my-auto w-full aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-luxe border border-chocolate-500/10">
            <img
              src={flavor.image}
              alt={flavor.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="z-10 bg-warmWhite/80 backdrop-blur-sm rounded-xl p-3 border border-chocolate-500/10 text-xs text-chocolate-700">
            <span className="font-semibold block uppercase tracking-wider text-[10px] text-chocolate-500">
              Ingredient Provenance
            </span>
            <span className="font-medium">{flavor.origin}</span>
          </div>
        </div>

        {/* Right Column: Tasting Notes & Culinary Profile */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <p className="font-serif italic text-sm text-chocolate-600">{flavor.italianName}</p>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-chocolate-800 leading-tight">
                {flavor.name}
              </h3>
            </div>

            <p className="text-sm font-medium text-chocolate-700 italic border-l-2 border-pistachio-400 pl-3">
              "{flavor.tagline}"
            </p>

            <p className="text-sm text-chocolate-600 leading-relaxed font-sans">
              {flavor.description}
            </p>

            {/* Tasting Notes */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-chocolate-500 block mb-2">
                Aromatic Tasting Notes
              </span>
              <div className="flex flex-wrap gap-2">
                {flavor.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-cream-200 border border-chocolate-500/15 text-chocolate-800"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Pairing */}
            <div className="bg-cream-200/60 p-3.5 rounded-2xl border border-chocolate-500/10 text-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-chocolate-500 block mb-1">
                Sommelier Pairing Suggestion
              </span>
              <p className="text-chocolate-800 font-medium">
                Delicious paired alongside <span className="font-serif italic text-chocolate-900">{flavor.pairWith}</span>.
              </p>
            </div>

            {/* Dietary Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              {flavor.glutenFree && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-pistachio-100 text-pistachio-900 border border-pistachio-300">
                  <ShieldCheck className="w-3 h-3" /> Gluten-Free
                </span>
              )}
              {flavor.vegan && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-pistachio-100 text-pistachio-900 border border-pistachio-300">
                  <Heart className="w-3 h-3" /> 100% Vegan
                </span>
              )}
              {flavor.dairyFree && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-butter-100 text-chocolate-800 border border-butter-300">
                  Dairy-Free
                </span>
              )}
              {flavor.nutFree && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-cream-300/60 text-chocolate-800 border border-chocolate-500/10">
                  Nut-Free
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-chocolate-500/10 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-chocolate-500 block">Single Scoop</span>
              <span className="font-serif text-2xl font-bold text-chocolate-900">
                ${flavor.pricePerScoop.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                added
                  ? 'bg-pistachio-400 text-chocolate-900'
                  : 'bg-chocolate-700 hover:bg-chocolate-900 text-cream-100 active:scale-95 shadow-md'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Tasting Bag</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add Scoop to Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
