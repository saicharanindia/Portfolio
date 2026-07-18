"use client";
import dynamic from "next/dynamic";

// ── Always-present (lightweight) ──────────────────────────────────────────
import Navbar       from "@/components/core/Navbar";
import Footer       from "@/components/core/Footer";
import Hero         from "@/components/sections/Hero";
import AIAssistant  from "@/components/core/AIAssistant";

// ── Client-only singletons ─────────────────────────────────────────────────
const PageLoader    = dynamic(() => import("@/components/core/PageLoader"),    { ssr: false });
const CustomCursor  = dynamic(() => import("@/components/core/CustomCursor"),  { ssr: false });
const ScrollProgress= dynamic(() => import("@/components/core/ScrollProgress"),{ ssr: false });

// ── Lazily-loaded sections (all use browser APIs / IntersectionObserver) ───
const About         = dynamic(() => import("@/components/sections/About"),         { ssr: false });
const Education     = dynamic(() => import("@/components/sections/Education"),     { ssr: false });
const Skills        = dynamic(() => import("@/components/sections/Skills"),        { ssr: false });
const Projects      = dynamic(() => import("@/components/sections/Projects"),      { ssr: false });
const Experience    = dynamic(() => import("@/components/sections/Experience"),    { ssr: false });
const Certifications= dynamic(() => import("@/components/sections/Certifications"),{ ssr: false });
const GitHubSection = dynamic(() => import("@/components/sections/GitHub"),        { ssr: false });
const Contact       = dynamic(() => import("@/components/sections/Contact"),       { ssr: false });

export default function ClientShell() {
  return (
    <>
      {/* ── Overlays ── */}
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Layout ── */}
      <Navbar />
      <AIAssistant />

      <main style={{ animation: "none", opacity: 1 }}>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
