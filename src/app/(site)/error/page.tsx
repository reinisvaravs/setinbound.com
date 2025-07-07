import BackHomeBtn from "@/components/Common/BackHomeBtn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error - Something went wrong",
  description: "An error occurred while processing your request.",
};

export default function ErrorPage() {
  return (
    <section className="relative z-10 py-[120px]">
      <div className="container">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[570px] text-center">
              <h2 className="mb-2.5 text-4xl font-bold text-white md:text-[45px] md:leading-[1.44]">
                Oops!
              </h2>
              <h3 className="mb-4 text-2xl font-semibold text-white">
                Something went wrong
              </h3>
              <p className="mb-10 text-base text-dark-6">
                We apologize for the inconvenience. Please try again later or
                contact support if the problem persists.
              </p>
              <BackHomeBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
