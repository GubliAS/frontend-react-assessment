import api from '../utils/apiInterceptor';
// For the assessment we expose a simple feature flag to use a mock service.
// Set to `true` to run the app with the mock implementations provided in
// `src/services/auth.mock.js`. Interns should implement the real calls and
// set this to false when done.
const USE_MOCK_AUTH = true;
// Use ES module import so the browser bundler (Vite) can handle it.
import mockService from './auth.mock';

function handleResponse(res) {
  return res?.data;
}

function handleError(err) {
  const message =
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    'Request failed';
  const error = new Error(message);
  error.status = err?.response?.status;
  error.body = err?.response?.data;
  throw error;
}

// Auth API helpers using shared `api` instance
export const registerSeeker = (body) =>
  
  api.post('/seeker/signup', body).then(handleResponse).catch(handleError);

export const registerEmployer = (body) =>
  api.post('/employer/signup', body).then(handleResponse).catch(handleError);

export const verifyAccount = (token, role, id) =>
  api.get(`/verify-account/${token}/${role}/${id}`).then(handleResponse).catch(handleError);

export const loginSeeker = (body) => {
  if (USE_MOCK_AUTH && mockService) return mockService.mockLogin(body);
  // Removed for assessment: implement login flow for seekers
  return Promise.reject(new Error('loginSeeker removed for assessment - implement this API call'));
};

export const loginEmployer = (body) => {
  if (USE_MOCK_AUTH && mockService) return mockService.mockLogin(body);
  // Removed for assessment: implement login flow for employers
  return Promise.reject(new Error('loginEmployer removed for assessment - implement this API call'));
};

export const verifyOtpSeeker = (body) => {
  if (USE_MOCK_AUTH && mockService) return mockService.mockVerifyOtp(body);
  // Removed for assessment: implement OTP verification for seekers
  return Promise.reject(new Error('verifyOtpSeeker removed for assessment - implement this API call'));
};

export const verifyOtpEmployer = (body) => {
  if (USE_MOCK_AUTH && mockService) return mockService.mockVerifyOtp(body);
  // Removed for assessment: implement OTP verification for employers
  return Promise.reject(new Error('verifyOtpEmployer removed for assessment - implement this API call'));
};

export const logoutSeeker = (body) =>
  api.post('/seeker/logout', body).then(handleResponse).catch(handleError);

export const logoutEmployer = (body) =>
  api.post('/employer/logout', body).then(handleResponse).catch(handleError);

export const requestPasswordReset = (body) => 
  api.post('/request/password/reset', body).then(handleResponse).catch(handleError);

export const resetPassword = (body) =>
  api.post('/reset/password', body).then(handleResponse).catch(handleError);

export default {
  registerSeeker,
  registerEmployer,
  verifyAccount,
  loginSeeker,
  loginEmployer,
  verifyOtpSeeker,
  logoutSeeker,
  logoutEmployer,
};