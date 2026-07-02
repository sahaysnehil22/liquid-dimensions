import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";
import {
  AuroraBackground, LiquidButton, AtmosphereToggle, AtmosphereProvider,
  SplitReveal, ChapterLabel, Parallax,
} from "@/components/experience";
import heroVideo from "@/assets/hero-loop.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Antigravity — Interactive Digital Experiences" },
      { name: "description", content: "An independent studio building unforgettable digital moments. Design, motion and engineering, orchestrated as one." },
      { property: "og:title", content: "Antigravity — Interactive Digital Experiences" },
      { property: "og:description", content: "We don't build websites. We build first impressions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <AtmosphereProvider>
      <Index />
    </AtmosphereProvider>
  ),
});

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 0.9, easing: (t) => 1 - Math.pow(1 - t, 3) });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = ["Story", "Services", "Work", "Voices", "Contact"];
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
      <a href="#top" className="flex items-center gap-2 font-display text-xl tracking-tight" data-cursor="hover" data-cursor-label="TOP">
        <span className="inline-block size-2.5 rounded-full bg-foreground" />
        antigravity
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} data-cursor="hover" className="hover:text-foreground transition-colors">{l}</a>
        ))}
      </nav>
      <div className="hidden md:flex items-center gap-3">
        <AtmosphereToggle />
      </div>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="md:hidden relative z-[60] size-11 rounded-full liquid flex flex-col items-center justify-center gap-1.5"
      >
        <span className={`block h-px w-5 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
        <span className={`block h-px w-5 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 px-6"
            style={{ background: "color-mix(in oklab, var(--background) 85%, transparent)" }}
          >
            <nav className="flex flex-col items-center gap-6 text-3xl font-display">
              {links.map((l, i) => (
                <motion.a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                  className="hover:italic"
                >
                  {l}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + links.length * 0.06, duration: 0.5 }}
              className="mt-6"
            >
              <AtmosphereToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* CHAPTER 1 — ARRIVAL (cinematic liquid background) */
function Arrival() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { stiffness: 60, damping: 20 });
  const ty = useSpring(my, { stiffness: 60, damping: 20 });

  // ambient particles
  const particles = Array.from({ length: 24 }, (_, i) => i);

  return (
    <section
      id="top" ref={ref}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set((e.clientX - r.width / 2) / r.width * 40);
        my.set((e.clientY - r.height / 2) / r.height * 40);
      }}
    >
      {/* Cinematic looping video background */}
      <motion.div style={{ scale, opacity, y, x: tx }} className="absolute inset-0 z-0">
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.2, 0.9, 0.2, 1] }}
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* colored atmosphere wash — reacts to atmosphere tokens */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, color-mix(in oklab, var(--background) 40%, transparent) 0%, color-mix(in oklab, var(--background) 10%, transparent) 40%, color-mix(in oklab, var(--background) 85%, transparent) 100%)",
        }} />
        <div className="absolute inset-0 mix-blend-soft-light opacity-70" style={{
          background: "radial-gradient(ellipse at 30% 20%, var(--aurora-1), transparent 55%), radial-gradient(ellipse at 80% 80%, var(--aurora-4), transparent 55%)",
        }} />
      </motion.div>

      {/* Floating depth particles */}
      <motion.div style={{ y, opacity, x: ty }} className="pointer-events-none absolute inset-0 z-[1]">
        {particles.map((i) => {
          const size = 2 + (i % 4);
          const left = (i * 41) % 100;
          const top = (i * 73) % 100;
          const dur = 8 + (i % 6);
          return (
            <motion.span
              key={i}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              className="absolute rounded-full"
              style={{
                left: `${left}%`, top: `${top}%`, width: size, height: size,
                background: "color-mix(in oklab, var(--foreground) 60%, transparent)",
                boxShadow: "0 0 8px color-mix(in oklab, var(--aurora-4) 80%, transparent)",
              }}
            />
          );
        })}
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center max-w-5xl mx-auto pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1 }}
          className="text-eyebrow mb-8"
        >
          Independent studio · Est. 2019 · Everywhere
        </motion.div>
        <h1 className="text-display text-[clamp(2.5rem,8vw,7.5rem)]">
          <SplitReveal text="We craft" delay={0.6} />
          <br />
          <span className="italic font-normal shimmer-text"><SplitReveal text="digital gravity." delay={0.9} /></span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="mt-8 text-base md:text-lg text-foreground/70 max-w-xl mx-auto"
        >
          An independent studio designing and engineering interactive experiences
          for brands that refuse to be forgotten.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <LiquidButton cursorLabel="ENTER" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
            Explore →
          </LiquidButton>
        </motion.div>
      </motion.div>


    </section>
  );
}

