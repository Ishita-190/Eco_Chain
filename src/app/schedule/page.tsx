'use client';

import { useState, useEffect } from 'react';
import { getLocalStorage } from '@/src/lib/storage';
import { useSearchParams, useRouter } from 'next/navigation';
import { WalletBadge } from '@/src/components/WalletBadge';
import { ArrowLeft, Calendar, Clock, Truck, MapPin } from 'lucide-react';

export default function SchedulePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const facilityId = searchParams.get('facilityId');
  const classificationId = searchParams.get('classificationId');

  const [pickupType, setPickupType] = useState<'PICKUP' | 'DROP_OFF'>('PICKUP');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [estimatedWeight, setEstimatedWeight] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if required params missing
  useEffect(() => {
    if (!facilityId || !classificationId) {
      router.replace('/');
    }
  }, [facilityId, classificationId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      const scheduledAt = new Date(`${selectedDate}T${selectedTime}`).toISOString();
      const token = getLocalStorage('ecocommerce_token');

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          facilityId,
          classificationId,
          pickupType,
          scheduledAt,
          estimatedWeight: estimatedWeight ? parseFloat(estimatedWeight) : undefined,
        }),
      });

      if (!response.ok) throw new Error('Failed to create order');
      const { orderId } = await response.json();
      router.push(`/track/${orderId}`);
    } catch (err) {
      console.error(err);
      alert('Failed to schedule pickup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <header className="bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors duration-200 px-3 py-2 rounded-full hover:bg-green-50">
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Schedule Pickup</h1>
          </div>
          <WalletBadge />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 p-8 hover:shadow-2xl transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pickup Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Pickup Method
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPickupType('PICKUP')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                    pickupType === 'PICKUP'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50/30'
                  }`}
                >
                  <Truck className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-medium text-gray-800">Pickup</div>
                  <div className="text-sm text-gray-500">We collect from you</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPickupType('DROP_OFF')}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-1 ${
                    pickupType === 'DROP_OFF'
                      ? 'border-green-500 bg-green-50 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50/30'
                  }`}
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-medium text-gray-800">Drop-off</div>
                  <div className="text-sm text-gray-500">You bring to us</div>
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  required
                >
                  <option value="">Select time</option>
                  {Array.from({ length: 9 }, (_, i) => (
                    <option key={i} value={`${9 + i}:00`}>
                      {9 + i}:00 {9 + i < 12 ? 'AM' : 'PM'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimated Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Weight (kg)
              </label>
              <input
                type="number"
                value={estimatedWeight}
                onChange={(e) => setEstimatedWeight(e.target.value)}
                placeholder="e.g., 2.5"
                step="0.1"
                min="0.1"
                className="w-full px-4 py-3 border border-green-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: helps us prepare for collection
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !selectedDate || !selectedTime}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-4 px-6 rounded-full shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating Order...</span>
                  </div>
                ) : (
                  `Schedule ${pickupType === 'PICKUP' ? 'Pickup' : 'Drop-off'}`
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
