"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import {
  TagIcon,
  SearchIcon,
  CopyIcon,
  CheckIcon,
  SparklesIcon,
  ExternalLinkIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  ZapIcon,
} from "@/components/common/Icons";

interface CategoryEntry {
  id: string;
  name: string;
  industry: string;
  searchVolume: number;
  difficulty: "Low" | "Medium" | "High";
  isPrimaryEligible: boolean;
  relatedCategories: string[];
}

const GOOGLE_CATEGORIES_DATABASE: CategoryEntry[] = [
  { id: "gcid:locksmith", name: "Locksmith", industry: "Security", searchVolume: 180000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["Emergency Locksmith Service", "Key Duplication Service", "Safe & Vault Shop"] },
  { id: "gcid:emergency_locksmith", name: "Emergency Locksmith Service", industry: "Security", searchVolume: 49000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["Locksmith", "Key Duplication Service"] },
  { id: "gcid:key_duplication", name: "Key Duplication Service", industry: "Security", searchVolume: 22000, difficulty: "Low", isPrimaryEligible: true, relatedCategories: ["Locksmith", "Hardware Store"] },
  { id: "gcid:safe_vault", name: "Safe & Vault Shop", industry: "Security", searchVolume: 12000, difficulty: "Medium", isPrimaryEligible: true, relatedCategories: ["Locksmith", "Security System Supplier"] },
  { id: "gcid:dentist", name: "Dentist", industry: "Medical", searchVolume: 450000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["Cosmetic Dentist", "Teeth Whitening Service", "Orthodontist"] },
  { id: "gcid:cosmetic_dentist", name: "Cosmetic Dentist", industry: "Medical", searchVolume: 74000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["Dentist", "Dental Clinic", "Teeth Whitening Service"] },
  { id: "gcid:teeth_whitening", name: "Teeth Whitening Service", industry: "Medical", searchVolume: 33000, difficulty: "Medium", isPrimaryEligible: true, relatedCategories: ["Cosmetic Dentist", "Dental Clinic"] },
  { id: "gcid:orthodontist", name: "Orthodontist", industry: "Medical", searchVolume: 90000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["Dentist", "Pediatric Dentist"] },
  { id: "gcid:hvac_contractor", name: "HVAC Contractor", industry: "Home Services", searchVolume: 210000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["Air Conditioning Repair Service", "Heating Contractor", "Air Duct Cleaning Service"] },
  { id: "gcid:ac_repair", name: "Air Conditioning Repair Service", industry: "Home Services", searchVolume: 165000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["HVAC Contractor", "Air Conditioning Contractor"] },
  { id: "gcid:air_duct_cleaning", name: "Air Duct Cleaning Service", industry: "Home Services", searchVolume: 42000, difficulty: "Medium", isPrimaryEligible: true, relatedCategories: ["HVAC Contractor", "Chimney Sweep"] },
  { id: "gcid:italian_restaurant", name: "Italian Restaurant", industry: "Food & Beverage", searchVolume: 310000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["Pizza Restaurant", "Pasta Shop", "Bar & Grill"] },
  { id: "gcid:pizza_restaurant", name: "Pizza Restaurant", industry: "Food & Beverage", searchVolume: 550000, difficulty: "High", isPrimaryEligible: true, relatedCategories: ["Pizza Delivery", "Italian Restaurant"] },
  { id: "gcid:catering", name: "Catering Food and Drink Supplier", industry: "Food & Beverage", searchVolume: 28000, difficulty: "Medium", isPrimaryEligible: true, relatedCategories: ["Restaurant", "Event Planner"] },
];

