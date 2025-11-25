// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { BuildingStorefrontIcon, GlobeAltIcon, UsersIcon } from '@heroicons/react/24/outline';

export const RetailPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            Retail Solutions
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Multi-location scalability for retail portfolios. Manage hundreds of stores across multiple countries with a single unified platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Multi-Location Management"
            description="Handle complex retail portfolios with stores across different countries, currencies, and legal frameworks. All in one place."
            icon={<BuildingStorefrontIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Global Directory"
            description="Unified contact management for landlords, franchisees, brands, and consultants across all your locations."
            icon={<GlobeAltIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Scalable Architecture"
            description="Built to handle enterprise-scale portfolios. From 10 stores to 10,000, the platform scales with your business."
            icon={<UsersIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

