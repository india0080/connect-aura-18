import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets window scroll to the top on every route change.
 * Mounted once inside <BrowserRouter> — affects all pages.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instant scroll, as requested
    window.scrollTo(0, 0);
    // Some browsers restore scroll on history nav — disable it
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, [pathname]);

  return null;
}
