import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../theme/ThemeProvider';
import { cn } from '../../utils/cn';

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={cn(
        "inline-flex items-center justify-center rounded-full w-8 h-8 transition-all",
        className || "text-text-muted hover:text-[color:var(--color-text)] hover:bg-[color:var(--color-glass)]"
      )}
    >
      {theme === 'light' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </button>
  );
};
