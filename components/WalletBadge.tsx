// components/WalletBadge.tsx
'use client';

import { useAccount, useBalance } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { Wallet, Leaf } from 'lucide-react';
import { formatEther } from 'viem';

const ECO_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_ECO_TOKEN_ADDRESS as `0x${string}`;

export function WalletBadge() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: ECO_TOKEN_ADDRESS,
    enabled: isConnected && !!ECO_TOKEN_ADDRESS, // ✅ correct for wagmi v2
  });

  if (!isConnected) {
    return (
      <ConnectKitButton.Custom>
        {({ show }) => (
          <button
            onClick={show}
            className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            <Wallet className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Connect Wallet</span>
          </button>
        )}
      </ConnectKitButton.Custom>
    );
  }

  return (
    <ConnectKitButton.Custom>
      {({ show }) => (
        <button
          onClick={show}
          className="flex items-center space-x-3 bg-white border border-eco-300 rounded-lg px-4 py-2 hover:bg-eco-50 transition-colors"
        >
          <div className="flex items-center space-x-1">
            <Leaf className="w-4 h-4 text-eco-600" />
            <span className="text-sm font-bold text-eco-600">
              {balance ? formatEther(balance.value) : '0'} ECO
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </button>
      )}
    </ConnectKitButton.Custom>
  );
}
