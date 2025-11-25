// import React from 'react';
import { useI18n } from '../../i18n';

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
};

export const CTASection = ({ 
  title,
  description,
  primaryCta,
  secondaryCta
}: CTASectionProps) => {
  const { t } = useI18n();
  
  const finalTitle = title || t('contact.title');
  const finalDescription = description || t('contact.description');
  const finalPrimaryCta = primaryCta || t('contact.primaryCta');
  const finalSecondaryCta = secondaryCta || t('contact.secondaryCta');

  return (
    <section id="contact" className="px-6 py-24 bg-[color:var(--color-bg)]">
      <div className="mx-auto max-w-5xl rounded-3xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass)] p-12 text-center shadow-lg relative overflow-hidden group backdrop-blur-md">
      
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none" />

        <h2 className="text-4xl md:text-5xl font-bold text-[color:var(--color-text)] relative z-10 tracking-tight mb-6">
          {finalTitle}
        </h2>
        <p className="text-xl text-[color:var(--color-text-muted)] relative z-10 max-w-2xl mx-auto mb-10">
          {finalDescription}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <button className="px-8 py-4 bg-primary hover:bg-primary-light text-inverted-text rounded-lg font-bold transition-all shadow-lg">
            {finalPrimaryCta}
          </button>
          <button className="px-8 py-4 border border-[color:var(--color-border)] text-[color:var(--color-text)] rounded-lg font-semibold hover:bg-[color:var(--color-hover)] transition-colors">
            {finalSecondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
};
