'use client';

import { motion } from 'framer-motion';
import { Leaf, Recycle, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            About EcoCommerce
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Turning waste into rewards while building a greener tomorrow.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700"
        >
          <div className="flex items-start gap-4">
            <Leaf className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
              <p className="text-gray-300">
                EcoCommerce empowers individuals to recycle responsibly by rewarding eco-friendly actions. 
                We believe sustainability should be rewarding — literally.
              </p>
            </div>
          </div>
        </motion.section>

        {/* How it Works */}
        <motion.section
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700"
        >
          <div className="flex items-start gap-4">
            <Recycle className="w-8 h-8 text-cyan-400 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">How It Works</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Upload your recyclable waste details on the platform</li>
                <li>Earn eco-points for every contribution</li>
                <li>Climb the leaderboard and unlock rewards</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Impact */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700"
        >
          <div className="flex items-start gap-4">
            <Globe className="w-8 h-8 text-blue-400 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-2">Our Impact</h2>
              <p className="text-gray-300">
                By connecting communities and promoting recycling, we reduce waste and help preserve natural 
                resources. Every eco-action counts towards a cleaner, healthier planet.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-lg text-gray-300 mb-4">Join us in making sustainability rewarding.</p>
          <a
            href="/upload"
            className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl shadow-lg text-lg font-semibold hover:opacity-90 transition"
          >
            Start Recycling
          </a>
        </motion.div>
      </main>
    </div>
  );
}
