'use client';

import React, { useState } from 'react';
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
      [sepolia.id]: http(process.env.NEXT_PUBLIC_ETH_RPC_URL || undefined),
      [mainnet.id]: http(process.env.NEXT_PUBLIC_ETH_MAINNET_RPC_URL || undefined),
    },
  })
);

export function Providers({ children }: { children: React.ReactNode }) {
  // one QueryClient per app instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={config}>
        <ConnectKitProvider theme="soft">
          <AuthTokenManager>
            {children}
          </AuthTokenManager>
        </ConnectKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

function AuthTokenManager({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();

  React.useEffect(() => {
    const syncToken = async () => {
      if (isConnected && address) {
        try {
          const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
          });
          const data = await res.json();
          if (data.token) {
            localStorage.setItem('ecocommerce_token', data.token);
          }
        } catch {
          // ignore errors silently
        }
      } else {
        localStorage.removeItem('ecocommerce_token');
      }
    };
    syncToken();
  }, [address, isConnected]);

  return <>{children}</>;
}
