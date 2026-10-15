import React, { useState } from 'react';

interface PollsWidgetProps {
  onOpenFullPolls: () => void;
}

export const PollsWidget: React.FC<PollsWidgetProps> = ({ onOpenFullPolls }) => {
  const [activeTab, setActiveTab] = useState<'senate' | 'house' | 'governor'>('senate');

  return (
    <div className="bg-gray-50 border border-nyt-rule p-3.5 rounded-sm">
      <div className="flex justify-between items-center pb-2 border-b border-nyt-rule mb-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-nyt-black">The Latest Polls</span>
        <button
          onClick={onOpenFullPolls}
          className="text-[10px] text-[#326891] hover:underline font-medium cursor-pointer"
        >
          Full Averages ›
        </button>
      </div>

      <div className="space-y-2.5 text-xs font-sans">
        {activeTab === 'senate' && (
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium text-gray-800">Senate Control Margin</span>
              <span className="text-gray-600 font-serif">Tossup (50-50)</span>
            </div>
            <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden flex">
              <div className="bg-blue-600 h-full w-[51%] transition-all duration-300" title="Democrat: 51%"></div>
              <div className="bg-red-600 h-full w-[49%] transition-all duration-300" title="Republican: 49%"></div>
            </div>
            <div className="flex justify-between text-[9px] text-gray-500 mt-1">
              <span>D: 50 seats (proj.)</span>
              <span>R: 50 seats (proj.)</span>
            </div>
          </div>
        )}

        {activeTab === 'house' && (
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium text-gray-800">House Majority Outlook</span>
              <span className="text-gray-600 font-serif">Lean Dem (+4)</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-blue-600 h-full w-[53%] transition-all duration-300"></div>
              <div className="bg-red-600 h-full w-[47%] transition-all duration-300"></div>
            </div>
            <div className="flex justify-between text-[9px] text-gray-500 mt-1">
              <span>220 Dem seats</span>
              <span>215 GOP seats</span>
            </div>
          </div>
        )}

        {activeTab === 'governor' && (
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="font-medium text-gray-800">Gubernatorial Battlegrounds</span>
              <span className="text-gray-600 font-serif">3 Tossups</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
              <div className="bg-blue-600 h-full w-[48%] transition-all duration-300"></div>
              <div className="bg-amber-500 h-full w-[14%] transition-all duration-300"></div>
              <div className="bg-red-600 h-full w-[38%] transition-all duration-300"></div>
            </div>
            <div className="flex justify-between text-[9px] text-gray-500 mt-1">
              <span>24 Held D</span>
              <span>3 Tossup</span>
              <span>23 Held R</span>
            </div>
          </div>
        )}

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="font-medium text-gray-800">Presidential Approval</span>
            <span className="text-gray-600 font-serif">43% Appr / 53% Dis</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex">
            <div className="bg-emerald-600 h-full w-[43%]" title="Approve: 43%"></div>
            <div className="bg-red-500 h-full w-[53%]" title="Disapprove: 53%"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 pt-3 mt-3 border-t border-nyt-rule text-center text-[10px]">
        <button
          onClick={() => setActiveTab('senate')}
          className={`p-1 border text-center transition-colors font-medium cursor-pointer ${
            activeTab === 'senate'
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-800 border-gray-200 hover:border-black'
          }`}
        >
          Senate ›
        </button>
        <button
          onClick={() => setActiveTab('house')}
          className={`p-1 border text-center transition-colors font-medium cursor-pointer ${
            activeTab === 'house'
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-800 border-gray-200 hover:border-black'
          }`}
        >
          House ›
        </button>
        <button
          onClick={() => setActiveTab('governor')}
          className={`p-1 border text-center transition-colors font-medium cursor-pointer ${
            activeTab === 'governor'
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-800 border-gray-200 hover:border-black'
          }`}
        >
          Governor ›
        </button>
      </div>
    </div>
  );
};
