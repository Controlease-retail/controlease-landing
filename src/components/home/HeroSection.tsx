// import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/solid';

export const HeroSection = () => {
  const { t, dictionary } = useI18n();

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => {
    const random1 = Math.random();
    const random2 = Math.random();
    const random3 = Math.random();
    const random4 = Math.random();
    const random5 = Math.random();
    return {
      id: i,
      size: random1 * 4 + 2,
      x: random2 * 100,
      y: random3 * 100,
      duration: random4 * 10 + 10,
      delay: random5 * 2,
      xOffset: (random1 - 0.5) * 20,
    };
  });

  // Geometric shapes
  const shapes = [
    { id: 1, type: "circle", size: 200, x: 10, y: 20, duration: 15 },
    { id: 2, type: "square", size: 150, x: 80, y: 60, duration: 20 },
    { id: 3, type: "triangle", size: 120, x: 50, y: 80, duration: 18 },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[color:var(--color-secondary)] via-[color:var(--color-secondary-dark)] to-[color:var(--color-secondary)]">
      
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/10 to-primary/20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-accent/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute border-2 border-accent/10"
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              clipPath:
                shape.type === "triangle"
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : shape.type === "square"
                    ? "none"
                    : "circle(50%)",
              borderRadius: shape.type === "circle" ? "50%" : "0%",
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Large pulsing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            {/* Hero text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-black leading-tight text-white drop-shadow-2xl">
                {t('home.hero.title')}
                <br />
                <span className="block bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
                  {t('home.hero.badge')}
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-200"
              >
                {t('home.hero.description')}
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center gap-2 rounded-md border border-transparent bg-accent px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[color:var(--color-secondary)]"
              >
                {t('home.hero.primaryCta')}
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="rounded-md border-2 border-white/20 bg-white/10 px-8 py-4 text-base font-medium text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all"
              >
                {t('home.hero.secondaryCta')}
              </motion.button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-wrap justify-center gap-8 pt-12 border-t border-white/10"
            >
              {dictionary.home.hero.metrics.map((metric: { label: string; value: string }) => (
                <div key={metric.label} className="flex flex-col items-center">
                  <span className="text-xs text-gray-300 uppercase tracking-wide mb-1">{metric.label}</span>
                  <span className="text-2xl font-bold text-white">{metric.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Animated CTA section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex items-center gap-4 pt-8 w-full max-w-2xl"
            >
              <motion.div
                className="h-1 flex-1 rounded-full bg-gradient-to-r from-accent via-primary to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              />
              <motion.div
                className="flex items-center gap-2 text-sm text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SparklesIcon className="h-4 w-4 text-accent" />
                <span>Transform your workflow today</span>
              </motion.div>
              <motion.div
                className="h-1 flex-1 rounded-full bg-gradient-to-l from-accent via-primary to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
