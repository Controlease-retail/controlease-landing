import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[color:var(--color-bg)] px-6 py-24 text-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-150px] right-[-100px] w-[400px] h-[400px] rounded-full bg-accent opacity-[0.08] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-primary opacity-[0.08] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-md"
      >
        {/* Logo */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 mb-12 px-5 py-3 bg-[color:var(--color-secondary)] rounded-xl"
        >
          <img src="/main_logo.svg" alt="Controlease" className="h-8 w-auto" />
          <span className="font-bold text-xl text-white">Controlease</span>
        </Link>

        {/* 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[120px] sm:text-[150px] font-extrabold leading-none bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-[color:var(--color-text)] mb-3">
          Page not found
        </h1>

        <p className="text-[color:var(--color-text-muted)] text-lg mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white font-semibold rounded-lg transition-all hover:bg-accent-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
