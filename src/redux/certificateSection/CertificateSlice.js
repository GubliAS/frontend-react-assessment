import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  certificates: [],
  isLoading: false,
  error: null,
};

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    addCertificate: (state, action) => {
      state.certificates.push(action.payload);
    },
    removeCertificate: (state, action) => {
      state.certificates = state.certificates.filter(cert => cert.id !== action.payload);
    },
    setCertificates: (state, action) => {
      state.certificates = action.payload;
    },
    resetCertificates: () => initialState,
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addCertificate,
  removeCertificate,
  setCertificates,
  resetCertificates,
  setLoading,
  setError,
  clearError
} = certificatesSlice.actions;

export default certificatesSlice.reducer;
