import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Plus, Minus, ArrowUpRight, Cpu, Zap, Activity, Terminal, MessageSquare, Sparkles, Wand2, ArrowDown, GitCommit, GitPullRequest, Box, TrendingUp, Handshake, Hammer, Target, Monitor, Bot, Mail, CheckCircle } from 'lucide-react';
import { ShaderBackground } from './components/ShaderBackground';

/**
 * =============================================================================
 * 🔑 GEMINI API CONFIGURATION
 * =============================================================================
 */
const apiKey = ""; // API Key injected by environment

/**
 * =============================================================================
 * 🎛️ EDITABLE CONFIGURATION (EDIT ME!)
 * * Updated to match MlBrandKit - sophisticated dark mode with silver/gray tones.
 * * Colors: #090A09 (background), #D6D6DE (primary), #1A1B1A (secondary), #737373 (muted)
 * =============================================================================
 */

const theme = {
  colors: {
    bg: "bg-[#090A09]", // Brand Kit - Near Black
    textPrimary: "text-[#D6D6DE]", // Brand Kit - Silver/Light Gray
    textSecondary: "text-[#737373]", // Brand Kit - Muted Gray
    accent: "text-[#D6D6DE]", // Brand Kit - Primary as accent
    accentBg: "bg-[#D6D6DE]",
    accentBorder: "border-[#D6D6DE]",
    gridLine: "border-[#1A1B1A]", // Brand Kit - Dark gray separation
  },
  typography: {
    fontDisplay: "font-sans font-medium tracking-tight", // Brand Kit - Medium weight
    fontTech: "font-mono uppercase tracking-normal",
    h1Size: "text-6xl md:text-8xl lg:text-[10rem] leading-[0.85]", // Tighter line-height
    h2Size: "text-4xl md:text-6xl lg:text-7xl leading-[0.9]",
    h3Size: "text-2xl md:text-3xl",
  },
  spacing: {
    sectionPadding: "py-24 md:py-32", // Tighter padding like Rise at Seven
    containerPadding: "px-6 md:px-8 lg:px-12",
  }
};

