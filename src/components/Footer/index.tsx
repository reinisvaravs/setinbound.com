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
      className="wow fadeInUp bg-accent-BLUE relative z-10 pt-20 pb-10 lg:pt-[100px]"
      data-wow-delay=".15s"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-10 w-full">
              <Link href="/" className="mb-6 inline-block max-w-[160px]">
                <Image
                  src="/images/logo/lintra-logo-white.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="max-w-full"
                />
              </Link>
              <p className="text-primary-WHITE mb-8 max-w-[270px] text-base">
                Transforming businesses through intelligent automation and
                cutting-edge AI solutions.
              </p>
            </div>
          </div>
          <div className="-mx-3 flex items-center pl-9">
            <MdEmail className="-mx-2 fill-white" />
            <Link
              aria-label="social link"
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "rr.varavs@gmail.com"}`}
              className="text-primary-WHITE px-3"
            >
              {process.env.NEXT_PUBLIC_EMAIL || "rr.varavs@gmail.com"}
            </Link>
            <button
              onClick={() => {
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
                navigator.clipboard.writeText("hello@lintraai.com");
              }}
              className="-mx-1"
            >
              {!isCopied && (
                <MdContentCopy className="clipboard fill-primary-WHITE" />
              )}
              {isCopied && <FaCheck className="check fill-primary-WHITE" />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
