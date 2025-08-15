// store/slices/skillsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  skills: [], // all skills (technical, soft, language)
  isLoading: false,
  error: null,
  editingId: null,
  showForm: false,
  formData: {
    name: '',
    category: 'technical', // technical | soft | language
    level: 'intermediate', // beginner | intermediate | advanced
  }
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state, action) => {
      const newSkill = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      state.skills.push(newSkill);
    },

    updateSkill: (state, action) => {
      const { id, data } = action.payload;
      const index = state.skills.findIndex(skill => skill.id === id);
      if (index !== -1) {
        state.skills[index] = { ...state.skills[index], ...data };
      }
    },

    removeSkill: (state, action) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload);
    },

    setSkills: (state, action) => {
      state.skills = action.payload;
    },

    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },

    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },

    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
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

    reorderSkills: (state, action) => {
      state.skills = action.payload;
    },

    importSkills: (state, action) => {
      state.skills = [...state.skills, ...action.payload];
    },

    resetSkills: () => initialState,
  },
});

export const {
  addSkill,
  updateSkill,
  removeSkill,
  setSkills,
  setShowForm,
  setEditingId,
  setFormData,
  resetFormData,
  setLoading,
  setError,
  clearError,
  reorderSkills,
  importSkills,
  resetSkills
} = skillsSlice.actions;

export default skillsSlice.reducer;
