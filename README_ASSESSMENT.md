# Assessment: Implement Auth Login & OTP

Goal
------
Give an intern a small focused exercise: re-implement login and OTP verification and restore safe auth state management.

Files to edit
--------------
- `src/services/auth.js` — implement `loginSeeker`, `loginEmployer`, `verifyOtpSeeker`, `verifyOtpEmployer` (or switch to the mock service).
- `src/services/auth.mock.js` — mock implementations are provided; you can study them.
- `src/redux/auth/authSlice.js` — implement `initialState` shape, `setUser`, `setToken`, and any other reducers required to persist auth state. Re-enable selectors as needed.
- `src/auth/Login.jsx` — currently shows a TODO message; implement the submit flow to call the auth services and navigate appropriately.
- `src/auth/OtpVerification.jsx` — currently shows a TODO message; implement OTP verification to use the auth services and dispatch token+user into redux.

What we removed (intentionally)
--------------------------------
- Real login and OTP verification calls were stubbed out.
- Auth slice was emptied so the candidate must design the state shape and persistence.
- Selectors were removed so the candidate must reintroduce them as needed.

Assessment tasks (priority)
---------------------------
1. Implement `loginSeeker` and `loginEmployer` in `src/services/auth.js` to call the API and return a consistent response shape: `{ accessToken: string, user: { id, firstName, lastName, email, role } }`.
2. Implement `verifyOtpSeeker` and `verifyOtpEmployer` in `src/services/auth.js` that accept `{ email, otp }` and return the same response shape.
3. Update `src/redux/auth/authSlice.js`:
   - Recreate an `initialState` with `user`, `token`, `isAuthenticated`, `isLoading`, and `error`.
   - Implement `setUser`, `setToken`, `setLoading`, `setError`, `clearError`, and keep `logout`.
   - Implement selectors (`selectUser`, etc.) and export them.
4. Wire `Login.jsx` and `OtpVerification.jsx` to use the new service functions and dispatch actions accordingly.

Acceptance criteria
-------------------
- When the intern runs the app with the mock flag enabled, they can sign in using the mock credentials and reach the dashboard.
- The auth token is stored in cookies and `isAuthenticated` is set.
- Protected routes redirect to `/login` when unauthenticated and allow access when authenticated.

How to run locally (mock)
-------------------------
1. Start dev server:
   npm run dev
2. The mock auth is enabled by default for the assessment. Use email `demo@example.com` and password `password` to sign in. The OTP code is `123456` when required.

Notes for graders
------------------
- Inspect `src/services/auth.js` vs `src/services/auth.mock.js` to see the required behavior.
- Focus on state management correctness, cookie handling, and safe selectors.

Good luck!
