// Simple mock auth service for the assessment
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const demoUser = {
  id: 'demo-1',
  firstName: 'Demo',
  lastName: 'User',
  email: 'demo@example.com',
  role: 'seeker',
};

export const mockLogin = async (body) => {
  await delay(300);
  const { email, password } = body || {};
  if (email === 'demo@example.com' && password === 'password') {
    return { accessToken: 'mock-token-abc123', user: demoUser };
  }
  const err = new Error('Invalid credentials (mock)');
  err.status = 401;
  throw err;
};

export const mockVerifyOtp = async (body) => {
  await delay(300);
  const { email, otp } = body || {};
  if (email === demoUser.email && otp === '123456') {
    return { accessToken: 'mock-token-abc123', user: demoUser };
  }
  const err = new Error('Invalid OTP (mock)');
  err.status = 401;
  throw err;
};

export default {
  mockLogin,
  mockVerifyOtp,
};
