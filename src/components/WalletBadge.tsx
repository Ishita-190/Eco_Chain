'use client';

import { useAccount, useBalance } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { Wallet, Leaf } from 'lucide-react';
import { formatEther } from 'viem';

const ECO_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_ECO_TOKEN_ADDRESS as `0x${string}`;

export function WalletBadge() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: isConnected ? address : undefined, // ✅ only fetch if connected
    token: ECO_TOKEN_ADDRESS,
  });

  if (!isConnected) {
    return (
      <ConnectKitButton.Custom>
        {({ show }) => (
          <button
            onClick={show}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '12px 20px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.3)';
            }}
          >
            <Wallet style={{ width: '20px', height: '20px' }} />
            <span>Connect Wallet</span>
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(5, 150, 105, 0.2)',
            borderRadius: '20px',
            padding: '12px 20px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 15px rgba(5, 150, 105, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.2)';
            e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.2)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #059669, #047857)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Leaf style={{ width: '18px', height: '18px', color: 'white' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#059669',
                lineHeight: '1.2'
              }}>
                {balance ? parseFloat(formatEther(balance.value)).toFixed(2) : '0.00'} ECO
              </span>
              <span style={{
                fontSize: '12px',
                color: '#6b7280',
                fontWeight: '500',
                lineHeight: '1.2'
              }}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
          </div>
        </button>
      )}
    </ConnectKitButton.Custom>
  );
}
