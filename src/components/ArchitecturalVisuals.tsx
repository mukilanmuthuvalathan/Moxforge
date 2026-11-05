import React from 'react';
import { PageId } from '../data/moxforgeData';

export const HeroArchitectureVisual: React.FC<{
  onNavigate: (page: PageId) => void;
}> = ({ onNavigate }) => {
  return (
    <div className="relative w-full h-full min-h-[380px] bg-[#0F172A] text-slate-100 rounded-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden border border-slate-800 shadow-xs">
      {/* Subtle professional architectural grid & soft radial ambient glow */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern id="mox-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="#334155"
              strokeWidth="0.7"
            />
          </pattern>
          <radialGradient id="mox-glow" cx="85%" cy="15%" r="60%">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="500" fill="url(#mox-grid)" />
        <rect width="800" height="500" fill="url(#mox-glow)" />
      </svg>

      <div className="relative z-10 flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <p className="text-xs text-sky-400 font-mono tracking-wide">
            MOXFORGE INNOVATION LABS & MOXFORGE COMMUNITY
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-white mt-1 balance-text">
            Digital Ventures & Open Developer Network
          </h3>
        </div>
        <span className="font-mono text-xs text-slate-400 whitespace-nowrap shrink-0">
          Moxforge Network
        </span>
      </div>

      {/* Hairline-divided dual division overview */}
      <div className="relative z-10 my-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:divide-x sm:divide-slate-800">
        <div className="flex flex-col justify-between sm:pr-4">
          <div>
            <div className="text-xs text-sky-400 font-mono font-medium">
              MOXFORGE INNOVATION LABS
            </div>
            <h4 className="text-base font-semibold text-white mt-1.5">
              Information, AI & Internet Studio
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Cloud AI runtimes, semantic information engines, and programmable internet gateways spun into digital products.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-slate-800/90 flex flex-col gap-1.5 text-xs">
            <span className="text-slate-400 font-mono">
              Software Products & Enterprise Pilots
            </span>
            <button
              type="button"
              onClick={() => onNavigate('ventures')}
              className="text-sky-400 hover:text-sky-300 font-medium text-left whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              Explore Moxforge Innovation Labs →
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between sm:pl-6 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800">
          <div>
            <div className="text-xs text-indigo-300 font-mono font-medium">
              MOXFORGE COMMUNITY
            </div>
            <h4 className="text-base font-semibold text-white mt-1.5">
              Chapters, Fellowships & Open Web
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Collegiate technology chapters, open-source web & AI fellowships, and shared campus cloud grids.
            </p>
          </div>
          <div className="mt-5 pt-3.5 border-t border-slate-800/90 flex flex-col gap-1.5 text-xs">
            <span className="text-slate-400 font-mono">
              Global Chapters & Open Developer Community
            </span>
            <button
              type="button"
              onClick={() => onNavigate('community')}
              className="text-sky-400 hover:text-sky-300 font-medium text-left whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              Join Campus Chapters →
            </button>
          </div>
        </div>
      </div>

      {/* Bottom pipeline flow */}
      <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex flex-wrap items-center gap-1.5">
          <span>Information</span>
          <span className="text-slate-600">→</span>
          <span>Technology</span>
          <span className="text-slate-600">→</span>
          <span>Internet Scale</span>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('innovation')}
          className="text-xs font-medium text-white underline decoration-sky-400/70 underline-offset-4 hover:text-sky-300 whitespace-nowrap shrink-0 cursor-pointer transition-colors"
        >
          Read Technical Reports
        </button>
      </div>
    </div>
  );
};

export const FounderArchitecturalPortrait: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[260px] bg-[#0F172A] rounded-xl p-6 text-slate-100 flex flex-col justify-between border border-slate-800 overflow-hidden shadow-xs">

      <div className="relative z-10">
        <p className="text-xs text-sky-400 font-mono">
          FOUNDER & CEO · MOXFORGE
        </p>
        <h3 className="text-2xl font-semibold text-white mt-1">
          Mukilan Muthuvalathan
        </h3>
        <p className="text-xs text-slate-300 mt-1">
          MOXFORGE INNOVATION LABS & MOXFORGE COMMUNITY
        </p>
      </div>

      <blockquote className="relative z-10 my-5 text-sm text-slate-200 leading-relaxed">
        “We built MOXFORGE to shape the future of Information, Technology, and the Internet—bringing software builders, AI researchers, and engineers together to ship open, scalable digital platforms.”
      </blockquote>

      <div className="relative z-10 pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs text-slate-400 font-mono tabular-nums">
        <span>Moxforge Innovation Labs · Moxforge Community</span>
      </div>
    </div>
  );
};
