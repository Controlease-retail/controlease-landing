import { motion } from 'framer-motion';
import { DocumentTextIcon, UsersIcon, CalculatorIcon, BeakerIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import type { ComponentProps } from 'react';

type FeatureItem = {
  name: string;
  description: string;
  highlight: string;
  icon: string;
};

type FeatureInventorySectionProps = {
  title: string;
  subtitle: string;
  items: ReadonlyArray<FeatureItem>;
};

type IconComponent = React.ComponentType<ComponentProps<typeof DocumentTextIcon>>;

const iconMap: Record<string, IconComponent> = {
  DocumentText: DocumentTextIcon,
  Users: UsersIcon,
  Calculator: CalculatorIcon,
  Beaker: BeakerIcon,
  AcademicCap: AcademicCapIcon,
  ChartBar: ChartBarIcon,
};

export const FeatureInventorySection = ({ title, subtitle, items }: FeatureInventorySectionProps) => (
  <section className="px-4 py-24 md:px-8 border-t border-[color:var(--color-divider)] bg-[color:var(--color-bg)] transition-colors">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center mb-20">
        <h2 className="text-4xl font-bold text-text mb-6 md:text-5xl">{title}</h2>
        <p className="text-xl text-text-muted">{subtitle}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {items.map((item, idx) => {
          const Icon = (iconMap[item.icon] || DocumentTextIcon) as IconComponent;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group rounded-3xl bg-[color:var(--color-surface)] p-8 transition-all hover:shadow-xl hover:bg-[color:var(--color-surface-elevated)] border border-transparent hover:border-[color:var(--color-divider)]"
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-[color:var(--color-inverted-text)] transition-colors">
                <Icon className="h-7 w-7" />
              </div>
              
              <h3 className="mb-3 text-2xl font-bold text-text">{item.name}</h3>
              <p className="mb-6 text-text-muted leading-relaxed">{item.description}</p>
              
              <div className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--color-bg-alt)] px-3 py-1.5 text-sm font-medium text-text-muted group-hover:bg-[color:var(--color-surface-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item.highlight}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

