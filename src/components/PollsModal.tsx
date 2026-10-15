import React, { useState } from 'react';
import { X, TrendingUp, BarChart2, CheckCircle2 } from 'lucide-react';

interface PollsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BattlegroundState {
  state: string;
  demCandidate: string;
  repCandidate: string;
  demPct: number;
  repPct: number;
  status: 'tossup' | 'lean-dem' | 'lean-rep';
  pollingTrend: string;
}

const BATTLEGROUND_SENATE: BattlegroundState[] = [
  {
    state: 'Texas',
    demCandidate: 'James Talarico',
    repCandidate: 'Incumbent Nominee',
    demPct: 48.4,
    repPct: 46.6,
    status: 'tossup',
    pollingTrend: '+1.8 D (shifted 0.6% towards D this week)'
  },
  {
    state: 'Ohio',
    demCandidate: 'Sherrod Brown',
    repCandidate: 'GOP Challenger',
    demPct: 49.1,
    repPct: 48.2,
    status: 'tossup',
    pollingTrend: '+0.9 D (consistently within margin of error)'
  },
  {
    state: 'Montana',
    demCandidate: 'Jon Tester',
    repCandidate: 'Tim Sheehy',
    demPct: 47.8,
    repPct: 48.9,
    status: 'lean-rep',
    pollingTrend: '+1.1 R (heavy rural mobilization)'
  },
  {
    state: 'Pennsylvania',
    demCandidate: 'Bob Casey',
    repCandidate: 'Dave McCormick',
    demPct: 50.4,
    repPct: 47.1,
    status: 'lean-dem',
    pollingTrend: '+3.3 D (suburban Philadelphia strength)'
  },
  {
    state: 'Wisconsin',
    demCandidate: 'Tammy Baldwin',
    repCandidate: 'Eric Hovde',
    demPct: 51.0,
    repPct: 47.5,
    status: 'lean-dem',
    pollingTrend: '+3.5 D (strong Madison Dane County turnout)'
  }
];

export const PollsModal: React.FC<PollsModalProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'tossup' | 'lean-dem' | 'lean-rep'>('all');

  if (!isOpen) return null;

  const filteredStates = BATTLEGROUND_SENATE.filter(s =>
    filter === 'all' ? true : s.status === filter
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white text-nyt-black w-full max-w-3xl rounded-md shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-nyt-black" />
            <span className="font-bold text-xs uppercase tracking-wider text-nyt-black">
              The New York Times Polling Average • 2026 Midterm Tracker
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-nyt-black mb-1">
              Battle for Congress: Detailed Polling Averages
            </h1>
            <p className="font-serif text-sm text-gray-700 leading-relaxed">
              Our statistical model weights public surveys based on sample size, track record, methodology, and bipartisan transparency.
            </p>
          </div>

          {/* National Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Senate Majority Projection
              </span>
              <div className="font-serif font-bold text-xl text-nyt-black mt-1">
                Tossup (50 Dem - 50 GOP)
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex mt-2.5">
                <div className="bg-blue-600 h-full w-[50%]"></div>
                <div className="bg-red-600 h-full w-[50%]"></div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 mt-1.5 font-sans">
                <span>Dems need 50 + VP</span>
                <span>GOP needs 51 seats</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                National Generic Congressional Ballot
              </span>
              <div className="font-serif font-bold text-xl text-nyt-black mt-1">
                Democrats +1.4%
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex mt-2.5">
                <div className="bg-blue-600 h-full w-[51.4%]"></div>
                <div className="bg-red-600 h-full w-[48.6%]"></div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-500 mt-1.5 font-sans">
                <span>D: 47.2%</span>
                <span>R: 45.8%</span>
              </div>
            </div>
          </div>

          {/* State breakdown table */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-gray-200 mb-3 gap-2">
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-nyt-black">
                Key Senate Battlegrounds
              </h3>
              <div className="flex gap-1 text-[11px] font-sans">
                {(['all', 'tossup', 'lean-dem', 'lean-rep'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                      filter === tab ? 'bg-black text-white font-medium' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-gray-200 border border-gray-200 rounded-sm">
              {filteredStates.map((st) => (
                <div key={st.state} className="p-3.5 hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-nyt-black">{st.state}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm ${
                        st.status === 'tossup' ? 'bg-amber-100 text-amber-900' :
                        st.status === 'lean-dem' ? 'bg-blue-100 text-blue-900' :
                        'bg-red-100 text-red-900'
                      }`}>
                        {st.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="text-xs font-serif text-gray-700">
                      <span className="text-blue-700 font-bold">{st.demPct}%</span> vs{' '}
                      <span className="text-red-700 font-bold">{st.repPct}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden flex mb-2">
                    <div
                      className="bg-blue-600 h-full"
                      style={{ width: `${(st.demPct / (st.demPct + st.repPct)) * 100}%` }}
                    />
                    <div
                      className="bg-red-600 h-full"
                      style={{ width: `${(st.repPct / (st.demPct + st.repPct)) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-gray-500 font-sans">
                    <span>{st.demCandidate} (D) vs {st.repCandidate} (R)</span>
                    <span className="text-gray-600 font-medium">{st.pollingTrend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
