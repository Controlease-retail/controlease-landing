// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { ShieldCheckIcon, DocumentCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export const CompliancePage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            Compliance Solutions
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            ISO/IFRS Standards and Regulatory Compliance. Stay ahead of regulations with automated tracking and validation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="IFRS 16 Compliance"
            description="Automated lease accounting standards compliance. Track right-of-use assets and lease liabilities according to IFRS 16 requirements."
            icon={<DocumentCheckIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Insurance Tracking"
            description="Never miss an insurance renewal. Automated alerts and document management for all insurance policies across your portfolio."
            icon={<ShieldCheckIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Critical Date Management"
            description="Automated alerts for break options, renewals, and regulatory deadlines. Stay compliant with zero manual tracking."
            icon={<ClockIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

