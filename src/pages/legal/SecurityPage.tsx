import { useI18n } from '../../i18n';

export const SecurityPage = () => {
  useI18n(); // Keep for potential future i18n usage
  const date = new Date().toLocaleDateString();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Security</h1>
        <p className="text-[var(--color-text-muted)] mb-8">Last updated: {date}</p>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Our Commitment to Security</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              At Controlease, security is not just a feature—it's the foundation of our platform. We understand that you trust us with your most sensitive lease portfolio data, financial metrics, and strategic plans. We employ enterprise-grade security measures to ensure your data remains confidential, integrity-protected, and available when you need it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Data Protection</h2>
            <div className="space-y-4">
              <div className="bg-[var(--color-bg-alt)] p-6 rounded-xl border border-[var(--color-border)]">
                <h3 className="font-semibold text-lg mb-2">Encryption</h3>
                <p className="text-[var(--color-text-muted)]">
                  All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We utilize industry-standard key management services to protect encryption keys.
                </p>
              </div>
              <div className="bg-[var(--color-bg-alt)] p-6 rounded-xl border border-[var(--color-border)]">
                <h3 className="font-semibold text-lg mb-2">Data Isolation</h3>
                <p className="text-[var(--color-text-muted)]">
                  Customer data is logically separated in our multi-tenant architecture. Strict access controls ensure that one tenant cannot access another tenant's data.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Infrastructure Security</h2>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
              <li><strong>Cloud Security:</strong> Our infrastructure is hosted on top-tier cloud providers (AWS/GCP/Azure) with SOC 2 Type II certifications.</li>
              <li><strong>Network Protection:</strong> We employ Web Application Firewalls (WAF), DDoS protection, and Virtual Private Cloud (VPC) isolation to shield our services.</li>
              <li><strong>Monitoring:</strong> 24/7 automated security monitoring and alerting systems to detect and respond to suspicious activities immediately.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Compliance & Governance</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              We align our security practices with international standards including SOC 2, ISO 27001, and GDPR. Regular third-party penetration testing and vulnerability assessments are conducted to validate our security posture.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Access Control</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Controlease supports Single Sign-On (SSO) via SAML 2.0 and OIDC, allowing you to manage user access through your own identity provider. We enforce Multi-Factor Authentication (MFA) for all administrative access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Reporting Issues</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              If you believe you have found a security vulnerability in Controlease, please report it to us immediately at security@controlease.com. We operate a responsible disclosure program and will work with you to remediate the issue.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

