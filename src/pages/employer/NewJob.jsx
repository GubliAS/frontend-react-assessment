import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewJob = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    company: 'Your Company Name', // This would come from employer profile
    type: 'Full-time',
    location: '',
    salary: '',
    description: '',
    requirements: ['', ''], // Start with 2 empty requirements
    deadline: '',
    status: 'Draft'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...jobData.requirements];
    newRequirements[index] = value;
    setJobData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setJobData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index) => {
    if (jobData.requirements.length > 1) { // Keep at least one requirement
      const newRequirements = jobData.requirements.filter((_, i) => i !== index);
      setJobData(prev => ({
        ...prev,
        requirements: newRequirements
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the job
    console.log('Submitting job:', jobData);
    // For demo, just navigate back to jobs list
    navigate('/employer/jobs');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
        <p className="mt-1 text-gray-600">Fill in the details below to create a new job posting</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={jobData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Job Type *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={jobData.type}
                  onChange={handleChange}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={jobData.location}
                  onChange={handleChange}
                  placeholder="e.g. Accra, Ghana or Remote"
                />
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                  Salary Range
                </label>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={jobData.salary}
                  onChange={handleChange}
                  placeholder="e.g. GHS 5,000 - 8,000"
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={jobData.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Job Description</h2>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={8}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                  placeholder="Detailed description of the job, responsibilities, and requirements..."
                  value={jobData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Describe the responsibilities, experience, and skills required for this position.
              </p>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Requirements</h2>
            <div className="space-y-2">
              {jobData.requirements.map((req, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-grow">
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                      value={req}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      placeholder={`Requirement ${index + 1}`}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800"
                    disabled={jobData.requirements.length <= 1}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Requirement
              </button>
            </div>
          </div>

          {/* Status */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Status</h2>
            <div className="flex items-center">
              <input
                id="draft"
                name="status"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                checked={jobData.status === 'Draft'}
                onChange={() => setJobData(prev => ({ ...prev, status: 'Draft' }))}
              />
              <label htmlFor="draft" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">Save as Draft</span>
                <span className="block text-sm text-gray-500">Only you can see this job</span>
              </label>
            </div>
            <div className="mt-4 flex items-center">
              <input
                id="active"
                name="status"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                checked={jobData.status === 'Active'}
                onChange={() => setJobData(prev => ({ ...prev, status: 'Active' }))}
              />
              <label htmlFor="active" className="ml-3">
                <span className="block text-sm font-medium text-gray-700">Publish Job</span>
                <span className="block text-sm text-gray-500">This job will be visible to job seekers</span>
              </label>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/employer/jobs')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {jobData.status === 'Draft' ? 'Save as Draft' : 'Publish Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewJob;
