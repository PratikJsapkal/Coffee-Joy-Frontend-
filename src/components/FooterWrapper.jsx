"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  const hideFooter =
    pathname === "/Auth/login" ||
    pathname === "/Auth/signup" ||
    pathname === "/Auth/forgot-password" ||
    pathname === "/admin" ||
    pathname === "/admin/auth/login" ||
    pathname === "/admin/admin-dashboard";

  if (hideFooter) return null;

  return <Footer />;
}
