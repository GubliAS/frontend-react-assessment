import React, { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import Button from '../../../components/shared/Button';
import { Card, CardContent } from '../../../components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../../../components/ui/pagination';
import JobCard from '../../../components/jobs/JobCard';
import JobGrid from '../../../components/jobs/JobGrid';
import FilterSidebar from '../../../components/jobs/FilterSidebar';
import SearchBar from '../../../components/jobs/SearchBar';
import ViewModeToggle from '../../../components/jobs/ViewModeToggle';
import SortOptions from '../../../components/jobs/SortOptions';
// import AppHeader from '@/components/layout/AppHeader';
import { useNavigate } from 'react-router-dom';
import { searchJobs, sortJobs, getJobSuggestions } from '../../../utils/JobSearch';
import InputField from '../../../components/shared/InputField'; // ✅ Using your custom InputField
import { saveJob, unsaveJob, getSavedJobs } from '../../../utils/SavedJobs';

const JobSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    jobTypes: [],
    locations: [],
    salaryRange: '',
    experience: '',
    datePosted: '',
    companySize: '',
    remoteWork: false,
    categories: []
  });

  const navigate = useNavigate();
  const jobsPerPage = 10;

  // Mock job data
  const mockJobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechGhana Solutions',
      location: 'Accra, Greater Accra',
      salary: { min: 3000, max: 5000, currency: 'GHS' },
      jobType: 'Full-time',
      postedDate: '2024-01-10',
      description:
        'We are looking for a skilled Frontend Developer to join our dynamic team in Accra. Experience with React and TypeScript required.',
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS']
    },
    {
      id: '2',
      title: 'Digital Marketing Specialist',
      company: 'Ghana Marketing Hub',
      location: 'Kumasi, Ashanti',
      salary: { min: 2500, max: 4000, currency: 'GHS' },
      jobType: 'Full-time',
      postedDate: '2024-01-12',
      description:
        'Join our marketing team to develop and execute digital marketing campaigns for local and international clients.',
      skills: ['Social Media', 'SEO', 'Content Marketing', 'Analytics']
    },
    {
      id: '3',
      title: 'Junior Data Analyst',
      company: 'DataFlow Ghana',
      location: 'Takoradi, Western',
      jobType: 'Internship',
      postedDate: '2024-01-08',
      description:
        'Great opportunity for recent graduates to start their career in data analysis. Training provided.',
      skills: ['Excel', 'SQL', 'Python', 'Statistics']
    },
    {
      id: '4',
      title: 'Remote Web Developer',
      company: 'Global Tech Solutions',
      location: 'Accra, Greater Accra',
      salary: { min: 4000, max: 7000, currency: 'GHS' },
      jobType: 'Remote',
      postedDate: '2024-01-15',
      description:
        'Work remotely as a web developer building modern applications for international clients.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS']
    }
  ];

  // Filter and sort jobs
  const processedJobs = useMemo(() => {
    const filtered = searchJobs(mockJobs, searchQuery, location, filters);
    return sortJobs(filtered, sortBy);
  }, [searchQuery, location, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(processedJobs.length / jobsPerPage);
  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    return processedJobs.slice(start, end);
  }, [processedJobs, currentPage, jobsPerPage]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleSaveJob = (jobId) => {
    const isSaved = savedJobs.includes(jobId);
    if (isSaved) {
      unsaveJob(jobId);
    } else {
      // find job from current processed list or mockJobs
      const job = processedJobs.find((j) => j.id === jobId) || mockJobs.find((j) => j.id === jobId);
      if (job) saveJob(job);
    }
    // refresh local ids
    const stored = getSavedJobs();
    setSavedJobs(Array.isArray(stored) ? stored.map((j) => j.id) : []);
  };

  const handleViewJob = (jobId) => {
    navigate(`/youth/jobs/${jobId}`);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      jobTypes: [],
      locations: [],
      salaryRange: '',
      experience: '',
      datePosted: '',
      companySize: '',
      remoteWork: false,
      categories: []
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // load saved jobs from storage (store as array of ids for quick checks)
  React.useEffect(() => {
    try {
      const stored = getSavedJobs();
      setSavedJobs(Array.isArray(stored) ? stored.map((j) => j.id) : []);
    } catch (e) {
      setSavedJobs([]);
    }
  }, []);

  return (
   <>
      {/* <AppHeader /> */}

      {/* Header */}
      {/* <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Dream Job</h1>
            <p className="mt-2 text-gray-600">Discover opportunities across Ghana</p>
          </div>
        </div>
      </div> */}

      {/* Search Section */}
      <div>
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    suggestions={getJobSuggestions()}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  <InputField
                    name="location"
                    placeholder="City or region in Ghana"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="emeraldGradient" onClick={handleSearch} className="px-8">
                  Search Jobs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="flex gap-4">
          {/* Filters Sidebar */}
          <div className="w-64 hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Job Results */}
          <div className="flex-1 ">
            <div className="mb-4 flex items-center justify-between flex-wrap gap-4 ">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Job Opportunities</h2>
                <p className="text-sm text-gray-500">{processedJobs.length} jobs found</p>
              </div>
              <div className="flex items-center gap-4">
                <SortOptions sortBy={sortBy} onSortChange={handleSortChange} />
                <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
              </div>
            </div>

            {paginatedJobs.length > 0 ? (
              <>
                {viewMode === 'list' ? (
                  <div className="space-y-4">
                    {paginatedJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        {...job}
                        isSaved={savedJobs.includes(job.id)}
                        onSave={handleSaveJob}
                        onView={handleViewJob}
                      />
                    ))}
                  </div>
                ) : (
                  <JobGrid
                    jobs={paginatedJobs}
                    savedJobs={savedJobs}
                    onSaveJob={handleSaveJob}
                    onViewJob={handleViewJob}
                  />
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            className={
                              currentPage === 1
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                            }
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              handlePageChange(Math.min(totalPages, currentPage + 1))
                            }
                            className={
                              currentPage === totalPages
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your search or filters.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
 </>
  );
};

export default JobSearch;
