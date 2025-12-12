import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative py-8">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[color:var(--color-border)] transform md:-translate-x-1/2" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "relative flex flex-col md:flex-row items-start md:items-center gap-8",
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            )}
          >
            {/* Content Side */}
            <div className={cn(
              "flex-1 w-full md:w-1/2",
              // Mobile padding for the dot
              index % 2 === 0 ? "pr-12" : "pl-12",
              // Desktop padding to align correctly with the vertical line
              index % 2 === 0 ? "md:pr-0 md:pl-8" : "md:pl-0 md:pr-8"
            )}>
              <div className={cn(
                "p-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm hover:shadow-md transition-shadow",
                "text-left" // Always left-aligned text as per image
              )}>
                <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-[color:var(--color-primary)] bg-[color:var(--color-primary)]/10 rounded-full">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-[color:var(--color-text)] mb-2">{item.title}</h3>
                <p className="text-[color:var(--color-text-muted)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[color:var(--color-primary)] rounded-full border-4 border-[color:var(--color-bg)] transform -translate-x-1/2 z-10" />

            {/* Spacer Side */}
            <div className="hidden md:block flex-1 w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

