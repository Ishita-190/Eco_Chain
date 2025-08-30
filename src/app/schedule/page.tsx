// app/schedule/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { getLocalStorage } from '@/lib/storage';
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

  useEffect(() => {
    if (!facilityId || !classificationId) {
      router.push('/');
    }
  }, [facilityId, classificationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    try {
      const scheduledAt = new Date(`${selectedDate}T${selectedTime}`).toISOString();
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getLocalStorage('ecocommerce_token')}`
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
    } catch (error) {
      console.error('Scheduling error:', error);
      alert('Failed to schedule pickup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Schedule Pickup</h1>
            </div>
            <WalletBadge />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="card p-8">
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
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    pickupType === 'PICKUP'
                      ? 'border-eco-500 bg-eco-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Truck className="w-6 h-6 mx-auto mb-2 text-eco-600" />
                  <div className="font-medium text-gray-800">Pickup</div>
                  <div className="text-sm text-gray-500">We collect from you</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPickupType('DROP_OFF')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    pickupType === 'DROP_OFF'
                      ? 'border-eco-500 bg-eco-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-eco-600" />
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
                  className="w-full input-field"
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
                  className="w-full input-field"
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
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
                className="w-full input-field"
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
                className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
