import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { PageId } from './data/moxforgeData';
import { resolvePageId } from './utils/moxforgeLogic';
import { Theme, getInitialTheme, applyTheme, toggleThemeValue } from './utils/theme';
import {
  TopNavAndDirectory,
  WorkspacePageSwitcher,
} from './components/TopNavAndDirectory';
import {
  HomeView,
  AboutView,
  ProjectsView,
  VenturesView,
} from './components/PagesPrimary';
import {
  TeamView,
  InnovationView,
  CommunityView,
  CareersView,
  ContactView,
} from './components/PagesSecondary';
import { AdminCareersView } from './components/AdminCareersView';

import moxforgeLogo from './assets/bluemetallic_logo_new_1__20729a63.png';

function checkIsAdminRoute(): boolean {
  const hashClean = window.location.hash
    .trim()
    .toLowerCase()
    .replace(/^#\/?/, '');
  const pathClean = window.location.pathname
    .trim()
    .toLowerCase()
    .replace(/^\/+/, '');
  return hashClean === 'admin' || pathClean === 'admin';
}

function resolveLocationPage(): PageId {
  if (window.location.hash && window.location.hash.length > 1) {
    return resolvePageId(window.location.hash);
  }
  return resolvePageId(window.location.pathname);
}

const PAGE_TITLES: Record<PageId, string> = {
  home: 'Moxforge — Information, Technology & Internet',
  about: 'About Us — Moxforge | Mission, Vision & Story',
  projects: 'Our Projects — Moxforge | AI & Software Platforms',
  ventures: 'Our Ventures — Moxforge | Innovation Labs & Community',
  collaborators: 'Partners & Collaborators — Moxforge',
  team: 'Our Team — Moxforge | Leadership & Engineering Roster',
  innovation: 'Innovation & Research — Moxforge | AI & Robotics',
  community: 'Community & Chapters — Moxforge | Open Developer Network',
  careers: 'Careers — Moxforge | Internships & Opportunities',
  contact: 'Contact Us — Moxforge | Business Enquiries & Partnerships',
};

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() =>
    checkIsAdminRoute()
  );
  const [activePage, setActivePage] = useState<PageId>(() =>
    resolveLocationPage()
  );
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.title = PAGE_TITLES[activePage] || PAGE_TITLES.home;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      const pathSuffix = activePage === 'home' ? '' : activePage;
      canonicalLink.setAttribute('href', `https://moxforge.vercel.app/${pathSuffix}`);
    }
  }, [activePage]);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = toggleThemeValue(prev);
      applyTheme(next);
      return next;
    });
  };

  useEffect(() => {
    const onLocationChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
      setActivePage(resolveLocationPage());
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.altKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        window.location.hash = '#/admin';
        setIsAdminRoute(true);
      }
    };
    window.addEventListener('hashchange', onLocationChange);
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('hashchange', onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleNavigate = (page: PageId) => {
    setIsAdminRoute(false);
    setActivePage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdminRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0b0f17] text-stone-900 dark:text-slate-100 transition-colors duration-200">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to white screen' : 'Switch to dark screen'}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-stone-300 dark:border-slate-700 bg-white hover:bg-stone-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-stone-800 dark:text-slate-100 cursor-pointer shadow-xs"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>White Screen</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-stone-700" />
                  <span>Dark Screen</span>
                </>
              )}
            </button>
          </div>
          <AdminCareersView
            onOpenCareersPage={() => handleNavigate('careers')}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#0b0f17] text-stone-900 dark:text-slate-100 transition-colors duration-200">
      <TopNavAndDirectory
        activePage={activePage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <WorkspacePageSwitcher
          activePage={activePage}
          onNavigate={handleNavigate}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
        {activePage === 'home' && <HomeView onNavigate={handleNavigate} />}
        {activePage === 'about' && <AboutView onNavigate={handleNavigate} />}
        {activePage === 'projects' && (
          <ProjectsView onNavigate={handleNavigate} />
        )}
        {activePage === 'ventures' && (
          <VenturesView onNavigate={handleNavigate} />
        )}
        {activePage === 'team' && <TeamView onNavigate={handleNavigate} />}
        {activePage === 'innovation' && (
          <InnovationView onNavigate={handleNavigate} />
        )}
        {activePage === 'community' && (
          <CommunityView onNavigate={handleNavigate} />
        )}
        {activePage === 'careers' && <CareersView />}
        {activePage === 'contact' && <ContactView />}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-stone-200 dark:border-slate-800 bg-white dark:bg-[#0d121c] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-500 dark:text-slate-400">
            <div className="flex items-center gap-2.5">
              <img
                src={moxforgeLogo}
                alt="MOXFORGE emblem"
                className="w-5 h-5 rounded object-cover ring-1 ring-stone-900/10 dark:ring-slate-700"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <p>© 2026 MOXFORGE. All rights reserved.</p>
            </div>
            <p className="font-mono">
              MOXFORGE INNOVATION LABS & MOXFORGE COMMUNITY
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
