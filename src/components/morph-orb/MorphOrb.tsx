import React, { useEffect, useRef, useState } from 'react';
import { MorphOrbEngine, OrbState } from './engine';
import { Search, Loader2, X, Sparkles } from 'lucide-react';

export interface MorphOrbProps {
  placeholder?: string;
  labels?: { submit?: string; thinking?: string };
  onSubmit: (query: string) => Promise<void>;
  state: OrbState;
  renderResult?: React.ReactNode;
  onClear?: () => void;
  accentColor?: string;
}

export const MorphOrb: React.FC<MorphOrbProps> = ({
  placeholder = 'Search employees, skills, shifts or workforce insights...',
  labels = { submit: 'Search', thinking: 'Analyzing query...' },
  onSubmit,
  state,
  renderResult,
  onClear,
  accentColor = '#286B58'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<MorphOrbEngine | null>(null);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      engineRef.current = new MorphOrbEngine({
        canvas: canvasRef.current,
        initialState: state,
        accentColor
      });
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setState(state);
    }
  }, [state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    if (onClear) onClear();
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Orb Canvas & Form Container */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center gap-4 bg-[#FFFFFF] dark:bg-[#181A1D] border border-[#E8E8E5] dark:border-[#282B2F] rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-200">
        {/* Dynamic Canvas Dotted Orb */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            aria-hidden="true"
          />
          {state === 'thinking' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
            </div>
          )}
        </div>

        {/* Search Input & Action */}
        <form onSubmit={handleSubmit} className="flex-1 w-full space-y-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3.5 text-[#5F6B73] dark:text-[#95A0A6] pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full pl-10 pr-20 py-3 rounded-xl bg-[#FAFAF8] dark:bg-[#111214] border border-[#E8E8E5] dark:border-[#282B2F] text-xs sm:text-sm text-[#17191B] dark:text-white placeholder-[#8A969E] focus:outline-none focus:ring-2 focus:ring-[#286B58] transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-12 text-[#5F6B73] hover:text-[#17191B] dark:hover:text-white p-1"
                aria-label="Clear query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              disabled={state === 'thinking'}
              className="absolute right-2 px-3 py-1.5 rounded-lg bg-[#17191B] text-white dark:bg-white dark:text-[#17191B] text-[11px] font-bold tracking-wider uppercase hover:bg-[#286B58] dark:hover:bg-[#3DA386] dark:hover:text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              {state === 'thinking' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                labels.submit
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#5F6B73] dark:text-[#95A0A6] px-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#286B58] dark:text-[#3DA386]" /> Deterministic Zero-SQL Parser
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#E8E8E5] dark:bg-[#282B2F] font-mono text-[10px]">
              Press / to focus
            </kbd>
          </div>
        </form>
      </div>

      {/* Structured Result Slot */}
      {renderResult && (
        <div className="w-full mt-5">
          {renderResult}
        </div>
      )}
    </div>
  );
};
