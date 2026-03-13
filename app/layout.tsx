import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cristian-Robert Iosef | Senior QA Automation Engineer",
  description:
    "Test Automation Architect specializing in enterprise-grade frameworks across web, API, and performance domains.",
  keywords: [
    "QA Automation",
    "Test Automation",
    "Playwright",
    "Selenium",
    "Java",
    "TypeScript",
    "CI/CD",
    "Senior Engineer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
