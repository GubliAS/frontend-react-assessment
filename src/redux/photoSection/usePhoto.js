import { useDispatch, useSelector } from 'react-redux';
import {
  setPhotoFile,
  setPhotoUrl,
  setUploading,
  setError,
  clearError,
  resetPhoto,
} from './PhotoSlice';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const usePhoto = () => {
  const dispatch = useAppDispatch();
  const profilePhotoFile = useAppSelector(state => state.photo.profilePhotoFile);
  const profilePhotoUrl = useAppSelector(state => state.photo.profilePhotoUrl);
  const isUploading = useAppSelector(state => state.photo.isUploading);
  const error = useAppSelector(state => state.photo.error);

  return {
    profilePhotoFile,
    profilePhotoUrl,
    isUploading,
    error,
    setPhotoFile: (file) => dispatch(setPhotoFile(file)),
    setPhotoUrl: (url) => dispatch(setPhotoUrl(url)),
    setUploading: (value) => dispatch(setUploading(value)),
    setError: (err) => dispatch(setError(err)),
    clearError: () => dispatch(clearError()),
    resetPhoto: () => dispatch(resetPhoto()),
  };
};
