"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Star, GitFork, Code2, Activity, Zap, Cpu, Database, Globe } from "lucide-react";
import { personal } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

const USER = personal.githubUser;

/* ── Y2K Glitch Text ── */
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 120);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {glitching && (
        <>
          <span className="absolute inset-0 text-[#FF003C]" style={{ clipPath: "polygon(0 20%,100% 20%,100% 40%,0 40%)", transform: "translateX(-3px)" }} aria-hidden>
            {text}
          </span>
          <span className="absolute inset-0 text-[#00D4FF]" style={{ clipPath: "polygon(0 60%,100% 60%,100% 80%,0 80%)", transform: "translateX(3px)" }} aria-hidden>
            {text}
          </span>
        </>
      )}
      <span className={glitching ? "opacity-80" : ""}>{text}</span>
    </span>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "", delay = 0 }: { target: number; suffix?: string; delay?: number }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const t = setTimeout(() => {
      const dur = 1600, s = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - s) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [inView, target, delay]);
  return <span ref={ref} className="tabular-nums">{val}{suffix}</span>;
}

/* ── Scan line overlay ── */
function Scanlines() {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden z-10 opacity-[0.04]"
      style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 4px)", backgroundSize: "100% 4px" }} />
  );
}

/* ── Language bars (static, no external image) ── */
const LANGUAGES = [
  { name: "Python",     pct: 48, color: "#3776AB" },
  { name: "JavaScript", pct: 28, color: "#F7DF1E" },
  { name: "HTML",       pct: 12, color: "#E34F26" },
  { name: "CSS",        pct:  8, color: "#1572B6" },
  { name: "Django",     pct:  4, color: "#44B78B" },
];

