"use client";

import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useState } from "react";

function EmailBtn() {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <Link
        aria-label="social link"
        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "rr.varavs@gmail.com"}`}
        className="ease rounded-md px-3 text-primary-WHITE transition-all duration-300 hover:bg-secondary-GRAY"
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
        className="ease rounded-full p-2 transition duration-300 hover:bg-secondary-GRAY"
      >
        {!isCopied && <MdContentCopy className="fill-primary-WHITE" />}
        {isCopied && <FaCheck className="fill-primary-WHITE" />}
      </button>
    </>
  );
}

export default EmailBtn;
