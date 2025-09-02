import { Trophy } from 'lucide-react';
import BackButton from '@/src/components/BackButton';

export default function LeaderboardPage() {
  const leaderboardData = [
    { id: 1, name: 'EcoWarrior42', score: 2450, avatar: '', level: 'Platinum' },
    { id: 2, name: 'GreenThumb', score: 1980, avatar: '', level: 'Gold' },
    { id: 3, name: 'RecycleMaster', score: 1750, avatar: '', level: 'Gold' },
    { id: 4, name: 'PlanetSaver', score: 1620, avatar: '', level: 'Silver' },
    { id: 5, name: 'EcoHero', score: 1480, avatar: '', level: 'Silver' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <BackButton />

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-900/50 border border-emerald-500/30 mb-6">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
            Global Leaderboard
          </h1>
          <p className="text-lg text-gray-300">Top eco-warriors making a difference</p>
        </div>

        {/* Leaderboard */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-800/80 border-b border-gray-700/50 text-sm font-medium">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-7">User</div>
            <div className="col-span-4 text-right">Eco Points</div>
          </div>

          <div className="divide-y divide-gray-800/50">
            {leaderboardData.map((user, index) => (
              <div
                key={user.id}
                className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-800/30 transition-colors ${
                  index < 3 ? 'bg-gradient-to-r from-gray-800/30 to-transparent' : ''
                }`}
              >
                <div className="col-span-1 flex justify-center">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      index === 0
                        ? 'bg-yellow-400 text-yellow-900'
                        : index === 1
                        ? 'bg-gray-300 text-gray-700'
                        : index === 2
                        ? 'bg-amber-600 text-amber-100'
                        : 'bg-gray-700 text-gray-300'
                    } font-bold`}
                  >
                    {index + 1}
                  </span>
                </div>
                <div className="col-span-7 flex items-center">
                  <span className="text-2xl mr-3">{user.avatar}</span>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400">
                      {user.level} • {user.score.toLocaleString()} points
                    </div>
                  </div>
                </div>
                <div className="col-span-4 text-right">
                  <div className="font-bold text-emerald-400">
                    {user.score.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rank */}
        <div className="mt-8 bg-gradient-to-r from-emerald-900/30 to-transparent p-6 rounded-2xl border border-emerald-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Your Rank</h3>
              <p className="text-gray-400">Keep going to climb the leaderboard!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">#24</div>
              <div className="text-sm text-emerald-400">720 points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
