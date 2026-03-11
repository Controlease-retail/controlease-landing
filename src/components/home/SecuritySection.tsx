import { motion } from 'framer-motion';
import { CheckCircleIcon, ShieldCheckIcon, LockClosedIcon, ServerStackIcon, DocumentCheckIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useI18n } from '../../i18n';

export const SecuritySection = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.security;

  const icons = [
    LockClosedIcon,
    ShieldCheckIcon,
    ServerStackIcon,
    DocumentCheckIcon,
    CloudArrowUpIcon,
  ];

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 relative bg-[color:var(--color-bg-alt)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">

          {/* Left: Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <ShieldCheckIcon className="w-4 h-4" />
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
                {t.items.map((item: string, index: number) => {
                  const Icon = icons[index] || CheckCircleIcon;
                  return (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Icon className="w-5 h-5 text-[color:var(--color-success)] flex-shrink-0 mt-0.5" />
                      <span className="text-[color:var(--color-text-secondary)]">{item}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            <p className="text-[color:var(--color-text-muted)] italic border-l-2 border-accent pl-4">
              {t.conclusion}
            </p>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-2xl p-6 shadow-xl">
                {/* Security Shield Icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-[color:var(--color-success)]/20 flex items-center justify-center"
                  >
                    <ShieldCheckIcon className="w-12 h-12 text-accent" />
                  </motion.div>
                </div>

                {/* Security Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: LockClosedIcon, label: 'Encryption', value: 'AES-256' },
                    { icon: ShieldCheckIcon, label: 'Protocol', value: 'TLS 1.3' },
                    { icon: ServerStackIcon, label: 'Hosting', value: 'EU Cloud' },
                    { icon: CloudArrowUpIcon, label: 'Backups', value: 'Daily' },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="bg-[color:var(--color-bg-alt)] rounded-xl p-3 border border-[color:var(--color-border)] flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-xs text-[color:var(--color-text-muted)]">{feature.label}</div>
                        <div className="text-sm font-semibold text-[color:var(--color-text)]">{feature.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Status Indicators */}
                <div className="space-y-3">
                  {[
                    { label: 'Data Encryption', status: 'AES-256' },
                    { label: 'SSL/TLS', status: 'Active' },
                    { label: 'Last Backup', status: '2 min ago' },
                    { label: 'Uptime', status: '99.99%' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center justify-between py-2 border-b border-[color:var(--color-border)] last:border-0"
                    >
                      <span className="text-sm text-[color:var(--color-text-muted)]">{item.label}</span>
                      <span className="text-sm font-medium text-[color:var(--color-success)] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[color:var(--color-success)] animate-pulse" />
                        {item.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[color:var(--color-success)]/5 rounded-full blur-2xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
