'use client';

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
      {
        id: '1',
        type: 'recycle',
        date: '2h ago',
        points: 120,
        title: 'Plastic Recycling',
      },
      {
        id: '2',
        type: 'streak',
        date: '1d ago',
        points: 30,
        title: '3 Day Streak',
      },
      {
        id: '3',
        type: 'recycle',
        date: '2d ago',
        points: 85,
        title: 'Glass Recycling',
      },
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
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                <p className="text-sm mt-1">Level {userData.level}</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-emerald-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {userData.points} / {userData.nextLevelPoints} points
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <Leaf className="w-6 h-6 mx-auto text-eco-600" />
              <p className="mt-2 font-bold">{userData.recycled} kg</p>
              <p className="text-sm text-gray-500">Total Recycled</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-6 h-6 mx-auto text-yellow-500" />
              <p className="mt-2 font-bold">#{userData.rank}</p>
              <p className="text-sm text-gray-500">Rank</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-6 h-6 mx-auto text-blue-500" />
              <p className="mt-2 font-bold">{userData.streak} days</p>
              <p className="text-sm text-gray-500">Streak</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Heatmap</CardTitle>
            <CardDescription>Last 28 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {userData.activityHeatmap.map((val, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-md ${
                    val === 0
                      ? 'bg-gray-200'
                      : val < 2
                      ? 'bg-green-200'
                      : val < 4
                      ? 'bg-green-400'
                      : 'bg-green-600'
                  }`}
                  title={`${val} actions`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-eco-600" /> Recent Activity
            </CardTitle>
            <CardDescription>Your eco actions</CardDescription>
          </CardHeader>
          <CardContent>
            {userData.recentActivity.map((a) => (
              <div
                key={a.id}
                className="flex justify-between items-center py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.date}</p>
                </div>
                <span className="text-green-600 font-bold">+{a.points} pts</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button>Upload Waste Now</Button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
