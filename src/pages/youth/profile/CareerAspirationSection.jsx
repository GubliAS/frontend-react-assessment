import React, { useState } from "react";
import { Target, TrendingUp, MapPin, DollarSign, Users, Plus, X } from "lucide-react";
import { useCareerAspiration } from "../../../redux/careerAspiration/useCareerAspiration";
import Button from "../../../components/shared/Button";
import InputField from "../../../components/shared/InputField";
import SelectField from "../../../components/shared/SelectInputField";

const CareerAspirationsForm = () => {
  const {
    careerAspiration,
    setCareerField,
    addSkill: dispatchAddSkill,
    removeSkill: dispatchRemoveSkill,
    addCertification: dispatchAddCertification,
    removeCertification: dispatchRemoveCertification,
  } = useCareerAspiration();

  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const handleInputChange = (field, value) => {
    setCareerField(field, value);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      dispatchAddSkill(newSkill.trim());
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    // using value-based removal from the slice
    const skill = careerAspiration.keySkillsToGain[index];
    if (skill) dispatchRemoveSkill(skill);
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      dispatchAddCertification(newCertification.trim());
      setNewCertification("");
    }
  };

  const removeCertification = (index) => {
    const cert = careerAspiration.certificationGoals[index];
    if (cert) dispatchRemoveCertification(cert);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className=" mb-8">
       
        <h2 className="text-2xl font-bold text-gray-900">Career Aspirations</h2>
        <p className="text-gray-600 mt-2">
          Help us understand your career goals to provide personalized recommendations and identify skill gaps
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Career Goals */}
        <div className=" rounded-xl shadow-sm p-4 bg-white">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" /> Career Goals
          </h3>
          <div className="space-y-4">
            <div>
              <InputField
                label="Desired Role/Position"
                name="desiredRole"
                required
                value={careerAspiration.desiredRole}
                onChange={(e) => handleInputChange("desiredRole", e.target.value)}
                placeholder="e.g., Senior Software Engineer"
                variant="light"
              />
            </div>

            <div>
              <SelectField
                variant="light"
                label="Target Industry *"
                name="targetIndustry"
                value={careerAspiration.targetIndustry}
                onChange={(e) => handleInputChange("targetIndustry", e.target.value)}
                options={[
                  // ensure select uses light styling on white cards
                  { value: "technology", label: "Technology" },
                   { value: "finance", label: "Finance" },
                   { value: "healthcare", label: "Healthcare" },
                   { value: "education", label: "Education" },
                   { value: "manufacturing", label: "Manufacturing" },
                   { value: "retail", label: "Retail" },
                   { value: "consulting", label: "Consulting" },
                   { value: "media", label: "Media & Entertainment" },
                   { value: "nonprofit", label: "Non-profit" },
                   { value: "government", label: "Government" },
                   { value: "other", label: "Other" },
                ]}
                required
                
              />
            </div>

            <div>
              <SelectField
                variant="light"
                label="Career Level *"
                name="careerLevel"
                value={careerAspiration.careerLevel}
                onChange={(e) => handleInputChange("careerLevel", e.target.value)}
                options={[
                  { value: "entry-level", label: "Entry Level" },
                  { value: "mid-level", label: "Mid Level" },
                  { value: "senior-level", label: "Senior Level" },
                  { value: "lead", label: "Lead/Principal" },
                  { value: "management", label: "Management" },
                  { value: "executive", label: "Executive" },
                ]}
                required
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className=" rounded-xl shadow-sm p-4 bg-white">
          <h3 className="text-lg font-semibold flex items-center mb-4">
            <MapPin className="w-5 h-5 mr-2 text-green-600" /> Work Preferences
          </h3>
          <div className="space-y-4">
            <div>
              <InputField
                label="Target Salary Range"
                name="targetSalary"
                value={careerAspiration.targetSalary}
                onChange={(e) => handleInputChange("targetSalary", e.target.value)}
                placeholder="e.g., $80,000 - $120,000"
                variant="light"
              />
            </div>

            <div>
              <InputField
                label="Preferred Location"
                name="location"
                value={careerAspiration.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Remote, New York"
                variant="light"
              />
            </div>

            <div>
              <SelectField
                variant="light"
                label="Work Type"
                name="workType"
                value={careerAspiration.workType}
                onChange={(e) => handleInputChange("workType", e.target.value)}
                options={[
                  { value: "full-time", label: "Full-time" },
                  { value: "part-time", label: "Part-time" },
                  { value: "contract", label: "Contract" },
                  { value: "freelance", label: "Freelance" },
                  { value: "remote", label: "Remote" },
                  { value: "hybrid", label: "Hybrid" },
                  { value: "flexible", label: "Flexible" },
                ]}
              />
            </div>

            <div>
              <SelectField
                variant="light"
                label="Timeline to Achieve"
                name="timeframe"
                value={careerAspiration.timeframe}
                onChange={(e) => handleInputChange("timeframe", e.target.value)}
                options={[
                  { value: "3-months", label: "Within 3 months" },
                  { value: "6-months", label: "Within 6 months" },
                  { value: "1-year", label: "Within 1 year" },
                  { value: "2-years", label: "Within 2 years" },
                  { value: "3-years", label: "Within 3 years" },
                  { value: "flexible", label: "Flexible timeline" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills to Gain */}
      <div className=" rounded-xl shadow-sm p-4 bg-white">
        <h3 className="flex items-center text-lg font-semibold mb-2">
          <Users className="w-5 h-5 mr-2 text-orange-600" /> Key Skills to Gain
        </h3>
        <div className="flex gap-2 mb-4">
          <InputField
            name="newSkill"
            className="flex-1"
            variant="light"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill (e.g., React)"
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
          />
          <Button
            variant="emeraldGradient"
            size="small"
            onClick={addSkill}
            startIcon={<Plus className="w-4 h-4" />}
            className="!px-0 !py-0 h-10 w-10 flex items-center justify-center rounded-md"
            aria-label="Add skill"
          >
            <span className="sr-only">Add</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {careerAspiration.keySkillsToGain.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm"
            >
              {skill}
              <button onClick={() => removeSkill(index)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Certification Goals */}
      <div className=" rounded-xl shadow-sm p-4 bg-white">
        <h3 className="flex items-center text-lg font-semibold mb-2">
          <DollarSign className="w-5 h-5 mr-2 text-purple-600" /> Certification Goals
        </h3>
        <div className="flex gap-2 mb-4">
          <InputField
            name="newCertification"
            className="flex-1"
            variant="light"
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            placeholder="Enter certification (e.g., AWS Solutions Architect)"
            onKeyDown={(e) => e.key === "Enter" && addCertification()}
          />
          <Button
            variant="emeraldGradient"
            size="small"
            onClick={addCertification}
            startIcon={<Plus className="w-4 h-4 " />}
            className="!px-0 !py-0 h-10 w-10 flex items-center justify-center rounded-md"
            aria-label="Add certification"
          >
            <span className="sr-only">Add</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {careerAspiration.certificationGoals.map((cert, index) => (
            <span
              key={index}
              className="flex items-center gap-1 border px-2 py-1 rounded-md text-sm"
            >
              {cert}
              <button onClick={() => removeCertification(index)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerAspirationsForm;
