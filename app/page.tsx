"use client";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-5xl font-bold mb-6 text-green-700">
        EcoCommerce 🌍
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Turn your waste into blockchain rewards.
      </p>

      <div className="flex gap-4">
        <a
          href="/upload"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Upload Waste
        </a>
        <a
          href="/leaderboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          View Leaderboard
        </a>
        <a
          href="/profile"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
        >
          Profile
        </a>
      </div>
    </main>
  );
}
