import api from '../utils/apiInterceptor';

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

export const loginSeeker = (body) =>
  api.post('/seeker/login', body).then(handleResponse).catch(handleError);

export const loginEmployer = (body) =>
  api.post('/employer/login', body).then(handleResponse).catch(handleError);

export const verifyOtpSeeker = (body) =>
  api.post('/verifyOtp/seeker', body).then(handleResponse).catch(handleError);

export const verifyOtpEmployer = (body) =>
  api.post('/verifyOtp/employer', body).then(handleResponse).catch(handleError);

export const logoutSeeker = (body) =>
  api.post('/seeker/logout', body).then(handleResponse).catch(handleError);

export const logoutEmployer = (body) =>
  api.post('/employer/logout', body).then(handleResponse).catch(handleError);

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