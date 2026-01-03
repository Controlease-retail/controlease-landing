import { useI18n } from '../../i18n';

export const SecurityPage = () => {
  const { dictionary } = useI18n();
  const t = dictionary.legal.securityPage;
  const s = t.sections;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-[var(--color-text-muted)] mb-8">{dictionary.legal.lastUpdated}: 2025-01-01</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.commitment.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.commitment.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.dataProtection.title}</h2>
            <div className="space-y-4">
              <div className="bg-[var(--color-bg-alt)] p-6 rounded-xl border border-[var(--color-border)]">
                <h3 className="font-semibold text-lg mb-2">{s.dataProtection.encryption.title}</h3>
                <p className="text-[var(--color-text-muted)]">
                  {s.dataProtection.encryption.content}
                </p>
              </div>
              <div className="bg-[var(--color-bg-alt)] p-6 rounded-xl border border-[var(--color-border)]">
                <h3 className="font-semibold text-lg mb-2">{s.dataProtection.isolation.title}</h3>
                <p className="text-[var(--color-text-muted)]">
                  {s.dataProtection.isolation.content}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.infrastructure.title}</h2>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
              <li><strong>{s.infrastructure.items.cloud.label}:</strong> {s.infrastructure.items.cloud.content}</li>
              <li><strong>{s.infrastructure.items.network.label}:</strong> {s.infrastructure.items.network.content}</li>
              <li><strong>{s.infrastructure.items.monitoring.label}:</strong> {s.infrastructure.items.monitoring.content}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.compliance.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.compliance.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.accessControl.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.accessControl.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.reporting.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.reporting.content}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
