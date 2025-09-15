'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  icon: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationButton() {
  // Add CSS animations
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `;
    if (!document.head.querySelector('style[data-notifications]')) {
      style.setAttribute('data-notifications', 'true');
      document.head.appendChild(style);
    }
  }
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications();
    
    // Listen for new notifications
    const handleNewNotification = () => {
      fetchNotifications();
    };
    
    window.addEventListener('newNotification', handleNewNotification);
    
    return () => {
      window.removeEventListener('newNotification', handleNewNotification);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const fetchNotifications = async () => {
    try {
      // Get notifications from localStorage
      const stored = localStorage.getItem('eco_notifications');
      const localNotifications = stored ? JSON.parse(stored) : [];
      
      // Also fetch from API for demo
      const response = await fetch('/api/notifications');
      const data = await response.json();
      const apiNotifications = data.notifications || [];
      
      // Combine and deduplicate
      const allNotifications = [...localNotifications, ...apiNotifications]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setNotifications(allNotifications);
      setUnreadCount(allNotifications.filter((n: Notification) => !n.read).length);
    } catch (error) {
      console.error('Failed to fetch notifications');
      // Fallback to localStorage only
      const stored = localStorage.getItem('eco_notifications');
      const localNotifications = stored ? JSON.parse(stored) : [];
      setNotifications(localNotifications);
      setUnreadCount(localNotifications.filter((n: Notification) => !n.read).length);
    }
  };

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));
    
    // Update localStorage
    const localNotifications = updatedNotifications.filter(n => n.id.startsWith('local_'));
    localStorage.setItem('eco_notifications', JSON.stringify(localNotifications));
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          position: 'relative',
          padding: '12px',
          backgroundColor: showDropdown ? 'rgba(5, 150, 105, 0.1)' : 'rgba(255, 255, 255, 0.9)',
          border: `2px solid ${showDropdown ? '#059669' : 'rgba(5, 150, 105, 0.2)'}`,
          borderRadius: '16px',
          color: '#059669',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: showDropdown ? '0 8px 25px rgba(5, 150, 105, 0.2)' : '0 4px 12px rgba(5, 150, 105, 0.1)',
          transform: showDropdown ? 'translateY(-2px)' : 'translateY(0)'
        }}
        onMouseEnter={(e) => {
          if (!showDropdown) {
            e.currentTarget.style.backgroundColor = 'rgba(5, 150, 105, 0.05)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!showDropdown) {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.1)';
          }
        }}
      >
        <Bell style={{ width: '20px', height: '20px' }} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            backgroundColor: 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white',
            borderRadius: '50%',
            width: '22px',
            height: '22px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            border: '2px solid white',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
            animation: unreadCount > 0 ? 'pulse 2s infinite' : 'none'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          marginTop: '12px',
          width: '380px',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(5, 150, 105, 0.1)',
          border: '2px solid rgba(5, 150, 105, 0.1)',
          zIndex: 50,
          maxHeight: '480px',
          overflowY: 'auto',
          animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div style={{
            padding: '20px 24px 16px',
            borderBottom: '2px solid rgba(5, 150, 105, 0.1)',
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.05), rgba(5, 150, 105, 0.02))',
            borderRadius: '24px 24px 0 0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{
                fontWeight: '700',
                fontSize: '18px',
                color: '#1f2937',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                🔔 Notifications
              </h3>
              {unreadCount > 0 && (
                <span style={{
                  fontSize: '12px',
                  color: '#059669',
                  fontWeight: '600',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  padding: '4px 8px',
                  borderRadius: '12px'
                }}>
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          {notifications.length === 0 ? (
            <div style={{
              padding: '48px 24px',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
                opacity: 0.5
              }}>🔕</div>
              <p style={{
                fontSize: '16px',
                fontWeight: '500',
                margin: 0
              }}>No notifications yet</p>
              <p style={{
                fontSize: '14px',
                margin: '8px 0 0',
                opacity: 0.7
              }}>We'll notify you about tokens and pickups</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                style={{
                  padding: '20px 24px',
                  borderBottom: notifications.indexOf(notification) === notifications.length - 1 ? 'none' : '1px solid rgba(5, 150, 105, 0.08)',
                  cursor: 'pointer',
                  backgroundColor: notification.read ? 'transparent' : 'rgba(5, 150, 105, 0.03)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(5, 150, 105, 0.08)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = notification.read ? 'transparent' : 'rgba(5, 150, 105, 0.03)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    border: '2px solid rgba(5, 150, 105, 0.1)',
                    flexShrink: 0
                  }}>
                    {notification.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: '700',
                      fontSize: '15px',
                      color: '#1f2937',
                      marginBottom: '6px',
                      lineHeight: '1.3'
                    }}>
                      {notification.title}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#4b5563',
                      marginBottom: '8px',
                      lineHeight: '1.4'
                    }}>
                      {notification.message}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#9ca3af',
                      fontWeight: '500'
                    }}>
                      {formatTime(notification.timestamp)}
                    </div>
                  </div>
                  {!notification.read && (
                    <div style={{
                      width: '10px',
                      height: '10px',
                      backgroundColor: '#059669',
                      borderRadius: '50%',
                      flexShrink: 0,
                      marginTop: '4px',
                      boxShadow: '0 0 0 3px rgba(5, 150, 105, 0.2)'
                    }} />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}