/* CHAPTER 2 — STORY */
function Story() {
  const items = [
    { year: "2019", title: "First light", body: "Started as two people, one shared conviction: software could feel." },
    { year: "2021", title: "Expansion", body: "Grew into an interdisciplinary team of designers, engineers, and directors." },
    { year: "2023", title: "New material", body: "Introduced our Liquid Crystal interface language — soft, physical, alive." },
    { year: "2026", title: "Now", body: "Building the next generation of interactive brands with AI-native tools." },
  ];
  return (
    <section id="story" className="relative py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <ChapterLabel n="01" title="The Story" />
        <h2 className="text-display text-6xl md:text-8xl mt-6 max-w-3xl">
          <SplitReveal text="A short walk through our memory." />
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {items.map((it, i) => (
            <Parallax key={it.year} offset={i % 2 ? 30 : 60}>
              <motion.div
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
                className="liquid rounded-3xl p-8 md:p-10" data-cursor="hover"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-display text-5xl">{it.year}</span>
                  <span className="text-eyebrow">Chapter · {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-2xl font-display mb-3">{it.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{it.body}</p>
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CHAPTER — SERVICES as Creative Galaxy of unique artifacts */
type Artifact = {
  name: string; kind: string; desc: string; accent: string;
  render: (hover: boolean) => React.ReactNode;
};

const ArtCrystal = ({ hover, accent }: { hover: boolean; accent: string }) => (
  <div className="relative size-full flex items-center justify-center">
    <motion.div
      animate={{ rotate: hover ? 45 : 0, scale: hover ? 1.1 : 1 }}
      transition={{ duration: 1.2, ease: [0.2, 0.9, 0.2, 1] }}
      className="relative size-[60%]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0" style={{
        clipPath: "polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)",
        background: `linear-gradient(160deg, color-mix(in oklab, white 90%, transparent), ${accent})`,
        boxShadow: `inset 0 0 40px color-mix(in oklab, white 60%, transparent), 0 30px 60px -20px ${accent}`,
      }} />
      <div className="absolute inset-[8%]" style={{
        clipPath: "polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)",
        background: `linear-gradient(20deg, ${accent}, transparent 70%)`,
        opacity: 0.6, mixBlendMode: "screen",
      }} />
    </motion.div>
  </div>
);

const ArtLiquid = ({ hover, accent }: { hover: boolean; accent: string }) => (
  <div className="relative size-full flex items-center justify-center">
    <motion.div
      animate={{
        borderRadius: hover
          ? ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
          : "50%",
        scale: hover ? 1.15 : 1,
      }}
      transition={{ duration: hover ? 6 : 1.2, repeat: hover ? Infinity : 0, ease: "easeInOut" }}
      className="size-[70%]"
      style={{
        background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, white 70%, transparent), ${accent} 70%)`,
        boxShadow: `inset -20px -30px 60px color-mix(in oklab, ${accent} 60%, transparent), 0 30px 60px -20px ${accent}`,
        filter: "blur(0.5px)",
      }}
    />
  </div>
);

const ArtMetallic = ({ hover, accent }: { hover: boolean; accent: string }) => (
  <div className="relative size-full flex items-center justify-center">
    <motion.div
      animate={{ rotateY: hover ? 180 : 0 }}
      transition={{ duration: 1.4, ease: [0.2, 0.9, 0.2, 1] }}
      className="size-[65%] rounded-full"
      style={{
        background: `conic-gradient(from 0deg, #f5f5f5, ${accent}, #d0d0d0, ${accent}, #f5f5f5)`,
        boxShadow: `inset 0 -20px 40px rgba(0,0,0,0.2), inset 0 20px 40px rgba(255,255,255,0.6), 0 20px 60px -10px ${accent}`,
      }}
    />
  </div>
);

const ArtHolo = ({ hover, accent }: { hover: boolean; accent: string }) => (
  <div className="relative size-full flex items-center justify-center overflow-hidden">
    <motion.div
      animate={{ y: hover ? [-4, 4, -4] : 0 }}
      transition={{ duration: 3, repeat: hover ? Infinity : 0, ease: "easeInOut" }}
      className="relative size-[65%]"
    >
      {[0, 1, 2].map(i => (
        <div key={i} className="absolute inset-0 rounded-2xl" style={{
          background: `linear-gradient(${45 + i * 60}deg, ${accent}, color-mix(in oklab, ${accent} 30%, white))`,
          transform: `translate(${i * 4}px, ${i * 4}px)`,
          opacity: 0.6 - i * 0.15,
          mixBlendMode: "multiply",
          boxShadow: `0 20px 40px -10px ${accent}`,
        }} />
      ))}
    </motion.div>
  </div>
);

const ArtRings = ({ hover, accent }: { hover: boolean; accent: string }) => (
  <div className="relative size-full flex items-center justify-center">
    {[0, 1, 2, 3].map(i => (
      <motion.div key={i}
        animate={{ rotate: hover ? 360 : 0 }}
        transition={{ duration: 8 + i * 2, repeat: hover ? Infinity : 0, ease: "linear" }}
        className="absolute rounded-full border"
        style={{
          width: `${30 + i * 15}%`, height: `${30 + i * 15}%`,
          borderColor: `color-mix(in oklab, ${accent} ${80 - i * 15}%, transparent)`,
          borderWidth: i === 0 ? 2 : 1,
          boxShadow: i === 0 ? `0 0 40px ${accent}` : "none",
        }}
      />
    ))}
    <div className="absolute size-3 rounded-full bg-foreground" style={{ boxShadow: `0 0 20px ${accent}` }} />
  </div>
);

const ArtObelisk = ({ hover, accent }: { hover: boolean; accent: string }) => (
  <div className="relative size-full flex items-center justify-end pb-6 justify-center">
    <motion.div
      animate={{ scaleY: hover ? 1.1 : 1, y: hover ? -8 : 0 }}
      transition={{ duration: 1, ease: [0.2, 0.9, 0.2, 1] }}
      className="relative w-[22%] h-[75%]"
      style={{
        background: `linear-gradient(180deg, color-mix(in oklab, white 60%, transparent), ${accent}, color-mix(in oklab, black 40%, ${accent}))`,
        clipPath: "polygon(50% 0, 100% 10%, 100% 100%, 0 100%, 0 10%)",
        boxShadow: `0 40px 60px -20px ${accent}`,
      }}
    >
      <div className="absolute inset-0" style={{
        background: "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.5) 50%, transparent 60%)",
        clipPath: "polygon(50% 0, 100% 10%, 100% 100%, 0 100%, 0 10%)",
      }} />
    </motion.div>
  </div>
);

function Services() {
  const artifacts: Artifact[] = [
    { name: "Development", kind: "Crystalline", desc: "Performant, modern engineering built to last.", accent: "var(--aurora-2)", render: (h) => <ArtCrystal hover={h} accent="var(--aurora-2)" /> },
    { name: "AI Solutions", kind: "Liquid", desc: "Native AI features woven into product experience.", accent: "var(--aurora-4)", render: (h) => <ArtLiquid hover={h} accent="var(--aurora-4)" /> },
    { name: "Brand Identity", kind: "Metallic", desc: "Visual languages that scale across every touchpoint.", accent: "var(--aurora-1)", render: (h) => <ArtMetallic hover={h} accent="var(--aurora-1)" /> },
    { name: "Motion Design", kind: "Holographic", desc: "Movement that reveals meaning, not decoration.", accent: "var(--aurora-3)", render: (h) => <ArtHolo hover={h} accent="var(--aurora-3)" /> },
    { name: "Automation", kind: "Orbital", desc: "Workflows that quietly run your business at night.", accent: "var(--aurora-2)", render: (h) => <ArtRings hover={h} accent="var(--aurora-2)" /> },
    { name: "Strategy", kind: "Monolithic", desc: "The point of view that makes design decisions inevitable.", accent: "var(--aurora-1)", render: (h) => <ArtObelisk hover={h} accent="var(--aurora-1)" /> },
  ];
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <ChapterLabel n="02" title="Services" />
        <h2 className="text-display text-6xl md:text-8xl mt-6 max-w-4xl">
          <SplitReveal text="Six artifacts. One studio." />
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {artifacts.map((a, i) => (
            <motion.article
              key={a.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: (i % 3) * 0.08, ease: [0.2, 0.9, 0.2, 1] }}
              className="group relative liquid rounded-[2rem] p-8 aspect-[4/5] flex flex-col overflow-hidden"
              data-cursor="open"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-eyebrow opacity-60">{a.kind}</span>
              </div>
              <div className="relative flex-1 -mx-4">
                {a.render(active === i)}
              </div>
              <div className="relative">
                <h3 className="text-3xl md:text-4xl font-display">{a.name}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{a.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CHAPTER — EDITORIAL MANIFESTO */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const verses = [
    { verb: "CREATE", body: "We treat the blank page as sacred. Every project begins with a question, not an assumption." },
    { verb: "DESIGN", body: "Systems over screens. Language over decoration. Restraint is our loudest instrument." },
    { verb: "BUILD",  body: "Engineering as craft. Performance as respect. The code should feel as considered as the pixel." },
    { verb: "SCALE",  body: "What ships must sustain. We hand over living systems, not frozen artifacts." },
    { verb: "EVOLVE", body: "A brand is a conversation across time. We stay when the launch confetti has settled." },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      // Map the sticky scroll range evenly across all verses, so every one gets equal dwell time.
      const clamped = Math.max(0, Math.min(0.9999, v));
      const i = Math.min(verses.length - 1, Math.floor(clamped * verses.length));
      setActive(i);
    });
    return () => unsub();
  }, [scrollYProgress, verses.length]);

  // Give each verse a full viewport of sticky dwell + one extra for entry/exit smoothness.
  return (
    <section id="manifesto" ref={ref} className="relative" style={{ height: `${verses.length * 100 + 20}vh` }}>
      <div className="sticky top-0 h-screen flex items-center px-6 md:px-16 overflow-hidden">

        {/* evolving background */}
        <motion.div
          key={active}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }}
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at ${20 + active * 15}% ${30 + active * 10}%, var(--aurora-${(active % 4) + 1}), transparent 60%)`,
            filter: "blur(40px)",
          }}
        />
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[auto_1fr] gap-12 md:gap-24 items-center">
          <div className="flex md:flex-col gap-4 text-eyebrow tabular-nums">
            {verses.map((_, i) => (
              <span key={i} className={`transition-all duration-500 ${i === active ? "text-foreground" : "text-foreground/30"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
            ))}
          </div>
          <div className="relative">
            <div className="text-eyebrow mb-8">A manifesto in five verbs</div>
            <div className="relative h-[40vh] md:h-[50vh]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
                  className="absolute inset-0"
                >
                  <h2 className="text-display text-[clamp(4rem,16vw,14rem)] leading-[0.9]">
                    <span className="shimmer-text">WE</span>
                    <br />
                    <span className="italic">{verses[active].verb}.</span>
                  </h2>
                  <p className="mt-8 max-w-lg text-lg text-foreground/70 leading-relaxed">
                    {verses[active].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CHAPTER — WORK */
function Work() {
  const projects = [
    { t: "Halcyon", c: "Luxury fragrance", tags: "Brand · E-com · Motion", a: "var(--aurora-1)" },
    { t: "Northline", c: "Fintech", tags: "Product · Design system", a: "var(--aurora-2)" },
    { t: "Fieldnotes", c: "Editorial", tags: "Publication · 3D", a: "var(--aurora-3)" },
    { t: "Ozone", c: "Climate tech", tags: "Brand · Web · Data viz", a: "var(--aurora-4)" },
  ];
  return (
    <section id="work" className="relative pt-16 md:pt-24 pb-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <ChapterLabel n="04" title="Selected Work" />
        <h2 className="text-display text-6xl md:text-8xl mt-6 max-w-4xl">
          <SplitReveal text="Cubes. Worlds. Stories." />
        </h2>
        <div className="mt-24 grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.article
              key={p.t}
              initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: (i % 2) * 0.1, ease: [0.2, 0.9, 0.2, 1] }}
              className="group relative liquid rounded-3xl p-8 md:p-10 aspect-[4/5] flex flex-col justify-between overflow-hidden"
              data-cursor="open" data-cursor-label="CASE"
            >
              <motion.div
                whileHover={{ scale: 1.15 }} transition={{ duration: 1.2, ease: [0.2, 0.9, 0.2, 1] }}
                className="absolute inset-0"
                style={{ background: `radial-gradient(circle at 70% 30%, ${p.a}, transparent 55%)`, opacity: 0.55 }}
              />
              <div className="relative flex items-start justify-between">
                <span className="text-eyebrow">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                <span className="text-eyebrow">{p.tags}</span>
              </div>
              <div className="relative">
                <div className="text-eyebrow mb-2 opacity-70">{p.c}</div>
                <h3 className="text-6xl md:text-8xl text-display">{p.t}</h3>
                <div className="mt-6 flex items-center gap-2 text-sm text-foreground/80">
                  <span>Open case study</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>→</motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CHAPTER — MEMORY WALL (testimonials as collectibles) */
type Memory =
  | { kind: "quote"; n: string; r: string; q: string; a: string }
  | { kind: "frame"; n: string; r: string; q: string; a: string }
  | { kind: "signature"; n: string; r: string; q: string; a: string }
  | { kind: "logo"; n: string; r: string; q: string; a: string };

function Testimonials() {
  const memories: Memory[] = [
    { kind: "quote",     n: "Maya R.",  r: "Founder, Halcyon",     q: "They didn't just design our site. They designed how we're remembered.", a: "var(--aurora-1)" },
    { kind: "frame",     n: "David C.", r: "CPO, Northline",       q: "The most disciplined design partner we've worked with. Every detail earned.", a: "var(--aurora-2)" },
    { kind: "signature", n: "Priya S.", r: "Head of Brand, Ozone", q: "It felt less like a project and more like a collaboration between studios.", a: "var(--aurora-3)" },
    { kind: "logo",      n: "Leo M.",   r: "Editor, Fieldnotes",   q: "They made the internet feel like paper again — patient, considered, human.", a: "var(--aurora-4)" },
  ];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="voices" className="relative py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <ChapterLabel n="05" title="Memory Wall" />
        <h2 className="text-display text-6xl md:text-8xl mt-6 max-w-4xl">
          <SplitReveal text="Fragments our clients left behind." />
        </h2>

        <div className="mt-20 grid grid-cols-12 gap-6 auto-rows-[minmax(240px,auto)]">
          {memories.map((m, i) => {
            const spans = [
              "col-span-12 md:col-span-7 row-span-1",
              "col-span-12 md:col-span-5 row-span-1",
              "col-span-12 md:col-span-5 row-span-1",
              "col-span-12 md:col-span-7 row-span-1",
            ];
            return (
              <motion.button
                key={i}
                onClick={() => setOpen(i)}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: i * 0.08 }}
                whileHover={{ scale: 1.015 }}
                data-cursor="open" data-cursor-label="OPEN"
                className={`relative liquid rounded-[2rem] p-8 md:p-10 text-left overflow-hidden ${spans[i]}`}
              >
                <div className="absolute inset-0 opacity-60" style={{
                  background: `radial-gradient(circle at ${i % 2 ? "80%" : "20%"} 30%, ${m.a}, transparent 55%)`,
                }} />
                {m.kind === "quote" && (
                  <div className="relative h-full flex flex-col justify-between">
                    <span className="text-display text-8xl leading-none text-foreground/20">"</span>
                    <p className="text-display text-2xl md:text-3xl leading-tight italic">{m.q}</p>
                    <footer className="mt-6 text-eyebrow">— {m.n} · {m.r}</footer>
                  </div>
                )}
                {m.kind === "frame" && (
                  <div className="relative h-full flex flex-col sm:flex-row gap-6 items-stretch sm:items-center">
                    <div className="relative aspect-[3/4] w-full sm:w-auto sm:h-full sm:min-w-[35%] rounded-2xl overflow-hidden bg-foreground/5 shrink-0">
                      <div className="absolute inset-0" style={{
                        background: `linear-gradient(135deg, ${m.a}, color-mix(in oklab, white 60%, ${m.a}))`,
                      }} />
                      <div className="absolute inset-0 flex items-center justify-center text-6xl text-display text-foreground/40">
                        {m.n.charAt(0)}
                      </div>
                      <motion.div
                        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute inset-0 mix-blend-overlay opacity-40"
                        style={{
                          background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
                          backgroundSize: "200% 200%",
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-xl md:text-2xl leading-snug">{m.q}</p>
                      <footer className="mt-4 text-eyebrow">— {m.n} · {m.r}</footer>
                    </div>
                  </div>
                )}

                {m.kind === "signature" && (
                  <div className="relative h-full flex flex-col justify-between">
                    <p className="text-foreground/70 text-lg leading-relaxed">{m.q}</p>
                    <div className="mt-6">
                      <svg viewBox="0 0 300 80" className="h-16 w-auto">
                        <motion.path
                          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          d="M10 50 Q 40 10, 70 40 T 130 40 Q 160 60, 190 30 T 260 45"
                          fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-eyebrow mt-2">{m.n} · {m.r}</div>
                    </div>
                  </div>
                )}
                {m.kind === "logo" && (
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-14 rounded-full flex items-center justify-center font-display text-2xl" style={{
                        background: `conic-gradient(from 0deg, ${m.a}, color-mix(in oklab, white 50%, ${m.a}), ${m.a})`,
                      }}>
                        F
                      </div>
                      <div>
                        <div className="font-display text-xl">Fieldnotes</div>
                        <div className="text-eyebrow">Est. Publication</div>
                      </div>
                    </div>
                    <p className="font-display text-2xl md:text-3xl italic leading-snug">"{m.q}"</p>
                    <footer className="text-eyebrow">— {m.n} · {m.r}</footer>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-6 backdrop-blur-2xl"
            style={{ background: "color-mix(in oklab, var(--background) 60%, transparent)" }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="liquid rounded-[2rem] p-10 md:p-14 max-w-2xl w-full"
            >
              <div className="text-eyebrow mb-4">A memory from</div>
              <div className="font-display text-3xl mb-6">{memories[open].n} · {memories[open].r}</div>
              <p className="text-2xl md:text-3xl font-display italic leading-snug">"{memories[open].q}"</p>
              <button onClick={() => setOpen(null)} className="mt-10 text-eyebrow hover:text-foreground transition-colors" data-cursor="hover">Close ×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* CHAPTER — STATS */
function Stats() {
  const stats = [
    { v: 84, s: "Shipped products" },
    { v: 27, s: "Countries reached" },
    { v: 19, s: "Industry awards" },
    { v: 6, s: "Years of orbit" },
  ];
  return (
    <section className="relative py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((st, i) => (
          <motion.div key={st.s}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.1 }}
          >
            <div className="text-display text-6xl md:text-7xl shimmer-text"><Counter to={st.v} /></div>
            <div className="text-eyebrow mt-3">{st.s}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
function Counter({ to }: { to: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1800;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setN(Math.floor(p * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref} className="tabular-nums">{n}</span>;
}

/* CHAPTER — CONTACT (sculptural) */
function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const send = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };

  return (
    <section id="contact" className="relative py-40 px-6 md:px-10 overflow-hidden">
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, var(--aurora-4), transparent 60%), radial-gradient(ellipse at 20% 30%, var(--aurora-2), transparent 55%)",
          filter: "blur(40px)",
        }}
      />
      <div className="max-w-3xl mx-auto text-center">
        <ChapterLabel n="06" title="Contact" />
        <h2 className="text-display text-6xl md:text-9xl mt-8">
          <SplitReveal text="Let's begin." />
        </h2>
        <p className="mt-8 text-foreground/60 max-w-lg mx-auto">
          Tell us where you're headed. We'll tell you if we're the right studio to get you there.
        </p>

        <div className="relative mt-16">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form" onSubmit={send}
                initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96, filter: "blur(20px)" }}
                transition={{ duration: 0.8 }}
                className="text-left grid gap-10"
              >
                <SculpturalField label="Name" value={name} onChange={setName} />
                <SculpturalField label="Email Address" value={email} onChange={setEmail} type="email" />
                <SculpturalField label="Problem — Statement" value={message} onChange={setMessage} multiline />
                <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-foreground/50">We reply within two working days.</span>
                  <LiquidButton cursorLabel="SEND">Send transmission →</LiquidButton>
                </div>
              </motion.form>
            ) : (
              <CompletionScene key="done" />
            )}
          </AnimatePresence>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 text-eyebrow">
          <span>hello@antigravity.studio</span>
          <span>·</span>
          <span>+1 (415) 555 0119</span>
          <span>·</span>
          <span>SF · NYC · Lisbon</span>
        </div>
      </div>
    </section>
  );
}

function SculpturalField({
  label, value, onChange, type = "text", multiline = false,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; multiline?: boolean }) {
  const [focus, setFocus] = useState(false);
  const filled = value.length > 0;
  return (
    <label className="block relative group">
      <span
        className={`absolute left-0 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.2,1)] ${
          focus || filled ? "top-0 text-xs tracking-[0.28em] uppercase text-foreground/60" : "top-8 text-lg text-foreground/40"
        }`}
      >{label}</span>
      {multiline ? (
        <textarea
          value={value} onChange={(e) => onChange(e.target.value)} rows={3}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className="w-full bg-transparent pt-8 pb-3 text-lg resize-none focus:outline-none"
        />
      ) : (
        <input
          type={type} value={value} onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          className="w-full bg-transparent pt-8 pb-3 text-lg focus:outline-none"
        />
      )}
      <div className="relative h-px w-full bg-foreground/15 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ scaleX: focus || filled ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
          className="absolute inset-0 origin-left"
          style={{
            background: "linear-gradient(90deg, var(--aurora-1), var(--aurora-2), var(--aurora-4))",
            height: 2,
          }}
        />
      </div>
    </label>
  );
}

function CompletionScene() {
  const particles = Array.from({ length: 40 }, (_, i) => i);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
      className="relative h-[50vh] flex flex-col items-center justify-center"
    >
      <div className="relative size-48">
        {particles.map((i) => {
          const angle = (i / particles.length) * Math.PI * 2;
          return (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: Math.cos(angle) * 200, y: Math.sin(angle) * 200, opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, delay: 0.2 + i * 0.02, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 size-1.5 rounded-full"
              style={{ background: "var(--foreground)", boxShadow: "0 0 12px var(--aurora-4)" }}
            />
          );
        })}
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ duration: 1.4, ease: [0.2, 0.9, 0.2, 1] }}
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-4), var(--aurora-1))",
            filter: "blur(30px)",
          }}
        />
      </div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}
        className="mt-12 text-display text-4xl md:text-6xl"
      >
        Transmission received.
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}
        className="mt-4 text-foreground/60 max-w-md text-center"
      >
        Your message is now orbiting our studio. We'll write back within two working days — from a real person.
      </motion.p>
    </motion.div>
  );
}

