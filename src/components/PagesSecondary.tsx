import React, { useState } from 'react';
import {
  MOXFORGE_TEAM,
  PageId,
} from '../data/moxforgeData';
import { CopyButton } from './CopyButton';
import {
  validateCareerApplication,
  validateContactEnquiry,
  CareerApplicationInput,
  ContactEnquiryInput,
} from '../utils/moxforgeLogic';
import {
  SubmittedCandidateApplication,
  SubmittedBusinessEnquiry,
  loadCareerAdminConfig,
  loadSubmittedApplications,
  saveSubmittedApplications,
  loadSubmittedEnquiries,
  saveSubmittedEnquiries,
  dispatchEnquiryToPrivateGoogleSheet,
} from '../utils/careerAdminStore';
import { FounderArchitecturalPortrait } from './ArchitecturalVisuals';
import aiAgentsBgImage from '../assets/image_3db6d480.webp';
import llmBgImage from '../assets/image_a9b49912.webp';
import perceptionBgImage from '../assets/image_abe221da.webp';
import navigationBgImage from '../assets/image_17d4176f.webp';
import rosBgImage from '../assets/image_91dadf27.webp';
import simulationBgImage from '../assets/image_0648d1a6.webp';
import safetyBgImage from '../assets/image_722a2bf1.webp';
import learningBgImage from '../assets/image_4b8e9814.webp';
import acceleratorBgImage from '../assets/image_28029c52.webp';
import roboticsHwBgImage from '../assets/image_cd537baa.webp';
import sensorsHwBgImage from '../assets/image_6eee7e26.webp';
import edgeComputingHwBgImage from '../assets/image_4584775c.webp';
import connectivityHwBgImage from '../assets/image_231fda61.webp';
import powerCoolingHwBgImage from '../assets/image_68febe15.webp';
import modularExpansionHwBgImage from '../assets/image_ceb3b1a8.webp';
import durabilityHwBgImage from '../assets/image_5312bfcd.webp';

/* ==========================================================================
   06. OUR TEAM — Founder, Leadership and Team Members
   ========================================================================== */
