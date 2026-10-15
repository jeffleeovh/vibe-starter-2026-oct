import React, { useState } from 'react';
import { X, Clock, Users, Bookmark, ChefHat, Check } from 'lucide-react';

interface CookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookingModal: React.FC<CookingModalProps> = ({ isOpen, onClose }) => {
  const [servings, setServings] = useState(4);
  const [saved, setSaved] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

  if (!isOpen) return null;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const ingredients = [
    { text: '1½ pounds ground meat (beef, pork, turkey, lamb or a blend)', amount: (1.5 * (servings / 4)).toFixed(1) + ' lbs' },
    { text: '1 cup fresh bread crumbs or panko', amount: (1 * (servings / 4)).toFixed(1) + ' cup' },
    { text: '½ cup whole milk or heavy cream', amount: (0.5 * (servings / 4)).toFixed(2) + ' cup' },
    { text: '1 large egg, lightly beaten', amount: `${Math.round(servings / 4)} egg(s)` },
    { text: '½ cup finely grated Parmesan or Pecorino', amount: (0.5 * (servings / 4)).toFixed(2) + ' cup' },
    { text: '2 garlic cloves, finely minced', amount: `${Math.round(2 * (servings / 4))} cloves` },
    { text: '¼ cup chopped fresh flat-leaf parsley', amount: '¼ cup' },
    { text: '1 teaspoon kosher salt and freshly ground black pepper', amount: 'to taste' },
    { text: '3 tablespoons olive oil for searing', amount: '3 tbsp' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-2xl rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-amber-50/50">
          <div className="flex items-center gap-2 text-amber-900">
            <ChefHat className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">NYT Cooking</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-1.5 rounded-sm hover:bg-amber-100 ${saved ? 'text-amber-700' : 'text-gray-500'}`}
              title="Save Recipe"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-nyt-black mb-1">
              Meatballs With Any Meat
            </h1>
            <p className="font-serif text-sm text-gray-600 italic">
              By Sam Sifton and Melissa Clark
            </p>
            <p className="font-serif text-sm text-gray-700 leading-relaxed mt-2">
              A versatile blueprint for weeknight dinners. Use beef, pork, turkey, lamb or any mix you have on hand. The panade of bread crumbs soaked in milk guarantees tender, juicy meatballs every time.
            </p>
          </div>

          {/* Quick Info */}
          <div className="flex items-center gap-6 py-3 border-y border-nyt-rule text-xs font-sans text-gray-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Time: <strong className="text-black">40 minutes</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gray-400" />
              <span>Yield: <strong className="text-black">{servings} servings</strong></span>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-[11px] text-gray-500">Scale:</span>
              <button
                onClick={() => setServings(Math.max(2, servings - 2))}
                className="w-6 h-6 border rounded font-bold hover:bg-gray-100"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{servings}</span>
              <button
                onClick={() => setServings(servings + 2)}
                className="w-6 h-6 border rounded font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Ingredients list */}
          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black mb-3">
              Ingredients
            </h3>
            <ul className="space-y-2 text-xs">
              {ingredients.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`flex items-start gap-2.5 p-1.5 rounded cursor-pointer transition-colors ${
                    checkedIngredients.includes(idx) ? 'line-through text-gray-400 bg-gray-50' : 'hover:bg-amber-50/40 text-gray-800'
                  }`}
                >
                  <span className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 ${
                    checkedIngredients.includes(idx) ? 'bg-amber-600 border-amber-600 text-white' : 'border-gray-300'
                  }`}>
                    {checkedIngredients.includes(idx) && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preparation steps */}
          <div>
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black mb-3">
              Preparation
            </h3>
            <ol className="space-y-4 text-xs font-serif leading-relaxed text-gray-800 list-decimal pl-4 marker:font-bold marker:font-sans">
              <li>
                <strong className="font-sans font-semibold text-black">Make the panade:</strong> In a large mixing bowl, combine bread crumbs and milk. Let sit for 5 minutes until liquid is fully absorbed.
              </li>
              <li>
                <strong className="font-sans font-semibold text-black">Combine and season:</strong> Add beaten egg, grated cheese, minced garlic, parsley, salt, pepper, and ground meat to the bowl. Mix gently with your fingers just until combined. Avoid overworking to preserve tenderness.
              </li>
              <li>
                <strong className="font-sans font-semibold text-black">Shape and sear:</strong> Roll meat mixture into 1½-inch balls (about 16–20 meatballs). Heat olive oil in a wide skillet over medium-high heat. Brown meatballs on all sides in batches, about 6 to 8 minutes total.
              </li>
              <li>
                <strong className="font-sans font-semibold text-black">Finish:</strong> Simmer directly in warm tomato marinara sauce for 10 minutes, or roast on an oiled sheet pan at 400°F (200°C) for 15 minutes. Serve with crusty bread or pasta.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
