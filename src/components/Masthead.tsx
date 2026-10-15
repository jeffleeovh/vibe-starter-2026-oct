import React, { useState } from 'react';
import { Sun, CloudRain, Wind, Thermometer, ChevronDown } from 'lucide-react';

interface MastheadProps {
  onGoHome: () => void;
}

export const Masthead: React.FC<MastheadProps> = ({ onGoHome }) => {
  const [showWeatherPopover, setShowWeatherPopover] = useState(false);

  return (
    <section className="max-w-[1340px] mx-auto px-4 my-2 sm:my-3 relative">
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-2">
        {/* Left Ear: Historic Broadside Motto & Issue */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-center text-left text-[10px] font-serif text-gray-600 leading-tight border-r border-nyt-rule pr-4">
          <div className="italic text-gray-800 font-medium">“All the News That’s Fit to Print”</div>
          <div className="text-gray-400 font-sans uppercase tracking-wider text-[9px] mt-1">
            VOL. CLXXVI . . . No. 60,305
          </div>
          <div className="text-gray-500 font-sans text-[9px] mt-0.5">
            Late Edition • Established 1851
          </div>
        </div>

        {/* Center: The Iconic Gothic Masthead */}
        <div className="col-span-1 md:col-span-6 text-center">
          <h1
            onClick={onGoHome}
            className="masthead-title text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-nyt-black select-none cursor-pointer hover:opacity-90 transition-opacity"
            title="The New York Times"
          >
            The New York Times
          </h1>
        </div>

        {/* Right Ear: Live Interactive Weather & Market */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-center text-right text-[10px] font-sans text-gray-600 leading-tight border-l border-nyt-rule pl-4 relative">
          <div
            className="inline-flex items-center justify-end gap-1.5 cursor-pointer group"
            onClick={() => setShowWeatherPopover(!showWeatherPopover)}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-gray-900 group-hover:underline">New York: 64°F</span>
            <span className="text-gray-400">/ 51°F</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
          <div className="text-gray-500 text-[9px] mt-1">
            Sunny • Air Quality: Good (34)
          </div>
          <div className="text-gray-400 text-[9px] mt-0.5">
            Updated 2:27 PM EDT
          </div>

          {/* Weather Popover */}
          {showWeatherPopover && (
            <div className="absolute right-0 top-12 z-30 bg-white border border-gray-300 rounded-sm shadow-xl p-3 text-left w-56 animate-in fade-in">
              <div className="font-bold text-xs text-black border-b border-gray-200 pb-1 mb-2">
                New York, NY Forecast
              </div>
              <div className="space-y-1.5 text-[11px] text-gray-700 font-sans">
                <div className="flex justify-between">
                  <span>Today</span>
                  <span className="font-medium">64° / 51° • Clear</span>
                </div>
                <div className="flex justify-between">
                  <span>Thursday</span>
                  <span className="font-medium">61° / 48° • Partly Cloudy</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday</span>
                  <span className="font-medium">66° / 53° • Sunny</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">58° / 45° • Breezy</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
