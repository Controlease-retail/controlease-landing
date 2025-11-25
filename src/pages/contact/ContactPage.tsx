import { CTASection } from '../../components/modules/CTASection';
import { ContactForm } from '../../components/modules/ContactForm';
import { useI18n } from '../../i18n';
import { TechCard } from '../../components/ui/TechCard';
import { ClockIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

export const ContactPage = () => {
  const { dictionary } = useI18n();
  const contact = dictionary.contact;

  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      <CTASection
        title={contact.title}
        description={contact.description}
        primaryCta={contact.primaryCta}
        secondaryCta={contact.secondaryCta}
      />
      
      {/* Contact Form Section */}
      <section className="px-6 py-16 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[color:var(--color-text)] mb-4">
              Get in Touch
            </h2>
            <p className="text-[color:var(--color-text-muted)]">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>
          <div className="bg-[color:var(--color-surface)] rounded-2xl border border-[color:var(--color-border)] p-8 shadow-lg">
            <ContactForm />
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
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[color:var(--color-text)] mb-4">
              Office Locations
            </h2>
          </div>
          <div className="grid max-w-4xl mx-auto gap-6 md:grid-cols-2">
            {contact.offices.map((office: any) => (
              <article key={office.name} className="rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-[color:var(--color-text)] mb-4">{office.name}</h3>
                <p className="text-sm text-[color:var(--color-text-muted)] mb-2">
                  <strong>Email:</strong> {office.email}
                </p>
                <p className="text-sm text-[color:var(--color-text-muted)]">
                  <strong>Phone:</strong> {office.phone}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

