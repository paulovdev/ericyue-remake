"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects");

  return (
    <>
      {!isProjectPage && (
        <nav className="fixed bottom-0 w-full py-3 px-5 flex items-center justify-between mix-blend-exclusion z-50">
          <a
            className="normal-txt uppercase cursor-pointer select-none"
            onClick={() => {
              router.push("/");
            }}
          >
            ERIC K. YUE
          </a>
          <a
            className="normal-txt uppercase cursor-pointer select-none"
            onClick={() => {
              router.push("/info");
            }}
          >
            INFO
          </a>
        </nav>
      )}
    </>
  );
};

export default Footer;
