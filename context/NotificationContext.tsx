"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Icon } from '@/components/Icon';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

interface NotificationContextType {
    showNotification: (message: string, type?: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const showNotification = useCallback((message: string, type: NotificationType = 'info') => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 5000);
    }, []);

    const removeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="notification-container">
                {notifications.map((n) => (
                    <div key={n.id} className={`notification-toast ${n.type}`}>
                        <div className="notification-icon">
                            {n.type === 'success' && <Icon name="check" size={20} />}
                            {n.type === 'error' && <Icon name="stop" size={20} />}
                            {n.type === 'warning' && <Icon name="reservations" size={20} />}
                            {n.type === 'info' && <Icon name="info" size={20} />}
                        </div>
                        <div className="notification-message">{n.message}</div>
                        <button className="notification-close" onClick={() => removeNotification(n.id)}>
                            <Icon name="chevronRight" size={14} style={{ transform: 'rotate(90deg)' }} />
                        </button>
                    </div>
                ))}
            </div>

            <style jsx global>{`
        .notification-container {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
        }

        .notification-toast {
          pointer-events: auto;
          min-width: 300px;
          max-width: 450px;
          background: var(--g1-card, #1E293B);
          border: 1px solid var(--g1-border, rgba(255,255,255,0.1));
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          animation: slideIn 0.3s ease forwards;
        }

        .light-mode .notification-toast {
          background: #FFFFFF;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .notification-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-toast.success .notification-icon { background: rgba(16, 185, 129, 0.1); color: #10B981; }
        .notification-toast.error .notification-icon { background: rgba(239, 68, 68, 0.1); color: #EF4444; }
        .notification-toast.warning .notification-icon { background: rgba(245, 158, 11, 0.1); color: #F59E0B; }
        .notification-toast.info .notification-icon { background: rgba(37, 99, 235, 0.1); color: #2563EB; }

        .notification-message {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          color: var(--g1-text, #F8FAFC);
        }

        .notification-close {
          background: transparent;
          border: none;
          color: var(--g1-muted, #94A3B8);
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .notification-close:hover {
          background: rgba(255,255,255,0.05);
          color: var(--g1-text, #F8FAFC);
        }
      `}</style>
        </NotificationContext.Provider>
    );
};
