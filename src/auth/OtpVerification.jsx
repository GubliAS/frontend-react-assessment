import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, PenLine } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpSeeker, verifyOtpEmployer } from "../services/auth";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../redux/auth/authSlice";
import Cookies from "universal-cookie";
import Button from "../components/shared/Button";

const cookies = new Cookies();

const OTPVerificationPage = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 min countdown
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || "email@hidden.com";
  const accountType = state?.accountType || "seeker"; // 'seeker' | 'employer'

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setIsSubmitting(true);
    try {
      const body = { email, otp: code };
      let res;
      if (accountType === "seeker") {
        res = await verifyOtpSeeker(body);
      } else {
        res = await verifyOtpEmployer(body);
      }

      // Persist token + user in redux (reducers also write cookies)
      // backend returns accessToken (not token)
      const token = res?.accessToken || res?.token;
      const user = res?.user || null;

      if (token) {
        // store via redux (authSlice will also set cookies) and ensure cookie fallback
        dispatch(setToken(token));
        cookies.set("auth_token", token, { path: "/", sameSite: "lax" });
      }
      if (user) {
        dispatch(setUser(user));
        cookies.set("user", JSON.stringify(user), { path: "/", sameSite: "lax" });
      }

      // redirect based on accountType
      if (accountType === "seeker") {
        navigate("/youth/dashboard", { replace: true });
      } else {
        navigate("/employer/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err?.message || "Verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    // Simulate resend logic
    setTimeLeft(900);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputsRef.current[0]?.focus();
    console.log("Resend OTP triggered");
  };

  return (
    <div className="authlayout-bg relative z-10 min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="rounded-lg text-card-foreground bg-[var(--primary-600)] backdrop-blur-xl border border-white/20 hover:border-[rgb(151,177,150)]/30 shadow-2xl transition-all duration-300 max-w-md w-full">
        
        {/* Top Section */}
        <div className="flex flex-col p-6 space-y-4 text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <div className="tracking-tight text-2xl font-bold text-white">
            We just sent an Email
          </div>
          <div className="text-sm text-gray-300">
            Enter the security code we sent to
          </div>
          <div className="flex items-center justify-center gap-2 bg-white/5 rounded-lg p-3">
            <span className="text-white font-medium">{email}</span>
            <button className="text-[rgb(151,177,150)] hover:text-[rgb(171,197,170)] transition-colors duration-300">
              <PenLine className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 pt-0 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="flex rounded-md border px-3 py-2 w-12 h-12 text-center text-lg font-bold bg-white/10 border-white/20 text-white focus:border-[rgb(151,177,150)] focus:ring-[rgb(151,177,150)]/50 transition-all duration-300"
                  inputMode="numeric"
                  maxLength="1"
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>

            {/* Countdown */}
            <div className="text-center">
              <p className="text-sm text-gray-300">
                Code expires in:{" "}
                <span className="font-medium text-[rgb(151,177,150)]">
                  {formatTime(timeLeft)}
                </span>
              </p>
            </div>

            <Button
              type="submit"
              variant="emeraldGradient"
              size="medium"
              disabled={otp.some((val) => !val) || isSubmitting}
              className="h-10 px-4 w-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </form>

          {error && <div className="text-sm text-red-400 text-center">{error}</div>}

          {/* Resend */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-300">Didn't receive the code?</p>
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleResend}
                disabled={!canResend}
                className="text-sm font-medium transition-colors duration-300 text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {canResend ? "Resend" : `Resend in ${formatTime(timeLeft)}`}
              </button>
            </div>
          </div>

          {/* Switch Verification Method */}
          <div className="text-center pt-4 border-t border-white/20">
            <button className="text-sm text-[rgb(151,177,150)] hover:text-[rgb(171,197,170)] hover:underline transition-colors duration-300">
              Use email verification instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
