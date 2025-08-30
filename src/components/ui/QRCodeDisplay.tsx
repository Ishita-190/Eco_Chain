// components/QRCodeDisplay.tsx
'use client';

import { useState } from 'react';
import { QrCode, Copy, Check } from 'lucide-react';

interface QRCodeDisplayProps {
  qrCodeURI: string;
  otpHint: string;
  orderId: string;
}

export function QRCodeDisplay({ qrCodeURI, otpHint, orderId }: QRCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <QrCode className="w-5 h-5 mr-2 text-eco-600" />
        Pickup Verification
      </h3>

      <div className="space-y-6">
        {/* QR Code */}
        <div className="text-center">
          <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
            <img 
              src={qrCodeURI} 
              alt="Pickup QR Code" 
              className="w-48 h-48 mx-auto"
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Show this QR code to the facility staff
          </p>
        </div>

        {/* Backup OTP */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">Backup Verification</h4>
          <p className="text-sm text-gray-600 mb-3">
            If QR code doesn't work, provide these details to facility staff:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Order ID:</span>
              <div className="flex items-center space-x-2">
                <code className="bg-white px-2 py-1 rounded text-sm font-mono">
                  {orderId.slice(0, 8)}...
                </code>
                <button
                  onClick={() => handleCopy(orderId)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">OTP ends with:</span>
              <code className="bg-white px-2 py-1 rounded text-sm font-mono">
                ***{otpHint}
              </code>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">Instructions</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Arrive at the scheduled time</li>
            <li>• Show this QR code or provide the backup details</li>
            <li>• Staff will verify and weigh your waste</li>
            <li>• You'll receive eco credits once processing is complete</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
