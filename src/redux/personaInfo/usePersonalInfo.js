import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hook for personal info
export const usePersonalInfo = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector(state => state.personalInfo.personalInfo);
  const isLoading = useAppSelector(state => state.personalInfo.isLoading);
  const error = useAppSelector(state => state.personalInfo.error);

  return {
    personalInfo,
    isLoading,
    error,
    dispatch
  };
};
