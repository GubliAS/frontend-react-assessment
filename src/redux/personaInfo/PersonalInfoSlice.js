import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    region: '',
    city: '',
    phone: '',
    email: '',
    bio: ''
  },
  isLoading: false,
  error: null
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
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
