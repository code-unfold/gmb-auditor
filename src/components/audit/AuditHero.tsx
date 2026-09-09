"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  MapPinIcon,
  SparklesIcon,
  CheckIcon,
  ChevronRightIcon,
  AlertCircleIcon,
  ZapIcon,
} from "@/components/common/Icons";

interface AuditHeroProps {
  onSearch?: (query: string, searchType: string) => void;
  defaultQuery?: string;
  isCompact?: boolean;
}

const SAMPLE_BUTTONS = [
  { key: "locksmith", label: "Locksmith", name: "Apex 24/7 Locksmith", loc: "Chicago, IL", score: "88" },
  { key: "dental", label: "Dental Clinic", name: "BrightSmile Dental", loc: "San Francisco, CA", score: "94" },
  { key: "restaurant", label: "Italian Trattoria", name: "Bella Vista Trattoria", loc: "New York, NY", score: "82" },
  { key: "hvac", label: "HVAC Contractor", name: "Elite Climate HVAC", loc: "Houston, TX", score: "91" },
];

export function AuditHero({ onSearch, defaultQuery = "", isCompact = false }: AuditHeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState("");
  const [searchMode, setSearchMode] = useState<"name" | "placeId" | "url">("name");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSubmitting(true);
    const fullQuery = location.trim() ? `${query.trim()}, ${location.trim()}` : query.trim();

    if (onSearch) {
      onSearch(fullQuery, searchMode);
      setIsSubmitting(false);
    } else {
      router.push(`/audit?q=${encodeURIComponent(fullQuery)}&mode=${searchMode}`);
    }
  };

  const handleSampleClick = (sampleKey: string) => {
    if (onSearch) {
      onSearch(sampleKey, "sample");
    } else {
      router.push(`/audit?sample=${sampleKey}`);
    }
  };

  if (isCompact) {
    return (
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <SearchIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Business Name, Place ID, or Maps URL..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 focus:border-indigo-500 rounded-xl text-white text-sm outline-none transition-all placeholder-slate-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md transition-all shrink-0"
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ZapIcon size={16} />
                <span>Run New Audit</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-3 flex items-center gap-2 overflow-x-auto text-xs text-slate-400 pt-1">
          <span className="shrink-0 font-medium text-slate-500">Quick Samples:</span>
          {SAMPLE_BUTTONS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => handleSampleClick(s.key)}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>{s.label}</span>
              <span className="text-emerald-400 font-bold">{s.score}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto text-center px-4 pt-10 pb-6">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6 animate-fadeIn">
        <SparklesIcon size={14} className="text-indigo-400" />
        <span>GMB Everywhere Equivalent • Instant 360° Profile Audit</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-5">
        Audit Any Google Business Profile{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400">
          In 5 Seconds
        </span>
      </h1>

      <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-9 leading-relaxed">
        Extract hidden Google categories, track local geo-grid rank maps, benchmark top 3 competitors, and detect NAP discrepancies with one click.
      </p>

      {/* Search Container Card */}
      <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl transition-all">
        {/* Search Mode Tabs */}
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSearchMode("name")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              searchMode === "name"
                ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Business Name &amp; City
          </button>
          <button
            type="button"
            onClick={() => setSearchMode("placeId")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              searchMode === "placeId"
                ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Google Place ID
          </button>
          <button
            type="button"
            onClick={() => setSearchMode("url")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              searchMode === "url"
                ? "bg-indigo-600/30 text-indigo-300 border border-indigo-500/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Google Maps URL
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-[1.6]">
            <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                searchMode === "name"
                  ? "e.g. Apex 24/7 Locksmith, Chicago"
                  : searchMode === "placeId"
                  ? "e.g. ChIJV4l7s18b5TkR5ZqjK9eO1bA"
                  : "e.g. https://maps.google.com/?cid=1084291823901928371"
              }
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-700/90 focus:border-indigo-500 rounded-xl text-white text-sm outline-none transition-all placeholder-slate-500 font-medium"
            />
          </div>

          {searchMode === "name" && (
            <div className="relative flex-1">
              <MapPinIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State (Optional)"
                className="w-full pl-10 pr-4 py-3.5 bg-slate-950 border border-slate-700/90 focus:border-indigo-500 rounded-xl text-white text-sm outline-none transition-all placeholder-slate-500 font-medium"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] shrink-0"
          >
            {isSubmitting ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ZapIcon size={18} />
                <span>Audit Profile Free</span>
                <ChevronRightIcon size={16} />
              </>
            )}
          </button>
        </form>

        {/* Try Sample Audits Bar */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 shrink-0">
            <SparklesIcon size={14} className="text-emerald-400" />
            Try Pre-Loaded Sample Audits:
          </span>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full sm:w-auto">
            {SAMPLE_BUTTONS.map((sample) => (
              <button
                key={sample.key}
                type="button"
                onClick={() => handleSampleClick(sample.key)}
                className="group flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-indigo-900/40 border border-slate-700/60 hover:border-indigo-500/40 transition-all text-xs"
              >
                <div className="text-left leading-tight">
                  <span className="font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {sample.label}
                  </span>
                  <span className="text-[10px] text-slate-400 block">{sample.loc}</span>
                </div>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  {sample.score}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <CheckIcon size={14} className="text-emerald-400" />
          <span>Real-time Google Maps Data</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckIcon size={14} className="text-emerald-400" />
          <span>No Chrome Extension Required</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckIcon size={14} className="text-emerald-400" />
          <span>Whitelabel PDF Reports</span>
        </div>
      </div>
    </div>
  );
}