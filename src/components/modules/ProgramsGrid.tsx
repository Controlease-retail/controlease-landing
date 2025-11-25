import {
  AcademicCapIcon,
  BeakerIcon,
  UsersIcon,
  DocumentTextIcon,
  CalculatorIcon,
  ChartBarIcon,
  BellIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { ComponentProps } from 'react';

type Program = {
  name: string;
  description: string;
  highlight: string;
  icon: string;
};

type ProgramsGridProps = {
  title: string;
  subtitle: string;
  items: ReadonlyArray<Program>;
};

type IconComponent = React.ComponentType<ComponentProps<typeof AcademicCapIcon>>;

const iconMap: Record<string, IconComponent> = {
  AcademicCap: AcademicCapIcon,
  Beaker: BeakerIcon,
  Users: UsersIcon,
  DocumentText: DocumentTextIcon,
  Calculator: CalculatorIcon,
  ChartBar: ChartBarIcon,
  Bell: BellIcon,
  ArrowDownTray: ArrowDownTrayIcon,
  UserGroup: UserGroupIcon,
};

export const ProgramsGrid = ({ title, subtitle, items }: ProgramsGridProps) => (
  <section id="programs" className="bg-bg-alt px-6 py-16">
    <div className="mx-auto max-w-5xl text-center">
      <p className="text-xs uppercase tracking-widest text-text-muted">{subtitle}</p>
      <h2 className="mt-2 text-3xl font-semibold text-text">{title}</h2>
    </div>
    <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
      {items.map((program) => {
        const Icon = (iconMap[program.icon] || AcademicCapIcon) as IconComponent;
        return (
          <motion.article
            key={program.name}
            className="flex flex-col gap-4 rounded-3xl border border-divider/80 bg-surface px-5 py-6 text-left shadow-lg transition hover:-translate-y-1 hover:border-accent"
            whileHover={{ scale: 1.01 }}
          >
            <Icon className="h-8 w-8 text-accent" aria-hidden="true" />
            <div>
              <h3 className="text-xl font-semibold text-text">{program.name}</h3>
              <p className="mt-2 text-sm text-text-muted">{program.description}</p>
            </div>
            <span className="inline-flex w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {program.highlight}
            </span>
          </motion.article>
        );
      })}
    </div>
  </section>
);
