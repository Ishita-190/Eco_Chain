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
          <div>
            <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '16px', fontSize: '18px' }}>Stay Updated</h3>
            <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '14px' }}>
              Subscribe for eco-tips and updates
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{
                  backgroundColor: 'rgba(75, 85, 99, 0.3)',
                  color: 'white',
                  border: '1px solid rgba(107, 114, 128, 0.5)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button style={{
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#047857'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              >
                Subscribe
              </button>
            </div>
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
