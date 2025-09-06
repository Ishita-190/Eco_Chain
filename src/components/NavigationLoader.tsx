'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function NavigationLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Listen for route changes
    const originalPush = router.push;
    router.push = (...args) => {
      handleStart();
      const result = originalPush.apply(router, args);
      setTimeout(handleComplete, 300); // Match transition duration
      return result;
    };

    return () => {
      router.push = originalPush;
    };
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay active">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '24px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <Loader2 
          style={{ 
            width: '32px', 
            height: '32px', 
            color: '#059669',
            animation: 'spin 1s linear infinite'
          }} 
        />
        <p style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#374151',
          margin: 0
        }}>
          Loading...
        </p>
      </div>
    </div>
  );
}