'use client';

import { useAccount, useConnect, Connector } from 'wagmi';
import { useRouter } from 'next/navigation';
import { User, Award, Leaf, Clock, Activity, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WalletBadge } from '@/components/WalletBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type ActivityType = 'recycle' | 'streak' | 'login' | 'challenge';

interface ActivityItem {
  id: string;
  type: ActivityType;
  amount: number;
  date: string;
  points: number;
  title: string;
  description?: string;
}

interface UserData {
  name: string;
  level: number;
  points: number;
  recycled: number;
  streak: number;
  rank: number;
  nextLevelPoints: number;
  recentActivity: ActivityItem[];
}

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'recycle':
      return <Leaf className="w-4 h-4 text-green-500" />;
    case 'streak':
      return <Award className="w-4 h-4 text-yellow-500" />;
    case 'challenge':
      return <Activity className="w-4 h-4 text-purple-500" />;
    default:
      return <Clock className="w-4 h-4 text-blue-500" />;
  }
};

const ProfilePage: React.FC = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const { connect, connectors, error, isPending } = useConnect();
  const [pendingConnector, setPendingConnector] = useState<Connector | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Fetch user data
  useEffect(() => {
    if (!isConnected || !address) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setUserData({
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
            amount: 120,
            date: '2h ago',
            points: 120,
            title: 'Plastic Recycling',
            description: 'Recycled 120kg of plastic waste',
          },
          {
            id: '2',
            type: 'streak',
            amount: 3,
            date: '1d ago',
            points: 30,
            title: '3 Day Streak',
            description: 'Maintained recycling streak for 3 days',
          },
          {
            id: '3',
            type: 'recycle',
            amount: 85,
            date: '2d ago',
            points: 85,
            title: 'Glass Recycling',
            description: 'Recycled 85kg of glass',
          },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, [isConnected, address]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading...</div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-xl font-bold mb-4">Connect Your Wallet</h1>
          {connectors.map((connector) => (
            <button
              key={connector.id}
              disabled={!connector.ready}
              onClick={() => {
                setPendingConnector(connector);
                connect({ connector });
              }}
              className="block w-full p-3 border rounded mb-2"
            >
              {connector.name}
            </button>
          ))}
          {error && <div className="text-red-500">{error.message}</div>}
        </div>
      </div>
    );
  }

  if (!userData) {
    return <div className="min-h-screen flex items-center justify-center">No user data</div>;
  }

  const shortenedAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;
  const progress = Math.min((userData.points / userData.nextLevelPoints) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <WalletBadge />
        </div>
      </header>

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
                <p className="text-sm text-gray-500">{shortenedAddress}</p>
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
              <div key={a.id} className="flex justify-between items-center py-2 border-b last:border-0">
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
          <Button onClick={() => router.push('/upload')}>Upload Waste Now</Button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
