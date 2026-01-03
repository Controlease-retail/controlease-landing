// import React from 'react';
import { AIConsole } from '../../components/home/AIConsole';
import { TechCard } from '../../components/ui/TechCard';
import { ChatBubbleLeftRightIcon, DocumentMagnifyingGlassIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export const AIAssistantPage = () => {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
            AI Assistant
          </h1>
          <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
            Your Strategic AI Copilot. Interrogate your lease portfolio using natural language. Extract insights, analyze documents, and get instant answers.
          </p>
        </div>

        <div className="mb-16">
          <AIConsole />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <TechCard
            title="Natural Language Queries"
            description="Ask questions in plain English. 'Show me all leases expiring in Q4' or 'Which stores have the highest rent per square meter?'"
            icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Document Analysis"
            description="Upload lease documents and let AI extract key terms, dates, and clauses automatically. No manual data entry required."
            icon={<DocumentMagnifyingGlassIcon className="w-6 h-6" />}
          />
          <TechCard
            title="Predictive Insights"
            description="Get AI-powered recommendations for renewals, optimizations, and risk management based on your portfolio data."
            icon={<LightBulbIcon className="w-6 h-6" />}
          />
        </div>
      </div>
    </main>
  );
};

