// components/CelebrationBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Award, TrendingUp, Users } from 'lucide-react';

interface CelebrationBannerProps {
  creditsEarned: number;
  wasteWeight: number;
  userRank?: number;
  totalUsers?: number;
  onClose: () => void;
}

export function CelebrationBanner({ 
  creditsEarned, 
  wasteWeight, 
  userRank, 
  totalUsers,
  onClose 
}: CelebrationBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`
      fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300
      ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className={`
        bg-gradient-to-r from-eco-500 to-green-600 rounded-2xl p-8 max-w-lg w-full text-white relative overflow-hidden transition-transform duration-300
        ${isVisible ? 'scale-100' : 'scale-95'}
      `}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 text-6xl">🎉</div>
          <div className="absolute bottom-4 left-4 text-4xl">♻️</div>
          <div className="absolute top-8 left-8 text-3xl">⭐</div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce-slow">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">
            Congratulations! 🎉
          </h2>
          
          <p className="text-center text-white/90 mb-6">
            You've successfully diverted waste from landfills and earned eco rewards!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">{creditsEarned}</div>
              <div className="text-sm text-white/80">ECO Credits Earned</div>
            </div>
            
            <div className="bg-white/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold mb-1">{wasteWeight}kg</div>
              <div className="text-sm text-white/80">Waste Diverted</div>
            </div>
          </div>

          {/* Ranking */}
          {userRank && totalUsers && (
            <div className="bg-white/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Environmental Impact</span>
              </div>
              <p className="text-center text-sm text-white/90">
                You're among the <span className="font-bold">top {Math.round((userRank / totalUsers) * 100)}%</span> of eco-heroes this month!
              </p>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleClose}
              className="bg-white text-eco-600 font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
            >
              Continue Your Eco Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
