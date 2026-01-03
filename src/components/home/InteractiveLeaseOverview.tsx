import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, ChevronDownIcon, MinusIcon, PlusIcon, HomeIcon, BellIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon, ChartBarIcon, EyeIcon } from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';
import { LeaseFormSkeleton } from './LeaseFormSkeleton';
import { Sidebar } from '../layout/Sidebar';
import { StatusBadge } from '../ui/StatusBadge';
import { AlertBox } from '../ui/AlertBox';
import { Tabs } from '../ui/Tabs';
import { FeatureTour, type TourStep } from '../ui/FeatureTour';
import { useI18n } from '../../i18n';

// Mobile Bottom Navigator (matching the real app)
const MobileBottomNav = ({ nav }: { nav: { home: string; manage: string; activity: string; more: string } }) => (
  <div className="absolute bottom-0 left-0 right-0 bg-[color:var(--color-surface)] border-t border-[color:var(--color-border)] px-4 py-2 flex items-center justify-around z-10">
    <button className="flex flex-col items-center gap-0.5 text-[color:var(--color-text-muted)] py-1 px-3">
      <HomeIcon className="w-5 h-5" />
      <span className="text-[10px]">{nav.home}</span>
    </button>
    <button className="flex flex-col items-center gap-0.5 text-accent py-1 px-3">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
      <span className="text-[10px]">{nav.manage}</span>
    </button>
    <button className="flex flex-col items-center gap-0.5 text-[color:var(--color-text-muted)] py-1 px-3">
      <BellIcon className="w-5 h-5" />
      <span className="text-[10px]">{nav.activity}</span>
    </button>
    <button className="flex flex-col items-center gap-0.5 text-[color:var(--color-text-muted)] py-1 px-3">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
      <span className="text-[10px]">{nav.more}</span>
    </button>
  </div>
);

// Mobile Scrollable Tabs (matching the real app)
interface MobileFormTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { brochure: string; signatories: string; basic: string; financial: string; guarantees: string };
}

const MobileFormTabs = ({ activeTab, onTabChange, tabs }: MobileFormTabsProps) => {
  const tabItems = [
    { key: 'brochure', label: tabs.brochure },
    { key: 'signatories', label: tabs.signatories },
    { key: 'basic', label: tabs.basic },
    { key: 'financial', label: tabs.financial },
    { key: 'guarantees', label: tabs.guarantees },
  ];

  return (
    <div className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <div className="flex items-center">
        <div
          className="flex-1 flex overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {tabItems.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                className={cn(
                  "relative mr-6 whitespace-nowrap px-1 py-4 text-sm font-medium transition flex-shrink-0",
                  isActive ? "text-accent" : "text-[color:var(--color-text-muted)]"
                )}
                onClick={() => onTabChange(tab.key)}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-accent"
                    layoutId="mobile-tab-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        {/* History Button */}
        <button className="flex-shrink-0 mr-4 p-2 rounded-lg border border-[color:var(--color-border)] text-accent hover:bg-accent/5">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Form Field Component (matching real app style)
const FormField = ({ label, value, suffix }: { label: string; value: string; suffix?: string }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-[color:var(--color-text)]">{label}</label>
    <div className="flex items-center px-4 py-3 rounded-xl bg-[color:var(--color-bg-alt)] text-[color:var(--color-text)]">
      <span className="flex-1">{value}</span>
      {suffix && <span className="text-[color:var(--color-text-muted)] text-sm">{suffix}</span>}
    </div>
  </div>
);

// Form Section Card (matching real app style)
const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-2xl p-5 space-y-5">
    <div className="flex items-center gap-2">
      <DocumentTextIcon className="w-5 h-5 text-accent" />
      <h4 className="font-semibold text-accent">{title}</h4>
      <button className="ml-1 text-[color:var(--color-text-muted)]">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      </button>
    </div>
    {children}
  </div>
);

// Floating Action Buttons (matching real app)
const FloatingActions = () => (
  <div className="absolute right-4 bottom-24 flex flex-col gap-3 z-20">
    <button className="w-12 h-12 rounded-full bg-accent text-white shadow-lg flex items-center justify-center">
      <ChartBarIcon className="w-5 h-5" />
    </button>
    <button className="w-12 h-12 rounded-full bg-accent text-white shadow-lg flex items-center justify-center">
      <DocumentTextIcon className="w-5 h-5" />
    </button>
    <button className="w-12 h-12 rounded-full bg-accent text-white shadow-lg flex items-center justify-center">
      <ChatBubbleLeftRightIcon className="w-5 h-5" />
    </button>
  </div>
);

// Financial Subtabs Component
interface FinancialSubtabsProps {
  activeSubtab: string;
  onSubtabChange: (tab: string) => void;
  sections: { rent: string; variableRent: string; expenses: string };
}

