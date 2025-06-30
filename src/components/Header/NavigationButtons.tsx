"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationButtons = () => {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-end pr-4 md:pr-8 lg:pr-0">
      {pathname === "/" && (
        <Link
          href="/referral"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-secondary-LIGHT_GRAY px-4 py-2 text-xs font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-primary-WHITE hover:text-secondary-GRAY xs:h-8 xs:px-4 xs:text-xs sm:h-10 sm:px-5 sm:text-sm md:h-11 md:px-6 md:text-base lg:h-12 lg:px-7 lg:text-base xl:h-12 xl:px-8 xl:text-[15px]"
        >
          Have a referral?
        </Link>
      )}
      {pathname !== "/" && (
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-secondary-LIGHT_GRAY px-4 py-2 text-xs font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-primary-WHITE hover:text-secondary-GRAY xs:h-8 xs:px-4 xs:text-xs sm:h-10 sm:px-5 sm:text-sm md:h-11 md:px-6 md:text-base lg:h-12 lg:px-7 lg:text-base xl:h-12 xl:px-8 xl:text-[15px]"
        >
          Home
        </Link>
      )}
    </div>
  );
};

export default NavigationButtons;
