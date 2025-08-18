import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const BASE =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) ||
  'http://localhost:9000' || process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔹 Request Interceptor → attach token from cookies
api.interceptors.request.use((config) => {
  try {
    const token = cookies.get("auth_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
}, (error) => Promise.reject(error));

// 🔹 Response Interceptor → refresh token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Call refresh token API
        const refreshToken = cookies.get("refresh_token");
        if (refreshToken) {
          const { data } = await axios.post(`${BASE}/refresh`, { refresh_token: refreshToken });
          
          // Save new tokens in cookies
          cookies.set("auth_token", data.access_token, { path: "/", secure: true, sameSite: "strict" });
          cookies.set("refresh_token", data.refresh_token, { path: "/", secure: true, sameSite: "strict" });

          // Retry original request with new token
          error.config.headers.Authorization = `Bearer ${data.access_token}`;
          return api.request(error.config);
        }
      } catch (refreshError) {
        // If refresh fails → clear cookies & redirect
        cookies.remove("auth_token", { path: "/" });
        cookies.remove("refresh_token", { path: "/" });
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
