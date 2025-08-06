import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from '../layouts/AdminLayout';
import EmployerLayout from '../layouts/EmployerLayout';
import YouthLayout from '../layouts/YouthLayout';

// Pages
import Home from '../pages/Home';
import AdminDashboard from '../pages/admin/Dashboard';
import UserManagement from '../pages/admin/UserManagement';
import JobListings from '../pages/admin/JobListings';
import AdminAnalytics from '../pages/admin/Analytics';
import Settings from '../pages/admin/Settings';
import EmployerDashboard from '../pages/employer/Dashboard';
import JobDetail from '../pages/employer/JobDetail';
import JobsList from '../pages/employer/JobsList';
import NewJob from '../pages/employer/NewJob';
import ApplicantsList from '../pages/employer/ApplicantsList';
import Candidates from '../pages/employer/Candidates';
import CompanyProfile from '../pages/employer/CompanyProfile';
import Analytics from '../pages/employer/Analytics';
import YouthDashboard from '../pages/youth/Dashboard';

// Auth Pages
import AdminLogin from '../auth/admin/AdminLogin';
import AdminRegister from '../auth/admin/AdminRegister';
import EmployerLogin from '../auth/employer/EmployerLogin';
import EmployerRegister from '../auth/employer/EmployerRegister';
import YouthLogin from '../auth/youth/YouthLogin';
import YouthRegister from '../auth/youth/YouthRegister';

// Context
import { AuthProvider } from '../context/AuthContext';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/employer/login" element={<EmployerLogin />} />
        <Route path="/employer/register" element={<EmployerRegister />} />
        <Route path="/youth/login" element={<YouthLogin />} />
        <Route path="/youth/register" element={<YouthRegister />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="jobs" element={<JobListings />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Employer Routes */}
        <Route path="/employer" element={<EmployerLayout />}>
          <Route index element={<EmployerDashboard />} />
          <Route path="dashboard" element={<EmployerDashboard />} />
          {/* Job Postings */}
          <Route path="jobs" element={<JobsList />} />
          <Route path="jobs/new" element={<NewJob />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="jobs/:jobId/applicants" element={<ApplicantsList />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="company" element={<CompanyProfile />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Youth Routes */}
        <Route path="/youth" element={<YouthLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<YouthDashboard />} />
          <Route path="jobs" element={<div>Jobs Page</div>} />
          <Route path="applications" element={<div>Applications Page</div>} />
          <Route path="saved" element={<div>Saved Jobs Page</div>} />
          <Route path="training" element={<div>Training Page</div>} />
          <Route path="profile" element={<div>Profile Page</div>} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
};

// We'll add the ProtectedRoute back later when we implement authentication

export default AppRoutes;
