"use client";

import React, { useState } from "react";
import { ActionItem } from "@/types";
import { useToast } from "@/context/ToastContext";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  AlertCircleIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DownloadIcon,
  ZapIcon,
} from "@/components/common/Icons";

interface ActionChecklistProps {
  initialItems: ActionItem[];
  businessName: string;
}

export function ActionChecklist({ initialItems, businessName }: ActionChecklistProps) {
  const { showToast } = useToast();
  const [items, setItems] = useState<ActionItem[]>(initialItems);
  const [priorityFilter, setPriorityFilter] = useState<"ALL" | "Critical" | "High" | "Medium" | "Low">("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "COMPLETED">("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(initialItems[0]?.id || null);

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100) || 0;

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          const next = !it.completed;
          showToast(
            next ? `Marked "${it.title}" as completed!` : `Unmarked "${it.title}".`,
            next ? "success" : "info"
          );
          return { ...it, completed: next };
        }
        return it;
      })
    );
  };

  const filteredItems = items.filter((item) => {
    if (priorityFilter !== "ALL" && item.priority !== priorityFilter) return false;
    if (statusFilter === "PENDING" && item.completed) return false;
    if (statusFilter === "COMPLETED" && !item.completed) return false;
    return true;
  });

  const getPriorityColor = (pri: ActionItem["priority"]) => {
    switch (pri) {
      case "Critical":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      case "High":
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
      case "Medium":
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/40";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  const getEffortColor = (eff: ActionItem["effort"]) => {
    switch (eff) {
      case "Quick Win":
        return "text-emerald-400 bg-emerald-950/40 border-emerald-500/30";
      case "Moderate":
        return "text-indigo-400 bg-indigo-950/40 border-indigo-500/30";
      default:
        return "text-amber-400 bg-amber-950/40 border-amber-500/30";
    }
  };

  return (
    <section id="action-plan" className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <ZapIcon size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Actionable Fix Plan for {businessName}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Prioritized checklist to outrank local competitors in Google 3-Pack.
            </p>
          </div>
        </div>

        {/* Overall Completion Progress */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium">Completed: </span>
            <span className="text-sm font-bold text-white">
              {completedCount} / {items.length}
            </span>
          </div>
          <div className="w-24 sm:w-36 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-black text-emerald-400 w-8">{progressPercent}%</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-6 pb-4">
        {/* Priority Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-500 text-[11px] uppercase mr-1">Priority:</span>
          {(["ALL", "Critical", "High", "Medium", "Low"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                priorityFilter === p
                  ? "bg-indigo-600 text-white border-indigo-500 shadow"
                  : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs font-semibold">
          {(["ALL", "PENDING", "COMPLETED"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg transition-all ${
                statusFilter === st ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {st === "ALL" ? "All Status" : st === "PENDING" ? "To Do" : "Done"}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3 mt-2">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/40 rounded-2xl border border-slate-800">
            No action items match the selected priority and status filters.
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  item.completed
                    ? "bg-slate-950/50 border-slate-800/60 opacity-85"
                    : isExpanded
                    ? "bg-slate-950/90 border-indigo-500/40 shadow-lg"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Header Row */}
                <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3.5 flex-1">
                    {/* Checkbox */}
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 mt-0.5 sm:mt-0 ${
                        item.completed
                          ? "bg-emerald-500 border-emerald-500 text-slate-950 shadow-md"
                          : "border-slate-600 hover:border-indigo-400 bg-slate-900"
                      }`}
                      aria-label="Toggle task completion"
                    >
                      {item.completed && <CheckIcon size={16} />}
                    </button>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getEffortColor(item.effort)}`}>
                          {item.effort}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-medium">
                          {item.category}
                        </span>
                      </div>

                      <h4
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          item.completed ? "line-through text-slate-400" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  {/* Expand toggle */}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-1 text-slate-400 hover:text-white transition-transform shrink-0"
                    aria-label="Toggle guidance"
                  >
                    {isExpanded ? <ChevronDownIcon size={20} /> : <ChevronRightIcon size={20} />}
                  </button>
                </div>

                {/* Expanded Fix Guidance */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 bg-slate-900/40 text-xs text-slate-300 space-y-3">
                    <p className="leading-relaxed text-slate-300">{item.description}</p>

                    <div>
                      <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] block mb-1.5">
                        Step-by-Step Fix Protocol:
                      </span>
                      <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                        {item.howToFix.map((step, idx) => (
                          <li key={idx} className="leading-relaxed">
                            <span className="text-slate-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SparklesIcon size={14} className="text-emerald-400 shrink-0" />
                        <span><strong>Expected Impact:</strong> {item.expectedImpact}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}