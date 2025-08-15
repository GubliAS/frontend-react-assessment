import React from "react";
import clsx from "clsx";

export function LoadingSpinner({ size = "md", className }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={clsx("relative", sizeClasses[size], className)}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[rgb(151,177,150)]/20"></div>

      {/* Main spinning ring */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[rgb(151,177,150)] animate-spin"></div>

      {/* Secondary inner spinning ring */}
      <div className="absolute inset-1 rounded-full border border-transparent border-t-emerald-400 animate-spin [animation-delay:150ms]"></div>
    </div>
  );
}


export function PulsingDots({ className }) {
  return (
    <div className={clsx("flex items-center space-x-1", className)}>
      <div className="w-2 h-2 bg-[rgb(151,177,150)] rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-[rgb(151,177,150)] rounded-full animate-pulse [animation-delay:150ms]"></div>
      <div className="w-2 h-2 bg-[rgb(151,177,150)] rounded-full animate-pulse [animation-delay:300ms]"></div>
    </div>
  );
}