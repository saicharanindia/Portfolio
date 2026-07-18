"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

function FAQItem({ faq, index, inView }: { faq: typeof faqs[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
      className="border-b last:border-0"
      style={{ borderBottomColor: "rgba(255,0,60,0.1)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span
          className="text-sm sm:text-base font-medium pr-6 transition-colors duration-200"
          style={{ color: open ? "#FF5E7A" : "rgba(255,255,255,0.7)" }}
        >
          {faq.question}
        </span>
        <div
          className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background:  open ? "rgba(255,0,60,0.1)"  : "rgba(255,255,255,0.03)",
            borderColor: open ? "rgba(255,0,60,0.35)" : "rgba(255,255,255,0.07)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.div key="m" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Minus size={13} style={{ color: "#FF5E7A" }} />
              </motion.div>
            ) : (
              <motion.div key="p" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Plus size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { ref, inView } = useInView();

  return (
    <section id="faq" className="section-pad relative" style={{ background: "#080808" }}>
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="section-subtitle mb-3">FAQ</div>
          <h2 className="section-title text-chrome">Frequently Asked</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card px-7 py-2">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
