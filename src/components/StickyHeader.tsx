import React, { useState, useEffect } from 'react';
import { Search, Bookmark, User, Share2, Volume2, ArrowUp } from 'lucide-react';
import { Article, SectionType } from '../types';

interface StickyHeaderProps {
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenSubscribe: () => void;
  isSubscribed: boolean;
  savedCount: number;
  activeSection: SectionType;
  currentArticle: Article | null;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  onGoHome,
  onOpenSearch,
  onOpenAccount,
  onOpenSubscribe,
  isSubscribed,
  savedCount,
  activeSection,
  currentArticle,
  isPlayingAudio,
  onToggleAudio
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-nyt-rule shadow-xs transition-transform duration-200">
      <div className="max-w-[1340px] mx-auto px-4 h-11 flex items-center justify-between text-xs">
        {/* Left: Mini Masthead & Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="masthead-title text-xl font-bold tracking-tight text-nyt-black hover:opacity-80 cursor-pointer"
          >
            The New York Times
          </button>
          <div className="hidden sm:flex items-center gap-2 text-gray-400">
            <span>|</span>
            <span className="font-semibold text-gray-800 uppercase text-[10px] tracking-wider">
              {currentArticle ? currentArticle.category : activeSection}
            </span>
            {currentArticle && (
              <>
                <span>•</span>
                <span className="font-serif text-gray-600 line-clamp-1 max-w-[320px] text-xs">
                  {currentArticle.title}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleAudio}
            className={`p-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-medium ${
              isPlayingAudio ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
            title="Audio player"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isPlayingAudio ? 'Playing' : 'Listen'}</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-sm cursor-pointer"
            title="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenAccount}
            className="p-1.5 text-gray-600 hover:text-black hover:bg-gray-100 rounded-sm cursor-pointer relative"
            title="Saved Articles"
          >
            <Bookmark className="w-3.5 h-3.5" />
            {savedCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-black text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSubscribe}
            className={`font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
              isSubscribed
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-[#567b95] hover:bg-[#43637a] text-white'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded-sm cursor-pointer ml-1"
            title="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
