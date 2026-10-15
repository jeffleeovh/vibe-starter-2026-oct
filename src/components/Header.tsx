import React, { useState } from 'react';
import { Search as SearchIcon, TrendingUp, User, Bookmark } from 'lucide-react';
import { SectionType } from '../types';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenAccount: () => void;
  onToggleTodaysPaper: () => void;
  isTodaysPaperActive: boolean;
  isSubscribed: boolean;
  isLoggedIn: boolean;
  currentEdition: string;
  onSelectEdition: (edition: string) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenSubscribe,
  onOpenAccount,
  onToggleTodaysPaper,
  isTodaysPaperActive,
  isSubscribed,
  isLoggedIn,
  currentEdition,
  onSelectEdition,
  savedCount
}) => {
  const [showStockTooltip, setShowStockTooltip] = useState(false);
  const editions = ['U.S.', 'International', 'Canada', 'Español', '中文'];

  return (
    <header className="max-w-[1340px] mx-auto px-4 pt-2.5 pb-1 text-xs">
      {/* Top utility bar: date, editions, CTA buttons */}
      <div className="flex items-center justify-between pb-2">
        {/* Left side: search icon & edition toggle */}
        <div className="flex items-center space-x-4 text-[11px] font-medium text-gray-700">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1 hover:text-black cursor-pointer transition-colors"
          >
            <SearchIcon className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="uppercase tracking-widest text-[10px] font-semibold">Search</span>
          </button>
          <span className="text-gray-300">|</span>
          <nav className="hidden md:flex items-center space-x-2 font-normal text-gray-600">
            {editions.map((ed) => (
              <button
                key={ed}
                onClick={() => onSelectEdition(ed)}
                className={`transition-colors cursor-pointer text-[10px] uppercase ${
                  currentEdition === ed
                    ? 'font-bold text-black'
                    : 'hover:underline text-gray-600'
                }`}
              >
                {ed}
              </button>
            ))}
          </nav>
        </div>

        {/* Right side: subscriptions and user access */}
        <div className="flex items-center space-x-2.5">
          {savedCount > 0 && (
            <button
              onClick={onOpenAccount}
              className="hidden sm:flex items-center gap-1 text-[11px] text-gray-600 hover:text-black font-medium mr-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 fill-current" />
              <span>Saved ({savedCount})</span>
            </button>
          )}

          <button
            onClick={onOpenSubscribe}
            className={`font-bold text-[11px] tracking-wide uppercase px-3 py-1.5 rounded-xs transition-colors cursor-pointer ${
              isSubscribed
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-[#567b95] hover:bg-[#43637a] text-white'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe for $1/week'}
          </button>

          <button
            onClick={onOpenAccount}
            className="border border-gray-400 hover:border-black font-semibold text-[11px] px-3 py-1.5 rounded-xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <User className="w-3 h-3" />
            <span>{isLoggedIn ? 'Account' : 'Log In'}</span>
          </button>
        </div>
      </div>

      {/* Date line, today's paper indicator, stock index */}
      <div className="flex items-center justify-between text-[11px] text-gray-600 border-b border-nyt-rule pb-2 pt-1 font-sans">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-nyt-black">Wednesday, October 14, 2026</span>
          <span>•</span>
          <button
            onClick={onToggleTodaysPaper}
            className={`hover:underline cursor-pointer font-medium ${
              isTodaysPaperActive ? 'text-[#326891] font-bold underline' : 'text-gray-600 hover:text-black'
            }`}
          >
            Today’s Paper
          </button>
        </div>

        <div
          className="hidden sm:flex items-center space-x-3 text-[11px] text-gray-500 font-normal relative"
          onMouseEnter={() => setShowStockTooltip(true)}
          onMouseLeave={() => setShowStockTooltip(false)}
        >
          <span className="cursor-pointer">
            S&amp;P 500 <strong className="text-emerald-700 font-medium">+0.48%</strong>
          </span>
          <span className="cursor-pointer">
            Nasdaq <strong className="text-emerald-700 font-medium">+0.82%</strong>
          </span>

          {showStockTooltip && (
            <div className="absolute right-0 top-6 z-30 bg-black text-white p-2 rounded shadow-lg text-[10px] whitespace-nowrap animate-in fade-in">
              Markets open in New York • S&amp;P: 5,892.40 • Nasdaq: 18,485.20
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
