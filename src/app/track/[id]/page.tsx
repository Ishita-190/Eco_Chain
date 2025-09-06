'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Timeline } from '@/src/components/ui/Timeline';
import { QRCodeDisplay } from '@/src/components/ui/QRCodeDisplay';
import { CelebrationBanner } from '@/src/components/ui/CelebrationBanner';
import { ArrowLeft, Package, MapPin, Calendar, Truck, CheckCircle } from 'lucide-react';

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
  const [showCelebration, setShowCelebration] = useState(false);

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

        if (data.order?.status === 'COMPLETED') {
          setShowCelebration(true);
        }
      } catch (error) {
        console.error('Failed to fetch collection:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionData();
    const interval = setInterval(fetchCollectionData, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [collectionId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading collection details...</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-50 to-blue-50">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Collection Not Found</h2>
          <p className="text-gray-600 mb-4">The collection you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-eco-600 text-white rounded-lg hover:bg-eco-700 transition-colors">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-100';
      case 'VERIFIED':
        return 'text-blue-600 bg-blue-100';
      case 'PICKED_UP':
        return 'text-yellow-600 bg-yellow-100';
      case 'SCHEDULED':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CREATED':
        return 'Created';
      case 'SCHEDULED':
        return 'Scheduled';
      case 'PICKED_UP':
        return 'Collected';
      case 'VERIFIED':
        return 'Verified';
      case 'COMPLETED':
        return 'Completed';
      default:
        return status;
    }
  };

  const collectionType = collection.pickupType === 'PICKUP' ? 'Pickup' : 'Drop-off';

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-eco-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-eco-600 hover:bg-eco-50 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-eco-500 to-eco-600 rounded-xl flex items-center justify-center">
                  {collection.pickupType === 'PICKUP' ? 
                    <Truck className="w-6 h-6 text-white" /> : 
                    <MapPin className="w-6 h-6 text-white" />
                  }
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{collectionType} Tracking</h1>
                  <p className="text-sm text-gray-600">ID: {collectionId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Collection Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                  <CheckCircle className="w-7 h-7 text-eco-600" />
                  <span>{collectionType} Status</span>
                </h2>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                    collection.status
                  )}`}
                >
                  {getStatusText(collection.status)}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <Package className="w-5 h-5 text-eco-600" />
                    <span>Collection Details</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Waste Type:</span>
                      <span className="font-semibold capitalize bg-eco-100 text-eco-800 px-3 py-1 rounded-lg">{collection.wasteType}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Collection Type:</span>
                      <span className="font-semibold">{collectionType}</span>
                    </div>
                    {collection.estimatedWeight && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Est. Weight:</span>
                        <span className="font-semibold">{collection.estimatedWeight}kg</span>
                      </div>
                    )}
                    {collection.actualWeight && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Actual Weight:</span>
                        <span className="font-semibold text-eco-600 bg-eco-50 px-3 py-1 rounded-lg">{collection.actualWeight}kg</span>
                      </div>
                    )}
                    {collection.creditsMinted && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Credits Earned:</span>
                        <span className="font-bold text-eco-600 bg-eco-50 px-3 py-1 rounded-lg">{collection.creditsMinted} ECO</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>Facility Information</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="font-semibold text-gray-800">{collection.facility.name}</div>
                      <div className="text-gray-600 text-sm mt-1">{collection.facility.address}</div>
                    </div>
                    {collection.facility.phone && (
                      <div className="bg-white rounded-lg p-3">
                        <span className="text-gray-600 text-sm">📞 {collection.facility.phone}</span>
                      </div>
                    )}
                    {collection.scheduledAt && (
                      <div className="bg-white rounded-lg p-3 flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700 text-sm font-medium">
                          {new Date(collection.scheduledAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <Timeline events={timeline} currentStatus={collection.status} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {collection.qrCode && collection.status !== 'COMPLETED' && (
              <QRCodeDisplay qrCodeURI={collection.qrCode} otpHint={collection.otpHint || ''} orderId={collection.id} />
            )}

            {collection.status === 'COMPLETED' && collection.actualWeight && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-eco-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span>Environmental Impact</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-eco-50 to-eco-100 rounded-xl p-5">
                    <div className="text-3xl font-bold text-eco-600 mb-2">{collection.actualWeight}kg</div>
                    <div className="text-sm font-medium text-eco-700">Waste Diverted from Landfill</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{collection.creditsMinted}</div>
                    <div className="text-sm font-medium text-blue-700">ECO Credits Earned</div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                    <div className="text-xs text-gray-600 space-y-2 font-medium">
                      <p className="flex items-center space-x-2"><span>🌱</span><span>Reduced methane emissions</span></p>
                      <p className="flex items-center space-x-2"><span>♻️</span><span>Conserved natural resources</span></p>
                      <p className="flex items-center space-x-2"><span>🔄</span><span>Supported circular economy</span></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showCelebration && collection.creditsMinted && collection.actualWeight && (
        <CelebrationBanner
          creditsEarned={collection.creditsMinted}
          wasteWeight={collection.actualWeight}
          userRank={150}
          totalUsers={1000}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
}
