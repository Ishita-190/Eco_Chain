// app/providers.tsx
'use client';

import { WagmiConfig, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { createPublicClient, http } from 'viem';

const config = createConfig(
  getDefaultConfig({
    appName: 'EcoCommerce',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [sepolia, mainnet],
    transports: {
      [sepolia.id]: http(),
      [mainnet.id]: http(),
    },
  })
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="soft">
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
