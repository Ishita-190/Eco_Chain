'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

export function usePageTransition() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = useCallback((href: string) => {
    setIsTransitioning(true);
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      router.push(href);
      // Reset transition state after navigation
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  }, [router]);

  return { navigateTo, isTransitioning };
}