const content = {
  nav: {
    logo: "Material Lab",
    links: ["Capabilities", "Work", "The Blueprint", "Field Notes"],
    cta: "Book a Strategy Call",
  },
  hero: {
    headline: "Your extended AI product team—from idea to shipped system.",
    subheadline: "Material Lab is an AI-native product studio that works like an extended tech team. We build and integrate LLM-powered workflows, apps, and GTM systems that increase revenue, save hours, and reduce errors.",
    subheadlineHighlight: "Typical wins: instant internal copilots, 40–70% fewer manual ops steps, faster lead-to-close.",
    cta: "See The Work",
    ctaSecondary: "How We Work"
  },
  marquee: {
    items: ["Metric-Obsessed", "Zero Bloat", "100% IP Ownership", "Metric-Obsessed", "Zero Bloat"],
  },
  aboutUs: {
    mission: "We started Material Lab to make high-quality software accessible to teams without in-house tech. Clear logic, fast releases, and the care of a real partner.",
  },
  capabilities: {
    title: "Engineering Intelligence",
    items: [
      {
        id: 1,
        title: "Intelligent Ops",
        icon: Cpu,
        desc: "We embed LLMs and autonomous agents into your existing stack to handle the heavy lifting.",
      },
      {
        id: 2,
        title: "Generative Interfaces",
        icon: Monitor,
        desc: "Stop building static websites. We build adaptive interfaces that convert.",
      },
      {
        id: 3,
        title: "Growth Engineering",
        icon: TrendingUp,
        desc: "Scale your sales engine without scaling your sales team.",
      },
    ],
  },
  howWeWork: {
    title: "How We Work",
    steps: [
      {
        phase: "Step 01",
        title: "Talk → Touch",
        desc: "You share the goal and how your team works. We map the workflow, define the metric, and prototype in days. No decks! You get a working demo + a clear rollout plan.",
        icon: MessageSquare
      },
      {
        phase: "Step 02",
        title: "Evidence → Ship",
        desc: "We ship only when the metric moves (revenue, hours saved, error rate, conversion). If we can't link output to outcome, we don't build it.",
        icon: TrendingUp
      }
    ]
  },
  whyChooseUs: {
    title: "Why Teams Choose Us",
    items: [
      { icon: Handshake, title: "Small team, real partnership", desc: "You get senior builders working directly with you. No layers. No bloat." },
      { icon: Hammer, title: "Built for your workflow", desc: "Everything we build is designed around how your team actually works, not a generic tool." },
      { icon: Target, title: "Metric-first delivery", desc: "We don't sell features. We ship what improves a measurable outcome." },
      { icon: Monitor, title: "Production, not prototypes", desc: "We don't stop at a demo. We handle evals, roll-out, and reliability until the system is truly used." },
      { icon: Bot, title: "AI where it counts", desc: "We integrate LLMs + agents only when they reduce cost, time, or complexity." },
    ]
  },
  finePrint: {
    title: "The Fine Print",
    items: [
      // Terms of Engagement
      { key: "Model", value: "Fixed-cost, fixed-scope delivery (The Material Lab Standard)." },
      { key: "Pricing", value: "You get a fixed-price proposal after our first chat. Clear investment, clear return." },
      { key: "Timeline", value: "Small Tools: 1–2 Weeks. Platforms: ~3 Months. Includes complimentary bug support + optional maintenance post-launch." },
      { key: "IP Ownership", value: "You own 100% of all intellectual property, source code, and data. You do." },

      // Existing items maintained
      { key: "Team Structure", value: "Small, senior teams (1-2 builders) working directly with your key stakeholders. No juniors, no account managers." },
      { key: "Success Criteria", value: "Success is measured by pre-defined, measurable metrics (e.g., +15% revenue, -40% error rate, -30 hours/week in ops)." },
      { key: "Our Guarantee", value: "If we don't hit the agreed-upon metric, we rework the system at no additional cost." },
    ]
  },
  work: {
    title: "Evidence",
    cases: [
      { id: 1, client: "JB Singh", title: "Logistics Autopilot", metric: "-40% Dispatch Errors" },
      { id: 2, client: "Perhitsiksha", title: "Adaptive Learning", metric: "Custom Algo Build" },
      { id: 3, client: "CargoSphere", title: "Global GTM Arch", metric: "End-to-End Foundation" },
    ],
  },
  footer: {
    headline: "Ready to Move a Metric?",
    cta: "Book a metric call",
    tagline: "Bring one problem. Leave with a build plan.",
    contact: {
      email: "damini@materiallab.io",
      socials: [
        { name: "Whatsapp", url: "#" },
        { name: "LinkedIn", url: "#" },
        { name: "X/Twitter", url: "#" },
        { name: "GitHub", url: "#" },
        { name: "Blog", url: "#" },
      ]
    },
    copyright: "© 2025 Material Lab. Building delightful things for good people."
  }
};

/**
 * =============================================================================
 * 🧠 GEMINI LOGIC (Retained for future feature use, but components removed)
 * =============================================================================
 */

interface AgentBlueprint {
  agentName: string;
  oneLinePitch: string;
  coreCapabilities: string[];
  estimatedImpact: string;
}

const generateAgentBlueprint = async (userProblem: string): Promise<AgentBlueprint> => {
  const systemPrompt = `You are the Lead Solutions Architect at Material Lab. Analyze a bottleneck and propose an AI Agent. Output JSON: agentName, oneLinePitch, coreCapabilities (array), estimatedImpact.`;

  if (!apiKey) {
    await new Promise(r => setTimeout(r, 2000));
    return {
      agentName: "Nexus Flow v1",
      oneLinePitch: "Autonomous data reconciliation engine.",
      coreCapabilities: ["Pattern Matching", "Auto-Correction", "ERP Sync"],
      estimatedImpact: "90% Reduction in Manual Entry"
    };
  }

  const payload = {
    contents: [{ parts: [{ text: `The user has this operational bottleneck: "${userProblem}". Design an AI Agent solution.` }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: { responseMimeType: "application/json" }
  };

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(text);
};

/**
 * =============================================================================
 * 🧩 UI COMPONENTS
 * =============================================================================
 */

// Custom cursor updated to use the new accent color
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updatePosition);

    const handleMouseOver = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('button, a, input, textarea, .hover-trigger')) {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
        window.removeEventListener('mousemove', updatePosition);
        window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-exclusion transition-all duration-150 ease-out hidden md:block"
      // Updated color to brand kit silver
      style={{ left: position.x, top: position.y, transform: `translate(-50%, -50%) scale(${isHovering ? 4 : 1})`, width: '20px', height: '20px', backgroundColor: '#D6D6DE', borderRadius: '50%' }}
    />
  );
};

