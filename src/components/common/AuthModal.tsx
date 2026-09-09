"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { XIcon, ShieldCheckIcon, SparklesIcon, CheckIcon } from "@/components/common/Icons";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalMode, login } = useAuth();
  const { showToast } = useToast();
  const [isSignUp, setIsSignUp] = useState(authModalMode === "signup");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(email, name || "Local SEO Specialist");
      showToast(isSignUp ? "Welcome to GBP Auditor! Your trial is active." : "Successfully signed in.", "success");
      setLoading(false);
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      login("alex.morgan@agencypro.com", "Alex Morgan (Agency Pro)");
      showToast("Signed in with Agency Pro Demo account.", "success");
      setLoading(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/70 rounded-2xl p-7 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-500/10 blur-3xl pointer-events-none" />

        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <XIcon size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
            <SparklesIcon size={13} />
            GMB Everywhere Equivalent &amp; Beyond
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isSignUp ? "Start Free GBP Auditor Trial" : "Sign in to GBP Auditor"}
          </h2>
          <p className="text-sm text-slate-400 mt-1.5">
            {isSignUp
              ? "Full access to Geo-Grid, Category Spy & AI Audit reports."
              : "Access your saved local SEO audits and live rank trackers."}
          </p>
        </div>

        <div className="grid grid-cols-2 p-1 bg-slate-800/80 rounded-xl mb-6 border border-slate-700/50 text-sm font-medium">
          <button
            type="button"
            onClick={() => setIsSignUp(false)}
            className={`py-2 rounded-lg transition-all ${
              !isSignUp ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
            className={`py-2 rounded-lg transition-all ${
              isSignUp ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Start Free
          </button>
        </div>

        <div className="mb-5">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-indigo-500/15 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 hover:text-emerald-200 text-sm font-semibold transition-all hover:shadow-glow-emerald"
          >
            <ShieldCheckIcon size={18} className="text-emerald-400" />
            <span>1-Click Instant Demo Login (Agency Pro)</span>
          </button>
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/60" />
            </div>
            <span className="relative px-3 bg-slate-900 text-xs text-slate-500 uppercase font-medium">
              or enter credentials
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 focus:border-indigo-500 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Work Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seo@agency.com"
              className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 focus:border-indigo-500 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 focus:border-indigo-500 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isSignUp ? (
              <>
                <span>Create Free Account</span>
                <CheckIcon size={16} />
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {isSignUp && (
          <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5">
              <CheckIcon size={14} className="text-emerald-400" />
              <span>Includes 14 free geo-grid scans &amp; competitor reports</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckIcon size={14} className="text-emerald-400" />
              <span>No credit card required • Instant access</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}