import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePhotoFile: null,
  profilePhotoUrl: '',
  isUploading: false,
  error: null,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhotoFile: (state, action) => {
      state.profilePhotoFile = action.payload;
    },
    setPhotoUrl: (state, action) => {
      state.profilePhotoUrl = action.payload;
    },
    setUploading: (state, action) => {
      state.isUploading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetPhoto: () => initialState,
  },
});

export const {
  setPhotoFile,
  setPhotoUrl,
  setUploading,
  setError,
  clearError,
  resetPhoto,
} = photoSlice.actions;

export default photoSlice.reducer;
