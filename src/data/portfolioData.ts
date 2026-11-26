export interface TimelineMilestone {
  id: string;
  index: string;
  title: string;
  reflection: string;
}

export interface ProjectArchitectureStep {
  layer: string;
  component: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Platform' | 'Brand & Studio' | 'Client & Demo';
  featured: boolean;
  image: string;
  imageAlt: string;
  summary: string;
  narrative: string;
  stack: string[];
  problem: string;
  idea: string;
  approach: string;
  challenges: string[];
  learned: string;
  outcome: string;
  architecture?: ProjectArchitectureStep[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface ToolGroup {
  label: string;
  items: { name: string; status: 'used' | 'learning'; note: string }[];
}

export const PROFILE = {
  name: 'Midusa',
  role: 'Junior Software Engineer & Computer Science Student',
  location: 'Kenya',
  email: 'midusab@gmail.com',
  github: 'https://github.com/midusab',
  linkedin: 'https://www.linkedin.com/in/midusab',
};

export const CHAPTERS = [
  { id: 'chapter-opening', index: '01', label: 'Home' },
  { id: 'chapter-beginning', index: '02', label: 'About' },
  { id: 'chapter-learning', index: '03', label: 'Journey' },
  { id: 'chapter-building', index: '04', label: 'Projects' },
  { id: 'chapter-mind', index: '05', label: 'Mindset' },
  { id: 'chapter-tools', index: '06', label: 'Skills' },
  { id: 'chapter-future', index: '07', label: 'Contact' },
];

export const EVOLUTION_STAGES: TimelineMilestone[] = [
  {
    id: 'fundamentals',
    index: '01',
    title: 'Learning the fundamentals.',
    reflection:
      'Understanding how instructions, logic, memory, and algorithms form the quiet backbone beneath every application.',
  },
  {
    id: 'interfaces',
    index: '02',
    title: 'Building interfaces.',
    reflection:
      'Turning static code into typography, spacing, and responsive screens that feel natural to a person holding a phone.',
  },
  {
    id: 'backend',
    index: '03',
    title: 'Understanding the backend.',
    reflection:
      'Stepping past the browser to handle routing, validation, authentication boundaries, and server-side reliability in Node.js and Express.',
  },
  {
    id: 'databases',
    index: '04',
    title: 'Working with databases.',
    reflection:
      'Modeling real relationships in PostgreSQL with Prisma so products remember users, catalogs, and verified orders accurately.',
  },
  {
    id: 'apis',
    index: '05',
    title: 'Connecting APIs.',
    reflection:
      'Designing predictable REST contracts and bridging client applications with external services across imperfect networks.',
  },
  {
    id: 'payments',
    index: '06',
    title: 'Integrating payments.',
    reflection:
      'Working with M-Pesa Daraja taught me that real transactions demand careful state machines, asynchronous webhooks, and zero guesswork.',
  },
  {
    id: 'deploying',
    index: '07',
    title: 'Deploying real applications.',
    reflection:
      'Shipping work out of local environments onto the live web—where environment variables, storage security, and real users put architecture to the test.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'midusa-elibrary',
    title: 'MidusaElibrary',
    subtitle: 'Digital Ebook Bookstore',
    category: 'Platform',
    featured: true,
    image: '/src/assets/images/midusa_elibrary_scene_1795718114217.jpg',
    imageAlt:
      'MidusaElibrary digital bookstore interface displayed on a laptop and e-reader tablet',
    summary:
      'A digital bookstore built to make ebooks accessible online through local mobile-money checkout and automated delivery.',
    narrative:
      'I built MidusaElibrary to solve a practical gap: readers wanted an effortless way to buy digital books online without international card barriers. Connecting a React storefront to a Node.js and Express backend, I modeled the catalog and orders in PostgreSQL with Prisma, integrated M-Pesa Daraja STK Push payments, and wired Supabase storage for protected digital delivery.',
    stack: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Supabase', 'M-Pesa Daraja'],
    problem:
      'Accessing and paying for digital books locally often breaks down at checkout. Readers frequently face international card requirements, manual file transfers, and fragmented storefronts that lack instant delivery.',
    idea:
      'Build a dedicated online digital ebook bookstore tailored for accessible local purchasing—where a reader can browse titles, pay directly with M-Pesa, and receive verified digital access immediately.',
    approach:
      'I separated a responsive React storefront from an Express REST API backed by PostgreSQL and Prisma. Supabase handled structured cloud storage and asset delivery, while M-Pesa Daraja powered STK Push checkout and asynchronous payment confirmation.',
    challenges: [
      'Reconciling asynchronous M-Pesa Daraja callbacks reliably so paid orders unlock digital downloads without race conditions or duplicate grants.',
      'Designing a clean PostgreSQL schema via Prisma to link users, catalog metadata, order intents, and payment transaction references.',
      'Securing digital book files so download links are authorized after verified payment rather than exposed as public URLs.',
      'Coordinating frontend build, backend environment variables, and database migrations cleanly during deployment.',
    ],
    learned:
      'Turning an idea into a real digital business requires far more than UI components. I learned how payment state machines work under network latency, why database constraints protect business logic, and how to debug across client, server, and third-party payment webhooks.',
    outcome:
      'Delivered a complete end-to-end digital commerce architecture capable of cataloging ebooks, initiating M-Pesa Daraja STK Push requests, recording verified transactions in PostgreSQL, and gating digital delivery.',
    architecture: [
      { layer: 'Storefront', component: 'React Client', role: 'Catalog browsing, cart state, checkout initiation, and download access' },
      { layer: 'API Layer', component: 'Node.js & Express', role: 'Order orchestration, Daraja token signing, and webhook verification' },
      { layer: 'Persistence', component: 'PostgreSQL & Prisma', role: 'Relational integrity across titles, orders, and M-Pesa receipts' },
      { layer: 'Storage & Auth', component: 'Supabase & Daraja', role: 'Protected ebook asset storage and real-time STK Push payments' },
    ],
    liveUrl: 'https://www.midusaelibary.co.ke',
    repoUrl: 'https://github.com/midusab',
  },
  {
    id: 'midusa-digital',
    title: 'Midusa Digital Solutions',
    subtitle: 'Web Development Practice',
    category: 'Brand & Studio',
    featured: true,
    image: '/src/assets/images/midusa_digital_scene_1795718114752.jpg',
    imageAlt:
      'Responsive business website displayed across a desktop monitor and mobile phone by Midusa Digital Solutions',
    summary:
      'Helping growing businesses replace generic online pages with fast, clear, mobile-first websites built around real customer journeys.',
    narrative:
      'Midusa Digital Solutions grew from seeing businesses rely on cluttered templates or fragmented social links that failed on mobile screens. Every build begins with clarity: structuring what the business offers, designing responsive Tailwind CSS interfaces, and shipping fast React web experiences.',
    stack: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
    problem:
      'Many growing businesses rely solely on scattered social media pages or outdated, slow websites that fail to communicate credibility, explain services clearly, or function properly on mobile phones.',
    idea:
      'Establish a focused web engineering brand centered on clarity, mobile usability, and business utility—treating every website as an operational tool rather than digital decoration.',
    approach:
      'I structure engagements around clear information hierarchy: understanding what a visitor needs within five seconds, designing mobile-first responsive layouts with Tailwind CSS, and keeping performance fast with lightweight frontend code.',
    challenges: [
      'Translating unstructured business descriptions into concise, trustworthy web copy and clear user journeys.',
      'Balancing visual distinction with fast page loads on mobile data connections.',
      'Building reusable section architectures that remain custom to each business rather than feeling templated.',
    ],
    learned:
      'Good frontend engineering is inseparable from communication. Understanding a business’s real friction points shapes layout, navigation, and call-to-action placement far better than decorative trends.',
    outcome:
      'Created a structured engineering workflow and design system approach for delivering responsive, business-oriented websites.',
    architecture: [
      { layer: 'Discovery', component: 'Information Architecture', role: 'Clarifying services, audience questions, and conversion paths' },
      { layer: 'Interface', component: 'React & Tailwind CSS', role: 'Component-driven responsive layouts across phone, tablet, and desktop' },
      { layer: 'Delivery', component: 'Git & Vercel', role: 'Version-controlled builds, previews, and fast edge deployment' },
    ],
    repoUrl: 'https://github.com/midusab',
  },
  {
    id: 'business-web-architecture',
    title: 'Service Web Prototype',
    subtitle: 'Client & Demo Architecture',
    category: 'Client & Demo',
    featured: false,
    image: '/src/assets/images/client_architecture_scene_1795718115376.jpg',
    imageAlt:
      'Clean editorial business web prototype displayed on a minimalist studio monitor',
    summary:
      'A modular web architecture prototype helping service-led businesses turn unclear inquiries into structured digital conversations.',
    narrative:
      'Designed as an adaptable blueprint for local service businesses moving from informal messages to structured web presence—prioritizing legible typography, accessible inquiry forms, and zero unnecessary weight.',
    stack: ['React', 'Tailwind CSS', 'JavaScript', 'REST APIs'],
    problem:
      'Service businesses often lose prospective customers when inquiry forms are clunky, mobile navigation collapses, or key service details are buried.',
    idea:
      'Prototype a clean, fast-loading web architecture with structured service breakdowns and low-friction inquiry workflows.',
    approach:
      'Built with semantic HTML landmarks, responsive grid patterns, and validated inquiry state management so visitors can inspect services and reach out cleanly from any viewport.',
    challenges: [
      'Keeping the layout disciplined and scannable without overwhelming first-time visitors.',
      'Ensuring form validation and feedback feel immediate and accessible without heavy libraries.',
    ],
    learned:
      'Simplicity is harder to engineer than complexity—every section that stays on the page must earn its place.',
    outcome:
      'Verified responsive prototype ready to adapt for real service-sector deployments without boilerplate overhead.',
    repoUrl: 'https://github.com/midusab',
  },
  {
    id: 'daraja-checkout-engine',
    title: 'M-Pesa Daraja Integration Pattern',
    subtitle: 'Backend Payment Architecture',
    category: 'Client & Demo',
    featured: false,
    image: '/src/assets/images/engineering_craft_scene_1795718115538.jpg',
    imageAlt: 'Optical glass prism refracting a beam of DodgerBlue light across dark stone',
    summary:
      'A focused Node.js, Express, and PostgreSQL integration pattern for handling OAuth tokens, STK Push initiation, and callback reconciliation.',
    narrative:
      'Built to isolate mobile-money complexity from frontend code. The pattern handles bearer token generation, timestamped password signing, and explicit pending-to-verified database transitions in Prisma.',
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'REST APIs'],
    problem:
      'Integrating mobile money APIs involves short-lived OAuth tokens, base64 password timestamping, and asynchronous webhook callbacks that require careful persistence.',
    idea:
      'Isolate the payment lifecycle into a clean backend service layer that separates payment initiation from callback verification and order fulfillment.',
    approach:
      'Implemented middleware for Daraja bearer tokens, structured database transaction logging via Prisma, and explicit pending/completed/failed status transitions.',
    challenges: [
      'Testing webhook payloads cleanly during local development before production deployment.',
      'Preventing inconsistent database state when users cancel or time out on the STK prompt.',
    ],
    learned:
      'Explicit state transitions and thorough server-side logging make payment debugging calm and deterministic.',
    outcome:
      'Forms the payment foundation behind MidusaElibrary and future Kenyan digital commerce builds.',
    repoUrl: 'https://github.com/midusab',
  },
];

export const TOOL_GROUPS: ToolGroup[] = [
  {
    label: 'Frontend',
    items: [
      {
        name: 'JavaScript',
        status: 'used',
        note: 'Core language driving client interactivity, asynchronous fetch flows, and Node.js services.',
      },
      {
        name: 'React',
        status: 'used',
        note: 'Component architecture powering MidusaElibrary, Midusa Digital Solutions, and interactive interfaces.',
      },
      {
        name: 'HTML',
        status: 'used',
        note: 'Semantic landmarks and accessible document structure across every project.',
      },
      {
        name: 'CSS',
        status: 'used',
        note: 'Responsive geometry, typographic rhythm, and fluid motion.',
      },
      {
        name: 'Tailwind CSS',
        status: 'used',
        note: 'Consistent spacing scales, dark/light editorial contrast, and rapid responsive layouts.',
      },
    ],
  },
  {
    label: 'Backend',
    items: [
      {
        name: 'Node.js',
        status: 'used',
        note: 'Server runtime handling order processing, authentication checks, and M-Pesa webhooks.',
      },
      {
        name: 'Express.js',
        status: 'used',
        note: 'Structured REST routing, middleware validation, and payment callback reconciliation.',
      },
      {
        name: 'REST APIs',
        status: 'used',
        note: 'Predictable client-server contracts and third-party M-Pesa Daraja integrations.',
      },
    ],
  },
  {
    label: 'Data and infrastructure',
    items: [
      {
        name: 'PostgreSQL',
        status: 'used',
        note: 'Relational storage safeguarding book catalogs, user orders, and verified receipts.',
      },
      {
        name: 'Prisma',
        status: 'used',
        note: 'Type-safe schema migrations and relational queries inside Express backends.',
      },
      {
        name: 'Supabase',
        status: 'used',
        note: 'Hosted PostgreSQL infrastructure and protected storage for digital book delivery.',
      },
      {
        name: 'Firebase',
        status: 'learning',
        note: 'Currently exploring real-time document sync, authentication flows, and serverless tooling.',
      },
      {
        name: 'Git',
        status: 'used',
        note: 'Daily branching, clean commit discipline, and iterative problem-solving.',
      },
      {
        name: 'GitHub',
        status: 'used',
        note: 'Version control, repository history, and collaborative project documentation.',
      },
      {
        name: 'Vercel',
        status: 'used',
        note: 'Production frontend deployments, preview builds, and environment configuration.',
      },
    ],
  },
];
