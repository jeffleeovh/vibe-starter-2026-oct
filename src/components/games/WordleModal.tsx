import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Award } from 'lucide-react';

interface WordleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TARGET_WORDS = ['TIMES', 'PRESS', 'MEDIA', 'DAILY', 'STORY', 'PRINT'];
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

export const WordleModal: React.FC<WordleModalProps> = ({ isOpen, onClose }) => {
  const [targetWordIndex, setTargetWordIndex] = useState(0);
  const targetWord = TARGET_WORDS[targetWordIndex];
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleKey = (key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        showToast('Not enough letters');
        return;
      }
      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      setCurrentGuess('');

      if (currentGuess.toUpperCase() === targetWord) {
        setGameStatus('won');
        showToast('Splendid! You guessed the word!');
      } else if (newGuesses.length >= 6) {
        setGameStatus('lost');
        showToast(`The word was ${targetWord}`);
      }
      return;
    }

    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key.toUpperCase());
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        handleKey('ENTER');
      } else if (e.key === 'Backspace') {
        handleKey('⌫');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKey(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentGuess, gameStatus, guesses]);

  const restartGame = () => {
    setTargetWordIndex((prev) => (prev + 1) % TARGET_WORDS.length);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
  };

  if (!isOpen) return null;

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (targetWord[index] === letter) return 'correct';
    if (targetWord.includes(letter)) return 'present';
    return 'absent';
  };

  const getKeyStatus = (key: string) => {
    let status = '';
    guesses.forEach(guess => {
      guess.split('').forEach((char, idx) => {
        if (char === key) {
          if (targetWord[idx] === char) {
            status = 'correct';
          } else if (targetWord.includes(char) && status !== 'correct') {
            status = 'present';
          } else if (status === '') {
            status = 'absent';
          }
        }
      });
    });
    return status;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-md rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-xl tracking-tight">Wordle</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-sm">
              Daily Puzzle
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={restartGame}
              className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
              title="New Game"
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

        {/* Notification Toast */}
        {toastMessage && (
          <div className="bg-black text-white text-xs font-semibold px-4 py-2 text-center shadow-md animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Wordle Grid */}
        <div className="p-4 flex-1 flex flex-col items-center justify-center">
          <div className="grid grid-rows-6 gap-1.5 my-2">
            {Array.from({ length: 6 }).map((_, rowIndex) => {
              const isCurrentRow = rowIndex === guesses.length;
              const guessWord = guesses[rowIndex] || (isCurrentRow ? currentGuess.padEnd(5, ' ') : '     ');

              return (
                <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 5 }).map((_, colIndex) => {
                    const letter = guessWord[colIndex] ? guessWord[colIndex].trim() : '';
                    const isEvaluated = rowIndex < guesses.length;
                    const status = isEvaluated ? getLetterStatus(letter, colIndex, guesses[rowIndex]) : '';

                    let bgClass = 'bg-white border-2 border-gray-300 text-black';
                    if (isEvaluated) {
                      if (status === 'correct') bgClass = 'bg-emerald-600 text-white border-emerald-600';
                      else if (status === 'present') bgClass = 'bg-amber-500 text-white border-amber-500';
                      else bgClass = 'bg-gray-500 text-white border-gray-500';
                    } else if (letter) {
                      bgClass = 'bg-white border-2 border-gray-800 text-black scale-105';
                    }

                    return (
                      <div
                        key={colIndex}
                        className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-lg uppercase transition-all duration-200 select-none ${bgClass}`}
                      >
                        {letter}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {gameStatus !== 'playing' && (
            <div className="mt-3 text-center p-3 bg-gray-50 border border-gray-200 rounded-sm w-full">
              <div className="flex items-center justify-center gap-1.5 font-bold text-sm text-gray-800 mb-1">
                <Award className="w-4 h-4 text-amber-600" />
                {gameStatus === 'won' ? 'Magnificent!' : 'Good try!'}
              </div>
              <p className="text-xs text-gray-600 mb-2">
                The target word was <span className="font-bold tracking-widest text-black">{targetWord}</span>.
              </p>
              <button
                onClick={restartGame}
                className="bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-sm hover:bg-gray-800"
              >
                Play Next Word
              </button>
            </div>
          )}
        </div>

        {/* Virtual Keyboard */}
        <div className="bg-gray-50 border-t border-gray-200 p-2 select-none">
          {KEYBOARD_ROWS.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1 my-1">
              {row.map((k) => {
                const status = getKeyStatus(k);
                let btnColor = 'bg-gray-200 text-gray-900 hover:bg-gray-300';
                if (status === 'correct') btnColor = 'bg-emerald-600 text-white';
                else if (status === 'present') btnColor = 'bg-amber-500 text-white';
                else if (status === 'absent') btnColor = 'bg-gray-400 text-white';

                const isWide = k === 'ENTER' || k === '⌫';

                return (
                  <button
                    key={k}
                    onClick={() => handleKey(k)}
                    className={`h-11 rounded font-bold text-xs flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
                      isWide ? 'px-3 text-[11px]' : 'w-8 sm:w-9'
                    } ${btnColor}`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
