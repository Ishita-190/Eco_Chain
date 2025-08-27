"use client";

import { useAccount } from "wagmi";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Profile 👤</h1>

      {isConnected ? (
        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md text-center">
          <p className="mb-4">
            <span className="font-semibold">Wallet Address:</span>
          </p>
          <p className="text-gray-600 break-words">{address}</p>
        </div>
      ) : (
        <p className="text-gray-600">Please connect your wallet to view your profile.</p>
      )}
    </main>
  );
}
