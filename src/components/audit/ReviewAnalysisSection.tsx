"use client";

import React, { useState } from "react";
import { ReviewsAuditData, ReviewItem } from "@/types";
import { useToast } from "@/context/ToastContext";
import {
  MessageSquareIcon,
  StarIcon,
  SparklesIcon,
  CheckIcon,
  CopyIcon,
  SearchIcon,
  AlertCircleIcon,
  XIcon,
} from "@/components/common/Icons";

interface ReviewAnalysisSectionProps {
  reviewsData: ReviewsAuditData;
  businessName: string;
}

export function ReviewAnalysisSection({ reviewsData, businessName }: ReviewAnalysisSectionProps) {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [starFilter, setStarFilter] = useState<number | "ALL">("ALL");
  const [sentimentFilter, setSentimentFilter] = useState<"ALL" | "positive" | "neutral" | "negative">("ALL");
  const [selectedReviewForReply, setSelectedReviewForReply] = useState<ReviewItem | null>(null);
  const [generatedReply, setGeneratedReply] = useState("");
  const [replyTone, setReplyTone] = useState<"Professional" | "Empathetic" | "Promotional">("Professional");
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredReviews = reviewsData.reviews.filter((r) => {
    if (starFilter !== "ALL" && r.rating !== starFilter) return false;
    if (sentimentFilter !== "ALL" && r.sentiment !== sentimentFilter) return false;
    if (searchTerm.trim() && !r.content.toLowerCase().includes(searchTerm.toLowerCase()) && !r.authorName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleOpenReplyModal = (review: ReviewItem) => {
    setSelectedReviewForReply(review);
    generateReply(review, replyTone);
  };

  const generateReply = (review: ReviewItem, tone: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      let reply = "";
      if (review.rating >= 4) {
        if (tone === "Professional") {
          reply = `Thank you so much for the 5-star review, ${review.authorName}! At ${businessName}, we take great pride in delivering top-quality service. We appreciate your recommendation and look forward to assisting you again in the future.`;
        } else if (tone === "Empathetic") {
          reply = `Hi ${review.authorName}, reading your kind words truly made our day! We know situations like this can be stressful, and our entire team is thrilled we could help you out so seamlessly. Thank you for choosing us!`;
        } else {
          reply = `Thanks for the wonderful review, ${review.authorName}! We love keeping our local community happy. Be sure to mention this review on your next appointment for our VIP return client discount!`;
        }
      } else {
        reply = `Hello ${review.authorName}, thank you for your candid feedback. We are committed to the highest service standards at ${businessName} and sincerely apologize for falling short during your recent experience. Please reach out to our management directly so we can make things right immediately.`;
      }
      setGeneratedReply(reply);
      setIsGenerating(false);
    }, 450);
  };

  const handleCopyReply = () => {
    navigator.clipboard?.writeText(generatedReply);
    showToast("AI Reply copied to clipboard! Paste directly into Google Business Profile.", "success");
    setSelectedReviewForReply(null);
  };

  return (
    <section id="reviews-section" className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <MessageSquareIcon size={22} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Review Sentiment &amp; AI Reply Assistant
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Analyze emotional customer feedback and automate professional owner responses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            Response Rate: <strong className="text-emerald-400 font-bold">{reviewsData.responseRate}%</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            Avg Speed: <strong className="text-indigo-400 font-bold">{reviewsData.averageResponseTimeHours} hrs</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-3">
              Star Distribution
            </span>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl font-black text-white">{reviewsData.averageRating}</span>
              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={15} />
                  ))}
                </div>
                <span className="text-xs text-slate-400">{reviewsData.totalReviews} Total Reviews</span>
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviewsData.starDistribution[stars as keyof typeof reviewsData.starDistribution];
                const pct = Math.round((count / reviewsData.totalReviews) * 100) || 0;
                return (
                  <div key={stars} className="flex items-center gap-2 text-xs">
                    <span className="w-6 text-slate-400 font-medium">{stars} ★</span>
                    <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-400 font-mono text-[11px]">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-3">
              Sentiment Distribution
            </span>

            <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex my-4">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${reviewsData.sentimentSplit.positive}%` }}
                title={`Positive: ${reviewsData.sentimentSplit.positive}%`}
              />
              <div
                className="h-full bg-amber-400 transition-all duration-500"
                style={{ width: `${reviewsData.sentimentSplit.neutral}%` }}
                title={`Neutral: ${reviewsData.sentimentSplit.neutral}%`}
              />
              <div
                className="h-full bg-rose-500 transition-all duration-500"
                style={{ width: `${reviewsData.sentimentSplit.negative}%` }}
                title={`Negative: ${reviewsData.sentimentSplit.negative}%`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/20">
                <span className="block text-[11px] text-emerald-300 font-medium">Positive</span>
                <span className="text-base font-black text-emerald-400">
                  {reviewsData.sentimentSplit.positive}%
                </span>
              </div>
              <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/20">
                <span className="block text-[11px] text-amber-300 font-medium">Neutral</span>
                <span className="text-base font-black text-amber-400">
                  {reviewsData.sentimentSplit.neutral}%
                </span>
              </div>
              <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-500/20">
                <span className="block text-[11px] text-rose-300 font-medium">Negative</span>
                <span className="text-base font-black text-rose-400">
                  {reviewsData.sentimentSplit.negative}%
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4 leading-snug">
            Sentiment extracted through NLP entity recognition on all recent reviewer phrases.
          </p>
        </div>

        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-3">
              Frequent Review Keywords
            </span>

            <div className="flex flex-wrap gap-1.5">
              {reviewsData.topKeywords.map((kw) => {
                const isPos = kw.sentiment === "positive";
                const isNeg = kw.sentiment === "negative";
                return (
                  <span
                    key={kw.keyword}
                    className={`px-2.5 py-1 rounded-xl text-xs font-medium border flex items-center gap-1.5 ${
                      isPos
                        ? "bg-emerald-950/30 border-emerald-500/30 text-emerald-300"
                        : isNeg
                        ? "bg-rose-950/30 border-rose-500/30 text-rose-300"
                        : "bg-slate-900 border-slate-700 text-slate-300"
                    }`}
                  >
                    <span>{kw.keyword}</span>
                    <span className="text-[10px] opacity-75 font-mono">({kw.count})</span>
                  </span>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mt-4">
            Keywords mentioned in reviews directly improve ranking for those search terms in Google Maps.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h4 className="text-sm uppercase font-bold tracking-wider text-slate-300">
            Recent Review Feed ({filteredReviews.length})
          </h4>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <SearchIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter text..."
                className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white outline-none w-36 focus:w-48 transition-all"
              />
            </div>

            <select
              value={starFilter}
              onChange={(e) => setStarFilter(e.target.value === "ALL" ? "ALL" : Number(e.target.value))}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 outline-none"
            >
              <option value="ALL">All Stars</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>

            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 outline-none"
            >
              <option value="ALL">All Sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-slate-950/40 rounded-2xl border border-slate-800">
              No reviews match the selected filter criteria.
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-200">
                      {rev.authorName.charAt(0)}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block leading-tight">{rev.authorName}</span>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <StarIcon key={i} size={14} />
                      ))}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        rev.sentiment === "positive"
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : rev.sentiment === "negative"
                          ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >
                      {rev.sentiment}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed my-3">{rev.content}</p>

                {rev.hasOwnerReply && rev.ownerReply ? (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-indigo-400 flex items-center gap-1">
                      <CheckIcon size={12} className="text-emerald-400" />
                      Owner Response:
                    </span>
                    <p className="text-slate-400 leading-relaxed">{rev.ownerReply}</p>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span className="text-xs text-amber-400 flex items-center gap-1">
                      <AlertCircleIcon size={14} />
                      Awaiting owner reply
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenReplyModal(rev)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition-all"
                    >
                      <SparklesIcon size={13} />
                      <span>Generate AI Reply</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {selectedReviewForReply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedReviewForReply(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <XIcon size={18} />
            </button>

            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <SparklesIcon size={15} />
              AI Review Responder
            </div>

            <h3 className="text-lg font-bold text-white">
              Replying to {selectedReviewForReply.authorName} ({selectedReviewForReply.rating} ★)
            </h3>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 italic">
              &ldquo;{selectedReviewForReply.content}&rdquo;
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Reply Tone</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Professional", "Empathetic", "Promotional"] as const).map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => {
                      setReplyTone(tone);
                      generateReply(selectedReviewForReply, tone);
                    }}
                    className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      replyTone === tone
                        ? "bg-indigo-600 text-white shadow"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Generated Owner Response</label>
                <button
                  type="button"
                  onClick={() => generateReply(selectedReviewForReply, replyTone)}
                  className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                >
                  Regenerate
                </button>
              </div>
              <textarea
                rows={4}
                value={generatedReply}
                onChange={(e) => setGeneratedReply(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white outline-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedReviewForReply(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCopyReply}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all"
              >
                <CopyIcon size={14} />
                <span>Copy &amp; Approve Reply</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}