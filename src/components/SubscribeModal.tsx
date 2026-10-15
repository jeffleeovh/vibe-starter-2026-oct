import React, { useState } from 'react';
import { X, Check, ShieldCheck, Sparkles } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubscribed: boolean;
  onToggleSubscription: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  isSubscribed,
  onToggleSubscription
}) => {
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    onToggleSubscription();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-lg rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-200">
          <div className="masthead-title text-2xl font-bold tracking-tight">
            The New York Times
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#567b95]">
              Limited Time Special Offer
            </span>
            <h2 className="font-serif font-bold text-3xl text-nyt-black mt-1 mb-2">
              Subscribe for $1/week
            </h2>
            <p className="font-serif text-sm text-gray-600">
              Billed as $4 every 4 weeks for your first year. Cancel anytime.
            </p>
          </div>

          <div className="bg-gray-50 p-4 border border-gray-200 rounded-sm space-y-3 text-xs font-sans">
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Unlimited access to all News, Investigative reporting, and Op-Eds</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>NYT Games full access: Wordle archive, Connections, The Crossword & Spelling Bee</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>NYT Cooking: 20,000+ curated recipes and weeknight dinner planners</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Wirecutter lab-tested product reviews and independent recommendations</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Audio articles, podcasts, and Today’s Paper replica edition</span>
            </div>
          </div>

          {success ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-center rounded-sm text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              {isSubscribed ? 'Subscription Activated! Welcome to The Times.' : 'Subscription Updated.'}
            </div>
          ) : (
            <button
              onClick={handleSubscribe}
              className="w-full bg-[#567b95] hover:bg-[#43637a] text-white font-bold text-sm tracking-wide uppercase py-3 rounded-sm transition-colors shadow-sm cursor-pointer"
            >
              {isSubscribed ? 'Active Subscriber (Manage Plan)' : 'Claim Your $1/Week Access'}
            </button>
          )}

          <div className="text-center text-[10px] text-gray-500 font-sans">
            Secure payment · No commitment · Cancel easily online at any time
          </div>
        </div>
      </div>
    </div>
  );
};
