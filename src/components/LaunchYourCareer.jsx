import React from "react";
import Button from "../components/shared/Button";

const LaunchYourCareerSection = () => {
  return (
    <section
      className="mx-auto w-full max-w-7xl rounded-2xl bg-[linear-gradient(90deg,#f0fdf4_0%,#f0fdf4_100%)] p-6 sm:p-10 md:p-12"
      style={{ paddingLeft: "clamp(1rem, 4vw, 3rem)", paddingRight: "clamp(1rem, 4vw, 3rem)" }}
    >
      <header className="w-full flex flex-col items-center text-center">
        <h1
          className="font-semantic-heading-2 text-ebony font-semibold"
          style={{ fontSize: "clamp(1.375rem, 4vw, 2.25rem)", lineHeight: 1.05 }}
        >
          Ready to Launch Your Career?
        </h1>

        <p
          className="mt-3 text-ebony/90 max-w-2xl"
          style={{ fontSize: "clamp(0.95rem, 2.4vw, 1.125rem)" }}
        >
          Join thousands of youth who have found their dream jobs through Ghana Talent Hub.
        </p>
      </header>

      <div className="mt-6 w-full flex justify-center">
        <div className="w-full max-w-2xl">
          {/* Buttons: stacked on very small screens, inline on sm+ */}
          <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              variant="primary"
              size="medium"
              type="button"
              aria-label="Get started with Ghana Talent Hub for free"
              className="rounded-full font-inter-medium"
              style={{
                padding: "clamp(0.6rem, 1.6vw, 0.9rem) clamp(1.25rem, 4vw, 2.25rem)",
                fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
                minWidth: "clamp(140px, 36%, 220px)",
              }}
            >
              Get Started - It's Free
            </Button>

            <Button
              variant="outlineEbony"
              size="medium"
              type="button"
              aria-label="Learn more about Ghana Talent Hub"
              className="rounded-full border font-inter-medium"
              style={{
                padding: "clamp(0.6rem, 1.6vw, 0.9rem) clamp(1.25rem, 4vw, 2.25rem)",
                fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
                minWidth: "clamp(120px, 36%, 220px)",
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LaunchYourCareerSection;