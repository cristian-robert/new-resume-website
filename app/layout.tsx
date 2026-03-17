import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const jetbrainsMono = localFont({
  src: "../public/fonts/JetBrainsMono-Variable.ttf",
  variable: "--font-mono",
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
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
