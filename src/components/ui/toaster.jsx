"use client";

import React from "react";
import { useToast } from "../../hooks/use-toast";

export function Toaster() {
  const { toasts = [], dismiss } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
      {toasts
        .filter((t) => t.open !== false) // don't render closed toasts
        .map((t) => (
          <div
            key={t.id}
            className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg border border-gray-700 w-80 animate-slideIn"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                {t.title && <h3 className="font-semibold">{t.title}</h3>}
                {t.description && <p className="text-sm text-gray-300">{t.description}</p>}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (typeof dismiss === 'function') return dismiss(t.id);
                  if (typeof t.dismiss === 'function') return t.dismiss(t.id);
                  if (typeof t.onClose === 'function') return t.onClose(t.id);
                  console.warn('Toast dismiss function not found', t);
                }}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✖
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
