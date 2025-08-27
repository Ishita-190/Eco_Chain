"use client";

export default function LeaderboardPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Leaderboard 🏆</h1>
      <p className="text-gray-600">See who’s leading the eco-credits race!</p>

      <div className="mt-8 w-full max-w-md bg-white shadow rounded-lg p-6">
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>1. Alice</span>
            <span className="font-semibold">1200 credits</span>
          </li>
          <li className="flex justify-between">
            <span>2. Bob</span>
            <span className="font-semibold">950 credits</span>
          </li>
          <li className="flex justify-between">
            <span>3. Charlie</span>
            <span className="font-semibold">870 credits</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
