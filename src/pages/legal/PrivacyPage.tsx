import { useI18n } from '../../i18n';
import { LegalPageLayout } from './_LegalPageLayout';

export const PrivacyPage = () => {
  const { dictionary } = useI18n();
  const t = dictionary.legal.privacy;

  return (
    <LegalPageLayout
      title={t.title}
      date={dictionary.legal.date}
      lastUpdatedLabel={dictionary.legal.lastUpdated}
      sections={t.sections}
    />
  );
};
