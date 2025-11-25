import { motion } from 'framer-motion';

type CaseStudy = {
  company: string;
  metric: string;
  description: string;
  tag: string;
};

type CaseStudyCardProps = {
  caseStudy: CaseStudy;
  delay?: number;
};

export const CaseStudyCard = ({ caseStudy, delay = 0 }: CaseStudyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-lg"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-[color:var(--color-text)]">{caseStudy.company}</h3>
        <span className="inline-flex rounded-full bg-[color:var(--color-primary)]/10 px-3 py-1 text-sm font-semibold text-[color:var(--color-primary)]">
          {caseStudy.tag}
        </span>
      </div>
      <div className="mb-4">
        <div className="text-4xl font-bold text-[color:var(--color-primary)] mb-2">{caseStudy.metric}</div>
        <p className="text-[color:var(--color-text-muted)] leading-relaxed">{caseStudy.description}</p>
      </div>
    </motion.div>
  );
};

