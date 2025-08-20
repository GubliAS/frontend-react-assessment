import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import  Button  from '../../../components/shared/Button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Progress } from '../../../components/ui/progress';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  ArrowLeft,
  Eye,
  Edit3
} from 'lucide-react';
import { useToast } from '../../../hooks/use-toast';
import { useDispatch } from 'react-redux';
import { setPersonalInfo } from '../../../redux/personaInfo/PersonalInfoSlice';
import { setEducationList } from '../../../redux/educationSection/EducationSlice';
import { setWorkExperiences } from '../../../redux/workExperienceSection/WorkExperienceSlice';
import { setSkills } from '../../../redux/skillsInfoSection/SkillSlice';
import { setCertificates } from '../../../redux/certificateSection/CertificateSlice';
import { setPhotoUrl } from '../../../redux/photoSection/PhotoSlice'; // optional

const ResumeUploadPage = ({ onBackToSelection, onExtractComplete }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractionStep, setExtractionStep] = useState('idle'); // idle, uploading, extracting, complete, error
  const [extractedData, setExtractedData] = useState(null);
  const [extractionDetails, setExtractionDetails] = useState({});
  const dispatch = useDispatch();
  const { toast } = useToast();

  const resetUpload = () => {
    setFile(null);
    setIsUploading(false);
    setUploadProgress(0);
    setExtractionStep('idle');
    setExtractedData(null);
    setExtractionDetails({});
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const validTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setExtractionStep('idle');
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, DOC, or DOCX file.",
          variant: "destructive",
        });
      }
    }
  };

  const simulateAIExtraction = async (file) => {
    setIsUploading(true);
    setExtractionStep('uploading');
    
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setExtractionStep('extracting');
    
    const steps = [
      { step: 'parsing', message: 'Parsing document structure...', delay: 800 },
      { step: 'text_extraction', message: 'Extracting text content...', delay: 1000 },
      { step: 'entity_recognition', message: 'Identifying personal information...', delay: 900 },
      { step: 'work_experience', message: 'Processing work experience...', delay: 1200 },
      { step: 'education', message: 'Extracting education details...', delay: 800 },
      { step: 'skills', message: 'Identifying skills and competencies...', delay: 1000 },
      { step: 'finalizing', message: 'Finalizing extraction...', delay: 600 }
    ];

    for (const stepInfo of steps) {
      setExtractionDetails(prev => ({
        ...prev,
        currentStep: stepInfo.step,
        currentMessage: stepInfo.message
      }));
      await new Promise(resolve => setTimeout(resolve, stepInfo.delay));
    }

    const mockExtractedData = {
      personalInfo: {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@email.com',
        phone: '233 24 567 8901',
        region: 'Greater Accra',
        city: 'Accra',
        dateOfBirth: '1992-03-15',
        gender: 'Female',
        bio: 'Experienced marketing professional with 6+ years in digital marketing...'
      },
      education: [
        {
          id: Date.now(),
          institution: 'University of Ghana',
          degree: 'Bachelor of Arts',
          fieldOfStudy: 'Marketing',
          startDate: '2016-09',
          endDate: '2020-07',
          isCurrentlyStudying: false,
          grade: 'Second Class Upper'
        }
      ],
      workExperience: [
        {
          id: Date.now(),
          company: 'Digital Marketing Agency Ghana',
          position: 'Senior Marketing Specialist',
          startDate: '2022-03',
          endDate: '',
          isCurrentlyWorking: true,
          description: 'Lead digital marketing campaigns for 15+ clients...'
        }
      ],
      skills: [
        { id: 1, name: 'Digital Marketing', proficiency: 'Expert' },
        { id: 2, name: 'Google Analytics', proficiency: 'Advanced' }
      ],
      certificates: [
        {
          id: Date.now(),
          name: 'Google Analytics Certified',
          issuingOrganization: 'Google',
          issueDate: '2023-01',
          expiryDate: '2024-01',
          credentialId: 'GA-2023-001234'
        }
      ]
    };

    setExtractedData(mockExtractedData);
    setExtractionStep('complete');
    setIsUploading(false);

    toast({
      title: "Extraction Complete!",
      description: "Your resume has been successfully processed.",
    });
  };

  const handleExtractInfo = () => {
    if (file) {
      simulateAIExtraction(file);
    }
  };

  const handleUseExtractedData = () => {
    if (!extractedData) return;

    // Personal info
    if (extractedData.personalInfo) {
      dispatch(setPersonalInfo(extractedData.personalInfo));
    }

    // Education (replace list)
    if (extractedData.education) {
      dispatch(setEducationList(extractedData.education));
    }

    // Work experience (replace list)
    if (extractedData.workExperience) {
      const workList = extractedData.workExperience.map((w) => ({
        ...w,
        startDate: w.startDate || '', // ensure startDate is a string
        endDate: w.endDate || '',     // ensure endDate is a string
      }));
      dispatch(setWorkExperiences(workList));
    }

    // Skills (replace list)
    if (extractedData.skills) {
      dispatch(setSkills(extractedData.skills));
    }

    // Certificates (replace list)
    if (extractedData.certificates) {
      dispatch(setCertificates(extractedData.certificates));
    }

    // Photo URL (optional)
    if (extractedData.personalInfo?.photoUrl) {
      dispatch(setPhotoUrl(extractedData.personalInfo.photoUrl));
    }

    onExtractComplete('resume');
  };

  const handlePreviewData = () => {
    console.log('Preview extracted data:', extractedData);
  };

  if (extractionStep === 'uploading' || extractionStep === 'extracting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <Card className="p-8 max-w-lg w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-8 h-8 text-primary-foreground animate-spin" />
            </div>
            
            {extractionStep === 'uploading' && (
              <>
                <h3 className="text-xl font-semibold mb-4">Uploading Resume</h3>
                <Progress value={uploadProgress} className="mb-4" />
                <p className="text-muted-foreground">Uploading your resume file...</p>
              </>
            )}

            {extractionStep === 'extracting' && (
              <>
                <h3 className="text-xl font-semibold mb-4">Processing Your Resume</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <p className="text-muted-foreground">
                      {extractionDetails.currentMessage || 'Processing...'}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our AI is analyzing your resume. This may take a few moments.
                </p>
              </>
            )}
          </div>
        </Card>
      </div>
    );
  }

  if (extractionStep === 'complete' && extractedData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
          

            {/* Success Card */}
            <Card className="p-8 mb-8 border-green-200 bg-green-50">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-green-600 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-green-900 mb-2">
                    Resume Successfully Processed!
                  </h2>
                  <p className="text-green-700 mb-4">
                    We've extracted your information. Review and edit below.
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="emeraldGradient" onClick={handleUseExtractedData} size="lg" className="flex items-center gap-2 p-3">
                <Edit3 className="w-5 h-5" />
                Continue to Edit Profile
              </Button>
              
              <Button onClick={handlePreviewData} variant="outline" size="lg" className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Preview Full Data
              </Button>

              <Button onClick={resetUpload} variant="ghost" size="lg">
                Upload Different Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 ">
        <div className="max-w-2xl mx-auto">
        

          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[var(--ebony-50)] mb-4">Upload Your Resume</h1>
            <p className="text-xl text-muted-foreground">
              Our AI will extract and organize your information automatically
            </p>
          </div>

          {/* Upload Section */}
          <Card className="p-8 mb-8">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              {!file ? (
                <>
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Choose your resume file</h3>
                  <p className="text-muted-foreground mb-6">Upload a PDF, DOC, or DOCX file (max 10MB)</p>
                  <Label htmlFor="resume-file" className="cursor-pointer">
                    <Button variant="outline" size="lg">Select File</Button>
                  </Label>
                  <Input
                    className="border-none bg-gray-200 hover:bg-gray-300 mt-4"
                    id="resume-file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                   
                  />
                </>
              ) : (
                <div className="space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold">{file.name}</h3>
                    <p className="text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button className='p-2' variant='emeraldGradient' onClick={handleExtractInfo} size="lg">Extract Information</Button>
                    <Button onClick={resetUpload} variant="outline">Choose Different File</Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

              {/* Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                What We Extract
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Personal contact information</li>
                <li>• Work experience and positions</li>
                <li>• Education and qualifications</li>
                <li>• Skills and competencies</li>
                <li>• Certifications and awards</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                Next Steps
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Review extracted information</li>
                <li>• Edit and fill missing details</li>
                <li>• Add additional sections</li>
                <li>• Preview your complete profile</li>
                <li>• Submit for review</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage;
