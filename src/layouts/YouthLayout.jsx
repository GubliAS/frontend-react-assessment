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
  const location = useLocation();

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-gray-50">
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

      {/* Sidebar for desktop */}
      <div className={`hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="flex flex-col h-full border-r border-gray-200 bg-white">
          {/* Logo and collapse button */}
          <div className="pt-5 pb-4 px-4">
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
              {!collapsed && (
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
                  className={`group flex items-center ${collapsed ? 'justify-center' : 'px-3'} py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? `${item.bgColor} text-gray-900`
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  title={collapsed ? item.name : ''}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? item.bgColor : 'bg-gray-100 group-hover:bg-white'}`}>
                    <item.icon 
                      className={`h-5 w-5 ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-700'}`} 
                      aria-hidden="true"
                    />
                  </div>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              );
            })}
          </nav>
          
          {/* User profile section */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium">Y</span>
              </div>
              {!collapsed && (
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Youth User</p>
                  <p className="text-xs text-gray-500 truncate">youth@example.com</p>
                </div>
              )}
              {!collapsed && (
                <button className="ml-auto p-1 text-gray-400 hover:text-gray-500 focus:outline-none">
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
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
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 sm:p-8">
                  <Outlet />
                </div>
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
