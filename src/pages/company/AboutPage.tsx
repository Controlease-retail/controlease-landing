import { motion } from 'framer-motion';
import { TechCard } from '../../components/ui/TechCard';
import { Timeline } from '../../components/company/Timeline';
import { TeamGrid } from '../../components/company/TeamGrid';
import { CTASection } from '../../components/modules/CTASection';
import { FlagIcon, LightBulbIcon, HeartIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export const AboutPage = () => {
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
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-[color:var(--color-primary)]/30 bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)] text-sm font-semibold tracking-wide uppercase">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
              Revolutionizing Retail<br />Lease Management
            </h1>
            <p className="text-xl md:text-2xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">
              We're on a mission to bring transparency, automation, and intelligence to the global real estate portfolios of tomorrow.
            </p>
          </motion.div>
        </div>

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl mix-blend-screen animate-pulse delay-1000" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Leases Managed', value: '150k+' },
            { label: 'Countries', value: '30+' },
            { label: 'Asset Value', value: '$12B+' },
            { label: 'Team Members', value: '85+' },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold text-[color:var(--color-text)] mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-[color:var(--color-text-muted)] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              The principles that guide our product decisions and company culture.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TechCard
              title="Transparency First"
              description="We believe data should be accessible and clear. No hidden fees, no black boxes."
              icon={<FlagIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Innovation"
              description="We challenge the status quo of legacy real estate software with AI and modern UX."
              icon={<LightBulbIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Customer Obsession"
              description="We build what our customers need, not just what's cool. Your success is our success."
              icon={<HeartIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Global Mindset"
              description="Built for multi-currency, multi-language, and cross-border operations from day one."
              icon={<GlobeAltIcon className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          </div>
          <Timeline
            items={[
              { year: '2022', title: 'The Beginning', description: 'Controlease was founded by a team of real estate veterans and software engineers frustrated by spreadsheet chaos.' },
              { year: '2023', title: 'Seed Funding', description: 'Raised $4M to build the core platform and expand the engineering team.' },
              { year: '2023', title: 'First Enterprise Customer', description: 'Launched pilot program with a global retail brand managing 500+ locations.' },
              { year: '2024', title: 'Series A', description: 'Secured $12M to accelerate AI development and expand into the European market.' },
              { year: '2025', title: 'Global Expansion', description: 'Now serving customers in 30+ countries with a team of 85+ people.' },
              // Future developments
              {
                year: 'Future',
                title: 'International Expansion & Interteam Ecosystem',
                description: 'We plan to open regional hubs to provide 24/7 support and local market expertise, alongside launching a unified collaboration layer connecting legal, finance, and expansion teams in real-time.'
              },
            ]}
          />
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Leadership</h2>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              The experts building the future of lease operations.
            </p>
          </div>
          <TeamGrid
            members={[
              {
                name: 'Fernando Sanfeliz Martin',
                role: 'CEO & Co-Founder',
                bio: 'Visionary leader with a deep understanding of enterprise management systems. Driving the mission to revolutionize lease operations globally.',
                image: '/founders/CEO.png',
                linkedin: 'https://www.linkedin.com/in/fernando-sanfeliz-martin'
              },
              {
                name: 'Gonzalo Alessandrelli',
                role: 'CTO & Co-Founder',
                bio: 'Technology strategist and architect. Leading the engineering team to build scalable, AI-powered solutions for the real estate industry.',
                image: '/founders/CTO.png',
                linkedin: 'https://www.linkedin.com/in/gonzalo-alessandrelli'
              },
              {
                name: 'Elisa Perez Montenegro',
                role: 'COO & Co-Founder',
                bio: 'Operational excellence expert. Ensuring seamless execution and customer success across all markets.',
                image: '/founders/COO.png',
                linkedin: 'https://www.linkedin.com/in/elisa-perez-montenegro'
              },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to join the revolution?"
        description="See how Controlease can transform your portfolio operations today."
        primaryCta="View Careers"
        secondaryCta="Contact Sales"
        primaryHref="/company/careers"
        secondaryHref="/contact"
      />
    </main>
  );
};
