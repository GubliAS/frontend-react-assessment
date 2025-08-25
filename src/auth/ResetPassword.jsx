import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import InputField from "../components/shared/InputField";
import Button from "../components/shared/Button";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "../components/LoadingComponents";
import { resetPassword } from "../services/auth"; // added

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState(null); // added
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    match: false,
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") || "";

  // Update password requirements in real-time
  useEffect(() => {
    setPasswordRequirements({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      match: newPassword && confirmPassword && newPassword === confirmPassword,
    });
  }, [newPassword, confirmPassword]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Reset token is missing. Use the link from your email.");
      return;
    }

    // basic validation
    if (!newPassword || !confirmPassword) {
      setError("Please enter and confirm your new password.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!Object.values(passwordRequirements).every(Boolean)) {
      setError("Password does not meet requirements.");
      return;
    }

    setIsLoading(true);
    try {
      // backend expects { token, password, confirmPassword } (adjust if your API differs)
      await resetPassword({ token: token, newPassword: newPassword});
      // on success redirect to login
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="authlayout-bg relative z-10 min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-7xl grid gap-12 items-center">
        <div className="rounded-lg text-card-foreground bg-[var(--primary-600)] backdrop-blur-xl border shadow-2xl border-white/20 hover:border-[rgb(151,177,150)]/30 transition-all duration-300 max-w-md mx-auto">
          {/* Header */}
          <div className="flex flex-col p-6 space-y-2 text-center">
            <h3 className="tracking-tight text-3xl font-bold text-white">
              Reset Password
            </h3>
            <p className="text-sm text-gray-300">
              Create a new password for your account
            </p>
          </div>

          <div className="p-6 pt-0 space-y-6">
            <form onSubmit={handlePasswordReset} className="space-y-6">
              {/* New Password */}
              <div className="relative">
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[rgb(151,177,150)] focus:ring-[rgb(151,177,150)]/50 transition-all duration-300 pr-10"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[rgb(151,177,150)] focus:ring-[rgb(151,177,150)]/50 transition-all duration-300 pr-10"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Requirements */}
              {newPassword && (
                <div className="space-y-2 p-4 bg-white/5 rounded-lg">
                  <h4 className="text-sm font-medium text-white">Password Requirements:</h4>
                  <div className="space-y-1">
                    <RequirementItem valid={passwordRequirements.length} label="At least 8 characters" />
                    <RequirementItem valid={passwordRequirements.uppercase} label="One uppercase letter" />
                    <RequirementItem valid={passwordRequirements.lowercase} label="One lowercase letter" />
                    <RequirementItem valid={passwordRequirements.number} label="One number" />
                    {confirmPassword && (
                      <RequirementItem valid={passwordRequirements.match} label="Passwords match" matchCheck />
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 text-sm text-red-500 bg-red-100 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="emeraldGradient"
                disabled={isLoading || !isOnline || !Object.values(passwordRequirements).every((req) => req)}
                className="w-full font-semibold py-3 transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Resetting Password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Requirement Item Component
const RequirementItem = ({ valid, label, matchCheck }) => (
  <div
    className={`flex items-center gap-2 text-xs ${
      valid ? "text-emerald-400" : matchCheck ? "text-red-400" : "text-gray-400"
    }`}
  >
    {valid ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
    {label}
  </div>
);

export default ResetPasswordPage;
