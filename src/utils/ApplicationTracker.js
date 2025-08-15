
const STORAGE_KEY = 'job_applications';

export const submitApplication = async (applicationData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const application = {
        id: Date.now().toString(),
        ...applicationData,
      };

      const existingApplications = getApplications();
      const updatedApplications = [...existingApplications, application];
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplications));
      resolve(application);
    }, 1000); // Simulate API delay
  });
};

export const getApplications = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getApplicationByJobId = (jobId) => {
  const applications = getApplications();
  return applications.find(app => app.jobId === jobId);
};

export const updateApplicationStatus = (applicationId, status) => {
  const applications = getApplications();
  const updatedApplications = applications.map(app =>
    app.id === applicationId ? { ...app, status } : app
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApplications));
};

export const deleteApplication = (applicationId) => {
  const applications = getApplications();
  const filteredApplications = applications.filter(app => app.id !== applicationId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredApplications));
};

export const getApplicationStats = () => {
  const applications = getApplications();
  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'applied').length,
    reviewing: applications.filter(app => app.status === 'reviewing').length,
    interviewing: applications.filter(app => app.status === 'interviewing').length,
    offered: applications.filter(app => app.status === 'offered').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };
  return stats;
};
