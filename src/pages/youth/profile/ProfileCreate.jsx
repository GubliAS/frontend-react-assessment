import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { CreationModeSelector } from "./ProfileCreateMode"; // Adjust path
import { ManualFormFlow } from "./ManualFormFlow"; // Adjust path
import ResumeUploadPage  from "./AIProfileCreateFlow"; // Adjust path
import { createProfile } from "../../../services/profile"; // <-- new
import { useToast } from "../../../hooks/use-toast"; // optional: consistent toast UI
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../../redux/profile/profileActions"; // new

const ProfileCreation = () => {
  const [mode, setMode] = useState("selection"); // 'selection' | 'manual' | 'upload' | 'preview'
  const [profileData, setProfileData] = useState(null);

  const dispatch = useDispatch();
  const personalInfo = useSelector((s) => s.personalInfo?.personalInfo);

  const { toast } = useToast(); // <-- new
  const navigate = useNavigate(); // <-- new

  // load profile on mount and populate slices
  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);

  // if personal info exists after load, switch to manual edit mode so inputs are populated
  useEffect(() => {
    if (personalInfo && (personalInfo.firstName || personalInfo.email)) {
      setMode("manual");
    }
  }, [personalInfo]);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
  };

  const handleBack = () => {
    setMode("selection");
  };

  // Make this async and call API to persist profile
  const handleFormComplete = async (data) => {
    setProfileData(data);
    try {
      const res = await createProfile(data);
      // success feedback
      toast?.({
        title: "Profile created",
        description: "Your GTH profile was created successfully.",
      });
      // navigate to a suitable page (adjust path if needed)
      navigate("/youth/dashboard");
      console.log("Profile created:", res);
    } catch (err) {
      console.error("Failed to create profile:", err);
      toast?.({
        title: "Failed to create profile",
        description: err?.message || "An error occurred while creating your profile.",
        variant: "destructive"
      });
    }
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

            {personalInfo && (
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
                          {personalInfo?.firstName}{" "}
                          {personalInfo?.lastName}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Email</span>
                        <p>{personalInfo?.email}</p>
                      </div>
                      {personalInfo?.phoneNumber && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">Phone</span>
                          <p>{personalInfo.phoneNumber}</p>
                        </div>
                      )}
                      {personalInfo?.location && (
                        <div>
                          <span className="text-sm font-medium text-gray-500">
                            Location
                          </span>
                          <p>{personalInfo.location}</p>
                        </div>
                      )}
                    </div>
                    {personalInfo?.title && (
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-500">Title</span>
                        <p>{personalInfo.title}</p>
                      </div>
                    )}
                    {personalInfo?.summary && (
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-500">Summary</span>
                        <p className="mt-1">{personalInfo.summary}</p>
                      </div>
                    )}
                  </div>

                  {/* Work Experience Preview */}
                  {personalInfo.workExperience?.length > 0 && (
                    <div className="bg-white rounded-lg p-6 shadow">
                      <h3 className="text-lg font-semibold mb-4">Work Experience</h3>
                      <div className="space-y-4">
                        {workExperience.map((exp, index) => (
                          <div
                            key={index}
                            className="border-l-2 border-emerald-500 pl-4"
                          >
                            <h4 className="font-medium">
                              {exp.position} at {exp.company}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {exp.startYear} -{" "}
                              {exp.isCurrent ? "Present" : exp.endYear}
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