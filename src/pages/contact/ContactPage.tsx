import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactForm } from '../../components/modules/ContactForm';
import { TechCard } from '../../components/ui/TechCard';
import { ClockIcon, PhoneIcon, BuildingOfficeIcon, CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { useI18n } from '../../i18n';

export const ContactPage = () => {
  const { dictionary } = useI18n();
  const t = dictionary.contactPage;

  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleFormSubmit = () => {
    setFormStatus('success');
    setTimeout(() => setFormStatus('idle'), 5000);
  };

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
              <EnvelopeIcon className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent">{t.hero.badge}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-lg sm:text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-6 py-16 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[color:var(--color-surface)] rounded-2xl border border-[color:var(--color-border)] p-8 shadow-xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[color:var(--color-text)] mb-2">
                {t.form.title}
              </h2>
              <p className="text-[color:var(--color-text-muted)]">
                {t.form.description}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
                    <CheckCircleIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--color-text)] mb-2">{t.form.success.title}</h3>
                  <p className="text-[color:var(--color-text-muted)]">
                    {t.form.success.description}
                  </p>
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-accent font-medium hover:underline"
                  >
                    {t.form.success.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <ContactForm onSubmit={handleFormSubmit} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Support Tiers */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[color:var(--color-text)] mb-4">
              {t.support.title}
            </h2>
            <p className="text-[color:var(--color-text-muted)]">
              {t.support.description}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TechCard
              title={t.support.basic.title}
              description={t.support.basic.description}
              icon={<ClockIcon className="w-6 h-6" />}
            />
            <TechCard
              title={t.support.professional.title}
              description={t.support.professional.description}
              icon={<PhoneIcon className="w-6 h-6" />}
            />
            <TechCard
              title={t.support.enterprise.title}
              description={t.support.enterprise.description}
              icon={<BuildingOfficeIcon className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[color:var(--color-text)] mb-4">
              {t.offices.title}
            </h2>
          </div>
          <div className="grid max-w-4xl mx-auto gap-6 md:grid-cols-2">
            {[
              { name: t.offices.globalHq, email: 'contact@controlease.com', phone: '+1 (555) 123-4567', loc: 'New York, USA' },
              { name: t.offices.europeanHub, email: 'eu-support@controlease.com', phone: '+44 20 7123 4567', loc: 'London, UK' }
            ].map((office) => (
              <article key={office.name} className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-lg hover:border-accent/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[color:var(--color-text)]">{office.name}</h3>
                  <StatusBadge status="neutral">{office.loc}</StatusBadge>
                </div>
                <p className="text-sm text-[color:var(--color-text-muted)] mb-2 flex items-center gap-2">
                  <span className="font-semibold">Email:</span> {office.email}
                </p>
                <p className="text-sm text-[color:var(--color-text-muted)] flex items-center gap-2">
                  <span className="font-semibold">Phone:</span> {office.phone}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
