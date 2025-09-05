'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, X, Loader2 } from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Cleanup preview URL on unmount or when file changes
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to result page with mock classification ID
      router.push('/result?classificationId=123');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Upload Waste
          </motion.h1>
          <p className="text-lg text-gray-600">
            Upload an image of your recyclable waste and earn eco-credits!
          </p>
        </div>

        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-80 mx-auto rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-emerald-600" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-lg font-medium text-gray-900">Drag and drop your image here</p>
                      <p className="text-sm text-gray-500">or click to browse files (JPG, PNG up to 10MB)</p>
                    </div>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-full shadow-md text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      Select Image
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={!file || isUploading}
                  className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-full shadow-lg text-lg font-medium text-white transition-all duration-300 ${
                    !file || isUploading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Uploading...
                    </>
                  ) : (
                    'Upload & Analyze'
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-green-50/50 px-6 py-4 border-t border-green-100 rounded-b-3xl">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Tips for best results:</h3>
            <ul className="text-sm text-gray-500 space-y-1">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Take a clear, well-lit photo of the waste item
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Ensure the waste item takes up most of the frame
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                Avoid multiple items in the same photo
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
