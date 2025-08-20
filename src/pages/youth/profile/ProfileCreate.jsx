import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CreationModeSelector } from "./ProfileCreateMode"; // Adjust path
import { ManualFormFlow } from "./ManualFormFlow"; // Adjust path
import ResumeUploadPage  from "./AIProfileCreateFlow"; // Adjust path
const ProfileCreation = () => {
  const [mode, setMode] = useState("selection"); // 'selection' | 'manual' | 'upload' | 'preview'
  const [profileData, setProfileData] = useState(null);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleBack = () => {
    setMode("selection");
  };

  const handleFormComplete = (data) => {
    setProfileData(data);
    console.log("Profile created:", data);
    // Save to database here
  };

  const handlePreview = (data) => {
    setProfileData(data);
    setMode("preview");
  };

  const renderContent = () => {
    switch (mode) {
      case "selection":
        return <CreationModeSelector onModeSelect={handleModeSelect} />;

      case "manual":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Selection</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-semibold">Manual Profile Creation</h1>
            </div>
            <ManualFormFlow onComplete={handleFormComplete} onPreview={handlePreview} />
          </div>
        );

      case "upload":
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Selection</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-semibold">AI Resume Upload</h1>
            </div>
         <ResumeUploadPage/>
          </div>
        );

      case "preview":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setMode("manual")}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Edit</span>
                </button>
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-2xl font-semibold">Profile Preview</h1>
              </div>
              <button
                onClick={() => handleFormComplete(profileData)}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-md"
              >
                Confirm & Create Profile
              </button>
            </div>

            {profileData && (
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-6">
                  {/* Personal Info Preview */}
                  <div className="bg-white rounded-lg p-6 shadow">
                    <h3 className="text-lg font-semibold mb-4">
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Name</span>
                        <p>
                          {profileData.personalInfo.firstName}{" "}
                          {profileData.personalInfo.lastName}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Email</span>
                        <p>{profileData.personalInfo.email}</p>
                      </div>
                      {profileData.personalInfo.phone && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Phone</span>
                          <p>{profileData.personalInfo.phone}</p>
                        </div>
                      )}
                      {profileData.personalInfo.location && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Location
                          </span>
                          <p>{profileData.personalInfo.location}</p>
                        </div>
                      )}
                    </div>
                    {profileData.personalInfo.title && (
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-500">Title</span>
                        <p>{profileData.personalInfo.title}</p>
                      </div>
                    )}
                    {profileData.personalInfo.summary && (
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-500">Summary</span>
                        <p className="mt-1">{profileData.personalInfo.summary}</p>
                      </div>
                    )}
                  </div>

                  {/* Work Experience Preview */}
                  {profileData.workExperience.length > 0 && (
                    <div className="bg-white rounded-lg p-6 shadow">
                      <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
                      <div className="space-y-4">
                        {profileData.workExperience.map((exp, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-emerald-500 pl-4"
                          >
                            <h4 className="font-medium">
                              {exp.position} at {exp.company}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {exp.startDate} -{" "}
                              {exp.isCurrent ? "Present" : exp.endDate}
                              {exp.location && ` • ${exp.location}`}
                            </p>
                            {exp.description && (
                              <p className="text-sm mt-2">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div >
      <div className="max-w-6xl mx-auto">{renderContent()}</div>
    </div>
  );
}

export default ProfileCreation