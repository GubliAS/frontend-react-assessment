import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/shared/Button';
import '../styles/authlayout.css';
import AuthAside from '../components/AuthAside';
import InputField from '../components/shared/InputField';
import { Eye, EyeOff } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { loginSeeker, loginEmployer } from '../services/auth';
import { ErrorMessage } from '../components/error-componenets';
const Login = () => {
  const [accountType, setAccountType] = useState('seeker'); // seeker | employer
  const [formData, setFormData] = useState({ email: '', password: '', remember: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const socialLinks = [
    { label: 'Facebook', icon: <FaFacebookF className="w-5 h-5" /> },
    { label: 'LinkedIn', icon: <FaLinkedinIn className="w-5 h-5" /> },
    { label: 'Google', icon: <FcGoogle className="w-5 h-5" /> },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const body = { email: formData.email, password: formData.password };
      let res;
      if (accountType === 'seeker') {
        res = await loginSeeker(body);
      } else {
        res = await loginEmployer(body);
      }
      // on success: navigate to appropriate dashboard (adjust routes as needed)
      // you can also dispatch Redux actions here to store token/user
      navigate('/otp-verification', {state: { accountType: accountType, email: formData.email } });
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="authlayout-bg relative z-10 min-h-screen flex items-center justify-center p-4 pt-20">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <AuthAside />
        <div className="rounded-lg text-card-foreground bg-[var(--primary-900)] backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300">
          <div className="flex flex-col p-6 space-y-2 text-center pb-6">
            <h3 className="tracking-tight text-3xl font-bold text-white">Welcome back</h3>
            <p className="text-sm text-gray-300">Sign in to continue to Ghana Talent Hub</p>
          </div>

          <div className="p-6 pt-0 space-y-6">
            <div className="flex bg-white/5 rounded-lg p-1 mb-6">
              <Button
                variant={accountType === 'seeker' ? 'primary' : 'seekerOremployer'}
                size="medium"
                fullWidth
                className={accountType === 'seeker' ? 'gap-2 bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 text-white shadow-lg' : 'gap-2 text-gray-300 hover:text-white hover:bg-white/10'}
                onClick={() => setAccountType('seeker')}
              >
                Opportunity Seeker
              </Button>

              <Button
                variant={accountType === 'employer' ? 'primary' : 'seekerOremployer'}
                size="medium"
                fullWidth
                className={accountType === 'employer' ? 'gap-2 bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 text-white shadow-lg' : 'gap-2 text-gray-300 hover:text-white hover:bg-white/10'}
                onClick={() => setAccountType('employer')}
              >
                Employer
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Email Address"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-9 text-gray-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} className="h-4 w-4 rounded-sm" />
                  Remember me
                </label>
                <a href="/forgot-password" className="text-sm text-[var(--gold-300)] hover:underline">Forgot password?</a>
              </div>

              {error && <ErrorMessage
                      message={error}
                      type="error"
                      onDismiss={() => {}}
                    />}

              <Button type="submit" variant="gradient" size="large" fullWidth disabled={isSubmitting} className="w-full font-semibold py-3">
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-400">Or sign in with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                {socialLinks.map(({ label, icon }) => (
                  <button
                    key={label}
                    type="button"
                    className="flex items-center justify-center border h-10 px-4 py-2 bg-white/10 border-white/20 text-white hover:bg-[rgb(151,177,150)]/20 hover:border-[rgb(151,177,150)] hover:text-[rgb(151,177,150)] backdrop-blur-sm transition-all duration-300 transform hover:scale-105 rounded-md"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center pt-4 border-t border-white/20">
              <p className="text-sm text-gray-300">
                Don't have an account?{' '}
                <a href="/register" className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline font-medium transition-colors duration-300">
                  Create one
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;






