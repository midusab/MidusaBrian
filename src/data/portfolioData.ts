import {
  ArchitectureNode,
  ChapterLink,
  JournalEntry,
  PaymentFlowStep,
  Project,
  TimelineMilestone,
  ToolGroup,
} from '../types/portfolio';

export type {
  ArchitectureNode,
  ChapterLink,
  JournalEntry,
  PaymentFlowStep,
  Project,
  ProjectArchitectureStep,
  ProjectCategory,
  ThemeMode,
  TimelineMilestone,
  ToolGroup,
  ToolItem,
} from '../types/portfolio';

export const PROFILE = {
  name: 'Midusa',
  role: 'Junior software engineer & computer science student',
  location: 'Kenya',
  email: 'midusab@gmail.com',
  phone: '0112478220',
  whatsapp: 'https://wa.me/254112478220',
  github: 'https://github.com/midusab',
  linkedin: 'https://www.linkedin.com/in/midusab',
};

export const CHAPTERS: ChapterLink[] = [
  { id: 'chapter-opening', index: '01', label: 'Home' },
  { id: 'chapter-beginning', index: '02', label: 'About' },
  { id: 'chapter-learning', index: '03', label: 'Journey' },
  { id: 'chapter-building', index: '04', label: 'Projects' },
  { id: 'chapter-architecture', index: '05', label: 'Architecture' },
  { id: 'chapter-journal', index: '06', label: 'Journal' },
  { id: 'chapter-playground', index: '07', label: 'Playground' },
  { id: 'chapter-mind', index: '08', label: 'Mindset' },
  { id: 'chapter-tools', index: '09', label: 'Skills' },
  { id: 'chapter-career', index: '10', label: 'Opportunities' },
  { id: 'chapter-future', index: '11', label: 'Contact' },
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
      'Handling asynchronous mobile money callbacks from M-Pesa Daraja, verifying receipts, and turning transactions into instant digital delivery.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'midusa-elibrary',
    title: 'MidusaElibrary',
    subtitle: 'Digital Ebook Bookstore',
    category: 'Platform',
    featured: true,
    image: '/images/projects/elibrary-platform.jpg',
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
    designProcess:
      'I started with wireframes prioritizing readability and instant checkout friction reduction. Instead of multi-step carts that lose mobile users, I designed a single-touch checkout overlay: browse title, preview sample, enter M-Pesa number, and tap to pay.',
    frontendArchitecture:
      'Built with React and Tailwind CSS, leveraging lightweight client state for quick cart operations and responsive layout across phone, tablet, and desktop viewports. The UI reflects real-time payment states (initiated, waiting for PIN, confirmed, downloading) with optimistic updates and countdown feedback.',
    backendArchitecture:
      'Node.js and Express REST API structured in clean controller-service-repository patterns. Handles Daraja OAuth token caching with TTL buffer, input sanitization middleware, and cryptographic payload verification on incoming webhook routes.',
    databaseDesign:
      'PostgreSQL managed with Prisma ORM. Key relational models include User, Ebook (price, title, cover, private bucket path), Order (status: PENDING, PAID, FAILED, amount, checkoutRequestId), and PaymentTransaction (MpesaReceiptNumber, phone, transactionDate). Strict foreign-key constraints prevent duplicate download grants.',
    apiIntegration:
      'Built RESTful endpoints: /api/checkout/stk-push initiates payment, /api/checkout/callback receives Safaricom webhook events, /api/orders/:id/status polls order resolution, and /api/downloads/:token generates signed Supabase download streams.',
    paymentIntegration:
      'Integrated Safaricom Daraja STK Push (Lipa na M-Pesa Online). Implemented secure bearer token generation, timestamped password hashing with BusinessShortCode and PassKey, and asynchronous webhook reconciliation with idempotency protection against duplicate callback deliveries.',
    futureImprovements: [
      'Implement a background queue with BullMQ and Redis for high-concurrency webhook ingestion',
      'Add dynamic PDF buyer watermark stamping to discourage unauthorized file sharing',
      'Support reader book reviews and recommendation algorithms based on reading history',
      'Build an automated author payout portal with split-payment disbursement',
    ],
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
      { layer: 'Storefront', component: 'React client', role: 'Catalog browsing, cart state, checkout initiation, and download access' },
      { layer: 'API layer', component: 'Node.js & Express', role: 'Order orchestration, Daraja token signing, and webhook verification' },
      { layer: 'Persistence', component: 'PostgreSQL & Prisma', role: 'Relational integrity across titles, orders, and M-Pesa receipts' },
      { layer: 'Storage & auth', component: 'Supabase & Daraja', role: 'Protected ebook asset storage and real-time STK Push payments' },
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
    image: '/images/projects/digital-solutions.jpg',
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
    designProcess:
      'Conducted interviews with small business owners to identify high-dropoff points on their existing sites. Wireframed mobile-first viewports emphasizing 48px+ touch targets, instant service overviews, and direct one-tap WhatsApp contact buttons instead of lengthy contact forms.',
    frontendArchitecture:
      'Built with React and Tailwind CSS v4 design tokens. Optimized critical rendering path with zero layout-shift font loading, responsive WebP image delivery with blurred SVG placeholders, and strict component modularity across hero, service cards, proof points, and action triggers.',
    backendArchitecture:
      'Lightweight serverless inquiry API built with Node.js. Enforces rate-limiting to prevent spam, validates contact payloads with strict regex, and dispatches instant SMS and email notifications to the business owner.',
    databaseDesign:
      'PostgreSQL schema storing client inquiry logs (InquiryId, ClientName, Phone, ServiceRequested, CreatedAt, Status: NEW | CONTACTED | CONVERTED) enabling conversion analytics over time.',
    apiIntegration:
      'Deep integration with WhatsApp Click-to-Chat API pre-filling customized service inquiries, transactional email routing via Resend API, and lightweight privacy-respecting client analytics.',
    futureImprovements: [
      'Implement an automated quote generator allowing prospective clients to estimate web project costs in real time',
      'Add client portal dashboard for tracking website maintenance requests and hosting uptime',
      'Integrate multi-currency pricing toggles (KES / USD) for international clientele',
      'Automate WhatsApp notification webhooks for instant team lead dispatch',
    ],
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
      { layer: 'Discovery', component: 'Information architecture', role: 'Clarifying services, audience questions, and conversion paths' },
      { layer: 'Interface', component: 'React & Tailwind CSS', role: 'Component-driven responsive layouts across phone, tablet, and desktop' },
      { layer: 'Delivery', component: 'Git & Vercel', role: 'Version-controlled builds, previews, and fast edge deployment' },
    ],
    repoUrl: 'https://github.com/midusab',
  },
  {
    id: 'business-web-architecture',
    title: 'Service web prototype',
    subtitle: 'Client & demo architecture',
    category: 'Client & Demo',
    featured: false,
    image: '/images/projects/service-architecture.jpg',
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
    designProcess:
      'Analyzed customer friction points across consulting, contracting, and studio websites. Replaced bulky 10-field contact forms with a progressive three-step inquiry flow that lets visitors pick a service tier, choose a timeline, and input contact details in under 30 seconds.',
    frontendArchitecture:
      'Engineered with React 19, TypeScript, and Tailwind CSS. Implemented composable UI blocks (ServiceMatrix, PricingCalculator, InquiryModal) with accessible ARIA tabs, keyboard navigation support, and zero third-party UI library bloat.',
    backendArchitecture:
      'Express REST API routing inquiry submissions through Zod schema validation middleware. Enforces rate-limiting via IP hashing and dispatches structured JSON payloads to webhook endpoints.',
    databaseDesign:
      'PostgreSQL schema tracking service packages (PackageId, TierName, Deliverables, BasePriceKES) linked to customer inquiry submissions and project status tracking.',
    apiIntegration:
      'REST endpoints for retrieving live service availability (/api/services), calculating estimated delivery timelines (/api/estimates), and submitting verified inquiry intents.',
    futureImprovements: [
      'Add live interactive pricing calculator based on deliverable selections',
      'Integrate automated booking slots synced with Google Calendar and Cal.com API',
      'Support dynamic proposal generation exporting branded client PDF scopes of work',
    ],
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
    title: 'M-Pesa Daraja integration pattern',
    subtitle: 'Backend payment architecture',
    category: 'Client & Demo',
    featured: false,
    image: '/images/projects/daraja-integration.jpg',
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
    designProcess:
      'Mapped the complete Safaricom mobile-money payment state machine onto an asynchronous state transition diagram. Designed fallback flows for user PIN timeouts, cancelled prompts, and network drops before writing production code.',
    frontendArchitecture:
      'Lightweight React checkout client modal providing real-time visual feedback: animated phone illustration, active 60-second polling countdown, and instant resolution states (Check your phone, Enter PIN, Payment Verified).',
    backendArchitecture:
      'Modular Node.js and Express architecture with separate DarajaAuthService (handling OAuth consumer key/secret with caching buffer), StkService (building base64 password from ShortCode + PassKey + Timestamp), and CallbackService (webhook processing).',
    databaseDesign:
      'PostgreSQL relational schema managed with Prisma ORM: Transaction model with CheckoutRequestID (unique index), MerchantRequestID, ResultCode, ResultDesc, MpesaReceiptNumber, Amount, PhoneNumber, and status enum (PENDING, SUCCESS, FAILED, TIMEOUT).',
    apiIntegration:
      'Endpoints: POST /api/mpesa/stkpush (initiates SIM prompt), POST /api/mpesa/callback (handles Safaricom webhook confirmation), and GET /api/mpesa/query/:id (active status check for client recovery).',
    paymentIntegration:
      'Native Safaricom Daraja 2.0 API integration with cryptographically secure base64 password hashing, Bearer token auto-refresh with 300-second pre-expiry buffer, and idempotent callback handling to prevent duplicate fulfillment.',
    futureImprovements: [
      'Implement BullMQ Redis queue for high-volume webhook ingestion and retry resilience',
      'Add automated SMS receipt delivery via Africa’s Talking API',
      'Support C2B (Customer to Business) Paybill validation and confirmation URLs',
      'Implement automated B2C payout integration for merchant withdrawals',
    ],
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

export const SYSTEM_ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'frontend',
    name: 'React Storefront',
    category: 'Frontend',
    tech: 'React · Tailwind CSS · Vite',
    role: 'Client interface handling catalog browsing, search filtering, cart state management, and mobile-friendly payment initiation.',
    details: 'Implements optimistic UI updates, debounced catalog queries, responsive modal flows, and authenticated token persistence across sessions.',
    connections: ['backend', 'deployment-vercel'],
  },
  {
    id: 'backend',
    name: 'Node.js & Express API',
    category: 'Backend',
    tech: 'Node.js · Express.js · REST',
    role: 'Central coordination layer signing Daraja credentials, orchestrating order state machines, and processing asynchronous payment webhooks.',
    details: 'Houses Daraja OAuth token caching with TTL buffer, input sanitization middleware, and cryptographic payload verification on incoming webhook routes.',
    connections: ['database', 'storage', 'payments', 'deployment-backend'],
  },
  {
    id: 'database',
    name: 'PostgreSQL Relational Core',
    category: 'Database',
    tech: 'PostgreSQL · Prisma ORM',
    role: 'Source of truth preserving books, order transactions, users, and audit logs with ACID guarantees.',
    details: 'Schema enforces strict foreign-key integrity between Orders and PaymentTransactions to prevent double-crediting or duplicate download grants.',
    connections: ['backend'],
  },
  {
    id: 'storage',
    name: 'Supabase Cloud Storage',
    category: 'Storage',
    tech: 'Supabase Storage · S3 API',
    role: 'Encrypted object bucket hosting digital ebook files (.pdf, .epub) protected against unauthorized public access.',
    details: 'Files are kept private; when an order transitions to VERIFIED, the API requests a short-lived time-limited signed URL with download quotas.',
    connections: ['backend'],
  },
  {
    id: 'payments',
    name: 'M-Pesa Daraja STK Engine',
    category: 'Payments',
    tech: 'Safaricom Daraja API 2.0',
    role: 'Mobile-money payment gateway triggering SIM toolkit PIN prompts directly on the customer phone.',
    details: 'Uses timestamped base64 passwords, short-lived bearer tokens, and asynchronous HTTP POST callback confirmation with idempotency keys.',
    connections: ['backend'],
  },
  {
    id: 'deployment-vercel',
    name: 'Vercel Edge Platform',
    category: 'Deployment',
    tech: 'Vercel CDN · Edge Routing',
    role: 'Edge-cached global distribution of frontend assets with automated preview deployments and branch environments.',
    details: 'Delivers static sub-second assets via global CDN with automated HTTPS and cache invalidation on Git pushes.',
    connections: ['frontend'],
  },
  {
    id: 'deployment-backend',
    name: 'Cloud API Host',
    category: 'Deployment',
    tech: 'Node.js Runtime · HTTPS · SSL/TLS',
    role: 'Isolated cloud container running Express API instances with persistent environment secrets.',
    details: 'Configured with CORS origin restrictions, webhook IP filtering, automated health checks, and database connection pooling.',
    connections: ['backend'],
  },
];

