import { useState } from "react";
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
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      summary: ''
    },
    workExperience: [], // ✅ Changed from object to array
    education: [], // ✅ ensures no undefined access
    skills: [], // Uncomment if you want to include skills in the form
    certificate: [], // Uncomment if you want to include certificates in the form
     photo: null // Uncomment if you want to include photo in the form
  });
  const [stepValidation, setStepValidation] = useState({});
  const { toast } = useToast();

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

  const handleWorkExperienceUpdate = (data) => {
    setFormData(prev => ({ ...prev, workExperience: data }));
  };

  const handlePersonalInfoUpdate = (data) => {
    setFormData(prev => ({ ...prev, personalInfo: data }));
  };

  const handlePreview = () => {
    onPreview(formData);
  };

  const handleComplete = () => {
    if (!formData.personalInfo.firstName || !formData.personalInfo.lastName || !formData.personalInfo.email) {
      toast({
        title: "Missing Required Information",
        description: "Please complete the personal information section.",
        variant: "destructive"
      });
      setCurrentStep(1);
      return;
    }

    onComplete(formData);
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
            data={formData.personalInfo}
            onUpdate={handlePersonalInfoUpdate}
            onValidate={(isValid) => handleStepValidation(1, isValid)}
            showActions={false}
          />
        );
      case 2:
        return (
          <WorkExperienceSection
            mode="create"
            data={formData.workExperience}
            onUpdate={handleWorkExperienceUpdate}
            onValidate={(isValid) => handleStepValidation(2, isValid)}
            showActions={false}
          />
        );
      case 3:
        return (
          <EducationSection
            mode="create"
            data={formData.education}   
            onUpdate={(data) => setFormData(prev => ({ ...prev, education: data }))}
            onValidate={(isValid) => handleStepValidation(3, isValid)}
            showActions={false}
          />
        );
      case 4:
        return (
          <SkillForm
          mode="create"
            data={formData.skills}   
            onUpdate={(data) => setFormData(prev => ({ ...prev, skills: data }))}
            onValidate={(isValid) => handleStepValidation(3, isValid)}
            showActions={false}/>
        );
      case 5:
        return (
       <CertificatesForm
       mode="create"
       data={formData.certificate}
         onUpdate={(data) => setFormData(prev => ({ ...prev, certificate: data }))}
            onValidate={(isValid) => handleStepValidation(4, isValid)}
         showActions={false}
       />)
       case 6:
        return (
        <CareerAspirationsForm />)
      case 7:
        return (
       <PhotoUpload
       mode="create"
       data={formData.certificate}
        onUpdate={(data) => setFormData(prev => ({ ...prev, photo: data }))}
        onValidate={(isValid) => handleStepValidation(4, isValid)}
         showActions={false}
       />)
      case 8:
         return (
          <Card className="shadow-form">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">Review Your Profile</h3>
                <p className="text-muted-foreground">
                  Review your information before creating your GTH profile.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Personal Information</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Name:</span> {formData.personalInfo.firstName} {formData.personalInfo.lastName}</p>
                    <p><span className="font-medium">Email:</span> {formData.personalInfo.email}</p>
                    {formData.personalInfo.phone && (
                      <p><span className="font-medium">Phone:</span> {formData.personalInfo.phone}</p>
                    )}
                    {formData.personalInfo.location && (
                      <p><span className="font-medium">Location:</span> {formData.personalInfo.location}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Work Experience</h4>
                  <div className="text-sm">
                    {formData.workExperience.length > 0 ? (
                      <p>{formData.workExperience.length} experience(s) added</p>
                    ) : (
                      <p className="text-muted-foreground">No work experience added</p>
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