import { CustomersCarousel } from '../../components/modules/CustomersCarousel';
import { PartnerTierCard } from '../../components/modules/PartnerTierCard';
import { TechCard } from '../../components/ui/TechCard';
import { useI18n } from '../../i18n';
import { CodeBracketIcon, PuzzlePieceIcon, KeyIcon } from '@heroicons/react/24/outline';

export const PartnersPage = () => {
  const { dictionary } = useI18n();

  const partnerTiers = [
    {
      name: 'Bronze',
      description: 'Basic partnership with API access and documentation.',
      benefits: [
        'API access',
        'Documentation',
        'Community support',
        'Basic integration guides',
      ],
      icon: <CodeBracketIcon className="w-8 h-8 text-[color:var(--color-primary)]" />,
    },
    {
      name: 'Silver',
      description: 'Enhanced partnership with priority support and co-marketing opportunities.',
      benefits: [
        'Everything in Bronze',
        'Priority API support',
        'Co-marketing opportunities',
        'Dedicated partner manager',
        'Early access to features',
      ],
      icon: <PuzzlePieceIcon className="w-8 h-8 text-[color:var(--color-primary)]" />,
    },
    {
      name: 'Gold',
      description: 'Premium partnership with custom integrations and revenue sharing.',
      benefits: [
        'Everything in Silver',
        'Custom integrations',
        'Revenue sharing',
        'Joint go-to-market',
        'White-label options',
        'Custom training',
      ],
      icon: <KeyIcon className="w-8 h-8 text-[color:var(--color-primary)]" />,
    },
  ];

  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">
      {/* Partner Program Tiers */}
      <section className="py-24 px-6 bg-[color:var(--color-bg-alt)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
              Partner Program
            </h1>
            <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
              Join our partner ecosystem and integrate Controlease with your platform. Choose the partnership tier that fits your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {partnerTiers.map((tier, index) => (
              <PartnerTierCard key={tier.name} tier={tier} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Integration Capabilities */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--color-text)] to-[color:var(--color-text-muted)]">
              Integration Capabilities
            </h2>
            <p className="text-xl text-[color:var(--color-text-muted)] max-w-3xl mx-auto">
              Connect Controlease with your existing systems and workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TechCard
              title="REST API"
              description="Comprehensive RESTful API with full CRUD operations for all platform features. OAuth 2.0 authentication and rate limiting."
              icon={<CodeBracketIcon className="w-6 h-6" />}
            />
            <TechCard
              title="Webhooks"
              description="Real-time event notifications. Get notified when leases are created, updated, or when critical dates approach."
              icon={<PuzzlePieceIcon className="w-6 h-6" />}
            />
            <TechCard
              title="SSO Integration"
              description="Single Sign-On support via SAML 2.0 and OIDC. Integrate with your identity provider for seamless authentication."
              icon={<KeyIcon className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* Customer Logos */}
      <section className="py-16 px-6 bg-[color:var(--color-bg-alt)]">
        <CustomersCarousel {...dictionary.partners} />
      </section>
    </main>
  );
};

