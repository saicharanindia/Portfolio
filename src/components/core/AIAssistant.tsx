"use client";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, RotateCcw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── Minimal markdown renderer: bold, line-breaks, paragraphs ──────────────
function RenderText({ text }: { text: string }) {
  // Split by double line breaks for paragraphs
  const paragraphs = text.split("\n\n");
  
  return (
    <span>
      {paragraphs.map((paragraph, pi) => {
        const lines = paragraph.split("\n");
        return (
          <span key={pi}>
            {lines.map((line, li) => {
              // split by **bold**
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return (
                <span key={li}>
                  {parts.map((part, pti) =>
                    pti % 2 === 1 ? (
                      <strong key={pti} style={{ color: "#fff", fontWeight: 600 }}>
                        {part}
                      </strong>
                    ) : (
                      <span key={pti}>{part}</span>
                    )
                  )}
                  {li < lines.length - 1 && <br />}
                </span>
              );
            })}
            {/* Add spacing between paragraphs */}
            {pi < paragraphs.length - 1 && (
              <>
                <br />
                <br />
              </>
            )}
          </span>
        );
      })}
    </span>
  );
}

// ── Suggestion chips ───────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: "🛠️ Skills & Expertise",  query: "Tell me about Sai's SAP ABAP skills" },
  { label: "🚀 Projects Built",       query: "What projects has Sai built?" },
  { label: "💼 Experience & Certs",   query: "Tell me about Sai's experience and certifications" },
  { label: "🎓 Education",            query: "What is Sai's educational background?" },
  { label: "✅ Open to Work",         query: "Is Sai available for work?" },
  { label: "📬 Contact Info",         query: "How can I contact Sai?" },
];

