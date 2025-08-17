import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./shared/Button";
import heroImg from "../assets/hero-graduate.png";
import heroEmployer from "../assets/hero-employer.png";
// background image (place uploaded background at src/assets/hero-bg.png)
import heroBg from "../assets/hero-background.png";

const Hero = () => {
  const [accountType, setAccountType] = useState("youth"); // "youth" | "employer"

  const content = {
    youth: {
      title: "Launch Your Dream Career Today",
      paragraph:
        "Access free education, expert mentorship, and direct connections to top employers across Ghana. Your future starts here.",
      cta: { text: "Create Your Profile", to: "/register?role=seeker" },
      image: heroImg,
      alt: "Graduate holding a laptop",
    },
    employer: {
      title: "Hire Top Ghanaian Talent",
      paragraph:
        "Find qualified candidates, post roles quickly, and connect directly with Ghana’s emerging talent pool.",
      cta: { text: "Create Employer Account", to: "/register?role=employer" },
      // use employer-specific image if present, else fall back to heroImg
      image: heroEmployer || heroImg,
      alt: "Employers hiring top talent",
    },
  };

  const active = content[accountType];

  return (
    <section
      aria-label="Launch your career"
      className="relative w-full max-w-7xl mx-auto"
      style={{
        // layered background: subtle white gradient on the left for text contrast + uploaded background image
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 40%, rgba(255,255,255,0.0) 75%), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
        paddingLeft: "clamp(1rem, 4vw, 3rem)",
        paddingRight: "clamp(1rem, 4vw, 3rem)",
        /* ensure section sits below fixed header: header height + small responsive offset */
        paddingTop: "calc(var(--header-height, 64px) + clamp(0.75rem, 4vw, 2rem))",
        paddingBottom: "clamp(1.25rem, 4vw, 3rem)",
      }}
    >
      {/* centered toggler (uses shared Button component) */}
      <div className="w-full flex justify-center mb-6">
        <div
          role="tablist"
          aria-label="Account type"
          className="inline-flex items-center rounded-full bg-white/90 shadow-md p-1"
          style={{ gap: "4px" }}
        >
          <Button
            role="tab"
            size="small"
            variant={accountType === "youth" ? "primary" : "seekerOremployer"}
            onClick={() => setAccountType("youth")}
            aria-selected={accountType === "youth"}
            aria-pressed={accountType === "youth"}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              accountType === "youth" ? "shadow-sm" : "hover:shadow-none"
            }`}
          >
            Youth
          </Button>

          <Button
            role="tab"
            size="small"
            variant={accountType === "employer" ? "primary" : "seekerOremployer"}
            onClick={() => setAccountType("employer")}
            aria-selected={accountType === "employer"}
            aria-pressed={accountType === "employer"}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              accountType === "employer" ? "shadow-sm" : "hover:shadow-none"
            }`}
          >
            Employer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left column: copy */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1
            className="font-bold text-slate-900"
            style={{ fontSize: "clamp(1.6rem, 4.6vw, 3rem)", lineHeight: 1.02 }}
          >
            {active.title}
          </h1>

          <p
            className="mt-4 text-slate-700 max-w-xl mx-auto md:mx-0"
            style={{ fontSize: "clamp(.95rem, 1.8vw, 1.125rem)" }}
          >
            {active.paragraph}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-4">
            <Link to={active.cta.to} className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="medium"
                className="rounded-full"
                style={{
                  padding: "clamp(.55rem, 1.6vw, .85rem) clamp(1rem, 3.5vw, 1.6rem)",
                  fontSize: "clamp(.95rem, 1.8vw, 1.05rem)",
                  minWidth: "clamp(150px, 32%, 220px)",
                }}
              >
                {active.cta.text}
              </Button>
            </Link>

            <Link to="/about" className="w-full sm:w-auto">
              <Button
                variant="outlineEbony"
                size="medium"
                className="rounded-full"
                style={{
                  padding: "clamp(.55rem, 1.6vw, .85rem) clamp(.9rem, 3.5vw, 1.3rem)",
                  fontSize: "clamp(.9rem, 1.6vw, 1rem)",
                  minWidth: "clamp(120px, 32%, 200px)",
                }}
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right column: image (square crop like design) */}
        <div className="order-1 md:order-2 flex items-center justify-center">
          <div
            className="w-full rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
            style={{
              maxWidth: "min(576px, 100%)",
              width: "100%",
              aspectRatio: "1 / 1",
            }}
          >
            <img src={active.image} alt={active.alt} className="w-full h-full object-cover block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;