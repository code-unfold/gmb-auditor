"use client";

import React from "react";
import { BusinessProfile } from "@/types";
import {
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  GlobeIcon,
  StarIcon,
  CameraIcon,
  TagIcon,
  FileTextIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ExternalLinkIcon,
  TrendingUpIcon,
} from "@/components/common/Icons";

interface AuditScoreCardProps {
  business: BusinessProfile;
  onRefreshScan?: () => void;
}

export function AuditScoreCard({ business, onRefreshScan }: AuditScoreCardProps) {
  const { healthScore, grade, metrics } = business;

  // SVG Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  let scoreColor = "text-emerald-400";
  let strokeColor = "#10B981";
  let gradeBg = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";

  if (healthScore < 70) {
    scoreColor = "text-rose-400";
    strokeColor = "#F43F5E";
    gradeBg = "bg-rose-500/20 text-rose-300 border-rose-500/40";
  } else if (healthScore < 85) {
    scoreColor = "text-amber-400";
    strokeColor = "#F59E0B";
    gradeBg = "bg-amber-500/20 text-amber-300 border-amber-500/40";
  }

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Top Bar: Business Identity & Claimed Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {business.name}
            </h2>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <ShieldCheckIcon size={14} className="text-emerald-400" />
              {business.claimedStatus}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPinIcon size={14} className="text-slate-400" />
              {business.address}, {business.city}, {business.state} {business.postalCode}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <PhoneIcon size={14} className="text-slate-400" />
              {business.phone}
            </span>
            <span>•</span>
            <a
              href={business.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 underline"
            >
              <GlobeIcon size={14} />
              Visit Website
            </a>
            <span>•</span>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-400 hover:text-white"
            >
              <ExternalLinkIcon size={13} />
              View on Maps
            </a>
          </div>
        </div>

        {/* Place ID pill */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
            Place ID: <span className="text-slate-300 font-semibold">{business.placeId.substring(0, 16)}...</span>
          </span>
        </div>
      </div>

      {/* Center Section: Radial Health Gauge & 5 Key Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 relative z-10 items-center">
        {/* Radial Health Gauge Column */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-center">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">
            GBP Health Score
          </span>

          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Background track circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="#1E293B"
                strokeWidth="12"
              />
              {/* Animated Progress Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke={strokeColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Score & Grade center label */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-4xl sm:text-5xl font-black ${scoreColor} tracking-tight leading-none`}>
                {healthScore}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1">/ 100</span>
              <span className={`mt-2 px-2.5 py-0.5 rounded-full border text-xs font-extrabold ${gradeBg}`}>
                Grade {grade}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-[240px]">
            {healthScore >= 90
              ? "Exceptional profile setup. Leading 85% of local competitors."
              : healthScore >= 80
              ? "Good foundation with high-ROI optimization opportunities."
              : "Sub-optimal listing. High risk of losing calls to local rivals."}
          </p>
        </div>

        {/* 5 Core Pillars Grid Column */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {/* Card 1: NAP Consistency */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">NAP Consistency</span>
                <span className="text-xs font-bold text-emerald-400">{metrics.napConsistency.score}%</span>
              </div>
              <p className="text-sm font-bold text-white mb-1.5">{metrics.napConsistency.status}</p>
              <p className="text-xs text-slate-400 leading-snug line-clamp-3">
                {metrics.napConsistency.details}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-400">
              <CheckCircleIcon size={14} className="text-emerald-400 shrink-0" />
              <span>Citations Verified</span>
            </div>
          </div>

          {/* Card 2: Categories Setup */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Categories</span>
                <span className="text-xs font-bold text-indigo-400">{metrics.categoriesHealth.score}%</span>
              </div>
              <p className="text-sm font-bold text-white mb-1.5">{business.primaryCategory}</p>
              <p className="text-xs text-slate-400 leading-snug line-clamp-3">
                {metrics.categoriesHealth.details}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Secondaries</span>
              <span className="font-semibold text-indigo-300">
                {business.secondaryCategories.filter((s) => s.isCurrentlyUsed).length} Active
              </span>
            </div>
          </div>

          {/* Card 3: Reviews & Rating */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Reviews &amp; Trust</span>
                <span className="text-xs font-bold text-emerald-400">{metrics.reviewsHealth.score}%</span>
              </div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-sm font-bold text-white">{business.rating}</span>
                <div className="flex text-amber-400">
                  <StarIcon size={13} />
                </div>
                <span className="text-xs text-slate-400">({business.totalReviews})</span>
              </div>
              <p className="text-xs text-slate-400 leading-snug line-clamp-3">
                {metrics.reviewsHealth.details}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Reply Rate</span>
              <span className="font-semibold text-emerald-400">{business.reviewsData.responseRate}%</span>
            </div>
          </div>

          {/* Card 4: Photos Freshness */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">Photo Inventory</span>
                <span className="text-xs font-bold text-indigo-400">{metrics.photosHealth.score}%</span>
              </div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-sm font-bold text-white">{metrics.photosHealth.count} Photos</span>
                <span className="text-[11px] text-slate-400">vs {metrics.photosHealth.competitorAvg} avg</span>
              </div>
              <p className="text-xs text-slate-400 leading-snug line-clamp-3">
                {metrics.photosHealth.details}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Last Upload</span>
              <span className="font-semibold text-slate-300">{metrics.photosHealth.freshnessDays}d ago</span>
            </div>
          </div>

          {/* Card 5: Google Posts Activity */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-400">GBP Posts Velocity</span>
                <span className="text-xs font-bold text-emerald-400">{metrics.postsHealth.score}%</span>
              </div>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-sm font-bold text-white">{metrics.postsHealth.frequencyPerMonth}/mo</span>
                <span className="text-[11px] text-slate-400">{metrics.postsHealth.status}</span>
              </div>
              <p className="text-xs text-slate-400 leading-snug line-clamp-3">
                {metrics.postsHealth.details}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Last Post</span>
              <span className="font-semibold text-slate-300">{metrics.postsHealth.lastPostDaysAgo}d ago</span>
            </div>
          </div>

          {/* Quick Win Action Pill */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-slate-900/90 border border-indigo-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 mb-1">
                <TrendingUpIcon size={14} />
                <span>Top Growth Action</span>
              </div>
              <p className="text-xs font-semibold text-white leading-tight">
                {business.actionChecklist[0]?.title || "Add secondary categories"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                {business.actionChecklist[0]?.expectedImpact || "+18% local visibility"}
              </p>
            </div>
            <a
              href="#action-plan"
              className="mt-3 pt-2 border-t border-indigo-500/20 text-xs text-indigo-300 hover:text-white font-semibold flex items-center justify-between group"
            >
              <span>View Checklist</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}