"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export default function HomePage() {
  const [wasteRecycled, setWasteRecycled] = useState(125000);

  // Faster real-time counter
  useEffect(() => {
    const interval = setInterval(() => {
      setWasteRecycled((prev) => prev + Math.floor(Math.random() * 50) + 10);
    }, 500); // faster updates
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white relative overflow-hidden">
      {/* Gradient Wavy Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-lime-400 to-emerald-500">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="w-7 h-7" />
            <span className="font-bold text-lg tracking-wide">EcoCommerce</span>
          </div>
          <nav className="flex items-center gap-8 text-sm font-medium">
            <a href="/upload" className="hover:text-gray-200 transition">
              Upload
            </a>
            <a href="/leaderboard" className="hover:text-gray-200 transition">
              Leaderboard
            </a>
            <a href="/profile" className="hover:text-gray-200 transition">
              Profile
            </a>
            <a
              href="/signup"
              className="px-4 py-2 border border-white/70 rounded-full hover:bg-white hover:text-green-700 transition"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="px-4 py-2 border border-white/70 rounded-full hover:bg-white hover:text-green-700 transition"
            >
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          EcoCommerce 🌍
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-10 opacity-90">
          Turn your waste into blockchain rewards. Track your impact, compete on
          the leaderboard, and help build a greener planet.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/upload"
            className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Upload Waste
          </a>
          <a
            href="/leaderboard"
            className="bg-green-700 text-white px-6 py-3 rounded-full shadow hover:bg-green-800 transition"
          >
            View Leaderboard
          </a>
        </div>
      </main>

      {/* Real-Time Stats */}
      <section className="relative z-10 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Total Waste Recycled
        </h2>
        <p className="text-5xl font-extrabold animate-pulse">
          {wasteRecycled.toLocaleString()} kg
        </p>
        <p className="mt-2 opacity-90">
          Updated live as our community recycles ♻️
        </p>
      </section>

      {/* Contact Us */}
      <section className="relative z-10 bg-white/90 text-gray-800 py-16 px-6 rounded-t-3xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
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
      <footer className="relative z-10 bg-white/80 text-gray-600 py-6 text-center text-sm">
        © {new Date().getFullYear()} EcoCommerce. All rights reserved.
      </footer>
    </div>
  );
}
