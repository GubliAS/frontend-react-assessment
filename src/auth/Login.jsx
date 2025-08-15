import React, {useState} from 'react';

import Button from '../components/shared/Button';
import '../styles/authlayout.css';
import AuthAside from '../components/AuthAside';
import InputField from '../components/shared/InputField';
import { Phone, User, Eye, EyeOff } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google colored icon
// import { Phone, , Lock, Eye, EyeOff } from "lucide-react";

const YouthLogin = () => {


  return (
   <div className='authlayout-bg relative z-10 min-h-screen flex items-center justify-center p-4 pt-20'>

    <div className='w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center'>
      <AuthAside 
          title="Welcome Back"
          subtitle="Sign in to continue your journey with Ghana's premier talent community and unlock new opportunities."
          stats={[
  { value: '24/7', label: 'Support' },
  { value: '99.9%', label: 'Uptime' },
  { value: 'Secure', label: 'Platform' },
]}
        />
      <LoginForm />
    </div>
   </div>
  );
};
const LoginForm = () => {
  const socialLinks = [
      { label: "Facebook", icon: <FaFacebookF className="w-5 h-5" /> },
      { label: "LinkedIn", icon: <FaLinkedinIn className="w-5 h-5" /> },
      { label: "Google", icon: <FcGoogle className="w-5 h-5" /> }
    ];
  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [activeTab, setActiveTab] = useState("phone"); // "phone" or "email"
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="rounded-lg text-card-foreground bg-[var(--primary-900)] backdrop-blur-xl border shadow-2xl border-white/20 hover:border-[rgb(151,177,150)]/30 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col p-6 space-y-2 text-center pb-6">
        <h3 className="tracking-tight text-3xl font-bold text-white">Sign In</h3>
        <p className="text-sm text-gray-300">Welcome back to Ghana Talent Hub</p>
      </div>

      <div className="p-6 pt-0 space-y-6">
        {/* Tab Switcher */}
        <div className="flex bg-white/5 rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("phone")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "phone"
                ? "bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <Phone className="w-4 h-4" />
            Phone
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === "email"
                ? "bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 text-white shadow-lg"
                : "text-gray-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <User className="w-4 h-4" />
            Email
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {activeTab === "phone" ? (
            <InputField
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="+233 XX XXX XXXX"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              startIcon={<Phone className="w-4 h-4" />}
            />
          ) : (
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleInputChange}
              startIcon={<User className="w-4 h-4" />}
            />
          )}

          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleInputChange}
            startIcon={<Lock className="w-4 h-4" />}
            endIcon={
              showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )
            }
            endIconOnClick={() => setShowPassword((s) => !s)}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 shrink-0 rounded-sm border border-white/30 hover:border-[rgb(151,177,150)]/50 data-[state=checked]:bg-[rgb(151,177,150)] data-[state=checked]:border-[rgb(151,177,150)] transition-all duration-300"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <a
              href='/forgot-password'
              className="text-sm text-[var(--gold-300)]  hover:text-[var(--ebony-50)] hover:underline transition-colors duration-300"
            >
              Forgot password?
            </a>
          </div>

    <Button
     type="submit"
     variant="gradient"
     size="large"
     fullWidth
     disabled
     className=" w-full 
                font-semibold py-3 transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
   >
  Sign In
                </Button>
               
        </form>

        {/* Divider */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">
                Or sign in with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
         <div className="grid grid-cols-3 gap-3">
            {socialLinks.map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="flex items-center justify-center border h-10 px-4 py-2 
                           bg-white/10 border-white/20 text-white 
                           hover:bg-[rgb(151,177,150)]/20 hover:border-[rgb(151,177,150)] 
                           hover:text-[rgb(151,177,150)] backdrop-blur-sm 
                           transition-all duration-300 transform hover:scale-105 
                           rounded-md"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-white/20">
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <a
              href="register"
              className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline font-medium transition-colors duration-300"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default YouthLogin;






