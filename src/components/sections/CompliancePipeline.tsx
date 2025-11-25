import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GlassPanel } from '../ui/GlassPanel';

export const CompliancePipeline = () => {
  const [failed, setFailed] = useState(false);

  // Cycle the simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setFailed((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[var(--color-bg)] py-32 px-6 overflow-hidden transition-colors">
      <div className="mx-auto max-w-6xl text-center mb-16">
        <h2 className="text-4xl font-bold text-[color:var(--color-text)]">Governance as Code</h2>
        <p className="mt-4 text-text-muted">Every lease passes through automated logic gates before approval.</p>
      </div>

      <div className="relative mx-auto h-[300px] w-full max-w-5xl">
        {/* Pipeline Track */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[color:var(--color-glass)] -translate-y-1/2" />

        {/* Moving Packet */}
        <motion.div
          animate={{
            x: failed ? ['0%', '48%', '40%'] : ['0%', '100%'],
            backgroundColor: failed ? ['#3b82f6', '#ef4444', '#ef4444'] : '#3b82f6',
          }}
          transition={{
            duration: 3,
            times: failed ? [0, 0.5, 1] : [0, 1],
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-signal-blue shadow-[0_0_20px_currentColor] flex items-center justify-center z-20"
        >
          <svg className="w-6 h-6 text-[color:var(--color-inverted-text)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </motion.div>

        {/* Gates */}
        <div className="absolute inset-0 flex justify-between px-20 items-center pointer-events-none">
          <Gate label="Validation" active />
          <Gate label="Budget Check" active />
          <Gate label="Legal Review" active={!failed} color={failed ? 'red' : 'green'} />
          <Gate label="Final Approval" active={!failed} />
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mx-auto mt-8 w-fit">
        <GlassPanel className="px-6 py-2 flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${failed ? 'bg-signal-red' : 'bg-signal-green'} animate-pulse`} />
          <span className="font-mono text-sm text-[color:var(--color-text)]">
            {failed ? 'SIMULATION: POLICY_VIOLATION_DETECTED' : 'SIMULATION: ALL_CHECKS_PASSED'}
          </span>
        </GlassPanel>
      </div>
    </section>
  );
};

const Gate = ({ label, active, color = 'blue' }: { label: string; active: boolean; color?: string }) => {
  const colorClass = {
    blue: 'bg-signal-blue',
    green: 'bg-signal-green',
    red: 'bg-signal-red',
  }[color];

  return (
    <div className="relative flex flex-col items-center gap-4">
      <div className={`h-24 w-1 rounded-full transition-colors duration-300 ${active ? colorClass : 'bg-[color:var(--color-glass)]'}`} />
      <div className="absolute -bottom-8 whitespace-nowrap text-sm font-medium text-text-muted">{label}</div>
      {active && (
        <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${colorClass} opacity-20 animate-ping`} />
      )}
    </div>
  );
};