function LanguageBars({ inView }: { inView: boolean }) {
  return (
    <div className="space-y-3">
      {LANGUAGES.map((lang, i) => (
        <motion.div key={lang.name}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-mono font-semibold" style={{ color: lang.color }}>{lang.name}</span>
            <span className="text-[10px] font-mono text-white/35">{lang.pct}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${lang.color}, ${lang.color}88)`, boxShadow: `0 0 8px ${lang.color}60` }}
              initial={{ width: "0%" }}
              animate={inView ? { width: `${lang.pct}%` } : {}}
              transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Activity heatmap (deterministic fake) ── */
const WEEKS = 26;
const DAYS  = 7;
const HEAT  = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: DAYS }, (_, d) => {
    const seed = (w * 7 + d + 13) % 17;
    return seed < 5 ? 0 : seed < 9 ? 1 : seed < 13 ? 2 : seed < 16 ? 3 : 4;
  })
);
const HEAT_COLORS = ["rgba(255,255,255,0.04)", "rgba(255,0,60,0.25)", "rgba(255,0,60,0.45)", "rgba(255,0,60,0.68)", "#FF003C"];

function ContribHeatmap({ inView }: { inView: boolean }) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex gap-1 min-w-max">
        {HEAT.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <motion.div
                key={di}
                className="w-3 h-3 rounded-sm"
                style={{ background: HEAT_COLORS[level], boxShadow: level >= 3 ? `0 0 6px rgba(255,0,60,0.5)` : "none" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: (wi * 7 + di) * 0.002 }}
                whileHover={{ scale: 1.5, zIndex: 10 }}
                title={`Level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Repo cards ── */
const REPOS = [
  { name: "luxury-drive-portal",       desc: "Premium vehicle rental management system",        stars: 12, forks: 3,  lang: "JavaScript", langColor: "#F7DF1E" },
  { name: "student-attendance-tracker",desc: "Automated attendance with analytics dashboard",    stars: 8,  forks: 2,  lang: "Python",      langColor: "#3776AB" },
  { name: "sap-abap-learning",         desc: "SAP ABAP programs, notes, and ERP exercises",     stars: 15, forks: 5,  lang: "ABAP",        langColor: "#FF003C" },
  { name: "django-rest-projects",      desc: "REST API backend projects using Django framework", stars: 6,  forks: 1,  lang: "Python",      langColor: "#3776AB" },
];

function RepoCard({ repo, index, inView }: { repo: typeof REPOS[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative"
    >
      <div className="glass-card p-5 relative overflow-hidden"
        style={{ borderColor: hovered ? "rgba(255,0,60,0.35)" : "rgba(255,255,255,0.07)", transition: "border-color 0.3s" }}>
        <Scanlines />
        {/* Animated corner accent */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FF003C] rounded-tl-xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FF003C] rounded-br-xl opacity-60" />

        <div className="flex items-start justify-between mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(255,0,60,0.1)", border: "1px solid rgba(255,0,60,0.2)" }}>
            <Github size={14} style={{ color: "#FF003C" }} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] px-1.5 py-0.5 rounded font-mono"
              style={{ background: `${repo.langColor}20`, border: `1px solid ${repo.langColor}40`, color: repo.langColor }}>
              {repo.lang}
            </span>
          </div>
        </div>

        <div className="text-xs font-semibold text-white mb-1 font-mono truncate group-hover:text-[#FF5E7A] transition-colors">
          {repo.name}
        </div>
        <div className="text-[10px] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
          {repo.desc}
        </div>

        <div className="flex items-center gap-3 text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span className="flex items-center gap-1"><Star size={9} style={{ color: "#FF003C" }} />{repo.stars}</span>
          <span className="flex items-center gap-1"><GitFork size={9} />{repo.forks}</span>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div className="absolute inset-0 pointer-events-none rounded-[20px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ background: "radial-gradient(circle at top left, rgba(255,0,60,0.06), transparent 65%)" }} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Terminal typing effect ── */
const LINES = [
  "$ git clone https://github.com/saicharanindia",
  "Cloning into 'portfolio'...",
  "$ git log --oneline -5",
  "a3f9c2e feat: SAP ABAP module integration",
  "b1d4e7a fix: attendance tracker edge cases",
  "c8f2a1b feat: LuxDrive booking system",
  "$ git status",
  "On branch main — nothing to commit ✓",
];

function TerminalWidget({ inView }: { inView: boolean }) {
  const [lines, setLines] = useState<string[]>([]);
  const [cursor, setCursor] = useState(true);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const iv = setInterval(() => {
      setLines(prev => [...prev, LINES[i % LINES.length]]);
      i++;
      if (i >= LINES.length) clearInterval(iv);
    }, 400);
    const cursorIv = setInterval(() => setCursor(c => !c), 500);
    return () => { clearInterval(iv); clearInterval(cursorIv); };
  }, [inView]);

  return (
    <div className="glass-card p-5 relative overflow-hidden" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <Scanlines />
      {/* Terminal header bar */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-[10px] text-white/30 ml-2 tracking-widest">TERMINAL — saicharanindia</span>
      </div>
      <div className="space-y-1 text-[11px]">
        {lines.map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: line.startsWith("$") ? "#FF5E7A" : line.startsWith("On branch") ? "#4ade80" : "rgba(255,255,255,0.55)" }}>
            {line}
          </motion.div>
        ))}
        <span style={{ color: "#FF5E7A" }}>$ <span style={{ opacity: cursor ? 1 : 0 }}>▋</span></span>
      </div>
    </div>
  );
}

