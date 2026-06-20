import type { Metadata } from "next";
import { IBM_Plex_Mono, Spectral, Teko } from "next/font/google";
import { DemoProvider } from "@/app/components/demo-provider";
import "./globals.css";

const displayFont = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const bodyFont = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const utilityFont = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Express | MVP Demo",
  description:
    "Frontend MVP para Express: afluencia predictiva, sala virtual, reservas, QR de seguimiento y experiencia solidaria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${displayFont.variable} ${bodyFont.variable} ${utilityFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
