import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ApplicantsList = () => {
  const { jobId } = useParams();
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data - in a real app, this would come from an API
  const job = {
    id: jobId,
    title: 'Senior React Developer',
    company: 'Tech Solutions Inc.'
  };

  // Mock applicants data
  const applicants = [
    {
      id: 1,
      name: 'Kwame Mensah',
      email: 'kwame@example.com',
      appliedDate: '2 days ago',
      status: 'New',
      match: '85%',
      resume: 'kwame_mensah_resume.pdf',
      experience: '4 years',
      education: 'BSc Computer Science, University of Ghana',
      skills: ['React', 'JavaScript', 'Redux', 'Node.js', 'HTML/CSS']
    },
    {
      id: 2,
      name: 'Ama Bonsu',
      email: 'ama@example.com',
      appliedDate: '3 days ago',
      status: 'Reviewing',
      match: '92%',
      resume: 'ama_bonsu_resume.pdf',
      experience: '5 years',
      education: 'MSc Software Engineering, KNUST',
      skills: ['React', 'TypeScript', 'GraphQL', 'Jest', 'UI/UX']
    },
    {
      id: 3,
      name: 'Kofi Asante',
      email: 'kofi@example.com',
      appliedDate: '1 day ago',
      status: 'New',
      match: '78%',
      resume: 'kofi_asante_resume.pdf',
      experience: '3 years',
      education: 'BSc Information Technology, University of Cape Coast',
      skills: ['React', 'JavaScript', 'Python', 'Django', 'Docker']
    },
  ];

  // Filter applicants based on status
  const filteredApplicants = statusFilter === 'all' 
    ? applicants 
    : applicants.filter(applicant => applicant.status === statusFilter);

  const updateApplicantStatus = (applicantId, newStatus) => {
    // In a real app, this would be an API call
    console.log(`Updating applicant ${applicantId} status to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applicants for {job.title}</h1>
            <p className="mt-1 text-gray-600">Review and manage applications for this position</p>
          </div>
          <Link
            to="/employer/jobs"
            className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Jobs
          </Link>
        </div>
        
        <div className="mt-4 flex items-center">
          <span className="mr-3 text-sm font-medium text-gray-700">Filter by status:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusFilter === 'all'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All ({applicants.length})
            </button>
            <button
              onClick={() => setStatusFilter('New')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusFilter === 'New'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              New ({applicants.filter(a => a.status === 'New').length})
            </button>
            <button
              onClick={() => setStatusFilter('Reviewing')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusFilter === 'Reviewing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Reviewing ({applicants.filter(a => a.status === 'Reviewing').length})
            </button>
            <button
              onClick={() => setStatusFilter('Interview')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusFilter === 'Interview'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Interview (0)
            </button>
            <button
              onClick={() => setStatusFilter('Hired')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusFilter === 'Hired'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Hired (0)
            </button>
            <button
              onClick={() => setStatusFilter('Rejected')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                statusFilter === 'Rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Rejected (0)
            </button>
          </div>
        </div>
      </div>

      {/* Applicants List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {filteredApplicants.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredApplicants.map((applicant) => (
              <li key={applicant.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                      {applicant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-indigo-600">{applicant.name}</div>
                      <div className="text-sm text-gray-500">{applicant.email}</div>
                      <div className="mt-1 flex items-center">
                        <span className="text-xs text-gray-500">
                          Applied {applicant.appliedDate} • {applicant.experience} experience • {applicant.education.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 mr-2">Match:</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: applicant.match }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{applicant.match}</span>
                    </div>
                    <div className="flex space-x-2">
                      <select
                        value={applicant.status}
                        onChange={(e) => updateApplicantStatus(applicant.id, e.target.value)}
                        className="block w-40 pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Interview">Interview</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <Link
                        to={`/employer/jobs/${jobId}/applicants/${applicant.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {applicant.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No applicants found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {statusFilter === 'all' 
                ? 'There are no applicants for this job yet.' 
                : `There are no applicants with status "${statusFilter}".`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
