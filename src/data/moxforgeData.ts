export type PageId =
  | 'home'
  | 'about'
  | 'projects'
  | 'ventures'
  | 'collaborators'
  | 'team'
  | 'innovation'
  | 'community'
  | 'careers'
  | 'contact';

export interface PageMeta {
  id: PageId;
  index: string;
  label: string;
  shortLabel: string;
  summary: string;
}

export const MOXFORGE_PAGES: PageMeta[] = [
  {
    id: 'home',
    index: '01',
    label: 'Home',
    shortLabel: 'Home',
    summary: 'Company introduction and vision',
  },
  {
    id: 'about',
    index: '02',
    label: 'About Us',
    shortLabel: 'About Us',
    summary: 'MOXFORGE story, mission and vision',
  },
  {
    id: 'projects',
    index: '03',
    label: 'Our Projects',
    shortLabel: 'Projects',
    summary: 'All products, AI projects and innovations',
  },
  {
    id: 'ventures',
    index: '04',
    label: 'Our Ventures',
    shortLabel: 'Ventures',
    summary: 'Moxforge Labs and Moxforge Community',
  },
  {
    id: 'team',
    index: '05',
    label: 'Our Team',
    shortLabel: 'Team',
    summary: 'Founder, leadership and team members',
  },
  {
    id: 'innovation',
    index: '06',
    label: 'Innovation',
    shortLabel: 'Innovation',
    summary: 'Research, technology and new initiatives',
  },
  {
    id: 'community',
    index: '07',
    label: 'Community',
    shortLabel: 'Community',
    summary: 'Chapters, events and student participation',
  },
  {
    id: 'careers',
    index: '08',
    label: 'Careers',
    shortLabel: 'Careers',
    summary: 'Internships, volunteering and opportunities',
  },
  {
    id: 'contact',
    index: '09',
    label: 'Contact',
    shortLabel: 'Contact',
    summary: 'Business enquiries and partnerships',
  },
];

export type ProjectCategory =
  | 'All'
  | 'AI Product'
  | 'AI Project'
  | 'Distributed Storage'
  | 'Software Platform';

export interface MoxforgeProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  stage: 'Production' | 'Public Beta' | 'Open Release' | 'Lab Preview';
  releaseYear: string;
  logoUrl: string;
  actionLabel: string;
  summary: string;
  impactMetric: string;
  architectureOverview: string;
  techStack: string[];
  leadDivision: 'Moxforge Labs' | 'Moxforge Community';
  repoOrDocUrl: string;
}

