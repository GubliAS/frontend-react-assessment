import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CopyrightFooter from '../components/CopyrightFooter';
import { 
  HomeIcon, 
  BriefcaseIcon, 
  UserIcon, 
  AcademicCapIcon,
  BellIcon,
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  BuildingOfficeIcon,
  ArrowRightStartOnRectangleIcon,
  BookmarkIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import LogoutButton from '../components/LogoutButton';
const navigation = [
  { 
    name: 'Dashboard', 
    href: 'dashboard', 
    icon: HomeIcon,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  { 
    name: 'Find Jobs', 
    href: 'jobs', 
    icon: BriefcaseIcon,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
  { 
    name: 'My Applications', 
    href: 'applications', 
    icon: DocumentTextIcon,
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  { 
    name: 'Saved Jobs', 
    href: 'saved', 
    icon: BookmarkIcon,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50'
  },
  { 
    name: 'Training', 
    href: 'training', 
    icon: AcademicCapIcon,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  { 
    name: 'Assessments',
    href: 'assessments',
    icon: StarIcon,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50'
  },
  {
    name: 'Rewards',
    href: 'rewards',
    icon: ClockIcon,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50'
  },
  { 
    name: 'My Profile', 
    href: 'profile', 
    icon: UserIcon,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50'
  },
];

const YouthLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

// Determine if sidebar should appear expanded
const isExpanded = hovered ? true : !collapsed;


  return (
    // ensure content sits below the fixed header added in Header.jsx
    <div
      className="h-screen flex flex-col lg:flex-row overflow-hidden bg-gray-50"
      style={{ paddingTop: "var(--header-height)" }}
    >
      {/* Mobile menu button */}
      <div className="lg:hidden bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link to="/" className="ml-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Ghana Talent Hub
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center">
                  <span className="text-sm font-medium">Y</span>
                </div>
                <span className="hidden md:inline-block text-sm font-medium text-gray-700">Youth</span>
              </button>
            </div>
          </div>
        </div>
      </div>

     <div
  className={`hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 ${
    isExpanded ? 'w-64' : 'w-20'
  }`}
onMouseEnter={() => collapsed && setHovered(true)}
onMouseLeave={() => collapsed && setHovered(false)}
>
  <div className="flex flex-col h-full border-r border-gray-200 bg-white">
    {/* Logo and collapse button */}
    <div className="pt-5 pb-4 px-4">
      <div className={`flex items-center ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        {isExpanded && (
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Ghana Talent Hub
            </h1>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <span className="sr-only">Collapse sidebar</span>
          {collapsed ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
    </div>

    {/* Navigation */}
    <nav className="mt-5 flex-1 px-2 space-y-1 overflow-y-auto">
      {navigation.map((item) => {
        const isActive = location.pathname.endsWith(item.href);
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`group flex items-center ${isExpanded ? 'px-3' : 'justify-center'} py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
              isActive
                ? `${item.bgColor} text-gray-900`
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            title={!isExpanded ? item.name : ''}
          >
            <div className={`p-1.5 rounded-lg ${isActive ? item.bgColor : 'bg-gray-100 group-hover:bg-white'}`}>
              <item.icon 
                className={`h-5 w-5 ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-700'}`} 
                aria-hidden="true"
              />
            </div>
            {isExpanded && <span className="ml-3">{item.name}</span>}
          </Link>
        );
      })}
    </nav>

    {/* User profile */}
    <div className="flex-shrink-0 border-t border-gray-200 p-4">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-medium">Y</span>
        </div>
        {isExpanded && (
          <>
            <div className="ml-3 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Youth User</p>
              <p className="text-xs text-gray-500 truncate">youth@example.com</p>
            </div>
            <LogoutButton className="ml-auto p-1 text-gray-400 hover:text-gray-500 focus:outline-none" />
          </>
        )}
      </div>
    </div>
  </div>
</div>

      {/* Main content */}
      <div className=" flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto focus:outline-none bg-gray-50">
          {/* Page header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
                  </h1>
                  <p className="mt-1 text-sm text-gray-500">
                    {location.pathname.endsWith('dashboard') && 'Overview of your job search and applications'}
                    {location.pathname.endsWith('jobs') && 'Browse and apply for available job opportunities'}
                    {location.pathname.endsWith('applications') && 'Track the status of your job applications'}
                    {location.pathname.endsWith('assessments') && 'Take assessments to improve and certify your skills'}
                    {location.pathname.endsWith('rewards') && 'View and redeem rewards earned from assessments and challenges'}
                    {location.pathname.endsWith('saved') && 'Your saved job opportunities'}
                    {location.pathname.endsWith('training') && 'Enhance your skills with our training programs'}
                    {location.pathname.endsWith('profile') && 'Manage your personal and professional profile'}
                  </p>
                </div>
                <div className="flex space-x-3">
                  {location.pathname.endsWith('jobs') && (
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" />
                      Apply for Jobs
                    </button>
                  )}
                  {location.pathname.endsWith('assessments') && (
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                      <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" />
                      Start Assessment
                    </button>
                  )}
                  {location.pathname.endsWith('rewards') && (
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400">
                      <StarIcon className="-ml-1 mr-2 h-5 w-5" />
                      Redeem Rewards
                    </button>
                  )}
                  <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            <div className="max-w-7xl mx-auto">
              <div
              >
             
                  <Outlet />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <CopyrightFooter />
      </div>
    </div>
  );
};

export default YouthLayout;
