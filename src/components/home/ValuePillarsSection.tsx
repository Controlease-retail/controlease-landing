import { DocumentTextIcon, ShieldCheckIcon, ChartBarIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useI18n } from '../../i18n';
import { motion } from 'framer-motion';

export const ValuePillarsSection = () => {
  const { t, dictionary } = useI18n();

  const pillars = dictionary.home.pointers.items;
  const icons = [ChartBarIcon, ShieldCheckIcon, DocumentTextIcon];

  const features = pillars.map((pillar: { title: string; description: string; stat: string }, index: number) => {
    const gradients = [
      "from-primary/20 to-primary-light/20",
      "from-accent/20 to-accent-light/20",
      "from-primary/20 to-accent/20",
    ];
    return {
      ...pillar,
      icon: icons[index],
      delay: index * 0.1,
      gradient: gradients[index] || "from-accent/20 to-accent-light/20",
    };
  });

  return (
    <section className="py-24 px-6 bg-[color:var(--color-bg)] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[color:var(--color-text-muted)] mb-2">
            {t('home.pointers.subtitle')}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-text)]">
            {t('home.pointers.title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${feature.gradient} p-8 backdrop-blur-md transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-2xl group-hover:shadow-accent/20`}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />

                  {/* Glowing effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-primary-light opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />

                  <div className="relative z-10 flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <motion.div
                        className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:bg-accent/30 group-hover:rotate-12"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-7 w-7 text-accent" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="opacity-0 transition-opacity duration-300"
                      >
                        <ArrowRightIcon className="h-5 w-5 text-accent" />
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-2">{feature.stat}</p>
                      <h3 className="text-xl font-bold text-[color:var(--color-text)] mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
