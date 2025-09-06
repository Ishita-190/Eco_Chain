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
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Truck className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Collection</h3>
              <p className="text-gray-600">Fetching your tracking details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/20 text-center">
          <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Collection Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">The collection you're looking for doesn't exist.</p>
          <button 
            onClick={() => router.push('/')} 
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
      case 'CREATED': return <Package className="w-6 h-6" />;
      case 'SCHEDULED': return <Calendar className="w-6 h-6" />;
      case 'PICKED_UP': return <Truck className="w-6 h-6" />;
      case 'VERIFIED': return <CheckCircle className="w-6 h-6" />;
      case 'COMPLETED': return <Sparkles className="w-6 h-6" />;
      default: return <Clock className="w-6 h-6" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'from-green-500 to-emerald-600';
      case 'VERIFIED': return 'from-blue-500 to-cyan-600';
      case 'PICKED_UP': return 'from-yellow-500 to-orange-600';
      case 'SCHEDULED': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-emerald-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all duration-300 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  {collection.pickupType === 'PICKUP' ? 
                    <Truck className="w-8 h-8 text-white" /> : 
                    <MapPin className="w-8 h-8 text-white" />
                  }
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {collectionType} Tracking
                  </h1>
                  <p className="text-lg text-gray-600 font-medium">ID: {collectionId}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Status Progress Bar */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${getStatusColor(collection.status)} rounded-xl flex items-center justify-center text-white`}>
                {getStatusIcon(collection.status)}
              </div>
              <span>{collectionType} Status</span>
            </h2>
            <div className={`px-6 py-3 bg-gradient-to-r ${getStatusColor(collection.status)} text-white rounded-2xl font-bold text-lg shadow-lg`}>
              {collection.status.replace('_', ' ')}
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {statusOrder.map((status, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isActive = isCompleted || isCurrent;

              return (
                <div key={status} className="flex flex-col items-center flex-1">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? `bg-gradient-to-br ${getStatusColor(status)} text-white shadow-lg transform scale-110` 
                      : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'animate-pulse' : ''}`}>
                    {getStatusIcon(status)}
                  </div>
                  <div className="mt-3 text-center">
                    <div className={`font-semibold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                      {status.replace('_', ' ')}
                    </div>
                  </div>
                  {index < statusOrder.length - 1 && (
                    <div className="absolute top-8 left-1/2 w-full h-1 bg-gray-200 -z-10">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-1000 ${
                          isCompleted ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Collection Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <Package className="w-7 h-7 text-emerald-600" />
                <span>Collection Details</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">Waste Type</span>
                      <span className="font-bold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl capitalize">
                        {collection.wasteType}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600 font-medium">Collection Type</span>
                      <span className="font-bold text-blue-700">{collectionType}</span>
                    </div>
                  </div>

                  {collection.estimatedWeight && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 font-medium">Est. Weight</span>
                        <span className="font-bold text-purple-700">{collection.estimatedWeight}kg</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>Facility Information</span>
                    </h4>
                    <div className="space-y-3">
                      <div className="font-semibold text-gray-800">{collection.facility.name}</div>
                      <div className="text-gray-600">{collection.facility.address}</div>
                      {collection.facility.phone && (
                        <div className="text-gray-600 flex items-center space-x-2">
                          <span>📞</span>
                          <span>{collection.facility.phone}</span>
                        </div>
                      )}
                      {collection.scheduledAt && (
                        <div className="flex items-center space-x-2 text-gray-700 bg-white rounded-lg p-3">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">
                            {new Date(collection.scheduledAt).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
                <Clock className="w-7 h-7 text-emerald-600" />
                <span>Collection Timeline</span>
              </h3>
              
              <div className="space-y-6">
                {timeline.map((event, index) => {
                  const eventIndex = statusOrder.indexOf(event.type);
                  const isCompleted = eventIndex < currentIndex;
                  const isCurrent = eventIndex === currentIndex;
                  
                  return (
                    <div key={event.id} className="flex items-start space-x-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isCurrent 
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg animate-pulse' 
                          : isCompleted 
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {getStatusIcon(event.type)}
                      </div>
                      
                      <div className="flex-1 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className={`text-xl font-bold ${
                            isCurrent ? 'text-blue-700' : isCompleted ? 'text-emerald-700' : 'text-gray-600'
                          }`}>
                            {event.title}
                          </h4>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-lg">
                              {new Date(event.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(event.createdAt).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        
                        {event.message && (
                          <p className="text-gray-700 text-lg leading-relaxed">{event.message}</p>
                        )}
                        
                        {isCurrent && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                            <p className="text-blue-700 font-medium flex items-center space-x-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                              <span>Currently in progress...</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {collection.status === 'COMPLETED' && collection.actualWeight && (
              <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                  <Sparkles className="w-7 h-7 text-emerald-600" />
                  <span>Environmental Impact</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-6 border border-emerald-200">
                    <div className="text-4xl font-bold text-emerald-700 mb-2">{collection.actualWeight}kg</div>
                    <div className="text-emerald-600 font-semibold">Waste Diverted from Landfill</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl p-6 border border-blue-200">
                    <div className="text-4xl font-bold text-blue-700 mb-2">{collection.creditsMinted}</div>
                    <div className="text-blue-600 font-semibold">ECO Credits Earned</div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl p-6 border border-gray-200">
                    <div className="space-y-3 text-gray-700 font-medium">
                      <p className="flex items-center space-x-3">
                        <span className="text-2xl">🌱</span>
                        <span>Reduced methane emissions</span>
                      </p>
                      <p className="flex items-center space-x-3">
                        <span className="text-2xl">♻️</span>
                        <span>Conserved natural resources</span>
                      </p>
                      <p className="flex items-center space-x-3">
                        <span className="text-2xl">🔄</span>
                        <span>Supported circular economy</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}