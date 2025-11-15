"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Preloader from "./Preloader";

export default function PageLoaderWrapper({ children }) {
  const pathname = usePathname();

  // routes where you want loader
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

  const matchesRoute = routesWithLoader.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );

  const [show, setShow] = useState(matchesRoute);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!matchesRoute) {
      setShow(false);
      return;
    }

    // Start loader every time route changes
    setShow(true);
    setFade(false);

    const t1 = setTimeout(() => setFade(true), 700); // start fade
    const t2 = setTimeout(() => setShow(false), 1000); // hide completely

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  if (show) {
    return (
      <div className={`loader-wrapper ${fade ? "fade-out" : ""}`}>
        <Preloader />
      </div>
    );
  }

  return <>{children}</>;
}
