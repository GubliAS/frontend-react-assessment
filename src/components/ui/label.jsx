import React, { forwardRef } from "react";

const Label = forwardRef(({ className = "", ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    />
  );
});

Label.displayName = "Label";

export { Label };
