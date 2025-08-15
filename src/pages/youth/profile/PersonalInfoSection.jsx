import React from "react";
import InputField from "../../../components/shared/InputField";
import SelectField from "../../../components/shared/SelectInputField";
import PropTypes from "prop-types";
import { usePersonalInfo } from "../../../redux/personaInfo/usePersonalInfo";
import { setPersonalInfo } from "../../../redux/personaInfo/PersonalInfoSlice";

const GHANA_REGIONS = [
  "Greater Accra", "Ashanti", "Western", "Central", "Volta", "Eastern", "Northern",
  "Upper East", "Upper West", "Brong-Ahafo", "Western North", "Ahafo",
  "Bono", "Bono East", "North East", "Savannah", "Oti"
];

const PersonalInfoSection = () => {
  const { personalInfo, dispatch } = usePersonalInfo();

  const handleInputChange = (field, value) => {
    dispatch(setPersonalInfo({ [field]: value }));
  };

  return (
    <div className="space-y-6">
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
        />

        <InputField
          label="Last Name"
          name="lastName"
          value={personalInfo.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          placeholder="Enter your last name"
          required
        />

        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={personalInfo.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          required
        />

        <SelectField
          label="Gender"
          name="gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
            { value: "prefer-not-to-say", label: "Prefer not to say" },
          ]}
          value={personalInfo.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
        />

        <SelectField
          label="Region"
          name="region"
          required
          options={GHANA_REGIONS.map((region) => ({
            value: region,
            label: region
          }))}
          value={personalInfo.region}
          onChange={(e) => handleInputChange("region", e.target.value)}
        />

        <InputField
          label="City"
          name="city"
          value={personalInfo.city}
          onChange={(e) => handleInputChange("city", e.target.value)}
          placeholder="Enter your city"
        />

        <InputField
          label="Phone Number"
          type="tel"
          name="phone"
          value={personalInfo.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="+233 XXX XXX XXX"
        />

        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="your.email@example.com"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium text-gray-700">
          Professional Bio *
        </label>
        <textarea
          id="bio"
          value={personalInfo.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder="Write a brief description about yourself, your career goals, and what makes you unique..."
          rows={4}
          className="flex w-full rounded-md border px-3 py-2 text-sm 
            bg-white/10 border-white/20 text-white placeholder:text-gray-400 
            focus:border-[rgb(151,177,150)] focus:ring-[rgb(151,177,150)]/50 
            focus:bg-white/15 hover:border-[rgb(151,177,150)]/50 
            backdrop-blur-sm transition-all duration-300"
          required
        />
        <p className="text-xs text-gray-500">
          {personalInfo.bio.length}/500 characters
        </p>
      </div>
    </div>
  );
};

PersonalInfoSection.propTypes = {
  initialData: PropTypes.object
};

export default PersonalInfoSection;
