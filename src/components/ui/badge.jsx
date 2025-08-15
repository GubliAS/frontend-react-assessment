import React from "react";
import { classNames } from "../../utils/classNames"; // adjust the path if needed
// your utility for merging class names

const badgeVariantClasses = {
  default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
  secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
  outline: "text-foreground",
};

const Badge = ({ className = "", variant = "default", ...props }) => {
  const variantClasses = badgeVariantClasses[variant] || badgeVariantClasses.default;

  return (
    <div
      className={classNames(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses,
        className
      )}
      {...props}
    />
  );
};

export { Badge };
