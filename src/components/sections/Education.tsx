"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, CheckCircle, Code2, Trophy, Rocket, BookOpen, Globe2 } from "lucide-react";
import { education, careerTimeline } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";
import { LogoSAP, LogoTCS, LogoAccenture, LogoDeloitte } from "@/components/ui/CompanyLogos";
/* Map year → icon component */
const TIMELINE_ICONS: Record<string, React.ReactNode> = {
  "2023": <BookOpen  size={16} style={{ color: "#FF003C" }} />,
  "2024": <Code2     size={16} style={{ color: "#FF003C" }} />,
  "2025": <Trophy    size={16} style={{ color: "#FF003C" }} />,
  "2026": <Rocket    size={16} style={{ color: "#FF003C" }} />,
  "2027": <Globe2    size={16} style={{ color: "#FF003C" }} />,
};

export default function Education() {
  const { ref, inView } = useInView();
  const edu = education[0];

  return (
    <section id="education" className="section-pad relative" style={{ background: "#080808" }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,0,60,0.05), transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-16"
        >
          <div className="section-subtitle mb-3">Education</div>
          <h2 className="section-title text-chrome">Academic Foundation</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* ── Institution card ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass-red rounded-3xl p-8 relative overflow-hidden"
          >
            {/* Scan line */}
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,0,60,0.35), transparent)" }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/[0.07]"
                style={{ background: "rgba(255,0,60,0.1)" }}
              >
                <GraduationCap size={26} style={{ color: "#FF003C" }} />
              </div>

              <span className="tag mb-4 inline-flex">{edu.status}</span>

              <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{edu.degree}</h3>
              <div className="font-medium mb-1" style={{ color: "#FF5E7A" }}>{edu.branch}</div>
              <div className="text-sm text-white/40 mb-5">{edu.institution}</div>

              <div className="flex flex-wrap gap-5 mb-5 text-sm text-white/40">
                <span className="flex items-center gap-2">
                  <Calendar size={13} style={{ color: "#FF003C" }} />{edu.period}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={13} style={{ color: "#FF1744" }} />{edu.location}
                </span>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                {edu.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 mb-7">
                {edu.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-xs text-white/45">
                    <CheckCircle size={11} style={{ color: "#FF003C", flexShrink: 0 }} />
                    {h}
                  </div>
                ))}
              </div>

              {/* ── Industry Certified By logos ── */}
              <div className="border-t border-white/[0.06] pt-5">
                <div
                  className="text-[9px] tracking-[0.25em] uppercase mb-4 font-mono"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Industry Certified By
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  {[
                    { name: "SAP",       logo: <LogoSAP       height={30} />, whiteBg: false },
                    { name: "TCS iON",   logo: <LogoTCS       height={28} />, whiteBg: false },
                    { name: "Accenture", logo: <LogoAccenture height={22} />, whiteBg: true  },
                    { name: "Deloitte",  logo: <LogoDeloitte  height={22} />, whiteBg: true  },
                  ].map(({ name, logo }) => (
                    <motion.div
                      key={name}
                      whileHover={{ scale: 1.08, y: -2 }}
                      title={name}
                      className="flex items-center justify-center rounded-xl border border-white/[0.07] transition-all duration-300 hover:border-red/25"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(8px)",
                        padding: "6px 12px",
                        height: "44px",
                        minWidth: "72px",
                      }}
                    >
                      {logo}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Career Timeline ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-5 h-px" style={{ background: "#FF003C" }} />
              <span className="section-subtitle text-[10px]">Career Timeline</span>
            </motion.div>

            <div className="relative">
              {/* Spine line */}
              <motion.div
                className="absolute left-5 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(180deg, #FF003C, rgba(255,0,60,0.08))" }}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.35 }}
              />

              {careerTimeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.12 }}
                  className="relative flex gap-6 pb-8 last:pb-0"
                >
                  {/* Node */}
                  <motion.div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 z-10"
                    style={{ borderColor: "rgba(255,0,60,0.55)", background: "#080808" }}
                    animate={{
                      boxShadow: [
                        "0 0 6px rgba(255,0,60,0.2)",
                        "0 0 18px rgba(255,0,60,0.55)",
                        "0 0 6px rgba(255,0,60,0.2)",
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                  >
                    {TIMELINE_ICONS[item.year] ?? <div className="w-2 h-2 rounded-full bg-red-500" />}
                  </motion.div>

                  {/* Content */}
                  <div className="pt-1.5 flex-1">
                    <div
                      className="text-xs font-mono mb-1"
                      style={{ color: "#FF003C", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.year}
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
