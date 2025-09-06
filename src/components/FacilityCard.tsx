// components/FacilityCard.tsx


import { MapPin, Clock, Phone, CheckCircle } from 'lucide-react';

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

interface FacilityCardProps {
  facility: Facility;
  distance?: number;
  onSelect: (facility: Facility) => void;
  isSelected?: boolean;
}

export function FacilityCard({ 
  facility, 
  distance, 
  onSelect, 
  isSelected 
}: FacilityCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        background: isSelected 
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))' 
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '24px',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: isSelected 
          ? '2px solid #10b981' 
          : '1px solid rgba(229, 231, 235, 0.8)',
        boxShadow: isSelected 
          ? '0 20px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transform: isSelected ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        overflow: 'hidden'
      }}
      onClick={() => onSelect(facility)}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        }
      }}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #10b981, #059669)',
            animation: 'slideIn 0.3s ease-out'
          }}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: isSelected ? '#065f46' : '#1f2937',
            marginBottom: '4px',
            transition: 'color 0.3s ease'
          }}>
            {facility.name}
          </h3>
          {facility.verifiedAt && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle style={{ width: '16px', height: '16px', color: '#059669' }} />
              <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>Verified Facility</span>
            </div>
          )}
        </div>
        {distance && (
          <div style={{
            backgroundColor: isSelected ? '#10b981' : '#f3f4f6',
            color: isSelected ? 'white' : '#059669',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}>
            {distance.toFixed(1)} km
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <MapPin style={{ width: '16px', height: '16px', color: '#6b7280', marginTop: '2px', flexShrink: 0 }} />
          <span style={{ fontSize: '14px', color: '#4b5563' }}>{facility.address}</span>
        </div>

        {facility.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone style={{ width: '16px', height: '16px', color: '#6b7280' }} />
            <span style={{ fontSize: '14px', color: '#4b5563' }}>{facility.phone}</span>
          </div>
        )}

        {facility.operatingHours && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <Clock style={{ width: '16px', height: '16px', color: '#6b7280', marginTop: '2px' }} />
            <div style={{ fontSize: '14px', color: '#4b5563' }}>
              <div>Mon-Fri: {facility.operatingHours.weekdays || '9:00 AM - 5:00 PM'}</div>
              <div>Weekends: {facility.operatingHours.weekends || '9:00 AM - 3:00 PM'}</div>
            </div>
          </div>
        )}

        <div style={{ paddingTop: '8px' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Accepts:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {facility.typesAccepted.map((type, index) => (
              <span
                key={index}
                style={{
                  padding: '4px 8px',
                  backgroundColor: isSelected ? '#dcfce7' : '#f0fdf4',
                  color: isSelected ? '#065f46' : '#166534',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isSelected && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(16, 185, 129, 0.2)',
            animation: 'fadeInUp 0.3s ease-out'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#059669',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            padding: '8px 16px',
            borderRadius: '12px'
          }}>
            <CheckCircle style={{ width: '16px', height: '16px' }} />
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Selected for Pickup</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
