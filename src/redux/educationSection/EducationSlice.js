import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  educationList: [],
  isLoading: false,
  error: null,
  editingId: null,
  showForm: false,
  formData: {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    current: false
  }
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    addEducation: (state, action) => {
      const newEducation = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };
      state.educationList.push(newEducation);
    },
    updateEducation: (state, action) => {
      const { id, data } = action.payload;
      const index = state.educationList.findIndex(edu => edu.id === id);
      if (index !== -1) {
        state.educationList[index] = { ...state.educationList[index], ...data };
      }
    },
    removeEducation: (state, action) => {
      state.educationList = state.educationList.filter(edu => edu.id !== action.payload);
    },
    setEducationList: (state, action) => {
      state.educationList = action.payload;
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
    reorderEducation: (state, action) => {
      state.educationList = action.payload;
    },
    importEducation: (state, action) => {
      state.educationList = [...state.educationList, ...action.payload];
    },
    resetEducation: () => initialState
  }
});

export const {
  addEducation,
  updateEducation,
  removeEducation,
  setEducationList,
  setShowForm,
  setEditingId,
  setFormData,
  resetFormData,
  setLoading,
  setError,
  clearError,
  reorderEducation,
  importEducation,
  resetEducation
} = educationSlice.actions;

export default educationSlice.reducer;