export const MOXFORGE_PROJECTS: MoxforgeProject[] = [
  {
    id: 'mox-learnito-ai',
    title: 'Learnito AI',
    category: 'AI Product',
    stage: 'Production',
    releaseYear: '2026',
    logoUrl: '/assets/learnito-ai-logo.png',
    actionLabel: 'Explore Learnito AI ↗',
    summary:
      'Learnito AI turns source material into study notes and practice questions. It brings Generative AI into a familiar learning workflow, helping students organize information and revisit important ideas. Explore the application to see how AI can support study and revision.',
    impactMetric:
      'Generates structured study guides, key summaries, highlighted concepts, and practice quizzes with offline PWA access and a 25-minute focus companion',
    architectureOverview:
      'Progressive Web App (PWA) study engine combining Generative AI document synthesis, automated quiz generation, offline note library persistence, and an integrated Pomodoro focus timer.',
    techStack: [
      'Generative AI',
      'LLMs',
      'RAG',
      'Progressive Web App (PWA)',
      'Offline Storage',
    ],
    leadDivision: 'Moxforge Labs',
    repoOrDocUrl: 'https://learnitoai.vercel.app/',
  },
  {
    id: 'mox-pylume',
    title: 'Pylume',
    category: 'AI Project',
    stage: 'Open Release',
    releaseYear: '2026',
    logoUrl: '/assets/pylume-logo.png',
    actionLabel: 'Explore Pylume ↗',
    summary:
      'Pylume is an AI project focused on explaining Python code clearly. It connects programming and accessible learning—helping learners understand code, ask better questions, and build confidence as they explore Python.',
    impactMetric:
      'Covers core Python foundations (values, variables, strings, lists, conditions, loops, functions, and data structures) paired with an interactive AI Code Explainer',
    architectureOverview:
      'Interactive Python learning platform grounded in the official Python tutorial, featuring structured curriculum modules and a real-time LLM-powered Code Explainer that breaks down syntax, control flow, and logic step by step.',
    techStack: [
      'Python',
      'Large Language Models',
      'Prompt Engineering',
      'Code Analysis',
      'Interactive Web UI',
    ],
    leadDivision: 'Moxforge Community',
    repoOrDocUrl: 'https://pylume.vercel.app/',
  },
  {
    id: 'mox-storvex',
    title: 'Storvex',
    category: 'Distributed Storage',
    stage: 'Production',
    releaseYear: '2026',
    logoUrl: '/assets/storvex-logo.png',
    actionLabel: 'Explore Storvex ↗',
    summary:
      'Storvex is a distributed object storage platform built around independent storage nodes. It explores quorum replication, integrity verification, automatic repair, and rebalancing, with 10+4 erasure coding—bringing together reliable infrastructure and resilient data storage.',
    impactMetric:
      '15 independent storage nodes across 3 logical placement zones and 5 metadata voters · 3× hot replication (2/2 quorum) · 10+4 erasure coding (~1.4× cold storage overhead)',
    architectureOverview:
      'Multi-zone distributed object storage engine supporting hot and cold storage classes, 2/2 read-write quorum consensus, 10+4 Reed-Solomon erasure coding, live node health telemetry, automated integrity scans, and zero-downtime artifact repair.',
    techStack: [
      'Distributed Systems',
      '10+4 Erasure Coding',
      'Quorum Replication',
      'Object Storage',
      'Cluster Telemetry',
    ],
    leadDivision: 'Moxforge Labs',
    repoOrDocUrl: 'https://storvex-storage.vercel.app/',
  },
  {
    id: 'mox-learnitosphere',
    title: 'Learnito Sphere',
    category: 'Software Platform',
    stage: 'Production',
    releaseYear: '2026',
    logoUrl: '/assets/learnitosphere-icon.png',
    actionLabel: 'Explore Learnito Sphere ↗',
    summary:
      'Learnito Sphere is a unified school management system that brings classes, attendance, marks, fees, notices, assignments, and school records together into one secure, role-based application for school teams and students.',
    impactMetric:
      'Role-based workspaces for school teams and students · Unified management of classes, attendance, marks, fees, notices, and assignments · Web PWA and desktop AppImage support',
    architectureOverview:
      'Multi-tenant school management SaaS and desktop-installable application featuring school workspace discovery, secure Login ID authentication, and isolated role-based dashboards for administrators, educators, and students.',
    techStack: [
      'School Management SaaS',
      'Role-Based Access Control',
      'Multi-Tenant Workspace',
      'Progressive Web App (PWA)',
      'Desktop AppImage',
    ],
    leadDivision: 'Moxforge Labs',
    repoOrDocUrl: 'https://learnitosphere.vercel.app/',
  },
];

export interface VentureProfile {
  id: 'moxforge-labs' | 'moxforge-community';
  name: string;
  kicker: string;
  tagline: string;
  mandate: string;
  focusAreas: string[];
  keyMetrics: { label: string; value: string; context: string }[];
  programs: {
    title: string;
    cadence: string;
    description: string;
    deliverable: string;
  }[];
}