// Simplified button for clean, high-contrast aesthetic (replacing the magnetic effect)
const HighContrastButton = ({ children, className = "", variant = "primary", onClick, disabled, href }: { children: React.ReactNode, className?: string, variant?: "primary" | "secondary" | "accent", onClick?: () => void, disabled?: boolean, href?: string }) => {

  const baseStyles = "group px-8 py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-block text-center text-sm md:text-base cursor-pointer rounded-sm";

  // High-contrast variants matching brand kit aesthetic
  const variants = {
    primary: `border border-[#D6D6DE] text-[#D6D6DE] hover:bg-[#D6D6DE] hover:border-transparent hover:text-[#090A09] font-medium`,
    secondary: `border border-[#1A1B1A] text-[#737373] hover:border-[#D6D6DE] hover:text-[#D6D6DE]`,
    accent: `bg-[#D6D6DE] text-[#090A09] border border-[#D6D6DE] hover:bg-white hover:border-white font-medium`
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${theme.typography.fontDisplay}`}
    >
      <span className={`relative z-10 block`}>
        {children}
      </span>
    </Component>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#090A09]/90 backdrop-blur-sm py-4' : 'py-6'} border-b ${scrolled ? 'border-[#D6D6DE]/10' : 'border-transparent'}`}>
      <div className={`container mx-auto flex justify-between items-center ${theme.spacing.containerPadding}`}>
        <div className={`${theme.typography.fontDisplay} text-xl font-medium tracking-tighter z-50 relative`}>
          {content.nav.logo}
        </div>
        <div className="hidden lg:flex gap-10 items-center">
            {content.nav.links.map(link => (
                <a key={link} href="#" className={`${theme.typography.fontDisplay} text-sm text-[#737373] hover:text-[#D6D6DE] transition-colors uppercase font-medium`}>
                    {link}
                </a>
            ))}
        </div>
        <div className="hidden lg:flex items-center gap-4">
            <HighContrastButton className="!py-2.5 !px-6 !text-sm" variant="accent">
              {content.nav.cta}
            </HighContrastButton>
        </div>
        <button className="lg:hidden z-50 text-[#D6D6DE]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
        </button>
        {mobileMenuOpen && (
            <div className="fixed inset-0 bg-[#090A09] z-40 flex flex-col items-center justify-center gap-8">
                {content.nav.links.map(link => (
                    <a key={link} href="#" className={`${theme.typography.fontDisplay} text-4xl`}>{link}</a>
                ))}
                <div className="mt-8">
                    <HighContrastButton variant="accent">
                        {content.nav.cta}
                    </HighContrastButton>
                </div>
            </div>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className={`min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden ${theme.spacing.containerPadding} pt-32`}>
      {/* Shader gradient background */}
      <ShaderBackground className="z-0" opacity={0.4} />

      <div className="relative z-10 max-w-7xl flex flex-col items-center">
        <h1 className={`${theme.typography.h1Size} ${theme.typography.fontDisplay} mb-12`}>
            {content.hero.headline.split(" ").map((word, i) => (
                <span key={i} className="inline-block hover:text-white transition-colors duration-300 cursor-default">{word} </span>
            ))}
        </h1>

        <div className="max-w-3xl mx-auto mb-16 space-y-6">
            <p className={`${theme.typography.fontTech} ${theme.colors.textSecondary} text-sm md:text-base leading-relaxed`}>
            {content.hero.subheadline}
            </p>
            <p className={`${theme.typography.fontTech} ${theme.colors.accent} text-xs md:text-sm border-l-2 ${theme.colors.accentBorder} pl-4 text-left`}>
                {content.hero.subheadlineHighlight}
            </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
            <HighContrastButton variant="primary" href="#work">{content.hero.cta}</HighContrastButton>
            <HighContrastButton variant="secondary" href="#how-we-work">{content.hero.ctaSecondary}</HighContrastButton>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className={`w-full overflow-hidden bg-[#090A09] border-y ${theme.colors.gridLine} py-6 md:py-10`}>
      <div className="whitespace-nowrap flex animate-marquee">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0">
            {content.marquee.items.map((item, idx) => (
              <span key={idx} className={`${theme.typography.fontDisplay} text-6xl md:text-8xl px-8 text-transparent stroke-text hover:text-[#D6D6DE] transition-colors cursor-default`}>
                {item} •
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`
        /* Updated stroke-text for brand kit colors */
        .stroke-text { -webkit-text-stroke: 1px #D6D6DE; }
        .stroke-text:hover { -webkit-text-stroke: 1px white; color: white; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
};

const AboutUs = () => (
    <section className={`border-t ${theme.colors.gridLine} bg-[#1A1B1A]/20 relative overflow-hidden`}>
        {/* Subtle shader gradient */}
        <ShaderBackground className="z-0" opacity={0.15} />
        <div className={`container mx-auto ${theme.spacing.containerPadding} py-24 relative z-10`}>
            <div className="max-w-4xl mx-auto text-center">
                <p className={`${theme.typography.fontDisplay} text-4xl md:text-6xl font-medium text-[#D6D6DE] leading-tight`}>
                    {content.aboutUs.mission}
                </p>
            </div>
        </div>
    </section>
);


const Capabilities = () => {
    return (
        <section className={`py-32 md:py-40 ${theme.spacing.containerPadding} container mx-auto`}>
            <div className="flex items-end justify-between mb-20 border-b border-[#D6D6DE]/20 pb-4">
                 <h2 className={`${theme.typography.fontTech} text-sm text-[#737373]`}>01 // Services</h2>
                 <h2 className={`${theme.typography.fontDisplay} ${theme.typography.h2Size}`}>{content.capabilities.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.capabilities.items.map((item) => (
                    <div
                        key={item.id}
                        className="group p-8 bg-[#1A1B1A]/50 border border-[#1A1B1A] hover:border-[#D6D6DE]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(214,214,222,0.1)] rounded-lg"
                    >
                        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#1A1B1A] bg-[#1A1B1A] text-[#D6D6DE] group-hover:scale-110 transition-transform duration-300">
                            <item.icon size={24} />
                        </div>
                        <h3 className={`${theme.typography.fontDisplay} text-2xl mb-4 group-hover:text-white transition-colors duration-300`}>
                            {item.title}
                        </h3>
                        <p className={`${theme.colors.textSecondary} text-sm leading-relaxed`}>
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const HowWeWork = () => {
  return (
    <section id="how-we-work" className={`py-32 md:py-40 border-t ${theme.colors.gridLine} bg-[#1A1B1A]/30`}>
      <div className={`container mx-auto ${theme.spacing.containerPadding}`}>
        <div className="flex items-end justify-between mb-24 border-b border-[#D6D6DE]/20 pb-4">
            <h2 className={`${theme.typography.fontTech} text-sm text-[#737373]`}>02 // Methodology</h2>
            <h2 className={`${theme.typography.fontDisplay} ${theme.typography.h2Size}`}>{content.howWeWork.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">

          {/* Connector Line - Updated to brand kit color */}
          <div className="hidden md:block absolute top-8 left-[25%] w-[50%] h-px bg-gradient-to-r from-transparent via-[#D6D6DE] to-transparent opacity-30"></div>

          {content.howWeWork.steps.map((step, i) => (
             <div key={i} className="relative pt-16 group flex flex-col items-start md:items-center text-left md:text-center">
                {/* Node Point - Updated to brand kit color */}
                <div className={`absolute top-[28px] left-0 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-[#090A09] border border-[#D6D6DE] z-10 group-hover:bg-[#D6D6DE] group-hover:border-[#D6D6DE] transition-colors duration-300`}></div>

                <div className="border-l md:border-l-0 border-[#D6D6DE]/10 pl-8 md:pl-0 w-full max-w-lg">
                   {/* Icon background/border updated */}
                   <div className={`mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#1A1B1A] bg-[#1A1B1A] text-[#D6D6DE] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(214,214,222,0.1)]`}>
                      <step.icon size={24} />
                   </div>

                   <div className="space-y-3">
                      <h4 className={`${theme.typography.fontTech} ${theme.colors.accent} text-sm uppercase tracking-wider`}>
                        {step.phase}
                      </h4>
                      <h3 className={`${theme.typography.fontDisplay} text-3xl`}>{step.title}</h3>
                      <p className={`${theme.colors.textSecondary} text-base leading-relaxed`}>{step.desc}</p>
                   </div>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Work = () => {
    return (
        <section id="work" className={`border-t ${theme.colors.gridLine} overflow-hidden scroll-mt-20`}>
             <div className={`${theme.spacing.containerPadding} py-8 border-b ${theme.colors.gridLine}`}>
                <h2 className={`${theme.typography.fontTech} text-sm text-[#737373]`}>03 // Evidence</h2>
             </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide py-20 px-4 md:px-0">
                <div className="flex gap-8 md:gap-16 px-4 md:px-16">
                    <div className="hidden md:flex items-center justify-center w-24 shrink-0">
                        <span className={`${theme.typography.fontDisplay} text-6xl -rotate-90 whitespace-nowrap text-[#1A1B1A]`}>
                            Selected Work
                        </span>
                    </div>

                    {content.work.cases.map((project) => (
                        <div key={project.id} className="snap-center shrink-0 w-[90vw] md:w-[600px] group hover-trigger">
                            {/* Updated card size and aspect ratio for higher visual impact */}
                            <div className="aspect-[4/3] bg-[#1A1B1A] border border-[#1A1B1A] relative overflow-hidden mb-6 group-hover:border-[#D6D6DE]/50 transition-colors duration-300 rounded-lg">
                                <div className="absolute inset-0 flex flex-col items-start justify-end p-8 z-20">
                                    {/* Massive, aggressive project title */}
                                    <span
                                        className={`${theme.typography.fontDisplay} text-8xl md:text-[10rem] text-transparent stroke-text group-hover:text-white transition-colors leading-[0.8] whitespace-nowrap`}
                                        style={{
                                            WebkitTextStroke: '2px #D6D6DE',
                                            WebkitTextFillColor: 'transparent',
                                            transition: 'all 300ms ease-in-out'
                                        }}
                                    >
                                        Project {String(project.id).padStart(2, '0')}
                                    </span>
                                    {/* Secondary project title for clarity */}
                                    <span className={`${theme.typography.fontDisplay} text-4xl text-[#D6D6DE] mt-4`}>{project.title}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#090A09]/80 to-transparent opacity-100 z-10"></div>
                                {/* Placeholder content for visual interest */}
                                <div className="absolute top-0 right-0 p-4 z-20">
                                    <span className={`${theme.typography.fontTech} text-xs text-[#737373]`}>Client: {project.client}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className={`${theme.typography.h3Size} ${theme.typography.fontDisplay} group-hover:underline decoration-[#D6D6DE] underline-offset-8 decoration-2`}>
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                     <ArrowUpRight className={`${theme.colors.accent} w-5 h-5`} />
                                     <span className={`${theme.typography.fontTech} ${theme.colors.accent}`}>
                                        {project.metric}
                                     </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-16 shrink-0"></div>
                </div>
            </div>
        </section>
    );
};


const WhyTeamsChooseUs = () => (
    <section className={`container mx-auto ${theme.spacing.containerPadding} py-32 md:py-40 border-t ${theme.colors.gridLine}`}>
        <div className="text-center mb-20 border-b border-[#D6D6DE]/20 pb-4">
            <h2 className={`${theme.typography.fontDisplay} ${theme.typography.h2Size}`}>{content.whyChooseUs.title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {content.whyChooseUs.items.map((item,i) => (
                <div key={i} className="group p-6 border border-[#1A1B1A] flex flex-col items-start bg-[#1A1B1A]/50 hover:bg-[#1A1B1A]/80 hover:border-[#D6D6DE]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(214,214,222,0.08)] rounded-lg">
                    {/* Icon color update */}
                    <item.icon className={`w-8 h-8 ${theme.colors.accent} mb-4 group-hover:scale-110 transition-transform duration-300`}/>
                    <h4 className="font-medium mb-2 font-mono text-sm uppercase group-hover:text-white transition-colors duration-300">{item.title}</h4>
                    <p className="text-[#737373] text-xs leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

const FinePrintSection = () => (
    <section className={`${theme.spacing.containerPadding} py-32 md:py-40 border-t ${theme.colors.gridLine}`}>
        <div className="container mx-auto">
            <div className="text-center mb-16">
                <h2 className={`${theme.typography.fontDisplay} ${theme.typography.h2Size}`}>{content.finePrint.title}</h2>
            </div>

            {/* Accent color update for border/shadow */}
            <div className={`max-w-4xl mx-auto border-2 border-dashed ${theme.colors.accentBorder} bg-[#090A09] p-6 md:p-12 shadow-[0_0_50px_rgba(214,214,222,0.1)] rounded-lg`}>
                <div className="space-y-6">
                    {content.finePrint.items.map((item, i) => (
                        <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 border-b border-[#1A1B1A] pb-3">
                            {/* Accent color update */}
                            <div className={`col-span-1 ${theme.typography.fontTech} text-sm ${theme.colors.accent} uppercase`}>
                                <CheckCircle className='inline w-4 h-4 mr-2 align-text-bottom'/>
                                {item.key}:
                            </div>
                            <div className="col-span-3 font-mono text-sm text-[#D6D6DE] leading-relaxed">
                                {item.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);


const Footer = () => (
    <footer className="bg-[#1A1B1A] text-[#D6D6DE] py-24 border-t border-[#1A1B1A] relative overflow-hidden">
        {/* Shader gradient for CTA area */}
        <ShaderBackground className="z-0" opacity={0.2} />
        <div className={`container mx-auto ${theme.spacing.containerPadding} relative z-10`}>
            {/* CTA Section */}
            <div className="text-center mb-20">
                <h2 className={`${theme.typography.fontDisplay} text-5xl md:text-7xl mb-8 leading-none`}>
                    {content.footer.headline}
                </h2>
                <p className={`${theme.typography.fontTech} text-[#737373] text-sm mb-10 max-w-lg mx-auto`}>
                    {content.footer.tagline}
                </p>
                <HighContrastButton
                    variant="accent"
                    href={`mailto:${content.footer.contact.email}`}
                >
                    {content.footer.cta}
                </HighContrastButton>
            </div>

            {/* Multi-column Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 border-t border-[#090A09]">
                {/* Column 1: Services */}
                <div>
                    <h4 className={`${theme.typography.fontTech} text-sm ${theme.colors.accent} mb-6`}>Services</h4>
                    <ul className="space-y-3">
                        <li><a href="#" className="text-[#737373] hover:text-white transition-colors text-sm">Intelligent Ops</a></li>
                        <li><a href="#" className="text-[#737373] hover:text-white transition-colors text-sm">Generative Interfaces</a></li>
                        <li><a href="#" className="text-[#737373] hover:text-white transition-colors text-sm">Growth Engineering</a></li>
                    </ul>
                </div>

                {/* Column 2: Work */}
                <div>
                    <h4 className={`${theme.typography.fontTech} text-sm ${theme.colors.accent} mb-6`}>Work</h4>
                    <ul className="space-y-3">
                        <li><a href="#work" className="text-[#737373] hover:text-white transition-colors text-sm">Case Studies</a></li>
                        <li><a href="#" className="text-[#737373] hover:text-white transition-colors text-sm">The Blueprint</a></li>
                        <li><a href="#" className="text-[#737373] hover:text-white transition-colors text-sm">Field Notes</a></li>
                    </ul>
                </div>

                {/* Column 3: Contact */}
                <div>
                    <h4 className={`${theme.typography.fontTech} text-sm ${theme.colors.accent} mb-6`}>Contact</h4>
                    <ul className="space-y-3">
                        <li>
                            <a href={`mailto:${content.footer.contact.email}`} className="text-[#737373] hover:text-white transition-colors text-sm flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                {content.footer.contact.email}
                            </a>
                        </li>
                        <li className="pt-4">
                            <div className="flex gap-4">
                                {content.footer.contact.socials.map(social => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        className="text-[#737373] hover:text-white transition-colors text-xs"
                                    >
                                        {social.name}
                                    </a>
                                ))}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-[#090A09]">
                <p className={`${theme.typography.fontTech} text-xs text-[#737373] text-center`}>
                    {content.footer.copyright}
                </p>
            </div>
        </div>
    </footer>
);

const App = () => {
  return (
    <div className={`${theme.colors.bg} ${theme.colors.textPrimary} min-h-screen selection:bg-[#D6D6DE] selection:text-[#090A09] cursor-crosshair scroll-smooth`}>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <AboutUs />
        <Capabilities />
        <HowWeWork />
        <Work />
        <WhyTeamsChooseUs />
        <FinePrintSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
