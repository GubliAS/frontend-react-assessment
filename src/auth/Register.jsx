import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/shared/Button';
import '../styles/authlayout.css';
import AuthAside from '../components/AuthAside';
import InputField from '../components/shared/InputField';
import SelectField from '../components/shared/SelectInputField';
import { Phone, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Google colored icon
import { registerSeeker, registerEmployer } from "../services/auth";
import { isValidPhone, toE164 } from '../utils/PhoneNumberValidator';
import { useFormValidation, validationRules, FieldError } from '../components/error-componenets';
import { toast } from "../hooks/use-toast";

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

  // create a single shared validation instance and pass to child forms
  const validation = useFormValidation();

  const socialLinks = [
    { label: "Facebook", icon: <FaFacebookF className="w-5 h-5" /> },
    { label: "LinkedIn", icon: <FaLinkedinIn className="w-5 h-5" /> },
    { label: "Google", icon: <FcGoogle className="w-5 h-5" /> }
  ];

  return (
    <div className="rounded-lg text-card-foreground bg-[var(--primary-600)] backdrop-blur-xl border border-white/20 shadow-2xl hover:border-[rgb(151,177,150)]/30 transition-all duration-300">
      <div className="flex flex-col p-6 space-y-2 text-center pb-6">
        <h3 className="tracking-tight text-3xl font-bold text-white">Create Account</h3>
        <p className="text-sm text-gray-300">Join Ghana's premier talent community</p>
      </div>

      <div className="p-6 pt-0 space-y-6">
       <div className="flex bg-white/5 rounded-lg p-1 mb-6">
          <Button
            variant={accountType === "seeker" ? "emeraldGradient" : "seekerOremployer"}
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

          <Button
            variant={accountType === "employer" ? "emeraldGradient" : "seekerOremployer"}
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

        {/* Render form based on selection, pass shared validation */}
        {accountType === "seeker" ? <OpportunitySeekerForm validation={validation} /> : <EmployerForm validation={validation} />}

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

const OpportunitySeekerForm = ({ validation }) => {
  const { errors, validateForm, validateField, clearFieldError } = validation;

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    date_of_birth: '',
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false,
  });

  const navigate = useNavigate();

  // define the validation map for this form (age used for date_of_birth)
  const validationMap = {
    first_name: [validationRules.required('First name')],
    last_name: [validationRules.required('Last name')],
    email: [validationRules.required('Email'), validationRules.email()],
    phone_number: [validationRules.required('Phone number'), validationRules.phone()],
    password: [validationRules.password()],
    confirm_password: [validationRules.required('Confirm password')],
    date_of_birth: [validationRules.required('Date of birth'), validationRules.age()],
    terms: [
      {
        validate: (v) => (v ? null : 'You must accept terms'),
      },
    ],
  };

  useEffect(() => {
    const p = formData.password;
    setPasswordRequirements({
      length: p.length >= 8,
      uppercase: /[A-Z]/.test(p),
      lowercase: /[a-z]/.test(p),
      number: /[0-9]/.test(p),
      special: /[^A-Za-z0-9]/.test(p),
      match: p && formData.confirm_password && p === formData.confirm_password,
    });
  }, [formData.password, formData.confirm_password]);

  // compute isValid from required fields, passwordRequirements and validation errors
  const isValid =
    formData.first_name.trim() &&
    formData.last_name.trim() &&
    formData.date_of_birth &&
    Object.values(passwordRequirements).every(Boolean) &&
    formData.terms &&
    !errors?.email &&
    !errors?.phone_number;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    setFormData((p) => ({ ...p, [name]: newVal }));

    // run per-field validation if rules exist
    if (validationMap[name]) {
      validateField(name, newVal, validationMap[name]);
    } else {
      // clear previous error if no rules for this field
      clearFieldError(name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formForValidation = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      password: formData.password,
      confirm_password: formData.confirm_password,
      date_of_birth: formData.date_of_birth,
      terms: formData.terms,
    };

    const ok = validateForm(formForValidation, validationMap);
    if (!ok) return;

    if (!isValid) return;
    setIsSubmitting(true);
    try {
      const normalized = toE164(formData.phone_number, 'GH');
      if (!normalized) {
         toast({
           title: 'Invalid phone number',
           description: 'Please enter a valid phone number.',
         });
         setIsSubmitting(false);
         return;
      }

      const body = {
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        phoneNumber: normalized,
        password: formData.password,
        dateOfBirth: formData.date_of_birth,
      };

      const res = await registerSeeker(body);
      navigate('/account-activation', { state: { email: body.email, from: 'register', response: res } });
    } catch (err) {
      console.error('Register seeker failed', err);
      toast({
        title: 'Registration failed',
        description: err?.message || 'Registration failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <InputField label="First Name" name="first_name" placeholder="Kwame" required value={formData.first_name} onChange={handleChange} />
        <InputField label="Last Name" name="last_name" placeholder="Asante" required value={formData.last_name} onChange={handleChange} />
      </div>

      <InputField label="Email Address" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange} error={errors?.email} />

      <InputField label="Phone Number" name="phone_number" type="tel" placeholder="+233 XX XXX XXXX" required value={formData.phone_number} onChange={handleChange} error={errors?.phone_number} />

      <div className="relative">
        <InputField type="password" label="Password" name="password" placeholder="Create a strong password" required value={formData.password} onChange={handleChange} />
      </div>

      <div className="relative">
        <InputField type="password" label="Confirm Password" name="confirm_password" placeholder="Confirm password" required value={formData.confirm_password} onChange={handleChange} />
      </div>

      {formData.password && (
        <div className="space-y-2 p-4 bg-white/5 rounded-lg">
          <h4 className="text-sm font-medium text-white">Password Requirements:</h4>
          <div className="space-y-1">
            <RequirementItem valid={passwordRequirements.length} label="At least 8 characters" />
            <RequirementItem valid={passwordRequirements.uppercase} label="One uppercase letter" />
            <RequirementItem valid={passwordRequirements.lowercase} label="One lowercase letter" />
            <RequirementItem valid={passwordRequirements.number} label="One number" />
            <RequirementItem valid={passwordRequirements.special} label="One special character" />
            <RequirementItem valid={passwordRequirements.match} label="Passwords match" matchCheck />
          </div>
        </div>
      )}

      <InputField label="Date of Birth" name="date_of_birth" type="date" required value={formData.date_of_birth} onChange={(e) => { handleChange(e); clearFieldError('date_of_birth'); }} />
      <FieldError message={errors?.date_of_birth} />

      <div className="flex items-start space-x-3">
        <input id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} className="h-4 w-4 shrink-0 rounded-sm border border-white/30 hover:border-[rgb(151,177,150)]/50 data-[state=checked]:bg-[rgb(151,177,150)] data-[state=checked]:border-[rgb(151,177,150)] transition-all duration-300" />
        <label htmlFor="terms" className="font-medium text-sm text-gray-300 leading-relaxed">
          I agree to the{' '}
          <a href="/terms" className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline transition-colors duration-300">Terms of Service</a> and{' '}
          <a href="/privacy" className="text-[var(--gold-300)] hover:text-[var(--ebony-50)] hover:underline transition-colors duration-300">Privacy Policy</a>
        </label>
      </div>

      <Button
        type="submit"
        variant="emeraldGradient"
        size="large"
        fullWidth
        disabled={!isValid || isSubmitting}
        className="w-full font-semibold py-3"
      >
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
};

const EmployerForm = ({ validation }) => {
  const { errors, validateForm, validateField, clearFieldError } = validation;

  const industryOptions = [ { value: 'technology', label: 'Technology' }, { value: 'finance', label: 'Finance & Banking' }, { value: 'healthcare', label: 'Healthcare' }, { value: 'education', label: 'Education' }, { value: 'manufacturing', label: 'Manufacturing' }, { value: 'retail', label: 'Retail & Commerce' }, { value: 'agriculture', label: 'Agriculture' }, { value: 'construction', label: 'Construction' }, { value: 'other', label: 'Other' }, ];
  const sizeOptions = [ { value: '1-10', label: '1-10 employees' }, { value: '11-50', label: '11-50 employees' }, { value: '51-200', label: '51-200 employees' }, { value: '201-500', label: '201-500 employees' }, { value: '500+', label: '500+ employees' }, ];
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    contactPersonName: '',
    contactEmail: '',
    phoneNumber: '',
    password: '',
    confirm_password: '',
    termsAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
    match: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const p = formData.password;
    setPasswordRequirements({
      length: p.length >= 8,
      uppercase: /[A-Z]/.test(p),
      lowercase: /[a-z]/.test(p),
      number: /[0-9]/.test(p),
      special: /[^A-Za-z0-9]/.test(p),
      match: p && formData.confirm_password && p === formData.confirm_password,
    });
  }, [formData.password, formData.confirm_password]);

  const validationMap = {
    companyName: [validationRules.required('Company name')],
    industry: [validationRules.required('Industry')],
    companySize: [validationRules.required('Company size')],
    contactPersonName: [validationRules.required('Contact person name')],
    contactEmail: [validationRules.required('Contact email'), validationRules.email()],
    phoneNumber: [validationRules.required('Phone number'), validationRules.phone()],
    password: [validationRules.password()],
    confirm_password: [validationRules.required('Confirm password')],
    termsAccepted: [{ validate: v => (v ? null : 'You must accept terms') }],
  };

  const isValid =
    formData.companyName.trim() &&
    formData.industry &&
    formData.companySize &&
    formData.contactPersonName.trim() &&
    Object.values(passwordRequirements).every(Boolean) &&
    formData.termsAccepted &&
    !errors?.contactEmail &&
    !errors?.phoneNumber;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newVal }));

    if (validationMap[name]) {
      validateField(name, newVal, validationMap[name]);
    } else {
      clearFieldError(name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      const normalized = toE164(formData.phoneNumber, 'GH') || String(formData.phoneNumber).replace(/\D/g, '');
      if (!normalized) {
        toast({ title: 'Invalid phone number', description: 'Please enter a valid phone number.' });
        setIsSubmitting(false);
        return;
      }

      const body = {
        companyName: formData.companyName,
        industry: formData.industry,
        companySize: formData.companySize,
        contactPersonName: formData.contactPersonName,
        email: formData.contactEmail,
        phoneNumber: normalized,
        password: formData.password,
        companyDescription: formData.companyDescription,
        websiteUrl: formData.websiteUrl,
      };

      const res = await registerEmployer(body);
      navigate('/account-activation', { state: { email: body.email, from: 'register', response: res } });
    } catch (err) {
      console.error('Register employer failed', err);
      toast({
        title: 'Registration failed',
        description: err?.message || 'Registration failed',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField label="Company Name" name="companyName" placeholder="Acme Corporation Ltd." required value={formData.companyName} onChange={handleInputChange} error={errors?.companyName} />

      <div className="grid grid-cols-2 gap-4">
        <SelectField label="Industry" name="industry" value={formData.industry} onChange={handleInputChange} required options={industryOptions} placeholder="Select Industry" />
        <SelectField label="Company Size" name="companySize" value={formData.companySize} onChange={handleInputChange} required options={sizeOptions} placeholder="Select Size" />
      </div>

      <InputField label="Contact Person Name" name="contactPersonName" placeholder="John Doe" required value={formData.contactPersonName} onChange={handleInputChange} error={errors?.contactPersonName} />

      <div className="grid grid-cols-2 gap-4">
        <InputField label="Contact Email" name="contactEmail" type="email" placeholder="contact@company.com" required value={formData.contactEmail} onChange={handleInputChange} error={errors?.contactEmail} />
        <InputField label="Phone Number" name="phoneNumber" type="tel" placeholder="+233 XX XXX XXXX" required value={formData.phoneNumber} onChange={handleInputChange} error={errors?.phoneNumber} />
      </div>

      <InputField label="Password" name="password" type="password" placeholder="Create a strong password" required value={formData.password} onChange={handleInputChange} />
      <InputField label="Confirm Password" name="confirm_password" type="password" placeholder="Confirm password" required value={formData.confirm_password} onChange={handleInputChange} />

      {formData.password && (
        <div className="space-y-2 p-4 bg-white/5 rounded-lg">
          <h4 className="text-sm font-medium text-white">Password Requirements:</h4>
          <div className="space-y-1">
            <RequirementItem valid={passwordRequirements.length} label="At least 8 characters" />
            <RequirementItem valid={passwordRequirements.uppercase} label="One uppercase letter" />
            <RequirementItem valid={passwordRequirements.lowercase} label="One lowercase letter" />
            <RequirementItem valid={passwordRequirements.number} label="One number" />
            <RequirementItem valid={passwordRequirements.special} label="One special character" />
            <RequirementItem valid={passwordRequirements.match} label="Passwords match" matchCheck />
          </div>
        </div>
      )}

      <div className="flex items-start space-x-3">
        <input id="termsAccepted" name="termsAccepted" type="checkbox" checked={formData.termsAccepted} onChange={handleInputChange} className="h-4 w-4 shrink-0 rounded-sm border border-white/30 hover:border-[rgb(151,177,150)]/50 data-[state=checked]:bg-[rgb(151,177,150)] data-[state=checked]:border-[rgb(151,177,150)] transition-all duration-300" />
        <label htmlFor="termsAccepted" className="font-medium text-sm text-gray-300 leading-relaxed">
          I agree to the <a href="/terms" className="text-[var(--gold-300)]">Terms of Service</a> and <a href="/privacy" className="text-[var(--gold-300)]">Privacy Policy</a>
        </label>
      </div>

      <Button
        type="submit"
        variant="emeraldGradient"
        size="large"
        fullWidth
        disabled={!isValid || isSubmitting}
        className="w-full font-semibold py-3"
      >
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
};

// local RequirementItem reused from ResetPassword
const RequirementItem = ({ valid, label, matchCheck }) => (
  <div className={`flex items-center gap-2 text-xs ${valid ? 'text-emerald-400' : matchCheck ? 'text-red-400' : 'text-gray-400'}`}>
    {valid ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
    {label}
  </div>
);

export default YouthRegister;


