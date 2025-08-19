import { useDispatch, useSelector } from 'react-redux';

// Use throughout your app instead of plain hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Custom hook for career aspiration slice
export const useCareerAspiration = () => {
  const dispatch = useAppDispatch();
  const careerAspiration = useAppSelector(state => state.careerAspiration.careerAspiration);
  const isLoading = useAppSelector(state => state.careerAspiration.isLoading);
  const error = useAppSelector(state => state.careerAspiration.error);

  return {
    careerAspiration,
    isLoading,
    error,
    dispatch
  };
}