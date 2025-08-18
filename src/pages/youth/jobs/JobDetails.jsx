import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin, Clock, DollarSign, Bookmark, BookmarkCheck, ArrowLeft,
  Building2, Users, Calendar, Share2, CheckCircle
} from 'lucide-react';
import Button from '../../../components/shared/Button';
// import AppHeader from '../components/layout/AppHeader';
// import ApplicationModal from '../components/jobs/ApplicationModal';
import { getApplicationByJobId } from '../../../utils/ApplicationTracker';
import { saveJob, unsaveJob, isJobSaved, getSavedJobs } from '../../../utils/SavedJobs';

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const jobData = {
    id: id || '1',
    title: 'Frontend Developer',
    company: 'TechGhana Solutions',
    location: 'Accra, Greater Accra',
    salary: { min: 3000, max: 5000, currency: 'GHS' },
    jobType: 'Full-time',
    postedDate: '2024-01-10',
    applicationDeadline: '2024-02-15',
    description: `We are looking for a skilled Frontend Developer...`,
    requirements: [
      '2+ years of experience with React.js',
      'Proficiency in HTML, CSS, and JavaScript',
      'Experience with TypeScript',
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Git', 'Tailwind CSS'],
    benefits: ['Competitive salary', 'Health insurance', 'Flexible working hours'],
    companyInfo: {
      name: 'TechGhana Solutions',
      size: '50-100 employees',
      industry: 'Technology',
      description: 'Leading technology company in Ghana focused on digital transformation solutions.'
    }
  };

  useEffect(() => {
    if (id) {
      const application = getApplicationByJobId(id);
      setHasApplied(!!application);
    }
    // sync saved state
    try {
      setIsSaved(isJobSaved(id));
    } catch (e) {
      setIsSaved(false);
    }
  }, [id]);

  const handleBack = () => navigate(-1);
  const handleSave = () => {
    if (isSaved) {
      unsaveJob(jobData.id);
    } else {
      saveJob(jobData);
    }
    // refresh state
    setIsSaved(isJobSaved(jobData.id));
  };
  const handleApply = () => {
    if (!hasApplied) {
      // navigate to application page, passing jobData in state for convenience
      navigate(`/youth/jobs/${jobData.id}/apply`, { state: { jobData } });
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: jobData.title,
        text: `Check out this job opportunity at ${jobData.company}`,
        url: window.location.href,
      });
    }
  };

  const formatSalary = () => `${jobData.salary.currency} ${jobData.salary.min.toLocaleString()} - ${jobData.salary.max.toLocaleString()}`;
  const getTimeAgo = (date) => {
    const diffInDays = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    return `${diffInDays} days ago`;
  };

  return (
    <div >
      {/* <AppHeader /> */}

      <div className="max-w-4xl mx-auto px-4 ">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-sm text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{jobData.title}</h1>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <Building2 className="w-5 h-5" /> {jobData.company}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSave}
                    className="p-2 border rounded hover:bg-gray-100"
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Job Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {jobData.location}</div>
                <div className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {formatSalary()}</div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> Posted {getTimeAgo(jobData.postedDate)}</div>
                <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Apply by {new Date(jobData.applicationDeadline).toLocaleDateString()}</div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mt-4">
                <span className="px-2 py-1 bg-gray-200 rounded text-sm">{jobData.jobType}</span>
                <span className="px-2 py-1 border rounded text-sm">{jobData.companyInfo.industry}</span>
                {hasApplied && (
                  <span className="flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                    <CheckCircle className="w-3 h-3 mr-1" /> Applied
                  </span>
                )}
              </div>

              {/* Apply Button */}
              <Button
                onClick={handleApply}
                disabled={hasApplied}
                variant="emeraldGradient"
                size="medium"
                fullWidth={true}
                className="mt-6 sm:w-auto w-full"
              >
                {hasApplied ? 'Already Applied' : 'Apply Now'}
              </Button>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-lg mb-4">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-line">{jobData.description}</p>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-lg mb-4">Requirements</h2>
              <ul className="space-y-2">
                {jobData.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-lg mb-4">Benefits</h2>
              <ul className="space-y-2">
                {jobData.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2"></span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-lg mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {jobData.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 border rounded text-sm">{skill}</span>
                ))}
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-lg mb-4">About the Company</h2>
              <p className="text-sm text-gray-600">{jobData.companyInfo.description}</p>
              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {jobData.companyInfo.size}</div>
                <div className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {jobData.companyInfo.industry}</div>
              </div>
            </div>

            {/* Quick Apply */}
            <div className="bg-white rounded-lg shadow p-6">
              <Button
                onClick={handleApply}
                disabled={hasApplied}
                variant="emeraldGradient"
                size="medium"
                fullWidth={true}
                startIcon={hasApplied ? <CheckCircle className="w-4 h-4" /> : null}
              >
                {hasApplied ? 'Applied' : 'Apply Now'}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                {hasApplied ? 'Application submitted successfully' : 'Complete your profile for faster applications'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application is now a separate page: /jobs/:id/apply */}
    </div>
  );
}
