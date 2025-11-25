import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useI18n } from '../../i18n';

export const AIConsole = () => {
  const { t } = useI18n();
  const [phase, setPhase] = useState<'idle' | 'typing' | 'scanning' | 'complete'>('idle');
  const [displayedText, setDisplayedText] = useState('');
  
  const QUERY_TEXT = t('landing.architecture.aiAssistant.userPrompt') || "Show me all leases expiring in Q4 2024 in Madrid.";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const runSequence = async () => {
      // Phase 1: Idle (Wait a bit)
      setPhase('idle');
      setDisplayedText('');
      await new Promise(r => setTimeout(r, 1000));

      // Phase 2: Typing
      setPhase('typing');
      for (let i = 0; i <= QUERY_TEXT.length; i++) {
        setDisplayedText(QUERY_TEXT.slice(0, i));
        await new Promise(r => setTimeout(r, 50));
      }
      await new Promise(r => setTimeout(r, 500));

      // Phase 3: Scanning
      setPhase('scanning');
      await new Promise(r => setTimeout(r, 2000));

      // Phase 4: Complete
      setPhase('complete');
      await new Promise(r => setTimeout(r, 4000));

      // Restart
      runSequence();
    };

    runSequence();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-0">
      <div className="relative bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-xl overflow-hidden shadow-lg h-[400px] flex flex-col md:flex-row">
        
        {/* Left: Document View */}
        <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-[color:var(--color-divider)] bg-[color:var(--color-bg-alt)] relative overflow-hidden">
          <div className="text-xs text-[color:var(--color-text-muted)] mb-4 flex justify-between">
            <span>LEASE-2024-MAD-042.PDF</span>
            <span className="text-primary font-semibold">{phase === 'scanning' ? 'SCANNING...' : phase === 'complete' ? 'PROCESSED' : 'READY'}</span>
          </div>
          
          {/* Mock Document Representation */}
          <div className="space-y-3 opacity-60">
            <div className="h-4 bg-[color:var(--color-border)] rounded w-3/4" />
            <div className="h-4 bg-[color:var(--color-border)] rounded w-1/2" />
            <div className="h-4 bg-[color:var(--color-border)] rounded w-full" />
            <div className="h-4 bg-[color:var(--color-border)] rounded w-5/6" />
            <div className="h-32 bg-[color:var(--color-surface-muted)] rounded w-full border border-dashed border-[color:var(--color-border)] mt-4" />
          </div>

          {/* Scanning Beam */}
          <AnimatePresence>
            {phase === 'scanning' && (
              <motion.div
                initial={{ top: 0, opacity: 0 }}
                animate={{ top: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(76,115,228,0.5)] z-10"
              />
            )}
          </AnimatePresence>

          {/* Result Overlay - Business Friendly */}
           <AnimatePresence>
            {phase === 'complete' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[color:var(--color-surface)]/95 backdrop-blur-sm flex items-center justify-center p-6"
              >
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-2 mb-4 text-primary">
                     <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                     <span className="text-sm font-bold">ANALYSIS COMPLETE</span>
                  </div>
                  
                  {/* Business Results Card */}
                  <div className="bg-[color:var(--color-bg-alt)] rounded-lg p-6 border border-[color:var(--color-border)] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[color:var(--color-text-muted)]">Results Found</span>
                      <span className="text-2xl font-bold text-[color:var(--color-text)]">12 leases</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[color:var(--color-text-muted)]">Location</span>
                      <span className="text-lg font-semibold text-[color:var(--color-text)]">Madrid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[color:var(--color-text-muted)]">Total Area</span>
                      <span className="text-lg font-semibold text-[color:var(--color-text)]">45,000 m²</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[color:var(--color-divider)]">
                      <span className="text-sm text-[color:var(--color-text-muted)]">Average Rent</span>
                      <span className="text-lg font-bold text-primary">€45.20/m²</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: AI Chat Interface */}
        <div className="w-full md:w-1/2 flex flex-col bg-[color:var(--color-bg)]">
          <div className="p-4 border-b border-[color:var(--color-divider)] flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-danger/20 border border-danger/50" />
            <div className="w-3 h-3 rounded-full bg-warning/20 border border-warning/50" />
            <div className="w-3 h-3 rounded-full bg-success/20 border border-success/50" />
            <span className="ml-auto text-[10px] text-[color:var(--color-text-muted)]">AI Assistant</span>
          </div>

          <div className="flex-1 p-6 text-sm relative">
            {/* AI Avatar / Status */}
            <div className="absolute top-6 right-6">
              <div className={cn(
                "w-2 h-2 rounded-full transition-colors duration-300",
                phase === 'idle' ? 'bg-[color:var(--color-text-muted)]' : 'bg-primary shadow-[0_0_10px_rgba(76,115,228,0.5)] animate-pulse'
              )} />
            </div>

            {/* Chat History */}
            <div className="space-y-6">
              <div className="flex gap-3">
                <span className="text-accent font-semibold">You:</span>
                <span className="text-[color:var(--color-text)] min-h-[1.5em]">
                  {displayedText}
                  <span className="animate-pulse inline-block w-1.5 h-4 bg-primary ml-1 align-middle" />
                </span>
              </div>
              
              <AnimatePresence>
                {(phase === 'scanning' || phase === 'complete') && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <span className="text-primary font-semibold">AI:</span>
                    <div className="space-y-1">
                      <span className="text-[color:var(--color-text-muted)] block">Analyzing lease documents...</span>
                      {phase === 'complete' && (
                         <motion.span 
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }} 
                           transition={{ delay: 0.5 }}
                           className="text-[color:var(--color-text)] block"
                          >
                           Found 12 leases matching your criteria in Madrid, expiring in Q4 2024.
                         </motion.span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
