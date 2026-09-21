import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Asif Nawaz — Frontend Engineer", description: "Portfolio of Asif Nawaz, a frontend engineer building clear, useful digital products with React and Next.js." };
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
