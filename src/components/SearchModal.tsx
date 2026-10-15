import React, { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Calendar, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      art.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesQuery =
      query.trim() === '' ||
      art.title.toLowerCase().includes(query.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      art.byline.toLowerCase().includes(query.toLowerCase()) ||
      (art.kicker && art.kicker.toLowerCase().includes(query.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const categories = ['all', 'U.S.', 'World', 'Business', 'Opinion', 'Arts'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-2xl rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 gap-3">
          <SearchIcon className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all New York Times articles, topics, and authors..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-serif outline-hidden border-none focus:ring-0 placeholder:text-gray-400 placeholder:font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 text-gray-600 hover:text-black border border-gray-300 rounded hover:border-black shrink-0"
          >
            Esc
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 flex items-center gap-2 overflow-x-auto text-[11px] font-sans">
          <span className="text-gray-500 font-medium shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap capitalize cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-black text-white font-semibold'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-gray-100 flex-1 p-2">
          {filteredArticles.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm font-serif">
              No articles found matching “{query}”. Try searching for “Trump”, “Ukraine”, “Polls”, or “AI”.
            </div>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="p-3.5 hover:bg-gray-50 cursor-pointer transition-colors group flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-gray-500">
                    <span className="text-black">{article.category}</span>
                    {article.kicker && (
                      <>
                        <span>•</span>
                        <span>{article.kicker}</span>
                      </>
                    )}
                  </div>
                  <h4 className="font-serif font-bold text-base leading-snug group-hover:text-gray-700">
                    {article.title}
                  </h4>
                  <p className="font-serif text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-gray-400 font-sans pt-1">
                    <span>{article.byline}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
