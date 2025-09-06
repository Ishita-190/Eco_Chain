'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Package, MapPin, Calendar, Truck, CheckCircle, Clock, Sparkles } from 'lucide-react';

interface Collection {
  id: string;
  status: string;
  wasteType: string;
  estimatedWeight?: number;
  actualWeight?: number;
  scheduledAt?: string;
  pickupType: string;
  qrCode?: string;
  otpHint?: string;
  creditsMinted?: number;
  facility: {
    name: string;
    address: string;
    phone?: string;
  };
}

interface TimelineEvent {
  id: string;
  type: string;
  title: string;
  message?: string;
  createdAt: string;
  metadata?: any;
}

export default function TrackCollectionPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.id as string;

  const [collection, setCollection] = useState<Collection | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collectionId) {
      router.replace('/');
      return;
    }

    const fetchCollectionData = async () => {
      setLoading(true);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('ecocommerce_token') : '';
        const res = await fetch(`/api/orders/${collectionId}/timeline`, {
          headers: { Authorization: `Bearer ${token || ''}` },
        });

        if (!res.ok) throw new Error('Failed to fetch collection');

        const data = await res.json();
        setCollection(data.order);
        setTimeline(data.timeline || []);
      } catch (error) {
        console.error('Failed to fetch collection:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
    const interval = setInterval(fetchCollectionData, 30000);
    return () => clearInterval(interval);
  }, [collectionId, router]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '30px',
          padding: '60px',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '6px solid #e0e7ff',
            borderTop: '6px solid #4f46e5',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 30px'
          }}></div>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
            Loading Collection
          </h3>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>Fetching your tracking details...</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '30px',
          padding: '60px',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center'
        }}>
          <Package style={{ width: '80px', height: '80px', color: '#9ca3af', margin: '0 auto 30px' }} />
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px' }}>
            Collection Not Found
          </h2>
          <button 
            onClick={() => router.push('/')}
            style={{
              padding: '15px 40px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(79, 70, 229, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.3)';
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const collectionType = collection.pickupType === 'PICKUP' ? 'Pickup' : 'Drop-off';
  const statusOrder = ['CREATED', 'SCHEDULED', 'PICKED_UP', 'VERIFIED', 'COMPLETED'];
  const currentIndex = statusOrder.indexOf(collection.status);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CREATED': return Package;
      case 'SCHEDULED': return Calendar;
      case 'PICKED_UP': return Truck;
      case 'VERIFIED': return CheckCircle;
      case 'COMPLETED': return Sparkles;
      default: return Clock;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CREATED': return 'Created';
      case 'SCHEDULED': return 'Scheduled';
      case 'PICKED_UP': return 'Collected';
      case 'VERIFIED': return 'Verified';
      case 'COMPLETED': return 'Completed';
      default: return status;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      {/* Floating particles background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }}></div>

      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => router.push('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '20px',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <ArrowLeft style={{ width: '20px', height: '20px' }} />
              <span>Back</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)'
              }}>
                {collection.pickupType === 'PICKUP' ? 
                  <Truck style={{ width: '24px', height: '24px', color: 'white' }} /> : 
                  <MapPin style={{ width: '24px', height: '24px', color: 'white' }} />
                }
              </div>
              <div>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>
                  {collectionType} Tracking
                </h1>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>#{collectionId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Visual Flow Map */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '30px',
          padding: '50px',
          marginBottom: '40px',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899, #f59e0b)'
          }}></div>
          
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '50px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Collection Progress
          </h2>
          
          {/* Flow Visualization */}
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {statusOrder.map((status, index) => {
                const Icon = getStatusIcon(status);
                const isCompleted = index < currentIndex;
                const isCurrent = index === currentIndex;
                const isActive = isCompleted || isCurrent;

                return (
                  <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 10 }}>
                    {/* Status Circle */}
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isCurrent 
                        ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' 
                        : isCompleted 
                        ? 'linear-gradient(135deg, #10b981, #059669)'
                        : 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                      boxShadow: isActive ? '0 20px 40px rgba(79, 70, 229, 0.3)' : '0 10px 20px rgba(0, 0, 0, 0.1)',
                      transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.5s ease',
                      animation: isCurrent ? 'pulse 2s infinite' : 'none',
                      border: isCurrent ? '4px solid rgba(79, 70, 229, 0.3)' : 'none'
                    }}>
                      <Icon style={{
                        width: '40px',
                        height: '40px',
                        color: isActive ? 'white' : '#9ca3af'
                      }} />
                      
                      {/* Success checkmark */}
                      {isCompleted && (
                        <div style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          width: '30px',
                          height: '30px',
                          background: '#10b981',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 5px 15px rgba(16, 185, 129, 0.4)'
                        }}>
                          <CheckCircle style={{ width: '18px', height: '18px', color: 'white' }} />
                        </div>
                      )}
                    </div>
                    
                    {/* Status Label */}
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                      <div style={{
                        fontWeight: 'bold',
                        fontSize: '16px',
                        color: isActive ? '#1f2937' : '#9ca3af',
                        marginBottom: '5px'
                      }}>
                        {getStatusLabel(status)}
                      </div>
                      {isCurrent && (
                        <div style={{
                          fontSize: '12px',
                          color: '#4f46e5',
                          fontWeight: '600',
                          animation: 'pulse 2s infinite'
                        }}>
                          In Progress
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Progress Line */}
            <div style={{
              position: 'absolute',
              top: '50px',
              left: '50px',
              right: '50px',
              height: '6px',
              background: '#e5e7eb',
              borderRadius: '3px',
              zIndex: 1
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #10b981, #4f46e5)',
                borderRadius: '3px',
                width: `${(currentIndex / (statusOrder.length - 1)) * 100}%`,
                transition: 'width 1s ease-out'
              }}></div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Collection Details */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '25px',
              padding: '40px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '30px',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Package style={{ width: '28px', height: '28px', color: '#4f46e5' }} />
                Collection Details
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #ddd6fe, #e0e7ff)',
                  borderRadius: '20px',
                  padding: '25px',
                  border: '1px solid #c4b5fd'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Package style={{ width: '32px', height: '32px', color: '#7c3aed' }} />
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Waste Type</div>
                      <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937', textTransform: 'capitalize' }}>
                        {collection.wasteType}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div style={{
                  background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                  borderRadius: '20px',
                  padding: '25px',
                  border: '1px solid #86efac'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <Truck style={{ width: '32px', height: '32px', color: '#059669' }} />
                    <div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Type</div>
                      <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937' }}>
                        {collectionType}
                      </div>
                    </div>
                  </div>
                </div>
                
                {collection.estimatedWeight && (
                  <div style={{
                    background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                    borderRadius: '20px',
                    padding: '25px',
                    border: '1px solid #fcd34d'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        background: '#f59e0b',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}>
                        kg
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '5px' }}>Weight</div>
                        <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#1f2937' }}>
                          {collection.estimatedWeight}kg
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Facility Info */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '25px',
              padding: '40px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '25px',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <MapPin style={{ width: '28px', height: '28px', color: '#4f46e5' }} />
                Facility Details
              </h3>
              
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
                borderRadius: '20px',
                padding: '30px',
                border: '1px solid #cbd5e1'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '20px', color: '#1f2937', marginBottom: '15px' }}>
                  {collection.facility.name}
                </div>
                <div style={{ color: '#6b7280', fontSize: '16px', marginBottom: '15px' }}>
                  {collection.facility.address}
                </div>
                {collection.facility.phone && (
                  <div style={{ color: '#6b7280', fontSize: '16px', marginBottom: '15px' }}>
                    📞 {collection.facility.phone}
                  </div>
                )}
                {collection.scheduledAt && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'white',
                    padding: '15px',
                    borderRadius: '15px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <Calendar style={{ width: '20px', height: '20px', color: '#4f46e5' }} />
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>
                      {new Date(collection.scheduledAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Impact */}
          {collection.status === 'COMPLETED' && collection.actualWeight && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '25px',
              padding: '40px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              height: 'fit-content'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '30px',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Sparkles style={{ width: '28px', height: '28px', color: '#10b981' }} />
                Environmental Impact
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                  borderRadius: '20px',
                  padding: '30px',
                  textAlign: 'center',
                  border: '1px solid #86efac'
                }}>
                  <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#059669', marginBottom: '10px' }}>
                    {collection.actualWeight}kg
                  </div>
                  <div style={{ color: '#047857', fontWeight: '600' }}>Waste Diverted</div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
                  borderRadius: '20px',
                  padding: '30px',
                  textAlign: 'center',
                  border: '1px solid #93c5fd'
                }}>
                  <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1d4ed8', marginBottom: '10px' }}>
                    {collection.creditsMinted}
                  </div>
                  <div style={{ color: '#1e40af', fontWeight: '600' }}>ECO Credits</div>
                </div>

                <div style={{
                  background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                  borderRadius: '20px',
                  padding: '25px',
                  border: '1px solid #cbd5e1'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '16px', color: '#475569' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>🌱</span>
                      <span>Reduced emissions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>♻️</span>
                      <span>Resources saved</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>🔄</span>
                      <span>Circular economy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}