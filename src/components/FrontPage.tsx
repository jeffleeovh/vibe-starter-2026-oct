import React from 'react';
import { Bookmark, Volume2, Flame, ArrowRight, Mail } from 'lucide-react';
import { Article } from '../types';
import { PollsWidget } from './PollsWidget';

interface FrontPageProps {
  onSelectArticle: (article: Article) => void;
  onOpenComments: (article: Article) => void;
  onOpenWordle: () => void;
  onOpenConnections: () => void;
  onOpenSpellingBee: () => void;
  onOpenMiniCrossword: () => void;
  onOpenCooking: () => void;
  onOpenWirecutter: () => void;
  onOpenAthletic: () => void;
  onOpenPollsModal: () => void;
  onPlayAudioArticle: (article: Article) => void;
  onToggleBookmark: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  getArticleById: (id: string) => Article | undefined;
}

export const FrontPage: React.FC<FrontPageProps> = ({
  onSelectArticle,
  onOpenComments,
  onOpenWordle,
  onOpenConnections,
  onOpenSpellingBee,
  onOpenMiniCrossword,
  onOpenCooking,
  onOpenWirecutter,
  onOpenAthletic,
  onOpenPollsModal,
  onPlayAudioArticle,
  onToggleBookmark,
  isBookmarked,
  getArticleById
}) => {
  const leadStory = getArticleById('trump-women-leaving');
  const guilfoyleStory = getArticleById('guilfoyle-fall');
  const pressSecStory = getArticleById('press-secretary-attorney');
  const ukraineSatStory = getArticleById('ukraine-satellite-escalation');
  const dieselStory = getArticleById('diesel-deal-putin');
  const usIntelStory = getArticleById('us-intelligence-ukraine');
  const texasSenateStory = getArticleById('texas-senate-race');
  const aiDinnerStory = getArticleById('ai-agents-dinner-party');
  const anthropicStory = getArticleById('anthropic-revenue-jump');
  const popeStory = getArticleById('pope-cancer-therapy');
  const cornellStory = getArticleById('cornell-president-grilling');
  const sallyRooneyStory = getArticleById('sally-rooney-britain');
  const wallaceWellsStory = getArticleById('opinion-wallace-wells');
  const lozadaStory = getArticleById('opinion-lozada');
  const kerrStory = getArticleById('opinion-kerr');
  const greeneStory = getArticleById('opinion-greene');

  return (
    <main className="max-w-[1340px] mx-auto px-4 pb-16">
      {/* Live Coverage Ticker Strip */}
      <div className="mb-4 py-1.5 px-3 bg-gray-50 border border-nyt-rule rounded-xs flex items-center justify-between text-[11px] font-sans">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center gap-1 font-bold text-[#c00] uppercase tracking-wider text-[10px]">
            <span className="w-2 h-2 rounded-full bg-[#c00] animate-pulse" />
            Live Updates
          </span>
          <span className="text-gray-300">|</span>
          <button
            onClick={onOpenAthletic}
            className="text-gray-800 hover:text-black hover:underline cursor-pointer"
          >
            <strong>MLB Postseason:</strong> Brewers Lead Dodgers in Game 3 of N.L. Championship Series
          </button>
          <span className="text-gray-400">•</span>
          <button
            onClick={() => ukraineSatStory && onSelectArticle(ukraineSatStory)}
            className="text-gray-600 hover:text-black hover:underline cursor-pointer"
          >
            Air defense alert declared in Kyiv region
          </button>
        </div>
        <button
          onClick={onOpenAthletic}
          className="hidden sm:inline text-[#326891] hover:underline font-semibold text-[10px] uppercase tracking-wider shrink-0 ml-2"
        >
          Scoreboard ›
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ============================================== */}
        {/* LEFT & CENTER MAIN REPORTING (COLUMNS 1 to 9) */}
        {/* ============================================== */}
        <section aria-label="Top News" className="lg:col-span-9 lg:column-border-r lg:pr-6">
          {/* Top Lead Hero Section (2-Column Desktop Broadsheet layout) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-6 row-border-b">
            {/* Column A: Top Left Headline & Story Lead */}
            <article className="md:col-span-5 flex flex-col justify-between" data-purpose="primary-lead-story">
              <div>
                <h2
                  onClick={() => leadStory && onSelectArticle(leadStory)}
                  className="font-serif font-bold text-2xl sm:text-3xl leading-snug tracking-tight text-nyt-black headline-hover cursor-pointer mb-2"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (leadStory) onSelectArticle(leadStory);
                    }}
                  >
                    High-Ranking Women Are Leaving the Trump Administration
                  </a>
                </h2>
                <p className="font-serif text-[15px] leading-relaxed text-gray-800 mb-3">
                  In the president’s second term, those heading for the exits are female officials, prompting questions over staffing dynamics inside the White House.
                </p>
              </div>

              <div className="pt-2 text-[11px] text-gray-500 font-sans flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>5 min read</span>
                  <span>•</span>
                  <button
                    onClick={() => leadStory && onOpenComments(leadStory)}
                    className="flex items-center gap-0.5 text-gray-600 hover:text-black cursor-pointer"
                    title="View comments"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0h-2v2h2V9z"></path>
                    </svg>
                    <span>519</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => leadStory && onPlayAudioArticle(leadStory)}
                    className="text-gray-500 hover:text-black p-1 rounded hover:bg-gray-100 cursor-pointer"
                    title="Listen to article"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => leadStory && onToggleBookmark(leadStory)}
                    className={`p-1 rounded hover:bg-gray-100 cursor-pointer ${
                      leadStory && isBookmarked(leadStory.id) ? 'text-black' : 'text-gray-400 hover:text-black'
                    }`}
                    title="Save article"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${leadStory && isBookmarked(leadStory.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Nested Sub-Story in Left Col */}
              <div className="mt-4 pt-4 border-t border-nyt-rule">
                <h3
                  onClick={() => guilfoyleStory && onSelectArticle(guilfoyleStory)}
                  className="font-serif font-semibold text-lg leading-tight text-nyt-black headline-hover cursor-pointer mb-1.5"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (guilfoyleStory) onSelectArticle(guilfoyleStory);
                    }}
                  >
                    The Steep Rise and Sudden Fall of Kimberly Guilfoyle
                  </a>
                </h3>
                <p className="font-serif text-xs text-gray-600 leading-normal">
                  Her abrupt resignation as nominated ambassador to Greece marks the latest upheaval in diplomatic appointments.
                </p>
              </div>
            </article>

            {/* Column B: Lead Photograph & Secondary Lead Story */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <figure
                className="m-0 mb-3 cursor-pointer group"
                onClick={() => guilfoyleStory && onSelectArticle(guilfoyleStory)}
              >
                <div className="overflow-hidden border border-gray-100">
                  <img
                    alt="Kimberly Guilfoyle standing before the press corps"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_npE_BH20-VxFT0pb-W2hR9BnYKNaAoEmB0gCvhWNezsTJUfNMoFLEDtIfjSvKE7AFO3B4loVHwcjT7Zned6TWSfy4fOG_vxzBwFzkxpQmSeYMKhV2k7dxH3AIBlBBADUe_vE4xneoI7fShbFT1u3Nb3aW8ci_dz0aaT8HH9ciK2JWL31cSn4Qk47WhGZrrJrKvjiV_r_jXDVbeKZUyrZ4i2PnVUOGufPTW1ISaDPaHiF5vnZ6DZL"
                  />
                </div>
                <figcaption className="text-[10px] text-gray-500 mt-1.5 flex justify-between font-serif">
                  <span>Kimberly Guilfoyle during a recent public appearance.</span>
                  <span className="text-gray-400 font-sans">Kenny Holston/The New York Times</span>
                </figcaption>
              </figure>

              <article className="pt-2 border-t border-nyt-rule" data-purpose="secondary-lead-story">
                <h3
                  onClick={() => pressSecStory && onSelectArticle(pressSecStory)}
                  className="font-serif font-bold text-xl leading-tight text-nyt-black headline-hover cursor-pointer mb-1"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pressSecStory) onSelectArticle(pressSecStory);
                    }}
                  >
                    Trump’s New Press Secretary: Not-Quite Attorney at Law
                  </a>
                </h3>
                <p className="font-serif text-sm text-gray-700 leading-snug">
                  Katie Zacharia told The New York Times that the confusion over her legal credentials is the result of one big misunderstanding.
                </p>
                <div className="mt-2 text-[11px] text-gray-500 font-sans flex items-center gap-2">
                  <span>4 min read</span>
                  <span>•</span>
                  <button
                    onClick={() => pressSecStory && onOpenComments(pressSecStory)}
                    className="text-gray-500 hover:text-black cursor-pointer"
                  >
                    184 comments
                  </button>
                </div>
              </article>
            </div>
          </div>

          {/* Section: Russia-Ukraine War Focus Strip */}
          <section className="py-5 row-border-b" data-purpose="topic-war-coverage">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-nyt-black">
                  Russia-Ukraine War
                </span>
                <span className="text-[11px] text-gray-400">|</span>
                <span
                  onClick={() => ukraineSatStory && onSelectArticle(ukraineSatStory)}
                  className="text-[11px] text-[#567b95] hover:underline cursor-pointer font-medium"
                >
                  Live Updates
                </span>
              </div>
              {/* Quick jump anchors */}
              <div className="hidden sm:flex items-center space-x-3 text-[11px] text-gray-600">
                <button
                  onClick={() => ukraineSatStory && onSelectArticle(ukraineSatStory)}
                  className="hover:underline cursor-pointer"
                >
                  Wins for Putin
                </button>
                <span>•</span>
                <button
                  onClick={() => usIntelStory && onSelectArticle(usIntelStory)}
                  className="hover:underline cursor-pointer"
                >
                  Escalating Assaults
                </button>
                <span>•</span>
                <button
                  onClick={() => dieselStory && onSelectArticle(dieselStory)}
                  className="hover:underline cursor-pointer"
                >
                  Russian Oil Deal
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <article className="flex flex-col justify-between">
                <div>
                  <h4
                    onClick={() => ukraineSatStory && onSelectArticle(ukraineSatStory)}
                    className="font-serif font-semibold text-base leading-snug headline-hover cursor-pointer mb-1.5"
                  >
                    <a
                      href="#story"
                      onClick={(e) => {
                        e.preventDefault();
                        if (ukraineSatStory) onSelectArticle(ukraineSatStory);
                      }}
                    >
                      Ukraine’s Exposure Grows as Satellite Use Is Restricted and Russia Escalates
                    </a>
                  </h4>
                  <p className="font-serif text-xs text-gray-600 leading-relaxed mb-2">
                    A huge attack cut power to 600,000 people in Kyiv, and a Pentagon-funded satellite internet program appeared to be curbed without warning.
                  </p>
                </div>
                <div className="text-[10px] text-gray-500 font-sans flex items-center gap-1">
                  <button
                    onClick={() => ukraineSatStory && onOpenComments(ukraineSatStory)}
                    className="hover:text-black cursor-pointer"
                  >
                    1.1k comments
                  </button>
                </div>
              </article>

              <article className="flex flex-col justify-between">
                <div>
                  <h4
                    onClick={() => dieselStory && onSelectArticle(dieselStory)}
                    className="font-serif font-semibold text-base leading-snug headline-hover cursor-pointer mb-1.5"
                  >
                    <a
                      href="#story"
                      onClick={(e) => {
                        e.preventDefault();
                        if (dieselStory) onSelectArticle(dieselStory);
                      }}
                    >
                      Why Trump’s Diesel Deal With Putin Won’t Knock Down High Prices
                    </a>
                  </h4>
                  <p className="font-serif text-xs text-gray-600 leading-relaxed mb-2">
                    Energy analysts caution that supply chain bottlenecks and export tariff structures will minimize consumer relief at the pump.
                  </p>
                </div>
                <div className="text-[10px] text-gray-500 font-sans">4 min read</div>
              </article>

              <article className="flex flex-col justify-between">
                <div>
                  <h4
                    onClick={() => usIntelStory && onSelectArticle(usIntelStory)}
                    className="font-serif font-semibold text-base leading-snug headline-hover cursor-pointer mb-1.5"
                  >
                    <a
                      href="#story"
                      onClick={(e) => {
                        e.preventDefault();
                        if (usIntelStory) onSelectArticle(usIntelStory);
                      }}
                    >
                      The U.S. Continues to Provide Intelligence to Ukraine, Officials Say
                    </a>
                  </h4>
                  <p className="font-serif text-xs text-gray-600 leading-relaxed mb-2">
                    Despite shifts in rhetoric, Pentagon command centers maintain day-to-day tactical data transmission to Eastern front commands.
                  </p>
                </div>
                <div className="text-[10px] text-gray-500 font-sans">3 min read</div>
              </article>
            </div>
          </section>

          {/* Section: Midterm Elections & Interactive Polls Tracker */}
          <section className="py-5 row-border-b" data-purpose="election-coverage">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-nyt-black">
                Election Dispatches
              </span>
              <div className="flex items-center space-x-2 text-[11px] text-gray-600">
                <button
                  onClick={onOpenPollsModal}
                  className="hover:underline cursor-pointer"
                >
                  Early Vote Tracker
                </button>
                <span>•</span>
                <button
                  onClick={onOpenPollsModal}
                  className="hover:underline cursor-pointer"
                >
                  Senate Races
                </button>
                <span>•</span>
                <button
                  onClick={onOpenPollsModal}
                  className="hover:underline cursor-pointer"
                >
                  State Ballot Deadlines
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              <div className="md:col-span-7">
                <h3
                  onClick={() => texasSenateStory && onSelectArticle(texasSenateStory)}
                  className="font-serif font-bold text-xl leading-snug headline-hover cursor-pointer mb-2"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (texasSenateStory) onSelectArticle(texasSenateStory);
                    }}
                  >
                    Texas Senate Race Tightens, Polls Show, Even as Talarico Keeps His Edge
                  </a>
                </h3>
                <p className="font-serif text-sm text-gray-700 leading-relaxed mb-3">
                  A late flood of television advertising and rural outreach has narrowed the margin in what has become the nation’s most watched congressional battle.
                </p>
                <ul className="text-xs text-gray-700 space-y-1.5 font-serif pl-3 list-disc marker:text-gray-400">
                  <li>
                    <a
                      href="#story"
                      onClick={(e) => {
                        e.preventDefault();
                        if (texasSenateStory) onSelectArticle(texasSenateStory);
                      }}
                      className="hover:underline"
                    >
                      Jon Ossoff says he’s not running for president, but history says he can change his mind.
                    </a>
                  </li>
                  <li>
                    <a
                      href="#story"
                      onClick={(e) => {
                        e.preventDefault();
                        if (texasSenateStory) onSelectArticle(texasSenateStory);
                      }}
                      className="hover:underline"
                    >
                      The breathtaking cost of the midterms: $10 billion and counting on ads.
                    </a>
                  </li>
                  <li>
                    <a
                      href="#story"
                      onClick={(e) => {
                        e.preventDefault();
                        if (texasSenateStory) onSelectArticle(texasSenateStory);
                      }}
                      className="hover:underline"
                    >
                      Democratic donor emerges to blitz red-state Senate races with late advertising.
                    </a>
                  </li>
                </ul>
              </div>

              {/* Mini Polling Dashboard Widget */}
              <div className="md:col-span-5">
                <PollsWidget onOpenFullPolls={onOpenPollsModal} />
              </div>
            </div>
          </section>

          {/* Section: Artificial Intelligence & Technology */}
          <section className="py-5 row-border-b" data-purpose="technology-coverage">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-nyt-black">
                Artificial Intelligence
              </span>
              <span className="text-[11px] text-gray-400">|</span>
              <span className="text-[11px] text-gray-600 font-medium">Technology &amp; Business</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-8">
                <h3
                  onClick={() => aiDinnerStory && onSelectArticle(aiDinnerStory)}
                  className="font-serif font-bold text-xl leading-snug headline-hover cursor-pointer mb-1.5"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (aiDinnerStory) onSelectArticle(aiDinnerStory);
                    }}
                  >
                    What a Group of A.I. Agents Talked About as Their Humans Had a Dinner Party
                  </a>
                </h3>
                <p className="font-serif text-sm text-gray-700 leading-relaxed mb-2">
                  As autonomous bots spread into personal calendars and messaging feeds, we are increasingly glimpsing how digital entities interact, negotiate and converse among themselves.
                </p>
                <div className="text-[11px] text-gray-500 font-sans flex items-center space-x-2">
                  <span>By Aaron Fernandez</span>
                  <span>•</span>
                  <button
                    onClick={() => aiDinnerStory && onOpenComments(aiDinnerStory)}
                    className="hover:text-black cursor-pointer"
                  >
                    210 comments
                  </button>
                </div>
              </div>

              <div className="md:col-span-4 border-l md:border-nyt-rule md:pl-4">
                <h4
                  onClick={() => anthropicStory && onSelectArticle(anthropicStory)}
                  className="font-serif font-semibold text-base leading-snug headline-hover cursor-pointer mb-1"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (anthropicStory) onSelectArticle(anthropicStory);
                    }}
                  >
                    Anthropic Says Revenue Jumped 45% to $16.8 Billion in Third Quarter
                  </a>
                </h4>
                <p className="font-serif text-xs text-gray-600 leading-normal mb-2">
                  The massive financial surge highlights explosive commercial enterprise licensing for next-generation frontier reasoning models.
                </p>
                <div className="text-[10px] text-gray-500 font-sans">3 min read</div>
              </div>
            </div>
          </section>

          {/* Section: Health, Culture & General News Columns */}
          <section className="pt-5" data-purpose="culture-and-health-grid">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Article 1 */}
              <article className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  Pope Leo’s Cancer Diagnosis
                </span>
                <h4
                  onClick={() => popeStory && onSelectArticle(popeStory)}
                  className="font-serif font-semibold text-base leading-snug headline-hover cursor-pointer"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (popeStory) onSelectArticle(popeStory);
                    }}
                  >
                    A New World of Lung Cancer Therapy Awaits Pope Leo
                  </a>
                </h4>
                <p className="font-serif text-xs text-gray-600 leading-normal">
                  Survival rates have doubled since the 1990s as targeted molecular therapies and immunotherapy replace standard chemotherapy regimens.
                </p>
                <div className="text-[10px] text-gray-500 font-sans">
                  <button
                    onClick={() => popeStory && onOpenComments(popeStory)}
                    className="hover:text-black cursor-pointer"
                  >
                    126 comments
                  </button>
                </div>
              </article>

              {/* Article 2 */}
              <article className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  Higher Education
                </span>
                <h4
                  onClick={() => cornellStory && onSelectArticle(cornellStory)}
                  className="font-serif font-semibold text-base leading-snug headline-hover cursor-pointer"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (cornellStory) onSelectArticle(cornellStory);
                    }}
                  >
                    Cornell’s President Is Grilled by Faculty Senate Over Handling of Allegations
                  </a>
                </h4>
                <p className="font-serif text-xs text-gray-600 leading-normal">
                  Michael Kotlikoff faces a no-confidence vote over administrative oversight following an external investigation into fraternity conduct.
                </p>
                <div className="text-[10px] text-gray-500 font-sans">4 min read</div>
              </article>

              {/* Article 3 */}
              <article className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  Culture &amp; Society
                </span>
                <h4
                  onClick={() => sallyRooneyStory && onSelectArticle(sallyRooneyStory)}
                  className="font-serif font-semibold text-base leading-snug headline-hover cursor-pointer"
                >
                  <a
                    href="#story"
                    onClick={(e) => {
                      e.preventDefault();
                      if (sallyRooneyStory) onSelectArticle(sallyRooneyStory);
                    }}
                  >
                    Sally Rooney Says Her Novels Will No Longer Be Sold in Britain
                  </a>
                </h4>
                <p className="font-serif text-xs text-gray-600 leading-normal">
                  The author stated she cannot receive British royalties due to statutory charity restrictions stemming from support of pro-Palestinian initiatives.
                </p>
                <div className="text-[10px] text-gray-500 font-sans">3 min read</div>
              </article>
            </div>
          </section>
        </section>

        {/* ============================================== */}
        {/* RIGHT COLUMN: OPINION, GAMES, COOKING, ATHLETIC */}
        {/* ============================================== */}
        <aside aria-label="Opinion and Features" className="lg:col-span-3 space-y-6">
          {/* BEGIN: OpinionSection */}
          <section className="border-b border-nyt-rule pb-5" data-purpose="opinion-sidebar">
            <div className="flex items-center justify-between border-b-2 border-nyt-black pb-1 mb-3">
              <h3 className="font-serif text-base font-bold tracking-tight uppercase">Opinion</h3>
              <span
                onClick={() => wallaceWellsStory && onSelectArticle(wallaceWellsStory)}
                className="text-[11px] text-[#326891] hover:underline cursor-pointer"
              >
                All Opinion ›
              </span>
            </div>

            <div className="space-y-4">
              {/* Opinion Item 1 with stylized author portrait */}
              <article className="border-b border-nyt-rule pb-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center shrink-0 font-serif font-bold text-xs text-stone-700 shadow-xs">
                  DW
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-sans font-bold text-gray-800 uppercase tracking-wide mb-0.5">
                    David Wallace-Wells
                  </div>
                  <h4
                    onClick={() => wallaceWellsStory && onSelectArticle(wallaceWellsStory)}
                    className="font-serif font-semibold text-sm leading-snug headline-hover cursor-pointer"
                  >
                    <a
                      href="#opinion"
                      onClick={(e) => {
                        e.preventDefault();
                        if (wallaceWellsStory) onSelectArticle(wallaceWellsStory);
                      }}
                    >
                      Democrats Shouldn’t Wait Two More Years
                    </a>
                  </h4>
                  <div className="text-[10px] text-gray-400 font-sans mt-1">
                    <button
                      onClick={() => wallaceWellsStory && onOpenComments(wallaceWellsStory)}
                      className="hover:text-black cursor-pointer"
                    >
                      390 comments
                    </button>
                  </div>
                </div>
              </article>

              {/* Opinion Item 2 */}
              <article className="border-b border-nyt-rule pb-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0 font-serif font-bold text-xs text-slate-700 shadow-xs">
                  CL
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-sans font-bold text-gray-800 uppercase tracking-wide mb-0.5">
                    Carlos Lozada
                  </div>
                  <h4
                    onClick={() => lozadaStory && onSelectArticle(lozadaStory)}
                    className="font-serif font-semibold text-sm leading-snug headline-hover cursor-pointer"
                  >
                    <a
                      href="#opinion"
                      onClick={(e) => {
                        e.preventDefault();
                        if (lozadaStory) onSelectArticle(lozadaStory);
                      }}
                    >
                      A Manifesto to End All Manifestoes
                    </a>
                  </h4>
                  <div className="text-[10px] text-gray-400 font-sans mt-1">
                    <button
                      onClick={() => lozadaStory && onOpenComments(lozadaStory)}
                      className="hover:text-black cursor-pointer"
                    >
                      69 comments
                    </button>
                  </div>
                </div>
              </article>

              {/* Opinion Item 3 */}
              <article className="border-b border-nyt-rule pb-3.5 flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 font-serif font-bold text-xs text-amber-900 shadow-xs">
                  HK
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-sans font-bold text-gray-800 uppercase tracking-wide mb-0.5">
                    Heather Kerr
                  </div>
                  <h4
                    onClick={() => kerrStory && onSelectArticle(kerrStory)}
                    className="font-serif font-semibold text-sm leading-snug headline-hover cursor-pointer"
                  >
                    <a
                      href="#opinion"
                      onClick={(e) => {
                        e.preventDefault();
                        if (kerrStory) onSelectArticle(kerrStory);
                      }}
                    >
                      I’ve Never Seen Ebola Spread Like This
                    </a>
                  </h4>
                  <div className="text-[10px] text-gray-400 font-sans mt-1">Guest Essay</div>
                </div>
              </article>

              {/* Opinion Item 4 */}
              <article className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center shrink-0 font-serif font-bold text-xs text-zinc-700 shadow-xs">
                  JG
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-sans font-bold text-gray-800 uppercase tracking-wide mb-0.5">
                    Jayson Greene
                  </div>
                  <h4
                    onClick={() => greeneStory && onSelectArticle(greeneStory)}
                    className="font-serif font-semibold text-sm leading-snug headline-hover cursor-pointer"
                  >
                    <a
                      href="#opinion"
                      onClick={(e) => {
                        e.preventDefault();
                        if (greeneStory) onSelectArticle(greeneStory);
                      }}
                    >
                      Tom Cruise’s Big Flop Is a Secret Masterpiece
                    </a>
                  </h4>
                  <div className="text-[10px] text-gray-400 font-sans mt-1">5 min read</div>
                </div>
              </article>
            </div>
          </section>
          {/* END: OpinionSection */}

          {/* BEGIN: GamesWidget */}
          <section className="border-b border-nyt-rule pb-5" data-purpose="nyt-games-module">
            <div className="flex items-center justify-between border-b border-nyt-rule pb-1.5 mb-3">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-nyt-black flex items-center gap-1.5">
                <span>NYT Games</span>
              </h3>
              <button
                onClick={onOpenWordle}
                className="text-[11px] text-[#326891] hover:underline cursor-pointer"
              >
                Play Daily
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left font-sans">
              {/* Wordle */}
              <button
                onClick={onOpenWordle}
                className="p-2 border border-gray-200 rounded-sm hover:border-black transition-colors flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="font-bold text-xs text-nyt-black group-hover:text-blue-700">
                  Wordle
                </div>
                <div className="text-[10px] text-gray-500 mt-1 leading-tight">
                  6 chances to guess the 5-letter word
                </div>
              </button>

              {/* Connections */}
              <button
                onClick={onOpenConnections}
                className="p-2 border border-gray-200 rounded-sm hover:border-black transition-colors flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="font-bold text-xs text-nyt-black group-hover:text-blue-700">
                  Connections
                </div>
                <div className="text-[10px] text-gray-500 mt-1 leading-tight">
                  Group words by common thread
                </div>
              </button>

              {/* Spelling Bee */}
              <button
                onClick={onOpenSpellingBee}
                className="p-2 border border-gray-200 rounded-sm hover:border-black transition-colors flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="font-bold text-xs text-nyt-black group-hover:text-blue-700">
                  Spelling Bee
                </div>
                <div className="text-[10px] text-gray-500 mt-1 leading-tight">
                  Make words with 7 letters
                </div>
              </button>

              {/* The Mini */}
              <button
                onClick={onOpenMiniCrossword}
                className="p-2 border border-gray-200 rounded-sm hover:border-black transition-colors flex flex-col justify-between text-left cursor-pointer group"
              >
                <div className="font-bold text-xs text-nyt-black group-hover:text-blue-700">
                  The Mini
                </div>
                <div className="text-[10px] text-gray-500 mt-1 leading-tight">
                  Solve in a few minutes
                </div>
              </button>
            </div>
          </section>
          {/* END: GamesWidget */}

          {/* BEGIN: CookingAndWirecutterSpotlight */}
          <section className="space-y-4" data-purpose="lifestyle-spotlights">
            {/* NYT Cooking Promo Card */}
            <div
              onClick={onOpenCooking}
              className="p-3 bg-amber-50/60 border border-amber-200/70 rounded-xs hover:border-amber-400 cursor-pointer transition-colors"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900 mb-1">
                Cooking
              </div>
              <h4 className="font-serif font-bold text-sm leading-tight text-nyt-black mb-1 hover:underline">
                Meatballs With Any Meat
              </h4>
              <p className="font-serif text-xs text-gray-700 leading-normal">
                A versatile blueprint for weeknight dinners from Sam Sifton and Melissa Clark.
              </p>
            </div>

            {/* Wirecutter Promo Card */}
            <div
              onClick={onOpenWirecutter}
              className="p-3 bg-blue-50/60 border border-blue-200/70 rounded-xs hover:border-blue-400 cursor-pointer transition-colors"
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-900 mb-1">
                Wirecutter
              </div>
              <h4 className="font-serif font-bold text-sm leading-tight text-nyt-black mb-1 hover:underline">
                The Best Air Purifiers for 2026
              </h4>
              <p className="font-serif text-xs text-gray-700 leading-normal">
                After rigorous laboratory smoke and pollen tests, one classic unit remains undefeated.
              </p>
            </div>

            {/* The Athletic Score Update */}
            <div
              onClick={onOpenAthletic}
              className="p-3 border border-gray-200 rounded-xs hover:border-black cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-nyt-black mb-1.5">
                <span>The Athletic • MLB</span>
                <span className="text-[#c00] font-black animate-pulse">Live</span>
              </div>
              <h4 className="font-serif font-semibold text-xs leading-snug hover:underline">
                Brewers Lead Dodgers in Game 3 of N.L. Championship Series
              </h4>
              <div className="text-[10px] text-gray-500 font-sans mt-1">
                Chourio homered on the first pitch
              </div>
            </div>

            {/* The Morning Newsletter Briefing Card */}
            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                <Mail className="w-3.5 h-3.5 text-gray-500" />
                <span>The Morning</span>
              </div>
              <div className="font-serif font-bold text-xs text-nyt-black mb-1">
                Make sense of the day’s news and ideas.
              </div>
              <p className="text-[11px] text-gray-600 font-serif leading-snug mb-2.5">
                Delivered to your inbox every weekday morning by David Leonhardt.
              </p>
              <button
                onClick={onOpenWordle}
                className="w-full text-center bg-white border border-gray-300 hover:border-black font-semibold text-[11px] py-1 rounded-xs transition-colors cursor-pointer"
              >
                Sign Up for Free
              </button>
            </div>
          </section>
          {/* END: CookingAndWirecutterSpotlight */}
        </aside>
      </div>
    </main>
  );
};
