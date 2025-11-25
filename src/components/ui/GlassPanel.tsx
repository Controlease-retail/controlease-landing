import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children?: ReactNode;
  variant?: 'default' | 'hover' | 'interactive';
  border?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, children, variant = 'default', border = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'glass-panel relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all',
          variant === 'default' && 'bg-glass border border-glass',
          variant === 'hover' && 'glass-panel-hover border',
          variant === 'interactive' && 'bg-glass border border-glass cursor-pointer hover:bg-[color:var(--color-glass-highlight)] active:scale-[0.99]',
          border ? 'border border-glass' : 'border-none',
          className
        )}
        {...props}
      >
        {children}
        {/* Subtle gradient overlay for sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent dark:from-white/[0.04]" />
      </motion.div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
