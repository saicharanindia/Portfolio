"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download, MapPin, Mail, Phone } from "lucide-react";
import { personal, stats } from "@/data/portfolio";

const PARTICLES = [
  { x: 8,  y: 12, s: 2.5, d: 6,   delay: 0,   type: 0 },
  { x: 23, y: 68, s: 1.5, d: 8,   delay: 1.2, type: 1 },
  { x: 45, y: 25, s: 3,   d: 7,   delay: 0.4, type: 0 },
  { x: 58, y: 80, s: 2,   d: 9,   delay: 2,   type: 2 },
  { x: 72, y: 18, s: 1.8, d: 6.5, delay: 0.8, type: 1 },
  { x: 85, y: 55, s: 2.8, d: 7.5, delay: 1.5, type: 0 },
  { x: 15, y: 45, s: 1.5, d: 8.5, delay: 3,   type: 2 },
  { x: 38, y: 88, s: 2.2, d: 5.5, delay: 0.3, type: 0 },
  { x: 62, y: 40, s: 1.8, d: 9,   delay: 1.8, type: 1 },
  { x: 91, y: 30, s: 3,   d: 6,   delay: 0.6, type: 0 },
  { x: 28, y: 72, s: 1.5, d: 7,   delay: 2.5, type: 1 },
  { x: 78, y: 85, s: 2,   d: 8,   delay: 1,   type: 2 },
];
const P_COLORS = ["rgba(255,0,60,0.8)", "rgba(255,94,122,0.6)", "rgba(0,255,255,0.35)"];
const P_GLOW   = ["0 0 8px rgba(255,0,60,0.7)", "0 0 6px rgba(255,94,122,0.5)", "0 0 6px rgba(0,255,255,0.4)"];

/* Y2K: Glitch name — RGB split on a cadence */
function GlitchHeroName({ text, color, delay }: { text: string; color: "chrome" | "red"; delay: number }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const fire = () => { setGlitching(true); setTimeout(() => setGlitching(false), 500); };
    const id = setInterval(fire, 6000 + delay * 1000);
    const t  = setTimeout(fire, 2800 + delay * 600);
    return () => { clearInterval(id); clearTimeout(t); };
  }, [delay]);

  const baseStyle: React.CSSProperties = color === "chrome" ? {
    fontFamily: "'Bebas Neue', Impact, sans-serif",
    WebkitTextFillColor: "transparent",
    background: "linear-gradient(135deg,#FFFFFF 0%,#EAEAEA 30%,#C0C0C0 55%,#EAEAEA 75%,#FFFFFF 100%)",
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    animation: "chromeShine 5s linear infinite",
  } : {
    fontFamily: "'Bebas Neue', Impact, sans-serif",
    WebkitTextFillColor: "transparent",
    background: "linear-gradient(135deg,#FF003C 0%,#FF1744 40%,#FF5E7A 70%,#FF003C 100%)",
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    animation: "chromeShine 4s linear infinite",
    filter: "drop-shadow(0 0 18px rgba(255,0,60,0.45))",
  };

  return (
    <span
      className={`hero-title leading-none select-none ${glitching ? "warp-glitch" : ""}`}
      style={baseStyle}
      aria-label={text}
    >
      <CharReveal text={text} delay={color === "chrome" ? 0.25 : 0.45} />
    </span>
  );
}

/* Y2K: Typing cursor for tagline */
function TypewriterTagline({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const id = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) { clearInterval(id); setDone(true); }
      }, 22);
      return () => clearInterval(id);
    }, 1400);
    return () => clearTimeout(t);
  }, [text]);
  return (
    <span>
      {displayed}
      {!done && <span style={{ color: "#FF003C", animation: "blink 1s step-end infinite", fontWeight: 700 }}>█</span>}
    </span>
  );
}

/* Y2K: Hex counter decoration */
function HexTicker() {
  const [hex, setHex] = useState("0x00FF003C");
  useEffect(() => {
    const id = setInterval(() => {
      const r = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, "0");
      setHex(`0x${r}`);
    }, 150);
    setTimeout(() => clearInterval(id), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "9px", color: "rgba(255,0,60,0.4)",
      letterSpacing: "0.1em",
    }}>{hex}</span>
  );
}

