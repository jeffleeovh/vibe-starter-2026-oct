import React, { useState } from 'react';
import { X, RotateCcw, HelpCircle } from 'lucide-react';

interface ConnectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  theme: string;
  color: string;
  words: string[];
}

const CATEGORIES: Category[] = [
  {
    theme: 'SECTIONS IN A NEWSPAPER',
    color: 'bg-amber-200 text-amber-950 border-amber-300',
    words: ['OPINION', 'BUSINESS', 'SPORTS', 'ARTS']
  },
  {
    theme: 'JOURNALISM VERBS',
    color: 'bg-emerald-200 text-emerald-950 border-emerald-300',
    words: ['SCOOP', 'SOURCE', 'FACT-CHECK', 'INTERVIEW']
  },
  {
    theme: 'PRINTING PRESS ELEMENTS',
    color: 'bg-blue-200 text-blue-950 border-blue-300',
    words: ['CYLINDER', 'ROLLER', 'INK', 'TYPEFACE']
  },
  {
    theme: 'WORDS THAT PRECEDES "TIMES"',
    color: 'bg-purple-200 text-purple-950 border-purple-300',
    words: ['MODERN', 'HARD', 'BED', 'GOOD']
  }
];

export const ConnectionsModal: React.FC<ConnectionsModalProps> = ({ isOpen, onClose }) => {
  const allInitialWords = CATEGORIES.flatMap(c => c.words).sort(() => Math.random() - 0.5);
  const [availableWords, setAvailableWords] = useState<string[]>(allInitialWords);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [solvedCategories, setSolvedCategories] = useState<Category[]>([]);
  const [mistakesLeft, setMistakesLeft] = useState(4);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const showMsg = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 2500);
  };

  const toggleSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      if (selectedWords.length >= 4) return;
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) {
      showMsg('Select 4 words to submit a group');
      return;
    }

    const matchedCat = CATEGORIES.find(cat =>
      cat.words.every(w => selectedWords.includes(w))
    );

    if (matchedCat) {
      setSolvedCategories([...solvedCategories, matchedCat]);
      setAvailableWords(availableWords.filter(w => !matchedCat.words.includes(w)));
      setSelectedWords([]);
      showMsg(`Found: ${matchedCat.theme}!`);
    } else {
      // Check if 3 are one away
      const oneAway = CATEGORIES.some(cat => {
        const count = selectedWords.filter(w => cat.words.includes(w)).length;
        return count === 3;
      });

      if (oneAway) {
        showMsg('One away...');
      } else {
        showMsg('Not a category.');
      }

      setMistakesLeft(prev => Math.max(0, prev - 1));
    }
  };

  const handleShuffle = () => {
    setAvailableWords([...availableWords].sort(() => Math.random() - 0.5));
  };

  const resetGame = () => {
    setSolvedCategories([]);
    setSelectedWords([]);
    setMistakesLeft(4);
    setAvailableWords(CATEGORIES.flatMap(c => c.words).sort(() => Math.random() - 0.5));
  };

  const isWon = solvedCategories.length === CATEGORIES.length;
  const isLost = mistakesLeft === 0 && !isWon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-lg rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div>
            <h2 className="font-serif font-black text-xl tracking-tight">Connections</h2>
            <p className="text-[11px] text-gray-500">Group words that share a common thread</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetGame}
              className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
              title="Reset Puzzle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message */}
        {feedbackMsg && (
          <div className="bg-nyt-black text-white text-xs font-semibold px-4 py-2 text-center animate-pulse">
            {feedbackMsg}
          </div>
        )}

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3">
          {/* Solved Categories */}
          {solvedCategories.map((cat, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-md border text-center transition-all ${cat.color}`}
            >
              <div className="font-bold text-xs uppercase tracking-wider">{cat.theme}</div>
              <div className="text-xs font-medium tracking-wide mt-0.5">
                {cat.words.join(', ')}
              </div>
            </div>
          ))}

          {/* Remaining Words Grid */}
          {!isWon && !isLost && (
            <div className="grid grid-cols-4 gap-2">
              {availableWords.map((word) => {
                const isSelected = selectedWords.includes(word);
                return (
                  <button
                    key={word}
                    onClick={() => toggleSelect(word)}
                    className={`h-16 rounded-md font-bold text-xs p-1 text-center flex items-center justify-center transition-all cursor-pointer select-none border ${
                      isSelected
                        ? 'bg-nyt-black text-white border-black scale-95 shadow-sm'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          )}

          {isWon && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-center rounded-sm">
              <h3 className="font-serif font-bold text-base text-emerald-900">Brilliant!</h3>
              <p className="text-xs text-emerald-700 mt-1">You found all four Connections!</p>
            </div>
          )}

          {isLost && (
            <div className="p-4 bg-red-50 border border-red-200 text-center rounded-sm">
              <h3 className="font-serif font-bold text-base text-red-900">Game Over</h3>
              <p className="text-xs text-red-700 mt-1">Better luck tomorrow!</p>
              <button
                onClick={resetGame}
                className="mt-3 bg-nyt-black text-white text-xs font-semibold px-4 py-1.5 rounded-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Mistakes indicator */}
          {!isWon && !isLost && (
            <div className="flex items-center justify-center gap-1.5 pt-2 text-xs text-gray-600">
              <span>Mistakes remaining:</span>
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i < mistakesLeft ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isWon && !isLost && (
          <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={handleShuffle}
              className="border border-gray-300 hover:border-black text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              Shuffle
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedWords([])}
                disabled={selectedWords.length === 0}
                className="border border-gray-300 hover:border-black disabled:opacity-40 text-xs font-semibold px-3 py-1.5 rounded-full"
              >
                Deselect All
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedWords.length !== 4}
                className="bg-nyt-black text-white disabled:opacity-40 hover:bg-gray-800 text-xs font-semibold px-4 py-1.5 rounded-full"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
