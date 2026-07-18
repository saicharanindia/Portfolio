"use client";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   Premium Red Cursor
   • Main: sleek SVG arrow — deep black body, vivid red inner fill,
     bright red edge glow
   • Hover: arrow scales up + turns fully red
   • Trail: 6 fading red glow dots
   • Click: red ripple burst
───────────────────────────────────────────────────────────────── */

const ARROW_DEFAULT = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 40 48" fill="none">
  <path d="M4 4 L4 37 L13 28 L20 44 L25 42 L18 26 L30 26 Z"
        fill="rgba(0,0,0,0.45)" transform="translate(2,2)"/>
  <path d="M4 4 L4 37 L13 28 L20 44 L25 42 L18 26 L30 26 Z"
        fill="#0A0A0A" stroke="#FF003C" stroke-width="2" stroke-linejoin="round"/>
  <path d="M7 9 L7 31 L14 24 L20 38 L22 37 L16 23 L25 23 Z"
        fill="#FF003C" opacity="0.9"/>
  <circle cx="4" cy="4" r="2.5" fill="#FF5E7A"/>
</svg>`;

const ARROW_HOVER = `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="55" viewBox="0 0 46 55" fill="none">
  <path d="M4 4 L4 42 L15 31 L23 50 L29 47 L21 29 L35 29 Z"
        fill="rgba(0,0,0,0.5)" transform="translate(2,2)"/>
  <path d="M4 4 L4 42 L15 31 L23 50 L29 47 L21 29 L35 29 Z"
        fill="#1A0000" stroke="#FF1744" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M7 9 L7 36 L16 27 L23 44 L25 43 L18 26 L29 26 Z"
        fill="#FF1744" opacity="1"/>
  <circle cx="4" cy="4" r="3" fill="#FF5E7A"/>
</svg>`;

function toUrl(svg: string) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function ripple(x: number, y: number) {
  const el = document.createElement("div");
  Object.assign(el.style, {
    position:      "fixed",
    left:          `${x}px`,
    top:           `${y}px`,
    width:         "8px",
    height:        "8px",
    borderRadius:  "50%",
    background:    "rgba(255,0,60,0.9)",
    transform:     "translate(-50%,-50%) scale(1)",
    pointerEvents: "none",
    zIndex:        "999990",
    animation:     "redRipple 0.55s ease-out forwards",
  });
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

const TRAIL = 6;

export default function CustomCursor() {
  const mainRef   = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>(Array(TRAIL).fill(null));
  const pos       = useRef({ x: -300, y: -300 });
  const trail     = useRef(Array.from({ length: TRAIL }, () => ({ x: -300, y: -300 })));
  const raf       = useRef<number>(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const loop = () => {
      /* Main follows instantly */
      main.style.left = `${pos.current.x}px`;
      main.style.top  = `${pos.current.y}px`;

      /* Each trail dot lags the one before */
      let prev = pos.current;
      trail.current.forEach((t, i) => {
        const f = 0.18 - i * 0.02;
        t.x += (prev.x - t.x) * f;
        t.y += (prev.y - t.y) * f;
        const el = trailRefs.current[i];
        if (el) {
          el.style.left    = `${t.x}px`;
          el.style.top     = `${t.y}px`;
          el.style.opacity = String(Math.max(0, 0.52 - i * 0.08));
          el.style.transform = `translate(-50%,-50%) scale(${1 - i * 0.12})`;
        }
        prev = t;
      });

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const onMove  = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const onClick = (e: MouseEvent) => ripple(e.clientX, e.clientY);
    const onEnter = () => setHover(true);
    const onLeave = () => setHover(false);

    const attach = () =>
      document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click",     onClick);
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        /* Hide default cursor everywhere and show custom red cursor */
        * { cursor: none !important; }
        
        input[type="text"], textarea {
          cursor: none !important;
        }

        @keyframes redRipple {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.9; }
          100% { transform: translate(-50%,-50%) scale(10);  opacity: 0;   }
        }
      `}</style>

      {/* Trail dots */}
      {Array.from({ length: TRAIL }, (_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          aria-hidden="true"
          style={{
            position:      "fixed",
            top:            0,
            left:           0,
            pointerEvents: "none",
            zIndex:        9999990 - i,   /* above everything */
            width:  `${8 - i}px`,
            height: `${8 - i}px`,
            borderRadius:  "50%",
            background:    `rgba(255,${i * 8},60,${0.7 - i * 0.09})`,
            boxShadow:     `0 0 ${6 + i * 2}px rgba(255,0,60,${0.55 - i * 0.07})`,
            willChange:    "left,top,opacity",
          }}
        />
      ))}

      {/* Main cursor — always on absolute top */}
      <div
        ref={mainRef}
        aria-hidden="true"
        style={{
          position:        "fixed",
          top:              0,
          left:             0,
          width:            hover ? "46px" : "40px",
          height:           hover ? "55px" : "48px",
          backgroundImage:  toUrl(hover ? ARROW_HOVER : ARROW_DEFAULT),
          backgroundSize:   "contain",
          backgroundRepeat: "no-repeat",
          pointerEvents:    "none",
          zIndex:           9999999,      /* above everything */
          imageRendering:   "auto",
          filter: hover
            ? "drop-shadow(0 0 8px rgba(255,0,60,1)) drop-shadow(0 0 16px rgba(255,0,60,0.6))"
            : "drop-shadow(0 0 4px rgba(255,0,60,0.8)) drop-shadow(1px 2px 3px rgba(0,0,0,0.9))",
          transition:       "width 0.15s, height 0.15s, filter 0.2s",
          willChange:       "left,top",
        }}
      />
    </>
  );
}
