"use client";

import React, { useEffect, useState } from "react";

interface StickyHeaderProps {
  children: React.ReactNode;
}

const StickyHeader = ({ children }: StickyHeaderProps) => {
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
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  return (
    <div
      className={`ud-header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "shadow-nav fixed z-[999] border-b border-stroke bg-secondary-GRAY bg-opacity-95 backdrop-blur-[1px]"
          : "absolute bg-secondary-GRAY"
      }`}
    >
      {children}
    </div>
  );
};

export default StickyHeader;