export const MOXFORGE_VENTURES: VentureProfile[] = [
  {
    id: 'moxforge-labs',
    name: 'Moxforge Labs',
    kicker: 'Applied R&D & Venture Studio',
    tagline: 'Building foundational Information, Technology, AI, and Internet products for modern digital enterprises.',
    mandate:
      'Moxforge Labs operates as our technology R&D engine and venture builder. We solve high-impact challenges in information retrieval, AI runtimes, programmable internet infrastructure, and developer platforms—incubating proprietary software that scales into commercial products and enterprise deployments.',
    focusAreas: [
      'AI Inference Runtimes & Intelligent Web Services',
      'Semantic Information Indexing & Knowledge Graph Engines',
      'Programmable Internet Infrastructure & Edge Gateways',
      'Software Venture Incubation & Enterprise Co-Development',
    ],
    keyMetrics: [
      {
        label: 'Software & AI Products Shipped',
        value: '14',
        context: 'Across cloud inference, information indexing, internet platforms, and developer tools since 2024',
      },
      {
        label: 'Enterprise Technology Pilots',
        value: '28',
        context: 'Active deployments with digital platforms, enterprises, and institutional partners',
      },
      {
        label: 'Median Concept-to-Production Cycle',
        value: '10 Weeks',
        context: 'From system architecture to live internet deployment',
      },
    ],
    programs: [
      {
        title: 'Foundry Digital Venture Track',
        cadence: 'Rolling 6-Month Sprints',
        description:
          'Incubating scalable SaaS, AI, and internet infrastructure ventures from internal Moxforge Labs technology with principal engineers.',
        deliverable: 'Production cloud platform, validated enterprise customers, and dedicated engineering core.',
      },
      {
        title: 'Enterprise Information & AI Studio',
        cadence: 'Quarterly Intake',
        description:
          'Custom technology partnerships solving complex enterprise search, knowledge intelligence, and scalable web architecture challenges.',
        deliverable: 'Deployed cloud pipeline, custom AI integration, and full engineering handoff.',
      },
      {
        title: 'Internet Scale Benchmark Lab',
        cadence: 'Continuous Access',
        description:
          'Distributed cloud testing environment for profiling web latency, API throughput, and AI grounding accuracy at scale.',
        deliverable: 'Reproducible latency, throughput, and reliability telemetry reports.',
      },
    ],
  },
  {
    id: 'moxforge-community',
    name: 'Moxforge Community',
    kicker: 'Open Ecosystem & Student Builder Network',
    tagline: 'Cultivating the next generation of software engineers, web technologists, AI researchers, and open-source maintainers.',
    mandate:
      'Moxforge Community bridges academic computer science and real-world internet engineering. Through collegiate chapters, open-source fellowships, and hands-on hackathons across university campuses, we empower students to ship production web, information, and AI software.',
    focusAreas: [
      'Collegiate Technology Chapters & Peer Build Guilds',
      'Open-Source Web, Cloud & AI Maintenance Fellowships',
      'Internet Architecture Hackathons & Research Circles',
      'Direct Mentorship from Moxforge Labs Senior Engineers',
    ],
    keyMetrics: [
      {
        label: 'Active Collegiate Chapters',
        value: '24',
        context: 'Student-led information & technology hubs across premier universities',
      },
      {
        label: 'Community Developers & Fellows',
        value: '3,400+',
        context: 'Student software builders, open-source contributors, and technical mentors',
      },
      {
        label: 'Open-Source Commits & Releases',
        value: '18,500+',
        context: 'Merged across public Moxforge web, AI, and developer tool repositories',
      },
    ],
    programs: [
      {
        title: 'Moxforge Open Source Fellowship',
        cadence: 'Winter & Summer Cohorts (12 Weeks)',
        description:
          'Stipend-supported fellowship where student developers work directly alongside Moxforge Labs engineers on open web and AI repositories.',
        deliverable: 'Production open-source release, technical documentation, and benchmark publication.',
      },
      {
        title: 'Campus Cloud & Innovation Grants',
        cadence: 'Semester Cycles',
        description:
          'Cloud credits, domain sponsorships, and micro-grants awarded to student chapters building impactful internet and AI applications.',
        deliverable: 'Live web deployment, open repository, and campus demo day showcase.',
      },
      {
        title: 'ForgeCon & Regional Code Sprints',
        cadence: 'Monthly & Annual',
        description:
          '48-hour software and AI build sprints, system design reviews, and technology symposiums hosted across university chapters and online.',
        deliverable: 'Shipped web or AI application judged on architecture, usability, and real-world impact.',
      },
    ],
  },
];

