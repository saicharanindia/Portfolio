"use client";
/* ─── Company logos using real downloaded files ─── */

interface LogoProps { height?: number; className?: string; }

/* SAP — blue gradient (looks great on dark bg) */
export function LogoSAP({ height = 36, className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/sap.webp" alt="SAP"
      style={{ height, width: "auto", maxWidth: "none", objectFit: "contain", display: "block" }}
      className={className}
    />
  );
}

/* TCS — colourful on dark bg, fine as-is */
export function LogoTCS({ height = 36, className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/tcs.webp" alt="Tata Consultancy Services"
      style={{ height, width: "auto", maxWidth: "none", objectFit: "contain", display: "block" }}
      className={className}
    />
  );
}

/* Accenture — black logo on white background pill */
export function LogoAccenture({ height = 28, className = "" }: LogoProps) {
  return (
    <div style={{ background: "#fff", borderRadius: "6px", padding: "3px 8px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/accenture.png" alt="Accenture"
        style={{ height, width: "auto", maxWidth: "none", objectFit: "contain", display: "block" }}
        className={className}
      />
    </div>
  );
}

/* Deloitte — black logo on white background pill */
export function LogoDeloitte({ height = 26, className = "" }: LogoProps) {
  return (
    <div style={{ background: "#fff", borderRadius: "6px", padding: "3px 8px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logos/deloitte.jpg" alt="Deloitte"
        style={{ height, width: "auto", maxWidth: "none", objectFit: "contain", display: "block" }}
        className={className}
      />
    </div>
  );
}

/* Vignan's University */
export function LogoVignan({ height = 36, className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logos/vignan.png" alt="Vignan's University"
      style={{ height, width: "auto", maxWidth: "none", objectFit: "contain", display: "block" }}
      className={className}
    />
  );
}
