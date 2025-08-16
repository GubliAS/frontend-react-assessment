import React from "react";

const LeadingTalentPlatformSection = () => {
  const statsData = [
    { value: "15,000+", label: "Active Job Seekers" },
    { value: "2,500+", label: "Registered Employers" },
    { value: "8,000+", label: "Successful Placements" },
    { value: "92%", label: "Satisfaction Rate" },
  ];

  return (
    <section
      className="mx-auto w-full max-w-7xl"
      style={{
        paddingLeft: "clamp(0.75rem, 4vw, 2rem)",
        paddingRight: "clamp(0.75rem, 4vw, 2rem)",
        paddingTop: "clamp(2rem, 6vw, 4rem)",
        paddingBottom: "clamp(2rem, 6vw, 4rem)",
        background:
          "linear-gradient(90deg, rgba(11,55,42,1) 0%, rgba(11,55,42,1) 100%)",
      }}
    >
      <div className="max-w-screen-xl w-full mx-auto text-center">
        <header className="mb-6 sm:mb-8">
          <h2
            className="mx-auto text-white font-semibold"
            style={{
              fontSize: "clamp(1.25rem, 4.5vw, 2.5rem)",
              lineHeight: 1.05,
            }}
          >
            Ghana&apos;s Leading Talent Platform
          </h2>
          <p
            className="mx-auto text-white/90 mt-2 max-w-2xl"
            style={{ fontSize: "clamp(0.9rem, 2.2vw, 1.125rem)" }}
          >
            Connecting youth and employers across the country.
          </p>
        </header>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch"
          role="region"
          aria-label="Platform statistics"
        >
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-md"
            >
              <div
                className="text-white font-extrabold text-center"
                style={{ fontSize: "clamp(1.5rem, 6vw, 2.75rem)" }}
                aria-label={`${stat.value} ${stat.label}`}
              >
                {stat.value}
              </div>

              <div
                className="mt-2 text-white/90 text-center"
                style={{ fontSize: "clamp(0.8rem, 1.8vw, 1rem)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadingTalentPlatformSection;