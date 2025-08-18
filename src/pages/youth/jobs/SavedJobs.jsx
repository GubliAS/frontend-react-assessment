import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/shared/Button";
import { Card } from "../../../components/ui/card";
import JobCard from "../../../components/jobs/JobCard";
import { getSavedJobs, unsaveJob, clearAllSavedJobs } from "../../../utils/SavedJobs";

export default function SavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    setSavedJobs(getSavedJobs());
  }, []);

  const handleViewJob = (jobId) => navigate(`/youth/jobs/${jobId}`);

  const handleUnsave = (jobId) => {
    unsaveJob(jobId);
    setSavedJobs(getSavedJobs());
  };

  const handleClearAll = () => {
    clearAllSavedJobs();
    setSavedJobs([]);
  };

  return (
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Saved Jobs</h1>
            <p className="mt-1 text-sm text-gray-500">
              Jobs you saved to review or apply later
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/youth/jobs")}>
              Browse Jobs
            </Button>
            <Button
              variant="ghost"
              onClick={handleClearAll}
              disabled={savedJobs.length === 0}
            >
              Clear All
            </Button>
          </div>
        </div>

       
          {savedJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">You haven't saved any jobs yet.</p>
              <Link
                to="/youth/jobs"
                className="inline-block mt-4 text-green-600 underline"
              >
                Browse jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  isSaved={true}
                  onSave={() => handleUnsave(job.id)}
                  onView={() => handleViewJob(job.id)}
                />
              ))}
            </div>
          )}
       
      </div>
  
  );
}