// ── Knowledge base ─────────────────────────────────────────────────────────
const KNOWLEDGE: Record<string, { keywords: string[]; response: string }> = {
  skills: {
    keywords: ["skill", "expert", "know", "technology", "tech", "proficient", "sap", "abap", "erp", "backend", "what you do", "what he do", "what does", "what do you", "capabilities", "specialization", "good at"],
    response:
      "🛠️ **Sai's Core Skills**\n\n⚙️ **SAP & Enterprise**\n- SAP ABAP Development\n- ERP Systems & Modules\n- Backend Engineering & API Design\n\n💻 **Web & Software**\n- Python, JavaScript, HTML, CSS\n- Django Framework & REST APIs\n- Full-stack Development\n\n🔧 **Tools & Practices**\n- SQL & Database Design\n- Git & Version Control\n- System Design & Problem-solving\n\n💡 Currently focused on SAP consulting and backend engineering roles.",
  },
  projects: {
    keywords: ["project", "build", "built", "work", "portfolio", "create"],
    response:
      "🚀 **Sai's Key Projects**\n\n🚗 **LuxDrive Portal**\nPremium vehicle rental system with booking management, fleet tracking, and customer analytics.\n\n📋 **Student Attendance Tracker**\nAutomated attendance system with real-time tracking and analytics dashboard for institutions.\n\n📚 **SAP ABAP Learning Repository**\nComprehensive collection of SAP ABAP programs, notes, and ERP exercises.\n\n✨ All projects prioritise scalability, clean UX, and enterprise-grade architecture.",
  },
  experience: {
    keywords: ["experience", "worked", "job", "role", "intern", "certification"],
    response:
      "💼 **Sai's Professional Profile**\n\n📦 6+ Projects Completed\n🔬 200+ Technologies Explored\n⏱️ 600+ Learning Hours Invested\n💻 10+ GitHub Repositories\n\n🏆 **Certifications**\n- 🔷 SAP ABAP Backend Developer (In Progress)\n- 🔹 TCS iON: Career Edge — IT for Non-IT\n- 🔹 TCS iON: Career Edge — Young Professional\n- 🔸 Accenture Technology Apprenticeship\n- 🔸 Deloitte Technology Apprenticeship",
  },
  availability: {
    keywords: ["available", "hiring", "open", "position", "job", "opportunity", "work"],
    response:
      "✅ **Sai is Open to Work!**\n\n🎯 Actively seeking roles in:\n- ⚙️ SAP Consulting (ABAP Development)\n- 🐍 Backend Engineering (Python, Django)\n- 🏢 Enterprise Technology (ERP, Database)\n- 🌐 Full-Stack Development\n\n📍 Location: Guntur, Andhra Pradesh, India\n🌏 Open to relocation and remote opportunities.\n⚡ Available for immediate start.",
  },
  contact: {
    keywords: ["contact", "email", "phone", "reach", "message", "connect"],
    response:
      "📬 **Contact Sai Charan**\n\n📧 Email: saicharan.sys@gmail.com\n📞 Phone: +91-7287872334\n📍 Location: Guntur, Andhra Pradesh, India\n\n💻 GitHub: github.com/saicharanindia\n🔗 LinkedIn: Available via portfolio\n\n👋 Feel free to reach out for opportunities or collaborations!",
  },
  education: {
    keywords: ["education", "degree", "university", "study", "studied", "college", "btech"],
    response:
      "🎓 **Sai's Education**\n\n🏛️ **B.Tech in Information Technology**\nVignan's University, Andhra Pradesh\n📅 Graduating 2027 — Available for 2026 roles\n\n🏆 **Certifications**\n- 🔷 SAP ABAP Backend Developer (In Progress)\n- 🔹 TCS iON Career Edge — IT for Non-IT\n- 🔹 TCS iON Career Edge — Young Professional\n- 🔸 Accenture Technology Apprenticeship\n- 🔸 Deloitte Technology Apprenticeship",
  },
  greetings: {
    keywords: ["hi", "hello", "hey", "namaste", "good morning", "good evening"],
    response:
      "👋 Hello! I'm **Elova AI**, created and developed by my Master, **Mr. Sanivarapu Sai Charan**.\n\n🇮🇳 Currently available only in **India** during development phase.\n\nI can help you with:\n🛠️ His skills and SAP expertise\n🚀 Projects he has built\n💼 Work experience & certifications\n✅ Job availability\n📬 Contact information\n\nWhat would you like to know?",
  },
  identity: {
    keywords: ["who are you", "what are you", "your name", "elova", "about you", "created you", "made you", "your creator", "who created", "who made", "owner", "developed", "price", "pricing", "cost", "free", "available", "release", "launch"],
    response:
      "🤖 **About Elova AI**\n\nI'm **Elova AI**, a professional AI assistant created and developed by my Master, **Mr. Sanivarapu Sai Charan**.\n\n🇮🇳 **Availability**: Currently available only in India during this development phase. Global availability will be introduced in the future.\n\n💰 **Access & Pricing**: Access is currently limited while development and testing continue. Free plans are planned for the future, but no official release date has been announced.\n\n🎯 **My Purpose**: I assist with questions related to Sai's portfolio, including his projects, skills, experience, and professional work.\n\nThank you for your interest and support! How can I assist you today?",
  },
};

function getResponse(msg: string): string {
  const lower = msg.toLowerCase();
  
  // Check if question matches portfolio-related topics
  for (const [, data] of Object.entries(KNOWLEDGE)) {
    if (data.keywords.some((k) => lower.includes(k))) return data.response;
  }
  
  // If no portfolio topic matched, show Elova AI introduction for ANY question
  return "**I'm Elova AI. 🤖**\n\nI was created and am being developed by **my Master, Mr. Sanivarapu Sai Charan**.\n\n🇮🇳 **Currently, Elova AI is available only in India** as the project is still under active development.\n\nAt this stage, access is **limited and not available to everyone**. My Master is continuously improving my features and capabilities.\n\nIn the future, we plan to introduce **free plans** and expand availability to more users and countries. However, no official release date has been announced yet.\n\nI can only share public information about my development. If you have any questions about my Master's portfolio, projects, skills, or professional work, I'd be happy to help. 🚀";
}

