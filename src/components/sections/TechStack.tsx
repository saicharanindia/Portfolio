"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { technologies } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

// Safe guard — never crash if data is missing
const techList = Array.isArray(technologies) ? technologies : [];

const CATEGORIES = ["All", "Programming", "Frontend", "Backend", "SAP", "Tools", "Database", "Networking", "DevOps"];

/* ── Skill card ── */
function TechCard({
  tech,
  index,
  inView,
}: {
  tech: (typeof techList)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: Math.min(index * 0.03, 0.5) }}
      whileHover={{ y: -6, scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <div
        className="glass-card p-4 text-center relative overflow-hidden"
        style={{
          borderColor: hovered ? "rgba(245,200,76,0.45)" : "rgba(245,200,76,0.15)",
          transition: "border-color 0.3s",
          cursor: "default",
        }}
      >
        {/* Hover glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "radial-gradient(circle at center, rgba(245,200,76,0.09), transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          className="text-2xl mb-2 select-none"
          animate={hovered ? { y: [-2, 2, -2], scale: [1, 1.12, 1] } : { y: 0, scale: 1 }}
          transition={{ duration: 1.4, repeat: hovered ? Infinity : 0 }}
        >
          {tech.icon}
        </motion.div>

        <div
          className="text-xs font-semibold leading-tight"
          style={{ color: hovered ? "#B8860B" : "#333" }}
        >
          {tech.name}
        </div>

        <div className="text-[9px] mt-0.5" style={{ color: "rgba(85,85,85,0.5)" }}>
          {tech.category}
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #F5C84C, transparent)",
          }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </motion.div>
  );
}

/* ── Marquee strip ── */
function MarqueeRow({
  items,
  reverse,
}: {
  items: typeof techList;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden py-2"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="inline-flex gap-3 whitespace-nowrap"
        style={{
          animation: `marquee 30s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border shrink-0"
            style={{
              background: "rgba(255,255,255,0.7)",
              borderColor: "rgba(245,200,76,0.2)",
              color: "#555",
              backdropFilter: "blur(8px)",
            }}
          >
            <span>{tech.icon}</span>
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? techList
      : techList.filter((t) => t.category === active);

  return (
    <section
      id="skills"
      className="section-pad relative"
      style={{ background: "transparent" }}
    >
      {/* Soft section bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(248,245,239,0.55)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="tag mb-4 inline-flex">Tech Stack</span>
          <h2
            className="heading-section"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Technologies &{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F5C84C,#D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tools
            </span>
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "#777" }}>
            A versatile toolkit spanning SAP enterprise, full-stack, networking, and DevOps.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-300"
              style={{
                background:
                  active === cat
                    ? "linear-gradient(135deg,rgba(245,200,76,0.18),rgba(212,175,55,0.14))"
                    : "rgba(255,255,255,0.65)",
                borderColor:
                  active === cat
                    ? "rgba(245,200,76,0.5)"
                    : "rgba(245,200,76,0.18)",
                color: active === cat ? "#B8860B" : "#777",
                boxShadow:
                  active === cat ? "0 0 12px rgba(245,200,76,0.18)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 mb-14">
            <AnimatePresence mode="popLayout">
              {filtered.map((tech, i) => (
                <TechCard key={tech.name} tech={tech} index={i} inView={inView} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 text-sm" style={{ color: "#aaa" }}>
            No technologies in this category yet.
          </div>
        )}

        {/* Marquee */}
        <div className="space-y-2 overflow-hidden">
          <MarqueeRow items={techList.slice(0, Math.ceil(techList.length / 2))} />
          <MarqueeRow items={techList.slice(Math.ceil(techList.length / 2))} reverse />
        </div>
      </div>
    </section>
  );
}
