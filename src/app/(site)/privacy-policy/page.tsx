import { Metadata } from "next";
import Link from "next/link";
import PrivacyPolicyDocument from "./PrivacyPolicyDocument";

export const metadata: Metadata = {
  title: "Privacy Policy | Setinbound.com",
  description: "Privacy Policy | Setinbound.com",
};

export default function PrivacyPolicy() {
  return (
    <section className="relative z-10 bg-primary-WHITE_DARK py-[120px]">
      <div className="container">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[570px] text-center">
              <h2 className="mb-2.5 text-4xl font-bold text-secondary-GRAY md:text-[45px] md:leading-[1.44]">
                Privacy Policy
              </h2>
              <PrivacyPolicyDocument />
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
