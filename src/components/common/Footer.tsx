import React from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { ShieldCheckIcon, SparklesIcon } from "@/components/common/Icons";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              GBP Auditor provides actionable local SEO intelligence, geo-grid rank tracking, Google Business Profile audits, and AI-powered reply automations for local businesses and digital marketing agencies.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheckIcon size={16} />
                <span>Google API Compliant</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-indigo-400 font-medium">
                <SparklesIcon size={16} />
                <span>GMB Everywhere Alternative</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Tools</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/audit" className="hover:text-white transition-colors">
                  GBP Audit
                </Link>
              </li>
              <li>
                <Link href="/geo-grid" className="hover:text-white transition-colors">
                  Geo-Grid Rank Tracker
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Category Finder
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Review Sentiment &amp; AI
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Agency Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Comparisons</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#comparison" className="hover:text-white transition-colors">
                  vs GMB Everywhere
                </Link>
              </li>
              <li>
                <Link href="/#comparison" className="hover:text-white transition-colors">
                  vs BrightLocal
                </Link>
              </li>
              <li>
                <Link href="/#comparison" className="hover:text-white transition-colors">
                  vs Whitespark
                </Link>
              </li>
              <li>
                <Link href="/#comparison" className="hover:text-white transition-colors">
                  vs Local Falcon
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white transition-colors">
                  Google Categories Taxonomy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">SEO Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/audit?sample=locksmith" className="hover:text-white transition-colors">
                  Sample Locksmith Audit
                </Link>
              </li>
              <li>
                <Link href="/audit?sample=dental" className="hover:text-white transition-colors">
                  Sample Dental Audit
                </Link>
              </li>
              <li>
                <Link href="/audit?sample=restaurant" className="hover:text-white transition-colors">
                  Sample Restaurant Audit
                </Link>
              </li>
              <li>
                <Link href="/audit?sample=hvac" className="hover:text-white transition-colors">
                  Sample HVAC Audit
                </Link>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed">Local SEO Playbook 2026</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 GBP Auditor. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security</span>
            <span className="hover:text-slate-300 cursor-pointer">System Status</span>
          </div>
        </div>
      </div>
    </footer>
  );
}