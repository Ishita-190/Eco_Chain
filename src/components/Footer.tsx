

export function Footer() {
  return (
    <>
      <style jsx>{`
        .footer-link {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: white;
        }
      `}</style>
      <footer style={{
        backgroundColor: '#111827',
        color: '#d1d5db',
        borderTop: '1px solid #374151',
        padding: '48px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '32px'
          }}>
            {/* Brand Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
                  Eco_Chain
                </div>
                <span style={{ marginLeft: '8px', fontSize: '24px' }}>🌱</span>
              </div>
              <p style={{ color: '#9ca3af', marginBottom: '24px', lineHeight: '1.6' }}>
                Making our planet greener, one recycled item at a time. Join the sustainable revolution.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>Quick Links</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/" className="footer-link">
                    Home
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/about" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/upload" className="footer-link">
                    Upload Waste
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/leaderboard" className="footer-link">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>Resources</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/privacy" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/contact" className="footer-link">
                    Contact Us
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/faq" className="footer-link">
                    FAQ
                  </Link>
                </li>
                <li style={{ marginBottom: '12px' }}>
                  <Link href="/support" className="footer-link">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Stay Updated */}
            <div>
              <h3 style={{ color: 'white', fontWeight: '600', marginBottom: '16px' }}>Stay Updated</h3>
              <p style={{ color: '#9ca3af', marginBottom: '16px', fontSize: '14px', lineHeight: '1.5' }}>
                Subscribe for eco-tips and updates
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  style={{
                    backgroundColor: '#374151',
                    color: 'white',
                    border: '1px solid #4b5563',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    outline: 'none'
                  }}
                />
                <button style={{
                  backgroundColor: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div style={{
            paddingTop: '32px',
            borderTop: '1px solid #374151',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
              <Shield style={{ height: '16px', width: '16px', marginRight: '8px' }} />
              <span style={{ fontSize: '14px' }}>Secured by blockchain</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '14px', color: '#9ca3af' }}>
              <Link href="/privacy" className="footer-link">
                Privacy
              </Link>
              <span>© {new Date().getFullYear()} Eco_Chain. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
