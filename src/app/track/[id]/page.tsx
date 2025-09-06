'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Package, MapPin, Calendar, Truck, CheckCircle, Clock, Sparkles, ArrowRight } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 border-8 border-blue-100 rounded-full animate-spin border-t-blue-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Truck className="w-12 h-12 text-blue-500 animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-32 h-32 text-gray-300 mx-auto mb-8" />
          <h2 className="text-4xl font-bold text-gray-700 mb-4">Collection Not Found</h2>
          <button 
            onClick={() => router.push('/')} 
            className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Floating Header */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                {collection.pickupType === 'PICKUP' ? 
                  <Truck className="w-5 h-5 text-white" /> : 
                  <MapPin className="w-5 h-5 text-white" />
                }
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{collectionType} Tracking</h1>
                <p className="text-sm text-gray-500">#{collectionId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Flow Map Status */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Collection Progress</h2>
            
            {/* Flow Map */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                {statusOrder.map((status, index) => {
                  const Icon = getStatusIcon(status);
                  const isCompleted = index < currentIndex;
                  const isCurrent = index === currentIndex;
                  const isActive = isCompleted || isCurrent;

                  return (
                    <div key={status} className="flex flex-col items-center relative z-10">
                      {/* Status Node */}
                      <div className={`relative transition-all duration-700 ${isCurrent ? 'animate-pulse' : ''}`}>
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isCurrent 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl scale-110 ring-4 ring-blue-200' 
                            : isCompleted 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl'
                            : 'bg-gray-200 text-gray-400 shadow-md'
                        }`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        
                        {/* Pulse Animation for Current */}
                        {isCurrent && (
                          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                        )}
                        
                        {/* Checkmark for Completed */}
                        {isCompleted && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Status Label */}
                      <div className="mt-4 text-center">
                        <div className={`font-bold text-sm ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                          {getStatusLabel(status)}
                        </div>
                        {isCurrent && (
                          <div className="text-xs text-blue-600 font-medium mt-1 animate-pulse">
                            In Progress
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Connecting Lines */}
              <div className="absolute top-10 left-10 right-10 h-1 bg-gray-200 rounded-full -z-10">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(currentIndex / (statusOrder.length - 1)) * 100}%` }}
                ></div>
              </div>
              
              {/* Flow Arrows */}
              {statusOrder.slice(0, -1).map((_, index) => (
                <div 
                  key={index}
                  className={`absolute top-8 transition-all duration-500 ${
                    index < currentIndex ? 'text-green-500' : 'text-gray-300'
                  }`}
                  style={{ left: `${20 + (index * 20)}%` }}
                >
                  <ArrowRight className="w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Collection Info */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center space-x-3">
                    <Package className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Waste Type</div>
                      <div className="font-bold text-gray-800 capitalize">{collection.wasteType}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-600">Type</div>
                      <div className="font-bold text-gray-800">{collectionType}</div>
                    </div>
                  </div>
                </div>
                
                {collection.estimatedWeight && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-sm">kg</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Weight</div>
                        <div className="font-bold text-gray-800">{collection.estimatedWeight}kg</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Facility Info */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Facility Details</span>
              </h3>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-100">
                <div className="font-semibold text-gray-800 mb-2">{collection.facility.name}</div>
                <div className="text-gray-600 mb-3">{collection.facility.address}</div>
                {collection.facility.phone && (
                  <div className="text-gray-600 mb-3">📞 {collection.facility.phone}</div>
                )}
                {collection.scheduledAt && (
                  <div className="flex items-center space-x-2 text-gray-700 bg-white rounded-lg p-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      {new Date(collection.scheduledAt).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Activity Timeline</span>
              </h3>
              
              <div className="space-y-4">
                {timeline.map((event, index) => {
                  const eventIndex = statusOrder.indexOf(event.type);
                  const isCompleted = eventIndex < currentIndex;
                  const isCurrent = eventIndex === currentIndex;
                  const Icon = getStatusIcon(event.type);
                  
                  return (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCurrent 
                          ? 'bg-blue-500 text-white animate-pulse' 
                          : isCompleted 
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-semibold ${
                            isCurrent ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-600'
                          }`}>
                            {event.title}
                          </h4>
                          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                            {new Date(event.createdAt).toLocaleString()}
                          </span>
                        </div>
                        
                        {event.message && (
                          <p className="text-gray-600 text-sm">{event.message}</p>
                        )}
                        
                        {isCurrent && (
                          <div className="mt-2 text-xs text-blue-600 font-medium flex items-center space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span>Active</span>
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
          <div className="space-y-6">
            {collection.status === 'COMPLETED' && collection.actualWeight && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-green-600" />
                  <span>Impact</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 text-center border border-green-200">
                    <div className="text-3xl font-bold text-green-700">{collection.actualWeight}kg</div>
                    <div className="text-green-600 text-sm font-medium">Waste Diverted</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4 text-center border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700">{collection.creditsMinted}</div>
                    <div className="text-blue-600 text-sm font-medium">ECO Credits</div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl p-4 border border-gray-200">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span>🌱</span><span>Reduced emissions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>♻️</span><span>Resources saved</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>🔄</span><span>Circular economy</span>
                      </div>
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