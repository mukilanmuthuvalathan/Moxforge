/**
 * Theme state and switcher utilities for MOXFORGE
 * Handles light (white screen) and dark (dark screen) themes
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'moxforge-theme';

/**
 * Returns the initial theme based on stored user preference,
 * defaulting to 'light' (white screen).
 */
export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    // ignore localStorage restriction
  }
  return 'light';
}

/**
 * Computes next theme when toggling between light and dark
 */
export function toggleThemeValue(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}

/**
 * Applies the given theme to document.documentElement
 * Adding/removing the 'dark' class and persisting to localStorage
 */
export function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}