// ── Component ──────────────────────────────────────────────────────────────
export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm **Elova AI**, created and developed by my Master, **Mr. Sanivarapu Sai Charan**.\n\n🇮🇳 Currently available only in **India** during development phase.\n\nI can help you with:\n🛠️ His skills and SAP expertise\n🚀 Projects he has built\n💼 Work experience & certifications\n✅ Job availability\n📬 Contact information\n\nWhat would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("elova-chat");
      if (saved) setMessages(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("elova-chat", JSON.stringify(messages));
  }, [messages, mounted]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMessages((p) => [...p, { role: "user", content: msg }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((p) => [...p, { role: "assistant", content: getResponse(msg) }]);
      setLoading(false);
    }, 700);
  };

  const reset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hello! I'm **Elova AI**, created and developed by my Master, **Mr. Sanivarapu Sai Charan**.\n\n🇮🇳 Currently available only in **India** during development phase.\n\nI can help you with:\n🛠️ His skills and SAP expertise\n🚀 Projects he has built\n💼 Work experience & certifications\n✅ Job availability\n📬 Contact information\n\nWhat would you like to know?",
      },
    ]);
    localStorage.removeItem("elova-chat");
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* ── SVG Goo filter ────────────────────────────────────────── */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="ai-fire-goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
              result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* ── Fire keyframes ─────────────────────────────────────────── */}
      <style>{`
        /* Fire particle animations */
        @keyframes fireRise {
          0%{transform:translateY(0) scale(1);opacity:1}
          100%{transform:translateY(-80px) scale(0);opacity:0}
        }
        @keyframes aiLight {
          0%,100%{opacity:1} 30%{opacity:0.6} 60%{opacity:0.9} 80%{opacity:0.5}
        }
        @keyframes rotateSphere {
          0%{transform:rotateX(0deg) rotateY(0deg)}
          100%{transform:rotateX(360deg) rotateY(360deg)}
        }
      `}</style>

      {/* ── Floating button ────────────────────────────────────────── */}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 99999 }}>

        {/* Flickering ambient light */}
        <div style={{
          position: "absolute", inset: "-24px", borderRadius: "50%",
          background: "radial-gradient(ellipse at bottom, rgba(220,0,0,0.35) 0%, rgba(255,40,0,0.1) 50%, transparent 75%)",
          animation: "aiLight 0.4s ease infinite",
          pointerEvents: "none", zIndex: 0,
        }} />

        {/* 3D Fire sphere - rotating planes with particles */}
        <div style={{
          position: "absolute",
          left: "-43px", bottom: "-43px",
          width: "150px", height: "150px",
          perspective: "1200px",
          transformStyle: "preserve-3d",
          pointerEvents: "none",
          zIndex: 1,
        }}>
          <div style={{
            position: "relative",
            width: "100%", height: "100%",
            transformStyle: "preserve-3d",
            animation: "rotateSphere 10s infinite linear",
          }}>
            {/* Create 16 planes rotated in different angles to form sphere */}
            {Array.from({ length: 16 }).map((_, planeIndex) => {
              const rotationX = planeIndex * 22.5; // 360/16 = 22.5deg increments
              return (
                <div
                  key={`x-${planeIndex}`}
                  style={{
                    position: "absolute",
                    width: "150px", height: "150px",
                    borderRadius: "50%",
                    transform: `rotateX(${rotationX}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, filter: "url(#ai-fire-goo)" }}>
                    {/* 4 particles per plane */}
                    {[0, 1, 2, 3].map((particleIndex) => {
                      const angle = particleIndex * 90; // 4 particles spread 90deg apart
                      const radius = 50; // Distance from center
                      const x = 75 + radius * Math.cos((angle * Math.PI) / 180);
                      const y = 75 + radius * Math.sin((angle * Math.PI) / 180);
                      const size = 20 + Math.random() * 15;
                      const delay = (planeIndex * 0.1 + particleIndex * 0.05) % 1;
                      const duration = 0.5 + Math.random() * 0.3;
                      const colorIndex = (planeIndex + particleIndex) % 4;
                      const colors = ["#cc0000", "#ee1100", "#ff2200", "#ff4400"];
                      
                      return (
                        <div
                          key={particleIndex}
                          style={{
                            position: "absolute",
                            left: `${x}px`, top: `${y}px`,
                            width: `${size}px`, height: `${size}px`,
                            marginLeft: `-${size/2}px`, marginTop: `-${size/2}px`,
                            borderRadius: "50%",
                            background: colors[colorIndex],
                            animation: `fireRise ${duration}s ${delay}s ease-out infinite`,
                            willChange: "transform, opacity",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {/* Add Y-axis rotation planes for fuller coverage */}
            {Array.from({ length: 8 }).map((_, planeIndex) => {
              const rotationY = planeIndex * 45; // 8 planes at 45deg increments
              return (
                <div
                  key={`y-${planeIndex}`}
                  style={{
                    position: "absolute",
                    width: "150px", height: "150px",
                    borderRadius: "50%",
                    transform: `rotateY(${rotationY}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, filter: "url(#ai-fire-goo)" }}>
                    {[0, 1, 2, 3].map((particleIndex) => {
                      const angle = particleIndex * 90;
                      const radius = 50;
                      const x = 75 + radius * Math.cos((angle * Math.PI) / 180);
                      const y = 75 + radius * Math.sin((angle * Math.PI) / 180);
                      const size = 20 + Math.random() * 15;
                      const delay = (planeIndex * 0.08 + particleIndex * 0.06) % 1;
                      const duration = 0.5 + Math.random() * 0.3;
                      const colorIndex = (planeIndex + particleIndex) % 4;
                      const colors = ["#cc0000", "#ee1100", "#ff2200", "#ff4400"];
                      
                      return (
                        <div
                          key={particleIndex}
                          style={{
                            position: "absolute",
                            left: `${x}px`, top: `${y}px`,
                            width: `${size}px`, height: `${size}px`,
                            marginLeft: `-${size/2}px`, marginTop: `-${size/2}px`,
                            borderRadius: "50%",
                            background: colors[colorIndex],
                            animation: `fireRise ${duration}s ${delay}s ease-out infinite`,
                            willChange: "transform, opacity",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main button */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Open Elova AI"
          style={{
            position: "relative", zIndex: 2,
            width: "64px", height: "64px", borderRadius: "50%",
            border: "2px solid rgba(220,0,0,0.9)",
            background: "linear-gradient(145deg, #5A0000 0%, #3A0000 60%, #1A0000 100%)",
            boxShadow: "0 0 24px rgba(220,0,0,0.9), 0 0 48px rgba(180,0,0,0.35), inset 0 2px 8px rgba(255,40,0,0.18), inset 0 -2px 8px rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 0, overflow: "hidden", cursor: "pointer",

          }}
        >
          {/* Scanlines */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.28,
            background: "repeating-linear-gradient(0deg,transparent 0px,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 4px)",
          }} />
          {/* Reflection */}
          <div style={{
            position: "absolute", top: "10%", left: "18%", right: "18%", height: "24%",
            background: "linear-gradient(135deg, rgba(255,80,0,0.25) 0%, transparent 65%)",
            borderRadius: "50%", filter: "blur(3px)", pointerEvents: "none",
          }} />

          {/* Icon — always static, perfectly centred */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/trishul.png"
            alt="Elova AI"
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", display: "block",
              position: "relative", zIndex: 1,
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.parentElement)
                e.currentTarget.parentElement.innerHTML =
                  '<span style="font-size:26px;color:#fff;text-shadow:0 0 12px rgba(255,26,26,1);position:relative;z-index:1">🔱</span>';
            }}
          />
        </button>
      </div>

      {/* ── Chat window ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: "100px",
              right: "24px",
              width: "320px",
              height: "460px",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "#111111",
              border: "1px solid rgba(255,0,60,0.15)",
              boxShadow: "0 16px 48px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,0,60,0.06)",
              zIndex: 999998,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "12px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#161616",
                flexShrink: 0,
              }}
            >
              {/* Avatar — fully clipped circle */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",           /* hard clip */
                  flexShrink: 0,
                  background: "#222",
                  border: "1.5px solid rgba(255,0,60,0.4)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/trishul.png"
                  alt="Elova AI"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",          /* fills — no overflow */
                    display: "block",
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                  Elova AI
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.38)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginTop: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  Personal Assistant · Sai Charan
                </div>
              </div>

              {/* New chat — themed */}
              <button
                onClick={reset}
                title="New conversation"
                style={{
                  background: "rgba(255,26,26,0.08)",
                  border: "1px solid rgba(255,26,26,0.2)",
                  cursor: "pointer",
                  padding: "5px",
                  color: "rgba(255,100,100,0.7)",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "6px",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,26,26,0.18)";
                  e.currentTarget.style.borderColor = "rgba(255,26,26,0.55)";
                  e.currentTarget.style.color = "#FF4444";
                  e.currentTarget.style.boxShadow = "0 0 8px rgba(255,26,26,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,26,26,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,26,26,0.2)";
                  e.currentTarget.style.color = "rgba(255,100,100,0.7)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <RotateCcw size={12} />
              </button>

              {/* Close X — themed */}
              <button
                onClick={() => setOpen(false)}
                title="Close"
                style={{
                  background: "rgba(255,26,26,0.1)",
                  border: "1px solid rgba(255,26,26,0.3)",
                  cursor: "pointer",
                  padding: "5px",
                  color: "#FF4444",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "6px",
                  transition: "all 0.15s ease",
                  boxShadow: "0 0 6px rgba(255,26,26,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,26,26,0.25)";
                  e.currentTarget.style.borderColor = "rgba(255,26,26,0.7)";
                  e.currentTarget.style.color = "#FF1A1A";
                  e.currentTarget.style.boxShadow = "0 0 12px rgba(255,26,26,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,26,26,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,26,26,0.3)";
                  e.currentTarget.style.color = "#FF4444";
                  e.currentTarget.style.boxShadow = "0 0 6px rgba(255,26,26,0.2)";
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(255,0,60,0.15) transparent",
              }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: "8px",
                  }}
                >
                  {/* AI avatar per message */}
                  {m.role === "assistant" && (
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "#222",
                        border: "1px solid rgba(255,0,60,0.3)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/trishul.png"
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      maxWidth: "78%",
                      padding: "9px 12px",
                      borderRadius:
                        m.role === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                      fontSize: "13px",
                      lineHeight: "1.6",
                      wordBreak: "break-word",
                      background:
                        m.role === "user"
                          ? "linear-gradient(135deg, #FF003C, #b5002c)"
                          : "rgba(255,255,255,0.05)",
                      color: "rgba(255,255,255,0.92)",
                      border:
                        m.role === "user"
                          ? "none"
                          : "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <RenderText text={m.content} />
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "#222",
                      border: "1px solid rgba(255,0,60,0.3)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/trishul.png"
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: "14px 14px 14px 3px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#FF003C",
                          display: "block",
                        }}
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
                        transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion chips */}
            <div
              style={{
                padding: "8px 12px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "6px",
                flexShrink: 0,
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => send(s.query)}
                  style={{
                    padding: "7px 10px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "11.5px",
                    fontWeight: 500,
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.15s",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,0,60,0.08)";
                    e.currentTarget.style.borderColor = "rgba(255,0,60,0.28)";
                    e.currentTarget.style.color = "#FF6080";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input bar */}
            <div
              style={{
                padding: "10px 12px 14px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
                placeholder="Type a message…"
                disabled={loading}
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "10px",
                  padding: "9px 13px",
                  fontSize: "13px",
                  color: "#fff",
                  outline: "none",
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "text",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(255,0,60,0.4)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
              />
              <motion.button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    input.trim() && !loading
                      ? "#FF003C"
                      : "rgba(255,255,255,0.06)",
                  cursor:
                    input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s",
                }}
                whileHover={input.trim() && !loading ? { scale: 1.08 } : {}}
                whileTap={input.trim() && !loading ? { scale: 0.92 } : {}}
              >
                <Send
                  size={14}
                  color={
                    input.trim() && !loading
                      ? "#fff"
                      : "rgba(255,255,255,0.25)"
                  }
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
