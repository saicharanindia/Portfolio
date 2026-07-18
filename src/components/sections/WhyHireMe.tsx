"use client";
import { motion } from "framer-motion";
import { whyHireMe, services } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

const WHY_ICONS = ["🏢", "⚡", "🛡️", "🚀", "🌍", "🤝"];
const SERVICE_ICONS = ["💻", "🔧", "🏗️", "🗃️", "🔐", "🎯"];

export default function WhyHireMe() {
  const { ref, inView } = useInView();

  return (
    <section id="why-hire" className="section-pad relative" style={{ background: "#050505" }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="container" ref={ref}>

        {/* Why Hire Me */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-14">
          <div className="section-subtitle mb-3">Why Hire Me</div>
          <h2 className="section-title text-chrome">The Case For Sai Charan</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {whyHireMe.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-6 group"
            >
              <div className="text-2xl mb-4">{WHY_ICONS[i] ?? "✦"}</div>
              <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Services */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="mb-12">
          <div className="section-subtitle mb-3">Services</div>
          <h2 className="section-title text-chrome">What I Offer</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg border border-white/[0.06]"
                style={{ background: `${service.color}15` }}
              >
                {SERVICE_ICONS[i] ?? "✦"}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">{service.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
