'use client';

import { useEffect, useState } from 'react';

/**
 * Custom React hook to detect whether the specified media query matches the current viewport.
 * @param query - The media query string to match against.
 *
 * @example
 * const isMobile = useMediaQuery('(min-width: 480px)');
 * const isTablet = useMediaQuery('(min-width: 768px)');
 * const isDesktop = useMediaQuery('(min-width: 992px)');
 *
 * @returns Boolean indicating whether the media query matches the viewport.
 */
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window?.matchMedia(query);

    if (media?.matches !== matches) {
      setMatches(media?.matches ?? false);
    }

    const listener = () => setMatches(media?.matches ?? false);
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
}
