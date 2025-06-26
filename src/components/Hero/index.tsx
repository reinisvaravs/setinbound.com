"use client";

// import Image from "next/image";
import Link from "next/link";
import CallAgentButton from "../Common/CallAgentButton";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-primary-WHITE_DARK pb-20 pt-[120px] md:pt-[130px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 mt-20 text-3xl font-extrabold uppercase leading-snug text-secondary-GRAY sm:text-5xl sm:leading-snug lg:text-6xl lg:leading-[1.2]">
                  AI RECEPTIONISTS
                </h1>
                <p className="mx-auto mb-9 max-w-[600px] text-base font-normal text-secondary-LIGHT_GRAY sm:text-lg sm:leading-[1.44]">
                  Transform your Appointment booking with an AI-powered
                  receptionist that never sleeps and is up to 15x cheaper and
                  32x faster than the best human receptionists. Cut costs and
                  capture every opportunity, our intelligent receptionists help
                  you scale your business while reducing operational costs.
                </p>
                <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <CallAgentButton>Test Agent</CallAgentButton>
                  </li>
                  <li>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL || "tel:+371 28816633"}`}
                      target="_blank"
                      className="flex items-center gap-4 rounded-md bg-secondary-GRAY px-6 py-[14px] text-base font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-success-500"
                    >
                      Schedule a Call
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4">
              <div
                className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
                data-wow-delay=".25s"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
