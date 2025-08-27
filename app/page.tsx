"use client";

import { useEffect, useState } from "react";
import { Leaf, Upload, Trophy, User } from "lucide-react";

export default function HomePage() {
  const [wasteRecycled, setWasteRecycled] = useState(125000); // starting value

  // Simulate real-time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setWasteRecycled((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="w-7 h-7 text-green-600" />
            <span className="font-bold text-xl text-gray-800">EcoCommerce</span>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <a
              href="/upload"
              className="flex items-center gap-1 hover:text-green-700 transition"
            >
              <Upload className="w-4 h-4" /> Upload
            </a>
            <a
              href="/leaderboard"
              className="flex items-center gap-1 hover:text-green-700 transition"
            >
              <Trophy className="w-4 h-4" /> Leaderboard
            </a>
            <a
              href="/profile"
              className="flex items-center gap-1 hover:text-green-700 transition"
            >
              <User className="w-4 h-4" /> Profile
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-col items-center text-center px-6 py-20 flex-grow">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-green-700">
          EcoCommerce 🌍
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-10">
          Turn your waste into blockchain rewards. Track your impact, compete on
          the leaderboard, and help build a greener planet.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/upload"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md"
          >
            Upload Waste
          </a>
          <a
            href="/leaderboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md"
          >
            View Leaderboard
          </a>
          <a
            href="/profile"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl shadow-md"
          >
            Profile
          </a>
        </div>
      </main>

      {/* Real-Time Stats */}
      <section className="bg-white/70 backdrop-blur-sm border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Total Waste Recycled
          </h2>
          <p className="text-5xl font-bold text-green-700 animate-pulse">
            {wasteRecycled.toLocaleString()} kg
          </p>
          <p className="text-gray-600 mt-2">
            Updated in real time as our community recycles ♻️
          </p>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-gradient-to-r from-green-100 to-green-50 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Contact Us
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} EcoCommerce. All rights reserved.
      </footer>
    </div>
  );
}
