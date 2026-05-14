import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../../i18n';

const STORAGE_KEY = 'cookie_consent';

export const CookieBanner = () => {
  const { dictionary } = useI18n();
  const t = dictionary.cookieBanner;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 lg:bottom-0 left-0 right-0 z-[9998] p-4"
        >
          <div className="max-w-3xl mx-auto rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 text-sm text-[color:var(--color-text-muted)]">
              <span>{t.text} </span>
              <Link to="/cookies" className="text-accent hover:underline">
                {t.link}
              </Link>
            </div>
            <button
              onClick={handleAccept}
              className="shrink-0 px-5 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t.accept}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
