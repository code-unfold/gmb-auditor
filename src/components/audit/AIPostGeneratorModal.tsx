"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import {
  SparklesIcon,
  XIcon,
  CopyIcon,
  CheckIcon,
  TagIcon,
  PhoneIcon,
  ZapIcon,
} from "@/components/common/Icons";

interface AIPostGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  industry: string;
}

export function AIPostGeneratorModal({ isOpen, onClose, businessName, industry }: AIPostGeneratorModalProps) {
  const { showToast } = useToast();
  const [postType, setPostType] = useState<"OFFER" | "EVENT" | "UPDATE">("OFFER");
  const [tone, setTone] = useState<"Professional" | "Promotional" | "Friendly" | "Urgent">("Promotional");
  const [ctaType, setCtaType] = useState<"CALL_NOW" | "BOOK" | "LEARN_MORE" | "ORDER">("CALL_NOW");
  const [title, setTitle] = useState("Exclusive 15% Off Same-Day Service");
  const [content, setContent] = useState(
    `Need fast, dependable service in your neighborhood? Call ${businessName} today and mention this Google Business Profile post to receive 15% off installation and repairs throughout this week! Licensed, insured, and 5-star rated.`
  );
  const [couponCode, setCouponCode] = useState("SAVE15NOW");
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (postType === "OFFER") {
        setTitle(`Limited Time: 15% Off ${industry.toUpperCase()} Services`);
        setContent(
          `Looking for reputable ${industry} solutions? For a limited time, ${businessName} is offering a special 15% discount on all scheduled services. Our experienced technicians are ready to assist you today. Call or book online before slots fill up!`
        );
        setCouponCode("LOCAL15DEAL");
        setCtaType("CALL_NOW");
      } else if (postType === "EVENT") {
        setTitle(`Free Local Consultation & Inspection Day`);
        setContent(
          `Join ${businessName} this upcoming Saturday for our complimentary system audit and on-site consultation event! Bring your questions to our certified specialists and receive personalized maintenance recommendations.`
        );
        setCtaType("BOOK");
      } else {
        setTitle(`Important Update from ${businessName}`);
        setContent(
          `We have expanded our service radius to include all surrounding metro neighborhoods! As always, ${businessName} is committed to fast dispatch, transparent pricing, and 5-star customer satisfaction.`
        );
        setCtaType("LEARN_MORE");
      }
      setIsGenerating(false);
      showToast("Generated high-converting Google Post draft!", "success");
    }, 500);
  };

  const handleCopyPost = () => {
    const fullText = `${title}

${content}${postType === "OFFER" ? `
Coupon Code: ${couponCode}` : ""}
CTA: ${ctaType}`;
    navigator.clipboard?.writeText(fullText);
    showToast("Post content copied! Ready to paste into Google Business Profile Manager.", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="absolute top-0 right-1/4 w-72 h-36 bg-indigo-500/10 blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close generator"
        >
          <XIcon size={20} />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase font-bold text-indigo-400 tracking-wider mb-2">
          <SparklesIcon size={16} />
          AI Local Post Generator
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight mb-6">
          Generate Google Posts That Drive Calls
        </h3>

        <div className="flex-1 overflow-y-auto pr-1 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Post Template Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["OFFER", "EVENT", "UPDATE"] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPostType(type)}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                        postType === type
                          ? "bg-indigo-600 text-white border-indigo-500 shadow"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {type === "OFFER" ? "Offer Post" : type === "EVENT" ? "Event" : "What is New"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Brand Voice Tone
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["Promotional", "Professional", "Friendly", "Urgent"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                        tone === t
                          ? "bg-emerald-600/30 text-emerald-300 border-emerald-500/50"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Action Button (CTA)
                </label>
                <select
                  value={ctaType}
                  onChange={(e) => setCtaType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 outline-none"
                >
                  <option value="CALL_NOW">Call Now (Recommended for Mobile Calls)</option>
                  <option value="BOOK">Book Online</option>
                  <option value="LEARN_MORE">Learn More</option>
                  <option value="ORDER">Order Online</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <SparklesIcon size={14} />
                    <span>Regenerate Content with AI</span>
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                Live Google Maps Post Preview
              </span>

              <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80 mb-3">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                      {businessName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight">{businessName}</span>
                      <span className="text-[10px] text-slate-400">Google Business Profile Update</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-transparent font-bold text-sm text-white border-b border-slate-800 focus:border-indigo-500 outline-none pb-1"
                    />

                    <textarea
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full bg-transparent text-xs text-slate-300 leading-relaxed outline-none resize-none border border-slate-800/50 rounded-xl p-2.5 focus:border-indigo-500"
                    />

                    {postType === "OFFER" && (
                      <div className="p-2.5 bg-indigo-950/40 rounded-xl border border-indigo-500/30 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Coupon:</span>
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="bg-slate-900 px-2 py-0.5 rounded text-emerald-300 font-mono font-bold text-xs outline-none text-right"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Google Maps Click-to-Call</span>
                  <div className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider">
                    {ctaType.replace("_", " ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCopyPost}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all"
          >
            <CopyIcon size={14} />
            <span>Copy Post &amp; Publish</span>
          </button>
        </div>
      </div>
    </div>
  );
}