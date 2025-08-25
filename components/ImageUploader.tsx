// components/ImageUploader.tsx
'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  preview?: string | null;
  onRemove: () => void;
  isUploading?: boolean;
}

export function ImageUploader({ onUpload, preview, onRemove, isUploading }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  if (preview) {
    return (
      <div className="relative">
        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
          />
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${dragActive ? 'border-eco-500 bg-eco-50' : 'border-gray-300 hover:border-eco-400'}
        ${isUploading ? 'pointer-events-none opacity-50' : ''}
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center space-y-4">
        {isUploading ? (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-600"></div>
        ) : (
          <div className="flex space-x-4">
            <Upload className="w-12 h-12 text-gray-400" />
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        <div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            {isUploading ? 'Uploading...' : 'Upload Waste Photo'}
          </p>
          <p className="text-sm text-gray-500">
            Drag & drop or click to select an image of your waste
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supports JPEG, PNG, WebP (max 10MB)
          </p>
        </div>
      </div>
    </div>
  );
}