function CharReveal({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span key={i} className="inline-block"
          style={{ display: ch === " " ? "inline" : "inline-block" }}
          initial={{ y: 100, opacity: 0, rotateX: -60, scale: 0.8 }}
          animate={{ y: 0,   opacity: 1, rotateX: 0,   scale: 1 }}
          transition={{ duration: 0.7, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

function Counter({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const dur = 1800, s = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - s) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return <span className="tabular-nums">{val}{suffix}</span>;
}

function EnergyRing({ size, delay, opacity }: { size: number; delay: number; opacity: number }) {
  return (
    <motion.div className="absolute rounded-full border pointer-events-none"
      style={{ width: size, height: size, borderColor: `rgba(255,0,60,${opacity})`,
        top: "50%", left: "50%", marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ scale: [0.88, 1.06, 0.88], opacity: [opacity * 0.3, opacity, opacity * 0.3] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const scrollDown = () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Grid */}
      <div className="grid-bg absolute inset-0" />
      {/* Scanlines */}
      <div className="scanlines absolute inset-0 pointer-events-none opacity-25" />

      {/* Energy rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <EnergyRing size={700} delay={0}   opacity={0.05} />
        <EnergyRing size={500} delay={1.2} opacity={0.07} />
        <EnergyRing size={320} delay={2.1} opacity={0.09} />
      </div>

      {/* Ambient glows */}
      <motion.div className="absolute pointer-events-none"
        style={{ top: "-20%", right: "-10%", width: "60vw", height: "60vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,60,0.08) 0%, transparent 65%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{ bottom: "-15%", left: "-10%", width: "50vw", height: "50vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,60,0.04) 0%, transparent 65%)", filter: "blur(100px)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.s}px`, height: `${p.s}px`,
                background: P_COLORS[p.type], boxShadow: P_GLOW[p.type] }}
              animate={{ y: [0, -32, 0], x: [0, p.x % 2 === 0 ? 8 : -8, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <motion.div className="container relative z-10 w-full" style={{ x: springX, y: springY }}>
        <div className="grid lg:grid-cols-2 gap-8 items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8">

          {/* ── LEFT — text ── */}
          <div>
            {/* Status badge — Y2K style */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,0,60,0.12)",
                border: "1px solid rgba(255,0,60,0.3)",
                borderRadius: "4px",
                padding: "4px 10px",
                fontSize: "10px",
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#FF5E7A",
                position: "relative",
              }} className="y2k-corners scan-sweep">
                <motion.span
                  style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#FF003C", flexShrink: 0 }}
                  animate={{ opacity: [1, 0.3, 1], boxShadow: ["0 0 4px #FF003C", "0 0 10px #FF003C", "0 0 4px #FF003C"] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                {personal.status}
                <span style={{ marginLeft: 4 }} className="data-corrupt">_SYS.READY</span>
              </span>
            </motion.div>

            {/* Name — Y2K glitch */}
            <div className="mb-8 overflow-visible" style={{ perspective: "1200px" }}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <GlitchHeroName text={personal.firstName.toUpperCase()} color="chrome" delay={0} />
                <GlitchHeroName text={personal.lastName.toUpperCase()} color="red" delay={1} />
              </div>
              {/* Y2K hex ticker below name */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
                className="flex items-center gap-3 mt-2">
                <HexTicker />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "rgba(255,255,255,0.12)", letterSpacing: "0.08em" }}>
                  ████░░░░ LOADING PORTFOLIO
                </span>
              </motion.div>
            </div>

            {/* Role */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }} className="flex items-center gap-3 mb-5">
              <motion.div className="h-px" style={{ background: "#FF003C" }}
                initial={{ width: 0 }} animate={{ width: 32 }}
                transition={{ duration: 0.6, delay: 1.1 }} />
              <span className="section-subtitle text-xs tracking-[0.22em]" style={{ color: "#FF5E7A" }}>
                SAP ABAP Developer · Software Developer · IT Career Seeker
              </span>
            </motion.div>

            {/* Tagline — typewriter Y2K */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1 }}
              className="text-base sm:text-lg leading-relaxed mb-6 max-w-lg blink-cursor"
              style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>
              <TypewriterTagline text={personal.tagline} />
            </motion.p>

            {/* Contact meta */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }} className="flex flex-wrap gap-4 mb-10">
              {[
                { icon: MapPin, text: personal.location },
                { icon: Mail,   text: personal.email    },
                { icon: Phone,  text: personal.phone    },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-xs"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>
                  <Icon size={11} style={{ color: "#FF003C" }} />{text}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 }} className="flex flex-wrap gap-4">
              <motion.button onClick={scrollDown} className="btn-red"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,0,60,0.7)" }}
                whileTap={{ scale: 0.96 }}>
                Explore Portfolio <ArrowDown size={14} />
              </motion.button>
              <motion.a href="/resume.pdf" download className="btn-ghost"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Download size={14} /> Download Resume
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT — big photo + stats ── */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="flex flex-col items-center gap-7">

            {/* ── LARGE PROFILE PHOTO ── */}
            <motion.div className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>

              {/* Animated glow rings — circular */}
              <motion.div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: "2px solid rgba(255,0,60,0.4)" }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.9, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity }} />
              <motion.div className="absolute pointer-events-none"
                style={{ inset: "-12px", borderRadius: "50%", border: "1px solid rgba(255,0,60,0.2)" }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.6, 0.15] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.6 }} />
              <motion.div className="absolute pointer-events-none"
                style={{ inset: "-24px", borderRadius: "50%", border: "1px solid rgba(255,0,60,0.09)" }}
                animate={{ scale: [1, 1.04, 1], opacity: [0.08, 0.4, 0.08] }}
                transition={{ duration: 4.8, repeat: Infinity, delay: 1.2 }} />

              {/* Photo — full circle, face centered */}
              <div className="relative rounded-full overflow-hidden"
                style={{
                  width: "260px",
                  height: "260px",
                  border: "3px solid rgba(255,0,60,0.65)",
                  boxShadow: "0 0 50px rgba(255,0,60,0.4), 0 0 100px rgba(255,0,60,0.15)",
                }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/avatar.jpg"
                  alt="Sanivarapu Sai Charan"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                    transform: "scale(1.15)",
                    transformOrigin: "center 20%",
                    filter: "contrast(1.08) brightness(1.05) saturate(1.08)",
                    display: "block",
                  }}
                  onError={(e) => {
                    const img = e.currentTarget;
                    const wrap = img.parentElement;
                    if (wrap) {
                      img.style.display = "none";
                      wrap.style.background = "rgba(255,0,60,0.08)";
                      wrap.style.display = "flex";
                      wrap.style.alignItems = "center";
                      wrap.style.justifyContent = "center";
                      wrap.style.color = "#FF003C";
                      wrap.style.fontSize = "64px";
                      wrap.textContent = "👤";
                    }
                  }}
                />
                {/* Dark vignette edges */}
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, transparent 55%, rgba(5,5,5,0.4) 100%)" }} />
              </div>

              {/* Name pill below photo */}
              <motion.div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
                <div className="px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.12em] border"
                  style={{
                    background: "rgba(5,5,5,0.92)", backdropFilter: "blur(12px)",
                    borderColor: "rgba(255,0,60,0.45)", color: "#FF5E7A",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.7), 0 0 14px rgba(255,0,60,0.25)",
                    fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.14em",
                  }}>
                  SANIVARAPU SAI CHARAN
                </div>
              </motion.div>
            </motion.div>

            {/* ── Stats card ── */}
            <div className="glass-red rounded-3xl p-6 w-full relative overflow-hidden mt-3">
              <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,0,60,0.5), transparent)", zIndex: 2 }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <motion.div className="w-2 h-2 rounded-full" style={{ background: "#FF003C" }}
                    animate={{ scale: [1,1.6,1], boxShadow: ["0 0 4px #FF003C","0 0 14px #FF003C","0 0 4px #FF003C"] }}
                    transition={{ duration: 1.4, repeat: Infinity }} />
                  <span className="text-[10px] tracking-[0.3em] text-red/70 uppercase font-mono">
                    SAP ABAP Dev · Software Dev · IT Career Seeker
                  </span>
                </div>
                <div className="section-divider mb-4" />
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }} className="flex flex-col gap-0.5">
                      <div className="text-2xl font-bold"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FF003C",
                          textShadow: "0 0 12px rgba(255,0,60,0.5)" }}>
                        <Counter target={s.value} suffix={s.suffix} delay={(0.9 + i * 0.1) * 1000} />
                      </div>
                      <div className="text-[10px] text-white/30 tracking-wide uppercase font-mono">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability chip */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="glass rounded-2xl px-5 py-3 flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <motion.div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }}
                  animate={{ scale: [1,1.5,1], opacity: [0.7,1,0.7] }}
                  transition={{ duration: 1.8, repeat: Infinity }} />
                <span className="text-xs text-white/50">Available globally · Open to internships</span>
              </div>
              <span className="text-[10px] text-white/20 font-mono">India / Remote</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
          <button onClick={scrollDown} className="flex flex-col items-center gap-2" aria-label="Scroll down">
            <motion.span className="text-[9px] tracking-[0.35em] uppercase font-mono"
              style={{ color: "rgba(255,255,255,0.2)" }}
              animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity }}>
              Scroll
            </motion.span>
            <motion.div className="w-px h-10"
              style={{ background: "linear-gradient(180deg, rgba(255,0,60,0.6), transparent)" }}
              animate={{ scaleY: [0.3,1,0.3], opacity: [0.3,1,0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
