"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { getAllSampleAudits } from "@/lib/mockData";
import {
  LayoutDashboardIcon,
  BarChartIcon,
  GridIcon,
  SparklesIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  AlertCircleIcon,
  DownloadIcon,
  SearchIcon,
  ExternalLinkIcon,
} from "@/components/common/Icons";

export default function DashboardPage() {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { showToast } = useToast();
  const savedAudits = getAllSampleAudits();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAudits = savedAudits.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRunNewScan = () => {
    showToast("Opening live audit scan wizard...", "info");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-2">
              <LayoutDashboardIcon size={14} />
              <span>Agency Command Center</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              GBP Auditor Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage client locations, monitor health scores over time, and dispatch geo-grid scans.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/audit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <SparklesIcon size={16} />
              <span>Audit New Business</span>
            </Link>
          </div>
        </div>

        {/* 4 Overview Metric Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Monitored Profiles</span>
            <p className="text-3xl font-black text-white">{savedAudits.length}</p>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircleIcon size={13} /> 100% Verified
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Average Health Score</span>
            <p className="text-3xl font-black text-emerald-400">89%</p>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUpIcon size={13} /> +6% from last month
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total Reviews Tracked</span>
            <p className="text-3xl font-black text-white">2,178</p>
            <span className="text-[11px] text-slate-400">Across 4 metro markets</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-medium">Audit Scans Remaining</span>
            <p className="text-3xl font-black text-indigo-400">{user?.creditsRemaining || 48}</p>
            <span className="text-[11px] text-indigo-300 font-semibold">Agency Pro Tier</span>
          </div>
        </div>

        {/* Saved Profiles Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Saved Business Profile Audits</h2>
              <p className="text-xs text-slate-400">Click any business to view their full interactive audit report.</p>
            </div>

            <div className="relative">
              <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search saved profiles..."
                className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Business Name &amp; City</th>
                  <th className="py-3 px-4">Primary Category</th>
                  <th className="py-3 px-4">Health Score</th>
                  <th className="py-3 px-4">Reviews &amp; Rating</th>
                  <th className="py-3 px-4">AGR Rank</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAudits.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">
                      <div className="flex flex-col">
                        <span className="text-sm text-white font-bold">{item.name}</span>
                        <span className="text-[11px] text-slate-400">{item.city}, {item.state}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-300">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-medium">
                        {item.primaryCategory}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-emerald-400">{item.healthScore}%</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                          {item.grade}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-300">
                      <span className="font-bold text-white">{item.rating} ★</span>
                      <span className="text-slate-400 ml-1">({item.totalReviews})</span>
                    </td>

                    <td className="py-4 px-4 font-mono font-bold text-indigo-400">
                      #{item.geoGrid.agr} AGR
                    </td>

                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/audit?sample=${item.industry}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 text-indigo-300 hover:text-white font-semibold transition-all"
                      >
                        <span>View Audit</span>
                        <ExternalLinkIcon size={13} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}