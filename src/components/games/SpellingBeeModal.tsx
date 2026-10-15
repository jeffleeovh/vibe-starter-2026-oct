import React, { useState } from 'react';
import { X, RotateCcw, Award } from 'lucide-react';

interface SpellingBeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CENTER_LETTER = 'T';
const OUTER_LETTERS = ['I', 'M', 'E', 'S', 'P', 'R'];
const VALID_WORDS = [
  'TIMES', 'MINT', 'MIST', 'ITEM', 'ITEMS', 'TRIP', 'TRIPS', 'REST',
  'TIMER', 'TIMERS', 'STIR', 'SITE', 'STEP', 'PERMIT', 'PRIME', 'PRIMES'
];

export const SpellingBeeModal: React.FC<SpellingBeeModalProps> = ({ isOpen, onClose }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showMsg = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  };

  const addLetter = (letter: string) => {
    setCurrentWord(prev => prev + letter);
  };

  const handleBackspace = () => {
    setCurrentWord(prev => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const word = currentWord.toUpperCase();
    if (word.length < 4) {
      showMsg('Too short (minimum 4 letters)');
      return;
    }
    if (!word.includes(CENTER_LETTER)) {
      showMsg(`Missing center letter (${CENTER_LETTER})`);
      return;
    }
    if (foundWords.includes(word)) {
      showMsg('Already found');
      return;
    }
    if (VALID_WORDS.includes(word)) {
      setFoundWords(prev => [word, ...prev]);
      setCurrentWord('');
      showMsg('Nice! +' + (word.length === 4 ? 1 : word.length) + ' points');
    } else {
      showMsg('Not in word list');
    }
  };

  const score = foundWords.reduce((acc, w) => acc + (w.length === 4 ? 1 : w.length), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-md rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div>
            <h2 className="font-serif font-black text-xl tracking-tight">Spelling Bee</h2>
            <p className="text-[11px] text-gray-500">Make words with 7 letters. Center letter required.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-amber-400 text-black text-xs font-bold px-3 py-1.5 text-center">
            {message}
          </div>
        )}

        {/* Score and Word Input */}
        <div className="p-4 flex flex-col items-center">
          <div className="flex items-center justify-between w-full text-xs font-medium text-gray-600 mb-3 px-2">
            <span>Score: <strong className="text-black text-sm">{score}</strong></span>
            <span>Rank: <strong className="text-black">{score > 15 ? 'Genius' : score > 8 ? 'Solid' : 'Beginner'}</strong></span>
          </div>

          <div className="h-10 text-xl font-bold tracking-widest text-nyt-black flex items-center justify-center border-b-2 border-gray-200 w-full mb-5">
            {currentWord || <span className="text-gray-300 text-sm font-normal">Type or tap letters...</span>}
          </div>

          {/* Honeycomb */}
          <div className="relative w-48 h-48 flex items-center justify-center my-2">
            {/* Center */}
            <button
              onClick={() => addLetter(CENTER_LETTER)}
              className="absolute z-10 w-14 h-14 bg-amber-400 hover:bg-amber-500 rounded-full font-black text-xl text-black shadow-sm flex items-center justify-center cursor-pointer active:scale-95 transition-all"
            >
              {CENTER_LETTER}
            </button>

            {/* Hexagon ring */}
            {OUTER_LETTERS.map((letter, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const radius = 62;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <button
                  key={letter}
                  onClick={() => addLetter(letter)}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                  className="absolute w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-full font-bold text-lg text-gray-900 shadow-xs flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                >
                  {letter}
                </button>
              );
            })}
          </div>

          {/* Action row */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleBackspace}
              className="border border-gray-300 hover:border-black text-xs font-semibold px-4 py-1.5 rounded-full"
            >
              Delete
            </button>
            <button
              onClick={handleSubmit}
              className="bg-black text-white hover:bg-gray-800 text-xs font-semibold px-5 py-1.5 rounded-full"
            >
              Enter
            </button>
          </div>

          {/* Found words */}
          {foundWords.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200 w-full text-xs">
              <span className="font-semibold text-gray-500">Words found ({foundWords.length}):</span>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {foundWords.map(w => (
                  <span key={w} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-[11px] font-medium">
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
