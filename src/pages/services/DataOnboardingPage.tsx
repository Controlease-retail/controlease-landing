import { motion } from 'framer-motion';
import {
  DocumentArrowUpIcon,
  CpuChipIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  SparklesIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { CTASection } from '../../components/modules/CTASection';
import { useI18n } from '../../i18n';

export const DataOnboardingPage = () => {
  const { dictionary } = useI18n();
  const t = dictionary.dataOnboarding;

  const processIcons = [DocumentArrowUpIcon, CpuChipIcon, UserGroupIcon, RocketLaunchIcon];

  const benefitIcons = [SparklesIcon, ShieldCheckIcon, ClockIcon, CheckCircleIcon];

  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 border border-[color:var(--color-border)] mb-8"
            >
              <DocumentArrowUpIcon className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">{t.hero.badge}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight">
              {t.hero.title.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t.hero.title.split(' ').slice(2).join(' ')}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed mb-12">
              {t.hero.description}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {t.stats.map((stat: { value: string; label: string }, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm text-[color:var(--color-text-muted)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t.process.title}</h2>
            <p className="text-lg text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              {t.process.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.process.steps.map((step: { title: string; description: string }, index: number) => {
              const Icon = processIcons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* Connector line */}
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-accent/40 via-accent/20 to-transparent z-10" style={{ width: 'calc(100% - 1.5rem)' }} />
                  )}

                  <div className="bg-[color:var(--color-surface)] p-6 rounded-2xl border border-[color:var(--color-border)] h-full transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 flex flex-col">
                    {/* Step number badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <span className="text-4xl font-bold text-accent/20 group-hover:text-accent/40 transition-colors">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-[color:var(--color-text)]">{step.title}</h3>
                    <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed flex-grow">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t.pricing.title}</h2>
            <p className="text-lg text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              {t.pricing.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.pricing.tiers.map((tier, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-[color:var(--color-bg-alt)] p-8 rounded-2xl border flex flex-col ${
                  'popular' in tier && tier.popular
                    ? 'border-accent shadow-xl shadow-accent/10'
                    : 'border-[color:var(--color-border)]'
                }`}
              >
                {'popular' in tier && tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-sm font-semibold rounded-full">
                    Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-sm text-[color:var(--color-text-muted)] mb-4">{tier.documents}</p>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-sm text-[color:var(--color-text-muted)]">{tier.unit}</span>
                  </div>
                </div>

                <ul className="space-y-4 flex-1">
                  {tier.features.map((feature, featureIndex: number) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t.benefits.title}</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8">
            {t.benefits.items.map((benefit: { title: string; description: string }, index: number) => {
              const Icon = benefitIcons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 p-8 bg-[color:var(--color-bg)] rounded-2xl border border-[color:var(--color-border)]"
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-[color:var(--color-text-muted)] leading-relaxed">{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={t.cta.title}
        primaryCta={t.cta.primary}
        secondaryCta={t.cta.secondary}
        primaryHref="/contact"
        secondaryHref="/contact"
      />
    </main>
  );
};
