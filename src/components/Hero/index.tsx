// import Image from "next/image";
import Link from "next/link";
import CallAgentButton from "../Common/CallAgentButton";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-primary-WHITE_DARK pb-16 pt-[110px] md:pb-20 md:pt-[120px] lg:pt-[160px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 mt-20 text-3xl font-extrabold uppercase leading-snug text-secondary-GRAY sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.2]">
                  AI receptionists
                </h1>
                <h2 className="sm:text-md mx-auto -mt-2 mb-16 w-[45%] whitespace-nowrap border-t-2 border-secondary-LIGHT_GRAY pt-2 text-sm font-normal leading-snug tracking-wide text-secondary-LIGHT_GRAY sm:w-[30%] md:w-[30%] md:text-lg lg:text-xl lg:leading-[1.2]">
                  For medical clinics
                </h2>
                <ul className="mb-8 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <CallAgentButton>Test Agent</CallAgentButton>
                  </li>
                  <li>
                    <Link
                      href={`${process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL || "tel:+371 28816633"}`}
                      target="_blank"
                      className="flex items-center gap-2 rounded-md bg-secondary-GRAY px-3 py-3 text-sm font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-success-500 sm:gap-4 sm:px-6 sm:py-[14px] sm:text-base"
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
