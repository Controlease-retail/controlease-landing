import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

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
      <div className="relative z-10 flex min-h-screen items-center px-6 py-24 pb-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left column - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col space-y-8"
            >
              {/* Hero text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-2xl">
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
                  className="max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-gray-200"
                >
                  {t('home.hero.description')}
                </motion.p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Link to="/contact" className="w-full sm:w-auto">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-full sm:w-auto flex items-center justify-center gap-2 rounded-md border border-transparent bg-accent px-8 py-3 sm:py-4 text-base font-medium text-white shadow-lg hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[color:var(--color-secondary)]"
                  >
                    {t('home.hero.primaryCta')}
                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('value-pillars')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto rounded-md border-2 border-white/20 bg-white/10 px-8 py-3 sm:py-4 text-base font-medium text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all"
                >
                  {t('home.hero.secondaryCta')}
                </motion.button>
              </motion.div>

              {/* Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="grid grid-cols-3 gap-2 sm:flex sm:justify-start sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8 border-t border-white/10 pb-24 sm:pb-0"
              >
                {dictionary.home.hero.metrics.map((metric: { label: string; value: string }) => (
                  <div key={metric.label} className="flex flex-col text-center sm:text-left">
                    <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1 leading-tight">{metric.label}</span>
                    <span className="text-[11px] sm:text-base md:text-xl lg:text-2xl font-bold text-white leading-tight">{metric.value}</span>
                  </div>
                ))}
              </motion.div>

            </motion.div>

            {/* Right column - Layered Device Mockups (Desktop & Medium screens) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden md:flex relative items-center justify-center"
            >
              <div className="relative scale-[0.7] md:scale-[0.65] lg:scale-[0.85] xl:scale-100 origin-center">
                {/* Desktop - Back */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="w-[580px] xl:w-[650px] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900 relative -top-6">
                    <div className="h-8 bg-gray-800 flex items-center px-4 gap-2">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 mx-4">
                        <div className="h-5 bg-gray-700 rounded-md flex items-center px-3 max-w-[180px]">
                          <span className="text-[10px] text-gray-400">app.controlease.net</span>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <img
                        src="/images/devices/desktop.png"
                        alt="Controlease Dashboard"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="mx-auto w-32 h-7 bg-gray-800 rounded-b-lg relative -top-6"></div>
                  <div className="mx-auto w-52 h-2 bg-gray-700 rounded-full relative -top-6"></div>
                </motion.div>

                {/* Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="absolute -bottom-16 -left-12 xl:-left-16 z-30"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="relative w-[170px] xl:w-[190px] rounded-[15px] bg-gray-900 p-[3px] shadow-2xl shadow-black/40 border border-gray-700">
                      {/* Screen */}
                      <div className="rounded-[12px] overflow-hidden">
                        <img
                          src="/images/devices/mobile.png"
                          alt="Controlease Mobile"
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Mascot - bottom right */}
                {/* <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -bottom-32 left-24 min-[1400px]:left-10 xl:min-[1400px]:left-14 z-10"
                >
                  <video
                    src="/images/mascot.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-[380px] xl:w-[450px] drop-shadow-2xl"
                    ref={(el) => { if (el) el.playbackRate = 1; }}
                  />
                </motion.div> */}

                {/* Glow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[400px] h-20 bg-accent/15 rounded-full blur-3xl"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Problem Statement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-0 left-0 right-0 py-5 px-6 bg-gradient-to-r from-white/5 via-white/10 to-white/5 border-t border-white/10 backdrop-blur-sm"
      >
        <p className="max-w-4xl mx-auto text-center text-sm md:text-base text-white/70 leading-relaxed">
          {dictionary.home.hero.problemStatement}
        </p>
      </motion.div>
    </section>
  );
};