export type PartnerCategory = 'All' | 'Industry Partners' | 'Academic Institutions' | 'Research Orgs';

export interface PartnerOrganization {
  id: string;
  name: string;
  category: Exclude<PartnerCategory, 'All'>;
  location: string;
  sinceYear: string;
  collaborationScope: string;
  jointOutcome: string;
}

export const MOXFORGE_PARTNERS: PartnerOrganization[] = [
  {
    id: 'partner-zenith-cloud',
    name: 'Zenith Cloud & Internet Infrastructure Corp.',
    category: 'Industry Partners',
    location: 'Global Cloud Network',
    sinceYear: '2024',
    collaborationScope: 'Co-development of high-throughput edge routing and serverless AI inference gateways.',
    jointOutcome: 'Deployed MoxNet and AetherCloud across 14 regional internet points of presence.',
  },
  {
    id: 'partner-casr-computing',
    name: 'Centre for Advanced Information & Computing Sciences',
    category: 'Academic Institutions',
    location: 'Academic Research Network',
    sinceYear: '2024',
    collaborationScope: 'Joint web-scale information retrieval lab, flagship student chapter, and open-source fellowship hub.',
    jointOutcome: 'Published 4 joint research papers and trained 220+ undergraduate software and AI fellows.',
  },
  {
    id: 'partner-open-web-ai',
    name: 'Open Web & Verifiable AI Consortium',
    category: 'Research Orgs',
    location: 'International Research Consortium',
    sinceYear: '2025',
    collaborationScope: 'Standardization of open internet schemas, AI grounding benchmarks, and web safety evaluations.',
    jointOutcome: 'Established the Veritas Eval benchmark adopted by 19 partner technology laboratories.',
  },
  {
    id: 'partner-nexus-digital',
    name: 'Nexus Enterprise Information Systems Ltd.',
    category: 'Industry Partners',
    location: 'Enterprise Technology Network',
    sinceYear: '2025',
    collaborationScope: 'Enterprise document intelligence, semantic enterprise search, and knowledge graph automation.',
    jointOutcome: 'Indexed 1.2M+ enterprise records with SpectraIndex at 99.1% structural accuracy.',
  },
  {
    id: 'partner-national-tech-univ',
    name: 'National Institute of Information Technology & Engineering',
    category: 'Academic Institutions',
    location: 'University Computing Grid',
    sinceYear: '2025',
    collaborationScope: 'CommonsCloud campus developer grid deployment and modern full-stack AI curriculum.',
    jointOutcome: 'Powered 650+ student cloud and internet capstone projects with zero-cost compute.',
  },
  {
    id: 'partner-digital-commons-foundry',
    name: 'Digital Commons Information Foundry',
    category: 'Research Orgs',
    location: 'Open Digital Commons',
    sinceYear: '2025',
    collaborationScope: 'Open-access multilingual web datasets and digital public goods for Indian and global languages.',
    jointOutcome: 'Released 420,000 verified multilingual web and document annotations under permissive open license.',
  },
];

export type TeamDepartment =
  | 'All'
  | 'Leadership'
  | 'AI & Information Systems'
  | 'Internet & Cloud Engineering'
  | 'Community & Operations';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: Exclude<TeamDepartment, 'All'>;
  isFounder?: boolean;
  location: string;
  focus: string;
  bio: string;
  publicationsOrShipped: string;
}

