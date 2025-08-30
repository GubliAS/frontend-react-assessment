// store/slices/workExperienceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workExperiences: [],
  isLoading: false,
  error: null,
  editingId: null,
  showForm: false,
  formData: {
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    location: '',
  }
};

const workExperienceSlice = createSlice({
  name: 'workExperience',
  initialState,
  reducers: {
    addWorkExperience: (state, action) => {
      const newExperience = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };
      state.workExperiences.push(newExperience);
    },

    updateWorkExperience: (state, action) => {
      const { id, data } = action.payload;
      const index = state.workExperiences.findIndex(exp => exp.id === id);
      if (index !== -1) {
        state.workExperiences[index] = { ...state.workExperiences[index], ...data };
      }
    },

    removeWorkExperience: (state, action) => {
      state.workExperiences = state.workExperiences.filter(exp => exp.id !== action.payload);
    },

    setWorkExperiences: (state, action) => {
      state.workExperiences = action.payload;
    },

    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },

    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },

    setFormData: (state, action) => {
      const payload = action.payload || {};
      // merge incoming form fields
      state.formData = { ...state.formData, ...payload };

      // if client toggles "isCurrent" (or legacy "current") to true, clear endDate
      if (payload.isCurrent === true || payload.current === true) {
        state.formData.endDate = '';
        // keep both keys in sync for compatibility
        state.formData.isCurrent = true;
      
      }
    },
    
    resetFormData: (state) => {
      state.formData = initialState.formData;
      state.editingId = null;
      state.showForm = false;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    reorderWorkExperiences: (state, action) => {
      state.workExperiences = action.payload;
    },

    importWorkExperiences: (state, action) => {
      state.workExperiences = [...state.workExperiences, ...action.payload];
    },

    resetWorkExperience: () => {
      return initialState;
    }
  },
});

export const {
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  setWorkExperiences,
  setShowForm,
  setEditingId,
  setFormData,
  resetFormData,
  setLoading,
  setError,
  clearError,
  reorderWorkExperiences,
  importWorkExperiences,
  resetWorkExperience
} = workExperienceSlice.actions;

export default workExperienceSlice.reducer;
