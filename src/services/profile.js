import api from '../utils/apiInterceptor';
import { sanitizeProfileForCreate, objectToFormData } from '../utils/profilePayload';

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

// create profile (backend endpoint: POST http://localhost:9000/api/youth/profiles)
export const createProfile = (rawBody) => {
  const sanitized = sanitizeProfileForCreate(rawBody);
  console.log('Sanitized profile payload:', sanitized);

  // detect any File/Blob inside sanitized payload
  const hasFile = JSON.stringify(sanitized, (k, v) => {
    if (v instanceof File || v instanceof Blob) {
      return '__FILE__';
    }
    return v;
  }).includes('__FILE__');

  if (hasFile) {
    const fd = objectToFormData(sanitized);
    console.log('FormData entries:', fd);
    return api.post('/api/youth/profiles', fd, {
      headers: { 'Content-Type': 'multipart/form-data' } // axios will append the boundary
    }).then(handleResponse).catch(handleError);
  }
  
  return api.post('/api/youth/profiles', sanitized).then(handleResponse).catch(handleError);
};
// optional helpers you can add later
export const getProfile = async () => {
  try {
    return await api.get(`/api/youth/profiles/me`).then(handleResponse);
  } catch (err) {
    // If server responds 404 => no profile created yet. Return null instead of throwing.
    const status = err?.status || err?.response?.status;
    if (status === 404) return null;
    // rethrow other errors so callers can handle them
    throw err;
  }
};

// mirror same sanitation for update so server receives same shape
export const updateProfile = (rawBody) => {
  const sanitized = sanitizeProfileForCreate(rawBody);
  const hasFile = JSON.stringify(sanitized, (k, v) => {
    if (v instanceof File || v instanceof Blob) return '__FILE__';
    return v;
  }).includes('__FILE__');
  console.log('Sanitized profile payload for update:', sanitized);
  if (hasFile) {

    return api.patch('/api/youth/profiles', sanitized, {
      headers: { 'Content-Type': 'multipart/form-data' } // axios will append the boundary
    }).then(handleResponse).catch(handleError);
  }
  
  return api.patch('/api/youth/profiles', sanitized).then(handleResponse).catch(handleError);
};

export const deleteProfileItem = async (section, objectId) => {
  if (!section || !objectId) {
    throw new Error('section and objectId are required');
  }
  try {
    // endpoint: DELETE /api/youth/profile/{profileSection}/{objectid}
    const res = await api.delete(`/api/youth/profiles/${encodeURIComponent(section)}/${encodeURIComponent(objectId)}`);
    return handleResponse(res);
  } catch (err) {
    return handleError(err);
  }
};

export default {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfileItem,
};