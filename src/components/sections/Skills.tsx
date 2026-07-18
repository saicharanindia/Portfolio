"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { technologies } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

const safeList = Array.isArray(technologies) ? technologies : [];
const CATS = ["All", "SAP", "Programming", "Web", "Frameworks", "Databases", "Tools", "IT Controls"];

/* Map logo key → SVG/img source — real brand colours */
const LOGO_MAP: Record<string, { bg: string; fg: string; label: string }> = {
  SAP:     { bg: "#0070F3", fg: "#fff",    label: "SAP"    },
  Python:  { bg: "#3776AB", fg: "#FFD343", label: "Py"     },
  C:       { bg: "#A8B9CC", fg: "#1a1a1a", label: "C"      },
  "C++":   { bg: "#004482", fg: "#fff",    label: "C++"    },
  JS:      { bg: "#F7DF1E", fg: "#1a1a1a", label: "JS"     },
  HTML:    { bg: "#E34F26", fg: "#fff",    label: "HTML"   },
  CSS:     { bg: "#1572B6", fg: "#fff",    label: "CSS"    },
  API:     { bg: "#FF6C37", fg: "#fff",    label: "API"    },
  Django:  { bg: "#092E20", fg: "#44B78B", label: "Django" },
  MySQL:   { bg: "#4479A1", fg: "#fff",    label: "MySQL"  },
  SQLite:  { bg: "#003B57", fg: "#fff",    label: "SQLite" },
  Git:     { bg: "#F05032", fg: "#fff",    label: "Git"    },
  Postman: { bg: "#FF6C37", fg: "#fff",    label: "Post"   },
  VSCode:  { bg: "#007ACC", fg: "#fff",    label: "VSCode" },
  ITGC:    { bg: "#1C1C1E", fg: "#FF003C", label: "ITGC"  },
  CTRL:    { bg: "#1C1C1E", fg: "#FF003C", label: "CTRL"  },
  SDLC:    { bg: "#1C1C1E", fg: "#FF003C", label: "SDLC"  },
};

function SkillCard({ tech, index, inView }: { tech: typeof safeList[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const circumference = 2 * Math.PI * 26;
  const dashoffset    = circumference * (1 - tech.level / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.55) }}
      whileHover={{ y: -8, scale: 1.06 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        className="glass-card p-4 flex flex-col items-center text-center relative overflow-hidden"
        style={{
          borderColor: hovered ? "rgba(255,0,60,0.4)" : "rgba(255,255,255,0.07)",
          transition: "border-color 0.3s",
        }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ background: "radial-gradient(circle at center, rgba(255,0,60,0.08), transparent 70%)" }}
            />
          )}
        </AnimatePresence>

        {/* Progress ring with logo badge inside */}
        <div className="relative w-14 h-14 mb-3">
          <svg className="w-full h-full" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
            <motion.circle
              cx="32" cy="32" r="26" fill="none"
              stroke={hovered ? "#FF5E7A" : "#FF003C"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={inView ? dashoffset : circumference}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
              transition={{ duration: 1.2, delay: Math.min(index * 0.06, 0.8) }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[8px] font-bold"
              style={{
                background: LOGO_MAP[tech.logo]?.bg ?? "#1a1a1a",
                color: LOGO_MAP[tech.logo]?.fg ?? "#FF003C",
                lineHeight: 1,
              }}
            >
              {LOGO_MAP[tech.logo]?.label ?? tech.logo.slice(0, 4)}
            </div>
          </div>
        </div>

        <div className="text-[10px] font-semibold mb-0.5" style={{ color: hovered ? "#FF5E7A" : "#fff" }}>
          {tech.name}
        </div>
        <div className="text-[9px] text-white/30">{tech.level}%</div>

        {/* Bottom glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #FF003C, transparent)" }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

function MarqueeRow({ items, reverse }: { items: typeof safeList; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-2" style={{
      maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
    }}>
      <div className="inline-flex gap-3 whitespace-nowrap"
        style={{ animation: `marquee 35s linear infinite ${reverse ? "reverse" : ""}` }}>
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs shrink-0 border border-white/[0.07]"
            style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.55)" }}>
            <div className="w-5 h-5 rounded flex items-center justify-center text-[7px] font-bold shrink-0"
              style={{ background: LOGO_MAP[t.logo]?.bg ?? "#1a1a1a", color: LOGO_MAP[t.logo]?.fg ?? "#fff" }}>
              {(LOGO_MAP[t.logo]?.label ?? t.logo).slice(0, 3)}
            </div>
            <span className="font-medium">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? safeList : safeList.filter(t => t.category === active);

  return (
    <section id="skills" className="section-pad relative" style={{ background: "#050505" }}>
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div className="container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-14">
          <div className="section-subtitle mb-3">Tech Stack</div>
          <h2 className="section-title text-chrome">Technologies</h2>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300"
              style={{
                background:   active === cat ? "rgba(255,0,60,0.12)" : "rgba(255,255,255,0.03)",
                borderColor:  active === cat ? "rgba(255,0,60,0.4)"  : "rgba(255,255,255,0.07)",
                color:        active === cat ? "#FF5E7A"              : "rgba(255,255,255,0.4)",
                boxShadow:    active === cat ? "0 0 16px rgba(255,0,60,0.15)" : "none",
              }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 mb-12">
            <AnimatePresence mode="popLayout">
              {filtered.map((tech, i) => (
                <SkillCard key={tech.name} tech={tech} index={i} inView={inView} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-center text-white/30 py-12 text-sm">No technologies in this category.</p>
        )}

        <div className="space-y-2 overflow-hidden">
          <MarqueeRow items={safeList.slice(0, Math.ceil(safeList.length / 2))} />
          <MarqueeRow items={safeList.slice(Math.ceil(safeList.length / 2))} reverse />
        </div>
      </div>
    </section>
  );
}
