import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { ContactPage } from './pages/contact/ContactPage';
import { HomePage } from './pages/home/HomePage';
import { ImpactPage } from './pages/impact/ImpactPage';
import { PartnersPage } from './pages/partners/PartnersPage';
import { ProgramsPage } from './pages/programs/ProgramsPage';
import { PrivacyPage } from './pages/legal/PrivacyPage';
import { TermsPage } from './pages/legal/TermsPage';
import { SecurityPage as LegalSecurityPage } from './pages/legal/SecurityPage';
import { SecurityPage } from './pages/security/SecurityPage';
import { LeaseIntelligencePage } from './pages/platform/LeaseIntelligencePage';
import { PortfolioAnalyticsPage } from './pages/platform/PortfolioAnalyticsPage';
import { AIAssistantPage } from './pages/platform/AIAssistantPage';
import { DashboardPage } from './pages/platform/DashboardPage';
import { DirectoryPage } from './pages/platform/DirectoryPage';
import { AboutPage } from './pages/company/AboutPage';
import { CareersPage } from './pages/company/CareersPage';
import NotFoundPage from './pages/NotFoundPage';
import { PricingPage } from './pages/pricing/PricingPage';
import { DataOnboardingPage } from './pages/services/DataOnboardingPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="partners" element={<PartnersPage />} />
      <Route path="pricing" element={<PricingPage />} />
      <Route path="programs" element={<ProgramsPage />} />
      <Route path="impact" element={<ImpactPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="terms" element={<TermsPage />} />
      <Route path="security" element={<SecurityPage />} />
      <Route path="legal/security" element={<LegalSecurityPage />} />

      {/* Services nested routes */}
      <Route path="services">
        <Route path="data-onboarding" element={<DataOnboardingPage />} />
      </Route>

      {/* Platform nested routes */}
      <Route path="platform">
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="lease-intelligence" element={<LeaseIntelligencePage />} />
        <Route path="portfolio-analytics" element={<PortfolioAnalyticsPage />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
        <Route path="directory" element={<DirectoryPage />} />
      </Route>

      {/* Company nested routes */}
      <Route path="company">
        <Route path="about" element={<AboutPage />} />
        <Route path="careers" element={<CareersPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
