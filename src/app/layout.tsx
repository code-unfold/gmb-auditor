import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "GBP Auditor — Ultimate Google Business Profile Audit & Local SEO Tool",
  description: "Audit any Google Business Profile in 5 seconds. Live geo-grid ranking heatmap, hidden competitor category spy, review sentiment analytics, and AI local post generator.",
  keywords: ["GBP Auditor", "Google Business Profile Audit", "GMB Everywhere Alternative", "Local SEO Tool", "Geo-Grid Rank Tracker", "Google Categories Spy"],
  authors: [{ name: "GBP Auditor" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}