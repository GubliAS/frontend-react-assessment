import React from "react";
import InputField from "../../../components/shared/InputField";
import SelectField from "../../../components/shared/SelectInputField";
import PropTypes from "prop-types";
import { usePersonalInfo } from "../../../redux/personaInfo/usePersonalInfo";
import { setPersonalInfo } from "../../../redux/personaInfo/PersonalInfoSlice";
import { Card } from "../../../components/ui/card";

const GHANA_REGIONS = [
   "Greater Accra",
  "Ashanti",
  "Western",
  "Eastern",
  "Central",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West",
  "Bono",
  "Ahafo",
  "Bono East",
  "Oti",
  "Western North",
  "Savannah",
  "North East",
];

const GENDER_OPTIONS = [
  { value: '', label: 'Select gender' },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const PersonalInfoSection = () => {
  const { personalInfo, dispatch } = usePersonalInfo();

  const handleInputChange = (field, value) => {
    dispatch(setPersonalInfo({ [field]: value }));
  };

  const FileUploadField = ({ label, name, value, onChange, accept = "image/*,application/pdf" }) => (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gradient-to-r file:from-green-600 file:to-emerald-600 file:text-white hover:file:from-green-700 hover:file:to-emerald-700 transition-all duration-200"
        />
        {value && (
          <div className="mt-2 text-xs text-green-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            File selected: {value.name}
          </div>
        )}
      </div>
    </div>
  );

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

      {/* Ghana Card Upload Section */}
      <div className="space-y-4">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Ghana Card Upload (Optional)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Upload clear images of both sides of your Ghana Card for verification purposes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadField
              label="Ghana Card Front"
              name="ghanaCardFront"
              value={personalInfo.ghCardUploadFront}
              onChange={(file) => handleInputChange("ghCardUploadFront", file)}
              accept="image/*"
            />
            
            <FileUploadField
              label="Ghana Card Back"
              name="ghanaCardBack"
              value={personalInfo.ghCardUploadBack}
              onChange={(file) => handleInputChange("ghCardUploadBack", file)}
              accept="image/*"
            />
          </div>
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
    </Card>
  );
};

PersonalInfoSection.propTypes = {
  initialData: PropTypes.object
};

export default PersonalInfoSection;