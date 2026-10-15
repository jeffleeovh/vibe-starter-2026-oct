import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Masthead } from './components/Masthead';
import { Navigation } from './components/Navigation';
import { FrontPage } from './components/FrontPage';
import { ArticleReader } from './components/ArticleReader';
import { TodaysPaperView } from './components/TodaysPaperView';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { UserAccountModal } from './components/UserAccountModal';
import { CommentsDrawer } from './components/CommentsDrawer';
import { WordleModal } from './components/games/WordleModal';
import { ConnectionsModal } from './components/games/ConnectionsModal';
import { MiniCrosswordModal } from './components/games/MiniCrosswordModal';
import { SpellingBeeModal } from './components/games/SpellingBeeModal';
import { CookingModal } from './components/spotlights/CookingModal';
import { WirecutterModal } from './components/spotlights/WirecutterModal';
import { AthleticModal } from './components/spotlights/AthleticModal';
import { PollsModal } from './components/PollsModal';
import { ARTICLES, INITIAL_COMMENTS } from './data/newsData';
import { Article, CommentItem, ReadingMode, SectionType } from './types';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'frontpage' | 'article' | 'todays-paper'>('frontpage');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeSection, setActiveSection] = useState<SectionType>('u.s.');
  const [currentEdition, setCurrentEdition] = useState('U.S.');

  // Modals & Drawers state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentsArticle, setCommentsArticle] = useState<Article | null>(null);

  // Minigame modals
  const [isWordleOpen, setIsWordleOpen] = useState(false);
  const [isConnectionsOpen, setIsConnectionsOpen] = useState(false);
  const [isMiniCrosswordOpen, setIsMiniCrosswordOpen] = useState(false);
  const [isSpellingBeeOpen, setIsSpellingBeeOpen] = useState(false);

  // Spotlight modals
  const [isCookingOpen, setIsCookingOpen] = useState(false);
  const [isWirecutterOpen, setIsWirecutterOpen] = useState(false);
  const [isAthleticOpen, setIsAthleticOpen] = useState(false);
  const [isPollsModalOpen, setIsPollsModalOpen] = useState(false);

  // User reader preferences
  const [readingMode, setReadingMode] = useState<ReadingMode>('normal');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);

  // Global hotkeys (Search with '/' or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync reading mode class to body
  useEffect(() => {
    document.body.classList.remove('mode-sepia', 'mode-night');
    if (readingMode === 'sepia') {
      document.body.classList.add('mode-sepia');
    } else if (readingMode === 'night') {
      document.body.classList.add('mode-night');
    }
  }, [readingMode]);

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setActiveScreen('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenComments = (article: Article) => {
    setCommentsArticle(article);
    setIsCommentsOpen(true);
  };

  const handleToggleBookmark = (article: Article) => {
    setSavedArticleIds((prev) =>
      prev.includes(article.id)
        ? prev.filter((id) => id !== article.id)
        : [...prev, article.id]
    );
  };

  const handleAddComment = (newComment: CommentItem) => {
    setComments((prev) => [newComment, ...prev]);
  };

  const handleUpvoteComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c))
    );
  };

  const getArticleById = (id: string) => ARTICLES.find((a) => a.id === id);
  const savedArticles = ARTICLES.filter((a) => savedArticleIds.includes(a.id));

  // Filtered view when a specific section is selected (other than standard frontpage / u.s.)
  const isSectionFiltered =
    activeSection !== 'u.s.' &&
    activeSection !== 'games' &&
    activeSection !== 'cooking' &&
    activeSection !== 'wirecutter' &&
    activeSection !== 'the athletic';

  const sectionArticles = isSectionFiltered
    ? ARTICLES.filter(
        (a) => a.category.toLowerCase() === activeSection.toLowerCase()
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-gray-200">
      {/* Top Utility Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onToggleTodaysPaper={() => {
          if (activeScreen === 'todays-paper') {
            setActiveScreen('frontpage');
          } else {
            setActiveScreen('todays-paper');
          }
        }}
        isTodaysPaperActive={activeScreen === 'todays-paper'}
        isSubscribed={isSubscribed}
        isLoggedIn={isLoggedIn}
        currentEdition={currentEdition}
        onSelectEdition={setCurrentEdition}
        savedCount={savedArticles.length}
      />

      {/* Main Newspaper Masthead */}
      <Masthead
        onGoHome={() => {
          setActiveScreen('frontpage');
          setActiveSection('u.s.');
        }}
      />

      {/* Primary Section Navigation */}
      <Navigation
        activeSection={activeSection}
        onSelectSection={(sec) => {
          setActiveSection(sec);
          if (activeScreen !== 'frontpage') {
            setActiveScreen('frontpage');
          }
        }}
        onOpenGames={() => setIsWordleOpen(true)}
        onOpenCooking={() => setIsCookingOpen(true)}
        onOpenWirecutter={() => setIsWirecutterOpen(true)}
        onOpenAthletic={() => setIsAthleticOpen(true)}
      />

      {/* Screen 1: Today's Paper Digest */}
      {activeScreen === 'todays-paper' && (
        <TodaysPaperView
          articles={ARTICLES}
          onSelectArticle={handleSelectArticle}
          onClose={() => setActiveScreen('frontpage')}
        />
      )}

      {/* Screen 2: Article Reader Screen */}
      {activeScreen === 'article' && selectedArticle && (
        <ArticleReader
          article={selectedArticle}
          onBack={() => setActiveScreen('frontpage')}
          onOpenComments={handleOpenComments}
          isBookmarked={savedArticleIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          readingMode={readingMode}
          onSetReadingMode={setReadingMode}
          fontSize={fontSize}
          onSetFontSize={setFontSize}
          onSelectArticle={handleSelectArticle}
          allArticles={ARTICLES}
        />
      )}

      {/* Screen 3: Front Page Broadside (or Filtered Section) */}
      {activeScreen === 'frontpage' && (
        <>
          {isSectionFiltered && sectionArticles.length > 0 ? (
            <div className="max-w-[1340px] mx-auto px-4 py-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-nyt-black mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 font-sans">
                    Section Report
                  </span>
                  <h2 className="font-serif font-black text-3xl capitalize text-nyt-black">
                    {activeSection}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveSection('u.s.')}
                  className="text-xs text-[#326891] hover:underline font-semibold cursor-pointer"
                >
                  View Full Front Page ›
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {sectionArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => handleSelectArticle(art)}
                    className="p-4 border border-gray-200 hover:border-black cursor-pointer transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      {art.kicker && (
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 font-sans mb-1">
                          {art.kicker}
                        </div>
                      )}
                      <h3 className="font-serif font-bold text-lg leading-snug group-hover:text-gray-700 mb-2">
                        {art.title}
                      </h3>
                      <p className="font-serif text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {art.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-sans">
                      <span>{art.byline}</span>
                      <span>{art.readTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <FrontPage
              onSelectArticle={handleSelectArticle}
              onOpenComments={handleOpenComments}
              onOpenWordle={() => setIsWordleOpen(true)}
              onOpenConnections={() => setIsConnectionsOpen(true)}
              onOpenSpellingBee={() => setIsSpellingBeeOpen(true)}
              onOpenMiniCrossword={() => setIsMiniCrosswordOpen(true)}
              onOpenCooking={() => setIsCookingOpen(true)}
              onOpenWirecutter={() => setIsWirecutterOpen(true)}
              onOpenAthletic={() => setIsAthleticOpen(true)}
              onOpenPollsModal={() => setIsPollsModalOpen(true)}
              getArticleById={getArticleById}
            />
          )}
        </>
      )}

      {/* Site Footer */}
      <Footer
        onGoHome={() => {
          setActiveScreen('frontpage');
          setActiveSection('u.s.');
        }}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
      />

      {/* Global Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        isSubscribed={isSubscribed}
        onToggleSubscription={() => setIsSubscribed(!isSubscribed)}
      />

      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={handleSelectArticle}
        readingMode={readingMode}
        onSetReadingMode={setReadingMode}
        fontSize={fontSize}
        onSetFontSize={setFontSize}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
      />

      <CommentsDrawer
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        article={commentsArticle}
        comments={comments}
        onAddComment={handleAddComment}
        onUpvote={handleUpvoteComment}
      />

      {/* Interactive Game Modals */}
      <WordleModal
        isOpen={isWordleOpen}
        onClose={() => setIsWordleOpen(false)}
      />

      <ConnectionsModal
        isOpen={isConnectionsOpen}
        onClose={() => setIsConnectionsOpen(false)}
      />

      <MiniCrosswordModal
        isOpen={isMiniCrosswordOpen}
        onClose={() => setIsMiniCrosswordOpen(false)}
      />

      <SpellingBeeModal
        isOpen={isSpellingBeeOpen}
        onClose={() => setIsSpellingBeeOpen(false)}
      />

      {/* Spotlight Modals */}
      <CookingModal
        isOpen={isCookingOpen}
        onClose={() => setIsCookingOpen(false)}
      />

      <WirecutterModal
        isOpen={isWirecutterOpen}
        onClose={() => setIsWirecutterOpen(false)}
      />

      <AthleticModal
        isOpen={isAthleticOpen}
        onClose={() => setIsAthleticOpen(false)}
      />

      <PollsModal
        isOpen={isPollsModalOpen}
        onClose={() => setIsPollsModalOpen(false)}
      />
    </div>
  );
}
