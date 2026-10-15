import React from 'react';
import { X, CheckCircle2, ShieldCheck, ExternalLink, Zap } from 'lucide-react';

interface WirecutterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WirecutterModal: React.FC<WirecutterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-2xl rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-blue-50/50">
          <div className="flex items-center gap-2 text-blue-900">
            <ShieldCheck className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-wider">Wirecutter • Tested & Recommended</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Guide Updated Oct 2026</span>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-nyt-black mt-0.5 mb-1.5">
              The Best Air Purifiers for 2026
            </h1>
            <p className="font-serif text-sm text-gray-700 leading-relaxed">
              After rigorous laboratory smoke, pet dander, and aerosolized pollen tests spanning 240 continuous operating hours, one classic unit remains undefeated.
            </p>
          </div>

          {/* Top Pick Box */}
          <div className="p-4 bg-gray-50 border-2 border-blue-600 rounded-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                Our Top Pick
              </span>
              <span className="text-xs font-bold text-gray-700">$219 at Amazon</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-nyt-black mb-1">
              Coway Airmega AP-1512HH Mighty
            </h3>
            <p className="text-xs text-gray-700 font-serif leading-relaxed mb-3">
              Compact, whisper-quiet at night, and extraordinarily effective at scrubbing wildfire smoke particles down to 0.3 microns. It cleared our 200-sq-ft test chamber in under 18 minutes.
            </p>

            <div className="grid grid-cols-3 gap-2 py-2 border-t border-gray-200 text-[11px] font-sans">
              <div>
                <span className="text-gray-500 block">CADR Rating:</span>
                <strong className="text-black">233 / 246 / 240</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Noise Level:</span>
                <strong className="text-black">24.4 dB (Low)</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Filter Cost:</span>
                <strong className="text-black">$55 / year</strong>
              </div>
            </div>
          </div>

          {/* Also Great */}
          <div className="p-4 border border-gray-200 rounded-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="bg-gray-800 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm">
                Runner-Up (Large Rooms)
              </span>
              <span className="text-xs font-bold text-gray-700">$349 at Best Buy</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-nyt-black mb-1">
              Levoit Core 600S Smart
            </h3>
            <p className="text-xs text-gray-700 font-serif leading-relaxed">
              Ideal for open-concept living rooms up to 635 square feet, featuring continuous laser PM2.5 air-quality monitoring and smart app integration.
            </p>
          </div>

          {/* Key Findings */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black mb-2">
              Why You Should Trust Us
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-700 font-serif list-disc pl-4">
              <li>Tested 42 distinct purifiers across 9 years of controlled indoor chamber simulations.</li>
              <li>Used industrial particle counters measuring particulate counts every 5 seconds.</li>
              <li>Purchased all test models at standard retail prices to guarantee zero manufacturer influence.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
