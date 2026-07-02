import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import {
  AuroraBackground, CustomCursor, LiquidButton, ThemeToggle,
  SplitReveal, ChapterLabel, Parallax, Marquee,
} from "@/components/experience";

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
  component: Index,
});

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) });
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-10 py-5">
      <a href="#top" className="flex items-center gap-2 font-display text-xl tracking-tight">
        <span className="inline-block size-2.5 rounded-full bg-foreground" />
        antigravity
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
        {["Story","Work","Services","Process","Contact"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors">{l}</a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  );
}

/* CHAPTER 1 — ARRIVAL */
function Arrival() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <section id="top" ref={ref} className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setMouse({ x: (e.clientX - rect.width / 2) / rect.width, y: (e.clientY - rect.height / 2) / rect.height });
      }}
    >
      {/* Floating orb */}
      <motion.div
        style={{ scale, opacity, y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="relative size-[70vmin]"
        >
          <div
            className="absolute inset-0 rounded-full float"
            style={{
              background: "conic-gradient(from 0deg, var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-4), var(--aurora-1))",
              filter: "blur(40px)",
              opacity: 0.55,
              transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`,
              transition: "transform 400ms cubic-bezier(.2,.9,.2,1)",
            }}
          />
          <div
            className="absolute inset-[15%] rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), transparent 60%), conic-gradient(from 180deg, var(--aurora-4), var(--aurora-2), var(--aurora-1))",
              boxShadow: "inset 0 -60px 120px rgba(255,255,255,0.4), inset 0 60px 120px rgba(0,0,0,0.15), 0 40px 100px rgba(0,0,0,0.2)",
              transform: `translate(${mouse.x * -15}px, ${mouse.y * -15}px)`,
              transition: "transform 400ms cubic-bezier(.2,.9,.2,1)",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 text-center max-w-5xl mx-auto pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-eyebrow mb-8"
        >
          Independent studio · Est. 2019 · Everywhere
        </motion.div>
        <h1 className="text-display text-[clamp(3rem,10vw,10rem)]">
          <SplitReveal text="We craft" delay={0.6} />
          <br />
          <span className="italic font-normal shimmer-text"><SplitReveal text="digital gravity." delay={0.9} /></span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
          className="mt-8 text-base md:text-lg text-foreground/60 max-w-xl mx-auto"
        >
          An independent studio designing and engineering interactive experiences
          for brands that refuse to be forgotten.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <LiquidButton onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
            Enter the work →
          </LiquidButton>
          <LiquidButton variant="ghost">Watch reel</LiquidButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-eyebrow flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ height: [8, 20, 8] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-px bg-foreground/50"
        />
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
    <section id="story" className="relative py-40 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <ChapterLabel n="01" title="The Story" />
        <h2 className="text-display text-6xl md:text-8xl mt-6 max-w-3xl">
          <SplitReveal text="A short walk through our memory." />
        </h2>
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          {items.map((it, i) => (
            <Parallax key={it.year} offset={i % 2 ? 40 : 80}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
                className="liquid rounded-3xl p-8 md:p-10"
                data-cursor="hover"
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

/* CHAPTER 3 — QUOTE */
function Quote({ text, author }: { text: string; author?: string }) {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
          className="text-display text-3xl md:text-5xl leading-tight text-foreground/90"
        >
          &ldquo;<span className="italic">{text}</span>&rdquo;
        </motion.p>
        {author && <p className="mt-6 text-eyebrow">— {author}</p>}
      </div>
    </section>
  );
}

/* CHAPTER 5 — SERVICES (planets) */
function Services() {
  const services = [
    { name: "Web Design", desc: "Editorial systems and interactive brand worlds.", accent: "var(--aurora-1)" },
    { name: "Development", desc: "Performant, modern engineering built to last.", accent: "var(--aurora-2)" },
    { name: "Brand Identity", desc: "Visual languages that scale across every touchpoint.", accent: "var(--aurora-3)" },
    { name: "Motion Design", desc: "Movement that reveals meaning, not decoration.", accent: "var(--aurora-4)" },
    { name: "AI Solutions", desc: "Native AI features woven into product experience.", accent: "var(--aurora-1)" },
    { name: "3D Experiences", desc: "Realtime worlds you can navigate, not just view.", accent: "var(--aurora-2)" },
  ];
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="services" className="relative py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <ChapterLabel n="05" title="Services" />
        <h2 className="text-display text-6xl md:text-8xl mt-6 max-w-3xl">
          <SplitReveal text="Six planets. One orbit." />
        </h2>
        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: (i % 3) * 0.1, ease: [0.2, 0.9, 0.2, 1] }}
              className="group relative aspect-square rounded-full liquid flex flex-col items-center justify-center text-center p-6 overflow-hidden"
              data-cursor="hover"
            >
              <motion.div
                animate={{ scale: active === i ? 1.3 : 1, opacity: active === i ? 0.9 : 0.5 }}
                transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${s.accent}, transparent 65%)`,
                  filter: "blur(24px)",
                }}
              />
              <div className="relative z-10">
                <div className="text-eyebrow mb-3 opacity-70">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-xl md:text-2xl font-display mb-2">{s.name}</h3>
                <p className="text-xs md:text-sm text-foreground/60 max-w-[18ch] mx-auto">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CHAPTER 6 — PROCESS */
function Process() {
  const steps = [
    { k: "Discover", d: "We listen, dismantle assumptions, and map the terrain." },
    { k: "Concept", d: "Directions with a point of view — never mood boards alone." },
    { k: "Design", d: "Systems, not screens. Language, not decoration." },
    { k: "Build", d: "Engineering as craft. Performance as respect." },
    { k: "Launch", d: "Ship, measure, refine — the story doesn't end at release." },
  ];
  return (
    <section id="process" className="relative py-40 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <ChapterLabel n="06" title="Our Process" />
        <h2 className="text-display text-6xl md:text-8xl mt-6 max-w-3xl">
          <SplitReveal text="A tunnel with checkpoints." />
        </h2>
        <div className="mt-24 relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
          {steps.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9 }}
              className={`relative pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-12 py-12 ${i % 2 ? "md:text-left" : "md:text-right"}`}
            >
              <div className="absolute left-4 md:left-1/2 top-16 -translate-x-1/2 size-4 rounded-full bg-foreground shadow-[0_0_0_6px_var(--background),0_0_40px_var(--aurora-2)]" />
              <div className={i % 2 ? "md:col-start-2" : ""}>
                <div className="text-eyebrow mb-2">Step {String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-4xl md:text-6xl text-display">{s.k}</h3>
                <p className="mt-4 text-foreground/60 max-w-md md:inline-block">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CHAPTER 7 — WORK */
function Work() {
  const projects = [
    { t: "Halcyon", c: "Luxury fragrance", tags: "Brand · E-com · Motion", a: "var(--aurora-1)" },
    { t: "Northline", c: "Fintech", tags: "Product · Design system", a: "var(--aurora-2)" },
    { t: "Fieldnotes", c: "Editorial", tags: "Publication · 3D", a: "var(--aurora-3)" },
    { t: "Ozone", c: "Climate tech", tags: "Brand · Web · Data viz", a: "var(--aurora-4)" },
  ];
  return (
    <section id="work" className="relative py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <ChapterLabel n="07" title="Selected Work" />
        <h2 className="text-display text-6xl md:text-8xl mt-6 max-w-4xl">
          <SplitReveal text="Cubes. Worlds. Stories." />
        </h2>
        <div className="mt-24 grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.article
              key={p.t}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: (i % 2) * 0.1, ease: [0.2, 0.9, 0.2, 1] }}
              className="group relative liquid rounded-3xl p-8 md:p-10 aspect-[4/5] flex flex-col justify-between overflow-hidden"
              data-cursor="hover"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 1.2, ease: [0.2, 0.9, 0.2, 1] }}
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${p.a}, transparent 55%)`,
                  opacity: 0.55,
                }}
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
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >→</motion.span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CHAPTER 8 — TESTIMONIALS constellation */
function Testimonials() {
  const stars = [
    { n: "Maya R.", r: "Founder, Halcyon", q: "They didn't just design our site. They designed how we're remembered." },
    { n: "David C.", r: "CPO, Northline", q: "The most disciplined design partner we've worked with. Every detail earned." },
    { n: "Priya S.", r: "Head of Brand, Ozone", q: "It felt less like a project and more like a collaboration between studios." },
    { n: "Leo M.", r: "Editor, Fieldnotes", q: "They made the internet feel like paper again — patient, considered, human." },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % stars.length), 5500);
    return () => clearInterval(t);
  }, [stars.length]);
  return (
    <section id="testimonials" className="relative py-40 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <ChapterLabel n="08" title="Voices" />
        <div className="mt-16 grid md:grid-cols-[1fr_1.2fr] gap-16 items-center">
          <div className="relative aspect-square max-w-md w-full mx-auto">
            {stars.map((s, idx) => {
              const angle = (idx / stars.length) * Math.PI * 2;
              const r = 40;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              const active = idx === i;
              return (
                <button
                  key={s.n}
                  onClick={() => setI(idx)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <motion.span
                    animate={{ scale: active ? 2.2 : 1, opacity: active ? 1 : 0.6 }}
                    transition={{ duration: 0.8 }}
                    className="block size-3 rounded-full bg-foreground"
                    style={{ boxShadow: active ? "0 0 40px var(--aurora-4), 0 0 20px var(--aurora-2)" : "none" }}
                  />
                </button>
              );
            })}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="size-full rounded-full border border-dashed border-foreground/20"
              />
            </div>
          </div>
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-display text-3xl md:text-4xl leading-tight">&ldquo;{stars[i].q}&rdquo;</p>
                <footer className="mt-8 text-eyebrow">— {stars[i].n} · {stars[i].r}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* CHAPTER 10 — STATS */
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
          <motion.div
            key={st.s}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: i * 0.1 }}
          >
            <div className="text-display text-6xl md:text-7xl shimmer-text">
              <Counter to={st.v} />
            </div>
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

/* CHAPTER 13 — CONTACT */
function Contact() {
  return (
    <section id="contact" className="relative py-40 px-6 md:px-10">
      <div className="max-w-4xl mx-auto text-center">
        <ChapterLabel n="13" title="Contact" />
        <h2 className="text-display text-6xl md:text-9xl mt-8">
          <SplitReveal text="Let's begin." />
        </h2>
        <p className="mt-8 text-foreground/60 max-w-lg mx-auto">
          Tell us where you're headed. We'll tell you if we're the right studio to get you there.
        </p>
        <form className="mt-14 liquid rounded-3xl p-6 md:p-8 text-left grid gap-4" onSubmit={(e) => e.preventDefault()}>
          <label className="grid gap-2">
            <span className="text-eyebrow">Name</span>
            <input required className="bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors" placeholder="Your name" />
          </label>
          <label className="grid gap-2">
            <span className="text-eyebrow">Email</span>
            <input required type="email" className="bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors" placeholder="you@studio.com" />
          </label>
          <label className="grid gap-2">
            <span className="text-eyebrow">Project</span>
            <textarea rows={4} className="bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="A few sentences about what you're building." />
          </label>
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-foreground/50">We reply within two working days.</span>
            <LiquidButton>Send transmission →</LiquidButton>
          </div>
        </form>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-eyebrow">
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

function Footer() {
  return (
    <footer className="relative py-16 px-6 md:px-10 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
        <p>© {new Date().getFullYear()} Antigravity Studio · An interactive fiction.</p>
        <p>Crafted with intention. No template, no shortcut.</p>
      </div>
    </footer>
  );
}

/* AI Companion — floating breathing orb */
function Companion() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="liquid rounded-3xl p-5 mb-4 w-72 text-sm"
          >
            <p className="text-eyebrow mb-2">Companion</p>
            <p className="text-foreground/80">Hi. I'm here to help you explore. Ask about our work, pricing, or process — or just say hello.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open companion"
        className="relative size-14 rounded-full liquid flex items-center justify-center"
        data-cursor="hover"
      >
        <motion.span
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-2 rounded-full"
          style={{ background: "conic-gradient(from 0deg, var(--aurora-1), var(--aurora-2), var(--aurora-4), var(--aurora-1))", filter: "blur(6px)" }}
        />
        <span className="relative size-2 rounded-full bg-foreground" />
      </button>
    </div>
  );
}

function Index() {
  useLenis();
  return (
    <main className="relative">
      <AuroraBackground />
      <CustomCursor />
      <Nav />
      <Arrival />
      <Story />
      <Quote text="Design speaks before your team does." author="Studio credo, no. 07" />
      <Services />
      <Process />
      <Marquee items={["Interactive", "Editorial", "Cinematic", "Human", "Precise", "Alive"]} />
      <Work />
      <Testimonials />
      <Stats />
      <Quote text="People don't remember pages. They remember experiences." />
      <Contact />
      <Footer />
      <Companion />
    </main>
  );
}
