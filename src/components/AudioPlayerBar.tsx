import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, X, Volume2, VolumeX, FastForward } from 'lucide-react';
import { Article } from '../types';

interface AudioPlayerBarProps {
  article: Article | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  article,
  isPlaying,
  onTogglePlay,
  onClose
}) => {
  const [seconds, setSeconds] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5>(1);
  const totalSeconds = (article?.audioMinutes || 5) * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => (prev >= totalSeconds ? 0 : prev + 1));
      }, 1000 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSeconds, playbackSpeed]);

  if (!article) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPct = Math.min(100, (seconds / totalSeconds) * 100);

  const toggleSpeed = () => {
    if (playbackSpeed === 1) setPlaybackSpeed(1.25);
    else if (playbackSpeed === 1.25) setPlaybackSpeed(1.5);
    else setPlaybackSpeed(1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#121212] text-white border-t border-gray-800 shadow-2xl animate-in slide-in-from-bottom duration-300">
      {/* Top progress scrubber */}
      <div
        className="w-full bg-gray-800 h-1 cursor-pointer group relative"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickPos = (e.clientX - rect.left) / rect.width;
          setSeconds(Math.floor(clickPos * totalSeconds));
        }}
      >
        <div
          className="bg-[#567b95] h-full transition-all group-hover:bg-blue-400"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="max-w-[1340px] mx-auto px-4 py-2.5 flex items-center justify-between gap-4 text-xs font-sans">
        {/* Left: Article info */}
        <div className="flex items-center gap-3 min-w-0 max-w-sm sm:max-w-md">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
            <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
              NYT Audio Narration • {article.category}
            </div>
            <div className="font-serif text-sm font-bold text-white truncate">
              {article.title}
            </div>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => setSeconds((prev) => Math.max(0, prev - 15))}
            className="text-gray-400 hover:text-white p-1 cursor-pointer"
            title="Rewind 15 seconds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-white text-black hover:bg-gray-200 flex items-center justify-center cursor-pointer shadow-md transition-transform active:scale-95"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={() => setSeconds((prev) => Math.min(totalSeconds, prev + 15))}
            className="text-gray-400 hover:text-white p-1 cursor-pointer"
            title="Fast forward 15 seconds"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-gray-400">
            <span>{formatTime(seconds)}</span>
            <span>/</span>
            <span>{formatTime(totalSeconds)}</span>
          </div>
        </div>

        {/* Right: Speed & Close */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={toggleSpeed}
            className="px-2 py-0.5 rounded border border-gray-700 hover:border-gray-500 text-[11px] font-mono font-bold text-gray-300 cursor-pointer"
            title="Playback speed"
          >
            {playbackSpeed}x
          </button>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white rounded cursor-pointer"
            title="Close audio player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
