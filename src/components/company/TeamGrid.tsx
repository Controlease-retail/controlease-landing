import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

interface TeamGridProps {
  members: TeamMember[];
}

export const TeamGrid = ({ members }: TeamGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 text-center hover:border-[color:var(--color-primary)]/50 transition-colors flex flex-col items-center"
        >
          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] group-hover:border-[color:var(--color-primary)] transition-colors">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[color:var(--color-text-muted)]">
                {member.name.charAt(0)}
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-[color:var(--color-text)] max-w-[10rem] mx-auto leading-tight mb-1">{member.name}</h3>
          <p className="text-sm font-medium text-[color:var(--color-primary)] mb-3">{member.role}</p>
          <p className="text-sm text-[color:var(--color-text-muted)] leading-relaxed mb-4">
            {member.bio}
          </p>
          
          {member.linkedin && (
            <a 
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--color-text-muted)] hover:text-[#0A66C2] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          )}
        </motion.div>
      ))}
    </div>
  );
};
