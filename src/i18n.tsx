import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type Locale = 'en' | 'es' | 'pt';

const translations = {
  en: {
    localeLabel: 'English',
    nav: {
      home: 'Home',
      partners: 'Platform',
      programs: 'Modules',
      impact: 'Value',
      pricing: 'Pricing',
      contact: 'Contact',
    },
    home: {
      hero: {
        badge: 'Controlease',
        title: 'Smart Lease Management',
        description:
          'Controlease centralizes your contracts, gives you full portfolio visibility, and prevents costly errors. The SaaS platform for property owners, asset managers and operators.',
        primaryCta: 'Request a Demo',
        secondaryCta: 'Learn More',
        metrics: [
          { label: 'Lease Lifecycle', value: 'End-to-End' },
          { label: 'Data Source', value: 'Single Truth' },
          { label: 'Deployment', value: 'Cloud-Native' },
        ],
        problemStatement: 'Most organizations still manage leases across scattered folders, PDFs and spreadsheets — leading to missed deadlines, billing errors and hours wasted searching for information.',
      },
      pointers: {
        title: 'From Lease Chaos to Total Control',
        subtitle: '',
        items: [
          {
            title: 'Centralized Lease Portfolio',
            description: 'Bring all your contracts together in a single platform. Access key information, documents and financial terms instantly for every property and tenant in your portfolio. Gain full visibility across your entire organization.',
            stat: 'Full Visibility',
          },
          {
            title: 'Operational Control & Alerts',
            description: 'Never miss a critical lease event again. Controlease automatically tracks key milestones such as lease expirations, break options, rent reviews and increases, and contractual obligations. Stay ahead of deadlines and avoid costly mistakes.',
            stat: 'Automated Tracking',
          },
          {
            title: 'AI-Powered Contract Intelligence',
            description: 'Our AI reads lease agreements and extracts key contractual data automatically. Dates, financial terms, clauses and obligations become structured information you can analyze and manage. Your contracts stop being static PDFs and become operational data.',
            stat: 'AI Powered',
          },
        ],
      },
      insights: {
        title: 'Platform Modules',
        subtitle: 'A comprehensive suite of tools integrated into a seamless workflow.',
        items: [
          {
            title: 'Smart Dashboard',
            description: 'Visual KPIs, lease expirations, and sales forecasting at a glance.',
            tag: 'Analytics',
          },
          {
            title: 'Lease Contracts',
            description: 'Structured data models for rents, guarantees, and clauses.',
            tag: 'Core',
          },
          {
            title: 'AI Assistant',
            description: 'Ask questions about your leases in plain English. Get instant answers, insights, and recommendations.',
            tag: 'New',
          },
        ],
      },
      partnersPreview: {
        title: 'Trusted by leading retail portfolios',
        logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp', 'City Centers', 'Plaza Group', 'Market Square'],
      },
      notifications: {
        badge: 'Automated Alerts',
        title: 'Automatic Alerts for Critical Lease Events',
        description: 'Once your contracts are structured, Controlease automatically monitors every key milestone. You decide who receives each notification.',
        items: ['Lease Expirations', 'Break Options', 'Rent Increases or Reviews', 'Contractual Conditions', 'Renewal Deadlines', 'And Much More!'],
        emptyState: 'Notifications will appear here...',
        messages: {
          alert: [
            'Lease expiring soon: Retail Store B',
            'Rent deviation detected: Unit 101',
            'Break option window: Office 205',
            'Compliance doc overdue: Tenant A',
            'Rent increase: Warehouse D',
            'Lapsed lease alert: Kiosk E',
          ],
          info: [
            'New lease added: Unit 7',
            'Payment received: Store F',
            'Inspection scheduled: Building G',
            'New tenant onboarded: Cafe H',
          ],
          warning: [
            'High vacancy rate: Tower 1',
            'Potential default: Unit 302',
            'Maintenance pending: Retail J',
          ],
        },
      },
      pdfExtractor: {
        badge: 'AI-Powered',
        title: 'AI-Powered Lease Data Extraction',
        description: 'Upload any lease document and our AI automatically extracts critical information such as tenant information, start and end dates, rent terms, deposits and guarantees, break options, and contractual obligations. No manual data entry. No risk of human error.',
        upload: {
          title: 'Drop PDF here',
          subtitle: 'or click to browse',
          button: 'Select File',
        },
        processing: 'Processing document...',
        extracted: 'Extracted Data',
        fields: {
          tenant: 'Tenant',
          landlord: 'Landlord',
          property: 'Property',
          monthlyRent: 'Monthly Rent',
          startDate: 'Start Date',
          endDate: 'End Date',
          securityDeposit: 'Security Deposit',
          breakOption: 'Break Option',
        },
      },
      aiConsole: {
        title: 'AI Assistant for Lease Contracts',
        description: 'Interact with your contracts using natural language. Our AI can analyze lease agreements, generate portfolio reports, identify key clauses and obligations, and answer questions about your portfolio. Instead of searching through documents, simply ask.',
        placeholder: 'Ask about your portfolio...',
        thinking: 'Analyzing your portfolio...',
        messages: {
          welcome: "Hello! I'm your AI assistant. I can help you analyze your lease portfolio, find specific contracts, or generate reports. What would you like to know?",
          leasesExpiring: "I found 3 leases expiring in Q3 2025 in Spain. Here's a summary:",
          rentProjection: "Based on your current portfolio, here's the 5-year rent projection with worst, expected, and best case scenarios.",
        },
        prompts: {
          expiring: 'Show leases expiring in Q3 2025',
          rentProjection: 'Generate rent projection for next 5 years',
          portfolio: 'Analyze portfolio performance',
        },
        chart: {
          title: '5-Year Rent Projection',
          worst: 'Worst',
          expected: 'Expected',
          best: 'Best',
          cagr: 'Expected CAGR',
        },
      },
      leaseOverview: {
        title: 'Centralized Lease Portfolio Management',
        description: 'Manage all your lease contracts from one intuitive dashboard. Contracts are organized in clear and accessible records, allowing you to quickly access key information, documents and financial terms for every asset in your portfolio. Everything stays organized, searchable and always up to date.',
        tabs: {
          brochure: 'Brochure',
          signatories: 'Signatories',
          basic: 'Basic',
          financial: 'Financial',
          breakOptions: 'Break Options',
          guarantees: 'Guarantees',
          details: 'Details',
          history: 'History',
        },
        sections: {
          generalInfo: 'General Information',
          location: 'Location',
          contractType: 'Contract Type',
          rent: 'Rent',
          variableRent: 'Variable Rent',
          expenses: 'Expenses & Fees',
          legalDeposit: 'Legal Security Deposit',
          additionalGuarantees: 'Additional Guarantees',
          landlords: 'Landlords',
          brands: 'Brands',
          consultants: 'Consultants',
        },
        fields: {
          leaseName: 'Lease Name',
          status: 'Status',
          active: 'Active',
          lapsed: 'Lapsed',
          viewRenewal: 'View Renewal',
          managerActionRequired: 'Manager action required',
          leaseRenewalMessage: 'This lease has been flagged for renewal or closure. Please review and take action.',
          viewRenewalLink: 'View renewal',
          country: 'Country',
          city: 'City',
          address: 'Address',
          postalCode: 'Postal Code',
          stateProvince: 'State / Province',
          enterContractRef: 'Enter contract reference...',
          enterCadastralRef: 'Enter cadastral reference...',
          type: 'Type',
          retail: 'Retail',
          startDate: 'Start Date',
          endDate: 'End Date',
          baseRent: 'Base Rent',
          currency: 'Currency',
          frequency: 'Frequency',
          monthly: 'Monthly',
          percentage: 'Percentage',
          threshold: 'Threshold',
          commonExpenses: 'Common Expenses',
          marketingFee: 'Marketing Fee',
          months: 'months',
          bankGuarantee: 'Bank Guarantee',
          enabled: 'Enabled',
          amount: 'Amount',
          expiryDate: 'Expiry Date',
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          role: 'Role',
          primary: 'Primary',
          contact: 'Contact',
        },
        nav: {
          home: 'Home',
          manage: 'Manage',
          activity: 'Activity',
          more: 'More',
        },
        projection: {
          title: 'Lease Projections',
          tabs: { rent: 'Rent', sales: 'Sales', budget: 'Budget' },
          granularity: 'Granularity:',
          monthly: 'Monthly',
          yearly: 'Yearly',
          view: 'View:',
          chart: 'Chart',
          table: 'Table',
          scenarios: 'Scenarios:',
          worst: 'Worst',
          expected: 'Expected',
          best: 'Best',
          rentProjectionWithIpc: 'Rent Projection with IPC',
          rentProjectionTable: 'Rent Projection Table',
          year: 'Year',
          structural: 'Structural',
          ipcPercent: 'IPC %',
          payable: 'Payable',
          summary: 'Summary',
          totalFiveYear: 'Total (5Y)',
          avgIpc: 'Avg IPC',
          salesProjection: 'Sales Projection',
          highConfidence: 'High Confidence',
          patternDetected: 'Pattern detected: Steady growth with seasonal peaks in Q4',
          budgetOverview: 'Budget Overview',
          ebitda: 'EBITDA',
          roi: 'ROI',
          kpis: 'KPIs',
          effortRate: 'Effort Rate:',
          payback: 'Payback:',
          pricePerSqm: '€/m²:',
          breakeven: 'Break-even:',
        },
        pdf: {
          contractDocument: 'Contract Document',
          locateInformation: 'Locate Information',
          format: 'Format',
          extractedRawText: 'Extracted Raw Text:',
          endOfPreview: '--- End of Preview ---',
        },
        mobile: {
          storeFront: 'Store Front',
          interior: 'Interior',
          imageGallery: 'Image Gallery',
        },
        mobileFields: {
          name: 'Name',
          surface: 'Surface',
          unitNumber: 'Unit Number',
          contractCode: 'Contract Code',
          contractReference: 'Contract Reference',
          cadastralReference: 'Cadastral Reference',
          region: 'Region',
          signedRentYearly: 'Signed Rent (Yearly)',
          invoicedRentYearly: 'Invoiced Rent (Yearly)',
          monthlyRent: 'Monthly Rent',
          pricePerSqmYearly: '€/m² (Yearly)',
          freePeriod: 'Free Period',
          keyMoney: 'Key Money',
          salesReport: 'Sales Report',
          variableRentClause: 'Variable Rent Clause',
          effortRate: 'Effort Rate',
          serviceChargesYearly: 'Service Charges (Yearly)',
          marketingYearly: 'Marketing (Yearly)',
          ibiYearly: 'IBI (Yearly)',
          ecop: 'ECOP',
          fitOut: 'Fit Out',
          renewalDate: 'Renewal Date',
          gbeo: 'GBEO',
          cifNif: 'CIF/NIF',
          chargesAndFees: 'Charges & Fees',
          overThreshold: '5% over threshold',
        },
      },
      cta: {
        title: 'Bring Control to Your Lease Portfolio',
        description: 'Stop managing lease contracts across spreadsheets, folders and emails. Controlease centralizes your entire real estate portfolio into one intelligent platform.',
        primaryCta: 'Request a Demo',
        secondaryCta: 'Contact Us',
      },
      rentAudit: {
        badge: 'Intelligent Audit',
        title: 'Intelligent Rent Audit',
        description: 'Controlease automatically verifies that what you are billed matches the conditions defined in your lease contract. The platform calculates the rent that should be paid and compares it with the amounts actually invoiced. Deviations are detected instantly.',
        subtitle: 'This helps identify common issues such as:',
        items: ['Incorrect rent increases', 'Wrong indexation calculations', 'Forgotten contractual conditions'],
        conclusion: 'Instead of discovering errors during manual audits, you detect them in real time.',
      },
      security: {
        badge: 'Enterprise Security',
        title: 'Enterprise-Grade Security & Compliance',
        description: 'Controlease operates on a secure cloud infrastructure designed to meet strict cybersecurity and compliance standards.',
        subtitle: 'Security features include:',
        items: ['Encrypted data storage', 'Secure communication protocols', 'Role-based access management', 'Full activity traceability', 'Automated backups'],
        conclusion: 'Your data is protected with industry-leading security practices and continuous monitoring.',
      },
      tour: {
        steps: {
          sidebar: {
            title: 'Your Command Center',
            description: 'Navigate your entire portfolio from here. Explore each section to learn what Controlease offers.',
          },
          sidebarHints: {
            home: 'Portfolio metrics & charts',
            leases: 'Manage & track all leases',
            upload: 'AI-powered data extraction',
            alerts: 'Automated deadline alerts',
            scope: 'Switch between locations',
          },
          status: {
            title: 'Lease Status at a Glance',
            description: 'Instantly identify where each lease stands. Color-coded statuses like Active, Lapsed, or Expiring Soon help you prioritize what needs attention.',
          },
          alert: {
            title: 'Proactive Alerts',
            description: 'Critical deadlines surface automatically. Renewal windows, break options, and compliance issues are flagged before they become problems.',
          },
          tabs: {
            title: 'Everything Organized',
            description: 'Navigate complex lease data effortlessly. Key terms, financials, guarantees, and documents.',
          },
          tabsHints: {
            financial: 'Rents, charges & fees',
            guarantees: 'Deposits & bonds',
            details: 'Documents & files',
            history: 'Full audit trail',
          },
          actions: {
            title: 'Powerful Actions',
            description: 'Quick access to key features without leaving the lease view.',
          },
          actionsHints: {
            projection: 'Financial projections',
            pdf: 'View original contract',
            chat: 'AI assistant',
          },
          projectionOpen: {
            title: 'Projections Panel',
            description: 'Click to open the financial projections panel.',
          },
          projectionPanel: {
            title: 'Lease Projections',
            description: 'Forecast rent, sales, and budget with scenario analysis. Close panel when ready.',
          },
          projectionHints: {
            tabs: 'Rent, Sales & Budget',
            controls: 'View & granularity',
            scenarios: 'Compare scenarios',
            close: 'Click to close',
          },
          pdfOpen: {
            title: 'Contract Viewer',
            description: 'Click to view the original contract document.',
          },
          pdfPanel: {
            title: 'Contract Preview',
            description: 'View and extract text from lease documents. Close panel when ready.',
          },
          pdfHints: {
            preview: 'Original PDF preview',
            format: 'Extract raw text',
            close: 'Click to close',
          },
          completion: {
            title: "You're All Set!",
            description: 'Controlease transforms lease management with AI-powered data extraction, automated alerts, and financial intelligence. We ship improvements weekly based on user feedback. Welcome aboard!',
          },
        },
        nav: {
          back: 'Back',
          next: 'Next',
          gotIt: 'Got it!',
          clickToContinue: 'Click to continue',
          awesome: 'Awesome!',
        },
      },
      aiScenario: {
        messages: {
          expiring: 'What leases are expiring soon?',
          expiringResponse: "Here's your expiration timeline for the next 12 months. Q3 2025 has the highest volume with 23 leases.",
          deadlines: 'Any urgent deadlines I should know about?',
          deadlinesResponse: 'I found 3 items requiring attention:',
          extract: 'Extract key terms from the new Barcelona lease PDF',
          extractResponse: "I've analyzed the contract and extracted the key fields:",
          breakClause: "What's the break clause for Store #142?",
          breakClauseResponse: 'Found in Section 14.2 of LEASE-MAD-142:',
          projection: 'Project rent for flagship store with IPC adjustments',
          projectionResponse: "Here's the 5-year projection with worst/expected/best scenarios:",
          occupancy: "What's our portfolio occupancy rate?",
          occupancyResponse: 'Portfolio is performing well:',
          conclusion: 'Need anything else? I can help with rent analysis, compliance checks, document search, and more.',
        },
        widgets: {
          resultsFound: 'Results Found',
          leases: 'leases',
          location: 'Location',
          expiring: 'Expiring',
          avgRent: 'Avg Rent',
          vsMarket: 'Vs Market',
          portfolioOccupancy: 'Portfolio Occupancy',
          vsLastQuarter: 'vs last quarter',
          unitsLeased: 'Units Leased',
          expirationTimeline: 'Expiration Timeline',
          next12Months: 'Next 12 months',
          rentProjection: '5-Year Rent Projection',
          worst: 'Worst',
          expected: 'Expected',
          best: 'Best',
          expectedCagr: 'Expected CAGR',
          extractedFromPdf: 'Extracted from PDF',
          accuracy: 'accuracy',
          tenant: 'Tenant',
          startDate: 'Start Date',
          monthlyRent: 'Monthly Rent',
          deposit: 'Deposit',
          breakOption: 'Break Option',
          breakOptionAlert: 'Break Option',
          renewalDue: 'Renewal Due',
          rentReview: 'Rent Review',
          breakOptionDesc: '45 days left to exercise',
          renewalDueDesc: 'Decision needed in 60 days',
          rentReviewDesc: 'CPI adjustment pending',
          daysLeft: 'days left',
          days: 'days',
          pending: 'pending',
          teamManagement: 'Team Management',
          teamManagementDesc: 'Invite users & assign roles',
          section: 'Section 14.2 – Termination Clause',
          tenantNotice: '"The Tenant may terminate this lease by providing six (6) months written notice prior to the break date..."',
          failureNotice: '"Failure to notify shall result in automatic renewal for an additional 3-year term."',
          cagr: 'Expected CAGR',
        },
        tabs: {
          leaseAnalysis: 'Lease Analysis',
          rentInquiry: 'Rent Inquiry',
          newChat: 'New Chat',
        },
      },
      platformModules: {
        leaseIntelligence: {
          title: 'Lease Intelligence',
          description: 'Two-track rent engine with version control, audit history, and full lifecycle management from draft to termination.',
          tag: 'Core',
        },
        aiAssistant: {
          title: 'AI Assistant',
          description: 'Natural language queries on your portfolio. Ask questions, analyze documents, get predictive insights.',
          tag: 'AI',
        },
        documentExtraction: {
          title: 'Document Extraction',
          description: 'AI-powered PDF extraction. Automatically extract 100+ fields from lease contracts with 99% accuracy.',
          tag: 'AI',
        },
        smartDashboard: {
          title: 'Smart Dashboard',
          description: 'Visual KPIs at a glance. Track lease expirations, rent evolution, and portfolio health in real-time.',
          tag: 'Analytics',
        },
        portfolioAnalytics: {
          title: 'Portfolio Analytics',
          description: 'MGR evolution, expiration forecasting, sales projections, and real-time KPIs for data-driven decisions.',
          tag: 'Analytics',
        },
        automatedAlerts: {
          title: 'Automated Alerts',
          description: 'Never miss critical dates. Automated notifications for break options, renewals, IPC adjustments, and compliance.',
          tag: 'Automation',
        },
        rentProjections: {
          title: 'Rent Projections',
          description: 'Multi-scenario modeling with IPC adjustments, step rents, discounts, and free periods over 5+ years.',
          tag: 'Analytics',
        },
        salesForecasting: {
          title: 'Sales Forecasting',
          description: 'Worst/Mid/Best scenarios with seasonal patterns. Optimize variable rent and effort rate calculations.',
          tag: 'Analytics',
        },
        directoryContacts: {
          title: 'Directory & Contacts',
          description: 'Unified stakeholder database. Manage landlords, brands, franchisees, and consultants across all locations.',
          tag: 'Core',
        },
        roleBasedAccess: {
          title: 'Role-Based Access',
          description: 'Admin, Superuser, Editor, Reader roles with scope-based permissions. Enterprise-grade security.',
          tag: 'Security',
        },
        importExport: {
          title: 'Import & Export',
          description: 'Excel template-based bulk operations. Import hundreds of leases or export filtered reports instantly.',
          tag: 'Core',
        },
        versionControl: {
          title: 'Version Control',
          description: 'Full audit trail with immutable history. Track every change, revert edits, and maintain compliance.',
          tag: 'Security',
        },
        multiTenant: {
          title: 'Multi-Tenant',
          description: 'Complete data isolation per organization with scope-based filtering for multi-country portfolios.',
          tag: 'Security',
        },
        leaseRenewals: {
          title: 'Lease Renewals',
          description: 'Streamlined renewal workflow with automatic status transitions and linked lease tracking.',
          tag: 'Automation',
        },
        documentGallery: {
          title: 'Document Gallery',
          description: 'Centralized document storage with PDF preview, text extraction, and secure cloud hosting.',
          tag: 'Core',
        },
        teamManagement: {
          title: 'Team Management',
          description: 'Invite users, assign roles, configure permissions, and manage access across your organization.',
          tag: 'Security',
        },
        contractTemplates: {
          title: 'Contract Templates',
          description: 'Standardized data models for rents, guarantees, break options, and clauses across all leases.',
          tag: 'Core',
        },
        customConfiguration: {
          title: 'Custom Configuration',
          description: 'Tenant-specific settings, notification preferences, and workflow customization options.',
          tag: 'Core',
        },
      },
    },
    landing: {
      commandBar: {
        brand: 'Controlease',
        tagline: 'Enterprise Lease OS',
        signIn: 'Sign In',
        requestDemo: 'Request Demo Now',
        mobileNav: {
          home: 'Home',
          dataOnboarding: 'Onboarding',
          company: 'Company',
          contact: 'Contact',
          menu: 'Menu',
        },
        nav: [
          {
            label: 'Platform',
            path: '/#value-pillars',
            children: [
              { title: 'Value Pillars', desc: 'Lifecycle, governance & intelligence', path: '/#value-pillars' },
              { title: 'Data Extraction', desc: 'AI-powered PDF processing', path: '/#data-extraction' },
              { title: 'Lease Management', desc: 'Full contract lifecycle', path: '/#lease-management' },
              { title: 'AI Assistant', desc: 'Natural language analysis', path: '/#ai-assistant' },
              { title: 'Notifications', desc: 'Automated alerts system', path: '/#notifications' },
              { title: 'Platform Modules', desc: 'Complete feature overview', path: '/#modules' },
            ],
          },
          // {
          //   label: 'Security',
          //   path: '/security',
          // },
          {
            label: 'Data Onboarding',
            path: '/services/data-onboarding',
          },
          {
            label: 'Company',
            path: '/company',
            children: [
              { title: 'About Us', desc: 'Our mission & vision', path: '/company/about' },
              { title: 'Careers', desc: 'Join our team', path: '/company/careers' },
              { title: 'Contact', desc: 'Get in touch', path: '/contact' },
            ],
          },
        ],
      },
      hero: {
        badge: 'Enterprise Lease OS',
        headline: {
          lead: 'Control your',
          highlight: 'Global Portfolio',
        },
        description:
          'Controlease unifies the entire retail lease lifecycle—capture, approvals, operations, renewals, and compliance-grade analytics.',
        primaryCta: 'Start Pilot',
        secondaryCta: 'Read Case Studies',
        ticker: ['Single Source of Truth', 'Automated Compliance', 'Portfolio Intelligence', 'Rapid Deployment'],
        partners: [
          {
            name: 'Google',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
          },
          {
            name: 'IBM',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
          },
          {
            name: 'Tata Consultancy Services',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
          },
        ],
      },
      architecture: {
        badge: 'Core Value Pillars',
        title: 'Complete Lifecycle',
        highlight: 'Coverage',
        description: 'From draft to termination, every module shares the same structured data model.',
        aiAssistant: {
          title: 'AI Assistant',
          description: 'Context-aware portfolio analysis',
          labels: {
            ai: 'AI',
            user: 'You',
          },
          intro: 'Hello! I can analyze your lease portfolio. Ask about expiring leases or sales data.',
          userPrompt: 'Show me leases expiring in Q3 2025 in Spain.',
          summary: {
            prefix: 'I found',
            highlight: '3 leases',
            suffix: 'expiring in Q3 2025 in Spain:',
            button: 'View full report →',
            leases: [
              { code: 'MAD-001 (Madrid)', status: 'Exp: Aug 15' },
              { code: 'BCN-042 (Barcelona)', status: 'Exp: Sep 01' },
            ],
          },
        },
        financial: {
          title: 'Financial Intelligence',
          description: 'Real-time forecasting & sales analysis',
          metrics: [
            { label: 'Projected EBITDA', value: '$4.2M', trend: '+12%', trendPositive: true },
            { label: 'Effort Rate', value: '11.4%', trend: '-0.8%', trendPositive: false },
          ],
          progress: [
            { label: 'Rent vs Sales', value: '98%', barWidth: '98%', color: 'bg-emerald-500' },
            { label: 'Occupancy Cost', value: '12%', barWidth: '12%', color: 'bg-blue-500' },
          ],
        },
        leaseOps: {
          title: 'Lease Ops',
          description: 'Digital contract management',
          features: ['Version Control', 'Audit Timeline'],
        },
        globalReach: {
          title: 'Global Reach',
          description: 'Multi-currency & timezone',
        },
      },
      clients: {
        title: 'Trusted by Industry Leaders',
        subtitle: "Powering portfolios for the world's most ambitious retail brands.",
        logos: [
          {
            name: 'Global Retail',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
          },
          {
            name: 'Urban Spaces',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
          },
          {
            name: 'Metro Properties',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
          },
          {
            name: 'Prime Locations',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
          },
          {
            name: 'Retail Corp',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
          },
        ],
        caseStudies: [
          {
            company: 'Meridian Global',
            metric: '32%',
            description: 'Faster lease renewals using automated workflows.',
            tag: 'Efficiency',
          },
          {
            company: 'Northwind College',
            metric: '$1.2M',
            description: 'Recovered in missed indexation adjustments.',
            tag: 'Revenue',
          },
          {
            company: 'Atlas Polytechnic',
            metric: '100%',
            description: 'Audit compliance across 12 countries.',
            tag: 'Governance',
          },
        ],
      },
      footer: {
        brand: 'Controlease',
        summary: 'The operating system for multi-country lease portfolios. Centralize, govern, and optimize.',
        columns: [
          {
            title: 'Platform',
            links: [
              { label: 'Value Pillars', to: '/#value-pillars' },
              { label: 'Data Extraction', to: '/#data-extraction' },
              { label: 'Lease Management', to: '/#lease-management' },
              { label: 'AI Assistant', to: '/#ai-assistant' },
              { label: 'Modules', to: '/#modules' },
            ],
          },
          {
            title: 'Services',
            links: [
              // { label: 'Pricing', to: '/pricing' },
              { label: 'Data Onboarding', to: '/services/data-onboarding' },
              // { label: 'Security', to: '/security' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About Us', to: '/company/about' },
              { label: 'Careers', to: '/company/careers' },
              { label: 'Contact', to: '/contact' },
            ],
          },
        ],
        legal: [
          { label: 'Privacy Policy', to: '/privacy' },
          { label: 'Terms of Service', to: '/terms' },
          { label: 'Cookies', to: '/cookies' },
        ],
        rights: '© 2025 Controlease. All rights reserved.',
      },
    },
    partners: {
      title: 'Enterprise-Grade Platform',
      subtitle: 'Secure, scalable, and built for modern retail operations.',
      logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp'],
    },
    programs: {
      title: 'Feature Inventory',
      subtitle: 'Everything you need to manage complex lease portfolios.',
      items: [
        {
          name: 'Lease Intelligence',
          description: 'Two-track rent engine, version control, audit history, and compliance tracking. Full lifecycle management with immutable audit trails.',
          highlight: 'Audit Timeline',
          icon: 'DocumentText',
        },
        {
          name: 'Portfolio Analytics',
          description: 'MGR evolution, expiration forecasting, sales projections, and real-time KPIs. Data-driven decision making at scale.',
          highlight: 'Forecasting',
          icon: 'ChartBar',
        },
        {
          name: 'AI Assistant',
          description: 'Natural language queries, document analysis, and predictive insights. Chat with your portfolio using plain English.',
          highlight: 'AI Powered',
          icon: 'AcademicCap',
        },
        {
          name: 'Document Extraction',
          description: 'AI-powered PDF extraction. Automatically extract 100+ fields from lease documents with structured data output.',
          highlight: 'AI Extraction',
          icon: 'DocumentText',
        },
        {
          name: 'Smart Dashboard',
          description: 'Visual KPIs, lease expirations, and sales forecasting at a glance. Executive visibility into your entire portfolio.',
          highlight: 'Real-Time',
          icon: 'ChartBar',
        },
        {
          name: 'Directory & Contacts',
          description: 'Unified stakeholder database. Manage landlords, brands, franchisees, and consultants across all locations.',
          highlight: 'Centralized',
          icon: 'Users',
        },
        {
          name: 'Automated Notifications',
          description: 'Never miss critical dates. Automated alerts for break options, renewals, expirations, and compliance deadlines.',
          highlight: 'Automated',
          icon: 'Bell',
        },
        {
          name: 'Import & Export',
          description: 'Excel template-based bulk operations. Import hundreds of leases, export reports, and sync with external systems.',
          highlight: 'Bulk Operations',
          icon: 'ArrowDownTray',
        },
        {
          name: 'Role-Based Access',
          description: 'Admin, Superuser, Editor, Reader roles with scope-based permissions. Institutional-grade security and governance.',
          highlight: 'Security',
          icon: 'UserGroup',
        },
        {
          name: 'Budget Forecasting',
          description: 'ROI, Payback, Break-even, EBITDA calculations. Scenario-based forecasting with worst/mid/best projections.',
          highlight: 'Financial Planning',
          icon: 'Calculator',
        },
        {
          name: 'Sales Projections',
          description: 'Worst/Mid/Best scenarios with seasonal patterns. Predictive analytics for variable rent optimization.',
          highlight: 'Predictive',
          icon: 'ChartBar',
        },
        {
          name: 'Rent Projections',
          description: 'IPC adjustments, step rents, discounts, free periods. Project future rent with three scenario models.',
          highlight: 'Multi-Scenario',
          icon: 'Calculator',
        },
      ],
    },
    impact: {
      title: 'Measurable Outcomes',
      subtitle: 'Transforming how legal, finance, and expansion teams collaborate.',
      items: [
        {
          quote:
            'Controlease consolidated our fragmented data into a single source of truth. Compliance is now automatic.',
          author: 'Sarah Jenkins',
          role: 'Head of Legal, Global Retail',
        },
        {
          quote:
            "The AI assistant and forecasting tools have completely changed how we plan our portfolio expansion.",
          author: 'Michael Ross',
          role: 'VP of Real Estate, Metro Properties',
        },
      ],
    },
    contact: {
      title: 'Ready to modernize your lease operations?',
      description: 'Schedule a personalized demo to see Controlease in action.',
      primaryCta: 'Book Demo',
      secondaryCta: 'View Features',
      offices: [
        { name: 'Global HQ', email: 'contact@controlease.com', phone: '+1 (555) 123-4567' },
        { name: 'Support', email: 'support@controlease.com', phone: '+1 (555) 987-6543' },
      ],
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      subtitle: 'Choose the plan that fits your portfolio size and needs.',
      plans: [
        {
          name: 'Trial',
          price: 'Free',
          period: '/ 14 days',
          description: 'Perfect for testing the platform capabilities.',
          features: ['1 User', 'Up to 10 Leases', 'Basic Analytics', 'Standard Support'],
          cta: 'Start Trial',
          highlight: false
        },
        {
          name: 'Basic',
          price: '$499',
          period: '/ month',
          description: 'For small portfolios and single teams.',
          features: ['5 Users', 'Up to 50 Leases', 'Document Storage', 'Email Support'],
          cta: 'Get Basic',
          highlight: false
        },
        {
          name: 'Pro',
          price: '$999',
          period: '/ month',
          description: 'For growing companies with multiple locations.',
          features: ['Unlimited Users', 'Up to 200 Leases', 'Advanced Analytics', 'Priority Support', 'API Access'],
          cta: 'Get Pro',
          highlight: true
        },
        {
          name: 'Pro +',
          price: '$1,499',
          period: '/ month',
          description: 'Advanced compliance and automation tools.',
          features: ['Everything in Pro', 'Up to 500 Leases', 'AI Assistant', 'Audit Logs', 'SSO Integration'],
          cta: 'Get Pro +',
          highlight: false
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          description: 'For global organizations with complex needs.',
          features: ['Unlimited Leases', 'Custom Integrations', 'Dedicated Success Manager', 'SLA Guarantee', 'On-premise Option'],
          cta: 'Contact Sales',
          highlight: false
        }
      ],
      disclaimer: 'All plans include SSL security, automated backups, and 99.9% uptime guarantee. Prices are in USD. VAT may apply.'
    },
    about: {
      hero: {
        badge: '', // 'Our Story' - commented out for now
        title: 'Revolutionizing Retail Lease Management',
        description: "We're on a mission to bring transparency, automation, and intelligence to the global real estate portfolios of tomorrow."
      },
      stats: {
        leasesManaged: 'Leases Managed',
        countries: 'Countries',
        assetValue: 'Asset Value',
        teamMembers: 'Team Members'
      },
      values: {
        title: 'Our Core Values',
        description: 'The principles that guide our product decisions and company culture.',
        transparency: { title: 'Transparency First', description: 'We believe data should be accessible and clear. No hidden fees, no black boxes.' },
        innovation: { title: 'Innovation', description: 'We challenge the status quo of legacy real estate software with AI and modern UX.' },
        customer: { title: 'Customer Obsession', description: "We build what our customers need, not just what's cool. Your success is our success." },
        global: { title: 'Global Mindset', description: 'Built for multi-currency, multi-language, and cross-border operations from day one.' }
      },
      journey: {
        title: 'Our Journey',
        milestones: {
          beginning: { title: 'The Beginning', description: 'Controlease was founded by a team of real estate veterans and software engineers frustrated by spreadsheet chaos.' },
          seed: { title: 'Seed Funding', description: 'Raised $4M to build the core platform and expand the engineering team.' },
          firstCustomer: { title: 'First Enterprise Customer', description: 'Launched pilot program with a global retail brand managing 500+ locations.' },
          seriesA: { title: 'Series A', description: 'Secured $12M to accelerate AI development and expand into the European market.' },
          expansion: { title: 'Global Expansion', description: 'Now serving customers in 30+ countries with a team of 85+ people.' },
          future: { title: 'International Expansion & Interteam Ecosystem', description: 'We plan to open regional hubs to provide 24/7 support and local market expertise, alongside launching a unified collaboration layer connecting legal, finance, and expansion teams in real-time.' }
        }
      },
      team: {
        title: 'Meet the Leadership',
        description: 'The experts building the future of lease operations.',
        ceo: { role: 'CEO & Co-Founder', bio: 'Visionary leader with a deep understanding of enterprise management systems. Driving the mission to revolutionize lease operations globally.' },
        cto: { role: 'CTO & Co-Founder', bio: 'Technology strategist and architect. Leading the engineering team to build scalable, AI-powered solutions for the real estate industry.' },
        coo: { role: 'COO & Co-Founder', bio: 'Operational excellence expert. Ensuring seamless execution and customer success across all markets.' }
      },
      cta: {
        title: 'Ready to join the revolution?',
        description: 'See how Controlease can transform your portfolio operations today.',
        primaryCta: 'View Careers',
        secondaryCta: 'Contact Sales'
      }
    },
    careers: {
      hero: {
        badge: "We're Hiring",
        title: 'Build the Future of PropTech',
        description: "Join a team of builders, dreamers, and doers. We're transforming how the world manages real estate assets."
      },
      culture: {
        collaborative: 'Collaborative by Design',
        workHard: 'Work Hard, Play Hard'
      },
      benefits: {
        title: 'Why Controlease?',
        description: 'We take care of our people so they can take care of our customers.',
        remote: { title: 'Remote-First', description: 'Work from anywhere. We believe in output, not hours in a chair. We have team members across 12 timezones.' },
        equity: { title: 'Competitive Equity', description: "Every employee is an owner. We offer generous stock option packages because we're building this together." },
        health: { title: 'Comprehensive Health', description: 'Top-tier medical, dental, and vision coverage for you and your dependents. Mental health support included.' },
        learning: { title: 'Continuous Learning', description: 'Access to conferences, courses, and books to support your professional growth.' },
        retreats: { title: 'Team Retreats', description: 'Twice a year, we fly the whole team to an amazing location to bond, plan, and celebrate.' },
        gear: { title: 'Latest Gear', description: 'MacBook Pro, 4K monitors, and whatever else you need to be productive. Your home office is covered.' }
      },
      openings: {
        title: 'Open Positions',
        description: 'Find your next role and help us shape the industry.'
      },
      cta: {
        title: "Don't see the right role?",
        description: "We're always looking for talent. Send us your resume and we'll keep you in mind for future openings.",
        primaryCta: 'Email Us',
        secondaryCta: 'Follow on LinkedIn'
      }
    },
    contactPage: {
      hero: {
        badge: 'Global Support 24/7',
        title: 'Get in Touch',
        description: "We're here to help you modernize your lease operations. Reach out to our global team."
      },
      form: {
        title: 'Send us a message',
        description: "Fill out the form below and we'll get back to you within 24 hours.",
        fields: {
          name: 'Name',
          email: 'Email',
          company: 'Company',
          phone: 'Phone',
          inquiryType: 'Inquiry Type',
          message: 'Message',
          submit: 'Send Message',
          options: {
            general: 'General Inquiry',
            sales: 'Sales & Demo',
            support: 'Technical Support',
            partnership: 'Partnership',
            careers: 'Open Positions'
          }
        },
        success: {
          title: 'Message Sent!',
          description: 'Thank you for reaching out. Our team will be in touch shortly.',
          sendAnother: 'Send another message'
        }
      },
      support: {
        title: 'Support Tiers',
        description: 'Choose the support level that fits your needs',
        basic: { title: 'Basic Support', description: 'Email support with 48-hour response time. Access to documentation and knowledge base.' },
        professional: { title: 'Professional Support', description: 'Priority email and phone support with 24-hour response time. Dedicated account manager.' },
        enterprise: { title: 'Enterprise Support', description: '24/7 phone support, dedicated success manager, custom training, and SLA guarantees.' }
      },
      offices: {
        title: 'Global Offices',
        globalHq: 'Global HQ',
        europeanHub: 'European Hub'
      }
    },
    footer: {
      summary: 'Controlease is the operating system for multi-country retail lease portfolios.',
      rights: 'All rights reserved.',
    },
    legal: {
      lastUpdated: 'Last updated',
      date: '7 May 2026',
      privacy: {
        title: 'Privacy Policy',
        sections: [
          { title: '1. Data Controller', content: 'The data controller is CORBITAL TECH, S.L. (hereinafter, "Controlease"), with tax ID B44995389 and registered address at P\u00ba de la Castellana, 194, 28046 Madrid, Spain.\n\nContact email: support@controlease.net' },
          { title: '2. Purpose of Processing', content: 'Personal data is processed for the following purposes:', items: ['Managing inquiries and contact requests', 'Providing the Controlease SaaS service, including storage and management of lease contract data', 'Administrative and contractual management, including billing and payments', 'Technical support and service improvement'] },
          { title: '3. Legal Basis', content: 'Processing is based on:', items: ['Performance of a contract', 'Legitimate interest (service improvement and support)', 'User consent (where applicable)'] },
          { title: '4. Categories of Data', content: 'We process:', items: ['Identification data (name, email, phone)', 'Professional data (company, role)', 'Data included in lease agreements (including personal data of individuals)'], extra: 'We do not process special categories of personal data.' },
          { title: '5. Data Recipients', content: 'We use third-party providers acting as data processors, including:', items: ['Google', 'Stripe', 'HubSpot', 'GitHub'], extra: 'We may also use artificial intelligence tools as part of the service.' },
          { title: '6. International Transfers', content: 'Some providers may involve international data transfers outside the European Economic Area. Such transfers are carried out with appropriate safeguards under GDPR.' },
          { title: '7. Data Retention', content: 'Data is retained:', items: ['During the contractual relationship', 'As required by law', 'Until deletion is requested (where applicable)'] },
          { title: '8. User Rights', content: 'Users may exercise:', items: ['Access', 'Rectification', 'Erasure', 'Restriction', 'Portability', 'Objection'], extra: 'Requests can be sent to: privacy@controlease.com\n\nUsers may also file a complaint with the Spanish Data Protection Agency.' },
          { title: '9. Security', content: 'We implement appropriate technical and organizational measures, including:', items: ['Access control', 'Encryption', 'Backups', 'Activity logging'] },
          { title: '10. Changes', content: 'We may update this policy to reflect legal or technical changes.' },
        ]
      },
      terms: {
        title: 'Terms of Service',
        sections: [
          { title: '1. Service Description', content: 'Controlease is a SaaS solution provided by CORBITAL TECH, S.L. for managing lease agreements and related data.' },
          { title: '2. Access and Use', content: 'The Customer agrees to:', items: ['Use the platform in compliance with applicable laws', 'Not upload unlawful or unauthorized data', 'Keep access credentials confidential'] },
          { title: '3. Subscription Model', content: 'The service is provided on a monthly or annual subscription basis, automatically renewable unless cancelled.' },
          { title: '4. Service Availability', content: 'Controlease will use reasonable efforts to ensure service availability but does not guarantee uninterrupted access.' },
          { title: '5. Intellectual Property', content: 'All rights related to the software remain with CORBITAL TECH, S.L.\n\nThe Customer is granted a limited, non-exclusive right to use the platform.' },
          { title: '6. Data Processing (DPA)', content: '6.1 Roles\nThe Customer acts as Data Controller and Controlease as Data Processor.\n\n6.2 Purpose\nProcessing is limited to providing the SaaS service.\n\n6.3 Data Types\nPersonal data included in lease agreements.\n\n6.4 Access\nControlease may access data only for support and maintenance purposes.' },
          { title: '7. Sub-processors', content: 'Controlease may use third-party providers, including:', items: ['Google', 'Stripe', 'GitHub'], extra: 'The Customer authorizes the use of these sub-processors.' },
          { title: '8. Security', content: 'We implement appropriate security measures including:', items: ['Access control', 'Encryption', 'Backups', 'Logging'] },
          { title: '9. Use of Artificial Intelligence', content: 'Controlease may use AI tools to enhance and automate the service.\n\nThe Customer acknowledges and accepts this as part of the service.' },
          { title: '10. Data Subject Rights', content: 'Controlease will assist the Customer in handling data subject rights requests.' },
          { title: '11. Data Deletion and Portability', content: 'Customers may export or request deletion of their data.\n\nUpon termination, data will be deleted or returned.' },
          { title: '12. Liability', content: 'Controlease is not responsible for misuse of the platform by the Customer.' },
          { title: '13. Limitation of Liability', content: 'Total liability is limited to the amount paid by the Customer in the previous 12 months.\n\nControlease shall not be liable for indirect damages, loss of profits, or reputational harm.' },
          { title: '14. Termination', content: 'The Customer may cancel according to subscription terms.' },
          { title: '15. Governing Law', content: 'This agreement is governed by Spanish law.\n\nJurisdiction corresponds to the courts of the Customer\'s domicile.' },
        ]
      },
      cookies: {
        title: 'Cookie Policy',
        sections: [
          { title: '1. What are cookies?', content: 'Cookies are small text files stored on your device when you visit a website. They allow the website to function properly, improve user experience, and collect information about usage.' },
          { title: '2. Types of cookies used', content: 'Controlease uses the following types of cookies:', subsections: [
            { title: 'a) Strictly necessary cookies', content: 'These cookies are essential for the website to function and cannot be disabled. They include:', items: ['Session management', 'Security and authentication', 'Basic website functionality'], extra: 'These cookies do not require user consent.' },
            { title: 'b) Analytical and marketing cookies', content: 'Currently, Controlease does not use analytical or advertising cookies.\n\nHowever, in the future, we may implement tools such as:', items: ['Traffic analytics', 'Performance measurement', 'Marketing and advertising tracking'], extra: 'In such cases, users will be asked for prior consent.' },
          ]},
          { title: '3. Third-party cookies', content: 'If analytical or marketing tools are implemented, third-party providers may place cookies on users\' devices.\n\nThese providers may include:', items: ['Google', 'LinkedIn'] },
          { title: '4. How to manage cookies', content: 'Users can configure their browser settings to:', items: ['Block cookies', 'Delete cookies', 'Receive alerts when cookies are used'], extra: 'Please note that disabling certain cookies may affect website functionality.' },
          { title: '5. Updates', content: 'This Cookie Policy may be updated to reflect changes in legal requirements or the use of cookies on the website.' },
        ]
      },
      securityPage: {
        title: 'Security',
        sections: {
          commitment: {
            title: '1. Our Commitment to Security',
            content: 'At Controlease, security is not just a feature\u2014it\'s the foundation of our platform. We understand that you trust us with your most sensitive lease portfolio data, financial metrics, and strategic plans. We employ enterprise-grade security measures to ensure your data remains confidential, integrity-protected, and available when you need it.'
          },
          dataProtection: {
            title: '2. Data Protection',
            encryption: { title: 'Encryption', content: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We utilize industry-standard key management services to protect encryption keys.' },
            isolation: { title: 'Data Isolation', content: 'Customer data is logically separated in our multi-tenant architecture. Strict access controls ensure that one tenant cannot access another tenant\'s data.' }
          },
          infrastructure: {
            title: '3. Infrastructure Security',
            items: {
              cloud: { label: 'Cloud Security', content: 'Our infrastructure is hosted on top-tier cloud providers (AWS/GCP/Azure) with SOC 2 Type II certifications.' },
              network: { label: 'Network Protection', content: 'We employ Web Application Firewalls (WAF), DDoS protection, and Virtual Private Cloud (VPC) isolation to shield our services.' },
              monitoring: { label: 'Monitoring', content: '24/7 automated security monitoring and alerting systems to detect and respond to suspicious activities immediately.' }
            }
          },
          compliance: {
            title: '4. Compliance & Governance',
            content: 'We align our security practices with international standards including SOC 2, ISO 27001, and GDPR. Regular third-party penetration testing and vulnerability assessments are conducted to validate our security posture.'
          },
          accessControl: {
            title: '5. Access Control',
            content: 'Controlease supports Single Sign-On (SSO) via SAML 2.0 and OIDC, allowing you to manage user access through your own identity provider. We enforce Multi-Factor Authentication (MFA) for all administrative access.'
          },
          reporting: {
            title: '6. Reporting Issues',
            content: 'If you believe you have found a security vulnerability in Controlease, please report it to us immediately at security@controlease.com. We operate a responsible disclosure program and will work with you to remediate the issue.'
          }
        }
      }
    },
    cookieBanner: {
      text: 'We use essential cookies to ensure the proper functioning of our website.',
      link: 'For more information, please see our Cookie Policy.',
      accept: 'Accept',
    },
    security: {
      hero: {
        badge: 'Enterprise-Grade Security',
        title: 'Security You Can Trust',
        description: 'Your lease portfolio data deserves the highest level of protection. We implement industry-leading security practices to keep your sensitive information safe and compliant.',
      },
      trust: {
        items: ['256-bit Encryption', 'SOC 2 Certified', '99.9% Uptime', 'GDPR Compliant', '24/7 Monitoring', 'Regular Audits'],
      },
      featuresSection: {
        title: 'Built for Enterprise Security',
        description: 'Every layer of our platform is designed with security as a core principle, not an afterthought.',
      },
      features: {
        encryption: {
          title: 'End-to-End Encryption',
          description: 'All data is encrypted at rest and in transit using industry-standard 256-bit encryption, ensuring your sensitive lease information remains protected.',
        },
        mfa: {
          title: 'Multi-Factor Authentication',
          description: 'Add an extra layer of security with 2FA support. Protect your account from unauthorized access with SMS, email, or authenticator app verification.',
        },
        rbac: {
          title: 'Role-Based Access Control',
          description: 'Granular permissions let you control exactly who can view, edit, or manage specific data. Create custom roles tailored to your organization.',
        },
        isolation: {
          title: 'Data Isolation',
          description: 'Complete tenant isolation ensures your data is logically separated and never accessible by other customers or unauthorized parties.',
        },
        audit: {
          title: 'Complete Audit Trails',
          description: 'Every action is logged and timestamped. Track who accessed what, when, and maintain full accountability across your organization.',
        },
        monitoring: {
          title: '24/7 Threat Monitoring',
          description: 'Continuous security monitoring and automated threat detection protect your data around the clock. Real-time alerts for suspicious activity.',
        },
      },
      complianceSection: {
        title: 'Compliance & Certifications',
        description: 'We maintain the highest standards of security compliance to meet your regulatory requirements.',
      },
      compliance: {
        soc2: 'Annual third-party audits verify our security controls meet the strictest standards for data protection and privacy.',
        gdpr: 'Full compliance with European data protection regulations, including data portability, right to erasure, and consent management.',
        iso: 'Our information security management system follows international best practices for protecting your data.',
      },
      enterprise: {
        title: 'Enterprise-Ready Security',
        description: 'Built for organizations that demand the highest standards of security, reliability, and compliance.',
        items: [
          'Single Sign-On (SSO) integration with your identity provider',
          'Custom security policies and session management',
          'Dedicated account management and priority support',
          'Custom data retention and backup policies',
          'Security questionnaire and compliance documentation',
          'Penetration testing reports available on request',
        ],
        card: {
          title: 'Security Controls',
          subtitle: 'Enterprise-grade protection',
          features: [
            'IP whitelisting and access restrictions',
            'Session timeout and concurrent login controls',
            'Password policies and complexity requirements',
            'API rate limiting and abuse prevention',
            'Automated vulnerability scanning',
            'Incident response procedures',
          ],
        },
      },
      cta: {
        title: 'Ready to secure your lease portfolio?',
        primary: 'Request Demo Now',
        secondary: 'Talk to Security Team',
      },
    },
    dataOnboarding: {
      hero: {
        badge: 'Professional Services',
        title: 'We Digitize Your Lease Portfolio',
        description: 'Let our team handle the heavy lifting. We extract, validate, and structure all your existing lease data so you can start using Controlease immediately.',
      },
      stats: [
        { value: '100+', label: 'Fields Extracted' },
        { value: 'AI + Human', label: 'Validation Process' },
      ],
      process: {
        title: 'How It Works',
        description: 'Our streamlined process ensures accurate data migration with minimal effort on your part.',
        steps: [
          {
            title: 'Document Collection',
            description: 'Share your lease documents securely. We accept PDFs, scans, images, and even physical documents.',
          },
          {
            title: 'AI-Powered Extraction',
            description: 'Our AI extracts key data points: rents, dates, clauses, guarantees, and 100+ structured fields.',
          },
          {
            title: 'Human Validation',
            description: 'Expert analysts review and validate every extraction, ensuring compliance-grade accuracy.',
          },
          {
            title: 'Ready to Use',
            description: 'Your structured portfolio is loaded into Controlease, ready for immediate use.',
          },
        ],
      },
      pricing: {
        title: 'Simple, Transparent Pricing',
        description: 'Pay per document with volume discounts. No hidden fees, no surprises.',
        tiers: [
          {
            name: 'Starter',
            documents: 'Up to 100 documents',
            price: '$25',
            unit: 'per document',
            features: ['Full data extraction', 'Human validation', 'Email support'],
          },
          {
            name: 'Growth',
            documents: '101 - 500 documents',
            price: '$18',
            unit: 'per document',
            features: ['Everything in Starter', 'Priority processing', 'Dedicated analyst', 'Phone support'],
            popular: true,
          },
          {
            name: 'Enterprise',
            documents: '500+ documents',
            price: 'Custom',
            unit: 'volume pricing',
            features: ['Everything in Growth', 'On-site support available', 'Custom SLA', 'Account manager'],
          },
        ],
      },
      benefits: {
        title: 'Why Choose Our Onboarding Service',
        items: [
          {
            title: 'Zero Internal Effort',
            description: 'Your team stays focused on core business while we handle the data migration.',
          },
          {
            title: 'Compliance-Ready Data',
            description: 'Structured data ready for audits, reporting, and regulatory compliance from day one.',
          },
          {
            title: 'Fast Time-to-Value',
            description: 'Start using Controlease within days, not months. No lengthy implementation projects.',
          },
          {
            title: 'Expert Validation',
            description: 'Every extraction is reviewed by our analysts who understand lease agreements and ensure data quality.',
          },
        ],
      },
      cta: {
        title: 'Ready to digitize your portfolio?',
        primary: 'Get a Quote',
        secondary: 'Schedule Call',
      },
    },
  },
  es: {
    localeLabel: 'Español',
    nav: {
      home: 'Inicio',
      partners: 'Plataforma',
      programs: 'Módulos',
      impact: 'Valor',
      pricing: 'Precios',
      contact: 'Contacto',
    },
    home: {
      hero: {
        badge: 'Controlease',
        title: 'Gestión Inteligente de Arrendamientos',
        description:
          'Controlease centraliza tus contratos, te da visibilidad total de tu cartera y evita errores costosos. La plataforma SaaS para propietarios, gestores y operadores.',
        primaryCta: 'Solicitar Demo',
        secondaryCta: 'Más Información',
        metrics: [
          { label: 'Ciclo de vida', value: 'Gestión integral' },
          { label: 'Datos', value: 'Única fuente de verdad' },
          { label: 'Infraestructura', value: 'Nativo en la nube' },
        ],
        problemStatement: 'La mayoría de las organizaciones aún gestionan arrendamientos en carpetas dispersas, PDFs y hojas de cálculo — lo que genera fechas límite perdidas, errores de facturación y horas desperdiciadas buscando información.',
      },
      pointers: {
        title: 'Del Caos Contractual al Control Total',
        subtitle: '',
        items: [
          {
            title: 'Cartera de Arrendamientos Centralizada',
            description: 'Reúne todos tus contratos en una sola plataforma. Accede a información clave, documentos y términos financieros al instante para cada propiedad e inquilino de tu cartera. Obtén visibilidad completa en toda tu organización.',
            stat: 'Visibilidad Total',
          },
          {
            title: 'Control Operativo y Alertas',
            description: 'Nunca más pierdas un evento crítico de arrendamiento. Controlease rastrea automáticamente hitos clave como vencimientos de contratos, opciones de salida, revisiones e incrementos de renta, y obligaciones contractuales. Adelántate a las fechas límite y evita errores costosos.',
            stat: 'Seguimiento Automático',
          },
          {
            title: 'Inteligencia Contractual con IA',
            description: 'Nuestra IA lee los contratos de arrendamiento y extrae datos contractuales clave automáticamente. Fechas, términos financieros, cláusulas y obligaciones se convierten en información estructurada que puedes analizar y gestionar. Tus contratos dejan de ser PDFs estáticos y se convierten en datos operativos.',
            stat: 'Impulsado por IA',
          },
        ],
      },
      insights: {
        title: 'Módulos de la Plataforma',
        subtitle: 'Una suite completa de herramientas integradas en un flujo de trabajo fluido.',
        items: [
          {
            title: 'Tablero Inteligente',
            description: 'KPIs visuales, vencimientos de contratos y pronósticos de ventas de un vistazo.',
            tag: 'Analítica',
          },
          {
            title: 'Contratos de Arrendamiento',
            description: 'Modelos de datos estructurados para rentas, garantías y cláusulas.',
            tag: 'Núcleo',
          },
          {
            title: 'Asistente IA',
            description: 'Haz preguntas sobre tus contratos en lenguaje natural. Obtén respuestas instantáneas, insights y recomendaciones.',
            tag: 'Nuevo',
          },
        ],
      },
      partnersPreview: {
        title: 'Con la confianza de líderes en retail',
        logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp', 'City Centers', 'Plaza Group', 'Market Square'],
      },
      notifications: {
        badge: 'Alertas Automatizadas',
        title: 'Alertas Automáticas para Eventos Críticos',
        description: 'Una vez que tus contratos están estructurados, Controlease monitorea automáticamente cada hito clave. Tú decides quién recibe cada notificación.',
        items: ['Vencimientos de Contratos', 'Opciones de Salida', 'Incrementos o Revisiones de Renta', 'Condiciones Contractuales', 'Fechas de Renovación', '¡Y Mucho Más!'],
        emptyState: 'Las notificaciones aparecerán aquí...',
        messages: {
          alert: [
            'Contrato por vencer: Tienda B',
            'Desviación de renta detectada: Unidad 101',
            'Ventana de opción de salida: Oficina 205',
            'Documento de cumplimiento vencido: Inquilino A',
            'Aumento de renta: Almacén D',
            'Alerta de contrato vencido: Kiosco E',
          ],
          info: [
            'Nuevo contrato agregado: Unidad 7',
            'Pago recibido: Tienda F',
            'Inspección programada: Edificio G',
            'Nuevo inquilino incorporado: Café H',
          ],
          warning: [
            'Alta tasa de vacancia: Torre 1',
            'Posible incumplimiento: Unidad 302',
            'Mantenimiento pendiente: Retail J',
          ],
        },
      },
      pdfExtractor: {
        badge: 'Impulsado por IA',
        title: 'Extracción de Datos de Arrendamiento con IA',
        description: 'Sube cualquier documento de arrendamiento y nuestra IA extrae automáticamente información crítica como datos del inquilino, fechas de inicio y fin, términos de renta, depósitos y garantías, opciones de salida y obligaciones contractuales. Sin entrada manual de datos. Sin riesgo de error humano.',
        upload: {
          title: 'Arrastra el PDF aquí',
          subtitle: 'o haz clic para buscar',
          button: 'Seleccionar Archivo',
        },
        processing: 'Procesando documento...',
        extracted: 'Datos Extraídos',
        fields: {
          tenant: 'Inquilino',
          landlord: 'Propietario',
          property: 'Propiedad',
          monthlyRent: 'Renta Mensual',
          startDate: 'Fecha de Inicio',
          endDate: 'Fecha de Fin',
          securityDeposit: 'Depósito de Garantía',
          breakOption: 'Opción de Salida',
        },
      },
      aiConsole: {
        title: 'Asistente IA para Contratos de Arrendamiento',
        description: 'Interactúa con tus contratos usando lenguaje natural. Nuestra IA puede analizar contratos de arrendamiento, generar informes de cartera, identificar cláusulas y obligaciones clave, y responder preguntas sobre tu portafolio. En lugar de buscar en documentos, simplemente pregunta.',
        placeholder: 'Pregunta sobre tu portafolio...',
        thinking: 'Analizando tu portafolio...',
        messages: {
          welcome: "¡Hola! Soy tu asistente de IA. Puedo ayudarte a analizar tu portafolio de arrendamientos, encontrar contratos específicos o generar informes. ¿Qué te gustaría saber?",
          leasesExpiring: "Encontré 3 contratos que vencen en Q3 2025 en España. Aquí tienes un resumen:",
          rentProjection: "Basándome en tu portafolio actual, aquí está la proyección de renta a 5 años con escenarios pesimista, esperado y optimista.",
        },
        prompts: {
          expiring: 'Mostrar contratos que vencen en Q3 2025',
          rentProjection: 'Generar proyección de renta para los próximos 5 años',
          portfolio: 'Analizar rendimiento del portafolio',
        },
        chart: {
          title: 'Proyección de Renta a 5 Años',
          worst: 'Pesimista',
          expected: 'Esperado',
          best: 'Optimista',
          cagr: 'CAGR Esperado',
        },
      },
      leaseOverview: {
        title: 'Gestión Centralizada de Cartera de Arrendamientos',
        description: 'Gestiona todos tus contratos de arrendamiento desde un panel intuitivo. Los contratos están organizados en registros claros y accesibles, permitiéndote acceder rápidamente a información clave, documentos y términos financieros de cada activo en tu cartera. Todo permanece organizado, buscable y siempre actualizado.',
        tabs: {
          brochure: 'Folleto',
          signatories: 'Firmantes',
          basic: 'Básico',
          financial: 'Financiero',
          breakOptions: 'Opciones de Salida',
          guarantees: 'Garantías',
          details: 'Detalles',
          history: 'Historial',
        },
        sections: {
          generalInfo: 'Información General',
          location: 'Ubicación',
          contractType: 'Tipo de Contrato',
          rent: 'Renta',
          variableRent: 'Renta Variable',
          expenses: 'Gastos y Cuotas',
          legalDeposit: 'Depósito Legal de Garantía',
          additionalGuarantees: 'Garantías Adicionales',
          landlords: 'Propietarios',
          brands: 'Marcas',
          consultants: 'Consultores',
        },
        fields: {
          leaseName: 'Nombre del Contrato',
          status: 'Estado',
          active: 'Activo',
          lapsed: 'Vencido',
          viewRenewal: 'Ver Renovación',
          managerActionRequired: 'Acción requerida del gestor',
          leaseRenewalMessage: 'Este contrato ha sido marcado para renovación o cierre. Por favor revise y tome acción.',
          viewRenewalLink: 'Ver renovación',
          country: 'País',
          city: 'Ciudad',
          address: 'Dirección',
          postalCode: 'Código Postal',
          stateProvince: 'Estado / Provincia',
          enterContractRef: 'Referencia del contrato...',
          enterCadastralRef: 'Introduzca referencia catastral...',
          type: 'Tipo',
          retail: 'Retail',
          startDate: 'Fecha de Inicio',
          endDate: 'Fecha de Fin',
          baseRent: 'Renta Base',
          currency: 'Moneda',
          frequency: 'Frecuencia',
          monthly: 'Mensual',
          percentage: 'Porcentaje',
          threshold: 'Umbral',
          commonExpenses: 'Gastos Comunes',
          marketingFee: 'Cuota de Marketing',
          months: 'meses',
          bankGuarantee: 'Garantía Bancaria',
          enabled: 'Habilitado',
          amount: 'Monto',
          expiryDate: 'Fecha de Vencimiento',
          name: 'Nombre',
          email: 'Email',
          phone: 'Teléfono',
          role: 'Rol',
          primary: 'Principal',
          contact: 'Contacto',
        },
        nav: {
          home: 'Inicio',
          manage: 'Gestionar',
          activity: 'Actividad',
          more: 'Más',
        },
        projection: {
          title: 'Proyecciones del Contrato',
          tabs: { rent: 'Renta', sales: 'Ventas', budget: 'Presupuesto' },
          granularity: 'Granularidad:',
          monthly: 'Mensual',
          yearly: 'Anual',
          view: 'Vista:',
          chart: 'Gráfico',
          table: 'Tabla',
          scenarios: 'Escenarios:',
          worst: 'Pesimista',
          expected: 'Esperado',
          best: 'Optimista',
          rentProjectionWithIpc: 'Proyección de Renta con IPC',
          rentProjectionTable: 'Tabla de Proyección de Renta',
          year: 'Año',
          structural: 'Estructural',
          ipcPercent: 'IPC %',
          payable: 'A Pagar',
          summary: 'Resumen',
          totalFiveYear: 'Total (5A)',
          avgIpc: 'IPC Promedio',
          salesProjection: 'Proyección de Ventas',
          highConfidence: 'Alta Confianza',
          patternDetected: 'Patrón detectado: Crecimiento constante con picos estacionales en Q4',
          budgetOverview: 'Resumen de Presupuesto',
          ebitda: 'EBITDA',
          roi: 'ROI',
          kpis: 'KPIs',
          effortRate: 'Tasa de Esfuerzo:',
          payback: 'Payback:',
          pricePerSqm: '€/m²:',
          breakeven: 'Punto de Equilibrio:',
        },
        pdf: {
          contractDocument: 'Documento del Contrato',
          locateInformation: 'Localizar Información',
          format: 'Formato',
          extractedRawText: 'Texto Extraído:',
          endOfPreview: '--- Fin de la Vista Previa ---',
        },
        mobile: {
          storeFront: 'Fachada',
          interior: 'Interior',
          imageGallery: 'Galería de Imágenes',
        },
        mobileFields: {
          name: 'Nombre',
          surface: 'Superficie',
          unitNumber: 'Número de Unidad',
          contractCode: 'Código de Contrato',
          contractReference: 'Referencia del Contrato',
          cadastralReference: 'Referencia Catastral',
          region: 'Región',
          signedRentYearly: 'Renta Firmada (Anual)',
          invoicedRentYearly: 'Renta Facturada (Anual)',
          monthlyRent: 'Renta Mensual',
          pricePerSqmYearly: '€/m² (Anual)',
          freePeriod: 'Período de Carencia',
          keyMoney: 'Prima de Entrada',
          salesReport: 'Informe de Ventas',
          variableRentClause: 'Cláusula de Renta Variable',
          effortRate: 'Tasa de Esfuerzo',
          serviceChargesYearly: 'Gastos de Servicio (Anual)',
          marketingYearly: 'Marketing (Anual)',
          ibiYearly: 'IBI (Anual)',
          ecop: 'ECOP',
          fitOut: 'Acondicionamiento',
          renewalDate: 'Fecha de Renovación',
          gbeo: 'GBEO',
          cifNif: 'CIF/NIF',
          chargesAndFees: 'Cargos y Cuotas',
          overThreshold: '5% sobre umbral',
        },
      },
      cta: {
        title: 'Toma el Control de tu Cartera de Arrendamientos',
        description: 'Deja de gestionar contratos de arrendamiento en hojas de cálculo, carpetas y correos electrónicos. Controlease centraliza toda tu cartera inmobiliaria en una sola plataforma inteligente.',
        primaryCta: 'Solicitar Demo',
        secondaryCta: 'Contáctanos',
      },
      rentAudit: {
        badge: 'Auditoría Inteligente',
        title: 'Auditoría Inteligente de Rentas',
        description: 'Controlease verifica automáticamente que lo que te facturan coincida con las condiciones definidas en tu contrato de arrendamiento. La plataforma calcula la renta que debería pagarse y la compara con los montos realmente facturados. Las desviaciones se detectan al instante.',
        subtitle: 'Esto ayuda a identificar problemas comunes como:',
        items: ['Incrementos de renta incorrectos', 'Cálculos de indexación erróneos', 'Condiciones contractuales olvidadas'],
        conclusion: 'En lugar de descubrir errores durante auditorías manuales, los detectas en tiempo real.',
      },
      security: {
        badge: 'Seguridad Empresarial',
        title: 'Seguridad y Cumplimiento de Nivel Empresarial',
        description: 'Controlease opera en una infraestructura cloud segura diseñada para cumplir con estrictos estándares de ciberseguridad y cumplimiento normativo.',
        subtitle: 'Las características de seguridad incluyen:',
        items: ['Almacenamiento de datos encriptado', 'Protocolos de comunicación seguros', 'Gestión de acceso basada en roles', 'Trazabilidad completa de actividad', 'Copias de seguridad automatizadas'],
        conclusion: 'Tus datos están protegidos con prácticas de seguridad líderes en la industria y monitoreo continuo.',
      },
      tour: {
        steps: {
          sidebar: {
            title: 'Tu Centro de Control',
            description: 'Navega por todo tu portafolio desde aquí. Explora cada sección para conocer lo que Controlease ofrece.',
          },
          sidebarHints: {
            home: 'Métricas y gráficos del portafolio',
            leases: 'Gestiona y rastrea contratos',
            upload: 'Extracción de datos con IA',
            alerts: 'Alertas automáticas de fechas',
            scope: 'Cambiar entre ubicaciones',
          },
          status: {
            title: 'Estado del Contrato de un Vistazo',
            description: 'Identifica al instante el estado de cada contrato. Estados codificados por colores como Activo, Vencido o Por Vencer te ayudan a priorizar.',
          },
          alert: {
            title: 'Alertas Proactivas',
            description: 'Las fechas críticas aparecen automáticamente. Ventanas de renovación, opciones de salida y problemas de cumplimiento se señalan antes de convertirse en problemas.',
          },
          tabs: {
            title: 'Todo Organizado',
            description: 'Navega por datos complejos sin esfuerzo. Términos clave, financieros, garantías y documentos.',
          },
          tabsHints: {
            financial: 'Rentas, cargos y cuotas',
            guarantees: 'Depósitos y fianzas',
            details: 'Documentos y archivos',
            history: 'Historial de auditoría',
          },
          actions: {
            title: 'Acciones Poderosas',
            description: 'Acceso rápido a funciones clave sin salir de la vista del contrato.',
          },
          actionsHints: {
            projection: 'Proyecciones financieras',
            pdf: 'Ver contrato original',
            chat: 'Asistente IA',
          },
          projectionOpen: {
            title: 'Panel de Proyecciones',
            description: 'Haz clic para abrir el panel de proyecciones financieras.',
          },
          projectionPanel: {
            title: 'Proyecciones del Contrato',
            description: 'Proyecta renta, ventas y presupuesto con análisis de escenarios. Cierra el panel cuando termines.',
          },
          projectionHints: {
            tabs: 'Renta, Ventas y Presupuesto',
            controls: 'Vista y granularidad',
            scenarios: 'Comparar escenarios',
            close: 'Clic para cerrar',
          },
          pdfOpen: {
            title: 'Visor de Contrato',
            description: 'Haz clic para ver el documento original del contrato.',
          },
          pdfPanel: {
            title: 'Vista Previa del Contrato',
            description: 'Visualiza y extrae texto de documentos. Cierra el panel cuando termines.',
          },
          pdfHints: {
            preview: 'Vista previa del PDF original',
            format: 'Extraer texto plano',
            close: 'Clic para cerrar',
          },
          completion: {
            title: '¡Listo!',
            description: 'Controlease transforma la gestión de arrendamientos con extracción de datos con IA, alertas automatizadas e inteligencia financiera. Enviamos mejoras semanalmente. ¡Bienvenido a bordo!',
          },
        },
        nav: {
          back: 'Atrás',
          next: 'Siguiente',
          gotIt: '¡Entendido!',
          clickToContinue: 'Clic para continuar',
          awesome: '¡Genial!',
        },
      },
      aiScenario: {
        messages: {
          expiring: '¿Qué contratos están por vencer pronto?',
          expiringResponse: 'Aquí está tu línea de tiempo de vencimientos para los próximos 12 meses. Q3 2025 tiene el mayor volumen con 23 contratos.',
          deadlines: '¿Hay fechas urgentes que deba conocer?',
          deadlinesResponse: 'Encontré 3 elementos que requieren atención:',
          extract: 'Extrae los términos clave del nuevo PDF del contrato de Barcelona',
          extractResponse: 'He analizado el contrato y extraído los campos clave:',
          breakClause: '¿Cuál es la cláusula de salida para la Tienda #142?',
          breakClauseResponse: 'Encontrado en la Sección 14.2 de LEASE-MAD-142:',
          projection: 'Proyecta la renta para la tienda principal con ajustes de IPC',
          projectionResponse: 'Aquí está la proyección a 5 años con escenarios pesimista/esperado/optimista:',
          occupancy: '¿Cuál es la tasa de ocupación de nuestro portafolio?',
          occupancyResponse: 'El portafolio está funcionando bien:',
          conclusion: '¿Necesitas algo más? Puedo ayudarte con análisis de renta, verificaciones de cumplimiento, búsqueda de documentos y más.',
        },
        widgets: {
          resultsFound: 'Resultados Encontrados',
          leases: 'contratos',
          location: 'Ubicación',
          expiring: 'Por Vencer',
          avgRent: 'Renta Prom.',
          vsMarket: 'Vs Mercado',
          portfolioOccupancy: 'Ocupación del Portafolio',
          vsLastQuarter: 'vs trimestre anterior',
          unitsLeased: 'Unidades Arrendadas',
          expirationTimeline: 'Línea de Vencimientos',
          next12Months: 'Próximos 12 meses',
          rentProjection: 'Proyección de Renta a 5 Años',
          worst: 'Pesimista',
          expected: 'Esperado',
          best: 'Optimista',
          expectedCagr: 'CAGR Esperado',
          extractedFromPdf: 'Extraído del PDF',
          accuracy: 'precisión',
          tenant: 'Inquilino',
          startDate: 'Fecha de Inicio',
          monthlyRent: 'Renta Mensual',
          deposit: 'Depósito',
          breakOption: 'Opción de Salida',
          breakOptionAlert: 'Opción de Salida',
          renewalDue: 'Renovación Pendiente',
          rentReview: 'Revisión de Renta',
          breakOptionDesc: '45 días para ejercer',
          renewalDueDesc: 'Decisión requerida en 60 días',
          rentReviewDesc: 'Ajuste de IPC pendiente',
          daysLeft: 'días restantes',
          days: 'días',
          pending: 'pendiente',
          teamManagement: 'Gestión de Equipo',
          teamManagementDesc: 'Invita usuarios y asigna roles',
          section: 'Sección 14.2 – Cláusula de Terminación',
          tenantNotice: '"El Inquilino podrá rescindir este contrato proporcionando seis (6) meses de aviso escrito antes de la fecha de salida..."',
          failureNotice: '"La falta de notificación resultará en la renovación automática por un período adicional de 3 años."',
          cagr: 'CAGR Esperado',
        },
        tabs: {
          leaseAnalysis: 'Análisis de Contrato',
          rentInquiry: 'Consulta de Renta',
          newChat: 'Nuevo Chat',
        },
      },
      platformModules: {
        leaseIntelligence: {
          title: 'Inteligencia de Contratos',
          description: 'Motor de renta dual con control de versiones, historial de auditoría y gestión completa del ciclo de vida.',
          tag: 'Núcleo',
        },
        aiAssistant: {
          title: 'Asistente IA',
          description: 'Consultas en lenguaje natural sobre tu portafolio. Haz preguntas, analiza documentos, obtén insights predictivos.',
          tag: 'IA',
        },
        documentExtraction: {
          title: 'Extracción de Documentos',
          description: 'Extracción de PDF con IA. Extrae automáticamente más de 100 campos de contratos con 99% de precisión.',
          tag: 'IA',
        },
        smartDashboard: {
          title: 'Tablero Inteligente',
          description: 'KPIs visuales de un vistazo. Rastrea vencimientos, evolución de renta y salud del portafolio en tiempo real.',
          tag: 'Analítica',
        },
        portfolioAnalytics: {
          title: 'Analítica de Portafolio',
          description: 'Evolución de MGR, pronóstico de vencimientos, proyecciones de ventas y KPIs en tiempo real.',
          tag: 'Analítica',
        },
        automatedAlerts: {
          title: 'Alertas Automatizadas',
          description: 'Nunca pierdas fechas críticas. Notificaciones automáticas para opciones de salida, renovaciones y cumplimiento.',
          tag: 'Automatización',
        },
        rentProjections: {
          title: 'Proyecciones de Renta',
          description: 'Modelado multi-escenario con ajustes de IPC, rentas escalonadas, descuentos y períodos gratuitos.',
          tag: 'Analítica',
        },
        salesForecasting: {
          title: 'Pronóstico de Ventas',
          description: 'Escenarios pesimista/medio/optimista con patrones estacionales. Optimiza renta variable y ratio de esfuerzo.',
          tag: 'Analítica',
        },
        directoryContacts: {
          title: 'Directorio y Contactos',
          description: 'Base de datos unificada de stakeholders. Gestiona propietarios, marcas, franquiciados y consultores.',
          tag: 'Núcleo',
        },
        roleBasedAccess: {
          title: 'Acceso por Roles',
          description: 'Roles Admin, Superusuario, Editor, Lector con permisos basados en alcance. Seguridad empresarial.',
          tag: 'Seguridad',
        },
        importExport: {
          title: 'Importar y Exportar',
          description: 'Operaciones masivas basadas en plantillas Excel. Importa cientos de contratos o exporta informes filtrados.',
          tag: 'Núcleo',
        },
        versionControl: {
          title: 'Control de Versiones',
          description: 'Auditoría completa con historial inmutable. Rastrea cada cambio, revierte ediciones y mantén cumplimiento.',
          tag: 'Seguridad',
        },
        multiTenant: {
          title: 'Multi-Inquilino',
          description: 'Aislamiento completo de datos por organización con filtrado basado en alcance para portafolios multinacionales.',
          tag: 'Seguridad',
        },
        leaseRenewals: {
          title: 'Renovaciones de Contratos',
          description: 'Flujo de renovación simplificado con transiciones automáticas de estado y seguimiento de contratos vinculados.',
          tag: 'Automatización',
        },
        documentGallery: {
          title: 'Galería de Documentos',
          description: 'Almacenamiento centralizado con vista previa de PDF, extracción de texto y hosting seguro en la nube.',
          tag: 'Núcleo',
        },
        teamManagement: {
          title: 'Gestión de Equipos',
          description: 'Invita usuarios, asigna roles, configura permisos y gestiona accesos en tu organización.',
          tag: 'Seguridad',
        },
        contractTemplates: {
          title: 'Plantillas de Contratos',
          description: 'Modelos de datos estandarizados para rentas, garantías, opciones de salida y cláusulas.',
          tag: 'Núcleo',
        },
        customConfiguration: {
          title: 'Configuración Personalizada',
          description: 'Ajustes específicos por inquilino, preferencias de notificación y opciones de personalización de flujos.',
          tag: 'Núcleo',
        },
      },
    },
    landing: {
      commandBar: {
        brand: 'Controlease',
        tagline: 'Sistema Operativo Empresarial',
        signIn: 'Iniciar sesión',
        requestDemo: 'Solicitar Demo',
        mobileNav: {
          home: 'Inicio',
          dataOnboarding: 'Onboarding',
          company: 'Empresa',
          contact: 'Contacto',
          menu: 'Menú',
        },
        nav: [
          {
            label: 'Plataforma',
            path: '/#value-pillars',
            children: [
              { title: 'Pilares de Valor', desc: 'Ciclo de vida, gobernanza e inteligencia', path: '/#value-pillars' },
              { title: 'Extracción de Datos', desc: 'Procesamiento PDF con IA', path: '/#data-extraction' },
              { title: 'Gestión de Contratos', desc: 'Ciclo completo de contratos', path: '/#lease-management' },
              { title: 'Asistente IA', desc: 'Análisis en lenguaje natural', path: '/#ai-assistant' },
              { title: 'Notificaciones', desc: 'Sistema de alertas automatizado', path: '/#notifications' },
              { title: 'Módulos', desc: 'Vista completa de funcionalidades', path: '/#modules' },
            ],
          },
          // {
          //   label: 'Seguridad',
          //   path: '/security',
          // },
          {
            label: 'Onboarding de Datos',
            path: '/services/data-onboarding',
          },
          {
            label: 'Compañía',
            path: '/company',
            children: [
              { title: 'Sobre Nosotros', desc: 'Nuestra misión y visión', path: '/company/about' },
              { title: 'Carreras', desc: 'Únete a nuestro equipo', path: '/company/careers' },
              { title: 'Contacto', desc: 'Ponte en contacto', path: '/contact' },
            ],
          },
        ],
      },
      hero: {
        badge: 'Sistema Operativo Empresarial',
        headline: {
          lead: 'Controla tu',
          highlight: 'Portafolio Global',
        },
        description:
          'Controlease unifica todo el ciclo de vida del arrendamiento retail: captura, aprobaciones, operaciones, renovaciones y analítica de cumplimiento.',
        primaryCta: 'Iniciar piloto',
        secondaryCta: 'Ver casos de estudio',
        ticker: [
          'Fuente única de verdad',
          'Cumplimiento automatizado',
          'Inteligencia del portafolio',
          'Despliegue rápido',
        ],
        partners: [
          {
            name: 'Google',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
          },
          {
            name: 'IBM',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
          },
          {
            name: 'TCS',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
          },
        ],
      },
      architecture: {
        badge: 'Pilares de Valor',
        title: 'Cobertura del Ciclo',
        highlight: 'Completa',
        description: 'Del borrador a la terminación, cada módulo comparte el mismo modelo estructurado.',
        aiAssistant: {
          title: 'Asistente IA',
          description: 'Análisis contextual del portafolio',
          labels: {
            ai: 'IA',
            user: 'Tú',
          },
          intro: '¡Hola! Puedo analizar tu portafolio. Pregunta por vencimientos o datos de ventas.',
          userPrompt: 'Muéstrame contratos que vencen en Q3 2025 en España.',
          summary: {
            prefix: 'Encontré',
            highlight: '3 contratos',
            suffix: 'que vencen en el Q3 2025 en España:',
            button: 'Ver informe completo →',
            leases: [
              { code: 'MAD-001 (Madrid)', status: 'Vence: 15 Ago' },
              { code: 'BCN-042 (Barcelona)', status: 'Vence: 1 Sep' },
            ],
          },
        },
        financial: {
          title: 'Inteligencia Financiera',
          description: 'Pronósticos y análisis de ventas en tiempo real',
          metrics: [
            { label: 'EBITDA proyectado', value: '$4.2M', trend: '+12%', trendPositive: true },
            { label: 'Ratio de esfuerzo', value: '11.4%', trend: '-0.8%', trendPositive: false },
          ],
          progress: [
            { label: 'Renta vs Ventas', value: '98%', barWidth: '98%', color: 'bg-emerald-500' },
            { label: 'Costo de ocupación', value: '12%', barWidth: '12%', color: 'bg-blue-500' },
          ],
        },
        leaseOps: {
          title: 'Operaciones de Arrendamiento',
          description: 'Gestión digital de contratos',
          features: ['Control de versiones', 'Línea de auditoría'],
        },
        globalReach: {
          title: 'Alcance Global',
          description: 'Multimoneda y husos horarios',
        },
      },
      clients: {
        title: 'Confiado por líderes del sector',
        subtitle: 'Impulsamos los portafolios más ambiciosos del retail.',
        logos: [
          {
            name: 'Global Retail',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
          },
          {
            name: 'Urban Spaces',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
          },
          {
            name: 'Metro Properties',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
          },
          {
            name: 'Prime Locations',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
          },
          {
            name: 'Retail Corp',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
          },
        ],
        caseStudies: [
          {
            company: 'Meridian Global',
            metric: '32%',
            description: 'Renovaciones más rápidas con flujos automatizados.',
            tag: 'Eficiencia',
          },
          {
            company: 'Northwind College',
            metric: '$1.2M',
            description: 'Recuperado en ajustes de indexación perdidos.',
            tag: 'Ingresos',
          },
          {
            company: 'Atlas Polytechnic',
            metric: '100%',
            description: 'Cumplimiento de auditoría en 12 países.',
            tag: 'Gobernanza',
          },
        ],
      },
      footer: {
        brand: 'Controlease',
        summary: 'El sistema operativo para carteras multinacionales de arrendamiento.',
        columns: [
          {
            title: 'Plataforma',
            links: [
              { label: 'Pilares de Valor', to: '/#value-pillars' },
              { label: 'Extracción de Datos', to: '/#data-extraction' },
              { label: 'Gestión de Contratos', to: '/#lease-management' },
              { label: 'Asistente IA', to: '/#ai-assistant' },
              { label: 'Módulos', to: '/#modules' },
            ],
          },
          {
            title: 'Servicios',
            links: [
              // { label: 'Precios', to: '/pricing' },
              { label: 'Onboarding de Datos', to: '/services/data-onboarding' },
              // { label: 'Seguridad', to: '/security' },
            ],
          },
          {
            title: 'Compañía',
            links: [
              { label: 'Sobre Nosotros', to: '/company/about' },
              { label: 'Carreras', to: '/company/careers' },
              { label: 'Contacto', to: '/contact' },
            ],
          },
        ],
        legal: [
          { label: 'Privacidad', to: '/privacy' },
          { label: 'Términos de Servicio', to: '/terms' },
          { label: 'Cookies', to: '/cookies' },
        ],
        rights: '© 2025 Controlease. Todos los derechos reservados.',
      },
    },
    partners: {
      title: 'Plataforma Empresarial',
      subtitle: 'Segura, escalable y construida para operaciones modernas de retail.',
      logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp'],
    },
    programs: {
      title: 'Inventario de Funciones',
      subtitle: 'Todo lo que necesita para gestionar carteras de arrendamiento complejas.',
      items: [
        {
          name: 'Contratos de Arrendamiento',
          description: 'Gestión completa del ciclo de vida con historial de versiones y esquemas financieros.',
          highlight: 'Línea de Tiempo',
          icon: 'DocumentText',
        },
        {
          name: 'Directorio y Contactos',
          description: 'Gestión centralizada para propietarios, marcas, franquiciados y consultores.',
          highlight: 'Mapeo de Relaciones',
          icon: 'Users',
        },
        {
          name: 'Motor Financiero',
          description: 'Maneje rentas escalonadas, bonificaciones, ajustes de IPC y pronósticos de ventas.',
          highlight: 'Cálculos Complejos',
          icon: 'Calculator',
        },
      ],
    },
    impact: {
      title: 'Resultados Medibles',
      subtitle: 'Transformando cómo colaboran los equipos legales, financieros y de expansión.',
      items: [
        {
          quote:
            'Controlease consolidó nuestros datos fragmentados en una única fuente de verdad. El cumplimiento es ahora automático.',
          author: 'Sarah Jenkins',
          role: 'Directora Legal, Global Retail',
        },
        {
          quote:
            "El asistente de IA y las herramientas de pronóstico han cambiado por completo cómo planeamos nuestra expansión.",
          author: 'Michael Ross',
          role: 'VP de Bienes Raíces, Metro Properties',
        },
      ],
    },
    contact: {
      title: '¿Listo para modernizar sus operaciones?',
      description: 'Agende una demostración personalizada para ver Controlease en acción.',
      primaryCta: 'Agendar Demo',
      secondaryCta: 'Ver Características',
      offices: [
        { name: 'Sede Global', email: 'contact@controlease.com', phone: '+1 (555) 123-4567' },
        { name: 'Soporte', email: 'support@controlease.com', phone: '+1 (555) 987-6543' },
      ],
    },
    pricing: {
      title: 'Precios Simples y Transparentes',
      subtitle: 'Elija el plan que se adapte al tamaño y necesidades de su portafolio.',
      plans: [
        {
          name: 'Prueba',
          price: 'Gratis',
          period: '/ 14 días',
          description: 'Perfecto para probar las capacidades de la plataforma.',
          features: ['1 Usuario', 'Hasta 10 Contratos', 'Analítica Básica', 'Soporte Estándar'],
          cta: 'Iniciar Prueba',
          highlight: false
        },
        {
          name: 'Básico',
          price: '$499',
          period: '/ mes',
          description: 'Para pequeños portafolios y equipos individuales.',
          features: ['5 Usuarios', 'Hasta 50 Contratos', 'Almacenamiento de Docs', 'Soporte por Email'],
          cta: 'Obtener Básico',
          highlight: false
        },
        {
          name: 'Pro',
          price: '$999',
          period: '/ mes',
          description: 'Para empresas en crecimiento con múltiples ubicaciones.',
          features: ['Usuarios Ilimitados', 'Hasta 200 Contratos', 'Analítica Avanzada', 'Soporte Prioritario', 'Acceso API'],
          cta: 'Obtener Pro',
          highlight: true
        },
        {
          name: 'Pro +',
          price: '$1,499',
          period: '/ mes',
          description: 'Herramientas avanzadas de cumplimiento y automatización.',
          features: ['Todo en Pro', 'Hasta 500 Contratos', 'Asistente IA', 'Logs de Auditoría', 'Integración SSO'],
          cta: 'Obtener Pro +',
          highlight: false
        },
        {
          name: 'Empresarial',
          price: 'A medida',
          period: '',
          description: 'Para organizaciones globales con necesidades complejas.',
          features: ['Contratos Ilimitados', 'Integraciones Personalizadas', 'Gerente de Éxito Dedicado', 'Garantía SLA', 'Opción On-premise'],
          cta: 'Contactar Ventas',
          highlight: false
        }
      ],
      disclaimer: 'Todos los planes incluyen seguridad SSL, copias de seguridad automatizadas y garantía de 99.9% de tiempo activo. Los precios están en USD. Puede aplicarse IVA.'
    },
    about: {
      hero: {
        badge: '', // 'Nuestra Historia' - commented out for now
        title: 'Revolucionando la Gestión de Arrendamientos',
        description: 'Nuestra misión es llevar transparencia, automatización e inteligencia a los portafolios inmobiliarios globales del mañana.'
      },
      stats: {
        leasesManaged: 'Contratos Gestionados',
        countries: 'Países',
        assetValue: 'Valor de Activos',
        teamMembers: 'Miembros del Equipo'
      },
      values: {
        title: 'Nuestros Valores',
        description: 'Los principios que guían nuestras decisiones de producto y cultura empresarial.',
        transparency: { title: 'Transparencia Primero', description: 'Creemos que los datos deben ser accesibles y claros. Sin tarifas ocultas, sin cajas negras.' },
        innovation: { title: 'Innovación', description: 'Desafiamos el status quo del software inmobiliario tradicional con IA y UX moderno.' },
        customer: { title: 'Obsesión por el Cliente', description: 'Construimos lo que nuestros clientes necesitan, no solo lo que es genial. Tu éxito es nuestro éxito.' },
        global: { title: 'Mentalidad Global', description: 'Construido para operaciones multi-moneda, multi-idioma y transfronterizas desde el primer día.' }
      },
      journey: {
        title: 'Nuestro Camino',
        milestones: {
          beginning: { title: 'El Comienzo', description: 'Controlease fue fundada por un equipo de veteranos inmobiliarios e ingenieros de software frustrados por el caos de las hojas de cálculo.' },
          seed: { title: 'Financiación Semilla', description: 'Recaudamos $4M para construir la plataforma central y expandir el equipo de ingeniería.' },
          firstCustomer: { title: 'Primer Cliente Empresarial', description: 'Lanzamos programa piloto con una marca retail global gestionando más de 500 ubicaciones.' },
          seriesA: { title: 'Serie A', description: 'Aseguramos $12M para acelerar el desarrollo de IA y expandirnos al mercado europeo.' },
          expansion: { title: 'Expansión Global', description: 'Ahora sirviendo clientes en más de 30 países con un equipo de más de 85 personas.' },
          future: { title: 'Expansión Internacional y Ecosistema de Equipos', description: 'Planeamos abrir hubs regionales para proporcionar soporte 24/7 y experiencia en mercados locales, junto con el lanzamiento de una capa de colaboración unificada conectando equipos legales, financieros y de expansión en tiempo real.' }
        }
      },
      team: {
        title: 'Conoce al Liderazgo',
        description: 'Los expertos construyendo el futuro de las operaciones de arrendamiento.',
        ceo: { role: 'CEO y Co-Fundador', bio: 'Líder visionario con profundo conocimiento de sistemas de gestión empresarial. Impulsando la misión de revolucionar las operaciones de arrendamiento globalmente.' },
        cto: { role: 'CTO y Co-Fundador', bio: 'Estratega tecnológico y arquitecto. Liderando el equipo de ingeniería para construir soluciones escalables impulsadas por IA para la industria inmobiliaria.' },
        coo: { role: 'COO y Co-Fundadora', bio: 'Experta en excelencia operacional. Asegurando ejecución impecable y éxito del cliente en todos los mercados.' }
      },
      cta: {
        title: '¿Listo para unirte a la revolución?',
        description: 'Descubre cómo Controlease puede transformar las operaciones de tu portafolio hoy.',
        primaryCta: 'Ver Carreras',
        secondaryCta: 'Contactar Ventas'
      }
    },
    careers: {
      hero: {
        badge: 'Estamos Contratando',
        title: 'Construye el Futuro del PropTech',
        description: 'Únete a un equipo de constructores, soñadores y realizadores. Estamos transformando cómo el mundo gestiona los activos inmobiliarios.'
      },
      culture: {
        collaborative: 'Colaboración por Diseño',
        workHard: 'Trabaja Duro, Diviértete Mucho'
      },
      benefits: {
        title: '¿Por qué Controlease?',
        description: 'Cuidamos de nuestra gente para que puedan cuidar de nuestros clientes.',
        remote: { title: 'Primero Remoto', description: 'Trabaja desde cualquier lugar. Creemos en los resultados, no en horas en una silla. Tenemos miembros del equipo en 12 zonas horarias.' },
        equity: { title: 'Equidad Competitiva', description: 'Cada empleado es propietario. Ofrecemos generosos paquetes de opciones sobre acciones porque construimos esto juntos.' },
        health: { title: 'Salud Integral', description: 'Cobertura médica, dental y visual de primer nivel para ti y tus dependientes. Incluye apoyo de salud mental.' },
        learning: { title: 'Aprendizaje Continuo', description: 'Acceso a conferencias, cursos y libros para apoyar tu crecimiento profesional.' },
        retreats: { title: 'Retiros de Equipo', description: 'Dos veces al año, llevamos a todo el equipo a un lugar increíble para conectar, planificar y celebrar.' },
        gear: { title: 'Equipamiento de Última Generación', description: 'MacBook Pro, monitores 4K y todo lo que necesites para ser productivo. Tu oficina en casa está cubierta.' }
      },
      openings: {
        title: 'Posiciones Abiertas',
        description: 'Encuentra tu próximo rol y ayúdanos a dar forma a la industria.'
      },
      cta: {
        title: '¿No ves el rol adecuado?',
        description: 'Siempre estamos buscando talento. Envíanos tu currículum y te tendremos en cuenta para futuras vacantes.',
        primaryCta: 'Envíanos un Email',
        secondaryCta: 'Síguenos en LinkedIn'
      }
    },
    contactPage: {
      hero: {
        badge: 'Soporte Global 24/7',
        title: 'Contáctanos',
        description: 'Estamos aquí para ayudarte a modernizar tus operaciones de arrendamiento. Comunícate con nuestro equipo global.'
      },
      form: {
        title: 'Envíanos un mensaje',
        description: 'Completa el formulario y te responderemos en 24 horas.',
        fields: {
          name: 'Nombre',
          email: 'Correo electrónico',
          company: 'Empresa',
          phone: 'Teléfono',
          inquiryType: 'Tipo de consulta',
          message: 'Mensaje',
          submit: 'Enviar mensaje',
          options: {
            general: 'Consulta general',
            sales: 'Ventas y Demo',
            support: 'Soporte técnico',
            partnership: 'Asociación',
            careers: 'Empleo'
          }
        },
        success: {
          title: '¡Mensaje Enviado!',
          description: 'Gracias por contactarnos. Nuestro equipo se pondrá en contacto pronto.',
          sendAnother: 'Enviar otro mensaje'
        }
      },
      support: {
        title: 'Niveles de Soporte',
        description: 'Elige el nivel de soporte que se adapte a tus necesidades',
        basic: { title: 'Soporte Básico', description: 'Soporte por email con tiempo de respuesta de 48 horas. Acceso a documentación y base de conocimientos.' },
        professional: { title: 'Soporte Profesional', description: 'Email y teléfono prioritarios con respuesta en 24 horas. Gerente de cuenta dedicado.' },
        enterprise: { title: 'Soporte Empresarial', description: 'Soporte telefónico 24/7, gerente de éxito dedicado, capacitación personalizada y garantías SLA.' }
      },
      offices: {
        title: 'Oficinas Globales',
        globalHq: 'Sede Global',
        europeanHub: 'Hub Europeo'
      }
    },
    footer: {
      summary: 'Controlease es el sistema operativo para carteras de arrendamiento minorista multinacionales.',
      rights: 'Todos los derechos reservados.',
    },
    legal: {
      lastUpdated: '\u00daltima actualizaci\u00f3n',
      date: '7 de mayo de 2026',
      privacy: {
        title: 'Pol\u00edtica de Privacidad',
        sections: [
          { title: '1. Responsable del tratamiento', content: 'El responsable del tratamiento de los datos personales es CORBITAL TECH, S.L. (en adelante, \u201cControlease\u201d), con NIF B44995389 y domicilio en P\u00ba de la Castellana, 194, 28046 Madrid (Espa\u00f1a).\n\nEmail de contacto: support@controlease.net' },
          { title: '2. Finalidades del tratamiento', content: 'Los datos personales ser\u00e1n tratados para las siguientes finalidades:', items: ['Gesti\u00f3n de solicitudes de informaci\u00f3n: atenci\u00f3n de consultas realizadas a trav\u00e9s de la web o canales de contacto.', 'Prestaci\u00f3n del servicio SaaS Controlease: gesti\u00f3n, almacenamiento y tratamiento de datos incluidos en contratos de arrendamiento introducidos por los clientes.', 'Gesti\u00f3n administrativa y contractual: facturaci\u00f3n, cobros y gesti\u00f3n de la relaci\u00f3n comercial.', 'Soporte t\u00e9cnico y mantenimiento: resoluci\u00f3n de incidencias y mejora del servicio.'] },
          { title: '3. Base legal del tratamiento', content: 'El tratamiento de datos se basa en:', items: ['La ejecuci\u00f3n de un contrato (prestaci\u00f3n del servicio SaaS)', 'El inter\u00e9s leg\u00edtimo (soporte, seguridad y mejora del servicio)', 'El consentimiento del usuario (cuando aplique en formularios)'] },
          { title: '4. Tipolog\u00eda de datos tratados', content: 'Se tratan las siguientes categor\u00edas de datos:', items: ['Datos identificativos (nombre, email, tel\u00e9fono)', 'Datos profesionales (empresa, cargo)', 'Datos incluidos en contratos de arrendamiento (incluyendo datos de personas f\u00edsicas como arrendadores, representantes o personas de contacto)'], extra: 'Controlease no trata categor\u00edas especiales de datos personales.' },
          { title: '5. Destinatarios y encargados de tratamiento', content: 'Para la prestaci\u00f3n del servicio, Controlease utiliza proveedores tecnol\u00f3gicos que pueden acceder a datos personales en calidad de encargados del tratamiento, entre ellos:', items: ['Google (infraestructura y almacenamiento en la UE)', 'Stripe (gesti\u00f3n de pagos)', 'HubSpot', 'GitHub (gesti\u00f3n del desarrollo)'], extra: 'Asimismo, Controlease podr\u00e1 utilizar herramientas de inteligencia artificial para la prestaci\u00f3n del servicio.' },
          { title: '6. Transferencias internacionales de datos', content: 'Algunos de los proveedores utilizados pueden implicar transferencias internacionales de datos fuera del Espacio Econ\u00f3mico Europeo.\n\nEn estos casos, Controlease garantiza que dichas transferencias se realizan conforme a las garant\u00edas adecuadas establecidas en el RGPD, incluyendo cl\u00e1usulas contractuales tipo u otros mecanismos v\u00e1lidos.' },
          { title: '7. Conservaci\u00f3n de los datos', content: 'Los datos se conservar\u00e1n:', items: ['Mientras se mantenga la relaci\u00f3n contractual', 'Durante los plazos legales exigibles', 'Hasta que el usuario solicite su supresi\u00f3n, cuando proceda'] },
          { title: '8. Derechos de los interesados', content: 'Los usuarios pueden ejercer los siguientes derechos:', items: ['Acceso', 'Rectificaci\u00f3n', 'Supresi\u00f3n', 'Limitaci\u00f3n del tratamiento', 'Portabilidad', 'Oposici\u00f3n'], extra: 'Para ejercer estos derechos, pueden enviar una solicitud a: privacy@controlease.com\n\nAsimismo, tienen derecho a presentar una reclamaci\u00f3n ante la Agencia Espa\u00f1ola de Protecci\u00f3n de Datos.' },
          { title: '9. Seguridad de la informaci\u00f3n', content: 'Controlease aplica medidas t\u00e9cnicas y organizativas adecuadas para garantizar la seguridad de los datos personales, incluyendo:', items: ['Control de accesos', 'Cifrado de datos', 'Copias de seguridad', 'Registro de actividad'] },
          { title: '10. Modificaciones', content: 'Controlease se reserva el derecho a modificar la presente pol\u00edtica para adaptarla a cambios normativos o t\u00e9cnicos.' },
        ]
      },
      terms: {
        title: 'T\u00e9rminos y Condiciones del Servicio',
        sections: [
          { title: '1. Objeto del servicio', content: 'Controlease es una soluci\u00f3n SaaS proporcionada por CORBITAL TECH, S.L., destinada a la gesti\u00f3n de contratos de arrendamiento y datos asociados.' },
          { title: '2. Acceso y uso del servicio', content: 'El Cliente accede al servicio mediante suscripci\u00f3n y se compromete a:', items: ['Utilizar la plataforma conforme a la ley', 'No introducir datos il\u00edcitos o no autorizados', 'Garantizar la confidencialidad de sus credenciales'] },
          { title: '3. Modelo de suscripci\u00f3n', content: 'El servicio se presta bajo modalidad de suscripci\u00f3n mensual o anual, renovable autom\u00e1ticamente salvo cancelaci\u00f3n previa.' },
          { title: '4. Disponibilidad del servicio', content: 'Controlease se compromete a realizar sus mejores esfuerzos para garantizar la disponibilidad y correcto funcionamiento del servicio, sin garantizar disponibilidad ininterrumpida.' },
          { title: '5. Propiedad intelectual', content: 'Todos los derechos sobre el software, dise\u00f1o y tecnolog\u00eda de Controlease pertenecen a CORBITAL TECH, S.L.\n\nEl Cliente no adquiere ning\u00fan derecho de propiedad sobre la plataforma.' },
          { title: '6. Protecci\u00f3n de datos (DPA)', content: '6.1 Roles\nEl Cliente act\u00faa como responsable del tratamiento y Controlease como encargado del tratamiento.\n\n6.2 Finalidad\nEl tratamiento tiene como finalidad la prestaci\u00f3n del servicio SaaS.\n\n6.3 Tipolog\u00eda de datos\nDatos personales incluidos en contratos de arrendamiento (identificativos, profesionales y de contacto).\n\n6.4 Acceso a datos\nControlease podr\u00e1 acceder a los datos \u00fanicamente para soporte t\u00e9cnico, mantenimiento y mejora del servicio.' },
          { title: '7. Subencargados del tratamiento', content: 'Controlease podr\u00e1 recurrir a terceros proveedores necesarios para la prestaci\u00f3n del servicio, incluyendo:', items: ['Google', 'Stripe', 'GitHub'], extra: 'El Cliente autoriza expresamente el uso de dichos subencargados.' },
          { title: '8. Seguridad', content: 'Controlease implementa medidas de seguridad adecuadas, incluyendo:', items: ['Control de accesos', 'Cifrado', 'Copias de seguridad', 'Registro de actividad'] },
          { title: '9. Uso de inteligencia artificial', content: 'Controlease podr\u00e1 utilizar herramientas de inteligencia artificial para la prestaci\u00f3n, automatizaci\u00f3n y mejora del servicio.\n\nEl Cliente reconoce y acepta dicho uso como parte inherente del servicio.' },
          { title: '10. Derechos de los interesados', content: 'Controlease asistir\u00e1 al Cliente en el cumplimiento de sus obligaciones en materia de derechos de los interesados.' },
          { title: '11. Eliminaci\u00f3n y portabilidad de datos', content: 'El Cliente podr\u00e1:', items: ['Exportar sus datos', 'Solicitar su eliminaci\u00f3n'], extra: 'Tras la finalizaci\u00f3n del servicio, los datos ser\u00e1n eliminados o devueltos seg\u00fan corresponda.' },
          { title: '12. Responsabilidad', content: 'Controlease no ser\u00e1 responsable del uso indebido de la plataforma por parte del Cliente.' },
          { title: '13. Limitaci\u00f3n de responsabilidad', content: 'La responsabilidad total de Controlease quedar\u00e1 limitada al importe abonado por el Cliente en los doce (12) meses anteriores al hecho que origine la reclamaci\u00f3n.\n\nEn ning\u00fan caso Controlease ser\u00e1 responsable por da\u00f1os indirectos, lucro cesante, p\u00e9rdida de negocio o da\u00f1os reputacionales.' },
          { title: '14. Terminaci\u00f3n', content: 'El Cliente podr\u00e1 cancelar el servicio conforme a las condiciones de su suscripci\u00f3n.' },
          { title: '15. Legislaci\u00f3n aplicable', content: 'El presente contrato se regir\u00e1 por la legislaci\u00f3n espa\u00f1ola.\n\nLas partes se someten a los Juzgados y Tribunales del domicilio del Contratante.' },
        ]
      },
      cookies: {
        title: 'Pol\u00edtica de Cookies',
        sections: [
          { title: '1. \u00bfQu\u00e9 son las cookies?', content: 'Las cookies son peque\u00f1os archivos de texto que se almacenan en el dispositivo del usuario cuando visita una p\u00e1gina web. Permiten que la web funcione correctamente y ayudan a mejorar la experiencia del usuario.' },
          { title: '2. Tipos de cookies utilizadas', content: 'Controlease utiliza las siguientes categor\u00edas de cookies:', subsections: [
            { title: 'a) Cookies t\u00e9cnicas (necesarias)', content: 'Son aquellas imprescindibles para el funcionamiento de la web. Incluyen:', items: ['Gesti\u00f3n de sesi\u00f3n', 'Seguridad y autenticaci\u00f3n', 'Funcionamiento b\u00e1sico del sitio'], extra: 'Estas cookies no requieren consentimiento del usuario.' },
            { title: 'b) Cookies anal\u00edticas y publicitarias (uso futuro)', content: 'Actualmente, Controlease no utiliza cookies anal\u00edticas ni publicitarias.\n\nNo obstante, en el futuro podr\u00edan implementarse herramientas de an\u00e1lisis o marketing que permitan:', items: ['Analizar el tr\u00e1fico web', 'Medir el rendimiento', 'Realizar acciones publicitarias'], extra: 'En ese caso, se solicitar\u00e1 el consentimiento previo del usuario.' },
          ]},
          { title: '3. Cookies de terceros', content: 'En caso de implementarse cookies anal\u00edticas o publicitarias, podr\u00edan intervenir proveedores externos como:', items: ['Google', 'LinkedIn'] },
          { title: '4. Gesti\u00f3n de cookies', content: 'El usuario puede configurar su navegador para:', items: ['Bloquear cookies', 'Eliminar cookies', 'Recibir avisos antes de su instalaci\u00f3n'], extra: 'La desactivaci\u00f3n de ciertas cookies puede afectar al funcionamiento de la web.' },
          { title: '5. Actualizaciones', content: 'Esta Pol\u00edtica de Cookies podr\u00e1 actualizarse en funci\u00f3n de cambios legales o t\u00e9cnicos.' },
        ]
      },
      securityPage: {
        title: 'Seguridad',
        sections: {
          commitment: {
            title: '1. Nuestro Compromiso con la Seguridad',
            content: 'En Controlease, la seguridad no es solo una caracter\u00edstica, es la base de nuestra plataforma. Entendemos que conf\u00eda en nosotros con los datos m\u00e1s sensibles de su cartera de arrendamientos, m\u00e9tricas financieras y planes estrat\u00e9gicos. Empleamos medidas de seguridad de nivel empresarial para garantizar que sus datos permanezcan confidenciales, protegidos en su integridad y disponibles cuando los necesite.'
          },
          dataProtection: {
            title: '2. Protecci\u00f3n de Datos',
            encryption: { title: 'Cifrado', content: 'Todos los datos est\u00e1n cifrados en tr\u00e1nsito usando TLS 1.3 y en reposo usando cifrado AES-256. Utilizamos servicios de gesti\u00f3n de claves est\u00e1ndar de la industria para proteger las claves de cifrado.' },
            isolation: { title: 'Aislamiento de Datos', content: 'Los datos del cliente est\u00e1n separados l\u00f3gicamente en nuestra arquitectura multi-inquilino. Los controles de acceso estrictos aseguran que un inquilino no pueda acceder a los datos de otro inquilino.' }
          },
          infrastructure: {
            title: '3. Seguridad de Infraestructura',
            items: {
              cloud: { label: 'Seguridad en la Nube', content: 'Nuestra infraestructura est\u00e1 alojada en proveedores de nube de primer nivel (AWS/GCP/Azure) con certificaciones SOC 2 Tipo II.' },
              network: { label: 'Protecci\u00f3n de Red', content: 'Empleamos Firewalls de Aplicaciones Web (WAF), protecci\u00f3n DDoS y aislamiento de Nube Privada Virtual (VPC) para proteger nuestros servicios.' },
              monitoring: { label: 'Monitoreo', content: 'Sistemas de monitoreo y alerta de seguridad automatizados 24/7 para detectar y responder a actividades sospechosas inmediatamente.' }
            }
          },
          compliance: {
            title: '4. Cumplimiento y Gobernanza',
            content: 'Alineamos nuestras pr\u00e1cticas de seguridad con est\u00e1ndares internacionales incluyendo SOC 2, ISO 27001 y GDPR. Se realizan pruebas de penetraci\u00f3n y evaluaciones de vulnerabilidad regulares por terceros para validar nuestra postura de seguridad.'
          },
          accessControl: {
            title: '5. Control de Acceso',
            content: 'Controlease soporta Single Sign-On (SSO) v\u00eda SAML 2.0 y OIDC, permiti\u00e9ndole gestionar el acceso de usuarios a trav\u00e9s de su propio proveedor de identidad. Exigimos Autenticaci\u00f3n Multi-Factor (MFA) para todo acceso administrativo.'
          },
          reporting: {
            title: '6. Reportar Problemas',
            content: 'Si cree que ha encontrado una vulnerabilidad de seguridad en Controlease, por favor rep\u00f3rtela inmediatamente a security@controlease.com. Operamos un programa de divulgaci\u00f3n responsable y trabajaremos con usted para remediar el problema.'
          }
        }
      }
    },
    cookieBanner: {
      text: 'Utilizamos cookies t\u00e9cnicas necesarias para el correcto funcionamiento de la web.',
      link: 'Puedes obtener m\u00e1s informaci\u00f3n en nuestra Pol\u00edtica de Cookies.',
      accept: 'Aceptar',
    },
    security: {
      hero: {
        badge: 'Seguridad Empresarial',
        title: 'Seguridad en la que Puedes Confiar',
        description: 'Los datos de tu cartera de arrendamientos merecen el más alto nivel de protección. Implementamos prácticas de seguridad líderes en la industria para mantener tu información sensible segura y en cumplimiento.',
      },
      trust: {
        items: ['Cifrado 256-bit', 'Certificado SOC 2', '99.9% Disponibilidad', 'Cumple GDPR', 'Monitoreo 24/7', 'Auditorías Regulares'],
      },
      featuresSection: {
        title: 'Construido para Seguridad Empresarial',
        description: 'Cada capa de nuestra plataforma está diseñada con la seguridad como principio central, no como una ocurrencia tardía.',
      },
      features: {
        encryption: {
          title: 'Cifrado de Extremo a Extremo',
          description: 'Todos los datos están cifrados en reposo y en tránsito utilizando cifrado estándar de la industria de 256 bits, asegurando que tu información sensible permanezca protegida.',
        },
        mfa: {
          title: 'Autenticación Multifactor',
          description: 'Añade una capa extra de seguridad con soporte 2FA. Protege tu cuenta del acceso no autorizado con verificación por SMS, correo electrónico o aplicación de autenticación.',
        },
        rbac: {
          title: 'Control de Acceso Basado en Roles',
          description: 'Permisos granulares te permiten controlar exactamente quién puede ver, editar o gestionar datos específicos. Crea roles personalizados adaptados a tu organización.',
        },
        isolation: {
          title: 'Aislamiento de Datos',
          description: 'El aislamiento completo de inquilinos asegura que tus datos estén lógicamente separados y nunca sean accesibles por otros clientes o partes no autorizadas.',
        },
        audit: {
          title: 'Registros de Auditoría Completos',
          description: 'Cada acción se registra con marca de tiempo. Rastrea quién accedió a qué, cuándo, y mantén total responsabilidad en tu organización.',
        },
        monitoring: {
          title: 'Monitoreo de Amenazas 24/7',
          description: 'Monitoreo de seguridad continuo y detección automatizada de amenazas protegen tus datos las 24 horas. Alertas en tiempo real para actividad sospechosa.',
        },
      },
      complianceSection: {
        title: 'Cumplimiento y Certificaciones',
        description: 'Mantenemos los más altos estándares de cumplimiento de seguridad para satisfacer tus requisitos regulatorios.',
      },
      compliance: {
        soc2: 'Auditorías anuales de terceros verifican que nuestros controles de seguridad cumplen los estándares más estrictos de protección de datos y privacidad.',
        gdpr: 'Cumplimiento total con las regulaciones europeas de protección de datos, incluyendo portabilidad de datos, derecho al olvido y gestión de consentimiento.',
        iso: 'Nuestro sistema de gestión de seguridad de la información sigue las mejores prácticas internacionales para proteger tus datos.',
      },
      enterprise: {
        title: 'Seguridad Lista para Empresas',
        description: 'Construido para organizaciones que exigen los más altos estándares de seguridad, confiabilidad y cumplimiento.',
        items: [
          'Integración Single Sign-On (SSO) con tu proveedor de identidad',
          'Políticas de seguridad personalizadas y gestión de sesiones',
          'Gestión de cuenta dedicada y soporte prioritario',
          'Políticas personalizadas de retención y respaldo de datos',
          'Cuestionario de seguridad y documentación de cumplimiento',
          'Informes de pruebas de penetración disponibles bajo solicitud',
        ],
        card: {
          title: 'Controles de Seguridad',
          subtitle: 'Protección de nivel empresarial',
          features: [
            'Lista blanca de IP y restricciones de acceso',
            'Tiempo de espera de sesión y controles de inicio de sesión',
            'Políticas de contraseña y requisitos de complejidad',
            'Limitación de tasa de API y prevención de abuso',
            'Escaneo automatizado de vulnerabilidades',
            'Procedimientos de respuesta a incidentes',
          ],
        },
      },
      cta: {
        title: '¿Listo para asegurar tu cartera de arrendamientos?',
        primary: 'Comenzar Prueba Gratis',
        secondary: 'Hablar con Equipo de Seguridad',
      },
    },
    dataOnboarding: {
      hero: {
        badge: 'Servicios Profesionales',
        title: 'Digitalizamos Tu Cartera de Arrendamientos',
        description: 'Deja que nuestro equipo haga el trabajo pesado. Extraemos, validamos y estructuramos todos tus datos de arrendamientos existentes para que puedas empezar a usar Controlease inmediatamente.',
      },
      stats: [
        { value: '100+', label: 'Campos Extraídos' },
        { value: 'IA + Humano', label: 'Proceso de Validación' },
      ],
      process: {
        title: 'Cómo Funciona',
        description: 'Nuestro proceso optimizado asegura una migración de datos precisa con mínimo esfuerzo de tu parte.',
        steps: [
          {
            title: 'Recopilación de Documentos',
            description: 'Comparte tus documentos de arrendamiento de forma segura. Aceptamos PDFs, escaneos, imágenes e incluso documentos físicos.',
          },
          {
            title: 'Extracción con IA',
            description: 'Nuestra IA extrae puntos de datos clave: rentas, fechas, cláusulas, garantías y más de 100 campos estructurados.',
          },
          {
            title: 'Validación Humana',
            description: 'Analistas expertos revisan y validan cada extracción, asegurando precisión de grado de cumplimiento.',
          },
          {
            title: 'Listo para Usar',
            description: 'Tu cartera estructurada se carga en Controlease, lista para uso inmediato.',
          },
        ],
      },
      pricing: {
        title: 'Precios Simples y Transparentes',
        description: 'Paga por documento con descuentos por volumen. Sin costos ocultos, sin sorpresas.',
        tiers: [
          {
            name: 'Inicial',
            documents: 'Hasta 100 documentos',
            price: '$25',
            unit: 'por documento',
            features: ['Extracción completa de datos', 'Validación humana', 'Soporte por email'],
          },
          {
            name: 'Crecimiento',
            documents: '101 - 500 documentos',
            price: '$18',
            unit: 'por documento',
            features: ['Todo en Inicial', 'Procesamiento prioritario', 'Analista dedicado', 'Soporte telefónico'],
            popular: true,
          },
          {
            name: 'Empresa',
            documents: '500+ documentos',
            price: 'Personalizado',
            unit: 'precio por volumen',
            features: ['Todo en Crecimiento', 'Soporte presencial disponible', 'SLA personalizado', 'Gerente de cuenta'],
          },
        ],
      },
      benefits: {
        title: 'Ventajas de Nuestro Servicio',
        items: [
          {
            title: 'Sin Esfuerzo para tu Equipo',
            description: 'Tu equipo sigue enfocado en su trabajo mientras nosotros nos encargamos de migrar los datos.',
          },
          {
            title: 'Datos Listos para Auditoría',
            description: 'Información estructurada y lista para auditorías, reportes y cumplimiento normativo desde el día uno.',
          },
          {
            title: 'Resultados en Días',
            description: 'Empieza a usar Controlease en días, no en meses. Sin proyectos de implementación interminables.',
          },
          {
            title: 'Revisión por Expertos',
            description: 'Cada extracción es validada por analistas especializados en contratos de arrendamiento.',
          },
        ],
      },
      cta: {
        title: '¿Listo para digitalizar tu cartera?',
        primary: 'Obtener Cotización',
        secondary: 'Programar Llamada',
      },
    },
  },
  pt: {
    localeLabel: 'Português',
    nav: {
      home: 'Início',
      partners: 'Plataforma',
      programs: 'Módulos',
      impact: 'Valor',
      pricing: 'Preços',
      contact: 'Contato',
    },
    home: {
      hero: {
        badge: 'Controlease',
        title: 'Gestão Inteligente de Locações',
        description:
          'Controlease centraliza seus contratos, oferece visibilidade total do portfólio e evita erros custosos. A plataforma SaaS para proprietários, gestores e operadores.',
        primaryCta: 'Solicitar Demo',
        secondaryCta: 'Saiba Mais',
        metrics: [
          { label: 'Ciclo de Vida', value: 'Ponta a Ponta' },
          { label: 'Fonte de Dados', value: 'Verdade Única' },
          { label: 'Implantação', value: 'Nativo na Nuvem' },
        ],
        problemStatement: 'A maioria das organizações ainda gerencia locações em pastas dispersas, PDFs e planilhas — gerando prazos perdidos, erros de cobrança e horas desperdiçadas buscando informações.',
      },
      pointers: {
        title: 'Do Caos Contratual ao Controle Total',
        subtitle: '',
        items: [
          {
            title: 'Portfólio de Locações Centralizado',
            description: 'Reúna todos os seus contratos em uma única plataforma. Acesse informações-chave, documentos e termos financeiros instantaneamente para cada propriedade e inquilino do seu portfólio. Obtenha visibilidade completa em toda a sua organização.',
            stat: 'Visibilidade Total',
          },
          {
            title: 'Controle Operacional e Alertas',
            description: 'Nunca mais perca um evento crítico de locação. Controlease rastreia automaticamente marcos importantes como vencimentos de contratos, opções de saída, revisões e aumentos de aluguel, e obrigações contratuais. Antecipe-se aos prazos e evite erros custosos.',
            stat: 'Rastreamento Automático',
          },
          {
            title: 'Inteligência Contratual com IA',
            description: 'Nossa IA lê os contratos de locação e extrai dados contratuais importantes automaticamente. Datas, termos financeiros, cláusulas e obrigações tornam-se informações estruturadas que você pode analisar e gerenciar. Seus contratos deixam de ser PDFs estáticos e se tornam dados operacionais.',
            stat: 'Impulsionado por IA',
          },
        ],
      },
      insights: {
        title: 'Módulos da Plataforma',
        subtitle: 'Uma suíte completa de ferramentas integradas em um fluxo de trabalho fluido.',
        items: [
          {
            title: 'Dashboard Inteligente',
            description: 'KPIs visuais, vencimentos de contratos e previsões de vendas num relance.',
            tag: 'Analytics',
          },
          {
            title: 'Contratos de Locação',
            description: 'Modelos de dados estruturados para aluguéis, garantias e cláusulas.',
            tag: 'Núcleo',
          },
          {
            title: 'Assistente IA',
            description: 'Faça perguntas sobre seus contratos em linguagem natural. Obtenha respostas instantâneas, insights e recomendações.',
            tag: 'Novo',
          },
        ],
      },
      partnersPreview: {
        title: 'Confiado por líderes de varejo',
        logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp', 'City Centers', 'Plaza Group', 'Market Square'],
      },
      notifications: {
        badge: 'Alertas Automatizados',
        title: 'Alertas Automáticos para Eventos Críticos',
        description: 'Uma vez que seus contratos estão estruturados, Controlease monitora automaticamente cada marco importante. Você decide quem recebe cada notificação.',
        items: ['Vencimentos de Contratos', 'Opções de Saída', 'Aumentos ou Revisões de Aluguel', 'Condições Contratuais', 'Prazos de Renovação', 'E Muito Mais!'],
        emptyState: 'As notificações aparecerão aqui...',
        messages: {
          alert: [
            'Contrato a vencer: Loja B',
            'Desvio de aluguel detectado: Unidade 101',
            'Janela de opção de saída: Escritório 205',
            'Documento de compliance vencido: Inquilino A',
            'Aumento de aluguel: Armazém D',
            'Alerta de contrato vencido: Quiosque E',
          ],
          info: [
            'Novo contrato adicionado: Unidade 7',
            'Pagamento recebido: Loja F',
            'Inspeção agendada: Edifício G',
            'Novo inquilino integrado: Café H',
          ],
          warning: [
            'Alta taxa de vacância: Torre 1',
            'Possível inadimplência: Unidade 302',
            'Manutenção pendente: Varejo J',
          ],
        },
      },
      pdfExtractor: {
        badge: 'Impulsionado por IA',
        title: 'Extração de Dados de Locação com IA',
        description: 'Faça upload de qualquer documento de locação e nossa IA extrai automaticamente informações críticas como dados do inquilino, datas de início e término, termos de aluguel, depósitos e garantias, opções de saída e obrigações contratuais. Sem entrada manual de dados. Sem risco de erro humano.',
        upload: {
          title: 'Arraste o PDF aqui',
          subtitle: 'ou clique para navegar',
          button: 'Selecionar Arquivo',
        },
        processing: 'Processando documento...',
        extracted: 'Dados Extraídos',
        fields: {
          tenant: 'Inquilino',
          landlord: 'Proprietário',
          property: 'Propriedade',
          monthlyRent: 'Aluguel Mensal',
          startDate: 'Data de Início',
          endDate: 'Data de Término',
          securityDeposit: 'Depósito de Garantia',
          breakOption: 'Opção de Saída',
        },
      },
      aiConsole: {
        title: 'Assistente IA para Contratos de Locação',
        description: 'Interaja com seus contratos usando linguagem natural. Nossa IA pode analisar contratos de locação, gerar relatórios de portfólio, identificar cláusulas e obrigações importantes, e responder perguntas sobre seu portfólio. Em vez de procurar em documentos, simplesmente pergunte.',
        placeholder: 'Pergunte sobre seu portfólio...',
        thinking: 'Analisando seu portfólio...',
        messages: {
          welcome: "Olá! Sou seu assistente de IA. Posso ajudá-lo a analisar seu portfólio de locações, encontrar contratos específicos ou gerar relatórios. O que você gostaria de saber?",
          leasesExpiring: "Encontrei 3 contratos que vencem no Q3 2025 na Espanha. Aqui está um resumo:",
          rentProjection: "Com base no seu portfólio atual, aqui está a projeção de aluguel para 5 anos com cenários pessimista, esperado e otimista.",
        },
        prompts: {
          expiring: 'Mostrar contratos que vencem no Q3 2025',
          rentProjection: 'Gerar projeção de aluguel para os próximos 5 anos',
          portfolio: 'Analisar desempenho do portfólio',
        },
        chart: {
          title: 'Projeção de Aluguel em 5 Anos',
          worst: 'Pessimista',
          expected: 'Esperado',
          best: 'Otimista',
          cagr: 'CAGR Esperado',
        },
      },
      leaseOverview: {
        title: 'Gestão Centralizada de Portfólio de Locações',
        description: 'Gerencie todos os seus contratos de locação a partir de um painel intuitivo. Os contratos são organizados em registros claros e acessíveis, permitindo que você acesse rapidamente informações-chave, documentos e termos financeiros de cada ativo do seu portfólio. Tudo permanece organizado, pesquisável e sempre atualizado.',
        tabs: {
          brochure: 'Folheto',
          signatories: 'Signatários',
          basic: 'Básico',
          financial: 'Financeiro',
          breakOptions: 'Opções de Saída',
          guarantees: 'Garantias',
          details: 'Detalhes',
          history: 'Histórico',
        },
        sections: {
          generalInfo: 'Informações Gerais',
          location: 'Localização',
          contractType: 'Tipo de Contrato',
          rent: 'Aluguel',
          variableRent: 'Aluguel Variável',
          expenses: 'Despesas e Taxas',
          legalDeposit: 'Depósito Legal de Garantia',
          additionalGuarantees: 'Garantias Adicionais',
          landlords: 'Proprietários',
          brands: 'Marcas',
          consultants: 'Consultores',
        },
        fields: {
          leaseName: 'Nome do Contrato',
          status: 'Status',
          active: 'Ativo',
          lapsed: 'Vencido',
          viewRenewal: 'Ver Renovação',
          managerActionRequired: 'Ação necessária do gestor',
          leaseRenewalMessage: 'Este contrato foi marcado para renovação ou encerramento. Por favor, revise e tome uma ação.',
          viewRenewalLink: 'Ver renovação',
          country: 'País',
          city: 'Cidade',
          address: 'Endereço',
          postalCode: 'CEP',
          stateProvince: 'Estado / Província',
          enterContractRef: 'Insira a referência do contrato...',
          enterCadastralRef: 'Insira a referência cadastral...',
          type: 'Tipo',
          retail: 'Varejo',
          startDate: 'Data de Início',
          endDate: 'Data de Término',
          baseRent: 'Aluguel Base',
          currency: 'Moeda',
          frequency: 'Frequência',
          monthly: 'Mensal',
          percentage: 'Porcentagem',
          threshold: 'Limite',
          commonExpenses: 'Despesas Comuns',
          marketingFee: 'Taxa de Marketing',
          months: 'meses',
          bankGuarantee: 'Garantia Bancária',
          enabled: 'Habilitado',
          amount: 'Valor',
          expiryDate: 'Data de Vencimento',
          name: 'Nome',
          email: 'E-mail',
          phone: 'Telefone',
          role: 'Função',
          primary: 'Principal',
          contact: 'Contato',
        },
        nav: {
          home: 'Início',
          manage: 'Gerenciar',
          activity: 'Atividade',
          more: 'Mais',
        },
        projection: {
          title: 'Projeções do Contrato',
          tabs: { rent: 'Aluguel', sales: 'Vendas', budget: 'Orçamento' },
          granularity: 'Granularidade:',
          monthly: 'Mensal',
          yearly: 'Anual',
          view: 'Visualização:',
          chart: 'Gráfico',
          table: 'Tabela',
          scenarios: 'Cenários:',
          worst: 'Pessimista',
          expected: 'Esperado',
          best: 'Otimista',
          rentProjectionWithIpc: 'Projeção de Aluguel com IPC',
          rentProjectionTable: 'Tabela de Projeção de Aluguel',
          year: 'Ano',
          structural: 'Estrutural',
          ipcPercent: 'IPC %',
          payable: 'A Pagar',
          summary: 'Resumo',
          totalFiveYear: 'Total (5A)',
          avgIpc: 'IPC Médio',
          salesProjection: 'Projeção de Vendas',
          highConfidence: 'Alta Confiança',
          patternDetected: 'Padrão detectado: Crescimento constante com picos sazonais no Q4',
          budgetOverview: 'Visão Geral do Orçamento',
          ebitda: 'EBITDA',
          roi: 'ROI',
          kpis: 'KPIs',
          effortRate: 'Taxa de Esforço:',
          payback: 'Payback:',
          pricePerSqm: '€/m²:',
          breakeven: 'Ponto de Equilíbrio:',
        },
        pdf: {
          contractDocument: 'Documento do Contrato',
          locateInformation: 'Localizar Informação',
          format: 'Formato',
          extractedRawText: 'Texto Extraído:',
          endOfPreview: '--- Fim da Prévia ---',
        },
        mobile: {
          storeFront: 'Fachada',
          interior: 'Interior',
          imageGallery: 'Galeria de Imagens',
        },
        mobileFields: {
          name: 'Nome',
          surface: 'Área',
          unitNumber: 'Número da Unidade',
          contractCode: 'Código do Contrato',
          contractReference: 'Referência do Contrato',
          cadastralReference: 'Referência Cadastral',
          region: 'Região',
          signedRentYearly: 'Aluguel Assinado (Anual)',
          invoicedRentYearly: 'Aluguel Faturado (Anual)',
          monthlyRent: 'Aluguel Mensal',
          pricePerSqmYearly: '€/m² (Anual)',
          freePeriod: 'Período de Carência',
          keyMoney: 'Luvas',
          salesReport: 'Relatório de Vendas',
          variableRentClause: 'Cláusula de Aluguel Variável',
          effortRate: 'Taxa de Esforço',
          serviceChargesYearly: 'Encargos de Serviço (Anual)',
          marketingYearly: 'Marketing (Anual)',
          ibiYearly: 'IBI (Anual)',
          ecop: 'ECOP',
          fitOut: 'Acabamento',
          renewalDate: 'Data de Renovação',
          gbeo: 'GBEO',
          cifNif: 'CIF/NIF',
          chargesAndFees: 'Encargos e Taxas',
          overThreshold: '5% acima do limite',
        },
      },
      cta: {
        title: 'Assuma o Controle do Seu Portfólio de Locações',
        description: 'Pare de gerenciar contratos de locação em planilhas, pastas e e-mails. Controlease centraliza todo o seu portfólio imobiliário em uma única plataforma inteligente.',
        primaryCta: 'Solicitar Demo',
        secondaryCta: 'Entre em Contato',
      },
      rentAudit: {
        badge: 'Auditoria Inteligente',
        title: 'Auditoria Inteligente de Aluguéis',
        description: 'Controlease verifica automaticamente se o que você é cobrado corresponde às condições definidas no seu contrato de locação. A plataforma calcula o aluguel que deveria ser pago e compara com os valores realmente faturados. Desvios são detectados instantaneamente.',
        subtitle: 'Isso ajuda a identificar problemas comuns como:',
        items: ['Aumentos de aluguel incorretos', 'Cálculos de indexação errados', 'Condições contratuais esquecidas'],
        conclusion: 'Em vez de descobrir erros durante auditorias manuais, você os detecta em tempo real.',
      },
      security: {
        badge: 'Segurança Empresarial',
        title: 'Segurança e Conformidade de Nível Empresarial',
        description: 'Controlease opera em uma infraestrutura de nuvem segura, projetada para atender a rigorosos padrões de cibersegurança e conformidade.',
        subtitle: 'Os recursos de segurança incluem:',
        items: ['Armazenamento de dados criptografado', 'Protocolos de comunicação seguros', 'Gerenciamento de acesso baseado em funções', 'Rastreabilidade completa de atividades', 'Backups automatizados'],
        conclusion: 'Seus dados são protegidos com práticas de segurança líderes do setor e monitoramento contínuo.',
      },
      tour: {
        steps: {
          sidebar: {
            title: 'Seu Centro de Comando',
            description: 'Navegue por todo o seu portfólio a partir daqui. Explore cada seção para conhecer o que o Controlease oferece.',
          },
          sidebarHints: {
            home: 'Métricas e gráficos do portfólio',
            leases: 'Gerencie e rastreie contratos',
            upload: 'Extração de dados com IA',
            alerts: 'Alertas automáticos de datas',
            scope: 'Alternar entre localizações',
          },
          status: {
            title: 'Status do Contrato num Relance',
            description: 'Identifique instantaneamente o status de cada contrato. Status codificados por cores como Ativo, Vencido ou Por Vencer ajudam a priorizar.',
          },
          alert: {
            title: 'Alertas Proativos',
            description: 'Datas críticas aparecem automaticamente. Janelas de renovação, opções de saída e problemas de compliance são sinalizados antes de se tornarem problemas.',
          },
          tabs: {
            title: 'Tudo Organizado',
            description: 'Navegue por dados complexos sem esforço. Termos-chave, financeiros, garantias e documentos.',
          },
          tabsHints: {
            financial: 'Aluguéis, encargos e taxas',
            guarantees: 'Depósitos e fianças',
            details: 'Documentos e arquivos',
            history: 'Histórico de auditoria',
          },
          actions: {
            title: 'Ações Poderosas',
            description: 'Acesso rápido a recursos-chave sem sair da visualização do contrato.',
          },
          actionsHints: {
            projection: 'Projeções financeiras',
            pdf: 'Ver contrato original',
            chat: 'Assistente IA',
          },
          projectionOpen: {
            title: 'Painel de Projeções',
            description: 'Clique para abrir o painel de projeções financeiras.',
          },
          projectionPanel: {
            title: 'Projeções do Contrato',
            description: 'Projete aluguel, vendas e orçamento com análise de cenários. Feche o painel quando terminar.',
          },
          projectionHints: {
            tabs: 'Aluguel, Vendas e Orçamento',
            controls: 'Visualização e granularidade',
            scenarios: 'Comparar cenários',
            close: 'Clique para fechar',
          },
          pdfOpen: {
            title: 'Visualizador de Contrato',
            description: 'Clique para visualizar o documento original do contrato.',
          },
          pdfPanel: {
            title: 'Prévia do Contrato',
            description: 'Visualize e extraia texto de documentos. Feche o painel quando terminar.',
          },
          pdfHints: {
            preview: 'Prévia do PDF original',
            format: 'Extrair texto bruto',
            close: 'Clique para fechar',
          },
          completion: {
            title: 'Tudo Pronto!',
            description: 'O Controlease transforma a gestão de locações com extração de dados com IA, alertas automatizados e inteligência financeira. Enviamos melhorias semanalmente. Bem-vindo a bordo!',
          },
        },
        nav: {
          back: 'Voltar',
          next: 'Próximo',
          gotIt: 'Entendi!',
          clickToContinue: 'Clique para continuar',
          awesome: 'Incrível!',
        },
      },
      aiScenario: {
        messages: {
          expiring: 'Quais contratos estão por vencer em breve?',
          expiringResponse: 'Aqui está sua linha do tempo de vencimentos para os próximos 12 meses. Q3 2025 tem o maior volume com 23 contratos.',
          deadlines: 'Há prazos urgentes que eu deva saber?',
          deadlinesResponse: 'Encontrei 3 itens que requerem atenção:',
          extract: 'Extraia os termos-chave do novo PDF do contrato de Barcelona',
          extractResponse: 'Analisei o contrato e extraí os campos-chave:',
          breakClause: 'Qual é a cláusula de saída para a Loja #142?',
          breakClauseResponse: 'Encontrado na Seção 14.2 de LEASE-MAD-142:',
          projection: 'Projete o aluguel para a loja principal com ajustes de IPC',
          projectionResponse: 'Aqui está a projeção de 5 anos com cenários pessimista/esperado/otimista:',
          occupancy: 'Qual é a taxa de ocupação do nosso portfólio?',
          occupancyResponse: 'O portfólio está performando bem:',
          conclusion: 'Precisa de algo mais? Posso ajudar com análise de aluguel, verificações de compliance, busca de documentos e mais.',
        },
        widgets: {
          resultsFound: 'Resultados Encontrados',
          leases: 'contratos',
          location: 'Localização',
          expiring: 'Por Vencer',
          avgRent: 'Aluguel Méd.',
          vsMarket: 'Vs Mercado',
          portfolioOccupancy: 'Ocupação do Portfólio',
          vsLastQuarter: 'vs trimestre anterior',
          unitsLeased: 'Unidades Locadas',
          expirationTimeline: 'Linha de Vencimentos',
          next12Months: 'Próximos 12 meses',
          rentProjection: 'Projeção de Aluguel em 5 Anos',
          worst: 'Pessimista',
          expected: 'Esperado',
          best: 'Otimista',
          expectedCagr: 'CAGR Esperado',
          extractedFromPdf: 'Extraído do PDF',
          accuracy: 'precisão',
          tenant: 'Inquilino',
          startDate: 'Data de Início',
          monthlyRent: 'Aluguel Mensal',
          deposit: 'Depósito',
          breakOption: 'Opção de Saída',
          breakOptionAlert: 'Opção de Saída',
          renewalDue: 'Renovação Pendente',
          rentReview: 'Revisão de Aluguel',
          breakOptionDesc: '45 dias para exercer',
          renewalDueDesc: 'Decisão necessária em 60 dias',
          rentReviewDesc: 'Ajuste de IPC pendente',
          daysLeft: 'dias restantes',
          days: 'dias',
          pending: 'pendente',
          teamManagement: 'Gestão de Equipe',
          teamManagementDesc: 'Convide usuários e atribua funções',
          section: 'Seção 14.2 – Cláusula de Rescisão',
          tenantNotice: '"O Inquilino poderá rescindir este contrato fornecendo seis (6) meses de aviso escrito antes da data de saída..."',
          failureNotice: '"A falta de notificação resultará na renovação automática por um período adicional de 3 anos."',
          cagr: 'CAGR Esperado',
        },
        tabs: {
          leaseAnalysis: 'Análise de Contrato',
          rentInquiry: 'Consulta de Aluguel',
          newChat: 'Novo Chat',
        },
      },
      platformModules: {
        leaseIntelligence: {
          title: 'Inteligência de Contratos',
          description: 'Motor de aluguel dual com controle de versões, histórico de auditoria e gestão completa do ciclo de vida.',
          tag: 'Núcleo',
        },
        aiAssistant: {
          title: 'Assistente IA',
          description: 'Consultas em linguagem natural sobre seu portfólio. Faça perguntas, analise documentos, obtenha insights preditivos.',
          tag: 'IA',
        },
        documentExtraction: {
          title: 'Extração de Documentos',
          description: 'Extração de PDF com IA. Extraia automaticamente mais de 100 campos de contratos com 99% de precisão.',
          tag: 'IA',
        },
        smartDashboard: {
          title: 'Dashboard Inteligente',
          description: 'KPIs visuais num relance. Rastreie vencimentos, evolução de aluguel e saúde do portfólio em tempo real.',
          tag: 'Analytics',
        },
        portfolioAnalytics: {
          title: 'Analytics de Portfólio',
          description: 'Evolução de MGR, previsão de vencimentos, projeções de vendas e KPIs em tempo real.',
          tag: 'Analytics',
        },
        automatedAlerts: {
          title: 'Alertas Automatizados',
          description: 'Nunca perca datas críticas. Notificações automáticas para opções de saída, renovações e compliance.',
          tag: 'Automação',
        },
        rentProjections: {
          title: 'Projeções de Aluguel',
          description: 'Modelagem multi-cenário com ajustes de IPC, aluguéis escalonados, descontos e períodos gratuitos.',
          tag: 'Analytics',
        },
        salesForecasting: {
          title: 'Previsão de Vendas',
          description: 'Cenários pessimista/médio/otimista com padrões sazonais. Otimize aluguel variável e taxa de esforço.',
          tag: 'Analytics',
        },
        directoryContacts: {
          title: 'Diretório e Contatos',
          description: 'Base de dados unificada de stakeholders. Gerencie proprietários, marcas, franqueados e consultores.',
          tag: 'Núcleo',
        },
        roleBasedAccess: {
          title: 'Acesso por Funções',
          description: 'Funções Admin, Superusuário, Editor, Leitor com permissões baseadas em escopo. Segurança empresarial.',
          tag: 'Segurança',
        },
        importExport: {
          title: 'Importar e Exportar',
          description: 'Operações em massa baseadas em modelos Excel. Importe centenas de contratos ou exporte relatórios filtrados.',
          tag: 'Núcleo',
        },
        versionControl: {
          title: 'Controle de Versões',
          description: 'Auditoria completa com histórico imutável. Rastreie cada alteração, reverta edições e mantenha compliance.',
          tag: 'Segurança',
        },
        multiTenant: {
          title: 'Multi-Inquilino',
          description: 'Isolamento completo de dados por organização com filtragem baseada em escopo para portfólios multinacionais.',
          tag: 'Segurança',
        },
        leaseRenewals: {
          title: 'Renovações de Contratos',
          description: 'Fluxo de renovação simplificado com transições automáticas de status e rastreamento de contratos vinculados.',
          tag: 'Automação',
        },
        documentGallery: {
          title: 'Galeria de Documentos',
          description: 'Armazenamento centralizado com prévia de PDF, extração de texto e hospedagem segura na nuvem.',
          tag: 'Núcleo',
        },
        teamManagement: {
          title: 'Gestão de Equipes',
          description: 'Convide usuários, atribua funções, configure permissões e gerencie acessos na sua organização.',
          tag: 'Segurança',
        },
        contractTemplates: {
          title: 'Modelos de Contratos',
          description: 'Modelos de dados padronizados para aluguéis, garantias, opções de saída e cláusulas.',
          tag: 'Núcleo',
        },
        customConfiguration: {
          title: 'Configuração Personalizada',
          description: 'Configurações específicas por inquilino, preferências de notificação e opções de personalização de fluxos.',
          tag: 'Núcleo',
        },
      },
    },
    landing: {
      commandBar: {
        brand: 'Controlease',
        tagline: 'Sistema Operacional Empresarial',
        signIn: 'Entrar',
        requestDemo: 'Solicitar Demo',
        mobileNav: {
          home: 'Início',
          dataOnboarding: 'Onboarding',
          company: 'Empresa',
          contact: 'Contato',
          menu: 'Menu',
        },
        nav: [
          {
            label: 'Plataforma',
            path: '/#value-pillars',
            children: [
              { title: 'Pilares de Valor', desc: 'Ciclo de vida, governança e inteligência', path: '/#value-pillars' },
              { title: 'Extração de Dados', desc: 'Processamento PDF com IA', path: '/#data-extraction' },
              { title: 'Gestão de Contratos', desc: 'Ciclo completo de contratos', path: '/#lease-management' },
              { title: 'Assistente IA', desc: 'Análise em linguagem natural', path: '/#ai-assistant' },
              { title: 'Notificações', desc: 'Sistema de alertas automatizado', path: '/#notifications' },
              { title: 'Módulos', desc: 'Visão completa de funcionalidades', path: '/#modules' },
            ],
          },
          // {
          //   label: 'Segurança',
          //   path: '/security',
          // },
          {
            label: 'Onboarding de Dados',
            path: '/services/data-onboarding',
          },
          {
            label: 'Empresa',
            path: '/company',
            children: [
              { title: 'Sobre Nós', desc: 'Nossa missão e visão', path: '/company/about' },
              { title: 'Carreiras', desc: 'Junte-se à nossa equipe', path: '/company/careers' },
              { title: 'Contato', desc: 'Entre em contato', path: '/contact' },
            ],
          },
        ],
      },
      hero: {
        badge: 'Sistema Operacional Empresarial',
        headline: {
          lead: 'Controle seu',
          highlight: 'Portfólio Global',
        },
        description:
          'Controlease unifica todo o ciclo de vida de locações: captura, aprovações, operações, renovações e análises de compliance.',
        primaryCta: 'Iniciar piloto',
        secondaryCta: 'Ver estudos de caso',
        ticker: [
          'Fonte única de verdade',
          'Compliance automatizado',
          'Inteligência do portfólio',
          'Implantação rápida',
        ],
        partners: [
          {
            name: 'Google',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
          },
          {
            name: 'IBM',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
          },
          {
            name: 'TCS',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
          },
        ],
      },
      architecture: {
        badge: 'Pilares de Valor',
        title: 'Cobertura do Ciclo',
        highlight: 'Completa',
        description: 'Do rascunho à rescisão, todos os módulos compartilham o mesmo modelo estruturado.',
        aiAssistant: {
          title: 'Assistente IA',
          description: 'Análise contextual do portfólio',
          labels: {
            ai: 'IA',
            user: 'Você',
          },
          intro: 'Olá! Posso analisar seu portfólio. Pergunte sobre vencimentos ou dados de vendas.',
          userPrompt: 'Mostre locações que vencem no Q3 2025 na Espanha.',
          summary: {
            prefix: 'Encontrei',
            highlight: '3 contratos',
            suffix: 'que vencem no Q3 2025 na Espanha:',
            button: 'Ver relatório completo →',
            leases: [
              { code: 'MAD-001 (Madri)', status: 'Venc.: 15 Ago' },
              { code: 'BCN-042 (Barcelona)', status: 'Venc.: 1 Set' },
            ],
          },
        },
        financial: {
          title: 'Inteligência Financeira',
          description: 'Previsões e análises em tempo real',
          metrics: [
            { label: 'EBITDA projetado', value: '$4,2M', trend: '+12%', trendPositive: true },
            { label: 'Índice de esforço', value: '11,4%', trend: '-0,8%', trendPositive: false },
          ],
          progress: [
            { label: 'Aluguel vs Vendas', value: '98%', barWidth: '98%', color: 'bg-emerald-500' },
            { label: 'Custo de ocupação', value: '12%', barWidth: '12%', color: 'bg-blue-500' },
          ],
        },
        leaseOps: {
          title: 'Operações de Locação',
          description: 'Gestão digital de contratos',
          features: ['Controle de versões', 'Linha de auditoria'],
        },
        globalReach: {
          title: 'Presença Global',
          description: 'Multimoeda e fusos horários',
        },
      },
      clients: {
        title: 'Confiado pelos líderes',
        subtitle: 'Impulsionamos os portfólios mais ambiciosos do varejo.',
        logos: [
          {
            name: 'Global Retail',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png',
          },
          {
            name: 'Urban Spaces',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
          },
          {
            name: 'Metro Properties',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png',
          },
          {
            name: 'Prime Locations',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png',
          },
          {
            name: 'Retail Corp',
            logo:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png',
          },
        ],
        caseStudies: [
          {
            company: 'Meridian Global',
            metric: '32%',
            description: 'Renovações mais rápidas com fluxos automatizados.',
            tag: 'Eficiência',
          },
          {
            company: 'Northwind College',
            metric: '$1,2M',
            description: 'Recuperado em ajustes de indexação perdidos.',
            tag: 'Receita',
          },
          {
            company: 'Atlas Polytechnic',
            metric: '100%',
            description: 'Compliance auditado em 12 países.',
            tag: 'Governança',
          },
        ],
      },
      footer: {
        brand: 'Controlease',
        summary: 'O sistema operacional para portfólios multinacionais de locações.',
        columns: [
          {
            title: 'Plataforma',
            links: [
              { label: 'Pilares de Valor', to: '/#value-pillars' },
              { label: 'Extração de Dados', to: '/#data-extraction' },
              { label: 'Gestão de Contratos', to: '/#lease-management' },
              { label: 'Assistente IA', to: '/#ai-assistant' },
              { label: 'Módulos', to: '/#modules' },
            ],
          },
          {
            title: 'Serviços',
            links: [
              // { label: 'Preços', to: '/pricing' },
              { label: 'Onboarding de Dados', to: '/services/data-onboarding' },
              // { label: 'Segurança', to: '/security' },
            ],
          },
          {
            title: 'Empresa',
            links: [
              { label: 'Sobre Nós', to: '/company/about' },
              { label: 'Carreiras', to: '/company/careers' },
              { label: 'Contato', to: '/contact' },
            ],
          },
        ],
        legal: [
          { label: 'Privacidade', to: '/privacy' },
          { label: 'Termos de Servi\u00e7o', to: '/terms' },
          { label: 'Cookies', to: '/cookies' },
        ],
        rights: '\u00a9 2025 Controlease. Todos os direitos reservados.',
      },
    },
    partners: {
      title: 'Plataforma Empresarial',
      subtitle: 'Segura, escalável e construída para operações modernas de varejo.',
      logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp'],
    },
    programs: {
      title: 'Inventário de Recursos',
      subtitle: 'Tudo o que você precisa para gerenciar portfólios de locação complexos.',
      items: [
        {
          name: 'Contratos de Locação',
          description: 'Gestão completa do ciclo de vida com histórico de versões e esquemas financeiros.',
          highlight: 'Linha do Tempo',
          icon: 'DocumentText',
        },
        {
          name: 'Diretório e Contatos',
          description: 'Gestão centralizada para proprietários, marcas, franqueados e consultores.',
          highlight: 'Mapeamento',
          icon: 'Users',
        },
        {
          name: 'Motor Financeiro',
          description: 'Gerencie aluguéis escalonados, bonificações, ajustes de IPC e previsões de vendas.',
          highlight: 'Cálculos Complexos',
          icon: 'Calculator',
        },
      ],
    },
    impact: {
      title: 'Resultados Mensuráveis',
      subtitle: 'Transformando como equipes jurídicas, financeiras e de expansão colaboram.',
      items: [
        {
          quote:
            'Controlease consolidou nossos dados fragmentados em uma única fonte de verdade. O compliance agora é automático.',
          author: 'Sarah Jenkins',
          role: 'Diretora Jurídica, Global Retail',
        },
        {
          quote:
            "O assistente de IA e as ferramentas de previsão mudaram completamente como planejamos nossa expansão.",
          author: 'Michael Ross',
          role: 'VP de Imóveis, Metro Properties',
        },
      ],
    },
    contact: {
      title: 'Pronto para modernizar suas operações?',
      description: 'Agende uma demonstração personalizada para ver o Controlease em ação.',
      primaryCta: 'Agendar Demo',
      secondaryCta: 'Ver Recursos',
      offices: [
        { name: 'Sede Global', email: 'contact@controlease.com', phone: '+1 (555) 123-4567' },
        { name: 'Suporte', email: 'support@controlease.com', phone: '+1 (555) 987-6543' },
      ],
    },
    pricing: {
      title: 'Preços Simples e Transparentes',
      subtitle: 'Escolha o plano que se adapta ao tamanho e necessidades do seu portfólio.',
      plans: [
        {
          name: 'Teste',
          price: 'Grátis',
          period: '/ 14 dias',
          description: 'Perfeito para testar as capacidades da plataforma.',
          features: ['1 Usuário', 'Até 10 Contratos', 'Analytics Básico', 'Suporte Padrão'],
          cta: 'Iniciar Teste',
          highlight: false
        },
        {
          name: 'Básico',
          price: '$499',
          period: '/ mês',
          description: 'Para pequenos portfólios e equipes individuais.',
          features: ['5 Usuários', 'Até 50 Contratos', 'Armazenamento de Docs', 'Suporte por E-mail'],
          cta: 'Obter Básico',
          highlight: false
        },
        {
          name: 'Pro',
          price: '$999',
          period: '/ mês',
          description: 'Para empresas em crescimento com múltiplas localizações.',
          features: ['Usuários Ilimitados', 'Até 200 Contratos', 'Analytics Avanzado', 'Suporte Prioritário', 'Acesso API'],
          cta: 'Obter Pro',
          highlight: true
        },
        {
          name: 'Pro +',
          price: '$1,499',
          period: '/ mês',
          description: 'Ferramentas avançadas de compliance e automação.',
          features: ['Tudo no Pro', 'Até 500 Contratos', 'Assistente IA', 'Logs de Auditoria', 'Integração SSO'],
          cta: 'Obter Pro +',
          highlight: false
        },
        {
          name: 'Empresarial',
          price: 'Sob medida',
          period: '',
          description: 'Para organizações globais com necessidades complexas.',
          features: ['Contratos Ilimitados', 'Integrações Personalizadas', 'Gerente de Sucesso Dedicado', 'Garantia SLA', 'Opção On-premise'],
          cta: 'Falar com Vendas',
          highlight: false
        }
      ],
      disclaimer: 'Todos os planos incluem segurança SSL, backups automáticos e garantia de 99.9% de disponibilidade. Preços em USD. IVA pode ser aplicável.'
    },
    about: {
      hero: {
        badge: '', // 'Nossa História' - commented out for now
        title: 'Revolucionando a Gestão de Locações',
        description: 'Nossa missão é trazer transparência, automação e inteligência para os portfólios imobiliários globais do amanhã.'
      },
      stats: {
        leasesManaged: 'Contratos Gerenciados',
        countries: 'Países',
        assetValue: 'Valor de Ativos',
        teamMembers: 'Membros da Equipe'
      },
      values: {
        title: 'Nossos Valores',
        description: 'Os princípios que guiam nossas decisões de produto e cultura empresarial.',
        transparency: { title: 'Transparência Primeiro', description: 'Acreditamos que os dados devem ser acessíveis e claros. Sem taxas ocultas, sem caixas pretas.' },
        innovation: { title: 'Inovação', description: 'Desafiamos o status quo do software imobiliário tradicional com IA e UX moderno.' },
        customer: { title: 'Obsessão pelo Cliente', description: 'Construímos o que nossos clientes precisam, não apenas o que é legal. Seu sucesso é nosso sucesso.' },
        global: { title: 'Mentalidade Global', description: 'Construído para operações multi-moeda, multi-idioma e transfronteiriças desde o primeiro dia.' }
      },
      journey: {
        title: 'Nossa Jornada',
        milestones: {
          beginning: { title: 'O Começo', description: 'Controlease foi fundada por uma equipe de veteranos imobiliários e engenheiros de software frustrados com o caos das planilhas.' },
          seed: { title: 'Financiamento Seed', description: 'Levantamos $4M para construir a plataforma central e expandir a equipe de engenharia.' },
          firstCustomer: { title: 'Primeiro Cliente Empresarial', description: 'Lançamos programa piloto com uma marca de varejo global gerenciando mais de 500 localizações.' },
          seriesA: { title: 'Série A', description: 'Garantimos $12M para acelerar o desenvolvimento de IA e expandir para o mercado europeu.' },
          expansion: { title: 'Expansão Global', description: 'Agora atendendo clientes em mais de 30 países com uma equipe de mais de 85 pessoas.' },
          future: { title: 'Expansão Internacional e Ecossistema de Equipes', description: 'Planejamos abrir hubs regionais para fornecer suporte 24/7 e expertise em mercados locais, junto com o lançamento de uma camada de colaboração unificada conectando equipes jurídicas, financeiras e de expansão em tempo real.' }
        }
      },
      team: {
        title: 'Conheça a Liderança',
        description: 'Os especialistas construindo o futuro das operações de locação.',
        ceo: { role: 'CEO e Co-Fundador', bio: 'Líder visionário com profundo conhecimento de sistemas de gestão empresarial. Impulsionando a missão de revolucionar as operações de locação globalmente.' },
        cto: { role: 'CTO e Co-Fundador', bio: 'Estrategista tecnológico e arquiteto. Liderando a equipe de engenharia para construir soluções escaláveis impulsionadas por IA para a indústria imobiliária.' },
        coo: { role: 'COO e Co-Fundadora', bio: 'Especialista em excelência operacional. Garantindo execução impecável e sucesso do cliente em todos os mercados.' }
      },
      cta: {
        title: 'Pronto para se juntar à revolução?',
        description: 'Descubra como o Controlease pode transformar as operações do seu portfólio hoje.',
        primaryCta: 'Ver Carreiras',
        secondaryCta: 'Falar com Vendas'
      }
    },
    careers: {
      hero: {
        badge: 'Estamos Contratando',
        title: 'Construa o Futuro do PropTech',
        description: 'Junte-se a uma equipe de construtores, sonhadores e realizadores. Estamos transformando como o mundo gerencia ativos imobiliários.'
      },
      culture: {
        collaborative: 'Colaboração por Design',
        workHard: 'Trabalhe Duro, Divirta-se Muito'
      },
      benefits: {
        title: 'Por que Controlease?',
        description: 'Cuidamos das nossas pessoas para que elas possam cuidar dos nossos clientes.',
        remote: { title: 'Remoto Primeiro', description: 'Trabalhe de qualquer lugar. Acreditamos em resultados, não em horas numa cadeira. Temos membros da equipe em 12 fusos horários.' },
        equity: { title: 'Equity Competitivo', description: 'Todo funcionário é proprietário. Oferecemos generosos pacotes de opções de ações porque construímos isso juntos.' },
        health: { title: 'Saúde Completa', description: 'Cobertura médica, dental e oftalmológica de primeiro nível para você e seus dependentes. Inclui apoio à saúde mental.' },
        learning: { title: 'Aprendizado Contínuo', description: 'Acesso a conferências, cursos e livros para apoiar seu crescimento profissional.' },
        retreats: { title: 'Retiros de Equipe', description: 'Duas vezes ao ano, levamos toda a equipe para um lugar incrível para conectar, planejar e celebrar.' },
        gear: { title: 'Equipamento de Última Geração', description: 'MacBook Pro, monitores 4K e tudo que você precisar para ser produtivo. Seu home office está coberto.' }
      },
      openings: {
        title: 'Vagas Abertas',
        description: 'Encontre seu próximo papel e ajude-nos a moldar a indústria.'
      },
      cta: {
        title: 'Não encontrou a vaga certa?',
        description: 'Estamos sempre procurando talentos. Envie seu currículo e entraremos em contato para futuras vagas.',
        primaryCta: 'Envie um E-mail',
        secondaryCta: 'Siga no LinkedIn'
      }
    },
    contactPage: {
      hero: {
        badge: 'Suporte Global 24/7',
        title: 'Entre em Contato',
        description: 'Estamos aqui para ajudá-lo a modernizar suas operações de locação. Entre em contato com nossa equipe global.'
      },
      form: {
        title: 'Envie uma mensagem',
        description: 'Preencha o formulário e responderemos em 24 horas.',
        fields: {
          name: 'Nome',
          email: 'E-mail',
          company: 'Empresa',
          phone: 'Telefone',
          inquiryType: 'Tipo de consulta',
          message: 'Mensagem',
          submit: 'Enviar mensagem',
          options: {
            general: 'Consulta geral',
            sales: 'Vendas e Demo',
            support: 'Suporte técnico',
            partnership: 'Parceria',
            careers: 'Vagas'
          }
        },
        success: {
          title: 'Mensagem Enviada!',
          description: 'Obrigado por entrar em contato. Nossa equipe responderá em breve.',
          sendAnother: 'Enviar outra mensagem'
        }
      },
      support: {
        title: 'Níveis de Suporte',
        description: 'Escolha o nível de suporte que se adapta às suas necessidades',
        basic: { title: 'Suporte Básico', description: 'Suporte por e-mail com tempo de resposta de 48 horas. Acesso à documentação e base de conhecimento.' },
        professional: { title: 'Suporte Profissional', description: 'E-mail e telefone prioritários com resposta em 24 horas. Gerente de conta dedicado.' },
        enterprise: { title: 'Suporte Empresarial', description: 'Suporte telefônico 24/7, gerente de sucesso dedicado, treinamento personalizado e garantias SLA.' }
      },
      offices: {
        title: 'Escritórios Globais',
        globalHq: 'Sede Global',
        europeanHub: 'Hub Europeu'
      }
    },
    footer: {
      summary: 'Controlease é o sistema operacional para portfólios multinacionais de locação de varejo.',
      rights: 'Todos os direitos reservados.',
    },
    legal: {
      lastUpdated: '\u00daltima atualiza\u00e7\u00e3o',
      date: '7 de maio de 2026',
      privacy: {
        title: 'Pol\u00edtica de Privacidade',
        sections: [
          { title: '1. Controlador de Dados', content: 'O controlador de dados \u00e9 CORBITAL TECH, S.L. (doravante, "Controlease"), com NIF B44995389 e sede em P\u00ba de la Castellana, 194, 28046 Madrid, Espanha.\n\nEmail de contato: support@controlease.net' },
          { title: '2. Finalidade do Tratamento', content: 'Os dados pessoais s\u00e3o tratados para as seguintes finalidades:', items: ['Gest\u00e3o de consultas e solicita\u00e7\u00f5es de contato', 'Presta\u00e7\u00e3o do servi\u00e7o SaaS Controlease', 'Gest\u00e3o administrativa e contratual', 'Suporte t\u00e9cnico e melhoria do servi\u00e7o'] },
          { title: '3. Base Legal', content: 'O tratamento baseia-se em:', items: ['Execu\u00e7\u00e3o de contrato', 'Interesse leg\u00edtimo (melhoria e suporte do servi\u00e7o)', 'Consentimento do usu\u00e1rio (quando aplic\u00e1vel)'] },
          { title: '4. Categorias de Dados', content: 'Processamos:', items: ['Dados de identifica\u00e7\u00e3o (nome, email, telefone)', 'Dados profissionais (empresa, cargo)', 'Dados inclu\u00eddos em contratos de loca\u00e7\u00e3o'], extra: 'N\u00e3o processamos categorias especiais de dados pessoais.' },
          { title: '5. Destinat\u00e1rios dos Dados', content: 'Utilizamos provedores terceiros como processadores de dados, incluindo:', items: ['Google', 'Stripe', 'HubSpot', 'GitHub'], extra: 'Tamb\u00e9m podemos usar ferramentas de intelig\u00eancia artificial como parte do servi\u00e7o.' },
          { title: '6. Transfer\u00eancias Internacionais', content: 'Alguns provedores podem envolver transfer\u00eancias internacionais de dados fora do Espa\u00e7o Econ\u00f4mico Europeu. Tais transfer\u00eancias s\u00e3o realizadas com garantias adequadas sob o RGPD.' },
          { title: '7. Reten\u00e7\u00e3o de Dados', content: 'Os dados s\u00e3o retidos:', items: ['Durante a rela\u00e7\u00e3o contratual', 'Conforme exigido por lei', 'At\u00e9 que a exclus\u00e3o seja solicitada (quando aplic\u00e1vel)'] },
          { title: '8. Direitos do Usu\u00e1rio', content: 'Os usu\u00e1rios podem exercer:', items: ['Acesso', 'Retifica\u00e7\u00e3o', 'Exclus\u00e3o', 'Restri\u00e7\u00e3o', 'Portabilidade', 'Oposi\u00e7\u00e3o'], extra: 'Solicita\u00e7\u00f5es podem ser enviadas para: privacy@controlease.com\n\nOs usu\u00e1rios tamb\u00e9m podem apresentar reclama\u00e7\u00e3o junto \u00e0 Ag\u00eancia Espanhola de Prote\u00e7\u00e3o de Dados.' },
          { title: '9. Seguran\u00e7a', content: 'Implementamos medidas t\u00e9cnicas e organizacionais adequadas, incluindo:', items: ['Controle de acesso', 'Criptografia', 'Backups', 'Registro de atividade'] },
          { title: '10. Altera\u00e7\u00f5es', content: 'Podemos atualizar esta pol\u00edtica para refletir mudan\u00e7as legais ou t\u00e9cnicas.' },
        ]
      },
      terms: {
        title: 'Termos de Servi\u00e7o',
        sections: [
          { title: '1. Descri\u00e7\u00e3o do Servi\u00e7o', content: 'Controlease \u00e9 uma solu\u00e7\u00e3o SaaS fornecida pela CORBITAL TECH, S.L. para gest\u00e3o de contratos de loca\u00e7\u00e3o e dados relacionados.' },
          { title: '2. Acesso e Uso', content: 'O Cliente concorda em:', items: ['Usar a plataforma em conformidade com as leis aplic\u00e1veis', 'N\u00e3o carregar dados il\u00edcitos ou n\u00e3o autorizados', 'Manter as credenciais de acesso confidenciais'] },
          { title: '3. Modelo de Assinatura', content: 'O servi\u00e7o \u00e9 fornecido em base de assinatura mensal ou anual, renov\u00e1vel automaticamente salvo cancelamento.' },
          { title: '4. Disponibilidade do Servi\u00e7o', content: 'Controlease far\u00e1 esfor\u00e7os razo\u00e1veis para garantir a disponibilidade do servi\u00e7o, mas n\u00e3o garante acesso ininterrupto.' },
          { title: '5. Propriedade Intelectual', content: 'Todos os direitos relacionados ao software permanecem com CORBITAL TECH, S.L.\n\nO Cliente recebe um direito limitado e n\u00e3o exclusivo de usar a plataforma.' },
          { title: '6. Processamento de Dados (DPA)', content: '6.1 Fun\u00e7\u00f5es\nO Cliente atua como Controlador de Dados e Controlease como Processador de Dados.\n\n6.2 Finalidade\nO processamento \u00e9 limitado \u00e0 presta\u00e7\u00e3o do servi\u00e7o SaaS.\n\n6.3 Tipos de Dados\nDados pessoais inclu\u00eddos em contratos de loca\u00e7\u00e3o.\n\n6.4 Acesso\nControlease pode acessar dados apenas para fins de suporte e manuten\u00e7\u00e3o.' },
          { title: '7. Subprocessadores', content: 'Controlease pode usar provedores terceiros, incluindo:', items: ['Google', 'Stripe', 'GitHub'], extra: 'O Cliente autoriza o uso destes subprocessadores.' },
          { title: '8. Seguran\u00e7a', content: 'Implementamos medidas de seguran\u00e7a adequadas incluindo:', items: ['Controle de acesso', 'Criptografia', 'Backups', 'Registro'] },
          { title: '9. Uso de Intelig\u00eancia Artificial', content: 'Controlease pode usar ferramentas de IA para melhorar e automatizar o servi\u00e7o.\n\nO Cliente reconhece e aceita isso como parte do servi\u00e7o.' },
          { title: '10. Direitos dos Titulares', content: 'Controlease auxiliar\u00e1 o Cliente no tratamento de solicita\u00e7\u00f5es de direitos dos titulares.' },
          { title: '11. Exclus\u00e3o e Portabilidade de Dados', content: 'Os clientes podem exportar ou solicitar a exclus\u00e3o de seus dados.\n\nAp\u00f3s a rescis\u00e3o, os dados ser\u00e3o exclu\u00eddos ou devolvidos.' },
          { title: '12. Responsabilidade', content: 'Controlease n\u00e3o \u00e9 respons\u00e1vel pelo uso indevido da plataforma pelo Cliente.' },
          { title: '13. Limita\u00e7\u00e3o de Responsabilidade', content: 'A responsabilidade total \u00e9 limitada ao valor pago pelo Cliente nos 12 meses anteriores.\n\nControlease n\u00e3o ser\u00e1 respons\u00e1vel por danos indiretos, perda de lucros ou danos reputacionais.' },
          { title: '14. Rescis\u00e3o', content: 'O Cliente pode cancelar conforme os termos da assinatura.' },
          { title: '15. Lei Aplic\u00e1vel', content: 'Este acordo \u00e9 regido pela lei espanhola.\n\nA jurisdi\u00e7\u00e3o corresponde aos tribunais do domic\u00edlio do Cliente.' },
        ]
      },
      cookies: {
        title: 'Pol\u00edtica de Cookies',
        sections: [
          { title: '1. O que s\u00e3o cookies?', content: 'Cookies s\u00e3o pequenos arquivos de texto armazenados no seu dispositivo quando voc\u00ea visita um site. Eles permitem que o site funcione corretamente, melhorem a experi\u00eancia do usu\u00e1rio e coletem informa\u00e7\u00f5es sobre o uso.' },
          { title: '2. Tipos de cookies usados', content: 'Controlease usa os seguintes tipos de cookies:', subsections: [
            { title: 'a) Cookies estritamente necess\u00e1rios', content: 'Estes cookies s\u00e3o essenciais para o funcionamento do site. Incluem:', items: ['Gest\u00e3o de sess\u00e3o', 'Seguran\u00e7a e autentica\u00e7\u00e3o', 'Funcionalidade b\u00e1sica do site'], extra: 'Estes cookies n\u00e3o requerem consentimento do usu\u00e1rio.' },
            { title: 'b) Cookies anal\u00edticos e de marketing', content: 'Atualmente, Controlease n\u00e3o usa cookies anal\u00edticos ou publicit\u00e1rios.\n\nNo entanto, no futuro, podemos implementar ferramentas como:', items: ['An\u00e1lise de tr\u00e1fego', 'Medi\u00e7\u00e3o de desempenho', 'Rastreamento de marketing'], extra: 'Nesses casos, ser\u00e1 solicitado o consentimento pr\u00e9vio do usu\u00e1rio.' },
          ]},
          { title: '3. Cookies de terceiros', content: 'Se ferramentas anal\u00edticas ou de marketing forem implementadas, provedores terceiros podem colocar cookies nos dispositivos dos usu\u00e1rios.\n\nEstes provedores podem incluir:', items: ['Google', 'LinkedIn'] },
          { title: '4. Como gerenciar cookies', content: 'Os usu\u00e1rios podem configurar seu navegador para:', items: ['Bloquear cookies', 'Excluir cookies', 'Receber alertas quando cookies s\u00e3o usados'], extra: 'Observe que desativar certos cookies pode afetar a funcionalidade do site.' },
          { title: '5. Atualiza\u00e7\u00f5es', content: 'Esta Pol\u00edtica de Cookies pode ser atualizada para refletir mudan\u00e7as nos requisitos legais ou no uso de cookies no site.' },
        ]
      },
      securityPage: {
        title: 'Segurança',
        sections: {
          commitment: {
            title: '1. Nosso Compromisso com a Segurança',
            content: 'Na Controlease, a segurança não é apenas um recurso — é a base da nossa plataforma. Entendemos que você confia em nós com os dados mais sensíveis do seu portfólio de locações, métricas financeiras e planos estratégicos. Empregamos medidas de segurança de nível empresarial para garantir que seus dados permaneçam confidenciais, protegidos em sua integridade e disponíveis quando você precisar.'
          },
          dataProtection: {
            title: '2. Proteção de Dados',
            encryption: { title: 'Criptografia', content: 'Todos os dados são criptografados em trânsito usando TLS 1.3 e em repouso usando criptografia AES-256. Utilizamos serviços de gerenciamento de chaves padrão da indústria para proteger as chaves de criptografia.' },
            isolation: { title: 'Isolamento de Dados', content: 'Os dados do cliente são separados logicamente em nossa arquitetura multi-inquilino. Controles de acesso rigorosos garantem que um inquilino não possa acessar os dados de outro inquilino.' }
          },
          infrastructure: {
            title: '3. Segurança de Infraestrutura',
            items: {
              cloud: { label: 'Segurança na Nuvem', content: 'Nossa infraestrutura é hospedada em provedores de nuvem de primeira linha (AWS/GCP/Azure) com certificações SOC 2 Tipo II.' },
              network: { label: 'Proteção de Rede', content: 'Empregamos Firewalls de Aplicações Web (WAF), proteção DDoS e isolamento de Nuvem Privada Virtual (VPC) para proteger nossos serviços.' },
              monitoring: { label: 'Monitoramento', content: 'Sistemas automatizados de monitoramento e alerta de segurança 24/7 para detectar e responder a atividades suspeitas imediatamente.' }
            }
          },
          compliance: {
            title: '4. Conformidade e Governança',
            content: 'Alinhamos nossas práticas de segurança com padrões internacionais incluindo SOC 2, ISO 27001 e GDPR. Testes de penetração regulares por terceiros e avaliações de vulnerabilidade são conduzidos para validar nossa postura de segurança.'
          },
          accessControl: {
            title: '5. Controle de Acesso',
            content: 'Controlease suporta Single Sign-On (SSO) via SAML 2.0 e OIDC, permitindo que você gerencie o acesso de usuários através do seu próprio provedor de identidade. Exigimos Autenticação Multi-Fator (MFA) para todo acesso administrativo.'
          },
          reporting: {
            title: '6. Reportar Problemas',
            content: 'Se você acredita ter encontrado uma vulnerabilidade de segurança na Controlease, por favor reporte imediatamente para security@controlease.com. Operamos um programa de divulgação responsável e trabalharemos com você para remediar o problema.'
          }
        }
      }
    },
    cookieBanner: {
      text: 'Utilizamos cookies essenciais para garantir o bom funcionamento do nosso site.',
      link: 'Para mais informa\u00e7\u00f5es, consulte nossa Pol\u00edtica de Cookies.',
      accept: 'Aceitar',
    },
    security: {
      hero: {
        badge: 'Seguran\u00e7a Empresarial',
        title: 'Seguran\u00e7a em que Voc\u00ea Pode Confiar',
        description: 'Os dados do seu portfólio de locações merecem o mais alto nível de proteção. Implementamos práticas de segurança líderes do setor para manter suas informações sensíveis seguras e em conformidade.',
      },
      trust: {
        items: ['Criptografia 256-bit', 'Certificado SOC 2', '99.9% Disponibilidade', 'Conforme GDPR', 'Monitoramento 24/7', 'Auditorias Regulares'],
      },
      featuresSection: {
        title: 'Construído para Segurança Empresarial',
        description: 'Cada camada da nossa plataforma é projetada com a segurança como princípio central, não como uma reflexão tardia.',
      },
      features: {
        encryption: {
          title: 'Criptografia de Ponta a Ponta',
          description: 'Todos os dados são criptografados em repouso e em trânsito usando criptografia padrão da indústria de 256 bits, garantindo que suas informações sensíveis permaneçam protegidas.',
        },
        mfa: {
          title: 'Autenticação Multifator',
          description: 'Adicione uma camada extra de segurança com suporte 2FA. Proteja sua conta contra acesso não autorizado com verificação por SMS, e-mail ou aplicativo autenticador.',
        },
        rbac: {
          title: 'Controle de Acesso Baseado em Funções',
          description: 'Permissões granulares permitem controlar exatamente quem pode visualizar, editar ou gerenciar dados específicos. Crie funções personalizadas adaptadas à sua organização.',
        },
        isolation: {
          title: 'Isolamento de Dados',
          description: 'O isolamento completo de inquilinos garante que seus dados sejam logicamente separados e nunca acessíveis por outros clientes ou partes não autorizadas.',
        },
        audit: {
          title: 'Trilhas de Auditoria Completas',
          description: 'Cada ação é registrada com marca de tempo. Rastreie quem acessou o quê, quando, e mantenha total responsabilidade em sua organização.',
        },
        monitoring: {
          title: 'Monitoramento de Ameaças 24/7',
          description: 'Monitoramento de segurança contínuo e detecção automatizada de ameaças protegem seus dados 24 horas por dia. Alertas em tempo real para atividades suspeitas.',
        },
      },
      complianceSection: {
        title: 'Conformidade e Certificações',
        description: 'Mantemos os mais altos padrões de conformidade de segurança para atender aos seus requisitos regulatórios.',
      },
      compliance: {
        soc2: 'Auditorias anuais de terceiros verificam que nossos controles de segurança atendem aos padrões mais rigorosos de proteção de dados e privacidade.',
        gdpr: 'Conformidade total com os regulamentos europeus de proteção de dados, incluindo portabilidade de dados, direito ao esquecimento e gestão de consentimento.',
        iso: 'Nosso sistema de gestão de segurança da informação segue as melhores práticas internacionais para proteger seus dados.',
      },
      enterprise: {
        title: 'Segurança Pronta para Empresas',
        description: 'Construído para organizações que exigem os mais altos padrões de segurança, confiabilidade e conformidade.',
        items: [
          'Integração Single Sign-On (SSO) com seu provedor de identidade',
          'Políticas de segurança personalizadas e gestão de sessões',
          'Gestão de conta dedicada e suporte prioritário',
          'Políticas personalizadas de retenção e backup de dados',
          'Questionário de segurança e documentação de conformidade',
          'Relatórios de testes de penetração disponíveis sob solicitação',
        ],
        card: {
          title: 'Controles de Segurança',
          subtitle: 'Proteção de nível empresarial',
          features: [
            'Lista branca de IP e restrições de acesso',
            'Tempo limite de sessão e controles de login',
            'Políticas de senha e requisitos de complexidade',
            'Limitação de taxa de API e prevenção de abuso',
            'Varredura automatizada de vulnerabilidades',
            'Procedimentos de resposta a incidentes',
          ],
        },
      },
      cta: {
        title: 'Pronto para proteger seu portfólio de locações?',
        primary: 'Iniciar Teste Grátis',
        secondary: 'Falar com Equipe de Segurança',
      },
    },
    dataOnboarding: {
      hero: {
        badge: 'Serviços Profissionais',
        title: 'Digitalizamos Seu Portfólio de Locações',
        description: 'Deixe nossa equipe fazer o trabalho pesado. Extraímos, validamos e estruturamos todos os seus dados de locação existentes para que você possa começar a usar o Controlease imediatamente.',
      },
      stats: [
        { value: '100+', label: 'Campos Extraídos' },
        { value: 'IA + Humano', label: 'Processo de Validação' },
      ],
      process: {
        title: 'Como Funciona',
        description: 'Nosso processo otimizado garante migração de dados precisa com mínimo esforço da sua parte.',
        steps: [
          {
            title: 'Coleta de Documentos',
            description: 'Compartilhe seus documentos de locação de forma segura. Aceitamos PDFs, digitalizações, imagens e até documentos físicos.',
          },
          {
            title: 'Extração com IA',
            description: 'Nossa IA extrai pontos de dados chave: aluguéis, datas, cláusulas, garantias e mais de 100 campos estruturados.',
          },
          {
            title: 'Validação Humana',
            description: 'Analistas especializados revisam e validam cada extração, garantindo precisão de nível de conformidade.',
          },
          {
            title: 'Pronto para Usar',
            description: 'Seu portfólio estruturado é carregado no Controlease, pronto para uso imediato.',
          },
        ],
      },
      pricing: {
        title: 'Preços Simples e Transparentes',
        description: 'Pague por documento com descontos por volume. Sem custos ocultos, sem surpresas.',
        tiers: [
          {
            name: 'Inicial',
            documents: 'Até 100 documentos',
            price: '$25',
            unit: 'por documento',
            features: ['Extração completa de dados', 'Validação humana', 'Suporte por e-mail'],
          },
          {
            name: 'Crescimento',
            documents: '101 - 500 documentos',
            price: '$18',
            unit: 'por documento',
            features: ['Tudo no Inicial', 'Processamento prioritário', 'Analista dedicado', 'Suporte telefônico'],
            popular: true,
          },
          {
            name: 'Empresarial',
            documents: '500+ documentos',
            price: 'Personalizado',
            unit: 'preço por volume',
            features: ['Tudo no Crescimento', 'Suporte presencial disponível', 'SLA personalizado', 'Gerente de conta'],
          },
        ],
      },
      benefits: {
        title: 'Por Que Escolher Nosso Serviço de Onboarding',
        items: [
          {
            title: 'Zero Esforço Interno',
            description: 'Sua equipe permanece focada no negócio principal enquanto cuidamos da migração de dados.',
          },
          {
            title: 'Dados Prontos para Conformidade',
            description: 'Dados estruturados prontos para auditorias, relatórios e conformidade regulatória desde o primeiro dia.',
          },
          {
            title: 'Tempo Rápido para Valor',
            description: 'Comece a usar o Controlease em dias, não meses. Sem projetos de implementação longos.',
          },
          {
            title: 'Validação Especializada',
            description: 'Cada extração é revisada por nossos analistas que entendem contratos de locação e garantem a qualidade dos dados.',
          },
        ],
      },
      cta: {
        title: 'Pronto para digitalizar seu portfólio?',
        primary: 'Obter Cotação',
        secondary: 'Agendar Ligação',
      },
    },
  },
} as const;

type Dictionary = (typeof translations)[Locale];

type I18nContextValue = {
  language: Locale;
  setLanguage: (locale: Locale) => void;
  t: (path: string) => string;
  dictionary: Dictionary;
  availableLocales: { code: Locale; label: string }[];
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const getNestedValue = (locale: Locale, path: string): string => {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, translations[locale]);

  if (typeof value === 'string') {
    return value;
  }
  return path;
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    return (localStorage.getItem('landing-lang') as Locale) || 'en';
  });

  const value = useMemo<I18nContextValue>(() => {
    const t = (path: string) => getNestedValue(language, path);
    const dictionary = translations[language];
    return {
      language,
      setLanguage: (locale: Locale) => {
        setLanguageState(locale);
        if (typeof window !== 'undefined') {
          localStorage.setItem('landing-lang', locale);
        }
      },
      t,
      dictionary,
      availableLocales: (Object.keys(translations) as Locale[]).map((code) => ({
        code,
        label: translations[code].localeLabel,
      })),
    };
  }, [language, setLanguageState]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export type { Locale, Dictionary };
