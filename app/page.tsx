// app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [waste, setWaste] = useState(126693);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let count = waste;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 15) + 5;
      setWaste(count);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Animated gradient colors (kept original but may not be fully visible with green bg)
  const colors = [
    'from-emerald-700 via-teal-600 to-cyan-600',
    'from-cyan-600 via-blue-500 to-indigo-600',
    'from-indigo-600 via-purple-500 to-pink-600',
    'from-pink-600 via-rose-500 to-red-600',
    'from-red-600 via-orange-500 to-amber-600',
    'from-amber-600 via-yellow-500 to-lime-600',
    'from-lime-600 via-green-500 to-emerald-700',
  ];
  
  const [currentGradient, setCurrentGradient] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % colors.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Import Google Fonts dynamically */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto+Slab&family=Pacifico&display=swap');

          .dynamic-font-main {
            font-family: 'Montserrat', sans-serif;
          }

          .dynamic-font-subtitle {
            font-family: 'Roboto Slab', serif;
          }

          .dynamic-font-cta {
            font-family: 'Pacifico', cursive;
          }
        `}
      </style>

      <div className="min-h-screen flex flex-col items-center justify-center text-center text-white relative overflow-hidden bg-green-700">
        {/* Animated Gradient Background */}
        <div className={`absolute inset-0 transition-all duration-1000 ${colors[currentGradient]} bg-gradient-to-br mix-blend-overlay`} />
        
        {/* Animated Particles - Client-side only */}
        {typeof window !== 'undefined' && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => {
              const width = window.innerWidth;
              const height = window.innerHeight;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/20 backdrop-blur-sm"
                  initial={{
                    x: Math.random() * width,
                    y: Math.random() * height,
                    width: Math.random() * 12 + 2,
                    height: Math.random() * 12 + 2,
                  }}
                  animate={{
                    y: [0, -Math.random() * 120 - 60, -Math.random() * 220 - 110],
                    x: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 220],
                    opacity: [0.3, 0.9, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 12,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: Math.random() * -20,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Main Content */}
        <motion.div 
          className="relative z-10 max-w-4xl w-full px-6 py-12 bg-black/40 rounded-3xl shadow-xl border border-white/20 mx-4 backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="dynamic-font-main text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200 select-none"
            whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            EcoCommerce <span className="text-emerald-300 animate-pulse">🌱</span>
          </motion.h1>
          
          <motion.p 
            className="dynamic-font-subtitle text-xl md:text-2xl font-light mb-10 text-gray-100 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Transform your waste into blockchain rewards. Track your environmental impact, compete on the leaderboard, and help build a sustainable future.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a 
              href="/upload" 
              className="relative group bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden dynamic-font-cta"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10">♻️ Upload Waste</span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
            <a 
              href="/leaderboard" 
              className="relative group bg-emerald-800/90 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-emerald-500/30 dynamic-font-main"
            >
              <span className="relative z-10">🏆 View Leaderboard</span>
            </a>
          </motion.div>

          {/* Waste Counter */}
          <motion.div 
            className="mb-12 p-6 bg-black/40 rounded-2xl backdrop-blur-md border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-100 dynamic-font-subtitle">Total Waste Recycled</h2>
            <motion.p 
              className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 mb-2 select-text"
              key={waste}
              initial={{ scale: 1.2, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {waste.toLocaleString()}
              <span className="text-2xl ml-2">kg</span>
            </motion.p>
            <p className="text-sm text-emerald-200 flex items-center justify-center gap-2">
              <span className="animate-pulse">🌍</span> Updated live as our community recycles
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { value: '1.2M+', label: 'Users Worldwide', icon: '👥' },
              { value: '45K+', label: 'Tons Recycled', icon: '♻️' },
              { value: '95%', label: 'Reduction in Waste', icon: '📉' },
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-emerald-300/40 transition-colors shadow-inner"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="text-4xl mb-3 select-none">{stat.icon}</div>
                <div className="text-3xl font-bold text-white dynamic-font-main">{stat.value}</div>
                <div className="text-gray-300 dynamic-font-subtitle">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-2xl font-bold mb-6 dynamic-font-main">Ready to make a difference?</h3>
            <a 
              href="/upload" 
              className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 dynamic-font-cta select-none"
            >
              Start Recycling Now
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer className="relative z-10 mt-16 text-sm text-gray-300 pb-8 select-none">
          <div className="container mx-auto px-6">
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 dynamic-font-subtitle">
                © {new Date().getFullYear()} EcoCommerce. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-white transition-colors dynamic-font-main">Privacy</a>
                <a href="#" className="hover:text-white transition-colors dynamic-font-main">Terms</a>
                <a href="#" className="hover:text-white transition-colors dynamic-font-main">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
