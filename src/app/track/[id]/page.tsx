'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WalletBadge } from '@/src/components/WalletBadge';
import { Timeline } from '@/src/components/ui/Timeline';
import { QRCodeDisplay } from '@/src/components/ui/QRCodeDisplay';
import { CelebrationBanner } from '@/src/components/ui/CelebrationBanner';
import { ArrowLeft, Package, MapPin, Calendar } from 'lucide-react';

interface Order {
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

export default function TrackOrderPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.replace('/');
      return;
    }

    const fetchOrderData = async () => {
      setLoading(true);
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('ecocommerce_token') : '';
        const res = await fetch(`/api/orders/${orderId}/timeline`, {
          headers: { Authorization: `Bearer ${token || ''}` },
        });

        if (!res.ok) throw new Error('Failed to fetch order');

        const data = await res.json();
        setOrder(data.order);
        setTimeline(data.timeline || []);

        if (data.order?.status === 'COMPLETED') {
          setShowCelebration(true);
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
    const interval = setInterval(fetchOrderData, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <button onClick={() => router.push('/')} className="btn-primary">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Order #{orderId.slice(0, 8)}...</h1>
          </div>
          <WalletBadge />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Order Status</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Order Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Waste Type:</span>
                      <span className="font-medium capitalize">{order.wasteType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pickup Type:</span>
                      <span className="font-medium">{order.pickupType}</span>
                    </div>
                    {order.estimatedWeight && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Est. Weight:</span>
                        <span className="font-medium">{order.estimatedWeight}kg</span>
                      </div>
                    )}
                    {order.actualWeight && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Actual Weight:</span>
                        <span className="font-medium text-eco-600">{order.actualWeight}kg</span>
                      </div>
                    )}
                    {order.creditsMinted && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credits Earned:</span>
                        <span className="font-bold text-eco-600">{order.creditsMinted} ECO</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Facility Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{order.facility.name}</div>
                        <div className="text-gray-600">{order.facility.address}</div>
                      </div>
                    </div>
                    {order.facility.phone && (
                      <div className="flex items-center space-x-2">
                        <span className="w-4 h-4"></span>
                        <span className="text-gray-600">{order.facility.phone}</span>
                      </div>
                    )}
                    {order.scheduledAt && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {new Date(order.scheduledAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <Timeline events={timeline} currentStatus={order.status} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {order.qrCode && order.status !== 'COMPLETED' && (
              <QRCodeDisplay qrCodeURI={order.qrCode} otpHint={order.otpHint || ''} orderId={order.id} />
            )}

            {order.status === 'COMPLETED' && order.actualWeight && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Impact</h3>
                <div className="space-y-4">
                  <div className="bg-eco-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-eco-600 mb-1">{order.actualWeight}kg</div>
                    <div className="text-sm text-eco-700">Waste Diverted from Landfill</div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{order.creditsMinted}</div>
                    <div className="text-sm text-blue-700">ECO Credits Earned</div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Reduced methane emissions from landfills</p>
                    <p>• Conserved natural resources through recycling</p>
                    <p>• Supported circular economy practices</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showCelebration && order.creditsMinted && order.actualWeight && (
        <CelebrationBanner
          creditsEarned={order.creditsMinted}
          wasteWeight={order.actualWeight}
          userRank={150}
          totalUsers={1000}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
}
