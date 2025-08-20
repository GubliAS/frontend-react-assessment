import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assessmentScores: [],
  isLoading: false,
  error: null
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setAssessmentScores: (state, action) => {
      state.assessmentScores = action.payload;
    },
    addAssessmentScore: (state, action) => {
      state.assessmentScores.push(action.payload);
    },
    updateAssessmentScore: (state, action) => {
      const { id, changes } = action.payload;
      const idx = state.assessmentScores.findIndex(a => a.id === id);
      if (idx !== -1) {
        state.assessmentScores[idx] = { ...state.assessmentScores[idx], ...changes };
      }
    },
    removeAssessmentScore: (state, action) => {
      state.assessmentScores = state.assessmentScores.filter(a => a.id !== action.payload);
    },
    resetAssessment: () => initialState,
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
  setAssessmentScores,
  addAssessmentScore,
  updateAssessmentScore,
  removeAssessmentScore,
  resetAssessment,
  setLoading,
  setError,
  clearError
} = assessmentSlice.actions;

export default assessmentSlice.reducer;