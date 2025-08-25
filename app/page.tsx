// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUploader } from '@/components/ImageUploader';
import { WalletBadge } from '@/components/WalletBadge';
import { ClassificationCard } from '@/components/ClassificationCard';
import { Leaf, Recycle, Award } from 'lucide-react';

interface Classification {
  id: string;
  label: string;
  confidence: number;
  secondary: string[];
  explanation: string;
  tips: string;
}

export default function HomePage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classification, setClassification] = useState<Classification | null>(null);
  const router = useRouter();

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Convert to base64 for upload
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        
        // Upload to IPFS
        const uploadResponse = await fetch('/api/uploads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64,
            contentType: file.type,
          }),
        });

        if (!uploadResponse.ok) throw new Error('Upload failed');
        
        const { cid, previewUrl: ipfsPreview } = await uploadResponse.json();
        
        // Classify image
        setIsClassifying(true);
        const classifyResponse = await fetch('/api/classify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageCID: cid, imageUrl: ipfsPreview }),
        });

        if (!classifyResponse.ok) throw new Error('Classification failed');
        
        const { classification: result } = await classifyResponse.json();
        setClassification(result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload and classify image. Please try again.');
    } finally {
      setIsUploading(false);
      setIsClassifying(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setClassification(null);
  };

  const handleProceed = () => {
    if (classification) {
      router.push(`/result?classificationId=${classification.id}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-eco-600" />
              <h1 className="text-2xl font-bold text-gray-800">EcoCommerce</h1>
            </div>
            <WalletBadge />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!classification ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center space-x-4 mb-6">
                <div className="p-4 bg-eco-100 rounded-full">
                  <Recycle className="w-8 h-8 text-eco-600" />
                </div>
                <div className="p-4 bg-blue-100 rounded-full">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Turn Waste Into <span className="text-eco-600">Rewards</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload a photo of your waste, get it properly classified, schedule pickup, 
                and earn blockchain-based eco credits for your environmental impact.
              </p>
            </div>

            {/* Upload Section */}
            <div className="max-w-2xl mx-auto">
              <ImageUploader
                onUpload={handleUpload}
                preview={preview}
                onRemove={handleRemove}
                isUploading={isUploading || isClassifying}
              />
              
              {isClassifying && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-blue-700 font-medium">
                      Analyzing your waste with AI...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-eco-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-eco-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Classification</h3>
                <p className="text-gray-600">Advanced AI analyzes your waste and provides detailed disposal guidance.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Matching</h3>
                <p className="text-gray-600">Find the best nearby facilities that accept your specific waste type.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Blockchain Rewards</h3>
                <p className="text-gray-600">Earn ECO tokens for verified waste disposal - stored securely on blockchain.</p>
              </div>
            </div>
          </>
        ) : (
          <ClassificationCard
            classification={classification}
            onProceed={handleProceed}
          />
        )}
      </main>
    </div>
  );
}
