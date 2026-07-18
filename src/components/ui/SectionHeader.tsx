"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({ tag, title, highlight, subtitle, align = "center", className }: SectionHeaderProps) {
  const { ref, inView } = useInView();
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <div ref={ref} className={cn("mb-16", align === "center" ? "text-center" : "text-left", className)}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className={cn("mb-4", align === "center" ? "flex justify-center" : "")}
        >
          <span className="tag">{tag}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="heading-section"
        style={{ color: "#1C1A17" }}
      >
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="text-gradient-yellow">{highlight}</span>
            {titleParts[1]}
          </>
        ) : title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg max-w-2xl leading-relaxed"
          style={{
            color: "rgba(107,95,78,0.65)",
            margin: align === "center" ? "1rem auto 0" : "1rem 0 0",
          }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={cn("mt-6 h-px w-48", align === "center" ? "mx-auto" : "mr-auto")}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
          transformOrigin: align === "center" ? "center" : "left",
        }}
      />
    </div>
  );
}
