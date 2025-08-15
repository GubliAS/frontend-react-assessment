// Filters and sorting logic for jobs (plain JavaScript, ready for React + Tailwind)

export const searchJobs = (jobs, searchQuery, locationQuery, filters) => {
  return jobs.filter((job) => {
    // Text search filter
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // Location search filter
    const matchesLocation =
      !locationQuery ||
      job.location.toLowerCase().includes(locationQuery.toLowerCase());

    // Job type filter
    const matchesJobType =
      filters.jobTypes.length === 0 || filters.jobTypes.includes(job.jobType);

    // Location filter
    const matchesLocationFilter =
      filters.locations.length === 0 || filters.locations.includes(job.location);

    // Remote work filter
    const matchesRemoteWork =
      !filters.remoteWork || job.jobType === "Remote";

    // Date posted filter
    const matchesDatePosted =
      !filters.datePosted || checkDatePosted(job.postedDate, filters.datePosted);

    // Salary range filter
    let matchesSalary = true;
    if (filters.salaryRange && job.salary) {
      const [minRange, maxRange] = getSalaryRange(filters.salaryRange);
      const jobMaxSalary = job.salary.max;

      if (maxRange) {
        matchesSalary =
          jobMaxSalary >= minRange && jobMaxSalary <= maxRange;
      } else {
        matchesSalary = jobMaxSalary >= minRange;
      }
    }

    // Experience filter (placeholder for future implementation)
    const matchesExperience = true;

    // Company size filter (placeholder)
    const matchesCompanySize = true;

    // Categories filter (placeholder)
    const matchesCategories = filters.categories.length === 0;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesJobType &&
      matchesLocationFilter &&
      matchesRemoteWork &&
      matchesDatePosted &&
      matchesSalary &&
      matchesExperience &&
      matchesCompanySize &&
      matchesCategories
    );
  });
};

const checkDatePosted = (postedDate, filter) => {
  const now = new Date();
  const posted = new Date(postedDate);
  const diffInHours = (now - posted) / (1000 * 60 * 60);

  switch (filter) {
    case "24h":
      return diffInHours <= 24;
    case "3d":
      return diffInHours <= 72;
    case "7d":
      return diffInHours <= 168;
    case "30d":
      return diffInHours <= 720;
    default:
      return true;
  }
};

export const sortJobs = (jobs, sortBy) => {
  const jobsCopy = [...jobs];

  switch (sortBy) {
    case "newest":
      return jobsCopy.sort(
        (a, b) =>
          new Date(b.postedDate).getTime() -
          new Date(a.postedDate).getTime()
      );
    case "oldest":
      return jobsCopy.sort(
        (a, b) =>
          new Date(a.postedDate).getTime() -
          new Date(b.postedDate).getTime()
      );
    case "salary-high":
      return jobsCopy.sort(
        (a, b) => (b.salary?.max || 0) - (a.salary?.max || 0)
      );
    case "salary-low":
      return jobsCopy.sort(
        (a, b) => (a.salary?.max || 0) - (b.salary?.max || 0)
      );
    case "company":
      return jobsCopy.sort((a, b) => a.company.localeCompare(b.company));
    case "relevance":
    default:
      return jobsCopy; // Keep original order
  }
};

const getSalaryRange = (range) => {
  switch (range) {
    case "0-2000":
      return [0, 2000];
    case "2000-4000":
      return [2000, 4000];
    case "4000-6000":
      return [4000, 6000];
    case "6000-8000":
      return [6000, 8000];
    case "8000+":
      return [8000, null];
    default:
      return [0, null];
  }
};

export const getJobTypeOptions = () => [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote",
];

export const getLocationOptions = () => [
  "Accra, Greater Accra",
  "Kumasi, Ashanti",
  "Takoradi, Western",
  "Cape Coast, Central",
  "Tamale, Northern",
];

export const getJobSuggestions = () => [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Digital Marketing",
  "Project Manager",
  "UI/UX Designer",
  "Sales Representative",
  "Customer Service",
  "Administrative Assistant",
];
