// components/FacilityCard.tsx
'use client';

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
      className={`card p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-eco-500 bg-eco-50' : ''
      }`}
      onClick={() => onSelect(facility)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {facility.name}
          </h3>
          {facility.verifiedAt && (
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600">Verified Facility</span>
            </div>
          )}
        </div>
        {distance && (
          <div className="text-right">
            <span className="text-sm font-medium text-eco-600">
              {distance.toFixed(1)} km
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-600">{facility.address}</span>
        </div>

        {facility.phone && (
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{facility.phone}</span>
          </div>
        )}

        {facility.operatingHours && (
          <div className="flex items-start space-x-2">
            <Clock className="w-4 h-4 text-gray-500 mt-0.5" />
            <div className="text-sm text-gray-600">
              <div>Mon-Fri: {facility.operatingHours.weekdays || '9:00 AM - 5:00 PM'}</div>
              <div>Weekends: {facility.operatingHours.weekends || '9:00 AM - 3:00 PM'}</div>
            </div>
          </div>
        )}

        <div className="pt-2">
          <p className="text-sm text-gray-500 mb-2">Accepts:</p>
          <div className="flex flex-wrap gap-1">
            {facility.typesAccepted.map((type, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-eco-100 text-eco-700 rounded text-xs capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="mt-4 pt-4 border-t border-eco-200">
          <div className="flex items-center justify-center space-x-2 text-eco-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Selected</span>
          </div>
        </div>
      )}
    </div>
  );
}
