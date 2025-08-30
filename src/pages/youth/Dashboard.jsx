import React, { use } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import Button from '../../components/shared/Button';
import SkillDevelopmentTracker from '../../components/progress/SkillDevelopmentTracker';
import { usePersonalInfo } from '../../redux/personaInfo/usePersonalInfo'
import { selectUser } from '../../redux/auth/authSlice';
import { useSelector } from 'react-redux';

const YouthDashboard = () => {
  // Mock data
  const stats = [
    { name: 'Applications', value: '8', trend: '↑ 3 this week' },
    { name: 'Interviews', value: '2', trend: '↑ 1 this week' },
    { name: 'Profile Views', value: '24', trend: '↑ 12 this week' },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'Junior React Developer',
      company: 'TechGhana',
      location: 'Accra',
      type: 'Full-time',
      posted: '2 days ago',
      match: '95%',
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'DesignHub Africa',
      location: 'Remote',
      type: 'Contract',
      posted: '1 week ago',
      match: '88%',
    },
  ];

  const applicationStatus = [
    { id: 1, position: 'Frontend Developer', company: 'DevHouse', status: 'Under Review', date: '2 days ago' },
    { id: 2, position: 'Mobile Developer', company: 'AppCraft', status: 'Interview Scheduled', date: '1 week ago' },
  ];

  const {personalInfo} = usePersonalInfo()
  const user = useSelector(selectUser)
  const navigate = useNavigate();
  console.log(user)

   // Mock user data for development when not authenticated
  const displayUser =  {
    firstName: personalInfo?.firstName || user?.firstName || 'Demo',
    lastName: personalInfo?.lastName || user?.lastName || 'User',
    email: personalInfo?.email || user?.email || 'demo@example.com',
    phone: personalInfo?.phoneNumber || user?.phoneNumber || '+233123456789',
    ghanaCard: personalInfo?.ghanaCardNumber || '1234567890123',
    isVerified: true
  };

   const handleCompleteProfile = () => {
    navigate('/youth/profile');
  };
  const handleBrowseJobs = () => {
    navigate('/youth/jobs');
  };
  const handleSkillsAssessment = () => {
    navigate('/youth/assessments');
  };
  const handleMessages = () => {
    navigate('/youth/messages');
  };

  return (
    <div className="space-y-6 ">
      {/* <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah!</h1>
        <p className="text-gray-600">Here are your recent activities and job matches</p>
      </div> */}
       {/* Welcome Card */}
            <div className=" bg-gradient-to-r from-[rgb(151,177,150)] to-emerald-500 rounded-xl p-4 sm:p-6 text-white">
              <h2 className="text-xl text-[var(--ebony-50)] sm:text-2xl font-bold mb-2">Welcome to Ghana Talent Hub!</h2>
              <p className="text-white text-sm sm:text-base">
                You're now part of Ghana's premier youth employment platform. 
                Let's get started on your journey to success.
              </p>
            </div>
         <div className="lg:col-span-2 space-y-6 col-span-12 row-span-12 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Profile Card */}
                  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Name:</span>
                        <p className="font-medium text-sm sm:text-base">{displayUser.firstName} {displayUser.lastName}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Email:</span>
                        <p className="font-medium text-sm sm:text-base break-all">{displayUser.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Phone:</span>
                        <p className="font-medium text-sm sm:text-base">{displayUser.phone}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Ghana Card:</span>
                        <p className="font-medium text-sm sm:text-base">{displayUser.ghanaCard.replace(/(\d{4})(?=\d)/g, '$1-')}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${displayUser.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {displayUser.isVerified ? 'Verified' : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Profile Card */}
                  <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      {/*
                        Use a data structure and map to keep actions maintainable.
                        Add/modify actions in the `quickActions` array below.
                      */}
                      {/*
                        Use a data structure and map to keep actions maintainable.
                        Add/modify actions in the `quickActions` array below.
                      */}
                      {[
                        { key: 'complete-profile', label: 'Complete Profile', onClick: handleCompleteProfile,  },
                        { key: 'browse-jobs', label: 'Browse Jobs', onClick: handleBrowseJobs },
                        { key: 'skills-assessment', label: 'Skills Assessment', onClick: handleSkillsAssessment },
                        { key: 'messages', label: 'Messages', onClick: handleMessages },
                        { key: 'training-programs', label: 'Training Programs', onClick: () => navigate('/youth/training') },
                      ].map(action => (
                        <Button
                          key={action.key}
                          className={`w-full justify-start text-sm hover:bg-gray-200`}
                          variant="outline"
                          onClick={action.onClick}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  </div>
                  
                  </div>
                  
        {/* Right Column - Skill Development Tracker */}
              <div className="lg:col-span-1 col-span-12 row-span-12 ">
                <SkillDevelopmentTracker />
              </div>
          
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">{stat.name}</p>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className="ml-2 text-sm text-green-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Jobs */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Recommended for You</h2>
          <p className="text-sm text-gray-500">Jobs that match your profile</p>
        </div>
        <div className="divide-y">
          {recommendedJobs.map((job) => (
            <div key={job.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-indigo-600">{job.title}</h3>
                  <p className="text-gray-600">{job.company} • {job.location}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{job.type}</span>
                    <span className="mx-2">•</span>
                    <span>{job.posted}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {job.match} Match
                  </span>
                  <div className="mt-2">
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 px-4 py-3 text-center">
          <Link to="/youth/jobs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            View all job recommendations
          </Link>
        </div>
      </div>

      {/* Application Status */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Your Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applicationStatus.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      app.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'Interview Scheduled' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default YouthDashboard;
