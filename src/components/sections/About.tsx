"use client";
import { motion } from "framer-motion";
import { personal, stats, whyHireMe } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

const WHY_ICONS_ABOUT = ["🏢", "⚡", "🛡️", "🚀", "🌍", "🤝"];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="section-pad relative" style={{ background: "#050505" }}>
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="section-subtitle mb-3">About</div>
          <h2 className="section-title text-chrome">The Engineer</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300 }}
            >
              {personal.bio}
            </motion.p>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.08 }}
                  className="glass-card p-4 text-center"
                >
                  <div className="font-display text-3xl font-bold mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#FF003C" }}>
                    {s.value}{s.suffix}
                  </div>
                  <div className="text-[10px] text-white/35 uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-2"
            >
              {[personal.email, personal.phone, personal.location].map((v) => (
                <span key={v} className="badge">{v}</span>
              ))}
            </motion.div>
          </div>

          {/* Right — why hire me */}
          <div className="grid sm:grid-cols-2 gap-4">
            {whyHireMe.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.2 + i * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-5"
              >
                <div className="text-2xl mb-3">{WHY_ICONS_ABOUT[i] ?? "✦"}</div>
                <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {item.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
