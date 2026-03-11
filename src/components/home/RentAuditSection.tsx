import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationTriangleIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import { useI18n } from '../../i18n';

export const RentAuditSection = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.rentAudit;

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 relative bg-[color:var(--color-bg)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">

          {/* Left: Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-2xl p-6 shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[color:var(--color-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <CalculatorIcon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[color:var(--color-text)]">Rent Audit</h4>
                    <p className="text-xs text-[color:var(--color-text-muted)]">Store Madrid #142</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[color:var(--color-warning)]/10 text-[color:var(--color-warning)] text-xs font-medium">
                  Deviation Found
                </span>
              </div>

              {/* Comparison Table */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-xs text-[color:var(--color-text-muted)] uppercase tracking-wider pb-2 border-b border-[color:var(--color-border)]">
                  <span>Item</span>
                  <span className="text-center">Contract</span>
                  <span className="text-center">Invoiced</span>
                </div>

                {/* Row 1 - OK */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-3 gap-4 items-center py-2"
                >
                  <span className="text-sm text-[color:var(--color-text)]">Base Rent</span>
                  <span className="text-sm text-center font-mono text-[color:var(--color-text)]">€4,500.00</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-mono text-[color:var(--color-text)]">€4,500.00</span>
                    <CheckCircleIcon className="w-4 h-4 text-[color:var(--color-success)]" />
                  </div>
                </motion.div>

                {/* Row 2 - Deviation */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-3 gap-4 items-center py-2 bg-[color:var(--color-warning)]/5 -mx-4 px-4 rounded-lg border border-[color:var(--color-warning)]/20"
                >
                  <span className="text-sm text-[color:var(--color-text)]">IPC Increase (3.2%)</span>
                  <span className="text-sm text-center font-mono text-[color:var(--color-text)]">€144.00</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-mono text-[color:var(--color-warning)] font-medium">€180.00</span>
                    <ExclamationTriangleIcon className="w-4 h-4 text-[color:var(--color-warning)]" />
                  </div>
                </motion.div>

                {/* Row 3 - OK */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-3 gap-4 items-center py-2"
                >
                  <span className="text-sm text-[color:var(--color-text)]">Service Charges</span>
                  <span className="text-sm text-center font-mono text-[color:var(--color-text)]">€500.00</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-mono text-[color:var(--color-text)]">€500.00</span>
                    <CheckCircleIcon className="w-4 h-4 text-[color:var(--color-success)]" />
                  </div>
                </motion.div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 pt-4 border-t border-[color:var(--color-border)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[color:var(--color-text)]">Deviation Detected</span>
                    <span className="text-lg font-bold text-[color:var(--color-warning)]">+€36.00</span>
                  </div>
                  <p className="text-xs text-[color:var(--color-text-muted)] mt-2">
                    IPC increase applied at 4% instead of contracted 3.2%
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <CalculatorIcon className="w-4 h-4" />
              <span>{t.badge}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--color-text)]">
              {t.title}
            </h2>

            <p className="text-lg text-[color:var(--color-text-muted)] leading-relaxed">
              {t.description}
            </p>

            <div className="space-y-4">
              <p className="text-sm font-medium text-[color:var(--color-text)]">{t.subtitle}</p>
              <ul className="space-y-3">
                {t.items.map((item: string, index: number) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <ExclamationTriangleIcon className="w-5 h-5 text-[color:var(--color-warning)] flex-shrink-0 mt-0.5" />
                    <span className="text-[color:var(--color-text-secondary)]">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="text-[color:var(--color-text-muted)] italic border-l-2 border-accent pl-4">
              {t.conclusion}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
