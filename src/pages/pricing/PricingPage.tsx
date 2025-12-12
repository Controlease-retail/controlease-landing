import { motion } from 'framer-motion';
import { useI18n } from '../../i18n';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { CheckIcon } from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';

export const PricingPage = () => {
  const { dictionary } = useI18n();
  // @ts-ignore - pricing key exists in i18n but typescript definition might need update
  const { title, subtitle, plans } = dictionary.pricing || dictionary.landing.pricing || {};
  
  if (!plans) return null;

  return (
    <div className="min-h-screen w-full bg-[color:var(--color-secondary)] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <GlassPanel
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              variant={plan.highlight ? 'interactive' : 'default'}
              className={cn(
                "flex flex-col p-6 relative",
                plan.highlight && "ring-2 ring-accent shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)] scale-105 z-10 xl:scale-110 overflow-visible"
              )}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    Best Value
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6 space-y-2">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white tracking-tight">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-white/60 font-medium">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/70 leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              {/* Features */}
              <div className="flex-grow space-y-4 mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckIcon className="h-5 w-5 text-accent shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                className={cn(
                  "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300",
                  plan.highlight 
                    ? "bg-accent text-white hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                )}
              >
                {plan.cta}
              </button>
            </GlassPanel>
          ))}
        </div>
        
        {/* Enterprise Note */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-white/50 text-sm max-w-2xl mx-auto pt-8 border-t border-white/10"
        >
            All plans include SSL security, automated backups, and 99.9% uptime guarantee. 
            Prices are in USD. VAT may apply.
        </motion.div>
      </div>
    </div>
  );
};

