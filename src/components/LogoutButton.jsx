import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Button from "../components/shared/Button";
import { logout as clearAuth } from "../redux/auth/authSlice";
import { logoutSeeker, logoutEmployer } from "../services/auth";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const cookies = new Cookies();

export default function LogoutButton({ className, children }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);
  const role = user?.role || "";

  const handleLogout = async () => {
    setLoading(true);
    try {
      if (role === "applicant" || role === "seeker") {
        try { await logoutSeeker({}); } catch (e) {}
      } else if (role === "employer" || role === "company") {
        try { await logoutEmployer({}); } catch (e) {}
      }
    } finally {
      try {
        cookies.remove("auth_token", { path: "/" });
        cookies.remove("user", { path: "/" });
      } catch (e) {}
      dispatch(clearAuth());
      setLoading(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      size="small"
      className={className}
      startIcon={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
      disabled={loading}
    >
    {children || (loading ? "Logging out..." : "Logout")  }
    </Button>
  );
}