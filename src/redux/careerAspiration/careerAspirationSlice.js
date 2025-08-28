import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  careerAspiration: {
    careerInterests: [], // Array of strings
    desiredJobTitles: [], // Array of strings  
    targetIndustries: [], // Array of strings
    preferredJobLocations: [], // Array of strings
    careerLevels: [], // Array of objects with midlevel, senior, junior, _id
    preferredJobTypes: [], // Array of strings
    expectedSalary: {
      min: null,
      max: null
    }, // Object with min/max
    keySkillsToGain: [], // Array of strings - keeping this as it matches
    certificationGoals: [], // Array of strings - keeping this as it matches
    
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
      if (!state.careerAspiration) state.careerAspiration = {};
      state.careerAspiration[field] = value;
    },

    // Career Interests
    addCareerInterest: (state, action) => {
      const interest = action.payload;
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!Array.isArray(state.careerAspiration.careerInterests)) state.careerAspiration.careerInterests = [];
      if (interest && !state.careerAspiration.careerInterests.includes(interest)) {
        state.careerAspiration.careerInterests.push(interest);
      }
    },
    
    removeCareerInterest: (state, action) => {
      if (!state.careerAspiration || !Array.isArray(state.careerAspiration.careerInterests)) return;
      state.careerAspiration.careerInterests = state.careerAspiration.careerInterests.filter(
        (interest) => interest !== action.payload
      );
    },

    // Desired Job Titles
    addDesiredJobTitle: (state, action) => {
      const title = action.payload;
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!Array.isArray(state.careerAspiration.desiredJobTitles)) state.careerAspiration.desiredJobTitles = [];
      if (title && !state.careerAspiration.desiredJobTitles.includes(title)) {
        state.careerAspiration.desiredJobTitles.push(title);
      }
    },
    
    removeDesiredJobTitle: (state, action) => {
      if (!state.careerAspiration || !Array.isArray(state.careerAspiration.desiredJobTitles)) return;
      state.careerAspiration.desiredJobTitles = state.careerAspiration.desiredJobTitles.filter(
        (title) => title !== action.payload
      );
    },

    // Target Industries
    addTargetIndustry: (state, action) => {
      const industry = action.payload;
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!Array.isArray(state.careerAspiration.targetIndustries)) state.careerAspiration.targetIndustries = [];
      if (industry && !state.careerAspiration.targetIndustries.includes(industry)) {
        state.careerAspiration.targetIndustries.push(industry);
      }
    },
    
    removeTargetIndustry: (state, action) => {
      if (!state.careerAspiration || !Array.isArray(state.careerAspiration.targetIndustries)) return;
      state.careerAspiration.targetIndustries = state.careerAspiration.targetIndustries.filter(
        (industry) => industry !== action.payload
      );
    },

    // Preferred Job Locations
    addPreferredJobLocation: (state, action) => {
      const location = action.payload;
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!Array.isArray(state.careerAspiration.preferredJobLocations)) state.careerAspiration.preferredJobLocations = [];
      if (location && !state.careerAspiration.preferredJobLocations.includes(location)) {
        state.careerAspiration.preferredJobLocations.push(location);
      }
    },
    
    removePreferredJobLocation: (state, action) => {
      if (!state.careerAspiration || !Array.isArray(state.careerAspiration.preferredJobLocations)) return;
      state.careerAspiration.preferredJobLocations = state.careerAspiration.preferredJobLocations.filter(
        (location) => location !== action.payload
      );
    },

    // Career Levels (more complex as it's array of objects)
    addCareerLevel: (state, action) => {
      const levelData = action.payload; // { midlevel, senior, junior, _id }
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!Array.isArray(state.careerAspiration.careerLevels)) state.careerAspiration.careerLevels = [];
      const existingIndex = state.careerAspiration.careerLevels.findIndex(
        level => level._id === levelData._id
      );
      
      if (existingIndex === -1) {
        state.careerAspiration.careerLevels.push(levelData);
      } else {
        state.careerAspiration.careerLevels[existingIndex] = levelData;
      }
    },
    
    removeCareerLevel: (state, action) => {
      if (!state.careerAspiration || !Array.isArray(state.careerAspiration.careerLevels)) return;
      const levelId = action.payload; // _id to remove
      state.careerAspiration.careerLevels = state.careerAspiration.careerLevels.filter(
        (level) => level._id !== levelId
      );
    },

    // Preferred Job Types
    addPreferredJobType: (state, action) => {
      const jobType = action.payload;
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!Array.isArray(state.careerAspiration.preferredJobTypes)) state.careerAspiration.preferredJobTypes = [];
      if (jobType && !state.careerAspiration.preferredJobTypes.includes(jobType)) {
        state.careerAspiration.preferredJobTypes.push(jobType);
      }
    },
    
    removePreferredJobType: (state, action) => {
      if (!state.careerAspiration || !Array.isArray(state.careerAspiration.preferredJobTypes)) return;
      state.careerAspiration.preferredJobTypes = state.careerAspiration.preferredJobTypes.filter(
        (jobType) => jobType !== action.payload
      );
    },

    // Expected Salary
    setExpectedSalary: (state, action) => {
      const { field, value } = action.payload; // field: 'min' or 'max'
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!state.careerAspiration.expectedSalary || typeof state.careerAspiration.expectedSalary !== 'object') {
        state.careerAspiration.expectedSalary = { min: null, max: null };
      }
      if (field === 'min' || field === 'max') {
        state.careerAspiration.expectedSalary[field] = value;
      }
    },

    // Skills to Gain (keeping existing naming)
    addSkill: (state, action) => {
      const skill = action.payload;
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!Array.isArray(state.careerAspiration.keySkillsToGain)) state.careerAspiration.keySkillsToGain = [];
      if (skill && !state.careerAspiration.keySkillsToGain.includes(skill)) {
        state.careerAspiration.keySkillsToGain.push(skill);
      }
    },
    
    removeSkill: (state, action) => {
      if (!state.careerAspiration || !Array.isArray(state.careerAspiration.keySkillsToGain)) return;
      state.careerAspiration.keySkillsToGain = state.careerAspiration.keySkillsToGain.filter(
        (s) => s !== action.payload
      );
    },

    // Certification Goals (keeping existing naming)
    addCertification: (state, action) => {
      const cert = action.payload;
      if (!state.careerAspiration) state.careerAspiration = {};
      if (!Array.isArray(state.careerAspiration.certificationGoals)) state.careerAspiration.certificationGoals = [];
      if (cert && !state.careerAspiration.certificationGoals.includes(cert)) {
        state.careerAspiration.certificationGoals.push(cert);
      }
    },
    
    removeCertification: (state, action) => {
      if (!state.careerAspiration || !Array.isArray(state.careerAspiration.certificationGoals)) return;
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
  addCareerInterest,
  removeCareerInterest,
  addDesiredJobTitle,
  removeDesiredJobTitle,
  addTargetIndustry,
  removeTargetIndustry,
  addPreferredJobLocation,
  removePreferredJobLocation,
  addCareerLevel,
  removeCareerLevel,
  addPreferredJobType,
  removePreferredJobType,
  setExpectedSalary,
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