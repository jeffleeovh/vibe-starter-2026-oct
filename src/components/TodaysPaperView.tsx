import React from 'react';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import { Article } from '../types';

interface TodaysPaperViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onClose: () => void;
}

export const TodaysPaperView: React.FC<TodaysPaperViewProps> = ({
  articles,
  onSelectArticle,
  onClose
}) => {
  const sections = [
    { name: 'Section A • Main News', code: 'A', pages: ['Page A1', 'Page A3', 'Page A4', 'Page A6', 'Page A8', 'Page A12', 'Page A15', 'Page A16', 'Page A22', 'Page A23'] },
    { name: 'Section B • Business & Technology', code: 'B', pages: ['Page B1', 'Page B4', 'Page B6'] },
    { name: 'Section C • Arts & Culture', code: 'C', pages: ['Page C1', 'Page C3'] }
  ];

  return (
    <div className="max-w-[1340px] mx-auto px-4 py-6">
      {/* Banner */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-nyt-black mb-6">
        <div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-nyt-black hover:text-gray-600 cursor-pointer mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Front Page</span>
          </button>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-nyt-black">
            Today’s Paper: Wednesday, October 14, 2026
          </h1>
          <p className="font-serif text-sm text-gray-600 mt-1">
            The complete daily digest of the print broadsheet edition as published in New York.
          </p>
        </div>
      </div>

      {/* Sections and articles list */}
      <div className="space-y-8">
        {sections.map((sec) => {
          const secArticles = articles.filter((a) =>
            a.pageNumber ? a.pageNumber.includes(sec.code) : true
          );

          return (
            <div key={sec.code} className="space-y-4">
              <div className="flex items-center justify-between border-b border-nyt-black pb-1">
                <h2 className="font-serif font-bold text-xl text-nyt-black">{sec.name}</h2>
                <span className="text-xs font-sans text-gray-500 uppercase tracking-wider">
                  {secArticles.length} Stories
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="p-3 border border-gray-200 hover:border-black cursor-pointer transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-wider text-gray-500 mb-1">
                        <span>{art.pageNumber || 'Page A1'}</span>
                        <span className="text-black">{art.category}</span>
                      </div>
                      <h3 className="font-serif font-bold text-base leading-snug group-hover:text-gray-700 mb-1.5">
                        {art.title}
                      </h3>
                      <p className="font-serif text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-sans">
                      <span>{art.byline}</span>
                      <span>{art.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
