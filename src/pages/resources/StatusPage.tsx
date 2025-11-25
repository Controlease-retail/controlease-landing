// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export const StatusPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            System Status
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Real-time status of Controlease services. Monitor platform availability, API performance, and scheduled maintenance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Platform Status"
            description="All systems operational. 99.9% uptime SLA with real-time monitoring and automated failover."
            icon={<CheckCircleIcon className="w-6 h-6" />}
          />
          <TechCard
            title="API Performance"
            description="Average response time: 120ms. All endpoints responding normally with <1% error rate."
            icon={<InformationCircleIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Maintenance Schedule"
            description="Planned maintenance windows are announced 48 hours in advance. No scheduled maintenance currently."
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

