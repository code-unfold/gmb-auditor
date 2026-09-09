"use client";

import React, { useState } from "react";
import { BusinessProfile, SecondaryCategory } from "@/types";
import { useToast } from "@/context/ToastContext";
import {
  TagIcon,
  CheckIcon,
  CopyIcon,
  SparklesIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  ShieldCheckIcon,
} from "@/components/common/Icons";

interface CategoriesSectionProps {
  business: BusinessProfile;
}

export function CategoriesSection({ business }: CategoriesSectionProps) {
  const { showToast } = useToast();
  const [copiedCategory, setCopiedCategory] = useState<string | null>(null);

  const activeSecondaries = business.secondaryCategories.filter((c) => c.isCurrentlyUsed);
  const recommendedSecondaries = business.secondaryCategories.filter((c) => !c.isCurrentlyUsed);

  const handleCopyCategory = (categoryName: string) => {
    navigator.clipboard?.writeText(categoryName);
    setCopiedCategory(categoryName);
    showToast(`Copied "${categoryName}" to clipboard!`, "success");
    setTimeout(() => setCopiedCategory(null), 2500);
  };

  return (
    <section id="categories-section" className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <TagIcon size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Google Categories &amp; Competitor Spy
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Categories drive 84% of ranking weight in Google 3-Pack local algorithms.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium">
            Active in Profile: <strong className="text-emerald-400">{1 + activeSecondaries.length}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 font-medium">
            Missing Potential: <strong className="text-indigo-400">{recommendedSecondaries.length}</strong>
          </span>
        </div>
      </div>

      {/* Primary & Active Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        {/* Primary Category Hero Card */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-900 border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                Primary Category
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                100% Match
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <h4 className="text-2xl font-black text-white">{business.primaryCategory}</h4>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Google Taxonomy ID: <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded text-[11px] font-mono">{business.primaryCategoryId}</code>
            </p>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>Optimization Note:</strong> Your primary category carries 3x more algorithmic authority than secondary categories. Keep this strictly aligned with your highest volume commercial service.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Category Health:</span>
            <span className="text-emerald-400 font-bold">Optimal Alignment</span>
          </div>
        </div>

        {/* Secondary Categories List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Active Secondary Categories ({activeSecondaries.length})
            </span>
            <span className="text-xs text-slate-500">Google allows up to 9 secondary categories</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeSecondaries.map((sec) => (
              <div
                key={sec.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-white leading-tight">{sec.name}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono shrink-0">
                    {sec.searchVolume.toLocaleString()}/mo
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-900">
                  <span>Difficulty: <strong className="text-slate-300">{sec.rankingDifficulty}</strong></span>
                  <span className="text-emerald-400 font-semibold">{sec.matchScore}% Match</span>
                </div>
              </div>
            ))}
          </div>

          {/* Missing Recommendations Banner */}
          {recommendedSecondaries.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 mt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
                <SparklesIcon size={15} />
                <span>High-Opportunity Categories Missing from Profile:</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {recommendedSecondaries.map((rec) => (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => handleCopyCategory(rec.name)}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-400 text-slate-200 hover:text-white text-xs transition-all"
                  >
                    <span>+ {rec.name}</span>
                    <span className="text-[10px] text-amber-400 font-semibold font-mono">
                      {rec.searchVolume.toLocaleString()} vol
                    </span>
                    <CopyIcon size={12} className="text-slate-400 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Competitor Category Comparison Matrix */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <h4 className="text-sm uppercase font-bold tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <TrendingUpIcon size={16} className="text-indigo-400" />
          Competitor Category Matrix
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Business Name</th>
                <th className="py-3 px-4">Primary Category</th>
                <th className="py-3 px-4">Total Categories</th>
                <th className="py-3 px-4">Key Secondary Categories</th>
                <th className="py-3 px-4 text-right">Competitive Edge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {business.competitors.map((comp) => (
                <tr
                  key={comp.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    comp.isTarget ? "bg-indigo-950/20 font-medium" : ""
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                    {comp.name}
                    {comp.isTarget && (
                      <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                        Target
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-200">{comp.primaryCategory}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold font-mono">
                      {1 + comp.secondaryCategoriesCount}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">
                    {comp.isTarget
                      ? activeSecondaries.map((s) => s.name).join(", ")
                      : "Emergency Services, Duplication, Commercial Security, Safes"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {comp.isTarget ? (
                      <span className="text-emerald-400 font-semibold">Your Listing</span>
                    ) : comp.secondaryCategoriesCount > activeSecondaries.length ? (
                      <span className="text-amber-400 font-semibold">Uses +{comp.secondaryCategoriesCount - activeSecondaries.length} more categories</span>
                    ) : (
                      <span className="text-slate-400">Equal coverage</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}