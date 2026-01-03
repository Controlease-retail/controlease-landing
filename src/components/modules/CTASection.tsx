// import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';

type CTASectionProps = {
  title?: string;
  description?: string;
  primaryCta?: string;
  secondaryCta?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export const CTASection = ({ 
  title,
  description,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref
}: CTASectionProps) => {
  const { t } = useI18n();
  
  const finalTitle = title || t('contact.title');
  const finalDescription = description || t('contact.description');
  const finalPrimaryCta = primaryCta || t('contact.primaryCta');
  const finalSecondaryCta = secondaryCta || t('contact.secondaryCta');

  const PrimaryButton = () => (
    <button className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-light text-white rounded-lg font-bold transition-all shadow-lg">
      {finalPrimaryCta}
    </button>
  );

  const SecondaryButton = () => (
    <button className="w-full sm:w-auto px-8 py-4 border border-[color:var(--color-border)] text-[color:var(--color-text)] rounded-lg font-semibold hover:bg-[color:var(--color-hover)] transition-colors">
      {finalSecondaryCta}
    </button>
  );

  const renderLink = (href: string, children: React.ReactNode) => {
    if (href.startsWith('http') || href.startsWith('mailto:')) {
      return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? "noopener noreferrer" : undefined}>{children}</a>;
    }
    return <Link to={href}>{children}</Link>;
  };

  return (
    <section id="contact" className="px-4 sm:px-6 py-16 sm:py-24 bg-[color:var(--color-bg)]">
      <div className="mx-auto max-w-5xl rounded-3xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-glass)] p-6 sm:p-8 md:p-12 text-center shadow-lg relative overflow-hidden group backdrop-blur-md">
      
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-colors duration-700 pointer-events-none" />

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[color:var(--color-text)] relative z-10 tracking-tight mb-4 sm:mb-6">
          {finalTitle}
        </h2>
        <p className="text-base sm:text-xl text-[color:var(--color-text-muted)] relative z-10 max-w-2xl mx-auto mb-6 sm:mb-10">
          {finalDescription}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          {primaryHref ? (
            renderLink(primaryHref, <PrimaryButton />)
          ) : (
            <PrimaryButton />
          )}
          
          {secondaryHref ? (
            renderLink(secondaryHref, <SecondaryButton />)
          ) : (
            <SecondaryButton />
          )}
        </div>
      </div>
    </section>
  );
};
