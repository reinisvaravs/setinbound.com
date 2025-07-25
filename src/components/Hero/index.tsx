// import Image from "next/image";
// import Link from "next/link";
// import CallAgentButton from "../Common/CallAgentButton";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-primary-WHITE_DARK pb-8 pt-[110px] md:pb-32 md:pt-[150px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-12 mt-20 text-3xl font-extrabold uppercase leading-snug text-secondary-GRAY sm:text-4xl md:whitespace-nowrap md:text-5xl lg:text-6xl lg:leading-[1.2]">
                  Never Miss a Lead Again
                </h1>
                <p className="mx-auto mb-6 max-w-[450px] px-1 font-light leading-relaxed text-secondary-LIGHT_GRAY sm:-mt-3 sm:mb-9 sm:max-w-[500px] sm:text-base text-sm sm:leading-[1.44] md:max-w-[600px] md:text-base md:leading-[1.44] lg:-mt-3 lg:mb-9 lg:max-w-[600px]  lg:leading-[1.44]">
                  We turn every inbound lead - from ads, your website, or
                  messages - into a qualified conversation. From the first hello
                  to the booked appointment (and every follow-up in between), we
                  handle it all. You stay focused on your work - we make sure no
                  lead falls through the cracks.
                </p>
                {/* <h2 className="sm:text-md mx-auto -mt-2 mb-16 w-[45%] whitespace-nowrap border-t-2 border-secondary-LIGHT_GRAY pt-2 text-sm font-normal leading-snug tracking-wide text-secondary-LIGHT_GRAY sm:w-[30%] md:w-[30%] md:text-lg lg:text-xl lg:leading-[1.2]">
                  For medical clinics
                </h2> */}
                {/* <ul className="mb-8 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <CallAgentButton>Test Agent</CallAgentButton>
                  </li>
                  <li>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL || "tel:+371 28816633"}`}
                      target="_blank"
                      className="flex items-center gap-2 rounded-md bg-secondary-LIGHT_GRAY px-3 py-5 text-sm font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-success-500 sm:gap-4 sm:px-6 sm:py-[14px] sm:text-base sm:mt-0 mt-5 sm:scale-100 scale-90"
                    >
                      Schedule a Call
                    </Link>
                  </li>
                </ul> */}
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
