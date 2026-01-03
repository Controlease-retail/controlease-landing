import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { ChevronDownIcon, HomeIcon, CurrencyDollarIcon, BuildingOfficeIcon, PhoneIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../controls/ThemeToggle';
import { LanguageSwitcher } from '../controls/LanguageSwitcher';
import { useI18n } from '../../i18n';

type Timeout = ReturnType<typeof setTimeout>;

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 120; // Account for fixed header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const CommandBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { dictionary } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleAnchorClick = useCallback((e: React.MouseEvent, path: string) => {
    // Check if it's an anchor link (starts with /#)
    if (path.startsWith('/#')) {
      e.preventDefault();
      const sectionId = path.substring(2); // Remove '/#'

      if (location.pathname === '/') {
        // Already on homepage, just scroll
        scrollToSection(sectionId);
      } else {
        // Navigate to homepage first, then scroll
        navigate('/');
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 100);
      }

      setActiveMenu(null); // Close the menu
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-6 left-0 right-0 z-[9999] flex justify-center pointer-events-none px-4"
      >
        <nav 
          className="relative flex items-center justify-between rounded-2xl bg-[var(--color-secondary)] px-6 py-3 shadow-2xl pointer-events-auto transition-all duration-300 w-full max-w-6xl"
          onMouseLeave={handleMenuLeave}
        >
           {/* Logo */}
           <Link
             to="/"
             onClick={(e) => {
               e.preventDefault();
               if (location.pathname === '/') {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
               } else {
                 navigate('/');
               }
             }}
             className="flex items-center gap-3 font-bold text-white text-lg tracking-tight hover:opacity-80 transition-opacity"
           >
             <img src="/main_logo.svg" alt={brand} className="h-8 w-auto" />
             <span className="hidden sm:inline">{brand}</span>
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
           <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile: Language & Theme */}
              <div className="flex lg:hidden items-center gap-1">
                 <LanguageSwitcher className="text-white/80 hover:text-white !p-1.5" />
                 <ThemeToggle className="text-white/80 hover:text-white !p-1.5" />
              </div>

              {/* Desktop: Language & Theme with separator */}
              <div className="hidden lg:flex items-center gap-2 border-r border-white/20 pr-4 mr-2">
                 <LanguageSwitcher className="text-white/80 hover:text-white" />
                 <ThemeToggle className="text-white/80 hover:text-white" />
              </div>

              <Link to="/contact" className="text-sm font-medium text-white/90 hover:text-white transition-colors hidden sm:block">
                 {signIn}
              </Link>
              <Link to="/contact" className="rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-[var(--color-accent)] text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-[0_0_15px_rgba(242,102,114,0.4)]">
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
              className="absolute top-full mt-4 w-full max-w-3xl overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] backdrop-blur-2xl p-6 shadow-2xl pointer-events-auto"
            >
               <div className="grid grid-cols-2 gap-4">
                  {(navItems.find(i => i.label === activeMenu && 'children' in i) as { children?: readonly { title: string; desc: string; path?: string }[] } | undefined)?.children?.map((child) => (
                    <Link
                      key={child.title}
                      to={child.path || '#'}
                      onClick={(e) => handleAnchorClick(e, child.path || '#')}
                      className="group cursor-pointer rounded-xl p-4 transition-colors border border-transparent hover:bg-[color:var(--color-bg-alt)] hover:border-[color:var(--color-border)] block"
                    >
                       <h4 className="font-semibold text-[color:var(--color-text)] group-hover:text-accent transition-colors flex items-center gap-2">
                         {child.title}
                         <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent">→</span>
                       </h4>
                       <p className="text-sm text-[color:var(--color-text-muted)] mt-1">{child.desc}</p>
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
            className="fixed inset-0 z-[9990] bg-[color:var(--color-overlay-soft)] backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-4 left-4 right-4 z-[9999] bg-[var(--color-secondary)] rounded-2xl px-2 py-2 shadow-2xl">
        <div className="flex items-center justify-around">
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-colors",
              location.pathname === '/' ? "text-accent" : "text-white/70 hover:text-white"
            )}
          >
            <HomeIcon className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium">{dictionary.landing.commandBar.mobileNav?.home || 'Home'}</span>
          </Link>

          <Link
            to="/pricing"
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-colors",
              location.pathname === '/pricing' ? "text-accent" : "text-white/70 hover:text-white"
            )}
          >
            <CurrencyDollarIcon className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium">{dictionary.landing.commandBar.mobileNav?.pricing || 'Pricing'}</span>
          </Link>

          <Link
            to="/company/about"
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-colors",
              location.pathname.startsWith('/company') ? "text-accent" : "text-white/70 hover:text-white"
            )}
          >
            <BuildingOfficeIcon className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium">{dictionary.landing.commandBar.mobileNav?.company || 'Company'}</span>
          </Link>

          <Link
            to="/contact"
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-colors",
              location.pathname === '/contact' ? "text-accent" : "text-white/70 hover:text-white"
            )}
          >
            <PhoneIcon className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium">{dictionary.landing.commandBar.mobileNav?.contact || 'Contact'}</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-md transition-colors text-white/70 hover:text-white"
          >
            <Bars3Icon className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium">{dictionary.landing.commandBar.mobileNav?.menu || 'Menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[10001] bg-[var(--color-surface)] rounded-t-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 py-3 flex items-center justify-between">
                <h2 className="font-semibold text-[var(--color-text)]">{dictionary.landing.commandBar.mobileNav?.menu || 'Menu'}</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg hover:bg-[var(--color-bg-alt)] transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-[var(--color-text-muted)]" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <h3 className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                      {item.label}
                    </h3>
                    {'children' in item && item.children && item.children.length > 0 ? (
                      <div className="space-y-1">
                        {(item.children as readonly { title: string; desc: string; path?: string }[]).map((child) => (
                          <Link
                            key={child.title}
                            to={child.path || '#'}
                            onClick={(e) => {
                              handleAnchorClick(e, child.path || '#');
                              setMobileMenuOpen(false);
                            }}
                            className="block px-3 py-2 rounded-lg hover:bg-[var(--color-bg-alt)] transition-colors"
                          >
                            <span className="font-medium text-[var(--color-text)]">{child.title}</span>
                            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{child.desc}</p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        to={item.path || '#'}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-[var(--color-bg-alt)] transition-colors"
                      >
                        <span className="font-medium text-[var(--color-text)]">{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}

                {/* Quick Links */}
                <div className="pt-4 border-t border-[var(--color-border)] space-y-2">
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 rounded-lg bg-accent text-white font-semibold"
                  >
                    {requestDemo}
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-medium"
                  >
                    {signIn}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
