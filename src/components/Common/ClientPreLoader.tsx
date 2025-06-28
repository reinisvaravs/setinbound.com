"use client";

import { useEffect, useState } from "react";
import PreLoader from "./PreLoader";

const ClientPreLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return <>{children}</>;
};

export default ClientPreLoader;
