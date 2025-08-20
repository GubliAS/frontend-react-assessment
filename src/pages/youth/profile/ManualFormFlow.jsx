import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/shared/Button";
import { Card, CardContent } from "../../../components/ui/card";
// import { StepIndicator } from "@/components/ui/step-indicator";
import  PersonalInfoSection from "./PersonalInfoSection";
import  WorkExperienceSection from "./WorkExperienceSection";
import EducationSection from "./EducationSection"; // Placeholder for Education section
import SkillSection from "./SkillsSections"; // Placeholder for Skills section
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";
import SkillForm from "./SkillsSections";
import CertificatesForm from "./CertificateSection";
import CareerAspirationsForm from "./CareerAspirationSection"; // Placeholder for Career Aspirations section
import PhotoUpload from "./PhotoUpload"; // Placeholder for Photo upload section

// redux hooks/selectors
import { usePersonalInfo } from "../../../redux/personaInfo/usePersonalInfo";
import { useWorkExperience } from "../../../redux/workExperienceSection/useWorkExperience";
import { useEducation } from "../../../redux/educationSection/useEducationInfo";
import { useSkills } from "../../../redux/skillsInfoSection/useSkill";
import { useCertificates } from "../../../redux/certificateSection/useCertificate";
import { usePhoto } from "../../../redux/photoSection/usePhoto";
import { useCareerAspiration } from "../../../redux/careerAspiration/useCareerAspiration";

// actions
import { setPersonalInfo } from "../../../redux/personaInfo/PersonalInfoSlice";
import { setWorkExperiences } from "../../../redux/workExperienceSection/WorkExperienceSlice";
import { setEducationList } from "../../../redux/educationSection/EducationSlice";
import { setSkills } from "../../../redux/skillsInfoSection/SkillSlice";
import { setCertificates } from "../../../redux/certificateSection/CertificateSlice";
import { setPhotoUrl } from "../../../redux/photoSection/PhotoSlice";
import { setCareerAspiration } from "../../../redux/careerAspiration/careerAspirationSlice";

const steps = [
  { id: 'personal', title: 'Personal Info', description: 'Basic information' },
  { id: 'experience', title: 'Experience', description: 'Work history' },
  { id: 'education', title: 'Education', description: 'Academic background' },
  { id: 'skills', title: 'Skills', description: 'Technical & soft skills' },    
  { id: 'certificates', title: 'Certificates', description: 'Professional certificates' },
  { id: 'career', title: 'Career Aspirations', description: 'Your career goals' },
  {id: 'photo', title: 'Profile Photo', description: 'Upload your profile photo'},
  { id: 'review', title: 'Review', description: 'Final review' }
];

