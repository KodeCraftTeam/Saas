"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "error" | "info" | "warning";
  duration?: number;
}

interface ToastContextType {
  toast: (props: Omit<ToastProps, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "info", duration = 3000 }: Omit<ToastProps, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { id, title, description, variant, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* ── Toast Stack in bottom-right corner ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none select-none">
        {toasts.map((t) => {
          const icons = {
            success: <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />,
            error: <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />,
            info: <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />,
            warning: <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />,
          }[t.variant || "info"];

          const colors = {
            success: "bg-pure-white border-emerald-100 shadow-[rgba(4,23,43,0.05)_0px_0px_0px_1px,rgba(16,185,129,0.1)_0px_12px_24px_-4px]",
            error: "bg-pure-white border-red-100 shadow-[rgba(4,23,43,0.05)_0px_0px_0px_1px,rgba(239,68,68,0.1)_0px_12px_24px_-4px]",
            info: "bg-pure-white border-blue-100 shadow-[rgba(4,23,43,0.05)_0px_0px_0px_1px,rgba(59,130,246,0.1)_0px_12px_24px_-4px]",
            warning: "bg-pure-white border-amber-100 shadow-[rgba(4,23,43,0.05)_0px_0px_0px_1px,rgba(245,158,11,0.1)_0px_12px_24px_-4px]",
          }[t.variant || "info"];

          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-subtle bg-pure-white transition-all duration-300 animate-slide-in-right ${colors}`}
            >
              {icons}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink leading-tight">{t.title}</p>
                {t.description && (
                  <p className="mt-1 text-xs text-graphite leading-normal font-[430]">
                    {t.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="text-graphite hover:text-ink rounded-full p-0.5 hover:bg-fog transition-colors flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
