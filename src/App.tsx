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
import { SecurityPage } from './pages/legal/SecurityPage';
import { LeaseIntelligencePage } from './pages/platform/LeaseIntelligencePage';
import { PortfolioAnalyticsPage } from './pages/platform/PortfolioAnalyticsPage';
import { AIAssistantPage } from './pages/platform/AIAssistantPage';
import { DashboardPage } from './pages/platform/DashboardPage';
import { DirectoryPage } from './pages/platform/DirectoryPage';
import { RetailPage } from './pages/solutions/RetailPage';
import { CompliancePage } from './pages/solutions/CompliancePage';
import { DocumentationPage } from './pages/resources/DocumentationPage';
import { APIPage } from './pages/resources/APIPage';
import { CaseStudiesPage } from './pages/resources/CaseStudiesPage';
import { StatusPage } from './pages/resources/StatusPage';
import { AboutPage } from './pages/company/AboutPage';
import { CareersPage } from './pages/company/CareersPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="partners" element={<PartnersPage />} />
      <Route path="programs" element={<ProgramsPage />} />
      <Route path="impact" element={<ImpactPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="terms" element={<TermsPage />} />
      <Route path="security" element={<SecurityPage />} />
      
      {/* Platform nested routes */}
      <Route path="platform">
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="lease-intelligence" element={<LeaseIntelligencePage />} />
        <Route path="portfolio-analytics" element={<PortfolioAnalyticsPage />} />
        <Route path="ai-assistant" element={<AIAssistantPage />} />
        <Route path="directory" element={<DirectoryPage />} />
      </Route>
      
      {/* Solutions nested routes */}
      <Route path="solutions">
        <Route path="retail" element={<RetailPage />} />
        <Route path="compliance" element={<CompliancePage />} />
      </Route>
      
      {/* Resources nested routes */}
      <Route path="resources">
        <Route path="documentation" element={<DocumentationPage />} />
        <Route path="api" element={<APIPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="status" element={<StatusPage />} />
      </Route>
      
      {/* Company nested routes */}
      <Route path="company">
        <Route path="about" element={<AboutPage />} />
        <Route path="careers" element={<CareersPage />} />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
