"use client";

import React, { useState } from "react";
import { SAMPLE_LOCKSMITH, SAMPLE_DENTAL, SAMPLE_RESTAURANT, SAMPLE_HVAC } from "@/lib/mockData";
import { ReviewAnalysisSection } from "@/components/audit/ReviewAnalysisSection";
import { useToast } from "@/context/ToastContext";
import {
  MessageSquareIcon,
  SparklesIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  DownloadIcon,
  StarIcon,
} from "@/components/common/Icons";

export default function ReviewsPage() {
  const { showToast } = useToast();
  const [selectedProfile, setSelectedProfile] = useState(SAMPLE_LOCKSMITH);

  const handleProfileChange = (key: string) => {
    if (key === "dental") setSelectedProfile(SAMPLE_DENTAL);
    else if (key === "restaurant") setSelectedProfile(SAMPLE_RESTAURANT);
    else if (key === "hvac") setSelectedProfile(SAMPLE_HVAC);
    else setSelectedProfile(SAMPLE_LOCKSMITH);
    showToast("Switched reviews audit profile to " + key, "info");
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold mb-2">
              <MessageSquareIcon size={14} />
              <span>Review Intelligence &amp; AI Responder</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Customer Sentiment &amp; AI Replies
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Extract semantic positive and negative customer topics, monitor response rates, and reply with AI.
            </p>
          </div>
        </div>

        {/* Business Selector */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Selected Profile:
          </span>

          <div className="flex flex-wrap gap-2">
            {[
              { key: "locksmith", label: "Apex Locksmith (342 Reviews)" },
              { key: "dental", label: "BrightSmile Dental (512 Reviews)" },
              { key: "restaurant", label: "Bella Vista Trattoria (894 Reviews)" },
              { key: "hvac", label: "Elite Climate HVAC (430 Reviews)" },
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

        {/* Main Review Section Component */}
        <ReviewAnalysisSection
          reviewsData={selectedProfile.reviewsData}
          businessName={selectedProfile.name}
        />

        {/* SEO Best Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Google Ranking Impact
            </span>
            <h3 className="text-lg font-bold text-white">Review Velocity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Profiles receiving at least 3-5 verified customer reviews per week rank 64% higher on average than dormant competitors.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Conversion Trust
            </span>
            <h3 className="text-lg font-bold text-white">Response Rate Target: &gt;90%</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Google actively factors owner response rate into their local algorithmic trust matrix. Unreplied reviews signal an unmonitored listing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Geo-Keywords In Content
            </span>
            <h3 className="text-lg font-bold text-white">Review Keyword Justifications</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When customers mention specific services (e.g. &ldquo;emergency key duplicate&rdquo;), Google bolds these keywords in search results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}