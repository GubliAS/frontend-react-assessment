"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "./shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import NotificationCenter from "./notification/NotificationCenter";
import { mockNotifications } from "../utils/messagingState";
const languageOptions = ["English", "Twi", "Ga", "Ewe"];

// Single unified navigation structure
const navigation = [
  {
    label: "Services",
    type: "dropdown",
    items: [
      { to: "/talent-matching", label: "Talent Matching" },
      { to: "/skill-development", label: "Skill Development" },
      { to: "/career-guidance", label: "Career Guidance" },
      { to: "/mentorship", label: "Mentorship" },
    ],
  },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/resources", label: "Resources" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const isAuth = useSelector((state) => state?.auth?.isAuthenticated);

  // include Dashboard in the nav for authenticated users
  const navToRender = isAuth
    ? [{ to: "/youth/dashboard", label: "Dashboard" }, ...navigation]
    : navigation;

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  console.log("isAuth", isAuth);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo (navigates home) */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0 group"
              onClick={() => {
                setOpenMenu(null);
                setIsMobileMenuOpen(false);
              }}
            >
              <div
                className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[rgb(151,177,150)]/25"
                style={{
                  width: "clamp(32px, 2.5vw, 40px)",
                  height: "clamp(32px, 2.5vw, 40px)",
                }}
              >
                <span
                  style={{
                    width: "clamp(16px, 1.2vw, 20px)",
                    height: "clamp(16px, 1.2vw, 20px)",
                    color: "white",
                  }}
                  className="flex items-center justify-center"
                >
                  ★
                </span>
              </div>
              <span
                className="font-bold text-[#111827] whitespace-nowrap transition-colors duration-300 group-hover:text-[var(--gold-900)]"
                style={{ fontSize: "clamp(14px, 1.4vw, 20px)" }}
              >
                Ghana Talent Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center flex-1 justify-center">
              <div
                className="flex items-center"
                style={{ gap: "clamp(16px, 2vw, 32px)" }}
              >
                {navToRender.map((nav) =>
                  nav.type === "dropdown" ? (
                    <div key={nav.label} className="relative group">
                      <button
                        onClick={() => toggleMenu(nav.label)}
                        className="flex items-center gap-1 text-[var(--river-bed)] hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-transparent hover:bg-clip-text transition-all duration-300 whitespace-nowrap"
                        style={{
                          fontSize: "clamp(12px, 0.9vw, 16px)",
                        }}
                      >
                        {nav.label}
                        <span
                          className={`flex items-center transition-transform duration-300 ${
                            openMenu === nav.label ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      {openMenu === nav.label && (
                        <div className="absolute bg-slate-800/95 backdrop-blur-md border-white/20 shadow-xl mt-2">
                          {nav.items.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="block px-4 py-2 text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600/20 hover:text-white transition-all duration-200"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={nav.to}
                      to={nav.to}
                      className="text-[var(--river-bed)] hover:bg-gradient-to-r hover:from-green-600 hover:to-emerald-600 hover:text-transparent hover:bg-clip-text transition-all duration-300 whitespace-nowrap relative group"
                      style={{ fontSize: "clamp(12px, 0.9vw, 16px)" }}
                    >
                      {nav.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Right Side */}
            <div
              className="hidden md:flex items-center flex-shrink-0"
              style={{ gap: "clamp(8px, 1vw, 16px)" }}
            >
              {/* Language Dropdown */}
              <div className="relative">
                <Button
                  onClick={() => toggleMenu("language")}
                  variant="ghost"
                  className="flex items-center gap-1 whitespace-nowrap group"
                  style={{
                    fontSize: "clamp(12px, 0.9vw, 16px)",
                    padding: "0 clamp(10px, 1vw, 14px)",
                  }}
                >
                  English
                  <span
                    className={`transition-transform duration-300 ${
                      openMenu === "language" ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </Button>
                {openMenu === "language" && (
                  <div className="absolute bg-slate-800/95 backdrop-blur-md border-white/20 shadow-xl mt-2">
                    {languageOptions.map((lang) => (
                      <div
                        key={lang}
                        className="text-white hover:bg-[var(--gold-400)]/20 hover:text-[var(--gold-400)] transition-all duration-200 cursor-pointer px-4 py-2"
                        onClick={() => setOpenMenu(null)}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            

              {/* Profile / Avatar + Dropdown (show when authenticated) */}
              {isAuth ? (
                <>
                  {/* Notifications Popover */}
              <div className="relative ml-2">
                <NotificationCenter
                  notifications={mockNotifications}
                  // wire real props when available
                />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              </div>
              <ProfileMenu />
                </>
              ) : (
                /* Sign In Button - only show when NOT authenticated */
                <Link to="/login">
                  <Button
                    variant="emeraldGradient"
                    className="border-white/30 hover:border-[rgb(151,177,150)] hover:text-white hover:shadow-lg hover:shadow-[rgb(151,177,150)]/25 rounded-full transition-all duration-300 whitespace-nowrap transform hover:scale-105"
                    style={{
                      fontSize: "clamp(12px, 0.9vw, 14px)",
                      padding: "clamp(6px, 0.5vw, 8px) clamp(12px, 1vw, 16px)",
                    }}
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex-shrink-0">
              <Button
                variant="secondary"
                size="small"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[var(--ebony-50)] hover:bg-[rgb(151,177,150)]/20 hover:text-[var(--ebony-50)] transition-all duration-300"
              >
                {isMobileMenuOpen ? "✖" : "☰"}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-white/10">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navToRender.map((nav) =>
                  nav.type === "dropdown" ? (
                    <div key={nav.label}>
                      <div
                        onClick={() => toggleMenu(nav.label)}
                        className="px-3 py-2 text-white hover:bg-[var(--gold-400)]/30 hover:text-[var(--gold-400)] rounded transition-all duration-200 cursor-pointer flex justify-between items-center"
                      >
                        {nav.label}
                        <span
                          className={`transition-transform duration-300 ${
                            openMenu === nav.label ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </div>
                      {openMenu === nav.label && (
                        <div className="pl-4">
                          {nav.items.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="block px-3 py-2 text-white hover:bg-[var(--gold-400)]/20 hover:text-[var(--gold-400)] rounded transition-all duration-200"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={nav.to}
                      to={nav.to}
                      className="block px-3 py-2 text-white hover:bg-[var(--gold-400)]/30 hover:text-[var(--gold-400)] rounded transition-all duration-200 relative group"
                      style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
                    >
                      {nav.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--gold-400)] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* replace fixed tailwind spacer with same CSS variable so it always matches nav height */}
      {/* <div style={{ height: "var(--header-height)" }} /> */}
    </>
  );
}

// Add the ProfileMenu component near bottom of this file (or extract to its own file if preferred)
const ProfileMenu = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 rounded-full p-1 hover:bg-gray-100 focus:outline-none"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center text-sm font-medium">
          {user?.firstName?.charAt(0) || "U"}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 border border-gray-100">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800 truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="py-1">
            <Link to="/youth/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Account Information</Link>
            {/* <Link to="/youth/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Notifications & Reminders</Link> */}
            <Link to="/youth/subscription" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Subscription & Billing</Link>
            <Link to="/youth/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
            <Link to="/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Support</Link>
          </div>
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={() => navigate('/logout')}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
