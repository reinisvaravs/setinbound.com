"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoColorPaletteOutline } from "react-icons/io5";

const Header = () => {
  const pathUrl = usePathname();
  const [colorIndex, setColorIndex] = useState(0);

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

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark");
  }, []);

  const colors = ["#461A56", "#511D43", "#511D4E"];

  const toggleColor = () => {
    const nextIndex = (colorIndex + 1) % colors.length;
    setColorIndex(nextIndex);
    const newColor = colors[nextIndex];
    // Update the primary color in Tailwind config
    const style = document.documentElement.style;
    style.setProperty("--tw-primary", newColor);
  };

  return (
    <>
      <header
        className={`ud-header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "shadow-nav fixed z-[999] border-b border-stroke bg-white/80 backdrop-blur-[5px] dark:border-dark-3/20 dark:bg-dark/10"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <Link
                href="/"
                className={`navbar-logo block w-full ${
                  sticky ? "py-2" : "py-5"
                } `}
              >
                {pathUrl !== "/" ? (
                  <>
                    <Image
                      src={`/images/logo/lintra-logo.png`}
                      alt="logo"
                      width={240}
                      height={30}
                      className="header-logo w-full dark:hidden"
                    />
                    <Image
                      src={`/images/logo/lintra-logo-white.png`}
                      alt="logo"
                      width={240}
                      height={30}
                      className="header-logo hidden w-full dark:block"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={`${
                        sticky
                          ? "/images/logo/lintra-logo.png"
                          : "/images/logo/lintra-logo-white.png"
                      }`}
                      alt="logo"
                      width={140}
                      height={30}
                      className="header-logo w-full dark:hidden"
                    />
                    <Image
                      src={"/images/logo/lintra-logo-white.png"}
                      alt="logo"
                      width={140}
                      height={30}
                      className="header-logo hidden w-full dark:block"
                    />
                  </>
                )}
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div className="flex w-full items-center justify-between pr-16 lg:pr-0"></div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
