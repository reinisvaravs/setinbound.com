"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = () => {
  const pathUrl = usePathname();

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <>
      <header
        className={`ud-header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "shadow-nav bg-secondary-GRAY fixed z-[999] border-b border-stroke bg-opacity-95 backdrop-blur-[1px]"
            : "bg-secondary-GRAY absolute"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <Link href="/" className="navbar-logo block w-full p-2">
                <Image
                  src={`/images/logo/lintra-logo-white.png`}
                  alt="logo"
                  width={240}
                  height={30}
                  className="header-logo hidden w-full dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div className="flex w-full items-center justify-end pr-16 lg:pr-0">
                {pathUrl === "/" && (
                  <Link
                    href="/referal"
                    className="hover:bg-primary-WHITE hover:text-secondary-GRAY bg-secondary-LIGHT_GRAY text-primary-WHITE inline-flex items-center justify-center rounded-md px-6 py-2 text-base font-medium transition duration-300 ease-in-out xs:h-8 xs:text-xs xs:px-2 xl:h-12 xl:text-[14px] xl:px-2"
                  >
                    Have a referral?
                  </Link>
                )}
                {pathUrl !== "/" && (
                  <Link
                    href="/"
                    className="hover:bg-primary-WHITE hover:text-secondary-GRAY bg-secondary-LIGHT_GRAY text-primary-WHITE inline-flex items-center justify-center rounded-md px-6 py-2 text-base font-medium transition duration-300 ease-in-out xs:h-8 xs:text-xs xs:px-6 xl:h-12 xl:text-[14px] xl:px-6"
                  >
                    Home
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
