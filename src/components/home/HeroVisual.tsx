import { motion } from 'framer-motion';

export const HeroVisual = () => {
  return (
    <div className="relative h-full w-full rounded-[1.5rem] bg-[color:var(--color-surface-muted)] border border-[color:var(--color-glass-border)] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative h-full w-full grid grid-cols-2 gap-3 p-6">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="flex flex-col gap-2 rounded-2xl bg-[color:var(--color-bg)]/60 border border-[color:var(--color-border)] p-4 backdrop-blur">
            <div className="text-xs font-medium text-text-muted">Module {idx}</div>
            <div className="text-2xl font-bold text-[color:var(--color-text)]">#{idx * 12}k</div>
            <motion.div
              className="h-1.5 rounded-full bg-primary/30"
              initial={{ width: '20%' }}
              animate={{ width: `${40 + idx * 10}%` }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