export const MOXFORGE_TEAM: TeamMember[] = [
  {
    id: 'team-mukilan-muthuvalathan',
    name: 'Mukilan Muthuvalathan',
    role: 'Founder & Chief Executive Officer (CEO)',
    department: 'Leadership',
    isFounder: true,
    location: 'MOXFORGE',
    focus: 'AI & Robotics Systems, Software Platforms, Distributed Storage & Venture Strategy',
    bio: 'Founder and Chief Executive Officer (CEO) of MOXFORGE, advancing the intersection of Information, Technology, and the Internet—uniting applied software, AI, and robotics venture creation (Moxforge Innovation Labs) with an open developer and organization ecosystem (Moxforge Community).',
    publicationsOrShipped: 'Leads Moxforge Innovation Labs (AI & robotics software and hardware) and Moxforge Community Organization.',
  },
  {
    id: 'team-pragatheeswaran-kasinathan',
    name: 'Pragatheeswaran Kasinathan',
    role: 'Chief Technology Officer (CTO) & Head of Strategic Partnerships',
    department: 'Leadership',
    location: 'MOXFORGE',
    focus: 'Technology Strategy, Strategic Partnerships, Venture Operations & Ecosystem Alliances',
    bio: 'Brings over 10 years of experience in the IT industry. As Chief Technology Officer (CTO) and Head of Strategic Partnerships, he steers MOXFORGE’s long-term technology vision and organizational innovation while establishing high-impact strategic alliances and venture partnerships across the technology ecosystem.',
    publicationsOrShipped: '10 years of experience in the IT industry; oversees technology direction, strategic industry partnerships, and commercial venture initiatives across MOXFORGE.',
  },
  {
    id: 'team-sathishvaran-veerapandi',
    name: 'Sathishvaran Veerapandi',
    role: 'Head of Robotics and Automation',
    department: 'AI & Information Systems',
    location: 'Moxforge Innovation Labs',
    focus: 'Robotics Systems, Autonomous Control, ROS 2 Architecture & Hardware Integration',
    bio: 'Leads robotics and automation engineering across Moxforge Innovation Labs, integrating autonomous perception, navigation, actuators, and edge compute into intelligent physical systems.',
    publicationsOrShipped: 'Leads robotics hardware, ROS 2 communication pipelines, digital twin simulation, and autonomous system deployments at Moxforge Innovation Labs.',
  },
  {
    id: 'team-santhosh-dinesh',
    name: 'Santhosh Dinesh',
    role: 'Director of Robotics and Automation',
    department: 'AI & Information Systems',
    location: 'Moxforge Innovation Labs',
    focus: 'Robotics Hardware, Edge Computing, Sensor Fusion & Mechatronic Systems',
    bio: 'Directs robotics hardware, edge compute, and physical automation systems across Moxforge Innovation Labs—overseeing advanced sensors, actuators, modular interfaces, and real-time control boards.',
    publicationsOrShipped: 'Directs physical robotics engineering, edge AI acceleration, and automated control systems at Moxforge Innovation Labs.',
  },
  {
    id: 'team-yuganthar-swaminathan',
    name: 'Yuganthar Swaminathan',
    role: 'Director of Moxforge Community & Ecosystem Operations',
    department: 'Community & Operations',
    location: 'Moxforge Community',
    focus: 'Developer Communities, Open-Source Programs, Technical Workshops & Ecosystem Growth',
    bio: 'Focuses on community growth, open collaboration programs, and technical initiatives across Moxforge Community—connecting developers, learners, professionals, and organizations to learn and build together.',
    publicationsOrShipped: '',
  },
  {
    id: 'team-sri-prajin-sathiyamoorthi',
    name: 'Sri Prajin Sathiyamoorthi',
    role: 'Director of ROS Communication, OpenCV',
    department: 'AI & Information Systems',
    location: 'Moxforge Innovation Labs',
    focus: 'ROS 2 Communication, OpenCV Computer Vision, Real-Time Perception & Sensor Pipelines',
    bio: 'Directs ROS 2 communication middleware and OpenCV computer vision pipelines across Moxforge Innovation Labs—connecting software components through topics, services, and actions while processing real-time camera and depth streams for object recognition.',
    publicationsOrShipped: 'Leads ROS 2 node communication architectures, OpenCV visual perception pipelines, and real-time sensor processing at Moxforge Innovation Labs.',
  },
  {
    id: 'team-hrithic-prasath',
    name: 'Hrithic Prasath',
    role: 'Head of Product Design',
    department: 'Internet & Cloud Engineering',
    location: 'Moxforge Innovation Labs',
    focus: 'Product Design, Design Systems, Human-AI Interaction & Industrial Ergonomics',
    bio: 'Leads product design, user experience architecture, and visual design systems across Moxforge Innovation Labs—shaping intuitive interfaces for software platforms, AI workflows, and physical robotics hardware.',
    publicationsOrShipped: '',
  },
];

