// import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { ValuePillarsSection } from '../../components/home/ValuePillarsSection';
import { AIConsole } from '../../components/home/AIConsole';
import { ArchitectureGrid } from '../../components/sections/ArchitectureGrid';
import { PartnersSection } from '../../components/home/PartnersSection';
import { CTASection } from '../../components/modules/CTASection';
import { useI18n } from '../../i18n';

export const HomePage = () => {
  const { t, dictionary } = useI18n();

  return (
    <main className="relative min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] overflow-x-hidden">
      
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Value Pillars */}
      <ValuePillarsSection />

      {/* 3. AI Assistant Demo */}
      <section className="py-32 px-6 relative border-y border-[color:var(--color-divider)] bg-[color:var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">
            {dictionary.home.insights.items[2]?.title || "AI Assistant"}
          </h2>
          <p className="text-xl text-[color:var(--color-text-muted)]">
            {dictionary.home.insights.items[2]?.description || "Chat with your portfolio using natural language and document analysis."}
          </p>
        </div>
        <AIConsole />
      </section>

      {/* 4. Platform Modules */}
      <ArchitectureGrid />

      {/* 5. Partners */}
      <PartnersSection 
        title={t('home.partnersPreview.title')} 
        logos={dictionary.home.partnersPreview.logos} 
      />

      {/* 7. CTA */}
      <CTASection />
      
    </main>
  );
};
