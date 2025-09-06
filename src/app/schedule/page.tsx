'use client';

import { useState, useEffect } from 'react';
import { getLocalStorage } from '@/src/lib/storage';
import { useSearchParams, useRouter } from 'next/navigation';
import { WalletBadge } from '@/src/components/WalletBadge';
import { ArrowLeft, Calendar, Clock, Truck, MapPin, Package, Sparkles } from 'lucide-react';

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
      // Get or create auth token
      let token = getLocalStorage('ecocommerce_token');
      if (!token) {
        const authResponse = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: '0x1234567890abcdef' })
        });
        const authData = await authResponse.json();
        token = authData.token;
        localStorage.setItem('ecocommerce_token', token);
      }

      const scheduledAt = new Date(`${selectedDate}T${selectedTime}`).toISOString();

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      
      const { orderId } = await response.json();
      alert(`Pickup scheduled successfully! Order ID: ${orderId}`);
      router.push('/');
    } catch (err) {
      console.error('Schedule error:', err);
      alert('Failed to schedule pickup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)'
    }}>
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(5, 150, 105, 0.1)',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #059669, #047857)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Calendar style={{ width: '24px', height: '24px', color: 'white' }} />
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937', margin: 0 }}>Schedule Your Pickup</h1>
              </div>
            </div>
            <WalletBadge />
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(5, 150, 105, 0.1)',
          padding: '48px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.05))',
              borderRadius: '24px',
              marginBottom: '24px',
              border: '2px solid rgba(5, 150, 105, 0.2)'
            }}>
              <Sparkles style={{ width: '36px', height: '36px', color: '#059669' }} />
            </div>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '12px',
              margin: 0
            }}>
              Complete Your Eco Journey
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0
            }}>
              Choose your preferred collection method and schedule a convenient time for waste pickup.
            </p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Pickup Type */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '16px'
              }}>
                Collection Method
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <button
                  type="button"
                  onClick={() => setPickupType('PICKUP')}
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    border: pickupType === 'PICKUP' ? '3px solid #059669' : '2px solid #e5e7eb',
                    background: pickupType === 'PICKUP' 
                      ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.05))'
                      : 'rgba(249, 250, 251, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textAlign: 'center',
                    boxShadow: pickupType === 'PICKUP' ? '0 8px 25px rgba(5, 150, 105, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    if (pickupType !== 'PICKUP') {
                      e.currentTarget.style.borderColor = '#059669';
                      e.currentTarget.style.background = 'rgba(5, 150, 105, 0.02)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pickupType !== 'PICKUP') {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.background = 'rgba(249, 250, 251, 0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <Truck style={{ width: '32px', height: '32px', margin: '0 auto 12px', color: '#059669' }} />
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>Home Pickup</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>We collect from your location</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPickupType('DROP_OFF')}
                  style={{
                    padding: '24px',
                    borderRadius: '20px',
                    border: pickupType === 'DROP_OFF' ? '3px solid #059669' : '2px solid #e5e7eb',
                    background: pickupType === 'DROP_OFF' 
                      ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.05))'
                      : 'rgba(249, 250, 251, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    textAlign: 'center',
                    boxShadow: pickupType === 'DROP_OFF' ? '0 8px 25px rgba(5, 150, 105, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    if (pickupType !== 'DROP_OFF') {
                      e.currentTarget.style.borderColor = '#059669';
                      e.currentTarget.style.background = 'rgba(5, 150, 105, 0.02)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pickupType !== 'DROP_OFF') {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.background = 'rgba(249, 250, 251, 0.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <MapPin style={{ width: '32px', height: '32px', margin: '0 auto 12px', color: '#059669' }} />
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>Drop-off</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>You bring to our facility</div>
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px'
                }}>
                  <Calendar style={{ width: '20px', height: '20px', color: '#059669' }} />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#059669';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px'
                }}>
                  <Clock style={{ width: '20px', height: '20px', color: '#059669' }} />
                  Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '16px',
                    fontSize: '16px',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#059669';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  required
                >
                  <option value="">Choose your time</option>
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
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '12px'
              }}>
                <Package style={{ width: '20px', height: '20px', color: '#059669' }} />
                Estimated Weight (kg)
              </label>
              <input
                type="number"
                value={estimatedWeight}
                onChange={(e) => setEstimatedWeight(e.target.value)}
                placeholder="e.g., 2.5 kg"
                step="0.1"
                min="0.1"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#059669';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginTop: '8px',
                margin: 0
              }}>
                💡 Optional: Helps us prepare the right collection vehicle
              </p>
            </div>

            {/* Submit Button */}
            <div style={{ paddingTop: '16px' }}>
              <button
                type="submit"
                disabled={isSubmitting || !selectedDate || !selectedTime}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '20px 32px',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'white',
                  background: isSubmitting || !selectedDate || !selectedTime
                    ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                    : 'linear-gradient(135deg, #059669, #047857)',
                  cursor: isSubmitting || !selectedDate || !selectedTime ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSubmitting || !selectedDate || !selectedTime
                    ? '0 8px 25px rgba(156, 163, 175, 0.3)'
                    : '0 8px 25px rgba(5, 150, 105, 0.3)',
                  opacity: isSubmitting || !selectedDate || !selectedTime ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && selectedDate && selectedTime) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(5, 150, 105, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && selectedDate && selectedTime) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.3)';
                  }
                }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '3px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    <span>Creating Your Order...</span>
                  </>
                ) : (
                  <>
                    <Sparkles style={{ width: '24px', height: '24px' }} />
                    <span>Confirm {pickupType === 'PICKUP' ? 'Pickup' : 'Drop-off'} Schedule</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
