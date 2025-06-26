"use client";

// import { useState } from "react";
// import toast from "react-hot-toast";

const CallToAction = () => {
  // const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <section
      id="call-section"
      className="relative z-10 overflow-hidden bg-primary-WHITE_DARK py-20 lg:py-[115px]"
    >
      <div className="container mx-auto">
        <div className="relative overflow-hidden">
          <div className="-mx-4 flex flex-wrap items-stretch">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[570px] text-center">
                <h2 className="mb-2.5 text-3xl font-bold text-secondary-GRAY md:text-[38px] md:leading-[1.44]">
                  <span>Experience Our Demo AI Receptionist</span>
                </h2>
                <p className="mx-auto mb-6 max-w-[515px] text-base leading-[1.5] text-secondary-LIGHT_GRAY">
                  Click below to call our AI Receptionist directly
                </p>
                <div className="my-6">
                  <a
                    className="inline-flex items-center justify-center rounded-md bg-accent-BLUE px-4 py-2 text-xs font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-secondary-GRAY hover:text-primary-WHITE xs:h-8 xs:px-4 xs:text-xs sm:h-10 sm:px-5 sm:text-sm md:h-11 md:px-6 md:text-base lg:h-12 lg:px-7 lg:text-base xl:h-12 xl:px-8 xl:text-[15px]"
                    href={`tel:${process.env.NEXT_PUBLIC_RETELL_PHONE_NUMBER || "+37128816633"}`}
                  >
                    Call Agent
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none">
        <span className="absolute left-0 top-0">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="12"
            />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="13"
            />
          </svg>
        </span>
      </div>
    </section>
  );
};

export default CallToAction;
