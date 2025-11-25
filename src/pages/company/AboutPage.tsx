// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { LightBulbIcon, FlagIcon, UsersIcon } from '@heroicons/react/24/outline';

export const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            About Us
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            We're building the future of lease portfolio management. Our mission is to eliminate the fragmentation and complexity that plagues retail real estate operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Our Mission"
            description="To unify the entire lease lifecycle into a single, intelligent platform that empowers retail organizations to make data-driven decisions."
            icon={<FlagIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Our Vision"
            description="A world where lease management is seamless, automated, and intelligent. Where compliance is automatic and insights are instant."
            icon={<LightBulbIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Our Team"
            description="Built by experts in retail real estate, enterprise software, and AI. We understand the challenges because we've lived them."
            icon={<UsersIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

