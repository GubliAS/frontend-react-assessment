import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePhoto: null, // Can be a URL string or file metadata object
  profilePhotoUrl: null, // For temporary URLs (blob URLs, etc.)
  isUploading: false,
  error: null,
};

const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    setPhotoFile: (state, action) => {
      const file = action.payload;
      
      if (file === null || file === undefined) {
        state.profilePhoto = null;
        return;
      }

      // If it's a File object, store metadata for serialization
      if (file && typeof file === 'object' && (file instanceof File || file.name !== undefined)) {
        state.profilePhoto = {
          name: file.name || null,
          size: file.size || null,
          type: file.type || null,
          lastModified: file.lastModified || null,
          isFile: true, // Flag to identify this as file metadata
        };
      } else if (typeof file === 'string') {
        // If it's a URL string (from backend), store it directly
        state.profilePhoto = file;
      } else {
        // For other cases, store as-is
        state.profilePhoto = file;
      }
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
    
    resetPhoto: (state) => {
      // Only reset temporary state, keep the main profilePhoto if it exists
      state.profilePhotoUrl = null;
      state.error = null;
      state.isUploading = false;
    },
    
    clearAllPhotoData: () => initialState, // Use this when you want to completely clear everything
  },
});

export const {
  setPhotoFile,
  setPhotoUrl,
  setUploading,
  setError,
  clearError,
  resetPhoto,
  clearAllPhotoData,
} = photoSlice.actions;

export default photoSlice.reducer;