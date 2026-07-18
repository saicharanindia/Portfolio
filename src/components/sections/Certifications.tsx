"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

/* ── Real logo images — all in /public/logos/ ── */
const LOGO_MAP: Record<string, { src: string; alt: string; h: number; hStrip: number; whiteBg: boolean }> = {
  "TCS iON":   { src: "/logos/tcs.webp",      alt: "TCS",       h: 26, hStrip: 32, whiteBg: false },
  "Accenture": { src: "/logos/accenture.png",  alt: "Accenture", h: 20, hStrip: 24, whiteBg: true  },
  "Deloitte":  { src: "/logos/deloitte.jpg",   alt: "Deloitte",  h: 20, hStrip: 24, whiteBg: true  },
  "SAP":       { src: "/logos/sap.webp",       alt: "SAP",       h: 28, hStrip: 36, whiteBg: false },
};

function CompanyLogo({ issuer, strip = false }: { issuer: string; strip?: boolean }) {
  const cfg = LOGO_MAP[issuer];
  if (!cfg) return <span className="text-xs font-bold text-white/60">{issuer}</span>;
  const h = strip ? cfg.hStrip : cfg.h;

  const imgEl = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cfg.src}
      alt={cfg.alt}
      style={{ height: h, width: "auto", maxWidth: "none", objectFit: "contain", display: "block" }}
    />
  );

  if (cfg.whiteBg) {
    return (
      <div style={{ background: "#fff", borderRadius: "6px", padding: "3px 8px",
        display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {imgEl}
      </div>
    );
  }
  return imgEl;
}

/* ── Cert card ── */
function CertCard({ cert, index, inView }: { cert: typeof certifications[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
    >
      <div
        className="glass-card relative overflow-hidden cursor-pointer group"
        onClick={() => setOpen(!open)}
        style={{
          padding: "1.25rem 1.5rem",
          ...(cert.issuer === "SAP" ? {
            borderColor: "rgba(0,112,240,0.4)",
            background: "rgba(0,112,240,0.05)",
            boxShadow: "0 0 24px rgba(0,112,240,0.12), 0 4px 32px rgba(0,0,0,0.7)",
          } : {}),
        }}
      >
        {/* Completed stripe */}
        {cert.status === "Completed" && (
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, #FF003C, transparent)" }} />
        )}
        {/* SAP featured stripe */}
        {cert.issuer === "SAP" && (
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: "linear-gradient(90deg, transparent, #0070F0, #00B4F0, transparent)" }} />
        )}

        <div className="flex items-center justify-between gap-4">
          {/* Left: logo + text */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div
              className="flex items-center justify-center rounded-xl border border-white/[0.07] shrink-0"
              style={{ background: "rgba(255,255,255,0.04)", width: "80px", height: "44px" }}
            >
              <CompanyLogo issuer={cert.issuer} />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-white leading-tight mb-1 group-hover:text-[#FF5E7A] transition-colors">
                {cert.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
                <span>{cert.issuer}</span>
                <span className="text-white/20">·</span>
                <span>{cert.year}</span>
              </div>
            </div>
          </div>

          {/* Right: status badge + expand */}
          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle size={13} style={{ color: "#FF003C", opacity: cert.status === "Completed" ? 1 : 0.2 }} />
            <span
              className="text-[9px] px-2 py-0.5 rounded-full border font-semibold tracking-wide hidden sm:inline"
              style={{
                borderColor: cert.status === "Completed" ? "rgba(255,0,60,0.35)" : "rgba(255,255,255,0.1)",
                color:       cert.status === "Completed" ? "#FF5E7A"              : "rgba(255,255,255,0.35)",
                background:  cert.status === "Completed" ? "rgba(255,0,60,0.08)"  : "transparent",
              }}
            >
              {cert.status}
            </span>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
              <ChevronDown size={14} className="text-white/30" />
            </motion.div>
          </div>
        </div>

        {/* Expandable detail */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-white/[0.05] text-xs text-white/40 font-mono">
                Issued by {cert.issuer} · {cert.year} · Status: {cert.status}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const { ref, inView } = useInView();
  const issuers = Array.from(new Set(certifications.map(c => c.issuer)));

  return (
    <section id="certifications" className="section-pad relative" style={{ background: "#080808" }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,0,60,0.05), transparent 70%)", filter: "blur(40px)" }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="mb-14"
        >
          <div className="section-subtitle mb-3">Certifications</div>
          <h2 className="section-title text-chrome">Credentials</h2>
        </motion.div>

        {/* ── Logo strip — all issuers ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-4 mb-12 pb-10 border-b border-white/[0.06]"
        >
          {issuers.map((issuer, i) => (
            <motion.div
              key={issuer}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              whileHover={{ scale: 1.07, y: -3 }}
              className="flex items-center justify-center rounded-2xl border border-white/[0.08] transition-all duration-300 hover:border-red/25"
              style={{
                background: "rgba(255,255,255,0.035)",
                backdropFilter: "blur(12px)",
                padding: "10px 20px",
                height: "56px",
                minWidth: "110px",
              }}
            >
              <CompanyLogo issuer={issuer} strip />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Cert cards ── */}
        {/* SAP featured card — full width */}
        {certifications.filter(c => c.issuer === "SAP").map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mb-4"
          >
            <CertCard cert={cert} index={i} inView={inView} />
          </motion.div>
        ))}

        {/* Other certs — 2 col grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.filter(c => c.issuer !== "SAP").map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
