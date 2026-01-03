import { useI18n } from '../../i18n';

export const PrivacyPage = () => {
  const { dictionary } = useI18n();
  const t = dictionary.legal.privacy;
  const s = t.sections;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-[var(--color-text-muted)] mb-8">{dictionary.legal.lastUpdated}: 2025-01-01</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.intro.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.intro.content}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.collection.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              {s.collection.content}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
              <li><strong>{s.collection.items.personal.label}:</strong> {s.collection.items.personal.content}</li>
              <li><strong>{s.collection.items.derivative.label}:</strong> {s.collection.items.derivative.content}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.use.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.use.content}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)] mt-4">
              {s.use.items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.disclosure.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.disclosure.content}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)] mt-4">
              <li><strong>{s.disclosure.items.law.label}:</strong> {s.disclosure.items.law.content}</li>
              <li><strong>{s.disclosure.items.thirdParty.label}:</strong> {s.disclosure.items.thirdParty.content}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">{s.contact.title}</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {s.contact.content}
              <br /><br />
              Controlease Inc.<br />
              privacy@controlease.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
