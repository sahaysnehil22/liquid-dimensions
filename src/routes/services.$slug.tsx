import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AuroraBackground, AtmosphereProvider, ChapterLabel, SplitReveal, LiquidButton } from "@/components/experience";

type Service = {
  slug: string;
  name: string;
  kind: string;
  accent: string;
  tagline: string;
  intro: string;
  what: string[];
  how: string;
  deliverables: string[];
};

const SERVICES: Record<string, Service> = {
  development: {
    slug: "development",
    name: "Development",
    kind: "Crystalline",
    accent: "var(--aurora-2)",
    tagline: "Engineering that carries the weight of the design.",
    intro:
      "We build performant, modern web applications with TypeScript, React, and edge-native infrastructure. Every millisecond is a design decision.",
    what: [
      "Web applications, marketing sites, and internal tools",
      "Headless commerce and CMS integrations",
      "Edge-deployed APIs and server functions",
      "Design system engineering with a11y baked in",
    ],
    how: "We work in short, focused sprints with the same engineer from prototype to production. No handoffs, no lost intent.",
    deliverables: [
      "Production codebase with CI/CD",
      "Component library and design tokens",
      "Performance and accessibility audit",
      "Handover documentation and pairing sessions",
    ],
  },
  "ai-automations": {
    slug: "ai-automations",
    name: "AI Automations",
    kind: "Liquid",
    accent: "var(--aurora-4)",
    tagline: "Autonomous workflows that give hours back to your team.",
    intro:
      "We design and ship AI-native automations — from inbox triage to full multi-step agents — that plug into the tools your team already uses.",
    what: [
      "Custom AI agents and multi-step workflows",
      "Document intelligence: parse, classify, extract",
      "Voice, chat, and internal copilots",
      "CRM, ticketing, and ops pipeline automation",
    ],
    how: "Discovery workshop → thin end-to-end prototype in week one → production rollout with human-in-the-loop review baked in.",
    deliverables: [
      "Deployed automation with monitoring",
      "Evaluation harness with quality gates",
      "Runbook and cost dashboard",
      "Team training and prompt library",
    ],
  },
  "web-design": {
    slug: "web-design",
    name: "Web Design",
    kind: "Metallic",
    accent: "var(--aurora-1)",
    tagline: "Sites that carry a point of view the moment they load.",
    intro:
      "We design brand-first websites where typography, motion, and copy pull in the same direction. Every screen earns its space.",
    what: [
      "Marketing sites and portfolios",
      "Design systems and component libraries",
      "Editorial layouts and long-form storytelling",
      "Landing pages tuned to convert",
    ],
    how: "We start with the message, not the moodboard. Wireframes become high-fidelity in-browser prototypes you can actually feel.",
    deliverables: [
      "Figma system and page designs",
      "Interactive prototype",
      "Copy direction and content model",
      "Handoff to engineering (or built by us)",
    ],
  },
  "lead-generation": {
    slug: "lead-generation",
    name: "Lead Generation",
    kind: "Orbital",
    accent: "var(--aurora-3)",
    tagline: "A pipeline that fills itself while you sleep.",
    intro:
      "We design outbound and inbound systems that identify, enrich, and qualify prospects — then deliver only the ones worth a conversation.",
    what: [
      "Outbound engines with enrichment and AI qualification",
      "Landing pages and lead magnets that convert",
      "CRM integration and lifecycle automation",
      "Reporting dashboards for pipeline and cost per lead",
    ],
    how: "We audit your current funnel, ship a minimum viable pipeline in weeks, then tune weekly against real conversation quality — not vanity clicks.",
    deliverables: [
      "Live outbound and inbound systems",
      "Enriched prospect database",
      "CRM pipeline and playbooks",
      "Weekly performance review",
    ],
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `KRYNEX STUDIO — ${loaderData.service.name}` },
          { name: "description", content: loaderData.service.tagline },
          { property: "og:title", content: `KRYNEX STUDIO — ${loaderData.service.name}` },
          { property: "og:description", content: loaderData.service.tagline },
        ]
      : [{ title: "KRYNEX STUDIO — Service" }, { name: "robots", content: "noindex" }],
  }),
  component: ServiceDetail,
  notFoundComponent: () => (
    <AtmosphereProvider>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-display text-5xl">Service not found</h1>
        <Link to="/" className="text-eyebrow underline">← Back home</Link>
      </div>
    </AtmosphereProvider>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  return (
    <AtmosphereProvider>
      <div className="relative min-h-screen">
        <AuroraBackground />
        <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5">
          <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-tight" data-cursor="hover">
            <img src={krynexLogo.url} alt="KRYNEX Studio" className="h-11 w-auto object-contain" style={{ mixBlendMode: "screen" }} />
          </Link>
          <Link to="/" hash="services" className="text-eyebrow hover:text-foreground transition-colors">
            ← All services
          </Link>
        </header>

        <section className="relative px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <div className="max-w-6xl mx-auto">
            <ChapterLabel n="◆" title={service.kind} />
            <h1 className="text-display text-[clamp(3rem,10vw,8rem)] mt-6 leading-[0.95]">
              <SplitReveal text={service.name} />
            </h1>
            <p className="mt-8 max-w-2xl text-xl md:text-2xl font-display italic text-foreground/80">
              {service.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-foreground/70 leading-relaxed">
              {service.intro}
            </p>
          </div>
        </section>

        <section className="relative px-6 md:px-10 pb-20">
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
            <div className="liquid rounded-3xl p-8 md:p-10">
              <div className="text-eyebrow mb-6">What we do</div>
              <ul className="space-y-4">
                {service.what.map((line: string) => (
                  <li key={line} className="flex gap-3 text-lg">
                    <span className="text-foreground/40">◆</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="liquid rounded-3xl p-8 md:p-10">
              <div className="text-eyebrow mb-6">How we work</div>
              <p className="text-xl md:text-2xl font-display leading-snug">{service.how}</p>
            </div>
          </div>
        </section>

        <section className="relative px-6 md:px-10 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-eyebrow mb-6">What you'll receive</div>
            <div className="grid gap-4 md:grid-cols-2">
              {service.deliverables.map((d: string, i: number) => (
                <div key={d} className="liquid rounded-2xl p-6 flex items-baseline gap-4">
                  <span className="text-display text-3xl opacity-40 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative px-6 md:px-10 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-5xl md:text-7xl">Interested in {service.name.toLowerCase()}?</h2>
            <div className="mt-10 flex justify-center gap-4">
              <LiquidButton onClick={() => (window.location.href = "/#contact")}>
                Start a conversation →
              </LiquidButton>
            </div>
          </div>
        </section>
      </div>
    </AtmosphereProvider>
  );
}
