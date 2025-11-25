type Pointer = {
  title: string;
  description: string;
  stat: string;
};

type PointersSectionProps = {
  title: string;
  subtitle: string;
  items: ReadonlyArray<Pointer>;
};

export const PointersSection = ({ title, subtitle, items }: PointersSectionProps) => (
  <section className="bg-surface px-6 py-16">
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-xs uppercase tracking-widest text-text-muted">{subtitle}</p>
      <h2 className="mt-2 text-3xl font-semibold text-text">{title}</h2>
    </div>
    <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
      {items.map((pointer) => (
        <article
          key={pointer.title}
          className="rounded-3xl border border-divider/70 bg-bg-alt/60 p-6 text-left shadow-lg transition hover:-translate-y-1"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{pointer.stat}</p>
          <h3 className="mt-2 text-xl font-semibold text-text">{pointer.title}</h3>
          <p className="mt-2 text-sm text-text-muted">{pointer.description}</p>
        </article>
      ))}
    </div>
  </section>
);

