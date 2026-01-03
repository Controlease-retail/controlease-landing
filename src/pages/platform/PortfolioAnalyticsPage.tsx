// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { ChartBarIcon, ArrowTrendingUpIcon, CalendarIcon } from '@heroicons/react/24/outline';

export const PortfolioAnalyticsPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
            Portfolio Analytics
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            MGR Evolution, Expirations, and Real-Time Forecasting. Make data-driven decisions with comprehensive portfolio insights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="MGR Evolution"
            description="Track minimum guaranteed rent and discount evolution over time. Visualize trends and forecast future performance."
            icon={<ChartBarIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Expiration Forecasting"
            description="See all lease expirations at a glance. Plan renewals and terminations with advanced warning and strategic insights."
            icon={<CalendarIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Sales Projections"
            description="Forecast variable rent based on sales data. Optimize portfolio performance with predictive analytics."
            icon={<ArrowTrendingUpIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

