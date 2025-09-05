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
    if (!classificationId) {
      router.push('/');
      return;
    }

    fetchData();
  }, [classificationId]);

  const fetchData = async () => {
    try {
      // In a real implementation, fetch classification and facilities data
      // For demo purposes, using mock data
      setClassification({
        id: classificationId!,
        label: 'plastic',
        confidence: 0.85,
        imageUrl: '/placeholder-waste.jpg'
      });

      setFacilities([
        {
          id: '1',
          name: 'GreenCycle Recycling Center',
          address: '123 Eco Street, Delhi, DL 110001',
          lat: 28.6139,
          lng: 77.2090,
          phone: '+91 11 1234 5678',
          typesAccepted: ['plastic', 'metal', 'paper'],
          operatingHours: {
            weekdays: '8:00 AM - 6:00 PM',
            weekends: '9:00 AM - 4:00 PM'
          },
          verifiedAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'EcoWaste Solutions',
          address: '456 Green Avenue, Delhi, DL 110002',
          lat: 28.6239,
          lng: 77.2190,
          phone: '+91 11 8765 4321',
          typesAccepted: ['plastic', 'glass', 'organic'],
          operatingHours: {
            weekdays: '9:00 AM - 5:00 PM',
            weekends: '10:00 AM - 3:00 PM'
          },
          verifiedAt: '2024-01-20'
        },
        {
          id: '3',
          name: 'Delhi Waste Management',
          address: '789 Clean Road, Delhi, DL 110003',
          lat: 28.6339,
          lng: 77.2290,
          typesAccepted: ['plastic', 'metal', 'paper', 'glass'],
          operatingHours: {
            weekdays: '7:00 AM - 7:00 PM',
            weekends: '8:00 AM - 5:00 PM'
          }
        }
      ]);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 px-3 py-2 rounded-full hover:bg-green-50"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Available Facilities</h1>
            </div>
            <WalletBadge />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Classification Summary */}
        {classification && (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-green-100 p-8 mb-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 capitalize mb-2">
                  {classification.label} Waste Classification
                </h2>
                <p className="text-gray-600">
                  Confidence: <span className="font-semibold text-green-600">
                    {Math.round(classification.confidence * 100)}%
                  </span>
                </p>
              </div>
              {classification.imageUrl && (
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={classification.imageUrl}
                    alt="Waste classification"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Facilities List */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Nearby Facilities ({facilities.length})
              </h3>
            </div>

            <div className="space-y-4">
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
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Schedule Pickup</h4>
                
                {selectedFacility ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                      <h5 className="font-medium text-green-800 mb-2">Selected Facility</h5>
                      <p className="text-sm text-green-700">{selectedFacility.name}</p>
                      <p className="text-xs text-green-600 mt-1">{selectedFacility.address}</p>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Waste Type:</span>
                        <span className="font-medium capitalize">{classification?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance:</span>
                        <span className="font-medium">
                          {calculateDistance(selectedFacility.lat, selectedFacility.lng).toFixed(1)} km
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-medium">{selectedFacility.phone || 'N/A'}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSchedule}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-4 px-6 rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      Schedule Pickup
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Select a facility to continue</p>
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
