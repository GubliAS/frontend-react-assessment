import React from "react";

const LeadingTalentPlatformSection = () => {
  const statsData = [
    {
      value: "15,000+",
      label: "Active Job Seekers",
    },
    {
      value: "2,500+",
      label: "Registered Employers",
    },
    {
      value: "8,000+",
      label: "Successful Placements",
    },
    {
      value: "92%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto flex flex-col items-start p-20 relative bg-[linear-gradient(90deg,rgba(11,55,42,1)_0%,rgba(11,55,42,1)_100%)]">
      <div className="flex-col max-w-screen-xl items-start gap-12 px-4 py-0 w-full flex-[0_0_auto] flex relative">
        <header className="flex-col items-center gap-4 self-stretch w-full flex-[0_0_auto] flex relative">
          <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
            <h1 className="relative self-stretch mt-[-1.00px] font-semantic-heading-2 font-[number:var(--semantic-heading-2-font-weight)] text-white text-[length:var(--semantic-heading-2-font-size)] text-center tracking-[var(--semantic-heading-2-letter-spacing)] leading-[var(--semantic-heading-2-line-height)] [font-style:var(--semantic-heading-2-font-style)]">
              Ghana&#39;s Leading Talent Platform
            </h1>
          </div>

          <div className="flex-col max-w-2xl w-[672px] items-center flex-[0_0_auto] flex relative">
            <p className="relative w-fit mt-[-1.00px] font-inter-regular font-[number:var(--inter-regular-font-weight)] text-white text-[length:var(--inter-regular-font-size)] text-center tracking-[var(--inter-regular-letter-spacing)] leading-[var(--inter-regular-line-height)] whitespace-nowrap [font-style:var(--inter-regular-font-style)]">
              Connecting youth and employers across the country.
            </p>
          </div>
        </header>

        <div
          className="items-start justify-center gap-8 self-stretch w-full flex-[0_0_auto] flex relative"
          role="region"
          aria-label="Platform statistics"
        >
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="flex-col items-start gap-2 flex-1 self-stretch grow flex relative"
            >
              <div className="flex-col items-center self-stretch w-full flex-[0_0_auto] flex relative">
                <div
                  className="relative self-stretch mt-[-1.00px] font-inter-bold font-[number:var(--inter-bold-font-weight)] text-white text-[length:var(--inter-bold-font-size)] text-center tracking-[var(--inter-bold-letter-spacing)] leading-[var(--inter-bold-line-height)] [font-style:var(--inter-bold-font-style)]"
                  aria-label={`${stat.value} ${stat.label}`}
                >
                  {stat.value}
                </div>
              </div>

              <div className="flex-col items-center self-stretch w-full flex-[0_0_auto] flex relative">
                <div className="relative self-stretch mt-[-1.00px] font-inter-regular font-[number:var(--inter-regular-font-weight)] text-white text-[length:var(--inter-regular-font-size)] text-center tracking-[var(--inter-regular-letter-spacing)] leading-[var(--inter-regular-line-height)] [font-style:var(--inter-regular-font-style)]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadingTalentPlatformSection;