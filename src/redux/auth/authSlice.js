import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieOptions = {
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  // optionally set maxAge: 60 * 60 * 24 * 7 // 7 days
};

// NOTE for assessment: auth state variables removed intentionally.
// Interns should restore a suitable initialState with user/token/isAuthenticated, etc.
const initialState = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // TODO (intern): implement setUser and setToken reducers to update
    // the state and persist cookies. The minimal examples below are
    // placeholders; expand and add validation as needed.
    setUser(state, action) {
      // interns should set state.user and optionally set isAuthenticated
      state.user = action.payload;
    },
    setToken(state, action) {
      // interns should set state.token and optionally set isAuthenticated
      state.token = action.payload;
    },
    logout(state) {
      try {
        cookies.remove('auth_token', { path: '/' });
        cookies.remove('user', { path: '/' });
      } catch (e) { /* ignore */ }
      for (const k of Object.keys(state)) delete state[k];
    },
  },
});

// Only export the actions that currently exist in the slice. Interns should
// reintroduce and export additional actions (setUser, setToken, etc.) when
// they implement the full auth flow.
export const { setUser, setToken, logout } = authSlice.actions;

// Selector exports removed for the assessment: interns should implement
// selectors that match the state shape they create.

export default authSlice.reducer;