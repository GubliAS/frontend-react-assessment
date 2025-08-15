import React from "react";
import Button from "../components/shared/Button"; // Adjust the import path as needed

const LaunchYourCareerSection = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <section className="flex flex-col max-w-screen-lg w-[1024px] mx-auto items-center gap-4 p-12 relative rounded-2xl bg-[linear-gradient(90deg,rgba(240,253,244,1)_0%,rgba(240,253,244,1)_29%,rgba(240,253,244,1)_100%)]">
        <header className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <h1 className="relative self-stretch mt-[-1.00px] font-semantic-heading-2 font-[number:var(--semantic-heading-2-font-weight)] text-ebony text-[length:var(--semantic-heading-2-font-size)] text-center tracking-[var(--semantic-heading-2-letter-spacing)] leading-[var(--semantic-heading-2-line-height)] [font-style:var(--semantic-heading-2-font-style)]">
            Ready to Launch Your Career?
          </h1>
        </header>

        <div className="flex-col max-w-2xl w-[672px] items-center flex relative flex-[0_0_auto]">
          <p className="relative w-fit mt-[-1.00px] font-inter-regular font-[number:var(--inter-regular-font-weight)] text-ebony text-[length:var(--inter-regular-font-size)] text-center tracking-[var(--inter-regular-letter-spacing)] leading-[var(--inter-regular-line-height)] [font-style:var(--inter-regular-font-style)]">
            Join thousands of youth who have found their dream jobs through
            <br />
            Ghana Talent Hub.
          </p>
        </div>

        <div className="items-start justify-center gap-[0.01px] pt-4 pb-0 px-0 self-stretch w-full flex relative flex-[0_0_auto]">
          <Button
            variant="primary"
            size="medium"
            type="button"
            className="px-8 py-3 bg-[#ffb12d] text-ebony hover:text-white hover:bg-gth-color-stylesgoldnormal-hover active:bg-gth-color-stylesgoldnormal-active focus:ring-gth-color-stylesgoldnormal rounded-full font-inter-medium font-[number:var(--inter-medium-font-weight)] text-[length:var(--inter-medium-font-size)] tracking-[var(--inter-medium-letter-spacing)] leading-[var(--inter-medium-line-height)] [font-style:var(--inter-medium-font-style)]"
            aria-label="Get started with Ghana Talent Hub for free"
          >
            Get Started - It's Free
          </Button>

          <div className="inline-flex flex-col items-start justify-center pl-4 pr-0 py-0 relative self-stretch flex-[0_0_auto]">
            <Button
            variant="outlineEbony"
              size="medium"
              type="button"
              className="px-[33px] py-[13px]  butt border border-solid active:bg-gray-100 focus:ring-ebony rounded-full font-inter-medium font-[number:var(--inter-medium-font-weight)] text-[length:var(--inter-medium-font-size)] tracking-[var(--inter-medium-letter-spacing)] leading-[var(--inter-medium-line-height)] [font-style:var(--inter-medium-font-style)] flex-1 grow"
              aria-label="Learn more about Ghana Talent Hub"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaunchYourCareerSection;