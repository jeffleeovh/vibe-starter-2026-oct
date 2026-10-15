import React from 'react';
import { X, Radio, Trophy, ArrowRight } from 'lucide-react';

interface AthleticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AthleticModal: React.FC<AthleticModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-2xl rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-red-50/40">
          <div className="flex items-center gap-2">
            <span className="font-sans font-black text-xs uppercase tracking-wider text-nyt-black">
              The Athletic • Postseason
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#c00] bg-red-100 px-2 py-0.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c00] animate-ping" />
              Live • Top 7th
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scoreboard */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              National League Championship Series • Game 3 (Series tied 1-1)
            </div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-nyt-black">
              Brewers Lead Dodgers in Game 3
            </h1>
            <p className="font-serif text-sm text-gray-600 italic mt-0.5">
              Chourio homered on the first pitch of the game, setting the tone at American Family Field.
            </p>
          </div>

          {/* Line Score Table */}
          <div className="overflow-x-auto border border-gray-200 rounded-sm">
            <table className="w-full text-center text-xs font-sans">
              <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200">
                <tr>
                  <th className="py-2 px-3 text-left">Team</th>
                  <th className="py-2 px-1">1</th>
                  <th className="py-2 px-1">2</th>
                  <th className="py-2 px-1">3</th>
                  <th className="py-2 px-1">4</th>
                  <th className="py-2 px-1">5</th>
                  <th className="py-2 px-1">6</th>
                  <th className="py-2 px-1">7</th>
                  <th className="py-2 px-1 font-bold">R</th>
                  <th className="py-2 px-1 font-bold">H</th>
                  <th className="py-2 px-1 font-bold">E</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 text-left font-bold flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-700 inline-block" />
                    Dodgers (LAD)
                  </td>
                  <td className="py-2 px-1">0</td>
                  <td className="py-2 px-1">0</td>
                  <td className="py-2 px-1">1</td>
                  <td className="py-2 px-1">0</td>
                  <td className="py-2 px-1">0</td>
                  <td className="py-2 px-1">1</td>
                  <td className="py-2 px-1">-</td>
                  <td className="py-2 px-1 font-bold text-sm">2</td>
                  <td className="py-2 px-1">6</td>
                  <td className="py-2 px-1">0</td>
                </tr>
                <tr className="bg-yellow-50/50 hover:bg-yellow-50">
                  <td className="py-2.5 px-3 text-left font-bold flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-600 inline-block" />
                    Brewers (MIL)
                  </td>
                  <td className="py-2 px-1">2</td>
                  <td className="py-2 px-1">0</td>
                  <td className="py-2 px-1">1</td>
                  <td className="py-2 px-1">0</td>
                  <td className="py-2 px-1">2</td>
                  <td className="py-2 px-1">0</td>
                  <td className="py-2 px-1">-</td>
                  <td className="py-2 px-1 font-bold text-sm text-amber-900">5</td>
                  <td className="py-2 px-1">9</td>
                  <td className="py-2 px-1">0</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key Game Plays */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black mb-3">
              Play-By-Play Highlights
            </h4>
            <div className="space-y-3 text-xs font-serif">
              <div className="p-2.5 border-l-2 border-amber-600 bg-gray-50">
                <span className="font-sans font-bold text-[10px] text-gray-500 uppercase block mb-0.5">Bottom 1st</span>
                Jackson Chourio crushes a 405-foot leadoff home run to deep center on an 0-0 fastball from Glasnow.
              </div>
              <div className="p-2.5 border-l-2 border-blue-600 bg-gray-50">
                <span className="font-sans font-bold text-[10px] text-gray-500 uppercase block mb-0.5">Top 3rd</span>
                Shohei Ohtani doubles down the right-field line, driving in Mookie Betts from second base.
              </div>
              <div className="p-2.5 border-l-2 border-amber-600 bg-gray-50">
                <span className="font-sans font-bold text-[10px] text-gray-500 uppercase block mb-0.5">Bottom 5th</span>
                William Contreras laces a 2-run double to the gap in right-center, scoring Ortiz and Yelich.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
