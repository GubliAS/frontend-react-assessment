// hooks/redux.js - Typed hooks for better development experience
import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hook for work experience operations
export const useWorkExperience = () => {
  const dispatch = useAppDispatch();
  const workExperiences = useAppSelector(state => state.workExperience.workExperiences);
  const isLoading = useAppSelector(state => state.workExperience.isLoading);
  const error = useAppSelector(state => state.workExperience.error);

  return {
    workExperiences,
    isLoading,
    error,
    dispatch
  };
};