import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useAssessment = () => {
  const dispatch = useAppDispatch();
  const assessmentScores = useAppSelector(state => state.assessment.assessmentScores || []);
  const isLoading = useAppSelector(state => state.assessment.isLoading);
  const error = useAppSelector(state => state.assessment.error);

  return {
    dispatch,
    assessmentScores,
    isLoading,
    error
  };
};