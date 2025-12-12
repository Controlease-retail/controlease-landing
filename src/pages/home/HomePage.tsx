// import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../../components/home/HeroSection';
import { ValuePillarsSection } from '../../components/home/ValuePillarsSection';
import { AIConsole } from '../../components/home/AIConsole';
import { PDFDataExtractor } from '../../components/home/PDFDataExtractor';
import { ArchitectureGrid } from '../../components/sections/ArchitectureGrid';
import { PartnersSection } from '../../components/home/PartnersSection';
import { CTASection } from '../../components/modules/CTASection';
import { useI18n } from '../../i18n';
import { NotificationsSection } from '../../components/home/NotificationsSection';
import { InteractiveLeaseOverview } from '../../components/home/InteractiveLeaseOverview';

export const HomePage = () => {
  const { t, dictionary } = useI18n();

  return (
    <main className="relative min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)] overflow-x-hidden">
      
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Value Pillars */}
      <ValuePillarsSection />

      {/* New Section: PDF AI Data Extractor */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-32 px-6 relative bg-[color:var(--color-bg)]"
      >
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">
            PDF AI Data Extractor
          </h2>
          <p className="text-xl text-[color:var(--color-text-muted)]">
            Automate data extraction from complex PDF documents with AI-powered accuracy.
          </p>
        </div>
        <PDFDataExtractor />
      </motion.section>

      {/* New Section: Interactive Lease Overview */}
      <InteractiveLeaseOverview />

      {/* 3. AI Assistant Demo */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-32 px-6 relative border-y border-[color:var(--color-divider)] bg-[color:var(--color-bg-alt)]"
      >
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">
            {dictionary.home.insights.items[2]?.title || "AI Assistant"}
          </h2>
          <p className="text-xl text-[color:var(--color-text-muted)]">
            {dictionary.home.insights.items[2]?.description || "Chat with your portfolio using natural language and document analysis."}
          </p>
        </div>
        <AIConsole />
      </motion.section>

      {/* New Section: Notifications */}
      <section className="py-32 px-6 relative border-y border-[color:var(--color-divider)] bg-[color:var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">
            Automated Notifications
          </h2>
          <p className="text-xl text-[color:var(--color-text-muted)]">
            Stay ahead with intelligent alerts for critical lease events.
          </p>
        </div>
        <NotificationsSection />
      </section>

      {/* 4. Platform Modules */}
      <ArchitectureGrid />

      {/* 5. Partners */}
      <PartnersSection 
        title={t('home.partnersPreview.title')} 
        logos={dictionary.home.partnersPreview.logos} 
      />

      {/* 7. CTA */}
      <CTASection 
        title="Ready to modernize your lease operations?"
        primaryCta="Start for free"
        secondaryCta="Contact us"
      />
      
    </main>
  );
};
