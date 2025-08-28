import { useDispatch, useSelector } from 'react-redux';
import {
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
  setLoading,
  setError,
  clearError,
} from './careerAspirationSlice';

// Use throughout your app instead of plain hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hook for career aspiration slice
export const useCareerAspiration = () => {
  const dispatch = useAppDispatch();
  const careerAspiration = useAppSelector((state) => state.careerAspiration.careerAspiration);
  const isLoading = useAppSelector((state) => state.careerAspiration.isLoading);
  const error = useAppSelector((state) => state.careerAspiration.error);

  return {
    careerAspiration,
    isLoading,
    error,

    // direct reducers for UI
    setCareerAspiration: (payload) => dispatch(setCareerAspiration(payload)),
    setCareerField: (field, value) => dispatch(setCareerField({ field, value })),

    addCareerInterest: (v) => dispatch(addCareerInterest(v)),
    removeCareerInterest: (v) => dispatch(removeCareerInterest(v)),

    addDesiredJobTitle: (v) => dispatch(addDesiredJobTitle(v)),
    removeDesiredJobTitle: (v) => dispatch(removeDesiredJobTitle(v)),

    addTargetIndustry: (v) => dispatch(addTargetIndustry(v)),
    removeTargetIndustry: (v) => dispatch(removeTargetIndustry(v)),

    addPreferredJobLocation: (v) => dispatch(addPreferredJobLocation(v)),
    removePreferredJobLocation: (v) => dispatch(removePreferredJobLocation(v)),

    addCareerLevel: (v) => dispatch(addCareerLevel(v)),
    removeCareerLevel: (id) => dispatch(removeCareerLevel(id)),

    addPreferredJobType: (v) => dispatch(addPreferredJobType(v)),
    removePreferredJobType: (v) => dispatch(removePreferredJobType(v)),

    setExpectedSalary: (payload) => dispatch(setExpectedSalary(payload)),

    addSkill: (v) => dispatch(addSkill(v)),
    removeSkill: (v) => dispatch(removeSkill(v)),

    addCertification: (v) => dispatch(addCertification(v)),
    removeCertification: (v) => dispatch(removeCertification(v)),

    setLoading: (v) => dispatch(setLoading(v)),
    setError: (e) => dispatch(setError(e)),
    clearError: () => dispatch(clearError()),

    dispatch,
  };
};