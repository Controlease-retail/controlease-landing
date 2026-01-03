import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  LockClosedIcon,
  KeyIcon,
  FingerPrintIcon,
  ServerStackIcon,
  EyeIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentCheckIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import { CTASection } from '../../components/modules/CTASection';
import { useI18n } from '../../i18n';

export const SecurityPage = () => {
  const { dictionary } = useI18n();
  const t = dictionary.security;

  const securityFeatures = [
    {
      icon: LockClosedIcon,
      title: t.features.encryption.title,
      description: t.features.encryption.description,
    },
    {
      icon: FingerPrintIcon,
      title: t.features.mfa.title,
      description: t.features.mfa.description,
    },
    {
      icon: UserGroupIcon,
      title: t.features.rbac.title,
      description: t.features.rbac.description,
    },
    {
      icon: ServerStackIcon,
      title: t.features.isolation.title,
      description: t.features.isolation.description,
    },
    {
      icon: ClockIcon,
      title: t.features.audit.title,
      description: t.features.audit.description,
    },
    {
      icon: EyeIcon,
      title: t.features.monitoring.title,
      description: t.features.monitoring.description,
    },
  ];

  const complianceItems = [
    { icon: DocumentCheckIcon, title: 'SOC 2 Type II', description: t.compliance.soc2 },
    { icon: GlobeAltIcon, title: 'GDPR', description: t.compliance.gdpr },
    { icon: BuildingOffice2Icon, title: 'ISO 27001', description: t.compliance.iso },
  ];

  const trustItems = [
    t.trust.items[0],
    t.trust.items[1],
    t.trust.items[2],
    t.trust.items[3],
    t.trust.items[4],
    t.trust.items[5],
  ];

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
              <ShieldCheckIcon className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">{t.hero.badge}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight">
              {t.hero.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {t.hero.title.split(' ').slice(-1)}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-6 border-y border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center gap-2 text-sm text-[color:var(--color-text-muted)]"
              >
                <CheckCircleIcon className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t.featuresSection.title}</h2>
            <p className="text-lg text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              {t.featuresSection.description}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[color:var(--color-bg-alt)] p-8 rounded-2xl border border-[color:var(--color-border)] hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative">
                  <div className="inline-flex p-3 rounded-xl bg-accent/10 mb-6 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[color:var(--color-text-muted)] leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-24 px-6 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t.complianceSection.title}</h2>
            <p className="text-lg text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              {t.complianceSection.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {complianceItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center p-8"
              >
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 mb-6">
                  <item.icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-[color:var(--color-text-muted)] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t.enterprise.title}</h2>
              <p className="text-lg text-[color:var(--color-text-muted)] mb-8 leading-relaxed">
                {t.enterprise.description}
              </p>

              <div className="space-y-4">
                {t.enterprise.items.map((item: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                      <CheckCircleIcon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-[color:var(--color-text-muted)]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 rounded-3xl blur-3xl" />
              <div className="relative bg-[color:var(--color-bg-alt)] p-8 sm:p-10 rounded-3xl border border-[color:var(--color-border)]">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <KeyIcon className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{t.enterprise.card.title}</h3>
                    <p className="text-sm text-[color:var(--color-text-muted)]">{t.enterprise.card.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {t.enterprise.card.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 py-3 border-b border-[color:var(--color-border)] last:border-0">
                      <CheckCircleIcon className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
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
