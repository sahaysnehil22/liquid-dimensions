import { useEffect, useRef, useState, createContext, useContext } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";

/* ---------- Atmosphere system ---------- */
export type Atmosphere = "aurora" | "sunrise" | "ocean" | "bloom";

export const ATMOSPHERES: { id: Atmosphere; label: string; swatch: string[] }[] = [
  { id: "aurora",  label: "Aurora",  swatch: ["#c9d7ff", "#e2d6ff", "#dff2ea", "#f1e6ff"] },
  { id: "sunrise", label: "Sunrise", swatch: ["#ffe6cc", "#ffd6b5", "#fff0d9", "#ffe0c2"] },
  { id: "ocean",   label: "Ocean",   swatch: ["#c9e7ff", "#d2f4ea", "#dff0ff", "#e0f7f4"] },
  { id: "bloom",   label: "Bloom",   swatch: ["#ffd6e5", "#ecd6ff", "#fff0d9", "#f5d6ff"] },
];

type Ctx = { atmosphere: Atmosphere; setAtmosphere: (a: Atmosphere) => void; };
const AtmosphereCtx = createContext<Ctx>({ atmosphere: "aurora", setAtmosphere: () => {} });
export const useAtmosphere = () => useContext(AtmosphereCtx);

export function AtmosphereProvider({ children }: { children: React.ReactNode }) {
  const [atmosphere, setAtmosphere] = useState<Atmosphere>("aurora");
  useEffect(() => {
    const saved = (localStorage.getItem("atmosphere") as Atmosphere) || "aurora";
    setAtmosphere(saved);
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-atmosphere", atmosphere);
    localStorage.setItem("atmosphere", atmosphere);
  }, [atmosphere]);
  return (
    <AtmosphereCtx.Provider value={{ atmosphere, setAtmosphere }}>
      {children}
    </AtmosphereCtx.Provider>
  );
}

/* ---------- Aurora animated background ---------- */
export function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div className="aurora-blob" style={{ top:"-20%", left:"-10%", width:"70vw", height:"70vw",
        background:"radial-gradient(circle, var(--aurora-1), transparent 60%)", animation:"aurora-drift 22s ease-in-out infinite" }} />
      <div className="aurora-blob" style={{ top:"10%", right:"-20%", width:"80vw", height:"80vw",
        background:"radial-gradient(circle, var(--aurora-2), transparent 60%)", animation:"aurora-drift-2 28s ease-in-out infinite" }} />
      <div className="aurora-blob" style={{ bottom:"-25%", left:"20%", width:"75vw", height:"75vw",
        background:"radial-gradient(circle, var(--aurora-3), transparent 60%)", animation:"aurora-drift-3 34s ease-in-out infinite" }} />
      <div className="aurora-blob" style={{ top:"40%", left:"30%", width:"55vw", height:"55vw",
        background:"radial-gradient(circle, var(--aurora-4), transparent 60%)", animation:"aurora-drift 40s ease-in-out infinite reverse" }} />
      <div className="grain" />
    </div>
  );
}

/* ---------- Custom cursor (disabled — using native cursor) ---------- */
export function CustomCursor() {
  return null;
}

/* ---------- Vertical editorial branding ---------- */
export function VerticalBrand({
  side = "left",
  top = "10%",
  size = "clamp(4rem, 10vw, 9rem)",
  opacity = 0.06,
  text = "ANTIGRAVITY",
  parallax = 0,
}: {
  side?: "left" | "right";
  top?: string;
  size?: string;
  opacity?: number;
  text?: string;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden>
      <motion.div
        style={{
          y,
          top,
          fontSize: size,
          opacity,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          letterSpacing: "0.35em",
          [side]: "0.5rem",
        } as any}
        className="absolute text-display font-light text-foreground uppercase whitespace-nowrap"
      >
        {text}
      </motion.div>
    </div>
  );
}

/* ---------- Liquid button (magnetic + ripple) ---------- */
export function LiquidButton({
  children, onClick, variant = "primary", cursorLabel,
}: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "ghost"; cursorLabel?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { stiffness: 300, damping: 20 });
  const ty = useSpring(my, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: tx, y: ty }}
      data-cursor="hover"
      data-cursor-label={cursorLabel}
      className={`liquid-btn liquid-btn-hover ${variant === "ghost" ? "!bg-transparent !shadow-none border-foreground/20" : ""}`}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

/* ---------- Atmosphere toggle (pours colored light) ---------- */
export function AtmosphereToggle() {
  const { atmosphere, setAtmosphere } = useAtmosphere();
  const [open, setOpen] = useState(false);
  const [pouring, setPouring] = useState<Atmosphere | null>(null);
  const current = ATMOSPHERES.find(a => a.id === atmosphere)!;

  const choose = (a: Atmosphere) => {
    if (a === atmosphere) { setOpen(false); return; }
    setPouring(a);
    setTimeout(() => { setAtmosphere(a); }, 250);
    setTimeout(() => { setPouring(null); setOpen(false); }, 1400);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Change atmosphere"
        data-cursor="hover" data-cursor-label="MOOD"
        className="liquid-btn liquid-btn-hover !px-4 !py-3 !gap-2"
      >
        <span className="flex -space-x-1">
          {current.swatch.slice(0, 3).map((c, i) => (
            <span key={i} className="size-3 rounded-full border border-foreground/20" style={{ background: c }} />
          ))}
        </span>
        <span className="text-xs tracking-widest uppercase">{current.label}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full right-0 mt-3 liquid rounded-3xl p-2 min-w-[220px] z-50"
          >
            {ATMOSPHERES.map(a => (
              <button
                key={a.id}
                onClick={() => choose(a.id)}
                data-cursor="hover"
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${a.id === atmosphere ? "bg-foreground/5" : "hover:bg-foreground/5"}`}
              >
                <span className="flex -space-x-1">
                  {a.swatch.map((c, i) => (
                    <span key={i} className="size-4 rounded-full border border-foreground/20" style={{ background: c }} />
                  ))}
                </span>
                <span className="text-sm">{a.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {pouring && (
          <motion.div
            initial={{ scale: 0, opacity: 0.9, borderRadius: "100%" }}
            animate={{ scale: 45, opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            className="pointer-events-none fixed top-6 right-6 z-[80] size-24 rounded-full"
            style={{
              background: `conic-gradient(from 90deg, ${ATMOSPHERES.find(a=>a.id===pouring)!.swatch.join(", ")}, ${ATMOSPHERES.find(a=>a.id===pouring)!.swatch[0]})`,
              filter: "blur(40px)",
              mixBlendMode: "multiply",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Split text reveal ---------- */
export function SplitReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.25em] align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1], delay: delay + i * 0.06 }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ---------- Chapter header ---------- */
export function ChapterLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-4 text-eyebrow">
      <span className="tabular-nums">{n}</span>
      <span className="h-px w-14 bg-foreground/30" />
      <span>{title}</span>
    </div>
  );
}

/* ---------- Parallax section wrapper ---------- */
export function Parallax({ children, offset = 60 }: { children: React.ReactNode; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return <motion.div ref={ref} style={{ y }}>{children}</motion.div>;
}

/* ---------- Marquee ---------- */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative overflow-hidden py-6">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex gap-16 whitespace-nowrap text-display text-6xl md:text-8xl opacity-40"
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-16">
            {t}
            <span className="inline-block size-3 rounded-full bg-foreground/40" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
