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
            ? "shadow-nav fixed z-[999] border-b border-stroke bg-secondary-GRAY bg-opacity-95 backdrop-blur-[1px]"
            : "absolute bg-secondary-GRAY"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-5">
              <Link href="/" className="navbar-logo block w-full p-2">
                <Image
                  src={`/images/logo/logo-white-row.png`}
                  alt="logo"
                  width={240}
                  height={30}
                  className="header-logo w-full scale-150 py-4"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div className="flex w-full items-center justify-end pr-4 md:pr-8 lg:pr-0">
                {pathUrl === "/" && (
                  <Link
                    href="/referral"
                    className="inline-flex items-center justify-center rounded-md bg-secondary-LIGHT_GRAY px-4 py-2 text-xs font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-primary-WHITE hover:text-secondary-GRAY xs:h-8 xs:px-4 xs:text-xs sm:h-10 sm:px-5 sm:text-sm md:h-11 md:px-6 md:text-base lg:h-12 lg:px-7 lg:text-base xl:h-12 xl:px-8 xl:text-[15px]"
                  >
                    Have a referral?
                  </Link>
                )}
                {pathUrl !== "/" && (
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-secondary-LIGHT_GRAY px-4 py-2 text-xs font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-primary-WHITE hover:text-secondary-GRAY xs:h-8 xs:px-4 xs:text-xs sm:h-10 sm:px-5 sm:text-sm md:h-11 md:px-6 md:text-base lg:h-12 lg:px-7 lg:text-base xl:h-12 xl:px-8 xl:text-[15px]"
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