export interface InnovationPillar {
  id: string;
  index: string;
  title: string;
  horizon: 'Current Production' | '12-Month R&D Horizon' | 'Foundational Exploration';
  summary: string;
  technicalBreakthrough: string;
  metrics: string;
  papersAndSpecs: { title: string; code: string; year: string; abstract: string }[];
}

export const MOXFORGE_INNOVATIONS: InnovationPillar[] = [
  {
    id: 'innov-information-engines',
    index: '01',
    title: 'Semantic Information Retrieval & Knowledge Synthesis',
    horizon: 'Current Production',
    summary:
      'Transforming unstructured web pages, PDFs, and enterprise data silos into verifiable, low-latency relational knowledge graphs.',
    technicalBreakthrough:
      'Hybrid neural-lexical indexing engine that preserves document layout, citations, and cross-document entity links in real time.',
    metrics: '99.1% citation precision with sub-30ms query latency across multi-million document indices.',
    papersAndSpecs: [
      {
        title: 'Layout-Aware Graph Indexing for High-Precision Enterprise Information Retrieval',
        code: 'MX-TR-2026-01',
        year: '2026',
        abstract:
          'We present a unified document and web indexing architecture that combines dense semantic embeddings with structural DOM/layout graphs to eliminate ungrounded synthesis in enterprise search.',
      },
      {
        title: 'Streaming Incremental Index Updates for High-Velocity Web Corpora',
        code: 'MX-TR-2025-09',
        year: '2025',
        abstract:
          'Demonstrates sub-second index freshness for live internet data feeds without full vector re-clustering overhead.',
      },
    ],
  },
  {
    id: 'innov-verifiable-web-agents',
    index: '02',
    title: 'Cryptographically Auditable Web & AI Workflows',
    horizon: 'Current Production',
    summary:
      'Replacing fragile prompt chains with schema-enforced internet protocols where every API call and data transformation is deterministically verifiable.',
    technicalBreakthrough:
      'Merkle-chained execution traces that let engineering teams audit and replay every step of an automated web or AI workflow.',
    metrics: '99.94% schema adherence across 1.8M production API and tool invocations.',
    papersAndSpecs: [
      {
        title: 'Contract-First Web Orchestration: Formal Preconditions for AI-Driven APIs',
        code: 'MX-TR-2026-04',
        year: '2026',
        abstract:
          'Introduces a lightweight type-checked protocol layer around web service calls that prevents invalid state mutations across distributed microservices.',
      },
    ],
  },
  {
    id: 'innov-programmable-internet-edge',
    index: '03',
    title: 'Low-Latency Programmable Internet & Edge Runtimes',
    horizon: '12-Month R&D Horizon',
    summary:
      'Running intelligent caching, authentication, and lightweight AI inference directly at the network edge to eliminate round-trip bottlenecks.',
    technicalBreakthrough:
      'Zero-cold-start WebAssembly and Rust worker isolates co-located with regional internet gateways.',
    metrics: '64% reduction in origin server load and 3.4x faster time-to-first-byte across global web clients.',
    papersAndSpecs: [
      {
        title: 'Deterministic Memory Sandboxing for Multi-Tenant Edge Inference Workers',
        code: 'MX-TR-2026-07',
        year: '2026',
        abstract:
          'Describes a sub-millisecond isolate scheduling kernel tailored for high-concurrency HTTP/3 and WebSocket edge applications.',
      },
    ],
  },
  {
    id: 'innov-federated-digital-commons',
    index: '04',
    title: 'Federated Campus Cloud & Open Internet Commons',
    horizon: 'Foundational Exploration',
    summary:
      'Connecting university computer labs and open-source developer chapters into a shared, resilient cloud fabric for public-interest technology.',
    technicalBreakthrough:
      'Zero-configuration encrypted mesh networking with fair-share compute scheduling for student web and AI workloads.',
    metrics: '84% cluster utilization efficiency across 24 participating collegiate chapters.',
    papersAndSpecs: [
      {
        title: 'Decentralized Sandbox Scheduling Across Multi-Campus University Networks',
        code: 'MX-TR-2026-11',
        year: '2026',
        abstract:
          'Bridges peer-to-peer service discovery with rootless container orchestration so student teams can deploy production web services at zero cost.',
      },
    ],
  },
];

