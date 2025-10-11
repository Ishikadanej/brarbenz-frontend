"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Preloader from "./Preloader";

export default function PageLoaderWrapper({ children }) {
  const pathname = usePathname();

  const routesWithLoader = [
    "/",
    "/shop",
    "/cart",
    "/checkout",
    "/contact",
    "/about",
    "/login",
    "/register",
  ];

  const shouldShowLoader = routesWithLoader.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );

  const [loading, setLoading] = useState(shouldShowLoader);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!shouldShowLoader) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setFadeOut(false);

    const timer = setTimeout(() => {
      setFadeOut(true);

      const fadeTimer = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(fadeTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, shouldShowLoader]);

  if (loading && shouldShowLoader) {
    return (
      <div className={`loader-wrapper ${fadeOut ? "fade-out" : ""}`}>
        <Preloader />
      </div>
    );
  }

  return <>{children}</>;
}
