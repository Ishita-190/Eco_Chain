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

  // Animated gradient colors
  const colors = [
    'from-emerald-500 via-teal-400 to-cyan-500',
    'from-cyan-500 via-blue-400 to-indigo-500',
    'from-indigo-500 via-purple-400 to-pink-500',
    'from-pink-500 via-rose-400 to-red-500',
    'from-red-500 via-orange-400 to-amber-500',
    'from-amber-500 via-yellow-400 to-lime-500',
    'from-lime-500 via-green-400 to-emerald-500',
  ];
  
  const [currentGradient, setCurrentGradient] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient((prev) => (prev + 1) % colors.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center text-white relative overflow-hidden bg-gray-900">
      {/* Animated Gradient Background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${colors[currentGradient]} bg-gradient-to-br`} />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 10 + 1,
              height: Math.random() * 10 + 1,
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50, -Math.random() * 200 - 100],
              x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * -20,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-4xl w-full px-6 py-12 backdrop-blur-sm bg-black/30 rounded-3xl shadow-2xl border border-white/10 mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-6xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          EcoCommerce <span className="text-emerald-400">🌱</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-light mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Transform your waste into blockchain rewards. Track your environmental impact, compete on the leaderboard, and help build a sustainable future.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a 
            href="/upload" 
            className="relative group bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="relative z-10">♻️ Upload Waste</span>
            <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
          <a 
            href="/leaderboard" 
            className="relative group bg-emerald-700/80 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-emerald-500/20"
          >
            <span className="relative z-10">🏆 View Leaderboard</span>
          </a>
        </motion.div>

        {/* Waste Counter */}
        <motion.div 
          className="mb-12 p-6 bg-black/30 rounded-2xl backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-2 text-gray-200">Total Waste Recycled</h2>
          <motion.p 
            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 mb-2"
            key={waste}
            initial={{ scale: 1.1, opacity: 0.5 }}
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
            <div key={index} className="bg-black/20 p-6 rounded-xl border border-white/5 hover:border-emerald-400/30 transition-colors">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-2xl font-bold mb-6">Ready to make a difference?</h3>
          <a 
            href="/upload" 
            className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Recycling Now
          </a>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 text-sm text-gray-400 pb-8">
        <div className="container mx-auto px-6">
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} EcoCommerce. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
