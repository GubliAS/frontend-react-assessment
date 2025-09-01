import React, { useState, useEffect } from "react";
import InputField from "../../../components/shared/InputField";
import SelectField from "../../../components/shared/SelectInputField";
import Button from "../../../components/shared/Button";
import PropTypes from "prop-types";
import { usePersonalInfo } from "../../../redux/personaInfo/usePersonalInfo";
import { setPersonalInfo } from "../../../redux/personaInfo/PersonalInfoSlice";
import { updateProfile } from "../../../services/profile";
import { setLoading, setError, clearError } from "../../../redux/personaInfo/PersonalInfoSlice";
import { useToast } from "../../../hooks/use-toast";
import { useDispatch } from "react-redux";
import { loadProfile } from "../../../redux/profile/profileActions";
import { Card } from "../../../components/ui/card";
import { GHANA_REGIONS, GENDER_OPTIONS } from "../../../utils/constants";

const PersonalInfoSection = () => {
  const { personalInfo, dispatch } = usePersonalInfo();
  const storeDispatch = useDispatch();
  const { toast } = useToast();

  const handleSavePersonalInfo = async () => {
    dispatch(clearError());
    dispatch(setLoading(true));
    try {
    console.log(personalInfo)
      // updateProfile will sanitize payload and send appropriate request (formdata if files present)
      const updated = await updateProfile(personalInfo);
      // merge server response back into slice so UI shows latest persisted state
      if (updated) {
        // Refresh canonical profile from server so all slices stay in sync
        await storeDispatch(loadProfile());
      }
      // optionally log success
      console.log("Personal info saved", updated);
      toast?.({
        title: "Profile updated",
        description: "Your personal information was saved.",
      });
    } catch (err) {
      console.error("Failed to update personal info:", err);
      dispatch(setError(err?.message || "Failed to save personal info"));
      toast?.({
        title: "Save failed",
        description: err?.message || "Failed to save personal info.",
        variant: "destructive",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleInputChange = (field, value) => {
    dispatch(setPersonalInfo({ [field]: value }));
  };

  const EnhancedFileUploadField = ({ label, name, value, onChange, accept = "image/*", side }) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error

    useEffect(() => {
      let objectUrl = null;
      if (!value) {
        setPreviewUrl(null);
        setUploadStatus('idle');
        return;
      }

      // string URL (backend) or metadata object with url
      if (typeof value === 'string') {
        setPreviewUrl(value);
        setUploadStatus('success');
        return;
      }
      if (typeof value === 'object' && value.url) {
        setPreviewUrl(value.url);
        setUploadStatus('success');
        return;
      }

      // File/Blob selected client-side -> create blob URL
      if (typeof File !== 'undefined' && value instanceof File) {
        objectUrl = URL.createObjectURL(value);
        setPreviewUrl(objectUrl);
        setUploadStatus('success');
      } else if (typeof Blob !== 'undefined' && value instanceof Blob) {
        objectUrl = URL.createObjectURL(value);
        setPreviewUrl(objectUrl);
        setUploadStatus('success');
      } else {
        setPreviewUrl(null);
        setUploadStatus('idle');
      }

      return () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      };
    }, [value]);

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          setUploadStatus('uploading');
          setTimeout(() => onChange(file), 100); // Simulate brief upload delay
        }
      }
    };

    const handleFileSelect = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadStatus('uploading');
        setTimeout(() => onChange(file), 100); // Simulate brief upload delay
      }
    };

    const handleRemoveFile = () => {
      onChange(null);
      setPreviewUrl(null);
      setUploadStatus('idle');
    };

    const getStatusColor = () => {
      switch (uploadStatus) {
        case 'success': return 'text-green-600 border-green-200 bg-green-50';
        case 'uploading': return 'text-blue-600 border-blue-200 bg-blue-50';
        case 'error': return 'text-red-600 border-red-200 bg-red-50';
        default: return 'text-gray-600 border-gray-200 bg-white';
      }
    };

    const getStatusIcon = () => {
      switch (uploadStatus) {
        case 'success': 
          return (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          );
        case 'uploading':
          return (
            <svg className="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          );
        default:
          return (
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          );
      }
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor={name} className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              side === 'front' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
            }`}>
              {side === 'front' ? 'F' : 'B'}
            </div>
            {label}
          </label>
          {uploadStatus === 'success' && (
            <button
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              Remove
            </button>
          )}
        </div>

        {/* Upload Area */}
        <div
          className={`
            relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer
            ${isDragOver ? 'border-green-400 bg-green-50' : getStatusColor()}
            ${uploadStatus === 'idle' ? 'hover:border-green-300 hover:bg-green-25' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => uploadStatus === 'idle' && document.getElementById(name)?.click()}
        >
          <input
            id={name}
            name={name}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploadStatus === 'uploading'}
          />

          {previewUrl && uploadStatus === 'success' ? (
            // Preview Mode
            <div className="p-4">
              <div className="relative">
                <img 
                  src={previewUrl} 
                  alt={`${label} preview`} 
                  className="w-full h-40 object-cover rounded-lg border shadow-sm"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                  {getStatusIcon()}
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-green-700">
                  {typeof value === 'object' && value.name ? value.name : 'File uploaded successfully'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click to replace or drag a new image
                </p>
              </div>
            </div>
          ) : (
            // Upload Mode
            <div className="p-8 text-center">
              <div className="flex flex-col items-center">
                {getStatusIcon()}
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-900">
                    {uploadStatus === 'uploading' ? 'Uploading...' : `Upload Ghana Card ${side === 'front' ? 'Front' : 'Back'}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {uploadStatus === 'uploading' 
                      ? 'Processing your image...' 
                      : 'Drag and drop or click to select an image'
                    }
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <span>Supports: JPG, PNG, WEBP</span>
                  <span>•</span>
                  <span>Max 5MB</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upload Guidelines */}
        {uploadStatus === 'idle' && (
          <div className={`
            p-3 rounded-lg text-xs
            ${side === 'front' ? 'bg-blue-50 border border-blue-200' : 'bg-purple-50 border border-purple-200'}
          `}>
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium text-gray-700 mb-1">
                  Ghana Card {side === 'front' ? 'Front' : 'Back'} Guidelines:
                </p>
                <ul className="text-gray-600 space-y-0.5">
                  <li>• Ensure all text is clearly visible and readable</li>
                  <li>• Avoid glare, shadows, or blurry images</li>
                  <li>• Include all corners of the card in the photo</li>
                  {side === 'front' && <li>• Make sure your photo and personal details are clear</li>}
                  {side === 'back' && <li>• Ensure the barcode and signature are visible</li>}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {uploadStatus === 'success' && (
          <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Ghana Card {side} uploaded successfully</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600">
          Tell us about yourself to help employers find you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="First Name"
          name="firstName"
          value={personalInfo.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          placeholder="Enter your first name"
          required
          variant="light"
        />

        <InputField
          label="Last Name"
          name="lastName"
          value={personalInfo.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          placeholder="Enter your last name"
          required
          variant="light"
        />

        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={personalInfo.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          required
          variant="light"
        />

        <SelectField
          label="Gender"
          name="gender"
          options={GENDER_OPTIONS}
          value={personalInfo.gender ?? ''}
          onChange={(e) => handleInputChange("gender", e.target.value)}
          variant="light"
        />

        {/* Ghana Card Number */}
        <InputField
          label="Ghana Card Number (optional)"
          name="ghanaCardNumber"
          value={personalInfo.ghanaCardNumber}
          onChange={(e) => handleInputChange("ghanaCardNumber", e.target.value)}
          placeholder="Enter Ghana Card number"
          variant="light"
        />

        {/* Spacer for grid alignment */}
        <div></div>
      </div>

      {/* Enhanced Ghana Card Upload Section */}
      <div className="space-y-6">
        <div className="border-t pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Ghana Card Verification
              </h3>
              <p className="text-sm text-gray-600">
                Upload both sides of your Ghana Card for identity verification (Optional but recommended)
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <EnhancedFileUploadField
              label="Ghana Card Front"
              name="ghanaCardFront"
              value={personalInfo.ghCardUploadFront}
              onChange={(file) => handleInputChange("ghCardUploadFront", file)}
              accept="image/*"
              side="front"
            />
            
            <EnhancedFileUploadField
              label="Ghana Card Back"
              name="ghanaCardBack"
              value={personalInfo.ghCardUploadBack}
              onChange={(file) => handleInputChange("ghCardUploadBack", file)}
              accept="image/*"
              side="back"
            />
          </div>

          {/* Upload Benefits */}
          {/* <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-green-800 mb-2">Benefits of Ghana Card Verification</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Increases profile credibility and trust with employers</li>
                  <li>• Faster application processing for verified candidates</li>
                  <li>• Access to premium job opportunities</li>
                  <li>• Enhanced security for your account</li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Address Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Region"
              name="region"
              required
              options={[
                { value: '', label: 'Select region' },
                ...GHANA_REGIONS.map((region) => ({ value: region, label: region }))
              ]}
              value={personalInfo.address?.region ?? ''}
              onChange={(e) => handleInputChange("region", e.target.value)}
              variant="light"
            />

            <InputField
              label="District"
              name="district"
              value={personalInfo.address.district}
              onChange={(e) => handleInputChange("district", e.target.value)}
              placeholder="Enter your district"
              variant="light"
            />

            <InputField
              label="City/Town"
              name="city"
              value={personalInfo.address.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="Enter your city/town"
              variant="light"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              value={personalInfo.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              placeholder="233 XXX XXX XXX"
              variant="light"
            />

            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="your.email@example.com"
              variant="light"
            />
          </div>
        </div>
      </div>

      {/* Professional Bio */}
      <div className="space-y-2 border-t pt-4">
        <label htmlFor="bio" className="text-sm font-medium text-gray-700">
          Professional Bio *
        </label>
        <textarea
          id="bio"
          value={personalInfo.professionalBio}
          onChange={(e) => handleInputChange("professionalBio", e.target.value)}
          placeholder="Write a brief description about yourself, your career goals, and what makes you unique..."
          rows={4}
          className="flex w-full rounded-md border px-3 py-2 text-sm bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[rgb(151,177,150)] focus:ring-[rgb(151,177,150)]/50 hover:border-[rgb(151,177,150)]/50 transition-all duration-300"
          required
          maxLength={500}
        />
        <p className="text-xs text-gray-500">
          {personalInfo.professionalBio?.length || 0}/500 characters
        </p>
      </div>

      {/* Actions: Save / Cancel like other sections */}
      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="emeraldGradient"
          onClick={handleSavePersonalInfo}
        >
          Save Personal Info
        </Button>
      </div>
    </Card>
  );
};

PersonalInfoSection.propTypes = {
  initialData: PropTypes.object
};

export default PersonalInfoSection;