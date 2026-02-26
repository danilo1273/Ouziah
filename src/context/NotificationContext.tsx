import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/Toast';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
    id: string;
    type: NotificationType;
    message: string;
}

interface NotificationContextType {
    showNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const showNotification = useCallback((type: NotificationType, message: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        setNotifications((prev) => [...prev, { id, type, message }]);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    }, [removeNotification]);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="fixed top-4 right-4 z-[1000] flex flex-col gap-3 pointer-events-none">
                {notifications.map((n) => (
                    <Toast
                        key={n.id}
                        type={n.type}
                        message={n.message}
                        onClose={() => removeNotification(n.id)}
                    />
                ))}
            </div>
        </NotificationContext.Provider>
    );
}

export function useNotification() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}
