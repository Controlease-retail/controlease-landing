import { motion } from 'framer-motion';

type PartnerTier = {
  name: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
};

type PartnerTierCardProps = {
  tier: PartnerTier;
  delay?: number;
};

export const PartnerTierCard = ({ tier, delay = 0 }: PartnerTierCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-8 shadow-lg"
    >
      <div className="mb-6">
        {tier.icon}
        <h3 className="text-2xl font-bold text-[color:var(--color-text)] mt-4 mb-2">{tier.name}</h3>
        <p className="text-[color:var(--color-text-muted)]">{tier.description}</p>
      </div>
      <ul className="space-y-2">
        {tier.benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-[color:var(--color-text-muted)]">
            <span className="text-[color:var(--color-primary)] mt-1">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

