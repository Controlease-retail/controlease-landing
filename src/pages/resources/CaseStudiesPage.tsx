// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { ChartBarIcon, BuildingOfficeIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export const CaseStudiesPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            Case Studies
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Real success stories from companies using Controlease. See how organizations transformed their lease management operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Meridian Global"
            description="32% faster lease renewals using automated workflows. Reduced manual processing time by 60% across 200+ locations."
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Northwind College"
            description="$1.2M recovered in missed indexation adjustments. Automated IPC tracking identified previously overlooked rent increases."
            icon={<BuildingOfficeIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Atlas Polytechnic"
            description="100% audit compliance across 12 countries. Centralized platform enabled seamless multi-jurisdiction management."
            icon={<GlobeAltIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

