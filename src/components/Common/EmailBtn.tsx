import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { MdContentCopy, MdEmail } from "react-icons/md";
import { useState } from "react";

function EmailBtn() {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
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
    </>
  );
}

export default EmailBtn;
