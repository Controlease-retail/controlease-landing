import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const XRaySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacityUI = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const opacityWireframe = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const opacityData = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-[color:var(--color-bg-alt)]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-40">
           <h2 className="text-4xl font-bold text-[color:var(--color-text)] mb-8 bg-[color:var(--color-surface)] px-6 py-2 rounded-full backdrop-blur-sm border border-[color:var(--color-border)]">
             Transparent Data Model
           </h2>
        </div>

        <div className="relative w-full max-w-2xl aspect-video">
          
          {/* Layer 1: The Polished UI */}
          <motion.div 
            style={{ opacity: opacityUI }}
            className="absolute inset-0 bg-[color:var(--color-surface)] rounded-xl border border-[color:var(--color-border)] p-8 shadow-2xl z-30"
          >
             <div className="h-full flex flex-col justify-center space-y-6">
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-bold text-[color:var(--color-text)]">Portfolio Overview</h3>
                   <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm">Healthy</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-[color:var(--color-bg-alt)] rounded-lg">
                      <div className="text-[color:var(--color-text-muted)] text-sm">Occupancy</div>
                      <div className="text-3xl font-bold text-primary">98.5%</div>
                   </div>
                   <div className="p-4 bg-[color:var(--color-bg-alt)] rounded-lg">
                      <div className="text-[color:var(--color-text-muted)] text-sm">Avg Rent / SQM</div>
                      <div className="text-3xl font-bold text-[color:var(--color-text)]">€45.20</div>
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Layer 2: The Wireframe */}
          <motion.div 
            style={{ opacity: opacityWireframe }}
            className="absolute inset-0 bg-[color:var(--color-bg)] rounded-xl border-2 border-dashed border-[color:var(--color-border)] p-8 z-20"
          >
             <div className="h-full flex flex-col justify-center space-y-6 opacity-50">
                <div className="flex justify-between items-center">
                   <div className="h-8 bg-[color:var(--color-border)] rounded w-1/3" />
                   <div className="h-6 bg-[color:var(--color-border)] rounded w-1/6" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 border border-[color:var(--color-border)] rounded-lg h-32" />
                   <div className="p-4 border border-[color:var(--color-border)] rounded-lg h-32" />
                </div>
             </div>
             {/* Grid Lines */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
          </motion.div>

          {/* Layer 3: The Data Structure - Business Friendly */}
          <motion.div 
            style={{ opacity: opacityData }}
            className="absolute inset-0 bg-[color:var(--color-surface)] rounded-xl border border-[color:var(--color-border)] p-6 z-10 overflow-hidden shadow-lg"
          >
             <div className="h-full flex flex-col justify-center space-y-6">
                <div className="text-center mb-4">
                  <div className="text-xs text-primary font-semibold mb-2">DATA STRUCTURE</div>
                  <div className="text-sm text-[color:var(--color-text-muted)]">Organized, accessible, and secure</div>
                </div>
                
                {/* Business-friendly data representation */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[color:var(--color-bg-alt)] rounded-lg border border-[color:var(--color-border)]">
                    <span className="text-sm text-[color:var(--color-text-muted)]">Lease Information</span>
                    <span className="text-sm font-semibold text-[color:var(--color-text)]">Structured</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[color:var(--color-bg-alt)] rounded-lg border border-[color:var(--color-border)]">
                    <span className="text-sm text-[color:var(--color-text-muted)]">Financial Metrics</span>
                    <span className="text-sm font-semibold text-[color:var(--color-text)]">Calculated</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[color:var(--color-bg-alt)] rounded-lg border border-[color:var(--color-border)]">
                    <span className="text-sm text-[color:var(--color-text-muted)]">Compliance Data</span>
                    <span className="text-sm font-semibold text-[color:var(--color-text)]">Tracked</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[color:var(--color-bg-alt)] rounded-lg border border-[color:var(--color-border)]">
                    <span className="text-sm text-[color:var(--color-text-muted)]">Portfolio Analytics</span>
                    <span className="text-sm font-semibold text-[color:var(--color-text)]">Real-time</span>
                  </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
