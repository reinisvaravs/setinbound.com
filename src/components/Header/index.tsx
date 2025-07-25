import Image from "next/image";
import Link from "next/link";
// import NavigationButtons from "./NavigationButtons";
import StickyHeader from "./StickyHeader";

const Header = () => {
  return (
    <StickyHeader>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-96 px-5">
            <Link href="/" className="navbar-logo block w-full p-2">
              <Image
                src={`/images/logo/logo-white-row.webp`}
                alt="logo"
                width={224}
                height={38}
                className="h-auto w-full py-2"
                priority
              />
            </Link>
          </div>
          {/* <div className="flex w-full items-center justify-between px-4">
            <NavigationButtons />
          </div> */}
          <div className="flex w-full items-center justify-end pr-4 md:pr-8 lg:pr-0">
            <Link
              href={`${process.env.NEXT_PUBLIC_SCHEDULE_CALL_URL || "tel:+371 28816633"}`}
              target="_blank"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-secondary-LIGHT_GRAY px-4 py-2 text-xs font-medium text-primary-WHITE transition duration-300 ease-in-out hover:bg-primary-WHITE hover:text-secondary-GRAY xs:h-8 xs:px-4 xs:text-xs sm:h-10 sm:px-5 sm:text-sm md:h-11 md:px-6 md:text-base lg:h-12 lg:px-7 lg:text-base xl:h-12 xl:px-8 xl:text-[15px]"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </div>
    </StickyHeader>
  );
};

export default Header;
