import { useI18n } from '../../i18n';

export const TermsPage = () => {
  const { dictionary } = useI18n();
  const t = dictionary.legal.terms;
  const s = t.sections;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-[var(--color-text-muted)] mb-8">{dictionary.legal.lastUpdated}: 2025-01-01</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.agreement.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.agreement.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.intellectual.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.intellectual.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.userRep.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              {s.userRep.content}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
              {s.userRep.items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.prohibited.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.prohibited.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.termination.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.termination.content}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
