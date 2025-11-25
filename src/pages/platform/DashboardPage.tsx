// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { ChartBarIcon, CalendarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            Portfolio Dashboard
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Executive visibility into your entire lease portfolio. Real-time KPIs, expiration forecasting, and strategic insights at a glance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="MGR Evolution"
            description="Track minimum guaranteed rent and discount evolution over time. Visualize trends and forecast future performance with interactive charts."
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Expiration Forecasting"
            description="See all lease expirations at a glance. Plan renewals and terminations with advanced warning and strategic insights."
            icon={<CalendarIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Next Events"
            description="Automated tracking of critical dates: break options, step rents, discounts, IPC updates, and lease endings."
            icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

