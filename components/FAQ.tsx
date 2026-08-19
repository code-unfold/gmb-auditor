"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-brand-100 rounded-2xl border border-brand-100 bg-white shadow-card">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q}>
            <button
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              <span className="text-sm font-semibold text-brand-900 sm:text-base">{item.q}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-200 text-brand-500 transition-transform duration-200 ${
                  open ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {open && (
              <p className="px-6 pb-5 text-sm leading-relaxed text-brand-800/75">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
