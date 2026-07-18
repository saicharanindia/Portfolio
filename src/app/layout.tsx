import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanivarapu Sai Charan — SAP Developer & Software Engineer",
  description:
    "Portfolio of Sanivarapu Sai Charan — SAP Developer, Full Stack Engineer, and B.Tech IT student building enterprise-grade software.",
  keywords: ["Sanivarapu Sai Charan", "SAP Developer", "Software Engineer", "Full Stack", "Portfolio"],
  authors: [{ name: "Sanivarapu Sai Charan" }],
  openGraph: {
    type: "website",
    title: "Sanivarapu Sai Charan — SAP Developer & Software Engineer",
    description: "Engineering scalable enterprise software with modern technologies.",
    siteName: "Sai Charan Portfolio",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-bg text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
