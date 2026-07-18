"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, CheckCircle, ArrowRight, Car } from "lucide-react";
import { projects } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

/* ── Inline project logos ── */
function LogoLuxDrive({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LuxDrive Portal">
      <rect width="80" height="80" rx="16" fill="#0A0A0A" stroke="#FF003C" strokeWidth="1.5"/>
      {/* Car silhouette */}
      <rect x="14" y="44" width="52" height="14" rx="4" fill="#FF003C" opacity="0.9"/>
      <ellipse cx="24" cy="58" rx="7" ry="7" fill="#1a1a1a" stroke="#FF003C" strokeWidth="2"/>
      <ellipse cx="56" cy="58" rx="7" ry="7" fill="#1a1a1a" stroke="#FF003C" strokeWidth="2"/>
      <ellipse cx="24" cy="58" rx="3" ry="3" fill="#FF003C"/>
      <ellipse cx="56" cy="58" rx="3" ry="3" fill="#FF003C"/>
      {/* Roof */}
      <path d="M22 44 L28 28 L52 28 L58 44 Z" fill="#FF003C" opacity="0.7"/>
      <rect x="30" y="30" width="20" height="12" rx="2" fill="#0A0A0A" opacity="0.5"/>
      {/* LUX text */}
      <text x="20" y="22" fontFamily="Arial" fontWeight="900" fontSize="11" fill="#FF5E7A" letterSpacing="2">LUX</text>
    </svg>
  );
}

function LogoAttendance({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Student Attendance Tracker">
      <rect width="80" height="80" rx="16" fill="#0A0A0A" stroke="#FF5E7A" strokeWidth="1.5"/>
      {/* Clipboard */}
      <rect x="18" y="20" width="44" height="48" rx="4" fill="none" stroke="#FF5E7A" strokeWidth="1.5"/>
      <rect x="28" y="14" width="24" height="12" rx="4" fill="#FF5E7A" opacity="0.25" stroke="#FF5E7A" strokeWidth="1.5"/>
      {/* Check lines */}
      <line x1="26" y1="36" x2="54" y2="36" stroke="#FF5E7A" strokeWidth="1.5" opacity="0.4"/>
      <polyline points="26,36 30,40 38,32" stroke="#FF003C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="26" y1="46" x2="54" y2="46" stroke="#FF5E7A" strokeWidth="1.5" opacity="0.4"/>
      <polyline points="26,46 30,50 38,42" stroke="#FF003C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <line x1="26" y1="56" x2="54" y2="56" stroke="#FF5E7A" strokeWidth="1.5" opacity="0.4"/>
      <polyline points="26,56 30,60 38,52" stroke="#FF003C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* 60% bar */}
      <rect x="18" y="70" width="44" height="4" rx="2" fill="#1a1a1a"/>
      <rect x="18" y="70" width="26" height="4" rx="2" fill="#FF003C" opacity="0.85"/>
    </svg>
  );
}

const PROJECT_LOGOS: Record<number, React.ReactNode> = {
  1: <LogoLuxDrive    size={52} />,
  2: <LogoAttendance  size={52} />,
};

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x:  ((e.clientY - r.top)  / r.height - 0.5) * 10,
      y: -((e.clientX - r.left) / r.width  - 0.5) * 10,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
      }}
    >
      <div
        className="glass-card relative overflow-hidden h-full"
        style={{
          borderColor: hovered ? `${project.accentColor}40` : "rgba(255,255,255,0.07)",
          transition: "border-color 0.4s",
        }}
      >
        {/* Top accent */}
        <div
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.3s",
          }}
        />

        <div className="p-7">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6 gap-4">
            {/* Project logo */}
            <motion.div
              animate={hovered ? { scale: 1.05, rotate: [0, -2, 2, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
            >
              {PROJECT_LOGOS[project.id] ?? (
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/[0.07]"
                  style={{ background: `${project.accentColor}15` }}
                >
                  <Car size={22} style={{ color: project.accentColor }} />
                </div>
              )}
            </motion.div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="badge text-[10px]">{project.status}</span>
              <span className="text-[10px] text-white/25 font-mono">{project.year}</span>
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold mb-1 leading-tight transition-colors duration-300"
            style={{ color: hovered ? project.accentColor : "#fff" }}
          >
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
            {project.longDescription}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            {project.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                <CheckCircle size={10} style={{ color: project.accentColor, flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tech.map((t) => (
              <span key={t} className="badge text-[10px]">{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}, #FF5E7A)`,
                boxShadow: hovered ? `0 4px 20px ${project.accentColor}50` : "none",
              }}
            >
              <Github size={12} /> Source <ArrowRight size={11} />
            </a>
            <a
              href={project.demo}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border transition-all duration-300"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
            >
              <ExternalLink size={12} /> Live Demo
            </a>
          </div>
        </div>

        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-[20px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ background: `radial-gradient(circle at 20% 20%, ${project.accentColor}08, transparent 65%)` }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView();

  return (
    <section id="projects" className="section-pad relative" style={{ background: "#080808" }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,0,60,0.06), transparent 70%)", filter: "blur(50px)" }}
      />

      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16"
        >
          <div className="section-subtitle mb-3">Projects</div>
          <h2 className="section-title text-chrome">Selected Work</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }} className="mt-10 text-center"
        >
          <a
            href="https://github.com/saicharanindia"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex"
          >
            <Github size={14} /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
