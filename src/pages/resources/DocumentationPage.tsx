// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { BookOpenIcon, AcademicCapIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const DocumentationPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            Documentation
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Complete guides and tutorials to help you get the most out of Controlease. From getting started to advanced features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Getting Started"
            description="Quick start guides for new users. Learn how to import leases, set up your portfolio, and configure your workspace."
            icon={<BookOpenIcon className="w-6 h-6" />}
          />
          <TechCard
            title="User Guides"
            description="Comprehensive documentation for all platform features. Step-by-step instructions for every module and workflow."
            icon={<AcademicCapIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Best Practices"
            description="Learn from our experts. Best practices for lease management, data organization, and portfolio optimization."
            icon={<LightBulbIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

