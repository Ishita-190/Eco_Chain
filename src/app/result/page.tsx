// app/result/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FacilityCard } from '@/src/components/FacilityCard';
import { WalletBadge } from '@/src/components/WalletBadge';
import { ArrowLeft, MapPin } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  typesAccepted: string[];
  operatingHours?: any;
  verifiedAt?: string;
}

interface Classification {
  id: string;
  label: string;
  confidence: number;
  imageUrl?: string;
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const classificationId = searchParams.get('classificationId');
  
  const [classification, setClassification] = useState<Classification | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) {
      router.push('/');
      return;
    }

    fetchData();
  }, [searchParams]);

  const fetchData = async () => {
    try {
      // Get classification result from sessionStorage
      const storedResult = sessionStorage.getItem('classificationResult');
      if (storedResult) {
        const result = JSON.parse(storedResult);
        setClassification(result.classification);
        setFacilities(result.facilities.map((f: any, index: number) => ({
          id: f.id.toString(),
          name: f.name,
          address: f.address,
          lat: 28.6139 + (index * 0.01),
          lng: 77.2090 + (index * 0.01),
          phone: `+91 11 ${1000 + index}${2000 + index}`,
          typesAccepted: ['plastic', 'metal', 'paper'],
          operatingHours: {
            weekdays: '8:00 AM - 6:00 PM',
            weekends: '9:00 AM - 4:00 PM'
          },
          verifiedAt: '2024-01-15'
        })));
      } else {
        // Fallback to mock data
        setClassification({
          id: Date.now().toString(),
          label: 'plastic',
          confidence: 0.85
        });
        setFacilities([
          {
            id: '1',
            name: 'GreenCycle Center',
            address: '123 Eco Street',
            lat: 28.6139,
            lng: 77.2090,
            phone: '+91 11 1234 5678',
            typesAccepted: ['plastic'],
            operatingHours: { weekdays: '8:00 AM - 6:00 PM', weekends: '9:00 AM - 4:00 PM' }
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (lat: number, lng: number) => {
    // Simple distance calculation (in a real app, use proper geolocation)
    const userLat = 28.6139; // Delhi coordinates
    const userLng = 77.2090;
    
    const R = 6371; // Earth's radius in km
    const dLat = (lat - userLat) * Math.PI / 180;
    const dLng = (lng - userLng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleSchedule = () => {
    if (selectedFacility && classification) {
      router.push(`/schedule?facilityId=${selectedFacility.id}&classificationId=${classification.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading facilities...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(16, 185, 129, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button
                onClick={() => router.back()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#6b7280',
                  background: 'none',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0fdf4';
                  e.currentTarget.style.color = '#059669';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                <ArrowLeft style={{ width: '20px', height: '20px' }} />
                <span>Back</span>
              </button>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Available Facilities</h1>
            </div>
            <WalletBadge />
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Classification Summary */}
        {classification && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.1)',
            padding: '32px',
            marginBottom: '32px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '8px',
                  margin: 0
                }}>
                  Type: <span style={{ textTransform: 'capitalize' }}>{classification.label}</span>
                </h2>
                <p style={{
                  fontSize: '18px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Confidence: <span style={{ fontWeight: '600', color: '#059669' }}>
                    {Math.round(classification.confidence * 100)}%
                  </span>
                </p>
              </div>
              {classification.imageUrl && (
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#f3f4f6',
                  border: '2px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <img
                    src={classification.imageUrl}
                    alt="Waste classification"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* Facilities List */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <MapPin style={{ width: '24px', height: '24px', color: '#059669' }} />
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>
                Nearby Facilities ({facilities.length})
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {facilities.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  distance={calculateDistance(facility.lat, facility.lng)}
                  onSelect={setSelectedFacility}
                  isSelected={selectedFacility?.id === facility.id}
                />
              ))}
            </div>
          </div>

          {/* Selection Summary & Action */}
          <div>
            <div style={{ position: 'sticky', top: '120px' }}>
              <div style={{
                background: selectedFacility 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                boxShadow: selectedFacility 
                  ? '0 25px 50px -12px rgba(16, 185, 129, 0.15)'
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                border: selectedFacility 
                  ? '2px solid rgba(16, 185, 129, 0.2)'
                  : '1px solid rgba(229, 231, 235, 0.8)',
                padding: '32px',
                transition: 'all 0.3s ease'
              }}>
                <h4 style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '24px',
                  margin: 0
                }}>Schedule Pickup</h4>
                
                {selectedFacility ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                      borderRadius: '20px',
                      border: '1px solid rgba(16, 185, 129, 0.3)'
                    }}>
                      <h5 style={{ fontWeight: '600', color: '#065f46', marginBottom: '8px', fontSize: '16px', margin: 0 }}>Selected Facility</h5>
                      <p style={{ fontSize: '16px', color: '#047857', fontWeight: '500', margin: 0 }}>{selectedFacility.name}</p>
                      <p style={{ fontSize: '14px', color: '#059669', marginTop: '4px', margin: 0 }}>{selectedFacility.address}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '16px', color: '#4b5563' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Waste Type:</span>
                        <span style={{ fontWeight: '600', textTransform: 'capitalize', color: '#1f2937' }}>{classification?.label}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Distance:</span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>
                          {calculateDistance(selectedFacility.lat, selectedFacility.lng).toFixed(1)} km
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Phone:</span>
                        <span style={{ fontWeight: '600', color: '#1f2937' }}>{selectedFacility.phone || 'N/A'}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSchedule}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '18px',
                        padding: '20px 24px',
                        borderRadius: '20px',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(16, 185, 129, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(16, 185, 129, 0.4)';
                      }}
                    >
                      🚛 Schedule Pickup Now
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <MapPin style={{ width: '48px', height: '48px', color: '#d1d5db', margin: '0 auto 16px' }} />
                    <p style={{ fontSize: '18px', color: '#6b7280', margin: 0 }}>Select a facility to continue</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
