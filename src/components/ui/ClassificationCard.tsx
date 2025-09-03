// components/ClassificationCard.tsx
'use client';

import { CheckCircle, Info, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Classification {
  label: string;
  confidence: number;
  secondary: string[];
  explanation: string;
  tips: string;
}

interface ClassificationCardProps {
  classification: Classification;
  onProceed: () => void;
}

export function ClassificationCard({ classification, onProceed }: ClassificationCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-6">
      {/* Main Classification */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800 capitalize">
            {classification.label} Waste
          </h3>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-eco-600" />
            <span className={`font-semibold ${getConfidenceColor(classification.confidence)}`}>
              {getConfidenceText(classification.confidence)} Confidence
            </span>
            <span className="text-sm text-gray-500">
              ({Math.round(classification.confidence * 100)}%)
            </span>
          </div>
        </div>

        {classification.secondary.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Also detected:</p>
            <div className="flex flex-wrap gap-2">
              {classification.secondary.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Explanation */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Info className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-semibold text-gray-800">What We Found</h4>
        </div>
        <div className="prose prose-sm max-w-none text-gray-600">
          <ReactMarkdown>{classification.explanation}</ReactMarkdown>
        </div>
      </div>

      {/* Tips */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h4 className="text-lg font-semibold text-gray-800">Disposal Guidelines</h4>
        </div>
        <div className="prose prose-sm max-w-none text-gray-600">
          <ReactMarkdown>{classification.tips}</ReactMarkdown>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onProceed}
          className="btn-primary px-8 py-3 text-lg"
        >
          Find Nearby Facilities
        </button>
      </div>
    </div>
  );
}
