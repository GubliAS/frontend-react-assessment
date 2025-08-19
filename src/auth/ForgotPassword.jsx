import React, { useState } from "react";
import Button from "../components/shared/Button";
import InputField from "../components/shared/InputField";
import "../styles/authlayout.css";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    setIsSubmitted(true); // Switch to confirmation message
  };

  return (
    <div className="authlayout-bg relative z-10 min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-7xl grid gap-12 items-center">
        <div className="rounded-lg text-card-foreground bg-[var(--primary-600)] backdrop-blur-xl border shadow-2xl border-white/20 hover:border-[rgb(151,177,150)]/30 transition-all duration-300 max-w-md mx-auto">
          {isSubmitted ? (
            // ✅ Confirmation Message
            <div className="p-6 space-y-6 text-center">
              <h3 className="text-xl font-semibold text-white">Reset Password</h3>
              <p className="text-gray-300 text-sm">Check your email for reset instructions</p>

              <div className="w-16 h-16 bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <p className="text-gray-300 text-sm">
                We've sent password reset instructions to{" "}
                <strong className="text-white">{email}</strong>
              </p>
              <p className="text-gray-400 text-xs">
                Didn't receive the email? Check your spam folder or try again.
              </p>

              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="w-full text-center text-sm text-[rgb(151,177,150)] hover:text-[rgb(171,197,170)] hover:underline transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </button>
            </div>
          ) : (
            // ✅ Email Form
            <>
              <div className="flex flex-col p-6 space-y-2 text-center">
                <h3 className="tracking-tight text-3xl font-bold text-white">
                  Forgot Password?
                </h3>
                <p className="text-sm text-gray-300">
                  Enter your email and we’ll send you instructions to reset your password.
                </p>
              </div>

              <div className="p-6 pt-0 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your registered email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startIcon={<Mail className="w-4 h-4" />}
                  />

                  <Button
                   type="submit"
                   variant="emeraldGradient"
                   size="large"
                   fullWidth
                   disabled
                   className=" w-full 
                              font-semibold py-3 transition-all duration-300 
                              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                 >
                    Send Reset Link
                  </Button>
                </form>

                {/* Back to login */}
                <div className="text-center pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-300">
                    Remember your password?{" "}
                    <a
                      href="/login"
                      className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline font-medium transition-colors duration-300"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