/* CHAPTER — ENDING SEQUENCE (footer as its own experience) */
function EndingSequence() {
  return (
    <footer className="relative pt-32 pb-16 px-6 md:px-10 overflow-hidden">
      {/* Constellation */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 800">
        {Array.from({ length: 30 }).map((_, i) => {
          const x1 = (i * 137) % 1200;
          const y1 = (i * 91) % 800;
          const x2 = ((i + 7) * 173) % 1200;
          const y2 = ((i + 3) * 113) % 800;
          return (
            <motion.line key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.4 }}
              viewport={{ once: true }}
              transition={{ duration: 3, delay: i * 0.1 }}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="currentColor" strokeWidth="0.5"
            />
          );
        })}
        {Array.from({ length: 40 }).map((_, i) => {
          const cx = (i * 173) % 1200;
          const cy = (i * 97) % 800;
          return <circle key={i} cx={cx} cy={cy} r="1.5" fill="currentColor" opacity="0.6" />;
        })}
      </svg>

      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 12, repeat: Infinity }}
        className="absolute -bottom-40 inset-x-0 h-[80vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, var(--aurora-4), transparent 60%), radial-gradient(ellipse at 20% 80%, var(--aurora-1), transparent 50%), radial-gradient(ellipse at 80% 90%, var(--aurora-2), transparent 55%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-eyebrow mb-8">End credits</div>
        <h2 className="text-display text-[clamp(4rem,18vw,16rem)] leading-[0.85] shimmer-text">
          antigravity.
        </h2>
        <p className="mt-8 max-w-lg text-foreground/60 italic">
          "People don't remember pages. They remember experiences." — Studio credo, no. 01
        </p>

        <div className="mt-24 grid gap-12 md:grid-cols-4 text-sm">
          <div>
            <div className="text-eyebrow mb-3">Contact</div>
            <p className="text-foreground/70">hello@antigravity.studio</p>
            <p className="text-foreground/70">+1 (415) 555 0119</p>
          </div>
          <div>
            <div className="text-eyebrow mb-3">Studios</div>
            <p className="text-foreground/70">San Francisco</p>
            <p className="text-foreground/70">New York</p>
            <p className="text-foreground/70">Lisbon</p>
          </div>
          <div>
            <div className="text-eyebrow mb-3">Elsewhere</div>
            {["Instagram","Are.na","Read.cv","Vimeo"].map(l => (
              <a key={l} href="#" data-cursor="hover" className="block text-foreground/70 hover:text-foreground transition-colors">{l} ↗</a>
            ))}
          </div>
          <div>
            <div className="text-eyebrow mb-3">Navigate</div>
            {["Story","Services","Work","Voices","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} data-cursor="hover" className="block text-foreground/70 hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>

        {/* Floating quotes */}
        <div className="mt-24 relative h-20 overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 whitespace-nowrap text-foreground/30 italic text-sm"
          >
            {[
              "Design speaks before your team does.",
              "Restraint is our loudest instrument.",
              "Ship, measure, refine.",
              "The internet feels like paper again.",
              "Every interaction has intention.",
              "We stay when the confetti settles.",
            ].concat([
              "Design speaks before your team does.",
              "Restraint is our loudest instrument.",
              "Ship, measure, refine.",
              "The internet feels like paper again.",
              "Every interaction has intention.",
              "We stay when the confetti settles.",
            ]).map((q, i) => (
              <span key={i} className="flex items-center gap-16">
                {q}
                <span className="inline-block size-1 rounded-full bg-foreground/40" />
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/50 border-t border-foreground/10 pt-8">
          <p>© {new Date().getFullYear()} Antigravity Studio · An interactive fiction.</p>
          <p className="md:ml-auto tracking-[0.28em] uppercase text-right">Crafted with intention</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useLenis();
  return (
    <main className="relative">
      <AuroraBackground />
      <Nav />
      <Arrival />
      <Story />
      <Services />
      <Work />
      <Testimonials />
      <Stats />
      <Contact />
      <EndingSequence />
    </main>
  );
}
