import { cn } from '../../utils/cn';
import { ClockIcon } from '@heroicons/react/24/outline';

const tabs = ["Brochure", "Signatories", "Basic", "Financial", "Break Options", "Guarantees", "Details"];

export const Tabs = () => {
  return (
    <div className="flex items-center justify-between border-b border-[color:var(--color-divider)] mb-6">
      <div className="flex items-center gap-6">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            className={cn(
              "py-3 text-sm font-medium border-b-2 transition-colors",
              index === 2 
                ? "border-primary text-primary" 
                : "border-transparent text-text-muted hover:text-text-body"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <button className="flex items-center gap-2 px-3 py-1.5 border border-[color:var(--color-border)] rounded-md text-sm text-text-muted hover:bg-bg-alt transition-colors">
        <ClockIcon className="h-4 w-4" />
        History
      </button>
    </div>
  );
};
