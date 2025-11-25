// import React from 'react';
import { TechCard } from '../ui/TechCard';
import { 
  DocumentTextIcon, 
  GlobeAltIcon, 
  ShieldCheckIcon,
  ChartBarIcon,
  BellIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
  DocumentMagnifyingGlassIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline';
import { useI18n } from '../../i18n';

export const ArchitectureGrid = () => {
  const { t, dictionary } = useI18n();
  const modules = dictionary.home.insights.items;

  return (
    <section className="py-24 px-6 bg-[color:var(--color-bg)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">
            {t('home.insights.title')}
           </h2>
           <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto text-lg">
            {t('home.insights.subtitle')}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-4">
          
          {/* Lease Intelligence (2x2) - Main Feature */}
          <div className="md:col-span-2 md:row-span-2">
            <TechCard
              title="Lease Intelligence"
              description="Two-track rent engine, version control, audit history, and compliance tracking. Full lifecycle management with immutable audit trails."
              icon={<DocumentTextIcon className="w-6 h-6" />}
              className="h-full"
            />
          </div>

          {/* Portfolio Analytics (2x1) */}
          <div className="md:col-span-2 md:row-span-1">
            <TechCard
              title="Portfolio Analytics"
              description="MGR evolution, expiration forecasting, sales projections, and real-time KPIs. Data-driven decision making at scale."
              icon={<ChartBarIcon className="w-6 h-6" />}
              className="h-full"
              delay={100}
            />
          </div>

          {/* AI Assistant (1x1) */}
          <div className="md:col-span-1 md:row-span-1">
            <TechCard
              title={modules[2]?.title || 'AI Assistant'}
              description={modules[2]?.description || 'Natural language queries, document analysis, and predictive insights.'}
              icon={<ShieldCheckIcon className="w-6 h-6" />}
              className="h-full"
              delay={200}
            />
          </div>

          {/* Document Extraction (1x1) */}
          <div className="md:col-span-1 md:row-span-1">
            <TechCard
              title="Document Extraction"
              description="AI-powered PDF extraction. Automatically extract 100+ fields from lease documents with structured data output."
              icon={<DocumentMagnifyingGlassIcon className="w-6 h-6" />}
              className="h-full"
              delay={300}
            />
          </div>

          {/* Dashboard (1x1) */}
          <div className="md:col-span-1 md:row-span-1">
            <TechCard
              title={modules[0]?.title || 'Smart Dashboard'}
              description={modules[0]?.description || 'Visual KPIs, lease expirations, and sales forecasting at a glance.'}
              icon={<ChartBarIcon className="w-6 h-6" />}
              className="h-full"
              delay={400}
            />
          </div>

          {/* Directory (1x1) */}
          <div className="md:col-span-1 md:row-span-1">
            <TechCard
              title="Directory & Contacts"
              description="Unified stakeholder database. Manage landlords, brands, franchisees, and consultants across all locations."
              icon={<GlobeAltIcon className="w-6 h-6" />}
              className="h-full"
              delay={500}
            />
          </div>

          {/* Notifications (1x1) */}
          <div className="md:col-span-1 md:row-span-1">
            <TechCard
              title="Automated Notifications"
              description="Never miss critical dates. Automated alerts for break options, renewals, expirations, and compliance deadlines."
              icon={<BellIcon className="w-6 h-6" />}
              className="h-full"
              delay={600}
            />
          </div>

          {/* Import/Export (1x1) */}
          <div className="md:col-span-1 md:row-span-1">
            <TechCard
              title="Import & Export"
              description="Excel template-based bulk operations. Import hundreds of leases, export reports, and sync with external systems."
              icon={<ArrowDownTrayIcon className="w-6 h-6" />}
              className="h-full"
              delay={700}
            />
          </div>

          {/* Role-Based Access (1x1) */}
          <div className="md:col-span-1 md:row-span-1">
            <TechCard
              title="Role-Based Access"
              description="Admin, Superuser, Editor, Reader roles with scope-based permissions. Institutional-grade security and governance."
              icon={<UserGroupIcon className="w-6 h-6" />}
              className="h-full"
              delay={800}
            />
          </div>

          {/* Budget Forecasting (1x1) */}
          <div className="md:col-span-1 md:row-span-1">
            <TechCard
              title="Budget Forecasting"
              description="ROI, Payback, Break-even, EBITDA calculations. Scenario-based forecasting with worst/mid/best projections."
              icon={<CalculatorIcon className="w-6 h-6" />}
              className="h-full"
              delay={900}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
