import React, { useState } from 'react';
import {
  MOXFORGE_PAGES,
  MOXFORGE_PROJECTS,
  MOXFORGE_VENTURES,
  MOXFORGE_PARTNERS,
  PageId,
  PartnerCategory,
} from '../data/moxforgeData';
import { filterPartners } from '../utils/moxforgeLogic';
import { HeroArchitectureVisual } from './ArchitecturalVisuals';
import innovationPillarImg from '../assets/image_52c5aa7b.png';
import entrepreneurshipPillarImg from '../assets/image_b255f471.png';
import technologyPillarImg from '../assets/image_100484d4.png';
import ecosystemPillarImg from '../assets/image_586d4978.png';
import learnitoAiLogo from '../assets/learnito-ai-logo.png';
import pylumeLogo from '../assets/pylume-logo.png';
import storvexLogo from '../assets/storvex-logo.png';
import learnitosphereLogo from '../assets/learnitosphere-icon.png';

const PROJECT_LOGO_MAP: Record<string, string> = {
  'mox-learnito-ai': learnitoAiLogo,
  'mox-pylume': pylumeLogo,
  'mox-storvex': storvexLogo,
  'mox-learnitosphere': learnitosphereLogo,
};

/* ==========================================================================
   01. HOME — Company Introduction & Vision
   ========================================================================== */
