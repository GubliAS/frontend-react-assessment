import React from 'react';
import JobCard from './JobCard';

const JobGrid = ({
  jobs,
  savedJobs,
  onSaveJob,
  onViewJob
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          {...job}
          isSaved={savedJobs.includes(job.id)}
          onSave={onSaveJob}
          onView={onViewJob}
        />
      ))}
    </div>
  );
};

export default JobGrid;