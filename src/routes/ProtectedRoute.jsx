import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// role prop values: "seeker" | "employer" | "admin" (optional)
const roleMap = {
  seeker: ["applicant", "seeker"],
  employer: ["employer", "company"],
  admin: ["admin"],
};

export default function ProtectedRoute({ children, role }) {
  const isAuth = useSelector((state) => state?.auth?.isAuthenticated);
  const user = useSelector((state) => state?.auth?.user);
  const location = useLocation();

  const token = cookies.get("auth_token");

  // redirect if completely unauthenticated
  if (!isAuth && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // if we have a token but no user in Redux, try to read the user cookie as fallback.
  const cookieUser = cookies.get("user");
  let parsedCookieUser = null;
  try {
    parsedCookieUser = typeof cookieUser === "string" ? JSON.parse(cookieUser) : cookieUser;
  } catch (e) {
    parsedCookieUser = null;
  }

  const effectiveUser = user || parsedCookieUser;

  // If token exists but we don't have a user, force re-auth (login) or fetch profile.
  if (token && !effectiveUser) {
    // Optionally you could fetch /me here instead of redirecting.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role) {
    const allowed = roleMap[role] || [role];
    const userRole = effectiveUser?.role;
    if (userRole && !allowed.includes(userRole)) {
      const redirect = userRole === "applicant" ? "/youth/dashboard" : "/employer/dashboard";
      return <Navigate to={redirect} replace />;
    }
  }

  return children;
}