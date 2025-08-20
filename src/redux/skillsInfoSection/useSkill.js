import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useSkills = () => {
  const dispatch = useAppDispatch();
  const skills = useAppSelector(state => state.skills.skills);
  const isLoading = useAppSelector(state => state.skills.isLoading);
  const error = useAppSelector(state => state.skills.error);
  const editingId = useAppSelector(state => state.skills.editingId);
  const showForm = useAppSelector(state => state.skills.showForm);
  const formData = useAppSelector(state => state.skills.formData);

  return { dispatch, skills, isLoading, error, editingId, showForm, formData };
};