export const ManualFormFlow = ({ onComplete, onPreview }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [stepValidation, setStepValidation] = useState({});
  const { toast } = useToast();

  const reduxDispatch = useDispatch();

  // selectors from redux
  const { personalInfo } = usePersonalInfo();
  const { workExperiences } = useWorkExperience();
  const { educationList } = useEducation();
  const { skills } = useSkills();
  const { certificates } = useCertificates();
  const { profilePhotoUrl } = usePhoto();
  const { careerAspiration } = useCareerAspiration();

  const handleNext = () => {
    if (currentStep < steps.length) {
      if (stepValidation[currentStep] !== false) {
        setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepValidation = (step, isValid) => {
    setStepValidation(prev => ({ ...prev, [step]: isValid }));
  };

  // Handlers that update redux slices (replace previous local form updates)
  const handlePersonalUpdate = (data) => {
    reduxDispatch(setPersonalInfo(data));
  };

  const handleWorkUpdate = (data) => {
    reduxDispatch(setWorkExperiences(data));
  };

  const handleEducationUpdate = (data) => {
    reduxDispatch(setEducationList(data));
  };

  const handleSkillsUpdate = (data) => {
    reduxDispatch(setSkills(data));
  };

  const handleCertificatesUpdate = (data) => {
    reduxDispatch(setCertificates(data));
  };

  const handlePhotoUpdate = (urlOrFile) => {
    // PhotoSlice.setPhotoUrl expects a url string; adapt if component sends file
    reduxDispatch(setPhotoUrl(urlOrFile));
  };

  const handleCareerUpdate = (data) => {
    reduxDispatch(setCareerAspiration(data));
  };

  const assembleProfile = () => ({
    personalInfo: personalInfo || {},
    workExperience: workExperiences || [],
    education: educationList || [],
    skills: skills || [],
    certificates: certificates || [],
    photoUrl: profilePhotoUrl || '',
    careerAspiration: careerAspiration || {}
  });

  const handlePreview = () => {
    onPreview(assembleProfile());
  };

  const handleComplete = () => {
    const pi = personalInfo || {};
    if (!pi.firstName || !pi.lastName || !pi.email) {
      toast({
        title: "Missing Required Information",
        description: "Please complete the personal information section.",
        variant: "destructive"
      });
      setCurrentStep(1);
      return;
    }

    onComplete(assembleProfile());
    toast({
      title: "Profile Created Successfully",
      description: "Your GTH profile has been created and saved.",
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSection
            mode="create"
            data={personalInfo}
            onUpdate={handlePersonalUpdate}
            onValidate={(isValid) => handleStepValidation(1, isValid)}
            showActions={false}
          />
        );
      case 2:
        return (
          <WorkExperienceSection
            mode="create"
            data={workExperiences}
            onUpdate={handleWorkUpdate}
            onValidate={(isValid) => handleStepValidation(2, isValid)}
            showActions={false}
          />
        );
      case 3:
        return (
          <EducationSection
            mode="create"
            data={educationList}
            onUpdate={handleEducationUpdate}
            onValidate={(isValid) => handleStepValidation(3, isValid)}
            showActions={false}
          />
        );
      case 4:
        return (
          <SkillForm
            mode="create"
            data={skills}
            onUpdate={handleSkillsUpdate}
            onValidate={(isValid) => handleStepValidation(4, isValid)}
            showActions={false}
          />
        );
      case 5:
        return (
         <CertificatesForm
           mode="create"
           data={certificates}
           onUpdate={handleCertificatesUpdate}
           onValidate={(isValid) => handleStepValidation(5, isValid)}
           showActions={false}
         />
        );
      case 6:
        return (
          <CareerAspirationsForm
            mode="create"
            data={careerAspiration}
            onUpdate={handleCareerUpdate}
            onValidate={(isValid) => handleStepValidation(6, isValid)}
            showActions={false}
          />
        );
      case 7:
        return (
         <PhotoUpload
           mode="create"
           data={profilePhotoUrl}
           onUpdate={handlePhotoUpdate}
           onValidate={(isValid) => handleStepValidation(7, isValid)}
           showActions={false}
         />
        );
      case 8:
         return (
          <div>
             <div className="text-left text-[var(--ebony-50)] space-y-2">
                <h3 className="text-2xl font-semibold">Review Your Profile</h3>
                <p className="text-muted-foreground">
                  Review your information before creating your GTH profile.
                </p>
              </div>
              <Card className="shadow-form mt-6">
            <CardContent className="p-8 space-y-6">
             

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--ebony-50)]">Personal Information</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Name:</span> {personalInfo?.firstName} {personalInfo?.lastName}</p>
                    <p><span className="font-medium">Email:</span> {personalInfo?.email}</p>
                    {personalInfo?.phone && (
                      <p><span className="font-medium">Phone:</span> {personalInfo.phone}</p>
                    )}
                    {personalInfo?.region && (
                      <p><span className="font-medium">Region:</span> {personalInfo.region}</p>
                    )}
                    {personalInfo?.city && (
                      <p><span className="font-medium">City:</span> {personalInfo.city}</p>
                    )}
                    {personalInfo?.bio && (
                      <p><span className="font-medium">Bio:</span> {personalInfo.bio}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--ebony-50)]">Profile Photo</h4>
                  <div className="text-sm">
                    {profilePhotoUrl ? (
                      <img src={profilePhotoUrl} alt="Profile" className="w-32 h-32 object-cover rounded-md" />
                    ) : (
                      <p className="text-muted-foreground">No profile photo uploaded</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--ebony-50)]">Work Experience</h4>
                  <div className="text-sm space-y-2">
                    {workExperiences && workExperiences.length > 0 ? (
                      workExperiences.map((we) => (
                        <div key={we.id || `${we.company}-${we.position}`} className="space-y-1">
                          <p className="font-semibold">{we.position} — {we.company}</p>
                          <p className="text-muted-foreground text-xs">{we.startDate || 'N/A'} — {we.isCurrentlyWorking ? 'Present' : (we.endDate || 'N/A')}</p>
                          {we.description && <p className="text-sm">{we.description}</p>}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No work experience added</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--ebony-50)]">Education</h4>
                  <div className="text-sm space-y-2">
                    {educationList && educationList.length > 0 ? (
                      educationList.map((edu) => (
                        <div key={edu.id || `${edu.institution}-${edu.degree}`} className="space-y-1">
                          <p className="font-semibold">{edu.degree} — {edu.institution}</p>
                          <p className="text-muted-foreground text-xs">{edu.startDate || 'N/A'} — {edu.isCurrentlyStudying ? 'Present' : (edu.endDate || 'N/A')}</p>
                          {edu.grade && <p className="text-sm">Grade: {edu.grade}</p>}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No education added</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--ebony-50)]">Skills</h4>
                  <div className="text-sm">
                    {skills && skills.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {skills.map(s => <li key={s.id || s.name}>{s.name}{s.proficiency ? ` — ${s.proficiency}` : ''}</li>)}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No skills added</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-[var(--ebony-50)]">Certificates</h4>
                  <div className="text-sm">
                    {certificates && certificates.length > 0 ? (
                      <ul className="space-y-1">
                        {certificates.map(c => (
                          <li key={c.id || c.name}>
                            <p className="font-semibold">{c.name} — {c.issuingOrganization}</p>
                            <p className="text-muted-foreground text-xs">{c.issueDate || 'N/A'}{c.expiryDate ? ` — ${c.expiryDate}` : ''}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">No certificates added</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 md:col-span-2">
                  <h4 className="font-medium text-[var(--ebony-50)]">Career Aspirations</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Desired Role:</span> {careerAspiration?.desiredRole || '—'}</p>
                    <p><span className="font-medium">Industry:</span> {careerAspiration?.targetIndustry || '—'}</p>
                    <p><span className="font-medium">Career Level:</span> {careerAspiration?.careerLevel || '—'}</p>
                    <p><span className="font-medium">Target Salary:</span> {careerAspiration?.targetSalary || '—'}</p>
                    <p><span className="font-medium">Timeframe:</span> {careerAspiration?.timeframe || '—'}</p>
                    <p><span className="font-medium">Work Type:</span> {careerAspiration?.workType || '—'}</p>
                    {careerAspiration?.keySkillsToGain?.length > 0 && (
                      <p><span className="font-medium">Skills to gain:</span> {careerAspiration.keySkillsToGain.join(', ')}</p>
                    )}
                    {careerAspiration?.certificationGoals?.length > 0 && (
                      <p><span className="font-medium">Certification goals:</span> {careerAspiration.certificationGoals.join(', ')}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handlePreview}
                  className="flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview Profile</span>
                </Button>
                <Button
                  onClick={handleComplete}
                  variant="emeraldGradient"
                  className="flex items-center space-x-2"
                >
                  <span>Create Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          </div>
          
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => false; // allow moving forward without validation

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* <StepIndicator
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
      /> */}

      <div className="min-h-[500px]">
        {renderCurrentStep()}
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {steps.length}
        </div>

        {currentStep < steps.length && (
          <Button
            variant="emeraldGradient"
            onClick={handleNext}
            disabled={isNextDisabled()}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};