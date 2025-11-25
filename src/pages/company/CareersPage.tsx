// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { BriefcaseIcon, HeartIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

export const CareersPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            Careers
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Join us in building the next generation of lease management software. We're looking for passionate people who want to transform an industry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Open Positions"
            description="We're hiring across engineering, product, sales, and customer success. Check our job board for current openings."
            icon={<BriefcaseIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Our Culture"
            description="Fast-paced, mission-driven, and collaborative. We value innovation, ownership, and making a real impact."
            icon={<HeartIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Why Join Us"
            description="Work on cutting-edge AI technology, solve real problems for enterprise customers, and shape the future of retail real estate."
            icon={<RocketLaunchIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

