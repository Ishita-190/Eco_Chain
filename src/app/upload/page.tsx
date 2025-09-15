'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Upload, X, Loader2, Camera, Sparkles, Recycle } from 'lucide-react';

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
      // Convert image to base64
      const base64 = await fileToBase64(file);
      
      // Call classification API
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: base64.split(',')[1], // Remove data:image/jpeg;base64, prefix
          imageUrl: preview
        })
      });

      if (!response.ok) {
        throw new Error('Classification failed');
      }

      const result = await response.json();
      
      // Store result in sessionStorage for result page
      sessionStorage.setItem('classificationResult', JSON.stringify(result));
      
      // Navigate to result page
      router.push(`/result?id=${result.classification.id}`);
    } catch (error) {
      console.error('Classification failed:', error);
      alert('Classification failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
      padding: '80px 24px 40px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '24px' }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #059669, #047857)',
              borderRadius: '24px',
              marginBottom: '24px',
              boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'
            }}>
              <Recycle style={{ width: '40px', height: '40px', color: 'white' }} />
            </div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #065f46, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
              lineHeight: '1.1'
            }}>
              Transform Waste into Rewards
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#374151',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Snap a photo of your recyclable waste and watch it become valuable eco-credits through our AI-powered classification system.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(5, 150, 105, 0.1)',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '48px' }}>
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  border: `3px dashed ${dragActive ? '#059669' : '#d1d5db'}`,
                  borderRadius: '24px',
                  padding: '48px 32px',
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: dragActive ? 'rgba(5, 150, 105, 0.05)' : 'rgba(249, 250, 251, 0.5)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onMouseEnter={(e) => {
                  if (!preview) {
                    e.currentTarget.style.borderColor = '#059669';
                    e.currentTarget.style.backgroundColor = 'rgba(5, 150, 105, 0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!preview && !dragActive) {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.backgroundColor = 'rgba(249, 250, 251, 0.5)';
                  }
                }}
              >
                {preview ? (
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        maxHeight: '320px',
                        maxWidth: '100%',
                        borderRadius: '16px',
                        objectFit: 'cover',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                      }}
                      style={{
                        position: 'absolute',
                        top: '-12px',
                        right: '-12px',
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
                      }}
                    >
                      <X style={{ width: '20px', height: '20px' }} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.05))',
                      borderRadius: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(5, 150, 105, 0.2)'
                    }}>
                      <Camera style={{ width: '36px', height: '36px', color: '#059669' }} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#111827',
                        marginBottom: '8px'
                      }}>
                        Drop your waste image here
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        marginBottom: '24px'
                      }}>
                        or click to browse files • JPG, PNG up to 10MB
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="file-upload"
                      style={{
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 32px',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        borderRadius: '16px',
                        color: 'white',
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(5, 150, 105, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.3)';
                      }}
                    >
                      <Upload style={{ width: '20px', height: '20px' }} />
                      Choose Image
                    </label>
                  </div>
                )}
              </div>

              <div style={{ marginTop: '40px' }}>
                <button
                  type="submit"
                  disabled={!file || isUploading}
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
                    background: !file || isUploading 
                      ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                      : 'linear-gradient(135deg, #059669, #047857)',
                    cursor: !file || isUploading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: !file || isUploading 
                      ? '0 8px 25px rgba(156, 163, 175, 0.3)'
                      : '0 8px 25px rgba(5, 150, 105, 0.3)',
                    opacity: !file || isUploading ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (file && !isUploading) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(5, 150, 105, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (file && !isUploading) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.3)';
                    }
                  }}
                >
                  {isUploading ? (
                    <>
                      <Loader2 style={{ width: '24px', height: '24px', animation: 'spin 1s linear infinite' }} />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Sparkles style={{ width: '24px', height: '24px' }} />
                      Analyze & Earn Credits
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.05), rgba(5, 150, 105, 0.02))',
            padding: '32px 48px',
            borderTop: '1px solid rgba(5, 150, 105, 0.1)',
            borderRadius: '0 0 32px 32px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles style={{ width: '20px', height: '20px', color: '#059669' }} />
              Pro Tips for Maximum Credits
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#059669',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.5' }}>
                  Capture clear, well-lit photos with good contrast
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#059669',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.5' }}>
                  Fill the frame with your waste item for better accuracy
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#059669',
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                <p style={{ fontSize: '15px', color: '#374151', lineHeight: '1.5' }}>
                  Upload one item at a time for precise classification
                </p>
              </div>
            </div>
            
            <div style={{
              marginTop: '32px',
              textAlign: 'center',
              padding: '24px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '16px',
              border: '1px solid rgba(5, 150, 105, 0.1)'
            }}>
              <img 
                src="/image.png" 
                alt="Example waste classification" 
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
