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
      contact: 'Contact',
    },
    home: {
      hero: {
        badge: 'Retail Lease Operating System',
        title: 'The central nervous system for your lease portfolio.',
        description:
          'Unify capture, approvals, operations, renewals, compliance, and analytics into one modern workspace. Optimized for multi-country portfolios and strict governance.',
        primaryCta: 'Request Demo',
        secondaryCta: 'Read Documentation',
        metrics: [
          { label: 'Lease Lifecycle', value: 'End-to-End' },
          { label: 'Data Source', value: 'Single Truth' },
          { label: 'Deployment', value: 'Cloud-Native' },
        ],
      },
      pointers: {
        title: 'Core Value Pillars',
        subtitle: 'Built to solve the fragmentation of retail lease management.',
        items: [
          {
            title: 'Lifecycle Coverage',
            description: 'From draft to termination, manage every stage of your lease contracts in one place.',
            stat: '100% Lifecycle',
          },
          {
            title: 'Operational Governance',
            description: 'Role-based access, audit timelines, and strict permission controls ensure compliance.',
            stat: 'Audit Ready',
          },
          {
            title: 'Data Intelligence',
            description: 'Real-time forecasting, AI analysis, and dashboard KPIs drive better decisions.',
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
            description: 'Chat with your portfolio using natural language and document analysis.',
            tag: 'New',
          },
        ],
      },
      partnersPreview: {
        title: 'Trusted by leading retail portfolios',
        logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp'],
      },
    },
    landing: {
      commandBar: {
        brand: 'Controlease',
        tagline: 'Enterprise Lease OS',
        signIn: 'Sign In',
        requestDemo: 'Request Demo',
        nav: [
          {
            label: 'Platform',
            path: '/platform',
            children: [
              { title: 'Dashboard', desc: 'Executive portfolio visibility', path: '/platform/dashboard' },
              { title: 'Lease Intelligence', desc: 'Full lifecycle management', path: '/platform/lease-intelligence' },
              { title: 'Portfolio Analytics', desc: 'MGR evolution & forecasting', path: '/platform/portfolio-analytics' },
              { title: 'AI Assistant', desc: 'Natural language analysis', path: '/platform/ai-assistant' },
              { title: 'Directory', desc: 'Unified stakeholder database', path: '/platform/directory' },
            ],
          },
          {
            label: 'Solutions',
            path: '/solutions',
            children: [
              { title: 'Retail', desc: 'Multi-location scalability', path: '/solutions/retail' },
              { title: 'Compliance', desc: 'IFRS 16 & regulatory', path: '/solutions/compliance' },
            ],
          },
          {
            label: 'Resources',
            path: '/resources',
            children: [
              { title: 'Documentation', desc: 'Complete platform guides', path: '/resources/documentation' },
              { title: 'API Reference', desc: 'Developer documentation', path: '/resources/api' },
              { title: 'Case Studies', desc: 'Success stories & metrics', path: '/resources/case-studies' },
              { title: 'System Status', desc: 'Platform availability', path: '/resources/status' },
            ],
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
              { label: 'Lease Management', href: '#' },
              { label: 'Financial Engine', href: '#' },
              { label: 'Compliance', href: '#' },
              { label: 'AI Assistant', href: '#' },
            ],
          },
          {
            title: 'Resources',
            links: [
              { label: 'Documentation', href: '#' },
              { label: 'API Reference', href: '#' },
              { label: 'Case Studies', href: '#' },
              { label: 'Status', href: '#' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'Contact Sales', to: '/contact' },
              { label: 'About Us', href: '#' },
              { label: 'Careers', href: '#' },
              { label: 'Legal', href: '#' },
            ],
          },
        ],
        legal: [
          { label: 'Privacy Policy', to: '/privacy' },
          { label: 'Terms of Service', to: '/terms' },
          { label: 'Security', to: '/security' },
        ],
        rights: '© 2025 Controlease Inc. All rights reserved.',
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
    footer: {
      summary: 'Controlease is the operating system for multi-country retail lease portfolios.',
      rights: 'All rights reserved.',
    },
  },
  es: {
    localeLabel: 'Español',
    nav: {
      home: 'Inicio',
      partners: 'Plataforma',
      programs: 'Módulos',
      impact: 'Valor',
      contact: 'Contacto',
    },
    home: {
      hero: {
        badge: 'Sistema Operativo de Arrendamientos',
        title: 'El sistema nervioso central para su cartera de arrendamientos.',
        description:
          'Unifique captura, aprobaciones, operaciones, renovaciones, cumplimiento y análisis en un espacio de trabajo moderno. Optimizado para carteras multinacionales.',
        primaryCta: 'Solicitar Demo',
        secondaryCta: 'Leer Documentación',
        metrics: [
          { label: 'Ciclo de Vida', value: 'De Punta a Punta' },
          { label: 'Fuente de Datos', value: 'Única Verdad' },
          { label: 'Despliegue', value: 'Nativo en Nube' },
        ],
      },
      pointers: {
        title: 'Pilares de Valor',
        subtitle: 'Construido para resolver la fragmentación en la gestión de arrendamientos.',
        items: [
          {
            title: 'Cobertura del Ciclo',
            description: 'Desde el borrador hasta la terminación, gestione cada etapa en un solo lugar.',
            stat: '100% Ciclo',
          },
          {
            title: 'Gobernanza Operativa',
            description: 'Acceso basado en roles, líneas de tiempo de auditoría y controles estrictos.',
            stat: 'Auditable',
          },
          {
            title: 'Inteligencia de Datos',
            description: 'Pronósticos en tiempo real, análisis por IA y KPIs en tableros.',
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
            description: 'Chat con su cartera usando lenguaje natural y análisis de documentos.',
            tag: 'Nuevo',
          },
        ],
      },
      partnersPreview: {
        title: 'Con la confianza de líderes en retail',
        logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp'],
      },
    },
    landing: {
      commandBar: {
        brand: 'Controlease',
        tagline: 'Sistema Operativo Empresarial',
        signIn: 'Iniciar sesión',
        requestDemo: 'Solicitar demo',
        nav: [
          {
            label: 'Plataforma',
            path: '/platform',
            children: [
              { title: 'Tablero', desc: 'Visibilidad ejecutiva del portafolio', path: '/platform/dashboard' },
              { title: 'Inteligencia de Contratos', desc: 'Gestión completa del ciclo de vida', path: '/platform/lease-intelligence' },
              { title: 'Analítica de Portafolio', desc: 'Evolución MGR y pronósticos', path: '/platform/portfolio-analytics' },
              { title: 'Asistente IA', desc: 'Análisis en lenguaje natural', path: '/platform/ai-assistant' },
              { title: 'Directorio', desc: 'Base unificada de actores', path: '/platform/directory' },
            ],
          },
          {
            label: 'Soluciones',
            path: '/solutions',
            children: [
              { title: 'Retail', desc: 'Escalabilidad multi-ubicación', path: '/solutions/retail' },
              { title: 'Cumplimiento', desc: 'IFRS 16 y regulatorio', path: '/solutions/compliance' },
            ],
          },
          {
            label: 'Recursos',
            path: '/resources',
            children: [
              { title: 'Documentación', desc: 'Guías completas de la plataforma', path: '/resources/documentation' },
              { title: 'Referencia API', desc: 'Documentación para desarrolladores', path: '/resources/api' },
              { title: 'Casos de Estudio', desc: 'Historias de éxito y métricas', path: '/resources/case-studies' },
              { title: 'Estado del Sistema', desc: 'Disponibilidad de la plataforma', path: '/resources/status' },
            ],
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
              { label: 'Gestión de contratos', href: '#' },
              { label: 'Motor financiero', href: '#' },
              { label: 'Cumplimiento', href: '#' },
              { label: 'Asistente IA', href: '#' },
            ],
          },
          {
            title: 'Recursos',
            links: [
              { label: 'Documentación', href: '#' },
              { label: 'Referencia API', href: '#' },
              { label: 'Casos de estudio', href: '#' },
              { label: 'Estado', href: '#' },
            ],
          },
          {
            title: 'Compañía',
            links: [
              { label: 'Contactar ventas', to: '/contact' },
              { label: 'Sobre nosotros', href: '#' },
              { label: 'Carreras', href: '#' },
              { label: 'Legal', href: '#' },
            ],
          },
        ],
        legal: [
          { label: 'Privacidad', to: '/privacy' },
          { label: 'Términos de servicio', to: '/terms' },
          { label: 'Seguridad', to: '/security' },
        ],
        rights: '© 2025 Controlease Inc. Todos los derechos reservados.',
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
    footer: {
      summary: 'Controlease es el sistema operativo para carteras de arrendamiento minorista multinacionales.',
      rights: 'Todos los derechos reservados.',
    },
  },
  pt: {
    localeLabel: 'Português',
    nav: {
      home: 'Início',
      partners: 'Plataforma',
      programs: 'Módulos',
      impact: 'Valor',
      contact: 'Contato',
    },
    home: {
      hero: {
        badge: 'Sistema Operacional de Locação',
        title: 'O sistema nervoso central para seu portfólio de locações.',
        description:
          'Unifique captura, aprovações, operações, renovações, compliance e análises em um workspace moderno. Otimizado para portfólios multinacionais.',
        primaryCta: 'Solicitar Demo',
        secondaryCta: 'Ler Documentação',
        metrics: [
          { label: 'Ciclo de Vida', value: 'Ponta a Ponta' },
          { label: 'Fonte de Dados', value: 'Verdade Única' },
          { label: 'Implantação', value: 'Nativo na Nuvem' },
        ],
      },
      pointers: {
        title: 'Pilares de Valor',
        subtitle: 'Construído para resolver a fragmentação na gestão de locações.',
        items: [
          {
            title: 'Cobertura do Ciclo',
            description: 'Do rascunho à rescisão, gerencie cada etapa em um só lugar.',
            stat: '100% Ciclo',
          },
          {
            title: 'Governança Operacional',
            description: 'Acesso baseado em papéis, linha do tempo de auditoria e controles rígidos.',
            stat: 'Auditável',
          },
          {
            title: 'Inteligência de Dados',
            description: 'Previsões em tempo real, análise por IA e KPIs em dashboards.',
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
            description: 'Converse com seu portfólio usando linguagem natural e análise de documentos.',
            tag: 'Novo',
          },
        ],
      },
      partnersPreview: {
        title: 'Confiado por líderes de varejo',
        logos: ['Global Retail', 'Urban Spaces', 'Metro Properties', 'Prime Locations', 'Retail Corp'],
      },
    },
    landing: {
      commandBar: {
        brand: 'Controlease',
        tagline: 'Sistema Operacional Empresarial',
        signIn: 'Entrar',
        requestDemo: 'Solicitar demo',
        nav: [
          {
            label: 'Plataforma',
            path: '/platform',
            children: [
              { title: 'Dashboard', desc: 'Visibilidade executiva do portfólio', path: '/platform/dashboard' },
              { title: 'Inteligência de Contratos', desc: 'Gestão completa do ciclo de vida', path: '/platform/lease-intelligence' },
              { title: 'Analítica de Portfólio', desc: 'Evolução MGR e previsões', path: '/platform/portfolio-analytics' },
              { title: 'Assistente IA', desc: 'Análise em linguagem natural', path: '/platform/ai-assistant' },
              { title: 'Diretório', desc: 'Base unificada de stakeholders', path: '/platform/directory' },
            ],
          },
          {
            label: 'Soluções',
            path: '/solutions',
            children: [
              { title: 'Varejo', desc: 'Escalabilidade multi-localização', path: '/solutions/retail' },
              { title: 'Conformidade', desc: 'IFRS 16 e regulatório', path: '/solutions/compliance' },
            ],
          },
          {
            label: 'Recursos',
            path: '/resources',
            children: [
              { title: 'Documentação', desc: 'Guias completos da plataforma', path: '/resources/documentation' },
              { title: 'Referência API', desc: 'Documentação para desenvolvedores', path: '/resources/api' },
              { title: 'Estudos de Caso', desc: 'Histórias de sucesso e métricas', path: '/resources/case-studies' },
              { title: 'Status do Sistema', desc: 'Disponibilidade da plataforma', path: '/resources/status' },
            ],
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
              { label: 'Gestão de contratos', href: '#' },
              { label: 'Motor financeiro', href: '#' },
              { label: 'Compliance', href: '#' },
              { label: 'Assistente IA', href: '#' },
            ],
          },
          {
            title: 'Recursos',
            links: [
              { label: 'Documentação', href: '#' },
              { label: 'Referência API', href: '#' },
              { label: 'Estudos de caso', href: '#' },
              { label: 'Status', href: '#' },
            ],
          },
          {
            title: 'Empresa',
            links: [
              { label: 'Falar com vendas', to: '/contact' },
              { label: 'Sobre nós', href: '#' },
              { label: 'Carreiras', href: '#' },
              { label: 'Jurídico', href: '#' },
            ],
          },
        ],
        legal: [
          { label: 'Privacidade', to: '/privacy' },
          { label: 'Termos de serviço', to: '/terms' },
          { label: 'Segurança', to: '/security' },
        ],
        rights: '© 2025 Controlease Inc. Todos os direitos reservados.',
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
    footer: {
      summary: 'Controlease é o sistema operacional para portfólios multinacionais de locação de varejo.',
      rights: 'Todos os direitos reservados.',
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