export interface CommunityChapter {
  id: string;
  name: string;
  city: string;
  institutionOrHub: string;
  membersCount: number;
  leadName: string;
  focusTrack: string;
  activeProjectsCount: number;
}

export const MOXFORGE_CHAPTERS: CommunityChapter[] = [
  {
    id: 'chap-flagship-alpha',
    name: 'Moxforge Flagship Innovation Chapter',
    city: 'Flagship Hub',
    institutionOrHub: 'Headquarters Information, Technology & Internet Guild',
    membersCount: 620,
    leadName: 'Mukilan Muthuvalathan (Founder & President) · Aravindh Subramanian',
    focusTrack: 'Cloud Platforms, AI Systems & Modern Web Architecture',
    activeProjectsCount: 14,
  },
  {
    id: 'chap-open-systems',
    name: 'Moxforge Open Systems & Cloud Chapter',
    city: 'Central Hub',
    institutionOrHub: 'Internet & Open Systems Engineering Hub',
    membersCount: 580,
    leadName: 'Mukilan Muthuvalathan (Founder & President) · Nandini Rao',
    focusTrack: 'Information Retrieval, Agentic Web SDKs & Distributed Cloud',
    activeProjectsCount: 12,
  },
  {
    id: 'chap-software-web',
    name: 'Moxforge Software & Web Engineering Chapter',
    city: 'Developer Hub',
    institutionOrHub: 'Open Software & Internet Engineering Collective',
    membersCount: 410,
    leadName: 'Pranav Karthikeyan',
    focusTrack: 'Full-Stack Web Engineering, Developer Tools & Open Source',
    activeProjectsCount: 9,
  },
  {
    id: 'chap-info-ai',
    name: 'Moxforge Information & AI Research Chapter',
    city: 'Research Hub',
    institutionOrHub: 'Information Science & Web Engineering Circle',
    membersCount: 380,
    leadName: 'Zoya Farooqui',
    focusTrack: 'Document Intelligence, Semantic Search & Multilingual Web',
    activeProjectsCount: 8,
  },
];

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  format: 'In-Person Code Sprint' | 'Hybrid Symposium' | 'Live Architecture Workshop';
  registeredCount: number;
  capacity: number;
  summary: string;
}

export const INITIAL_COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    id: 'evt-forgecon-2026',
    title: 'ForgeCon 2026: Annual Information, Technology & Internet Symposium',
    date: 'November 28–29, 2026',
    location: 'Flagship Hubs + Global Live Stream',
    format: 'Hybrid Symposium',
    registeredCount: 412,
    capacity: 500,
    summary:
      'Two days of cloud & web architecture keynotes, AI product demos, and open-source showcases for all users, builders, and engineers.',
  },
  {
    id: 'evt-internet-scale-sprint',
    title: '48-Hour AI & Internet Platform Buildathon',
    date: 'December 12–14, 2026',
    location: 'All Regional & Open Community Chapters',
    format: 'In-Person Code Sprint',
    registeredCount: 118,
    capacity: 150,
    summary:
      'Hands-on hackathon building high-speed web applications, semantic search engines, and developer tools on AetherCloud and MoxNet.',
  },
  {
    id: 'evt-agentic-web-lab',
    title: 'Building Verifiable Web & AI Workflows with ForgeFlow SDK',
    date: 'January 16, 2027',
    location: 'Online & All 24 Community Chapters',
    format: 'Live Architecture Workshop',
    registeredCount: 285,
    capacity: 400,
    summary:
      'Deep-dive technical workshop covering schema-enforced API orchestration, execution trace auditing, and web application security.',
  },
];

export type CareerType = 'All' | 'Internship' | 'Volunteering' | 'Full-Time Engineering';

