import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import "./home.css";
import "./experience.css";
import "@/components/hero/hero.css";
import "@/components/home/platform-at-work.css";

export const metadata: Metadata = {
  title: "Enterprise Agentic AI Platform | From conversation to execution",
  description: "AI agents that understand intent, access trusted enterprise knowledge, orchestrate capabilities and execute real actions across your business systems.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
