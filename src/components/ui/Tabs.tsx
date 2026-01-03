import { cn } from '../../utils/cn';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useI18n } from '../../i18n';

const tabKeys = [
  { key: 'brochure', tour: "tab-brochure" },
  { key: 'signatories', tour: "tab-signatories" },
  { key: 'basic', tour: "tab-basic" },
  { key: 'financial', tour: "tab-financial" },
  { key: 'breakOptions', tour: "tab-break" },
  { key: 'guarantees', tour: "tab-guarantees" },
  { key: 'details', tour: "tab-details" },
];

export const Tabs = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.leaseOverview.tabs;

  return (
    <div className="flex items-center justify-between border-b border-[color:var(--color-divider)] mb-6">
      <div className="flex items-center gap-6">
        {tabKeys.map((tab, index) => (
          <button
            key={tab.key}
            data-tour={tab.tour}
            className={cn(
              "py-3 text-sm font-medium border-b-2 transition-colors",
              index === 2
                ? "border-accent text-accent"
                : "border-transparent text-text-muted hover:text-text-body"
            )}
          >
            {t[tab.key as keyof typeof t] || tab.key}
          </button>
        ))}
      </div>
      <button
        data-tour="tab-history"
        className="flex items-center gap-2 px-3 py-1.5 border border-[color:var(--color-border)] rounded-md text-sm text-text-muted hover:bg-bg-alt transition-colors"
      >
        <ClockIcon className="h-4 w-4" />
        {t.history}
      </button>
    </div>
  );
};
