// store/slices/skillsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  technicalSkills: [], // array for technical skills
  softSkills: [],      // array for soft skills
  languages: [],       // array for language skills
  isLoading: false,
  error: null,
  editingId: null,
  showForm: false,
  formData: {
    name: '',
    category: 'technical', // technical | soft | language
    level: 'Intermediate', // beginner | intermediate | advanced
  }
};  

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state, action) => {
      const payload = action.payload || {};
      const newSkill = {
        ...payload,
        id: payload.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };

      const category = payload.category || 'technical';
      if (category === 'technical') state.technicalSkills.push(newSkill);
      else if (category === 'soft') state.softSkills.push(newSkill);
      else if (category === 'language') state.languages.push(newSkill);
      else {
        // fallback: put into technical
        state.technicalSkills.push(newSkill);
      }
    },

    updateSkill: (state, action) => {
      const { id, data } = action.payload;
      const updateInArray = (arr) => {
        const idx = arr.findIndex(s => s.id === id || s._id === id);
        if (idx !== -1) arr[idx] = { ...arr[idx], ...data };
        return idx !== -1;
      };

      if (updateInArray(state.technicalSkills)) return;
      if (updateInArray(state.softSkills)) return;
      updateInArray(state.languages);
    },

    removeSkill: (state, action) => {
      const id = action.payload;
      state.technicalSkills = state.technicalSkills.filter(s => s.id !== id && s._id !== id);
      state.softSkills = state.softSkills.filter(s => s.id !== id && s._id !== id);
      state.languages = state.languages.filter(s => s.id !== id && s._id !== id);
    },

    setSkills: (state, action) => {
      const payload = action.payload;
      // payload may be an array of mixed skills, or an object with categorized arrays
      if (Array.isArray(payload)) {
        // distribute by category property on items (fallback to technical)
        state.technicalSkills = payload.filter(s => (s.category || s.type) === 'technical');
        state.softSkills = payload.filter(s => (s.category || s.type) === 'soft');
        state.languages = payload.filter(s => (s.category || s.type) === 'language');
      } else if (payload && typeof payload === 'object') {
        // accept shape { technicalSkills: [], softSkills: [], languages: [] }
        state.technicalSkills = payload.technicalSkills || [];
        state.softSkills = payload.softSkills || [];
        state.languages = payload.languages || [];
      }
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
      const payload = action.payload;
      // payload may be a full combined array -> distribute by category
      if (Array.isArray(payload)) {
        state.technicalSkills = payload.filter(s => (s.category || 'technical') === 'technical');
        state.softSkills = payload.filter(s => (s.category) === 'soft');
        state.languages = payload.filter(s => (s.category) === 'language');
      } else if (payload && payload.category && Array.isArray(payload.items)) {
        if (payload.category === 'technical') state.technicalSkills = payload.items;
        if (payload.category === 'soft') state.softSkills = payload.items;
        if (payload.category === 'language') state.languages = payload.items;
      }
    },

    importSkills: (state, action) => {
      const items = Array.isArray(action.payload) ? action.payload : [];
      items.forEach(item => {
        const cat = item.category || 'technical';
        const enhanced = { ...item, id: item.id || item._id || Date.now().toString() + Math.random().toString(36).substr(2, 9) };
        if (cat === 'technical') state.technicalSkills.push(enhanced);
        else if (cat === 'soft') state.softSkills.push(enhanced);
        else if (cat === 'language') state.languages.push(enhanced);
      });
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