export const TeamView: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate,
}) => {
  const founder = MOXFORGE_TEAM.find((m) => m.isFounder)!;

  return (
    <div className="space-y-12 pt-4">
      {/* Founder Spotlight */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
              OUR TEAM — FOUNDER, LEADERSHIP & RESEARCHERS
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-950 mt-2 balance-text">
              Principal researchers, systems engineers, and community architects.
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-4 leading-relaxed">
              {founder.bio}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-stone-600">
              <span className="font-semibold text-stone-950">
                {founder.name}
              </span>{' '}
              · {founder.role}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('careers')}
              className="px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Join Our Team →
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex">
          <FounderArchitecturalPortrait />
        </div>
      </section>

      {/* Full Team Roster */}
      <section className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-stone-950">
            Leadership & Engineering Roster
          </h2>
          <p className="text-xs text-stone-500 mt-0.5 font-mono">
            Core Leadership & Engineering Roster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOXFORGE_TEAM.map((member, index) => (
            <article
              key={member.id}
              className="bg-white border border-stone-200 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                  {(member.isFounder ||
                    member.id === 'team-pragatheeswaran-kasinathan') && (
                    <>
                      <span>
                        {member.isFounder ? 'Founder & CEO' : 'Co-Founder & CTO'}
                      </span>
                      <span aria-hidden="true">·</span>
                    </>
                  )}
                  <span>{member.location}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-stone-950 mt-2">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  {member.role}
                </p>

                <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100">
                <p className="text-xs font-mono text-stone-400">
                  FOCUS & SHIPPED WORK
                </p>
                <p className="text-xs font-semibold text-stone-900 mt-1 leading-relaxed">
                  {member.focus}
                </p>
                {member.publicationsOrShipped && (
                  <p className="text-xs text-stone-700 mt-1 leading-relaxed">
                    {member.publicationsOrShipped}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   07. INNOVATION — Research, Technology and New Initiatives
   ========================================================================== */
export const InnovationView: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate: _onNavigate,
}) => {
  const softwareItems = [
    {
      index: '01',
      title: 'LLM integration',
      description:
        'Understands natural-language instructions and turns them into structured requests.',
      lines: [
        'Understands natural-language instructions and turns them into structured requests.',
        'Grounds reasoning with live knowledge graphs, web data, and enterprise tools.',
        'Coordinates multi-agent workflows and autonomous robotic function execution.',
        'Ensures schema verification, safety guardrails, and low-latency inference.',
      ],
      backgroundImage: llmBgImage || '/assets/aistudio/image_a9b49912.png',
    },
    {
      index: '02',
      title: 'AI agents',
      description:
        'Plan tasks and coordinate tools or robot functions.',
      lines: [
        'Decomposes complex objectives into structured multi-step execution plans.',
        'Coordinates autonomous sub-agents with specialized role delegation.',
        'Executes software tools, APIs, and digital environments with verification.',
        'Maintains working memory, self-reflection, and continuous task recovery.',
      ],
      backgroundImage: aiAgentsBgImage || '/assets/aistudio/image_3db6d480.png',
    },
    {
      index: '03',
      title: 'Perception',
      description:
        'Uses camera, lidar, and other sensor data to recognize objects and surroundings.',
      lines: [
        'Processes 3D LiDAR point clouds, radar, and stereo cameras for sensor fusion.',
        'Detects 3D bounding boxes, obstacles, and roadway geometry in real time.',
        'Tracks object velocities, multi-target trajectories, and spatial occupancy grids.',
        'Maintains robust environmental awareness across adverse weather and dense traffic.',
      ],
      backgroundImage: perceptionBgImage || '/assets/aistudio/image_abe221da.png',
    },
    {
      index: '04',
      title: 'Navigation and planning',
      description:
        'Builds maps, chooses routes, and plans actions.',
      lines: [
        'Generates high-definition metric maps, topological graphs, and SLAM baselines.',
        'Computes optimal global routes with dynamic collision avoidance algorithms.',
        'Executes sub-meter local trajectory planning, speed profiling, and smoothing.',
        'Adapts maneuvers in real time to moving obstacles, road closures, and reroutes.',
      ],
      backgroundImage: navigationBgImage || '/assets/aistudio/image_17d4176f.png',
    },
    {
      index: '05',
      title: 'ROS communication',
      description:
        'Connects software components through ROS 2 topics, services, and actions.',
      lines: [
        'Connects distributed nodes using ROS 2 publish-subscribe topics, services, and actions.',
        'Employs high-throughput DDS middleware with tailored Quality of Service (QoS) policies.',
        'Bridges Linux application nodes with real-time embedded motor and sensor microcontrollers.',
        'Manages ros2_control feedback loops for robotic arms, mobile platforms, and actuators.',
      ],
      backgroundImage: rosBgImage || '/assets/aistudio/image_91dadf27.png',
    },
    {
      index: '06',
      title: 'Simulation and digital twins',
      description:
        'Tests robot behavior in a virtual environment before deployment.',
      lines: [
        'Builds high-fidelity physics simulations and synchronized virtual replicas.',
        'Validates autonomous behaviors and stress-tests edge cases prior to hardware rollout.',
        'Streams real-time bidirectional telemetry between physical robots and digital models.',
        'Accelerates synthetic data generation, policy training, and predictive maintenance.',
      ],
      backgroundImage: simulationBgImage || '/assets/aistudio/image_0648d1a6.png',
    },
    {
      index: '07',
      title: 'Safety and monitoring',
      description:
        'Checks commands, limits risky actions, and reports system status.',
      lines: [
        'Enforces real-time motion interlocks, emergency stop boundaries, and speed limits.',
        'Monitors subsystem health, thermal telemetry, and motor torque anomalies continuously.',
        'Validates software command streams against safety envelopes to prevent hazardous actions.',
        'Logs tamper-evident audit trails and triggers automated fail-safe recovery states.',
      ],
      backgroundImage: safetyBgImage || '/assets/aistudio/image_722a2bf1.png',
    },
    {
      index: '08',
      title: 'Learning and adaptation',
      description:
        'Improves performance using new data or feedback.',
      lines: [
        'Ingests operational telemetry to continuously fine-tune robot neural policies.',
        'Applies reinforcement learning and human-in-the-loop feedback to novel edge cases.',
        'Adapts model weights to shifting physical dynamics, payload variations, and mechanical wear.',
        'Distributes federated updates across fleet units without disrupting live services.',
      ],
      backgroundImage: learningBgImage || '/assets/aistudio/image_4b8e9814.png',
    },
  ];

  const hardwareItems = [
    {
      index: '01',
      title: 'AI accelerators',
      description:
        'GPUs, NPUs, or other chips for running AI models efficiently.',
      lines: [
        'High-throughput neural processing units (NPUs) and dedicated tensor compute cores.',
        'Optimized for low-latency edge inference, quantised LLMs, and real-time vision.',
        'Massive memory bandwidth and unified architecture for multimodal autonomy pipelines.',
        'Energy-efficient thermal packaging engineered for mobile robotics and embedded payloads.',
      ],
      backgroundImage: acceleratorBgImage || '/assets/aistudio/image_28029c52.png',
    },
    {
      index: '02',
      title: 'Robotics hardware',
      description:
        'Motors, actuators, grippers, and control boards for movement and manipulation.',
      lines: [
        'High-precision harmonic drive gearboxes and brushless servo motor assemblies.',
        'Multi-axis articulated robotic arms engineered for sub-millimeter repeatable accuracy.',
        'Modular end-effectors, soft-pneumatic grippers, and quick-change tool couplings.',
        'Deterministic low-latency CAN FD and EtherCAT real-time motion control buses.',
      ],
      backgroundImage: roboticsHwBgImage || '/assets/aistudio/image_cd537baa.png',
    },
    {
      index: '03',
      title: 'Advanced sensors',
      description:
        'Cameras, lidar, radar, depth sensors, and force sensors for perception.',
      lines: [
        'Solid-state LiDAR, high-resolution stereo cameras, and depth perception arrays.',
        'Precision 9-DoF IMUs and tactile fingertip arrays for micro-force sensing.',
        'Millimeter-wave radar and multi-spectral infrared environmental monitoring.',
        'Synchronized hardware-triggered time-stamping for multi-modal sensor fusion.',
      ],
      backgroundImage: sensorsHwBgImage || '/assets/aistudio/image_6eee7e26.png',
    },
    {
      index: '04',
      title: 'Edge computing',
      description:
        'On-device processors that let robots make decisions with low delay and limited connectivity.',
      lines: [
        'Ultra-low latency on-device neural processing without reliance on cloud connectivity.',
        'Ruggedized carrier boards with industrial passive cooling and shock absorption.',
        'Hardware-accelerated containerized runtimes for concurrent autonomy workloads.',
        'Deterministic real-time RTOS co-processing for critical control loops and fail-safes.',
      ],
      backgroundImage: edgeComputingHwBgImage || '/assets/aistudio/image_4584775c.png',
    },
    {
      index: '05',
      title: 'High-speed connectivity',
      description:
        'Ethernet, Wi-Fi, Bluetooth, or 5G to connect devices and systems.',
      lines: [
        'Gigabit Industrial Ethernet and TSN (Time-Sensitive Networking) deterministic backbones.',
        'Ultra-reliable low-latency 5G NR private network cellular modems for remote operations.',
        'Multi-band Wi-Fi 6E/7 and high-throughput point-to-point wireless video telemetry.',
        'Redundant dual-channel CAN FD and wireless mesh radios ensuring continuous fleet link.',
      ],
      backgroundImage: connectivityHwBgImage || '/assets/aistudio/image_231fda61.png',
    },
    {
      index: '06',
      title: 'Reliable power and cooling',
      description:
        'Batteries, power management, and thermal systems for sustained operation.',
      lines: [
        'Smart lithium-iron-phosphate (LiFePO4) power packs with intelligent BMS balancing.',
        'Closed-loop active liquid cooling and vapor chamber heat-pipe dissipation systems.',
        'Dynamic thermal throttling algorithms protecting edge accelerators under peak loads.',
        'Hot-swappable dual battery bays ensuring zero-downtime mission continuous runtime.',
      ],
      backgroundImage: powerCoolingHwBgImage || '/assets/aistudio/image_68febe15.png',
    },
    {
      index: '07',
      title: 'Modular expansion',
      description:
        'Standard interfaces and ports that make components easier to replace or upgrade.',
      lines: [
        'Standardized PCIe Gen 5 / CXL interconnects and hot-pluggable blade bays.',
        'Modular sensor rails and universal quick-disconnect mechanical couplings.',
        'Open-standard backplanes allowing plug-and-play compute and accelerator upgrades.',
        'Unified bus architecture eliminating full-system teardowns during field maintenance.',
      ],
      backgroundImage: modularExpansionHwBgImage || '/assets/aistudio/image_ceb3b1a8.png',
    },
    {
      index: '08',
      title: 'Durability and safety',
      description:
        'Hardware designed to operate reliably in its intended environment.',
      lines: [
        'IP67/IP69K ingress protection against extreme dust, water jet washdowns, and chemical exposure.',
        'MIL-STD-810H shock and vibration resistant enclosures for heavy industrial mobility.',
        'Hardware-level watchdog timers and dual-channel redundant safety relays (ISO 13849 PL-e).',
        'Tamper-resistant secure enclave cryptoprocessors for authenticated firmware and hardware locking.',
      ],
      backgroundImage: durabilityHwBgImage || '/assets/aistudio/image_5312bfcd.png',
    },
  ];

  return (
    <div className="space-y-10 pt-4">
      {/* Header */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
          INNOVATION — RESEARCH, TECHNOLOGY & NEW INITIATIVES
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-stone-950 mt-2 balance-text leading-[1.12]">
          Intelligence, made tangible.
        </h1>
        <p className="text-base text-stone-600 mt-4 max-w-3xl leading-relaxed">
          Building AI-powered software and intelligent robotics hardware—from natural-language reasoning, ROS 2 communication, and digital twins to edge accelerators, advanced sensors, and modular physical systems.
        </p>
        <div className="mt-6 pt-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">
              INNOVATION LEADERSHIP:
            </span>{' '}
            <strong className="font-bold text-stone-950">
              Mukilan Muthuvalathan
            </strong>{' '}
            — Founder & CEO
          </div>
          <span className="font-mono text-stone-500">
            Moxforge Innovation Labs
          </span>
        </div>
      </section>

      {/* 01 / SOFTWARE */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div>
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
            SOFTWARE
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-1.5">
            Intelligent software stack & autonomy pipelines.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 pt-8 border-t border-stone-200">
          {softwareItems.map((item) => {
            const hasBg = Boolean(item.backgroundImage);
            return (
              <div
                key={item.index}
                style={
                  hasBg && item.backgroundImage
                    ? {
                        backgroundImage: `linear-gradient(to top, rgba(10, 16, 29, 0.95) 0%, rgba(10, 16, 29, 0.65) 55%, rgba(10, 16, 29, 0.20) 100%), url(${item.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }
                    : undefined
                }
                className={
                  hasBg
                    ? "relative p-5 rounded-xl border border-blue-500/60 bg-[#0A101D] text-white flex flex-col justify-between overflow-hidden shadow-md transition-shadow hover:shadow-lg min-h-[300px]"
                    : "p-5 rounded-xl bg-stone-50/80 border border-stone-200/80 flex flex-col justify-between min-h-[300px]"
                }
              >
                <div>
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={`font-mono text-[11px] tracking-wide font-medium ${
                        hasBg ? 'text-sky-200 drop-shadow-sm' : 'text-stone-500'
                      }`}
                    >
                      SOFTWARE
                    </span>
                  </div>
                  <h3
                    className={`font-display text-lg font-bold mt-2 ${
                      hasBg ? 'text-white drop-shadow-md' : 'text-stone-950'
                    }`}
                  >
                    {item.title}
                  </h3>
                  {item.lines ? (
                    <div className="space-y-1.5 mt-3 text-xs text-slate-100 leading-relaxed">
                      {item.lines.map((line, idx) => (
                        <p key={idx} className="flex items-start gap-1.5 drop-shadow-sm">
                          <span className="text-sky-300 font-bold shrink-0">•</span>
                          <span className="font-medium text-slate-100 drop-shadow-sm">{line}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 02 / HARDWARE */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div>
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
            HARDWARE
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-1.5">
            Robotics hardware, edge compute & physical systems.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 pt-8 border-t border-stone-200">
          {hardwareItems.map((item) => {
            const hasBg = Boolean((item as any).backgroundImage);
            const lines = (item as any).lines as string[] | undefined;
            const badgeBorder = 'border-sky-500/60';
            const accentText = 'text-sky-300';
            const subText = 'text-sky-200';
            return (
              <div
                key={item.index}
                style={
                  hasBg && (item as any).backgroundImage
                    ? {
                        backgroundImage: `linear-gradient(to top, rgba(10, 16, 29, 0.95) 0%, rgba(10, 16, 29, 0.65) 55%, rgba(10, 16, 29, 0.20) 100%), url(${(item as any).backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                      }
                    : undefined
                }
                className={
                  hasBg
                    ? `relative p-5 rounded-xl border ${badgeBorder} bg-[#0A101D] text-white flex flex-col justify-between overflow-hidden shadow-md transition-shadow hover:shadow-lg min-h-[300px]`
                    : "p-5 rounded-xl bg-stone-50/80 border border-stone-200/80 flex flex-col justify-between min-h-[300px]"
                }
              >
                <div>
                  <div className="flex items-center justify-end gap-2">
                    <span
                      className={`font-mono text-[11px] tracking-wide font-medium ${
                        hasBg
                          ? `${subText} drop-shadow-sm`
                          : 'text-stone-500'
                      }`}
                    >
                      HARDWARE
                    </span>
                  </div>
                  <h3
                    className={`font-display text-lg font-bold mt-2 ${
                      hasBg ? 'text-white drop-shadow-md' : 'text-stone-950'
                    }`}
                  >
                    {item.title}
                  </h3>
                  {lines ? (
                    <div className="space-y-1.5 mt-3 text-xs text-slate-100 leading-relaxed">
                      {lines.map((line, idx) => (
                        <p key={idx} className="flex items-start gap-1.5 drop-shadow-sm">
                          <span
                            className={`${accentText} font-bold shrink-0`}
                          >
                            •
                          </span>
                          <span className="font-medium text-slate-100 drop-shadow-sm">{line}</span>
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 03 / FROM IDEA TO INNOVATION — Submit Proposal CTA */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
            FROM IDEA TO INNOVATION
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-2">
            Every breakthrough begins as a single spark—join with us to forge your boldest ideas into living innovation.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            Whether you are architecting an experimental AI workflow, a foundational software system, or a research-driven prototype, partner with Moxforge Innovation Labs to transform raw vision into engineered reality.
          </p>
        </div>

        <div className="shrink-0">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=moxforge.innovation@gmail.com&su=Proposal%20to%20Join%20With%20Us%20—%20Idea%20into%20Innovation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0F172A] text-white text-xs sm:text-sm font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Submit Proposal ↗
          </a>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   08. COMMUNITY — Moxforge Community Organization
   ========================================================================== */
export const CommunityView: React.FC<{ onNavigate: (page: PageId) => void }> = ({
  onNavigate: _onNavigate,
}) => {
  const communityPillars = [
    {
      index: '01',
      title: 'Software & Web Development',
      description:
        'Exploring modern web applications, cloud platforms, and practical software engineering workflows together.',
    },
    {
      index: '02',
      title: 'AI & Intelligent Systems',
      description:
        'Learning and experimenting with large language models, Python programming, AI agents, and applied intelligence.',
    },
    {
      index: '03',
      title: 'Robotics & Hardware Exploration',
      description:
        'Collaborating around sensors, ROS 2 communication, edge computing, and physical automation concepts.',
    },
    {
      index: '04',
      title: 'Knowledge Sharing & Study Circles',
      description:
        'Peer-led discussions, code walkthroughs, and collaborative study sessions that make technical topics clear and approachable.',
    },
    {
      index: '05',
      title: 'Open Community Chapters & Groups',
      description:
        'Forming local and online interest groups where individuals, teams, and organizations can collaborate on shared goals.',
    },
    {
      index: '06',
      title: 'Inclusive Participation',
      description:
        'Open to all users, learners, developers, educators, and organizations—focused on curiosity, collaboration, and building forward together.',
    },
  ];

  return (
    <div className="space-y-10 pt-4">
      {/* Header */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
          COMMUNITY — MOXFORGE COMMUNITY ORGANIZATION
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-stone-950 mt-2 balance-text leading-[1.12]">
          Where ideas, builders, and shared knowledge come together.
        </h1>
        <p className="text-base text-stone-600 mt-4 max-w-3xl leading-relaxed">
          Moxforge Community is an open organization built for everyone who uses, explores, and builds with technology—bringing together developers, learners, educators, researchers, professionals, and organizations in a collaborative ecosystem.
        </p>
        <div className="mt-6 pt-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600">
          <div>
            <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">
              COMMUNITY LEADERSHIP:
            </span>{' '}
            <strong className="font-bold text-stone-950">
              Mukilan Muthuvalathan
            </strong>{' '}
            — Founder & President
          </div>
          <span className="font-mono text-stone-500">
            Moxforge Community Organization
          </span>
        </div>
      </section>

      {/* 01 / ABOUT MOXFORGE COMMUNITY */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
          ABOUT MOXFORGE COMMUNITY
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-2">
          An open ecosystem for learning, collaboration, and building.
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-stone-600 mt-4 leading-relaxed max-w-3xl">
          <p>
            <strong className="font-semibold text-stone-900">
              Moxforge Community
            </strong>{' '}
            is the open community and ecosystem arm of MOXFORGE. It is created to connect people who are curious about software, artificial intelligence, robotics, and modern internet systems—giving everyone a welcoming place to learn, share ideas, and build practical solutions together.
          </p>
          <p>
            Rather than requiring prior background or limiting participation to a single group, our community is open to all who use our platforms or want to explore technology—including students, independent developers, educators, working professionals, and partner organizations.
          </p>
        </div>
      </section>

      {/* 02 / COMMUNITY FOCUS AREAS */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <div>
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
            WHAT WE DO
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-1.5">
            How our community connects, learns, and collaborates.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pt-8 border-t border-stone-200">
          {communityPillars.map((item) => (
            <div
              key={item.index}
              className="p-5 rounded-xl bg-stone-50/80 border border-stone-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-[11px] text-stone-500 tracking-wide">
                    COMMUNITY
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-stone-950 mt-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 / COLLABORATION & PARTNERSHIP DESK */}
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
            COLLABORATION & PARTNERSHIP DESK
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-1.5">
            Submit a Proposal for Collaboration & Partnership
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
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

        <div className="shrink-0">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=moxforge.organization@gmail.com&su=Proposal%20for%20Collaboration%20%26%20Partnership"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0F172A] text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Submit Proposal ↗
          </a>
        </div>
      </section>
    </div>
  );
};

/* ==========================================================================
   08. CAREERS — Direct Candidate Application (Admin-Managed)
   ========================================================================== */
export const CareersView: React.FC = () => {
  const [adminConfig] = useState(() => loadCareerAdminConfig());
  const [formState, setFormState] = useState<CareerApplicationInput>({
    roleId:
      adminConfig.opportunityOptions[0]?.id || 'opp-moxforge-organization',
    fullName: '',
    email: '',
    affiliation: '',
    linkedinUrl: '',
    portfolioUrl: '',
    statement: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedApps, setSubmittedApps] = useState<
    SubmittedCandidateApplication[]
  >(() => loadSubmittedApplications());

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCareerApplication(formState);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }
    setFormErrors({});
    const optObj = adminConfig.opportunityOptions.find(
      (o) => o.id === formState.roleId
    );
    const roleObj = adminConfig.customRoles.find(
      (r) => r.id === formState.roleId
    );
    const resolvedTitle = optObj
      ? optObj.label
      : roleObj
        ? `${roleObj.title} (${roleObj.type})`
        : formState.roleId;

    const newEntry: SubmittedCandidateApplication = {
      ...formState,
      id: `APP-${100 + submittedApps.length + 1}`,
      roleTitle: resolvedTitle,
      submittedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      status: 'Pending',
    };
    const nextApps = [newEntry, ...submittedApps];
    setSubmittedApps(nextApps);
    saveSubmittedApplications(nextApps);
    setFormState((prev) => ({
      ...prev,
      fullName: '',
      email: '',
      affiliation: '',
      linkedinUrl: '',
      portfolioUrl: '',
      statement: '',
    }));
  };

  const hasCustomRoles = adminConfig.customRoles.length > 0;

  return (
    <div className="pt-4">
      <div
        className={
          hasCustomRoles
            ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'
            : 'max-w-2xl mx-auto'
        }
      >
        {/* Optional Admin-Published Roles (only shown if Admin added roles in #/admin) */}
        {hasCustomRoles && (
          <div className="lg:col-span-7 space-y-4">
            {adminConfig.customRoles.map((role, index) => {
              const isSelectedForApply = formState.roleId === role.id;
              return (
                <article
                  key={role.id}
                  className={`bg-white border rounded-xl p-6 transition-colors ${
                    isSelectedForApply
                      ? 'border-stone-900 ring-1 ring-stone-900'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                    <span>{role.type}</span>
                    <span aria-hidden="true">·</span>
                    <span>{role.division}</span>
                    <span aria-hidden="true">·</span>
                    <span>{role.location}</span>
                  </div>

                  <h2 className="font-display text-xl font-bold text-stone-950 mt-2">
                    {role.title}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    {role.durationOrCommitment} · {role.stipendOrComp}
                  </p>

                  <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                    {role.summary}
                  </p>

                  {role.requirements.length > 0 && (
                    <ul className="mt-4 space-y-1 text-xs text-stone-600 list-disc list-inside">
                      {role.requirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 pt-4 border-t border-stone-100 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setFormState((prev) => ({ ...prev, roleId: role.id }))
                      }
                      className="px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isSelectedForApply
                        ? 'Selected in Application Form'
                        : 'Select Role to Apply'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Direct Candidate Application Form */}
        <section
          aria-label="Submit Career or Volunteering Application"
          className={`${
            hasCustomRoles ? 'lg:col-span-5' : 'w-full'
          } bg-white border border-stone-200 rounded-xl p-6 sm:p-8`}
        >
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
            {adminConfig.formKicker}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
            {adminConfig.formTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {adminConfig.formDescription}
          </p>

          <form onSubmit={handleApplySubmit} noValidate className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="apply-role-select"
                className="block text-xs font-medium text-stone-800"
              >
                Target Opportunity
              </label>
              <select
                id="apply-role-select"
                value={formState.roleId}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, roleId: e.target.value }))
                }
                className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
              >
                {adminConfig.opportunityOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="apply-full-name"
                className="block text-xs font-medium text-stone-800"
              >
                Full Name
              </label>
              <input
                id="apply-full-name"
                type="text"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                placeholder="e.g. Aditi Verma"
                className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
              />
              {formErrors.fullName && (
                <p role="alert" className="text-xs text-red-700 mt-1">
                  {formErrors.fullName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="apply-email"
                className="block text-xs font-medium text-stone-800"
              >
                Email Address
              </label>
              <input
                id="apply-email"
                type="email"
                value={formState.email}
                onChange={(e) =>
                  setFormState((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="aditi@university.edu"
                className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
              />
              {formErrors.email && (
                <p role="alert" className="text-xs text-red-700 mt-1">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="apply-affiliation"
                className="block text-xs font-medium text-stone-800"
              >
                University or Current Organization
              </label>
              <input
                id="apply-affiliation"
                type="text"
                value={formState.affiliation}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    affiliation: e.target.value,
                  }))
                }
                placeholder="e.g. Anna University / NIT Trichy"
                className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
              />
              {formErrors.affiliation && (
                <p role="alert" className="text-xs text-red-700 mt-1">
                  {formErrors.affiliation}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="apply-linkedin"
                className="block text-xs font-medium text-stone-800"
              >
                LinkedIn Profile URL
              </label>
              <input
                id="apply-linkedin"
                type="url"
                value={formState.linkedinUrl || ''}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    linkedinUrl: e.target.value,
                  }))
                }
                placeholder="https://linkedin.com/in/username"
                className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label
                htmlFor="apply-portfolio"
                className="block text-xs font-medium text-stone-800"
              >
                GitHub / Research Portfolio URL
              </label>
              <input
                id="apply-portfolio"
                type="url"
                value={formState.portfolioUrl}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    portfolioUrl: e.target.value,
                  }))
                }
                placeholder="https://github.com/username"
                className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label
                htmlFor="apply-statement"
                className="block text-xs font-medium text-stone-800"
              >
                Technical Background & What You Want to Build
              </label>
              <textarea
                id="apply-statement"
                rows={4}
                value={formState.statement}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    statement: e.target.value,
                  }))
                }
                placeholder="Share a brief note on systems, AI models, or community initiatives you have built (minimum 20 characters)..."
                className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
              />
              {formErrors.statement && (
                <p role="alert" className="text-xs text-red-700 mt-1">
                  {formErrors.statement}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-5 py-3 sm:py-2.5 text-sm sm:text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Submit Application
            </button>
          </form>

          {submittedApps.length > 0 && (
            <div className="mt-6 pt-5 border-t border-stone-200 space-y-3">
              <h3 className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                SUBMITTED APPLICATIONS
              </h3>
              {submittedApps.map((app) => {
                const status = app.status || 'Pending';
                return (
                  <div
                    key={app.id}
                    role="status"
                    className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-stone-900">
                          {app.id} · {app.fullName}
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            status === 'Approved'
                              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60'
                              : status === 'Rejected'
                              ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700/60'
                              : 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700/60'
                          }`}
                        >
                          ● {status}
                        </span>
                      </div>
                      <p className="text-stone-600 dark:text-slate-400 mt-1">
                        Applied for <span className="font-medium text-stone-900 dark:text-slate-200">{app.roleTitle}</span> · {app.affiliation}
                      </p>
                    </div>

                    <div className="text-xs shrink-0">
                      {status === 'Approved' ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">✓ Application Accepted by Admin</span>
                      ) : status === 'Rejected' ? (
                        <span className="text-rose-700 dark:text-rose-400 font-medium">✕ Not Accepted by Admin</span>
                      ) : (
                        <span className="text-sky-700 dark:text-sky-400 font-medium">⏳ Under Review by Admin</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

/* ==========================================================================
   10. CONTACT — Business Enquiries and Partnerships
   ========================================================================== */
export const ContactView: React.FC = () => {
  const [enquiry, setEnquiry] = useState<ContactEnquiryInput>({
    fullName: '',
    email: '',
    organization: '',
    enquiryType: 'Moxforge Organization',
    timeline: 'Q1 2027',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loggedEnquiries, setLoggedEnquiries] = useState<
    SubmittedBusinessEnquiry[]
  >(() => loadSubmittedEnquiries());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateContactEnquiry(enquiry);
    if (!res.valid) {
      setErrors(res.errors);
      return;
    }
    setErrors({});
    const entry: SubmittedBusinessEnquiry = {
      ...enquiry,
      referenceCode: `MOX-ENQ-${20260 + loggedEnquiries.length + 1}`,
      submittedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      syncedToSheet: true,
      status: 'Pending',
    };
    const nextEnquiries = [entry, ...loggedEnquiries];
    setLoggedEnquiries(nextEnquiries);
    saveSubmittedEnquiries(nextEnquiries);
    setEnquiry((prev) => ({
      ...prev,
      fullName: '',
      email: '',
      organization: '',
      message: '',
    }));

    // Automatically dispatch to the owner's private Google Sheet in the background
    await dispatchEnquiryToPrivateGoogleSheet(entry);
  };

  return (
    <div className="space-y-12 pt-4">
      <section className="bg-white border border-stone-200 rounded-xl p-6 sm:p-10">
        <p className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
          CONTACT — BUSINESS ENQUIRIES & PARTNERSHIPS
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-stone-950 mt-2 balance-text">
          Initiate a digital technology pilot, software venture, or university alliance.
        </h1>
        <p className="text-base text-stone-600 mt-3 max-w-3xl leading-relaxed">
          Connect directly with MOXFORGE leadership to scope custom Information, Technology, and Internet deployments, institutional MOUs, or campus chapter sponsorships.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Direct Contact Desks */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900 text-stone-100 rounded-xl p-6 space-y-4">
            <div>
              <p className="text-xs font-mono text-blue-400 font-semibold">
                RESPONSE SLA
              </p>
              <h3 className="font-display text-base font-semibold text-white mt-1">
                Direct Engineering Triage Within 2 Business Days
              </h3>
              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                All partnership briefs are routed directly to the relevant principal engineer or division director—no generic sales queues.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800 space-y-2.5">
              <p className="text-xs font-semibold text-stone-400">Direct Email Desks:</p>
              <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-stone-800/80 border border-stone-700/80">
                <div className="truncate">
                  <p className="text-xs font-medium text-stone-200">Moxforge Innovation Labs</p>
                  <p className="text-[11px] font-mono text-stone-400 truncate">moxforge.innovation@gmail.com</p>
                </div>
                <CopyButton
                  textToCopy="moxforge.innovation@gmail.com"
                  label="Copy Email"
                  copiedLabel="✓ Copied!"
                  variant="subtle"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-stone-800/80 border border-stone-700/80">
                <div className="truncate">
                  <p className="text-xs font-medium text-stone-200">Moxforge Community Desk</p>
                  <p className="text-[11px] font-mono text-stone-400 truncate">moxforge.organization@gmail.com</p>
                </div>
                <CopyButton
                  textToCopy="moxforge.organization@gmail.com"
                  label="Copy Email"
                  copiedLabel="✓ Copied!"
                  variant="subtle"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Enquiry & Partnership Intake Form */}
        <section
          aria-label="Business Enquiry Form"
          className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 sm:p-8"
        >
          <h2 className="font-display text-2xl font-bold text-stone-950">
            Submit a Business or Partnership Enquiry
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Complete the brief below to receive a tailored technical scope and call schedule.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-full-name"
                  className="block text-xs font-medium text-stone-800"
                >
                  Full Name
                </label>
                <input
                  id="contact-full-name"
                  type="text"
                  value={enquiry.fullName}
                  onChange={(e) =>
                    setEnquiry((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="Hariprasath"
                  className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
                />
                {errors.fullName && (
                  <p role="alert" className="text-xs text-red-700 mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-stone-800"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={enquiry.email}
                  onChange={(e) =>
                    setEnquiry((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="hariprasath@organization.org"
                  className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
                />
                {errors.email && (
                  <p role="alert" className="text-xs text-red-700 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-organization"
                  className="block text-xs font-medium text-stone-800"
                >
                  Company, Institution or Organization
                </label>
                <input
                  id="contact-organization"
                  type="text"
                  value={enquiry.organization}
                  onChange={(e) =>
                    setEnquiry((prev) => ({
                      ...prev,
                      organization: e.target.value,
                    }))
                  }
                  placeholder="Helios Grid / IIT Madras"
                  className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
                />
                {errors.organization && (
                  <p role="alert" className="text-xs text-red-700 mt-1">
                    {errors.organization}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-enquiry-type"
                  className="block text-xs font-medium text-stone-800"
                >
                  Partnership Track
                </label>
                <select
                  id="contact-enquiry-type"
                  value={enquiry.enquiryType}
                  onChange={(e) =>
                    setEnquiry((prev) => ({
                      ...prev,
                      enquiryType:
                        e.target.value as ContactEnquiryInput['enquiryType'],
                    }))
                  }
                  className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
                >
                  <option value="Moxforge Organization">
                    Moxforge Organization
                  </option>
                  <option value="Moxforge Innovation">
                    Moxforge Innovation
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-medium text-stone-800"
              >
                Project Scope, Objectives & Technical Requirements
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={enquiry.message}
                onChange={(e) =>
                  setEnquiry((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Outline your target deployment environment, partnership goals, or institutional collaboration scope (at least 20 characters)..."
                className="mt-1 w-full px-3 py-2.5 sm:py-2 text-base sm:text-xs bg-stone-50 border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900"
              />
              {errors.message && (
                <p role="alert" className="text-xs text-red-700 mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-3 sm:py-2.5 text-sm sm:text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Dispatch Business Enquiry
            </button>
          </form>

          {loggedEnquiries.length > 0 && (
            <div className="mt-6 pt-5 border-t border-stone-200 space-y-3">
              <h3 className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                DISPATCHED ENQUIRIES
              </h3>
              {loggedEnquiries.map((item) => {
                const status = item.status || 'Pending';
                return (
                  <div
                    key={item.referenceCode}
                    role="status"
                    className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-stone-900">
                          {item.referenceCode} · {item.organization} ({item.enquiryType})
                        </p>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                            status === 'Approved'
                              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60'
                              : status === 'Rejected'
                              ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700/60'
                              : 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700/60'
                          }`}
                        >
                          ● {status}
                        </span>
                      </div>
                      <p className="text-stone-600 dark:text-slate-400 mt-1">
                        Submitted by {item.fullName} ({item.email}) — Routed to MOXFORGE Partnerships Desk.
                      </p>
                    </div>

                    <div className="text-xs text-stone-500 dark:text-slate-400 shrink-0">
                      {status === 'Approved' ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">✓ Proposal Accepted by Admin</span>
                      ) : status === 'Rejected' ? (
                        <span className="text-rose-700 dark:text-rose-400 font-medium">✕ Not Accepted by Admin</span>
                      ) : (
                        <span className="text-sky-700 dark:text-sky-400 font-medium">⏳ Under Review by Admin</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