export interface CareerOpportunity {
  id: string;
  title: string;
  type: Exclude<CareerType, 'All'>;
  division: 'Moxforge Labs' | 'Moxforge Community';
  location: string;
  durationOrCommitment: string;
  stipendOrComp: string;
  summary: string;
  requirements: string[];
}

export const MOXFORGE_CAREERS: CareerOpportunity[] = [
  {
    id: 'role-cloud-ai-intern',
    title: 'AI & Internet Systems Engineering Intern',
    type: 'Internship',
    division: 'Moxforge Labs',
    location: 'Hybrid / Remote',
    durationOrCommitment: '6 Months (Spring / Summer Cohort)',
    stipendOrComp: 'Competitive Research Stipend + Cloud Compute Grant',
    summary:
      'Work directly with the AetherCloud and MoxNet teams to build low-latency inference APIs, edge routing workers, and scalable web services.',
    requirements: [
      'Strong foundation in TypeScript, Python, Go, or Rust and web protocols',
      'Hands-on experience with REST/GraphQL APIs, cloud deployment, or LLM inference',
      'Published GitHub repositories or shipped web/software projects',
    ],
  },
  {
    id: 'role-fullstack-sdk-intern',
    title: 'Full-Stack Web & Developer Tools Intern',
    type: 'Internship',
    division: 'Moxforge Labs',
    location: 'Remote',
    durationOrCommitment: '3 to 6 Months',
    stipendOrComp: 'Competitive Stipend + Open-Source Fellowship Credential',
    summary:
      'Build web dashboards, trace visualizers, and developer SDKs for the ForgeFlow Orchestrator and SpectraIndex Information Engine.',
    requirements: [
      'Proficiency in TypeScript, React, Node.js, and modern web standards',
      'Understanding of database indexing, API design, and state management',
      'Passion for clean developer experience and reliable internet software',
    ],
  },
  {
    id: 'role-campus-chapter-lead',
    title: 'Collegiate Chapter Lead & Technology Community Volunteer',
    type: 'Volunteering',
    division: 'Moxforge Community',
    location: 'Partner Universities',
    durationOrCommitment: '6 hrs/week · Academic Year Tenure',
    stipendOrComp: 'Cloud Micro-Grants + Direct Mentorship + Annual Summit Pass',
    summary:
      'Launch or lead an official Moxforge Community chapter on your college campus. Organize web & AI hackathons, coding workshops, and open-source sprints.',
    requirements: [
      'Enrolled undergraduate or postgraduate student in CS, IT, or allied fields',
      'Track record of organizing technical workshops, coding clubs, or hackathons',
      'Commitment to open-source collaboration and peer developer learning',
    ],
  },
  {
    id: 'role-open-source-mentor',
    title: 'Open-Source Web & AI Fellowship Mentor (Volunteer)',
    type: 'Volunteering',
    division: 'Moxforge Community',
    location: 'Remote',
    durationOrCommitment: '3 hrs/week · 12-Week Cohort',
    stipendOrComp: 'Official Maintainer Recognition + Cloud Compute Credits',
    summary:
      'Review pull requests, guide system architecture, and mentor student fellows contributing to Moxforge open-source web and AI repositories.',
    requirements: [
      '2+ years of production software, web, cloud, or AI engineering experience',
      'Prior open-source maintenance or code review leadership',
    ],
  },
  {
    id: 'role-staff-internet-engineer',
    title: 'Senior Cloud & Information Systems Architect',
    type: 'Full-Time Engineering',
    division: 'Moxforge Labs',
    location: 'Hybrid / Remote',
    durationOrCommitment: 'Full-Time',
    stipendOrComp: 'Base Salary + Venture Equity Participation',
    summary:
      'Lead distributed cloud infrastructure, semantic search indexing, and high-availability internet services across Moxforge Labs.',
    requirements: [
      '3+ years shipping production cloud platforms, distributed databases, or high-traffic web services',
      'Experience with Kubernetes, Go/Rust/TypeScript, and enterprise security standards',
    ],
  },
];
