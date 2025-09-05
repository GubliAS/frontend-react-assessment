Tests and grading notes

This project currently has no automated tests. For the assessment, graders can:

- Manual checks:
  - Start the dev server (the mock auth is enabled by default): `npm run dev`.
  - Sign in with demo credentials: email `demo@example.com`, password `password`.
  - If prompted for OTP, use `123456`.
  - Verify that the dashboard and protected routes are accessible.
  - Verify that cookies `auth_token` and `user` are set on successful auth.

- Suggested automated tests (optional):
  - Unit test for `src/services/auth.mock.js`: ensure `mockLogin` returns token+user for demo credentials, throws otherwise.
  - Unit test for `authSlice`: when `setToken` and `setUser` are dispatched the state is updated and `logout` clears it.

If you want, I can add small Jest tests and a test runner configuration; tell me if you'd like that.
