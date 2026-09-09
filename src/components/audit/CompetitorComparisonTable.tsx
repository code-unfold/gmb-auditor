"use client";

import React, { useState } from "react";
import { CompetitorData } from "@/types";
import {
  UsersIcon,
  StarIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  CameraIcon,
  TagIcon,
  FileTextIcon,
  GlobeIcon,
  TrendingUpIcon,
} from "@/components/common/Icons";

interface CompetitorComparisonTableProps {
  competitors: CompetitorData[];
  businessName: string;
}

export function CompetitorComparisonTable({ competitors, businessName }: CompetitorComparisonTableProps) {
  const [filterGapsOnly, setFilterGapsOnly] = useState(false);

  const target = competitors.find((c) => c.isTarget) || competitors[0];
  const rivals = competitors.filter((c) => !c.isTarget);

  return (
    <section id="competitors-section" className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <UsersIcon size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Side-by-Side Competitor Benchmark
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Deep comparative gap audit against top 3 ranking rivals in your local market.
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterGapsOnly(!filterGapsOnly)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              filterGapsOnly
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            {filterGapsOnly ? "Showing Critical Gaps Only" : "Show All Ranking Signals"}
          </button>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4 w-48 bg-slate-950/40">Ranking Metric</th>
              <th className="py-3 px-4 bg-indigo-950/30 text-indigo-300 border-x border-indigo-500/20 font-black">
                {target.name} (You)
              </th>
              {rivals.map((rival) => (
                <th key={rival.id} className="py-3 px-4 text-slate-300">
                  {rival.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {/* Star Rating */}
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-300 flex items-center gap-2">
                <StarIcon size={14} className="text-amber-400" />
                <span>Google Rating</span>
              </td>
              <td className="py-3.5 px-4 bg-indigo-950/20 border-x border-indigo-500/20 font-bold text-white">
                <span className="text-sm font-black">{target.rating}</span> ★
              </td>
              {rivals.map((rival) => {
                const isBetter = rival.rating > target.rating;
                return (
                  <td key={rival.id} className="py-3.5 px-4 text-slate-300">
                    <span className="text-sm font-bold">{rival.rating}</span> ★
                    {isBetter && (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                        +{ (rival.rating - target.rating).toFixed(1) }
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Review Count */}
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-300 flex items-center gap-2">
                <UsersIcon size={14} className="text-indigo-400" />
                <span>Review Count</span>
              </td>
              <td className="py-3.5 px-4 bg-indigo-950/20 border-x border-indigo-500/20 font-bold text-white">
                <span className="text-sm font-black">{target.reviewsCount}</span>
              </td>
              {rivals.map((rival) => {
                const diff = rival.reviewsCount - target.reviewsCount;
                return (
                  <td key={rival.id} className="py-3.5 px-4 text-slate-300 font-medium">
                    <span className="text-sm font-semibold">{rival.reviewsCount}</span>
                    {diff > 0 ? (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                        +{diff} ahead
                      </span>
                    ) : (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        {Math.abs(diff)} behind
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Primary Category */}
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-300 flex items-center gap-2">
                <TagIcon size={14} className="text-emerald-400" />
                <span>Primary Category</span>
              </td>
              <td className="py-3.5 px-4 bg-indigo-950/20 border-x border-indigo-500/20 font-bold text-emerald-400">
                {target.primaryCategory}
              </td>
              {rivals.map((rival) => (
                <td key={rival.id} className="py-3.5 px-4 text-slate-300">
                  <span className={rival.primaryCategory === target.primaryCategory ? "text-slate-300" : "text-amber-300 font-semibold"}>
                    {rival.primaryCategory}
                  </span>
                </td>
              ))}
            </tr>

            {/* Secondary Categories Count */}
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-300 flex items-center gap-2">
                <TagIcon size={14} className="text-slate-400" />
                <span>Secondary Categories</span>
              </td>
              <td className="py-3.5 px-4 bg-indigo-950/20 border-x border-indigo-500/20 font-bold text-white">
                {target.secondaryCategoriesCount} Categories
              </td>
              {rivals.map((rival) => {
                const hasMore = rival.secondaryCategoriesCount > target.secondaryCategoriesCount;
                return (
                  <td key={rival.id} className="py-3.5 px-4 text-slate-300">
                    <span>{rival.secondaryCategoriesCount} Categories</span>
                    {hasMore && (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                        +{rival.secondaryCategoriesCount - target.secondaryCategoriesCount} more
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Photos Count */}
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-300 flex items-center gap-2">
                <CameraIcon size={14} className="text-indigo-400" />
                <span>Photos Uploaded</span>
              </td>
              <td className="py-3.5 px-4 bg-indigo-950/20 border-x border-indigo-500/20 font-bold text-white">
                {target.photosCount}
              </td>
              {rivals.map((rival) => {
                const diff = rival.photosCount - target.photosCount;
                return (
                  <td key={rival.id} className="py-3.5 px-4 text-slate-300">
                    <span>{rival.photosCount}</span>
                    {diff > 0 ? (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                        +{diff} photos
                      </span>
                    ) : (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Ahead
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Post Frequency */}
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-300 flex items-center gap-2">
                <FileTextIcon size={14} className="text-emerald-400" />
                <span>Google Posts/Month</span>
              </td>
              <td className="py-3.5 px-4 bg-indigo-950/20 border-x border-indigo-500/20 font-bold text-emerald-400">
                {target.postsPerMonth} / mo
              </td>
              {rivals.map((rival) => (
                <td key={rival.id} className="py-3.5 px-4 text-slate-300">
                  {rival.postsPerMonth} / mo
                </td>
              ))}
            </tr>

            {/* Domain Authority */}
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-300 flex items-center gap-2">
                <GlobeIcon size={14} className="text-indigo-400" />
                <span>Domain Authority (DA)</span>
              </td>
              <td className="py-3.5 px-4 bg-indigo-950/20 border-x border-indigo-500/20 font-bold text-white">
                {target.domainAuthority} / 100
              </td>
              {rivals.map((rival) => (
                <td key={rival.id} className="py-3.5 px-4 text-slate-300">
                  {rival.domainAuthority} / 100
                </td>
              ))}
            </tr>

            {/* Response Rate */}
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-300 flex items-center gap-2">
                <CheckCircleIcon size={14} className="text-emerald-400" />
                <span>Owner Response Rate</span>
              </td>
              <td className="py-3.5 px-4 bg-indigo-950/20 border-x border-indigo-500/20 font-black text-emerald-400">
                {target.responseRate}%
              </td>
              {rivals.map((rival) => {
                const isLower = rival.responseRate < target.responseRate;
                return (
                  <td key={rival.id} className="py-3.5 px-4 text-slate-300">
                    <span>{rival.responseRate}%</span>
                    {isLower ? (
                      <span className="ml-2 text-emerald-400 font-bold text-[10px]">
                        (You Lead)
                      </span>
                    ) : (
                      <span className="ml-2 text-amber-400 font-bold text-[10px]">
                        (Rival Leads)
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* Strategic Gap Summary */}
            <tr className="bg-slate-950/60">
              <td className="py-4 px-4 font-bold text-indigo-300">
                Strategic Gap &amp; Edge
              </td>
              <td className="py-4 px-4 bg-indigo-950/40 border-x border-indigo-500/30 text-emerald-300 font-medium leading-relaxed">
                {target.gapSummary}
              </td>
              {rivals.map((rival) => (
                <td key={rival.id} className="py-4 px-4 text-slate-400 leading-relaxed">
                  {rival.gapSummary}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}