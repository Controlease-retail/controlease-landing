// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { DocumentTextIcon, ClockIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export const LeaseIntelligencePage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            Lease Intelligence
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            The Two-Track Rent Engine & Complete Audit System. Manage structural and payable rent calculations with full version history and compliance tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Two-Track Rent Calculation"
            description="Separate structural rent (permanent base) from payable rent (cash flow). Handles IPC adjustments, step rents, discounts, and free periods with precision."
            icon={<DocumentTextIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Version History"
            description="Track every change to your leases with full audit trails. Revert to any previous version and see exactly what changed, when, and by whom."
            icon={<ClockIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Compliance Tracking"
            description="Never miss critical dates. Automated alerts for break options, renewals, insurance expiries, and regulatory deadlines."
            icon={<ShieldCheckIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

