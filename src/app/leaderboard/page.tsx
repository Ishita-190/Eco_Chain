'use client';
import { Trophy, Medal } from 'lucide-react';
import BackButton from '@/src/components/BackButton';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const leaderboardData = [
    { id: 1, name: 'EcoWarrior42', score: 2450, avatar: '', level: 'Platinum' },
    { id: 2, name: 'GreenThumb', score: 1980, avatar: '', level: 'Gold' },
    { id: 3, name: 'RecycleMaster', score: 1750, avatar: '', level: 'Gold' },
    { id: 4, name: 'PlanetSaver', score: 1620, avatar: '', level: 'Silver' },
    { id: 5, name: 'EcoHero', score: 1480, avatar: '', level: 'Silver' },
  ];

  const levelColors: Record<string, string> = {
    Platinum: 'text-sky-300 border-sky-400',
    Gold: 'text-yellow-300 border-yellow-400',
    Silver: 'text-gray-300 border-gray-400',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <BackButton />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-900/50 border border-emerald-500/30 mb-6 shadow-lg">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
            Global Leaderboard
          </h1>
          <p className="text-lg text-gray-300">Top eco-warriors making a difference</p>
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/90 border-b border-gray-700/50 text-sm font-semibold uppercase tracking-wide text-gray-300">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-7">User</div>
            <div className="col-span-4 text-right">Eco Points</div>
          </div>

          <div className="divide-y divide-gray-800/50">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors group hover:bg-gray-800/40 ${
                  index < 3 ? 'bg-gradient-to-r from-gray-800/40 to-transparent' : ''
                }`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Rank / Medal */}
                <div className="col-span-1 flex justify-center">
                  {index < 3 ? (
                    <Medal
                      className={`w-8 h-8 ${
                        index === 0
                          ? 'text-yellow-400'
                          : index === 1
                          ? 'text-gray-300'
                          : 'text-amber-600'
                      }`}
                    />
                  ) : (
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300 font-bold">
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Avatar + Name */}
                <div className="col-span-7 flex items-center">
                  <div className="w-6 h-6 rounded-full bg-emerald-700/40 border border-emerald-400 flex items-center justify-center text-xs font-bold mr-3">
                    {user.avatar || user.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-white group-hover:text-emerald-300 transition">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full border text-xs ${levelColors[user.level]}`}>
                        {user.level}
                      </span>
                      • {user.score.toLocaleString()} pts
                    </div>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-4 text-right">
                  <div className="font-bold text-emerald-400 text-lg">
                    {user.score.toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Your Rank */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-full max-w-md bg-gradient-to-r from-emerald-900/40 to-transparent p-8 rounded-2xl border border-emerald-500/30 shadow-xl text-center">
            <h3 className="text-xl font-semibold mb-2">Your Rank</h3>
            <p className="text-gray-400 mb-6">Keep going to climb the leaderboard!</p>
            <div>
              <div className="text-5xl md:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
                #24
              </div>
              <div className="text-lg text-emerald-400">720 points</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
