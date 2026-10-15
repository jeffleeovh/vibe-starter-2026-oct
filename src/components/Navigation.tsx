import React from 'react';
import { SectionType } from '../types';

interface NavigationProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  onOpenGames: () => void;
  onOpenCooking: () => void;
  onOpenWirecutter: () => void;
  onOpenAthletic: () => void;
}

const SECTIONS: { label: string; value: SectionType }[] = [
  { label: 'U.S.', value: 'u.s.' },
  { label: 'World', value: 'world' },
  { label: 'Business', value: 'business' },
  { label: 'Arts', value: 'arts' },
  { label: 'Lifestyle', value: 'lifestyle' },
  { label: 'Opinion', value: 'opinion' },
  { label: 'Audio', value: 'audio' },
  { label: 'Games', value: 'games' },
  { label: 'Cooking', value: 'cooking' },
  { label: 'Wirecutter', value: 'wirecutter' },
  { label: 'The Athletic', value: 'the athletic' }
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection,
  onOpenGames,
  onOpenCooking,
  onOpenWirecutter,
  onOpenAthletic
}) => {
  const handleClick = (value: SectionType) => {
    if (value === 'games') {
      onOpenGames();
    } else if (value === 'cooking') {
      onOpenCooking();
    } else if (value === 'wirecutter') {
      onOpenWirecutter();
    } else if (value === 'the athletic') {
      onOpenAthletic();
    } else {
      onSelectSection(value);
    }
  };

  return (
    <nav aria-label="Main Sections" className="max-w-[1340px] mx-auto px-4 mb-3">
      <div className="border-y border-nyt-darkRule py-1.5 flex items-center justify-between overflow-x-auto text-[11px] uppercase tracking-wider font-semibold text-gray-800 scrollbar-none">
        {SECTIONS.map((sec) => (
          <button
            key={sec.value}
            onClick={() => handleClick(sec.value)}
            className={`px-2 py-0.5 whitespace-nowrap cursor-pointer transition-colors ${
              activeSection === sec.value
                ? 'text-nyt-black font-extrabold underline decoration-2 underline-offset-4'
                : 'text-gray-700 hover:underline hover:text-black'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Subtle secondary strip */}
      <div className="border-b border-nyt-rule py-1 text-center text-[10px] text-gray-500 font-sans tracking-wide">
        <span>
          These top stories are <strong className="font-bold text-nyt-black">free to read</strong>.
        </span>
      </div>
    </nav>
  );
};
