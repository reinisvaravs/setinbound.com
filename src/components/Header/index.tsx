import Image from "next/image";
import Link from "next/link";
import StickyHeader from "./StickyHeader";
import NavigationButtons from "./NavigationButtons";

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
                width={240}
                height={30}
                className="header-logo w-full scale-150 py-4"
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
