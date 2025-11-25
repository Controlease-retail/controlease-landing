import { motion } from 'framer-motion';

type Insight = {
  title: string;
  description: string;
  tag: string;
};

type PlatformModulesSectionProps = {
  title: string;
  subtitle: string;
  items: ReadonlyArray<Insight>;
};

export const PlatformModulesSection = ({ title, subtitle, items }: PlatformModulesSectionProps) => (
  <section className="bg-bg px-4 py-24 md:px-8 overflow-hidden">
    <div className="mx-auto max-w-7xl">
      <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-text md:text-5xl">{title}</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-text-muted md:text-right">{subtitle}</p>
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl bg-surface p-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative h-full rounded-[1.4rem] bg-surface p-8 transition-colors hover:bg-surface/90">
              <div className="mb-6 flex items-start justify-between">
                <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {item.tag}
                </span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-text">{item.title}</h3>
              <p className="text-text-muted leading-relaxed">{item.description}</p>
              
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                <span>Learn more</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);


