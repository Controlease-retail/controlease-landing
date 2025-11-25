import { useI18n } from '../../i18n';

export const TermsPage = () => {
  useI18n(); // Keep for potential future i18n usage
  const date = new Date().toLocaleDateString();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-[var(--color-text-muted)] mb-8">Last updated: {date}</p>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Controlease Inc. ("we," "us" or "our"), concerning your access to and use of the Controlease website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property Rights</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Representations</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-[var(--color-text-muted)]">
              <li>All registration information you submit will be true, accurate, current, and complete.</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
              <li>You are not a minor in the jurisdiction in which you reside.</li>
              <li>You will not access the Site through automated or non-human means, whether through a bot, script or otherwise.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Prohibited Activities</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Term and Termination</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              These Terms of Service shall remain in full force and effect while you use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

