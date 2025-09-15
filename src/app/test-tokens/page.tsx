'use client';

import { useState } from 'react';

export default function TestTokens() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testTokenDistribution = async (wasteType: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wasteType,
          userAddress: '0x742d35Cc6634C0532925a3b8D4C9db96590645d8'
        })
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Test failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '32px' }}>Token Distribution Test</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {['plastic', 'metal', 'paper', 'glass', 'organic'].map((type) => (
          <button
            key={type}
            onClick={() => testTokenDistribution(type)}
            disabled={loading}
            style={{
              padding: '16px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              textTransform: 'capitalize',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            Test {type}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '18px' }}>Testing token distribution...</div>
        </div>
      )}

      {result && (
        <div style={{
          padding: '24px',
          backgroundColor: result.success ? '#dcfce7' : '#fee2e2',
          borderRadius: '12px',
          marginTop: '24px'
        }}>
          <h3 style={{ marginBottom: '16px' }}>
            {result.success ? '✅ Success' : '❌ Error'}
          </h3>
          
          {result.success ? (
            <div>
              <p><strong>Message:</strong> {result.message}</p>
              <p><strong>Transaction Hash:</strong> {result.transaction.hash}</p>
              <p><strong>Amount:</strong> {result.transaction.amount} ECO tokens</p>
              <p><strong>Waste Type:</strong> {result.transaction.wasteType}</p>
              <p><strong>Contract:</strong> {result.contractAddress}</p>
              <p><strong>Timestamp:</strong> {result.transaction.timestamp}</p>
            </div>
          ) : (
            <p><strong>Error:</strong> {result.error}</p>
          )}
        </div>
      )}

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3>Token Amounts per Waste Type:</h3>
        <ul>
          <li>Plastic: 10 ECO tokens</li>
          <li>Metal: 15 ECO tokens</li>
          <li>Paper: 8 ECO tokens</li>
          <li>Glass: 12 ECO tokens</li>
          <li>Organic: 5 ECO tokens</li>
        </ul>
      </div>
    </div>
  );
}