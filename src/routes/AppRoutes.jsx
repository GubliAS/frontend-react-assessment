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

import Login from '../auth/Login';
import Register from '../auth/Register';
import ForgotPasswordPage from '../auth/ForgotPassword';
import ResetPasswordPage from '../auth/ResetPassword';
import OTPVerificationPage from '../auth/OtpVerification';

//profile creation
import ProfileCreation from '../pages/youth/profile/ProfileCreate';
// Context
import { AuthProvider } from '../context/AuthContext';
import { PersistGate } from 'redux-persist/integration/react';


// Redux
import { store, persistor } from '../redux/store';
import { Provider } from 'react-redux';

//job pages
import JobSearch from '../pages/youth/jobs/JobSearch';
import JobDetails from '../pages/youth/jobs/JobDetails';
import ApplicationPage from '../pages/youth/jobs/ApplicationPage';
import NotFound from '../pages/NotFound';
const AppRoutes = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="otp-verification" element={<OTPVerificationPage/>} />

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
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="jobs/:jobId/applicants" element={<ApplicantsList />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="company" element={<CompanyProfile />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Youth Routes */}
        <Route path="/youth" element={<YouthLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<YouthDashboard />} />
          <Route path="jobs" element={<JobSearch/>} />
          <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="jobs/:id/apply" element={<ApplicationPage/>} />
          <Route path="saved" element={<div>Saved Jobs Page</div>} />
          <Route path="training" element={<div>Training Page</div>} />
          <Route path="profile" element={<ProfileCreation/>} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </AuthProvider>
    </PersistGate>
    </Provider>

  );
};

// We'll add the ProtectedRoute back later when we implement authentication

export default AppRoutes;
