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
     // optional Ghana Card fields
    ghanaCardNumber: '',
    ghCardUploadFront: null,
    ghCardUploadBack: null,
    address: {
       region: '',
        district: '',
        city: ''},
    phoneNumber: '',
    email: '',
    professionalBio: ''
  },
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
