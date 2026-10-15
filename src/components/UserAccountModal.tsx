import React from 'react';
import { X, Bookmark, User, Sun, Moon, BookOpen, LogOut, Check } from 'lucide-react';
import { Article, ReadingMode } from '../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  readingMode: ReadingMode;
  onSetReadingMode: (mode: ReadingMode) => void;
  fontSize: 'small' | 'medium' | 'large';
  onSetFontSize: (size: 'small' | 'medium' | 'large') => void;
  isLoggedIn: boolean;
  onToggleLogin: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  readingMode,
  onSetReadingMode,
  fontSize,
  onSetFontSize,
  isLoggedIn,
  onToggleLogin
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-lg rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-700" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-nyt-black">
              Reader Account &amp; Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* User Status */}
          <div className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-sm">
            <div>
              <div className="font-serif font-bold text-base text-nyt-black">
                {isLoggedIn ? 'Subscriber Edition' : 'Guest Reader'}
              </div>
              <div className="text-xs text-gray-500 font-sans">
                {isLoggedIn ? 'All Access Digital Subscriber' : 'Sign in to sync saved articles across devices'}
              </div>
            </div>
            <button
              onClick={onToggleLogin}
              className={`text-xs font-semibold px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                isLoggedIn
                  ? 'border border-gray-300 hover:border-black text-gray-700'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
          </div>

          {/* Reading Display Settings */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black mb-2.5">
              Reading Theme
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onSetReadingMode('normal')}
                className={`p-2.5 border rounded-sm text-xs font-medium flex items-center justify-center gap-2 cursor-pointer ${
                  readingMode === 'normal'
                    ? 'border-black ring-1 ring-black bg-white text-black'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                Default
              </button>
              <button
                onClick={() => onSetReadingMode('sepia')}
                className={`p-2.5 border rounded-sm text-xs font-medium flex items-center justify-center gap-2 cursor-pointer bg-[#f7f4ed] text-[#2b2b2b] ${
                  readingMode === 'sepia'
                    ? 'border-[#7d6b53] ring-1 ring-[#7d6b53]'
                    : 'border-[#ded6c5] hover:border-[#b0a38b]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#7d6b53]" />
                Sepia
              </button>
              <button
                onClick={() => onSetReadingMode('night')}
                className={`p-2.5 border rounded-sm text-xs font-medium flex items-center justify-center gap-2 cursor-pointer bg-[#1a1a1a] text-white ${
                  readingMode === 'night'
                    ? 'border-white ring-1 ring-white'
                    : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-gray-300" />
                Night
              </button>
            </div>
          </div>

          {/* Font Size Preferences */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black mb-2.5">
              Reading Type Size
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                onClick={() => onSetFontSize('small')}
                className={`p-2 border rounded-sm font-serif cursor-pointer ${
                  fontSize === 'small' ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'
                }`}
              >
                Compact (14px)
              </button>
              <button
                onClick={() => onSetFontSize('medium')}
                className={`p-2 border rounded-sm font-serif cursor-pointer ${
                  fontSize === 'medium' ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'
                }`}
              >
                Standard (16px)
              </button>
              <button
                onClick={() => onSetFontSize('large')}
                className={`p-2 border rounded-sm font-serif cursor-pointer ${
                  fontSize === 'large' ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-black'
                }`}
              >
                Expanded (18px)
              </button>
            </div>
          </div>

          {/* Saved Articles */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                Saved For Later ({savedArticles.length})
              </h4>
            </div>

            {savedArticles.length === 0 ? (
              <p className="text-xs font-serif text-gray-500 italic p-3 bg-gray-50 border border-gray-200 rounded-sm">
                No saved articles yet. Click the bookmark icon on any headline or story to read later.
              </p>
            ) : (
              <div className="divide-y divide-gray-200 border border-gray-200 rounded-sm max-h-48 overflow-y-auto">
                {savedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art);
                      onClose();
                    }}
                    className="p-2.5 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-serif font-semibold text-xs text-nyt-black hover:text-gray-700 line-clamp-1">
                        {art.title}
                      </div>
                      <div className="text-[10px] text-gray-400 font-sans mt-0.5">
                        {art.category} • {art.readTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
