import React from 'react';

interface MastheadProps {
  onGoHome: () => void;
}

export const Masthead: React.FC<MastheadProps> = ({ onGoHome }) => {
  return (
    <section className="max-w-[1340px] mx-auto px-4 text-center my-2 sm:my-3">
      <h1
        onClick={onGoHome}
        className="masthead-title text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-nyt-black select-none cursor-pointer hover:opacity-95 transition-opacity"
      >
        The New York Times
      </h1>
    </section>
  );
};
