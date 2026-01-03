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

      {/* Value Pillars */}
      <section id="value-pillars">
        <ValuePillarsSection />
      </section>

      {/* PDF AI Data Extractor */}
      <motion.section
        id="data-extraction"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-16 sm:py-32 px-4 sm:px-6 relative bg-[color:var(--color-bg)]"
      >
        <PDFDataExtractor />
      </motion.section>

      {/* Interactive Lease Overview */}
      <section id="lease-management">
        <InteractiveLeaseOverview />
      </section>

      {/* AI Assistant Demo */}
      <motion.section
        id="ai-assistant"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-16 sm:py-32 px-4 sm:px-6 relative bg-[color:var(--color-bg)]"
      >
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16 space-y-4">
          <h2 className="text-2xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">
            {dictionary.home.insights.items[2]?.title || "AI Assistant"}
          </h2>
          <p className="text-base md:text-xl text-[color:var(--color-text-muted)]">
            {dictionary.home.insights.items[2]?.description || "Chat with your portfolio using natural language and document analysis."}
          </p>
        </div>
        <AIConsole />
      </motion.section>

      {/* Notifications */}
      <section id="notifications" className="py-16 sm:py-32 px-4 sm:px-6 relative bg-[color:var(--color-bg-alt)]">
        <NotificationsSection />
      </section>

      {/* Platform Modules Overview */}
      <section id="modules">
        <ArchitectureGrid />
      </section>

      {/* Partners - bg-alt */}
      <PartnersSection
        title={t('home.partnersPreview.title')}
        logos={dictionary.home.partnersPreview.logos}
      />

      {/* CTA */}
      <CTASection
        title={dictionary.home.cta.title}
        primaryCta={dictionary.home.cta.primaryCta}
        secondaryCta={dictionary.home.cta.secondaryCta}
      />

    </main>
  );
};
