import Image from "next/image";
import Link from "next/link";
import NavigationButtons from "./NavigationButtons";
import StickyHeader from "./StickyHeader";

const Header = () => {
  return (
    <StickyHeader>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-5">
            <Link href="/" className="navbar-logo block w-full p-2">
              <Image
                src={`/images/logo/logo-white-row.webp`}
                alt="logo"
                width={224}
                height={38}
                className="h-auto w-full py-4"
                priority
              />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <NavigationButtons />
          </div>
        </div>
      </div>
    </StickyHeader>
  );
};

export default Header;
