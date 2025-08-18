import React, { forwardRef } from "react";
import { classNames } from "../../utils/classNames"; // adjust the path if needed

const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={classNames(
      "bg-white shadow-lg hover:shadow-xl transition-all rounded-lg  text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={classNames("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, style, ...props }, ref) => {
  const responsiveStyle = {
    fontSize: "clamp(1rem, 1.6vw + 0.5rem, 1.75rem)",
    ...style,
  };
  return (
    <h3
      ref={ref}
      style={responsiveStyle}
      className={classNames(
        "font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef(({ className, style, ...props }, ref) => {
  const responsiveStyle = {
    fontSize: "clamp(0.875rem, 0.8vw + 0.3rem, 1rem)",
    ...style,
  };
  return (
    <p
      ref={ref}
      style={responsiveStyle}
      className={classNames("text-muted-foreground", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef(({ className, style, ...props }, ref) => {
  const responsiveStyle = {
    fontSize: "clamp(0.95rem, 0.9vw + 0.2rem, 1rem)",
    ...style,
  };
  return (
    <div
      ref={ref}
      style={responsiveStyle}
      className={classNames("p-6", className)}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={classNames("flex items-center p-6", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
