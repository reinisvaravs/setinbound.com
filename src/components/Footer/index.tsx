"use client";

import Image from "next/image";
import Link from "next/link";
import { MdEmail, MdContentCopy } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <footer
      className="wow fadeInUp relative z-10 bg-accent-BLUE pb-10 pt-20 lg:pt-[100px]"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <Link href="/" className="mb-6 inline-block max-w-[160px]">
                <Image
                  src="/images/logo/logo-white-row.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="ml-6 max-w-full scale-150"
                />
              </Link>
              <p className="mb-8 max-w-[270px] text-base text-primary-WHITE">
                Transforming businesses through intelligent automation and
                cutting-edge AI solutions.
              </p>
            </div>
          </div>
          <div className="-mx-3 flex flex-col items-start justify-center gap-1 pl-9">
            <div className="flex flex-row flex-nowrap items-center justify-center mb-10">
              <MdEmail className="-mx-2 fill-white" />
              <Link
                aria-label="social link"
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "rr.varavs@gmail.com"}`}
                className="px-3 text-primary-WHITE"
              >
                {process.env.NEXT_PUBLIC_EMAIL || "rr.varavs@gmail.com"}
              </Link>
              <button
                onClick={() => {
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 2000);
                  navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_EMAIL || "rr.varavs@gmail.com"}`,
                  );
                }}
                className="-mx-1"
              >
                {!isCopied && (
                  <MdContentCopy className="clipboard fill-primary-WHITE" />
                )}
                {isCopied && <FaCheck className="check fill-primary-WHITE" />}
              </button>
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-center">
              <Link
                aria-label="privacy policy"
                href="/privacy-policy"
                target="_blank"
                className="px-3 text-primary-WHITE"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-center">
              <Link
                aria-label="privacy policy"
                href="/terms-and-conditions"
                target="_blank"
                className="px-3 text-primary-WHITE"
              >
                Terms & Conditions
              </Link>
            </div>
            <div className="flex flex-row flex-nowrap items-center justify-center">
              <Link
                aria-label="privacy policy"
                href="/refund-policy"
                target="_blank"
                className="px-3 text-primary-WHITE"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
