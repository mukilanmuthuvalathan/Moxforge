import React, { useState } from 'react';
import { MOXFORGE_PAGES, PageId } from '../data/moxforgeData';
import { Theme } from '../utils/theme';
import moxforgeLogo from '../assets/bluemetallic_logo_new_1__20729a63.webp';

const Sun: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const Moon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

interface TopNavAndDirectoryProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  theme?: Theme;
  onToggleTheme?: () => void;
}

const PRIMARY_HEADER_LINKS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'projects', label: 'Projects' },
  { id: 'ventures', label: 'Ventures' },
  { id: 'community', label: 'Community' },
];

export const TopNavAndDirectory: React.FC<TopNavAndDirectoryProps> = ({
  activePage,
  onNavigate,
  theme = 'light',
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (page: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="w-full bg-[#FAF9F6] dark:bg-[#0b0f17] border-b border-stone-200 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-6 px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Zone 1: Single text element wordmark with official logo */}
        <a
          href="#/home"
          onClick={(e) => {
            e.preventDefault();
            handleMobileNav('home');
          }}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-stone-950 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <img
            src={moxforgeLogo}
            alt="Moxforge Logo"
            width={36}
            height={36}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg object-cover ring-1 ring-stone-900/10 dark:ring-slate-700 shadow-xs group-hover:scale-105 transition-transform"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span className="tracking-tight font-display font-bold text-lg sm:text-xl text-stone-950 dark:text-white">Moxforge</span>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links (Tablet & Laptop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-3.5 lg:gap-6 text-xs lg:text-sm font-medium text-stone-600 dark:text-slate-300"
        >
          {PRIMARY_HEADER_LINKS.map((link) => {
            const isActive = activePage === link.id;
            return (
              <a
                key={link.id}
                href={`#/${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.id);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`transition-colors whitespace-nowrap shrink-0 underline-offset-8 ${
                  isActive
                    ? 'text-stone-950 dark:text-white font-semibold underline decoration-blue-600 dark:decoration-blue-400 decoration-2'
                    : 'hover:text-stone-900 dark:hover:text-white hover:underline'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions + Dark / White Screen Switcher + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleMobileNav('contact')}
            className="px-3 sm:px-4 py-2 text-xs font-medium text-white bg-stone-900 dark:bg-blue-600 rounded-lg hover:bg-stone-800 dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
          >
            Partner With Us
          </button>

          {/* Dark / White screen button like sun and moon right beside Partner With Us */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Switch to white screen (light mode)'
                  : 'Switch to dark screen (dark mode)'
              }
              title={
                theme === 'dark'
                  ? 'Switch to White Screen'
                  : 'Switch to Dark Screen'
              }
              className="flex items-center justify-center gap-1.5 px-2.5 py-2 text-xs font-medium rounded-lg border border-stone-300 dark:border-slate-700 bg-white hover:bg-stone-100 dark:bg-slate-800/90 dark:hover:bg-slate-700/90 text-stone-800 dark:text-slate-100 transition-all cursor-pointer shrink-0 shadow-2xs group"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                  <span className="hidden sm:inline text-[11px] font-medium text-slate-200">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-stone-700 group-hover:-rotate-12 transition-transform" />
                  <span className="hidden sm:inline text-[11px] font-medium text-stone-700">Dark</span>
                </>
              )}
            </button>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-slate-800 bg-white/95 dark:bg-[#0d121c]/95 backdrop-blur-md px-4 py-4 space-y-2 shadow-lg animate-in fade-in duration-150">
          <div className="flex items-center justify-between px-1 pb-1">
            <p className="text-[11px] font-mono text-stone-400 dark:text-slate-400">NAVIGATION DIRECTORY</p>
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-stone-300 dark:border-slate-700 bg-stone-100 dark:bg-slate-800 text-stone-800 dark:text-slate-200 cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>White Screen</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-stone-700" />
                    <span>Dark Screen</span>
                  </>
                )}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {MOXFORGE_PAGES.map((page) => {
              const isSelected = activePage === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => handleMobileNav(page.id)}
                  className={`w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-white font-semibold dark:bg-blue-600'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {page.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export const WorkspacePageSwitcher: React.FC<TopNavAndDirectoryProps> = ({
  activePage,
  onNavigate,
}) => {
  return (
    <nav
      aria-label="MOXFORGE Page Index"
      className="relative pt-4 sm:pt-6 pb-2 border-b border-stone-200/90 dark:border-slate-800/90 mb-6 after:content-[''] after:pointer-events-none after:absolute after:right-0 after:top-4 after:bottom-2 after:w-8 after:bg-gradient-to-l after:from-[#FAF9F6] dark:after:from-[#0b0f17] after:to-transparent lg:after:hidden"
    >
      <div className="overflow-x-auto no-scrollbar touch-pan-x px-0.5">
        <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-slate-800/80 rounded-lg w-max min-w-full lg:w-full justify-start lg:justify-center border border-transparent dark:border-slate-700/60">
          {MOXFORGE_PAGES.map((page) => {
            const isSelected = activePage === page.id;
            return (
              <button
                key={page.id}
                type="button"
                onClick={() => onNavigate(page.id)}
                aria-current={isSelected ? 'page' : undefined}
                className={`px-2.5 lg:px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-stone-950 shadow-xs dark:bg-slate-900 dark:text-white dark:border dark:border-blue-500/40 dark:shadow-sm'
                    : 'text-stone-600 hover:text-stone-950 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {page.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};


