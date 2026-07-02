import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AuroraBackground, AtmosphereProvider, ChapterLabel, SplitReveal, LiquidButton } from "@/components/experience";
import paperfellowsHero from "@/assets/paperfellows-hero.png.asset.json";
import cryptosimHero from "@/assets/cryptosim-hero.png.asset.json";

const HERO_IMAGES: Record<string, { url: string; alt: string; href?: string }> = {
  paperfellows: { url: paperfellowsHero.url, alt: "PaperFellows storefront", href: "https://paperfellows.vercel.app/" },
  cryptosim: { url: cryptosimHero.url, alt: "CryptoSim trading interface" },
};

type Project = {
  slug: string;
  title: string;
  category: string;
  tags: string;
  accent: string;
  year: string;
  role: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
};

const PROJECTS: Record<string, Project> = {
  paperfellows: {
    slug: "paperfellows",
    title: "PaperFellows",
    category: "Luxury Design",
    tags: "Brand · E-commerce · Motion",
    accent: "var(--aurora-1)",
    year: "2025",
    role: "Brand system, storefront design, motion direction",
    summary:
      "A boutique stationery house asked us to translate their tactile craft into a digital storefront that felt as considered as the paper itself.",
    challenge:
      "Their existing store treated products like SKUs. We needed to slow the experience down and let each collection breathe — without slowing the checkout.",
    approach:
      "We built a modular editorial system around a single grid, paired restrained typography with slow, weight-shifting motion, and rebuilt the storefront on a headless stack tuned for sub-second navigation.",
    outcome:
      "The relaunch tripled average session time and doubled conversion on the flagship collection within the first quarter.",
    metrics: [
      { label: "Conversion lift", value: "+112%" },
      { label: "Session time", value: "3.4×" },
      { label: "Return visitors", value: "+58%" },
    ],
  },
  cryptosim: {
    slug: "cryptosim",
    title: "CryptoSim",
    category: "Fintech",
    tags: "Product · Design system · Data viz",
    accent: "var(--aurora-2)",
    year: "2025",
    role: "Product design, design system, data visualization",
    summary:
      "A learn-by-doing crypto simulator that lets first-time traders practice strategies with live market data — no real money at risk.",
    challenge:
      "Onboarding intimidated newcomers within thirty seconds. We needed to strip the jargon without dumbing down the underlying mechanics.",
    approach:
      "We designed a two-track interface — a beginner path with narrated flows, and an expert path exposing the full order book — sharing one calm, tokenized design system.",
    outcome:
      "Trial-to-paid conversion improved by 46% and daily active traders grew steadily month over month post-launch.",
    metrics: [
      { label: "Trial → Paid", value: "+46%" },
      { label: "D30 retention", value: "+31%" },
      { label: "NPS", value: "72" },
    ],
  },
  leaseabstractor: {
    slug: "leaseabstractor",
    title: "LeaseAbstractor",
    category: "Legal Tech",
    tags: "Product · AI · Workflow",
    accent: "var(--aurora-3)",
    year: "2026",
    role: "Product design, AI workflow, interface engineering",
    summary:
      "An AI-native tool that turns hundred-page commercial leases into structured abstracts in minutes, with a lawyer-grade review layer.",
    challenge:
      "Paralegals were spending days per lease. Off-the-shelf LLM tools were fast but couldn't be trusted without a defensible audit trail.",
    approach:
      "We paired document-aware AI extraction with a side-by-side review canvas that anchors every field back to its source clause, so reviewers stay in flow.",
    outcome:
      "Firms report cutting abstraction time from 6 hours to 22 minutes on average, with zero drop in accuracy on audited samples.",
    metrics: [
      { label: "Time per lease", value: "−94%" },
      { label: "Accuracy", value: "99.2%" },
      { label: "Firms onboarded", value: "38" },
    ],
  },
  "lead-generator": {
    slug: "lead-generator",
    title: "Lead Generator",
    category: "Growth",
    tags: "Systems · Automation · CRM",
    accent: "var(--aurora-4)",
    year: "2026",
    role: "Systems design, automation, integrations",
    summary:
      "A privately-hosted outbound engine that identifies, enriches, and warms prospects nightly — then hands qualified leads to sales at 9am.",
    challenge:
      "Their SDR team was drowning in tabs and duplicate CRM entries. Volume was up, but qualified conversations were flat.",
    approach:
      "We stitched together enrichment APIs, an AI qualifier, and their CRM into a single nightly pipeline with a lightweight dashboard for the sales lead.",
    outcome:
      "Qualified meetings booked per SDR nearly doubled inside six weeks, without adding headcount.",
    metrics: [
      { label: "Qualified meetings", value: "+94%" },
      { label: "SDR hours saved", value: "22/wk" },
      { label: "Pipeline value", value: "+3.1×" },
    ],
  },
};

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS[params.slug];
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Antigravity Case Study` },
          { name: "description", content: loaderData.project.summary },
          { property: "og:title", content: `${loaderData.project.title} — Antigravity` },
          { property: "og:description", content: loaderData.project.summary },
        ]
      : [{ title: "Case study — Antigravity" }, { name: "robots", content: "noindex" }],
  }),
  component: CaseStudy,
  notFoundComponent: () => (
    <AtmosphereProvider>
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h1 className="text-display text-5xl">Case study not found</h1>
        <Link to="/" className="text-eyebrow underline">← Back home</Link>
      </div>
    </AtmosphereProvider>
  ),
});

function CaseStudy() {
  const { project } = Route.useLoaderData();
  return (
    <AtmosphereProvider>
      <div className="relative min-h-screen">
        <AuroraBackground />
        <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5">
          <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-tight" data-cursor="hover">
            <span className="inline-block size-2.5 rounded-full bg-foreground" />
            antigravity
          </Link>
          <Link to="/" hash="work" className="text-eyebrow hover:text-foreground transition-colors">
            ← All work
          </Link>
        </header>

        <section className="relative px-6 md:px-10 pt-16 md:pt-24 pb-20">
          <div className="max-w-6xl mx-auto">
            <ChapterLabel n={project.year} title={project.category} />
            <h1 className="text-display text-[clamp(3rem,10vw,8rem)] mt-6 leading-[0.95]">
              <SplitReveal text={project.title} />
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-foreground/70 leading-relaxed">
              {project.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-eyebrow">
              <div><span className="opacity-60">Role · </span>{project.role}</div>
              <div><span className="opacity-60">Tags · </span>{project.tags}</div>
            </div>
          </div>
        </section>

        <section className="relative px-6 md:px-10 pb-20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.1, ease: [0.2, 0.9, 0.2, 1] }}
              className="relative aspect-[16/9] rounded-[2rem] overflow-hidden liquid"
            >
              {HERO_IMAGES[project.slug] ? (
                HERO_IMAGES[project.slug].href ? (
                  <a
                    href={HERO_IMAGES[project.slug].href}
                    target="_blank"
                    rel="noreferrer"
                    className="block absolute inset-0"
                    data-cursor="hover"
                  >
                    <img
                      src={HERO_IMAGES[project.slug].url}
                      alt={HERO_IMAGES[project.slug].alt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <img
                    src={HERO_IMAGES[project.slug].url}
                    alt={HERO_IMAGES[project.slug].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 30% 30%, ${project.accent}, transparent 60%), radial-gradient(ellipse at 80% 80%, var(--aurora-4), transparent 55%)`,
                    opacity: 0.85,
                  }}
                />
              )}
            </motion.div>
          </div>
        </section>

        <section className="relative px-6 md:px-10 pb-24">
          <div className="max-w-4xl mx-auto grid gap-16">
            {[
              { h: "The challenge", b: project.challenge },
              { h: "Our approach", b: project.approach },
              { h: "The outcome", b: project.outcome },
            ].map((s) => (
              <div key={s.h}>
                <div className="text-eyebrow mb-4">{s.h}</div>
                <p className="text-2xl md:text-3xl font-display leading-snug">{s.b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-6 md:px-10 pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.metrics.map((m: { label: string; value: string }) => (
              <div key={m.label} className="liquid rounded-3xl p-8">
                <div className="text-display text-5xl md:text-6xl shimmer-text">{m.value}</div>
                <div className="text-eyebrow mt-3">{m.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-6 md:px-10 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-5xl md:text-7xl">Have a project in orbit?</h2>
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
