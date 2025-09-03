'use client';

import { motion } from 'framer-motion';
import { User, Award, Leaf, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';

const ProfilePage: React.FC = () => {
  // 🔹 Static user data
  const userData = {
    name: 'Eco Warrior',
    level: 3,
    points: 1250,
    recycled: 1560,
    streak: 7,
    rank: 24,
    nextLevelPoints: 2000,
    recentActivity: [
      { id: '1', type: 'recycle', date: '2h ago', points: 120, title: 'Plastic Recycling' },
      { id: '2', type: 'streak', date: '1d ago', points: 30, title: '3 Day Streak' },
      { id: '3', type: 'recycle', date: '2d ago', points: 85, title: 'Glass Recycling' },
    ],
    activityHeatmap: [
      2, 5, 0, 3, 1, 4, 2,
      3, 0, 1, 2, 4, 0, 1,
      5, 3, 2, 1, 0, 4, 2,
      1, 2, 3, 0, 5, 2, 4,
    ], // Example 28 days activity
  };

  const progress = Math.min((userData.points / userData.nextLevelPoints) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gray-800/60 backdrop-blur-lg border-gray-700 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                  <User className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{userData.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">Level {userData.level}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {userData.points} / {userData.nextLevelPoints} points
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: <Leaf className="w-6 h-6 text-emerald-400" />, label: "Total Recycled", value: `${userData.recycled} kg` },
            { icon: <Award className="w-6 h-6 text-yellow-400" />, label: "Rank", value: `#${userData.rank}` },
            { icon: <Clock className="w-6 h-6 text-blue-400" />, label: "Streak", value: `${userData.streak} days` },
          ].map((stat, i) => (
            <Card key={i} className="bg-gray-800/60 border-gray-700 hover:bg-gray-800 transition rounded-xl shadow-lg">
              <CardContent className="p-6 text-center">
                {stat.icon}
                <p className="mt-2 text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gray-800/60 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Activity Heatmap</CardTitle>
              <CardDescription className="text-gray-400">Last 28 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {userData.activityHeatmap.map((val, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className={`w-6 h-6 rounded-sm border ${
                      val === 0
                        ? 'bg-gray-700 border-gray-600'
                        : val < 2
                        ? 'bg-emerald-200 border-emerald-300'
                        : val < 4
                        ? 'bg-emerald-400 border-emerald-500'
                        : 'bg-emerald-600 border-emerald-700'
                    }`}
                    title={`${val} actions`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gray-800/60 border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-emerald-400" /> Recent Activity
              </CardTitle>
              <CardDescription className="text-gray-400">Your eco actions</CardDescription>
            </CardHeader>
            <CardContent>
              {userData.recentActivity.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex justify-between items-center py-3 border-b border-gray-700 last:border-0"
                >
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-xs text-gray-400">{a.date}</p>
                  </div>
                  <span className="text-emerald-400 font-bold">+{a.points} pts</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button className="px-6 py-3 text-lg rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg hover:opacity-90 transition">
            Upload Waste Now
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
