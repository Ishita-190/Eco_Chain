'use client';

import { useAccount, useConnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Award, Leaf, Clock, Activity, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { WalletBadge } from '@/components/WalletBadge';

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  
  // Mock user data
  const userData = {
    name: "Eco Warrior",
    level: 3,
    points: 1250,
    recycled: 1560, // kg
    streak: 7,
    rank: 24,
    recentActivity: [
      { id: 1, type: 'recycle', amount: 120, date: '2h ago', points: 120 },
      { id: 2, type: 'streak', amount: 3, date: '1d ago', points: 30 },
      { id: 3, type: 'recycle', amount: 85, date: '2d ago', points: 85 },
    ]
  };

  const router = useRouter();
  const { connect, connectors, error, isPending } = useConnect();
  const [pendingConnector, setPendingConnector] = useState<any>(null);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="card p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-eco-100 flex items-center justify-center">
              <Award className="w-10 h-10 text-eco-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Connect Your Wallet</h1>
            <p className="text-gray-600 mb-8">Connect your wallet to view your profile and track your eco-journey.</p>
            
            <div className="space-y-3">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  disabled={!connector.ready}
                  onClick={() => {
                    setPendingConnector(connector);
                    connect({ connector });
                  }}
                  className={`w-full flex items-center justify-between px-6 py-3 rounded-xl font-medium transition-all ${
                    !connector.ready
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-eco-600 hover:bg-eco-700 text-white transform hover:-translate-y-0.5 hover:shadow-md'
                  }`}
                >
                  <span>{connector.name}</span>
                  {!connector.ready && <span className="text-xs">(unsupported)</span>}
                  {isPending && connector.id === pendingConnector?.id && (
                    <span className="ml-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </button>
              ))}
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                  {error.message}
                </div>
              )}
              
              <div className="pt-4 mt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">Don't have a wallet? <a href="#" className="text-eco-600 hover:underline">Learn more</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Shorten the address for display
  const shortenedAddress = `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()} 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
            </div>
            <WalletBadge />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-4xl text-white">
                  <User className="w-10 h-10" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                  Level {userData.level}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                <div className="flex items-center mt-1 text-gray-600">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M17.9 12c0-.6.1-1.2.1-1.8 0-5.5-4.5-10-10-10S-2 4.7-2 10.2 2.5 20.2 8 20.2c2.1 0 4.1-.7 5.8-1.9.3-.2.4-.6.2-.9-.1-.2-.3-.4-.6-.4h-2.1c-1.2 0-2.3-.4-3.2-1.1-.9-.7-1.5-1.7-1.7-2.8-.1-.3 0-.5.1-.8.2-.2.4-.4.7-.4h.4c1.3 0 2.5.5 3.4 1.4.9.9 1.4 2.1 1.4 3.4v2.4c0 .3.1.5.4.6.1 0 .2.1.3.1.1 0 .3 0 .4-.1 1.7-1.2 3-2.9 3.6-4.9.1-.3 0-.6-.3-.8-.2-.1-.5-.1-.8 0-1.1.4-2.3.6-3.5.6-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5 7.5 3.4 7.5 7.5c0 .6-.1 1.2-.2 1.8 0 .3.1.6.4.7.3.1.6 0 .8-.3.2-.3.3-.7.3-1.1 0-4.7-3.8-8.5-8.5-8.5S.5 5.5.5 10.2s3.8 8.5 8.5 8.5c1.3 0 2.6-.3 3.8-.9-.2.9-.5 1.8-1 2.6-1.4 2.1-3.8 3.4-6.3 3.4-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5c1.2 0 2.4.3 3.5.8.3.1.6 0 .8-.3.2-.3.1-.6-.2-.8-1.2-.6-2.6-.9-4-.9-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5c2.9 0 5.6-1.5 7.1-4 .5-.8.9-1.7 1.2-2.6.1-.3.4-.5.7-.5.4 0 .7.3.7.7v3.5c0 .4-.3.7-.7.7h-3.5c-.4 0-.7-.3-.7-.7s.3-.7.7-.7h2.1c-.5-1.6-1.5-3-2.8-4-1.3-1-2.9-1.6-4.6-1.6-3.3 0-6.1-2.7-6.1-6.1s2.7-6.1 6.1-6.1 6.1 2.7 6.1 6.1c0 .6-.1 1.2-.2 1.8-.1.4.1.8.5.9.4.1.8-.1.9-.5.1-.7.2-1.4.2-2.1 0-4.1-3.4-7.5-7.5-7.5S.5 6.1.5 10.2s3.4 7.5 7.5 7.5c1.8 0 3.5-.6 4.9-1.8 1.4 1.2 3.1 1.8 4.9 1.8 4.1 0 7.5-3.4 7.5-7.5 0-5.5-4.5-10-10-10S-2 4.7-2 10.2c0 1.2.2 2.4.6 3.5.1.3 0 .7-.3.9-.3.1-.7 0-.9-.3-.5-1.2-.7-2.5-.7-3.8 0-6.3 5.2-11.5 11.5-11.5S23.5 3.9 23.5 10.2c0 3.2-1.3 6.1-3.5 8.2-2.1 2.1-5 3.4-8.2 3.4-1.9 0-3.7-.5-5.3-1.4-1.6.9-3.4 1.4-5.3 1.4-3.2 0-6.1-1.3-8.2-3.5C-1.3 16.3-2.5 13.4-2.5 10.2c0-3.2 1.3-6.1 3.5-8.2C3.2-.1 6.1-1.3 9.3-1.3c3.2 0 6.1 1.3 8.2 3.5 2.1 2.1 3.4 5 3.4 8.2 0 .4-.3.7-.7.7s-.7-.3-.7-.7c0-2.8-1.1-5.3-3-7.1-1.9-1.9-4.4-3-7.1-3s-5.3 1.1-7.1 3-3 4.4-3 7.1 1.1 5.3 3 7.1c1.9 1.9 4.4 3 7.1 3 2.7 0 5.2-1.1 7.1-3 1.9-1.9 3-4.4 3-7.1 0-2.7-1.1-5.2-3-7.1-1.9-1.9-4.4-3-7.1-3s-5.3 1.1-7.1 3c-1.9 1.9-3 4.4-3 7.1s1.1 5.3 3 7.1c1.9 1.9 4.4 3 7.1 3 1.8 0 3.5-.5 5-1.4 1.5.9 3.2 1.4 5 1.4 2.7 0 5.2-1.1 7.1-3 1.9-1.9 3-4.4 3-7.1 0-5.5-4.5-10-10-10z"/>
                    </svg>
                  </div>
                  <span className="font-mono text-sm">{shortenedAddress}</span>
                </div>
                <div className="flex items-center mt-3 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Award 
                      key={i} 
                      className={`w-5 h-5 ${i < userData.level ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-center md:text-right">
              <div className="text-4xl font-bold text-eco-600">{userData.points.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Eco Points</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-eco-100 text-eco-600 mr-4">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Recycled</p>
                <p className="text-2xl font-bold text-gray-800">{userData.recycled.toLocaleString()} kg</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600 mr-4">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Global Rank</p>
                <p className="text-2xl font-bold text-gray-800">#{userData.rank}</p>
              </div>
            </div>
          </div>
          
          <div className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Streak</p>
                <p className="text-2xl font-bold text-gray-800">{userData.streak} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-eco-600" />
              Recent Activity
            </h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {userData.recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activity.type === 'recycle' ? 'bg-eco-50 text-eco-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {activity.type === 'recycle' ? (
                        <Leaf className="w-5 h-5" />
                      ) : (
                        <Award className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-800">
                        {activity.type === 'recycle' 
                          ? `Recycled ${activity.amount}kg of waste` 
                          : `Earned ${activity.amount} day streak bonus`}
                      </p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-eco-600">+{activity.points} pts</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 text-center border-t border-gray-100">
            <button className="text-eco-600 hover:text-eco-700 text-sm font-medium">
              View All Activity
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Ready for your next eco-mission?</h3>
          <button 
            onClick={() => router.push('/upload')}
            className="bg-gradient-to-r from-eco-600 to-cyan-600 hover:from-eco-700 hover:to-cyan-700 text-white font-medium py-3 px-8 rounded-xl transition-all transform hover:scale-105"
          >
            Upload Waste Now
          </button>
        </div>
      </main>
    </div>
  );
}
