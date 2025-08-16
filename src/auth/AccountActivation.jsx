import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, PenLine } from 'lucide-react';
import Button from '../components/shared/Button';

const AccountActivationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Prefer navigation state.email, fallback to sessionStorage.pending_activation
  const stored = (() => {
    try {
      return JSON.parse(sessionStorage.getItem('pending_activation') || 'null');
    } catch (e) {
      return null;
    }
  })();

  const emailFromState = state?.email;
  const email = emailFromState || stored?.email || '';

  const [timeLeft, setTimeLeft] = useState(900); // 15m
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // guard: only allow access when we have pending activation data
  useEffect(() => {
    if (!email) {
      // no pending activation -> send user back to register
      navigate('/register', { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${String(sec).padStart(2, '0')}`;
  };

  const handleEditEmail = () => {
    // clear pending activation when editing so user can re-register
    try { sessionStorage.removeItem('pending_activation'); } catch (e) {}
    navigate('/register', { replace: false });
  };

  const handleResend = async () => {
    if (!email) return;
    setIsResending(true);
    try {
      // best-effort resend call — adjust endpoint to your backend if different
      await fetch(`${BASE}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      }).catch(() => {}); // ignore network errors here
    } finally {
      // reset timer & UI regardless of backend response to avoid UX lock
      setTimeLeft(900);
      setCanResend(false);
      setIsResending(false);
    }
  };

  return (
    <div className="authlayout-bg relative z-10 min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="rounded-lg text-card-foreground bg-[var(--primary-900)] backdrop-blur-xl border border-white/20 hover:border-[rgb(151,177,150)]/30 shadow-2xl transition-all duration-300 max-w-md w-full">
        <div className="flex flex-col p-6 space-y-4 text-center pb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>

          <div className="tracking-tight text-2xl font-bold text-white">
            We have sent you an email
          </div>

          <div className="text-sm text-gray-300">
            Please check your inbox and click the verification link to activate your account.
          </div>

          <div className="flex items-center justify-center gap-2 bg-white/5 rounded-lg p-3">
            <span className="text-white font-medium truncate">{email || 'No email provided'}</span>
            <button
              type="button"
              onClick={handleEditEmail}
              className="text-[rgb(151,177,150)] hover:text-[rgb(171,197,170)] transition-colors duration-300"
              aria-label="Edit email"
            >
              <PenLine className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 pt-0 space-y-6">
          <div className="space-y-4">
            <Button
              variant="gradient"
              fullWidth
              onClick={() => {
                try { sessionStorage.removeItem('pending_activation'); } catch (e) {}
                navigate('/login');
              }}
            >
              Go to Login
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-300">Didn't receive the email?</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <button
                  onClick={handleResend}
                  disabled={!canResend || isResending || !email}
                  className="text-sm font-medium transition-colors duration-300 text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? 'Resending...' : canResend ? 'Resend verification email' : `Resend in ${formatTime(timeLeft)}`}
                </button>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-sm text-gray-300">
                Need help?{' '}
                <a href="mailto:support@example.com" className="text-[var(--gold-300)] hover:underline">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActivationPage;
