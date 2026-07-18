"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Download } from "lucide-react";
import { personal, navLinks } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

export default function Footer() {
  const { ref, inView } = useInView();
  const socials = [
    { icon: Github,   href: personal.github,   label: "GitHub"   },
    { icon: Linkedin, href: personal.linkedin, label: "LinkedIn" },
    { icon: Mail,     href: `mailto:${personal.email}`, label: "Email" },
  ];

  return (
    <footer
      ref={ref}
      className="relative border-t"
      style={{ background: "#030303", borderTopColor: "rgba(255,0,60,0.1)" }}
    >
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,0,60,0.5), transparent)" }} />

      <div className="container py-16">
        {/* CTA band */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <span className="tag mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse-red inline-block" />
            {personal.status}
          </span>
          <h2 className="section-title text-chrome mb-4">{"Let's Build"}<br />
            <span style={{ WebkitTextStroke: "1px rgba(255,0,60,0.5)", color: "transparent" }}>The Future</span>
          </h2>
          <p className="text-sm max-w-md mx-auto mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
            {"I'm actively looking for roles at world-class technology companies. If you see potential, let's talk."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => {
                const subject = encodeURIComponent("Portfolio Inquiry");
                const body = encodeURIComponent("Hello Sai Charan,\n\nI visited your portfolio and would like to connect with you.\n\nRegards,");
                
                // Gmail Compose URL with u/0 for first account
                const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${personal.email}&su=${subject}&body=${body}&tf=1`;
                
                // Fallback mailto link
                const mailtoUrl = `mailto:${personal.email}?subject=${subject}&body=${body}`;
                
                // Try to open Gmail Compose in a new tab
                const newWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
                
                // Fallback to mailto if popup was blocked
                if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                  window.location.href = mailtoUrl;
                }
              }}
              className="btn-red"
              type="button"
              aria-label="Send a message via Gmail"
            >
              <Mail size={14} /> Send a Message
            </button>
            <a href="/resume.pdf" download className="btn-ghost">
              <Download size={14} /> Download Resume
            </a>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="section-divider mb-12" />

        {/* Links row */}
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="font-display text-xl text-chrome mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>
              {personal.name}
            </div>
            <p className="text-xs text-white/30 leading-relaxed">
              SAP Developer · Software Engineer<br />B.Tech IT · Vignan&apos;s University
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}>
            <div className="text-[9px] text-white/20 tracking-[0.25em] uppercase font-mono mb-4">Navigation</div>
            <div className="grid grid-cols-2 gap-1">
              {navLinks.slice(0, 8).map((l) => (
                <button key={l.href} onClick={() => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" })}
                  className="text-left text-xs text-white/40 hover:text-red transition-colors duration-200 py-0.5">
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="text-[9px] text-white/20 tracking-[0.25em] uppercase font-mono mb-4">Connect</div>
            <div className="flex gap-3 mb-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/[0.07] transition-all duration-300 hover:border-red/30 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)" }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <div className="text-xs font-mono text-white/25">{personal.email}</div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">© 2027 Sanivarapu Sai Charan. All rights reserved.</p>
          <p className="text-xs text-white/15">Built with Next.js · Framer Motion · Tailwind CSS</p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl border border-white/[0.07] flex items-center justify-center transition-all duration-300 hover:border-red/30"
            style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.4)" }}
            aria-label="Back to top">
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
