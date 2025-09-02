'use client';

import React, { useState, useEffect } from 'react';
import { setLocalStorage, removeLocalStorage } from '@/src/lib/storage';
import { WagmiConfig, createConfig, useAccount } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { createPublicClient, http } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig(
  getDefaultConfig({
    appName: 'EcoCommerce',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [sepolia, mainnet],
    transports: {
      [sepolia.id]: http(process.env.NEXT_PUBLIC_ETH_RPC_URL || ''),
      [mainnet.id]: http(process.env.NEXT_PUBLIC_ETH_MAINNET_RPC_URL || ''),
    },
  })
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="soft">
          <AuthTokenManager>{children}</AuthTokenManager>
        </ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

function AuthTokenManager({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    let isMounted = true;

    const syncToken = async () => {
      if (!isMounted) return;
      if (isConnected && address) {
        try {
          const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
          });

          if (!res.ok) throw new Error('Failed to fetch token');

          const data = await res.json();
          if (data.token) {
            setLocalStorage('ecocommerce_token', data.token);
          }
        } catch (error) {
          console.warn('Auth token sync failed:', error);
        }
      } else {
        removeLocalStorage('ecocommerce_token');
      }
    };

    syncToken();

    return () => {
      isMounted = false;
    };
  }, [address, isConnected]);

  return <>{children}</>;
}
