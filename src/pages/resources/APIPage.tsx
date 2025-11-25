// import React from 'react';
import { TechCard } from '../../components/ui/TechCard';
import { CodeBracketIcon, KeyIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';

export const APIPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[color:var(--color-text)]">
            API Reference
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Developer documentation for integrating Controlease with your systems. RESTful API with comprehensive endpoints for all platform features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Authentication"
            description="Secure API access with OAuth 2.0 and API keys. Learn how to authenticate and manage your API credentials."
            icon={<KeyIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Endpoints"
            description="Complete reference for all API endpoints. CRUD operations for leases, directory, analytics, and more."
            icon={<CodeBracketIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Integrations"
            description="Webhooks, webhooks, and SDKs. Connect Controlease with your existing systems and workflows."
            icon={<PuzzlePieceIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

