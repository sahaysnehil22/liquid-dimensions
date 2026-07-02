import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";

/* ---------- Aurora animated background ---------- */
export function AuroraBackground() {
  return (
    <div className="aurora-bg">
      <div
        className="aurora-blob"
        style={{
          top: "-20%", left: "-10%", width: "70vw", height: "70vw",
          background: "radial-gradient(circle, var(--aurora-1), transparent 60%)",
          animation: "aurora-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: "10%", right: "-20%", width: "80vw", height: "80vw",
          background: "radial-gradient(circle, var(--aurora-2), transparent 60%)",
          animation: "aurora-drift-2 28s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          bottom: "-25%", left: "20%", width: "75vw", height: "75vw",
          background: "radial-gradient(circle, var(--aurora-3), transparent 60%)",
          animation: "aurora-drift-3 34s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: "40%", left: "30%", width: "55vw", height: "55vw",
          background: "radial-gradient(circle, var(--aurora-4), transparent 60%)",
          animation: "aurora-drift 40s ease-in-out infinite reverse",
        }}
      />
      <div className="grain" />
    </div>
  );
}

/* ---------- Custom magnetic cursor ---------- */
export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) { setIsTouch(true); return; }
    document.documentElement.classList.add("cursor-none");
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (isTouch) return null;
  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: hover ? 68 : 34, height: hover ? 68 : 34, opacity: hover ? 0.9 : 0.65 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full border mix-blend-difference"
        style={{
          x: ringX, y: ringY, translateX: "-50%", translateY: "-50%",
          borderColor: "color-mix(in oklab, white 80%, transparent)",
          backdropFilter: "invert(1)",
        } as any}
      />
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        className="pointer-events-none fixed top-0 left-0 z-[100] size-1.5 rounded-full bg-foreground mix-blend-difference"
      />
    </>
  );
}

/* ---------- Liquid button (magnetic + ripple) ---------- */
export function LiquidButton({
  children, onClick, variant = "primary",
}: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "ghost" }) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { stiffness: 200, damping: 15 });
  const ty = useSpring(my, { stiffness: 200, damping: 15 });

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
      className={`liquid-btn liquid-btn-hover ${variant === "ghost" ? "!bg-transparent !shadow-none border-foreground/20" : ""}`}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

/* ---------- Theme toggle with "liquify" transition ---------- */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [morphing, setMorphing] = useState(false);
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setMorphing(true);
    setTimeout(() => {
      const next = !dark;
      setDark(next);
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
    }, 300);
    setTimeout(() => setMorphing(false), 1200);
  };
  return (
    <>
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="liquid-btn liquid-btn-hover !px-4 !py-3"
      >
        <span className="relative flex size-4 items-center justify-center">
          <span className={`absolute inset-0 rounded-full transition-all duration-500 ${dark ? "bg-transparent" : "bg-foreground"}`} />
          <span className={`absolute inset-0 rounded-full border border-foreground transition-all duration-500 ${dark ? "translate-x-1 -translate-y-1 scale-90" : "scale-0"}`} />
        </span>
      </button>
      <AnimatePresence>
        {morphing && (
          <motion.div
            initial={{ scale: 0, opacity: 1, borderRadius: "100%" }}
            animate={{ scale: 40, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
            className="pointer-events-none fixed top-6 right-6 z-[80] size-20 rounded-full"
            style={{
              background:
                "conic-gradient(from 90deg, var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-4), var(--aurora-1))",
              filter: "blur(30px)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- Split text reveal ---------- */
export function SplitReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.25em]">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
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
