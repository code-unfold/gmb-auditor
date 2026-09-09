"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BusinessProfile } from "@/types";
import { getSampleAudit, generateAuditFromQuery, SAMPLE_LOCKSMITH } from "@/lib/mockData";
import { AuditHero } from "@/components/audit/AuditHero";
import { AuditScoreCard } from "@/components/audit/AuditScoreCard";
import { CategoriesSection } from "@/components/audit/CategoriesSection";
import { GeoGridMap } from "@/components/audit/GeoGridMap";
import { ReviewAnalysisSection } from "@/components/audit/ReviewAnalysisSection";
import { CompetitorComparisonTable } from "@/components/audit/CompetitorComparisonTable";
import { ActionChecklist } from "@/components/audit/ActionChecklist";
import { AIPostGeneratorModal } from "@/components/audit/AIPostGeneratorModal";
import { PDFExportButton } from "@/components/audit/PDFExportButton";
import { useToast } from "@/context/ToastContext";
import {
  SparklesIcon,
  CopyIcon,
} from "@/components/common/Icons";

function AuditDashboardContent() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [business, setBusiness] = useState<BusinessProfile>(SAMPLE_LOCKSMITH);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sampleParam = searchParams.get("sample");
    const queryParam = searchParams.get("q");

    setIsLoading(true);
    const timer = setTimeout(() => {
      if (sampleParam) {
        setBusiness(getSampleAudit(sampleParam));
      } else if (queryParam) {
        setBusiness(generateAuditFromQuery(queryParam));
      } else {
        setBusiness(SAMPLE_LOCKSMITH);
      }
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const handleSearch = (newQuery: string, type: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (type === "sample") {
        setBusiness(getSampleAudit(newQuery));
      } else {
        setBusiness(generateAuditFromQuery(newQuery));
      }
      setIsLoading(false);
      showToast("Completed GBP audit for " + newQuery + "!", "success");
    }, 400);
  };

  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Audit report link copied to clipboard!", "success");
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 pb-20">
      {/* Top Search & Actions Bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="w-full md:w-auto md:flex-1 max-w-xl">
            <AuditHero isCompact onSearch={handleSearch} defaultQuery={business.name} />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => setIsPostModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md transition-all shrink-0"
            >
              <SparklesIcon size={15} />
              <span>Generate Google Post</span>
            </button>

            <button
              type="button"
              onClick={handleShareLink}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all border border-slate-700 shrink-0"
              title="Copy shareable audit URL"
            >
              <CopyIcon size={15} />
              <span className="hidden sm:inline">Share</span>
            </button>

            <PDFExportButton businessName={business.name} />
          </div>
        </div>

        {/* Quick Jump Anchor Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2 text-xs font-semibold text-slate-400 no-scrollbar border-t border-slate-800/60">
          <a href="#overview" className="px-3 py-1 rounded-lg bg-slate-800 text-white hover:text-indigo-300 transition-colors whitespace-nowrap">
            Overview &amp; Score
          </a>
          <a href="#categories-section" className="px-3 py-1 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap">
            Categories Matrix
          </a>
          <a href="#geogrid-section" className="px-3 py-1 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap">
            Geo-Grid Heatmap
          </a>
          <a href="#reviews-section" className="px-3 py-1 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap">
            Review Sentiment
          </a>
          <a href="#competitors-section" className="px-3 py-1 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap">
            Competitor Benchmarks
          </a>
          <a href="#action-plan" className="px-3 py-1 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap">
            Action Checklist
          </a>
        </div>
      </div>

      {/* Main Audit Sections Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {isLoading ? (
          <div className="p-20 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-400">Loading Google Business Profile intelligence...</p>
          </div>
        ) : (
          <>
            {/* 1. Score Card */}
            <div id="overview">
              <AuditScoreCard business={business} onRefreshScan={() => handleSearch(business.name, "refresh")} />
            </div>

            {/* 2. Categories & Competitor Matrix */}
            <CategoriesSection business={business} />

            {/* 3. Geo-Grid Rank Heatmap */}
            <GeoGridMap geoGrid={business.geoGrid} businessName={business.name} />

            {/* 4. Review Sentiment & AI Reply */}
            <ReviewAnalysisSection reviewsData={business.reviewsData} businessName={business.name} />

            {/* 5. Competitor Comparison Table */}
            <CompetitorComparisonTable competitors={business.competitors} businessName={business.name} />

            {/* 6. Action Checklist */}
            <ActionChecklist initialItems={business.actionChecklist} businessName={business.name} />
          </>
        )}
      </div>

      {/* Google Post AI Modal */}
      <AIPostGeneratorModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        businessName={business.name}
        industry={business.industry}
      />
    </div>
  );
}

export default function AuditPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-400">Initializing GBP Audit Engine...</p>
        </div>
      </div>
    }>
      <AuditDashboardContent />
    </Suspense>
  );
}