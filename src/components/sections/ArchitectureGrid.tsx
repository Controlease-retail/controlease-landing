import { TechCard } from '../ui/TechCard';
import {
  DocumentTextIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BellIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
  DocumentMagnifyingGlassIcon,
  CalculatorIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CurrencyDollarIcon,
  BuildingStorefrontIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  PresentationChartLineIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useI18n } from '../../i18n';

const featureKeys = [
  { key: 'leaseIntelligence', icon: <DocumentTextIcon className="w-5 h-5" /> },
  { key: 'aiAssistant', icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> },
  { key: 'documentExtraction', icon: <DocumentMagnifyingGlassIcon className="w-5 h-5" /> },
  { key: 'smartDashboard', icon: <ChartBarIcon className="w-5 h-5" /> },
  { key: 'portfolioAnalytics', icon: <PresentationChartLineIcon className="w-5 h-5" /> },
  { key: 'automatedAlerts', icon: <BellIcon className="w-5 h-5" /> },
  { key: 'rentProjections', icon: <CurrencyDollarIcon className="w-5 h-5" /> },
  { key: 'salesForecasting', icon: <CalculatorIcon className="w-5 h-5" /> },
  { key: 'directoryContacts', icon: <GlobeAltIcon className="w-5 h-5" /> },
  { key: 'roleBasedAccess', icon: <ShieldCheckIcon className="w-5 h-5" /> },
  { key: 'importExport', icon: <ArrowDownTrayIcon className="w-5 h-5" /> },
  { key: 'versionControl', icon: <ClockIcon className="w-5 h-5" /> },
  { key: 'multiTenant', icon: <BuildingStorefrontIcon className="w-5 h-5" /> },
  { key: 'leaseRenewals', icon: <ArrowPathIcon className="w-5 h-5" /> },
  { key: 'documentGallery', icon: <FolderIcon className="w-5 h-5" /> },
  { key: 'teamManagement', icon: <UserGroupIcon className="w-5 h-5" /> },
  { key: 'contractTemplates', icon: <DocumentDuplicateIcon className="w-5 h-5" /> },
  { key: 'customConfiguration', icon: <AdjustmentsHorizontalIcon className="w-5 h-5" /> },
];

export const ArchitectureGrid = () => {
  const { t, dictionary } = useI18n();
  const modules = dictionary.home.platformModules;

  return (
    <section className="py-24 px-6 bg-[color:var(--color-bg)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">
            {t('home.insights.title')}
          </h2>
          <p className="text-[color:var(--color-text-muted)] max-w-2xl mx-auto text-lg">
            {t('home.insights.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featureKeys.map((feature, index) => {
            const module = modules[feature.key as keyof typeof modules];
            return (
              <TechCard
                key={feature.key}
                title={module.title}
                description={module.description}
                icon={feature.icon}
                tag={module.tag}
                delay={index * 50}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
