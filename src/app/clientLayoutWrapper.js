"use client";

import { usePathname } from "next/navigation";
import Headernew from "../../imports/header/page/Headernew";
import Footer from "../../imports/Footer/Footer";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = ["/login", "/register"].includes(pathname);
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        marginTop: hideLayout ? "0" : isMobile ? "60px" : "113px",
      }}
    >
      {!hideLayout && <Headernew />}
      {children}
      {!hideLayout && <Footer />}
    </div>
  );
}
