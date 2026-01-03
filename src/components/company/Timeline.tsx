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
  const isFirst = (index: number) => index === 0;
  const isLast = (index: number) => index === items.length - 1;
  const isCentered = (index: number) => isFirst(index) || isLast(index);
  const isLeftCard = (index: number) => !isCentered(index) && (index % 2 === 1);

  return (
    <div className="relative py-8">
      {/* Vertical line - centered on desktop, left-aligned on mobile */}
      <div className="absolute left-6 md:left-1/2 top-24 bottom-24 w-0.5 bg-[color:var(--color-border)] md:transform md:-translate-x-1/2 z-0" />

      <div className="space-y-0">
        {items.map((item, index) => {
          // Centered cards (first and last) - centered on desktop, full width on mobile
          if (isCentered(index)) {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative flex",
                  "pl-14 md:pl-0 md:justify-center",
                  isFirst(index) ? "pt-4 pb-8 md:pb-12" : "pt-8 md:pt-12 pb-4"
                )}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 top-1/2 w-4 h-4 bg-accent rounded-full border-4 border-[color:var(--color-bg)] transform -translate-x-1/2 -translate-y-1/2 z-10" />

                {/* Card */}
                <div className="w-full md:max-w-md p-5 md:p-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm hover:shadow-md transition-shadow relative z-10 text-left md:text-center">
                  <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-accent bg-accent/10 rounded-full">
                    {item.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[color:var(--color-text)] mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-[color:var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          }

          // Left-side cards (desktop) - all cards left-aligned on mobile
          if (isLeftCard(index)) {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative py-4 flex items-center pl-14 md:pl-0"
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 top-1/2 w-4 h-4 bg-accent rounded-full border-4 border-[color:var(--color-bg)] transform -translate-x-1/2 -translate-y-1/2 z-10" />

                {/* Mobile: full width card / Desktop: left half with card */}
                <div className="w-full md:w-1/2 md:pr-8 flex md:justify-end">
                  <div className="w-full md:max-w-sm p-5 md:p-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm hover:shadow-md transition-shadow relative z-10 text-left md:text-right">
                    <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-accent bg-accent/10 rounded-full">
                      {item.year}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-[color:var(--color-text)] mb-2">{item.title}</h3>
                    <p className="text-sm md:text-base text-[color:var(--color-text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right half empty - hidden on mobile */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          }

          // Right-side cards (desktop) - all cards left-aligned on mobile
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative py-4 flex items-center pl-14 md:pl-0"
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 top-1/2 w-4 h-4 bg-accent rounded-full border-4 border-[color:var(--color-bg)] transform -translate-x-1/2 -translate-y-1/2 z-10" />

              {/* Left half empty - hidden on mobile */}
              <div className="hidden md:block w-1/2" />

              {/* Mobile: full width card / Desktop: right half with card */}
              <div className="w-full md:w-1/2 md:pl-8 flex justify-start">
                <div className="w-full md:max-w-sm p-5 md:p-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-sm hover:shadow-md transition-shadow relative z-10 text-left">
                  <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-accent bg-accent/10 rounded-full">
                    {item.year}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[color:var(--color-text)] mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base text-[color:var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
