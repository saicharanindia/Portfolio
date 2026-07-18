"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const visionItems = [
  { year: "2027", title: "Graduate & Launch",  description: "Complete B.Tech with distinction and enter the global enterprise technology market.", icon: "🎓" },
  { year: "2028", title: "SAP Consultant",      description: "Achieve SAP certified consultant status and contribute to enterprise ERP implementations.", icon: "🏢" },
  { year: "2030", title: "Global Impact",       description: "Lead enterprise digital transformation projects at an international technology company.", icon: "🌍" },
];

const enterpriseMindset = [
  { label: "Think at Scale",        value: "Enterprise-first architecture decisions" },
  { label: "Quality Over Speed",    value: "Production-ready code from day one" },
  { label: "Documentation",         value: "Clear, maintainable, well-documented systems" },
  { label: "Collaboration",         value: "Cross-functional team communication" },
  { label: "Ownership",             value: "End-to-end responsibility for outcomes" },
  { label: "Continuous Improvement",value: "Kaizen mindset in every project" },
];

export default function Vision() {
  const { ref, inView } = useInView();
  return (
    <section id="vision" className="section-padding relative" style={{ background: "#EDE8DF" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04), transparent)" }} />
      <div className="max-w-7xl mx-auto px-6" ref={ref}>

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="flex justify-center mb-4">
            <span className="tag">Vision Statement</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} className="heading-section max-w-3xl mx-auto" style={{ color: "#1C1A17" }}>
            Engineering the <span className="text-gradient-yellow">Future</span> of Enterprise
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="mt-6 text-lg max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(107,95,78,0.65)" }}>
            I believe the most impactful software is invisible — it just works. My mission is to build systems so reliable and elegant that people forget they&apos;re using technology.
          </motion.p>
        </div>

        {/* Goals */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {visionItems.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              whileHover={{ y: -6 }}
              className="glass-card p-7 text-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(201,168,76,0.06), transparent 70%)" }} />
              <div className="text-4xl mb-4">{item.icon}</div>
              <div className="text-xs font-mono font-bold mb-2" style={{ color: "#A0845C", fontFamily: "JetBrains Mono, monospace" }}>{item.year}</div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#1C1A17", fontFamily: "SF Pro Display, Georgia, serif" }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(107,95,78,0.6)" }}>{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Mindset */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>
            <div className="tag mb-5">Enterprise Mindset</div>
            <h3 className="text-3xl font-bold mb-4" style={{ color: "#1C1A17", fontFamily: "SF Pro Display, Georgia, serif" }}>
              How I think about <span className="text-gradient-yellow">technology</span>
            </h3>
            <p className="leading-relaxed" style={{ color: "rgba(107,95,78,0.6)" }}>
              Great engineers don&apos;t just write code — they design systems, anticipate failure, and deliver outcomes that compound over time. That&apos;s the standard I hold myself to.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {enterpriseMindset.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                className="p-4 rounded-xl border transition-all duration-300"
                style={{ borderColor: "rgba(201,168,76,0.14)", background: "rgba(201,168,76,0.03)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.28)"; e.currentTarget.style.background = "rgba(201,168,76,0.07)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.14)"; e.currentTarget.style.background = "rgba(201,168,76,0.03)"; }}
              >
                <div className="text-xs font-semibold mb-1" style={{ color: "#A0845C" }}>{item.label}</div>
                <div className="text-xs" style={{ color: "rgba(107,95,78,0.5)" }}>{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