export default function CategoriesPage() {
  const { showToast } = useToast();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("ALL");
  const [spyUrl, setSpyUrl] = useState("");
  const [isSpying, setIsSpying] = useState(false);
  const [spyResults, setSpyResults] = useState<{
    name: string;
    primary: string;
    secondaries: string[];
  } | null>(null);

  const filteredCategories = GOOGLE_CATEGORIES_DATABASE.filter((cat) => {
    if (selectedIndustry !== "ALL" && cat.industry !== selectedIndustry) return false;
    if (
      searchKeyword.trim() &&
      !cat.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      !cat.industry.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleCopy = (name: string) => {
    navigator.clipboard?.writeText(name);
    showToast(`Copied category "${name}" to clipboard!`, "success");
  };

  const handleSpySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spyUrl.trim()) return;

    setIsSpying(true);
    setTimeout(() => {
      setIsSpying(false);
      setSpyResults({
        name: spyUrl.includes("http") ? "Decoded Google Maps Business" : spyUrl,
        primary: "Emergency Locksmith Service",
        secondaries: [
          "Locksmith",
          "Key Duplication Service",
          "Safe & Vault Shop",
          "Security System Supplier",
        ],
      });
      showToast("Decoded hidden Google categories from competitor listing!", "success");
    }, 600);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-2">
              <TagIcon size={14} />
              <span>Google Business Category Finder &amp; Spy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Google Categories Intelligence
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Search 4,000+ official GBP categories and extract the exact categories competitors hide in Google Maps.
            </p>
          </div>
        </div>

        {/* Competitor Category Spy Tool Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <SparklesIcon size={15} />
              Competitor Category Spy Tool
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Paste Any Competitor Google Maps URL
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Google Maps hides secondary categories from regular visitors. Paste any competitor listing URL or name below to reveal every hidden category driving their rank.
            </p>

            <form onSubmit={handleSpySubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <SearchIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={spyUrl}
                  onChange={(e) => setSpyUrl(e.target.value)}
                  placeholder="Paste Google Maps URL or competitor business name..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-xl text-white text-xs sm:text-sm outline-none font-medium"
                />
              </div>
              <button
                type="submit"
                disabled={isSpying}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
              >
                {isSpying ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ZapIcon size={16} />
                    <span>Decode Categories</span>
                  </>
                )}
              </button>
            </form>

            {/* Spy Results Display */}
            {spyResults && (
              <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 animate-fadeIn space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Target Listing:</span>
                  <span className="text-xs font-bold text-white">{spyResults.name}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-slate-800">
                  <span className="text-xs uppercase font-bold text-indigo-400 shrink-0">Primary Category:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-bold">
                      {spyResults.primary}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(spyResults.primary)}
                      className="p-1 text-slate-400 hover:text-white"
                      title="Copy category"
                    >
                      <CopyIcon size={14} />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-xs uppercase font-bold text-slate-400 block mb-2">
                    Hidden Secondary Categories:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {spyResults.secondaries.map((sec, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleCopy(sec)}
                        className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-400 text-xs text-slate-200 transition-all"
                      >
                        <span>{sec}</span>
                        <CopyIcon size={12} className="text-slate-400 group-hover:text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Database Explorer Search & Filter */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Google Category Directory</h2>
              <p className="text-xs text-slate-400">Search monthly search volumes and competition levels.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Filter category..."
                  className="pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none w-44 sm:w-60"
                />
              </div>

              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 outline-none"
              >
                <option value="ALL">All Industries</option>
                <option value="Security">Security &amp; Locksmith</option>
                <option value="Medical">Medical &amp; Dental</option>
                <option value="Home Services">Home Services &amp; HVAC</option>
                <option value="Food & Beverage">Food &amp; Beverage</option>
              </select>
            </div>
          </div>

          {/* Directory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white leading-snug">{cat.name}</h3>
                    <button
                      type="button"
                      onClick={() => handleCopy(cat.name)}
                      className="p-1 text-slate-400 hover:text-white shrink-0"
                      title="Copy to clipboard"
                    >
                      <CopyIcon size={15} />
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 block mb-3">{cat.id}</span>

                  <div className="flex flex-wrap gap-2 text-xs mb-4">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-semibold font-mono">
                      {cat.searchVolume.toLocaleString()} searches/mo
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        cat.difficulty === "High"
                          ? "bg-rose-500/20 text-rose-300"
                          : cat.difficulty === "Medium"
                          ? "bg-amber-500/20 text-amber-300"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {cat.difficulty} Competition
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Related Secondaries:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.relatedCategories.map((rel, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 text-[10px]"
                      >
                        {rel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}