import { motion } from 'framer-motion';
import { useI18n } from '../../i18n';

export const ClientsSection = () => {
  const { dictionary } = useI18n();
  const content = dictionary.landing.clients;

  return (
    <section className="bg-bg-alt py-24 border-t border-accent/20 transition-colors relative overflow-hidden">
      {/* Accent gradient backgrounds */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text mb-4">
            {content.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Partners</span>
          </h2>
          <p className="text-text-muted">{content.subtitle}</p>
        </div>

        {/* Logo Strip */}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 transition-all duration-500 hover:opacity-100 mb-24">
           {content.logos.map((client) => (
             <img key={client.name} src={client.logo} alt={client.name} className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all" />
           ))}
        </div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-3 gap-8">
           {content.caseStudies.map((study, idx) => (
             <motion.div
               key={study.company}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="group relative p-8 rounded-3xl bg-surface/50 border-2 border-accent/10 hover:border-accent/30 hover:bg-surface/70 transition-all backdrop-blur-sm"
             >
                <div className="absolute top-8 right-8 text-xs font-bold uppercase tracking-wider text-accent border border-accent/30 bg-accent/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  {study.tag}
                </div>
                <div className="text-4xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                  {study.metric}
                </div>
                <p className="text-lg text-text font-medium mb-4">{study.description}</p>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                   <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30" />
                   {study.company}
                </div>
                {/* Accent glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-accent/0 group-hover:bg-accent/5 transition-colors pointer-events-none" />
             </motion.div>
           ))}
        </div>

      </div>
    </section>
  );
};

