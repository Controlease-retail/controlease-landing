import { useState, useEffect } from 'react';
import { CheckCircleIcon, BellAlertIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export const NotificationsSection = () => {
  const notificationItems = [
    "Lapsed Leases",
    "Rent Increases",
    "Paid Rent Deviations",
    "Break Options",
    "Critical Dates Alerts",
    "And Much More!",
  ];

  interface Notification {
    id: number;
    type: 'alert' | 'info' | 'warning';
    message: string;
    timestamp: string;
    read: boolean; // Add a read property
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCounter, setNotificationCounter] = useState(0);

  const generateNotification = (): Notification => {
    setNotificationCounter(prev => prev + 1);
    const types: Notification['type'][] = ['alert', 'info', 'warning'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const alertMessages = [
      'Lease expiring soon: Retail Store B',
      'Rent deviation detected: Unit 101, building C',
      'Break option window opening: Office Space 205',
      'Compliance document overdue: Tenant A',
      'Upcoming rent increase for Warehouse D',
      'Lapsed lease alert: Kiosk E',
    ];
    const infoMessages = [
      'New lease added for Commercial Unit 7',
      'Payment received for Retail Store F',
      'Property inspection scheduled for building G',
      'New tenant onboarded: Cafe H',
    ];
    const warningMessages = [
      'High vacancy rate in Q3 report: Office Tower 1',
      'Potential lease default: Unit 302, building I',
      'Maintenance request pending for 48 hours: Retail J',
    ];

    let message = '';
    switch (randomType) {
      case 'alert':
        message = alertMessages[Math.floor(Math.random() * alertMessages.length)];
        break;
      case 'info':
        message = infoMessages[Math.floor(Math.random() * infoMessages.length)];
        break;
      case 'warning':
        message = warningMessages[Math.floor(Math.random() * warningMessages.length)];
        break;
    }

    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    return {
      id: notificationCounter,
      type: randomType,
      message,
      timestamp,
      read: false, // Initialize as unread
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => {
        const newNotification = generateNotification();
        const updatedNotifications = [newNotification, ...prev];
        // Keep only the last 4 notifications to avoid overflow
        if (updatedNotifications.length > 4) {
          updatedNotifications.pop(); 
        }
        return updatedNotifications;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [notificationCounter]); // Add notificationCounter as a dependency

  const handleNotificationClick = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-0">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Right: Description */}
        <div className="w-full md:w-1/3 order-2 md:order-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <BellAlertIcon className="w-4 h-4" />
            <span>Proactive Alerts</span>
          </div>
          <h3 className="text-3xl font-bold text-[color:var(--color-text)]">
            Automated Notification System
          </h3>
          <p className="text-[color:var(--color-text-muted)] text-lg">
            Our platform keeps you informed with over 10 types of automated notification alerts, ensuring you never miss a critical event in your portfolio.
          </p>
          <ul className="space-y-2 text-[color:var(--color-text-secondary)]">
            {notificationItems.map((item, index) => (
              <motion.li 
                key={item} 
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Left: Visual Demo (Dynamic Notifications) */}
        <div className="w-full md:w-2/3 order-1 md:order-2 relative bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-xl shadow-2xl h-[400px] p-6 overflow-hidden">
          <AnimatePresence initial={false}>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, y: 50 }}
                transition={{
                  opacity: { duration: 0.2 },
                  y: { type: "spring", stiffness: 300, damping: 30 },
                  scale: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className={cn(
                  "absolute left-6 right-6 p-4 rounded-lg flex items-center gap-3 shadow-md border cursor-pointer",
                  notification.read 
                    ? "border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)]" 
                    : "border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] text-[color:var(--color-text)]"
                )}
                style={{
                  top: `${50 + notifications.indexOf(notification) * 80}px`, // Changed stacking logic
                  // Removed: backgroundColor, borderColor, color based on notification.type
                  zIndex: notifications.length - notifications.indexOf(notification),
                  transformOrigin: 'top center',
                }}
                onClick={() => handleNotificationClick(notification.id)}
              >
                {
                  // Pulse effect for unread notifications
                  !notification.read && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent animate-ping-slow opacity-75" />
                  )
                }
                {
                  notification.type === 'alert' ? <ExclamationTriangleIcon className="w-6 h-6 flex-shrink-0 text-[color:var(--color-text-muted)]" /> :
                  notification.type === 'warning' ? <InformationCircleIcon className="w-6 h-6 flex-shrink-0 text-[color:var(--color-text-muted)]" /> :
                  <BellAlertIcon className="w-6 h-6 flex-shrink-0 text-[color:var(--color-text-muted)]" />
                }
                <div className="flex-1">
                  <p className="font-medium text-sm">{notification.message}</p>
                  <p className="text-xs opacity-70 mt-0.5">{notification.timestamp}</p>
                </div>
                {notification.read && <CheckCircleIcon className="w-5 h-5 text-success ml-auto" />}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
