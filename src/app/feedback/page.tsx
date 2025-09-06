'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
      padding: '80px 24px 40px'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
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
            <MessageSquare style={{ width: '40px', height: '40px', color: 'white' }} />
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
            Share Your Feedback
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#374151',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Help us improve Eco_Chain by sharing your thoughts and suggestions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85))',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '48px' }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '48px 0' }}
              >
                <CheckCircle style={{ width: '64px', height: '64px', color: '#059669', margin: '0 auto 24px' }} />
                <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                  Thank You!
                </h2>
                <p style={{ fontSize: '18px', color: '#6b7280' }}>
                  Your feedback has been submitted successfully.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Type
                  </label>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      type="button"
                      onClick={() => setFeedbackType('feedback')}
                      style={{
                        flex: 1,
                        padding: '16px',
                        borderRadius: '16px',
                        border: `2px solid ${feedbackType === 'feedback' ? '#059669' : 'rgba(5, 150, 105, 0.2)'}`,
                        background: feedbackType === 'feedback' ? 'rgba(5, 150, 105, 0.1)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <MessageSquare style={{ width: '20px', height: '20px', color: '#059669' }} />
                      <span style={{ fontWeight: '600', color: '#059669' }}>Feedback</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType('report')}
                      style={{
                        flex: 1,
                        padding: '16px',
                        borderRadius: '16px',
                        border: `2px solid ${feedbackType === 'report' ? '#dc2626' : 'rgba(220, 38, 38, 0.2)'}`,
                        background: feedbackType === 'report' ? 'rgba(220, 38, 38, 0.1)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <AlertTriangle style={{ width: '20px', height: '20px', color: '#dc2626' }} />
                      <span style={{ fontWeight: '600', color: '#dc2626' }}>Report Issue</span>
                    </button>
                  </div>
                </div>

                {feedbackType === 'feedback' && (
                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Rate Your Experience
                  </label>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '8px',
                          borderRadius: '8px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(5, 150, 105, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Star
                          style={{
                            width: '32px',
                            height: '32px',
                            color: star <= rating ? '#fbbf24' : '#d1d5db',
                            fill: star <= rating ? '#fbbf24' : 'none'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                )}

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Your Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={feedbackType === 'feedback' ? "Tell us about your experience with Eco_Chain..." : "Describe the issue you encountered..."}
                    required
                    style={{
                      width: '100%',
                      minHeight: '120px',
                      padding: '16px',
                      borderRadius: '16px',
                      border: '2px solid rgba(5, 150, 105, 0.2)',
                      fontSize: '16px',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'rgba(249, 250, 251, 0.5)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#059669';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                      e.currentTarget.style.backgroundColor = 'rgba(249, 250, 251, 0.5)';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label style={{ display: 'block', fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '16px',
                      border: '2px solid rgba(5, 150, 105, 0.2)',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'rgba(249, 250, 251, 0.5)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#059669';
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                      e.currentTarget.style.backgroundColor = 'rgba(249, 250, 251, 0.5)';
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={!feedback || (feedbackType === 'feedback' && rating === 0)}
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
                    background: (!feedback || (feedbackType === 'feedback' && rating === 0)) 
                      ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                      : feedbackType === 'report' 
                        ? 'linear-gradient(135deg, #dc2626, #b91c1c)'
                        : 'linear-gradient(135deg, #059669, #047857)',
                    cursor: (!feedback || (feedbackType === 'feedback' && rating === 0)) ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: (!feedback || rating === 0) 
                      ? '0 8px 25px rgba(156, 163, 175, 0.3)'
                      : '0 8px 25px rgba(5, 150, 105, 0.3)',
                    opacity: (!feedback || rating === 0) ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (feedback && rating > 0) {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(5, 150, 105, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (feedback && rating > 0) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.3)';
                    }
                  }}
                >
                  <Send style={{ width: '20px', height: '20px' }} />
                  {feedbackType === 'feedback' ? 'Submit Feedback' : 'Submit Report'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}