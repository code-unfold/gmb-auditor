"use client";

import React, { useState } from "react";
import { SAMPLE_LOCKSMITH, SAMPLE_DENTAL, SAMPLE_HVAC, SAMPLE_RESTAURANT } from "@/lib/mockData";
import { GeoGridMap } from "@/components/audit/GeoGridMap";
import { useToast } from "@/context/ToastContext";
import {
  GridIcon,
  SearchIcon,
  DownloadIcon,
  SparklesIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  RefreshIcon,
  SlidersIcon,
} from "@/components/common/Icons";

export default function GeoGridPage() {
  const { showToast } = useToast();
  const [selectedProfile, setSelectedProfile] = useState(SAMPLE_LOCKSMITH);
  const [keyword, setKeyword] = useState("emergency locksmith near me");
  const [isScanning, setIsScanning] = useState(false);

  const handleProfileChange = (key: string) => {
    if (key === "dental") {
      setSelectedProfile(SAMPLE_DENTAL);
      setKeyword("cosmetic dentist san francisco");
    } else if (key === "restaurant") {
      setSelectedProfile(SAMPLE_RESTAURANT);
      setKeyword("authentic pasta little italy");
    } else if (key === "hvac") {
      setSelectedProfile(SAMPLE_HVAC);
      setKeyword("emergency ac repair houston");
    } else {
      setSelectedProfile(SAMPLE_LOCKSMITH);
      setKeyword("emergency locksmith near me");
    }
    showToast("Loaded geo-grid configuration for " + key, "info");
  };

  const handleExportCsv = () => {
    showToast("Exported Geo-Grid ranking dataset (CSV)!", "success");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold mb-2">
              <GridIcon size={14} />
              <span>Standalone Geo-Grid Rank Radar</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Local Geo-Grid Rank Tracker
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Visualize hyper-local rankings at every coordinate within your target service radius.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold transition-all shadow"
            >
              <DownloadIcon size={15} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Business Selector Bar */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Active Business:
          </span>

          <div className="flex flex-wrap gap-2">
            {[
              { key: "locksmith", label: "Apex Locksmith (Chicago)" },
              { key: "dental", label: "BrightSmile Dental (SF)" },
              { key: "restaurant", label: "Bella Vista (NYC)" },
              { key: "hvac", label: "Elite Climate (Houston)" },
            ].map((b) => (
              <button
                key={b.key}
                type="button"
                onClick={() => handleProfileChange(b.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  selectedProfile.industry === b.key
                    ? "bg-indigo-600 text-white border-indigo-500 shadow"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main GeoGrid Component */}
        <GeoGridMap geoGrid={selectedProfile.geoGrid} businessName={selectedProfile.name} />

        {/* Historical Rank Trend Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>AGR 30-Day Trend</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUpIcon size={14} /> +0.9 Positions
              </span>
            </div>
            <p className="text-2xl font-black text-white">{selectedProfile.geoGrid.agr} Avg Rank</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your average rank across all grid points has climbed from 3.7 to {selectedProfile.geoGrid.agr} this month.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Share of Local Voice (SoLV)</span>
              <span className="text-emerald-400 font-bold">+14% Growth</span>
            </div>
            <p className="text-2xl font-black text-emerald-400">{selectedProfile.geoGrid.solv}%</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedProfile.geoGrid.solv}% of all consumers in this radius see your profile in the top 3 spots.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Scan Radius</span>
              <span className="text-indigo-400 font-bold">{selectedProfile.geoGrid.radiusKm} km</span>
            </div>
            <p className="text-2xl font-black text-white">{selectedProfile.geoGrid.points.length} Coordinates</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Continuous monitoring tracks proximity decay and competitive rank takeovers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}