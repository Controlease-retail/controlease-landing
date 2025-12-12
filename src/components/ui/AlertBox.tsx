import { cn } from '../../utils/cn';
import { ExclamationTriangleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

export const AlertBox = () => {
  return (
    <div className={cn(
      "bg-warning/10 border border-warning/50 rounded-lg p-4 mb-6",
      "flex items-start gap-4"
    )}>
      <ExclamationTriangleIcon className="h-6 w-6 text-warning flex-shrink-0 mt-1" />
      <div>
        <p className="font-semibold text-warning">Manager action required</p>
        <p className="text-sm text-warning/80">This lease has been flagged for renewal or closure. Please review and take action.</p>
        <button className="mt-2 flex items-center gap-2 px-3 py-1 bg-warning/20 text-warning text-sm font-semibold rounded-md hover:bg-warning/30 transition-colors">
          View renewal <ArrowRightIcon className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
