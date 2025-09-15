'use client';

import { useState } from 'react';

export default function DatasetUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !category) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    try {
      const response = await fetch('/api/dataset/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      setMessage(result.success ? 'Image uploaded successfully!' : 'Upload failed');
      setFile(null);
      setCategory('');
    } catch (error) {
      setMessage('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '32px' }}>Training Dataset Upload</h1>
      
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Waste Category:
          </label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid #d1d5db' 
            }}
          >
            <option value="">Select category</option>
            <option value="plastic">Plastic</option>
            <option value="metal">Metal</option>
            <option value="paper">Paper</option>
            <option value="glass">Glass</option>
            <option value="organic">Organic</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Image File:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '8px', 
              border: '2px solid #d1d5db' 
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!file || !category || uploading}
          style={{
            padding: '16px',
            backgroundColor: uploading ? '#9ca3af' : '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: uploading ? 'not-allowed' : 'pointer'
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      {message && (
        <div style={{ 
          marginTop: '20px', 
          padding: '12px', 
          backgroundColor: message.includes('success') ? '#dcfce7' : '#fee2e2',
          color: message.includes('success') ? '#065f46' : '#991b1b',
          borderRadius: '8px'
        }}>
          {message}
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3>Instructions:</h3>
        <ul>
          <li>Upload 200+ images per category</li>
          <li>Clear, well-lit photos</li>
          <li>Single waste item per image</li>
          <li>Good quality (min 224x224px)</li>
        </ul>
      </div>
    </div>
  );
}