import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';
import { DocumentTextIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useI18n } from '../../i18n';

export const PDFDataExtractor = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.pdfExtractor;

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const hasStarted = useRef(false);

  const [phase, setPhase] = useState<'idle' | 'scanning' | 'extracting' | 'complete'>('idle');
  const [extractedIndices, setExtractedIndices] = useState<number[]>([]);

  // Define field keys and values, labels come from translations
  const fieldData = [
    { key: 'tenant', value: 'Global Retail Solutions Ltd.' },
    { key: 'startDate', value: '01 January 2024' },
    { key: 'endDate', value: '31 December 2029' },
    { key: 'monthlyRent', value: '€4,500.00' },
    { key: 'securityDeposit', value: '€13,500.00' },
    { key: 'breakOption', value: 'Yes, 5 years' },
  ];

  // Build fields with current translations
  const fields = fieldData.map((field, idx) => ({
    label: t.fields[field.key as keyof typeof t.fields],
    value: field.value,
    extracted: extractedIndices.includes(idx),
  }));

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;

    let timeout: ReturnType<typeof setTimeout> | undefined;

    const runSequence = async () => {
      // Start scanning immediately
      setPhase('scanning');
      setExtractedIndices([]);
      await new Promise(r => setTimeout(r, 1200));

      // Phase 3: Extracting
      setPhase('extracting');

      // Reveal fields one by one
      for (let i = 0; i < fieldData.length; i++) {
        setExtractedIndices(prev => [...prev, i]);
        await new Promise(r => setTimeout(r, 600));
      }

      // Phase 4: Complete
      setPhase('complete');
      await new Promise(r => setTimeout(r, 4000));

      // Restart
      // runSequence();
    };

    runSequence();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-0 md:p-0">
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-stretch">

        {/* Left: Description */}
        <div className="w-full md:w-1/3 flex flex-col justify-start pt-0 md:pt-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium w-fit">
              <ArrowPathIcon className="w-4 h-4" />
              <span>{t.badge}</span>
            </div>
            <h3 className="text-3xl font-bold text-[color:var(--color-text)]">
              {t.title}
            </h3>
            <p className="text-[color:var(--color-text-muted)] text-lg">
              {t.description}
            </p>
          </div>
        </div>

        {/* Right: Visual Demo */}
        <div className="w-full md:w-2/3 relative">
          <div className="relative bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-xl overflow-hidden shadow-2xl sm:h-[500px] flex flex-row">

            {/* PDF View - hidden on mobile */}
            <div className="hidden sm:block sm:w-1/2 h-full bg-[color:var(--color-bg-alt)] p-4 sm:p-6 relative overflow-hidden border-r border-[color:var(--color-divider)]">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2 text-[color:var(--color-text)]">
                   <DocumentTextIcon className="w-5 h-5 text-accent" />
                   <span className="font-semibold text-sm">Lease_Agreement_v4.pdf</span>
                 </div>
              </div>

              {/* Mock PDF Content */}
              <div className="space-y-4 opacity-70 blur-[0.5px]">
                <div className="h-6 bg-[color:var(--color-text)]/20 w-3/4 mb-8" /> {/* Title */}
                
                <div className="space-y-2">
                  <div className="h-3 bg-[color:var(--color-text)]/10 w-full" />
                  <div className="h-3 bg-[color:var(--color-text)]/10 w-full" />
                  <div className="h-3 bg-[color:var(--color-text)]/10 w-5/6" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                   <div className="p-2 border border-[color:var(--color-border)] rounded bg-white/50">
                     <div className="h-2 bg-[color:var(--color-text)]/20 w-1/2 mb-2" />
                     <div className="h-3 bg-[color:var(--color-text)]/40 w-3/4" />
                   </div>
                   <div className="p-2 border border-[color:var(--color-border)] rounded bg-white/50">
                     <div className="h-2 bg-[color:var(--color-text)]/20 w-1/2 mb-2" />
                     <div className="h-3 bg-[color:var(--color-text)]/40 w-3/4" />
                   </div>
                   <div className="p-2 border border-[color:var(--color-border)] rounded bg-white/50">
                     <div className="h-2 bg-[color:var(--color-text)]/20 w-1/2 mb-2" />
                     <div className="h-3 bg-[color:var(--color-text)]/40 w-3/4" />
                   </div>
                   <div className="p-2 border border-[color:var(--color-border)] rounded bg-white/50">
                     <div className="h-2 bg-[color:var(--color-text)]/20 w-1/2 mb-2" />
                     <div className="h-3 bg-[color:var(--color-text)]/40 w-3/4" />
                   </div>
                </div>

                <div className="space-y-2 mt-8">
                  <div className="h-3 bg-[color:var(--color-text)]/10 w-full" />
                  <div className="h-3 bg-[color:var(--color-text)]/10 w-11/12" />
                  <div className="h-3 bg-[color:var(--color-text)]/10 w-full" />
                </div>
              </div>

              {/* Scanning Beam */}
              <AnimatePresence>
                {phase === 'scanning' && (
                  <motion.div
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 2, ease: "linear", repeat: 0 }}
                    className="absolute left-0 right-0 h-2 bg-primary/50 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.6)] z-10 backdrop-blur-[1px]"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Extracted Data View */}
            <div className="w-full sm:w-1/2 sm:h-full bg-[color:var(--color-surface)] p-4 sm:p-6 flex flex-col">
              {/* Mobile header with PDF icon */}
              <div className="flex sm:hidden items-center gap-2 mb-3 pb-3 border-b border-[color:var(--color-divider)]">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DocumentTextIcon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-[color:var(--color-text-muted)]">Lease_Agreement_v4.pdf</span>
                </div>
                {phase === 'extracting' && (
                  <span className="text-xs font-medium text-primary animate-pulse">{t.processing}</span>
                )}
                {phase === 'complete' && (
                  <span className="text-xs font-medium text-success flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3" /> ✓
                  </span>
                )}
              </div>

              {/* Desktop header */}
              <div className="hidden sm:flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[color:var(--color-divider)]">
                <span className="font-semibold text-[color:var(--color-text)]">{t.extracted}</span>
                {phase === 'extracting' && (
                  <span className="text-xs font-medium text-primary animate-pulse">{t.processing}</span>
                )}
                {phase === 'complete' && (
                  <span className="text-xs font-medium text-success flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3" /> ✓
                  </span>
                )}
              </div>

              <div className="space-y-2 sm:space-y-4 sm:flex-1 sm:overflow-y-auto pr-2">
                {fields.map((field, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "group p-2 sm:p-3 rounded-lg border transition-all duration-300",
                      field.extracted
                        ? "bg-primary/5 border-primary/20 translate-x-0 opacity-100"
                        : "bg-transparent border-transparent translate-x-4 opacity-50"
                    )}
                  >
                    <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                      <span className="text-[10px] sm:text-xs font-medium text-[color:var(--color-text-muted)] uppercase tracking-wider">{field.label}</span>
                      {field.extracted && (
                        <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-success opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className={cn(
                      "font-medium text-sm sm:text-base text-[color:var(--color-text)]",
                      !field.extracted && "blur-sm text-transparent bg-[color:var(--color-text-muted)]/20 rounded h-4 sm:h-5 w-3/4"
                    )}>
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[color:var(--color-divider)]">
                 <button className="w-full py-2 bg-[color:var(--color-surface-hover)] text-[color:var(--color-text-muted)] rounded-lg text-xs sm:text-sm font-medium border border-[color:var(--color-border)] flex items-center justify-center gap-2">
                    {t.upload.button}
                 </button>
              </div>
            </div>

          </div>
          
          {/* Floating Indicators */}
           <AnimatePresence>
              {phase === 'extracting' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className="bg-white dark:bg-zinc-800 rounded-full shadow-xl p-3 border border-[color:var(--color-border)]">
                     <ArrowPathIcon className="w-6 h-6 text-primary animate-spin" />
                  </div>
                </motion.div>
              )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

