"use client";

export function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Upload", href: "/upload" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Profile", href: "/profile" }
  ];

  const resources = [
    { label: "Privacy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Support", href: "/support" }
  ];

  return (
    <footer style={{
      background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid rgba(75, 85, 99, 0.3)',
      padding: '48px 0 24px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          
          {/* Quick Links */}
          <div>
            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '16px', fontSize: '18px' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quickLinks.map((item) => (
                <button
                  key={item.href}
                  onClick={() => window.location.href = item.href}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'transparent',
                    color: '#9ca3af',
                    textAlign: 'left',
                    width: 'fit-content'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.3)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#9ca3af';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '16px', fontSize: '18px' }}>Resources</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {resources.map((item) => (
                <button
                  key={item.href}
                  onClick={() => window.location.href = item.href}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: 'transparent',
                    color: '#9ca3af',
                    textAlign: 'left',
                    width: 'fit-content'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(75, 85, 99, 0.3)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#9ca3af';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stay Updated */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            borderRadius: '20px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '8px', fontSize: '18px' }}>Join Our Eco-Conscious Community</h3>
            <p style={{ color: '#9ca3af', marginBottom: '20px', fontSize: '14px', lineHeight: '1.5' }}>
              Be part of the movement that's creating a sustainable future through everyday actions and community collaboration.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '14px 18px',
                  outline: 'none',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.5)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              />
              <button style={{
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '14px 20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.3)';
              }}
              >
                Join the Movement
              </button>
            </div>
            <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>
              Your data is secure. We never share your information.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid rgba(75, 85, 99, 0.3)',
          textAlign: 'center'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            © {new Date().getFullYear()} Eco_Chain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
