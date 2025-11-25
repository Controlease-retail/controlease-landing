import { useState, useRef, useEffect } from 'react';
import { GlobeAltIcon, CheckIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n';
import { cn } from '../../utils/cn';

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { availableLocales, language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full w-8 h-8 transition-all",
          isOpen
            ? "bg-[color:var(--color-glass-highlight)]"
            : "",
          className || "text-text-muted hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-glass)]"
        )}
        aria-label="Select language"
      >
        <GlobeAltIcon className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 rounded-xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-panel)] backdrop-blur-xl p-1 shadow-xl z-50"
          >
            {availableLocales.map((locale) => (
              <button
                key={locale.code}
                onClick={() => {
                  setLanguage(locale.code);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  language === locale.code
                    ? "bg-primary/10 text-primary"
                    : "text-text-muted hover:bg-[color:var(--color-glass)] hover:text-[color:var(--color-text)]"
                )}
              >
                {locale.label}
                {language === locale.code && <CheckIcon className="h-3 w-3" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
