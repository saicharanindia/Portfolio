"use client";
import { motion } from "framer-motion";

/* Floating "Open to Opportunities" badge — fixed below navbar, always visible */
export default function OpenBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      style={{
        position: "fixed",
        top: "72px",          /* sits just below the navbar */
        left: "24px",
        zIndex: 48,
        pointerEvents: "none",
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 8px rgba(255,0,60,0.5)",
            "0 0 20px rgba(255,0,60,0.8)",
            "0 0 8px rgba(255,0,60,0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "7px",
          background: "linear-gradient(135deg, #FF003C, #CC0028)",
          color: "#ffffff",
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          padding: "5px 12px",
          borderRadius: "6px",
          border: "1px solid rgba(255,94,122,0.4)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Pulsing dot */}
        <motion.span
          animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{
            display: "inline-block",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 0 6px #fff",
            flexShrink: 0,
          }}
        />
        Open to Opportunities
      </motion.div>
    </motion.div>
  );
}
