'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { User, Award, Leaf, Clock, Activity, TrendingUp, Target, Calendar, Zap } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const userData = {
    name: 'Eco Warrior',
    level: 3,
    points: 1250,
    recycled: 1560,
    streak: 7,
    rank: 24,
    nextLevelPoints: 2000,
    co2Saved: 89,
    treesEquivalent: 12,
    recentActivity: [
      { id: '1', type: 'recycle', date: '2h ago', points: 120, title: 'Plastic Recycling', icon: '♻️' },
      { id: '2', type: 'streak', date: '1d ago', points: 30, title: '3 Day Streak', icon: '🔥' },
      { id: '3', type: 'recycle', date: '2d ago', points: 85, title: 'Glass Recycling', icon: '🥃' },
      { id: '4', type: 'achievement', date: '3d ago', points: 200, title: 'Level Up!', icon: '🏆' },
    ],
    progressData: {
      week: [65, 78, 45, 89, 92, 67, 85],
      month: [450, 520, 380, 670, 590, 720, 650, 580, 490, 630, 720, 680, 590, 640, 710, 580, 490, 630, 720, 680, 590, 640, 710, 580, 490, 630, 720, 680, 590, 640],
      year: [2400, 2800, 2200, 3100, 2900, 3400, 3200, 2800, 2600, 3000, 3400, 3200]
    }
  };

  const progress = Math.min((userData.points / userData.nextLevelPoints) * 100, 100);
  const currentData = userData.progressData[selectedPeriod as keyof typeof userData.progressData];
  const maxValue = Math.max(...currentData);

  const ProgressChart = () => (
    <div style={{ padding: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        {['week', 'month', 'year'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              border: 'none',
              background: selectedPeriod === period 
                ? 'linear-gradient(135deg, #059669, #047857)' 
                : 'rgba(5, 150, 105, 0.1)',
              color: selectedPeriod === period ? 'white' : '#059669',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              textTransform: 'capitalize'
            }}
          >
            {period}
          </button>
        ))}
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'end', 
        gap: selectedPeriod === 'week' ? '12px' : selectedPeriod === 'month' ? '4px' : '8px',
        height: '200px',
        padding: '0 8px'
      }}>
        {currentData.map((value, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${(value / maxValue) * 180}px` }}
            transition={{ delay: index * 0.05, duration: 0.6 }}
            style={{
              flex: 1,
              background: `linear-gradient(to top, #059669, #10b981)`,
              borderRadius: '4px 4px 0 0',
              minHeight: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to top, #047857, #059669)';
              e.currentTarget.style.transform = 'scaleY(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to top, #059669, #10b981)';
              e.currentTarget.style.transform = 'scaleY(1)';
            }}
            title={`${value} points`}
          />
        ))}
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '12px',
        fontSize: '12px',
        color: '#6b7280'
      }}>
        <span>{selectedPeriod === 'week' ? 'Mon' : selectedPeriod === 'month' ? '1' : 'Jan'}</span>
        <span>{selectedPeriod === 'week' ? 'Sun' : selectedPeriod === 'month' ? '30' : 'Dec'}</span>
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '48px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '32px',
                background: 'linear-gradient(135deg, #059669, #047857)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(5, 150, 105, 0.3)',
                fontSize: '48px'
              }}>
                🌱
              </div>
              <div>
                <h1 style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #065f46, #059669)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px',
                  margin: 0
                }}>
                  {userData.name}
                </h1>
                <p style={{ fontSize: '20px', color: '#6b7280', margin: 0 }}>
                  Level {userData.level} • Rank #{userData.rank}
                </p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                  Progress to Level {userData.level + 1}
                </span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#059669' }}>
                  {userData.points} / {userData.nextLevelPoints}
                </span>
              </div>
              <div style={{
                height: '12px',
                background: 'rgba(5, 150, 105, 0.1)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(135deg, #059669, #10b981)',
                    borderRadius: '12px'
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}
        >
          {[
            { icon: <Leaf style={{ width: '32px', height: '32px', color: '#059669' }} />, label: 'Total Recycled', value: `${userData.recycled} kg`, desc: 'Waste processed' },
            { icon: <Zap style={{ width: '32px', height: '32px', color: '#f59e0b' }} />, label: 'Current Streak', value: `${userData.streak} days`, desc: 'Keep it going!' },
            { icon: <TrendingUp style={{ width: '32px', height: '32px', color: '#3b82f6' }} />, label: 'CO₂ Saved', value: `${userData.co2Saved} kg`, desc: 'Environmental impact' },
            { icon: <Target style={{ width: '32px', height: '32px', color: '#8b5cf6' }} />, label: 'Trees Equivalent', value: `${userData.treesEquivalent}`, desc: 'Trees saved' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(5, 150, 105, 0.1)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{ marginBottom: '16px' }}>{stat.icon}</div>
              <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px', margin: 0 }}>{stat.value}</h3>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '4px', margin: 0 }}>{stat.label}</p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
              padding: '32px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(5, 150, 105, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Activity style={{ width: '28px', height: '28px', color: '#059669' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>Activity Progress</h2>
            </div>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px', margin: 0 }}>
              Track your eco-friendly activities over time
            </p>
            <ProgressChart />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
              backdropFilter: 'blur(20px)',
              borderRadius: '32px',
              padding: '32px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(5, 150, 105, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Calendar style={{ width: '28px', height: '28px', color: '#059669' }} />
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>Recent Activity</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userData.recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'rgba(5, 150, 105, 0.05)',
                    borderRadius: '16px',
                    border: '1px solid rgba(5, 150, 105, 0.1)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(5, 150, 105, 0.1)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(5, 150, 105, 0.05)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}>
                    {activity.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '4px', margin: 0 }}>
                      {activity.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{activity.date}</p>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    +{activity.points}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <button
            onClick={() => router.push('/upload')}
            style={{
              padding: '20px 48px',
              background: 'linear-gradient(135deg, #059669, #047857)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(5, 150, 105, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(5, 150, 105, 0.3)';
            }}
          >
            🌱 Continue Your Eco Journey
          </button>
        </motion.div>
      </div>
    </div>
  );
}