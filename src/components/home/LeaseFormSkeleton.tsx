import { cn } from '../../utils/cn';
import { DocumentTextIcon, MapPinIcon, QuestionMarkCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export const LeaseFormSkeleton = () => {
  return (
    <div className={cn("w-full mx-auto")}>
      <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3 text-lg font-semibold text-text-body">
          <DocumentTextIcon className="h-6 w-6 text-primary" />
          General Information
          <QuestionMarkCircleIcon className="h-4 w-4 text-text-muted" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Name" value="Retail Store A" />
          <FormField label="Surface" value="500 m²" />
          <FormField label="Unit Number" value="L1-A01" />
          <FormField label="Contract Code" value="CON-RA001" />
          <FormField label="Contract Reference" placeholder="Enter contract reference..." />
          <FormField label="Cadastral Reference" placeholder="Enter cadastral reference..." />
        </div>

        <div className="flex items-center gap-3 text-lg font-semibold text-text-body mt-8">
          <MapPinIcon className="h-6 w-6 text-primary" />
          Location
          <QuestionMarkCircleIcon className="h-4 w-4 text-text-muted" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormDropdownField label="Country" value="Spain" />
          <FormDropdownField label="Region" value="Galicia" />
          <FormDropdownField label="State / Province" value="La Coruña" />
          <FormDropdownField label="City" value="Other" />
          <div className="md:col-span-2">
            <FormField label="Address" value="Pasadizo Raquel Bonilla 479, Barcelona, España" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, value, placeholder }: { label: string; value?: string; placeholder?: string }) => (
  <div>
    <label className="block text-xs font-medium text-text-muted mb-1">{label}</label>
    <div className="h-8 bg-bg-alt rounded-md flex items-center px-3 text-sm text-text-body">
      {value || <span className="text-text-muted">{placeholder}</span>}
    </div>
  </div>
);

const FormDropdownField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-xs font-medium text-text-muted mb-1">{label}</label>
    <div className="h-8 bg-bg-alt rounded-md flex items-center justify-between px-3 text-sm text-text-body">
      <span>{value}</span>
      <ChevronDownIcon className="h-4 w-4 text-text-muted" />
    </div>
  </div>
);
