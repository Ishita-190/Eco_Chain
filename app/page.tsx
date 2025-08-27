// app/page.tsx
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [waste, setWaste] = useState(126693);

  useEffect(() => {
    let count = waste;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 15) + 5; // faster increment
      setWaste(count);
    }, 200); // faster update (every 0.2s)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
      {/* Background Gradient Wavy Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-yellow-300 to-green-600 animate-pulse opacity-90"></div>
      <div className="absolute inset-0 mix-blend-overlay" 
           style={{ backgroundImage: "url('/waves.svg')", backgroundSize: "cover", opacity: "0.3" }}></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-5xl font-extrabold mb-4">EcoCommerce 🌍</h1>
        <p className="text-lg mb-6">
          Turn your waste into blockchain rewards. Track your impact, compete on the leaderboard, and help build a greener planet.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mb-10">
          <a href="/upload" className="bg-white text-green-600 px-6 py-3 rounded-2xl shadow-lg font-semibold hover:bg-green-100 transition">Upload Waste</a>
          <a href="/leaderboard" className="bg-green-700 px-6 py-3 rounded-2xl shadow-lg font-semibold hover:bg-green-800 transition">View Leaderboard</a>
        </div>

        {/* Waste Counter */}
        <h2 className="text-3xl font-bold mb-2">Total Waste Recycled</h2>
        <p className="text-4xl font-extrabold text-yellow-300 mb-4">
          {waste.toLocaleString()} kg
        </p>
        <p className="text-sm flex items-center justify-center gap-2">
          Updated live as our community recycles ♻️
        </p>

        {/* Contact Form */}
        <div className="mt-10 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <form className="flex flex-col gap-3">
            <input type="text" placeholder="Your Name" className="p-3 rounded-lg text-black" />
            <input type="email" placeholder="Your Email" className="p-3 rounded-lg text-black" />
            <textarea placeholder="Your Message" className="p-3 rounded-lg text-black"></textarea>
            <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg font-bold hover:bg-yellow-300 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-10 text-sm text-gray-200">
        © 2025 EcoCommerce. All rights reserved.
      </footer>
    </div>
  );
}
