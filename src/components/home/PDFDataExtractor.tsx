import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { DocumentTextIcon, CheckCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export const PDFDataExtractor = () => {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'extracting' | 'complete'>('idle');
  const [fields, setFields] = useState<{ label: string; value: string; extracted: boolean }[]>([
    { label: 'Tenant Name', value: 'Global Retail Solutions Ltd.', extracted: false },
    { label: 'Lease Start Date', value: '01 January 2024', extracted: false },
    { label: 'Lease End Date', value: '31 December 2029', extracted: false },
    { label: 'Monthly Rent', value: '€4,500.00', extracted: false },
    { label: 'Security Deposit', value: '€13,500.00', extracted: false },
    { label: 'Renewal Option', value: 'Yes, 5 years', extracted: false },
  ]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const runSequence = async () => {
      // Phase 1: Idle
      setPhase('idle');
      setFields(prev => prev.map(f => ({ ...f, extracted: false })));
      await new Promise(r => setTimeout(r, 1500));

      // Phase 2: Scanning
      setPhase('scanning');
      await new Promise(r => setTimeout(r, 2000));

      // Phase 3: Extracting
      setPhase('extracting');
      
      // Reveal fields one by one
      for (let i = 0; i < fields.length; i++) {
        setFields(prev => {
          const newFields = [...prev];
          newFields[i].extracted = true;
          return newFields;
        });
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-0">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Left: Description */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <ArrowPathIcon className="w-4 h-4" />
            <span>Automated Extraction</span>
          </div>
          <h3 className="text-3xl font-bold text-[color:var(--color-text)]">
            Instant PDF Data Extraction
          </h3>
          <p className="text-[color:var(--color-text-muted)] text-lg">
            Upload any lease agreement or contract. Our AI automatically identifies, extracts, and structures key data points in seconds—turning static documents into actionable database records.
          </p>
          <ul className="space-y-2 text-[color:var(--color-text-secondary)]">
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span>99% Extraction Accuracy</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span>Multilingual Support</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span>Custom Field Mapping</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span>Understands Highly Complex Relations</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <span>Understands Any Kind of Writing Format (PDF with images, embedded text, etc.)</span>
            </li>
          </ul>
        </div>

        {/* Right: Visual Demo */}
        <div className="w-full md:w-2/3 relative">
          <div className="relative bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-xl overflow-hidden shadow-2xl h-[500px] flex">
            
            {/* PDF View */}
            <div className="w-1/2 bg-[color:var(--color-bg-alt)] p-6 relative overflow-hidden border-r border-[color:var(--color-divider)]">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-2 text-[color:var(--color-text)]">
                   <DocumentTextIcon className="w-5 h-5 text-primary" />
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
            <div className="w-1/2 bg-[color:var(--color-surface)] p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[color:var(--color-divider)]">
                <span className="font-semibold text-[color:var(--color-text)]">Extracted Data</span>
                {phase === 'extracting' && (
                  <span className="text-xs font-medium text-primary animate-pulse">Processing...</span>
                )}
                {phase === 'complete' && (
                  <span className="text-xs font-medium text-success flex items-center gap-1">
                    <CheckCircleIcon className="w-3 h-3" /> Done
                  </span>
                )}
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {fields.map((field, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "group p-3 rounded-lg border transition-all duration-300",
                      field.extracted 
                        ? "bg-primary/5 border-primary/20 translate-x-0 opacity-100" 
                        : "bg-transparent border-transparent translate-x-4 opacity-50"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-medium text-[color:var(--color-text-muted)] uppercase tracking-wider">{field.label}</span>
                      {field.extracted && (
                        <CheckCircleIcon className="w-4 h-4 text-success opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className={cn(
                      "font-medium text-[color:var(--color-text)]",
                      !field.extracted && "blur-sm text-transparent bg-[color:var(--color-text-muted)]/20 rounded h-5 w-3/4"
                    )}>
                      {field.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[color:var(--color-divider)]">
                 <button className="w-full py-2 bg-[color:var(--color-surface-hover)] text-[color:var(--color-text-muted)] rounded-lg text-sm font-medium border border-[color:var(--color-border)] flex items-center justify-center gap-2">
                    View Full Record
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

