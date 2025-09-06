'use client';
import { Trophy, Medal, Crown, Star, Award, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeaderboardPage() {
  const leaderboardData = [
    { id: 1, name: 'EcoWarrior42', score: 2450, avatar: '🌟', level: 'Platinum', wasteProcessed: '145kg', co2Saved: '89kg' },
    { id: 2, name: 'GreenThumb', score: 1980, avatar: '🌱', level: 'Gold', wasteProcessed: '120kg', co2Saved: '72kg' },
    { id: 3, name: 'RecycleMaster', score: 1750, avatar: '♻️', level: 'Gold', wasteProcessed: '98kg', co2Saved: '61kg' },
    { id: 4, name: 'PlanetSaver', score: 1620, avatar: '🌍', level: 'Silver', wasteProcessed: '87kg', co2Saved: '54kg' },
    { id: 5, name: 'EcoHero', score: 1480, avatar: '🦸', level: 'Silver', wasteProcessed: '76kg', co2Saved: '48kg' },
    { id: 6, name: 'CleanEarth', score: 1320, avatar: '🌿', level: 'Bronze', wasteProcessed: '65kg', co2Saved: '42kg' },
    { id: 7, name: 'GreenGuardian', score: 1180, avatar: '🛡️', level: 'Bronze', wasteProcessed: '58kg', co2Saved: '38kg' },
    { id: 8, name: 'EcoChampion', score: 1050, avatar: '🏆', level: 'Bronze', wasteProcessed: '52kg', co2Saved: '34kg' },
  ];

  const levelConfig = {
    Platinum: { color: '#e0e7ff', bgColor: 'rgba(224, 231, 255, 0.1)', borderColor: '#a5b4fc' },
    Gold: { color: '#fef3c7', bgColor: 'rgba(254, 243, 199, 0.1)', borderColor: '#fbbf24' },
    Silver: { color: '#f3f4f6', bgColor: 'rgba(243, 244, 246, 0.1)', borderColor: '#9ca3af' },
    Bronze: { color: '#fed7aa', bgColor: 'rgba(254, 215, 170, 0.1)', borderColor: '#fb923c' },
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown style={{ width: '28px', height: '28px', color: '#fbbf24' }} />;
    if (index === 1) return <Medal style={{ width: '28px', height: '28px', color: '#9ca3af' }} />;
    if (index === 2) return <Award style={{ width: '28px', height: '28px', color: '#fb923c' }} />;
    return (
      <div style={{
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #374151, #1f2937)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '600',
        color: '#9ca3af'
      }}>
        {index + 1}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #059669, #047857)',
            borderRadius: '24px',
            marginBottom: '24px',
            boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'
          }}>
            <Trophy style={{ width: '40px', height: '40px', color: 'white' }} />
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #065f46, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
            lineHeight: '1.1'
          }}>
            Eco Champions Leaderboard
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#374151',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Celebrating our top environmental heroes who are making a real difference in the world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '48px' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)',
            textAlign: 'center'
          }}>
            <Users style={{ width: '32px', height: '32px', color: '#059669', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px', margin: 0 }}>2,847</h3>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>Active Users</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)',
            textAlign: 'center'
          }}>
            <TrendingUp style={{ width: '32px', height: '32px', color: '#059669', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px', margin: 0 }}>15.2k</h3>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>Total Waste Processed</p>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)',
            textAlign: 'center'
          }}>
            <Star style={{ width: '32px', height: '32px', color: '#059669', margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px', margin: 0 }}>9.8k</h3>
            <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>CO₂ Saved (kg)</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'end' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '2px solid rgba(156, 163, 175, 0.3)',
              transform: 'translateY(20px)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{leaderboardData[1].avatar}</div>
              <Medal style={{ width: '32px', height: '32px', color: '#9ca3af', margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px', margin: 0 }}>{leaderboardData[1].name}</h3>
              <p style={{ fontSize: '24px', fontWeight: '600', color: '#059669', marginBottom: '8px', margin: 0 }}>{leaderboardData[1].score.toLocaleString()}</p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{leaderboardData[1].wasteProcessed} processed</p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '40px 24px',
              textAlign: 'center',
              boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.25)',
              border: '2px solid rgba(251, 191, 36, 0.3)',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600'
              }}>CHAMPION</div>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>{leaderboardData[0].avatar}</div>
              <Crown style={{ width: '40px', height: '40px', color: '#fbbf24', margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '8px', margin: 0 }}>{leaderboardData[0].name}</h3>
              <p style={{ fontSize: '32px', fontWeight: '700', color: '#059669', marginBottom: '8px', margin: 0 }}>{leaderboardData[0].score.toLocaleString()}</p>
              <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>{leaderboardData[0].wasteProcessed} processed</p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '32px 24px',
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '2px solid rgba(251, 146, 60, 0.3)',
              transform: 'translateY(40px)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{leaderboardData[2].avatar}</div>
              <Award style={{ width: '32px', height: '32px', color: '#fb923c', margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px', margin: 0 }}>{leaderboardData[2].name}</h3>
              <p style={{ fontSize: '24px', fontWeight: '600', color: '#059669', marginBottom: '8px', margin: 0 }}>{leaderboardData[2].score.toLocaleString()}</p>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{leaderboardData[2].wasteProcessed} processed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)',
            overflow: 'hidden'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #059669, #047857)',
            padding: '24px 32px',
            color: 'white'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Complete Rankings</h2>
            <p style={{ fontSize: '16px', opacity: 0.9, margin: 0 }}>All eco-warriors making a difference</p>
          </div>

          <div style={{ padding: '0' }}>
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  alignItems: 'center',
                  padding: '24px 32px',
                  borderBottom: index < leaderboardData.length - 1 ? '1px solid rgba(5, 150, 105, 0.1)' : 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {getRankIcon(index)}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: levelConfig[user.level as keyof typeof levelConfig].bgColor,
                    border: `2px solid ${levelConfig[user.level as keyof typeof levelConfig].borderColor}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {user.avatar}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '4px', margin: 0 }}>{user.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      background: levelConfig[user.level as keyof typeof levelConfig].bgColor,
                      color: levelConfig[user.level as keyof typeof levelConfig].color,
                      border: `1px solid ${levelConfig[user.level as keyof typeof levelConfig].borderColor}`,
                      fontWeight: '500'
                    }}>
                      {user.level}
                    </span>
                    <span>🗂️ {user.wasteProcessed}</span>
                    <span>🌱 {user.co2Saved} CO₂</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', fontWeight: '700', color: '#059669', marginBottom: '4px' }}>
                    {user.score.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>ECO Points</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ marginTop: '48px', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.05))',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '48px',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(5, 150, 105, 0.15)',
            border: '2px solid rgba(5, 150, 105, 0.2)',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #059669, #047857)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '32px'
            }}>
              🚀
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '12px', margin: 0 }}>Your Current Rank</h3>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px', margin: 0 }}>Keep recycling to climb higher and earn more rewards!</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              marginBottom: '24px'
            }}>
              <div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px'
                }}>
                  #24
                </div>
                <div style={{ fontSize: '16px', color: '#6b7280' }}>Global Rank</div>
              </div>
              <div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px'
                }}>
                  720
                </div>
                <div style={{ fontSize: '16px', color: '#6b7280' }}>ECO Points</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '14px', color: '#6b7280' }}>
              <span>🗂️ 32kg processed</span>
              <span>🌱 18kg CO₂ saved</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}