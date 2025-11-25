// import React from 'react';
import { cn } from '../../utils/cn';

interface TechCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
  className?: string;
}

export const TechCard: React.FC<TechCardProps> = ({ 
  title, 
  description, 
  icon, 
  delay = 0,
  className 
}) => {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass)] backdrop-blur-md transition-all duration-300 group hover:border-[color:var(--color-glass-highlight)] hover:bg-[color:var(--color-surface-elevated)]",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
      
      <div className="relative p-6 md:p-8 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="p-3 rounded-lg bg-[color:var(--color-surface-muted)] text-primary border border-[color:var(--color-glass-border)] group-hover:border-[color:var(--color-glass-highlight)] transition-colors">
            {icon}
          </div>
          <div className="w-2 h-2 rounded-full bg-[color:var(--color-border)] group-hover:bg-primary transition-colors" />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-bold text-[color:var(--color-text)] mb-2 tracking-tight group-hover:text-primary transition-colors">
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
