"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./shared/Button";

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

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0 group cursor-pointer">
              <div
                className="bg-[var(--gold-400)] rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[rgb(151,177,150)]/25"
                style={{
                  width: "clamp(32px, 2.5vw, 40px)",
                  height: "clamp(32px, 2.5vw, 40px)",
                }}
              >
                <span
                  style={{
                    width: "clamp(16px, 1.2vw, 20px)",
                    height: "clamp(16px, 1.2vw, 20px)",
                    color: "var(--ebony-50)",
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
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center flex-1 justify-center">
              <div
                className="flex items-center"
                style={{ gap: "clamp(16px, 2vw, 32px)" }}
              >
                {navigation.map((nav) =>
                  nav.type === "dropdown" ? (
                    <div key={nav.label} className="relative group">
                      <button
                        onClick={() => toggleMenu(nav.label)}
                        className="flex items-center gap-1 text-[var(--river-bed)] hover:text-[var(--gold-400)] transition-all duration-300 whitespace-nowrap"
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
                              className="block px-4 py-2 text-white hover:bg-[var(--gold-400)]/20 hover:text-[var(--gold-400)] transition-all duration-200"
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
                      className="text-[var(--river-bed)] hover:text-[var(--gold-400)] transition-all duration-300 whitespace-nowrap relative group"
                      style={{ fontSize: "clamp(12px, 0.9vw, 16px)" }}
                    >
                      {nav.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--gold-400)] transition-all duration-300 group-hover:w-full"></span>
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

              {/* Sign In Button */}
              <a href="/login">
                <Button
                  className="border-white/30 hover:border-[rgb(151,177,150)] hover:text-white hover:shadow-lg hover:shadow-[rgb(151,177,150)]/25 rounded-full transition-all duration-300 whitespace-nowrap transform hover:scale-105"
                  style={{
                    fontSize: "clamp(12px, 0.9vw, 14px)",
                    padding: "clamp(6px, 0.5vw, 8px) clamp(12px, 1vw, 16px)",
                  }}
                >
                  Sign In
                </Button>
              </a>
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
                {navigation.map((nav) =>
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
      <div className="h-16"></div>
    </>
  );
}
