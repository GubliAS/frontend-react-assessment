import { useDispatch, useSelector } from 'react-redux';

// Typed versions
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Education Hook
export const useEducation = () => {
  const dispatch = useAppDispatch();
  const educationList = useAppSelector(state => state.education.educationList);
  const isLoading = useAppSelector(state => state.education.isLoading);
  const error = useAppSelector(state => state.education.error);

  return {
    educationList,
    isLoading,
    error,
    dispatch
  };
};