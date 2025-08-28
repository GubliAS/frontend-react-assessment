import { useDispatch, useSelector } from 'react-redux';
import { 
  addCertificate, 
  removeCertificate, 
  setCertificates, 
  resetCertificates, 
  setLoading, 
  setError, 
  clearError 
} from './CertificateSlice';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const useCertificates = () => {
  const dispatch = useAppDispatch();
  const certifications = useAppSelector(state => state.certificates.certifications);
  const isLoading = useAppSelector(state => state.certificates.isLoading);
  const error = useAppSelector(state => state.certificates.error);

  return {
    certifications,
    isLoading,
    error,
    addCertificate: (cert) => dispatch(addCertificate(cert)),
    removeCertificate: (id) => dispatch(removeCertificate(id)),
    setCertificates: (data) => dispatch(setCertificates(data)),
    resetCertificates: () => dispatch(resetCertificates()),
    setLoading: (value) => dispatch(setLoading(value)),
    setError: (err) => dispatch(setError(err)),
    clearError: () => dispatch(clearError()),
  };
};
