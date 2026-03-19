import { useEffect, useCallback, useRef } from 'react';

export function usePageVisibility(onVisibilityChange?: (isVisible: boolean) => void) {
  const callbackRef = useRef(onVisibilityChange);

  useEffect(() => {
    callbackRef.current = onVisibilityChange;
  }, [onVisibilityChange]);

  const handleVisibilityChange = useCallback(() => {
    const isVisible = !document.hidden;
    callbackRef.current?.(isVisible);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Support for bfcache (page restore after back/forward navigation)
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page was restored from bfcache
        callbackRef.current?.(true);
      }
    };

    const handlePageHide = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Page is being persisted to bfcache
        callbackRef.current?.(false);
      }
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [handleVisibilityChange]);
}

export function useBfcacheSupport() {
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // Reload the page if it was restored from bfcache
        // This ensures WebSocket connections are re-established
        window.location.reload();
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);
}
