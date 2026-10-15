import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bookmark,
  Share2,
  MessageSquare,
  Type,
  Sun,
  Moon,
  BookOpen,
  Check
} from 'lucide-react';
import { Article, ReadingMode } from '../types';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onOpenComments: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  readingMode: ReadingMode;
  onSetReadingMode: (mode: ReadingMode) => void;
  fontSize: 'small' | 'medium' | 'large';
  onSetFontSize: (size: 'small' | 'medium' | 'large') => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onOpenComments,
  isBookmarked,
  onToggleBookmark,
  readingMode,
  onSetReadingMode,
  fontSize,
  onSetFontSize,
  onSelectArticle,
  allArticles
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const fontSizeClass =
    fontSize === 'small'
      ? 'text-[15px] leading-relaxed'
      : fontSize === 'large'
      ? 'text-[19px] leading-loose'
      : 'text-[17px] leading-relaxed';

  return (
    <article className="min-h-screen bg-white transition-colors duration-200">
      {/* Sticky Reader Utility Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-nyt-rule transition-colors">
        <div className="max-w-[1040px] mx-auto px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-nyt-black hover:text-gray-600 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Front Page</span>
          </button>

          <div className="hidden sm:block text-xs font-serif italic text-gray-500">
            {article.category} • {article.pageNumber || 'Section A'}
          </div>

          <div className="flex items-center gap-3">
            {/* Font size toggles */}
            <div className="hidden md:flex items-center border border-gray-200 rounded-sm overflow-hidden text-xs">
              <button
                onClick={() => onSetFontSize('small')}
                className={`px-2 py-1 ${fontSize === 'small' ? 'bg-black text-white font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => onSetFontSize('medium')}
                className={`px-2 py-1 ${fontSize === 'medium' ? 'bg-black text-white font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                title="Standard text"
              >
                A
              </button>
              <button
                onClick={() => onSetFontSize('large')}
                className={`px-2 py-1 ${fontSize === 'large' ? 'bg-black text-white font-bold' : 'hover:bg-gray-100 text-gray-700'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Reading Theme selector */}
            <div className="flex items-center gap-1 text-gray-600">
              <button
                onClick={() => onSetReadingMode('normal')}
                className={`p-1.5 rounded-sm ${readingMode === 'normal' ? 'bg-gray-200 text-black' : 'hover:bg-gray-100'}`}
                title="Normal Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSetReadingMode('sepia')}
                className={`p-1.5 rounded-sm ${readingMode === 'sepia' ? 'bg-[#ded6c5] text-black' : 'hover:bg-gray-100'}`}
                title="Sepia Theme"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSetReadingMode('night')}
                className={`p-1.5 rounded-sm ${readingMode === 'night' ? 'bg-gray-800 text-white' : 'hover:bg-gray-100'}`}
                title="Night Theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-4 w-px bg-gray-200" />

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-1.5 rounded-sm transition-colors ${
                isBookmarked ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-black'
              }`}
              title={isBookmarked ? 'Saved to Reading List' : 'Save article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-1.5 text-gray-500 hover:text-black rounded-sm relative"
              title="Share article"
            >
              {copiedShare ? (
                <span className="flex items-center text-[10px] text-emerald-700 font-bold gap-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>

            {/* Comments trigger */}
            <button
              onClick={() => onOpenComments(article)}
              className="flex items-center gap-1 text-xs font-semibold text-gray-700 hover:text-black px-2 py-1 rounded-sm bg-gray-100 hover:bg-gray-200"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{article.commentsCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="max-w-[760px] mx-auto px-4 pt-8 pb-20">
        {/* Kicker / Category */}
        <div className="flex items-center gap-2 mb-2 text-xs uppercase font-bold tracking-wider text-gray-500">
          <span className="text-black">{article.category}</span>
          {article.kicker && (
            <>
              <span>•</span>
              <span className="text-gray-600">{article.kicker}</span>
            </>
          )}
        </div>

        {/* Headline */}
        <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15] text-nyt-black mb-3">
          {article.title}
        </h1>

        {/* Subhead / Standfirst */}
        {article.subhead && (
          <p className="font-serif text-lg sm:text-xl text-gray-700 leading-snug mb-5">
            {article.subhead}
          </p>
        )}

        {/* Byline & Date strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-y border-nyt-rule text-xs font-sans text-gray-600 gap-2 mb-6">
          <div className="font-semibold text-gray-900">{article.byline}</div>
          <div className="flex items-center space-x-3 text-gray-500">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Audio Player Widget */}
        <div className="p-3 bg-gray-50 border border-nyt-rule rounded-sm mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-9 h-9 rounded-full bg-black text-white hover:bg-gray-800 flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <div>
              <div className="text-xs font-bold font-sans text-nyt-black">
                {isPlayingAudio ? 'Playing Audio Article' : 'Listen to This Article'}
              </div>
              <div className="text-[11px] text-gray-500 font-sans">
                {article.audioMinutes || 5} min • Narrated by NYT Audio
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-500">
            <span>{isPlayingAudio ? '01:24' : '00:00'}</span>
            <div className="w-32 bg-gray-200 h-1 rounded-full overflow-hidden">
              <div
                className={`bg-black h-full ${isPlayingAudio ? 'w-1/3 animate-pulse' : 'w-0'}`}
              />
            </div>
            <span>0{article.audioMinutes || 5}:00</span>
          </div>
        </div>

        {/* Article Image if present */}
        {article.imageUrl && (
          <figure className="my-6">
            <img
              src={article.imageUrl}
              alt={article.imageCaption || article.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover border border-gray-100"
            />
            {(article.imageCaption || article.imageCredit) && (
              <figcaption className="text-xs text-gray-600 mt-2 font-serif flex flex-col sm:flex-row justify-between gap-1">
                <span>{article.imageCaption}</span>
                {article.imageCredit && (
                  <span className="text-gray-400 font-sans text-[11px] shrink-0">
                    {article.imageCredit}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        )}

        {/* Takeaways Box */}
        {article.takeaways && article.takeaways.length > 0 && (
          <div className="my-6 p-4 bg-gray-50 border border-nyt-rule rounded-sm">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-700 font-sans mb-2">
              Key Takeaways
            </div>
            <ul className="space-y-1.5 font-serif text-xs text-gray-800 list-disc pl-4">
              {article.takeaways.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Body Paragraphs with Drop Cap */}
        <div className={`font-serif text-gray-800 space-y-5 ${fontSizeClass}`}>
          {article.paragraphs.map((para, idx) => (
            <p
              key={idx}
              className={idx === 0 ? 'article-drop-cap' : ''}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Pull Quote */}
        {article.pullQuote && (
          <blockquote className="my-8 py-4 border-y border-nyt-rule text-center">
            <p className="font-serif italic text-xl sm:text-2xl text-nyt-black leading-snug max-w-xl mx-auto">
              “{article.pullQuote}”
            </p>
          </blockquote>
        )}

        {/* Reporter Byline / Bio Box */}
        <div className="mt-12 pt-6 border-t-2 border-nyt-black flex items-center justify-between">
          <div>
            <div className="font-serif font-bold text-base text-nyt-black">{article.byline}</div>
            <div className="text-xs text-gray-500 font-sans">
              Covering national politics, foreign affairs, and administrative governance for The New York Times.
            </div>
          </div>
          <button
            onClick={() => onOpenComments(article)}
            className="bg-black hover:bg-gray-800 text-white font-sans text-xs font-semibold px-4 py-2 rounded-sm cursor-pointer shrink-0"
          >
            Read {article.commentsCount} Comments
          </button>
        </div>

        {/* Related Coverage */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 pt-6 border-t border-nyt-rule">
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-gray-700 mb-4">
              Related Coverage
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectArticle(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer group space-y-1"
                >
                  <span className="text-[10px] font-bold uppercase text-gray-500 font-sans">
                    {rel.category}
                  </span>
                  <h4 className="font-serif font-bold text-sm leading-snug group-hover:text-gray-700">
                    {rel.title}
                  </h4>
                  <div className="text-[10px] text-gray-400 font-sans">{rel.readTime}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
