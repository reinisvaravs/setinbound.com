import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy | Setinbound.com",
  description: "Refund Policy | Setinbound.com",
};

export default function RefundPolicy() {
  return (
    <section className="relative z-10 py-[120px]">
      <div className="container">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[570px] text-center">
              <h2 className="mb-2.5 text-4xl font-bold text-dark dark:text-white md:text-[45px] md:leading-[1.44]">
                Refund Policy
              </h2>
              <h3 className="mb-4 text-2xl font-semibold text-dark dark:text-white">
                Refund Policy
              </h3>
              <p className="mb-10 text-base text-body-color dark:text-dark-6">
                Refund Policy
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-opacity-90"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
