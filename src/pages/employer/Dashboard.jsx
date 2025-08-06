import React from 'react';
import { Link } from 'react-router-dom';

const EmployerDashboard = () => {
  // Stats data
  const stats = [
    { name: 'Active Jobs', value: '12', change: '+2', changeType: 'increase' },
    { name: 'Total Applications', value: '245', change: '+15%', changeType: 'increase' },
    { name: 'Interview Stage', value: '34', change: '+5', changeType: 'increase' },
    { name: 'Hired', value: '12', change: '+3', changeType: 'increase' },
  ];

  // Recent applicants data
  const recentApplicants = [
    { 
      id: 1, 
      name: 'Kwame Mensah', 
      email: 'kwame@example.com',
      position: 'Frontend Developer', 
      appliedDate: '2 days ago',
      status: 'New',
      match: '85%'
    },
    { 
      id: 2, 
      name: 'Ama Bonsu', 
      email: 'ama@example.com',
      position: 'UX Designer', 
      appliedDate: '3 days ago',
      status: 'Reviewing',
      match: '92%'
    },
    { 
      id: 3, 
      name: 'Kofi Asante', 
      email: 'kofi@example.com',
      position: 'Backend Developer', 
      appliedDate: '1 day ago',
      status: 'New',
      match: '78%'
    },
  ];

  // Job postings data
  const jobPostings = [
    { 
      id: 1, 
      title: 'Senior React Developer', 
      type: 'Full-time', 
      location: 'Accra, Ghana',
      posted: '1 week ago',
      applicants: 45, 
      status: 'Active',
      views: 128
    },
    { 
      id: 2, 
      title: 'UX/UI Designer', 
      type: 'Contract', 
      location: 'Remote',
      posted: '2 weeks ago',
      applicants: 32, 
      status: 'Active',
      views: 215
    },
    { 
      id: 3, 
      title: 'DevOps Engineer', 
      type: 'Full-time', 
      location: 'Kumasi, Ghana',
      posted: '3 days ago',
      applicants: 18, 
      status: 'Draft',
      views: 42
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome back! Here's an overview of your job postings and applications.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">{stat.name}</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className={`ml-2 text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applicants */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Recent Applicants</h2>
          <p className="text-sm text-gray-500">Most recent job applications</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApplicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                        <div className="text-sm text-gray-500">{applicant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{applicant.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {applicant.appliedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      applicant.status === 'New' ? 'bg-blue-100 text-blue-800' :
                      applicant.status === 'Reviewing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: applicant.match }}
                      ></div>
                    </div>
                    <span className="text-xs">{applicant.match} match</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-center">
          <Link to="/employer/applicants" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all applicants
          </Link>
        </div>
      </div>

      {/* Job Postings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Your Job Postings</h2>
            <p className="text-sm text-gray-500">Active and draft job listings</p>
          </div>
          <Link 
            to="/employer/jobs/new" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post a New Job
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicants
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobPostings.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => window.location.href = `/employer/jobs/${job.id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">{job.title}</div>
                    <div className="text-xs text-gray-500">{job.views} views</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {job.posted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/employer/jobs/${job.id}/applicants`} 
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {job.applicants} {job.applicants === 1 ? 'applicant' : 'applicants'}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-center">
          <Link to="/employer/jobs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all job postings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
