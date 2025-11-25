import { motion } from 'framer-motion';

type PartnersSectionProps = {
  title: string;
  logos: ReadonlyArray<string>;
};

export const PartnersSection = ({ title, logos }: PartnersSectionProps) => (
  <section className="border-y border-divider bg-bg-alt/30 py-12">
    <div className="mx-auto max-w-7xl px-6 text-center">
      <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-text-muted/60">{title}</p>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
        {logos.map((logo) => (
          <motion.span
            key={logo}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-text flex items-center gap-2"
          >
            {/* Placeholder for actual logo svg */}
            <div className="h-8 w-8 rounded bg-text-muted/20" />
            {logo}
          </motion.span>
        ))}
      </div>
    </div>
  </section>
);


