import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactForm } from '../../components/modules/ContactForm';
import { NetworkGlobe } from '../../components/visuals/NetworkGlobe';
import { TechCard } from '../../components/ui/TechCard';
import { ClockIcon, PhoneIcon, BuildingOfficeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { StatusBadge } from '../../components/ui/StatusBadge';

export const ContactPage = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleFormSubmit = () => {
    setFormStatus('success');
    // Reset status after 5 seconds
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* Hero with 3D Globe */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-[color:var(--color-surface-muted)]">
        <div className="absolute inset-0 w-full h-full">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <NetworkGlobe />
          </Canvas>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <StatusBadge status="active" pulse className="mb-6 pointer-events-auto">
              Global Support 24/7
            </StatusBadge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
              We're here to help you modernize your lease operations. Reach out to our global team.
            </p>
          </motion.div>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--color-bg)] pointer-events-none" />
      </section>
      
      {/* Contact Form Section */}
      <section className="px-6 py-16 -mt-20 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[color:var(--color-surface)] rounded-2xl border border-[color:var(--color-border)] p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[color:var(--color-text)] mb-2">
                Send us a message
              </h2>
              <p className="text-[color:var(--color-text-muted)]">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                    <CheckCircleIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[color:var(--color-text)] mb-2">Message Sent!</h3>
                  <p className="text-[color:var(--color-text-muted)]">
                    Thank you for reaching out. Our team will be in touch shortly.
                  </p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-6 text-[color:var(--color-primary)] font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <ContactForm onSubmit={handleFormSubmit} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Support Tiers */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[color:var(--color-text)] mb-4">
              Support Tiers
            </h2>
            <p className="text-[color:var(--color-text-muted)]">
              Choose the support level that fits your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TechCard
              title="Basic Support"
              description="Email support with 48-hour response time. Access to documentation and knowledge base."
              icon={<ClockIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Professional Support"
              description="Priority email and phone support with 24-hour response time. Dedicated account manager."
              icon={<PhoneIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Enterprise Support"
              description="24/7 phone support, dedicated success manager, custom training, and SLA guarantees."
              icon={<BuildingOfficeIcon className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[color:var(--color-text)] mb-4">
              Global Offices
            </h2>
          </div>
          <div className="grid max-w-4xl mx-auto gap-6 md:grid-cols-2">
            {[
              { name: 'Global HQ', email: 'contact@controlease.com', phone: '+1 (555) 123-4567', loc: 'New York, USA' },
              { name: 'European Hub', email: 'eu-support@controlease.com', phone: '+44 20 7123 4567', loc: 'London, UK' }
            ].map((office) => (
              <article key={office.name} className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-lg hover:border-[color:var(--color-primary)]/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[color:var(--color-text)]">{office.name}</h3>
                  <StatusBadge status="neutral">{office.loc}</StatusBadge>
                </div>
                <p className="text-sm text-[color:var(--color-text-muted)] mb-2 flex items-center gap-2">
                  <span className="font-semibold">Email:</span> {office.email}
                </p>
                <p className="text-sm text-[color:var(--color-text-muted)] flex items-center gap-2">
                  <span className="font-semibold">Phone:</span> {office.phone}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
