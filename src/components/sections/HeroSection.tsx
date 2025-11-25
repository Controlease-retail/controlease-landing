import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { NetworkGlobe } from '../visuals/NetworkGlobe';
import { useEffect, useState } from 'react';
import { useI18n } from '../../i18n';

export const HeroSection = () => {
  const [valueIndex, setValueIndex] = useState(0);
  const { dictionary } = useI18n();
  const hero = dictionary.landing.hero;
  const tickerValues = hero.ticker;

  useEffect(() => {
    const interval = setInterval(() => {
      setValueIndex((prev) => (prev + 1) % tickerValues.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tickerValues.length]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-bg pt-20 md:pt-24 flex items-center transition-colors">
      {/* Accent Color Gradient Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent blur-3xl opacity-60" />
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-t from-accent/15 to-transparent blur-3xl opacity-40" />
      </div>

      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <NetworkGlobe />
        </Canvas>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent shadow-[0_0_15px_rgba(242,102,114,0.3)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              {hero.badge}
            </motion.div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-text md:text-6xl lg:text-7xl">
              {hero.headline.lead} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-light">
                {hero.headline.highlight}
              </span>
            </h1>

            <div className="h-6 overflow-hidden">
               <motion.p 
                 key={valueIndex}
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 exit={{ y: -20, opacity: 0 }}
                 className="text-lg font-medium text-accent"
               >
                 {tickerValues[valueIndex]}
               </motion.p>
            </div>

            <p className="max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              {hero.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              <button className="group relative overflow-hidden rounded-xl bg-gradient-brand px-8 py-4 font-bold text-inverted-text shadow-[0_0_25px_rgba(242,102,114,0.4)] transition-all hover:shadow-[0_0_35px_rgba(242,102,114,0.6)] hover:scale-[1.02] active:scale-[0.98]">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  {hero.primaryCta}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button className="group relative rounded-xl border-2 border-accent/30 bg-surface/50 backdrop-blur-md px-8 py-4 font-bold text-text transition-all hover:border-accent/50 hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(242,102,114,0.2)]">
                <span className="relative z-10">{hero.secondaryCta}</span>
              </button>
            </div>
            
            <div className="pt-6 flex items-center gap-6 opacity-70 transition-all hover:opacity-100 flex-wrap">
              {hero.partners.map((partner) => (
                <img key={partner.name} src={partner.logo} className="h-5 object-contain grayscale hover:grayscale-0 transition-all" alt={partner.name} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Gradient at bottom with accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
    </section>
  );
};
