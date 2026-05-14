type LegalSection = {
  readonly title: string;
  readonly content?: string;
  readonly items?: readonly string[];
  readonly extra?: string;
  readonly subsections?: readonly LegalSection[];
};

type LegalPageLayoutProps = {
  title: string;
  date: string;
  lastUpdatedLabel: string;
  sections: readonly LegalSection[];
};

const RenderSection = ({ section, depth = 0 }: { section: LegalSection; depth?: number }) => {
  const HeadingTag = depth === 0 ? 'h2' : 'h3';
  const headingClass = depth === 0
    ? 'text-2xl font-semibold mb-4'
    : 'text-xl font-semibold mb-3 mt-6';

  return (
    <section>
      <HeadingTag className={headingClass}>{section.title}</HeadingTag>
      {section.content && (
        <p className="text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line">
          {section.content}
        </p>
      )}
      {section.items && (
        <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)] mt-4">
          {section.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
      {section.extra && (
        <p className="text-[var(--color-text-muted)] leading-relaxed mt-4 whitespace-pre-line">
          {section.extra}
        </p>
      )}
      {section.subsections?.map((sub, idx) => (
        <RenderSection key={idx} section={sub} depth={depth + 1} />
      ))}
    </section>
  );
};

export const LegalPageLayout = ({ title, date, lastUpdatedLabel, sections }: LegalPageLayoutProps) => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-[var(--color-text-muted)] mb-8">{lastUpdatedLabel}: {date}</p>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          {sections.map((section, idx) => (
            <RenderSection key={idx} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
};
