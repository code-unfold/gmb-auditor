"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ToastMessage } from "@/types";
import { CheckCircleIcon, AlertCircleIcon, XIcon } from "@/components/common/Icons";

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    const id = "toast_" + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
        {toasts.map((t) => {
          let bgClass = "bg-slate-900/90 border-slate-700/50 text-slate-100";
          if (t.type === "success") bgClass = "bg-emerald-950/90 border-emerald-500/30 text-emerald-100";
          else if (t.type === "error") bgClass = "bg-rose-950/90 border-rose-500/30 text-rose-100";
          else if (t.type === "warning") bgClass = "bg-amber-950/90 border-amber-500/30 text-amber-100";

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-200 ${bgClass}`}
            >
              {t.type === "success" ? (
                <CheckCircleIcon size={20} className="text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircleIcon size={20} className="text-rose-400 shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium leading-snug flex-1">{t.message}</p>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-white p-0.5 transition-colors"
                aria-label="Close alert"
              >
                <XIcon size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}