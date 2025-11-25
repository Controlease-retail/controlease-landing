import { motion } from 'framer-motion';

type CustomersCarouselProps = {
  title: string;
  subtitle: string;
  logos: ReadonlyArray<string>;
};

export const CustomersCarousel = ({ title, subtitle, logos }: CustomersCarouselProps) => (
  <section id="customers" className="bg-surface py-16">
    <div className="mx-auto max-w-5xl px-6 text-center">
      <p className="text-xs uppercase tracking-widest text-text-muted">{subtitle}</p>
      <h2 className="mt-2 text-2xl font-semibold text-text">{title}</h2>
    </div>
    <div className="mt-10 overflow-hidden">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex h-16 w-48 items-center justify-center rounded-2xl border border-divider/60 bg-bg text-sm font-semibold text-text"
          >
            {logo}
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

