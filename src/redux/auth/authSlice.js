import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieOptions = {
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  // optionally set maxAge: 60 * 60 * 24 * 7 // 7 days
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isValid: false,
  redirectPath: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      try {
        if (action.payload) cookies.set('user', action.payload, cookieOptions);
        else cookies.remove('user', { path: '/' });
      } catch (e) { /* ignore */ }
    },
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      try {
        if (action.payload) cookies.set('auth_token', action.payload, cookieOptions);
        else cookies.remove('auth_token', { path: '/' });
      } catch (e) { /* ignore */ }
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      try {
        cookies.remove('auth_token', { path: '/' });
        cookies.remove('user', { path: '/' });
      } catch (e) { /* ignore */ }
    },

    // keep these if you use them elsewhere
    isValidReducer(state, action) { state.isValid = !!action.payload; },
    isLoadingReducer(state, action) { state.isLoading = !!action.payload; },
    redirectReducer(state, action) { state.redirectPath = action.payload || null; },
  },
});

export const {
  setUser,
  setToken,
  setLoading,
  setError,
  clearError,
  logout,
} = authSlice.actions;

// export the requested reducer action names as well
export const {
  isValidReducer,
  isLoadingReducer,
  redirectReducer
} = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;