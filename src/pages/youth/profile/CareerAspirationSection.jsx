import React, { useState } from "react";
import { 
  Target, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Users, 
  Plus, 
  X, 
  Briefcase,
  Building,
  Clock,
  Award
} from "lucide-react";
import { useCareerAspiration } from "../../../redux/careerAspiration/useCareerAspiration";
import Button from "../../../components/shared/Button";
import InputField from "../../../components/shared/InputField";
import SelectField from "../../../components/shared/SelectInputField";
// Added imports for profile persistence and toast
import { updateProfile } from '../../../services/profile';
import { useToast } from '../../../hooks/use-toast';
import { useDispatch } from 'react-redux';
import { loadProfile } from '../../../redux/profile/profileActions';

const CareerAspirationsForm = () => {
  const {
    careerAspiration,
    setCareerField,
    setExpectedSalary,
    addCareerInterest,
    removeCareerInterest,
    addDesiredJobTitle,
    removeDesiredJobTitle,
    addTargetIndustry,
    removeTargetIndustry,
    addPreferredJobLocation,
    removePreferredJobLocation,
    addPreferredJobType,
    removePreferredJobType,
    addSkill,
    removeSkill,
    addCertification,
    removeCertification,
  } = useCareerAspiration();

  // Added toast and store dispatch for profile persistence
  const { toast } = useToast();
  const storeDispatch = useDispatch();

  console.log("Career Aspiration State:", careerAspiration);

  // Input states for adding new items
  const [newCareerInterest, setNewCareerInterest] = useState("");
  const [newDesiredJobTitle, setNewDesiredJobTitle] = useState("");
  const [newTargetIndustry, setNewTargetIndustry] = useState("");
  const [newPreferredLocation, setNewPreferredLocation] = useState("");
  const [newPreferredJobType, setNewPreferredJobType] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  // Persist career aspirations to profile API
  const persistCareerAspiration = async (aspirationData) => {
    try {
      // If caller passed { careerAspiration: { ... } } unwrap it so updateProfile
      // receives the actual field keys at top-level (backend update expects field keys).
      const payload = aspirationData && aspirationData.careerAspiration
        ? { ...aspirationData.careerAspiration }
        : { ...aspirationData };

      console.log('Persisting career aspiration payload (flattened):', payload);

      await updateProfile(payload);
      // Refresh canonical profile so all slices remain in sync
      await storeDispatch(loadProfile());
      toast?.({
        title: 'Profile updated',
        description: 'Career aspirations saved successfully.'
      });
    } catch (err) {
      console.error('Failed to save career aspiration to profile:', err);
      toast?.({
        title: 'Save failed',
        description: err?.message || 'Failed to save career aspirations.',
        variant: 'destructive',
      });
      throw err;
    }
  };

  // Helper function to create tag elements
  // changed signature: (items, removeFunction, arrayKey, colorClass)
  const renderTags = (items, removeFunction, arrayKey, colorClass = "bg-blue-100 text-blue-800") => (
    <div className="flex flex-wrap gap-2 mt-2">
      {items && items.map((item, index) => (
        <span
          key={index}
          className={`flex items-center gap-1 ${colorClass} px-3 py-1 rounded-full text-sm font-medium`}
        >
          {item}
          <button 
            onClick={async () => {
              // update local slice first
              removeFunction(item);

              // Persist only the changed field (arrayKey) — backend expects field key at top-level
              const updatedArray = (careerAspiration[arrayKey] || []).filter(i => i !== item);
              await persistCareerAspiration({ [arrayKey]: updatedArray }).catch(() => {});
            }}
            className="hover:bg-black hover:bg-opacity-10 rounded-full p-0.5 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );

  // Helper function to handle adding items with persistence
  const handleAddItem = async (value, addFunction, resetFunction, arrayKey) => {
    if (value.trim()) {
      addFunction(value.trim());
      resetFunction("");
      
      // Persist only the changed field
      const updatedArray = [...(careerAspiration[arrayKey] || []), value.trim()];
      await persistCareerAspiration({ [arrayKey]: updatedArray }).catch(() => {});
    }
  };

  // Handle salary changes with persistence
  const handleSalaryChange = async (field, value) => {
    // update slice (expects { field, value } shape)
    setExpectedSalary({ field, value: value === "" ? null : parseInt(value, 10) || null });
    
    const updatedSalary = {
      ...careerAspiration.expectedSalary,
      [field]: value === "" ? null : parseInt(value, 10) || null
    };
    
    // Persist only expectedSalary object
    await persistCareerAspiration({ expectedSalary: updatedSalary }).catch(() => {});
  };

  // Industry options
  const industryOptions = [
    "Technology", "Finance", "Healthcare", "Education", "Manufacturing",
    "Retail", "Consulting", "Media & Entertainment", "Non-profit", 
    "Government", "Construction", "Hospitality", "Real Estate", "Other"
  ];

  // Job type options
  const jobTypeOptions = [
    "Full-time", "Part-time", "Contract", "Freelance", "Remote", 
    "Hybrid", "On-site", "Temporary", "Internship"
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Career Aspirations</h2>
        <p className="text-gray-600 mt-2">
          Help us understand your career goals to provide personalized recommendations and identify opportunities
        </p>
      </div>

      {/* Career Interests */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold flex items-center mb-4">
          <Target className="w-5 h-5 mr-2 text-purple-600" /> 
          Career Interests
        </h3>
        <div className="flex gap-2 mb-4">
          <InputField
            name="newCareerInterest"
            className="flex-1"
            variant="light"
            value={newCareerInterest}
            onChange={(e) => setNewCareerInterest(e.target.value)}
            placeholder="e.g., Full-stack Development, Data Science"
            onKeyDown={(e) => e.key === "Enter" && handleAddItem(
              newCareerInterest, 
              addCareerInterest, 
              setNewCareerInterest, 
              'careerInterests'
            )}
          />
          <Button
            variant="emeraldGradient"
            size="small"
            onClick={() => handleAddItem(
              newCareerInterest, 
              addCareerInterest, 
              setNewCareerInterest, 
              'careerInterests'
            )}
            className="!px-4 !py-2 h-10 flex items-center justify-center rounded-md"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {renderTags(careerAspiration?.careerInterests, removeCareerInterest, 'careerInterests', "bg-purple-100 text-purple-800")}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Desired Job Titles */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <Briefcase className="w-5 h-5 mr-2 text-blue-600" /> 
            Desired Job Titles
          </h3>
          <div className="flex gap-2 mb-4">
            <InputField
              name="newDesiredJobTitle"
              className="flex-1"
              variant="light"
              value={newDesiredJobTitle}
              onChange={(e) => setNewDesiredJobTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              onKeyDown={(e) => e.key === "Enter" && handleAddItem(
                newDesiredJobTitle, 
                addDesiredJobTitle, 
                setNewDesiredJobTitle, 
                'desiredJobTitles'
              )}
            />
            <Button
              variant="emeraldGradient"
              size="small"
              onClick={() => handleAddItem(
                newDesiredJobTitle, 
                addDesiredJobTitle, 
                setNewDesiredJobTitle, 
                'desiredJobTitles'
              )}
              className="!px-4 !py-2 h-10 flex items-center justify-center rounded-md"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {renderTags(careerAspiration.desiredJobTitles, removeDesiredJobTitle, 'desiredJobTitles', "bg-blue-100 text-blue-800")}
        </div>

        {/* Target Industries */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <Building className="w-5 h-5 mr-2 text-green-600" /> 
            Target Industries
          </h3>
          <div className="flex gap-2 mb-4">
            <SelectField
              variant="light"
              name="newTargetIndustry"
              className="flex-1"
              value={newTargetIndustry}
              onChange={(e) => setNewTargetIndustry(e.target.value)}
              options={[
                { value: "", label: "Select an industry" },
                ...industryOptions.map(industry => ({ 
                  value: industry, 
                  label: industry 
                }))
              ]}
            />
            <Button
              variant="emeraldGradient"
              size="small"
              onClick={() => handleAddItem(
                newTargetIndustry, 
                addTargetIndustry, 
                setNewTargetIndustry, 
                'targetIndustries'
              )}
              className="!px-4 !py-2 h-10 flex items-center justify-center rounded-md"
              disabled={!newTargetIndustry}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {renderTags(careerAspiration.targetIndustries, removeTargetIndustry, 'targetIndustries', "bg-green-100 text-green-800")}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Preferred Job Locations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <MapPin className="w-5 h-5 mr-2 text-red-600" /> 
            Preferred Job Locations
          </h3>
          <div className="flex gap-2 mb-4">
            <InputField
              name="newPreferredLocation"
              className="flex-1"
              variant="light"
              value={newPreferredLocation}
              onChange={(e) => setNewPreferredLocation(e.target.value)}
              placeholder="e.g., New York, Remote, San Francisco"
              onKeyDown={(e) => e.key === "Enter" && handleAddItem(
                newPreferredLocation, 
                addPreferredJobLocation, 
                setNewPreferredLocation, 
                'preferredJobLocations'
              )}
            />
            <Button
              variant="emeraldGradient"
              size="small"
              onClick={() => handleAddItem(
                newPreferredLocation, 
                addPreferredJobLocation, 
                setNewPreferredLocation, 
                'preferredJobLocations'
              )}
              className="!px-4 !py-2 h-10 flex items-center justify-center rounded-md"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {renderTags(careerAspiration.preferredJobLocations, removePreferredJobLocation, 'preferredJobLocations', "bg-red-100 text-red-800")}
        </div>

        {/* Preferred Job Types */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" /> 
            Preferred Job Types
          </h3>
          <div className="flex gap-2 mb-4">
            <SelectField
              variant="light"
              name="newPreferredJobType"
              className="flex-1"
              value={newPreferredJobType}
              onChange={(e) => setNewPreferredJobType(e.target.value)}
              options={[
                { value: "", label: "Select a job type" },
                ...jobTypeOptions.map(type => ({ 
                  value: type, 
                  label: type 
                }))
              ]}
            />
            <Button
              variant="emeraldGradient"
              size="small"
              onClick={() => handleAddItem(
                newPreferredJobType, 
                addPreferredJobType, 
                setNewPreferredJobType, 
                'preferredJobTypes'
              )}
              className="!px-4 !py-2 h-10 flex items-center justify-center rounded-md"
              disabled={!newPreferredJobType}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {renderTags(careerAspiration.preferredJobTypes, removePreferredJobType, 'preferredJobTypes', "bg-indigo-100 text-indigo-800")}
        </div>
      </div>

      {/* Expected Salary & Timeline */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <DollarSign className="w-5 h-5 mr-2 text-emerald-600" /> 
            Expected Salary Range
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InputField
                label="Minimum ($)"
                name="salaryMin"
                type="number"
                variant="light"
                value={careerAspiration.expectedSalary?.min || ""}
                onChange={(e) => handleSalaryChange("min", e.target.value)}
                placeholder="50000"
              />
            </div>
            <div>
              <InputField
                label="Maximum ($)"
                name="salaryMax"
                type="number"
                variant="light"
                value={careerAspiration.expectedSalary?.max || ""}
                onChange={(e) => handleSalaryChange("max", e.target.value)}
                placeholder="120000"
              />
            </div>
          </div>
        </div>

            {/* Skills to Gain */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <Users className="w-5 h-5 mr-2 text-orange-600" /> 
          Key Skills to Gain
        </h3>
        <div className="flex gap-2 mb-4">
          <InputField
            name="newSkill"
            className="flex-1"
            variant="light"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g., React, Python, Project Management"
            onKeyDown={(e) => e.key === "Enter" && handleAddItem(
              newSkill, 
              addSkill, 
              setNewSkill, 
              'keySkillsToGain'
            )}
          />
          <Button
            variant="emeraldGradient"
            size="small"
            onClick={() => handleAddItem(
              newSkill, 
              addSkill, 
              setNewSkill, 
              'keySkillsToGain'
            )}
            className="!px-4 !py-2 h-10 flex items-center justify-center rounded-md"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {renderTags(careerAspiration.keySkillsToGain, removeSkill, 'keySkillsToGain', "bg-orange-100 text-orange-800")}
      </div>
      </div>

  

    </div>
  );
};

export default CareerAspirationsForm;