export const HomeView: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero: Company Introduction & Vision */}
      <section className="pt-4">
        <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
          <div className="max-w-4xl">
            <p className="text-xs font-mono text-blue-700 font-medium">
              MOXFORGE INNOVATION LABS & MOXFORGE COMMUNITY
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-stone-950 mt-3 balance-text leading-[1.12]">
              Advancing Information, Technology, and the Next-Generation Internet.
            </h1>
            <div className="space-y-4 text-base text-stone-600 mt-5 leading-relaxed max-w-3xl">
              <p>
                <strong className="font-semibold text-stone-900">MOXFORGE</strong> is an Information, Technology, and Internet organisation uniting applied software and AI venture creation with an open developer ecosystem. Through{' '}
                <strong className="font-semibold text-stone-900">Moxforge Innovation Labs</strong> and{' '}
                <strong className="font-semibold text-stone-900">Moxforge Community</strong>, we build intelligent web platforms, information engines, and cloud infrastructure.
              </p>
              <p>
                As an innovation and venture-building organisation, MoxForge helps turn ambitious ideas and emerging technologies into meaningful businesses. Bringing together entrepreneurship, technology, and ecosystem collaboration, we support founders as they shape ideas, build companies, and work toward lasting impact.
              </p>
              <p>
                Founded by{' '}
                <strong className="font-bold text-stone-950">
                  Mukilan Muthuvalathan
                </strong>
                , a technology entrepreneur and systems architect dedicated to bridging frontier software research with real-world venture creation, MOXFORGE empowers emerging builders, engineers, and founders to transform bold technical insights into scalable internet platforms and enduring enterprises.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Explore Our Projects
            </button>
            <button
              type="button"
              onClick={() => onNavigate('ventures')}
              className="px-4 py-2.5 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              View Our Ventures
            </button>
            <a
              href="https://www.linkedin.com/in/mukilanmuthuvalathan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Connect with Mukilan
            </a>
          </div>
        </div>
      </section>

      {/* Our Core Pillars */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-mono text-blue-700 font-medium">
            OUR CORE PILLARS
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-2 balance-text">
            Turning ambitious ideas and emerging technologies into meaningful businesses.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-stone-200">
          {[
            {
              index: '01',
              title: 'Innovation',
              description:
                'Identify meaningful problems and develop new solutions.',
              image: innovationPillarImg,
              imageAlt:
                'Innovation lightbulb and neural network representing problem solving and new solutions',
            },
            {
              index: '02',
              title: 'Entrepreneurship',
              description:
                'Equip founders to shape, validate, and grow ventures.',
              image: entrepreneurshipPillarImg,
              imageAlt:
                'Founders and team collaborating around a venture strategy and growth board',
            },
            {
              index: '03',
              title: 'Technology',
              description:
                'Turn emerging technologies into practical products and businesses.',
              image: technologyPillarImg,
              imageAlt:
                'Human and robotic hand connecting across digital AI and technology streams',
            },
            {
              index: '04',
              title: 'Ecosystem',
              description:
                'Connect founders with the people and organisations that help ventures progress.',
              image: ecosystemPillarImg,
              imageAlt:
                'Interlocked hands representing community, collaboration, and ecosystem partnerships',
            },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col"
            >
              <div className="mb-4 overflow-hidden rounded-lg bg-[#0F172A]">
                <img
                  src={pillar.image}
                  alt={pillar.imageAlt}
                  className="w-full h-40 object-cover block"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <h3 className="font-display text-lg font-bold text-stone-950 mt-1.5">
                {pillar.title}
              </h3>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   02. ABOUT US — Vision, Mission and Meet the Architect
   ========================================================================== */
export const AboutView: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate,
}) => {
  return (
    <div className="space-y-8 pt-4">
      {/* Vision & Mission */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <p className="text-xs font-mono text-blue-700 font-medium">
          ABOUT US — VISION & MISSION
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-stone-950 mt-2 balance-text leading-[1.12]">
          Shaping the future of Information, Technology, and the Internet.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-stone-200 md:divide-x md:divide-stone-200">
          <div className="md:pr-4">
            <p className="text-xs font-mono text-blue-700 font-medium">
              OUR VISION
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-950 mt-1.5">
              Establish the premier Information, Technology & Internet innovation foundry and developer network across the global web.
            </h2>
            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              MOXFORGE envisions a connected ecosystem where ambitious ideas and emerging technologies are systematically transformed into enduring digital companies—anchoring collegiate technology chapters, powering open cloud deployments, and spinning out category-defining ventures through Moxforge Innovation Labs and Moxforge Community.
            </p>
          </div>

          <div className="md:pl-8 pt-6 md:pt-0 border-t md:border-t-0 border-stone-200">
            <p className="text-xs font-mono text-blue-700 font-medium">
              OUR MISSION
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-950 mt-1.5">
              Build high-impact Information, Technology, and Internet platforms while empowering the next generation of founders and software builders.
            </h2>
            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              We translate breakthroughs in semantic information retrieval, AI inference, and cloud web infrastructure into practical products and businesses—while equipping founders, engineers, and student developers with the mentorship, toolchains, and ecosystem connections needed to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Architect */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div className="max-w-3xl">
          <p className="text-xs font-mono text-blue-700 font-medium">
            MEET THE ARCHITECT
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-2">
            Mukilan Muthuvalathan — Founder, MOXFORGE
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-stone-600 mt-4 leading-relaxed">
            <p>
              Every enduring technology begins long before the first line of code is written—it begins with the conviction that complex problems can be re-engineered from first principles.{' '}
              <strong className="font-bold text-stone-950">
                Mukilan Muthuvalathan
              </strong>{' '}
              envisioned MOXFORGE not merely as a company, but as a living crucible where raw curiosity, disciplined engineering, and fearless company-building converge.
            </p>
            <p>
              Driven by a passion for how information flows, how intelligent systems reason, and how the modern internet connects human potential, he designed a dual-engine blueprint—pairing deep product engineering with a grassroots movement of student builders and visionary founders. Under his stewardship, bold ideas are never left on the drawing board; they are stress-tested, forged into resilient software, and launched into the world.
            </p>
          </div>
          <blockquote className="mt-6 pl-4 border-l-2 border-blue-700 text-sm sm:text-base italic text-stone-800">
            “We do not wait for the future of the internet to arrive—we draft its architecture, equip its builders, and ship it one breakthrough at a time.”
          </blockquote>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('team')}
            className="px-5 py-2.5 text-sm font-medium text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Meet Our Team
          </button>
          <button
            type="button"
            onClick={() => onNavigate('careers')}
            className="px-4 py-2.5 text-sm font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            View Opportunities
          </button>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   03. OUR PROJECTS — Software Products, Platforms and Systems
   ========================================================================== */
export const ProjectsView: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate: _onNavigate,
}) => {
  return (
    <div className="space-y-10 pt-4">
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono text-blue-700 font-medium">
              OUR PROJECTS — SOFTWARE PRODUCTS, PLATFORMS & SYSTEMS
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-stone-950 mt-2 balance-text leading-[1.12]">
              Software engineered for real-world workflows, scale, and reliability.
            </h1>
            <p className="text-base text-stone-600 mt-3 max-w-3xl leading-relaxed">
              MOXFORGE designs, builds, and ships production-grade software across web, desktop, and cloud environments. From end-user applications and operational platforms to developer tooling and core systems, every project is crafted for clarity, security, and long-term performance.
            </p>
          </div>
          <p className="text-xs font-mono text-stone-500 shrink-0">
            Flagship Software Systems
          </p>
        </div>
      </section>

      {/* Project Grid — Each Software Project Rendered Once with Full Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {MOXFORGE_PROJECTS.map((project, idx) => (
          <article
            key={project.id}
            className="bg-white border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between hover:border-stone-300 transition-colors"
          >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="w-16 h-16 rounded-xl bg-[#0F172A] p-2.5 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={PROJECT_LOGO_MAP[project.id] || project.logoUrl}
                      alt={`${project.title} logo`}
                      className={`w-full h-full object-contain block rounded-md ${
                        project.id === 'mox-learnitosphere' ? 'bg-white p-1' : ''
                      }`}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                    />
                  </div>
                  <span className="font-mono text-xs text-blue-700 font-medium uppercase">
                    {project.category}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-stone-950 mt-5">
                  {project.title}
                </h2>

                <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                  {project.summary}
                </p>

                <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
                  <div>
                    <h3 className="text-xs font-mono text-stone-500">
                      SYSTEM ARCHITECTURE
                    </h3>
                    <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                      {project.architectureOverview}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono text-stone-500">
                      KEY CAPABILITIES
                    </h3>
                    <p className="text-xs font-medium text-stone-900 mt-1 leading-relaxed">
                      {project.impactMetric}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 space-y-4">
                <div className="text-xs text-stone-500 font-mono">
                  {project.techStack.join(' · ')}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono text-stone-500">
                    {project.stage}
                  </span>
                  <a
                    href={project.repoOrDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-xs font-medium bg-[#0F172A] text-white rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {project.actionLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
    </div>
  );
};

/* ==========================================================================
   04. OUR VENTURES — Moxforge Innovation Labs and Moxforge Organization
   ========================================================================== */
const GMAIL_INNOVATION_PROPOSAL_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=moxforge.innovation@gmail.com&su=Proposal%20to%20Join%20With%20Us%20%E2%80%94%20Idea%20into%20Innovation';

const GMAIL_ORGANIZATION_PROPOSAL_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=moxforge.organization@gmail.com&su=Proposal%20for%20Collaboration%20%26%20Partnership';

export const VenturesView: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate: _onNavigate,
}) => {
  return (
    <div className="space-y-8 pt-4">
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <p className="text-xs font-mono text-blue-700 font-medium">
          OUR VENTURES
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-stone-950 mt-2 balance-text leading-[1.12]">
          Moxforge Innovation Labs & Moxforge Community Organization.
        </h1>
        <p className="text-base text-stone-600 mt-4 max-w-3xl leading-relaxed">
          MOXFORGE operates through two dedicated pillars—pairing our applied technology and venture-building studio with our open developer and collegiate community organisation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 pt-8 border-t border-stone-200 lg:divide-x lg:divide-stone-200">
          {/* 01. Moxforge Innovation Labs */}
          <div className="flex flex-col justify-between lg:pr-4">
            <div>
              <p className="text-xs font-mono text-blue-700 font-medium">
                INNOVATION & VENTURE STUDIO
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-2">
                Moxforge Innovation Labs
              </h2>
              <p className="text-sm font-semibold text-stone-800 mt-2">
                Applied Information, Technology, AI & Internet Venture Studio
              </p>
              <div className="space-y-3 text-sm text-stone-600 mt-4 leading-relaxed">
                <p>
                  <strong className="font-semibold text-stone-900">
                    Moxforge Innovation Labs
                  </strong>{' '}
                  is the research, engineering, and venture-building arm of MOXFORGE. It focuses on identifying meaningful problems and turning emerging technologies into practical software products, intelligent web platforms, semantic information engines, and scalable businesses.
                </p>
                <p>
                  Working from early technical insight through architecture, validation, and market launch, Moxforge Innovation Labs equips founders and engineers to build enduring internet and AI companies.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between gap-3">
              <p className="text-xs text-stone-700">
                Led by{' '}
                <strong className="font-bold text-stone-950">
                  Mukilan Muthuvalathan
                </strong>{' '}
                — Founder & CEO
              </p>
              <a
                href={GMAIL_INNOVATION_PROPOSAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Submit Proposal ↗
              </a>
            </div>
          </div>

          {/* 02. Moxforge Community Organization */}
          <div className="flex flex-col justify-between lg:pl-8 pt-8 lg:pt-0 border-t lg:border-t-0 border-stone-200">
            <div>
              <p className="text-xs font-mono text-blue-700 font-medium">
                COMMUNITY & ECOSYSTEM ORGANIZATION
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-2">
                Moxforge Community Organization
              </h2>
              <p className="text-sm font-semibold text-stone-800 mt-2">
                Open Developer Network, Collegiate Chapters & Ecosystem Collaboration
              </p>
              <div className="space-y-3 text-sm text-stone-600 mt-4 leading-relaxed">
                <p>
                  <strong className="font-semibold text-stone-900">
                    Moxforge Community
                  </strong>{' '}
                  is the open ecosystem and community organisation of MOXFORGE. It connects student developers, emerging founders, technologists, universities, and partner institutions through collegiate technology chapters, open-source fellowships, and collaborative engineering initiatives.
                </p>
                <p>
                  By fostering hands-on technical mentorship, hackathons, and ecosystem connections, the organisation empowers the next generation of builders to collaborate, learn, and launch impactful solutions.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-stone-200 flex items-center justify-between gap-3">
              <p className="text-xs text-stone-700">
                Led by{' '}
                <strong className="font-bold text-stone-950">
                  Mukilan Muthuvalathan
                </strong>{' '}
                — Founder & President
              </p>
              <a
                href={GMAIL_ORGANIZATION_PROPOSAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Submit Proposal ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   05. COLLABORATORS & PARTNERS — Companies, Institutions & Organizations
   ========================================================================== */
const PARTNER_CATEGORIES: PartnerCategory[] = [
  'All',
  'Industry Partners',
  'Academic Institutions',
  'Research Orgs',
];

const GMAIL_COLLABORATION_URL =
  'https://mail.google.com/mail/?view=cm&fs=1&to=moxforge.innovation@gmail.com&su=Proposal%20for%20Collaboration%20%26%20Partnership';

export const CollaboratorsView: React.FC<{
  onNavigate: (page: PageId) => void;
}> = ({ onNavigate: _onNavigate }) => {
  const [selectedCategory, setSelectedCategory] =
    useState<PartnerCategory>('All');
  const filteredPartners = filterPartners(MOXFORGE_PARTNERS, selectedCategory);

  return (
    <div className="space-y-10 pt-4">
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-mono text-blue-700 font-medium">
              COLLABORATORS & PARTNERS — INDUSTRY, ACADEMIA & RESEARCH
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-stone-950 mt-2 balance-text leading-[1.12]">
              Strategic collaborations across industry, academia, and technology ecosystems.
            </h1>
            <p className="text-base text-stone-600 mt-3 max-w-3xl leading-relaxed">
              MOXFORGE partners with technology companies, engineering universities, research organizations, and student developer communities to co-develop software, run innovation programs, and scale real-world solutions.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter collaborators by organization type"
            className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-lg shrink-0"
          >
            {PARTNER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Roster Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPartners.map((partner, idx) => (
          <article
            key={partner.id}
            className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span>{partner.category}</span>
                <span aria-hidden="true">·</span>
                <span>{partner.location}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">
                  Partner
                </span>
              </div>

              <h2 className="font-display text-xl font-bold text-stone-950 mt-2">
                {partner.name}
              </h2>

              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                {partner.collaborationScope}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100">
              <p className="text-xs font-mono text-stone-500">
                VERIFIED JOINT OUTCOME
              </p>
              <p className="text-xs font-medium text-stone-900 mt-1">
                {partner.jointOutcome}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* Collaboration & Partnership Gmail CTA */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-blue-700 font-medium">
            COLLABORATION & PARTNERSHIP DESK
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-1.5">
            Submit a Proposal for Collaboration & Partnership
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Whether you represent an organization, university, or technology initiative interested in partnering with{' '}
            <strong className="font-semibold text-stone-900">
              Moxforge Innovation Labs
            </strong>{' '}
            or{' '}
            <strong className="font-semibold text-stone-900">
              Moxforge Community
            </strong>
            , our partnerships desk structures clear, outcome-driven engagements.
          </p>
        </div>
        <a
          href={GMAIL_COLLABORATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 text-xs font-medium bg-[#0F172A] text-white rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Propose Collaboration & Partnership ↗
        </a>
      </section>
    </div>
  );
};