/* ── Main section ── */
export default function GitHubSection() {
  const { ref, inView } = useInView();

  const bigStats = [
    { label: "Repositories",  value: 10,  suffix: "+", icon: Code2    },
    { label: "Stars Earned",  value: 30,  suffix: "+", icon: Star     },
    { label: "Contributions", value: 200, suffix: "+", icon: Activity },
    { label: "Languages",     value: 6,   suffix: "",  icon: Globe    },
  ];

  return (
    <section id="github" className="section-pad relative" style={{ background: "#050505" }}>
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      {/* Y2K animated gradient blobs */}
      <motion.div className="absolute pointer-events-none"
        style={{ top: "10%", right: "5%", width: "30vw", height: "30vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,60,0.07), transparent 70%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{ bottom: "5%", left: "3%", width: "25vw", height: "25vw", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.04), transparent 70%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div className="container" ref={ref}>
        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left — title */}
            <div>
              <div className="section-subtitle mb-3">GitHub</div>
              <h2 className="section-title">
                <GlitchText text="DEVELOPER" className="text-chrome" />{" "}
                <span className="text-chrome">DASHBOARD</span>
              </h2>
              <motion.div className="flex items-center gap-3 mt-4"
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
                <motion.div className="w-2 h-2 rounded-full bg-[#FF003C]"
                  animate={{ scale: [1, 1.5, 1], boxShadow: ["0 0 4px #FF003C", "0 0 14px #FF003C", "0 0 4px #FF003C"] }}
                  transition={{ duration: 1.4, repeat: Infinity }} />
                <span className="text-xs font-mono text-white/40 tracking-widest">LIVE · GITHUB.COM/{USER.toUpperCase()}</span>
              </motion.div>
            </div>

            {/* Right — GitHub logo panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="glass-card p-6 relative overflow-hidden flex flex-col items-center gap-4"
                style={{ borderColor: "rgba(255,0,60,0.2)", minWidth: "220px" }}>
                <Scanlines />
                {/* Animated corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#FF003C] rounded-tl-xl opacity-70" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF003C] rounded-br-xl opacity-70" />

                {/* GitHub Octocat SVG — red themed */}
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="72" height="72" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" aria-label="GitHub">
                    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                      fill="#FF003C"/>
                    {/* Red glow layer */}
                    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                      fill="rgba(255,94,122,0.3)"/>
                  </svg>
                </motion.div>

                {/* GitHub wordmark */}
                <div style={{ fontFamily: "'Bebas Neue', Impact, sans-serif", fontSize: "1.8rem",
                  letterSpacing: "0.08em", color: "#FF003C",
                  textShadow: "0 0 16px rgba(255,0,60,0.5), 0 0 32px rgba(255,0,60,0.2)" }}>
                  GitHub
                </div>

                {/* Username */}
                <a href={`https://github.com/${USER}`} target="_blank" rel="noopener noreferrer"
                  className="text-xs font-mono text-white/40 hover:text-[#FF5E7A] transition-colors tracking-wider">
                  @{USER}
                </a>

                {/* Pulsing activity indicator */}
                <div className="flex items-center gap-2">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-[#FF003C]"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6], boxShadow: ["0 0 4px #FF003C", "0 0 10px #FF003C", "0 0 4px #FF003C"] }}
                    transition={{ duration: 1.5, repeat: Infinity }} />
                  <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">Active Developer</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Big stat cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {bigStats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="glass-card p-5 text-center relative overflow-hidden group"
            >
              <Scanlines />
              {/* Animated border glow on hover */}
              <motion.div className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{ border: "1px solid rgba(255,0,60,0)" }}
                whileHover={{ border: "1px solid rgba(255,0,60,0.4)", boxShadow: "0 0 20px rgba(255,0,60,0.12)" }}
              />
              <s.icon size={18} className="mx-auto mb-3 opacity-50" style={{ color: "#FF003C" }} />
              <div className="text-3xl font-display font-bold mb-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FF003C",
                  textShadow: "0 0 14px rgba(255,0,60,0.5)" }}>
                <Counter target={s.value} suffix={s.suffix} delay={i * 120} />
              </div>
              <div className="text-[9px] text-white/30 uppercase tracking-[0.2em] font-mono">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── Main grid: Languages + Terminal ── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Languages */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="glass-card p-6 relative overflow-hidden h-full">
              <Scanlines />
              <div className="flex items-center gap-2 mb-6">
                <Cpu size={14} style={{ color: "#FF003C" }} />
                <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Top Languages</span>
                <motion.div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FF003C]"
                  animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
              </div>
              <LanguageBars inView={inView} />
            </div>
          </motion.div>

          {/* Terminal */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <TerminalWidget inView={inView} />
          </motion.div>
        </div>

        {/* ── Contribution heatmap ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="mb-8">
          <div className="glass-card p-6 relative overflow-hidden">
            <Scanlines />
            {/* Scan line sweep */}
            <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,0,60,0.5), transparent)", zIndex: 20 }}
              animate={{ top: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Database size={14} style={{ color: "#FF003C" }} />
                <span className="text-xs font-mono text-white/40 tracking-widest uppercase">Contribution Activity</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/25">
                <span>Less</span>
                {HEAT_COLORS.map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
                ))}
                <span>More</span>
              </div>
            </div>
            <ContribHeatmap inView={inView} />
          </div>
        </motion.div>

        {/* ── Repo cards ── */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
          className="flex items-center gap-2 mb-5">
          <Zap size={13} style={{ color: "#FF003C" }} />
          <span className="text-xs font-mono text-white/30 uppercase tracking-widest">Pinned Repositories</span>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {REPOS.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} index={i} inView={inView} />
          ))}
        </div>

        {/* ── GitHub profile link ── */}
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="text-center">
          <motion.a href={`https://github.com/${USER}`} target="_blank" rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
            whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(255,0,60,0.2)" }}
            whileTap={{ scale: 0.97 }}>
            <Github size={15} />
            github.com/{USER}
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
