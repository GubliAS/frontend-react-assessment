import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  certifications: [],
  isLoading: false,
  error: null,
};

const normalizeFileMeta = (val) => {
  if (val === null || val === undefined) return val;
  if (typeof val === 'string') {
    // backend URL -> store as url metadata
    return { name: '', size: 0, type: '', lastModified: null, url: val, isFile: false };
  }
  if (typeof File !== 'undefined' && val instanceof File) {
    return val;
  }
  if (typeof Blob !== 'undefined' && val instanceof Blob) {
    return val;
  }
  if (typeof val === 'object') {
    return {
      name: val.name || '',
      size: val.size || 0,
      type: val.type || '',
      lastModified: val.lastModified ?? null,
      url: val.url || val.credentialURL || '',
      isFile: !!val.isFile,
    };
  }
  return val;
};

const certificatesSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    addCertificate: (state, action) => {
      state.certifications.push(action.payload);
    },
    removeCertificate: (state, action) => {
      state.certifications = state.certifications.filter(cert => cert.id !== action.payload && cert._id !== action.payload);
    },
    setCertificates: (state, action) => {
      // Normalize incoming certificates (server may return credentialURL / certificateFile or local shape)
      const list = Array.isArray(action.payload) ? action.payload : [];
      state.certifications = list.map((c) => {
        const cert = { ...c };
        // prefer server key names
        if (cert.credentialURL && !cert.fileUrl) {
          cert.fileUrl = cert.credentialURL;
        }
        if (cert.certificateFile) {
          cert.certificateFile = normalizeFileMeta(cert.certificateFile);
        }
      
        return cert;
      });
    },
    resetCertificates: () => initialState,
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },

    // file-specific actions for a certificate entry
    setCertificateFile: (state, action) => {
      // payload: { id, file, fileUrl? }
      const { id, file, fileUrl } = action.payload || {};
      const idx = state.certifications.findIndex(c => c.id === id || c._id === id);
      if (idx === -1) return;
      state.certifications[idx] = {
        ...state.certifications[idx],
        file: normalizeFileMeta(file),
        certificateFile: (typeof file === 'string' ? file : state.certifications[idx].certificateFile),
      };
    },
    clearCertificateFile: (state, action) => {
      const id = action.payload;
      const idx = state.certifications.findIndex(c => c.id === id || c._id === id);
      if (idx === -1) return;
      delete state.certifications[idx].file;
      state.certifications[idx].fileUrl = '';
    },
    setCertificateUrl: (state, action) => {
      // payload: { id, url }
      const { id, url } = action.payload || {};
      const idx = state.certifications.findIndex(c => c.id === id || c._id === id);
      if (idx === -1) return;
      state.certifications[idx].fileUrl = url;
    },
  },
});

export const {
  addCertificate,
  removeCertificate,
  setCertificates,
  resetCertificates,
  setLoading,
  setError,
  clearError,
  setCertificateFile,
  clearCertificateFile,
  setCertificateUrl,
} = certificatesSlice.actions;

export default certificatesSlice.reducer;
