import { motion } from 'framer-motion';
import { TechCard } from '../../components/ui/TechCard';
import { Timeline } from '../../components/company/Timeline';
import { TeamGrid } from '../../components/company/TeamGrid';
import { CTASection } from '../../components/modules/CTASection';
import { FlagIcon, LightBulbIcon, HeartIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useI18n } from '../../i18n';

export const AboutPage = () => {
  const { dictionary } = useI18n();
  const t = dictionary.about;

  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[color:var(--color-border)] bg-accent/10 text-accent text-sm font-semibold tracking-wide uppercase">
              {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </motion.div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: t.stats.leasesManaged, value: '150k+' },
            { label: t.stats.countries, value: '30+' },
            { label: t.stats.assetValue, value: '$12B+' },
            { label: t.stats.teamMembers, value: '85+' },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-[color:var(--color-text-muted)] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.values.title}</h2>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              {t.values.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechCard
              title={t.values.transparency.title}
              description={t.values.transparency.description}
              icon={<FlagIcon className="w-6 h-6" />}
            />
            <TechCard
              title={t.values.innovation.title}
              description={t.values.innovation.description}
              icon={<LightBulbIcon className="w-6 h-6" />}
            />
            <TechCard
              title={t.values.customer.title}
              description={t.values.customer.description}
              icon={<HeartIcon className="w-6 h-6" />}
            />
            <TechCard
              title={t.values.global.title}
              description={t.values.global.description}
              icon={<GlobeAltIcon className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.journey.title}</h2>
          </div>
          <Timeline
            items={[
              { year: '2022', title: t.journey.milestones.beginning.title, description: t.journey.milestones.beginning.description },
              { year: '2023', title: t.journey.milestones.seed.title, description: t.journey.milestones.seed.description },
              { year: '2023', title: t.journey.milestones.firstCustomer.title, description: t.journey.milestones.firstCustomer.description },
              { year: '2024', title: t.journey.milestones.seriesA.title, description: t.journey.milestones.seriesA.description },
              { year: '2025', title: t.journey.milestones.expansion.title, description: t.journey.milestones.expansion.description },
              { year: 'Future', title: t.journey.milestones.future.title, description: t.journey.milestones.future.description },
            ]}
          />
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.team.title}</h2>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              {t.team.description}
            </p>
          </div>
          <TeamGrid
            members={[
              {
                name: 'Fernando Sanfeliz Martin',
                role: t.team.ceo.role,
                bio: t.team.ceo.bio,
                image: '/founders/CEO.png',
                linkedin: 'https://www.linkedin.com/in/fernando-sanfeliz-martin'
              },
              {
                name: 'Gonzalo Alessandrelli',
                role: t.team.cto.role,
                bio: t.team.cto.bio,
                image: '/founders/CTO.png',
                linkedin: 'https://www.linkedin.com/in/gonzalo-alessandrelli'
              },
              {
                name: 'Elisa Perez Montenegro',
                role: t.team.coo.role,
                bio: t.team.coo.bio,
                image: '/founders/COO.png',
                linkedin: 'https://www.linkedin.com/in/elisa-perez-montenegro'
              },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={t.cta.title}
        description={t.cta.description}
        primaryCta={t.cta.primaryCta}
        secondaryCta={t.cta.secondaryCta}
        primaryHref="/company/careers"
        secondaryHref="/contact"
      />
    </main>
  );
};
