import { motion } from 'framer-motion';
import { JobBoard } from '../../components/company/JobBoard';
import { TechCard } from '../../components/ui/TechCard';
import { CTASection } from '../../components/modules/CTASection';
import { 
  SparklesIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  HomeIcon, 
  CurrencyDollarIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline';

export const CareersPage = () => {
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
              We're Hiring
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
              Build the Future of<br />PropTech
            </h1>
            <p className="text-xl md:text-2xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto leading-relaxed">
              Join a team of builders, dreamers, and doers. We're transforming how the world manages real estate assets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image Grid / Culture */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                alt="Team collaboration" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-xl">Collaborative by Design</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400" 
                alt="Office culture" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="rounded-2xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400" 
                alt="Remote work" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="col-span-2 rounded-2xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800" 
                alt="Team event" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-bold text-xl">Work Hard, Play Hard</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Controlease?</h2>
            <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto">
              We take care of our people so they can take care of our customers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TechCard
              title="Remote-First"
              description="Work from anywhere. We believe in output, not hours in a chair. We have team members across 12 timezones."
              icon={<HomeIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Competitive Equity"
              description="Every employee is an owner. We offer generous stock option packages because we're building this together."
              icon={<CurrencyDollarIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Comprehensive Health"
              description="Top-tier medical, dental, and vision coverage for you and your dependents. Mental health support included."
              icon={<HeartIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Continuous Learning"
              description="$1,000 annual stipend for conferences, courses, and books. We want you to keep growing."
              icon={<AcademicCapIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Team Retreats"
              description="Twice a year, we fly the whole team to an amazing location to bond, plan, and celebrate."
              icon={<UserGroupIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Latest Gear"
              description="MacBook Pro, 4K monitors, and whatever else you need to be productive. Your home office is covered."
              icon={<SparklesIcon className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Job Board */}
      <section className="py-24 px-6" id="openings">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-[color:var(--color-text-muted)]">
              Find your next role and help us shape the industry.
            </p>
          </div>
          <JobBoard />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Don't see the right role?"
        description="We're always looking for talent. Send us your resume and we'll keep you in mind for future openings."
        primaryCta="Email Us"
        secondaryCta="Follow on LinkedIn"
        primaryHref="mailto:careers@controlease.com"
        secondaryHref="https://linkedin.com"
      />
    </main>
  );
};
