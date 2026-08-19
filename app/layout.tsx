import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GMB Auditor — All-in-One Google Business Profile Tool | Auxilium Technology",
  description:
    "Rank higher on Google Maps with GMB Auditor by Auxilium Technology: competitor category research, review audits, geo-grid rank checks and AI content tools for Google Business Profiles.",
  keywords: [
    "GMB audit",
    "Google Business Profile",
    "local SEO",
    "GBP audit tool",
    "review audit",
    "Auxilium Technology",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
