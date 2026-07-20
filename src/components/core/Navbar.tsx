"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { navLinks } from "@/data/portfolio";

/* Y2K glitch — fires on mount and every 8s */
function GlitchName() {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const fire = () => { setGlitch(true); setTimeout(() => setGlitch(false), 600); };
    fire();
    const id = setInterval(fire, 8000);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className={`text-sm font-semibold transition-colors duration-300 leading-none ${glitch ? "glitch-text" : ""}`}
      data-text="Sai Charan"
      style={{ color: glitch ? "#FF5E7A" : "rgba(255,255,255,0.8)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em" }}
    >
      Sai Charan
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("#home");
  const [scanLine, setScanLine] = useState(false);

  /* Periodic scanline flicker on navbar */
  useEffect(() => {
    const id = setInterval(() => {
      setScanLine(true);
      setTimeout(() => setScanLine(false), 1200);
    }, 9000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Add performance hint
      el.style.willChange = "transform";
      setTimeout(() => { el.style.willChange = "auto"; }, 1000);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scanLine ? "scan-sweep" : ""}`}
        style={scrolled ? {
          background: "rgba(5,5,5,0.90)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,0,60,0.18)",
          padding: "6px 0 10px",
          boxShadow: "0 0 30px rgba(255,0,60,0.06), 0 1px 0 rgba(255,0,60,0.12)",
        } : { padding: "14px 0 10px" }}
      >
        {/* Y2K corner brackets on scrolled navbar */}
        {scrolled && (
          <>
            <span style={{ position:"absolute", top:4, left:8, width:10, height:10,
              borderTop:"1.5px solid rgba(255,0,60,0.6)", borderLeft:"1.5px solid rgba(255,0,60,0.6)",
              pointerEvents:"none" }} />
            <span style={{ position:"absolute", top:4, right:8, width:10, height:10,
              borderTop:"1.5px solid rgba(255,0,60,0.6)", borderRight:"1.5px solid rgba(255,0,60,0.6)",
              pointerEvents:"none" }} />
            <span style={{ position:"absolute", bottom:4, left:8, width:10, height:10,
              borderBottom:"1.5px solid rgba(255,0,60,0.6)", borderLeft:"1.5px solid rgba(255,0,60,0.6)",
              pointerEvents:"none" }} />
            <span style={{ position:"absolute", bottom:4, right:8, width:10, height:10,
              borderBottom:"1.5px solid rgba(255,0,60,0.6)", borderRight:"1.5px solid rgba(255,0,60,0.6)",
              pointerEvents:"none" }} />
          </>
        )}
        <div className="container flex items-center justify-between">

          {/* ── Logo: photo + name + badge ── */}
          <button onClick={() => go("#home")} className="group flex items-center gap-3">

            {/* Avatar circle — neon pulse ring */}
            <div className="relative shrink-0 overflow-hidden rounded-full neon-pulse"
              style={{ width: "40px", height: "40px",
                border: "2px solid rgba(255,0,60,0.7)",
                boxShadow: "0 0 12px rgba(255,0,60,0.5)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.jpg" alt="Sai Charan"
                style={{ width: "100%", height: "100%", objectFit: "cover",
                  objectPosition: "center 20%", transform: "scale(1.15)",
                  transformOrigin: "center 20%", display: "block" }}
                onError={(e) => {
                  const p = e.currentTarget.parentElement;
                  if (p) {
                    e.currentTarget.style.display = "none";
                    p.style.cssText += ";display:flex;align-items:center;justify-content:center;color:#FF003C;font-size:13px;font-weight:bold;font-family:'Bebas Neue',sans-serif";
                    p.textContent = "SC";
                  }
                }}
              />
            </div>

            {/* Glitch name */}
            <div className="hidden sm:flex flex-col items-start gap-0.5">
              <GlitchName />
              {/* Y2K status line */}
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "8px",
                letterSpacing: "0.18em",
                color: "rgba(255,0,60,0.5)",
                textTransform: "uppercase",
              }} className="data-corrupt">
                ▸ SAP_DEV.exe
              </span>
            </div>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.slice(0, 8).map((link) => (
              <button key={link.href} onClick={() => go(link.href)}
                className={`relative px-3 py-2 text-xs font-medium tracking-wide transition-colors duration-200 rounded-lg pixel-hover ${active === link.href ? "crt-flicker" : ""}`}
                style={{
                  color: active === link.href ? "#FF5E7A" : "rgba(255,255,255,0.45)",
                  fontFamily: active === link.href ? "'JetBrains Mono', monospace" : undefined,
                }}>
                {active === link.href && (
                  <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-lg ticker-border"
                    style={{ background: "rgba(255,0,60,0.08)" }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }} />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-3">
            <a href="/resume.pdf" download
              className="hidden sm:flex btn-ghost text-xs items-center gap-2"
              style={{ borderRadius: "10px", padding: "8px 18px" }}>
              <Download size={13} /> Resume
            </a>
            <button onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg border border-white/10 bg-white/[0.03] text-white/60 hover:text-white hover:border-red/30 transition-all duration-200"
              aria-label="Toggle menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="fixed top-[64px] left-4 right-4 z-40 rounded-2xl p-4"
            style={{ background: "rgba(10,10,10,0.96)", backdropFilter: "blur(30px)",
              border: "1px solid rgba(255,0,60,0.12)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(255,0,60,0.06)" }}>
            <nav className="grid grid-cols-2 gap-1 mb-3">
              {navLinks.map((link, i) => (
                <motion.button key={link.href}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => go(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{ color: active === link.href ? "#FF5E7A" : "rgba(255,255,255,0.5)",
                    background: active === link.href ? "rgba(255,0,60,0.08)" : "transparent" }}>
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <div className="pt-3 border-t border-white/[0.06]">
              <a href="/resume.pdf" download
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl"
                style={{ color: "#FF5E7A" }}>
                <Download size={13} /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
