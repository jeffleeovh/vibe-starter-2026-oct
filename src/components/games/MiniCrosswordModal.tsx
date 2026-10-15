import React, { useState } from 'react';
import { X, RotateCcw, Check, Sparkles } from 'lucide-react';

interface MiniCrosswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 5x5 Mini Crossword Grid
// 1: NEWS, 2: POST, etc.
// Let's create an elegant, standard mini crossword
// Grid:
// [P, R, E, S, S]
// [A, U, D, I, O]
// [P, L, A, T, E]
// [E, E, L, S, .]
// [R, S, . . . .]
// Or a symmetrical 5x5:
// Word 1 Across: "TIMES"
// Word 2 Across: "IMAGE"
// Word 3 Across: "MEDIA"
// Word 4 Across: "EVENT"
// Word 5 Across: "STARS"

const SOLUTION = [
  ['T', 'I', 'M', 'E', 'S'],
  ['I', 'M', 'A', 'G', 'E'],
  ['M', 'E', 'D', 'I', 'A'],
  ['E', 'V', 'E', 'N', 'T'],
  ['S', 'T', 'A', 'R', 'S']
];

const CLUES_ACROSS = [
  { num: 1, text: 'Prestigious New York broadsheet' },
  { num: 2, text: 'Visual photo or illustration' },
  { num: 3, text: 'Journalism and broadcast channels' },
  { num: 4, text: 'Breaking news gathering or summit' },
  { num: 5, text: 'Celebrities or astrological symbols' }
];

const CLUES_DOWN = [
  { num: 1, text: 'Clock ticks or historic eras' },
  { num: 2, text: 'Direct messaging communication' },
  { num: 3, text: 'Created or fashioned by hand' },
  { num: 4, text: 'Motor engine in high gear' },
  { num: 5, text: 'Signs of success or stellar bodies' }
];

export const MiniCrosswordModal: React.FC<MiniCrosswordModalProps> = ({ isOpen, onClose }) => {
  const [grid, setGrid] = useState<string[][]>(
    Array(5).fill('').map(() => Array(5).fill(''))
  );
  const [activeCell, setActiveCell] = useState<[number, number]>([0, 0]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [checked, setChecked] = useState(false);

  if (!isOpen) return null;

  const handleCellClick = (r: number, c: number) => {
    setActiveCell([r, c]);
  };

  const handleInput = (val: string) => {
    const [r, c] = activeCell;
    const char = val.toUpperCase().slice(-1);
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = char;
    setGrid(newGrid);

    // Auto advance
    if (c < 4) {
      setActiveCell([r, c + 1]);
    } else if (r < 4) {
      setActiveCell([r + 1, 0]);
    }

    // Check completion
    const allFilled = newGrid.every(row => row.every(cell => cell.length === 1));
    if (allFilled) {
      const correct = newGrid.every((row, ri) =>
        row.every((cell, ci) => cell === SOLUTION[ri][ci])
      );
      if (correct) {
        setIsCompleted(true);
      }
    }
  };

  const resetGrid = () => {
    setGrid(Array(5).fill('').map(() => Array(5).fill('')));
    setActiveCell([0, 0]);
    setIsCompleted(false);
    setChecked(false);
  };

  const revealSolution = () => {
    setGrid(SOLUTION);
    setIsCompleted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-lg rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div>
            <h2 className="font-serif font-black text-xl tracking-tight">The Mini Crossword</h2>
            <p className="text-[11px] text-gray-500">Solve today’s quick 5×5 editorial puzzle</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetGrid}
              className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
              title="Reset"
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

        {/* Content */}
        <div className="p-4 overflow-y-auto flex flex-col md:flex-row gap-5 items-center md:items-start justify-center">
          {/* 5x5 Grid */}
          <div className="flex flex-col items-center">
            <div className="border-2 border-black grid grid-cols-5 gap-0 bg-black">
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  const isSelected = activeCell[0] === r && activeCell[1] === c;
                  const isCorrect = cell === SOLUTION[r][c];
                  return (
                    <div
                      key={`${r}-${c}`}
                      onClick={() => handleCellClick(r, c)}
                      className={`relative w-12 h-12 bg-white border border-gray-300 flex items-center justify-center cursor-pointer select-none font-bold text-lg ${
                        isSelected ? 'bg-amber-100 ring-2 ring-blue-500 z-10' : ''
                      } ${checked && !isCorrect && cell ? 'text-red-600 bg-red-50' : ''}`}
                    >
                      {/* Numbering */}
                      {(r === 0 || c === 0) && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-sans font-semibold text-gray-500">
                          {r === 0 ? c + 1 : r + 1}
                        </span>
                      )}
                      <input
                        type="text"
                        maxLength={1}
                        value={cell}
                        onChange={(e) => handleInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !cell && c > 0) {
                            setActiveCell([r, c - 1]);
                          }
                        }}
                        className="w-full h-full text-center uppercase font-bold text-base bg-transparent border-none outline-hidden focus:ring-0 cursor-pointer"
                      />
                    </div>
                  );
                })
              )}
            </div>

            {isCompleted && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 border border-emerald-200 rounded-sm animate-bounce">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Congratulations! Puzzle solved!
              </div>
            )}
          </div>

          {/* Clues Column */}
          <div className="flex-1 w-full space-y-3 text-xs font-sans">
            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-nyt-black border-b border-gray-200 pb-1 mb-1.5">
                Across
              </h4>
              <ul className="space-y-1 text-gray-700">
                {CLUES_ACROSS.map((clue) => (
                  <li key={clue.num} className="leading-snug">
                    <strong className="text-black font-semibold mr-1">{clue.num}</strong>
                    {clue.text}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[11px] uppercase tracking-wider text-nyt-black border-b border-gray-200 pb-1 mb-1.5">
                Down
              </h4>
              <ul className="space-y-1 text-gray-700">
                {CLUES_DOWN.map((clue) => (
                  <li key={clue.num} className="leading-snug">
                    <strong className="text-black font-semibold mr-1">{clue.num}</strong>
                    {clue.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setChecked(true)}
            className="border border-gray-300 hover:border-black text-xs font-semibold px-3 py-1.5 rounded-sm"
          >
            Check Errors
          </button>
          <div className="flex gap-2">
            <button
              onClick={revealSolution}
              className="text-gray-600 hover:text-black text-xs font-semibold px-3 py-1.5"
            >
              Reveal
            </button>
            <button
              onClick={onClose}
              className="bg-black text-white hover:bg-gray-800 text-xs font-semibold px-4 py-1.5 rounded-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
