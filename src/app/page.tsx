"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AuditHero } from "@/components/audit/AuditHero";
import {
  BarChartIcon,
  GridIcon,
  TagIcon,
  MessageSquareIcon,
  ShieldCheckIcon,
  SparklesIcon,
  CheckIcon,
  StarIcon,
  TrendingUpIcon,
  ChevronDownIcon,
  ZapIcon,
  UsersIcon,
  ChevronRightIcon,
} from "@/components/common/Icons";

const COMPARISON_FEATURES = [
  { feature: "No Chrome Extension Required (Works in Cloud)", gbpAuditor: true, gmbEverywhere: false },
  { feature: "Live 3x3 & 5x5 Geo-Grid Rank Heatmaps", gbpAuditor: true, gmbEverywhere: true },
  { feature: "Hidden Secondary Category Spy & Search Volume", gbpAuditor: true, gmbEverywhere: true },
  { feature: "AI Review Auto-Responder (Custom Tone)", gbpAuditor: true, gmbEverywhere: false },
  { feature: "AI Google Post Generator (Offer/Event)", gbpAuditor: true, gmbEverywhere: false },
  { feature: "Client-Ready Whitelabel PDF Export", gbpAuditor: true, gmbEverywhere: false },
  { feature: "Side-by-Side 4-Competitor Gap Analysis", gbpAuditor: true, gmbEverywhere: "Basic" },
  { feature: "Prioritized Action Checklist with How-To Fixes", gbpAuditor: true, gmbEverywhere: false },
];

const FAQS = [
  {
    q: "How does GBP Auditor compare to GMB Everywhere?",
    a: "Unlike GMB Everywhere which requires installing a desktop Chrome extension and only works inside Google Maps tabs, GBP Auditor is a comprehensive cloud platform. You can audit any business from mobile, tablet, or desktop, share interactive web reports with clients, export whitelabel PDF audits, and generate AI replies and posts automatically.",
  },
  {
    q: "Do I need manager access to the Google Business Profile to audit it?",
    a: "No! GBP Auditor analyzes publicly indexed Google Maps, Knowledge Panel, and Places API data. You can audit your own business, client businesses, or reverse-engineer your competitors listings without needing profile ownership.",
  },
  {
    q: "What is the Geo-Grid Rank Tracker and why is it important?",
    a: "Google Maps rank changes significantly based on the user geographic proximity. A business that ranks #1 directly in front of its store might drop to #12 just 2 miles away. Our Geo-Grid tracker scans a multi-point grid radius to reveal your true local visibility and where competitors are capturing your leads.",
  },
  {
    q: "Can I export branded PDF reports for client presentations?",
    a: "Yes. All audit reports can be exported to clean, high-resolution PDF documents with one click, perfect for digital agencies delivering prospect audits and monthly client reports.",
  },
  {
    q: "How often are Google Categories and SEO metrics updated?",
    a: "Our category database syncs directly with Google official Business Category taxonomy. When Google adds or deprecates categories, our database updates automatically.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 1. Hero Search Section */}
      <section className="w-full relative overflow-hidden pt-6 pb-16 lg:pb-24 border-b border-slate-800/80">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-500/15 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <AuditHero />
      </section>

      {/* 2. Interactive Product Preview Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-indigo-400 mb-3">
            Next-Gen Local SEO Suite
          </h2>
          <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Everything You Need to Dominate Google Local 3-Pack
          </p>
        </div>

        {/* 4 Core Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/audit"
            className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-glow flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BarChartIcon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">GBP Full Audit</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Health score 0-100, NAP consistency audits, photo freshness, and actionable fix checklist.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
              <span>Run Audit</span>
              <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/geo-grid"
            className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-glow-emerald flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <GridIcon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Geo-Grid Tracker</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-coordinate rank heatmaps across custom radiuses (1km to 15km) with AGR &amp; SoLV metrics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>Track Geo-Grid</span>
              <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/categories"
            className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-glow flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <TagIcon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Category Spy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extract hidden primary and secondary Google categories used by competitors with search volume.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
              <span>Spy Categories</span>
              <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/reviews"
            className="group p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all hover:shadow-glow flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageSquareIcon size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Review Sentiment &amp; AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                NLP sentiment breakdown, keyword frequency extraction, and 1-click AI owner reply generator.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
              <span>Analyze Reviews</span>
              <ChevronRightIcon size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Feature Comparison: GBP Auditor vs GMB Everywhere */}
      <section id="comparison" className="w-full bg-slate-900/60 border-y border-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-bold mb-3">
              <SparklesIcon size={13} />
              Better Alternative
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              GBP Auditor vs GMB Everywhere
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Why agencies and local businesses are migrating to our modern cloud platform.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider bg-slate-950">
                    <th className="py-4 px-6">Capability &amp; Tooling</th>
                    <th className="py-4 px-6 bg-indigo-950/40 text-indigo-300 border-x border-indigo-500/20 text-center font-black">
                      GBP Auditor
                    </th>
                    <th className="py-4 px-6 text-center text-slate-400">GMB Everywhere</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {COMPARISON_FEATURES.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-6 font-medium text-white">{row.feature}</td>
                      <td className="py-4 px-6 bg-indigo-950/20 border-x border-indigo-500/20 text-center">
                        <div className="flex items-center justify-center text-emerald-400 font-bold">
                          <CheckIcon size={18} />
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof row.gmbEverywhere === "boolean" ? (
                          row.gmbEverywhere ? (
                            <div className="flex items-center justify-center text-emerald-400">
                              <CheckIcon size={18} />
                            </div>
                          ) : (
                            <span className="text-slate-500 font-semibold">✗ No</span>
                          )
                        ) : (
                          <span className="text-amber-400 font-medium">{row.gmbEverywhere}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-2">
            Proven Agency Results
          </h2>
          <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Trusted by 2,400+ Local SEO Specialists
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={16} />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                &ldquo;We replaced three separate extensions with GBP Auditor. The Category Spy discovered that adding two missing secondary categories doubled our HVAC client&apos;s inbound calls in 3 weeks.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                DK
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Derek Kowalski</span>
                <span className="text-[11px] text-slate-400">Director of Local SEO, MetroRank Agency</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={16} />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                &ldquo;Being able to generate a whitelabel PDF audit during live discovery calls wins us clients instantly. Prospects see the exact geo-grid heatmap where they are losing leads.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
                SL
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Samantha Lin</span>
                <span className="text-[11px] text-slate-400">Founder, Dental Marketing Scale</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={16} />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                &ldquo;The AI Review Responder alone saves our team 10 hours a month. It crafts authentic responses that naturally include target geographic keywords. Exceptional product.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold text-xs">
                RT
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Robert Torres</span>
                <span className="text-[11px] text-slate-400">Owner, 24/7 Locksmith Solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need to know about auditing Google Business Profiles.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-indigo-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDownIcon
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-indigo-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. High-Converting Bottom CTA Banner */}
      <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-indigo-900/60 via-slate-900 to-emerald-950/40 border border-indigo-500/30 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl pointer-events-none" />

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Audit Your Google Business Profile Right Now
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Uncover ranking leaks, track local grid positions, and copy competitor categories in 5 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/audit?sample=locksmith"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              Try Live Locksmith Audit
            </Link>
            <Link
              href="/geo-grid"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm transition-all"
            >
              Open Geo-Grid Tracker
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}