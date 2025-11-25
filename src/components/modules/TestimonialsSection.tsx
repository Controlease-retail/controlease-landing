import { motion } from 'framer-motion';

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type TestimonialsSectionProps = {
  title: string;
  subtitle: string;
  items: ReadonlyArray<Testimonial>;
};

export const TestimonialsSection = ({ title, subtitle, items }: TestimonialsSectionProps) => (
  <section id="impact" className="bg-surface px-6 py-16">
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-xs uppercase tracking-widest text-text-muted">{subtitle}</p>
      <h2 className="mt-2 text-3xl font-semibold text-text">{title}</h2>
    </div>
    <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2">
      {items.map((testimonial) => (
        <motion.blockquote
          key={testimonial.author}
          className="rounded-3xl border border-divider/70 bg-bg-alt/60 p-6 text-left text-text shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg leading-relaxed">“{testimonial.quote}”</p>
          <footer className="mt-4 text-sm font-semibold text-text">
            {testimonial.author}
            <span className="ml-2 font-normal text-text-muted">• {testimonial.role}</span>
          </footer>
        </motion.blockquote>
      ))}
    </div>
  </section>
);

