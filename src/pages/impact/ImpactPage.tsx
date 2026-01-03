import { TestimonialsSection } from '../../components/modules/TestimonialsSection';
import { CaseStudyCard } from '../../components/modules/CaseStudyCard';
import { useI18n } from '../../i18n';

export const ImpactPage = () => {
  const { dictionary } = useI18n();
  const impact = dictionary.impact;
  const caseStudies = dictionary.landing?.clients?.caseStudies || [];

  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* Case Studies Section */}
      <section className="py-24 px-6 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)]">
              Real Results
            </p>
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
              Measurable Impact
            </h2>
            <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
              See how organizations transformed their lease management operations with Controlease.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {caseStudies.map((study: any, index: number) => (
              <CaseStudyCard key={study.company} caseStudy={study} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection {...impact} />
    </main>
  );
};

