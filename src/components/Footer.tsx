import React from 'react';

interface FooterProps {
  onGoHome: () => void;
  onOpenSubscribe: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGoHome, onOpenSubscribe }) => {
  return (
    <footer className="max-w-[1340px] mx-auto px-4 pt-6 pb-12 border-t-2 border-nyt-black text-[11px] font-sans text-gray-600">
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-nyt-rule pb-4 mb-4 gap-4">
        <div
          onClick={onGoHome}
          className="masthead-title text-2xl font-bold tracking-tight text-nyt-black cursor-pointer hover:opacity-80"
        >
          The New York Times
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-[11px]">
          <button onClick={onGoHome} className="hover:underline cursor-pointer">
            News
          </button>
          <button onClick={onGoHome} className="hover:underline cursor-pointer">
            Opinion
          </button>
          <button onClick={onGoHome} className="hover:underline cursor-pointer">
            Arts
          </button>
          <button onClick={onGoHome} className="hover:underline cursor-pointer">
            Living
          </button>
          <button onClick={onGoHome} className="hover:underline cursor-pointer">
            Listing &amp; More
          </button>
        </div>
      </div>

      {/* Legal and directory links */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-gray-500 text-[10px] mb-4">
        <span>© 2026 The New York Times Company</span>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          NYTCo
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          Contact Us
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          Accessibility
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          Work with us
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          Advertise
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          T Brand Studio
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          Privacy Policy
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          Terms of Service
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          Site Map
        </button>
        <button onClick={onGoHome} className="hover:underline cursor-pointer">
          Help
        </button>
        <button onClick={onOpenSubscribe} className="hover:underline cursor-pointer font-bold text-gray-700">
          Subscriptions
        </button>
      </div>
    </footer>
  );
};