export const PAYMENT_FLOW_STEPS: PaymentFlowStep[] = [
  {
    id: 'step-customer',
    step: '01',
    actor: 'Customer',
    title: 'Selects Ebook & Enters Phone',
    action: 'Chooses an ebook title from catalog, proceeds to checkout, and submits Safaricom mobile number (e.g., 07XX... or 01XX...).',
    technicalDetails: 'Client validates Kenyan phone regex /^(\\+254|0)(7|1)[0-9]{8}$/ and posts checkout intent payload to Express backend.',
    status: 'client',
  },
  {
    id: 'step-checkout',
    step: '02',
    actor: 'Express API',
    title: 'Generates Daraja Token & Signs Request',
    action: 'Backend retrieves cached OAuth 2.0 bearer token, encodes timestamped PassKey, and creates a pending Order record in PostgreSQL via Prisma.',
    technicalDetails: 'PassKey = base64(BusinessShortCode + PassKey + Timestamp); creates order record with status PENDING_PAYMENT.',
    status: 'network',
  },
  {
    id: 'step-stk',
    step: '03',
    actor: 'M-Pesa Daraja',
    title: 'Triggers STK Push on User Handset',
    action: 'Safaricom network pushes SIM Toolkit prompt directly onto customer phone requesting M-Pesa PIN for the exact order amount.',
    technicalDetails: 'Daraja returns CheckoutRequestID immediately; client transitions into polling/listening state with countdown timer.',
    status: 'network',
  },
  {
    id: 'step-callback',
    step: '04',
    actor: 'M-Pesa Webhook',
    title: 'Asynchronous Webhook Callback',
    action: 'Upon customer entering PIN, Daraja dispatches secure JSON callback POST to Express webhook endpoint with receipt metadata.',
    technicalDetails: 'Extracts ResultCode (0 = Success), MpesaReceiptNumber, TransactionDate, and matches CheckoutRequestID in PostgreSQL.',
    status: 'webhook',
  },
  {
    id: 'step-order-confirm',
    step: '05',
    actor: 'Prisma & PostgreSQL',
    title: 'Reconciles State & Confirms Order',
    action: 'Atomically updates Order status from PENDING_PAYMENT to PAID, records receipt number, and logs payment transaction audit trail.',
    technicalDetails: 'Prisma transaction ensures callback idempotency: repeated webhook retries cannot unlock multiple orders or duplicate receipt entries.',
    status: 'db',
  },
  {
    id: 'step-delivery',
    step: '06',
    actor: 'Supabase Storage',
    title: 'Generates Authorized Download Access',
    action: 'Backend requests time-limited signed URL from Supabase private storage and emails download credentials directly to the customer.',
    technicalDetails: 'Signed URL expires in 60 minutes with download quota header, protecting digital author rights while delivering instant access.',
    status: 'cloud',
  },
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'reconciling-webhooks',
    date: 'February 2026',
    title: 'Reconciling Asynchronous Payment Webhooks Under Network Latency',
    tag: 'Payments & Concurrency',
    problem:
      'In mobile money systems like M-Pesa Daraja, payment confirmation is asynchronous. The customer enters their PIN on their phone, but cell tower delays or network drops mean callbacks can arrive seconds or minutes after the client session disconnects—or even fire duplicate retries.',
    discovery:
      'Relying on the frontend client to confirm payment is a massive vulnerability. The server must be the single source of truth, and the callback endpoint must be completely idempotent.',
    solution:
      'I designed an explicit state machine inside Prisma: orders initiate as PENDING_PAYMENT with unique CheckoutRequestIDs. When the Safaricom webhook posts ResultCode 0, a Prisma $transaction checks if the transaction was already processed. If verified, it atomically updates order status to PAID and attaches the MpesaReceiptNumber.',
    improvement:
      'Next time, I will introduce a Redis queue (BullMQ) to decouple webhook ingestion from database writes, ensuring zero callback drops even during high-concurrency traffic spikes.',
  },
  {
    id: 'securing-digital-assets',
    date: 'January 2026',
    title: 'Securing Digital Ebook Delivery with Time-Limited Signed URLs',
    tag: 'Cloud Storage & Security',
    problem:
      'Digital book files (.pdf and .epub) stored in public cloud buckets can easily have their static URLs copied and shared across the internet without payment, destroying digital commerce viability.',
    discovery:
      'Storage files should never have public read permissions. Instead, the backend must verify database ownership before issuing cryptographically signed, short-lived access tokens.',
    solution:
      'I placed all ebook assets into a private Supabase Storage bucket. When a verified user requests their purchased title, an Express endpoint verifies their session and receipt in PostgreSQL, calls Supabase storage.from().createSignedUrl(path, 3600), and returns an expiring 60-minute download link.',
    improvement:
      'In a future release, I plan to stamp the buyer’s email dynamically onto the PDF margins at generation time to further discourage unauthorized redistribution.',
  },
  {
    id: 'prisma-relational-design',
    date: 'December 2025',
    title: 'Structuring Relational Schemas and Foreign Keys with Prisma',
    tag: 'Database Architecture',
    problem:
      'Early in development, loosely coupled document records caused orphan records: orders existed without catalog references, and payment intents could not be reliably traced back to specific customer sessions.',
    discovery:
      'E-commerce requires strict relational integrity. Foreign key constraints at the database engine level protect business invariants far better than ad-hoc application code checks.',
    solution:
      'I remodeled the PostgreSQL schema with Prisma: explicit 1-to-many relationships between User and Order, 1-to-1 between Order and PaymentTransaction, and many-to-many through OrderItem to Ebook. Cascade rules and indexation on frequently queried fields (e.g. checkoutRequestId, email) eliminated data corruption.',
    improvement:
      'I would introduce database-level soft deletes (deletedAt timestamp) on catalog items so historical orders remain valid even if an author withdraws a published book title.',
  },
  {
    id: 'edge-cors-boundaries',
    date: 'November 2025',
    title: 'Bridging Frontend State with Deployed Edge APIs and CORS Boundaries',
    tag: 'DevOps & Networking',
    problem:
      'Deploying a React single-page application on Vercel while running an Express backend on a separate cloud provider led to frustrating CORS errors, preflight OPTIONS failures, and cookie loss across cross-origin requests.',
    discovery:
      'CORS is not an error—it is a browser security policy. Hardcoding localhost origins in server headers inevitably breaks production environments unless origins are dynamic and environment-driven.',
    solution:
      'I configured Express CORS middleware with an allowed-origin whitelist pulled strictly from environment variables (process.env.CLIENT_URL). I added explicit handling for preflight requests and standardized response headers across all JSON responses.',
    improvement:
      'For future builds, I would establish a reverse proxy on a shared apex domain (/api rewrites in vercel.json) to eliminate cross-origin complexity entirely.',
  },
  {
    id: 'vite-bundle-optimization',
    date: 'October 2025',
    title: 'Vite Production Bundling & Code-Splitting Heavy Modals',
    tag: 'Frontend Performance',
    problem:
      'As interactive features and modals expanded, the initial JavaScript bundle grew, risking slow First Contentful Paint times on mobile data connections.',
    discovery:
      'Components that are hidden on initial load (like full-screen case studies, booking modals, and code visualizers) do not belong in the critical entry bundle.',
    solution:
      'I split all heavy secondary components using React.lazy() and dynamic imports with Suspense boundaries. I also tuned Vite chunking in vite.config.ts to isolate third-party libraries into dedicated vendor chunks.',
    improvement:
      'I will implement IntersectionObserver prefetching on hover over project cards so lazy chunks load opportunistically milliseconds before the user clicks.',
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
        note: 'Clean endpoints coordinating client state with database models and third-party integrations.',
      },
      {
        name: 'M-Pesa Daraja',
        status: 'used',
        note: 'Mobile-money STK Push integration connecting local payment flows directly to product delivery.',
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
