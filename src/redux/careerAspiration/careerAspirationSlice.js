import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careerAspiration: {
    desiredRole: "",
    targetIndustry: "",
    careerLevel: "",
    targetSalary: "",
    timeframe: "",
    location: "",
    workType: "", // e.g. "remote", "onsite", "hybrid"
    keySkillsToGain: [],
    certificationGoals: [],
  },
  isLoading: false,
  error: null,
};

const careerAspirationSlice = createSlice({
  name: "careerAspiration",
  initialState,
  reducers: {
    setCareerAspiration: (state, action) => {
      // merge partial updates
      state.careerAspiration = { ...state.careerAspiration, ...action.payload };
    },
    setCareerField: (state, action) => {
      // payload: { field: string, value: any }
      const { field, value } = action.payload;
      if (field in state.careerAspiration) {
        state.careerAspiration[field] = value;
      }
    },
    addSkill: (state, action) => {
      // payload: skill string
      const skill = action.payload;
      if (skill && !state.careerAspiration.keySkillsToGain.includes(skill)) {
        state.careerAspiration.keySkillsToGain.push(skill);
      }
    },
    removeSkill: (state, action) => {
      // payload: skill string
      state.careerAspiration.keySkillsToGain = state.careerAspiration.keySkillsToGain.filter(
        (s) => s !== action.payload
      );
    },
    addCertification: (state, action) => {
      const cert = action.payload;
      if (cert && !state.careerAspiration.certificationGoals.includes(cert)) {
        state.careerAspiration.certificationGoals.push(cert);
      }
    },
    removeCertification: (state, action) => {
      state.careerAspiration.certificationGoals = state.careerAspiration.certificationGoals.filter(
        (c) => c !== action.payload
      );
    },
    resetCareerAspiration: () => initialState,
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
  setCareerAspiration,
  setCareerField,
  addSkill,
  removeSkill,
  addCertification,
  removeCertification,
  resetCareerAspiration,
  setLoading,
  setError,
  clearError,
} = careerAspirationSlice.actions;

export default careerAspirationSlice.reducer;