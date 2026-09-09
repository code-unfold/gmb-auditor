"use client";

import React, { useState } from "react";
import { DownloadIcon, CheckIcon, SparklesIcon } from "@/components/common/Icons";
import { useToast } from "@/context/ToastContext";

interface PDFExportButtonProps {
  businessName: string;
}

export function PDFExportButton({ businessName }: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { showToast } = useToast();

  const handlePrint = () => {
    setIsExporting(true);
    showToast("Preparing printable audit report for " + businessName + "...", "info");

    setTimeout(() => {
      setIsExporting(false);
      if (typeof window !== "undefined") {
        window.print();
      }
    }, 600);
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      disabled={isExporting}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95"
      title="Download or print whitelabel audit report"
    >
      {isExporting ? (
        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <DownloadIcon size={16} className="text-indigo-400" />
      )}
      <span>Export PDF Report</span>
    </button>
  );
}