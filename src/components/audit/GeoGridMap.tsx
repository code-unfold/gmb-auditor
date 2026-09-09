"use client";

import React, { useState } from "react";
import { GeoGridData, GeoGridPoint } from "@/types";
import {
  GridIcon,
  SearchIcon,
  SlidersIcon,
  RefreshIcon,
  MapPinIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ZapIcon,
  DownloadIcon,
} from "@/components/common/Icons";

interface GeoGridMapProps {
  geoGrid: GeoGridData;
  businessName: string;
}

export function GeoGridMap({ geoGrid, businessName }: GeoGridMapProps) {
  const [keyword, setKeyword] = useState(geoGrid.targetKeyword);
  const [radius, setRadius] = useState<number>(geoGrid.radiusKm);
  const [gridSize, setGridSize] = useState<"3x3" | "5x5">(geoGrid.gridSize);
  const [selectedPoint, setSelectedPoint] = useState<GeoGridPoint | null>(geoGrid.points[12] || geoGrid.points[0]);
  const [mapStyle, setMapStyle] = useState<"dark" | "satellite">("dark");
  const [isScanning, setIsScanning] = useState(false);

  // Filter or scale points based on selected 3x3 or 5x5
  const displayPoints = gridSize === "3x3"
    ? geoGrid.points.filter((p) => p.row % 2 === 0 && p.col % 2 === 0)
    : geoGrid.points;

  const handleRescan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 800);
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return { bg: "bg-emerald-500 text-slate-950 font-black", glow: "shadow-[0_0_12px_rgba(16,185,129,0.5)] border-emerald-300" };
    if (rank <= 10) return { bg: "bg-amber-400 text-slate-950 font-black", glow: "shadow-[0_0_8px_rgba(245,158,11,0.4)] border-amber-200" };
    if (rank <= 20) return { bg: "bg-orange-500 text-white font-black", glow: "shadow-[0_0_8px_rgba(249,115,22,0.4)] border-orange-300" };
    return { bg: "bg-rose-600 text-white font-black", glow: "shadow-[0_0_8px_rgba(244,63,94,0.4)] border-rose-400" };
  };

  return (
    <section id="geogrid-section" className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <GridIcon size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Local Geo-Grid Rank Heatmap
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live geographic rankings across a multi-point grid radius around your store.
            </p>
          </div>
        </div>

        {/* 3 Key Metric Badges: AGR, AMR, SoLV */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col text-center min-w-[90px]">
            <span className="text-[10px] uppercase font-bold text-slate-400">AGR</span>
            <span className="text-base font-black text-emerald-400">{geoGrid.agr}</span>
            <span className="text-[9px] text-slate-500">Avg Grid Rank</span>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col text-center min-w-[90px]">
            <span className="text-[10px] uppercase font-bold text-slate-400">AMR</span>
            <span className="text-base font-black text-indigo-400">{geoGrid.amr}</span>
            <span className="text-[9px] text-slate-500">Metric Rank</span>
          </div>

          <div className="px-3.5 py-2 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/30 flex flex-col text-center min-w-[100px]">
            <span className="text-[10px] uppercase font-bold text-emerald-400">SoLV</span>
            <span className="text-base font-black text-emerald-300">{geoGrid.solv}%</span>
            <span className="text-[9px] text-emerald-400/80">Local 3-Pack Voice</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Keyword, Radius, Grid Size */}
      <form onSubmit={handleRescan} className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-6 pb-6">
        <div className="md:col-span-6 relative">
          <SearchIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-white text-sm outline-none font-medium"
          />
        </div>

        {/* Radius selector */}
        <div className="md:col-span-3 flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
          {[1, 3, 5, 10].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRadius(r)}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                radius === r ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              {r}km
            </button>
          ))}
        </div>

        {/* Grid Size & Rescan */}
        <div className="md:col-span-3 flex items-center gap-2">
          <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setGridSize("3x3")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                gridSize === "3x3" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              3x3
            </button>
            <button
              type="button"
              onClick={() => setGridSize("5x5")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                gridSize === "5x5" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              5x5
            </button>
          </div>

          <button
            type="submit"
            disabled={isScanning}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow"
          >
            {isScanning ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <RefreshIcon size={14} />
                <span>Scan</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Main Map & Interactive Pin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Canvas Simulation */}
        <div className="lg:col-span-8 relative aspect-square max-h-[520px] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner flex items-center justify-center p-4 select-none">
          {/* Simulated Dark Vector Map Background */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            {/* Street Grid SVG */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridRoads" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#334155" strokeWidth="1.2" />
                  <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="#1E293B" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridRoads)" />
              {/* Highway lines */}
              <path d="M -100 200 C 150 180, 300 350, 600 420" fill="none" stroke="#475569" strokeWidth="3" opacity="0.6" />
              <path d="M 250 -50 C 270 200, 320 300, 350 650" fill="none" stroke="#475569" strokeWidth="3" opacity="0.6" />
              {/* Lake / Park polygon */}
              <circle cx="85%" cy="20%" r="90" fill="#0E2F44" opacity="0.5" />
              <circle cx="15%" cy="80%" r="70" fill="#064E3B" opacity="0.3" />
            </svg>
          </div>

          {/* Center Business Pin Marker */}
          <div className="absolute z-20 pointer-events-none flex flex-col items-center">
            <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-[10px] text-white font-bold shadow-lg mb-1 whitespace-nowrap">
              📍 {businessName} (Center)
            </div>
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
          </div>

          {/* Radius Circles Overlay */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-indigo-500/20 pointer-events-none" />
          <div className="absolute w-[45%] h-[45%] rounded-full border border-dashed border-indigo-500/30 pointer-events-none" />

          {/* Interactive Geo-Grid Pins */}
          <div
            className={`relative z-30 grid gap-3 sm:gap-6 w-full h-full p-4 items-center justify-center ${
              gridSize === "3x3" ? "grid-cols-3 grid-rows-3" : "grid-cols-5 grid-rows-5"
            }`}
          >
            {displayPoints.map((point) => {
              const rankInfo = getRankColor(point.rank);
              const isSelected = selectedPoint?.id === point.id;

              return (
                <div key={point.id} className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setSelectedPoint(point)}
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 flex items-center justify-center text-xs transition-all duration-200 ${
                      rankInfo.bg
                    } ${rankInfo.glow} ${
                      isSelected ? "scale-125 ring-4 ring-white z-40" : "hover:scale-110"
                    }`}
                  >
                    #{point.rank}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 z-30 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[10px] backdrop-blur-md">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-300">#1-3 (3-Pack)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-300">#4-10</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-slate-300">#11-20</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span className="text-slate-300">&gt;20</span>
            </div>
          </div>
        </div>

        {/* Selected Point Inspector Column */}
        <div className="lg:col-span-4 space-y-4">
          {selectedPoint ? (
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Node Coordinate</span>
                  <p className="text-xs font-mono text-slate-300 mt-0.5">
                    {selectedPoint.lat.toFixed(4)}, {selectedPoint.lng.toFixed(4)}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-xl text-xs font-black ${getRankColor(selectedPoint.rank).bg}`}>
                  Rank #{selectedPoint.rank}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Distance from Center:</span>
                  <span className="text-white font-bold">{selectedPoint.distanceKm} km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Target Keyword:</span>
                  <span className="text-indigo-300 font-semibold truncate max-w-[160px]">{keyword}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">In Google 3-Pack?</span>
                  <span className={selectedPoint.rank <= 3 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {selectedPoint.rank <= 3 ? "✓ Yes (High Calls)" : "✗ No (Beyond Fold)"}
                  </span>
                </div>
                {selectedPoint.competitorAbove && (
                  <div className="pt-2 border-t border-slate-800 text-[11px]">
                    <span className="text-slate-400 block mb-0.5">Primary Competitor Above:</span>
                    <span className="text-amber-300 font-semibold">{selectedPoint.competitorAbove}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
                <p>
                  {selectedPoint.rank <= 3
                    ? "Dominant rank in this grid zone. Keep collecting reviews with localized keywords to protect this spot."
                    : "Losing clicks in this quadrant. Target geo-relevance with local neighborhood citations and customer photos from this area."}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
              Click any pin on the geo-grid to inspect local ranking details and outranking rivals.
            </div>
          )}

          {/* Quick Explanation */}
          <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 text-xs text-indigo-300 space-y-1.5">
            <span className="font-bold block text-indigo-200">How Geo-Grid Tracking Works</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Google Maps serves different results every few miles. A #1 rank at your office often drops to #8 three miles away. Geo-Grid shows where your phone calls stop ringing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}