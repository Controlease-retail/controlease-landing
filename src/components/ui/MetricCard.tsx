import { cn } from '../../utils/cn';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export const MetricCard = ({ label, value, trend, trendUp, className }: MetricCardProps) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <dt className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className="font-mono text-2xl font-medium text-[color:var(--color-text)] tracking-tight">{value}</dd>
      {trend && (
        <span
          className={cn(
            'text-xs font-medium',
            trendUp ? 'text-signal-green' : 'text-signal-red'
          )}
        >
          {trendUp ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
  );
};

