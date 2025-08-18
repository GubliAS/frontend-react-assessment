"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X, WifiOff, AlertTriangle, CheckCircle2 } from "lucide-react";

// Utility function for class merging
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ==========================
// Error Message Component
// ==========================
export function ErrorMessage({ message, type = "error", className, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true);

  const typeStyles = {
    error: {
      bg: "bg-red-500/10 border-red-500/30",
      text: "text-red-300",
      icon: AlertCircle,
      iconColor: "text-red-400",
    },
    warning: {
      bg: "bg-amber-500/10 border-amber-500/30",
      text: "text-amber-300",
      icon: AlertTriangle,
      iconColor: "text-amber-400",
    },
    success: {
      bg: "bg-[rgb(151,177,150)]/10 border-[rgb(151,177,150)]/30",
      text: "text-[rgb(151,177,150)]",
      icon: CheckCircle2,
      iconColor: "text-[rgb(151,177,150)]",
    },
  };

  const style = typeStyles[type];
  const Icon = style.icon;

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border backdrop-blur-sm animate-slide-in-shake",
        style.bg,
        className
      )}
    >
      <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", style.iconColor)} />
      <p className={cn("text-sm font-medium flex-1", style.text)}>{message}</p>
      {onDismiss && (
        <button
          onClick={() => {
            setIsVisible(false);
            onDismiss();
          }}
          className={cn("flex-shrink-0 hover:opacity-70 transition-opacity", style.iconColor)}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ==========================
// Field Error Component
// ==========================
export function FieldError({ message, isVisible = true, className }) {
  if (!message || !isVisible) return null;

  return (
    <div className={cn("flex items-center gap-2 mt-1 animate-slide-down", className)}>
      <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
      <p className="text-xs text-red-300 font-medium">{message}</p>
    </div>
  );
}

// ==========================
// Toast Notification
// ==========================
export function Toast({ message, type = "error", isVisible, onClose, duration = 5000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeStyles = {
    error: {
      bg: "bg-gradient-to-r from-red-500/90 to-red-600/90",
      border: "border-red-400/50",
      icon: AlertCircle,
      iconColor: "text-red-100",
    },
    warning: {
      bg: "bg-gradient-to-r from-amber-500/90 to-amber-600/90",
      border: "border-amber-400/50",
      icon: AlertTriangle,
      iconColor: "text-amber-100",
    },
    success: {
      bg: "bg-gradient-to-r from-[rgb(151,177,150)]/90 to-emerald-500/90",
      border: "border-[rgb(151,177,150)]/50",
      icon: CheckCircle2,
      iconColor: "text-white",
    },
    info: {
      bg: "bg-gradient-to-r from-blue-500/90 to-blue-600/90",
      border: "border-blue-400/50",
      icon: AlertCircle,
      iconColor: "text-blue-100",
    },
  };

  const style = typeStyles[type];
  const Icon = style.icon;

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-toast-in">
      <div
        className={cn(
          "flex items-center gap-3 p-4 rounded-lg border backdrop-blur-md shadow-xl max-w-md",
          style.bg,
          style.border
        )}
      >
        <Icon className={cn("w-5 h-5 flex-shrink-0", style.iconColor)} />
        <p className="text-white font-medium text-sm flex-1">{message}</p>
        <button onClick={onClose} className="flex-shrink-0 text-white/80 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ==========================
// Network Error Component
// ==========================
export function NetworkError({ isOnline, onRetry, className }) {
  if (isOnline) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm animate-slide-in-shake",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <WifiOff className="w-5 h-5 text-red-400" />
        <div>
          <p className="text-red-300 font-medium text-sm">Connection Lost</p>
          <p className="text-red-400/80 text-xs">Please check your internet connection</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-medium rounded transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
}

// ==========================
// Form Error Summary
// ==========================
export function FormErrorSummary({ errors, className }) {
  if (errors.length === 0) return null;

  return (
    <div
      className={cn(
        "p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm animate-slide-in-shake",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="text-red-300 font-medium text-sm mb-2">Please fix the following errors:</h4>
          <ul className="space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-400/90 text-xs flex items-center gap-2">
                <div className="w-1 h-1 bg-red-400 rounded-full flex-shrink-0" />
                {error}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ==========================
// Success Message Component
// ==========================
export function SuccessMessage({ message, className, onDismiss }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 bg-[rgb(151,177,150)]/10 border border-[rgb(151,177,150)]/30 rounded-lg backdrop-blur-sm animate-slide-in-success",
        className
      )}
    >
      <CheckCircle2 className="w-5 h-5 text-[rgb(151,177,150)] flex-shrink-0" />
      <p className="text-[rgb(151,177,150)] font-medium text-sm flex-1">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 text-[rgb(151,177,150)]/70 hover:text-[rgb(151,177,150)] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// ==========================
// Validation Hook
// ==========================
export function useFormValidation() {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const validateField = (name, value, rules) => {
    for (const rule of rules) {
      const error = rule.validate(value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
        return false;
      }
    }
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  };

  const validateForm = (formData, validationRules) => {
    setIsValidating(true);
    const newErrors = {};
    let isValid = true;

    Object.entries(validationRules).forEach(([field, rules]) => {
      const value = formData[field];
      for (const rule of rules) {
        const error = rule.validate(value);
        if (error) {
          newErrors[field] = error;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    setIsValidating(false);
    return isValid;
  };

  const clearErrors = () => setErrors({});
  const clearFieldError = (field) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    isValidating,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
    hasErrors: Object.keys(errors).length > 0,
  };
}

// ==========================
// Validation Rules
// ==========================
export const validationRules = {
  required: (fieldName) => ({
    validate: (value) =>
      !value || value.trim() === "" ? `${fieldName} is required` : null,
  }),

  minLength: (min, fieldName) => ({
    validate: (value) =>
      value && value.length < min
        ? `${fieldName} must be at least ${min} characters`
        : null,
  }),

  email: () => ({
    validate: (value) => {
      if (!value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(value)
        ? "Please enter a valid email address"
        : null;
    },
  }),

  phone: () => ({
    validate: (value) => {
      if (!value) return null;
      const phoneRegex = /^\+233\s?\d{2}\s?\d{3}\s?\d{4}$/;
      return !phoneRegex.test(value)
        ? "Please enter a valid Ghana phone number (+233 XX XXX XXXX)"
        : null;
    },
  }),

  password: () => ({
    validate: (value) => {
      if (!value) return null;
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/(?=.*[a-z])/.test(value))
        return "Password must contain at least one lowercase letter";
      if (!/(?=.*[A-Z])/.test(value))
        return "Password must contain at least one uppercase letter";
      if (!/(?=.*\d)/.test(value))
        return "Password must contain at least one number";
      return null;
    },
  }),

  age: () => ({
    validate: (value) => {
      if (!value) return null;
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age < 16 ? "You must be at least 16 years old" : null;
    },
  }),
};