const FinancialSubtabs = ({ activeSubtab, onSubtabChange, sections }: FinancialSubtabsProps) => {
  const subtabs = [
    { key: 'rent', label: sections.rent },
    { key: 'variable', label: sections.variableRent },
    { key: 'expenses', label: sections.expenses },
  ];

  return (
    <div className="bg-[color:var(--color-surface)] rounded-lg border border-[color:var(--color-border)] p-1.5 mb-4">
      <div className="flex gap-1.5">
        {subtabs.map((tab) => {
          const isActive = tab.key === activeSubtab;
          return (
            <button
              key={tab.key}
              onClick={() => onSubtabChange(tab.key)}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-all",
                isActive
                  ? "bg-accent text-white"
                  : "bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] border border-[color:var(--color-border)]"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Mobile Lease Detail View (matching the real app at /leasing-contracts?id=xxx&tab=basic)
const MobileLeaseDetailView = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.leaseOverview;
  const [activeTab, setActiveTab] = useState('basic');
  const [financialSubtab, setFinancialSubtab] = useState('rent');

  return (
    <div className="bg-[color:var(--color-bg)] rounded-2xl overflow-hidden shadow-2xl border border-[color:var(--color-border)] h-[620px] flex flex-col relative">
      {/* Header */}
      <div className="bg-[color:var(--color-surface)] px-4 py-4 flex items-center gap-3">
        <button className="text-[color:var(--color-text-muted)]">
          <ChevronDownIcon className="w-6 h-6 rotate-90" />
        </button>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <h3 className="font-bold text-lg text-[color:var(--color-text)]">Tienda 1</h3>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500 text-white">
            {t.fields.active}
          </span>
        </div>
        <button className="text-[color:var(--color-text-muted)]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>

      {/* Scrollable Tabs */}
      <MobileFormTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={t.tabs} />

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20 bg-[color:var(--color-bg-alt)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            {activeTab === 'basic' && (
              <>
                <FormSection title={t.sections.generalInfo}>
                  <div className="space-y-4">
                    <FormField label={t.mobileFields.name} value="Tienda 1" />
                    <FormField label={t.mobileFields.surface} value="1.001" suffix="m2" />
                    <FormField label={t.mobileFields.unitNumber} value="A-021" />
                    <FormField label={t.mobileFields.contractCode} value="111" />
                    <FormField label={t.mobileFields.contractReference} value="REF-2024-001" />
                    <FormField label={t.mobileFields.cadastralReference} value="9872054VK4897S" />
                  </div>
                </FormSection>

                <FormSection title={t.sections.location}>
                  <div className="space-y-4">
                    <FormField label={t.fields.country} value="Spain" />
                    <FormField label={t.mobileFields.region} value="Comunidad de Madrid" />
                    <FormField label={t.fields.city} value="Madrid" />
                    <FormField label={t.fields.address} value="Calle Gran Vía 42, 3rd Floor" />
                    <FormField label={t.fields.postalCode} value="28013" />
                  </div>
                </FormSection>

                <FormSection title={t.sections.contractType}>
                  <div className="space-y-4">
                    <FormField label={t.fields.type} value="Shopping Center" />
                  </div>
                </FormSection>
              </>
            )}

            {activeTab === 'financial' && (
              <>
                <FinancialSubtabs activeSubtab={financialSubtab} onSubtabChange={setFinancialSubtab} sections={t.sections} />

                {financialSubtab === 'rent' && (
                  <FormSection title={t.sections.rent}>
                    <div className="space-y-4">
                      <FormField label={t.mobileFields.signedRentYearly} value="54,000.00" suffix="€" />
                      <FormField label={t.mobileFields.invoicedRentYearly} value="54,000.00" suffix="€" />
                      <FormField label={t.mobileFields.monthlyRent} value="4,500.00" suffix="€" />
                      <FormField label={t.mobileFields.pricePerSqmYearly} value="53.95" suffix="€" />
                      <FormField label={t.mobileFields.freePeriod} value="2" suffix={t.fields.months} />
                      <FormField label={t.mobileFields.keyMoney} value="0.00" suffix="€" />
                    </div>
                  </FormSection>
                )}

                {financialSubtab === 'variable' && (
                  <FormSection title={t.sections.variableRent}>
                    <div className="space-y-4">
                      <FormField label={t.mobileFields.salesReport} value={t.fields.monthly} />
                      <FormField label={t.mobileFields.variableRentClause} value={t.mobileFields.overThreshold} />
                      <FormField label={t.fields.threshold} value="500,000.00" suffix="€" />
                      <FormField label={t.mobileFields.effortRate} value="8.5" suffix="%" />
                    </div>
                  </FormSection>
                )}

                {financialSubtab === 'expenses' && (
                  <FormSection title={t.mobileFields.chargesAndFees}>
                    <div className="space-y-4">
                      <FormField label={t.mobileFields.serviceChargesYearly} value="6,000.00" suffix="€" />
                      <FormField label={t.mobileFields.marketingYearly} value="1,200.00" suffix="€" />
                      <FormField label={t.mobileFields.ibiYearly} value="2,400.00" suffix="€" />
                      <FormField label={t.mobileFields.ecop} value="5,000.00" suffix="€" />
                      <FormField label={t.mobileFields.fitOut} value="15,000.00" suffix="€" />
                    </div>
                  </FormSection>
                )}
              </>
            )}

            {activeTab === 'guarantees' && (
              <>
                <FormSection title={t.sections.legalDeposit}>
                  <div className="space-y-4">
                    <FormField label={t.fields.amount} value="9,000.00" suffix="€" />
                    <FormField label={t.fields.months} value="2" suffix={t.fields.months} />
                  </div>
                </FormSection>

                <FormSection title={t.sections.additionalGuarantees}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium text-[color:var(--color-text)]">{t.fields.bankGuarantee}</span>
                      <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                      </div>
                    </div>
                    <FormField label={t.fields.months} value="3" suffix={t.fields.months} />
                    <FormField label={t.fields.amount} value="13,500.00" suffix="€" />
                    <FormField label={t.mobileFields.renewalDate} value="01/01/2025" />
                  </div>
                </FormSection>

                <FormSection title={t.mobileFields.gbeo}>
                  <div className="space-y-4">
                    <FormField label={t.fields.amount} value="4,500.00" suffix="€" />
                    <FormField label={t.fields.months} value="1" suffix={t.fields.months} />
                  </div>
                </FormSection>
              </>
            )}

            {activeTab === 'signatories' && (
              <>
                <FormSection title={t.sections.landlords}>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                      <div className="space-y-3">
                        <FormField label={t.fields.name} value="Inmobiliaria Centro S.L." />
                        <FormField label={t.mobileFields.cifNif} value="B12345678" />
                        <FormField label={t.fields.address} value="Paseo de la Castellana 100" />
                      </div>
                    </div>
                  </div>
                </FormSection>

                <FormSection title={t.sections.brands}>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                      <div className="space-y-3">
                        <FormField label={t.fields.name} value="RetailCo España" />
                        <FormField label={t.fields.contact} value="María García" />
                        <FormField label={t.fields.email} value="m.garcia@retailco.es" />
                      </div>
                    </div>
                  </div>
                </FormSection>

                <FormSection title={t.sections.consultants}>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                      <div className="space-y-3">
                        <FormField label={t.fields.name} value="CBRE Spain" />
                        <FormField label={t.fields.contact} value="Carlos López" />
                      </div>
                    </div>
                  </div>
                </FormSection>
              </>
            )}

            {activeTab === 'brochure' && (
              <>
                <FormSection title={t.mobile.imageGallery}>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="aspect-square rounded-lg bg-[color:var(--color-bg-alt)] border border-[color:var(--color-border)] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-[color:var(--color-text-muted)] text-xs">{t.mobile.storeFront}</span>
                      </div>
                    </div>
                    <div className="aspect-square rounded-lg bg-[color:var(--color-bg-alt)] border border-[color:var(--color-border)] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                        <span className="text-[color:var(--color-text-muted)] text-xs">{t.mobile.interior}</span>
                      </div>
                    </div>
                    <div className="aspect-square rounded-lg bg-[color:var(--color-bg-alt)] border border-dashed border-[color:var(--color-border)] flex items-center justify-center">
                      <PlusIcon className="w-6 h-6 text-[color:var(--color-text-muted)]" />
                    </div>
                  </div>
                </FormSection>

                <FormSection title={t.sections.location}>
                  <div className="aspect-video rounded-lg bg-[color:var(--color-bg-alt)] border border-[color:var(--color-border)] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-8 h-8 mx-auto text-blue-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <span className="text-xs text-blue-600 dark:text-blue-400">Madrid, Spain</span>
                      </div>
                    </div>
                  </div>
                </FormSection>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* Bottom Navigator */}
      <MobileBottomNav nav={t.nav} />
    </div>
  );
};

const useTourSteps = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.tour.steps;

  const tourSteps: TourStep[] = [
    {
      targetSelector: '[data-tour="sidebar-nav"]',
      title: t.sidebar.title,
      description: t.sidebar.description,
      position: 'right',
      tooltipOffset: 220,
      autoDismissHintsOnNext: true,
      hints: [
        {
          id: 'hint-home',
          targetSelector: '[data-tour="sidebar-home"]',
          text: t.sidebarHints.home,
          position: 'right',
          dismissible: true,
        },
        {
          id: 'hint-leases',
          targetSelector: '[data-tour="sidebar-leases"]',
          text: t.sidebarHints.leases,
          position: 'right',
          dismissible: true,
        },
        {
          id: 'hint-upload',
          targetSelector: '[data-tour="sidebar-upload"]',
          text: t.sidebarHints.upload,
          position: 'right',
          dismissible: true,
        },
        {
          id: 'hint-alerts',
          targetSelector: '[data-tour="sidebar-alerts"]',
          text: t.sidebarHints.alerts,
          position: 'right',
          dismissible: true,
        },
        {
          id: 'hint-scope',
          targetSelector: '[data-tour="sidebar-scope"]',
          text: t.sidebarHints.scope,
          position: 'right',
          dismissible: true,
        },
      ],
    },
    {
      targetSelector: '[data-tour="status-badge"]',
      title: t.status.title,
      description: t.status.description,
      position: 'bottom',
    },
    {
      targetSelector: '[data-tour="alert-box"]',
      title: t.alert.title,
      description: t.alert.description,
      position: 'bottom',
    },
    {
      targetSelector: '[data-tour="tabs"]',
      title: t.tabs.title,
      description: t.tabs.description,
      position: 'bottom',
      tooltipOffset: 80,
      autoDismissHintsOnNext: true,
      hints: [
        {
          id: 'hint-financial',
          targetSelector: '[data-tour="tab-financial"]',
          text: t.tabsHints.financial,
          position: 'bottom',
          dismissible: true,
        },
        {
          id: 'hint-guarantees',
          targetSelector: '[data-tour="tab-guarantees"]',
          text: t.tabsHints.guarantees,
          position: 'top',
          dismissible: true,
        },
        {
          id: 'hint-details',
          targetSelector: '[data-tour="tab-details"]',
          text: t.tabsHints.details,
          position: 'bottom',
          dismissible: true,
        },
        {
          id: 'hint-history',
          targetSelector: '[data-tour="tab-history"]',
          text: t.tabsHints.history,
          position: 'bottom',
          dismissible: true,
        },
      ],
    },
    {
      targetSelector: '[data-tour="action-buttons"]',
      title: t.actions.title,
      description: t.actions.description,
      position: 'left',
      tooltipOffset: 220,
      autoDismissHintsOnNext: true,
      hints: [
        {
          id: 'hint-projection-btn',
          targetSelector: '[data-tour="projection-button"]',
          text: t.actionsHints.projection,
          position: 'left',
          dismissible: true,
        },
        {
          id: 'hint-pdf-btn',
          targetSelector: '[data-tour="pdf-button"]',
          text: t.actionsHints.pdf,
          position: 'left',
          dismissible: true,
        },
        {
          id: 'hint-chat-btn',
          targetSelector: '[data-tour="chat-button"]',
          text: t.actionsHints.chat,
          position: 'left',
          dismissible: true,
        },
      ],
    },
    {
      targetSelector: '[data-tour="projection-button"]',
      title: t.projectionOpen.title,
      description: t.projectionOpen.description,
      position: 'left',
      requireClick: true,
      disableBack: true,
    },
    {
      targetSelector: '[data-tour="projection-panel"]',
      title: t.projectionPanel.title,
      description: t.projectionPanel.description,
      position: 'left',
      tooltipOffset: 100,
      autoDismissHintsOnNext: true,
      disableBack: true,
      hints: [
        {
          id: 'hint-proj-tabs',
          targetSelector: '[data-tour="projection-tabs"]',
          text: t.projectionHints.tabs,
          position: 'left',
          dismissible: true,
        },
        {
          id: 'hint-proj-controls',
          targetSelector: '[data-tour="projection-controls"]',
          text: t.projectionHints.controls,
          position: 'left',
          dismissible: true,
        },
        {
          id: 'hint-proj-scenarios',
          targetSelector: '[data-tour="projection-scenarios"]',
          text: t.projectionHints.scenarios,
          position: 'left',
          dismissible: true,
        },
        {
          id: 'hint-close-projection',
          targetSelector: '[data-tour="close-sidebar"]',
          text: t.projectionHints.close,
          position: 'left',
          dismissible: false,
        },
      ],
      requireClick: true,
      clickSelector: '[data-tour="close-sidebar"]',
    },
    {
      targetSelector: '[data-tour="pdf-button"]',
      title: t.pdfOpen.title,
      description: t.pdfOpen.description,
      position: 'left',
      requireClick: true,
      disableBack: true,
    },
    {
      targetSelector: '[data-tour="projection-panel"]',
      title: t.pdfPanel.title,
      description: t.pdfPanel.description,
      position: 'left',
      tooltipOffset: 100,
      autoDismissHintsOnNext: true,
      disableBack: true,
      hints: [
        {
          id: 'hint-pdf-preview',
          targetSelector: '[data-tour="pdf-preview"]',
          text: t.pdfHints.preview,
          position: 'left',
          dismissible: true,
        },
        {
          id: 'hint-pdf-format',
          targetSelector: '[data-tour="pdf-format"]',
          text: t.pdfHints.format,
          position: 'top',
          dismissible: true,
        },
        {
          id: 'hint-close-pdf',
          targetSelector: '[data-tour="close-pdf-sidebar"]',
          text: t.pdfHints.close,
          position: 'left',
          dismissible: false,
        },
      ],
      requireClick: true,
      clickSelector: '[data-tour="close-pdf-sidebar"]',
      completionMessage: {
        title: t.completion.title,
        description: t.completion.description,
      },
    },
  ];

  return tourSteps;
};

export const InteractiveLeaseOverview = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.leaseOverview;
  const tourNav = dictionary.home.tour.nav;
  const tourSteps = useTourSteps();

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSidebar, setActiveSidebar] = useState<'projection' | 'pdf' | null>(null);
  const [showTextExtraction, setShowTextExtraction] = useState(false);
  const [activeProjectionTab, setActiveProjectionTab] = useState<'rent' | 'sales' | 'budget'>('rent');
  const [projectionViewMode, setProjectionViewMode] = useState<'chart' | 'table'>('chart');
  const [projectionGranularity, setProjectionGranularity] = useState<'monthly' | 'yearly'>('yearly');

  const toggleSidebar = (sidebar: 'projection' | 'pdf') => {
    setActiveSidebar(prev => prev === sidebar ? null : sidebar);
  };

  const closeSidebar = () => setActiveSidebar(null);

  const toggleTextExtraction = () => {
    setShowTextExtraction(prev => !prev);
  };

  return (
    <section className="py-16 md:py-32 px-4 md:px-6 relative bg-[color:var(--color-bg-alt)]">
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
        <h2 className="text-2xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">{t.title}</h2>
        <p className="text-base md:text-xl text-[color:var(--color-text-muted)]">{t.description}</p>
      </div>

      {/* Mobile View */}
      <div className="md:hidden max-w-sm mx-auto">
        <MobileLeaseDetailView />
      </div>

      {/* Desktop View */}
      <div ref={containerRef} className="hidden md:flex max-w-7xl mx-auto shadow-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] relative overflow-hidden rounded-xl">
        {/* Mocked Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 p-6 pr-16 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-[color:var(--color-text)]">Retail Store A</h3>
              <div data-tour="status-badge">
                <StatusBadge status="lapsed">{t.fields.lapsed}</StatusBadge>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md text-sm font-medium hover:bg-accent-dark transition-colors">
              {t.fields.viewRenewal} <span className="ml-2">→</span>
            </button>
          </div>
          
          <div data-tour="alert-box">
            <AlertBox />
          </div>
          <div data-tour="tabs">
            <Tabs />
          </div>
          <div data-tour="action-buttons" className="!absolute !bottom-6 !right-6 flex flex-col gap-3 z-30">
            {/* Lease Projection Bubble (Priority 3 - Top) */}
            <button
              data-tour="projection-button"
              className={cn(
                "relative w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-dark transition-transform hover:scale-110",
                activeSidebar === 'projection' && "ring-2 ring-white ring-offset-2 ring-offset-accent"
              )} 
              title="View Lease Projections"
              onClick={() => toggleSidebar('projection')}
            >
              <ChartBarIcon className="h-5 w-5" />
              <EyeIcon className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full bg-white p-0.5 text-accent" />
            </button>

            {/* PDF Viewer Bubble (Priority 2 - Middle) */}
            <button
              data-tour="pdf-button"
              className={cn(
                "relative w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-dark transition-transform hover:scale-110",
                activeSidebar === 'pdf' && "ring-2 ring-white ring-offset-2 ring-offset-accent"
              )}
              title="View Contract"
              onClick={() => toggleSidebar('pdf')}
            >
              <DocumentTextIcon className="h-5 w-5" />
              <EyeIcon className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full bg-white p-0.5 text-accent" />
            </button>

            {/* ChatBot Bubble (Priority 1 - Bottom) */}
            <button
              data-tour="chat-button"
              className={cn(
                "w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-dark transition-colors"
              )}
              title="Chat Assistant"
            >
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </button>
          </div>
          
          <LeaseFormSkeleton />

          {/* Simulated Sidebars Overlay */}
          <AnimatePresence>
            {activeSidebar && (
              <motion.div
                key="sidebar-overlay"
                className="absolute inset-0 z-[53] flex justify-end p-6"
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
                  onClick={closeSidebar}
                />
                
                {/* Sidebar Content */}
                <motion.div
                  key="sidebar-content"
                  data-tour="projection-panel"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                  className={cn(
                    "relative w-[550px] h-full bg-[color:var(--color-surface)] border-[color:var(--color-border)] shadow-2xl flex flex-col rounded-xl"
                  )}
                >
                  {/* Sidebar Header */}
                  <div className="flex flex-col items-center justify-between p-4 border-b border-[color:var(--color-border)] rounded-t-xl">
                    {activeSidebar === 'projection' ? (
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between w-full mb-4">
                          <h3 className="text-lg font-semibold text-[color:var(--color-text)]">{t.projection.title}</h3>
                          <button
                            data-tour="close-sidebar"
                            onClick={closeSidebar}
                            className="p-1 rounded-full hover:bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        {/* Main Tabs */}
                        <div data-tour="projection-tabs" className="flex border-b border-[color:var(--color-border)]">
                          <button
                            onClick={() => setActiveProjectionTab('rent')}
                            className={cn(
                              "px-4 py-2 text-sm font-medium transition-colors",
                              activeProjectionTab === 'rent'
                                ? "text-accent border-b-2 border-accent"
                                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                            )}
                          >
                            {t.projection.tabs.rent}
                          </button>
                          <button
                            onClick={() => setActiveProjectionTab('sales')}
                            className={cn(
                              "px-4 py-2 text-sm font-medium transition-colors",
                              activeProjectionTab === 'sales'
                                ? "text-accent border-b-2 border-accent"
                                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                            )}
                          >
                            {t.projection.tabs.sales}
                          </button>
                          <button
                            onClick={() => setActiveProjectionTab('budget')}
                            className={cn(
                              "px-4 py-2 text-sm font-medium transition-colors",
                              activeProjectionTab === 'budget'
                                ? "text-accent border-b-2 border-accent"
                                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                            )}
                          >
                            {t.projection.tabs.budget}
                          </button>
                        </div>
                        {/* Controls */}
                        <div data-tour="projection-controls" className="flex items-center justify-between mt-3 gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[color:var(--color-text-muted)]">{t.projection.granularity}</span>
                            <div className="flex rounded-md border border-[color:var(--color-border)] overflow-hidden">
                              <button
                                onClick={() => setProjectionGranularity('monthly')}
                                className={cn(
                                  "px-2 py-1 text-xs font-medium transition-colors",
                                  projectionGranularity === 'monthly'
                                    ? "bg-accent text-white"
                                    : "bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"
                                )}
                              >
                                {t.projection.monthly}
                              </button>
                              <button
                                onClick={() => setProjectionGranularity('yearly')}
                                className={cn(
                                  "px-2 py-1 text-xs font-medium transition-colors",
                                  projectionGranularity === 'yearly'
                                    ? "bg-accent text-white"
                                    : "bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"
                                )}
                              >
                                {t.projection.yearly}
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[color:var(--color-text-muted)]">{t.projection.view}</span>
                            <div className="flex rounded-md border border-[color:var(--color-border)] overflow-hidden">
                              <button
                                onClick={() => setProjectionViewMode('chart')}
                                className={cn(
                                  "px-2 py-1 text-xs font-medium transition-colors",
                                  projectionViewMode === 'chart'
                                    ? "bg-accent text-white"
                                    : "bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"
                                )}
                              >
                                {t.projection.chart}
                              </button>
                              <button
                                onClick={() => setProjectionViewMode('table')}
                                className={cn(
                                  "px-2 py-1 text-xs font-medium transition-colors",
                                  projectionViewMode === 'table'
                                    ? "bg-accent text-white"
                                    : "bg-[color:var(--color-surface)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"
                                )}
                              >
                                {t.projection.table}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative">
                            <select className="pr-8 appearance-none bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md py-2 pl-3 text-sm font-medium text-[color:var(--color-text)]">
                              <option>{t.pdf.contractDocument}</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[color:var(--color-text-muted)]">
                              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                          </div>
                          <div className="relative">
                            <select className="pr-8 appearance-none bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md py-2 pl-3 text-sm font-medium text-[color:var(--color-text)]">
                              <option>{t.pdf.locateInformation}</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[color:var(--color-text-muted)]">
                              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input type="text" value="1 / 203" readOnly className="w-20 text-center bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md py-2 text-sm font-medium text-[color:var(--color-text)]" />
                            <button className="p-2 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"><MinusIcon className="h-4 w-4" /></button>
                            <button className="p-2 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"><PlusIcon className="h-4 w-4" /></button>
                            <div className="relative">
                              <button
                                data-tour="pdf-format"
                                onClick={toggleTextExtraction}
                                className={cn(
                                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                  showTextExtraction
                                    ? "bg-accent text-white hover:bg-accent-dark"
                                    : "bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"
                                )}
                              >
                                {t.pdf.format}
                              </button>
                            </div>
                          </div>
                          <button
                            data-tour="close-pdf-sidebar"
                            onClick={closeSidebar}
                            className="p-1 rounded-full hover:bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Body */}
                  <div className="flex-1 overflow-y-auto p-4 bg-[color:var(--color-bg-alt)] rounded-b-xl">
                    {activeSidebar === 'projection' ? (
                      <div className="space-y-4">
                        {/* Rent Projections Tab */}
                        {activeProjectionTab === 'rent' && (
                          <>
                            {/* Scenario Toggle */}
                            <div data-tour="projection-scenarios" className="flex items-center gap-2">
                              <span className="text-xs text-[color:var(--color-text-muted)]">{t.projection.scenarios}</span>
                              <div className="flex gap-1">
                                <button className="px-2 py-1 text-xs rounded border border-red-300 bg-red-50 text-red-600 dark:bg-red-900/30 dark:border-red-500/50 dark:text-red-400">{t.projection.worst}</button>
                                <button className="px-2 py-1 text-xs rounded border border-accent bg-accent text-white">{t.projection.expected}</button>
                                <button className="px-2 py-1 text-xs rounded border border-green-300 bg-green-50 text-green-600 dark:bg-green-900/30 dark:border-green-500/50 dark:text-green-400">{t.projection.best}</button>
                              </div>
                            </div>
                            {/* Chart View */}
                            {projectionViewMode === 'chart' ? (
                              <div data-tour="projection-chart" className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                                <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-3">{t.projection.rentProjectionWithIpc}</h4>
                                <div className="h-48 relative">
                                  {/* Line Chart with multiple scenarios */}
                                  <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
                                    {/* Grid lines */}
                                    <line x1="0" y1="20" x2="100" y2="20" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2" />
                                    <line x1="0" y1="40" x2="100" y2="40" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2" />
                                    <line x1="0" y1="60" x2="100" y2="60" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2" />
                                    {/* Best case (green) */}
                                    <polyline fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4" points="0,55 20,50 40,45 60,38 80,32 100,25" opacity="0.6" />
                                    {/* Expected case (accent) - main line */}
                                    <polyline fill="none" stroke="var(--color-accent)" strokeWidth="2" points="0,60 20,55 40,50 60,45 80,40 100,35" />
                                    {/* Worst case (red) */}
                                    <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" points="0,65 20,62 40,58 60,55 80,52 100,50" opacity="0.6" />
                                    {/* Data points for expected */}
                                    <circle cx="0" cy="60" r="3" fill="var(--color-accent)" />
                                    <circle cx="20" cy="55" r="3" fill="var(--color-accent)" />
                                    <circle cx="40" cy="50" r="3" fill="var(--color-accent)" />
                                    <circle cx="60" cy="45" r="3" fill="var(--color-accent)" />
                                    <circle cx="80" cy="40" r="3" fill="var(--color-accent)" />
                                    <circle cx="100" cy="35" r="3" fill="var(--color-accent)" />
                                  </svg>
                                  <div className="flex justify-between text-xs text-[color:var(--color-text-muted)] mt-2">
                                    <span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028</span><span>2029</span>
                                  </div>
                                </div>
                                {/* Legend */}
                                <div className="flex items-center gap-4 mt-3 text-xs">
                                  <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#22c55e]"></span> {t.projection.best}</div>
                                  <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-accent"></span> {t.projection.expected}</div>
                                  <div className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[#ef4444]"></span> {t.projection.worst}</div>
                                </div>
                              </div>
                            ) : (
                              /* Table View */
                              <div data-tour="projection-chart" className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                                <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-3">{t.projection.rentProjectionTable}</h4>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-left text-xs text-[color:var(--color-text)]">
                                    <thead>
                                      <tr className="border-b border-[color:var(--color-border)]">
                                        <th className="py-2 pr-2">{t.projection.year}</th>
                                        <th className="py-2 pr-2">{t.projection.structural}</th>
                                        <th className="py-2 pr-2">{t.projection.ipcPercent}</th>
                                        <th className="py-2 pr-2">{t.projection.payable}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="border-b border-[color:var(--color-border)]"><td className="py-1.5">2024</td><td>€48,000</td><td className="text-success">+2.8%</td><td className="font-medium">€49,344</td></tr>
                                      <tr className="border-b border-[color:var(--color-border)]"><td className="py-1.5">2025</td><td>€49,344</td><td className="text-success">+3.2%</td><td className="font-medium">€50,923</td></tr>
                                      <tr className="border-b border-[color:var(--color-border)]"><td className="py-1.5">2026</td><td>€50,923</td><td className="text-success">+2.5%</td><td className="font-medium">€52,196</td></tr>
                                      <tr><td className="py-1.5">2027</td><td>€52,196</td><td className="text-success">+2.9%</td><td className="font-medium">€53,710</td></tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                            {/* Key Metrics */}
                            <div data-tour="projection-metrics" className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                              <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-2">{t.projection.summary}</h4>
                              <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col">
                                  <span className="text-xs text-[color:var(--color-text-muted)]">{t.projection.totalFiveYear}</span>
                                  <span className="font-mono text-sm font-bold text-[color:var(--color-text)]">€256,173</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs text-[color:var(--color-text-muted)]">{t.projection.avgIpc}</span>
                                  <span className="font-mono text-sm font-bold text-success">+2.85%</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Sales Projections Tab */}
                        {activeProjectionTab === 'sales' && (
                          <>
                            <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                              <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-3">{t.projection.salesProjection}</h4>
                              <div className="h-40 relative">
                                <svg className="w-full h-full" viewBox="0 0 100 80" preserveAspectRatio="none">
                                  <line x1="0" y1="40" x2="100" y2="40" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="2" />
                                  <polyline fill="none" stroke="var(--color-accent)" strokeWidth="2" points="0,70 20,55 40,60 60,45 80,35 100,30" />
                                  <circle cx="0" cy="70" r="3" fill="var(--color-accent)" />
                                  <circle cx="20" cy="55" r="3" fill="var(--color-accent)" />
                                  <circle cx="40" cy="60" r="3" fill="var(--color-accent)" />
                                  <circle cx="60" cy="45" r="3" fill="var(--color-accent)" />
                                  <circle cx="80" cy="35" r="3" fill="var(--color-accent)" />
                                  <circle cx="100" cy="30" r="3" fill="var(--color-accent)" />
                                </svg>
                                <div className="flex justify-between text-xs text-[color:var(--color-text-muted)] mt-2">
                                  <span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028</span><span>2029</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded">{t.projection.highConfidence}</span>
                              </div>
                              <p className="text-xs text-[color:var(--color-text-muted)]">{t.projection.patternDetected}</p>
                            </div>
                          </>
                        )}

                        {/* Budget Projections Tab */}
                        {activeProjectionTab === 'budget' && (
                          <>
                            <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                              <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-3">{t.projection.budgetOverview}</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-[color:var(--color-text)]">
                                  <thead>
                                    <tr className="border-b border-[color:var(--color-border)]">
                                      <th className="py-2 pr-2">{t.projection.year}</th>
                                      <th className="py-2 pr-2">{t.projection.tabs.sales}</th>
                                      <th className="py-2 pr-2">{t.projection.tabs.rent}</th>
                                      <th className="py-2 pr-2">{t.projection.ebitda}</th>
                                      <th className="py-2 pr-2">{t.projection.roi}</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-[color:var(--color-border)]"><td className="py-1.5">2024</td><td>€420K</td><td>€49K</td><td className="text-success">€85K</td><td>12.4%</td></tr>
                                    <tr className="border-b border-[color:var(--color-border)]"><td className="py-1.5">2025</td><td>€455K</td><td>€51K</td><td className="text-success">€98K</td><td>14.2%</td></tr>
                                    <tr><td className="py-1.5">2026</td><td>€490K</td><td>€52K</td><td className="text-success">€112K</td><td>15.8%</td></tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                              <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-2">{t.projection.kpis}</h4>
                              <div className="grid grid-cols-2 gap-3 text-xs">
                                <div><span className="text-[color:var(--color-text-muted)]">{t.projection.effortRate}</span> <span className="font-medium">11.7%</span></div>
                                <div><span className="text-[color:var(--color-text-muted)]">{t.projection.payback}</span> <span className="font-medium">4.2 yrs</span></div>
                                <div><span className="text-[color:var(--color-text-muted)]">{t.projection.pricePerSqm}</span> <span className="font-medium">€3,850</span></div>
                                <div><span className="text-[color:var(--color-text-muted)]">{t.projection.breakeven}</span> <span className="font-medium">€185K</span></div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col gap-4 relative">
                        <div data-tour="pdf-preview" className="bg-white p-8 shadow-sm min-h-[500px] text-gray-800 text-xs font-mono border border-gray-200 relative">
                          <div className="flex justify-between mb-8 border-b pb-4">
                            <h1 className="text-xl font-serif font-bold">CONTRACT TITLE</h1>
                            <span className="text-gray-500">Ref: [Contract Ref]</span>
                          </div>
                          <p className="mb-4"><strong>PARTIES:</strong></p>
                          <p className="mb-4">This Document (the "Agreement") is entered into as of [Start Date], by and between:</p>
                          <p className="mb-4 pl-4">LANDLORD: [Landlord Name]<br/>TENANT: [Tenant Name]</p>
                          <p className="mb-4"><strong>PREMISES:</strong></p>
                          <p className="mb-4">The Landlord leases to the Tenant the premises located at [Property Address] (the "Premises").</p>
                          <p className="mb-4"><strong>TERM:</strong></p>
                          <p className="mb-4">The initial term of this Agreement shall be for a period of [Term Length] years, commencing on [Start Date] and ending on [End Date].</p>
                          <p className="mb-4"><strong>RENT:</strong></p>
                          <p className="mb-4">The Tenant agrees to pay base rent in the amount of [Rent Amount] per month...</p>
                          <div className="mt-8 pt-4 border-t border-dashed border-gray-300">
                            <p className="italic text-center text-gray-400">{t.pdf.endOfPreview}</p>
                          </div>

                          {showTextExtraction && (
                            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm p-8 text-gray-800 text-xs font-mono overflow-y-auto">
                              <h2 className="text-lg font-bold mb-4">{t.pdf.extractedRawText}</h2>
                              <pre className="block whitespace-pre-wrap text-sm leading-relaxed">
CONTRACT TITLE
Ref: [Contract Ref]

PARTIES:
This Document (the "Agreement") is entered into as of [Start Date], by and between:
LANDLORD: [Landlord Name]
TENANT: [Tenant Name]

PREMISES:
The Landlord leases to the Tenant the premises located at [Property Address] (the "Premises").

TERM:
The initial term of this Agreement shall be for a period of [Term Length] years, commencing on [Start Date] and ending on [End Date].

RENT:
The Tenant agrees to pay base rent in the amount of [Rent Amount] per month...
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Feature Tour - only on desktop, must be direct child of containerRef for correct positioning */}
        <FeatureTour
          steps={tourSteps}
          containerRef={containerRef as React.RefObject<HTMLElement>}
          startDelay={1000}
          allowClose={false}
          navTranslations={tourNav}
        />
      </div>
    </section>
  );
};
