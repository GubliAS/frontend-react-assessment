const STORAGE_KEY = 'saved_jobs';

export const saveJob = (job) => {
  const savedJobs = getSavedJobs();
  const isAlreadySaved = savedJobs.some(savedJob => savedJob.id === job.id);
  
  if (!isAlreadySaved) {
    const updatedJobs = [...savedJobs, { ...job, savedAt: new Date().toISOString() }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
  }
};

export const unsaveJob = (jobId) => {
  const savedJobs = getSavedJobs();
  const filteredJobs = savedJobs.filter(job => job.id !== jobId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredJobs));
};

export const getSavedJobs = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const isJobSaved = (jobId) => {
  const savedJobs = getSavedJobs();
  return savedJobs.some(job => job.id === jobId);
};

export const clearAllSavedJobs = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getSavedJobsCount = () => {
  return getSavedJobs().length;
};