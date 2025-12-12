import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../controls/ThemeToggle';
import { LanguageSwitcher } from '../controls/LanguageSwitcher';
import { useI18n } from '../../i18n';

type Timeout = ReturnType<typeof setTimeout>;

export const CommandBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { dictionary } = useI18n();
  const navItems = dictionary.landing.commandBar.nav;
  const { brand, signIn, requestDemo } = dictionary.landing.commandBar;
  const timeoutRef = useRef<Timeout | null>(null);

  const clearMenuTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const handleMenuEnter = useCallback((menuLabel: string) => {
    clearMenuTimeout();
    setActiveMenu(menuLabel);
  }, [clearMenuTimeout]);

  const handleMenuLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200); // 200ms delay
  }, []);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
      >
        <nav 
          className="relative flex items-center justify-between rounded-2xl bg-[var(--color-secondary)] px-6 py-3 shadow-2xl pointer-events-auto transition-all duration-300 w-full max-w-6xl"
          onMouseLeave={handleMenuLeave}
        >
           {/* Logo */}
           <Link to="/" className="flex items-center gap-3 font-bold text-white text-lg tracking-tight hover:opacity-80 transition-opacity">
             <img src="/main_logo.svg" alt={brand} className="h-8 w-auto" />
             <span>{brand}</span>
           </Link>

           {/* Desktop Menu */}
           <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {'children' in item && item.children && item.children.length > 0 ? (
                    <button
                      onMouseEnter={() => handleMenuEnter(item.label)}
                      className={cn(
                        "flex items-center gap-1 text-sm font-medium transition-colors relative py-2",
                        activeMenu === item.label ? "text-white" : "text-white/80 hover:text-white"
                      )}
                    >
                      {item.label}
                      <ChevronDownIcon className="h-3 w-3" />
                      {activeMenu === item.label && (
                        <motion.div 
                          layoutId="nav-underline" 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path || '#'}
                      className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors relative py-2"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
           </div>

           {/* Actions & Controls */}
           <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 border-r border-white/20 pr-4 mr-2">
                 <LanguageSwitcher className="text-white/80 hover:text-white" />
                 <ThemeToggle className="text-white/80 hover:text-white" />
              </div>
              
              <Link to="/contact" className="text-sm font-medium text-white/90 hover:text-white transition-colors hidden sm:block">
                 {signIn}
              </Link>
              <Link to="/contact" className="rounded-lg px-4 py-2 text-sm font-semibold bg-[var(--color-accent)] text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-[0_0_15px_rgba(242,102,114,0.4)]">
                 {requestDemo}
              </Link>
           </div>
        </nav>

        {/* Mega Menu Overlay */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              onMouseEnter={clearMenuTimeout}
              onMouseLeave={handleMenuLeave}
              className="absolute top-full mt-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--color-glass-border)] bg-[color:var(--color-panel)] backdrop-blur-2xl p-6 shadow-2xl pointer-events-auto"
            >
               <div className="grid grid-cols-2 gap-4">
                  {(navItems.find(i => i.label === activeMenu && 'children' in i) as { children?: readonly { title: string; desc: string; path?: string }[] } | undefined)?.children?.map((child) => (
                    <Link key={child.title} to={child.path || '#'} className="group cursor-pointer rounded-xl p-4 transition-colors border border-transparent hover:bg-[color:var(--color-glass)] hover:border-[color:var(--color-glass-border)] block">
                       <h4 className="font-semibold text-text group-hover:text-primary transition-colors flex items-center gap-2">
                         {child.title}
                         <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">→</span>
                       </h4>
                       <p className="text-sm text-text-muted mt-1">{child.desc}</p>
                    </Link>
                  ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Dim Background when Menu Active */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[color:var(--color-overlay-soft)] backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>
    </>
  );
};
