// import React from 'react';
import { cn } from '../../utils/cn';

interface TechCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  tag?: string;
  delay?: number;
  className?: string;
}

export const TechCard: React.FC<TechCardProps> = ({
  title,
  description,
  icon,
  tag,
  delay = 0,
  className
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass)] backdrop-blur-md transition-all duration-300 group hover:border-[color:var(--color-glass-highlight)] hover:bg-[color:var(--color-surface-elevated)] h-full",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

      <div className="relative p-5 md:p-6 space-y-3 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="p-2.5 rounded-lg bg-[color:var(--color-surface-muted)] text-accent border border-[color:var(--color-glass-border)] group-hover:border-[color:var(--color-glass-highlight)] transition-colors">
            {icon}
          </div>
          {tag && (
            <span className={cn(
              "text-[10px] font-medium px-2 py-0.5 rounded-full",
              // New (EN, ES, PT)
              ['New', 'Nuevo', 'Novo'].includes(tag) && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
              // AI (EN, ES, PT)
              ['AI', 'IA'].includes(tag) && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
              // Core (EN, ES, PT)
              ['Core', 'Núcleo'].includes(tag) && "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
              // Analytics (EN, ES, PT)
              ['Analytics', 'Analítica'].includes(tag) && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
              // Security (EN, ES, PT)
              ['Security', 'Seguridad', 'Segurança'].includes(tag) && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
              // Automation (EN, ES, PT)
              ['Automation', 'Automatización', 'Automação'].includes(tag) && "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
              // Fallback for unmatched tags
              !['New', 'Nuevo', 'Novo', 'AI', 'IA', 'Core', 'Núcleo', 'Analytics', 'Analítica', 'Security', 'Seguridad', 'Segurança', 'Automation', 'Automatización', 'Automação'].includes(tag || '') && "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            )}>
              {tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[color:var(--color-text)] mb-1.5 tracking-tight group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-[color:var(--color-text-muted)] text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
