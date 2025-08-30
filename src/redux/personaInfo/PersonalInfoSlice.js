import { createSlice } from '@reduxjs/toolkit';

// helper: turn various incoming date values into yyyy-MM-dd (safe fallback)
function formatDateForInput(v) {
  if (!v) return '';
  try {
    // handle Date objects or ISO strings with time
    const d = typeof v === 'string' ? new Date(v) : v;
    if (isNaN(d)) return '';
    return d.toISOString().slice(0, 10);
  } catch {
    return '';
  }
}

const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    // optional Ghana Card fields - keep serializable metadata shape by default
    ghanaCardNumber: '',
    ghCardUploadFront: "",
    ghCardUploadBack: "",
    address: {
       region: '',
        district: '',
        city: ''},
    phoneNumber: '',
    email: '',
    professionalBio: ''
  },
  profileCompletion: 0, // percentage 0-100
  isLoading: false,
  error: null
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      const payload = action.payload || {};
      const { address: addrPayload, region, district, city, dateOfBirth, ...rest } = payload;

      // helper: keep file-like fields serializable (store metadata / url only)
      const normalizeFileMeta = (val) => {
        if (val === null || val === undefined) return val;
        if (typeof val === 'string') return { name: '', size: 0, type: '', lastModified: null, url: val, isFile: false };
        // If it's a File/Blob, keep the File/Blob so objectToFormData can append it as a file
        if (typeof File !== 'undefined' && val instanceof File) {
          return val;
        }
        if (typeof Blob !== 'undefined' && val instanceof Blob) {
          return val;
        }
        // If already a metadata-like object, keep only expected keys
        if (typeof val === 'object') {
          return {
            name: val.name || '',
            size: val.size || 0,
            type: val.type || '',
            lastModified: val.lastModified ?? null,
            url: val.url || '',
            isFile: !!val.isFile,
          };
        }
        return val;
      };

      // merge nested address or flat fields into state.personalInfo.address
      if (addrPayload && typeof addrPayload === 'object') {
        state.personalInfo.address = {
          ...state.personalInfo.address,
          ...addrPayload,
        };
      }
      const addressUpdates = {};
      if (region !== undefined) addressUpdates.region = region;
      if (district !== undefined) addressUpdates.district = district;
      if (city !== undefined) addressUpdates.city = city;
      if (Object.keys(addressUpdates).length > 0) {
        state.personalInfo.address = {
          ...state.personalInfo.address,
          ...addressUpdates,
        };
      }

      // Normalize dateOfBirth to yyyy-MM-dd so <input type="date"> displays it
      if (dateOfBirth !== undefined) {
        state.personalInfo.dateOfBirth = formatDateForInput(dateOfBirth);
      }

      // If payload includes gh card files, normalize them to metadata before merging
      if (rest.ghCardUploadFront !== undefined) {
        state.personalInfo.ghCardUploadFront = normalizeFileMeta(rest.ghCardUploadFront);
        delete rest.ghCardUploadFront;
      }
      if (rest.ghCardUploadBack !== undefined) {
        state.personalInfo.ghCardUploadBack = normalizeFileMeta(rest.ghCardUploadBack);
        delete rest.ghCardUploadBack;
      }

      // merge other top-level personal fields (strings/files/etc.)
      state.personalInfo = {
        ...state.personalInfo,
        ...rest,
        // keep already-set dateOfBirth if we normalized it above
        ...(dateOfBirth !== undefined ? { dateOfBirth: state.personalInfo.dateOfBirth } : {}),
      };
    },
    resetPersonalInfo: () => initialState,
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setPersonalInfo,
  resetPersonalInfo,
  setLoading,
  setError,
  clearError
} = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
