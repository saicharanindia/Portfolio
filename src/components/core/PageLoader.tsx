"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [pct, setPct]         = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setPct((p) => {
        const next = p + Math.random() * 14 + 3;
        if (next >= 100) {
          clearInterval(iv);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        return next;
      });
    }, 65);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Scanlines */}
          <div className="scanlines absolute inset-0 pointer-events-none opacity-40" />

          {/* Red pulse rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ 
                width: i * 120, 
                height: i * 120,
                border: "1px solid rgba(255, 0, 60, 0.3)"
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Chrome logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <div className="relative">
              <div
                className="text-chrome font-display text-7xl tracking-widest"
                style={{ fontFamily: "'Bebas Neue', Impact, sans-serif" }}
              >
                SSC
              </div>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #FF003C, transparent)" }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <div
                className="text-[10px] tracking-[0.4em] uppercase"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "rgba(255, 0, 60, 0.8)"
                }}
              >
                Initializing Experience
              </div>

              {/* Progress bar */}
              <div className="w-56 h-px rounded-full overflow-hidden" style={{ background: "rgba(255, 255, 255, 0.1)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    background: "linear-gradient(90deg, #FF003C, #FF5E7A)",
                    boxShadow: "0 0 8px rgba(255,0,60,0.6)",
                  }}
                  transition={{ duration: 0.08 }}
                />
              </div>

              <div
                className="text-[11px] tabular-nums"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "rgba(255, 255, 255, 0.4)"
                }}
              >
                {Math.min(Math.round(pct), 100)}%
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
