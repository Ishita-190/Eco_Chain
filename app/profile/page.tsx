"use client";

import { useAccount, useConnect, useConnectors } from "wagmi";
import { motion } from "framer-motion";
import { User, Award, Leaf, Clock, Activity, Wallet, Zap } from "lucide-react";
import { useEffect, useState } from "react";

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

  const { connect, connectors, error, isPending, status } = useConnect();
  const [pendingConnector, setPendingConnector] = useState<any>(null);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <motion.div 
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-900 to-emerald-700 flex items-center justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="w-12 h-12 text-yellow-300" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Connect Your Wallet
          </motion.h1>
          
          <motion.p 
            className="text-gray-300 mb-8 text-lg"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Connect your wallet to view your profile and track your eco-journey.
          </motion.p>
          
          <motion.div 
            className="space-y-3 w-full max-w-xs mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => {
                  setPendingConnector(connector);
                  connect({ connector });
                }}
                className={`w-full flex items-center justify-between px-6 py-3 rounded-xl font-medium transition-all ${
                  !connector.ready
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white transform hover:-translate-y-0.5 hover:shadow-lg'
                }`}
              >
                <span>{connector.name}</span>
                {!connector.ready && ' (unsupported)'}
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
              <div className="text-red-400 text-sm mt-2">
                {error.message}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Shorten the address for display
  const shortenedAddress = `${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900/50 to-transparent border-b border-emerald-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-end md:justify-between">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-4xl">
                  <User className="w-10 h-10" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                  Level {userData.level}
                </div>
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold">{userData.name}</h1>
                <div className="flex items-center text-gray-400 text-sm mt-1">
                  <Wallet className="w-4 h-4 mr-1" />
                  {shortenedAddress}
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Award 
                    key={i} 
                    className={`w-5 h-5 ${i < userData.level ? 'fill-current' : 'text-gray-600'}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-1">Level {userData.level} Eco Warrior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-emerald-500/30 transition-colors"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-emerald-900/50 text-emerald-400 mr-4">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Recycled</p>
                <p className="text-2xl font-bold">{userData.recycled.toLocaleString()} kg</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-emerald-500/30 transition-colors"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-900/50 text-yellow-400 mr-4">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Eco Points</p>
                <p className="text-2xl font-bold">{userData.points.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-emerald-500/30 transition-colors"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-900/50 text-blue-400 mr-4">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Current Streak</p>
                <p className="text-2xl font-bold">{userData.streak} days</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-emerald-400" />
              Recent Activity
            </h2>
          </div>
          
          <div className="divide-y divide-gray-800/50">
            {userData.recentActivity.map((activity, index) => (
              <div key={activity.id} className="p-4 hover:bg-gray-800/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'recycle' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {activity.type === 'recycle' ? <Leaf className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">
                        {activity.type === 'recycle' 
                          ? `Recycled ${activity.amount}kg of waste` 
                          : `Earned ${activity.amount} day streak bonus`}
                      </p>
                      <p className="text-sm text-gray-400">{activity.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">+{activity.points} pts</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 text-center border-t border-gray-700/50">
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
              View All Activity
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Ready for your next eco-mission?</h3>
          <button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-medium py-3 px-8 rounded-xl transition-all transform hover:scale-105">
            Upload Waste Now
          </button>
        </div>
      </div>
    </div>
  );
}
