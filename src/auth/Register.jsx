import React, {useState} from 'react';

import Button from '../components/shared/Button';
import '../styles/authlayout.css';
import AuthAside from '../components/AuthAside';
import InputField from '../components/shared/InputField';
import SelectField from '../components/shared/SelectInputField';
import { Phone, Eye, EyeOff} from 'lucide-react';
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google colored icon

const YouthRegister = () => {
  return (
   <div className='authlayout-bg relative z-10 min-h-screen flex items-center justify-center p-4 pt-20'>

    <div className='w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center'>
      <AuthAside/>
      <CreateAccountForm />
    </div>
   </div>
  );
};






const CreateAccountForm = () => {
  const [accountType, setAccountType] = useState("seeker");

  const socialLinks = [
    { label: "Facebook", icon: <FaFacebookF className="w-5 h-5" /> },
    { label: "LinkedIn", icon: <FaLinkedinIn className="w-5 h-5" /> },
    { label: "Google", icon: <FcGoogle className="w-5 h-5" /> }
  ];

  return (
    <div className="rounded-lg text-card-foreground bg-[var(--primary-900)] backdrop-blur-xl border border-white/20 shadow-2xl hover:border-[rgb(151,177,150)]/30 transition-all duration-300">
      <div className="flex flex-col p-6 space-y-2 text-center pb-6">
        <h3 className="tracking-tight text-3xl font-bold text-white">Create Account</h3>
        <p className="text-sm text-gray-300">Join Ghana's premier talent community</p>
      </div>

      <div className="p-6 pt-0 space-y-6">
       <div className="flex bg-white/5 rounded-lg p-1 mb-6">
  {/* Youth Form Button */}
  <Button
    variant={accountType === "seeker" ? "primary" : "seekerOremployer"}
    size="medium"
    fullWidth
    className={
      accountType === "seeker"
        ? "gap-2 bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 text-white shadow-lg"
        : "gap-2 text-gray-300 hover:text-white hover:bg-white/10"
    }
    onClick={() => setAccountType("seeker")}
  >
    Opportunity Seeker
  </Button>

  {/* Employer Form Button */}
  <Button
    variant={accountType === "employer" ? "primary" : "seekerOremployer"}
    size="medium"
    fullWidth
    className={
      accountType === "employer"
        ? "gap-2 bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 text-white shadow-lg"
        : "gap-2 text-gray-300 hover:text-white hover:bg-white/10"
    }
    onClick={() => setAccountType("employer")}
  >
    Employer
  </Button>
</div>


        {/* Render form based on selection */}
        {accountType === "seeker" ? <OpportunitySeekerForm /> : <EmployerForm />}

        {/* Social sign-in */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">Or sign up with</span>
            </div>
          </div>

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

        <div className="text-center pt-4 border-t border-white/20">
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline font-medium transition-colors duration-300"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};



const OpportunitySeekerForm = () => {
  return (  
    <form className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="first_name"
          placeholder="Kwame"
          required
        />
        <InputField
          label="Last Name"
          name="last_name"
          placeholder="Asante"
          required
        />
      </div>

      <InputField
        label="Phone Number"
        name="phone_number"
        type="tel"
        placeholder="+233 XX XXX XXXX"
        required
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Create a strong password"
        required
      />

      <InputField
        label="Date of Birth"
        name="date_of_birth"
        type="date"
        required
      />

      <div className="flex items-start space-x-3">
        <input
          id="terms"
          type="checkbox"
          className="h-4 w-4 shrink-0 rounded-sm border border-white/30 hover:border-[rgb(151,177,150)]/50 data-[state=checked]:bg-[rgb(151,177,150)] data-[state=checked]:border-[rgb(151,177,150)] transition-all duration-300"
        />
        <label htmlFor="terms" className="font-medium text-sm text-gray-300 leading-relaxed">
          I agree to the{' '}
          <a href="/terms" className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline transition-colors duration-300">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline transition-colors duration-300">Privacy Policy</a>
        </label>
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
  Create Account
</Button>
    </form>
  );
};

const EmployerForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    contactPersonName: '',
    contactEmail: '',
    phoneNumber: '',
    password: '',
    businessRegistration: '',
    companyDescription: '',
    websiteUrl: '',
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & Commerce' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'construction', label: 'Construction' },
    { value: 'other', label: 'Other' },
  ];

  const sizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500+', label: '500+ employees' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // submit logic
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        label="Company Name"
        name="companyName"
        placeholder="Acme Corporation Ltd."
        required
        value={formData.companyName}
        onChange={handleInputChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Industry"
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          required
          options={industryOptions}
          placeholder="Select Industry"
        />

        <SelectField
          label="Company Size"
          name="companySize"
          value={formData.companySize}
          onChange={handleInputChange}
          required
          options={sizeOptions}
          placeholder="Select Size"
        />
      </div>

      <InputField
        label="Contact Person Name"
        name="contactPersonName"
        placeholder="John Doe"
        required
        value={formData.contactPersonName}
        onChange={handleInputChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Contact Email"
          name="contactEmail"
          type="email"
          placeholder="contact@company.com"
          required
          value={formData.contactEmail}
          onChange={handleInputChange}
        />

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
      </div>

      <InputField
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Create a strong password"
        required
        value={formData.password}
        onChange={handleInputChange}
        endIcon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        endIconOnClick={() => setShowPassword((s) => !s)}
      />

      <InputField
        label="Business Registration Number"
        name="businessRegistration"
        placeholder="BN-XXXXXXXX-XX"
        required
        value={formData.businessRegistration}
        onChange={handleInputChange}
      />

      <InputField
        label="Company Description"
        name="companyDescription"
        type="textarea"
        rows={3}
        placeholder="Brief description of your company and what you do..."
        value={formData.companyDescription}
        onChange={handleInputChange}
      />

      <InputField
        label="Website URL (Optional)"
        name="websiteUrl"
        type="url"
        placeholder="https://www.yourcompany.com"
        value={formData.websiteUrl}
        onChange={handleInputChange}
      />

      <div className="flex items-start space-x-3">
        <input
          id="termsAccepted"
          name="termsAccepted"
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={handleInputChange}
          className="h-4 w-4 shrink-0 rounded-sm border border-white/30 hover:border-[rgb(151,177,150)]/50 data-[state=checked]:bg-[rgb(151,177,150)] data-[state=checked]:border-[rgb(151,177,150)] transition-all duration-300"
        />
        <label htmlFor="termsAccepted" className="font-medium text-sm text-gray-300 leading-relaxed">
          I agree to the{' '}
          <a href="/terms" className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline transition-colors duration-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline transition-colors duration-300">
            Privacy Policy
          </a>
        </label>
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
  Create Account
</Button>
    </form>
  );
}

export default YouthRegister;


