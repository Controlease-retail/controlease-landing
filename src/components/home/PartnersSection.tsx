import { motion } from 'framer-motion';

type PartnersSectionProps = {
  title: string;
  logos: ReadonlyArray<string>;
};

export const PartnersSection = ({ title, logos }: PartnersSectionProps) => {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-12 overflow-hidden bg-[color:var(--color-bg-alt)]">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-text-muted/60">{title}</p>

        <div className="relative">
          {/* Scrolling container */}
          <motion.div
            className="flex gap-x-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <span
                key={`${logo}-${index}`}
                className="text-xl font-bold text-text flex items-center gap-2 flex-shrink-0"
              >
                <div className="h-8 w-8 rounded bg-text-muted/20" />
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
