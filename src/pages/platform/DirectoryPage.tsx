// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { UsersIcon, BuildingOfficeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export const DirectoryPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
            Directory & Contacts
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Unified stakeholder database. Manage landlords, brands, franchisees, and consultants across all your locations in one centralized system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Landlord Management"
            description="Centralized database of all landlords with contact information, addresses, and relationship mapping to leases."
            icon={<BuildingOfficeIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Brand & Franchisee Directory"
            description="Manage brand relationships and franchisee contacts. Track which brands operate in which locations."
            icon={<BriefcaseIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Consultant Network"
            description="Maintain a directory of consultants, brokers, and advisors. Link them to specific leases and track their involvement."
            icon={<UsersIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

