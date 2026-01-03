import { cn } from '../../utils/cn';
import { ExclamationTriangleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useI18n } from '../../i18n';

export const AlertBox = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.leaseOverview.fields;

  return (
    <div className={cn(
      "bg-warning/10 border border-zinc-300 dark:border-zinc-600 rounded-lg p-4 mb-6",
      "flex items-start gap-4"
    )}>
      <ExclamationTriangleIcon className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
      <div>
        <p className="font-semibold text-warning">{t.managerActionRequired}</p>
        <p className="text-sm text-warning/80">{t.leaseRenewalMessage}</p>
        <button className="mt-2 flex items-center gap-2 px-3 py-1 bg-warning/20 text-warning text-sm font-semibold rounded-md hover:bg-warning/30 transition-colors">
          {t.viewRenewalLink} <ArrowRightIcon className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
