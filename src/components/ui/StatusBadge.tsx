import { cn } from '../../utils/cn';

type StatusType = 'active' | 'warning' | 'error' | 'neutral' | 'success';

interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

const statusConfig = {
  active: {
    bg: 'bg-signal-blue/10',
    text: 'text-signal-blue',
    dot: 'bg-signal-blue',
  },
  success: {
    bg: 'bg-signal-green/10',
    text: 'text-signal-green',
    dot: 'bg-signal-green',
  },
  warning: {
    bg: 'bg-signal-amber/10',
    text: 'text-signal-amber',
    dot: 'bg-signal-amber',
  },
  error: {
    bg: 'bg-signal-red/10',
    text: 'text-signal-red',
    dot: 'bg-signal-red',
  },
  neutral: {
    bg: 'bg-[color:var(--color-glass)]',
    text: 'text-text-muted',
    dot: 'bg-text-muted',
  },
};

export const StatusBadge = ({ status, children, className, pulse = false }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-[color:var(--color-glass-border)] px-2.5 py-1 text-xs font-medium uppercase tracking-wider',
        config.bg,
        config.text,
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              config.dot
            )}
          />
        )}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', config.dot)} />
      </span>
      {children}
    </div>
  );
};

