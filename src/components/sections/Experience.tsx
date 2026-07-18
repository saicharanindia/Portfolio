"use client";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle } from "lucide-react";
import { experience, currentFocus } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

export default function Experience() {
  const { ref, inView } = useInView();
  const exp = experience[0];

  return (
    <section id="experience" className="section-pad relative" style={{ background: "#050505" }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="container" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
          <div className="section-subtitle mb-3">Experience</div>
          <h2 className="section-title text-chrome">In The Field</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Experience card */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="glass-red rounded-3xl p-8 h-full relative overflow-hidden">
              <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,0,60,0.3), transparent)" }}
                animate={{ top: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/[0.06]"
                  style={{ background: "rgba(255,0,60,0.1)" }}>
                  <Briefcase size={20} style={{ color: "#FF003C" }} />
                </div>

                <span className="tag mb-4 inline-flex">{exp.type}</span>

                <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                <div className="text-red-hi font-medium mb-1">{exp.company}</div>
                <div className="text-sm text-white/35 mb-6 font-mono">{exp.duration}</div>

                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>{exp.description}</p>

                <div className="space-y-2.5 mb-6">
                  {exp.achievements.map((a) => (
                    <div key={a} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                      <CheckCircle size={13} style={{ color: "#FF003C", flexShrink: 0, marginTop: 2 }} />
                      {a}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="badge">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Current focus / skill bars */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.25 }}>
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-red animate-pulse-red" />
                <span className="text-[10px] tracking-[0.28em] text-white/40 uppercase font-mono">Current Focus</span>
              </div>

              <div className="space-y-5">
                {currentFocus.map((item, i) => (
                  <motion.div
                    key={item.item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.3 + i * 0.08 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-white/65 font-medium">{item.item}</span>
                      <span className="text-xs font-mono text-red/80">{item.progress}%</span>
                    </div>
                    <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${item.color}, #FF5E7A)`, boxShadow: `0 0 6px ${item.color}60` }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.progress}%` } : {}}
                        transition={{ duration: 1.1, delay: 0.4 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-8 p-4 rounded-xl border border-red/10"
                style={{ background: "rgba(255,0,60,0.04)" }}
              >
                <div className="text-xs font-semibold text-red/70 mb-1">⚡ Continuous Learning</div>
                <div className="text-xs text-white/35 leading-relaxed">
                  600+ hours of deliberate study across SAP, cloud, networking, and modern web engineering.
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
