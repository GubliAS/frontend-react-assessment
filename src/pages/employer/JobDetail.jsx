import React from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  
  // Mock job data - in a real app, this would come from an API
  const job = {
    id: id,
    title: 'Senior React Developer',
    company: 'Tech Solutions Inc.',
    type: 'Full-time',
    location: 'Accra, Ghana',
    salary: 'GHS 8,000 - 12,000',
    posted: '1 week ago',
    deadline: '2023-12-31',
    description: 'We are looking for an experienced React developer to join our team...',
    requirements: [
      '3+ years of experience with React',
      'Strong JavaScript/TypeScript skills',
      'Experience with Redux or Context API',
      'Familiarity with RESTful APIs',
      'Experience with testing frameworks (Jest, React Testing Library)'
    ],
    applicants: 45,
    views: 128,
    status: 'Active'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <div className="mt-1 text-sm text-gray-500">
            {job.company} • {job.location} • {job.type}
          </div>
        </div>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
          job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {job.status}
        </span>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Job Details</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Salary</h4>
              <p className="mt-1 text-sm text-gray-900">{job.salary}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Posted</h4>
              <p className="mt-1 text-sm text-gray-900">{job.posted}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Application Deadline</h4>
              <p className="mt-1 text-sm text-gray-900">{new Date(job.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Applicants</h4>
              <p className="mt-1 text-sm text-gray-900">{job.applicants} applicants</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Job Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="text-gray-700">{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Applicants</h3>
          <p className="mt-1 text-sm text-gray-500">View and manage applicants for this position</p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700">View and manage applicants for this job posting.</p>
          <div className="mt-4">
            <Link
              to={`/employer/jobs/${id}/applicants`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View All Applicants
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Link
          to="/employer/jobs"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Jobs
        </Link>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Edit Job
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
