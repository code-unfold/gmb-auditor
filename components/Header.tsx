"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS, SIGNUP_URL, LOGIN_URL } from "@/lib/config";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-900/5 bg-white/90 backdrop-blur">
      <div className="container-px flex h-16 items-center justify-between">
        <Link href="/" aria-label="GMB Auditor home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-brand-800/80 transition-colors hover:text-brand-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={LOGIN_URL} className="text-sm font-semibold text-brand-700 hover:text-brand-500">
            Log in
          </a>
          <a href={SIGNUP_URL} className="btn-primary !py-2.5">
            Start Free
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-100 text-brand-800 md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-brand-900/5 bg-white px-5 pb-5 pt-3 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-brand-800 hover:bg-brand-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex gap-3">
            <a href={LOGIN_URL} className="btn-secondary flex-1">
              Log in
            </a>
            <a href={SIGNUP_URL} className="btn-primary flex-1">
              Start Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
