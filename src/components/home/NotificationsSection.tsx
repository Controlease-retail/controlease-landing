import { useState, useEffect, useRef } from 'react';
import { CheckCircleIcon, BellAlertIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useI18n } from '../../i18n';

export const NotificationsSection = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.notifications;

  interface Notification {
    id: number;
    type: 'alert' | 'info' | 'warning';
    message: string;
    timestamp: string;
    read: boolean;
  }

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCounter, setNotificationCounter] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateNotification = (): Notification => {
    setNotificationCounter(prev => prev + 1);
    const types: Notification['type'][] = ['alert', 'info', 'warning'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const messages = t.messages as { alert: readonly string[]; info: readonly string[]; warning: readonly string[] };
    let message = '';
    switch (randomType) {
      case 'alert':
        message = messages.alert[Math.floor(Math.random() * messages.alert.length)];
        break;
      case 'info':
        message = messages.info[Math.floor(Math.random() * messages.info.length)];
        break;
      case 'warning':
        message = messages.warning[Math.floor(Math.random() * messages.warning.length)];
        break;
    }

    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    return {
      id: notificationCounter,
      type: randomType,
      message,
      timestamp,
      read: false,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(prev => {
        const newNotification = generateNotification();
        const updatedNotifications = [newNotification, ...prev];
        if (updatedNotifications.length > 5) {
          updatedNotifications.pop();
        }
        return updatedNotifications;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [notificationCounter]);

  const handleNotificationClick = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 text-warning" />;
      case 'warning':
        return <InformationCircleIcon className="w-5 h-5 flex-shrink-0 text-info" />;
      default:
        return <BellAlertIcon className="w-5 h-5 flex-shrink-0 text-accent" />;
    }
  };

  const cardHeight = 76;

  return (
    <div className="w-full max-w-6xl mx-auto px-0 md:px-0">
      <div className="flex flex-col md:flex-row gap-8 items-center">

        {/* Description */}
        <div className="w-full md:w-1/3 order-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
            <BellAlertIcon className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>
          <h3 className="text-3xl font-bold text-[color:var(--color-text)]">
            {t.title}
          </h3>
          <p className="text-[color:var(--color-text-muted)] text-lg">
            {t.description}
          </p>
          <ul className="space-y-2 text-[color:var(--color-text-secondary)]">
            {t.items.map((item, index) => (
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

        {/* Visual Demo */}
        <div className="w-full md:w-2/3 order-2">
          {/* Mobile: Simple stacked list */}
          <div className="md:hidden space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-3 rounded-xl flex items-start gap-3 border cursor-pointer",
                  notification.read
                    ? "border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] shadow-md"
                )}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  notification.type === 'alert' && "bg-warning/10",
                  notification.type === 'warning' && "bg-info/10",
                  notification.type === 'info' && "bg-accent/10"
                )}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[color:var(--color-text)] leading-tight">
                    {notification.message}
                  </p>
                  <p className="text-xs text-[color:var(--color-text-muted)] mt-1">{notification.timestamp}</p>
                </div>
                <div className="flex-shrink-0">
                  {notification.read ? (
                    <CheckCircleIcon className="w-5 h-5 text-success" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  )}
                </div>
              </div>
            ))}
            {notifications.length === 0 && (
              <div className="text-center py-8 text-[color:var(--color-text-muted)]">
                <BellAlertIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{t.emptyState}</p>
              </div>
            )}
          </div>

          {/* Desktop: Stacked cards with smooth animation */}
          <div ref={containerRef} className="hidden md:block relative h-[410px]">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ y: -cardHeight, opacity: 0 }}
                animate={{
                  y: 16 + index * cardHeight,
                  opacity: 1
                }}
                transition={{
                  y: { type: "tween", duration: 0.4, ease: "easeOut" },
                  opacity: { duration: 0.3 }
                }}
                className={cn(
                  "absolute left-4 right-4 p-3 rounded-xl flex items-start gap-3 border cursor-pointer",
                  notification.read
                    ? "border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
                    : "border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] shadow-md"
                )}
                style={{ zIndex: 100 - index }}
                onClick={() => handleNotificationClick(notification.id)}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  notification.type === 'alert' && "bg-warning/10",
                  notification.type === 'warning' && "bg-info/10",
                  notification.type === 'info' && "bg-accent/10"
                )}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-[color:var(--color-text)] leading-tight">
                    {notification.message}
                  </p>
                  <p className="text-xs text-[color:var(--color-text-muted)] mt-1">{notification.timestamp}</p>
                </div>
                <div className="flex-shrink-0">
                  {notification.read ? (
                    <CheckCircleIcon className="w-5 h-5 text-success" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
