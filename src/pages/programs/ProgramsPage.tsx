import { ProgramsGrid } from '../../components/modules/ProgramsGrid';
import { useI18n } from '../../i18n';

export const ProgramsPage = () => {
  const { dictionary } = useI18n();

  return (
    <main>
      <ProgramsGrid {...dictionary.programs} />
    </main>
  );
};

