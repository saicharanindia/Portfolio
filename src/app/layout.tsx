import type { Metadata, Viewport } from "next";
import { DM_Sans, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
  display: "swap",
});

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
    <html lang="en" className={`dark ${dmSans.variable} ${bebasNeue.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-bg text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
